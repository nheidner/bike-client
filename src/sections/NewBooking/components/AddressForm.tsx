import { UPDATE_NEW_BOOKING_ADDRESS } from '../../../lib/graphql/mutations/UpdateNewBookingAddress';
import {
    UPDATE_NEW_BOOKING_ADDRESS as UpdateNewBookingAddressData,
    UPDATE_NEW_BOOKING_ADDRESSVariables as UpdateNewBookingAddressVariables,
} from '../../../lib/graphql/mutations/UpdateNewBookingAddress/__generated__/UPDATE_NEW_BOOKING_ADDRESS';
import { useMutation } from '@apollo/client';
import React, {
    useEffect,
    useState,
    useRef,
    MutableRefObject,
    FC,
} from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

interface AddressFieldsActions {
    setFirstLine: (query: string) => void;
    setPostalCode: (query: string) => void;
    setCity: (query: string) => void;
}

let autoComplete: google.maps.places.Autocomplete;

const loadScript = (url: string, callback: () => void) => {
    const existingScript = document.getElementById('googleMapsScript');

    if (!existingScript) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'googleMapsScript';
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
        script.onload = () => callback();
    } else {
        callback();
    }
};

const handleScriptLoad = (
    addressFieldsActions: AddressFieldsActions,
    autoCompleteRef: MutableRefObject<HTMLInputElement | null>
) => {
    if (!autoCompleteRef.current) {
        return;
    }
    autoComplete = new google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['address'], componentRestrictions: { country: 'de' } }
    );

    autoComplete.setFields(['address_components']);
    autoComplete.addListener('place_changed', () =>
        handlePlaceChanged(addressFieldsActions)
    );
};

const handlePlaceChanged = (addressFieldsActions: AddressFieldsActions) => {
    const addressObject = autoComplete.getPlace();
    const { address_components: addressComponents } = addressObject;

    if (addressComponents) {
        let streetAddress: string | null = null;
        let street: string | null = null;
        let streetNumber: string | null = null;
        let postalCode: string | null = null;
        let city: string | null = null;
        for (let addressComponent of addressComponents) {
            // first line
            if (addressComponent.types.includes('street_number'))
                streetNumber = addressComponent.short_name;
            if (addressComponent.types.includes('street_address'))
                streetAddress = addressComponent.short_name;

            if (addressComponent.types.includes('route'))
                street = addressComponent.short_name;
            // city
            if (
                addressComponent.types.includes('locality') &&
                addressComponent.types.includes('political')
            ) {
                city = addressComponent.short_name;
            }
            // postal code
            if (addressComponent.types.includes('postal_code'))
                postalCode = addressComponent.short_name;
        }
        const { setFirstLine, setPostalCode, setCity } = addressFieldsActions;
        if (streetAddress || street) {
            setFirstLine(
                streetAddress ||
                    (streetNumber && street
                        ? `${street || ''} ${streetNumber || ''}`
                        : street || '')
            );
        }
        setPostalCode(postalCode || '');
        setCity(city || '');
    }
};

interface Props {
    bookingId: string;
}

export const AddressForm: FC<Props> = ({ bookingId }) => {
    const [fullName, setFullName] = useState('');
    const [firstLine, setFirstLine] = useState('');
    const [secondLine, setSecondLine] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const autoCompleteRef = useRef(null);

    const [updateBookingAddress] = useMutation<
        UpdateNewBookingAddressData,
        UpdateNewBookingAddressVariables
    >(UPDATE_NEW_BOOKING_ADDRESS);

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&language=de&libraries=places`,
            () =>
                handleScriptLoad(
                    {
                        setFirstLine,
                        setPostalCode,
                        setCity,
                    },
                    autoCompleteRef
                )
        );
    }, []);

    const history = useHistory();
    const { pathname } = useLocation();

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                try {
                    const { data } = await updateBookingAddress({
                        variables: {
                            input: {
                                fullName,
                                firstLine,
                                secondLine,
                                postalCode,
                                city,
                            },
                        },
                    });
                    history.push(pathname + '/pickDateAndTime');
                } catch (error) {
                    console.log('error: ', error);
                }
            }}>
            <input
                onChange={(event) => setFullName(event.target.value)}
                placeholder='Vor- und Nachname'
                value={fullName}
            />
            <input
                ref={autoCompleteRef}
                onChange={(event) => setFirstLine(event.target.value)}
                placeholder='Erste Addresszeile'
                value={firstLine}
            />
            <input
                onChange={(event) => setSecondLine(event.target.value)}
                placeholder='Zweite Addresszeile'
                value={secondLine}
            />
            <input
                onChange={(event) => setPostalCode(event.target.value)}
                placeholder='Postleitzahl'
                value={postalCode}
            />
            <input
                onChange={(event) => setCity(event.target.value)}
                placeholder='Stadt'
                value={city}
            />
            <button type='submit'>update address</button>
        </form>
    );
};

import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { NEW_BOOKING } from '../../lib/graphql/queries/NewBooking';
import {
    NEW_BOOKING as NewBookingData,
    NEW_BOOKINGVariables as NewBookingVariables,
} from '../../lib/graphql/queries/NewBooking/__generated__/NEW_BOOKING';
import { AddressForm } from './components/AddressForm';
import { PickDate } from './components/Calendar';

export const NewBooking = () => {
    const match = useRouteMatch<{ serviceId: string; bookingStep: string }>();
    const { data } = useQuery<NewBookingData, NewBookingVariables>(
        NEW_BOOKING,
        {
            variables: {
                input: {
                    serviceId: match.params.serviceId,
                },
            },
        }
    );

    if (!data) {
        return <div>no data</div>;
    }

    return (
        <div>
            <h1>Book {data.newBooking.services[0].name}</h1>
            <Switch>
                <Route
                    exact={true}
                    path={match.url}
                    render={() => (
                        <AddressForm bookingId={data.newBooking.id} />
                    )}
                />
                <Route
                    exact={true}
                    path={`${match.url}/pickDateAndTime`}
                    render={() => (
                        <PickDate
                            bookingId={data.newBooking.id}
                            utcZone={
                                data.newBooking.address &&
                                data.newBooking.address.utcZone
                                    ? data.newBooking.address.utcZone
                                    : null
                            }
                        />
                    )}
                />
            </Switch>
        </div>
    );
};

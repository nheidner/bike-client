import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BOOKING } from '../../lib/graphql/queries/Booking';
import {
    BOOKING as BookingData,
    BOOKINGVariables as BookingVariables,
} from '../../lib/graphql/queries/Booking/__generated__/BOOKING';
import { UPDATE_BOOKING } from '../../lib/graphql/mutations/UpdateBooking';
import {
    UPDATE_BOOKING as UpdateBookingData,
    UPDATE_BOOKINGVariables as UpdateBookingVariables,
} from '../../lib/graphql/mutations/UpdateBooking/__generated__/UPDATE_BOOKING';

export const Booking = () => {
    const [date, setDate] = useState('');
    const params = useParams<{ serviceId: string }>();
    const { data } = useQuery<BookingData, BookingVariables>(BOOKING, {
        variables: { serviceId: params.serviceId },
    });

    const [updateBooking] = useMutation<
        UpdateBookingData,
        UpdateBookingVariables
    >(UPDATE_BOOKING);

    if (!data) {
        return <div>no data</div>;
    }
    return (
        <div>
            <h1>Book {data.booking.services[0].name}</h1>
            <div>{data.booking.date}</div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const res = await updateBooking({
                            variables: {
                                input: {
                                    date,
                                    services: [params.serviceId],
                                },
                            },
                        });
                    } catch (error) {
                        console.log('error: ', error);
                    }
                }}>
                <input
                    value={date}
                    placeholder='change date'
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type='submit'>change Booking</button>
            </form>
        </div>
    );
};

import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';
import Calendar from 'react-calendar';
import { UPDATE_NEW_BOOKING_DATE } from '../../../lib/graphql/mutations/UpdateNewBookingDate';
import {
    UPDATE_NEW_BOOKING_DATE as UpdateNewBookingDateData,
    UPDATE_NEW_BOOKING_DATEVariables as UpdateNewBookingDateVariables,
} from '../../../lib/graphql/mutations/UpdateNewBookingDate/__generated__/UPDATE_NEW_BOOKING_DATE';

type Hour = 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
type Minute = 0 | 15 | 30 | 45;
type Time = [Hour, Minute];

interface TimeFrame {
    from: Time;
    to: Time;
}

const frames: TimeFrame[] = [
    { from: [10, 0], to: [12, 0] },
    { from: [12, 0], to: [14, 0] },
    { from: [14, 0], to: [16, 0] },
    { from: [16, 0], to: [18, 0] },
];

interface Props {
    bookingId: string;
    utcZone: number | null;
}

export const PickDate: FC<Props> = ({ bookingId, utcZone }) => {
    const [updateNewBookingDate] = useMutation<
        UpdateNewBookingDateData,
        UpdateNewBookingDateVariables
    >(UPDATE_NEW_BOOKING_DATE);

    const now = new Date();
    const [date, onChange] = useState<Date | Date[]>(now);
    const [from, setFrom] = useState<number>();
    const [to, setTo] = useState<number>();

    if (Array.isArray(date)) {
        return <div>Error</div>;
    }

    if (!utcZone) {
        return <div>no UTC Zone</div>;
    }

    const handleUpdateDates = async () => {
        try {
            const { data } = await updateNewBookingDate({
                variables: { input: { from, to } },
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const timeZoneOffset = now.getTimezoneOffset();

    const handlePickTimeFrame = (timeFrame: TimeFrame) => {
        const from = new Date(date.getTime()).setMinutes(
            date.getMinutes() +
                (timeFrame.from[0] * 60 + timeFrame.from[1]) -
                (timeZoneOffset + utcZone)
        );
        const to = new Date(date.getTime()).setMinutes(
            date.getMinutes() +
                (timeFrame.to[0] * 60 + timeFrame.to[1]) -
                (timeZoneOffset + utcZone)
        );
        setFrom(from);
        setTo(to);
    };

    const addressTimeZoneDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes() + (timeZoneOffset + utcZone)
    );

    const minDate = new Date(
        addressTimeZoneDate.getFullYear(),
        addressTimeZoneDate.getMonth(),
        addressTimeZoneDate.getDate() + 1
    );

    const maxDate = new Date(
        minDate.getFullYear(),
        minDate.getMonth() + 6,
        minDate.getDate(),
        minDate.getHours(),
        minDate.getMinutes(),
        minDate.getSeconds()
    );
    return (
        <div>
            <h2>Pick Date</h2>
            <Calendar
                onChange={onChange}
                value={date}
                view='month'
                locale='de'
                minDate={minDate}
                maxDate={maxDate}
                onDrillUp={({ activeStartDate, view }) =>
                    console.log('Drilled up to: ', activeStartDate, view)
                }
            />
            <h2>Pick Timeframe</h2>
            <div>
                {frames.map((frame, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => handlePickTimeFrame(frame)}>
                            from {frame.from} to {frame.to}
                        </div>
                    );
                })}
            </div>
            <button onClick={() => handleUpdateDates()}>update Dates</button>
        </div>
    );
};

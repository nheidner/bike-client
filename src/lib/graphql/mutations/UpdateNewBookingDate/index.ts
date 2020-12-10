import { gql } from '@apollo/client';

export const UPDATE_NEW_BOOKING_DATE = gql`
    mutation UPDATE_NEW_BOOKING_DATE($input: UpdateNewBookingDateInput) {
        updateNewBookingDate(input: $input) {
            id
            date {
                from
                to
            }
        }
    }
`;

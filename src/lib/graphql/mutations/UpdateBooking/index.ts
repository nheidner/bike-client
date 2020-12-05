import { gql } from '@apollo/client';

export const UPDATE_BOOKING = gql`
    mutation UPDATE_BOOKING($input: UpdateBookingInput) {
        updateBooking(input: $input) {
            id
            date
            time
            services {
                id
                name
                description
                image
                price
            }
            wallet
            userId
            isMade
        }
    }
`;

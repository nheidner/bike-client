import { gql } from '@apollo/client';

export const NEW_BOOKING = gql`
    query NEW_BOOKING($input: NewBookingInput) {
        newBooking(input: $input) {
            id
            services {
                id
                name
                description
                image
                price
            }
            address {
                fullName
                firstLine
                secondLine
                postalCode
                city
                utcZone
            }
            isMade
            date {
                from
                to
            }
            wallet
            userId
        }
    }
`;

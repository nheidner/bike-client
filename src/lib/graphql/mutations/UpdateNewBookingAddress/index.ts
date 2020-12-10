import { gql } from '@apollo/client';

export const UPDATE_NEW_BOOKING_ADDRESS = gql`
    mutation UPDATE_NEW_BOOKING_ADDRESS($input: UpdateNewBookingAddressInput) {
        updateNewBookingAddress(input: $input) {
            id
            address {
                fullName
                firstLine
                secondLine
                postalCode
                city
                utcZone
            }
        }
    }
`;

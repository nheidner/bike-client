import { gql } from '@apollo/client';

export const BOOKING = gql`
    query BOOKING($serviceId: ID!) {
        booking(serviceId: $serviceId) {
            id
            services {
                id
                name
                description
                image
                price
            }
            isMade
            date
            time
            wallet
            userId
        }
    }
`;

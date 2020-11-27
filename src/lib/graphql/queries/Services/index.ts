import { gql } from '@apollo/client';

export const SERVICES = gql`
    query SERVICES($offset: Int!, $limit: Int!) {
        services(offset: $offset, limit: $limit) {
            total
            result {
                id
                name
                description
                image
                price
            }
        }
    }
`;

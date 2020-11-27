import { gql } from '@apollo/client';

export const SERVICE = gql`
    query SERVICE($id: ID!) {
        service(id: $id) {
            id
            name
            description
            image
            price
        }
    }
`;

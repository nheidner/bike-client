import { gql } from '@apollo/client';

export const LOG_OUT_USER = gql`
    mutation LOG_OUT_USER {
        logOutUser {
            id
            firstName
            didRequest
            lastName
            token
            email
        }
    }
`;

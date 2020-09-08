import { gql } from '@apollo/client';

export const LOG_IN_USER = gql`
    mutation LOG_IN_USER($input: LogInInput) {
        logInUser(input: $input) {
            id
            firstName
            didRequest
            lastName
            token
            email
        }
    }
`;

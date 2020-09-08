import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation REGISTER_USER($input: RegisterUserInput) {
        registerUser(input: $input) {
            id
            firstName
            lastName
            email
            password
        }
    }
`;

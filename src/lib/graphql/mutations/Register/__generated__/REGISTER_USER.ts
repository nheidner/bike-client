/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterUserInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: REGISTER_USER
// ====================================================

export interface REGISTER_USER_registerUser {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface REGISTER_USER {
  registerUser: REGISTER_USER_registerUser;
}

export interface REGISTER_USERVariables {
  input?: RegisterUserInput | null;
}

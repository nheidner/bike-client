/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: LOG_IN_USER
// ====================================================

export interface LOG_IN_USER_logInUser {
  __typename: "Viewer";
  id: string | null;
  firstName: string | null;
  didRequest: boolean;
  lastName: string | null;
  token: string | null;
  email: string | null;
}

export interface LOG_IN_USER {
  logInUser: LOG_IN_USER_logInUser | null;
}

export interface LOG_IN_USERVariables {
  input?: LogInInput | null;
}

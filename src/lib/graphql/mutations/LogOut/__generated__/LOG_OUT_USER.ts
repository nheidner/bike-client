/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LOG_OUT_USER
// ====================================================

export interface LOG_OUT_USER_logOutUser {
  __typename: "Viewer";
  id: string | null;
  firstName: string | null;
  didRequest: boolean;
  lastName: string | null;
  token: string | null;
  email: string | null;
}

export interface LOG_OUT_USER {
  logOutUser: LOG_OUT_USER_logOutUser | null;
}

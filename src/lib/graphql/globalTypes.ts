/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface LogInInput {
  email?: string | null;
  password?: string | null;
  service?: string | null;
  code?: string | null;
}

export interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateBookingInput {
  date?: string | null;
  time?: string | null;
  services?: (string | null)[] | null;
  wallet?: string | null;
  isMade?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

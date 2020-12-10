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

export interface NewBookingInput {
  serviceId?: string | null;
}

export interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateNewBookingAddressInput {
  fullName: string;
  firstLine: string;
  secondLine?: string | null;
  postalCode: string;
  city: string;
}

export interface UpdateNewBookingDateInput {
  from?: any | null;
  to?: any | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

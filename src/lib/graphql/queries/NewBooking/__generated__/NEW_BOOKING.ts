/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewBookingInput } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: NEW_BOOKING
// ====================================================

export interface NEW_BOOKING_newBooking_services {
  __typename: "Service";
  id: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  price: number | null;
}

export interface NEW_BOOKING_newBooking_address {
  __typename: "Address";
  fullName: string;
  firstLine: string;
  secondLine: string | null;
  postalCode: string;
  city: string;
  utcZone: number | null;
}

export interface NEW_BOOKING_newBooking_date {
  __typename: "TimeFrame";
  from: any | null;
  to: any | null;
}

export interface NEW_BOOKING_newBooking {
  __typename: "NewBooking";
  id: string;
  services: NEW_BOOKING_newBooking_services[];
  address: NEW_BOOKING_newBooking_address | null;
  isMade: boolean;
  date: NEW_BOOKING_newBooking_date | null;
  wallet: string | null;
  userId: string;
}

export interface NEW_BOOKING {
  newBooking: NEW_BOOKING_newBooking;
}

export interface NEW_BOOKINGVariables {
  input?: NewBookingInput | null;
}

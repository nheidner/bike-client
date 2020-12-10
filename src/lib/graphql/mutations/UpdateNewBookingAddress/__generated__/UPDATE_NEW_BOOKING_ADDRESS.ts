/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateNewBookingAddressInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_NEW_BOOKING_ADDRESS
// ====================================================

export interface UPDATE_NEW_BOOKING_ADDRESS_updateNewBookingAddress_address {
  __typename: "Address";
  fullName: string;
  firstLine: string;
  secondLine: string | null;
  postalCode: string;
  city: string;
  utcZone: number | null;
}

export interface UPDATE_NEW_BOOKING_ADDRESS_updateNewBookingAddress {
  __typename: "NewBooking";
  id: string;
  address: UPDATE_NEW_BOOKING_ADDRESS_updateNewBookingAddress_address | null;
}

export interface UPDATE_NEW_BOOKING_ADDRESS {
  updateNewBookingAddress: UPDATE_NEW_BOOKING_ADDRESS_updateNewBookingAddress;
}

export interface UPDATE_NEW_BOOKING_ADDRESSVariables {
  input?: UpdateNewBookingAddressInput | null;
}

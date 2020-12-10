/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateNewBookingDateInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_NEW_BOOKING_DATE
// ====================================================

export interface UPDATE_NEW_BOOKING_DATE_updateNewBookingDate_date {
  __typename: "TimeFrame";
  from: any | null;
  to: any | null;
}

export interface UPDATE_NEW_BOOKING_DATE_updateNewBookingDate {
  __typename: "NewBooking";
  id: string;
  date: UPDATE_NEW_BOOKING_DATE_updateNewBookingDate_date | null;
}

export interface UPDATE_NEW_BOOKING_DATE {
  updateNewBookingDate: UPDATE_NEW_BOOKING_DATE_updateNewBookingDate;
}

export interface UPDATE_NEW_BOOKING_DATEVariables {
  input?: UpdateNewBookingDateInput | null;
}

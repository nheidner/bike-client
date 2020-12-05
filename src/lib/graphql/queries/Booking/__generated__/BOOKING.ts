/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BOOKING
// ====================================================

export interface BOOKING_booking_services {
  __typename: "Service";
  id: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  price: number | null;
}

export interface BOOKING_booking {
  __typename: "Booking";
  id: string;
  services: BOOKING_booking_services[];
  isMade: boolean;
  date: string | null;
  time: string | null;
  wallet: string | null;
  userId: string;
}

export interface BOOKING {
  booking: BOOKING_booking;
}

export interface BOOKINGVariables {
  serviceId: string;
}

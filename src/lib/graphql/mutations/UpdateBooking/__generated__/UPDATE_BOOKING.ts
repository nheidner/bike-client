/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBookingInput } from './../../../globalTypes';

// ====================================================
// GraphQL mutation operation: UPDATE_BOOKING
// ====================================================

export interface UPDATE_BOOKING_updateBooking_services {
    __typename: 'Service';
    id: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    price: number | null;
}

export interface UPDATE_BOOKING_updateBooking {
    __typename: 'Booking';
    id: string;
    date: string | null;
    time: string | null;
    services: UPDATE_BOOKING_updateBooking_services[];
    wallet: string | null;
    userId: string;
    isMade: boolean;
}

export interface UPDATE_BOOKING {
    updateBooking: UPDATE_BOOKING_updateBooking;
}

export interface UPDATE_BOOKINGVariables {
    input?: UpdateBookingInput | null;
}

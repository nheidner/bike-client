/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SERVICES
// ====================================================

export interface SERVICES_services_result {
    __typename: 'Service';
    id: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    price: number | null;
}

export interface SERVICES_services {
    __typename: 'Services';
    total: number;
    result: SERVICES_services_result[];
}

export interface SERVICES {
    services: SERVICES_services | null;
}

export interface SERVICESVariables {
    offset: number;
    limit: number;
}

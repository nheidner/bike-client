/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SERVICE
// ====================================================

export interface SERVICE_service {
  __typename: "Service";
  id: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  price: number | null;
}

export interface SERVICE {
  service: SERVICE_service;
}

export interface SERVICEVariables {
  id: string;
}

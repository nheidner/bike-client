import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { SERVICE } from '../../lib/graphql/queries/Service';
import {
    SERVICE as ServiceData,
    SERVICEVariables as ServiceVariables,
} from '../../lib/graphql/queries/Service/__generated__/SERVICE';
import { useParams } from 'react-router-dom';

export const Services = () => {
    const { id } = useParams<{ id: string }>();

    const { data, error } = useQuery<ServiceData, ServiceVariables>(SERVICE, {
        variables: { id },
    });

    if (error) {
        console.log(error.graphQLErrors[0]);
        return (
            <div>
                <h1>Error</h1>
                {error.graphQLErrors.map((err, index) => {
                    return <p key={index}>{err.message}</p>;
                })}
            </div>
        );
    }

    const service = data ? data.service : null;

    return (
        <div>
            <h1>{service?.name}</h1>
            <div>Preis: {service?.price}</div>
            <div>{service?.description}</div>
        </div>
    );
};

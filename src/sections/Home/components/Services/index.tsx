import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { SERVICES } from '../../../../lib/graphql/queries/Services';
import {
    SERVICES as ServicesData,
    SERVICESVariables as ServicesVariables,
    SERVICES_services_result as AllService,
} from '../../../../lib/graphql/queries/Services/__generated__/SERVICES';

export const Services = () => {
    const limit = 2;
    const { data, fetchMore } = useQuery<ServicesData, ServicesVariables>(
        SERVICES,
        {
            variables: { offset: 0, limit },
        }
    );
    const currentLength =
        data && data.services ? data.services.result.length : 0;

    const loadMore = () => {
        fetchMore({ variables: { offset: currentLength } });
    };

    return (
        <div>
            {data?.services?.result.map((service, index) => {
                return (
                    <div key={index}>
                        <div>{service.name}</div>
                        <div>{service.description}</div>
                        <div>{service.price}</div>
                        <hr />
                    </div>
                );
            })}
            {data && data.services && data.services.total > currentLength ? (
                <button onClick={() => loadMore()}>more</button>
            ) : (
                <button style={{ pointerEvents: 'none', cursor: 'notAllowed' }}>
                    more
                </button>
            )}
        </div>
    );
};

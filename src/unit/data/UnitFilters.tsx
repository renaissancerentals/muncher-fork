import React, {Fragment} from "react";

import {Month} from "./Calendar";
import {Icon} from "@contentmunch/muncher-ui";

export interface CurrentFilters {
    bedroomFilters: number[];
    availabilityFilters: Month[];
    styleFilters: string[];
    minRent: number;
    maxRent: number;
    sortBy: SortBy;
}

export const SortFields: { [id: string]: SortField } = {
    featured: {
        element: <Fragment><Icon name="star"/>&nbsp;Featured</Fragment>,
        sortField: "featured",
        order: "desc"
    },
    priceAsc: {
        element: <Fragment><Icon name="sort-asc"/>&nbsp;Price</Fragment>,
        sortField: "minRate",
        order: "asc"
    },
    priceDesc: {
        element: <Fragment><Icon name="sort-desc"/>&nbsp;Price</Fragment>,
        sortField: "minRate",
        order: "desc"
    },
    bedroomsAsc: {
        element: <Fragment><Icon name="sort-asc"/>&nbsp;Bedrooms</Fragment>,
        sortField: "bedrooms",
        order: "asc"
    },
    bedroomsDesc: {
        element: <Fragment><Icon name="sort-desc"/>&nbsp;Bedrooms</Fragment>,
        sortField: "bedrooms",
        order: "desc"
    },
}

export type SortBy = keyof typeof SortFields;

export interface SortField {
    element: React.ReactElement;
    sortField: string;
    order: any;
}

export interface UnitFilters {
    bedroom: Set<number>;
    availability: Set<Month>;
    style: Set<string>;
}
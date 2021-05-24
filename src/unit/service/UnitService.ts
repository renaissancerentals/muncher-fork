import Api from "../../service/Api";
import _ from 'lodash';
import {Card, Unit} from "../..";
import {Month} from "../data/Calendar";
import {CurrentFilters, SortBy, SortFields, UnitFilters} from "../data/UnitFilters";

export const convertToHttps = (url: string): string => {
    if(url===null)
        return "";
    return url.replace(/^http:\/\//i, 'https://');
};
export const getAllAddresses = (): Promise<string[]> => {
    return Api.get("addresses").then(response =>
        _.orderBy(response.data, 'address', 'asc').map(address => address.address));
};

export const getFeaturedUnits = (domain: string): Promise<Card[]> => {
    return Api.get("units/" + domain).then(response => response.data.filter((unit: any) => unit.featured)
        .map((unit: any) => ({
                img: convertToHttps(unit.small_original_photo),
                url: convertToHttps(unit.unit_url),
                title: "Featured Unit",
                text: unit.title + " - " + unit.bedrooms + " bd/" + unit.bathrooms + " bth"
            } as Card)
        ));
};
export const getUnits = (domain: string, filterBy?: (unit: Unit) => boolean): Promise<Unit[]> => {

    return Api.get("units/" + domain).then(response => response.data.map((data: any) => ({
        img: convertToHttps(data.thumb_photo),
        coverImg: convertToHttps(data.cover_photo),
        url: convertToHttps(data.unit_url),
        title: data.title,
        description: data.description,
        metaDescription: data.meta_description,
        featured: data.featured,
        community: data.property,
        virtualTour: data.virtual_tour_link,
        video: data.videos !== undefined && data.videos.length > 0 ? data.videos[0].url : null,
        rate: data.display_rate,
        minRate: data.min_rental_rate,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        squareFoot: data.square_feet,
        style: data.style,
        availability: availabilityFrom(data)
    } as Unit)).filter((unit: Unit) => {
        if (filterBy) {
            return filterBy(unit);
        } else {
            return true;
        }
    }));
};
export const filterByFurnished = (unit: Unit): boolean => {
    return unit.title ? unit.title.toLowerCase().includes("furnished") : false;

}
export const sortAndFilter = (units: Unit[], currentFilters: CurrentFilters): Unit[] => {
    return sortUnits(units.filter(unit => filterMatches(unit, currentFilters)), currentFilters.sortBy);
};

const isAvailable = (unit: Unit, availabilityFilters: Month[]): boolean => {
    return availabilityFilters.length === 0 ? true : unit.availability.some((avail: Month) => availabilityFilters.indexOf(avail) > -1);
};
const isBedroomsMatch = (unit: Unit, bedroomFilters: number[]): boolean => {
    return bedroomFilters.length === 0 ? true : bedroomFilters.indexOf(unit.bedrooms) > -1;
};
const isStyleMatch = (unit: Unit, styleFilters: string[]): boolean => {
    return styleFilters.length === 0 ? true : styleFilters.indexOf(unit.style) > -1;
}
const isInPriceRange = (unit: Unit, minRent: number, maxRent: number): boolean => {
    return unit.minRate >= minRent && unit.minRate <= maxRent;
}

const filterMatches = (unit: Unit, currentFilters: CurrentFilters) => {
    return isAvailable(unit, currentFilters.availabilityFilters) &&
        isInPriceRange(unit, currentFilters.minRent, currentFilters.maxRent) &&
        isStyleMatch(unit, currentFilters.styleFilters) &&
        isBedroomsMatch(unit, currentFilters.bedroomFilters);
}
export const sortUnits = (units: Unit[], sortBy: SortBy): Unit[] => {
    return _.orderBy(units, SortFields[sortBy].sortField, SortFields[sortBy].order);
};
const availabilityFrom = (renaissanceUnit: any): Month[] => {
    const unitAvailability: Month[] = [];
    if (renaissanceUnit.january_availability > 0) unitAvailability.push("January");
    if (renaissanceUnit.february_availability > 0) unitAvailability.push("February");
    if (renaissanceUnit.march_availability > 0) unitAvailability.push("March");
    if (renaissanceUnit.april_availability > 0) unitAvailability.push("April");
    if (renaissanceUnit.may_availability > 0) unitAvailability.push("May");
    if (renaissanceUnit.june_availability > 0) unitAvailability.push("June");
    if (renaissanceUnit.july_availability > 0) unitAvailability.push("July");
    if (renaissanceUnit.august_availability > 0) unitAvailability.push("August");
    if (renaissanceUnit.september_availability > 0) unitAvailability.push("September");
    if (renaissanceUnit.october_availability > 0) unitAvailability.push("October");
    if (renaissanceUnit.november_availability > 0) unitAvailability.push("November");
    if (renaissanceUnit.december_availability > 0) unitAvailability.push("December");

    return unitAvailability;
};


export const filtersFrom = (units: Unit[]): UnitFilters => {

        const bedroomFilters = new Set<number>();
        const availabilityFilters = new Set<Month>();
        const styleFilters = new Set<string>();

        units.forEach(unit => {
            bedroomFilters.add(unit.bedrooms);
            styleFilters.add(unit.style);

            unit.availability.forEach((value) => {
                availabilityFilters.add(value);
            })
        });
        return {
            bedroom: bedroomFilters,
            availability: availabilityFilters,
            style: styleFilters
        }
    }
;

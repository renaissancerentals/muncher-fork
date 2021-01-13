export interface ContactMessage {
    to?: string;
    cc?: string;
    as?: string;
    subject?: string;
    captchaResponse: string;
    name: string;
    phone: number;
    email: string;
    emailPreferred: boolean;
    phonePreferred: boolean;
    textPreferred: boolean;
    question: string;
    communities: string;
    additionalInfo?: AdditionalInfo;
}

export interface AdditionalInfo {
    bedrooms?: number;
    moveInDate?: string;
    amenities?: string;
    pets?: string;
    floorPlan?: string;
    hearAboutUs?: string;
    lowerRent: number;
    upperRent: number;
}
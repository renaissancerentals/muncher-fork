export interface RentalApplication {
    name: string;
    email: string;
    to: string;
    subject: string;
    community:string;
    phone?: string;
    captchaResponse: string;
}
import React, {useState} from "react";
import {Button, Input, Select, Spinner} from "@contentmunch/muncher-ui";
import "./assets/ApplicationSection.scss";
import {Captcha} from "../input/Captcha";
import {sendRentalApplicationRequest} from "./service/ApplicationService";
import {CommunitiesEmail, Community} from "../community/data/CommunitiesEmail";
import {RentalApplication} from "./data/RentalApplication";

export const ApplicationSection: React.FC<ApplicationSectionProps> = ({contactLink, community}) => {


    const [submissionState, setSubmissionState] = useState<SubmissionState>("init");
    const [errorMessage, setErrorMessage] = useState("");
    const [rentalApplication, setRentalApplication] = useState<RentalApplication>({
        subject: "Rental Application Request",
        community: community ? community : ""
    } as RentalApplication);

    const isFormValid = (): boolean => {
        return rentalApplication.captchaResponse != null && rentalApplication.community != null
            && rentalApplication.email != null && rentalApplication.name != null
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setSubmissionState("start");
        if (isFormValid()) {
            setSubmissionState("submitting");
            sendRentalApplicationRequest(
                {
                    ...rentalApplication, to: CommunitiesEmail[rentalApplication.community]
                }).then((response) => {
                setSubmissionState("complete");
            }).catch((e) => {
                if (e.response && e.response.data) {
                    setErrorMessage(e.response.data.message);
                } else {
                    setErrorMessage("Rental Application Request Failed!");

                }
                setSubmissionState("submissionError");
            });
        } else {
            setSubmissionState("formInvalid");

            setErrorMessage("Fill all the required fields");
        }
    }

    const isEmpty = (field: string | null | undefined) => {
        return field === undefined || field === null || field === "";
    }

    return (
        <section className="section-application">
            <div className="container">
                <div className="application-heading">
                    <h2 className="heading">
                        <span className="emphasized">Rental Application Request Form</span></h2>
                    <p>If you have spoken to our team and are ready to apply, please submit a request for an application
                        below. We'll email you a link to our free online application shortly.</p>
                    <p>If this is your first time contacting us, we recommend submitting an inquiry on our <a
                        href={contactLink}>contact page</a> first.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-element">
                        <Input label="Name" name="fullName" icon="user"
                               onChange={e => {
                                   setRentalApplication({...rentalApplication, name: e.target.value})
                               }}
                               error={
                                   submissionState === "formInvalid" && isEmpty(rentalApplication.name) ?
                                       "Please provide Name" : ""
                               }
                               required/>
                    </div>
                    <div className="form-element">
                        <Input label="Email" name="email" icon="mail" type="email"
                               onChange={e => {
                                   setRentalApplication({...rentalApplication, email: e.target.value})
                               }}
                               error={
                                   submissionState === "formInvalid" && isEmpty(rentalApplication.name) ?
                                       "Please provide Email" : ""
                               }
                               required/>
                    </div>

                    <div className="form-element">
                        <Input label="Phone" name="phone" type="number" icon="phone"
                               onChange={e => {
                                   setRentalApplication({...rentalApplication, phone: e.target.value})
                               }}
                        />
                    </div>
                    {community ? "" :
                        <div className="form-element">
                            <Select name="neighborhood" options={Object.keys(CommunitiesEmail)}
                                    label="Neighborhood"
                                    onChange={e => {
                                        setRentalApplication({...rentalApplication, community: e.target.value})
                                    }}
                                    error={
                                        submissionState === "formInvalid" && isEmpty(rentalApplication.community) ?
                                            "Please select Neighborhood" : ""
                                    }
                                    required/>

                        </div>}


                    <Captcha setCaptchaResponse={token => {
                        setRentalApplication({...rentalApplication, captchaResponse: token})
                    }} error={
                        submissionState === "formInvalid" && isEmpty(rentalApplication.captchaResponse) ?
                            "Please check the captcha" : ""}/>
                    <div className="form-element">
                        {submissionState === "complete" ?
                            <p className="text-success message">Rental Application Request Complete!</p> : ""}
                        {submissionState === "submissionError" || submissionState === "formInvalid" ?
                            <p className="text-danger message">{errorMessage}</p> : ""}
                    </div>
                    <div className="form-element form-submit">
                        <Button variant="primary" size="large" type="submit" disabled={submissionState === "complete"}>
                            Submit
                        </Button>
                        {submissionState === "submitting" ? <Spinner size="small"/> : ""}
                    </div>
                </form>
            </div>
        </section>
    );
}

export interface ApplicationSectionProps {
    community?: Community;
    contactLink: string;
}

export type SubmissionState = "init" | "start" | "submitting" | "complete" | "submissionError" | "formInvalid";

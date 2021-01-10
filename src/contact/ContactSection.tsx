import React, {Fragment, useState} from 'react';
import './assets/Contact.scss';
import {Button, Checkbox, Icon, Input, RangeSlider, Spinner, Textarea} from "@contentmunch/muncher-ui";
import {sendContactMail, sendToConversionTracking} from "./service/ContactService";
import {defaultMaxRent, defaultMinRent} from "../unit/data/Unit";
import {ContactMessage} from "./data/ContactMessage";
import {Captcha} from "../input/Captcha";

export const ContactSection: React.FC<ContactSectionProps> = (
    {
        subject,
        to,
        cc,
        as,
        conversionTrackingIds,
        variant
    }) => {

    const [submitted, setSubmitted] = useState(false);
    const [additionalInfoClicked, setAdditionalInfoClicked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("Message Failed!");
    const [submissionComplete, setSubmissionComplete] = useState(false);
    const [captchaResponse, setCaptchaResponse] = useState("");
    const [lowerRent, setLowerRent] = useState(0);
    const [upperRent, setUpperRent] = useState(4000);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() && captchaResponse !== "") {
            setSubmitted(true);

            const mailObject: ContactMessage = {
                to, cc, as, subject, captchaResponse,
                name: form.fullName.value,
                phone: form.phone.value,
                email: form.email.value,
                emailPreferred: form.emailPreferred.checked,
                phonePreferred: form.phonePreferred.checked,
                textPreferred: form.textPreferred.checked,
                question: form.question.value,
            };

            const mailWithAddition: ContactMessage = {
                ...mailObject,
                additionalInfo: {
                    bedrooms: form.bedrooms ? form.bedrooms.value : null,
                    moveInDate: form.moveInDate ? form.moveInDate.value : null,
                    amenities: form.amenities ? form.amenities.value : null,
                    pets: form.pets ? form.pets.value : null,
                    floorPlan: form.floorPlan ? form.floorPlan.value : null,
                    hearAboutUs: form.hearAboutUs ? form.hearAboutUs.value : null,
                    lowerRent, upperRent
                }
            }
            setIsSubmitting(true);
            sendContactMail(additionalInfoClicked ? mailWithAddition : mailObject)
                .then(() => {
                    if (conversionTrackingIds) {
                        sendToConversionTracking(conversionTrackingIds);
                    }
                    setIsSubmitting(false);
                    setSubmissionComplete(true);
                }).catch((e) => {
                if (e.response && e.response.data) setSubmissionErrorMessage(e.response.data.message);
                setSubmissionError(true);
            }).finally(() => {
                setIsSubmitting(false);
            });
        }
    };

    const handleAdditionalInfoToggle = () => {

        setAdditionalInfoClicked(!additionalInfoClicked);
    };

    return (
        <section className="section-contact">
            <div className="container">
                <h2 className="heading"><span className="emphasized">Contact Us</span></h2>

                <p className="information">Fill the form below to get in touch with a member
                    of our
                    professional leasing team. We can't wait to meet you!</p>
                <form onSubmit={submitHandler}>
                    <div className="blah">
                        <div className="form-element">
                            <Input label="Name" name="fullName" icon="user" required/>
                        </div>
                    </div>
                    <div className="blah">
                        <div className="form-element">
                            <Input label="Email" name="email" icon="mail" type="email" required/>
                        </div>
                    </div>
                    <div className="blah">
                        <div className="form-element">
                            <Input label="Phone" name="phone" type="number" icon="phone" required/>
                        </div>
                    </div>
                    <div className="blah">
                        <div className="checkboxes form-element">
                            <Checkbox label="Phone OK" name="phonePreferred"/>
                            <Checkbox label="Text OK" name="textPreferred"/>
                            <Checkbox label="Email OK" name="emailPreferred" checked={true}/>

                        </div>
                    </div>
                    {"long" === variant ?
                        <div className="blah">
                            <p className="additional-info form-element" onClick={handleAdditionalInfoToggle}>
                                <b>{additionalInfoClicked ? <Icon name="minus"/> : <Icon name="plus"/>} Tap here to
                                    provide
                                    additional information about
                                    what you are looking for
                                    in your home.</b> (This info is very helpful to us, but not required.)</p>
                        </div> : ""}

                    {additionalInfoClicked ?
                        <Fragment>
                            <div className="blah">
                                <div className="form-element optional">
                                    <Input label="Bedrooms Requested" name="bedrooms" icon="inbox" type="number"/>
                                </div>
                            </div>
                            <div className="blah">
                                <div className="form-element optional">
                                    <Input label="Desired Move-In Date" name="moveInDate" icon="calendar" type="date"
                                           placeholder="format: mm/dd/yyyy"/>
                                </div>
                            </div>
                            <div className="blah">
                                <div className="form-element optional price-range">
                                    <label>Desired Price Range</label>
                                    <RangeSlider min={defaultMinRent} max={defaultMaxRent}
                                                 minValue={lowerRent} maxValue={upperRent} setMinValue={setLowerRent}
                                                 setMaxValue={setUpperRent}
                                    >
                                        <i>click and drag to adjust price range</i>
                                    </RangeSlider>
                                </div>
                            </div>
                            <div className="blah">
                                <div className="form-element optional">
                                    <Input
                                        label="Which amenities and features are most important to you in your next home?"
                                        name="amenities" icon="type"/>
                                </div>
                            </div>
                            <div className="form-element optional">
                                <Input label="Please list any pets that will be living with you" name="pets"
                                       icon="type"/>
                            </div>
                            <div className="blah">
                                <div className="form-element optional">
                                    <Input label="Is there a particular floor plan style or community that you are
                                    most interested in? (Please list all that apply)" name="floorPlan"
                                           icon="type"/>
                                </div>
                            </div>
                            <div className="blah">
                                <div className="form-element optional">
                                    <Input label="How did you hear about us?" name="hearAboutUs"
                                           icon="type"/>
                                </div>
                            </div>
                        </Fragment>
                        : ""}
                    <div className="blah">
                        <div className="form-element">
                            <Textarea
                                label="Question"
                                name="question"
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="blah">
                        <Captcha setCaptchaResponse={setCaptchaResponse}/>
                    </div>
                    <div className="blah">
                        <div className="form-element">
                            {submissionComplete ?
                                <p className="text-success message">Message Sent!</p> : ""}
                            {submissionError ?
                                <p className="text-danger message">{submissionErrorMessage}</p> : ""}
                        </div>
                    </div>
                    <div className="blah">
                        <div className="form-element form-submit">
                            <Button variant="primary" size="large" type="submit" disabled={submitted}>
                                Submit
                            </Button>
                            {isSubmitting ? <Spinner size="small"/> : ""}
                        </div>
                    </div>
                </form>
            </div>

        </section>
    );
};

export interface ContactSectionProps {
    subject?: string;
    to?: string;
    cc?: string;
    as?: string;
    variant?: "long"
    conversionTrackingIds?: string[]
}
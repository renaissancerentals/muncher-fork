import React, {useEffect, useState} from "react";
import {Button, Checkbox, FileInput, Input, Spinner, Textarea} from "@contentmunch/muncher-ui";
import "./assets/Maintenance.scss";
import {Captcha} from "../input/Captcha";
import {getAllAddresses} from "../unit/service/UnitService";
import {sendMaintenanceMail} from "./service/MaintenanceService";

export const MaintenanceSection: React.FC = () => {

    const [captchaResponse, setCaptchaResponse] = useState("");
    const [files, setFiles] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionComplete, setSubmissionComplete] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("Maintenance Request Failed!");
    useEffect(() => {
        getAllAddresses().then((data: string[]) => {
            setAddresses(data);
        });
    }, []);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() && captchaResponse !== "") {
            setSubmitted(true);
            let formData: FormData = new FormData();
            formData.append("name", form.fullName.value);
            formData.append("email", form.email.value);
            formData.append("address", form.address.value);
            formData.append("phone", form.phone.value);
            formData.append("airconHeatFurnace", form.airconHeatFurnace.checked);
            formData.append("dishwasher", form.dishwasher.checked);
            formData.append("electrical", form.electrical.checked);
            formData.append("garbageDisposal", form.garbageDisposal.checked);
            formData.append("lightBulbs", form.lightBulbs.checked);
            formData.append("pests", form.pests.checked);
            formData.append("smokeDetectors", form.smokeDetectors.checked);
            formData.append("toilet", form.toilet.checked);
            formData.append("washerDryer", form.washerDryer.checked);
            formData.append("leaksClogs", form.leaksClogs.checked);
            formData.append("exteriorProperty", form.exteriorProperty.checked);
            formData.append("other", form.other.checked);
            formData.append("description", form.description.value);
            formData.append("note", form.note ? form.note.value : null);
            formData.append("captchaResponse", captchaResponse);

            if (files.length > 0)
                formData.append("file1", files[0]);
            if (files.length > 1)
                formData.append("file2", files[1]);
            if (files.length > 2)
                formData.append("file3", files[2]);

            setIsSubmitting(true);
            sendMaintenanceMail(formData).then((response) => {
                setSubmissionComplete(true);
            }).catch((e) => {
                if (e.response && e.response.data) setSubmissionErrorMessage(e.response.data.message);
                setSubmissionError(true);
            }).finally(() => {
                setIsSubmitting(false);
            });
        }
    }

    return (
        <section className="section-maintenance">
            <div className="container">
                <h2 className="heading"><span className="emphasized">Non-Emergency Maintenance Request Form</span></h2>
                <p>Please use this form for Non-emergency maintenance requests only. If there is a true maintenance
                    emergency, please call us!</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-element">
                        <Input label="Name" name="fullName" icon="user" required/>
                    </div>
                    <div className="form-element">
                        <Input label="Email" name="email" icon="mail" type="email" required/>
                    </div>
                    <div className="form-element">
                        <Input label="Address" name="address" list="address-list" icon="map" required/>
                        <datalist id="address-list">
                            {addresses.map(a => <option key={a} value={a}/>)}
                        </datalist>
                    </div>
                    <div className="form-element">
                        <Input label="Phone" name="phone" type="number" icon="phone" required/>
                    </div>
                    <div className="form-element file-input">
                        <label><p>Upload image(s) of the maintenance issue, if applicable:</p></label>
                        <FileInput name="file" label="Upload" variant="primary" multiple={true} setFiles={setFiles}/>
                    </div>
                    <div className="checkboxes form-element">
                        <label><p>If the maintenance issue you are experiencing is related to any of the items in this
                            list, please select all that apply...</p></label>
                        <Checkbox label="Air Conditioner/Heat/Furnace" name="airconHeatFurnace"/>
                        <Checkbox label="Dishwasher" name="dishwasher"/>
                        <Checkbox label="Electrical" name="electrical"/>
                        <Checkbox label="Garbage Disposal" name="garbageDisposal"/>
                        <Checkbox label="Light Bulbs" name="lightBulbs"/>
                        <Checkbox label="Pests" name="pests"/>
                        <Checkbox label="Smoke Detectors & Fire Extinguishers" name="smokeDetectors"/>
                        <Checkbox label="Toilet" name="toilet"/>
                        <Checkbox label="Washer & Dryer" name="washerDryer"/>
                        <Checkbox label="Water Leaks & Clogs" name="leaksClogs"/>
                        <Checkbox label="Exterior / Property Issue" name="exteriorProperty"/>
                        <Checkbox label="Other" name="other"/>

                    </div>

                    <div className="form-element">
                        <Textarea label="Description" name="description" maxLength={5000}
                                  placeholder="Detailed description of your maintenance issue..." required/>
                    </div>

                    <div className="form-element">
                        <Textarea label="Note" name="note"
                                  placeholder="Please make a note here if there is anything else you would like your maintenance technician to know. IE: Be careful not to let the cat out."
                        />
                    </div>
                    <Captcha setCaptchaResponse={setCaptchaResponse}/>
                    <div className="form-element">
                        {submissionComplete ?
                            <p className="text-success message">Maintenance Request Complete!</p> : ""}
                        {submissionError ?
                            <p className="text-danger message">{submissionErrorMessage}</p> : ""}
                    </div>
                    <div className="form-element form-submit">
                        <Button variant="primary" size="large" type="submit" disabled={submitted}>
                            Submit
                        </Button>
                        {isSubmitting ? <Spinner size="small"/> : ""}
                    </div>
                </form>
            </div>
        </section>
    );
}

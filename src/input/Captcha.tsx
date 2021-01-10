import React, {useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "../assets/form.scss"

export const Captcha: React.FC<CaptchaProps> = ({setCaptchaResponse, error}) => {

    const [isCaptchaValid, setIsCaptchaValid] = useState(true);
    const handleCaptchaChange = (value: string | null) => {
        setIsCaptchaValid(false);
        if (value !== null) {
            setIsCaptchaValid(true);
            setCaptchaResponse(value);
        }
    };
    return (
        <div className="captcha form-element">

            <ReCAPTCHA
                sitekey="6LfibLwZAAAAALSCyZLLwPk-0hV5wmjCjE2F1MCZ"
                onChange={handleCaptchaChange}
            />
            <p className="text-danger" hidden={isCaptchaValid}>Please check the captcha</p>
            {error && error !== "" ? <p className="text-danger">{error}</p> : ""}
        </div>
    );
}

export interface CaptchaProps {

    /**
     * method to set captcha response token to compare with server side integration
     * @param token:  a valid captcha response token
     */
    setCaptchaResponse: (token: string) => void;
    error?: string;
}
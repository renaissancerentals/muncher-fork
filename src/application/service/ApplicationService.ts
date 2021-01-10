import Api from "../../service/Api";
import {RentalApplication} from "../data/RentalApplication";

export const sendRentalApplicationRequest = (message: RentalApplication) => {
    return Api.post("mail/application", message).then(response => response.data);
};

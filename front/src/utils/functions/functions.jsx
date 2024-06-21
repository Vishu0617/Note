import CryptoJS from "crypto-js";
const secret_key = "ABCDEFGHIJKLMNOPQRSTUVWXYX"

export function Dateformater(date) {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    return formattedDate
}

export function NameFormate(user) {
    if (!user || !user.user_metadata) return "Name not available";

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const firstName = capitalizeFirstLetter(user.user_metadata.first_name);
    const lastName = capitalizeFirstLetter(user.user_metadata.last_name);

    const fullName = `${firstName} ${lastName}`;
    return fullName;
}

export function CapitalFirstLater(value) {
    const capitalValue = value.charAt(0).toUpperCase() + value.slice(1)
    return capitalValue
}

export function DateAndTimeFormat(lastSignInAt) {
    const dateObj = new Date(lastSignInAt);
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedLastSignInDateTime = `${formattedDate}, ${formattedTime}`;
    return formattedLastSignInDateTime

}

export const encryptUserData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secret_key).toString();
    return encryptedData;
};

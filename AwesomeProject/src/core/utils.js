import { Platform } from "react-native";
import { Address } from "./api";


const log = (...args) => {
    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        if (typeof arg === 'object') {
            arg = JSON.stringify(arg, null, 2);
        }

        console.log(`[${Platform.OS}]`, arg)
    }
}

function thumbnail(url) {
    if (!url) {
        return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    }

    return `https://` + Address + url
}

export default { log, thumbnail }
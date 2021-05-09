import {dictionary as arabicDictionary} from "../lang/ar.js";
import {dictionary as englishDictionary} from "../lang/en.js";
import {store} from "../state-managment/store.js";

export const trans = (text) => {
    switch (store.getState().language.current ?? 'ar') {
        case "ar":
            return arabicDictionary[text] ?? text;
        case 'en':
            return englishDictionary[text] ?? text;
    }
    return text;
};

export const validateNumber = number => !/^[0-9]$/.test(number);

export const validateDate = date => new Date(date).toString() !== 'Invalid Date';

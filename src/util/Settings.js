import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from "../state-managment/store.js";
import {setLanguage} from "../state-managment/actions/languageActions.js";

export class Settings {
    static language = 'ar';

    static async load() {
        const language = await AsyncStorage.getItem('language');

        if (!language) {
            await AsyncStorage.setItem('language', Settings.language);
        }

        Settings.language = language;
        store.dispatch(setLanguage(Settings.language));
    }

    static async set(key, value) {
        Settings[key] = value;
        AsyncStorage.setItem(key, value);
    }
}

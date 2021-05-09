import {UPDATE_LANGUAGE} from "./states.js";

const initialState = {
    current: 'ar'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_LANGUAGE:
            return {
                ...state,
                current: action.payload
            };
    }

    return state;
}

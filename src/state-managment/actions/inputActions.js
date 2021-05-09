import {UPDATE_INPUT} from "../reducers/states.js";

export function updateInput(input) {
    return function (dispatch) {
        return dispatch({
            type: UPDATE_INPUT,
            payload: input
        });
    };
}

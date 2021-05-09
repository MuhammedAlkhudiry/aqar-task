import {UPDATE_INPUT} from "./states.js";

const initialState = {
        type: null,
        personalFinancingInstallmentAmount: null,
        personalFinancingInstallmentMonths: null,
        salary: null,
        birthdate: null,
        job: null,
        militaryRank: null,
        monthlyObligations: null,
        personalLoanQuestion: null
    }
;

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_INPUT:
            return {
                ...state,
                ...action.payload
            };
    }

    return state;
}

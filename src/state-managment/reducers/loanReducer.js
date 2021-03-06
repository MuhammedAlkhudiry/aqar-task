import {FETCH_LOAN} from "./states.js";

const initialState = {
    data: {
        EligibleLoanAmount: 0,
        AnnualPercentageRate: '',
        EligibleFinancingTenorYears: 0,
        EligibleFinancingTenorMonths: 0,
        MonthlyInstalmentsDuringPersonalFinancingPeriod: 0,
        TenorDuringPersonalFinancingPeriodMonths: 0,
        MonthlyInstalmentsAfterPersonalFinancingMatures: 0,
        TenorAfterPersonalFinancingMonths: 0,
        MonthlyInstalmentsAfterRetirement: 0,
        TenorAfterRetirementMonths: 0,
        ResultDetails: [
            {
                "name_ar": "",
                "name_en": "",
                "installment": 0,
                "months": 0
            },
            {
                "name_ar": "",
                "name_en": "",
                "installment": 0,
                "months": 0
            }
        ]
    },
    errors: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_LOAN:
            return {
                ...state,
                ...action.payload
            };
    }

    return state;
}

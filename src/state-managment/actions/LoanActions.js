import {FETCH_LOAN} from "../reducers/states.js";

export function fetchLoan(input) {
    return async function (dispatch) {
        const response = await fetch('https://dev-v3.aqar.fm/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `{ 
  HomeFinancing {
    AlahliCalculator(
    data: {
        type: ${input.type},
        birth_date: ${new Date(input.birthdate).getTime()},
        job: ${input.job},
        salary: ${input.salary},
        personal_financing_installment_amount: ${input.personalFinancingInstallmentAmount},
        personal_financing_installment_months: ${input.personalFinancingInstallmentMonths}
         }
      ) {
      EligibleLoanAmount
      AnnualPercentageRate
      EligibleFinancingTenorYears
      EligibleFinancingTenorMonths
      MonthlyInstalmentsDuringPersonalFinancingPeriod
      TenorDuringPersonalFinancingPeriodMonths
      MonthlyInstalmentsAfterPersonalFinancingMatures
      TenorAfterPersonalFinancingMonths
      MonthlyInstalmentsAfterRetirement
      TenorAfterRetirementMonths
      ResultDetails {
        name_ar
        name_en
        installment
        months
      }
    }
  }
}`,
            }),
        });

        const responseJson = await response.json();

        return dispatch({
            type: FETCH_LOAN,
            payload: {
                data: responseJson.data?.HomeFinancing?.AlahliCalculator,
                errors: responseJson.errors ?? [],
            }
        });
    };
}

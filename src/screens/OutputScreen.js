import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import LocalizedText from "../components/LocalizedText.js";
import HR from "../components/HR.js";
import {trans} from "../util/helpers.js";

function OutputScreen() {
    // a hack to force rendering when language changes
    const language = useSelector(state => state.language.current);

    const loan = useSelector(state => state.loan.data);
    const input = useSelector(state => state.input);
    const errors = useSelector(state => state.loan.errors);

    console.log(!!errors.length);
    const calculatedLoan = useMemo(() => {
            if (errors.length) {
                return 0;
            }
            return (loan.MonthlyInstalmentsDuringPersonalFinancingPeriod *
                loan.TenorDuringPersonalFinancingPeriodMonths) +
                (loan.MonthlyInstalmentsAfterPersonalFinancingMatures *
                    loan.TenorAfterPersonalFinancingMonths) +
                (loan.MonthlyInstalmentsAfterRetirement * loan.TenorAfterRetirementMonths);
        },
        [loan, input]);

    return <SafeAreaView style={{padding: 5}}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
                <LocalizedText style={styles.title} text="alahli_calc_title"/>
                {errors.length ?
                <View style={styles.errorMessage}>
                    {
                        errors.map((error, index) => <Text key={index} style={{color: 'white', textAlign: 'right'}}>{error.message}</Text>)
                    }
                </View> : null
                }
                {errors.length === 0 &&
                <View>
                    <View style={styles.inputFormContainer}>
                        <View style={styles.inputContainer}>
                            <LocalizedText text="alahli_calc_redf_qualified"/>
                            <Text>{trans(input.type)}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <LocalizedText text="alahli_calc_birthdate"/>
                            <Text>{input.birthdate?.toDateString()}</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <LocalizedText text="alahli_calc_job"/>
                            <Text>{trans(input.job)}</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <LocalizedText text="alahli_calc_job_military_rank"/>
                            <Text>{trans(input.militaryRank)}</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <LocalizedText text="alahli_calc_personal_loan_question"/>
                            <Text>{trans(input.personalLoanQuestion)}</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <LocalizedText text="alahli_calc_salary"/>
                            <Text>{input.salary}</Text>
                        </View>

                        <View style={{...styles.inputContainer, ...{width: '100%'}}}>
                            <LocalizedText text="alahli_calc_obligation"/>
                            <Text>{input.monthlyObligations}</Text>
                        </View>
                    </View>
                    <HR/>
                    <View style={styles.inputFormContainer}>
                        <View style={{...styles.inputContainer, ...{width: '100%'}}}>
                            <LocalizedText text="alahli_calc_output_eligible_loan_amount"/>
                            <Text>{`${loan.EligibleLoanAmount} ريال`}</Text>
                        </View>
                        <View style={{...styles.inputContainer, ...{width: '100%'}}}>
                            <LocalizedText text="alahli_calc_output_total_loan_cost"/>
                            <Text>{`${calculatedLoan} ${language === 'ar' ? 'ريال' : 'Riyal'}`}</Text>
                        </View>
                        <View style={{...styles.inputContainer, ...{width: '100%'}}}>
                            <LocalizedText text="alahli_calc_output_eligible_financing_tenor_years"/>
                            <Text>{`${loan.EligibleFinancingTenorYears} ${language === 'ar' ? 'سنة' : 'Years'}`}</Text>
                        </View>
                        <View style={{...styles.inputContainer, ...{width: '100%'}}}>
                            <LocalizedText text="alahli_calc_output_eligible_financing_tenor_months"/>
                            <Text>{`${loan.EligibleFinancingTenorMonths} ${language === 'ar' ?
                                'شهر' :
                                'months'}`}</Text>
                        </View>
                    </View>

                    <View style={styles.inputFormContainer}>
                        <View style={{...styles.inputContainer, ...{width: '30%'}}}></View>
                        <View style={{...styles.inputContainer, ...{width: '30%'}}}>
                            <LocalizedText text="alahli_calc_output_with_personal_financing"/>
                        </View>
                        <View style={{...styles.inputContainer, ...{width: '30%'}}}>
                            <LocalizedText text="alahli_calc_output_after_personal_financing_expired"/>
                        </View>

                        <View style={{...styles.inputContainer, ...{width: '30%'}}}>
                            <LocalizedText text="alahli_calc_output_result_details_installment_key"/>
                        </View>
                        <View style={{...styles.inputContainer, ...{width: '30%'}}}>
                            <Text>{loan.ResultDetails[0]?.installment}</Text>
                        </View>
                        <View style={{...styles.inputContainer, ...{width: '30%'}}}>
                            <Text>{loan.ResultDetails[1]?.installment}</Text>
                        </View>

                        <View style={{...styles.inputContainer, ...{width: '30%'}}}>
                            <LocalizedText text="alahli_calc_output_result_details_months_key"/>
                        </View>
                        <View style={{...styles.inputContainer, ...{width: '30%'}}}>
                            <Text>{loan.ResultDetails[0]?.months}</Text>
                        </View>
                        <View style={{...styles.inputContainer, ...{width: '30%'}}}>
                            <Text>{loan.ResultDetails[1]?.months}</Text>
                        </View>
                    </View>
                </View>
                }
                <LocalizedText text="alahli_calc_output_disclaimer"/>
            </View>
        </ScrollView>
    </SafeAreaView>;
}

const styles = StyleSheet.create({
    inputFormContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        margin: 10,
        backgroundColor: '#e5e5e5',
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    inputContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        width: '40%',
    },
    input: {
        height: 40,
        margin: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#333',
        padding: 10
    },
    errorMessage: {
        padding: 10,
        margin: 10,
        backgroundColor: 'red',
        borderRadius: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
});

export default OutputScreen;

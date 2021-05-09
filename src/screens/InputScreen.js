import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useRef, useState} from "react";
import {DatePicker} from "../form/DatePicker.js";
import {JOBS, MILITARY_RANKS, TYPES, YES_OR_NO} from "../types.js";
import LocalizedText from "../components/LocalizedText.js";
import {RadioButtons} from "../form/RadioButtons.js";
import {trans, validateDate, validateNumber} from "../util/helpers.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchLoan} from "../state-managment/actions/LoanActions.js";
import HR from "../components/HR.js";
import {updateInput} from "../state-managment/actions/inputActions.js";


function InputScreen({navigation}) {
    // a hack to force rendering when language changes
    useSelector(state => state.language.current);

    const scrollRef = useRef();
    const dispatch = useDispatch();

    const [type, setType] = useState(null);
    const [personalFinancingInstallmentAmount, setPersonalFinancingInstallmentAmount] = useState(null);
    const [personalFinancingInstallmentMonths, setPersonalFinancingInstallmentMonths] = useState(null);
    const [personalLoanQuestion, setPersonalLoanQuestion] = useState(null);
    const [salary, setSalary] = useState(null);
    const [birthdate, setBirthdate] = useState(new Date());
    const [job, setJob] = useState(null);
    const [militaryRank, setMilitaryRank] = useState(null);
    const [monthlyObligations, setMonthlyObligations] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        if (!validateInput()) {
            scrollRef.current?.scrollTo({y: 0, animated: true});
            return false;
        }

        setErrorMessage('');

        dispatch(fetchLoan({
            type, personalFinancingInstallmentAmount,
            personalFinancingInstallmentMonths,
            birthdate, job, salary
        }));

        dispatch(updateInput({
            type, personalFinancingInstallmentAmount,
            personalFinancingInstallmentMonths, salary, birthdate, job,
            militaryRank, monthlyObligations, personalLoanQuestion
        }));

        navigation.navigate('Output');

    };

    const validateInput = () => {
        const mapFieldsToName = {
            type: {state: type, name: trans('alahli_calc_redf_qualified')},
            personalFinancingInstallmentAmount: {
                state: personalFinancingInstallmentAmount,
                name: trans('personal_financing_installment_amount')
            },
            personalFinancingInstallmentMonths: {
                state: personalFinancingInstallmentMonths,
                name: trans('personal_financing_installment_months')
            },
            salary: {state: salary, name: trans('alahli_calc_salary')},
            birthdate: {state: birthdate, name: trans('alahli_calc_birthdate')},
            job: {state: job, name: trans('alahli_calc_job')},
            militaryRank: {state: militaryRank, name: trans('alahli_calc_job_military_rank')},
            monthlyObligations: {state: monthlyObligations, name: trans('alahli_calc_obligation')},
            personalLoanQuestion: {state: personalLoanQuestion, name: trans('alahli_calc_personal_loan_question')}
        };

        const emptyFields = Object.values(mapFieldsToName)
                                  .filter(({state}) => !state)
                                  .map(({name}) => name);

        if (emptyFields.length) {
            setErrorMessage(` هذه القيم خالية ويجب تحديدها: \r\n ${emptyFields.join("\r\n")}`);
            return false;
        }

        if (!validateDate(birthdate)) {
            setErrorMessage('تاريخ الميلاد غير صحيح');
            return false;
        }

        if (!validateNumber(salary)) {
            setErrorMessage('الدخل الشهري يجب أن يكون رقما');
            return false;
        }

        if (!validateNumber(monthlyObligations)) {
            setErrorMessage('الالتزامات الشهرية يجب أن تكون رقما');
            return false;
        }

        return true;
    };

    return <SafeAreaView style={{padding: 5}}>
        <ScrollView ref={scrollRef} contentInsetAdjustmentBehavior="automatic">
            <View>
                <LocalizedText style={styles.title} text="alahli_calc_title"/>
                {errorMessage !== '' &&
                <View style={styles.errorMessage}>
                    <Text style={{color: 'white', textAlign: 'right'}}>
                        {errorMessage}
                    </Text>
                </View>}

                <LocalizedText text="alahli_calc_redf_qualified"/>
                <RadioButtons itemsProp={TYPES} value={type} setValue={setType}/>

                <HR/>

                <LocalizedText text="alahli_calc_personal_loan_question"/>
                <RadioButtons itemsProp={YES_OR_NO} value={personalLoanQuestion} setValue={setPersonalLoanQuestion}/>

                <HR/>

                <LocalizedText text="personal_financing_installment_amount"/>
                <TextInput style={styles.input}
                           value={personalFinancingInstallmentAmount}
                           onChangeText={setPersonalFinancingInstallmentAmount}/>

                <LocalizedText text="personal_financing_installment_months"/>
                <TextInput style={styles.input}
                           value={personalFinancingInstallmentMonths}
                           onChangeText={setPersonalFinancingInstallmentMonths}/>

                <HR/>

                <LocalizedText text="alahli_calc_birthdate"/>
                <DatePicker date={birthdate} setDate={setBirthdate}/>

                <HR/>

                <LocalizedText text="alahli_calc_job"/>
                <RadioButtons itemsProp={JOBS} value={job} setValue={setJob}/>

                <HR/>

                <LocalizedText text="alahli_calc_job_military_rank"/>
                <RadioButtons itemsProp={MILITARY_RANKS} value={militaryRank} setValue={setMilitaryRank}/>

                <HR/>

                <LocalizedText text="alahli_calc_salary"/>
                <TextInput style={styles.input} onChangeText={setSalary} value={salary}/>

                <LocalizedText text="alahli_calc_obligation"/>
                <TextInput style={styles.input} onChangeText={setMonthlyObligations} value={monthlyObligations}/>

                <HR/>

                <Button onPress={handleSubmit} title={trans('alahli_calc_calculate_button')}/>
            </View>
        </ScrollView>
    </SafeAreaView>;
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 15,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#aaa',
        padding: 10,
        backgroundColor: '#fdfdfd'
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
    }
});

export default InputScreen;

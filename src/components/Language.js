import {Button, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "../state-managment/actions/languageActions.js";

export default function Language() {
    const language = useSelector(state => state.language.current ?? 'ar');
    const dispatch = useDispatch();

    return (
        <View style={{flexDirection: "row", justifyContent: "flex-end", backgroundColor: '#f2f2f2'}}>
            <View style={{margin: 5}}>
                <Button color={language === 'ar' ? '#333' : '#aaa'} title='ar' onPress={() => dispatch(setLanguage('ar'))}/>
            </View>
            <View style={{margin: 5, backgroundColor: language === 'en' ? 'blue' : 'gray'}}>
                <Button color={language === 'en' ? '#333' : '#aaa'} title='en' onPress={() => dispatch(setLanguage('en'))}/>
            </View>
        </View>
    );
}

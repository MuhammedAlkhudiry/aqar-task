import {Text, View} from "react-native";
import React from "react";
import {trans} from "../util/helpers.js";

export default function LocalizedText({text, style}) {
    return <View style={{padding: 10}}>
        <Text style={{...style, marginTop: 5, marginBottom: 5}}>{trans(text)}</Text>
    </View>;
};

import React from "react";
import {View} from "react-native";
import RadioForm from "react-native-simple-radio-button";

export const RadioButtons = ({itemsProp, value, setValue}) => {
    return (
        <View style={{display: "flex",flexDirection:"row", justifyContent: "center", flexWrap:"wrap"}}>
            <RadioForm radio_props={itemsProp}
                       initial={value}
                       onPress={setValue}
                       formHorizontal={true}
                       labelHorizontal={false}
            />
        </View>
    );
};

import React, {useState} from 'react';
import {Button, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = ({date, setDate}) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("تاريخ الميلاد");

    const onChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate ?? date);
        setTitle(selectedDate.toDateString());
    };

    return (
        <View style={{zIndex: -1}}>
            <View>
                <Button onPress={() => setShow(true)} title={title}/>
            </View>
            {show && (<DateTimePicker value={date}
                                      display="default"
                                      onChange={onChange}/>
            )}
        </View>
    );
};


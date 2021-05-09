import React from 'react';
import {StyleSheet, View} from 'react-native';


export default function HR() {
    return (
        <View style={styles.container}>
            <View style={styles.hr} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    hr: {
        backgroundColor: '#aaa',
        height: 1,
        width: 350
    },
});

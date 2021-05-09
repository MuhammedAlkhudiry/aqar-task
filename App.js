import React, {useEffect, useState} from 'react';
import InputScreen from "./src/screens/InputScreen.js";
import {Provider, useDispatch} from "react-redux";
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OutputScreen from "./src/screens/OutputScreen.js";
import {Settings} from "./src/util/Settings.js";
import {store} from "./src/state-managment/store.js";
import Language from "./src/components/Language.js";


const Tab = createBottomTabNavigator();


const App: () => Node = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            if (!isLoaded) {
                await Settings.load();
                setIsLoaded(true);
            }
        })();
    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Language/>
                <Tab.Navigator initialRouteName="Input">
                    <Tab.Screen name="Input" component={InputScreen}/>
                    <Tab.Screen name="Output" component={OutputScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
};


export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../LoginScreen";
import LoginRegisterScreen from "../LoginRegisterScreen";
import SignupScreen from "../SignupScreen";

const Stack = createStackNavigator()

const SignOutStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={SignupScreen} />
            </Stack.Navigator>
        </NavigationContainer >
    )
};

export default SignOutStack;   
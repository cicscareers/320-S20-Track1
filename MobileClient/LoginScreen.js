import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

export default function LoginScreen() {
    Feather.loadFont();
    const press = false;
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [icon, setIcon] = useState("eye-off");

    function handlePress() {
        setIcon(passwordVisible ? "eye" : "eye-off");
        setPasswordVisible(!passwordVisible);
    }

    function loginPress() {
        if (credentials.email.length === 0 || credentials.password.length === 0) {
            //disable the button but how?
        }
    }

    return (
        <View style={styles.container}>

            <Image source={require('./images/reachoutLogo.png')} style={{ width: 210, height: 210 }} />

            <View style={styles.action}><TextInput style={styles.input} placeholder={"Email"} keyboardType={'email-address'} placeholderTextColor='grey' />
            </View>
            <View style={styles.action}><TextInput style={styles.input} placeholder={"Password"} secureTextEntry={passwordVisible} placeholderTextColor='grey' />
                <TouchableOpacity onPress={handlePress}>
                    <Feather style={styles.icons}
                        name={icon}
                        color="grey"
                        size={20}
                    />
                </TouchableOpacity>

            </View>
            <TouchableOpacity style={styles.loginButton} onPress={loginPress} disabled={press}>
                <Text style={styles.text}>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.passwordContainer}>
                <Text style={styles.passwordText}>
                    Forgot Password
                </Text>
            </TouchableOpacity>
            {/* <ForgotPass title={"Forgot Password?"} onPress={() => { }} /> */}
            <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signupText}>
                    Don't have an account? Sign Up
                </Text>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButton: {
        marginTop: 20,
        marginBottom: 10,
        padding: 18,
        backgroundColor: 'maroon',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        shadowColor: 'rgba(0,0,0, .8)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 2, //IOS
        elevation: 2 // Android
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    icons: {
        marginTop: 20
    },
    input: {
        fontFamily: 'OpenSans-Light',
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        backgroundColor: 'white',
        width: '100%',
        fontSize: 14,
        color: "black"
    },
    text: {
        fontFamily: 'OpenSans-Light',
        fontWeight: '500',
        color: 'white',
        fontSize: 17,
    },
    signupButton: {
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    signupText: {
        textAlign: 'left',
        fontFamily: 'OpenSans-Light',
        fontWeight: '500',
        color: 'maroon',
        fontSize: 17,

    },
    passwordContainer: {

        borderRadius: 8,
        width: "100%"
    },
    passwordText: {
        padding: 5,
        textAlign: 'right',
        fontFamily: 'OpenSans-Light',
        fontWeight: '500',
        color: 'maroon',
        fontSize: 15,
    }

});

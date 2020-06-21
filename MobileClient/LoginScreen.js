import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from 'react-native-vector-icons/Feather';

export default function LoginScreen() {
    Icon.loadFont();

    return (
        <View style={styles.container}>

            <Image source={require('./images/reachoutLogo.png')} style={{ width: 210, height: 210 }} />

            <View style={styles.action}><TextInput style={styles.input} placeholder={"Email"} keyboardType={'email-address'} />
            </View>
            <View style={styles.action}><TextInput style={styles.input} placeholder={"Password"} secureTextEntry />
                <Feather style={styles.icons}
                    name="eye-off"
                    color="grey"
                    size={20}
                />

            </View>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.text}>
                    LOGIN
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.passwordContainer}>
                <Text style={styles.passwordText}>
                    FORGOT PASSWORD
                </Text>
            </TouchableOpacity>
            {/* <ForgotPass title={"Forgot Password?"} onPress={() => { }} /> */}
            <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signupText}>
                    DON'T HAVE AN ACCOUNT? SIGN UP?
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
        fontSize: 16,
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
        fontSize: 14,

    },
    passwordContainer: {

        borderRadius: 8,
        width: "100%"
    },
    passwordText: {
        textAlign: 'right',
        fontFamily: 'OpenSans-Light',
        fontWeight: '500',
        color: 'maroon',
        fontSize: 13,

    }

});

import React from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

export default function SignupScreen() {

    return (
        <View style={styles.container}>
            <Image source={require('./images/reachoutLogo.png')} style={{ width: 210, height: 210 }} />
            <Text style={styles.studentText}>
                Student Account
            </Text>
            <View style={styles.action}><TextInput style={styles.input} placeholder={"First Name"} placeholderTextColor='grey' />
            </View>
            <View style={styles.action}><TextInput style={styles.input} placeholder={"Last Name"} placeholderTextColor='grey' />
            </View>
            <View style={styles.action}><TextInput style={styles.input} placeholder={"Email"} keyboardType={'email-address'} placeholderTextColor='grey' />
            </View>
            <View style={styles.action}><TextInput style={styles.input} placeholder={"Password"} secureTextEntry placeholderTextColor='grey' />
                <Feather style={styles.icons}
                    name="eye-off"
                    color="grey"
                    size={20}
                />

            </View>
            <View style={styles.action}><TextInput style={styles.input} placeholder={"Confirm Password"} placeholderTextColor='grey' />
                <Feather style={styles.icons}
                    name="eye-off"
                    color="grey"
                    size={20}
                />
            </View>
            <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signupText}>
                    CREATE ACCOUNT
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.passwordContainer}>
                <Text style={styles.passwordText}>

                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.supporterButton}>
                <Text style={styles.supporterText}>
                    REQUEST SUPPORTER ACCOUNT
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
    signupButton: {
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
    signupText: {
        fontFamily: 'OpenSans-Light',
        fontWeight: '500',
        color: 'white',
        fontSize: 16,
    },
    supporterButton: {
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    supporterText: {
        textAlign: 'left',
        fontFamily: 'OpenSans-Light',
        fontWeight: '500',
        color: 'maroon',
        fontSize: 15,

    },
    studentText: {
        padding: 20,
        fontFamily: 'OpenSans-Light',
        fontSize: 18,
        color: 'maroon',
        fontWeight: '500'
    }

});

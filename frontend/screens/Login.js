import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";

import Theme from '../styles/theme'

const logo = "https://cdn-icons-png.flaticon.com/512/205/205916.png"
import { Picker } from "@react-native-picker/picker";


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user : null
        }
    }
    render() {

        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={{uri:logo}} style={styles.img}></Image>
                    <Text style={styles.text}>Helping Hands</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <ScrollView>
                        <Text style={{ fontSize: Theme.font.medium }}>Username/Phone Number</Text>
                        <TextInput style={styles.inputContainer} placeholder="Enter Here" />
                        <View style={styles.divider} />
                        <Text style={{ fontSize: Theme.font.medium }}>Password</Text>
                        <TextInput secureTextEntry={true} style={styles.inputContainer} placeholder="Enter Here" />
                        <View style={styles.divider} />
                        <Text style={{ fontSize: Theme.font.medium }}>User Type</Text>
                        <View style={styles.inputContainerNoPad}>
                        <Picker
                            selectedValue={this.state.user}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({user : itemValue})
                            }
                            mode="dropdown" // Android only
                        >
                            <Picker.Item label="Blood Donors" value="bd" />
                            <Picker.Item label="Blood Receivers" value="br" />
                        </Picker>
                     </View>
                     </ScrollView>

                    
                </View>
                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}  style={styles.mainbtn}>
                        <Text style={{ color: Theme.white, fontWeight: 'bold' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.secondaryBtn}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    footerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: 120,
        width: 120
    },
    text: {
        fontSize: Theme.font.extralarge
    },
    inputContainer: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#e6e6e6',
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 3
    },
    inputContainerNoPad: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#e6e6e6',
        marginTop: 10,
        paddingHorizontal: 20,
        borderRadius: 3
    },
    divider: {
        height: 30
    },
    mainbtn: {
        width: '90%',
        height: 55,
        backgroundColor: Theme.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryBtn: {
        width: '90%',
        height: 55,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        marginTop: 10
    }

});
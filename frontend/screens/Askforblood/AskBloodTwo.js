import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from "react-native";

import Theme from '../../styles/theme'

import { Picker } from "@react-native-picker/picker";



class BloodTwo extends React.Component {

    constructor(props){
        super(props);
        this.state={
            group:null
        }
    }

    render() {

        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.logoContainer}>
                    <Text style={styles.text}>Get Well Soon!</Text>
                    <Text style={{marginTop:10,color:'grey'}}>Blood Banks Near You That Fit Your Reservation Criteria :</Text>
                </View>



                <View style={styles.bodyContainer}>

                    <Text style={{ fontSize: Theme.font.medium }}>Please Choose:</Text>

                    <View style={styles.inputContainer}>
                    <Picker
                        selectedValue={this.state.group}
                        onValueChange={(value) => this.setState({group: value})}
                        mode="dropdown" // Android only
                    >
                        <Picker.Item label="Select Blood Group" value="Unknown" />
                        <Picker.Item label="Red Blood Bank" value="1" />
                        <Picker.Item label="Yellow Hospital" value="2" />
                        <Picker.Item label="Blue Hospital" value="3" />
                    </Picker>
                    </View>

                    <View style={styles.divider} />

                </View>



                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}  style={styles.mainbtn}>
                        <Text style={{ color: Theme.white, fontWeight: 'bold' }}>Proceed</Text>
                    </TouchableOpacity>
                </View>



            </SafeAreaView>
        );
    }
}
export default BloodTwo;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white
    },
    logoContainer: {
        flex: 0.3,
        justifyContent: 'center',
        paddingHorizontal:20
    },
    bodyContainer: {
        flex: 0.5,
        paddingHorizontal: 20
    },
    footerContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        backgroundColor: 'black',
        height: 120,
        width: 120
    },
    text: {
        fontSize: 24,

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
        paddingHorizontal: 10,
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




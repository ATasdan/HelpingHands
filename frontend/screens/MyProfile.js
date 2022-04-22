import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native";

import Theme from '../styles/theme'
import { Picker } from "@react-native-picker/picker";
import DatePicker from 'react-native-date-picker'

class B1 extends React.Component {

    constructor(props){
        super(props);
        this.state={
            group:null
        }
    }

    render() {

        const { navigation,group } = this.props;

        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.logoContainer}>
                   <View style={{flexDirection:'row'}}>
                   <View style={styles.img}>

                    </View>
                   <View style={{alignItems:'center'}}>
                   <Text style={styles.text}>My Profile!</Text>
                   <TouchableOpacity>
                   <Text style={{textDecorationLine:'underline',paddingLeft:25}}>Change Profile Picture</Text></TouchableOpacity>
                   </View></View>
                </View>



                <View style={styles.bodyContainer}>
                <ScrollView>

                    <Text style={{ fontSize: Theme.font.medium }}>Name</Text>
                    <TextInput style={styles.inputContainer} value="Your name Editable here" />

                    <View style={styles.divider} />

                    <Text style={{ fontSize: Theme.font.medium }}>Phone number</Text>
                    <TextInput keyboardType="numeric" style={styles.inputContainer} value="+89512585890"  />

                    
                    <View style={styles.divider} />
                    <Text style={{ fontSize: Theme.font.medium }}>Email</Text>
                    <TextInput keyboardType="numeric" style={styles.inputContainer} value="amdasm@gmail.com"  />

                    

                    <View style={styles.divider} />
                    

                    <Text style={{ fontSize: Theme.font.medium }}>Address</Text>
                    <TextInput multiline={true} keyboardType="numeric" style={styles.inputContainerBig} value="2151254 Street this is the test name , Blade mail, bloodseeker, this is the best address you can ever find"  />


                    <View style={styles.divider} />
                    
                    <Text style={{ fontSize: Theme.font.medium }}>Blood Type</Text>
                    <View style={styles.inputContainerNoPad}>
                    <Picker
                        selectedValue={this.state.group}
                        onValueChange={(value, index) => this.setState({group: value})}
                        mode="dropdown" // Android only
                    >
                        <Picker.Item label="Select Blood Group" value="Unknown" />
                        <Picker.Item label="A+" value="A+" />
                        <Picker.Item label="O" value="O" />
                        <Picker.Item label="O+" value="O+" />
                        <Picker.Item label="A-" value="A-" />
                        <Picker.Item label="B" value="B" />
                    </Picker>
                    </View>
</ScrollView>

                </View>




                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}  style={styles.mainbtn}>
                        <Text style={{ color: Theme.white, fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>
                </View>



            </SafeAreaView>
        );
    }
}
export default B1;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white
    },
    logoContainer: {
        flex: 0.3,
        justifyContent: 'center',
        paddingHorizontal:20 ,
        justifyContent:'center'
    },
    bodyContainer: {
        flex: 0.6,
        paddingHorizontal: 20,

    },
    footerContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        backgroundColor: 'grey',
        height: 80,
        width: 80,
        borderRadius:50
    },
    text: {
        fontSize: 24,
        paddingHorizontal:20
    },
    inputContainerBig: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#e6e6e6',
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 100,
        borderRadius: 3,
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




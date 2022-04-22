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

import Theme from '../../styles/theme'
import { Picker } from "@react-native-picker/picker";

class B1 extends React.Component {


    render() {

        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>


                     <View style={styles.logoContainer}>
                        <View style={{flexDirection:'row'}}>
                        <View style={styles.img}>
                    </View>
                        <View>
                        <Text style={styles.text}>Teams</Text>
                        <TouchableOpacity>
                        <Text style={{textDecorationLine:'underline',paddingLeft:25}}>Change Profile Picture</Text></TouchableOpacity>
                        </View>
                   </View>
                </View>



                <View style={styles.bodyContainer}>
                <ScrollView>

                    <Text style={{ fontSize: Theme.font.medium }}>Team Name:</Text>
                    <TextInput style={styles.inputContainer} placeholder="Your name Editable here" />

                    <View style={styles.divider} />

                    <Text style={{ fontSize: Theme.font.medium }}>Number of Members:</Text>
                    <TextInput keyboardType="numeric" style={styles.inputContainer} placeholder="25"  />

                    <View style={styles.divider} />

                
                    <Text style={{ fontSize: Theme.font.medium }}>Level : 1</Text>

                    
                    </ScrollView>

                </View>


                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}  style={styles.mainbtn}>
                        <Text style={{ color: Theme.white, fontWeight: 'bold' }}>Create</Text>
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




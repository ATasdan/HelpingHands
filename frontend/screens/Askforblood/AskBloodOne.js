import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform
} from "react-native";

import Theme from '../../styles/theme'
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';



const B1 = ()=> {
    const navigation = useNavigation();
    const [group, setgroup] = useState();
    const [units, setunits] = useState();
    const [date, setdate] = useState(new Date());
    const [mode, setmode] = useState('date');
    const [show, setshow] = useState(false);
    const [text, settext] = useState('PICK DATE');

    const showMode = (currentMode) =>{
        setshow(true);
        setmode(currentMode)
    }

    const onChange =(event,selectedDate)=> {
        const currentDate = selectedDate || date;
        setshow(Platform.OS ==='ios');
        setdate(currentDate)

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' +(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes' + tempDate.getMinutes();

        settext(fDate)
    }


        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.logoContainer}>
                    <Text style={styles.text}>Get Well Soon!</Text>
                </View>



                <View style={styles.bodyContainer}>

                <ScrollView>

                    <Text style={{ fontSize: Theme.font.medium }}>Name</Text>
                    <TextInput style={styles.inputContainer} value="Your name Editable here" />

                    <View style={styles.divider} />

                    <Text style={{ fontSize: Theme.font.medium }}>Phone number</Text>
                    <TextInput keyboardType="numeric" style={styles.inputContainer} value="+89512585890"  />

                    <View style={styles.divider} />

                    <Text style={{ fontSize: Theme.font.medium }}>Date</Text>
                    <TouchableOpacity onPress={()=> showMode('date')}  style={styles.inputContainer}>
                        {show && <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} display="default" onChange={onChange} />}
                        <Text>{text}</Text>
                    </TouchableOpacity>

                                    
                    <View style={styles.divider} />

                    <Text style={{ fontSize: Theme.font.medium }}>Blood Type Needed</Text>
                    <View style={styles.inputContainerNoPad}>
                    <Picker
                        selectedValue={group}
                        onValueChange={(itemValue, itemIndex) =>
                            setgroup(itemValue)
                          }
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

                    
                    <View style={styles.divider} />
                    <Text style={{ fontSize: Theme.font.medium }}>Number of Units Needed</Text>
                    <View style={styles.inputContainerNoPad}>
                   <Picker
                        selectedValue={units}
                        onValueChange={(itemValue, itemIndex) =>
                            setunits(itemValue)
                          }
                       
                    >
                        <Picker.Item label="Select One" value="Unknown" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                    </Picker>
                     
                    </View>

                  


                    </ScrollView>

                </View>



                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('AskBloodTwo')}  style={styles.mainbtn}>
                        <Text style={{ color: Theme.white, fontWeight: 'bold' }}>Proceed</Text>
                    </TouchableOpacity>
                </View>



            </SafeAreaView>
        );
    }

export default B1;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white
    },
    logoContainer: {
        flex: 0.15,
        justifyContent: 'center',
        paddingHorizontal:20,
    },
    bodyContainer: {
        flex:0.8,
        paddingHorizontal: 20,
        justifyContent:'center',
    },
    footerContainer: {
        flex: 0.1,
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
        paddingVertical: 15,
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




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
import StepIndicator from 'react-native-step-indicator';

//https://www.npmjs.com/package/react-native-step-indicator Kindly refer to the library to integrate your backend with the component


const labels = ["You succesfully Donated Blood","Your Blood Units are being processed","Your Blood Units are in storage","Congratulations! Your blood unit was transferred"];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:25,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Theme.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: Theme.primary,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Theme.primary,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Theme.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Theme.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 14,
  currentStepLabelColor: Theme.primary,
  labelAlign: "flex-start"
}
 


function BJ ({ route, navigation }) {

    const { date } = route.params;

        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.logoContainer}>
                    <Text style={styles.text}>My Blood Journey!</Text>
                    <Text>Your Blood Donation in : {date} </Text>
                </View>



                <View style={styles.bodyContainer}>

                    <StepIndicator
                        customStyles={customStyles}
                        labels={labels}
                        direction="vertical"
                        stepCount={4}
                    />
                </View>



            </SafeAreaView>
        );
    
}

export default BJ;


const Item = ({ date }) => (
    <View style={styles.item}>

      <View>
      <Text>You Donated Blood In:</Text>
      <Text style={styles.date}>{date}</Text>
      </View>
      <TouchableOpacity style={styles.minibtn}>
          <Text style={{color:'#fff'}}>View</Text>
      </TouchableOpacity>
    </View>
  );



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white
    },
    date:{
        color:Theme.primary
    },
    logoContainer: {
        flex: 0.2,
        justifyContent: 'center',
        paddingHorizontal:20,
        paddingTop:20
    },
    bodyContainer: {
        flex: 0.8,
        paddingHorizontal: 20,
        alignItems:'center',
        marginBottom:60
    },
    img: {
        backgroundColor: 'black',
        height: 120,
        width: 120
    },
    text: {
        fontSize: 24,
    },

    divider: {
        height: 30
    },



});




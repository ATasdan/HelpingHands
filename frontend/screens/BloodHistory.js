import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from "react-native";

import Theme from '../styles/theme'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      date: '4-2-2020',
      desc:'You received 2 uits of blood type A+ from Yellow Hospital',
      dono:false
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      date: '14-2-2021',
      desc:'You donated 1 unit of blood to Red Hospital',
      dono:true
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      date: '25-2-2022',
      desc:'You donated 1 unit of blood to Blue Hospital',
      dono:true
    },
    {
        id: 'bd7acbea',
        date: '4-2-2020',
        desc:'You received 2 uits of blood type A+ from Yellow Hospital',
        dono:false
      },
  ];


class BJ extends React.Component {

    render() {

        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.logoContainer}>
                    <Text style={styles.text}>My Blood History!</Text>
                    <Text style={{marginTop:10,color:'grey'}}>Please make sure to wait atleast 56 days between whole blood donations.</Text>
                </View>



                <View style={styles.bodyContainer}>

                <FlatList
                    data={DATA}
                    renderItem={({ item,desc,dono }) => (
                        <View style={{...styles.item, ...{backgroundColor: item.dono == true ? '#fce0de' : Theme.seconadry}}}>
                        <View>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text>{item.desc}</Text>
                        </View>
                      </View>
                      )
                    }
                    keyExtractor={item => item.id}
                />


                </View>



            </SafeAreaView>
        );
    }
}
export default BJ;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white
    },
    item:{
        backgroundColor:Theme.seconadry,
        height:75,
        borderRadius:5,
        width:'100%',
        marginTop:15,
        paddingHorizontal:20,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    minibtn:{
        backgroundColor:Theme.primary,
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:5
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
        paddingHorizontal: 20
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




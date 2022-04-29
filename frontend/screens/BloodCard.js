import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ImageBackground
} from "react-native";

import Theme from '../styles/theme'

const bloodbg = require('../images/bloodcard.png')


const DATA = [
    {
      id: '1',
      members: '5',
      teamName:'Focus Team',
      level: 1,
      full : false
    },

  ];


class BJ extends React.Component {

    render() {

        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.logoContainer}>
                    <Text style={styles.text}>My Blood Card!</Text>
                    <TouchableOpacity style={styles.secondaryBtn}>
                        <Text style={{color:'grey'}}>SAVE</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.bodyContainer}>

                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <ImageBackground source={bloodbg} style={{width:'95%',height:'95%',justifyContent:'flex-end'}}>
                                   <View style={{marginBottom:25}}>
                                   <Text style={{color:'#fff',fontSize:18}}>Name</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#fff',fontSize:16}}>Donor #</Text>
                                        <Text style={{color:'#fff',fontSize:16,marginLeft:50}}>Group+</Text>
                                    </View>
                                    <Text style={{color:'#fff',fontSize:16}}>Blood Type</Text>
                                   </View>
                            </ImageBackground>
                          
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
        backgroundColor:Theme.primary,
        height:222,
        borderRadius:5,
        width:'100%',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    minibtn:{
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:5,
        marginLeft:20
    },  
    date:{
        color:Theme.primary
    },
    logoContainer: {
        flex: 0.3,
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
        width: '100%',
        height: 55,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        marginTop: 10
    }

});




import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";

import Theme from '../../styles/theme'

const DATA = [
    {
      id: '1',
      members: '5',
      teamName:'Focus Team',
      level: 1,
      full : false
    },
    {
        id: '2',
        members: '15',
        teamName:'Av Team',
        level: 1,
        full : true
      },
      {
        id: '3',
        members: '55',
        teamName:'Empire Team',
        level: 1,
        full : true
      },
      {
        id: '4',
        members: '67',
        teamName:'Gen Team',
        level: 1,
        full : false
      },

  ];


  const teamico ="https://cdn-icons-png.flaticon.com/512/476/476863.png"

class BJ extends React.Component {

    render() {

        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.logoContainer}>
                    <Text style={styles.text}>Teams!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateTeam')} style={styles.secondaryBtn}>
                        <Text style={{color:'grey'}}>CREATE +</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.bodyContainer}>

                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <View style={styles.item}>

                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

                                    <Image source={{uri:teamico}} style={{height:35,width:35}} />

                                    <View style={{marginLeft:20}}>
                                        <Text>{item.teamName}</Text>
                                        <Text style={styles.date}>{item.members} members</Text>
                                        <Text style={{fontSize:Theme.font.small}}>Level :{item.level}</Text>
                                    </View>
                                    </View>
                                    <TouchableOpacity style={{...styles.minibtn, ...{backgroundColor: item.full == true ? '#63c768' : '#ff3d71'}}}>
                                            <Text style={{color:'#fff'}}>{item.full == true ? 'Full' : 'Join'}</Text>
                                    </TouchableOpacity>


                          
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




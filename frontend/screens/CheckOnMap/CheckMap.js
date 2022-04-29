import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from "react-native";

import Theme from '../../styles/theme'
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';


class B1 extends React.Component {

    render() {

        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.logoContainer}>
                <Text style={styles.text}>Check on Map</Text>
                </View>



                <View style={styles.bodyContainer}>
                <MapView style={styles.map}  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}>
                        <Marker
                        coordinate={{ latitude : 37.78825 , longitude : -122.4324 }}/>

                          
                    </MapView>
                    <TouchableOpacity onPress={()=>navigation.navigate('HospitalView')} style={styles.mainbtn}>
                                    <Text style={{color:'#fff',fontWeight:'bold'}}>View Hospital</Text>
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
        flex: 0.5,
        justifyContent: 'center',
        paddingHorizontal:20 ,
        alignItems:'center',
    },
    map: {
        flex:1,
      },
      mainbtn: {
        width: '90%',
        height: 55,
        backgroundColor: Theme.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        zIndex:100000,
        bottom:15,
        left:20,
        right:15,
    },
    bodyContainer: {
        flex: 2,
    },
    text: {
        fontSize: 35,
        paddingHorizontal:20,
    },
    inputContainerNoPad: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#e6e6e6',
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 3
    },

});




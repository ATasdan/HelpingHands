import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 
import Theme from '../styles/theme'

import { useNavigation } from '@react-navigation/native';

const MenuItem = (props) => {

    const navigation = useNavigation();

    const {paramKey} = props
    return (
        <TouchableOpacity  onPress={() => navigation.navigate(props.navTo,{paramKey:paramKey})} style={styles.container}>
        <FontAwesome5 name={props.iconName} size={24} color="grey" />
        <Text style={{fontSize:Theme.font.large,marginLeft:20}}>{props.itemName}</Text>
        </TouchableOpacity>
    );
}


export default MenuItem;

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Theme.seconadry,
        height:55,
        marginTop:15,
        borderRadius:5,
        paddingHorizontal:15
    }
});
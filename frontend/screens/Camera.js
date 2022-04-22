import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image,TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as Sharing from 'expo-sharing';

import Theme from '../styles/theme'

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedImage, setSelectedImage] = React.useState(null);




    useEffect(() => {
        (async () => {
        const cameraStatus = await Camera.requestPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
    })();
    }, []);
    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null)
            setImage(data.uri);
            setSelectedImage(data.uri);
        }
    }

  let openShareDialogAsync = async () => {
    await Sharing.shareAsync(image);
  }; 


  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
   <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} />
      </View>
       <Button title="Take Picture" onPress={() => takePicture()} />
       
        {image && <Image source={{uri: image}} style={{flex:1}}/>}

        <TouchableOpacity onPress={openShareDialogAsync} style={styles.mainbtn}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
   </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row',
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  },
  mainbtn: {
    width: '90%',
    backgroundColor: Theme.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:20,
    paddingVertical:10,
    marginVertical:10
},
buttonText:{
    color:'#fff',
    fontWeight:'bold'
}
})
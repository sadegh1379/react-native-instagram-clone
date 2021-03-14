import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";

export default function Add({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      // const { status } = await Camera.requestPermissionsAsync();
      // setHasCameraPermission(status === 'granted');
      if (Platform.OS !== "web") {
        const GalleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(GalleryStatus.status !== "granted");
      } else {
        setHasGalleryPermission(true);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Animatable.View animation="bounceInUp" style={styles.container}>
      <View style={{ flex: 1 }}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={{ fontWeight: "bold" }}> Flip </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            pickImage();
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            takePicture();
          }}
        >
          <Text style={{ fontWeight: "bold", alignSelf: "center" }}>Take</Text>
        </TouchableOpacity>
      </View>

     
      {image && (
        <Animatable.View
          animation="bounceInUp"
          style={{
            flex: 1,
            margin: 10,
            borderWidth: 1,
            borderColor: "red",
            borderRadius: 10,
          }}
        >
          <Image source={{ uri: image }} style={{ flex: 1 }} />
        </Animatable.View>
      )}
       {image && (
        <View>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: "#ec407a", width: "100%" }}
            onPress={() => {
              navigation.navigate('Save' , {image});
            }}
          >
            <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#fff'
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },

  button: {
    padding: 10,
    // backgroundColor:'#e91e63',
    borderWidth: 1,
    borderColor: "#e91e63",
    margin: 3,
    borderRadius: 10,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Button, Image, Platform, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import { BarChart, Grid } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
const animalData = require('./animal_data.json');

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [animalInfo, setAnimalInfo] = useState<any>(null);

  const pickImage = async () => {
    setPrediction("");
    setAnimalInfo(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    setPrediction("");
    setAnimalInfo(null);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const predictAnimal = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const formData = new FormData();
      if (Platform.OS === "web") {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append("image", blob, "image.jpg");
      } else {
        formData.append("image", {
          uri: image,
          type: "image/jpeg",
          name: "image.jpg",
        } as any);
      }

      console.log("sending request to server");
      const response2 = await fetch("[SERVER_ADDRESS_HERE]", {
        method: "POST",
        body: formData
      });
      const data = await response2.json();
      setPrediction(data.predicted_label);
      setAnimalInfo(animalData[data.predicted_label.toLowerCase()]);
    } catch (error) {
      console.error(error);
      alert("An error occurred while predicting the animal.");
    }
    setLoading(false);
  };

  const removeImage = () => {
    setImage(null);
    setPrediction("");
    setAnimalInfo(null);
  };

  const renderStats = (stats: any) => {
    const data = [
      { label: 'Speed', value: parseInt(stats.Speed) },
      { label: 'Intelligence', value: parseInt(stats.Intelligence) },
      { label: 'Defense', value: parseInt(stats.Defense) },
      { label: 'Attack', value: parseInt(stats.Attack) },
      { label: 'Uniqueness', value: parseInt(stats.Uniqueness) },
    ];

    return (
      <View style={styles.statsContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statLabel}>{item.label}</Text>
            <BarChart
              style={styles.statBar}
              data={[item.value]}
              svg={{ fill: '#CC0000' }}
              contentInset={{ top: 5, bottom: 5 }}
              yMin={0}
              yMax={100}
              horizontal={true}
              xScale={scale.scaleBand}
            >
              <Grid direction={Grid.Direction.VERTICAL} />
            </BarChart>
            <Text style={styles.statValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image && <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        
        <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
          <View style={styles.removeButtonInner}>
            <Ionicons name="close" size={24} color="white" />
          </View>
        </TouchableOpacity>
        
      </View>
      }
      {!image ? (
        <>
          <Text style={{ fontSize: 20, color: "#CC0000", margin: 20, textAlign: "center"}}>Welcome to Anidex! Scan an animal to continue</Text>
          <View style={{height: Dimensions.get("screen").height/2, justifyContent: "center", width: 400}}>
            <View style={{...styles.button}}>
              <Button title="Pick an image from camera roll" onPress={pickImage} color="#CC0000" />
            </View>
            <View style={styles.button}>
              <Button title="Take a photo" onPress={takePhoto} color="#CC0000" />
            </View>
          </View>
        </>
      ) : (
        <>
          {!prediction && !loading && (
            <View style={styles.button}>
              <Button title="Analyze Animal" onPress={predictAnimal} color="#CC0000" />
            </View>
          )}
          {loading && <ActivityIndicator size="large" color="#CC0000" style={styles.button} />}
          {prediction && (
            <>
              <Text style={{fontSize: 30, color: "#CC0000", marginVertical: 10}}>{prediction.charAt(0).toUpperCase() + prediction.slice(1)}</Text>
              <Text style={{ fontSize: 18, color: "#CC0000", marginVertical: 10, marginLeft: 20, marginRight: 20 }}>{animalInfo?.Description}</Text>
              {animalInfo && renderStats(animalInfo)}
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
  },
  button: {
    margin: 2,
    display: 'flex',
  },
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    margin: 10,
    borderWidth: 2,
    borderColor: "#CC0000",
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC0000',
    borderRadius: 20,
  },
  removeButtonInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  statLabel: {
    width: 100,
    fontSize: 16,
    color: '#CC0000',
  },
  statBar: {
    flex: 1,
    height: 20,
    marginHorizontal: 10,
  },
  statValue: {
    width: 40,
    fontSize: 16,
    color: '#CC0000',
    textAlign: 'right',
  },
});
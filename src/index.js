import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { GOOGLE_VISION_API_KEY } from '@env';
// import { GOOGLE_VISION_API_KEY } from 'react-native-dotenv';

const DetectObject = () => {
    const [ imageUri, setImageUri ] = useState(null);
    const [ labels, setLabels ] = useState([]);
    const [labelPercentages, setLabelPercentages] = useState([]);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect: [4,3],
                quality: 1
            })
            if(!result.canceled) {
                setImageUri(result.assets[0].uri)
            }
            // console.log(result)

            
        } catch (error) {
            console.log('Error picking image: ', error)
        }
    };

    const analyzeImage = async () => {
        try {
           if(!imageUri) {
            alert('Please select an image')
            return
           }

           // google vision api
           const apiKey = GOOGLE_VISION_API_KEY
           const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`

           // read image from local file system and convert to base64

              const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
                    encoding: FileSystem.EncodingType.Base64,
              })

              const requestData = {
                    requests: [
                        {
                            image: {
                                content: base64ImageData,
                            },
                            features: [
                                {
                                    type: 'LABEL_DETECTION',
                                    maxResults: 5,
                                }
                            ]
                        }

                    ]


              };

              const apiResponse = await axios.post(apiURL, requestData);
              setLabels(apiResponse.data.responses[0].labelAnnotations);

             


     } catch (error) { 
            console.log('Error analyzing image: ', error)
            alert('Error analyzing image');
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Cloud Vision API</Text>
      {imageUri && ( 
        <Image 
            source={{ uri: imageUri }} 
            style={{ width: 300, height: 300 }} 
        />
        )}
        <TouchableOpacity 
            onPress={pickImage}
            style={styles.button}

        >
            <Text style={styles.buttonText}>Choose an image...</Text>

        </TouchableOpacity>
        <TouchableOpacity 
            onPress={analyzeImage}
            style={styles.button}

        >
            <Text style={styles.buttonText}>Analyze image</Text>

        </TouchableOpacity>
        {
            labels.length > 0 && (
                <View>
                    <Text style={styles.label}>Labels:</Text>
                    {labels.map((label) => (
                        <Text 
                            key={label.mid} 
                            style={styles.output}
                        >
                           {label.description}: {`${(label.score * 100).toFixed(2)}%`}

                        </Text>
                    ))
                        }
                </View>
            )
        }
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 100,
        marginBottom: 50,

    },
    button: {
        backgroundColor: '#efc050',
        padding: 10,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    output: {
        fontSize: 18,
        marginBottom: 10,
    },
  });
  

  export default DetectObject;
import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View, FlatList, Animated } from "react-native";
import Animal from "./Animal";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {

  const[ animal, setAnimal ] = useState([]);
  const[error, setError] = useState(false)

  const fade = useRef(new Animated.Value(0) ).current;

    useFocusEffect( // toda vez que a tela for carregada ele carrega junto
        React.useCallback(() => {
          fade.setValue(0);
            Animated.timing(fade, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,

            }
            ).start();
        },[])
    );

  async function getAnimais(){
    await fetch('http://10.139.75.54:5251/api/Animals/GetAllAnimals', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
    .then( res => (res.ok == true) ? res.json() : false)
    .then( json => setAnimal(json))
    .catch(err => setError(true))
  }

  useEffect( () => {
    getAnimais()
  },[])

  return(
    <View style={css.container}>
      <Animated.View style={{ opacity: fade }}>
        <View style={css.boximg}>
            <Image source={require('../../assets/logo-final.png')} style={css.img}/>
          </View>
          {animal.length > 0 ? 
          <FlatList style={css.flatlist}
            data={animal}
            renderItem={({ item }) => <Animal item={item}/>}
            keyExtractor={ (item) => item.id }
            />
          : 
          <ActivityIndicator size='large' color='red'/> }
        </Animated.View>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    backgroundColor: '#111123',
  },
  img: {
    alignItems: 'center',
    height: 180,
    width: 180,
    resizeMode: 'contain',
    marginTop: 20
  },
  boximg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140
  },
  flatlist: {
    padding: 40
  }
})
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator, Animated} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

export default function Busca() {

  const [animais, setAnimais] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState(null);

  const fade = useRef(new Animated.Value(0) ).current;

    useFocusEffect( // toda vez que a tela for carregada ele carrega junto
        React.useCallback(() => {
          fade.setValue(0);
            Animated.timing(fade, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,

            }
            ).start();
        },[])
    );

  async function getAnimais() {
    await fetch('http://10.139.75.15:5251/api/Animals/GetAllAnimals', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => (res.ok === true) ? res.json() : [])
      .then(json => {
        setAnimais(json);
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    getAnimais();
  }, []);

  useEffect(() => {
    setFiltro(animais.find((item) => item.animalNome === busca));
  }, [busca, animais]);

  return (
    <View style={css.container}>
      <Animated.View style= {{ opacity: fade }}>
      <View style={css.boximg}>
        <Image source={require('../../assets/logo-finalC.png')} style={css.img}/>
        <Text style={css.procure}>PROCURE SEU PET!</Text>
      </View>
      <View style={css.boxsearch}>
        <TextInput
          style={css.input}
          placeholder="Digite aqui para buscar..."
          placeholderTextColor="#888"
          value={busca}
          onChangeText={(digitado) => setBusca(digitado)}
        />
        <FontAwesome name="search" size={24} color="#8484CE" style={css.searchIcon} />
      </View>
      </Animated.View>
      {busca !== '' && !filtro && (
        <ActivityIndicator style={css.loadingIndicator} size="large" color="#8484CE" />
      )}
      {filtro && (
        <View style={css.animalContainer}>
          <View style={css.profileIcon}>
            <FontAwesome name="support" size={60} color="#FFFFEA" />
          </View>
          <View style={css.animalBox}>
            <Text style={[css.animalText, css.boldText]}>Nome do animal: <Text style={css.nomeS}>{filtro.animalNome}</Text></Text>
            <Text style={[css.animalText, css.boldText]}>Raça: {filtro.animalRaca}</Text>
            <Text style={[css.animalText, css.boldText]}>Cor: {filtro.animalCor}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111123',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  boxsearch: {
    backgroundColor: '#494959',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  input: {
    flex: 1,
    height: 60,
    fontSize: 16,
    color: 'white'
  },
  searchIcon: {
    marginLeft: 10,
  },
  img: {
    alignItems: 'center',
    height: 120,
    width: 120,
    resizeMode: 'contain'
  },
  boximg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140
  },
  animalContainer: {
    backgroundColor: '#28283d',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileIcon: {
    marginBottom: 20
  },
  animalBox: {
    alignItems: 'center'
  },
  animalText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10
  },
  boldText: {
    fontWeight: 'bold'
  },
  loadingIndicator: {
    marginTop: 20 
  },
  procure: {
    fontSize: 28,
    color: '#FFFFEA',
    fontWeight: '700'
  },
  nomeS: {
    color: '#8484A3'
  }
});

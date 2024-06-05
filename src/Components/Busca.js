import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator, Animated} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

export default function Busca() {

  const [usuarios, setUsuarios] = useState([]);
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

  async function getUsuarios() {
    await fetch('https://fakestoreapi.com/users', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => (res.ok === true) ? res.json() : [])
      .then(json => {
        setUsuarios(json);
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  useEffect(() => {
    setFiltro(usuarios.find((item) => item.name.firstname === busca));
  }, [busca, usuarios]);

  return (
    <View style={css.container}>
      <Animated.View style= {{ opacity: fade }}>
      <View style={css.boximg}>
      </View>
      <View style={css.boxsearch}>
        <TextInput
          style={css.input}
          placeholder="Digite aqui para buscar..."
          placeholderTextColor="#888"
          value={busca}
          onChangeText={(digitado) => setBusca(digitado)}
        />
        <FontAwesome name="search" size={24} color="#7E2C28" style={css.searchIcon} />
      </View>
      </Animated.View>
      {busca !== '' && !filtro && (
        <ActivityIndicator style={css.loadingIndicator} size="large" color="#7E2C28" />
      )}
      {filtro && (
        <View style={css.userContainer}>
          <View style={css.profileIcon}>
            <FontAwesome name="user-circle-o" size={60} color="white" />
          </View>
          <View style={css.userBox}>
            <Text style={[css.userText, css.boldText]}>Nome do usuário: {filtro.name.firstname} {filtro.name.lastname}</Text>
            <Text style={[css.userText, css.boldText]}>E-mail: {filtro.email}</Text>
            <Text style={[css.userText, css.boldText]}>Telefone: {filtro.phone}</Text>
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
    height: 210,
    width: 220,
    resizeMode: 'contain'
  },
  boximg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140
  },
  userContainer: {
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
  userBox: {
    alignItems: 'center'
  },
  userText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10
  },
  boldText: {
    fontWeight: 'bold'
  },
  loadingIndicator: {
    marginTop: 20 // Espaçamento acima do indicador
  }
});

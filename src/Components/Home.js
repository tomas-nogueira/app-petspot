import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Image, StyleSheet, View, FlatList, Animated, Modal, Text, Button, TextInput, ScrollView, Alert, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Animal from "./Animal";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const [animal, setAnimal] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showAddObservation, setShowAddObservation] = useState(false);
  const [observationDescricao, setObservationDescricao] = useState('');
  const [observationLocal, setObservationLocal] = useState('');
  const [observationData, setObservationData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;

  async function PegaNome() {
    const usuarioNome = await AsyncStorage.getItem('userNome');
  }

  useFocusEffect(
    React.useCallback(() => {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  async function getAnimais() {
    try {
      const response = await fetch('http://10.139.75.15:5251/api/Animals/GetAllAnimals', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      });

      if (response.ok) {
        const json = await response.json();
        setAnimal(json);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  }

  async function getObservacoes(animalId) {
    try {
      const response = await fetch(`http://10.139.75.15:5251/api/Observacoes/GetObservacoesId/${animalId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      });

      if (response.ok) {
        const json = await response.json();
        setObservations(json);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  }

  useEffect(() => {
    getAnimais();
  }, []);

  const handlePress = (item) => {
    setSelectedAnimal(item);
    getObservacoes(item.animalsId); 
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAnimal(null);
    setShowAddObservation(false);
    setObservationDescricao('');
    setObservationLocal('');
    setObservationData(new Date());
    setObservations([]);
  };

  const handleNovaObservacao = () => {
    setShowAddObservation(true);
  };

  async function handleSalvarObservacao (){
    try {
      const usuarioId = await AsyncStorage.getItem('userId');
      if (!usuarioId) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }

      console.log('Dados para envio:', {
        animalId: selectedAnimal.animalsId,
        observacoesDescricao: observationDescricao,
        observacoesLocal: observationLocal,
        observacoesData: observationData,
        usuarioId: usuarioId
      });

      const response = await fetch('http://10.139.75.15:5251/api/Observacoes/CreateObservacoes', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          animalsId: selectedAnimal.animalsId,
          observacoesDescricao: observationDescricao,
          observacoesLocal: observationLocal,
          observacoesData: observationData.toISOString(), // Enviar data como string ISO
          usuarioId: usuarioId
        }),
      });

      console.log('Resposta da API:', response);

      if (response.ok) {
        Alert.alert('Sucesso', 'Observação salva com sucesso.');
        getObservacoes(selectedAnimal.animalsId);
        setShowAddObservation(false);
        setObservationDescricao('');
        setObservationLocal('');
        setObservationData(new Date());
      } else {
        const errorText = await response.text(); // Ler a resposta como texto
        console.error('Erro ao salvar observação:', errorText);
        Alert.alert('Erro', 'Falha ao salvar a observação.');
        setError(true);
      }
    } catch (err) {
      console.error('Erro ao salvar observação:', err);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a observação.');
      setError(true);
    }
  };

  const handleCancelarObservacao = () => {
    setShowAddObservation(false);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || observationData;
    setShowDatePicker(false);
    setObservationData(currentDate);
  };

  return (
    <View style={css.container}>
      <Animated.View style={{ ...css.animatedView, opacity: fade }}>
        <View style={css.boximg}>
          <Image source={require('../../assets/logo-final.png')} style={css.img} />
          <Text>Bem vindo, </Text>
        </View>
        {animal.length > 0 ? (
          <FlatList
            style={css.flatlist}
            data={animal}
            renderItem={({ item }) => (
              <Animal item={item} onPress={handlePress} />
            )}
            keyExtractor={(item) => item.animalsId}
            showsVerticalScrollIndicator={true}
          />
        ) : (
          <ActivityIndicator size='large' color='#8484CE' />
        )}
      </Animated.View>

      {selectedAnimal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={css.modalOverlay}>
            <View style={css.modalContent}>
              {showAddObservation ? (
                <>
                  <Text style={css.modalTitle}>Nova observação para {selectedAnimal.animalNome}</Text>
                  <TextInput
                    style={css.input}
                    placeholder="Descrição da observação"
                    value={observationDescricao}
                    onChangeText={setObservationDescricao}
                  />
                  <TextInput
                    style={css.input}
                    placeholder="Local da observação"
                    value={observationLocal}
                    onChangeText={setObservationLocal}
                  />
                  <Button onPress={() => setShowDatePicker(true)} title="Selecionar Data" color={"#8484CE"}/>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={observationData}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDate}
                    />
                  )}
                  <Text style={css.dateText}>Data selecionada: {observationData.toLocaleDateString()}</Text>
                  <Button title="Salvar" onPress={handleSalvarObservacao} color={"#8484CE"}/>
                  <TouchableOpacity onPress={handleCancelarObservacao} style={css.x}>
                    <Ionicons name="close" size={40} color="white" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={css.modalTitle}>{selectedAnimal.animalNome}</Text>
                  <Image source={{ uri: selectedAnimal.animalFoto }} style={css.modalImage} />
                  <Text style={css.modalDescription}>Raça: {selectedAnimal.animalRaca}</Text>
                  <Text style={css.modalMoreInfo}>Tipo: {selectedAnimal.animalTipo}</Text>
                  <Text style={css.modalMoreInfo}>Cor: {selectedAnimal.animalCor}</Text>
                  <Text style={css.modalMoreInfo}>Sexo: {selectedAnimal.animalSexo}</Text>
                  <Text style={css.modalMoreInfo}>Data desaparecimento: {selectedAnimal.animalDtDesaparecimento}</Text>
                  <Text style={css.modalMoreInfo}>Data encontro: {selectedAnimal.animalDtEncontro}</Text>
                  <Text style={css.modalMoreInfo}>Data encontro: {selectedAnimal.animalDtEncontro}</Text>
                  <Text style={css.modalObservacoesTitle}>Observações:</Text>
                  <ScrollView style={css.observacoesList}>
                    {observations.length > 0 ? (
                      observations.map((obs, index) => (
                        <View key={index} style={css.observacaoItem}>
                          <Text style={css.observacaoDescricao}>{obs.observacoesDescricao}</Text>
                          <Text style={css.observacaoLocal}>Local: {obs.observacoesLocal}</Text>
                          <Text style={css.observacaoData}>Data: {new Date(obs.observacoesData).toLocaleDateString()}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={css.semObservacoes}>Consultar no sistema</Text>
                    )}
                  </ScrollView>
                  <Button title="Nova Observação" onPress={handleNovaObservacao} color={'#8484CE'}/>
                  <TouchableOpacity onPress={closeModal} style={css.x}>
                    <Ionicons name="close" size={40} color="white" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111123',
  },
  animatedView: {
    flex: 1,
  },
  img: {
    height: 180,
    width: 180,
    resizeMode: 'contain',
    marginTop: 20,
  },
  boximg: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  flatlist: {
    flex: 1,
  },
  flatlistContent: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%', 
    maxHeight: '80%', 
    padding: 20,
    backgroundColor: '#33334E',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center', 
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center',
  },
  modalMoreInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center', 
  },
  modalObservacoesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#8484A3',
    textAlign: 'center',
  },
  observacoesList: {
    width: '100%',
    marginBottom: 10,
  },
  observacaoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  observacaoDescricao: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  observacaoLocal: {
    fontSize: 12,
    marginBottom: 3,
    color: '#8484A3',
  },
  observacaoData: {
    fontSize: 12,
    color: '#8484A3',
  },
  semObservacoes: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    backgroundColor: 'white', 
    borderRadius: 5, 
  },
  dateText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center', 
  },
  x: {
    marginTop: 10
  }
});

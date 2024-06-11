import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Image, StyleSheet, View, FlatList, Animated, Modal, Text, Button, TextInput, ScrollView } from "react-native";
import Animal from "./Animal";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const [animal, setAnimal] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showAddObservation, setShowAddObservation] = useState(false);
  const [observationDescricao, setObservationDescricao] = useState('');
  const [observationLocal, setObservationLocal] = useState('');
  const [observationData, setObservationData] = useState('');
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;

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
      const response = await fetch('http://10.139.75.11:5251/api/Animals/GetAllAnimals', {
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
      const response = await fetch(`http://10.139.75.11:5251/api/Observacoes/GetObservacoesId/${animalId}`, {
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
    setObservationData('');
    setObservations([]);
  };

  const handleNovaObservacao = () => {
    setShowAddObservation(true);
  };

  const handleSalvarObservacao = async () => {
    try {
      const response = await fetch(`http://10.139.75.11:5251/api/Observacoes/CreateObservacoes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          animalId: selectedAnimal.animalsId,
          observacoesDescricao: observationDescricao,
          observacoesLocal: observationLocal,
          observacoesData: observationData
        }),
      });

      if (response.ok) {
        getObservacoes(selectedAnimal.animalsId);
        setShowAddObservation(false);
        setObservationDescricao('');
        setObservationLocal('');
        setObservationData('');
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  const handleCancelarObservacao = () => {
    setShowAddObservation(false);
  };

  return (
    <View style={css.container}>
      <Animated.View style={{ ...css.animatedView, opacity: fade }}>
        <View style={css.boximg}>
          <Image source={require('../../assets/logo-final.png')} style={css.img} />
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
                  <TextInput
                    style={css.input}
                    placeholder="Data da observação"
                    value={observationData}
                    onChangeText={setObservationData}
                  />
                  <Button title="Salvar" onPress={handleSalvarObservacao} />
                  <Button title="Cancelar" onPress={handleCancelarObservacao} />
                </>
              ) : (
                <>
                  <Text style={css.modalTitle}>{selectedAnimal.animalNome}</Text>
                  <Image source={{ uri: selectedAnimal.animalFoto }} style={css.modalImage} />
                  <Text style={css.modalDescription}>Raça: {selectedAnimal.animalRaca}</Text>
                  <Text style={css.modalMoreInfo}>Tipo: {selectedAnimal.animalTipo}</Text>
                  <Text style={css.modalMoreInfo}>Cor: {selectedAnimal.animalCor}</Text>
                  <Text style={css.modalMoreInfo}>Sexo: {selectedAnimal.animalSexo}</Text>
                  <Text style={css.modalObservacoesTitle}>Observações:</Text>
                  <ScrollView style={css.observacoesList}>
                    {observations.length > 0 ? (
                      observations.map((obs, index) => (
                        <View key={index} style={css.observacaoItem}>
                          <Text style={css.observacaoDescricao}>{obs.observacoesDescricao}</Text>
                          <Text style={css.observacaoLocal}>Local: {obs.observacoesLocal}</Text>
                          <Text style={css.observacaoData}>Data: {obs.observacoesData}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={css.semObservacoes}>Sem observações</Text>
                    )}
                  </ScrollView>
                  <Button title="Nova Observação" onPress={handleNovaObservacao} />
                  <Button title="Fechar" onPress={closeModal} />
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
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#33334E'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalMoreInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalObservacoesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  observacoesList: {
    width: '100%',
    marginBottom: 10,
  },
  observacaoItem: {
    fontSize: 14,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  observacaoDescricao: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  observacaoLocal: {
    fontSize: 12,
  },
  observacaoData: {
    fontSize: 12,
  },
  semObservacoes: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    color: 'white'
  },
});

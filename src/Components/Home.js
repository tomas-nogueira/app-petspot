import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Image, StyleSheet, View, FlatList, Animated, Modal, Text, Button } from "react-native";
import Animal from "./Animal";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const [animal, setAnimal] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
      const response = await fetch('http://10.139.75.54:5251/api/Animals/GetAllAnimals', {
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

  useEffect(() => {
    getAnimais();
  }, []);

  const handlePress = (item) => {
    setSelectedAnimal(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAnimal(null);
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
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
          />
        ) : (
          <ActivityIndicator size='large' color='red' />
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
              <Text style={css.modalTitle}>{selectedAnimal.animalNome}</Text>
              <Image source={{ uri: selectedAnimal.animalFoto }} style={css.modalImage} />
              <Text style={css.modalDescription}>Raça: {selectedAnimal.animalRaca}</Text>
              <Text style={css.modalMoreInfo}>Tipo: {selectedAnimal.animalTipo}</Text>
              <Text style={css.modalMoreInfo}>Cor: {selectedAnimal.animalCor}</Text>
              <Text style={css.modalMoreInfo}>Sexo: {selectedAnimal.animalSexo}</Text>
              <Button title="Fechar" onPress={closeModal} />
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
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
});

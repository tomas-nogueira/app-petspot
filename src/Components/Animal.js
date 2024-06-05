import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importe o FontAwesome ou outro pacote de ícones que você esteja usando

export default function Animal({ item, onPress }) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.animalFoto }} style={styles.imagem} />
            <View style={styles.infoContainer}>
                <Text style={styles.titulo}>Nome: <Text style={styles.nome}>{item.animalNome}</Text></Text>
                <Text style={styles.raca}>Raça: {item.animalRaca}</Text>
                <Text style={styles.raca}>Tipo: {item.animalTipo}</Text>
                <TouchableOpacity style={styles.botaoComprar} onPress={() => onPress(item)}>
                    <FontAwesome name="plus" size={20} color="white"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#33334E',
        padding: 10,
        marginBottom: 10,
        borderColor: '#ccc',
        borderRadius: 5,
        marginHorizontal: 65,
        marginBottom: 50
    },
    infoContainer: {
        marginTop: 10,
        width: '100%',
        position: 'relative', 
    },
    imagem: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white'
    },
    raca: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    categoria: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 5,
        color: 'white'
    },
    avaliacao: {
        fontSize: 14,
        color: 'white'
    },
    botaoComprar: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#8484CE',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 50,
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
    },
    nome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#8484A3'
    }
});

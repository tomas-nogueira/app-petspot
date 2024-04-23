import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importe o FontAwesome ou outro pacote de ícones que você esteja usando


export default function Produto({ item }) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.imagem} />
            <View style={styles.infoContainer}>
                <Text style={styles.titulo}>{item.title}</Text>
                <Text style={styles.preco}>Preço: R$ {item.price}</Text>
                <Text style={styles.categoria}>Categoria: {item.category}</Text>
                <Text style={styles.avaliacao}>Avaliação: {item.rating.count}</Text>
                <TouchableOpacity style={styles.botaoComprar}>
                <FontAwesome name="heart" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginHorizontal: 40,
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
        borderRadius: 5,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    preco: {
        fontSize: 16,
        color: 'green',
        marginBottom: 5,
    },
    categoria: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    avaliacao: {
        fontSize: 14,
    },
    botaoComprar: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 50,
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
    },
});

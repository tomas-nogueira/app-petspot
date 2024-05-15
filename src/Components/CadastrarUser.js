import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, Alert, FlatList} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

export default function CadastrarUser() {

    const [usuarios, setUsuarios] = useState([])
    const [busca, setBusca] = useState(''); 
    const [filtro, setFiltro] = useState(null);
    const [error, setError] = useState(false);
    const [edicao, setEdicao] = useState(false);
    const [iduser, setIduser] = useState(0);
    const [userName, setName] = useState();
    const [userEmail, setEmail] = useState();
    const [userSenha, setSenha] = useState();

    async function getUsuarios(){
        await fetch('http://10.139.75.54:5251/api/Users/GetAllUsers', {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(json => setUsuarios(json))
            .catch(err => setError(true))

        }

        useEffect(() => {
            getUsuarios();
        }, []);

        useFocusEffect(
            React.useCallback(() => {
            getUsuarios();
            },[])
        )       

    return(
        <View style={styles.container}>
        {edicao == false ? (
            <FlatList
                style={styles.flat}
                data={usuarios}
                keyExtractor={(item) => item.userId}
                renderItem={({item}) => (
                    <View style={styles.userContainer}>
                        <Text style={styles.userName}>{item.userName}</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.btnEdit}>
                                <MaterialIcons name="edit" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnDelete}>
                                <MaterialIcons name="delete" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        ) : (
            <View></View>
        )}
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#111123',
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
userContainer: {
    backgroundColor: '#1E1E3F',
    borderRadius: 12,
    padding: 40,
    marginBottom: 30,
    width: '95%',
    alignItems: 'center',
},
userName: {
    color: '#FFF',
    fontSize: 20,
    marginBottom: 15,
},
buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
},
btnEdit: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
},
btnDelete: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 8,
},
});

import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, Alert} from "react-native";

export default function CadastrarUser() {

    const [raca, setRaca] = useState('');
    const [tipo, setTipo] = useState('');
    const [nome, setNome] = useState('');
    const [cor, setCor] = useState('');
    const [sexo, setSexo] = useState('');
    const [observacao, setObservacao] = useState('');
    const [foto, setFoto] = useState('');
    const [dtDesaparecimento, setDtDesaparecimento] = useState('');
    const [dtEncontro, setDtEncontro] = useState('');
    const [status, setStatus] = useState('');

    async function Cadastro(){
        await fetch('http://10.139.75.15:5251/api/Animals/CreateAnimal', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                animalNome: email,
                
            })
        })
        .then( res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Erro ao cadastrar usuário');
            }
        })
        .then( json => {
            if (json && json.id) {
                Alert.alert("Sucesso", "Seu cadastro foi realizado com sucesso", [
                    {
                        text: "OK",
                        onPress: () => {
                            setRaca('');
                            setNome('');
                            setTipo('');
                            setCor('');
                            setSexo('');
                            setObservacao('');
                            setDtDesaparecimento('');
                            setDtEncontro('');
                            setStatus('');
                            setTelefone('');
                        }
                    }
                ]);
            }
        })
        .catch(err => {
            setErro(true);
            console.error('Erro:', err);
        });
    }

    return(
        <ScrollView contentContainerStyle={css.main}>
                <View style={css.container}>
                    <View style={css.oracle}>
                        <View style={css.boximg}>
                        </View>
                        <View style={css.cadastrobox}>
                            <Text style={css.welcome}>CADASTRAR ANIMAL</Text>
                        </View>
                    </View>
                    <View style={css.boxinput}>
                        <TextInput 
                        style={css.input} 
                        placeholder='Insira o nome'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={nome}
                        onChangeText={(digitado) => setNome(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira a raça'
                        placeholderTextColor='white'
                        keyboardType='default'
                        onChangeText={(digitado) => setRaca(digitado)}
                        TextInput={raca}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira a cor'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={cor}
                        onChangeText={(digitado) => setCor(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira o tipo'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={tipo}
                        onChangeText={(digitado) => setTipo(digitado)}
                        />
                    </View>
                    <TouchableOpacity style={css.btn} onPress={Cadastro}>
                        <Text style={css.btnText}>CADASTRAR</Text>
                    </TouchableOpacity>
                    <View/>
                </View>
    </ScrollView>
    )
}

const css = StyleSheet.create({
    boxinput: {
        marginTop: 5
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    input: {
        marginTop: 30,
        color: 'white', 
        height: 45,
        fontSize: 16,
        textAlign: "left",
        borderBottomColor: "#484E55",
        borderBottomWidth: 1,
        width: 230,
    },
    btn: {
        marginTop: 50 ,
        backgroundColor: 'transparent', 
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 10, 
        height: 55,
        width: 220,
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 50
    },
    highinput: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 10
    },
    downinput: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 10
    },
    main: {
        backgroundColor: '#111123',
        flexGrow: 1
    },
    btnText: {
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 1
    },
    oracle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 22,
        color: 'white',
        fontWeight: '600'
    },
    img: {
        alignItems: 'center',
        width: 200,
        resizeMode: 'contain'
      },
      boximg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 140
      },
      cadastrobox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12
      },
      sucesso: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        marginTop: 120
      }
});
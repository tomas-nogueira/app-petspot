import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, Alert} from "react-native";

export default function CadastrarUser() {

    const [email, setEmail] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cidade, setCidade] = useState('');
    const [rua, setRua] = useState('');
    const [numeroCasa, setNumeroCasa] = useState('');
    const [codPostal, setCodPostal] = useState('');
    const [telefone, setTelefone] = useState('');
    const [erro, setErro] = useState(false);

    async function Cadastro(){
        await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: nomeUsuario,
                password: senha,
                name: {
                    firstname: nome,
                    lastnome: sobrenome,
                },
                address: {
                    city: cidade,
                    street: rua,
                    number: numeroCasa,
                    zipcode: codPostal
                },
                phone: telefone
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
                            // Limpar os campos
                            setEmail('');
                            setNomeUsuario('');
                            setSenha('');
                            setNome('');
                            setSobrenome('');
                            setCidade('');
                            setRua('');
                            setNumeroCasa('');
                            setCodPostal('');
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
                            <Image source={require('../../assets/oracle.png')} style={css.img}/>
                        </View>
                        <View style={css.cadastrobox}>
                            <Image source={require('../../assets/logo.png')}/>
                            <Text style={css.welcome}>CADASTRAR USUÁRIO</Text>
                        </View>
                    </View>
                    <View style={css.boxinput}>
                        <TextInput 
                        style={css.input} 
                        placeholder='Insira o e-mail'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={email}
                        onChangeText={(digitado) => setEmail(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira seu nome de usuário'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={nomeUsuario}
                        onChangeText={(digitado) => setNomeUsuario(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira sua senha'
                        placeholderTextColor='white'
                        keyboardType='default'
                        onChangeText={(digitado) => setSenha(digitado)}
                        TextInput={senha}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira seu nome'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={nome}
                        onChangeText={(digitado) => setNome(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira seu sobrenome'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={sobrenome}
                        onChangeText={(digitado) => setSobrenome(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira sua cidade'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={cidade}
                        onChangeText={(digitado) => setCidade(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira sua rua'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={rua}
                        onChangeText={(digitado) => setRua(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira o número da sua casa'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={numeroCasa}
                        onChangeText={(digitado) => setNumeroCasa(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira seu Cod. Postal'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={codPostal}
                        onChangeText={(digitado) => setCodPostal(digitado)}
                        />
                        <TextInput style={css.input} 
                        placeholder='Insira seu telefone'
                        placeholderTextColor='white'
                        keyboardType='default'
                        TextInput={telefone}
                        onChangeText={(digitado) => setTelefone(digitado)}
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
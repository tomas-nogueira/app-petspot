import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {

    const[email, setEmail] = useState("")
    const[nome, setNome] = useState("")
    const[telefone, setTelefone] = useState("")
    const[senha, setSenha] = useState("")
    const[erro, setErro] = useState(false)
    const[cadastro, setCadastro] = useState(true)

    const{Login, logado, error, Cadastro} = useContext( AuthContext )

    function RealizaLogin() {
        Login( email, senha );
    }

    function RealizaCadastro() {
        Cadastro( nome, telefone, email, senha );
        setCadastro(false);
    }

    return(
        <ScrollView contentContainerStyle={css.main}>
            {cadastro ? 
                <View style={css.container}>
                    <View style={css.petSpot}>
                        <Image source={require('../../assets/logo-final.png')} style={css.img}/>
                    </View>
                    <View style={css.oracle}>
                        <View style={css.boximg}>
                        </View>
                        <View style={css.cadastrobox}>
                            <Text style={css.welcome}>CADASTRAR USUÁRIO</Text>
                        </View>
                    </View>
                    <View style={css.boxinput}>
                        <TextInput 
                            style={css.input} 
                            placeholder='Insira o e-mail'
                            placeholderTextColor='white'
                            keyboardType='default'
                            value={email}
                            onChangeText={(digitado) => setEmail(digitado)}
                        />
                        <TextInput style={css.input} 
                            placeholder='Insira sua senha'
                            placeholderTextColor='white'
                            keyboardType='default'
                            value={senha}
                            onChangeText={(digitado) => setSenha(digitado)}
                        />
                        <TextInput style={css.input} 
                            placeholder='Insira seu nome'
                            placeholderTextColor='white'
                            keyboardType='default'
                            value={nome}
                            onChangeText={(digitado) => setNome(digitado)}
                        />
                        <TextInput style={css.input} 
                            placeholder='Insira seu telefone'
                            placeholderTextColor='white'
                            keyboardType='default'
                            value={telefone}
                            onChangeText={(digitado) => setTelefone(digitado)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setCadastro(false)} style={css.link}>
                        <Text style={css.textLink}>Já tem uma conta?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.btnCadastro} onPress={RealizaCadastro}>
                        <Text style={css.btnText}>CADASTRAR</Text>
                    </TouchableOpacity>
                </View>
            : 
                <View style={css.container}>
                    <View style={css.petSpot}>
                        <Image source={require('../../assets/logo-final.png')} style={css.img}/>
                    </View>
                    <View style={css.cadastrobox}>
                            <Text style={css.welcome}>REALIZAR LOGIN</Text>
                        </View>
                    <View style={css.boxinput}>
                        <TextInput 
                            style={css.input} 
                            placeholder='Insira o e-mail'
                            placeholderTextColor='white'
                            keyboardType='default'
                            value={email}
                            onChangeText={(digitado) => setEmail(digitado)}
                        />
                        <TextInput style={css.input} 
                            placeholder='Insira a senha'
                            placeholderTextColor='white'
                            keyboardType='default'
                            value={senha}
                            onChangeText={(digitado) => setSenha(digitado)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setCadastro(true)} style={css.link}>
                        <Text style={css.textLink}>Ainda não tem uma conta?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.btn} onPress={RealizaLogin}>
                        <Text style={css.btnText}>LOGIN</Text>
                    </TouchableOpacity>
                    <View/>
                    {error && 
                        <View>
                            <Text style={css.texterro}>Email ou Senha incorretos.</Text>
                        </View>
                    }
                </View>
            }
        </ScrollView>
    );
}

const css = StyleSheet.create({
    welcome: {
        fontSize: 20,
        color: 'white',
        fontWeight: '700'
    },
    img: {
        height: 230,
        width: 230,  
        resizeMode: 'contain'
    },
    container: {
        marginTop: 60,
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
        marginTop: 60 ,
        backgroundColor: 'transparent', 
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 10, 
        height: 55,
        width: 180,
        borderWidth: 2,
        borderColor: 'white'
    },
    main: {
        height: '100%',
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
    texterro: {
        color: 'red',
        marginTop: 20,
        fontSize: 16,
        fontWeight: '800'
    },
    btnCadastro: {
        marginTop: 60 ,
        backgroundColor: 'transparent', 
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 10, 
        height: 55,
        width: 220,
        borderWidth: 2,
        borderColor: 'white' 
    },
    textLink: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
        fontWeight: '800',
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    link: {
        alignSelf: 'flex-start',
        marginLeft: 70
    }
})

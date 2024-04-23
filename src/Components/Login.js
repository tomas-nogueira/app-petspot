import { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {

    const[email, setEmail] = useState("")
    const[senha, setSenha] = useState("")
    const[erro, setErro] = useState(false)

    const{Login, logado, error} = useContext( AuthContext )

    function RealizaLogin() {
        Login( email, senha );
    }



  return(
    <ScrollView contentContainerStyle={css.main}>
        <View style={css.container}>
            <View style={css.oracle}>
                <Image source={require('../../assets/logo.png')}/>
                <Text style={css.welcome}>Welcome to Oracle!</Text>
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
            <TouchableOpacity style={css.btn} onPress={RealizaLogin}>
                <Text style={css.btnText}>LOGIN</Text>
            </TouchableOpacity>
            <View/>
            {error && 
                <View>
                    <Text style={css.texterro}>Revise os campos e tente novamente!</Text>
                </View>
            }
        </View>
    </ScrollView>
  );
}

const css = StyleSheet.create({
    boxinput: {
        marginTop: 5
    },
    container: {
        marginTop: 180,
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
        width: 180,
        borderWidth: 2,
        borderColor: 'white'
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
    oracle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    welcome: {
        fontSize: 22,
        color: 'white',
        fontWeight: '600'
    },
    texterro: {
        color: 'red',
        marginTop: 20,
        fontSize: 16,
        fontWeight: '800'
    }
})


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
            <View style={css.petSpot}>
                <Image source={require('../../assets/logo-final.png')} style={css.img}/>
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
                    <Text style={css.texterro}>Email ou Senha incorretos.</Text>
                </View>
            }
        </View>
    </ScrollView>
  );
}

const css = StyleSheet.create({
    img: {
        height: 230,
        width: 230,  
        resizeMode: 'contain'
    },
    container: {
        marginTop: 140,
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
    highinput: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    downinput: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
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
    }
})


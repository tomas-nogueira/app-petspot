import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({children}) {

    const[logado, setLogado] = useState(false);
    const[error, setError] = useState(false);

    async function Login( email, senha ){
        try {
            await fetch('http://10.139.75.15:5251/api/Usuario/LoginUsuario', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                UsuarioEmail: email,
                UsuarioSenha: senha
            })
        })
        .then(async (res) => {
            if (res.status === 200) {
                setLogado(true);
                const responseData = await res.json();
                const usuarioId = responseData.usuarioId.toString();// convertendo para string
                await AsyncStorage.setItem("userId", usuarioId);
                const id = await AsyncStorage.getItem('userId');
                const usuarioNome = responseData.usuarioNome
                await AsyncStorage.setItem("userNome", usuarioNome);
                const nome = await AsyncStorage.getItem('userNome');
                console.log(id)
                console.log(nome)
            } else {
                setError(true);
            }
        })
        .catch(err => {
            console.log(err);
            setError(true)
        })
    }
    catch (err){
        console.log(err);
        setError(true);
    }
    }

    async function Cadastro(nome, telefone, email, senha){
        await fetch('http://10.139.75.15:5251/api/Usuario/CreateUsuario', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                usuarioEmail: email,
                usuarioNome: nome,
                UsuarioSenha: senha,
                usuarioTelefone: telefone
            })
        })
        .then( res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Erro ao cadastrar usuário');
            }
        })
    }
    return(
        <AuthContext.Provider value={{logado: logado, Login, error: error, Cadastro}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
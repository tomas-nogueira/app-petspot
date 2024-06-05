import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({children}) {

    const[logado, setLogado] = useState(false);
    const[error, setError] = useState(false);

    async function Login( email, senha ){
        await fetch('http://10.139.75.54:5251/api/Usuario/LoginUsuario', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                UsuarioEmail: email,
                UsuarioSenha: senha
            })
        })
        .then(res => res.status == 200 ? setLogado(true) : setError(true)) // tratando o cód. que veio da API
        .catch( erro => setError(true))
    }
    return(
        <AuthContext.Provider value={{logado: logado, Login, error: error}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({children}) {

    const[logado, setLogado] = useState(true);
    const[error, setError] = useState(false);

    async function Login( email, senha ){
        await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: senha
            })
        })
        .then( res => res.json() )
        .then( json => setLogado( (json.token) ? true : false) )
        .then( json => console.log(json))
        .catch( erro => setError(true))
    }
    return(
        <AuthContext.Provider value={{logado: logado, Login, error: error}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
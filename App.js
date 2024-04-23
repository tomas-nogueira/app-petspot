import AuthProvider from "./src/Context/AuthContext";
import Rotas from "./src/Routes/Rotas";

export default function App() {
  return(
    <AuthProvider>
      <Rotas/>
    </AuthProvider>
  );
}
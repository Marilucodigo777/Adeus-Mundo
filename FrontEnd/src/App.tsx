
import { useState } from "react";
import MenuLateral from "./Componentes/MenuLateral";
import Inicio from "./Telas/Inicio";
import "./App.css";
import CriarRota from "./Telas/CriarRota";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("inicio");

 
function mostrarPagina() {
  switch (paginaAtual) {
    case "inicio":
      return <Inicio mudarPagina={setPaginaAtual} />;

    case "criar":
      return <CriarRota mudarPagina={setPaginaAtual} />;

    default:
      return (
        <div>
          <h2>Estamos preparando esta página ♡</h2>
          <p>
            Essa funcionalidade estará disponível
            em breve no Adeus, mundo!
          </p>
        </div>
      );
  }
}

  return (
    <div className="app-container">
      <MenuLateral
        paginaAtual={paginaAtual}
        mudarPagina={setPaginaAtual}
      />

      <main className="conteudo-principal">
        {mostrarPagina()}
      </main>
    </div>
  );
}

export default App;

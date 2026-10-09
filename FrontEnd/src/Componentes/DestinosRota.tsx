
import { useState } from "react";
import "./DestinosRota.css";

export type Destino = {
  id: string;
  cidade: string;
  pais: string;
  dias: number;
};

type DestinosRotaProps = {
  destinos: Destino[];
  setDestinos: React.Dispatch<React.SetStateAction<Destino[]>>;
};

function DestinosRota({
  destinos,
  setDestinos,
}: DestinosRotaProps) {
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");
  const [dias, setDias] = useState(1);
  const [erro, setErro] = useState("");

  function adicionarDestino() {
    if (!cidade.trim() || !pais.trim()) {
      setErro("Informe a cidade e o país.");
      return;
    }

    if (!Number.isInteger(dias) || dias < 1) {
      setErro("A estadia precisa ter pelo menos 1 dia.");
      return;
    }

    const novoDestino: Destino = {
      id: crypto.randomUUID(),
      cidade: cidade.trim(),
      pais: pais.trim(),
      dias,
    };

    setDestinos((anteriores) => [
      ...anteriores,
      novoDestino,
    ]);

    setCidade("");
    setPais("");
    setDias(1);
    setErro("");
  }

  function removerDestino(id: string) {
    setDestinos((anteriores) =>
      anteriores.filter((destino) => destino.id !== id)
    );
  }

  function moverDestino(
    indice: number,
    direcao: number
  ) {
    const novoIndice = indice + direcao;

    if (
      novoIndice < 0 ||
      novoIndice >= destinos.length
    ) {
      return;
    }

    setDestinos((anteriores) => {
      const novaLista = [...anteriores];

      [novaLista[indice], novaLista[novoIndice]] = [
        novaLista[novoIndice],
        novaLista[indice],
      ];

      return novaLista;
    });
  }

  const totalDias = destinos.reduce(
    (total, destino) => total + destino.dias,
    0
  );

  return (
    <section className="formulario-secao destinos-rota">
      <h2>✈ Destinos da viagem</h2>

      <p className="secao-explicacao">
        Quais lugares fazem parte do seu sonho?
        Adicione as cidades na ordem que deseja visitar.
      </p>

      {destinos.length > 0 && (
        <div className="lista-destinos">
          {destinos.map((destino, indice) => (
            <div
              className="destino-adicionado"
              key={destino.id}
            >
              <div className="destino-numero">
                {indice + 1}
              </div>

              <div className="destino-dados">
                <strong>{destino.cidade}</strong>
                <span>
                  {destino.pais} • {destino.dias}
                  {destino.dias === 1
                    ? " dia"
                    : " dias"}
                </span>
              </div>

              <div className="destino-acoes">
                <button
                  type="button"
                  aria-label={`Mover ${destino.cidade} para cima`}
                  title="Mover para cima"
                  disabled={indice === 0}
                  onClick={() => moverDestino(indice, -1)}
                >
                  ↑
                </button>

                <button
                  type="button"
                  aria-label={`Mover ${destino.cidade} para baixo`}
                  title="Mover para baixo"
                  disabled={indice === destinos.length - 1}
                  onClick={() => moverDestino(indice, 1)}
                >
                  ↓
                </button>

                <button
                  type="button"
                  className="remover-destino"
                  aria-label={`Remover ${destino.cidade}`}
                  title="Remover destino"
                  onClick={() => removerDestino(destino.id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="novo-destino">
        <h3>♡ Adicionar uma cidade</h3>

        <div className="campos-destino">
          <div className="campo-formulario">
            <label htmlFor="cidade-destino">
              Cidade
            </label>
            <input
              id="cidade-destino"
              type="text"
              placeholder="Ex.: Barcelona"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="pais-destino">
              País
            </label>
            <input
              id="pais-destino"
              type="text"
              placeholder="Ex.: Espanha"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="dias-destino">
              Dias
            </label>
            <input
              id="dias-destino"
              type="number"
              min="1"
              step="1"
              value={dias}
              onChange={(e) =>
                setDias(Number(e.target.value))
              }
            />
          </div>
        </div>

        {erro && (
          <p className="destino-erro" role="alert">
            {erro}
          </p>
        )}

        <button
          className="botao-adicionar-destino"
          type="button"
          onClick={adicionarDestino}
        >
          + Adicionar destino
        </button>
      </div>

      <div className="resumo-destinos">
        <span>
          {destinos.length}
          {destinos.length === 1
            ? " cidade"
            : " cidades"}
        </span>

        <strong>
          {totalDias}
          {totalDias === 1 ? " dia" : " dias"}
          {" "}planejados
        </strong>
      </div>
    </section>
  );
}

export default DestinosRota;

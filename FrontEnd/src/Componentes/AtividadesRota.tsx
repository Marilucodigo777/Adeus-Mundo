
import { useState } from "react";
import "./AtividadesRota.css";

export type CategoriaAtividade =
  | "hospedagem"
  | "restaurante"
  | "atracao"
  | "transporte"
  | "outro";

export type Atividade = {
  id: string;
  destinoId: string;
  nome: string;
  categoria: CategoriaAtividade;
  dia: number | null;
  custo: number | null;
  observacoes: string;
};

type DestinoAtividade = {
  id: string;
  cidade: string;
  pais: string;
  dias: number;
};

type AtividadesRotaProps = {
  destinos: DestinoAtividade[];
  atividades: Atividade[];
  setAtividades: React.Dispatch<
    React.SetStateAction<Atividade[]>
  >;
};

const categorias = [
  { valor: "hospedagem", nome: "🏨 Hospedagem" },
  { valor: "restaurante", nome: "🍽️ Restaurante" },
  { valor: "atracao", nome: "📸 Atração" },
  { valor: "transporte", nome: "🚆 Transporte" },
  { valor: "outro", nome: "♡ Outro" },
] as const;

function AtividadesRota({
  destinos,
  atividades,
  setAtividades,
}: AtividadesRotaProps) {
  const [destinoSelecionado, setDestinoSelecionado] =
    useState("");

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] =
    useState<CategoriaAtividade>("atracao");
  const [dia, setDia] = useState("");
  const [custo, setCusto] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("todas");

  const destinoAtual =
    destinos.find((d) => d.id === destinoSelecionado) ??
    destinos[0];

  const atividadesDestino = destinoAtual
    ? atividades.filter(
        (atividade) => atividade.destinoId === destinoAtual.id
      )
    : [];

  const atividadesFiltradas = atividadesDestino.filter(
    (atividade) =>
      filtro === "todas" || atividade.categoria === filtro
  );

  function adicionarAtividade() {
    if (!destinoAtual || !nome.trim()) {
      setErro("Selecione um destino e informe o nome.");
      return;
    }

    const diaNumero = dia === "" ? null : Number(dia);

    if (
      diaNumero !== null &&
      (!Number.isInteger(diaNumero) ||
        diaNumero < 1 ||
        diaNumero > destinoAtual.dias)
    ) {
      setErro("Escolha um dia válido para esse destino.");
      return;
    }

    const valor = custo === "" ? null : Number(custo);

    if (
      valor !== null &&
      (!Number.isFinite(valor) || valor < 0)
    ) {
      setErro("Informe um custo válido.");
      return;
    }

    const novaAtividade: Atividade = {
      id: crypto.randomUUID(),
      destinoId: destinoAtual.id,
      nome: nome.trim(),
      categoria,
      dia: diaNumero,
      custo: valor,
      observacoes: observacoes.trim(),
    };

    setAtividades((anteriores) => [
      ...anteriores,
      novaAtividade,
    ]);

    setNome("");
    setDia("");
    setCusto("");
    setObservacoes("");
    setErro("");
  }

  function removerAtividade(id: string) {
    setAtividades((anteriores) =>
      anteriores.filter((atividade) => atividade.id !== id)
    );
  }

  function alterarDia(id: string, novoDia: string) {
    setAtividades((anteriores) =>
      anteriores.map((atividade) =>
        atividade.id === id
          ? {
              ...atividade,
              dia: novoDia === "" ? null : Number(novoDia),
            }
          : atividade
      )
    );
  }

  if (destinos.length === 0) {
    return (
      <section className="formulario-secao">
        <h2>♡ Planejamento de atividades</h2>
        <p className="secao-explicacao">
          Adicione pelo menos uma cidade para começar
          a planejar suas atividades.
        </p>
      </section>
    );
  }

  return (
    <section className="formulario-secao atividades-rota">
      <h2>♡ Planejamento de atividades</h2>

      <p className="secao-explicacao">
        Salve lugares, restaurantes, hospedagens e passeios.
        Você poderá definir os dias agora ou depois.
      </p>

      <div className="campo-formulario">
        <label htmlFor="destino-atividades">
          Qual cidade deseja planejar?
        </label>

        <select
          id="destino-atividades"
          value={destinoAtual.id}
          onChange={(e) => {
            setDestinoSelecionado(e.target.value);
            setDia("");
            setErro("");
          }}
        >
          {destinos.map((destino) => (
            <option key={destino.id} value={destino.id}>
              {destino.cidade}, {destino.pais}
            </option>
          ))}
        </select>
      </div>

      <div className="atividade-nova">
        <h3>✧ Adicionar uma atividade</h3>

        <div className="campo-formulario">
          <label htmlFor="atividade-nome">Nome</label>
          <input
            id="atividade-nome"
            type="text"
            placeholder="Ex.: Visitar a Sagrada Família"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="atividades-campos">
          <div className="campo-formulario">
            <label htmlFor="atividade-categoria">
              Categoria
            </label>

            <select
              id="atividade-categoria"
              value={categoria}
              onChange={(e) =>
                setCategoria(
                  e.target.value as CategoriaAtividade
                )
              }
            >
              {categorias.map((item) => (
                <option key={item.valor} value={item.valor}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="campo-formulario">
            <label htmlFor="atividade-dia">
              Dia na cidade
            </label>

            <select
              id="atividade-dia"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
            >
              <option value="">Definir depois</option>

              {Array.from(
                { length: destinoAtual.dias },
                (_, i) => i + 1
              ).map((numero) => (
                <option key={numero} value={numero}>
                  Dia {numero}
                </option>
              ))}
            </select>
          </div>

          <div className="campo-formulario">
            <label htmlFor="atividade-custo">
              Custo estimado (R$)
            </label>
            <input
              id="atividade-custo"
              type="number"
              min="0"
              step="0.01"
              placeholder="Opcional"
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
            />
          </div>
        </div>

        <div className="campo-formulario">
          <label htmlFor="atividade-observacoes">
            Observações
          </label>
          <textarea
            id="atividade-observacoes"
            rows={3}
            placeholder="Dicas, links, horários e anotações..."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </div>

        {erro && (
          <p className="atividade-erro" role="alert">
            {erro}
          </p>
        )}

        <button
          type="button"
          className="botao-adicionar-atividade"
          onClick={adicionarAtividade}
        >
          + Adicionar atividade
        </button>
      </div>

      <div className="atividades-listagem">
        <div className="atividades-topo">
          <h3>Meus lugares e atividades ♡</h3>

          <select
            aria-label="Filtrar atividades por categoria"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todas">Todas as categorias</option>
            {categorias.map((item) => (
              <option key={item.valor} value={item.valor}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        {atividadesFiltradas.length === 0 ? (
          <p className="atividade-vazia">
            Nenhuma atividade encontrada nesta categoria.
          </p>
        ) : (
          atividadesFiltradas.map((atividade) => (
            <div
              className="atividade-item"
              key={atividade.id}
            >
              <div className="atividade-descricao">
                <strong>{atividade.nome}</strong>

                <span>
                  {categorias.find(
                    (c) => c.valor === atividade.categoria
                  )?.nome}
                </span>

                {atividade.custo !== null && (
                  <span>
                    Custo estimado:{" "}
                    {atividade.custo.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </span>
                )}

                {atividade.observacoes && (
                  <p>{atividade.observacoes}</p>
                )}
              </div>

              <div className="atividade-acoes">
                <select
                  aria-label={`Dia de ${atividade.nome}`}
                  value={atividade.dia ?? ""}
                  onChange={(e) =>
                    alterarDia(atividade.id, e.target.value)
                  }
                >
                  <option value="">Sem dia</option>

                  {Array.from(
                    { length: destinoAtual.dias },
                    (_, i) => i + 1
                  ).map((numero) => (
                    <option key={numero} value={numero}>
                      Dia {numero}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  aria-label={`Remover ${atividade.nome}`}
                  onClick={() =>
                    removerAtividade(atividade.id)
                  }
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="atividades-resumo">
        {atividadesDestino.length} atividades salvas
      </div>
    </section>
  );
}

export default AtividadesRota;

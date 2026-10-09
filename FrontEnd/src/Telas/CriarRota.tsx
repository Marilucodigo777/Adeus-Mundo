
import { useState } from "react";
import type { FormEvent } from "react";
import "./CriarRota.css";
import DestinosRota from "../Componentes/DestinosRota";
import type { Destino } from "../Componentes/DestinosRota";
import AtividadesRota from "../Componentes/AtividadesRota";
import type { Atividade } from "../Componentes/AtividadesRota";

type CriarRotaProps = {
  mudarPagina: (pagina: string) => void;
};

type CategoriaViagem = "economica" | "executiva" | "premium";
type VisibilidadeRota = "privada" | "publica";

function CriarRota({ mudarPagina }: CriarRotaProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] =
    useState<CategoriaViagem>("economica");
  const [visibilidade, setVisibilidade] =
    useState<VisibilidadeRota>("privada");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  function criarRota(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (dataInicio && dataFim && dataFim < dataInicio) {
      setMensagem(
        "A data de término não pode ser anterior à data de início."
      );
      return;
    }

    const atividadesValidas = atividades.filter((atividade) =>
  destinos.some((destino) => destino.id === atividade.destinoId)
);

  
function criarRota(evento: FormEvent<HTMLFormElement>) {
  evento.preventDefault();

  if (dataInicio && dataFim && dataFim < dataInicio) {
    setMensagem(
      "A data de término não pode ser anterior à data de início."
    );
    return;
  }

  // Mantém apenas atividades de destinos existentes.
  const atividadesValidas = atividades.filter((atividade) =>
    destinos.some(
      (destino) => destino.id === atividade.destinoId
    )
  );

  // Reúne todas as informações da viagem.
  const novaRota = {
    nome: nome.trim(),
    descricao: descricao.trim(),
    categoria,
    visibilidade,
    dataInicio: dataInicio || null,
    dataFim: dataFim || null,
    orcamento: orcamento === "" ? null : Number(orcamento),
    destinos,
    atividades: atividadesValidas,
  };

  // Exibe os dados para teste.
  console.log("Rota preparada:", novaRota);

  setMensagem(
    "Sua rota foi preparada! ♡ " +
    "Em breve conectaremos o salvamento ao banco de dados."
  );
}
  }

  return (
    <div className="pagina-criar-rota">
      <header className="criar-rota-cabecalho">
        <span className="criar-rota-etiqueta">
          ✈ MEU DIÁRIO DE VIAGENS
        </span>

        <h1>Vamos planejar um sonho? ♡</h1>

        <p>
          Crie sua viagem, escolha seu estilo e guarde
          cada detalhe de um lugar que deseja conhecer.
        </p>
      </header>

      <form className="formulario-rota" onSubmit={criarRota}>
        <section className="formulario-secao">
          <h2>♡ Sobre sua viagem</h2>

          <div className="campo-formulario">
            <label htmlFor="nome-rota">Nome da rota *</label>
            <input
              id="nome-rota"
              type="text"
              placeholder="Ex.: Minha primeira viagem à Espanha"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="descricao-rota">Descrição</label>
            <textarea
              id="descricao-rota"
              placeholder="Conte um pouquinho sobre esse sonho..."
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </section>

        <section className="formulario-secao">
          <h2>✧ Qual é o estilo da sua viagem?</h2>

          <div className="categorias-rota">
            <label
              className={
                "categoria-rota economica " +
                (categoria === "economica" ? "selecionada" : "")
              }
            >
              <input
                type="radio"
                name="categoria"
                value="economica"
                checked={categoria === "economica"}
                onChange={() => setCategoria("economica")}
              />
              <span className="categoria-emoji">🌿</span>
              <strong>Econômica</strong>
              <small>O sonho possível</small>
            </label>

            <label
              className={
                "categoria-rota executiva " +
                (categoria === "executiva" ? "selecionada" : "")
              }
            >
              <input
                type="radio"
                name="categoria"
                value="executiva"
                checked={categoria === "executiva"}
                onChange={() => setCategoria("executiva")}
              />
              <span className="categoria-emoji">🌸</span>
              <strong>Executiva</strong>
              <small>O conforto planejado</small>
            </label>

            <label
              className={
                "categoria-rota premium " +
                (categoria === "premium" ? "selecionada" : "")
              }
            >
              <input
                type="radio"
                name="categoria"
                value="premium"
                checked={categoria === "premium"}
                onChange={() => setCategoria("premium")}
              />
              <span className="categoria-emoji">💎</span>
              <strong>Premium</strong>
              <small>O sonho extraordinário</small>
            </label>
          </div>
        </section>

        <section className="formulario-secao">
          <h2>✈ Datas e orçamento</h2>

          <p className="secao-explicacao">
            Ainda não sabe quando vai viajar? Sem problema!
            Você pode deixar essas informações em branco.
          </p>

          <div className="campos-linha">
            <div className="campo-formulario">
              <label htmlFor="data-inicio">Data de início</label>
              <input
                id="data-inicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="data-fim">Data de término</label>
              <input
                id="data-fim"
                type="date"
                min={dataInicio || undefined}
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
          </div>

          <div className="campo-formulario">
            <label htmlFor="orcamento-rota">
              Orçamento estimado (R$)
            </label>
            <input
              id="orcamento-rota"
              type="number"
              min="0"
              step="0.01"
              placeholder="Ex.: 8000"
              value={orcamento}
              onChange={(e) => setOrcamento(e.target.value)}
            />
          </div>
        </section>

        <DestinosRota
  destinos={destinos}
  setDestinos={setDestinos}
/>
        <AtividadesRota
  destinos={destinos}
  atividades={atividades}
  setAtividades={setAtividades}
/>

        <section className="formulario-secao">
          <h2>♡ Quem poderá ver sua rota?</h2>

          <div className="opcoes-visibilidade">
            <label>
              <input
                type="radio"
                name="visibilidade"
                checked={visibilidade === "privada"}
                onChange={() => setVisibilidade("privada")}
              />
              <span>
                <strong>🔒 Privada</strong>
                <small>
                  Somente você e colaboradores autorizados
                  poderão visualizar.
                </small>
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="visibilidade"
                checked={visibilidade === "publica"}
                onChange={() => setVisibilidade("publica")}
              />
              <span>
                <strong>🌍 Pública</strong>
                <small>
                  Outros usuários poderão conhecer
                  e se inspirar na sua rota.
                </small>
              </span>
            </label>
          </div>
        </section>

        {mensagem && (
          <p className="mensagem-rota" role="status">
            {mensagem}
          </p>
        )}


        <div className="acoes-rota">
          <button
            type="button"
            className="botao-cancelar-rota"
            onClick={() => mudarPagina("inicio")}
          >
            Voltar ao início
          </button>

          <button type="submit" className="botao-criar-rota">
            ♡ Criar minha rota
          </button>
        </div>
      </form>
    </div>
  );
}

export default CriarRota;

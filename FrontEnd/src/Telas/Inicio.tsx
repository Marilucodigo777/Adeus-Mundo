
import "./Inicio.css";

type InicioProps = {
  mudarPagina: (pagina: string) => void;
};

const destinos = [
  {
    nome: "Madrid",
    pais: "Espanha",
    imagem:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=900&q=80",
    descricao: "História, cultura e lugares incríveis.",
  },
  {
    nome: "Barcelona",
    pais: "Espanha",
    imagem:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80",
    descricao: "Arquitetura, arte e praias encantadoras.",
  },
  {
    nome: "Valência",
    pais: "Espanha",
    imagem:
      "https://images.unsplash.com/photo-1599302592205-d7d683c83a8a?auto=format&fit=crop&w=900&q=80",
    descricao: "Praias, gastronomia e modernidade.",
  },
];

function Inicio({ mudarPagina }: InicioProps) {
  return (
    <div className="pagina-inicio">
      <section className="inicio-hero">
        <div className="hero-conteudo">
          <span className="hero-etiqueta">
            ✈ BEM-VINDA AO ADEUS, MUNDO
          </span>

          <h1>
            O mundo começa
            <br />
            com um <em>sonho.</em> ♡
          </h1>

          <p>
            Para quem ainda não foi, para quem está indo
            e para quem nunca deixou de sonhar.
          </p>

          <div className="hero-botoes">
            <button
              className="botao-rosa"
              onClick={() => mudarPagina("criar")}
            >
              ♡ Criar minha rota
            </button>

            <button
              className="botao-contorno"
              onClick={() => mudarPagina("explorar")}
            >
              Explorar o mundo →
            </button>
          </div>
        </div>

        <div className="hero-decoracao">
          <span className="hero-aviao">✈</span>
          <span className="hero-coracao">♡</span>
          <span className="hero-frase">
            Colecione sonhos,
            <br />
            descubra o mundo.
          </span>
        </div>
      </section>

      <section className="secao-destinos">
        <div className="secao-cabecalho">
          <div>
            <span className="secao-etiqueta">
              SEU PRÓXIMO DESTINO
            </span>
            <h2>Destinos para sonhar ♡</h2>
          </div>

          <button
            className="link-destinos"
            onClick={() => mudarPagina("explorar")}
          >
            Ver todos →
          </button>
        </div>

        <div className="destinos-grid">
          {destinos.map((destino) => (
            <article
              className="destino-card"
              key={destino.nome}
            >
              <img
                src={destino.imagem}
                alt={`Vista de ${destino.nome}`}
                loading="lazy"
              />

              <div className="destino-informacoes">
                <span>{destino.pais}</span>
                <h3>{destino.nome}</h3>
                <p>{destino.descricao}</p>

                <button
                  onClick={() => mudarPagina("explorar")}
                >
                  Descobrir destino →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="secao-estilos">
        <div className="secao-cabecalho">
          <div>
            <span className="secao-etiqueta">
              CADA SONHO TEM SEU CAMINHO
            </span>
            <h2>Viaje do seu jeito ✨</h2>
          </div>
        </div>

        <div className="estilos-grid">
          <div className="estilo-card economica">
            <span className="estilo-icone">🌿</span>
            <h3>Econômica</h3>
            <p>
              Descubra o mundo aproveitando cada
              oportunidade e economizando.
            </p>
          </div>

          <div className="estilo-card executiva">
            <span className="estilo-icone">🌸</span>
            <h3>Executiva</h3>
            <p>
              Experiências especiais com equilíbrio
              entre conforto e orçamento.
            </p>
          </div>

          <div className="estilo-card premium">
            <span className="estilo-icone">💎</span>
            <h3>Premium</h3>
            <p>
              Viva experiências extraordinárias
              e realize seus maiores sonhos.
            </p>
          </div>
        </div>
      </section>

      <section className="secao-criadora">
        <div>
          <span className="secao-etiqueta">
            ROTAS ESPECIAIS
          </span>

          <h2>Rotas da criadora ♡</h2>

          <p>
            Roteiros planejados com carinho,
            pesquisas detalhadas e o desejo
            de conhecer cada cantinho do mundo.
          </p>

          <button
            className="botao-rosa"
            onClick={() => mudarPagina("criadora")}
          >
            Conhecer as rotas →
          </button>
        </div>

        <span className="criadora-decoracao">♡ ✈ ♡</span>
      </section>

      <footer className="inicio-rodape">
        Adeus, mundo ♡ — Porque todo sonho merece
        um lugar para começar.
      </footer>
    </div>
  );
}

export default Inicio;


import "./MenuLateral.css";

const itensMenu = [
  { icone: "⌂", nome: "Início", rota: "inicio" },
  { icone: "◎", nome: "Explorar o mundo", rota: "explorar" },
  { icone: "✎", nome: "Criar nova rota", rota: "criar" },
  { icone: "▤", nome: "Minhas rotas", rota: "minhas-rotas" },
  { icone: "♡", nome: "Rotas da criadora", rota: "criadora" },
  { icone: "♧", nome: "Colaborações", rota: "colaboracoes" },
  { icone: "☆", nome: "Meus favoritos", rota: "favoritos" },
  { icone: "♙", nome: "Meu perfil", rota: "perfil" },
  { icone: "⚙", nome: "Configurações", rota: "configuracoes" },
];

type MenuLateralProps = {
  paginaAtual: string;
  mudarPagina: (pagina: string) => void;
};

function MenuLateral({
  paginaAtual,
  mudarPagina,
}: MenuLateralProps) {
  return (
    <aside className="menu-lateral">
      <div className="menu-logo">
        <span className="menu-aviao">✈</span>
        <h1>Adeus, mundo<span>♡</span></h1>
        <p>Seu mundo começa com um sonho.</p>
      </div>

      <nav className="menu-navegacao">
        {itensMenu.map((item) => (
          <button
            key={item.rota}
            type="button"
            className={
              "menu-item " +
              (paginaAtual === item.rota ? "ativo " : "") +
              (item.rota === "criar" ? "destaque" : "")
            }
            onClick={() => mudarPagina(item.rota)}
          >
            <span className="menu-icone">{item.icone}</span>
            <span>{item.nome}</span>
          </button>
        ))}
      </nav>

      <div className="menu-rodape">
        Feito para quem nunca deixou de sonhar ♡
      </div>
    </aside>
  );
}

export default MenuLateral;

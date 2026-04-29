import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMagnifyingGlass, HiArrowLeft, HiCog6Tooth, HiXMark } from "react-icons/hi2";
import Logo from "./Logo";

function Header({ busca, onBusca, totalSelecionados, opcoes, onOpcoes }) {
  const [configAberta, setConfigAberta] = useState(false);

  return (
    <>
      {/* Painel de configurações — abre abaixo do header ancorado na engrenagem */}
      {configAberta && (
        <div className="fixed top-[72px] right-8 z-40 bg-gray-900 border border-gray-600 rounded-xl p-3 w-56 shadow-2xl shadow-black/60"
          style={{ animation: "fadeDown 0.18s ease-out" }}
        >
          {/* Setinha apontando para cima em direção à engrenagem */}
          <div className="absolute -top-[6px] right-5 w-3 h-3 bg-gray-900 border-l border-t border-gray-600 rotate-45" />

          <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-2 px-1">
            Opções do script
          </p>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2.5 cursor-pointer px-1 py-1.5 rounded-lg hover:bg-gray-800 transition-colors group">
              <input
                type="checkbox"
                checked={opcoes.aceitarAcordos}
                onChange={(e) => onOpcoes({ ...opcoes, aceitarAcordos: e.target.checked })}
                className="accent-blue-500 w-3.5 h-3.5 cursor-pointer shrink-0"
              />
              <div>
                <p className="text-white text-xs font-medium group-hover:text-blue-300 transition-colors leading-tight">
                  Aceitar acordos
                </p>
                <p className="text-gray-500 text-[10px] font-mono">--accept-source-agreements</p>
              </div>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer px-1 py-1.5 rounded-lg hover:bg-gray-800 transition-colors group">
              <input
                type="checkbox"
                checked={opcoes.verificarErros}
                onChange={(e) => onOpcoes({ ...opcoes, verificarErros: e.target.checked })}
                className="accent-blue-500 w-3.5 h-3.5 cursor-pointer shrink-0"
              />
              <div>
                <p className="text-white text-xs font-medium group-hover:text-blue-300 transition-colors leading-tight">
                  Verificar erros
                </p>
                <p className="text-gray-500 text-[10px]">Aviso se falhar por pacote</p>
              </div>
            </label>
          </div>
        </div>
      )}

      <header className="bg-gray-800 border-b border-gray-700 py-4 px-8 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <Logo />
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">Winget Store</h1>
              <p className="text-gray-400 text-xs">Instale programas no Windows</p>
            </div>
          </Link>

          {/* Navegação */}
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors border border-blue-400/30 hover:border-blue-300/50 px-3 py-1.5 rounded-lg bg-blue-400/5 hover:bg-blue-400/10"
            >
              <HiArrowLeft className="w-3.5 h-3.5" />
              Landing Page
            </Link>
            <Link to="/como-usar" className="text-gray-400 hover:text-white text-sm transition-colors">
              Como usar
            </Link>
            <Link to="/sobre" className="text-gray-400 hover:text-white text-sm transition-colors">
              Sobre
            </Link>
            <Link to="/privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacidade
            </Link>
          </nav>

          {/* Direita: badge + busca + engrenagem */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Badge selecionados */}
            <div className="w-[120px] flex justify-end">
              <span className={`bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full transition-all duration-300 ${
                totalSelecionados > 0 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
              }`}>
                {totalSelecionados} selecionado(s)
              </span>
            </div>

            {/* Busca */}
            {busca !== undefined && (
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar programa..."
                  value={busca}
                  onChange={(e) => onBusca(e.target.value)}
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-9 pr-4 py-2 w-52 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            )}

            {/* Engrenagem de configurações com tooltip */}
            <div className="relative group">
              <button
                onClick={() => setConfigAberta((v) => !v)}
                className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${
                  configAberta
                    ? "bg-gray-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white"
                }`}
              >
                <HiCog6Tooth className="w-4 h-4" />
              </button>
              {/* Tooltip */}
              {!configAberta && (
                <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  Configurações do script
                  <div className="absolute -top-[5px] right-3 w-2.5 h-2.5 bg-gray-900 border-l border-t border-gray-700 rotate-45" />
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default Header;
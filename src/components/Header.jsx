import { Link } from "react-router-dom";
import { HiMagnifyingGlass, HiArrowLeft } from "react-icons/hi2";
import Logo from "./Logo";

function Header({ busca, onBusca, totalSelecionados }) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <Logo />
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">
              Winget Store
            </h1>
            <p className="text-gray-400 text-xs">
              Instale programas no Windows
            </p>
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

          <Link
            to="/como-usar"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Como usar
          </Link>
          <Link
            to="/sobre"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Sobre
          </Link>
          <Link
            to="/privacidade"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Privacidade
          </Link>
        </nav>

        {/* Busca e contador */}
        <div className="flex items-center gap-3 shrink-0">
          {totalSelecionados > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {totalSelecionados} selecionado(s)
            </span>
          )}
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
        </div>
      </div>
    </header>
  );
}

export default Header;
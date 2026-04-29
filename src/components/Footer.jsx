import { HiCommandLine } from 'react-icons/hi2'
import { FiGithub } from 'react-icons/fi'
import { BsLightningChargeFill } from 'react-icons/bs'

function Footer({ selecionados, onGerar }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-700 px-8 py-4"
      style={{ background: 'rgba(17,24,39,.95)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Selecionados */}
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full transition-colors ${selecionados.length > 0 ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`} />
          <div>
            <span className="text-white font-bold">
              {selecionados.length} programa(s) selecionado(s)
            </span>
            <p className="text-gray-500 text-xs">
              {selecionados.length === 0 ? 'Clique nos cards para selecionar' : 'Pronto para gerar o script'}
            </p>
          </div>
        </div>

        {/* Centro */}
        <div className="text-center hidden md:block">

          <p className="text-gray-600 text-xs mt-1 flex items-center justify-center gap-2">
            <a
              href="https://github.com/derikolis/Winget-Store"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-gray-400 transition-colors"
            >
              <FiGithub className="w-3 h-3" /> derikolis/Winget-Store
            </a>
            · © 2026
          </p>
        </div>

        {/* Botão */}
        <button
          onClick={onGerar}
          disabled={selecionados.length === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
            selecionados.length > 0
              ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg shadow-blue-900/40'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <BsLightningChargeFill className="w-4 h-4" />
          Gerar Script
        </button>

      </div>
    </div>
  )
}

export default Footer
import { useState, useEffect } from "react";
import { HiTrash, HiBookmark, HiXMark } from "react-icons/hi2";
import { FiGithub } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import programs from "../data/programs.json";

// Total de apps disponíveis
const totalApps = programs.reduce((acc, cat) => acc + cat.apps.length, 0);

function Footer({ selecionados, onGerar, onLimpar, onSalvarPreset, opcoes }) {
  const [salvarAberto, setSalvarAberto] = useState(false);
  const [nomePreset, setNomePreset] = useState("");
  const [feedbackSalvo, setFeedbackSalvo] = useState(false);

  const temSelecao = selecionados.length > 0;

  useEffect(() => {
    if (!temSelecao) setSalvarAberto(false);
  }, [temSelecao]);

  function handleSalvarPreset() {
    if (!nomePreset.trim()) return;
    const ok = onSalvarPreset(nomePreset);
    if (ok) {
      setNomePreset("");
      setSalvarAberto(false);
      setFeedbackSalvo(true);
      setTimeout(() => setFeedbackSalvo(false), 2500);
    }
  }

  return (
    <>
      {/* Painel de salvar preset */}
      {salvarAberto && (
        <div
          className="fixed bottom-[84px] left-8 z-40 bg-gray-900 border border-gray-600 rounded-xl p-4 w-64 shadow-2xl shadow-black/60"
          style={{ animation: "fadeUp 0.18s ease-out" }}
        >
          <div className="absolute -bottom-[6px] left-5 w-3 h-3 bg-gray-900 border-r border-b border-gray-600 rotate-45" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-bold text-sm">Salvar como perfil</span>
            <button onClick={() => setSalvarAberto(false)} className="text-gray-400 hover:text-white transition-colors">
              <HiXMark className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-400 text-xs mb-3">
            {selecionados.length} programa(s) serão salvos.
          </p>
          <input
            type="text"
            value={nomePreset}
            onChange={(e) => setNomePreset(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSalvarPreset()}
            placeholder="Ex: Setup Dev, Setup Gaming..."
            maxLength={30}
            autoFocus
            className="w-full bg-gray-700 text-white placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <button
            onClick={handleSalvarPreset}
            disabled={!nomePreset.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Salvar perfil
          </button>
        </div>
      )}

      <div
        className="fixed bottom-0 left-0 right-0 border-t border-gray-700 px-8 py-4"
        style={{ background: "rgba(17,24,39,.95)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative">

          {/* Esquerda: status + ações */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
                temSelecao ? "bg-blue-400 animate-pulse" : "bg-gray-600"
              }`} />
              <div className="min-w-[200px]">
                <span className="text-white font-bold text-sm">
                  {selecionados.length} programa(s) selecionado(s)
                </span>
                {/* ✅ MELHORIA: contador "X de Y programas" */}
                <p className="text-gray-500 text-xs">
                  {temSelecao
                    ? `${selecionados.length} de ${totalApps} programas disponíveis`
                    : "Clique nos cards para selecionar"}
                </p>
              </div>
            </div>

            {/* Limpar + Salvar com fade */}
            <div className={`flex items-center gap-2 transition-all duration-300 ${
              temSelecao ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
            }`}>
              <button
                onClick={onLimpar}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors border border-gray-700 hover:border-red-400/50 px-2.5 py-1.5 rounded-lg"
              >
                <HiTrash className="w-3.5 h-3.5" />
                Limpar
              </button>

              <button
                onClick={() => setSalvarAberto((v) => !v)}
                className={`flex items-center gap-1.5 text-xs transition-colors border px-2.5 py-1.5 rounded-lg ${
                  feedbackSalvo
                    ? "text-green-400 border-green-400/50 bg-green-400/10"
                    : salvarAberto
                    ? "text-blue-400 border-blue-400/50 bg-blue-400/10"
                    : "text-gray-400 hover:text-blue-400 border-gray-700 hover:border-blue-400/50"
                }`}
              >
                <HiBookmark className="w-3.5 h-3.5" />
                {feedbackSalvo ? "Salvo!" : "Salvar perfil"}
              </button>
            </div>
          </div>

          {/* Centro — absolute para centralizar de verdade independente dos lados */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <p className="text-gray-600 text-xs flex items-center gap-2">
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

          {/* Direita: Gerar Script */}
          {/* ✅ MELHORIA: transição mais clara entre habilitado/desabilitado */}
          <button
            onClick={() => onGerar(opcoes)}
            disabled={!temSelecao}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              temSelecao
                ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg shadow-blue-900/40 scale-100"
                : "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700 scale-95"
            }`}
          >
            <BsLightningChargeFill className={`w-4 h-4 transition-colors ${temSelecao ? "text-white" : "text-gray-600"}`} />
            Gerar Script
          </button>

        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default Footer;
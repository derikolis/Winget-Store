import { useState } from "react";
import categoryIcons from "../constants/categoryIcons";
import { HiBookmark, HiTrash, HiFolderOpen, HiChevronDown, HiChevronUp } from "react-icons/hi2";

function Sidebar({
  categorias,
  categoriaAtiva,
  onSelecionar,
  selecionadosPorCategoria = {},
  categoriasFiltradas = null,
  presets = [],
  onCarregarPreset,
  onDeletarPreset,
}) {
  const [presetsAberto, setPresetsAberto] = useState(false);

  const categoriasComResultado = categoriasFiltradas
    ? new Set(categoriasFiltradas.map((c) => c.category))
    : null;

  const totalApps = categorias.reduce((acc, cat) => acc + cat.apps.length, 0);

  return (
    <aside className="flex flex-col">
      <div className="bg-gray-800 rounded-lg border border-gray-700">

        {/* Categorias */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Categorias
            </h2>
            <span className="text-xs text-gray-500 font-mono">{totalApps} apps</span>
          </div>
          <nav className="flex flex-col gap-0.5" aria-label="Categorias de programas">
            {categorias.map((cat) => {
              const Icon = categoryIcons[cat.category];
              const ativo = categoriaAtiva === cat.category;
              const qtdSelecionados = selecionadosPorCategoria[cat.category] || 0;
              const todosSelected = qtdSelecionados === cat.apps.length;
              const semResultado = categoriasComResultado && !categoriasComResultado.has(cat.category);

              return (
                <button
                  key={cat.category}
                  onClick={() => !semResultado && onSelecionar(cat.category)}
                  aria-current={ativo ? "page" : undefined}
                  disabled={semResultado}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 text-left ${
                    semResultado
                      ? "text-gray-600 cursor-not-allowed opacity-40"
                      : ativo
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                  <span className="flex-1">{cat.category}</span>

                  <div className="ml-auto shrink-0">
                    {qtdSelecionados > 0 && !semResultado ? (
                      <span
                        className={`text-xs font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                          todosSelected
                            ? ativo
                              ? "bg-green-400/30 text-green-200"
                              : "bg-green-500 text-white"
                            : ativo
                            ? "bg-white/20 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                        aria-label={`${qtdSelecionados} de ${cat.apps.length} selecionados`}
                      >
                        {qtdSelecionados}/{cat.apps.length}
                      </span>
                    ) : (
                      // ✅ MELHORIA: número com opacidade menor no item ativo pra não competir com o nome
                      <span className={`text-xs ${ativo ? "text-white/40" : "text-gray-500"}`} aria-label={`${cat.apps.length} programas`}>
                        {cat.apps.length}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Perfis salvos — colado direto abaixo */}
        <div className="border-t border-gray-700">
          <button
            onClick={() => setPresetsAberto((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <HiBookmark className="w-4 h-4 text-blue-400" />
              Perfis salvos
              {presets.length > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {presets.length}
                </span>
              )}
            </span>
            {presetsAberto
              ? <HiChevronUp className="w-4 h-4 text-gray-500" />
              : <HiChevronDown className="w-4 h-4 text-gray-500" />
            }
          </button>

          {presetsAberto && (
            <div className="border-t border-gray-700 px-3 pb-3 pt-2">
              {presets.length === 0 ? (
                <p className="text-gray-500 text-xs text-center py-3">
                  Nenhum perfil salvo ainda.<br />
                  Use o rodapé para salvar.
                </p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {presets.map((preset) => (
                    <div
                      key={preset.id}
                      className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-2 py-2 group"
                    >
                      <button
                        onClick={() => onCarregarPreset(preset)}
                        className="flex-1 text-left min-w-0"
                        title={`Carregar "${preset.nome}" (${preset.total} apps)`}
                      >
                        <p className="text-white text-xs font-semibold truncate">{preset.nome}</p>
                        <p className="text-gray-500 text-xs">{preset.total} apps · {preset.criadoEm}</p>
                      </button>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onCarregarPreset(preset)}
                          title="Carregar perfil"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <HiFolderOpen className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeletarPreset(preset.id)}
                          title="Deletar perfil"
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <HiTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
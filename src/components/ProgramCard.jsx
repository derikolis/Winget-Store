function ProgramCard({ app, selecionado, onToggle }) {
  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(app.id);
    }
  }

  return (
    <div
      role="listitem"
      onClick={() => onToggle(app.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${app.name} — ${selecionado ? "selecionado, clique para desmarcar" : "não selecionado, clique para selecionar"}`}
      aria-pressed={selecionado}
      className={`
        cursor-pointer rounded-lg p-4 border transition-all duration-200 select-none
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${selecionado
          ? "bg-blue-600 border-blue-400 scale-[1.02] shadow-lg shadow-blue-900/50"
          : "bg-gray-800 border-gray-700 hover:border-blue-500/50 hover:scale-[1.01] hover:shadow-md hover:shadow-black/30"
        }
      `}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-white">{app.name}</h3>
        {/* checkmark com animação suave */}
        <span
          className={`transition-all duration-200 text-sm ${
            selecionado ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          aria-hidden="true"
        >
          ✅
        </span>
      </div>

      {/* Descrição */}
      <p className={`text-sm mt-1 leading-snug ${selecionado ? "text-blue-100" : "text-gray-400"}`}>
        {app.description}
      </p>

      {/* ID colorido — azul quando normal, branco translúcido quando selecionado */}
      <p className={`text-xs mt-2 font-mono truncate transition-colors duration-200 ${
        selecionado ? "text-blue-200/70" : "text-blue-400/70"
      }`}>
        {app.id}
      </p>
    </div>
  );
}

export default ProgramCard;
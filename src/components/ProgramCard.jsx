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
      className={`cursor-pointer rounded-lg p-4 border transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-500
        ${
          selecionado
            ? "bg-blue-600 border-blue-400 scale-[1.02] shadow-lg shadow-blue-900"
            : "bg-gray-800 border-gray-700 hover:border-gray-500 hover:scale-[1.01]"
        }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">{app.name}</h3>
        <span
          className={`transition-all duration-200 ${selecionado ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
          aria-hidden="true"
        >
          ✅
        </span>
      </div>
      <p className="text-gray-400 text-sm mt-1">{app.description}</p>
      <p className="text-gray-500 text-xs mt-2 font-mono">{app.id}</p>
    </div>
  );
}

export default ProgramCard;

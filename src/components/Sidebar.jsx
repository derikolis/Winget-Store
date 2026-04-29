import categoryIcons from "../constants/categoryIcons";

function Sidebar({ categorias, categoriaAtiva, onSelecionar }) {
  return (
    <aside className="w-56 shrink-0 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg p-4">
        <h2 className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">
          Categorias
        </h2>
        <nav className="flex flex-col gap-1" aria-label="Categorias de programas">
          {categorias.map((cat) => {
            const Icon = categoryIcons[cat.category];
            const ativo = categoriaAtiva === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => onSelecionar(cat.category)}
                aria-current={ativo ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                  ativo
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
                <span>{cat.category}</span>
                <span className="ml-auto text-xs text-gray-500" aria-label={`${cat.apps.length} programas`}>
                  {cat.apps.length}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;

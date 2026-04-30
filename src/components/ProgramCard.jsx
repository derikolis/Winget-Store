import { useState } from "react";
import { Link } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi2";
import { getAppIcon } from "../constants/appIcons";

function ProgramCard({ app, selecionado, onToggle }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = getAppIcon(app.id);

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
      aria-label={`${app.name} — ${selecionado ? "selecionado" : "não selecionado"}`}
      aria-pressed={selecionado}
      className={`
        h-full cursor-pointer rounded-lg p-3 border transition-all duration-200 select-none
        focus:outline-none focus:ring-2 focus:ring-blue-500 relative group
        ${selecionado
          ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-900/50"
          : "bg-gray-800 border-gray-700 hover:border-blue-500/50 hover:shadow-md hover:shadow-black/30"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-1">
        {iconUrl && !imgError ? (
          <img
            src={iconUrl}
            alt=""
            aria-hidden="true"
            onError={() => setImgError(true)}
            className={`w-6 h-6 rounded shrink-0 object-contain ${selecionado ? "brightness-0 invert" : ""}`}
          />
        ) : (
          <div className={`w-6 h-6 rounded shrink-0 flex items-center justify-center text-xs font-bold ${
            selecionado ? "bg-white/20 text-white" : "bg-gray-700 text-gray-400"
          }`}>
            {app.name.charAt(0)}
          </div>
        )}

        <h3 className="font-semibold text-white text-sm leading-tight flex-1 min-w-0 truncate">
          {app.name}
        </h3>

        <span
          className={`transition-all duration-200 text-xs shrink-0 ${
            selecionado ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          aria-hidden="true"
        >
          ✅
        </span>
      </div>

      {/* Descrição */}
      <p className={`text-xs leading-snug ${selecionado ? "text-blue-100" : "text-gray-400"}`}>
        {app.description}
      </p>

      {/* ID */}
      <p className={`text-xs mt-1.5 font-mono truncate ${
        selecionado ? "text-blue-200/70" : "text-blue-400/70"
      }`}>
        {app.id}
      </p>

      {/* Botão Ver mais — aparece no hover, não propaga o clique */}
      <Link
        to={`/app/${encodeURIComponent(app.id)}`}
        onClick={(e) => e.stopPropagation()}
        className={`
          absolute bottom-2 right-2 flex items-center gap-1 text-xs px-2 py-0.5 rounded-md
          transition-all duration-200 opacity-0 group-hover:opacity-100
          ${selecionado
            ? "bg-white/20 hover:bg-white/30 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
          }
        `}
        title={`Saiba mais sobre ${app.name}`}
      >
        <HiInformationCircle className="w-3 h-3" />
        Ver mais
      </Link>
    </div>
  );
}

export default ProgramCard;
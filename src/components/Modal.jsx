import { useState } from "react";
import {
  HiXMark,
  HiClipboardDocument,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
import { BsLightningChargeFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";

function Modal({ script, onFechar, onBaixar }) {
  const [copiado, setCopiado] = useState(false);

  function copiar() {
    navigator.clipboard.writeText(script).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onFechar();
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl border border-gray-700 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 shrink-0">
          <h2
            id="modal-title"
            className="text-white font-bold text-lg flex items-center gap-2"
          >
            <BsLightningChargeFill
              className="text-blue-400"
              aria-hidden="true"
            />
            Script Gerado
          </h2>
          <button
            onClick={onFechar}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          <p className="text-gray-400 text-sm mb-3">
            Seu script personalizado está pronto! Baixe e execute como
            Administrador.
          </p>

          <pre
            className="bg-gray-900 rounded-lg p-4 text-green-400 text-sm overflow-auto max-h-[40vh] font-mono leading-relaxed"
            aria-label="Conteúdo do script gerado"
          >
            {script}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-700 shrink-0">
          <button
            onClick={onFechar}
            className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={copiar}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
              copiado
                ? "bg-green-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {copiado ? (
              <>
                <HiClipboardDocumentCheck className="w-4 h-4" /> Copiado!
              </>
            ) : (
              <>
                <HiClipboardDocument className="w-4 h-4" /> Copiar
              </>
            )}
          </button>
          <button
            onClick={onBaixar}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            Baixar .ps1
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

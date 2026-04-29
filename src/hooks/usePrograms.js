import { useState, useEffect } from "react";

const STORAGE_KEY = "winget-store-selecionados";

export function usePrograms() {
  const [selecionados, setSelecionados] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selecionados));
  }, [selecionados]);

  function togglePrograma(id) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function toggleCategoria(categoria) {
    const idsCategoria = categoria.apps.map((app) => app.id);
    const todosSelected = idsCategoria.every((id) => selecionados.includes(id));
    if (todosSelected) {
      setSelecionados((prev) => prev.filter((id) => !idsCategoria.includes(id)));
    } else {
      setSelecionados((prev) => [...new Set([...prev, ...idsCategoria])]);
    }
  }

  function limparSelecao() {
    setSelecionados([]);
  }

  return { selecionados, togglePrograma, toggleCategoria, limparSelecao };
}

import { useState, useEffect, useMemo } from "react";

const STORAGE_KEY = "winget-store-selecionados";
const PRESETS_KEY = "winget-store-presets";

export function usePrograms() {
  const [selecionados, setSelecionados] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [presets, setPresets] = useState(() => {
    try {
      const saved = localStorage.getItem(PRESETS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ✅ MELHORIA: Set para lookups O(1) ao invés de O(n) com .includes()
  const selecionadosSet = useMemo(() => new Set(selecionados), [selecionados]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selecionados));
  }, [selecionados]);

  useEffect(() => {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  }, [presets]);

  function togglePrograma(id) {
    setSelecionados((prev) =>
      selecionadosSet.has(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  function toggleCategoria(categoria) {
    const idsCategoria = categoria.apps.map((app) => app.id);
    const todosSelected = idsCategoria.every((id) => selecionadosSet.has(id));
    if (todosSelected) {
      setSelecionados((prev) =>
        prev.filter((id) => !idsCategoria.includes(id)),
      );
    } else {
      setSelecionados((prev) => [...new Set([...prev, ...idsCategoria])]);
    }
  }

  function limparSelecao() {
    setSelecionados([]);
  }

  // ✅ NOVA FUNCIONALIDADE: Presets/perfis salvos
  function salvarPreset(nome) {
    if (!nome.trim() || selecionados.length === 0) return false;
    const novoPreset = {
      id: Date.now(),
      nome: nome.trim(),
      ids: [...selecionados],
      total: selecionados.length,
      criadoEm: new Date().toLocaleDateString("pt-BR"),
    };
    setPresets((prev) => [novoPreset, ...prev]);
    return true;
  }

  function carregarPreset(preset) {
    setSelecionados(preset.ids);
  }

  function deletarPreset(id) {
    setPresets((prev) => prev.filter((p) => p.id !== id));
  }

  return {
    selecionados,
    selecionadosSet,
    togglePrograma,
    toggleCategoria,
    limparSelecao,
    presets,
    salvarPreset,
    carregarPreset,
    deletarPreset,
  };
}

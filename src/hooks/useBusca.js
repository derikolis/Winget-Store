import { useState, useEffect } from "react";

export function useBusca(delay = 200) {
  const [busca, setBusca] = useState("");
  const [buscaDebounced, setBuscaDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setBuscaDebounced(busca), delay);
    return () => clearTimeout(timer);
  }, [busca, delay]);

  return { busca, setBusca, buscaDebounced };
}

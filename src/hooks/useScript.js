import { useState } from "react";

export function useScript() {
  const [modalAberto, setModalAberto] = useState(false);
  const [script, setScript] = useState("");

  function gerarScript(selecionados) {
    const linhas = [
      "# Script gerado pelo Winget Store",
      "# github.com/derikolis/Winget-Store",
      "",
      "Write-Host 'Iniciando instalacao dos programas...' -ForegroundColor Cyan",
      "",
      ...selecionados.map((id) => `winget install --id ${id} -e --silent`),
      "",
      "Write-Host 'Instalacao concluida!' -ForegroundColor Green",
    ];
    setScript(linhas.join("\n"));
    setModalAberto(true);
  }

  function baixarScript(script) {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "instalar.ps1";
    a.click();
    URL.revokeObjectURL(url);
    setModalAberto(false);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  return { script, modalAberto, gerarScript, baixarScript, fecharModal };
}

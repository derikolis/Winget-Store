import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useScript } from "../hooks/useScript";

vi.stubGlobal("URL", {
  createObjectURL: vi.fn(() => "blob:mock"),
  revokeObjectURL: vi.fn(),
});

describe("useScript", () => {
  it("inicia com script vazio e modal fechado", () => {
    const { result } = renderHook(() => useScript());
    expect(result.current.script).toBe("");
    expect(result.current.modalAberto).toBe(false);
  });

  it("gera script com os IDs selecionados e abre o modal", () => {
    const { result } = renderHook(() => useScript());
    act(() => {
      result.current.gerarScript(["Google.Chrome", "Microsoft.VisualStudioCode"]);
    });
    expect(result.current.script).toContain("winget install --id Google.Chrome -e --silent");
    expect(result.current.script).toContain("winget install --id Microsoft.VisualStudioCode -e --silent");
    expect(result.current.script).toContain("# Script gerado pelo Winget Store");
    expect(result.current.modalAberto).toBe(true);
  });

  it("fecha o modal ao chamar fecharModal", () => {
    const { result } = renderHook(() => useScript());
    act(() => {
      result.current.gerarScript(["Google.Chrome"]);
    });
    act(() => {
      result.current.fecharModal();
    });
    expect(result.current.modalAberto).toBe(false);
  });

  it("script contém mensagens de início e conclusão", () => {
    const { result } = renderHook(() => useScript());
    act(() => {
      result.current.gerarScript(["Valve.Steam"]);
    });
    expect(result.current.script).toContain("Iniciando instalacao");
    expect(result.current.script).toContain("Instalacao concluida");
  });
});

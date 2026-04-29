import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { usePrograms } from "../hooks/usePrograms";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("usePrograms", () => {
  beforeEach(() => localStorageMock.clear());

  it("inicia com seleção vazia", () => {
    const { result } = renderHook(() => usePrograms());
    expect(result.current.selecionados).toEqual([]);
  });

  it("adiciona um programa ao selecionar", () => {
    const { result } = renderHook(() => usePrograms());
    act(() => { result.current.togglePrograma("Google.Chrome"); });
    expect(result.current.selecionados).toContain("Google.Chrome");
  });

  it("remove o programa ao selecionar novamente (toggle)", () => {
    const { result } = renderHook(() => usePrograms());
    act(() => { result.current.togglePrograma("Google.Chrome"); });
    act(() => { result.current.togglePrograma("Google.Chrome"); });
    expect(result.current.selecionados).not.toContain("Google.Chrome");
  });

  it("persiste a seleção no localStorage", () => {
    const { result } = renderHook(() => usePrograms());
    act(() => { result.current.togglePrograma("Valve.Steam"); });
    const salvo = JSON.parse(localStorageMock.getItem("winget-store-selecionados"));
    expect(salvo).toContain("Valve.Steam");
  });

  it("restaura a seleção do localStorage ao inicializar", () => {
    localStorageMock.setItem(
      "winget-store-selecionados",
      JSON.stringify(["Mozilla.Firefox", "Discord.Discord"])
    );
    const { result } = renderHook(() => usePrograms());
    expect(result.current.selecionados).toContain("Mozilla.Firefox");
    expect(result.current.selecionados).toContain("Discord.Discord");
  });

  it("seleciona todos os programas de uma categoria", () => {
    const { result } = renderHook(() => usePrograms());
    const categoria = {
      category: "Jogos",
      apps: [
        { id: "Valve.Steam" },
        { id: "EpicGames.EpicGamesLauncher" },
      ],
    };
    act(() => { result.current.toggleCategoria(categoria); });
    expect(result.current.selecionados).toContain("Valve.Steam");
    expect(result.current.selecionados).toContain("EpicGames.EpicGamesLauncher");
  });

  it("desmarca todos ao chamar toggleCategoria quando todos já estão selecionados", () => {
    const { result } = renderHook(() => usePrograms());
    const categoria = {
      category: "Jogos",
      apps: [{ id: "Valve.Steam" }, { id: "EpicGames.EpicGamesLauncher" }],
    };
    act(() => { result.current.toggleCategoria(categoria); });
    act(() => { result.current.toggleCategoria(categoria); });
    expect(result.current.selecionados).not.toContain("Valve.Steam");
    expect(result.current.selecionados).not.toContain("EpicGames.EpicGamesLauncher");
  });

  it("limpa toda a seleção com limparSelecao", () => {
    const { result } = renderHook(() => usePrograms());
    act(() => { result.current.togglePrograma("Google.Chrome"); });
    act(() => { result.current.togglePrograma("Valve.Steam"); });
    act(() => { result.current.limparSelecao(); });
    expect(result.current.selecionados).toEqual([]);
  });
});

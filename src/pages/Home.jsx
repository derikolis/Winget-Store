import { useState, useMemo, useEffect } from "react";
import Header from "../components/Header";
import ProgramCard from "../components/ProgramCard";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import programs from "../data/programs.json";
import categoryIcons from "../constants/categoryIcons";
import { usePrograms } from "../hooks/usePrograms";
import { useScript } from "../hooks/useScript";
import { useBusca } from "../hooks/useBusca";
import { HiCheckCircle, HiXCircle, HiXMark } from "react-icons/hi2";

function Home() {
  useEffect(() => { document.title = "Winget Store"; }, []);

  const [categoriaAtiva, setCategoriaAtiva] = useState(programs[0].category);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [opcoes, setOpcoes] = useState({ aceitarAcordos: false, verificarErros: false });

  const {
    selecionados, selecionadosSet, togglePrograma, toggleCategoria,
    limparSelecao, presets, salvarPreset, carregarPreset, deletarPreset,
  } = usePrograms();

  const { script, modalAberto, gerarScript, baixarScript, fecharModal } = useScript();
  const { busca, setBusca, buscaDebounced } = useBusca();

  const categoriasFiltradas = useMemo(() => {
    const termo = buscaDebounced.toLowerCase();
    return programs
      .map((categoria) => ({
        ...categoria,
        apps: categoria.apps.filter(
          (app) =>
            app.name.toLowerCase().includes(termo) ||
            app.description.toLowerCase().includes(termo) ||
            app.id.toLowerCase().includes(termo)
        ),
      }))
      .filter((categoria) => categoria.apps.length > 0);
  }, [buscaDebounced]);

  const categoriaVisivel = buscaDebounced
    ? categoriasFiltradas
    : categoriasFiltradas.filter((c) => c.category === categoriaAtiva);

  const selecionadosPorCategoria = useMemo(() => {
    const mapa = {};
    programs.forEach((cat) => {
      mapa[cat.category] = cat.apps.filter((app) => selecionadosSet.has(app.id)).length;
    });
    return mapa;
  }, [selecionadosSet]);

  function handleSelecionarCategoria(cat) {
    setCategoriaAtiva(cat);
    setSidebarAberta(false); // fecha sidebar no mobile ao selecionar
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Header
        busca={busca}
        onBusca={setBusca}
        totalSelecionados={selecionados.length}
        opcoes={opcoes}
        onOpcoes={setOpcoes}
        onToggleSidebar={() => setSidebarAberta((v) => !v)}
      />

      <div className="flex-1 overflow-hidden relative">

        {/* Overlay mobile — fecha sidebar ao clicar fora */}
        {sidebarAberta && (
          <div
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={() => setSidebarAberta(false)}
          />
        )}

        <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 xl:px-16 h-full flex gap-4 lg:gap-8 pt-4 lg:pt-6 min-h-0 max-w-screen-xl">

          {/* Sidebar mobile — drawer */}
          <div className={`
            fixed top-0 left-0 h-full z-30 pt-[60px] pb-[60px] w-56
            bg-gray-900 transition-transform duration-300 ease-in-out overflow-y-auto
            lg:hidden
            ${sidebarAberta ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          `}>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-white font-bold text-sm">Categorias</span>
              <button onClick={() => setSidebarAberta(false)} className="text-gray-400 hover:text-white">
                <HiXMark className="w-5 h-5" />
              </button>
            </div>
            <Sidebar
              categorias={programs}
              categoriaAtiva={categoriaAtiva}
              onSelecionar={handleSelecionarCategoria}
              selecionadosPorCategoria={selecionadosPorCategoria}
              categoriasFiltradas={buscaDebounced ? categoriasFiltradas : null}
              presets={presets}
              onCarregarPreset={carregarPreset}
              onDeletarPreset={deletarPreset}
            />
          </div>

          {/* Sidebar desktop */}
          <div className="hidden lg:block lg:w-48 xl:w-56 lg:shrink-0 overflow-y-auto self-start sticky top-0">            <Sidebar
              categorias={programs}
              categoriaAtiva={categoriaAtiva}
              onSelecionar={handleSelecionarCategoria}
              selecionadosPorCategoria={selecionadosPorCategoria}
              categoriasFiltradas={buscaDebounced ? categoriasFiltradas : null}
              presets={presets}
              onCarregarPreset={carregarPreset}
              onDeletarPreset={deletarPreset}
            />
          </div>

          {/* Conteúdo principal */}
          <main className="flex-1 overflow-y-auto pr-1 pl-1 min-w-0 pb-20">
            {categoriaVisivel.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-lg font-medium">Nenhum programa encontrado</p>
                <p className="text-sm mt-1">Tente buscar pelo nome, descrição ou ID</p>
              </div>
            ) : (
              categoriaVisivel.map((categoria) => {
                const Icon = categoryIcons[categoria.category];
                const todosSelected = categoria.apps.every((app) => selecionadosSet.has(app.id));

                return (
                  <div key={categoria.category} className="mb-6">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 min-w-0">
                        {Icon && <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />}
                        <span className="truncate">{categoria.category}</span>
                        <span className="text-sm font-normal text-gray-500 shrink-0">
                          ({categoria.apps.length})
                        </span>
                      </h2>
                      <button
                        onClick={() => toggleCategoria(categoria)}
                        className={`flex items-center gap-1.5 text-xs sm:text-sm transition-colors shrink-0 ${
                          todosSelected
                            ? "text-red-400 hover:text-red-300"
                            : "text-blue-400 hover:text-blue-300"
                        }`}
                      >
                        {todosSelected ? (
                          <><HiXCircle className="w-4 h-4" /><span className="hidden sm:inline">Desmarcar todos</span></>
                        ) : (
                          <><HiCheckCircle className="w-4 h-4" /><span className="hidden sm:inline">Selecionar todos</span></>
                        )}
                      </button>
                    </div>

                    {/* Grid responsivo */}
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 items-stretch"
                      role="list"
                      aria-label={`Programas de ${categoria.category}`}
                    >
                      {categoria.apps.map((app) => (
                        <ProgramCard
                          key={app.id}
                          app={app}
                          selecionado={selecionadosSet.has(app.id)}
                          onToggle={togglePrograma}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </main>

        </div>
      </div>

      <Footer
        selecionados={selecionados}
        onGerar={() => gerarScript(selecionados, opcoes)}
        onLimpar={limparSelecao}
        onSalvarPreset={salvarPreset}
        opcoes={opcoes}
      />

      {modalAberto && (
        <Modal
          script={script}
          onFechar={fecharModal}
          onBaixar={() => baixarScript(script)}
        />
      )}
    </div>
  );
}

export default Home;
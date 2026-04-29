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
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

function Home() {
  useEffect(() => { document.title = "Winget Store"; }, []);

  const [categoriaAtiva, setCategoriaAtiva] = useState(programs[0].category);

  // Opções do script — gerenciadas aqui e passadas para Header e Footer
  const [opcoes, setOpcoes] = useState({
    aceitarAcordos: false,
    verificarErros: false,
  });

  const {
    selecionados,
    selecionadosSet,
    togglePrograma,
    toggleCategoria,
    limparSelecao,
    presets,
    salvarPreset,
    carregarPreset,
    deletarPreset,
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

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24">
      <Header
        busca={busca}
        onBusca={setBusca}
        totalSelecionados={selecionados.length}
        opcoes={opcoes}
        onOpcoes={setOpcoes}
      />

      <div className="max-w-7xl mx-auto px-8 py-8 flex gap-8">
        <Sidebar
          categorias={programs}
          categoriaAtiva={categoriaAtiva}
          onSelecionar={setCategoriaAtiva}
          selecionadosPorCategoria={selecionadosPorCategoria}
          categoriasFiltradas={buscaDebounced ? categoriasFiltradas : null}
          presets={presets}
          onCarregarPreset={carregarPreset}
          onDeletarPreset={deletarPreset}
        />

        <main className="flex-1">
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
                <div key={categoria.category} className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
                      {categoria.category}
                    </h2>
                    <button
                      onClick={() => toggleCategoria(categoria)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        todosSelected
                          ? "text-red-400 hover:text-red-300"
                          : "text-blue-400 hover:text-blue-300"
                      }`}
                    >
                      {todosSelected ? (
                        <><HiXCircle className="w-4 h-4" /> Desmarcar todos</>
                      ) : (
                        <><HiCheckCircle className="w-4 h-4" /> Selecionar todos</>
                      )}
                    </button>
                  </div>

                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
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
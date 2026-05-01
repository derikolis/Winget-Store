import { useEffect } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Header from "../components/Header";

const techs = [
  { name: "React 19", color: "bg-blue-600" },
  { name: "Tailwind CSS", color: "bg-cyan-600" },
  { name: "Vite", color: "bg-purple-600" },
  { name: "React Router", color: "bg-orange-600" },
  { name: "React Icons", color: "bg-pink-600" },
  { name: "PowerShell", color: "bg-blue-800" },
  { name: "Winget", color: "bg-green-700" },
];

const cards = [
  {
    title: "O que é o Winget Store?",
    desc: "Uma ferramenta open source que facilita a instalação de programas no Windows. Selecione os programas, gere um script PowerShell personalizado e execute com um clique — sem downloads suspeitos, sem cracks.",
  },
  {
    title: "Como funciona?",
    desc: "O site utiliza o winget — gerenciador de pacotes oficial da Microsoft — para instalar os programas diretamente dos servidores oficiais de cada fabricante. Todo o processo é local: nenhum dado é enviado para nossos servidores.",
  },
  {
    title: "Por que foi criado?",
    desc: "Formatar o PC e reinstalar tudo é uma tarefa repetitiva e chata. O Winget Store nasceu para resolver isso: monte sua lista uma vez, gere o script e use em qualquer PC.",
  },
];

function Sobre() {
  useEffect(() => {
    document.title = "Sobre | Winget Store";
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="max-w-3xl mx-auto px-8 py-12">
        {/* Header da página */}
        <div className="mb-10">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">
            // sobre
          </span>
          <h1 className="text-4xl font-bold text-white mt-2 mb-3">O projeto</h1>
          <p className="text-gray-400">
            Conheça o Winget Store e quem está por trás dele.
          </p>
        </div>

        {/* Cards de info */}
        <div className="flex flex-col gap-6 mb-8">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-600 transition-colors"
            >
              <h2 className="text-lg font-bold mb-3">{c.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Tecnologias */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-bold mb-4">Tecnologias utilizadas</h2>
          <div className="flex flex-wrap gap-2">
            {techs.map((t) => (
              <span
                key={t.name}
                className={`${t.color} text-white text-sm px-3 py-1 rounded-full font-medium`}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>

        {/* Desenvolvedor */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-bold mb-5">Desenvolvedor</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
              D
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg">Derik Oliveira</p>
              <p className="text-gray-400 text-sm mb-3">Dev Full Stack Jr</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/derikolis"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  <FiGithub size={14} /> github.com/derikolis
                </a>
                <a
                  href="https://github.com/derikolis/Winget-Store"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 text-sm transition-colors"
                >
                  <FiExternalLink size={14} /> Repositório
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Sobre;

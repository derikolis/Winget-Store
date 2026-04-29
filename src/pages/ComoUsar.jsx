import { useEffect } from "react"
import { Link } from "react-router-dom"
import {
  HiCommandLine, HiArrowRight, HiShieldCheck
} from "react-icons/hi2"
import { BsTerminal } from "react-icons/bs"
import { FaWindows } from "react-icons/fa"
import Header from "../components/Header"

const steps = [
  {
    num: "01",
    title: "Selecione os programas",
    desc: "Na página inicial, navegue pelas categorias na sidebar e clique nos cards dos programas que deseja instalar. Os cards ficam azuis quando selecionados.",
    tip: null,
  },
  {
    num: "02",
    title: "Gere o script",
    desc: 'Clique no botão "Gerar Script" no rodapé da página. Um modal vai aparecer com o script personalizado pronto para uso.',
    tip: null,
  },
  {
    num: "03",
    title: "Baixe o arquivo",
    desc: 'Clique em "Baixar .ps1" para fazer o download do script gerado com os programas que você escolheu.',
    tip: null,
  },
  {
    num: "04",
    title: "Execute o script",
    desc: 'Clique com o botão direito no arquivo baixado e selecione "Executar com PowerShell". Os programas serão instalados automaticamente.',
    tip: "winget install --id Google.Chrome -e --silent",
  },
]

const requisitos = [
  { icon: <FaWindows size={16} />,      label: "Windows 10 (build 1809+) ou Windows 11" },
  { icon: <HiCommandLine size={16} />,  label: "winget instalado (nativo no Windows 11)" },
  { icon: <HiShieldCheck size={16} />,  label: "Recomendado: executar como Administrador" },
]

function ComoUsar() {
  useEffect(() => { document.title = "Como usar | Winget Store" }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="max-w-3xl mx-auto px-8 py-12">

        {/* Header da página */}
        <div className="mb-10">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">// como usar</span>
          <h1 className="text-4xl font-bold text-white mt-2 mb-3">Guia de uso</h1>
          <p className="text-gray-400">
            Instale programas no Windows em poucos passos — sem complicação.
          </p>
        </div>

        {/* Requisitos */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-10">
          <h2 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-4">Requisitos</h2>
          <div className="flex flex-col gap-3">
            {requisitos.map((r, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="text-blue-400">{r.icon}</span>
                {r.label}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          {steps.map((s) => (
            <div key={s.num} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-600 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-blue-600/20 border border-blue-600/40 text-blue-400 font-mono font-bold text-sm w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  {s.num}
                </span>
                <h2 className="text-lg font-bold">{s.title}</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              {s.tip && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4 font-mono text-blue-400 text-sm flex items-center gap-2">
                  <BsTerminal className="shrink-0" />
                  {s.tip}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center">
          <Link
            to="/app"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Começar agora <HiArrowRight />
          </Link>
        </div>

      </main>
    </div>
  )
}

export default ComoUsar
import { useEffect } from "react"
import { FiGithub } from "react-icons/fi"
import {
  HiShieldCheck, HiCommandLine, HiLockClosed, HiChatBubbleLeftRight
} from "react-icons/hi2"
import Header from "../components/Header"

const sections = [
  {
    icon: <HiShieldCheck size={20} />,
    title: "Coleta de dados",
    desc: "O Winget Store não coleta nenhum dado pessoal dos usuários. Não utilizamos cookies, não rastreamos sua navegação e não armazenamos nenhuma informação sobre você ou sobre os programas que você seleciona.",
  },
  {
    icon: <HiCommandLine size={20} />,
    title: "Scripts gerados",
    desc: "Os scripts gerados pelo Winget Store são criados localmente no seu navegador. Nenhuma informação sobre sua seleção é enviada para nossos servidores — tudo acontece na sua máquina.",
  },
  {
    icon: <HiLockClosed size={20} />,
    title: "Instalação de programas",
    desc: "Os programas são instalados diretamente dos servidores oficiais de cada fabricante através do winget. O Winget Store não tem acesso ao seu computador nem ao processo de instalação.",
  },
  {
    icon: <HiChatBubbleLeftRight size={20} />,
    title: "Contato",
    desc: "Dúvidas sobre privacidade? Entre em contato pelo GitHub.",
    link: { label: "github.com/derikolis", href: "https://github.com/derikolis" },
  },
]

function Privacidade() {
  useEffect(() => { document.title = "Privacidade | Winget Store" }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="max-w-3xl mx-auto px-8 py-12">

        {/* Header da página */}
        <div className="mb-10">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">// privacidade</span>
          <h1 className="text-4xl font-bold text-white mt-2 mb-3">Política de Privacidade</h1>
          <p className="text-gray-400">
            Transparência total sobre como o Winget Store trata seus dados — spoiler: não trata nenhum.
          </p>
        </div>

        {/* Banner de destaque */}
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-5 mb-8 flex items-center gap-4">
          <HiShieldCheck className="text-blue-400 w-8 h-8 shrink-0" />
          <p className="text-blue-300 text-sm leading-relaxed">
            O Winget Store <strong>não coleta, não armazena e não transmite</strong> nenhum dado pessoal. Tudo funciona 100% localmente no seu navegador.
          </p>
        </div>

        {/* Seções */}
        <div className="flex flex-col gap-6">
          {sections.map((s) => (
            <div key={s.title} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-600 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-blue-400">{s.icon}</span>
                <h2 className="text-lg font-bold">{s.title}</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              {s.link && (
                <a
                  href={s.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors mt-3"
                >
                  <FiGithub size={14} /> {s.link.label}
                </a>
              )}
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}

export default Privacidade
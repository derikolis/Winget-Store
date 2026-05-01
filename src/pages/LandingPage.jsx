import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HiGlobeAlt,
  HiCommandLine,
  HiMusicalNote,
  HiWrenchScrewdriver,
  HiChatBubbleLeftRight,
  HiShieldCheck,
  HiPuzzlePiece,
  HiDocument,
  HiPaintBrush,
  HiCloud,
  HiArrowRight,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";
import { FiGithub, FiStar } from "react-icons/fi";
import { FaWindows } from "react-icons/fa";
import { MdVerified, MdLoop, MdOpenInNew } from "react-icons/md";
import { BsTerminal, BsLightningChargeFill } from "react-icons/bs";
import Logo from "../components/Logo";
import programs from "../data/programs.json";

// ✅ MELHORIA: contagem real de apps por categoria vinda do JSON
const appCountMap = Object.fromEntries(
  programs.map((cat) => [cat.category, cat.apps.length]),
);

const categories = [
  { icon: <HiGlobeAlt size={18} />, label: "Navegadores" },
  { icon: <HiCommandLine size={18} />, label: "Desenvolvimento" },
  { icon: <HiMusicalNote size={18} />, label: "Multimídia" },
  { icon: <HiWrenchScrewdriver size={18} />, label: "Utilitários" },
  { icon: <HiChatBubbleLeftRight size={18} />, label: "Comunicação" },
  { icon: <HiShieldCheck size={18} />, label: "Segurança" },
  { icon: <HiPuzzlePiece size={18} />, label: "Jogos" },
  { icon: <HiDocument size={18} />, label: "Escritório" },
  { icon: <HiPaintBrush size={18} />, label: "Design" },
  { icon: <HiCloud size={18} />, label: "Armazenamento" },
].map((c) => ({ ...c, count: appCountMap[c.label] || 0 }));

const totalApps = programs.reduce((acc, cat) => acc + cat.apps.length, 0);

const steps = [
  {
    num: "01",
    title: "Acesse o site",
    desc: "Abra o Winget Store no navegador. Nada para instalar, zero configuração.",
  },
  {
    num: "02",
    title: "Selecione apps",
    desc: "Navegue pelas categorias e marque os programas que deseja instalar.",
  },
  {
    num: "03",
    title: "Gere o script",
    desc: 'Clique em "Gerar Script" e baixe o arquivo .ps1 personalizado.',
  },
  {
    num: "04",
    title: "Execute",
    desc: 'Clique direito no arquivo → "Executar com PowerShell". Pronto.',
  },
];

const features = [
  {
    icon: <MdVerified size={18} />,
    title: "100% oficial",
    desc: "Instalações direto dos servidores dos fabricantes. Sem cracks, sem adware, sem riscos.",
  },
  {
    icon: <BsLightningChargeFill size={18} />,
    title: "Rápido & automatizado",
    desc: 'Instale dezenas de programas de uma vez. Sem clicar em "próximo" infinitas vezes.',
  },
  {
    icon: <MdLoop size={18} />,
    title: "Reproduzível",
    desc: "Guarde o script e use em qualquer PC. Ideal para formatar e reconfigurar rápido.",
  },
  {
    icon: <FiGithub size={18} />,
    title: "Open source & gratuito",
    desc: "Código aberto no GitHub. Sem cadastro, sem assinatura, sem truques.",
  },
];

const faqs = [
  {
    q: "Preciso instalar algum programa para usar o Winget Store?",
    a: "Não! O Winget Store roda direto no navegador. Você só precisa do winget instalado no Windows — ele já vem nativo no Windows 10 (atualização de maio de 2021) e Windows 11.",
  },
  {
    q: "É seguro? De onde vêm os programas?",
    a: "Totalmente seguro. Os programas são instalados diretamente dos servidores oficiais de cada fabricante através do winget, o gerenciador de pacotes oficial da Microsoft. O Winget Store apenas gera o script — não tem acesso ao seu computador.",
  },
  {
    q: "Funciona em qual versão do Windows?",
    a: "Windows 10 (build 1809 ou superior com App Installer atualizado) e Windows 11. Não funciona no Windows 7 ou 8.",
  },
  {
    q: "Preciso ser administrador para executar o script?",
    a: "Recomendamos executar como administrador para garantir que todos os programas sejam instalados corretamente, especialmente os que precisam de permissões elevadas.",
  },
  {
    q: "Posso usar o script gerado em vários PCs?",
    a: "Sim! Esse é um dos grandes benefícios. Guarde o arquivo .ps1 e execute em qualquer PC com Windows. Ideal para formatar o computador e reinstalar tudo rapidamente.",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FAQ() {
  const [aberto, setAberto] = useState(null);
  return (
    <div className="lp-faq-list">
      {faqs.map((f, i) => (
        <div key={i} className={`lp-faq-item${aberto === i ? " open" : ""}`}>
          <button
            className="lp-faq-q"
            onClick={() => setAberto(aberto === i ? null : i)}
          >
            <span>{f.q}</span>
            {aberto === i ? (
              <HiChevronUp size={18} />
            ) : (
              <HiChevronDown size={18} />
            )}
          </button>
          {aberto === i && <div className="lp-faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  );
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function LandingPage() {
  useEffect(() => {
    document.title = "Winget Store — Instale programas no Windows";
  }, []);

  const [refStats, visStats] = useReveal();
  const [refSteps, visSteps] = useReveal();
  const [refReqs, visReqs] = useReveal();
  const [refCats, visCats] = useReveal();
  const [refScript, visScript] = useReveal();
  const [refFeats, visFeats] = useReveal();
  const [refFaq, visFaq] = useReveal();
  const [refCta, visCta] = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700&display=swap');

        :root {
          --bg: #13151f; --surface: #1a1d2e; --surface2: #20243a;
          --border: #2a2f4a; --accent: #4d7fff; --accent2: #6b9fff;
          --text: #e8eaf6; --muted: #7b82a8;
          --mono: 'Space Mono', monospace; --sans: 'DM Sans', sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: var(--sans); overflow-x: hidden; }
        .lp-wrap { position: relative; min-height: 100vh; }

        .lp-grid-bg {
          position: fixed; inset: 0;
          background-image: linear-gradient(rgba(77,127,255,.04) 1px,transparent 1px), linear-gradient(90deg,rgba(77,127,255,.04) 1px,transparent 1px);
          background-size: 40px 40px; pointer-events: none; z-index: 0;
        }

        /* NAV */
        .lp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem;
          background: rgba(19,21,31,.88); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border);
        }
        .lp-nav-logo { display: flex; align-items: center; gap: .75rem; text-decoration: none; }
        .lp-nav-logo .lp-logo-title { display: block; font-size: 1.1rem; font-weight: 700; color: var(--text); line-height: 1.2; }
        .lp-nav-logo .lp-logo-sub  { display: block; font-size: .72rem; color: var(--muted); }
        .lp-nav-links { display: flex; gap: 2rem; list-style: none; }
        .lp-nav-links button { font-family: var(--mono); font-size: .78rem; color: var(--muted); background: none; border: none; cursor: pointer; transition: color .2s; }
        .lp-nav-links button:hover { color: var(--accent); }
        .lp-nav-cta {
          display: inline-flex; align-items: center; gap: .4rem;
          font-family: var(--mono); font-size: .78rem; background: var(--accent);
          color: #000; padding: .5rem 1.2rem; border-radius: 4px; text-decoration: none; font-weight: 700; transition: opacity .2s;
        }
        .lp-nav-cta:hover { opacity: .85; }

        /* HERO */
        .lp-hero {
          position: relative; z-index: 1; min-height: 100vh;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center; padding: 8rem 2rem 4rem;
        }
        .lp-badge {
          display: inline-flex; align-items: center; gap: .5rem;
          font-family: var(--mono); font-size: .72rem; color: var(--accent);
          background: rgba(77,127,255,.08); border: 1px solid rgba(77,127,255,.25);
          padding: .35rem .9rem; border-radius: 100px; margin-bottom: 1.5rem;
        }
        .lp-badge-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; }
        .lp-logo-hero { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .lp-logo-hero svg { filter: drop-shadow(0 0 20px rgba(37,99,235,.4)); flex-shrink: 0; }
        .lp-logo-title { display: block; font-size: 1.6rem; font-weight: 700; color: var(--text); line-height: 1.2; text-align: left; }
        .lp-logo-sub   { display: block; font-size: .8rem; color: var(--muted); text-align: left; }
        .lp-hero h1 { font-family: var(--mono); font-size: clamp(2rem,6vw,4.2rem); font-weight: 700; line-height: 1.1; letter-spacing: -.03em; max-width: 860px; }
        .lp-hero h1 em { font-style: normal; color: var(--accent); }
        .lp-hero-sub { color: var(--muted); font-size: clamp(.95rem,2vw,1.15rem); margin: 1.5rem 0 2.5rem; max-width: 560px; line-height: 1.6; }
        .lp-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
        .lp-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          background: var(--accent); color: #000; font-weight: 700; font-family: var(--mono);
          font-size: .85rem; padding: .85rem 1.8rem; border-radius: 6px; text-decoration: none; transition: opacity .2s;
        }
        .lp-btn-primary:hover { opacity: .85; }
        .lp-btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          border: 1px solid var(--border); color: var(--text); font-family: var(--mono);
          font-size: .85rem; padding: .85rem 1.8rem; border-radius: 6px; text-decoration: none; transition: border-color .2s, background .2s;
        }
        .lp-btn-secondary:hover { border-color: var(--accent); background: rgba(77,127,255,.05); }
        /* Terminal hero */
        .lp-terminal { margin-top: 3.5rem; width: 100%; max-width: 540px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; text-align: left; }
        .lp-terminal-body { padding: 1.2rem 1.5rem; font-family: var(--mono); font-size: .78rem; line-height: 2; }
        .t-comment { color: var(--muted); }
        .t-cmd { color: var(--accent2); }
        .t-flag { color: var(--muted); }
        .t-pkg  { color: var(--accent); }
        .t-ok   { color: #3fb950; margin-right: .4rem; }
        .t-cursor { display: inline-block; width: 8px; height: 1em; background: var(--accent); vertical-align: text-bottom; animation: blink 1s step-end infinite; }

        /* STATS */
        .lp-stats { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .lp-stat { background: var(--bg); padding: 2.5rem 2rem; text-align: center; }
        .lp-stat-num { font-family: var(--mono); font-size: 2.4rem; font-weight: 700; color: var(--accent); display: block; }
        .lp-stat-label { font-size: .85rem; color: var(--muted); margin-top: .25rem; }

        /* SECTIONS */
        .lp-section { position: relative; z-index: 1; padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
        .lp-section-label { font-family: var(--mono); font-size: .7rem; color: var(--accent); letter-spacing: .15em; text-transform: uppercase; margin-bottom: .8rem; }
        .lp-section-title { font-family: var(--mono); font-size: clamp(1.5rem,3.5vw,2.4rem); font-weight: 700; line-height: 1.2; }
        .lp-section-title em { font-style: normal; color: var(--accent); }

        /* STEPS */
        .lp-steps { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 1.5rem; margin-top: 3rem; }
        .lp-step { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 2rem; transition: border-color .3s, transform .3s; }
        .lp-step:hover { border-color: var(--accent); transform: translateY(-4px); }
        .lp-step-num { font-family: var(--mono); font-size: .72rem; color: var(--accent); background: rgba(77,127,255,.1); border: 1px solid rgba(77,127,255,.2); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; font-weight: 700; }
        .lp-step h3 { font-family: var(--mono); font-size: .9rem; margin-bottom: .5rem; }
        .lp-step p  { font-size: .85rem; color: var(--muted); }

        /* REQUISITOS */
        .lp-req-box { margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap; }
        .lp-req { display: flex; align-items: center; gap: .6rem; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: .75rem 1.1rem; font-size: .85rem; color: var(--muted); }
        .lp-req svg { color: var(--accent); flex-shrink: 0; }

        /* CATS */
        .lp-cats { display: grid; grid-template-columns: repeat(auto-fill,minmax(175px,1fr)); gap: .75rem; margin-top: 3rem; }
        .lp-cat { display: flex; align-items: center; gap: .75rem; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: .9rem 1rem; font-size: .87rem; color: var(--text); transition: border-color .2s, background .2s; }
        .lp-cat:hover { border-color: var(--accent2); background: rgba(77,127,255,.05); }
        .lp-cat-icon { color: var(--accent); display: flex; align-items: center; flex-shrink: 0; }
        /* ✅ MELHORIA: contador de apps na categoria */
        .lp-cat-count { margin-left: auto; font-family: var(--mono); font-size: .68rem; color: var(--muted); flex-shrink: 0; }

        /* SCRIPT SECTION */
        .lp-script-section { position: relative; z-index: 1; padding: 6rem 2rem; background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .lp-script-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .lp-script-code { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
        .lp-terminal-bar { display: flex; align-items: center; gap: .5rem; padding: .75rem 1rem; background: var(--surface2); border-bottom: 1px solid var(--border); }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot-r { background: #ff5f57; } .dot-y { background: #febc2e; } .dot-g { background: #28c840; }
        .lp-terminal-bar-title { font-family: var(--mono); font-size: .72rem; color: var(--muted); margin-left: .25rem; display: flex; align-items: center; gap: .35rem; }
        .lp-script-code pre { padding: 1.8rem; font-family: var(--mono); font-size: .78rem; line-height: 1.9; overflow-x: auto; }
        .keyword { color: #ff7b72; } .func { color: var(--accent2); } .flag { color: var(--muted); } .str { color: var(--accent); } .comment2 { color: var(--muted); }
        .lp-features { display: flex; flex-direction: column; gap: 1.5rem; }
        .lp-feature { display: flex; gap: 1rem; align-items: flex-start; }
        .lp-feature-icon { width: 36px; height: 36px; background: rgba(77,127,255,.1); border: 1px solid rgba(77,127,255,.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0; }
        .lp-feature-text h4 { font-family: var(--mono); font-size: .88rem; margin-bottom: .3rem; }
        .lp-feature-text p  { font-size: .84rem; color: var(--muted); }

        /* FAQ */
        .lp-faq-list { margin-top: 3rem; display: flex; flex-direction: column; gap: .75rem; }
        .lp-faq-item { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; transition: border-color .2s; }
        .lp-faq-item.open { border-color: var(--accent); }
        .lp-faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.2rem 1.5rem; background: none; border: none; cursor: pointer; font-family: var(--sans); font-size: .95rem; font-weight: 500; color: var(--text); text-align: left; transition: color .2s; }
        .lp-faq-item.open .lp-faq-q { color: var(--accent); }
        .lp-faq-q svg { flex-shrink: 0; color: var(--muted); }
        .lp-faq-a { padding: 1rem 1.5rem 1.2rem; font-size: .88rem; color: var(--muted); line-height: 1.7; border-top: 1px solid var(--border); }

        /* CTA */
        .lp-cta { position: relative; z-index: 1; padding: 7rem 2rem; text-align: center; }
        .lp-cta-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 600px; height: 300px; background: radial-gradient(ellipse,rgba(77,127,255,.12) 0%,transparent 70%); pointer-events: none; }
        .lp-cta h2 { font-family: var(--mono); font-size: clamp(1.8rem,4vw,3rem); font-weight: 700; position: relative; }
        .lp-cta p  { color: var(--muted); margin: 1rem 0 2.5rem; font-size: 1rem; position: relative; }

        /* FOOTER */
        .lp-footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 2rem; display: flex; align-items: center; justify-content: space-between; font-family: var(--mono); font-size: .72rem; color: var(--muted); flex-wrap: wrap; gap: 1rem; }
        .lp-footer a { color: var(--muted); text-decoration: none; }
        .lp-footer a:hover { color: var(--accent); }

        /* ANIMATIONS */
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: .6; } }

        /* REVEAL ON SCROLL */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-left  { opacity: 0; transform: translateX(-32px); transition: opacity .7s ease, transform .7s ease; }
        .reveal-left.visible  { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(32px); transition: opacity .7s ease, transform .7s ease; }
        .reveal-right.visible { opacity: 1; transform: translateX(0); }
        .reveal-scale { opacity: 0; transform: scale(.95); transition: opacity .6s ease, transform .6s ease; }
        .reveal-scale.visible { opacity: 1; transform: scale(1); }
        .delay-1 { transition-delay: .1s; }
        .delay-2 { transition-delay: .2s; }
        .delay-3 { transition-delay: .3s; }
        .delay-4 { transition-delay: .4s; }

        @media (max-width: 768px) {
          .lp-nav-links { display: none; }
          .lp-stats { grid-template-columns: 1fr; }
          .lp-script-inner { grid-template-columns: 1fr; gap: 2rem; }
          .lp-script-section, .lp-section { padding: 3rem 1.5rem; }
        }
      `}</style>

      <div className="lp-wrap">
        <div className="lp-grid-bg" />

        {/* NAV */}
        <nav className="lp-nav">
          <Link to="/" className="lp-nav-logo">
            <Logo />
            <div>
              <span className="lp-logo-title">Winget Store</span>
              <span className="lp-logo-sub">Instale programas no Windows</span>
            </div>
          </Link>
          <ul className="lp-nav-links">
            <li>
              <button onClick={() => scrollTo("como-usar")}>Como usar</button>
            </li>
            <li>
              <button onClick={() => scrollTo("categorias")}>Categorias</button>
            </li>
            <li>
              <button onClick={() => scrollTo("faq")}>FAQ</button>
            </li>
          </ul>
          <Link to="/app" className="lp-nav-cta">
            Abrir app <HiArrowRight size={12} />
          </Link>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-badge">
            <div className="lp-badge-dot" />
            Powered by Windows Package Manager
          </div>
          <div className="lp-logo-hero">
            <Logo />
            <div>
              <span className="lp-logo-title">Winget Store</span>
              <span className="lp-logo-sub">Instale programas no Windows</span>
            </div>
          </div>
          <h1>
            Instale programas no Windows
            <br />
            <em>como um profissional.</em>
          </h1>
          <p className="lp-hero-sub">
            Selecione os apps, gere um script PowerShell personalizado e instale
            tudo com um clique — sem downloads suspeitos.
          </p>
          <div className="lp-actions">
            <Link to="/app" className="lp-btn-primary">
              <BsTerminal size={15} /> Começar agora
            </Link>
            <a
              href="https://github.com/derikolis/Winget-Store"
              target="_blank"
              rel="noreferrer"
              className="lp-btn-secondary"
            >
              <FiGithub size={15} /> Ver no GitHub
            </a>
          </div>
          <div className="lp-terminal">
            <div className="lp-terminal-bar">
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
              <span className="lp-terminal-bar-title">
                <BsTerminal size={12} /> Windows PowerShell
              </span>
            </div>
            <div className="lp-terminal-body">
              <div className="t-comment"># Script gerado pelo Winget Store</div>
              <div>
                <span className="t-cmd">winget</span> install{" "}
                <span className="t-flag">--id</span>{" "}
                <span className="t-pkg">Google.Chrome</span>{" "}
                <span className="t-flag">-e --silent</span>
              </div>
              <div>
                <span className="t-ok">✔</span> Google Chrome instalado com
                sucesso
              </div>
              <div>
                <span className="t-cmd">winget</span> install{" "}
                <span className="t-flag">--id</span>{" "}
                <span className="t-pkg">Microsoft.VisualStudioCode</span>{" "}
                <span className="t-flag">-e --silent</span>
              </div>
              <div>
                <span className="t-ok">✔</span> Visual Studio Code instalado com
                sucesso
              </div>
              <div>
                <span className="t-cmd">winget</span> install{" "}
                <span className="t-flag">--id</span>{" "}
                <span className="t-pkg">Spotify.Spotify</span>{" "}
                <span className="t-flag">-e --silent</span>
              </div>
              <div>
                <span className="t-ok">✔</span> Spotify instalado com sucesso
              </div>
              <div>
                $ <span className="t-cursor" />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div
          ref={refStats}
          className={`lp-stats reveal-scale${visStats ? " visible" : ""}`}
        >
          <div className="lp-stat">
            <span className="lp-stat-num">{totalApps}+</span>
            <span className="lp-stat-label">programas disponíveis</span>
          </div>
          <div className="lp-stat">
            <span className="lp-stat-num">{categories.length}</span>
            <span className="lp-stat-label">categorias</span>
          </div>
          <div className="lp-stat">
            <span className="lp-stat-num">0</span>
            <span className="lp-stat-label">dados coletados</span>
          </div>
        </div>

        {/* COMO USAR */}
        <section className="lp-section" id="como-usar">
          <div className="lp-section-label">// como usar</div>
          <h2 className="lp-section-title">
            Quatro passos.
            <br />
            <em>Zero complicação.</em>
          </h2>
          <div
            ref={refSteps}
            className={`lp-steps reveal${visSteps ? " visible" : ""}`}
          >
            {steps.map((s, i) => (
              <div
                className={`lp-step reveal${visSteps ? " visible" : ""} delay-${i + 1}`}
                key={s.num}
              >
                <div className="lp-step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="lp-section-label" style={{ marginTop: "3.5rem" }}>
            // requisitos
          </div>
          <h3
            className="lp-section-title"
            style={{ fontSize: "1.3rem", marginBottom: ".5rem" }}
          >
            O que você precisa
          </h3>
          <div
            ref={refReqs}
            className={`lp-req-box reveal${visReqs ? " visible" : ""}`}
          >
            <div className="lp-req">
              <FaWindows size={16} /> Windows 10 (build 1809+) ou Windows 11
            </div>
            <div className="lp-req">
              <HiCommandLine size={16} /> winget instalado (já vem nativo no
              Windows 11)
            </div>
            <div className="lp-req">
              <HiShieldCheck size={16} /> Recomendado: executar como
              Administrador
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section
          className="lp-section"
          id="categorias"
          style={{ paddingTop: 0 }}
        >
          <div className="lp-section-label">// categorias</div>
          <h2 className="lp-section-title">
            Tudo que você
            <br />
            <em>precisa em um lugar.</em>
          </h2>
          <div
            ref={refCats}
            className={`lp-cats reveal${visCats ? " visible" : ""}`}
          >
            {/* ✅ MELHORIA: exibe contagem real de apps por categoria */}
            {categories.map((c) => (
              <div className="lp-cat" key={c.label}>
                <span className="lp-cat-icon">{c.icon}</span>
                <span style={{ flex: 1 }}>{c.label}</span>
                <span className="lp-cat-count">{c.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SCRIPT + FEATURES */}
        <section className="lp-script-section" id="script">
          <div className="lp-script-inner">
            <div
              ref={refScript}
              className={`lp-script-code reveal-left${visScript ? " visible" : ""}`}
            >
              <div className="lp-terminal-bar">
                <div className="dot dot-r" />
                <div className="dot dot-y" />
                <div className="dot dot-g" />
                <span className="lp-terminal-bar-title">
                  <BsTerminal size={11} /> instalar.ps1
                </span>
              </div>
              <pre>
                <span className="comment2">{`# ================================================\n# Script gerado por winget-store.vercel.app\n# ================================================\n\n`}</span>
                <span className="keyword">Write-Host</span>
                {` `}
                <span className="str">"Iniciando instalações..."{"\n\n"}</span>
                <span className="func">winget</span>
                {` install `}
                <span className="flag">--id</span>
                {` `}
                <span className="str">Google.Chrome</span>
                {` `}
                <span className="flag">-e --silent{"\n"}</span>
                <span className="func">winget</span>
                {` install `}
                <span className="flag">--id</span>
                {` `}
                <span className="str">Git.Git</span>
                {` `}
                <span className="flag">-e --silent{"\n"}</span>
                <span className="func">winget</span>
                {` install `}
                <span className="flag">--id</span>
                {` `}
                <span className="str">Microsoft.VisualStudioCode</span>
                {` `}
                <span className="flag">-e --silent{"\n"}</span>
                <span className="func">winget</span>
                {` install `}
                <span className="flag">--id</span>
                {` `}
                <span className="str">Discord.Discord</span>
                {` `}
                <span className="flag">-e --silent{"\n"}</span>
                <span className="func">winget</span>
                {` install `}
                <span className="flag">--id</span>
                {` `}
                <span className="str">Spotify.Spotify</span>
                {` `}
                <span className="flag">-e --silent{"\n\n"}</span>
                <span className="keyword">Write-Host</span>
                {` `}
                <span className="str">"✔ Concluído!"</span>
              </pre>
            </div>
            <div
              ref={refFeats}
              className={`lp-features reveal-right${visFeats ? " visible" : ""}`}
            >
              <div className="lp-section-label">// vantagens</div>
              <h2
                className="lp-section-title"
                style={{ marginBottom: "1.5rem" }}
              >
                Por que usar
                <br />
                <em>winget?</em>
              </h2>
              {features.map((f, i) => (
                <div
                  className={`lp-feature reveal${visFeats ? " visible" : ""} delay-${i + 1}`}
                  key={f.title}
                >
                  <div className="lp-feature-icon">{f.icon}</div>
                  <div className="lp-feature-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          ref={refFaq}
          className={`lp-section reveal${visFaq ? " visible" : ""}`}
          id="faq"
        >
          <div className="lp-section-label">// faq</div>
          <h2 className="lp-section-title">
            Perguntas
            <br />
            <em>frequentes.</em>
          </h2>
          <FAQ />
        </section>

        {/* CTA */}
        <section
          ref={refCta}
          className={`lp-cta reveal${visCta ? " visible" : ""}`}
        >
          <div className="lp-cta-glow" />
          <h2>
            Pronto para instalar
            <br />
            <em style={{ color: "var(--accent)" }}>como um dev?</em>
          </h2>
          <p>
            Acesse agora, selecione seus programas e gere seu script
            personalizado.
          </p>
          <div className="lp-actions" style={{ justifyContent: "center" }}>
            <Link to="/app" className="lp-btn-primary">
              <MdOpenInNew size={16} /> Abrir o Winget Store
            </Link>
            <a
              href="https://github.com/derikolis/Winget-Store"
              target="_blank"
              rel="noreferrer"
              className="lp-btn-secondary"
            >
              <FiStar size={15} /> Star no GitHub
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <span>© 2026 Winget Store — MIT License</span>
          <span>
            Desenvolvido por{" "}
            <a
              href="https://github.com/derikolis"
              target="_blank"
              rel="noreferrer"
            >
              Derik Oliveira
            </a>
          </span>
          <a
            href="https://winget-store.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            winget-store.vercel.app
          </a>
        </footer>
      </div>
    </>
  );
}

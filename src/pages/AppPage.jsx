import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiArrowLeft, HiArrowTopRightOnSquare, HiCheckCircle } from "react-icons/hi2";
import { BsLightningChargeFill } from "react-icons/bs";
import { FiCopy, FiCheck } from "react-icons/fi";
import programs from "../data/programs.json";
import { getAppIcon } from "../constants/appIcons";
import { usePrograms } from "../hooks/usePrograms";

const wikiTerms = {
  "Google.Chrome": "Google Chrome",
  "Mozilla.Firefox": "Mozilla Firefox",
  "Brave.Brave": "Brave browser",
  "Opera.Opera": "Opera browser",
  "Opera.OperaGX": "Opera GX",
  "Microsoft.Edge": "Microsoft Edge",
  "VivaldiTechnologies.Vivaldi": "Vivaldi browser",
  "TorProject.TorBrowser": "Tor Browser",
  "Waterfox.Waterfox": "Waterfox",
  "LibreWolf.LibreWolf": "LibreWolf",
  "Microsoft.VisualStudioCode": "Visual Studio Code",
  "Microsoft.VisualStudio.2022.Community": "Visual Studio",
  "Anysphere.Cursor": "Cursor text editor",
  "Neovim.Neovim": "Neovim",
  "vim.vim": "Vim text editor",
  "SublimeHQ.SublimeText.4": "Sublime Text",
  "Notepad++.Notepad++": "Notepad++",
  "DevToys-app.DevToys": "DevToys",
  "Git.Git": "Git software",
  "GitHub.GitHubDesktop": "GitHub Desktop",
  "Axosoft.GitKraken": "GitKraken",
  "Python.Python.3": "Python programming language",
  "Python.Python.3.11": "Python programming language",
  "Python.Python.3.10": "Python programming language",
  "OpenJS.NodeJS": "Node.js",
  "OpenJS.NodeJS.LTS": "Node.js",
  "Oven-sh.Bun": "Bun software",
  "PHP.PHP": "PHP programming language",
  "GoLang.Go": "Go programming language",
  "Rustlang.Rust.MSVC": "Rust programming language",
  "RubyInstallerTeam.Ruby": "Ruby programming language",
  "Google.FlutterSDK": "Flutter software",
  "Kitware.CMake": "CMake",
  "Hashicorp.Vagrant": "Vagrant software",
  "ApacheFriends.XAMPP": "XAMPP",
  "Postman.Postman": "Postman software",
  "Bruno.Bruno": "Bruno software",
  "Docker.DockerDesktop": "Docker software",
  "Google.AndroidStudio": "Android Studio",
  "JetBrains.IntelliJIDEA.Community": "IntelliJ IDEA",
  "JetBrains.PyCharm.Community": "PyCharm",
  "JetBrains.WebStorm": "WebStorm",
  "JetBrains.Rider": "Rider IDE",
  "HeidiSQL.HeidiSQL": "HeidiSQL",
  "dbeaver.dbeaver": "DBeaver",
  "Oracle.MySQLWorkbench": "MySQL Workbench",
  "MongoDB.Compass.Full": "MongoDB Compass",
  "TimKosse.FileZilla.Client": "FileZilla",
  "WinSCP.WinSCP": "WinSCP",
  "VideoLAN.VLC": "VLC media player",
  "Spotify.Spotify": "Spotify",
  "OBSProject.OBSStudio": "OBS Studio",
  "Audacity.Audacity": "Audacity audio editor",
  "HandBrake.HandBrake": "HandBrake",
  "Apple.iTunes": "iTunes",
  "KDE.Kdenlive": "Kdenlive",
  "Blackmagic.DaVinciResolve": "DaVinci Resolve",
  "PeterPawlowski.foobar2000": "Foobar2000",
  "Gyan.FFmpeg": "FFmpeg",
  "MediaArea.MediaInfo": "MediaInfo",
  "Plex.Plexamp": "Plex media server",
  "Jellyfin.JellyfinMediaPlayer": "Jellyfin",
  "NickeManarin.ScreenToGif": "ScreenToGif",
  "Mp3tag.Mp3tag": "Mp3tag",
  "MKVToolNix.MKVToolNix": "MKVToolNix",
  "GIMP.GIMP": "GIMP",
  "Inkscape.Inkscape": "Inkscape",
  "Figma.Figma": "Figma software",
  "BlenderFoundation.Blender": "Blender software",
  "dotPDN.PaintDotNet": "Paint.NET",
  "KDE.Krita": "Krita",
  "Adobe.CreativeCloud": "Adobe Creative Cloud",
  "Canva.Canva": "Canva",
  "TheDocumentFoundation.LibreOffice": "LibreOffice",
  "Adobe.Acrobat.Reader.64-bit": "Adobe Acrobat",
  "Foxit.FoxitReader": "Foxit Reader",
  "SumatraPDF.SumatraPDF": "Sumatra PDF",
  "Notion.Notion": "Notion productivity software",
  "Obsidian.Obsidian": "Obsidian software",
  "Evernote.Evernote": "Evernote",
  "Microsoft.OneNote": "Microsoft OneNote",
  "Microsoft.Todo": "Microsoft To Do",
  "Appest.TickTick": "TickTick",
  "Atlassian.Trello": "Trello",
  "Discord.Discord": "Discord software",
  "Telegram.TelegramDesktop": "Telegram software",
  "OpenWhisperSystems.Signal": "Signal software",
  "Viber.Viber": "Viber",
  "Zoom.Zoom": "Zoom software",
  "Microsoft.Teams": "Microsoft Teams",
  "SlackTechnologies.Slack": "Slack software",
  "Microsoft.Skype": "Skype",
  "Mozilla.Thunderbird": "Mozilla Thunderbird",
  "Cisco.CiscoWebexMeetings": "Cisco Webex",
  "Mattermost.MattermostDesktop": "Mattermost",
  "Malwarebytes.Malwarebytes": "Malwarebytes",
  "Avast.AvastFreeAntivirus": "Avast",
  "Bitdefender.Bitdefender": "Bitdefender",
  "Bitwarden.Bitwarden": "Bitwarden",
  "DominikReichl.KeePass": "KeePass",
  "KeePassXCTeam.KeePassXC": "KeePassXC",
  "ProtonTechnologies.ProtonVPN": "ProtonVPN",
  "OpenVPNTechnologies.OpenVPN": "OpenVPN",
  "IDRIX.VeraCrypt": "VeraCrypt",
  "GnuPG.Gpg4win": "Gpg4win",
  "7zip.7zip": "7-Zip",
  "RARLab.WinRAR": "WinRAR",
  "CPUID.CPU-Z": "CPU-Z",
  "REALiX.HWiNFO": "HWiNFO",
  "CrystalDewWorld.CrystalDiskInfo": "CrystalDiskInfo",
  "voidtools.Everything": "Everything software",
  "Microsoft.PowerToys": "Microsoft PowerToys",
  "AutoHotkey.AutoHotkey": "AutoHotkey",
  "ShareX.ShareX": "ShareX",
  "Rufus.Rufus": "Rufus software",
  "Ventoy.Ventoy": "Ventoy",
  "Piriform.CCleaner": "CCleaner",
  "Valve.Steam": "Steam service",
  "EpicGames.EpicGamesLauncher": "Epic Games Store",
  "GOG.Galaxy": "GOG Galaxy",
  "Blizzard.BattleNet": "Battle.net",
  "Microsoft.GamingApp": "Xbox app",
  "Google.GoogleDrive": "Google Drive",
  "Dropbox.Dropbox": "Dropbox",
  "Microsoft.OneDrive": "OneDrive",
  "Mega.MEGADesktop": "MEGA service",
  "Nextcloud.NextcloudDesktop": "Nextcloud",
  "Microsoft.Office": "Microsoft Office",
  "Microsoft.PowerBI": "Power BI",
  "Hashicorp.Terraform": "Terraform software",
  "Kubernetes.kubectl": "Kubernetes",
  "Oracle.VirtualBox": "VirtualBox",
  "VMware.WorkstationPlayer": "VMware Workstation",
  "AnyDeskSoftwareGmbH.AnyDesk": "AnyDesk",
  "TeamViewer.TeamViewer": "TeamViewer",
  "Citrix.Workspace": "Citrix Workspace",
  "Fortinet.FortiClientVPN": "FortiClient",
  "Cisco.CiscoAnyConnect": "Cisco AnyConnect",
  "SAP.SAPGUI": "SAP GUI",
  "Atlassian.Jira": "Jira software",
  "Atlassian.Confluence": "Confluence software",
  "Zabbix.ZabbixAgent": "Zabbix",
  "Splunk.UniversalForwarder": "Splunk",
  "WiresharkFoundation.Wireshark": "Wireshark",
  "Insecure.Nmap": "Nmap",
  "PuTTY.PuTTY": "PuTTY",
  "Mobatek.MobaXterm": "MobaXterm",
  "Famatech.AdvancedIPScanner": "Advanced IP Scanner",
  "Tailscale.Tailscale": "Tailscale",
  "uvnc.ultravnc": "UltraVNC",
  "OpenAI.ChatGPT": "ChatGPT",
  "Anthropic.Claude": "Claude language model",
  "Ollama.Ollama": "Ollama software",
  "Grammarly.Grammarly": "Grammarly",
  "MacriumSoftware.MacriumReflect": "Macrium Reflect",
  "Duplicati.Duplicati": "Duplicati",
  "Veeam.VeeamAgentforMicrosoftWindows": "Veeam",
};

function findApp(id) {
  for (const cat of programs) {
    const app = cat.apps.find((a) => a.id === id);
    if (app) return { app, category: cat.category };
  }
  return null;
}

export default function AppPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedId = decodeURIComponent(id);
  const result = findApp(decodedId);
  const { selecionadosSet, togglePrograma } = usePrograms();

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const app = result?.app;
  const category = result?.category;
  const selecionado = app ? selecionadosSet.has(app.id) : false;
  const iconUrl = app ? getAppIcon(app.id) : null;
  const wikiTerm = app ? wikiTerms[app.id] : null;
  const comando = app ? `winget install --id ${app.id} -e --silent` : "";

  useEffect(() => {
    if (!app) return;
    document.title = `${app.name} — Winget Store`;
  }, [app]);

  useEffect(() => {
    if (!wikiTerm) { setTimeout(() => setLoading(false), 0); return; }
    async function fetchWiki() {
      try {
        const resPt = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTerm)}`);
        if (resPt.ok) {
          const data = await resPt.json();
          if (data.extract?.length > 50) {
            setInfo({ extract: data.extract, pageUrl: data.content_urls?.desktop?.page, thumbnail: data.thumbnail?.source });
            return;
          }
        }
        const resEn = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTerm)}`);
        if (resEn.ok) {
          const data = await resEn.json();
          setInfo({ extract: data.extract, pageUrl: data.content_urls?.desktop?.page, thumbnail: data.thumbnail?.source });
        }
      } catch { setInfo(null); }
      finally { setLoading(false); }
    }
    fetchWiki();
  }, [wikiTerm]);

  function copiar() {
    navigator.clipboard.writeText(comando);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  if (!app) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Programa não encontrado.</p>
        <Link to="/app" className="text-blue-400 hover:text-blue-300 text-sm">← Voltar</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3 text-sm">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
            <HiArrowLeft className="w-4 h-4" /> Voltar
          </button>
          <span className="text-gray-600">·</span>
          <Link to="/app" className="text-blue-400 hover:text-blue-300 transition-colors">Winget Store</Link>
          <span className="text-gray-600">·</span>
          <span className="text-gray-400">{category}</span>
          <span className="text-gray-600">·</span>
          <span className="text-white">{app.name}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">

        {/* Hero */}
        <div className="flex items-start gap-6 mb-10">
          {iconUrl && !imgError ? (
            <img src={iconUrl} alt={app.name} onError={() => setImgError(true)}
              className="w-20 h-20 rounded-2xl object-contain bg-gray-800 p-3 border border-gray-700 shrink-0" />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-3xl font-bold text-gray-400 shrink-0">
              {app.name.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-white mb-1">{app.name}</h1>
            <p className="text-gray-400 mb-3">{app.description}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-gray-800 border border-gray-700 text-blue-400 text-xs font-mono px-2.5 py-1 rounded-lg">{app.id}</span>
              <span className="bg-gray-800 border border-gray-700 text-gray-400 text-xs px-2.5 py-1 rounded-lg">{category}</span>
            </div>
          </div>
          <button
            onClick={() => togglePrograma(app.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all shrink-0 ${
              selecionado ? "bg-green-600 hover:bg-red-500 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {selecionado
              ? <><HiCheckCircle className="w-4 h-4" /> Selecionado</>
              : <><BsLightningChargeFill className="w-4 h-4" /> Adicionar à lista</>}
          </button>
        </div>

        {/* Comando */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
          <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">Comando de instalação</h2>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-900 rounded-lg px-4 py-3 font-mono text-sm text-green-400 border border-gray-700 break-all">
              {comando}
            </div>
            <button onClick={copiar}
              className={`flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium transition-all shrink-0 ${
                copiado ? "bg-green-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}>
              {copiado ? <><FiCheck className="w-4 h-4" /> Copiado!</> : <><FiCopy className="w-4 h-4" /> Copiar</>}
            </button>
          </div>
        </div>

        {/* Sobre */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">Sobre o programa</h2>
          {loading ? (
            <div className="flex items-center gap-3 py-8">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-500 text-sm">Buscando informações...</span>
            </div>
          ) : info ? (
            <div className="flex flex-col gap-4">
              {info.thumbnail && (
                <img src={info.thumbnail} alt={app.name}
                  className="w-full max-h-52 object-contain rounded-lg bg-gray-900 p-4 border border-gray-700" />
              )}
              <p className="text-gray-300 text-sm leading-7">{info.extract}</p>
              {info.pageUrl && (
                <a href={info.pageUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs transition-colors w-fit">
                  <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />
                  Ver artigo completo na Wikipedia
                </a>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Informações não disponíveis para este programa.</p>
          )}
        </div>

        {/* Voltar */}
        <div className="mt-8 flex justify-center">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <HiArrowLeft className="w-4 h-4" /> Voltar para o Winget Store
          </button>
        </div>

      </main>
    </div>
  );
}
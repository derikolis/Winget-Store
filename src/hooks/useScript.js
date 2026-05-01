import { useState } from "react";

const SCRIPT_HEADER = `# ================================================
# Script gerado por winget-store.vercel.app
# ================================================

# --- Manter janela aberta em qualquer situacao ---
$ErrorActionPreference = "Continue"

# --- Garantir que a janela nao feche em caso de erro fatal ---
trap {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Red
    Write-Host "  [ERRO FATAL] $_" -ForegroundColor Red
    Write-Host "================================================" -ForegroundColor Red
    Write-Host ""
    Read-Host "Pressione Enter para fechar"
    exit 1
}

# --- Configuracoes ---
$logPath = "$env:TEMP\\winget-store-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
$timeoutSegundos = 300  # 5 minutos por pacote

function Write-Log {
    param([string]$msg, [string]$cor = "White")
    $timestamp = Get-Date -Format "HH:mm:ss"
    $linha = "[$timestamp] $msg"
    Write-Host $linha -ForegroundColor $cor
    Add-Content -Path $logPath -Value $linha -ErrorAction SilentlyContinue
}

Write-Log "================================================" DarkGray
Write-Log "  Winget Store - Log de instalacao" Cyan
Write-Log "  Log salvo em: $logPath" DarkGray
Write-Log "================================================" DarkGray
Write-Log ""

# --- Permitir execucao do script (tenta varios escopos) ---
foreach ($scope in @("Process", "CurrentUser")) {
    try {
        Set-ExecutionPolicy -Scope $scope -ExecutionPolicy Bypass -Force -ErrorAction Stop
        Write-Log "ExecutionPolicy definida no escopo '$scope'." Green
        break
    } catch {
        Write-Log "Aviso: nao foi possivel alterar ExecutionPolicy no escopo '$scope'." Yellow
    }
}

# --- Detectar ambiente (dominio ou local) ---
$emDominio = $false
try {
    $dominio = (Get-WmiObject Win32_ComputerSystem).PartOfDomain
    if ($dominio) {
        $emDominio = $true
        $dominioNome = (Get-WmiObject Win32_ComputerSystem).Domain
        Write-Log "Ambiente de dominio detectado: $dominioNome" Yellow
    } else {
        Write-Log "Ambiente local (fora de dominio)." Green
    }
} catch {
    Write-Log "Nao foi possivel detectar ambiente de dominio." Yellow
}

# --- Verificacao de espaco em disco ---
try {
    $disco = Get-PSDrive C | Select-Object -ExpandProperty Free
    $discoGB = [math]::Round($disco / 1GB, 1)
    if ($discoGB -lt 2) {
        Write-Log "AVISO: Pouco espaco em disco ($($discoGB)GB livre). Recomendado pelo menos 2GB." Yellow
    } else {
        Write-Log "Espaco em disco: $($discoGB)GB livre." Green
    }
} catch {
    Write-Log "Nao foi possivel verificar espaco em disco." Yellow
}

# --- Detectar e configurar proxy ---
try {
    $proxy = [System.Net.WebRequest]::GetSystemWebProxy()
    $proxyUri = $proxy.GetProxy("https://winget.azureedge.net")
    if ($proxyUri.Host -ne "winget.azureedge.net") {
        Write-Log "Proxy detectado: $($proxyUri.AbsoluteUri)" Yellow
        [System.Net.WebRequest]::DefaultWebProxy = New-Object System.Net.WebProxy($proxyUri)
        [System.Net.WebRequest]::DefaultWebProxy.Credentials = [System.Net.CredentialCache]::DefaultNetworkCredentials
        $env:HTTPS_PROXY = $proxyUri.AbsoluteUri
        $env:HTTP_PROXY  = $proxyUri.AbsoluteUri
        Write-Log "Proxy configurado com credenciais do usuario atual." Green
    } else {
        Write-Log "Sem proxy detectado." Green
    }
} catch {
    Write-Log "Nao foi possivel detectar configuracoes de proxy." Yellow
}

# --- Auto-elevacao para Administrador ---
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-NOT $isAdmin) {
    Write-Log "Tentando elevar privilegios..." Cyan

    # Metodo 1: RunAs padrao
    try {
        $argList = "-NoProfile -ExecutionPolicy Bypass -File \`"$PSCommandPath\`""
        Start-Process -FilePath "powershell.exe" -ArgumentList $argList -Verb RunAs -ErrorAction Stop
        exit
    } catch {
        Write-Log "Metodo 1 falhou (UAC bloqueado ou GPO). Tentando metodo 2..." Yellow
    }

    # Metodo 2: credenciais explicitas de dominio
    if ($emDominio) {
        try {
            $cred = Get-Credential -Message "Entre com credenciais de administrador do dominio"
            $argList = "-NoProfile -ExecutionPolicy Bypass -File \`"$PSCommandPath\`""
            Start-Process -FilePath "powershell.exe" -ArgumentList $argList -Credential $cred -ErrorAction Stop
            exit
        } catch {
            Write-Log "Metodo 2 falhou. Continuando sem privilegios elevados..." Yellow
        }
    }

    # Metodo 3: continua sem admin com aviso
    Write-Log "AVISO: Sem privilegios de administrador. Algumas instalacoes podem falhar." Yellow
} else {
    Write-Log "Executando como Administrador." Green
}

# --- Verificacao da versao do PowerShell ---
$psVersion = $PSVersionTable.PSVersion.Major
Write-Log "PowerShell versao: $psVersion" $(if ($psVersion -ge 5) { "Green" } else { "Yellow" })
if ($psVersion -lt 5) {
    Write-Log "PowerShell desatualizado. Minimo recomendado: 5." Yellow
    Write-Log "Baixando Windows Management Framework 5.1..." Cyan
    $wmfUrl = "https://go.microsoft.com/fwlink/?linkid=839516"
    $wmfPath = "$env:TEMP\\WMF51.msu"
    try {
        Invoke-WebRequest -Uri $wmfUrl -OutFile $wmfPath -UseBasicParsing -Proxy $env:HTTPS_PROXY
        Start-Process -FilePath "wusa.exe" -ArgumentList "$wmfPath /quiet /norestart" -Wait
        Write-Log "WMF 5.1 instalado. Reinicie e execute o script novamente." Green
        Read-Host "Pressione Enter para fechar"
        exit
    } catch {
        Write-Log "Falha ao atualizar PowerShell. Acesse: https://aka.ms/wmf51" Red
        Read-Host "Pressione Enter para fechar"
        exit 1
    }
}

# --- Verificacao de conectividade ---
Write-Log "Verificando conexao com a internet..." Cyan
$online = $false
foreach ($h in @("winget.azureedge.net", "8.8.8.8", "microsoft.com")) {
    try {
        if (Test-Connection -ComputerName $h -Count 1 -Quiet -ErrorAction Stop) {
            $online = $true
            break
        }
    } catch {}
}
if (-not $online) {
    Write-Log "AVISO: Sem conexao com a internet. As instalacoes podem falhar." Yellow
} else {
    Write-Log "Conexao com a internet: OK" Green
}

# --- Verificacao e instalacao do winget ---
$wingetExe = "winget"
$wingetOk = $false
try {
    $wingetVersion = & winget --version 2>$null
    if ($wingetVersion) { $wingetOk = $true; Write-Log "winget encontrado: $wingetVersion" Green }
} catch {}

if (-not $wingetOk) {
    foreach ($caminho in @(
        "$env:LOCALAPPDATA\\Microsoft\\WindowsApps\\winget.exe",
        "$env:PROGRAMFILES\\WindowsApps\\Microsoft.DesktopAppInstaller*\\winget.exe"
    )) {
        $found = Get-Item $caminho -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($found) {
            $wingetOk = $true
            $wingetExe = $found.FullName
            $env:PATH += ";$($found.DirectoryName)"
            Write-Log "winget encontrado em: $($found.FullName)" Green
            break
        }
    }
}

if (-not $wingetOk) {
    Write-Log "winget nao encontrado. Tentando instalar..." Yellow
    try {
        $appxPath = "$env:TEMP\\AppInstaller.msixbundle"
        Write-Log "Baixando App Installer da Microsoft..." Cyan
        Invoke-WebRequest -Uri "https://aka.ms/getwinget" -OutFile $appxPath -UseBasicParsing -Proxy $env:HTTPS_PROXY
        Add-AppxPackage -Path $appxPath -ErrorAction Stop
        Write-Log "winget instalado com sucesso!" Green
        Start-Sleep -Seconds 3
    } catch {
        Write-Log "Nao foi possivel instalar o winget. Instale manualmente: https://aka.ms/getwinget" Red
        Read-Host "Pressione Enter para fechar"
        exit 1
    }
}

# --- Aceitar termos do winget antecipadamente ---
try { & $wingetExe list --accept-source-agreements 2>$null | Out-Null } catch {}

Write-Log ""
Write-Log "================================================" DarkGray
Write-Log "  Iniciando instalacao dos programas..." Cyan
Write-Log "================================================" DarkGray
Write-Log ""

# --- Cronometro ---
$inicio = Get-Date`;

const SCRIPT_FOOTER = `
# --- Resumo final ---
$fim = Get-Date
$duracao = [math]::Round(($fim - $inicio).TotalSeconds)
$minutos = [math]::Floor($duracao / 60)
$segundos = $duracao % 60

Write-Log ""
Write-Log "================================================" DarkGray
Write-Log "  Instalacao concluida!" Green
Write-Log "  Tempo total: $($minutos)m $($segundos)s" Cyan
Write-Log "  Erros: $erros de $total pacote(s)" $(if ($erros -gt 0) { "Yellow" } else { "Green" })
Write-Log "  Log salvo em: $logPath" DarkGray
Write-Log "================================================" DarkGray
Write-Log ""
Write-Log "  Desenvolvido por Derik Oliveira" DarkGray
Write-Log "  github.com/derikolis | winget-store.vercel.app" DarkGray
Write-Log ""
Read-Host "Pressione Enter para fechar"`;

export function useScript() {
  const [modalAberto, setModalAberto] = useState(false);
  const [script, setScript] = useState("");

  function gerarScript(selecionados, opcoes = {}) {
    const {
      aceitarAcordos = false,
      verificarErros = false,
    } = opcoes;

    const flags = [
      "-e",
      "--silent",
      aceitarAcordos ? "--accept-source-agreements --accept-package-agreements" : "",
    ].filter(Boolean).join(" ");

    const total = selecionados.length;

    const linhasInstalacao = [
      `$total = ${total}`,
      `$erros = 0`,
      `$atual = 0`,
      "",
      ...selecionados.map((id) => {
        const linhas = [
          `$atual++`,
          `Write-Log "[$atual/$total] Instalando ${id}..." Cyan`,
          ``,
          // Usa --source winget para ignorar msstore (evita erro de certificado em domínios corporativos)
          `winget install --id ${id} ${flags} --source winget`,
        ];

        if (verificarErros) {
          linhas.push(
            `if ($LASTEXITCODE -ne 0) {`,
            `    $erros++`,
            `    Write-Log "  [ERRO] Falha ao instalar ${id} (codigo: $LASTEXITCODE)" Red`,
            `} else {`,
            `    Write-Log "  [OK] ${id} instalado com sucesso" Green`,
            `}`,
          );
        } else {
          linhas.push(`if ($LASTEXITCODE -ne 0) { $erros++ }`);
        }

        linhas.push(``);
        return linhas.join("\n");
      }),
    ];

    const linhas = [
      SCRIPT_HEADER,
      ...linhasInstalacao,
      SCRIPT_FOOTER,
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
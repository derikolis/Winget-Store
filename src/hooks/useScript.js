import { useState } from "react";

const SCRIPT_HEADER = `# ================================================
# Script gerado por winget-store.vercel.app
# ================================================

# --- Permitir execucao do script ---
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# --- Auto-elevacao para Administrador ---
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "Reiniciando como Administrador..." -ForegroundColor Cyan
    Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File \`"$PSCommandPath\`"" -Verb RunAs
    exit
}

# --- Verificacao do PowerShell ---
$psVersion = $PSVersionTable.PSVersion.Major
if ($psVersion -lt 5) {
    Write-Host "PowerShell desatualizado (versao $psVersion). Minimo recomendado: 5." -ForegroundColor Yellow
    Write-Host "Baixando Windows Management Framework 5.1..." -ForegroundColor Cyan
    $wmfUrl = "https://go.microsoft.com/fwlink/?linkid=839516"
    $wmfPath = "$env:TEMP\\WMF51.msu"
    try {
        Invoke-WebRequest -Uri $wmfUrl -OutFile $wmfPath -UseBasicParsing
        Start-Process -FilePath "wusa.exe" -ArgumentList "$wmfPath /quiet /norestart" -Wait
        Write-Host "WMF 5.1 instalado. Reinicie o computador e execute o script novamente." -ForegroundColor Green
        Read-Host "Pressione Enter para fechar"
        exit
    } catch {
        Write-Host "Nao foi possivel atualizar o PowerShell automaticamente." -ForegroundColor Red
        Write-Host "Acesse: https://aka.ms/wmf51" -ForegroundColor Cyan
        Read-Host "Pressione Enter para fechar"
        exit 1
    }
}

# --- Verificacao do winget ---
$wingetOk = $false
try {
    $wingetVersion = winget --version 2>$null
    if ($wingetVersion) {
        $wingetOk = $true
        Write-Host "winget encontrado: $wingetVersion" -ForegroundColor Green
    }
} catch {}

if (-not $wingetOk) {
    Write-Host "winget nao encontrado. Tentando instalar..." -ForegroundColor Yellow
    try {
        $appxUrl = "https://aka.ms/getwinget"
        $appxPath = "$env:TEMP\\AppInstaller.msixbundle"
        Write-Host "Baixando App Installer..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $appxUrl -OutFile $appxPath -UseBasicParsing
        Add-AppxPackage -Path $appxPath
        Write-Host "winget instalado com sucesso!" -ForegroundColor Green
        Start-Sleep -Seconds 2
    } catch {
        Write-Host "Nao foi possivel instalar o winget automaticamente." -ForegroundColor Red
        Write-Host "Instale manualmente: https://aka.ms/getwinget" -ForegroundColor Cyan
        Read-Host "Pressione Enter para fechar"
        exit 1
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor DarkGray
Write-Host "  Iniciando instalacao dos programas..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor DarkGray
Write-Host ""

# --- Cronometro ---
$inicio = Get-Date`;

const SCRIPT_FOOTER = `
# --- Resumo final ---
$fim = Get-Date
$duracao = [math]::Round(($fim - $inicio).TotalSeconds)
$minutos = [math]::Floor($duracao / 60)
$segundos = $duracao % 60

Write-Host ""
Write-Host "================================================" -ForegroundColor DarkGray
Write-Host "  Instalacao concluida!" -ForegroundColor Green
Write-Host "  Tempo total: $($minutos)m $($segundos)s" -ForegroundColor Cyan
Write-Host "  Erros: $erros de $total pacote(s)" -ForegroundColor $(if ($erros -gt 0) { "Yellow" } else { "Green" })
Write-Host "================================================" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Desenvolvido por Derik Oliveira" -ForegroundColor DarkGray
Write-Host "  github.com/derikolis | winget-store.vercel.app" -ForegroundColor DarkGray
Write-Host ""
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

    // Contador de erros e progresso
    const linhasInstalacao = [
      `$total = ${total}`,
      `$erros = 0`,
      `$atual = 0`,
      "",
      ...selecionados.map((id) => {
        const linhas = [
          `$atual++`,
          `Write-Host "[$atual/$total] Instalando ${id}..." -ForegroundColor Cyan`,
          `winget install --id ${id} ${flags}`,
        ];

        if (verificarErros) {
          linhas.push(
            `if ($LASTEXITCODE -ne 0) {`,
            `    $erros++`,
            `    Write-Host "  [ERRO] Falha ao instalar ${id} (codigo: $LASTEXITCODE)" -ForegroundColor Red`,
            `} else {`,
            `    Write-Host "  [OK] ${id} instalado com sucesso" -ForegroundColor Green`,
            `}`,
          );
        } else {
          linhas.push(`if ($LASTEXITCODE -ne 0) { $erros++ }`);
        }

        linhas.push("");
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
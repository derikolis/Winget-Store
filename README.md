<div align="center">

<img src="public/favicon.svg" width="80px" />

# Winget Store

**Selecione, gere e instale programas no Windows com um clique.**  
Powered by Windows Package Manager (winget) — oficial da Microsoft.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=flat-square)

</div>

---

## 📋 Sobre o Projeto

O **Winget Store** é uma ferramenta open source que facilita a instalação de programas no Windows. Selecione os programas desejados, gere um script PowerShell personalizado e execute com um clique — sem downloads suspeitos, sem cracks, sem riscos.

Todo o processo utiliza o **winget** — gerenciador de pacotes oficial da Microsoft.

---

## ✨ Funcionalidades

- ✅ Mais de 90 programas em 10 categorias
- ✅ Busca em tempo real
- ✅ Selecionar todos por categoria
- ✅ Geração automática de script PowerShell
- ✅ Download do script personalizado
- ✅ Interface moderna e responsiva
- ✅ 100% gratuito e open source

---

## 🚀 Como usar

**1. Acesse o site**
> [winget-store.vercel.app](https://winget-store.vercel.app)

**2. Selecione os programas**

Navegue pelas categorias na sidebar e clique nos cards dos programas que deseja instalar.

**3. Gere o script**

Clique em **Gerar Script** no rodapé e baixe o arquivo `.ps1` personalizado.

**4. Execute o script**

Clique com o botão direito no arquivo baixado e selecione **Executar com PowerShell**.

```powershell
# Exemplo de script gerado
winget install --id Google.Chrome -e --silent
winget install --id Microsoft.VisualStudioCode -e --silent
winget install --id Discord.Discord -e --silent
```

---

## 📦 Categorias disponíveis

| Categoria | Programas |
|---|---|
| 🌐 Navegadores | Chrome, Firefox, Brave, Edge, Opera... |
| 💻 Desenvolvimento | VSCode, Git, Python, NodeJS, Docker... |
| 🎵 Multimidia | VLC, Spotify, OBS Studio, Audacity... |
| 🔧 Utilitarios | 7-Zip, CPU-Z, Everything, PowerToys... |
| 💬 Comunicacao | Discord, Telegram, Slack, Zoom... |
| 🔒 Seguranca | Malwarebytes, Bitwarden, ProtonVPN... |
| 🎮 Jogos | Steam, Epic Games, GOG, Battle.net... |
| 📄 Escritorio | LibreOffice, Notion, Obsidian... |
| 🎨 Design | GIMP, Figma, Blender, Inkscape... |
| ☁️ Armazenamento | Google Drive, Dropbox, OneDrive... |

---

## 🛠️ Tecnologias

- **React 18** — interface interativa
- **Tailwind CSS** — estilização moderna
- **Vite** — build rápido
- **React Router** — navegação entre páginas
- **React Icons** — ícones profissionais
- **PowerShell** — scripts de instalação

---

## 💻 Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/derikolis/Winget-Store.git

# Entre na pasta
cd Winget-Store

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um **fork** do projeto
2. Criar uma **branch** (`git checkout -b feature/NovaFeature`)
3. Fazer o **commit** (`git commit -m 'feat: adiciona NovaFeature'`)
4. Fazer o **push** (`git push origin feature/NovaFeature`)
5. Abrir um **Pull Request**

---

## ⚠️ Aviso

Os programas são instalados diretamente dos servidores oficiais de cada fabricante através do winget. O Winget Store não tem acesso ao seu computador nem ao processo de instalação.

---

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Desenvolvido por **Derik Oliveira**

[![GitHub](https://img.shields.io/badge/GitHub-derikolis-181717?style=flat-square&logo=github)](https://github.com/derikolis)

</div>
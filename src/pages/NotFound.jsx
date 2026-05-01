import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function NotFound() {
  useEffect(() => { document.title = "404 | Winget Store"; }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="max-w-3xl mx-auto px-8 py-24 text-center">
        <h1 className="text-8xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-400 mb-10">
          A página que você tentou acessar não existe ou foi removida.
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-block"
        >
          Voltar para o início
        </Link>
      </main>
    </div>
  );
}

export default NotFound;
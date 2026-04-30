import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Home = lazy(() => import("./pages/Home"));
const AppPage = lazy(() => import("./pages/AppPage"));
const ComoUsar = lazy(() => import("./pages/ComoUsar"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Privacidade = lazy(() => import("./pages/Privacidade"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Home />} />
        <Route path="/app/:id" element={<AppPage />} />
        <Route path="/como-usar" element={<ComoUsar />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
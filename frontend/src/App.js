import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Portfolio from "@/pages/Portfolio";
import WorkDetail from "@/pages/WorkDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import { Toaster } from "@/components/ui/toaster";
import ScrollRevealManager from "@/components/ScrollRevealManager";

function App() {
  return (
    <div className="App app-shell">
      <BrowserRouter>
        <ScrollRevealManager />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/work/:id" element={<WorkDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;

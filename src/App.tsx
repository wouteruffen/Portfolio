import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ProjectWebdesign from "./pages/ProjectWebdesign.tsx";
import ProjectBranding from "./pages/ProjectBranding.tsx";
import ProjectProduct from "./pages/ProjectProduct.tsx";
import OverMij from "./pages/OverMij.tsx";
import Brandbook from "./pages/Brandbook.tsx";
import TypoLab from "./pages/TypoLab.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="portfolio-theme">
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/webdesign" element={<ProjectWebdesign />} />
          <Route path="/merkidentiteit" element={<ProjectBranding />} />
          <Route path="/digitale-producten" element={<ProjectProduct />} />
          <Route path="/over-mij" element={<OverMij />} />
          <Route path="/brandbook" element={<Brandbook />} />
          <Route path="/typo-lab" element={<TypoLab />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;

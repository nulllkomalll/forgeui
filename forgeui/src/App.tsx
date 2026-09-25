import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import Home from "./pages/Home";
import Components from "./pages/Components";
import ButtonDocs from "./pages/ButtonDocs";
import InputDocs from "./pages/InputDocs";
import ModalDocs from "./pages/ModalDocs";
import TabsDocs from "./pages/TabsDocs";
import ToastDocs from "./pages/ToastDocs";
import CardDocs from "./pages/CardDocs";
import Playground from "./pages/Playground";
import About from "./pages/About";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/components/button" element={<ButtonDocs />} />
        <Route path="/components/input" element={<InputDocs />} />
        <Route path="/components/modal" element={<ModalDocs />} />
        <Route path="/components/tabs" element={<TabsDocs />} />
        <Route path="/components/toast" element={<ToastDocs />} />
        <Route path="/components/card" element={<CardDocs />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AppShell>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import InterestsPage from "./pages/InterestsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/interests" element={<InterestsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

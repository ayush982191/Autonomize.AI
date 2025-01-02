// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InputPage from "./components/routes/InputPage";
import NoPage from "./components/routes/NoPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<InputPage />}>  
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Game from "../pages/Game";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="NomadCodersReactClone/:coinId/*" element={<Coin />} />
        <Route path="NomadCodersReactClone/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import RootLayout from "./components/layout/RootLayout";
import Ministries from "./components/pages/Ministries";
import MinistryDetails from "./components/pages/MinistryDetails";
import History from "./components/pages/about/History";
import Vision from "./components/pages/about/Vision";
import PastoralTeam from "./components/pages/about/PastoralTeam";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ministerios" element={<Ministries />} />
          <Route path="/ministerios/:id" element={<MinistryDetails />} />
          <Route path="/historia" element={<History />} />
          <Route path="/visao" element={<Vision />} />
          <Route path="/equipe" element={<PastoralTeam />} />
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

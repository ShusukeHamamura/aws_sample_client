import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "../components/pages/Home";
import { TrafficVolume } from "../components/pages/TrafficVolume";

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trafficvolume" element={<TrafficVolume />} />
    </Routes>
  );
});

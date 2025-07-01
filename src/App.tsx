import React from "react";
import { AppointmentProvider } from "./context/AppointmentContext";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AppointmentProvider>
      <Dashboard />
    </AppointmentProvider>
  );
};

export default App;
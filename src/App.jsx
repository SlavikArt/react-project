import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Header />
          <AppRoutes />
          <Footer className="AppFooter" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

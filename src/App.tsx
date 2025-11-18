import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";

import Step1PersonalData from "./components/form/Step1PersonalData";
import Step2ContactData from "./components/form/Step2ContactData";
import Step3Address from "./components/form/Step3Address";
import Step4Visit from "./components/form/Step4Visit";
import Step5Summary from "./components/form/Step5Summary";

export const App: React.FC = () => {
  return (
    <CartProvider>
      {/* <BrowserRouter> */}
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

             {/* Multi-step form routes */}
            <Route path="/register" element={<Navigate to="/register/step-1" replace />} />
            <Route path="/register/step-1" element={<Step1PersonalData />} />
            <Route path="/register/step-2" element={<Step2ContactData />} />
            <Route path="/register/step-3" element={<Step3Address />} />
            <Route path="/register/step-4" element={<Step4Visit />} />
            <Route path="/register/step-5" element={<Step5Summary />} />

            {/* 404 fallback if you want */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
          <Footer />
        </div>
      {/* </BrowserRouter> */}
    </CartProvider>
  );
};

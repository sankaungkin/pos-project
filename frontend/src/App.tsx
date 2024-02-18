import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Category from "./pages/category/Category";
import Unauthorized from "./pages/unauthorized/unauthorized";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./pages/products/Products";
import Inventory from "./pages/inventory/Inventory";
import PurchaseList from "./pages/purchase/PurchaseList";
import InvoiceForm from "./pages/sale/InvoiceForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/category" element={<Category />}></Route>
            <Route path="/product" element={<Products />}></Route>
            <Route path="/unauthorized" element={<Unauthorized />}></Route>
            <Route path="/inventory" element={<Inventory />}></Route>
            <Route path="/purchase" element={<PurchaseList />}></Route>
            <Route path="/invoice" element={<InvoiceForm />}></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;

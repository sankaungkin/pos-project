// Navbar.tsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-xl">
            <Link to="/">ရွှေသစ္စာ</Link>
          </div>
          <ul className="space-x-4">
            <li className="inline-block">{user && <Link to="/">Home</Link>}</li>
            <li className="inline-block">
              {user && <Link to="/invoice">Invoice</Link>}
            </li>
            <li className="inline-block">
              {user && <Link to="/purchase">Purchase</Link>}
            </li>
            <li className="inline-block">
              {user && <Link to="/inventory">Inventory</Link>}
            </li>
            <li className="inline-block">
              {user && <Link to="/category">Category</Link>}
            </li>
            <li className="inline-block">
              {user && <Link to="/product">Product</Link>}
            </li>
            <li className="inline-block">
              <Link to="/login">Login</Link>
            </li>
            <li className="inline-block">
              <Link to="/register">Register</Link>
            </li>
            <li className="inline-block">
              {user && <button onClick={() => logout()}>Logout</button>}
            </li>
            <li className="inline-block font-bold underline">
              {user && <p>{user?.name}</p>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

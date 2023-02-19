import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/Auth/Auth.provider";
import Login from "./pages/Login";
import AppLayout from "./components/Layout/Layout";
import Home from "./pages/Home";

const Products = () => <div>Products</div>
const NotFound = () => <div>404</div>

function App() {
  const { user } = useAuthContext();
  console.log(user)
  return <Routes>
    {user ? (
      <Route path="/" element={<AppLayout />}>
        <Route path="/products" element={<Products />} />
        <Route path="/home" element={<Home />}/>
      </Route>
    ) : (
      <Route path="/login" element={<Login />} />
    )}
    <Route path="*" element={<NotFound />} />
  </Routes>
}

export default App

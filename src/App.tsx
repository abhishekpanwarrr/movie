import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </>
  );
}

export default App;

import { useState } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Modal from "./components/Modal";

function App() {
  const [cart, setCart] = useState([]);

  const addMealToCart = (meal) => {
    setCart(prevCart => {
      return [...prevCart, meal]
    })
  }



  return (
    <>
      <Modal cart={cart}/>
      <Header cartLength={cart.length} addMealToCart={addMealToCart}/>
      <main>
      <Meals addMealToCart={addMealToCart}/>
      </main>
    </>
  );
}

export default App;

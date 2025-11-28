import { useState } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import ModalCart from "./components/ModalCart";
import ModalCheckout from "./components/ModalCheckout";

function App() {
  const [cart, setCart] = useState([]);

  const addMealToCart = (meal) => {
    setCart(prevCart => {
      return [...prevCart, meal]
    })
  }

  const removeMealFromCart = (id) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(meal => meal.id === id);

      if(index === -1) return prevCart;
      
      const newCart = [...prevCart];
      newCart.splice(index,1);
      return newCart;

    })
  }

return (
  <>
    <ModalCart cart={cart} addMealToCart={addMealToCart} removeMealFromCart={removeMealFromCart} />
    <ModalCheckout cart={cart} />
    <Header cartLength={cart.length} />
    <main>
      <Meals addMealToCart={addMealToCart} />
    </main>
  </>
);
}

export default App;

import { useRef, useState } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import ModalCart from "./components/ModalCart";
import ModalCheckout from "./components/ModalCheckout";

function App() {
  const [cart, setCart] = useState([]);
  const dialog1 = useRef()
  const dialog2 = useRef()
  const dialogs = {
    dialog1,
    dialog2,
  }

  const addMealToCart = (meal) => {
    setCart(prevCart => {
      return [...prevCart, meal]
    })
  }

  const removeMealFromCart = (id) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(meal => meal.id === id);

      if (index === -1) return prevCart;

      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;

    })
  }

  const showModal = (number) => {
    if(number === 1){
      dialogs.dialog1.current.showModal()
    } else if(number === 2){
      dialogs.dialog2.current.showModal()
    }
  }

  return (
    <>
      <ModalCart cart={cart} addMealToCart={addMealToCart} removeMealFromCart={removeMealFromCart} ref={dialog1} showModal={showModal} />
      <ModalCheckout cart={cart} ref={dialog2} />
      <Header cartLength={cart.length} showModal={showModal} />
      <main>
        <Meals addMealToCart={addMealToCart} />
      </main>
    </>
  );
}

export default App;

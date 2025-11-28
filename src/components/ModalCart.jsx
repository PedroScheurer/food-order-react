import { useEffect, useState } from "react";
import Item from "./Item";

export default function ModalCart({ cart, addMealToCart, removeMealFromCart }) {
    const [formatedCart, setFormatedCart] = useState([])

    useEffect(() => {
        if (!cart) return
        const groupedObj = cart.reduce((acc, item) => {
            const key = item.id;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
        const order = Object.values(groupedObj)
        setFormatedCart(() => order.map(listaDeItens => {
            return {
                id: listaDeItens[0].id,
                nome: listaDeItens[0].name,
                quantidade: listaDeItens.length,
                preco: listaDeItens[0].price,
                precoTotal: listaDeItens[0].price * listaDeItens.length
            }
        }
        ));

    }, [cart])

    return (
        <div className="modal cart">
            <h2 className="gray">Carrinho</h2>
            <ul>
                {formatedCart.map(item => (
                    <Item key={item.id} cart={cart} item={item} addMealToCart={addMealToCart} removeMealFromCart={removeMealFromCart} />
                ))}
            </ul>
            <div className="cart-total">
                R${formatedCart.reduce((acc, item) => {
                    return acc + item.precoTotal
                }, 0)}
            </div>
            <div className="modal-actions">
                <button className="text-button">Cancelar</button>
                <button className="button">Finalizar</button>
            </div>
        </div>
    )
}
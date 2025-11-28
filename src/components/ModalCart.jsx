import { useEffect, useState } from "react";
import Item from "./Item";

export default function ModalCart({ cart, addMealToCart, removeMealFromCart, ref, showModal }) {
    const [formatedCart, setFormatedCart] = useState([])
    const [emptyCart, setEmptyCart] = useState(false)

    useEffect(() => {
        if (!cart || cart.length === 0) {
            return setEmptyCart(true)
        }

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
        setEmptyCart(false)
    }, [cart])

    return (
        <dialog ref={ref} className="modal cart">
            <h2 className="gray">Carrinho</h2>
            {!emptyCart && <ul>
                {formatedCart.map(item => (
                    <Item key={item.id} cart={cart} item={item} addMealToCart={addMealToCart} removeMealFromCart={removeMealFromCart} />
                ))}
            </ul>}
            <div className="cart-total money">
                R${formatedCart.reduce((acc, item) => {
                    return acc + item.precoTotal
                }, 0)}
            </div>
            <form method="dialog" className="modal-actions">
                <button className="text-button">Cancelar</button>
                {!emptyCart && <button onClick={()=>showModal(2)} className="button">Próximo</button>}
            </form>
            {emptyCart && <div className="error">
                <p>O carrinho está vazio</p>
            </div>}
        </dialog>
    )
}
import { useEffect, useState } from "react";

export default function Modal({ cart, addMealToCart }) {
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
            <h2 className="gray">Your Cart</h2>
            <ul>
                {formatedCart.map(item => (
                    <li key={item.id}
                        className="cart-item gray"
                    >
                        {item.nome} - {item.quantidade}x - R${item.preco}
                        <div className="cart-item-actions">
                            <button >-</button>
                            <p className="gray">{item.quantidade}</p>
                            <button onClick={()=>{
                                const selectedMeal = cart.filter((meal) => meal.id === item.id)
                                console.log(selectedMeal[0])
                                addMealToCart(selectedMeal[0])
                                }}>+</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                R${formatedCart.reduce((acc, item) => {
                    return acc + item.precoTotal
                }, 0)}
            </div>
        </div>
    )
}
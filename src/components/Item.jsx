export default function Item({ cart, item, addMealToCart, removeMealFromCart }) {

    const addMeal = () => {
        const selectedMeal = cart.filter((meal) => meal.id === item.id)
        addMealToCart(selectedMeal[0])
    }

    const removeMeal = () => {
        const selectedMeal = cart.filter((meal) => meal.id === item.id)
        removeMealFromCart(selectedMeal[0].id)
    }

    return (
        <li
            className="cart-item gray">
            {item.nome} - {item.quantidade}x - R${item.preco}
            <div className="cart-item-actions">
                <button onClick={removeMeal}>-</button>
                <p className="gray">{item.quantidade}</p>
                <button onClick={addMeal}>+</button>
            </div>
        </li>
    )
}
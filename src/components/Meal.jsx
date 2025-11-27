export default function Meal({ meal, addMealToCart }) {
    return (
        <div className="meal-item">
            <article>
                <img src={`../../backend/public/${meal.image}`} alt="" />
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{meal.price}</p>
                <p className="meal-item-description">{meal.description}</p>
                <button className="button" onClick={() => addMealToCart({ id: meal.id, name: meal.name, price: meal.price })}>Add to cart</button>
            </article>
        </div>
    )
}
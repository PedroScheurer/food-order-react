import { useContext, useEffect, useState } from "react"
import { MealsContext } from "../contexts/MealsContextProvider"
import Meal from "./Meal";

export default function Meals({addMealToCart}) {
    const { getMeals, postOrders } = useContext(MealsContext);

    const [meals, setMeals] = useState([]);
    const [error, setError] = useState("")

    useEffect(() => {
        const getData = async function () {
            try {
                const data = await getMeals();
                setMeals(data)
                setError("")
            } catch (error) {
                setError(error)
            }
        }
        getData()
    }, [])

    return (
        <>
        <div id="meals">
            {meals.map((meal) => (
                <Meal key={meal.id} meal={meal} addMealToCart={addMealToCart} />
            ))}
        </div>
        </>
    )
}
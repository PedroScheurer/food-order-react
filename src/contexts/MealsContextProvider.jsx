import { createContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000"

export const MealsContext = createContext({
    getMeals: () => { },
    postOrders: () => { },
})

export default function MealsContextProvider({ children }) {
    const getMeals = async () => {
        const res = await axios.get(`${BASE_URL}/meals`)
        if (res.status === 400) return { error: "Fail to get meals" }
        return res.data;
    }

    const postOrders = async (data) => {
        const res = await axios.post(`${BASE_URL}/orders`, data)
        if (res.status === 400) return { error: "Fail to post orders" }
        return res.data;
    }

    const ctxValue = {
        getMeals,
        postOrders,
    }

    return (
        <MealsContext.Provider value={ctxValue}>
            {children}
        </MealsContext.Provider>
    )
}
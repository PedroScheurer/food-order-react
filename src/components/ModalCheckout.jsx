import { useState, useContext } from "react"
import { MealsContext } from "../contexts/MealsContextProvider"

export default function ModalCheckout({ cart }) {
    const [formData, setFormData] = useState({ nomeCompleto: "", email: "", endereco: "", cep: "", cidade: "" })
    const [didEdit, setDidEdit] = useState()
    const { postOrders } = useContext(MealsContext)

    const handleSubmit = async () => {
        const res = await postOrders({ items: cart, 
            customer: {name:formData.nomeCompleto,
                street:formData.endereco,['postal-code']:formData.cep,city:formData.cidade, ...formData} })
        console.log(res)
    }

    const handleChange = (e) => {
        setFormData(prevFormData => {
            return { ...prevFormData, [e.target.name]: e.target.value }
        })
    }

    return (
        <div className="modal cart">
            <h2 className="gray">Finalizar Pedido</h2>
            <form onSubmit={handleSubmit}>
                <div className="control-row">
                    <div className="control gray">
                        <label htmlFor="nome-completo">Nome completo</label>
                        <input type="text" id="nome-completo" name="nomeCompleto"
                            value={formData.nomeCompleto} onChange={handleChange} />
                    </div>
                </div>
                <div className="control-row">
                    <div className="control gray">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email"
                            value={formData.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="control-row">
                    <div className="control gray">
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" id="endereco" name="endereco"
                            value={formData.endereco} onChange={handleChange} />
                    </div>
                </div>
                <div className="control-row">
                    <div className="control gray">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" name="cep"
                            value={formData.cep} onChange={handleChange} />
                    </div>
                    <div className="control gray">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" id="cidade" name="cidade"
                            value={formData.cidade} onChange={handleChange} />
                    </div>
                </div>
                <div className="modal-actions">
                    <button className="text-button" type="button">Cancelar</button>
                    <button className="button" type="submit">Finalizar</button>
                </div>
            </form>
        </div>
    )
}
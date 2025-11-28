import { useState, useContext, forwardRef } from "react"
import { MealsContext } from "../contexts/MealsContextProvider"

const ModalCheckout = forwardRef(function ModalCheckout({ cart }, ref) {
    const [formData, setFormData] = useState({ nomeCompleto: "", email: "", endereco: "", cep: "", cidade: "" })
    const [didEdit, setDidEdit] = useState({ nomeCompleto: false, email: false, endereco: false, cep: false, cidade: false })
    const [error, setError] = useState("")
    const { postOrders } = useContext(MealsContext)

    const nameIsInvalid = formData.nomeCompleto.trim().length < 3
    const emailIsInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    const addressIsInvalid = formData.endereco.trim().length < 3
    const zipIsInvalid = formData.cep.trim().length !== 8
    const cityIsInvalid = formData.cidade.trim().length < 3

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (nameIsInvalid && emailIsInvalid && addressIsInvalid
            && zipIsInvalid && cityIsInvalid) {
            return
        }
        try {
            const res = await postOrders({
                items: cart,
                customer: {
                    name: formData.nomeCompleto,
                    street: formData.endereco, 
                    ['postal-code']: formData.cep, 
                    city: formData.cidade, 
                    ...formData
                }
            })
            setError("")
        } catch (error) {
            setError("Aconteceu um problema!\n"+(error?.response?.data?.message || error.message))
        }
    }

    const handleChange = (e) => {
        setFormData(prevFormData => {
            return { ...prevFormData, [e.target.name]: e.target.value }
        })
    }

    const handleBlur = (e) => {
        setDidEdit((prevDidEdit) => {
            return { ...didEdit, [e.target.name]: true }
        })
    }
    const handleFocus = (e) => {
        setDidEdit((prevDidEdit) => {
            return { ...didEdit, [e.target.name]: false }
        })
    }

    return (
        <dialog ref={ref} className="modal cart">
            <h2 className="gray">Finalizar Pedido</h2>
            <form>
                <div className="control-row">
                    <div className="control gray">
                        <label htmlFor="nome-completo">Nome completo</label>
                        <input type="text" id="nome-completo" name="nomeCompleto"
                            value={formData.nomeCompleto} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
                        {didEdit.nomeCompleto && nameIsInvalid && <p className="red">Nome inválido</p>}
                    </div>
                </div>
                <div className="control-row">
                    <div className="control gray">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email"
                            value={formData.email} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
                        {didEdit.email && emailIsInvalid && <p className="red">Email inválido</p>}
                    </div>
                </div>
                <div className="control-row">
                    <div className="control gray">
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" id="endereco" name="endereco"
                            value={formData.endereco} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
                        {didEdit.endereco && addressIsInvalid && <p className="red">Endereço inválido</p>}
                    </div>
                </div>
                <div className="control-row">
                    <div className="control gray">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" name="cep"
                            value={formData.cep} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
                        {didEdit.cep && zipIsInvalid && <p className="red">CEP inválido</p>}
                    </div>
                    <div className="control gray">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" id="cidade" name="cidade"
                            value={formData.cidade} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
                        {didEdit.cidade && cityIsInvalid && <p className="red">Cidade inválida</p>}
                    </div>
                </div>
            </form>
            <form method="dialog" onSubmit={handleSubmit} className="modal-actions">
                <button className="text-button" type="button" onClick={() => ref.current?.close()}>Cancelar</button>
                <button className="button" type="submit" >Finalizar</button>
            </form>
            {error && <div className="error"><h2>{error}</h2></div>}
        </dialog>
    )
})

export default ModalCheckout
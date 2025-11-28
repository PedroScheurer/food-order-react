export default function Header({cartLength, showModal}) {
    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src="./logo.jpg" alt="logo" />
                    <h1>ReactFood</h1>
                </div>
                <button className="text-button" onClick={()=>showModal(1)}>Carrinho({cartLength})</button>
            </header>

        </>
    )
}
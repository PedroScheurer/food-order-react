export default function Header({cartLength}) {
    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src="./logo.jpg" alt="logo" />
                    <h1>ReactFood</h1>
                </div>
                <button className="text-button">Carrinho({cartLength})</button>
            </header>

        </>
    )
}
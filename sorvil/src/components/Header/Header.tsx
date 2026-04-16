import "./Header.css";

const tabs = [
    { id: "clickCounter", label: "Contador de Clicks" },
    { id: "todoList", label: "To-do List" },
    { id: "cepSearch", label: "Pesquisador de CEP" },
    { id: "ticTacToe", label: "Jogo da velha" },
    { id: "calculator", label: "Calculadora" },
]

export const Header = ({ changePage, currentPage }: { changePage: (page: string) => void, currentPage: string }) => {
    return (
        <div className="header-container">
            <header>
                <h1>Sorvil</h1>
            </header>
            <nav>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={currentPage === tab.id ? "active" : ""}
                        onClick={() => changePage(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    )
}
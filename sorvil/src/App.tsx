import { useState } from 'react'
import { Header } from './components/Header/Header'
import { ClickCounter } from './components/ClickCounter/ClickCounter'
import { TodoList } from './components/TodoList/TodoList'
import { CepSearch } from './components/CepSearch/CepSearch'
import { TicTacToe } from './components/TicTacToe/TicTacToe'
import { Calculator } from './components/Calculator/Calculator'

export default function App() {
    const [currentPage, setCurrentPage] = useState('clickCounter')

    const changePage = (page: string) => {
        setCurrentPage(page)
    }

    return (
        <>
            <Header changePage={changePage} currentPage={currentPage}/>
            <main>
                {renderPage(currentPage)}
            </main>
        </>
    )
}

const renderPage = (page: string) => {
    switch (page) {
        case 'clickCounter':
            return <ClickCounter />
        case 'todoList':
            return <TodoList />
        case 'cepSearch':
            return <CepSearch />
        case 'ticTacToe':
            return <TicTacToe />
        case 'calculator':
            return <Calculator />
        default:
            return <ClickCounter />
    }
}
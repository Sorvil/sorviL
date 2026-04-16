import { useState } from "react"
import "./TicTacToe.css"

type Player = "X" | "O"
type Cell = Player | null

const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const checkWinner = (board: Cell[]): Player | null => {
    for (const [a, b, c] of WINNING_COMBOS) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]
        }
    }
    return null
}

export const TicTacToe = () => {
    const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X")

    const winner = checkWinner(board)
    const isDraw = !winner && board.every((cell) => cell !== null)

    const handleClick = (index: number) => {
        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = currentPlayer
        setBoard(newBoard)
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }

    const restart = () => {
        setBoard(Array(9).fill(null))
        setCurrentPlayer("X")
    }

    const statusMessage = winner
        ? `${winner} venceu!`
        : isDraw
          ? "Empate!"
          : `Vez de ${currentPlayer}`

    return (
        <div className="tic-tac-toe-container">
            <h1>Jogo da Velha</h1>
            <p className={`status ${winner ? "winner" : ""} ${isDraw ? "draw" : ""}`}>
                {statusMessage}
            </p>
            <div className="board">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className={`cell ${cell === "X" ? "x" : ""} ${cell === "O" ? "o" : ""}`}
                        onClick={() => handleClick(index)}
                        disabled={!!cell || !!winner}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <button className="restart" onClick={restart}>Reiniciar</button>
        </div>
    )
}
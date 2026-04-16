import { useState } from "react"
import "./ClickCounter.css"

export const ClickCounter = () => {
    const [count, setCount] = useState(0)

    return (
        <div className="click-counter-container">
            <h1>Contador de Clicks</h1>
            <button onClick={() => setCount(count + 1)}>Clique aqui</button>
            <button onClick={() => setCount(0)}>Reiniciar</button>
            <p>Você clicou <span>{count}</span> vezes</p>
        </div>
    )
}
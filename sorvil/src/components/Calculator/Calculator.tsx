import { useState } from "react"
import "./Calculator.css"

export const Calculator = () => {
    const [display, setDisplay] = useState("0")
    const [previousOperand, setPreviousOperand] = useState<string | null>(null)
    const [operator, setOperator] = useState<string | null>(null)
    const [resetNext, setResetNext] = useState(false)

    const handleDigit = (digit: string) => {
        if (resetNext) {
            setDisplay(digit)
            setResetNext(false)
            return
        }
        setDisplay(display === "0" ? digit : display + digit)
    }

    const handleDecimal = () => {
        if (resetNext) {
            setDisplay("0.")
            setResetNext(false)
            return
        }
        if (!display.includes(".")) {
            setDisplay(display + ".")
        }
    }

    const calculate = (a: number, op: string, b: number): string => {
        switch (op) {
            case "+": return String(a + b)
            case "-": return String(a - b)
            case "×": return String(a * b)
            case "÷": return b === 0 ? "Erro" : String(a / b)
            default: return String(b)
        }
    }

    const handleOperator = (nextOp: string) => {
        const current = parseFloat(display)

        if (previousOperand !== null && operator && !resetNext) {
            const result = calculate(parseFloat(previousOperand), operator, current)
            setDisplay(result)
            setPreviousOperand(result === "Erro" ? null : result)
        } else {
            setPreviousOperand(String(current))
        }

        setOperator(nextOp)
        setResetNext(true)
    }

    const handleEquals = () => {
        if (previousOperand === null || !operator) return

        const result = calculate(parseFloat(previousOperand), operator, parseFloat(display))
        setDisplay(result)
        setPreviousOperand(null)
        setOperator(null)
        setResetNext(true)
    }

    const handleClear = () => {
        setDisplay("0")
        setPreviousOperand(null)
        setOperator(null)
        setResetNext(false)
    }

    const handleSign = () => {
        if (display !== "0" && display !== "Erro") {
            setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display)
        }
    }

    const handlePercent = () => {
        if (display !== "Erro") {
            setDisplay(String(parseFloat(display) / 100))
        }
    }

    const buttons = [
        { label: "C",  action: handleClear, className: "fn" },
        { label: "±",  action: handleSign, className: "fn" },
        { label: "%",  action: handlePercent, className: "fn" },
        { label: "÷",  action: () => handleOperator("÷"), className: "op" },
        { label: "7",  action: () => handleDigit("7") },
        { label: "8",  action: () => handleDigit("8") },
        { label: "9",  action: () => handleDigit("9") },
        { label: "×",  action: () => handleOperator("×"), className: "op" },
        { label: "4",  action: () => handleDigit("4") },
        { label: "5",  action: () => handleDigit("5") },
        { label: "6",  action: () => handleDigit("6") },
        { label: "-",  action: () => handleOperator("-"), className: "op" },
        { label: "1",  action: () => handleDigit("1") },
        { label: "2",  action: () => handleDigit("2") },
        { label: "3",  action: () => handleDigit("3") },
        { label: "+",  action: () => handleOperator("+"), className: "op" },
        { label: "0",  action: () => handleDigit("0"), className: "zero" },
        { label: ".",  action: handleDecimal },
        { label: "=",  action: handleEquals, className: "op" },
    ]

    const subDisplay = previousOperand && operator
        ? `${previousOperand} ${operator}`
        : ""

    return (
        <div className="calculator-container">
            <h1>Calculadora</h1>
            <div className="calc-body">
                <div className="display">
                    <span className="sub-display">{subDisplay}</span>
                    <span className="main-display">{display}</span>
                </div>
                <div className="buttons">
                    {buttons.map((btn) => (
                        <button
                            key={btn.label}
                            className={btn.className ?? ""}
                            onClick={btn.action}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
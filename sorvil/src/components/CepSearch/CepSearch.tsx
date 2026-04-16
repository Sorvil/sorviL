import { useState } from "react"
import "./CepSearch.css"

interface CepData {
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    complemento: string
}

export const CepSearch = () => {
    const [cep, setCep] = useState("")
    const [data, setData] = useState<CepData | null>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const formatCep = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 8)
        if (digits.length > 5) {
            return digits.slice(0, 5) + "-" + digits.slice(5)
        }
        return digits
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCep(formatCep(e.target.value))
    }

    const handleSearch = async () => {
        const digits = cep.replace(/\D/g, "")
        if (digits.length !== 8) {
            setError("Digite um CEP válido com 8 dígitos.")
            setData(null)
            return
        }

        setLoading(true)
        setError("")
        setData(null)

        try {
            const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
            const json = await response.json()

            if (json.erro) {
                setError("CEP não encontrado.")
            } else {
                setData(json)
            }
        } catch {
            setError("Erro ao buscar o CEP. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch()
    }

    return (
        <div className="cep-search-container">
            <h1>Pesquisador de CEP</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Digite o CEP (ex: 01001-000)"
                    value={cep}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>

            {error && <p className="error-msg">{error}</p>}

            {data && (
                <div className="result-card">
                    <div className="result-row">
                        <span className="label">Logradouro</span>
                        <span className="value">{data.logradouro || "—"}</span>
                    </div>
                    {data.complemento && (
                        <div className="result-row">
                            <span className="label">Complemento</span>
                            <span className="value">{data.complemento}</span>
                        </div>
                    )}
                    <div className="result-row">
                        <span className="label">Bairro</span>
                        <span className="value">{data.bairro || "—"}</span>
                    </div>
                    <div className="result-row">
                        <span className="label">Cidade</span>
                        <span className="value">{data.localidade}</span>
                    </div>
                    <div className="result-row">
                        <span className="label">UF</span>
                        <span className="value">{data.uf}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
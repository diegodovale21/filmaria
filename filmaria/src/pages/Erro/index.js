import { Link } from 'react-router-dom'
import './erro.css'

export default function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Hum, parece que esta página não exite!</h2>
            <Link to='/'>Veja todos os filmes</Link>

        </div>
    )
}
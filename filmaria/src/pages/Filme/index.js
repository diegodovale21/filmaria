import {useEffect, useState} from 'react';
import './filme.css';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify'

export default function Filme(){
    
    const {id} = useParams();
    const history = useHistory();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if(response.data.length === 0){
                //Tentou acessar com o ID que não existe, navego ele para a HOME.
                history.replace('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }
        loadFilme();
    }, [id, history]);

    function salvaFilme(){
        const minhaLista= localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        
        //Se tiver algum filme salvo com esse mesmo ID precisa ignorar
        const hasFilme=filmesSalvos.some((salvoFilme)=> salvoFilme.id === filme.id )

        if(hasFilme){
            toast.info('Você ja possui esse filme salvo.')
           
            return; // Para execução do código aqui...
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso.')
        
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando seu filme...</h1>
            </div>
        );
    }

    return(
        <div className='filme-info'>
            <h1>{filme.nome}</h1>

            <img alt={filme.nome} src={filme.foto}></img>

            <h3>Sinopse</h3>
            {filme.sinopse}
            <div>
                <button onClick={salvaFilme}>Salvar</button>
                <button>
                    <a target='blank' href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );
}
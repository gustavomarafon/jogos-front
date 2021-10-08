import { useState, useEffect} from 'react';
import Alerta from '../Alerta';
import config from '../../Config';
import { Link } from 'react-router-dom';

function Tabela ({ alerta, atualizaAlerta}) {

    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaProdutoras = async () => {
        await fetch(`${config.enderecoapi}/produtora`)
        .then(response => response.json())
        .then(data => setListaObjetos(data))
        .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')){
            try {
                await fetch(`${config.enderecoapi}/produtora/${objeto.codigo}`,
                { method : "DELETE"})
                .then(response => response.json())
                .then(json => atualizaAlerta(json.status, json.message))
                recuperaProdutoras();
            } catch(err){
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect( () => {
        recuperaProdutoras();
    },[]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Produtora</h1>
            <Link className="btn btn-primary" to="/cadastrarprodutora">
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Link>
            <Alerta alerta={alerta}/>
            {listaObjetos.length === 0 && <h1>Nenhuma produtora encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>                            
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>                                
                                <td>
                                    <Link className="btn btn-info" 
                                    to={`/editarprodutora/${objeto.codigo}`}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

}

export default Tabela
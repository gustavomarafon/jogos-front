import { Redirect } from 'react-router-dom';
import config from '../../Config';
import { useState, useEffect } from 'react';

function Cadastrar({ pcodigo, atualizaAlerta, editar }) {

    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", genero: "", produtora: ""
    })

    const [listaProdutoras, setListaProdutoras] = useState([]);

    const [redirecionar, setRedirecionar] = useState(false);

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/jogo/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data[0]))
            .catch(err => console.log(err))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                const body = {
                    codigo: objeto.codigo,
                    nome: objeto.nome,
                    genero: objeto.genero,
                    produtora: objeto.produtora
                }
                const response = await fetch(config.enderecoapi + "/jogo", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const body = {
                    nome: objeto.nome,
                    genero: objeto.genero,
                    produtora: objeto.produtora
                }
                const response = await fetch(config.enderecoapi + "/jogo", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        }
        setRedirecionar(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    const recuperaProdutoras = async () => {
        await fetch(`${config.enderecoapi}/produtora`)
            .then(response => response.json())
            .then(data => setListaProdutoras(data))
            .catch(err => console.log('Erro: ' + err))
    }

    useEffect(() => {
        if (editar) {
            recuperar(pcodigo);
        } else {
            setObjeto({
                codigo: "", nome: "", genero: "", produtora: ""
            });
        }
        recuperaProdutoras();
    }, []);

    if (redirecionar === true) {
        return <Redirect to="/jogo" />
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Jogo</h2>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <div >
                    <div className="form-group">
                        <label htmlFor="txtCodido" className="form-label">
                            Código
                        </label>
                        <input
                            type="text"
                            readOnly
                            className="form-control"
                            id="txtCodido"
                            name="codigo"
                            value={objeto.codigo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtNome" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtNome"
                            name="nome"
                            value={objeto.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtData" className="form-label">
                            Gênero
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtData"
                            name="genero"
                            value={objeto.genero}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectProdutora" className="form-label">
                            Produtora
                        </label>
                        <select
                            required
                            className="form-control"
                            id="selectProdutora"
                            value={objeto.produtora}
                            name="produtora"
                            onChange={handleChange}>
                            <option disable="true" value="">(Selecione a produtora)</option>
                            {listaProdutoras.map((produtora) => (
                                <option key={produtora.codigo} value={produtora.codigo}>
                                    {produtora.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success" >
                    Salvar  <i className="bi bi-save"></i>
                </button>

            </form>
        </div>
    )

}

export default Cadastrar;

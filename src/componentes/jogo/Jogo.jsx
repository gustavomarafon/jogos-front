import Tabela from './Tabela';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Cadastrar from './Cadastrar';

function Jogo() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });

    const atualizaAlerta = (pstatus, pmensagem) => {
        setAlerta({ status: pstatus, message: pmensagem })
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/jogo" render={
                        () => <Tabela alerta={alerta} atualizaAlerta={atualizaAlerta} />
                    } />
                    <Route path="/cadastrarjogo" render={() =>
                        <Cadastrar editar={false} atualizaAlerta={atualizaAlerta} />
                    } />
                    <Route path="/editarjogo/:codigo" render={
                        props =>
                        <Cadastrar editar={true} atualizaAlerta={atualizaAlerta} 
                        pcodigo={props.match.params.codigo}/>
                    } />
                </Switch>
            </Router>
        </div>
    )

}

export default Jogo;
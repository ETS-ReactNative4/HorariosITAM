import React from 'react';
import { Row, Col, Input} from 'react-materialize';
import  { Redirect } from 'react-router-dom';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: 'init',
      remember: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      logged: nextProps.isLoggedIn
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.apiLogin();
    }
  }

  render() {
    var input = [];

    if (this.state.logged === false){
      var error_cu = ' ';
      var error_pw = 'Usuario y/o contraseña incorrecta';

      input = [
        <Input l={12} s={12} error={error_cu} type='number' id='cu' label='Clave única' onKeyPress={this.handleKeyPress.bind(this)} onChange={(e) => {this.props.handleInputChange(e.target.value, 'cu')}}/>,
        <Input l={12} s={12} error={error_pw} type='password' id='password' label='Contraseña' onKeyPress={this.handleKeyPress.bind(this)} onChange={(e) => {this.props.handleInputChange(e.target.value, 'pw')}}/>
      ];
    }
    else
      input = [
        <Input l={12} s={12} type='number' id='cu' label='Clave única' onKeyPress={this.handleKeyPress.bind(this)} onChange={(e) => {this.props.handleInputChange(e.target.value, 'cu')}}/>,
        <Input l={12} s={12} type='password' id='password' label='Contraseña' onKeyPress={this.handleKeyPress.bind(this)} onChange={(e) => {this.props.handleInputChange(e.target.value, 'pw')}}/>
      ];

    if (this.state.logged !== false && this.state.logged !== 'init')
      return <Redirect to='./generador' />;

      return (
        <div className="valign-wrapper">
            <div id="login-page" className="row">
                <div className="col s12 z-depth-6 card-panel">
                    <form className="login-form">
                        <div className="row">
                            <br></br>
                            <h5 className="text center-align">Inicia sesión</h5>
                        </div>
                        {input}
                        <Row>
                          <Col l={10} s={10} offset={'s2 l2'}>
                            <Input className="center green-check" type='checkbox' value='remember' label='Recuérdame' onChange={(e) => {this.props.handleInputChange(e)}}/>
                          </Col>
                        </Row>
                        <div className="row">
                            <div className="input-field col s12">
                            <a className="btn waves-effect waves-light col s12 green-btn" onClick={this.props.apiLogin}>Iniciar sesión</a>
                            </div>
                        </div>                    
                    </form>
                </div>
            </div>
        </div>
        
      );
  }
}

export default Login;
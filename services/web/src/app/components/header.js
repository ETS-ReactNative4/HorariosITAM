import React, { Component } from 'react';
import { Row } from 'react-materialize';

import logo from '../../media/logo-ITAM.png'

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: 'init',
    }
  }

  componentDidMount(){
    window.$(".button-collapse").sideNav();
    window.$('.modal').modal();
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isLoggedIn: nextProps.isLoggedIn
    });
  }

  render() {
    var logged;
    var loggedMob;

    if (this.state.isLoggedIn === 'init' || this.state.isLoggedIn === false){
      logged = ( 
        <ul className="right hide-on-med-and-down">
          <li><a href="http://comunidad.itam.mx/">Comunidad ITAM</a></li>
          <li><a href="http://serviciosweb.itam.mx/">Servicios</a></li>
          <li><a className="modal-trigger" href="#modal1">Ayuda</a></li>
        </ul>
      );

      loggedMob = (
        <ul className="side-nav" id="mobile-demo">
          <li><a href="http://comunidad.itam.mx/">Comunidad ITAM</a></li>
          <li><a href="http://serviciosweb.itam.mx/">Servicios</a></li>
          <li><a className="modal-trigger" href="#modal1">Ayuda</a></li>
        </ul>
      );
    }  
     
    else{
      logged = ( 
        <ul className="right hide-on-med-and-down">
          <li><a href="http://comunidad.itam.mx/">Comunidad ITAM</a></li>
          <li><a href="http://serviciosweb.itam.mx/">Servicios</a></li>
          <li><a className="modal-trigger" href="#modal1">Ayuda</a></li>
          <li><a onClick={this.props.logout}>Cerrar sesión</a></li>  
        </ul>
      );

      loggedMob = (
        <ul className="side-nav" id="mobile-demo">
          <li><a href="http://comunidad.itam.mx/">Comunidad ITAM</a></li>
          <li><a href="http://serviciosweb.itam.mx/">Servicios</a></li>
          <li><a className="modal-trigger" href="#modal1">Ayuda</a></li>
          <li><a onClick={this.props.logout}>Cerrar sesión</a></li>  
        </ul>
      );
    }
      
    return (
      <div>
        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4 className="greenCol-text">Ayuda</h4>
            <span className="head-card">
              En Incol sabemos que, como estudiante del ITAM, puede ser una pesadilla saber qué materias cursar el siguiente semestre,
              y, por esto, creamos esta aplicación para <b>ti</b>.
            </span>
            <Row/>
            <span className="head-quest"><b>¿Cómo funciona la aplicación de Incol?</b></span>
            <p style={{textAlign:"justify"}}>
              Nuestro algoritmo te recomienda las materias que más te conviene llevar en el semestre basado en:              
            </p>
            <ul>
              <li>
                − Tus materias cursadas
              </li>
              <li>
                − Los prerequisitos de una materia
              </li>
              <li>
                − Las materias que se abren en el semestre
              </li>
              <li>
                − Tu plan de estudios
              </li>
              <li>
                − Cuántas materias te abre alguna de éstas
              </li>
            </ul>
            <p style={{textAlign:"justify"}}>
              Con base en ello, dependiendo de tu selección, te recomendamos de 1 a 8 materias que puedes cursar el próximo semestre          
            </p>
            <Row/>
            <span className="head-quest"><b>¿Por qué me piden lave única y contraseña?</b></span>
            <p style={{textAlign:"justify"}}>
              Utilizamos tu clave única y tu contraseña para poder checar qué materias has cursado y así evaluar qué materias puedes cursar el próximo semestre.              
            </p>
            <Row/>
            <span className="head-quest"><b>¿Con qué datos ingreso?</b></span>
            <p style={{textAlign:"justify"}}>
              Usa tu clave única (sin ceros) y tu contraseña de Comunidad ITAM.             
            </p>
            <Row/>
            <span className="head-quest"><b>¿Puedo ver qué grupos se impartirán de las materias que me recomendaron?</b></span>
            <p style={{textAlign:"justify"}}>
              ¡Claro! Sólo haz click en el nombre de alguna de las materias recomendadas. Ahí te presentamos la información detallada de cada grupo que se abrirá.              
            </p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
          </div>
        </div>

        <div className="navbar-fixed">
          <nav id="incol-nav">
            <div className="nav-wrapper">
              <div className="container">
                  <a href="./" className="brand-logo">
                    <img id="logo" alt="logo" className="center" src={logo}/>     
                  </a> 
                  <a href="#!" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                  {logged}
                  
                </div>   
            </div>
          </nav>
        </div>
        {loggedMob}
      </div>   
    );
  }
}

export default Header;
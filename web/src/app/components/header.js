import React, { Component } from 'react';

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
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isLoggedIn: nextProps.isLoggedIn
    });
  }

  render() {
    if (this.state.isLoggedIn === 'init' || this.state.isLoggedIn === false){
      var logged = ( 
        <ul className="right hide-on-med-and-down">
          <li><a href="http://comunidad.itam.mx/">Comunidad ITAM</a></li>
          <li><a href="http://serviciosweb.itam.mx/">Servicios</a></li>
        </ul>
      );

      var loggedMob = (
        <ul className="side-nav" id="mobile-demo">
          <li><a href="http://comunidad.itam.mx/">Comunidad ITAM</a></li>
          <li><a href="http://serviciosweb.itam.mx/">Servicios</a></li>
        </ul>
      );
    }  
     
    else{
      var logged = ( 
        <ul className="right hide-on-med-and-down">
          <li><a href="http://comunidad.itam.mx/">Comunidad ITAM</a></li>
          <li><a href="http://serviciosweb.itam.mx/">Servicios</a></li>
          <li><a onClick={this.props.logout}>Cerrar sesión</a></li>  
        </ul>
      );

      var loggedMob = (
        <ul className="side-nav" id="mobile-demo">
          <li><a href="http://comunidad.itam.mx/">Comunidad ITAM</a></li>
          <li><a href="http://serviciosweb.itam.mx/">Servicios</a></li>
          <li><a onClick={this.props.logout}>Cerrar sesión</a></li>  
        </ul>
      );
    }
      
    return (
      <div className="navbar-fixed">
        <nav id="incol-nav">
          <div className="nav-wrapper">
            <div className="container">
                <a href="./" className="brand-logo">
                  <img id="logo" alt="logo" className="center" src={logo}/>     
                </a> 
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                {logged}
                {loggedMob}
              </div>   
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
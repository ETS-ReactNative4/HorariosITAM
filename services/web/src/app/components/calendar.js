import React, { Component } from 'react';
import { Row, Col, Input } from 'react-materialize';

var api = require('../utils/api')

function Grupos(props){
  var grupos = props.inputValue.map((value, i) => ( 
    <Row>
      <Col s={12} l={12}>
          {props.inputValue[i].name} <br/>  
          {props.inputValue[i].id_mat}-0{props.inputValue[i].id_grupo}    
        </Col>
    </Row>   
  ));

  return (
    <div className="collapsible-body">
      {grupos}
    </div>
  );
}

function Materia(props){
   var materia = props.inputValue.map((value, i) => ( 
    <li>
      <div className="collapsible-header collapse-color" onClick={() => props.open(i)}><i className="material-icons">class</i>{props.inputValue[i].name}</div>
      <Grupos inputValue={props.grupos[i]}/>
    </li>
  ));

  return (
    <ul className="collapsible" data-collapsible="accordion">
      {materia}
    </ul>
  );
}

export class Horarios extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isLoggedIn: 'init',
        cant_materias: 0,
        cursables: Array(),
        grupos: Array()
      }
    }

    componentDidMount(){
        window.$(document).ready(function() {
          window.$('select').material_select();         
        });
    }

    open(i){
      console.log("click", i)
      window.$('.collapsible').collapsible('open', i);
    }


    handleInputChange(e) {      
      this.setState({
        cant_materias: e.target.value
      }, () => {
        var cu = this.props.isLoggedIn;
        var materias = this.state.cant_materias;

        var info = {
           cu: cu,
           materias: materias
        }

        api.cursables(info)
          .then((data) => {
            this.setState({
              cursables: data
            });
          })
          .then(() => {
            api.grupos_abiertos(info)
            .then((data) => {
              this.setState({
                grupos: data
              });
            });
          });

          
      });       
    }

    render(){
        var mat;
        var u;
        
        var obj = {}
        if(this.state.cant_materias!==0 && this.state.grupos.length>0 && this.state.cursables.length>0){
          var v = 0;
          var grup = this.state.grupos.slice();
          for(u = 0; u < this.state.cursables.length; u++){
            obj[u] = Array();
            while(v<grup.length && this.state.cursables[u].name===this.state.grupos[v].name){
              obj[u].push(grup[v])
              v++;
            }
          }
          mat = <Materia inputValue={this.state.cursables} grupos={obj} open={(i) => {this.open(i)}}/>;          
        }          
          

        return(
          <div className="valign-wrapper">
          <div id="page" className="row">
              <div className="col s12 z-depth-6 card-panel">
                <Row>
                    <Col s={12}>
                        <Row></Row>
                        <Row>
                          <Col s={12} l={4} offset={'l4'}>
                            <Input s={12} type='select' label="¿Cuántas materias cursarás?" onChange = {(e) => this.handleInputChange(e)}>
                              <option className="opt-color" key='nada' value="nada">Seleccione una cantidad de materias</option>
                              <option className="opt-color" key={1} value={1}>1</option>
                              <option className="opt-color" key={2} value={2}>2</option>
                              <option className="opt-color" key={3} value={3}>3</option>
                              <option className="opt-color" key={4} value={4}>4</option>
                              <option className="opt-color" key={5} value={5}>5</option>
                              <option className="opt-color" key={6} value={6}>6</option>
                              <option className="opt-color" key={7} value={7}>7</option>
                              <option className="opt-color" key={8} value={8}>8</option>
                            </Input>
                          </Col>
                        </Row>
                        {mat}
                    </Col>
                </Row>
            </div></div></div>
        );
    }
}

export default Horarios;
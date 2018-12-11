import React, { Component } from 'react';
import { Row, Col, Input } from 'react-materialize';

var api = require('../utils/api')

function Grupos(props){
  var grupos = props.inputValue.map((value, i) => ( 
    <Row key={"g" + i}>
      <Col s={12} l={4} offset={"l4"}>
        <div className="card-panel light-green lighten-5 z-depth-2">
          <div className="row valign-wrapper">
            <div className="col s12" style={{wordWrap: "normal"}}>
              <span className="brown-text text-darken-4 head-card truncate">{props.inputValue[i].name}</span>
              <ul>
                <li className="brown-text text-darken-4">               
                  <span className="slim-text">Profesor:</span> <b>{props.inputValue[i].profesor}</b>          
                </li>
                <li className="brown-text text-darken-4 slim-text">               
                  Grupo: {props.inputValue[i].id_grupo>9 ? props.inputValue[i].id_mat+"-0"+props.inputValue[i].id_grupo : props.inputValue[i].id_mat+"-00"+props.inputValue[i].id_grupo}          
                </li>             
                <li className="brown-text text-darken-4 slim-text">               
                  Días: {props.inputValue[i].dias}          
                </li>
                <li className="brown-text text-darken-4 slim-text">               
                  Horario: {props.inputValue[i].horario}          
                </li>
              </ul>
            </div>
          </div>
        </div>        
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
    <li key={"m" + i}>
      <div className="collapsible-header collapse-color" onClick={() => props.open(i)}><i className="material-icons">class</i>{props.inputValue[i].name}</div>
      <Grupos inputValue={props.grupos[i]}/>
    </li>
  ));

  return (
    <ul className="collapsible light-green lighten-4" data-collapsible="accordion">
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
        cursables: [],
        grupos: []
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
            obj[u] = [];
            while(v<grup.length && this.state.cursables[u].name===this.state.grupos[v].name){
              obj[u].push(grup[v])
              v++;
            }
          }
          mat = [<h5 key="h5">Te recomendamos cursar:</h5>,
            <Materia key="mater" inputValue={this.state.cursables} grupos={obj} open={(i) => {this.open(i)}}/>];          
        }          
          

        return(
          <div className="valign-wrapper">
          <div id="page" className="row">
              <div className="col s12 z-depth-6 card-panel">
                <Row>
                    <Col s={12}>
                        <Row></Row>
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
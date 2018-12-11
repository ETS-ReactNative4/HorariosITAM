import React, { Component } from 'react';
import { Row, Col, Input } from 'react-materialize';

var api = require('../utils/api')

function Grupos(props){
  var j = 0;
  var grupos = props.inputValue.map((value, i) => ( 
    <Row>
      <Col s={12} l={12}>
          {props.inputValue[i].name} <br/>  
          {props.inputValue[i].id_mat}-0{props.inputValue[i].id_grupo}    
        </Col>
    </Row>   
  ));

  return (
    <div class="collapsible-body">
      {grupos}
    </div>
  );
}

function Materia(props){
   var materia = props.inputValue.map((value, i) => ( 
    <li>
      <div class="collapsible-header"><i class="material-icons">class</i>{props.inputValue[i].name}</div>
      <Grupos inputValue={props.grupos[i]}/>
    </li>
  ));

  return (
    <ul class="collapsible" data-collapsible="accordion">
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
            window.$('.collapsible').collapsible();
        });
    }

    handleInputChange(e) {      
      this.setState({
        cant_materias: e.target.value
      }, () => {
        window.$('.collapsible').collapsible();
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
          console.log("length: ", grup.length)
          for(u = 0; u < this.state.cursables.length; u++){
            obj[u] = Array();
            while(v<grup.length && this.state.cursables[u].name===this.state.grupos[v].name){
              console.log(v)
              obj[u].push(grup[v])
              v++;
            }
          }
          mat = <Materia inputValue={this.state.cursables} grupos={obj}/>
        }          
          

        return(
            <div className="container">
                <Row>
                    <Col s={12} style={{backgroundColor: "#fff"}}>
                        <Row></Row>
                        <Row>
                          <Input s={12} type='select' label="¿Cuántas materias cursarás este semestre?" onChange = {(e) => this.handleInputChange(e)}>
                            <option key='nada' value="nada">Seleccione un grado académico</option>
                            <option key={1} value={1}>1</option>
                            <option key={2} value={2}>2</option>
                            <option key={3} value={3}>3</option>
                            <option key={4} value={4}>4</option>
                            <option key={5} value={5}>5</option>
                            <option key={6} value={6}>6</option>
                            <option key={7} value={7}>7</option>
                            <option key={8} value={8}>8</option>
                          </Input>
                        </Row>
                        {mat}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Horarios;
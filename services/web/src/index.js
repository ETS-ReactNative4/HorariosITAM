import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import update from 'immutability-helper';

import {Root} from "./layout/root";
import {Login} from './app/components/login';
import {Horarios} from './app/components/calendar';

var api = require('./app/utils/api')

class App extends Component {
    constructor(props) {
        super(props);
  
      this.state = {
        isLoggedIn: 'init',
        inputValue: {
          cu: '',
          pw: ''
        },
        remember: false
      }
    }
  
    componentDidMount() {
      this.session();     
    }
  
    handleInputChange(e, val){
      if(e.target && e.target.type === 'checkbox'){
        var valu;
        if(e.target.checked)
          valu = true;
        else
          valu = false;
        this.setState({
          remember: valu
        });
      }
      else
        this.setState({
          inputValue: update(this.state.inputValue, {[val]: {$set: e}})
        });
    }
  
    logout(){
      this.setState({
        isLoggedIn: 'init',
        inputValue: {
          cu: '',
          pw: ''
        }
      }, () => {
        window.location.replace("./");
        localStorage.removeItem('cu');
      });
    }
  
    session(){
      const cachedId = localStorage.getItem('cu');
      if (cachedId) {
        console.log('sessioned')
        this.setState({ isLoggedIn: cachedId });
      }
    }

    apiLogin(){
        var credentials = this.state.inputValue;
        console.log(credentials)
        api.login(credentials)
          .then((data) => {
            if(data){
              this.setState({
                isLoggedIn: data.cu,
                inputValue: {
                  cu: '',
                  pw: ''
                }
              });
              if(this.state.remember)
                localStorage.setItem('cu', data.cu); 
            }      
            else
              this.setState({
                isLoggedIn: false
              }); 
          })
      }

    render() {
        var logged = '';
        if(this.state.isLoggedIn !== false && this.state.isLoggedIn !== 'init'){
            logged = [
                <Route exact path="/" render={() => <Horarios isLoggedIn={this.state.isLoggedIn} handleInputChange={(e, val) => {this.handleInputChange(e, val)}} apiLogin={this.apiLogin.bind(this)}/>}/>,
                <Route path="/generador" render={() => <Horarios isLoggedIn={this.state.isLoggedIn} handleInputChange={(e, val) => {this.handleInputChange(e, val)}} apiLogin={this.apiLogin.bind(this)}/>}/>
            ];
        }
        
        
        else if(this.state.isLoggedIn === false || this.state.isLoggedIn === 'init'){
            logged = [
                <Route exact path="/" render={() => <Login isLoggedIn={this.state.isLoggedIn} handleInputChange={(e, val) => {this.handleInputChange(e, val)}} apiLogin={this.apiLogin.bind(this)}/>}/>,
                <Route path="/login" render={() => <Login isLoggedIn={this.state.isLoggedIn} handleInputChange={(e, val) => {this.handleInputChange(e, val)}} apiLogin={this.apiLogin.bind(this)}/>}/>
            ];
        }

        return (
            <BrowserRouter basename="/">
                <Root isLoggedIn={this.state.isLoggedIn} logout={this.logout.bind(this)}>
                    <Switch>
                        {logged}
                    </Switch>
                </Root>
            </BrowserRouter>
        );
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

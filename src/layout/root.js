import React, { Component } from 'react';

import {Header} from '../app/components/header';


export class Root extends Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={this.props.isLoggedIn} logout={this.props.logout}/>
          <main>
            <div></div>
              {this.props.children}
            <div></div>
          </main>
      </div>
    );
  }
}

export default Root;

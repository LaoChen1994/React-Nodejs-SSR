import React, { Component } from "react";
import ReactDom from 'react-dom';

export default class App extends Component {
  render() {
    return <div>这是一个共有页面</div>;
  }
}

ReactDom.render(<App />, document.querySelector('.app'))

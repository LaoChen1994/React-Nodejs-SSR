import ReactDom from "react-dom";
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  async getUserInfo() {
    const data = await axios.get("/cartList", { params: { userId: 7 } });
    console.log(data);
  }

  async getDirect() {
    const data = await axios.get(
      "http://127.0.0.1:8000/campus/api/getCartList?userId=7&start=1&pageSize=5"
    );
    console.log(data);
  }

  render() {
    return (
      <div>
        User Page
        <button onClick={this.getUserInfo}>获取用户信息</button>
        <button onClick={this.getDirect}>直接访问服务器</button>
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector(".app"));

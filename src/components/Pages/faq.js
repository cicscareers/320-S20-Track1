import React, { Component } from "react";
// import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import Faqs from "./components/Faqs";
import Header from "./components/Header";
import "./App.css";

class App extends Component {
  state = {
    faqs: [
      {
        id: 1,
        question: "Where do I find my profile?",
        answer: "Click profile",
      },
      {
        id: 2,
        question: "Where do I find my appointments?",
        answer: "Click my appointments",
      },
      {
        id: 3,
        question: "How do I logout?",
        answer: "Click logout",
      },
      {
        id: 4,
        question: "How do I login?",
        answer: "Click login",
      },
      {
        id: 5,
        question: "What is my birthday?",
        answer: "Check your profile",
      },
      {
        id: 6,
        question: "What is the square root of 169",
        answer: "13",
      },
    ],
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <Faqs faqs={this.state.faqs} />
        </div>
      </div>
    );
  }
}

export default App;

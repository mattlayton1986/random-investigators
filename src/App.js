import React, { Component } from 'react';
import Loader from './Loader/Loader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import RandomInvestigator from './RandomInvestigator/RandomInvestigator';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investigators: [],
      loading: true,
      loaded: false
    }
  }

  componentDidMount () {
    this.getInvestigators();
  }

  // API call to load data from ArkhamDB.com
  // Function is called in componentDidMount()
  getInvestigators =() => {
    this.setState({
      loading: true
    });
    fetch('https://arkhamdb.com/api/public/cards/')
      .then(res => res.json())
      .then(result => result.filter(card => {
        return card.type_code === 'investigator';
      }))
      .then(investigators => investigators.filter((investigator, index) => {
        let removable_indices = [33, 39, 40, 41];
        if (!removable_indices.includes(index)) {
          return investigator;
        }
      }))
      .then(final_cards => this.setState({
        ...this.state,
        investigators: final_cards,
        loading: false,
          loaded: true
      }));
  }

  render() {
    return (
      <main className="App">
        {
          this.state.loaded && this.state.investigators.length ? 
          <RandomInvestigator investigators={this.state.investigators} loading={this.state.loading} /> :
          <Loader />
        }
      </main>
    );
  }
}

export default App;
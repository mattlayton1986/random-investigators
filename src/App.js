import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      baseUrl: 'https://arkhamdb.com',
      chosen: 0,
      investigators: [],
      randomized: []
    }
  };

  handleClick = (e,number) => {
    let selected = document.querySelectorAll('.selected');
    for (let i=0; i < selected.length; i++) {
      selected[i].classList.remove('selected');
    }
    e.target.classList.add('selected');
    this.setState({
      chosen: number
    });
  }

  handleRandomize = () => {
    if (this.state.investigators) {
      let randomArray = [];
      let random_index = null;
      while (randomArray.length < this.state.chosen) {
        random_index = Math.floor(Math.random() * (this.state.investigators.length - 1));
        if (!randomArray.includes(random_index)) {
          randomArray.push(random_index);
        }
      }

      this.setState({
        randomized: randomArray
      });
    }
  }

  componentDidMount () {
    this.getInvestigators();
  }

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
      }))
      .then(() => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    // Console logs
    
    // end Console logs

    let randomized_investigators = [];
    let buttons = [1, 2, 3, 4].map(number => (
      <button key={number} className="selection" value={number} onClick={(e) => this.handleClick(e,number)}>{number}</button>
    ));

    if (!this.state.loading && this.state.investigators.length && this.state.randomized.length) {
      for (let i=0; i < this.state.randomized.length; i++) {
        randomized_investigators = this.state.randomized.map((random_idx, index) => {
          let investigator = this.state.investigators[random_idx];
          return (
            <div className="investigator">
              <a className="investigator_link" href={investigator.url} target="_blank">
              <img key={index} className="investigator_card" id={`investigator_${index + 1}`} src={this.state.baseUrl + investigator.imagesrc} />
              </a>
            </div>
          );
        });
      }
    }

    return (
      <div className="App">
        <h1>Get Random Investigators</h1>
        <div className="quantitySelector">
          <p>Choose how many investigators you want to play with:</p>
          {buttons}
          <div className="randomize">
            <button className="getRandom" value="getRandom" onClick={this.handleRandomize}>Randomize Investigators</button>
          </div>
        </div>

        <div className="investigator-container">
         {randomized_investigators}
        </div>
      </div>
    );
  }
}

export default App;

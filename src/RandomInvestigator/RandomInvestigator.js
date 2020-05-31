import React, {Component} from 'react';
import SelectionPanel from '../SelectionPanel/SelectionPanel';
import ResultsPanel from '../ResultsPanel/ResultsPanel';
import './RandomInvestigator.css';

class RandomInvestigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseUrl: 'https://arkhamdb.com',
      chosen: 0,
      randomized: []
    }
  };

  // Click handler to select number of investigators to play with
  handleQuantitySelection = (e,number) => {
    let selected = document.querySelectorAll('.selected');
    for (let i=0; i < selected.length; i++) {
      selected[i].classList.remove('selected');
    }
    e.target.classList.add('selected');
    this.setState({
      chosen: number
    });
  }

  // Click handler to perform randomize logic and display randomized investigators
  handleRandomize = () => {
    if (this.props.investigators) {
      let randomArray = [];
      let random_index = null;
      while (randomArray.length < this.state.chosen) {
        random_index = Math.floor(Math.random() * (this.props.investigators.length - 1));
        if (!randomArray.includes(random_index)) {
          randomArray.push(random_index);
        }
      }

      this.setState({
        randomized: randomArray
      });
    }
  }

  render() {

    let resultsPanel = this.props.investigators.length ? 
      (<ResultsPanel 
        investigators={this.props.investigators}
        randomized={this.state.randomized}
        baseUrl={this.state.baseUrl}
      />  ) : 
      null;

    return (
      <div className="RandomInvestigator">
        <h1>Get Random Investigators</h1>
        <SelectionPanel handleRandomize={this.handleRandomize} handleQuantitySelection={this.handleQuantitySelection} />
        {resultsPanel}
      </div>
    );
  }
}

export default RandomInvestigator;

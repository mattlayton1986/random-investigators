import React from 'react';
import Button from '../Button/Button';

import './SelectionPanel.css';

const SelectionPanel = (props) => {

  // Map buttons for number of players (max 4 players in Arkham Horror: LCG)
  let buttons = [1, 2, 3, 4].map(number => (
    <Button
      key={number}
      className="selection"
      value={number}
      click={(e) => props.handleQuantitySelection(e,number)}
    >
      {number}
    </Button>
  ));

  return (
    <div className="SelectionPanel">
       <div className="quantitySelector">
          <p>Choose how many investigators you want to play with:</p>
          {buttons}
          <div className="randomize">
            <Button className="getRandom" value="getRandom" click={props.handleRandomize}>Randomize Investigators</Button>
          </div>
        </div>
    </div>
  );
};

export default SelectionPanel;
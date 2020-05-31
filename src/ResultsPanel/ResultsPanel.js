import React from 'react';
import './ResultsPanel.css';

const ResultsPanel = (props) => {

  let randomized_investigators = [];
    
    // Build randomized_investigators array to display on page
    // Only shown if 
        // 1) not loading, 
        // 2) investigator data is present, and 
        // 3) Randomize Investigators button has been clicked
    if (!props.loading && props.investigators.length && props.randomized.length) {
      for (let i=0; i < props.randomized.length; i++) {
        randomized_investigators = props.randomized.map((random_idx, index) => {
          let investigator = props.investigators[random_idx];
          return (
            <div key={index} className="investigator">
              <a className="investigator_link" href={investigator.url} target="_blank">
              <img key={index} className="investigator_card" id={`investigator_${index + 1}`} src={props.baseUrl + investigator.imagesrc} />
              </a>
            </div>
          );
        });
      }
    }
  return (
    <div className="ResultsPanel">
      {randomized_investigators}
   </div>
  );
};

export default ResultsPanel;
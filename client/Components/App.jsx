import React, { useState, useEffect } from 'react';
import {csv} from 'd3';
import sampleData from '../assets/sampleData.csv';
import bb, {bar} from 'billboard.js';

function App() {
  useEffect(()=>{
    csv(sampleData)
    .then(data => {
      console.log(data);
    })
    .catch(error => 
      console.log(error)
    )
  },[])
  let chart = bb.generate({
    bindto: "#chart",
    interaction: {
      enabled: false
    },
    data: {
       x: 'x',
        type: bar(),
        columns: [
            ['x', '1/11/2021', '1/12/2021', '1/13/2021', '1/14/2021', '1/15/2021', '1/16/2021'],
            ["current", 30, 200, 100, 170, 150, 250],
            ["compare", 130, 100, 140, 35, 110, 50]
        ],
        xFormat: "%m/%d/%Y"
    },
    "axis": {
			"x": {
				"type": "timeseries",
			}
		}
  })

  return (
    <>
      <div>bye</div>
      <div id="chart"></div>
    </>
  )
}
export default App;
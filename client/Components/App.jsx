import React, { useState, useEffect } from 'react';
import {csv} from 'd3';
import sampleData from '../assets/sampleData.csv';
import bb, {bar} from 'billboard.js';
import TextField from '@material-ui/core/TextField';
import {
  DatePicker,
  DateRangePicker,
  DateRangeDelimiter,
  LocalizationProvider,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
// import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import DateFnsUtils from '@date-io/date-fns';

function App() {
  const [date, setDate] = useState(['x', '1/11/2021', '1/12/2021', '1/13/2021', '1/14/2021', '1/15/2021', '1/16/2021']);
  const [current, setCurrent] = useState(['current', 30, 200, 100, 170, 150, 250]);
  const [compare, setCompare] = useState(['compare', 130, 100, 140, 35, 110, 50]);

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
    bindto: '#chart',
    interaction: {
      enabled: false
    },
    data: {
       x: 'x',
        type: bar(),
        columns: [
            date,
            current,
            compare
        ],
        xFormat: '%m/%d/%Y'
    },
    'axis': {
			'x': {
				'type': 'timeseries',
			}
		}
  })



  return (
    <>
      <div>bye</div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className='DatePicker'>
          <div className='currentDatePicker'>
            <DatePicker />
            <div>to</div>
            <DatePicker />
          </div>
          <div className='compareDateTransition'>
            <DatePicker />
            <div>to</div>
            <DatePicker />
          </div>
        </div>
      </MuiPickersUtilsProvider>
      <div id='chart'></div>
    </>
  )
}
export default App;
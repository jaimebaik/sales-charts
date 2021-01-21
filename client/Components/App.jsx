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
import '../styles/styles.css';

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
    },
    'axis': {
			'x': {
        'type': 'category',
      },
      'y': {
        label: {
          text: 'revenue (in $)',
          position: "outer-middle"
        }
      }
		}
  })

  return (
    <>
      <div className='bye'>bye</div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className='DatePicker'>
          <div className='currentDatePicker'>
            <label>current: </label>
            <DatePicker onChange={(newDate) => {
              let startDate = ((newDate.getMonth() > 8) ? (newDate.getMonth() + 1) : ('0' + (newDate.getMonth() + 1))) + '/' + ((newDate.getDate() > 9) ? newDate.getDate() : ('0' + newDate.getDate())) + '/' + newDate.getFullYear().toString();
              const newDateArr = ['x'];
              newDateArr.push(startDate);
              console.log(newDateArr);
              setDate(newDateArr);
              console.log('date in date picker', date);
            }}/>
            <div className='transition'>to</div>
            <DatePicker />
          </div>
          <div className='compareDatePicker'>
          <label>compare: </label>
            <DatePicker />
            <div className='transition'>to</div>
            <DatePicker />
          </div>
        </div>
      </MuiPickersUtilsProvider>
      <div id='chart'></div>
    </>
  )
}
export default App;
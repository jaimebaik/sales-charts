import React, { useState, useEffect } from 'react';
import {csv} from 'd3';
import sampleData from '../assets/sampleData.csv';
import bb, {bar} from 'billboard.js';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import '../styles/styles.css';

const initialState_date = ['x'];

function App() {
  //states
  const [revenues, setRevenues] = useState([]);
  const [currStartDate, setCurrStartDate] = useState(null);
  const [currEndDate, setCurrEndDate] = useState(null);
  const [compStartDate, setCompStartDate] = useState(null);
  const [compEndDate, setCompEndDate] = useState(null);
  const [currRange, setCurrRange] = useState([]);
  const [compRange, setCompRange] = useState([]);
  const [date, setDate] = useState(['x']);
  const [current, setCurrent] = useState(['current']);
  const [compare, setCompare] = useState(['compare']);

  //restriction for comparison date
  let yesterday = new Date(currStartDate);

  //helper function to get range between dates, inclusive
  const getDatesBetweenDates = (startDate, endDate) => {
    let dates = [];
    //to avoid modifying the original date
    const theDate = new Date(startDate);
    const lastDate = new Date(endDate);
    lastDate.setDate(lastDate.getDate() + 1)
    while (theDate < lastDate) {
      const newDate = new Date(theDate);
      const dateStr = ((newDate.getMonth() > 8) ? (newDate.getMonth() + 1) : ((newDate.getMonth() + 1))) + '/' + ((newDate.getDate() > 9) ? newDate.getDate() : (newDate.getDate())) + '/' + newDate.getFullYear().toString();
      dates = [...dates, dateStr]
      theDate.setDate(theDate.getDate() + 1)
    }
    return dates;
  }

  //when the component mounts, parse through csv file to save the data in the state
  useEffect(() => {
    csv(sampleData)
    .then(data => {
      setRevenues(() => data);
    })
    .catch(error => 
      console.log(error)
    )
  },[])

  //get the range of dates when the user changes the inputs
  useEffect(()=> {
    let currNewRange;
    let compNewRange;
    if(currStartDate && currEndDate){
      currNewRange = getDatesBetweenDates(currStartDate, currEndDate);
      setCurrRange(currNewRange);
    }
    if(compStartDate && compEndDate){
      compNewRange = getDatesBetweenDates(compStartDate, compEndDate);
      setCompRange(compNewRange);
    }
    let dateRange = ['x'];
    if(currNewRange){
      for(let i = 0; i < currNewRange.length; i++){
        dateRange.push(currNewRange[i]);
        if(compNewRange) compNewRange[i] ? dateRange[i+1] += '\n'.concat(compNewRange[i]) : dateRange[i+1] += ''; 
      }
      setDate(dateRange);
    }
  }, [currStartDate, compStartDate, currEndDate, compEndDate])
  
  //everytime date/currData/compData state change, regenerate the chart with new data
  useEffect(()=>{
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
      'size': {
        height: 500
      },
      'padding': {
        'top': 20,
        'bottom': 200
      },
      legend: {
        position: 'right-center'
      },
      'axis': {
        'x': {
          'type': 'category',
          'tick': {
            rotate: -45,
          },
        },
        'y': {
          label: {
            text: 'revenue (in $)',
            position: "outer-middle"
          },
        }
      }
    })
  }, [date, current, compare])

  //use the ranges to grab the correct data to be displayed
  useEffect(() => {
    let i = 1;
    let j = 0;
    let k = 0;
    let newCurr = ['current'];
    let newComp = ['compare'];
    while(i < revenues.length && j < currRange.length){
      if(revenues[i]['Date'] === currRange[j]) {
        newCurr.push(parseFloat(revenues[i]['Revenue Booked'].slice(1).replace(/\,/g, '')));
        j++;
      }
      if(revenues[i]['Date'] === compRange[k]){
        newComp.push(parseFloat(revenues[i]['Revenue Booked'].slice(1).replace(/\,/g, '')));
        k++;
      }
      i++;
    }
    setCurrent(newCurr);
    setCompare(newComp);
  }, [currRange, compRange])
  return (
    <>
      <div className='bye'>bye</div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className='DatePicker'>
          <div className='currentDatePicker'>
            <label>current: </label>
            <DatePicker  
              className='curr' 
              minDate={new Date(2021, 0, 1)}
              maxDate={new Date(2021, 2, 31)}
              value={currStartDate} 
              onChange={(newDate)=> {
                setCurrStartDate(newDate);
              }}
            />
            <div className='transition'>to</div>
            <DatePicker 
              className='curr' 
              minDate={currStartDate}
              maxDate={new Date(2021, 2, 31)}
              value={currEndDate} 
              onChange={newDate=> setCurrEndDate(newDate)}
            />
          </div>
          {(currStartDate&&currEndDate) ? <></> : <div className='red'>required to select start and end dates for current data</div>}
          <div className='compareDatePicker'>
          <label>compare: </label>
            <DatePicker 
              minDate={new Date(2021, 0, 1)}
              maxDate={currStartDate ? yesterday.setDate(currStartDate.getDate() - 1) : currStartDate}
              value={compStartDate} 
              onChange={newDate => setCompStartDate(newDate)}
            />
            <div className='transition'>to</div>
            <DatePicker 
              minDate={compStartDate}
              maxDate={currStartDate ? yesterday.setDate(currStartDate.getDate() - 1) : currStartDate}
              value={compEndDate} 
              onChange={newDate => setCompEndDate(newDate)}
            />
          </div>
        </div>
      </MuiPickersUtilsProvider>
      <div id='chart'></div>
    </>
  )
}
export default App;
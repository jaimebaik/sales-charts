# sales-charts
displaying sales on selected date with chart

# start the chart to display
```js
npm install
npm start
```

Use this data to draw a chart using React.js and d3.js to satisfy the following requirements:
- [x] The user shall be able to select two date ranges: a current date range and a comparison date range
  - [x] The current date range is required
  - [x] The comparison date range is optional
  - [x] You can use a library such as MUI for the date picker component
- [x] Use d3.js to chart the revenue each day over the selected date range(s)
- [x] Enforce that the user can only select date ranges that are available in the dataset provided
- [x] Enforce that the comparison date range is before the current date range
    Examples: 
    February 1-5 (current) and January 1-5 (comparison) is allowed
    February 1-5 (current) and March 1-5 (comparison) is not allowed
- [ ] Give the ability to clear each date
  - [ ] If the current date is cleared, automatically clear the comparison date as well.
  - [ ] The comparison date can be cleared independently.
- [x] Please implement your solution using React 17, functional components, and hooks.

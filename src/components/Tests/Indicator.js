import React from 'react';

const Indicator = ({ val }) => {
  if (val) return <span style={{ color: 'green' }}>&#x2714; Passed all tests!</span>;
  else return <span style={{ color: 'red' }}>&#x2717; Tests failed.</span>;
}

export default Indicator;
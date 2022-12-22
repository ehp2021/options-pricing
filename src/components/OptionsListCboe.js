import React, { useState, useEffect } from 'react';
import OptionCard from "./OptionCard";
import axios, { all } from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, LabelList, Cell } from 'recharts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function OptionsList() {
  const [allOptions, setAllOptions] = useState([])


  // https://datashop.cboe.com/all-access-apis-pricing
  useEffect(() => {
    async function getOptions() {
      const results = await axios('');
      // console.log(results.options, "HELLO", typeof(results.options))
      setAllOptions(results.data)
    }
    getOptions()
  },[])
   
  // show all options
  function showOptions(arr) {
    return arr.map(option => {
      return (
        <OptionCard key={option.contractName} option={option}/>
      )
    })
  }


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>CALL</Button>
          <Button>PUT</Button>
        </ButtonGroup>
      </Box>

      <ScatterChart
        width={800}
        height={800}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="lastPrice" name="purchase price" unit="$" />
        <YAxis type="number" dataKey="impliedVolatility" name="implied vol" unit="%" />
        {/* <YAxis type="number" dataKey="daysBeforeExpiration" name="days before expir" unit="days" /> */}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={[{x: 2, y: 3},{x: 1, y: 3}]} fill="#8884d8">
        </Scatter>
      </ScatterChart>

      <Link to="/">
        <Button variant="outlined" sx={{margin: '10px'}}>Home</Button>
      </Link>

    </>
  )
}

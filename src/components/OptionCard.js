import React, {useState, useEffect} from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import OptionCardMini from './OptionCardMini';
import axios from 'axios';

export default function OptionCard(props) {
  const {contractName, optionsCount, callVolume, putVolume, impliedVolatility, expirationDate, options} = props.option;

  const [allPrices, setAllPrices] = useState([])

  useEffect(() => {
    axios
      .get("TslaEOD.json")
      .then(res => console.log(res.data.slice(-100)))
      .then((res) => 
        setAllPrices(res.data.slice(-100)))
      .catch((err) => console.log(err));
  }, []);

  return (

    <TableRow
      key={expirationDate}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="right">{impliedVolatility}</TableCell>
      <TableCell align="right">{optionsCount}</TableCell>
      <TableCell align="right">{callVolume}</TableCell>
      <TableCell align="right">{putVolume}</TableCell>
      <TableCell align="right">{callVolume / putVolume > 1 ? "More Calls" : "More PUTS"}</TableCell>
      <TableCell align="right">{expirationDate}</TableCell>
  {/* THIS SHOULD BE A MAP going into another componenet OPTIONCardMini (?) */}
      <TableCell align="right">{options.CALL.map(option => {
            return (
              <OptionCardMini key={option.contractName} option={option}/>
            )
          })}
      </TableCell>
      
      {/* PUTS */}
      {/* <TableCell align="right">{options.PUT.map(option => {
            return (
              <OptionCardMini key={option.contractName} option={option}/>
            )
          })}
      </TableCell> */}
    </TableRow>
  )
}

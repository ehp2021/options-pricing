import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Typography sx={{ flexGrow: 1, margin: '10px' }}>Homepage --- will have links to various options pricing tools</Typography>

      <Link to="/options-eod">
        <Button variant="outlined" style={{margin: '10px'}}>EOD data</Button>
      </Link>

      <Link to="/options-tradier">
        <Button variant="outlined" style={{margin: '10px'}}>Tradier data</Button>
      </Link>

      <Link to="/options-cboe">
        <Button variant="outlined" style={{margin: '10px'}}>CBOE API</Button>
      </Link>

      <Link to="/options-polygon">
        <Button variant="outlined" style={{margin: '10px'}}>Polygon API</Button>
      </Link>
    
    </div>
  )
}

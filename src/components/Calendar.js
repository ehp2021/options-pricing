import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';

export default function Calendar() {
  const [companyInfo, setCompanyInfo] = useState()

  //array of stock tickers
  const tickers = ['', '']

  //grab calendar dates 
  const fetchCompanies= async (stock) => {
    try {
      const accessToken = process.env.REACT_APP_TRADIER_ACCESS_TOKEN;
      const url=`https://api.tradier.com/beta/markets/fundamentals/calendars?symbols=${stock}"`
      const response = await axios(url, 
        {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // https://documentation.tradier.com/brokerage-api/markets/fundamentals/get-calendars
      // console.log(response.data.quotes.quote.last, "fetch stock price working?")
      setCompanyInfo(response.data.results.tables);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Typography>Calendar</Typography>
      {/* MAP on ARRAY through fetchcompanies function into a table*/}
    </div>
  )
}

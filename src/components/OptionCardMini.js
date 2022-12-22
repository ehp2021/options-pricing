import React from 'react'
import moment from 'moment'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function OptionCardMini(props) {
  const {contractName, lastTradeDateTime,  strike, 
    expirationDate, volume, lastPrice, openInterest,
    delta, gamma, rho, theta, vega
  } = props.option;
  const buyDate = moment(lastTradeDateTime);
  const expirDate = moment(expirationDate);
  const diff = expirDate.diff(buyDate);
  // in days
  const diffDurationDays = moment.duration(diff).days();
  //console.log(diffDurationDays, lastTradeDateTime, expirationDate)

  const styles = {
    card: {
      padding: "10px",
      margin: "10px",
      //color: 'blue',
      borderStyle: 'solid'
    }
  }

  return (
    <>
      <Card variant="outlined" style={styles.card}>
      <Typography gutterBottom variant="h6">{contractName}</Typography>
        <div>Current Price of TSLA: ${}</div>
        <div>${strike} Strike</div>
        <div>${lastPrice}</div>
        {/* Trading volume for options is calculated by totaling the number of contracts that transact within a specific period.  */}
        <div>{volume} options</div>
        {/* Open interest measures the total number of open contracts for any specific option. That includes all long positions held by investors that have been opened but haven’t yet been exercised, closed out, or expired. */}
        <div>{openInterest} open interest</div>
        <div>Last Trade {lastTradeDateTime}</div>
        <div>Expir Date {expirationDate}</div>
        <div>{diffDurationDays} day(s) til expiration</div>
        <Typography gutterBottom variant="h6">Greeks </Typography>
        {/* Delta is a measure of the change in an option's price or premium resulting from a change in the underlying asset, 
        while theta measures its price decay as time passes. */}
        <div>Delta {delta}</div>
        <div>Theta {theta}</div>
        {/* Gamma measures delta's rate of change over time, as well as the rate of change in the underlying asset. Gamma helps forecast price moves in the underlying asset.
        */}
        <div>Gamma {gamma}</div>
        {/* Vega—an option Greek can determine an option's sensitivity to implied volatility changes.*/}
        <div>Vega {vega}</div>
        {/*  rho, measures the impact of changes in interest rates on an option's price   */}
        <div>Rho {rho}</div>
      </Card>
    </>
    
  )
}

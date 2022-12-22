https://eodhistoricaldata.com/api/options/TSLA.US?api_token=demo&from=2018-01-01&to=2022-12-06

TSLA.json set up.
data: [
  {
    expirationDate,
    options: {
      CALL: [
        {
          contractName:
        }, 
        {}
      ],
      PUT: [
        {}, {}
      ]
    }
  }
]
line 87802 - end of array


for turning Tsla.json into json formatting:
command + shift + p
then type "Format JSON" and press enter to prettify the json file data

how to pull data from JSON file instead of API link?:
make sure local JSON file is in the public folder
https://dev.to/rajeshj3/api-request-to-local-json-file-in-react-n7f 
https://stackoverflow.com/questions/59690356/fetching-data-from-local-json-file-using-axios-and-displaying-data 

recharts
https://recharts.org/en-US/guide 
https://recharts.org/en-US/examples/SimpleScatterChart 
chartsjs
https://www.npmjs.com/package/chart.js?activeTab=readme

IMPLIED VOL
https://www.investopedia.com/ask/answers/032515/what-options-implied-volatility-and-how-it-calculated.asp

GREEKS
An option's "Greeks" describes its various risk parameters.
Delta is a measure of the change in an option's price or premium resulting from a change in the underlying asset, while theta measures its price decay as time passes.
Gamma measures delta's rate of change over time, as well as the rate of change in the underlying asset. Gamma helps forecast price moves in the underlying asset.
Vega—an option Greek can determine an option's sensitivity to implied volatility changes.
 rho, measures the impact of changes in interest rates on an option's price

 moment JS
 https://momentjs.com/docs/#/-project-status/ 

convert CSV to JSON
 https://retool.com/utilities/convert-csv-to-json

 rearranging data from an object into a new array
 https://stackoverflow.com/questions/40348171/es6-map-an-array-of-objects-to-return-an-array-of-objects-with-new-keys


 OLD TABLE CODE
       {/* <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">IV</TableCell>
            <TableCell align="center">Options Volume</TableCell>
            <TableCell align="center">Call Vol</TableCell>
            <TableCell align="center">Put Vol</TableCell>
            <TableCell align="center">Call Vol / Put Vol</TableCell>
            <TableCell align="center">Expir Date</TableCell>
            <TableCell align="center">CALLS</TableCell>
            <TableCell align="center">PUTS</TableCell>
          </TableRow>
        </TableHead> 
        <TableBody>
          {allOptions.slice(-3).map(option => {
            return (
              <OptionCard key={option.callVolume} option={option}/>
            )
          })}
        </TableBody>
          {/* {searchTerm ? filterCompanies(allCompanies, searchTerm) : showCo(allCompanies)} 
        </Table>
      </TableContainer> */}
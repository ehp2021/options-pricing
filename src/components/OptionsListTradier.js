import React, { useState, useEffect } from 'react';

function OptionsPricingData() {
  const [optionsData, setOptionsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.tradier.com/v1/markets/options/chains',
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${process.env.REACT_APP_TRADIER_API_KEY}`,
            },
            method: 'GET',
            mode: 'cors',
          }
        );
        const data = await response.json();
        console.log(data, "Traider WORKING??")
        setOptionsData(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>There was an error: {error.message}</p>;
  }

  if (!optionsData) {
    return <p>Loading options data...</p>;
  }

  return (
    <div>
      <h1>Options Pricing Data</h1>
      <pre>{JSON.stringify(optionsData, null, 2)}</pre>
    </div>
  );
}

export default OptionsPricingData;

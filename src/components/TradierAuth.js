import React, { useState } from 'react';

const TradierOAuthExample = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleOAuth = async () => {
    const clientId = 'your_client_id';
    const clientSecret = 'your_client_secret';
    const redirectUri = 'your_redirect_uri';

    // First, redirect the user to the Tradier authorization page
    window.location.replace(
      `https://api.tradier.com/v1/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`
    );

    // When the user is redirected back to the app, extract the authorization code from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    // Use the authorization code to request an access token
    const response = await fetch('https://api.tradier.com/v1/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`,
    });
    const data = await response.json();

    // Save the access token to state
    setAccessToken(data.access_token);
  };

  return (
    <div>
      {accessToken ? (
        <p>Successfully authenticated with Tradier. Access token: {accessToken}</p>
      ) : (
        <button onClick={handleOAuth}>Authenticate with Tradier</button>
      )}
    </div>
  );
};

export default TradierOAuthExample;

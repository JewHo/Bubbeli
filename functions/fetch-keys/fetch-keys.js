// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2




exports.handler = async (event, context) => {
  console.log('Helo wrld');
  try {
    const API_ENDPOINT = 'https://accounts.spotify.com/api/token';
    var client_id = process.env.MY_KEY;
    var client_secret = process.env.SECRET_KEY; // Your secret

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
              'Content-Type': "application/x-www-form-urlencoded"
            },
            body: urlencoded,
            redirect: 'follow'
          }
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
    //return { statusCode: 200, body: JSON.stringify({ client_id }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
import fetch from "node-fetch";

const handler = async (event) => {

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
    try {
    let res = await fetch("https://accounts.spotify.com/api/token", requestOptions);
    res = await res.json();
    console.log(res);
    return { statusCode: 200, body: JSON.stringify(res) }

  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

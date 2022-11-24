// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {

    var client_id = process.env.MY_KEY;
    var client_secret = process.env.SECRET_KEY; // Your secret

    let myHeaders = new Headers();
    myHeaders.append("Authorization", 'Basic ' + btoa(client_id + ':' + client_secret));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          }
    try {
    let res = await fetch("https://accounts.spotify.com/api/token", requestOptions);

    return { status : 200, body: JSON.stringify(res)
    }

  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

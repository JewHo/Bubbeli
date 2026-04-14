exports.handler = async function () {
  try {
    const artistId = '1439676537';

    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${artistId}&entity=album&limit=200`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Apple lookup failed: ${response.status}`
        })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

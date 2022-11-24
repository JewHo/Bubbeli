/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
 async function getArtistData() {
 const tokenResponse = await fetch('/.netlify/functions/fetch-keys').then((response) => response.json());
 const access_token = tokenResponse.access_token

    const artistResponse = await fetch('https://api.spotify.com/v1/artists/2hUKFORuqeQo6iUSlTmOVq/albums', {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + access_token
              }

          })
          .then(response => response.json());
    appendData(artistResponse);
    async function appendData(data) {
        const albumItems = data.items;
        var mainContainer = document.getElementById("bubbelispotify");
        for (var i = 0; i < albumItems.length; i++) {
          var div1 = document.createElement("div");
          div1.id = 'accordion';
          var div2 = document.createElement("div");
          div2.className = "card mt-2 mb-2 border-bottom";
          div2.style = "border:0px";
          var div3 = document.createElement("div");
          div3.id = 'heading'+albumItems[i].id;
          var div4 = document.createElement("div");
          div4.className = "btn btn-link btn-wrap-text collapsed text-dark";
          div4.setAttribute('onclick', "window.open('"+albumItems[i].external_urls.spotify+"');");
          div4.setAttribute('data-toggle','collapse');
          div4.setAttribute('data-target', '#collapse'+albumItems[i].id);
          div4.setAttribute('aria-expanded','false');
          div4.setAttribute('aria-controls','collapse'+albumItems[i].id);
          var div5 = document.createElement("div");
          div5.className = "row";
          var div6 = document.createElement("div");
          div6.className= "col-md-6 pl-0 pr-0 align-self-center";
          var div7 = document.createElement("div");
          div7.className= "col-md-6 pl-0 pr-0 align-self-center";
          var heading1 = document.createElement("h5");
          heading1.className= "mb-0";
          heading1.innerHTML = " ";
          var heading2 = document.createElement("h3");
          heading2.innerHTML = albumItems[i].name;
          heading2.style = "font-family:monospace"
          var heading3 = document.createElement("h5");
          heading3.innerHTML = albumItems[i].album_type;
          var heading4 = document.createElement("h6");
          heading4.style = "font-family:monospace";
          heading4.innerHTML = albumItems[i].release_date;
          var div8 = document.createElement("div");
          div8.id = 'collapse'+albumItems[i].id;
          div8.className= "collapse";
          div8.setAttribute('aria-labelledby','heading'+albumItems[i].id);
          div8.setAttribute('data-parent','#accordion');
          var heading5 = document.createElement("h2");
          heading5.className = "card-title mt-3";
          heading5.innerHTML = "Tracklist";
          var heading6 = document.createElement("h4");
          heading6.className = "card-title mt-3";
          heading6.innerHTML = "Info";
          var img = document.createElement("img");
          img.src = albumItems[i].images[1].url;
          img.className = "img-responsive rounded";
          img.width = "210";
          img.height = "210";
          var divTracks = document.createElement("div");
          divTracks.id = "accordion";
          divTracks.style = "font-family:monospace;";


          var hr = document.createElement("div");
          hr.innerHTML = "*"

          div6.appendChild(img);

          div7.appendChild(heading1);
          div7.appendChild(heading2);
          div7.appendChild(heading3);
          div7.appendChild(heading4);
          div5.appendChild(div6);
          div5.appendChild(div7);
          div4.appendChild(div5);
          div3.appendChild(div4);
          div2.appendChild(div3);
          //div8.appendChild(divTracks);
          div2.appendChild(div8);
          div1.appendChild(div2);
          //div1.appendChild(hr);
          mainContainer.appendChild(div1);

          }
        }
      }
  getArtistData();

/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

 var client_id = "0be00787b5e44ac399cc93d252cbdcd8";
 var client_secret = "b86671e3e44d407ca7e27cefd9f64041"; // Your secret

 async function authorize() {
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

         let res = await fetch("https://accounts.spotify.com/api/token", requestOptions);
         res = await res.json();
         console.log(res.access_token);
         return res.access_token;
     }


    async function getArtistData() {
      const access_token = await this.authorize();

        console.log("token before albumapi: "+access_token);
    const artistResponse = await fetch('https://api.spotify.com/v1/artists/2hUKFORuqeQo6iUSlTmOVq/albums', {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + access_token
              }

          })
          .then(response => response.json());
    console.log(artistResponse);
    appendData(artistResponse);
    async function appendData(data) {
        const albumItems = data.items;
        console.log(albumItems);
        var mainContainer = document.getElementById("bubbelispotify");
        for (var i = 0; i < albumItems.length; i++) {
          var div1 = document.createElement("div");
          div1.id = 'accordion'+albumItems[i].id;
          var div2 = document.createElement("div");
          div2.className = "card mb-2 mt-2 border-top";
          div2.style = "border:0px";
          var div3 = document.createElement("div");
          div3.id = 'heading'+albumItems[i].id;
          var div4 = document.createElement("div");
          div4.className = "btn btn-link btn-wrap-text collapsed text-dark";
          div4.setAttribute('data-toggle','collapse');
          div4.setAttribute('data-target', "#collapse" + albumItems[i].id);
          div4.setAttribute('aria-expanded',"false");
          div4.setAttribute('aria-controls','collapse'+albumItems[i].id);
          var div5 = document.createElement("div");
          div5.className = "row";
          var div6 = document.createElement("div");
          div6.className= "col-md-6 pl-0 pr-0 align-self-center";
          var div7 = document.createElement("div");
          div7.className= "col-md-6 pl-0 pr-0 align-self-center";
          var heading1 = document.createElement("h5");
          heading1.className= "mb-0";
          var heading2 = document.createElement("h3");
          heading2.innerHTML = albumItems[i].name;
          heading2.style = "font-family:monospace"
          var heading3 = document.createElement("h5");
          heading3.innerHTML = albumItems[i].album_type;
          //var heading4 = document.createElement("h6");
          //heading4.style = "font-family:monospace";
          //heading4.innerHTML = albumItems[i].release_date;
          var div8 = document.createElement("div");
          div8.id = 'collapse'+albumItems[i].id;
          div8.className= "collapse";
          div8.setAttribute('aria-labelledby','heading'+albumItems[i].id);
          div8.setAttribute('data-parent',"#accordion" + albumItems[i].id);
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
          //var accessTokenAlbumTrack = "BQABtm-KXVa0z0ra7Dv3bei_zF2TrchpFlIEYfMrOjlRhElqFWtzPcEz5Q8m8kDeqOhi9FFtD_srs6yoCj8ghiC2cfc3_W7BFzvJg1fsxMeYTWTVEhYyCJc0hAukj8GgOx2MM4uGW-vyQPlzP4w-j__OpvM8t0W5PMg9lSXDK15MpOU"
          var albumUrl = 'https://api.spotify.com/v1/albums/'+albumItems[i].id+'/tracks'
          const albumDataRequest = await fetch('https://api.spotify.com/v1/albums/'+albumItems[i].id+'/tracks', {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + access_token
                            }
                        })
            .then((response) => response.json())
            .then((data) => {
                        appendAlbumData(data);
                      })
            .catch(function (err) {
                          console.log('error: ' + err);
                      });
          async function appendAlbumData(data) {
              const albumTracks = data.items;
              console.log(albumTracks);
              if (albumTracks.length > 1) {
                divTracks.appendChild(heading5);
                for (var j = 0; j < albumTracks.length; j++){
                var div10 = document.createElement("div");
                div10.className = "card";
                div10.style = "border:0px;";
                var heading7 = document.createElement("h5");
                heading7.className = "mb-0";
                var button1 = document.createElement("button");
                button1.className = "btn btn-link btn-wrap-text text-dark";
                button1.innerHTML = albumTracks[j].track_number + '. ' + albumTracks[j].name;
                heading7.appendChild(button1);
                div10.appendChild(heading7);
                divTracks.appendChild(div10);
                        }
                    }
                //divTracks.appendChild(heading6);
                divTracks.innerHTML += '</br>Released: ' + albumItems[i].release_date +"<br/>";
                divTracks.innerHTML += "<a href="+albumItems[i].external_urls.spotify+" target='_blank'>Spotify</a>"+"<br/>";
                }


          var hr = document.createElement("div");
          hr.innerHTML = "*"

          div6.appendChild(img);

          div7.appendChild(heading1);
          div7.appendChild(heading2);
          div7.appendChild(heading3);
          //div7.appendChild(heading4);
          div5.appendChild(div6);
          div5.appendChild(div7);
          div4.appendChild(div5);
          div3.appendChild(div4);
          div2.appendChild(div3);
          div8.appendChild(divTracks);
          div2.appendChild(div8);
          div1.appendChild(div2);
          //div1.appendChild(hr);
          mainContainer.appendChild(div1);

          }
        }
      }
  getArtistData();

var redirect_uri = "http://127.0.0.1:1313";


var client_id = "asd";
var client_secret = "asd"; // In a real app you should not expose your client_secret to the user

var access_token = null;
var refresh_token = null;

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";

function onPageLoad(){
    requestAuthorization();
    console.log(client_id);
    console.log(client_secret);
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user
    console.log(window.location.search.length);
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
    else {
        handleRedirect();
    }
}

function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    //window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode(){
    let code = null;
    const queryString = window.location.search;
    console.log(queryString);
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    console.log("code: " + code);
    return code;
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    console.log("body: " + body);
    callAuthorizationApi(body);
}

function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id) + ":" + btoa(client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
            console.log("handleAuthorizationResponse: "+ access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
            console.log(refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log("nyt tuli moka" + this.responseText);
    }
}

function requestAuthorization(){

    if (window.location.href.length < 23) {
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user


    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
    console.log(url);
  }
};
onPageLoad();

  var token = "BQDVsv6FZrDLLQk6fkITAmF7GK5jfnVPViBZcOfAVEQBvypq6bPSumNLYChnashgipzB_lzjkmCgGq1J6";
  console.log("token before albumapi: "+localStorage.getItem(access_token));
    async function getArtistData() {
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
          div2.className = "card mb-4";
          div2.style = "border:0px";
          var div3 = document.createElement("div");
          div3.id = 'heading'+albumItems[i].id;
          div3.className = "rounded border";
          var div4 = document.createElement("div");
          div4.className = "btn btn-link btn-wrap-text collapsed text-dark";
          div4.setAttribute('data-toggle','collapse');
          div4.setAttribute('data-target', "#collapse" + albumItems[i].id);
          div4.setAttribute('aria-expanded',"false");
          div4.setAttribute('aria-controls','collapse'+albumItems[i].id);
          var div5 = document.createElement("div");
          div5.className = "row";
          var div6 = document.createElement("div");
          div6.className= "col-md-5 pl-0 pr-0 align-self-center";
          var div7 = document.createElement("div");
          div7.className= "col-md-7 pl-0 pr-0 align-self-center";
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
                divTracks.appendChild(heading6);
                divTracks.innerHTML += 'Released: ' + albumItems[i].release_date +"<br/>";
                divTracks.innerHTML += "<a href="+albumItems[i].external_urls.spotify+" target='_blank'>Spotify</a>";
                }


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
          mainContainer.appendChild(div1);

          }
        }
      }
  getArtistData();

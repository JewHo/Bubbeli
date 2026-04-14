/**
 * Fetch albums for an Apple Music / iTunes artist by artist ID
 * and render them into #bubbelispotify.
 *
 * No auth token is required.
 */
async function getArtistData() {
  try {
    const artistId = '1439676537';

    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${artistId}&entity=album&limit=200`
    );

    if (!response.ok) {
      throw new Error(`Apple lookup failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    await appendData(data);

    document.body.style.display = 'block';
  } catch (error) {
    console.error('Error loading artist data:', error);
  }
}

async function appendData(data) {
  const mainContainer = document.getElementById("bubbelispotify");
  mainContainer.innerHTML = "";

  if (!data || !Array.isArray(data.results)) {
    console.error("Unexpected API response:", data);
    return;
  }

  // The first result is usually the artist record.
  // Keep only actual album collections.
  const albumItems = data.results.filter((item) =>
    item.wrapperType === "collection" &&
    item.collectionType === "Album"
  );

  // Remove duplicate albums by collectionId
  const uniqueAlbums = [];
  const seen = new Set();

  for (let i = 0; i < albumItems.length; i++) {
    const album = albumItems[i];
    if (!seen.has(album.collectionId)) {
      seen.add(album.collectionId);
      uniqueAlbums.push(album);
    }
  }

  for (let i = 0; i < uniqueAlbums.length; i++) {
    const album = uniqueAlbums[i];
    const itemId = album.collectionId || i;

    var div1 = document.createElement("div");
    div1.id = 'accordion-' + itemId;

    var div2 = document.createElement("div");
    div2.className = "card mt-4 border-bottom";
    div2.style = "border:0px";

    var div3 = document.createElement("div");
    div3.id = 'heading' + itemId;

    var div4 = document.createElement("div");
    div4.className = "mb-4 btn btn-link btn-wrap-text collapsed text-dark";
    div4.setAttribute('onclick', "window.open('" + album.collectionViewUrl + "', '_blank');");
    div4.setAttribute('data-toggle', 'collapse');
    div4.setAttribute('data-target', '#collapse' + itemId);
    div4.setAttribute('aria-expanded', 'false');
    div4.setAttribute('aria-controls', 'collapse' + itemId);

    var div5 = document.createElement("div");
    div5.className = "row";

    var div6 = document.createElement("div");
    div6.className = "col-md-6 pl-0 pr-0 align-self-center";

    var div7 = document.createElement("div");
    div7.className = "col-md-6 pl-0 pr-0 align-self-center";

    var heading1 = document.createElement("h5");
    heading1.className = "mb-0";
    heading1.innerHTML = " ";

    var heading2 = document.createElement("h5");
    heading2.innerHTML = album.collectionName || "";
    heading2.style = "font-family:futura";
    heading2.className = "mt-2";

    var heading3 = document.createElement("h5");
    heading3.innerHTML = album.primaryGenreName || "Album";

    var heading4 = document.createElement("h8");
    heading4.style = "font-family:futura";
    heading4.innerHTML = album.releaseDate
      ? new Date(album.releaseDate).toISOString().split("T")[0]
      : "";

    var div8 = document.createElement("div");
    div8.id = 'collapse' + itemId;
    div8.className = "collapse";
    div8.setAttribute('aria-labelledby', 'heading' + itemId);
    div8.setAttribute('data-parent', '#accordion-' + itemId);

    var img = document.createElement("img");
    img.src = (album.artworkUrl100 || "").replace("100x100bb", "300x300bb");
    img.className = "img-responsive rounded";
    img.width = "210";
    img.height = "210";
    img.alt = album.collectionName || "Album cover";

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
    div2.appendChild(div8);
    div1.appendChild(div2);
    mainContainer.appendChild(div1);
  }
}

// Call the function
getArtistData();

var mymap = L.map("map").setView([49.01477,-94.294498], 1000);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Nob2VuMzkzMCIsImEiOiJja3o3aG9jcXcxYW1zMnZueGV5ZDl4ZXd3In0.rtn_VaAltcpsKr0cG6Yn5A', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

L.marker([49.01477, -94.29498])
    .addTo(mymap);

L.marker([18.34144193849841, -64.83936978029998])
    .addTo(mymap);

L.marker([33.77623923322386, -118.19575285719075])
    .addTo(mymap);

L.marker([48.970606091606165, 2.2615622987359454])
    .addTo(mymap);

L.marker([52.18537861272845, 4.509593975452323])
    .addTo(mymap);

L.marker([45.695711906489706, -73.837883903834])
    .addTo(mymap);

L.marker([8.30437000217,47.04953997880])
    .addTo(mymap);

L.marker([7.85349002021,46.68450003050])
    .addTo(mymap);

L.marker([7.96223000738,46.53678000050])
    .addTo(mymap);

L.marker([7.74841003901,46.02415998230])
    .addTo(mymap);
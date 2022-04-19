 var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Nob2VuMzkzMCIsImEiOiJja3o3aG9jcXcxYW1zMnZueGV5ZDl4ZXd3In0.rtn_VaAltcpsKr0cG6Yn5A', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    });

    var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
   });

    var topo = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'SRTM30-Colored-Hillshade'
    });

    var mymap = L.map("map", {
        center: [0, 0], 
        zoom: 2,
        minZoom: 1,
        layers: grayscale});

    var baseLayers = {
        'Grayscale': grayscale, 
        'Streets': streets,
        "Hillshade": topo,
    };

    var layerControl = L.control.layers(baseLayers).addTo(mymap);

    L.control.scale({position: 'bottomright', maxWidth: '150', metric: 'True'}).addTo(mymap);

    var pnt_layer = L.layerGroup().addTo(mymap);
    var md_layer = L.layerGroup().addTo(mymap);
    var gc_layer = L.layerGroup().addTo(mymap);

    var points = turf.randomPoint(2);

    L.geoJSON(points, {
        onEachFeature: function(feature, layer) {
            layer.addEventListener("drag", drawGC);
        },
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.marker(latlng, {draggable: true});
        }
    }).addTo(pnt_layer); 

    
    // Function to draw great circle and midpoint
    function drawGC() {
        gc_layer.clearLayers();
        md_layer.clearLayers();
        points = pnt_layer.toGeoJSON();
        gc = turf.greatCircle(points.features[0].geometry.coordinates, points.features[1].geometry.coordinates); 
        gc = L.geoJSON(gc);
        gc.addTo(gc_layer);
        md = turf.midpoint(points.features[0].geometry.coordinates, points.features[1].geometry.coordinates);
        md = L.geoJSON(md);
        md.addTo(md_layer);
    }
    drawGC();

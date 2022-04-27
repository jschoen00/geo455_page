//baselayers
    var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    });
    var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Nob2VuMzkzMCIsImEiOiJja3o3aG9jcXcxYW1zMnZueGV5ZDl4ZXd3In0.rtn_VaAltcpsKr0cG6Yn5A', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    });
    var topo = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'SRTM30-Colored-Hillshade'
    });   


//layerGroups 
    var riverLayer = L.layerGroup();
    var lakeLayer = L.layerGroup();
    var countyLayer = L.layerGroup();
    var lulcLayer = L.layerGroup();


//county border style, adding to layerGroup
    var countyStyle = {
        "color": "#000000",
        "fillOpacity": 0,
    };
    var county = L.geoJson(county, {
        style: countyStyle, 
    });
    county.addTo(countyLayer);

////lulc layer... maybe
    var lulc = L.esri.dynamicMapLayer( {
        url: 'https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer',
        // server response content type can be either 'json' (default) or 'image'
        f: 'image'
      }).addTo(mymap);



//river style, adding to layerGroup
    var riverStyle = {
        "color": "#82b0fa"
    };
    var rivers = L.geoJson(rivers, {
//    onEachFeature: function (feature, layer) {
//        rivers.bindPopup('<h1>'+feature.properties.WATERBODY_+'</h1><p>name: '+feature.properties.Impairments+'</p>');
//    },
        style: riverStyle, 
    });
    rivers.bindPopup("Popup content");
    rivers.on('mouseover', function (e) {
        this.openPopup();
    });
    rivers.on('mouseout', function (e) {
        this.closePopup();
    });
    rivers.addTo(riverLayer);


//lake style, popup, adding to layerGroup
    var lakeStyle = { 
        "color": "#7293e0",
        "fillOpacity": 1,
    };
    var lakes = L.geoJson(lakes, {
        style: lakeStyle,                 
    });
    lakes.bindPopup("Popup content");
    lakes.on('mouseover', function (e) {
        this.openPopup();
    });
    lakes.on('mouseout', function (e) {
        this.closePopup();
    });
    lakes.addTo(lakeLayer);


//Create the map variable
    var mymap = L.map('map', {
        center: [43.92427169016961, -91.09884770078885], 
        zoom: 11,
        layers: [grayscale, countyLayer, lakeLayer, riverLayer] //add LULC layer
    });

// Create options for layerControl
    var baseLayers = {
        'Grayscale': grayscale,
        'Streets': streets,
        "Hillshade": topo,
	};
    var overlays = {
        'County Border': countyLayer,
//        'Land Use': lulcLayer,
        'Impaired Rivers': riverLayer,
        'Impaired Lakes': lakes,
    };

//Create layerControl
    var layerControl = L.control.layers(baseLayers, overlays, {
        collapsed: false}).addTo(mymap);

    L.control.scale({position: 'bottomright', maxWidth: '200', metric: 'True'}).addTo(mymap);










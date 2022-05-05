//baselayers
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
    var sat = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution:'Map data &copy; <a href="http://www.esri.com/">Esri</a>',
            maxZoom: 18,
    });

//layerGroups 
    var impRiverLayer = L.layerGroup();
    var impLakeLayer = L.layerGroup();
    var nonimpRiverLayer = L.layerGroup();
    var nonimpLakeLayer = L.layerGroup(); 
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


//styles
    var riverStyle = {
        "color": "#82b0fa"
    };
    var impRiverStyle = {
        "color": "#fc4c4c",
        "weight": 2,
    };
    var lakeStyle = { 
        "color": "#7293e0",
        "fillOpacity": 1,
    };
    var impLakeStyle = { 
        "color": "#fc4c4c",
        "weight": 2,
        "fillOpacity": 1,
    };









//rivers -- layers and popups
    var impRivers = L.geoJson(impairedRivers, {
        style: riverStyle, 
    }).bindPopup(function(layer){
        return '<p><b>River Name: </b>'+layer.feature.properties.WATERBODY_+ '</br><b>' +
            'Impairment: </b>'+layer.feature.properties.Impairments+ '</br></p>';
    }).on('mouseover', function(e) {
        impairedRivers.setStyle(impRiverStyle);
    });
    impRivers.addTo(impRiverLayer);  








    var nonimpRivers = L.geoJson(nonimpairedRivers, {
        style: riverStyle, 
    }).bindPopup(function(layer){
        return '<p><b>River Name: </b>'+layer.feature.properties.ROW_NAME+ '</br><b>' +
            'No Impairments</b></p>';
    });
    nonimpRivers.addTo(nonimpRiverLayer);


//lakes -- layers and popups
    var impLakes = L.geoJson(impairedLakes, {
        style: lakeStyle,                 
    }).bindPopup(function(layer){
        return '<p><b>Lake Name: </b>'+layer.feature.properties.WATERBODY_+ '</br><b>' +
            'Impairment: </b>'+layer.feature.properties.Impairments+ '</br></p>';
    });
    impLakes.addTo(impLakeLayer);

    var nonimpLakes = L.geoJson(nonimpairedLakes, {
        style: lakeStyle,                 
    }).bindPopup(function(layer){
        return '<p><b>Lake Name: </b>'+layer.feature.properties.WATERBODY_+ '</br><b>' +
            'No Impairments</b></p>';
    });
    nonimpLakes.addTo(nonimpLakeLayer);

//land use layer
    var lulc = L.esri.imageMapLayer({
        url: 'https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer',
        opacity: 0.5,
    }).addTo(lulcLayer);


//Create the map variable
    var mymap = L.map('map', {
        center: [43.92427169016961, -91.09884770078885], 
        zoom: 11,
        minZoom: 10,
        layers: [topo, countyLayer, lulcLayer, impRiverLayer, nonimpRiverLayer, impLakeLayer, nonimpLakeLayer]
    });

// Create options for layerControl
    var baseLayers = {
        'Hillshade': topo,
        'Satellite': sat,
        'Streets': streets,
        
	};
    var overlays = {
        'Land Use': lulcLayer,
        'Impaired Rivers': impRiverLayer,
        'Impaired Lakes': impLakeLayer,
        'Non Impaired Rivers': nonimpRiverLayer,
        'Non Impaired Lakes': nonimpLakeLayer,
    };

//Create layerControl
    var layerControl = L.control.layers(baseLayers, overlays, {
        collapsed: false}).addTo(mymap);

    L.control.scale({position: 'bottomright', maxWidth: '200', metric: 'True'}).addTo(mymap);

//original extent
    L.easyButton(('<img src="globe_icon.png", height=85%;>'), function(btn, map){
        map.setView([43.92427169016961, -91.09884770078885], 11);
        }).addTo(mymap);



    // dots and arrows for info box
    var slideIndex = 1;
    showSlides(slideIndex);

    $(document).ready(function() {
        $("#p").click(function(){
            minusSlides(1);
        });
        
        $("#n").click(function(){
            plusSlides(1);
        });
    });

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function minusSlides(n) {
      showSlides(slideIndex -= n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("slides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
    }

    $(document).ready(function() {
        $("#lgnd").click(function(){
            $("img.leg").hide();
        });
        $("#showlgnd").click(function(){
            $("img.leg").show();
        });
    });

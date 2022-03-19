var mymap = L.map('map', {
    center: [51.48882027639122, -0.1028811094342392],
              zoom: 11
          });

 L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
   attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
   maxZoom: 11,
   minZoom: 5
 }).addTo(mymap);



function getColor(value) {
    return value > 139 ? '#006d2c':
           value > 87  ? '#31a354':
           value > 53  ? '#74c476':
           value > 32  ? '#bae4b3':
                         '#edf8e9';
}

function style(feature){
    return {
        fillColor: getColor(feature.properties.pop_den),  
        weight: 2,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
    }

  function highlightFeature(e) {
    var feature = e.target;

    feature.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }
}

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature, 
            mouseout: resetHighlight,    
        });
    }


    var geojson;    

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    geojson = L.geoJson(data, {
        style: style,
        onEachFeature: onEachFeature
    }).bindPopup(function (layer){
    return layer.feature.properties.NAME 
           + '<p style="color:purple">' + layer.feature.properties.pop_den.toString() + ' people/hectare </p>';       
}).addTo(mymap);



  var legend = L.control({position: 'bottomleft'}); 

    legend.onAdd = function (mymap) {

        var div = L.DomUtil.create('div', 'legend'),
            grades = [0, 32, 53, 87, 139]; 

        div.innerHTML = '<b>Population Density <br></b>'; 
        
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i>' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(mymap);
mapboxgl.accessToken = 'pk.eyJ1IjoiamZzMjExOCIsImEiOiJlMUQzd2YwIn0.WLb3PYDt2z-XttOLFcQlVQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jfs2118/cl3ugxsz1000r14pnfjd10lmj',
    zoom: 3.5,
    maxZoom: 9,
    minZoom: 3,
    center: [-85.5, 37.7],
    projection: "albers"
});

map.on("load", function () {
    // This is the function that finds the first symbol layer
    // let layers = map.getStyle().layers;
    // for (var i = 0; i < layers.length; i++) {
    //     console.log(layers[i].id);
    // }

    map.addLayer({
      id: "counties",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countyTypologyCodes.geojson",
      },
      paint: {
        "fill-color": "#ffffff",
        "fill-outline-color" : "blue"
      },
    }, "waterway-label"
    );
    
  });
  
// Create the popup
map.on('click', 'us_states_elections', function (e) {
    var stateName = e.features[0].properties.State;
    var winner = e.features[0].properties.Winner;
    var imagePath;
    if (winner == 'Donald J Trump'){
        imagePath = 'img/trump.jpg';
    }
    else{
        imagePath = 'img/biden.jpg';
    }
    var wnrPerc = e.features[0].properties.WnrPerc;
    var totalVotes = e.features[0].properties.Total;
    wnrPerc = (wnrPerc * 100).toFixed(0);
    totalVotes = totalVotes.toLocaleString();
    stateName = stateName.toUpperCase();
    console.log(imagePath);
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+stateName+'</h4>'
            +'<h2>'+winner+'</h2>'
            + '<p>'+wnrPerc+'% - ('+totalVotes+' votes)<br>'
            + '<img src="' + imagePath + '"></p>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on('mouseenter', 'us_states_elections', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'us_states_elections', function () {
    map.getCanvas().style.cursor = '';
});

////////////
// MAIN MAP
////////////
function main() {
    var vizjson_url = 'https://team.cartodb.com/u/aureliamoser/api/v2/viz/cb7df0d4-707b-11e5-b7f9-0ef24382571b/viz.json';

    var sublayers = [];

    // instantiate map object from Leaflet
    var mapObj = new L.Map(map, {
        center: [0, 0], // Null Island
        zoom: 3 // zoom projection to adjust starting point zoom
    });


    // add basemap tiles
    L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapObj);

    // add data tile layers here (if you have multiple layers, you can manipulate them in js here)
    cartodb.createLayer(mapObj,vizjson_url)
        .addTo(mapObj)
        .done(function(layer) {
          console.log("Map successfully created.");
            sublayers[0] = layer.getSubLayer(0);
            sublayers[0].set(options); // altering the SQL and CartoCSS; see above
        })
        .error(function(err) {
               console.log("Map not created: " + err);
        });
  }
$(function () {
  main();
});
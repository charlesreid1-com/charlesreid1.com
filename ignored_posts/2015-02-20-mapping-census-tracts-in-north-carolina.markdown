---
layout: post
title: Mapping Census Tracts in North Carolina
date: 2015-02-20 23:28:10 -0800
comments: true
categories: 
---

My goal in making this map of North Carolina was to gain more familiarity with the Census Reporter API, and start to dig down past the county level, to the zip code, area code, and census tract levels.

I created a wiki page to document the process of building it, which is here: [http://charlesreid1.com/wiki/NC_Census_Map](http://charlesreid1.com/wiki/NC_Census_Map)

The final product is at the project page for A Shrubbery: [http://charlesreid1.github.io/a-shrubbery/nccensus/](http://charlesreid1.github.io/a-shrubbery/nccensus/)

## Organizing My Javascript

To keep the javascript files for these North Carolina census maps organized, I put code for each map in its own separate file.

Thus the HTML will look something like this:

```html

<p>This is the first map:</p>

<div id="map1"></div>

<p>This is the second map:</p>

<div id="map2"></div>

<p>This is the third map:</p>

<div id="map3"></div>

<script src="map1.js"></script>
<script src="map2.js"></script>
<script src="map3.js"></script>
```

where the Javascript files map1, map2, and map3.js are modifying the div blocks 
map1, map2, and map3, respectively, by adding Leaflet maps to them.

Why would I split up my code, and scatter information into multiple files?
This approach is an indication of my underlying approach to Javascript:
I want to deal as little as possible with Javascript data structures,
functions, method chaining, and all of its other nonsense.

Therefore, I use Python to manipulate the data into precisely the right format, 
then spoon-feed the data to Javascript libraries in whatever particular format 
the library requires. (This avoids the need to do any data manipulation in JS.)

## North Carolina Counties Map Script 

Here's a walkthrough of the script for the first map, which displays
North Carolina county boundaries:

```javascript

// Outer Banks, NC
var map = L.map('map').setView([35.6, -76.4], 8);

//var basemapViewer = L.tileLayer('http://basemap.nationalmap.gov/ArcGIS/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
var basemapViewer = L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2hhcmxlc3JlaWQxIiwiYSI6ImpreUJGM3MifQ.w5rSM7MjHv-SnOnt3gcqHA',{ 
    maxZoom: 14,
    attribution: "Mapbox"
}).addTo(map);

var baseLayers = {
    "Mapbox" : basemapViewer
};

var controlLayers = L.control.layers(baseLayers);

basemapViewer.addTo(map);

function enhanceLayer(f,l){
    var out = [];
    if (f.properties){
        //if(f.properties['name']==='Beaufort County, NC') {
        //    console.log(f);
        //}
        l.bindPopup("County: "+f.properties['name']+"<br />GeoID: "+f.properties['geoid']);
        l.setStyle({  
            fillColor: '#CCF',
            fillOpacity: 0.20,
            stroke: true,
            color: '#222',
            weight: 1
        });
    }
}

rooturl = "http://api.censusreporter.org/1.0/geo/show/tiger2013?geo_ids=050|04000US37";

$.ajax({
    type: "GET",
    url: rooturl,
    success: function (data) {
    	var geojson = new L.geoJson(data, {
    		onEachFeature: enhanceLayer
        }).addTo(map);
    }
});

```



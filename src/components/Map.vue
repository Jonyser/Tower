<!-- <template>
  <div style="height: 90vh; width: 70%, margin:auto; overflow: hidden">
    <l-map style="height: 100% " :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker v-for="location in this.locations" :lat-lng="location.markerLatLng"></l-marker>
    </l-map>
    <hr>
    
  </div>
</template>

<script>




import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 7,
      center: [31.4117257, 35.0818155],
      markerLatLng: [51.504, -0.159],
      locations: [{ markerLatLng: [32.16406670563115, 34.85262979999999] }, { markerLatLng: [32.10588812178284, 35.17468052785646] }, { markerLatLng: [32.09470124147064, 34.82026944676217] }]
    }
  },
  methods: {
    GoHome() {
      this.$router.push('/')
    }
  }
}

</script> -->
 <!-- Add "scoped" attribute to limit CSS to this component only  -->
<!-- <style>
.homebutton {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  z-index: 400;
}

.maptitle {

  position: absolute;
  top: 8px;
  left: 55px;
  font-size: 18px;
  z-index: 400;
}
</style>  -->


<template>
  <div>
    <div id="mapContainer" ref="mapContainer" style="width: 99%; height: 77vh; margin: 10px"></div>
  </div>
</template>
<script>
import LMovingMarker from 'vue2-leaflet-movingmarker'
import L from "leaflet";
import plane from '../assets/plane.png'
import shadow from '../assets/leaf-shadow.png'


let last_marker = null
var greenIcon = L.icon({
  iconUrl: plane,
  shadowUrl: shadow,
  
  iconSize: [50, 55], // size of the icon
  shadowSize: [50, 55], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [30, 62],  // the same for the shadow
  // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let planes = {}
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  mounted:
  function () {
    this.map.value = L.map('mapContainer').setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map.value);
    this.map.value.setView([31.4117257 ,35.0818155], 7);
    // this.Pin_plane()

    },
  data: () => ({
    lng: 0,
    lat: 0,
    map: {}
  }),
  methods: {
    Pin_plane(lat, lon, id) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

          if (lat != undefined && lon != undefined && name != undefined) {
            this.lat = lat
            this.lng = lon
          }

          

          // if(move == true){
          //   this.lat = this.lat - 0.0045
          //   this.lng = this.lng - 0.0045
          //   this.map.value.removeLayer(last_marker)
          // }
          
          last_marker = L.marker([this.lat,this.lng], { icon: greenIcon }).addTo(this.map.value);
          // if(move == true){this.Pin_plane(undefined,undefined,undefined,true)}

          // L.marker([this.lat, this.lng])
          //   .addTo(this.map.value);
            // .on("dragend", (event) => {
            //   console.log(event)
            // });


        });
      }
    },
    // Icons
  },
  components: {
    LMovingMarker
  },
};
</script>

<style scoped></style>
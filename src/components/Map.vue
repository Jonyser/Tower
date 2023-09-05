<template>
  <div style="height: 90vh; width: 70%, margin:auto; overflow: hidden">
    <l-map style="height: 100% " :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker v-for="location in this.locations" :lat-lng="location.markerLatLng"></l-marker>
    </l-map>
    <hr>
    
  </div>
</template>

<script>


var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

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

</script>
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
</style> 










<!-- <script>
import { onMounted, ref } from "vue";
import L from "leaflet";

let lat = 0;
let lng = 0;
const map = ref();
const mapContainer = ref();



export default {
  mounted: 
    ()=>{
      console.log(mapContainer)
  map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
  // console.log(this.mapContainer.value)
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  },
  data: () => ({
    lng: 0,
    lat: 0
  }),
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          // map.value.setView([lat.value, lng.value], 13);

          //   L.marker([lat.value, lng.value],{draggable : true})
          //   .addTo(map.value)
          //   .on("dragend",(event)=> {
          //      console.log(event)
          //   });


        });
      }
    }
  },

};
</script>

<template>
  <div>

    <v-btn @click="getLocation()"  prepend-icon="$vuetify" variant="tonal"
      style="margin: 10px;">
      Get Location
    </v-btn>
    {{ this.lat }} , {{ this.lng }}
    
    <div ref="mapContainer" style="width: 400px; height: 400px"></div>
  </div>
</template>

<style scoped></style> -->
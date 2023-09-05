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
    <v-btn
      @click="getLocation()"
      prepend-icon="$vuetify"
      variant="tonal"
      style="margin: 10px;"
    >
      Get Location
    </v-btn>
    {{ this.lat }} , {{ this.lng }}
    <v-btn
      @click="getLocation(48.866667, 2.333333, 'Paris')"
      prepend-icon="$vuetify"
      variant="tonal"
      style="margin: 10px;"
    >
      Paris
    </v-btn>

    <v-btn
      @click="getLocation(40.416775, -3.70379, 'Madrid')"
      prepend-icon="$vuetify"
      variant="tonal"
      style="margin: 10px;"
    >
      Madrid
    </v-btn>

    <div
      id="mapContainer"
      ref="mapContainer"
      style="width: 99%; height: 77vh; margin: 10px"
    ></div>
  </div>
</template>
<script>
import L from "leaflet";
import socket from "../../config/socketService";

export default {
  mounted() {
    this.map.value = L.map("mapContainer").setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map.value);

    console.log("checkkk");
    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("message", data => {
      console.log("Received message:", data);
      // Handle incoming messages as needed
    });
  },
  data: () => ({
    lng: 0,
    lat: 0,
    map: {}
  }),
  methods: {
    getLocation(lat, lon, name) {
      if (navigator.geolocation) {
        console.log(lat, lon, name);
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          if (lat != undefined && lon != undefined && name != undefined) {
            this.lat = lat;
            this.lng = lon;
          }

          this.map.value.setView([this.lat, this.lng], 13);

          L.marker([this.lat, this.lng], { draggable: true })
            .addTo(this.map.value)
            .on("dragend", event => {
              console.log(event);
            });
        });
      }
    }
  },
  beforeDestroy() {
    // Disconnect the WebSocket and clean up resources when the component is about to be destroyed
    console.log("dicsonnnnnn");
    socket.disconnect();
  }
};
</script>

<style scoped></style>

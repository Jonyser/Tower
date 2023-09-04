<template>
  <div style="height: 92vh; width: 70%, margin:auto;">
    <l-map style="height: 100% " :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <!-- <l-marker :lat-lng="markerLatLng"></l-marker> -->
    </l-map>
    <hr>
    <div class="maptitle">
      <h1>Map Page</h1>
    </div>
    <v-btn elevation="2" outlined @click="GoHome" class="homebutton" > Go Home</v-btn>
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
      markerLatLng: [51.504, -0.159]
    }
  },
  methods: {
    GoHome() {
      this.$router.push('/')
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

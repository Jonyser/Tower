<template>
  <div style="height: 500px; width: 70%, margin:auto;" >
    <h1>Map Page</h1>
    <l-map style="height: 100% " :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <!-- <l-marker :lat-lng="markerLatLng"></l-marker> -->
    </l-map>
    <hr>
    <button @click="GoHome">Go Home</button>
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
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159]
    }
  },
  methods:{
    GoHome(){
      this.$router.push('/')
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

<template>
  <div>
    <div id="mapContainer" ref="mapContainer" style="width: 99%; height: 77vh; margin: 10px"></div>
  </div>
</template>
<script>
import LMovingMarker from "vue2-leaflet-movingmarker";
import L, { marker } from "leaflet";
import plane from "../assets/plane.png";
import shadow from "../assets/leaf-shadow.png";
import socket from "../../config/socketService";

let last_marker = {};
var planeIcon = L.icon({
  iconUrl: plane,
  iconSize: [50, 55]
});

let planes = {};
let marker_to_del = null;
let last_marker_id = 0;
let markers = {};

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  mounted: function () {
    this.map.value = L.map("mapContainer").setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map.value);
    this.map.value.setView([31.4117257, 35.0818155], 7);

    socket.connect();
    console.log("checkkk");
    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });
    socket.on("message", data => {
      console.log("Received message:", data);
      this.Pin_plane(data.lat, data.long, data.id);
    });
  },
  data: () => ({
    lng: 0,
    lat: 0,
    map: {}
  }),
  methods: {
    Pin_plane(lat, lon, id) {

      planes = { ...planes, [id]: [lat, lon] };
      console.log(markers[id] != undefined, markers[id])
      
      if (markers[id] != undefined ) {
        this.map.value.removeLayer(markers[id][0]);
      }
      
      last_marker = L.marker(planes[id], {
        icon: planeIcon
      }).addTo(this.map.value);
      markers = { ...markers, [id]: [last_marker] };
      
    }
  },
  components: {
    LMovingMarker
  }
};
</script>

<style scoped></style>

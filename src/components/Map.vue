<template>
  <div>
    <div
      id="mapContainer"
      ref="mapContainer"
      style="width: 99%; height: 77vh; margin: 10px"
    ></div>
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
  shadowUrl: shadow,

  iconSize: [50, 55], // size of the icon
  shadowSize: [50, 55], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [30, 62] // the same for the shadow
  // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let planes = {};
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  mounted: function() {
    this.map.value = L.map("mapContainer").setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map.value);
    this.map.value.setView([31.4117257, 35.0818155], 7);
    // this.Pin_plane()

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
      // if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(position => {
      //   this.lat = position.coords.latitude;
      //   this.lng = position.coords.longitude;

      //   if (lat != undefined && lon != undefined && name != undefined) {
      //     this.lat = lat;
      //     this.lng = lon;
      //   }
      // let plane = {id:[lat,lon]}

      planes = { ...planes, [id]: [lat, lon] };
      if (planes[id].last_marker) {
        this.map.value.removeLayer(planes[id].last_marker);
      }
      last_marker = L.marker(planes[id], {
        icon: planeIcon
      }).addTo(this.map.value);
      planes = { ...planes, [id]: [[lat, lon, last_marker]] };

      console.log(planes);
      // L.marker([this.lat, this.lng])
      //   .addTo(this.map.value);
      // .on("dragend", (event) => {
      //   console.log(event)
      // });
    }
    // }
  },
  // Icons
  components: {
    LMovingMarker
  }
};
</script>

<style scoped></style>

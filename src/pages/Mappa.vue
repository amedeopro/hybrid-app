<template>
  <div style="height: 100vh; width: 100vw">
    <!--     <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>-->
    <l-map
      ref="myMap"
      style="height: 100vh; width: 100vw"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
      @ready="onMapReady"
      @locationfound="locationFound"
      @locationerror="locationError"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng">
        <l-popup>Centro città</l-popup>
      </l-marker>
      <l-marker :lat-lng="[41.691157, 13.258068]">
        <l-popup>Testamento di Aulo Quintilio</l-popup>
        <l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          icon-url="assets/quasar-logo-full.svg"
        ></l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";

export default {
  name: "MyAwesomeMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 15,
      center: [41.695691, 13.257156],
      markerLatLng: [41.695691, 13.257156],
      bounds: null,
      staticAnchor: [16, 37],
      customText: "Foobar",
      iconSize: 64,
      userPosition: null,
      mapReady: false
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    onMapReady(mapObject) {
      mapObject.locate();
    },
    locateUser() {
      this.$refs.map.mapObject.locate({ timeout: 20000 });
    },
    locationFound(location) {
      this.center = location.latlng;
    },
    locationError(error) {
      /**
       * Location error event.
       *
       * @event 'location:errors'
       * @type {object}
       */
      this.$emit("location:error", error);
    },
    updateCenter(latlng) {
      this.$emit("update:center", { ...latlng });
    },
    centerOn(latlng) {
      this.$refs.map.mapObject.flyTo(latlng, this.flyToStoreZoom);
    }
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.myMap.mapObject;
    });
  }
};
</script>


<style scoped>
</style>

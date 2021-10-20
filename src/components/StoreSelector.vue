<template>
  <base-background>
    <ul class="select-menu">
      <li v-for="store in stores" v-bind:key="store.url">
        <router-link :to="`${store.url}`">
          <h1>
            {{ store.name }}
          </h1>
        </router-link>
      </li>
    </ul>
  </base-background>
</template>

<script>
import BaseBackground from "./BaseBackground.vue";

export default {
  name: "Store Selector",
  components: {
    BaseBackground,
  },
  props: ["stores"],
};
</script>

<style scoped>
a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: white;
}
</style>

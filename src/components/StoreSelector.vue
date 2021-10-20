<template>
  <base-background>
    <div class="column-container">
      <ul class="select-menu">
        <li v-for="store in stores" v-bind:key="store.url">
          <router-link :to="`${store.url}`">
            <h1>
              {{ store.name }}
            </h1>
          </router-link>
        </li>
      </ul>
    </div>
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
.column-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

ul {
  width: 500px;
  list-style: none;
}

a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: white;
}
</style>

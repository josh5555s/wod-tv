<template>
  <base-background @update-backgroundIndex="updateIndexes">
    <div v-if="storeSpecialsLoaded">
      <h1>{{ title.toUpperCase() }}</h1>
      <h2>{{ description }}</h2>
    </div>
  </base-background>
</template>

<script>
import BaseBackground from "./BaseBackground.vue";

export default {
  name: "Store Specials",
  components: {
    BaseBackground,
  },
  props: ["sortedSpecials", "stores"],
  emits: ["get-specials"],
  data() {
    return {
      specialIndex: 0,
      backgroundIndex: 0,
      updateIndexTurn: false,
    };
  },
  computed: {
    storeName() {
      let storeName;
      this.stores.forEach((store) => {
        if (this.$route.path.substring(1) === store.url) {
          storeName = store.name;
        }
      });
      return storeName;
    },
    storeSpecials() {
      return this.sortedSpecials.filter((special) => {
        return special.locations.includes(this.storeName);
      });
    },
    currentStoreSpecials() {
      return this.storeSpecials.filter((special) => {
        return (
          new Date(special.start).getTime() < new Date(this.now).getTime() &&
          new Date(this.now).getTime() < new Date(special.end).getTime()
        );
      });
    },
    storeSpecialsLoaded() {
      return this.currentStoreSpecials.length > 0;
    },
    title() {
      return this.currentStoreSpecials[this.specialIndex].title;
    },
    description() {
      return this.currentStoreSpecials[this.specialIndex].description;
    },
    now() {
      let d = new Date();
      return d.toISOString().substring(0, 16);
    },
  },
  methods: {
    updateIndexes() {
      this.updateIndexTurn = !this.updateIndexTurn;
      if (this.updateIndexTurn) {
        if (this.specialIndex < this.currentStoreSpecials.length - 1) {
          if (this.specialIndex === this.currentStoreSpecials.length - 2) {
            this.$emit("get-specials");
          }
          setTimeout(() => {
            this.specialIndex++;
          }, 200);
        } else {
          setTimeout(() => {
            this.specialIndex = 0;
          }, 200);
        }
      }
    },
  },
};
</script>

<style scoped>
</style>

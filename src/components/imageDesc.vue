<template>
  <div class="px-5 py-4" :class="flex">
    <div class="d-flex justify-center">
      <!-- Image Logo -->
      <div>
        <v-img
          :src="getCurrentImg.logo"
          :height="size"
          :width="size"
          cover
          rounded="xl"
        ></v-img>
      </div>
    </div>
    <!-- Author Details -->
    <div class="mx-4 py-2">
      <h3>{{ getCurrentImg.userName }}</h3>
      <h5 class="text-textcol">{{ getCurrentImg.title }}</h5>
    </div>
    <v-spacer></v-spacer>
    <!-- Generate New Image button -->
    <div class="py-2">
      <v-btn
        size="small"
        rounded="xl"
        class="font-weight-bold"
        :class="{ 'text-secondary ': direction == 'column' }"
        :color="color"
        @click="$emit('refresh')"
        ripple
        >Refresh</v-btn
      >
      <h6 class="text-textcol mt-1">In-App Purchase</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageDesc",
  props: {
    getCurrentImg: {
      type: Object,
      required: true,
    },
    direction: {
      type: String,
      default: "column",
    },
  },
  data() {
    return {};
  },
  computed: {
    flex() {
      return this.direction == "column"
        ? "d-flex align-center"
        : "text-center bg-lightgrey lighten-2";
    },
    size() {
      return this.direction == "column" ? "64px" : "84px";
    },
    color() {
      return this.direction == "column" ? "lightgrey" : "secondary";
    },
  },
};
</script>

<style></style>

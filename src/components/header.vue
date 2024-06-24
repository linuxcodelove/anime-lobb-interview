<template>
  <v-row class="mt-6">
    <v-col class="py-0">
      <span class="font-weight-bold text-textcol">{{ date }}</span>
    </v-col>
    <v-col cols="12" class="d-flex justify-space-between align-center py-0">
      <span class="text-h4 font-weight-bold"> Today </span>
      <div class="rounded-circle bg-accent pa-2">
        <span class="text-h5 font-weight-bold">VS</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HeaderVue",
  props: {
    date: {
      type: String,
      require: true,
    },
  },
};
</script>

<style></style>

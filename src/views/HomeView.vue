<template>
  <div>
    <!-- Main container -->
    <v-container fluid class="pa-4">
      <!-- Header with date -->
      <header-view :date="getFormattedDate"></header-view>
      <v-row>
        <v-col cols="12">
          <!-- Card containing the image -->
          <v-card rounded="xl" elevation="12">
            <v-img
              :src="getCurrentImg.thumbNailImage"
              :alt="getCurrentImg.title"
              height="400px"
              class="mx-auto"
              cover
              @click="openContentDialog = true"
            ></v-img>
            <!-- Image Author details with refresh event -->
            <image-desc
              :get-current-img="getCurrentImg"
              @refresh="refreshImg"
            ></image-desc>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Dialog that opens on image click -->
    <v-dialog v-model="openContentDialog" fullscreen scrollable>
      <v-container
        fluid
        class="pa-0 bg-white"
        style="position: relative; overflow: auto"
      >
        <!-- Main image -->
        <v-img
          :src="getCurrentImg.mainImage"
          :alt="getCurrentImg.title"
          cover
          height="600"
          color="surface-variant"
          class="mx-auto"
        >
        </v-img>
        <!-- Image Author details with refresh event -->
        <image-desc
          :get-current-img="getCurrentImg"
          @refresh="refreshImg"
        ></image-desc>
        <v-divider></v-divider>
        <!-- Formatted text content displayed as paragraphs -->
        <div class="ma-4">
          <template v-for="(text, ind) in formattedText" :key="ind">
            <p
              v-html="capitalizeText(text)"
              class="text-textcol text-h6"
              style="line-height: 1.3"
            ></p>
            <v-img
              v-if="ind == 3"
              :src="getCurrentImg.mainImage"
              :alt="getCurrentImg.title"
              cover
              height="600"
              rounded="lg"
              color="surface-variant"
              class="mx-auto mb-6"
            >
            </v-img>
          </template>
        </div>
        <image-desc
          :get-current-img="getCurrentImg"
          direction="row"
          @refresh="refreshImg"
        ></image-desc>
        <!-- Footer with share button -->
        <v-container
          fluid
          class="d-flex justify-center align-center"
          style="height: 100px"
        >
          <v-btn
            class="text-secondary font-weight-bold text-capitalize"
            prepend-icon="mdi-export-variant"
            color="lightgrey"
            variant="flat"
          >
            Share Story
          </v-btn>
        </v-container>
        <!-- Dialog close button -->
        <div
          class="d-flex justify-end ma-6"
          style="position: fixed; top: 0; right: 4px"
        >
          <v-btn
            density="comfortable"
            color="lightgrey"
            @click="openContentDialog = false"
            icon="mdi-close"
          ></v-btn>
        </div>
        <!-- Image subtitle -->
        <div style="position: absolute; top: 30px; left: 0" class="ma-6">
          <p class="text-grey text--lighten-1 text-h6 ma-0 font-weight-bold">
            MAJOR UPDATE
          </p>
          <p class="text-white text-h4 font-weight-medium text-capitalize">
            {{ getCurrentImg.subTitle }}
          </p>
        </div>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import imageDesc from "@/components/imageDesc.vue";
import headerView from "@/components/header.vue";
export default {
  name: "HomeView",
  components: {
    imageDesc,
    headerView,
  },
  data() {
    return {
      currentTime: new Date(),
      openContentDialog: false,
    };
  },
  computed: {
    ...mapGetters(["getCurrentImg", "getToken"]),
    // Format date to Day-Date-Month
    getFormattedDate() {
      console.log("hiiiiiii");
      const date = new Date();
      const dayOptions = { weekday: "long" };
      const monthOptions = { month: "long" };
      const day = new Intl.DateTimeFormat("en-IN", dayOptions).format(date);
      const month = new Intl.DateTimeFormat("en-IN", monthOptions).format(date);
      const dateStr = new Date(date).getDate();
      const result = `${day.toUpperCase()} ${dateStr} ${month.toUpperCase()}`;
      return result;
    },
    // Format Image description from html text
    formattedText() {
      const span = document.createElement("span");
      span.innerHTML = this.getCurrentImg.text;
      const content = span.textContent || span.innerText;
      const result = [];
      for (const text of content.split("\n")) {
        const t = text.trim();
        if (t) result.push(t);
      }
      return result;
    },
  },
  async created() {
    await this.generateToken();
    await this.getAnimeContent(this.getToken);
  },
  methods: {
    ...mapActions(["getAnimeContent", "generateToken"]),
    async refreshImg() {
      await this.getAnimeContent(this.getToken);
    },
    // Capitalize the first three words of the text
    capitalizeText(text) {
      const result = text.split(" ");
      const list = [];

      for (let i = 0; i < result.length; i++) {
        if (i == 0)
          list.push(
            "<span class='text-h6 text-black font-weight-bold' style='line-height: 1.5'>"
          );
        if (i == 3) list.push("</span>");
        list.push(result[i]);
      }

      const str = list.join(" ");
      return `${str}</br></br>`;
    },
  },
};
</script>
<style></style>

import { createStore } from "vuex";
import axios from "@/plugins/axios";

export default createStore({
  state: {
    currentImg: {},
    generateTokenUrl:
      "https://swsut62sse.execute-api.ap-south-1.amazonaws.com/prod/generateToken",
    getContentUrl:
      "https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent",
    generatedToken: "",
  },
  getters: {
    getCurrentImg(state) {
      return state.currentImg;
    },
    getToken(state) {
      return state.generatedToken;
    },
  },
  mutations: {
    setCurrentImg(state, res) {
      state.currentImg = res;
    },
    setToken(state, token) {
      state.generatedToken = token;
    },
  },
  actions: {
    // api to generate Token
    async generateToken({ commit, state }) {
      const response = await axios.post(state.generateTokenUrl, {
        email: "linuxcodelove@gmail.com",
      });
      commit("setToken", response.data.token);
    },
    // api to get new anime content
    async getAnimeContent({ commit, state }, token) {
      const res = await axios.get(state.getContentUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      commit("setCurrentImg", res.data.content);
    },
  },
  modules: {},
});

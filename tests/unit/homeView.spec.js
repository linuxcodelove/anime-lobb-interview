import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import HomeView from "@/views/HomeView.vue";
import headerView from "@/components/header.vue";
import imageDesc from "@/components/imageDesc.vue";

// Mock the getAnimeContent action
const mockGetAnimeContent = jest.fn();

const createVuexStore = () => {
  return createStore({
    getters: {
      getCurrentImg: () => ({
        thumbNailImage: "thumbnail.jpg",
        mainImage: "main.jpg",
        title: "Test Image",
        text: "This is a test image.\nSecond line of description.",
        userName: "Test User",
        logo: "logo.jpg",
        subTitle: "Test Subtitle",
      }),
      getToken: () => "test-token",
    },
    actions: {
      getAnimeContent: mockGetAnimeContent,
      generateToken: jest.fn(),
    },
  });
};

describe("HomeView.vue", () => {
  let store;
  beforeEach(() => {
    store = createVuexStore();
  });
  it("sanity test", () => {
    const wrapper = mount(HomeView, { global: { plugins: [store] } });
    expect(wrapper.text()).toContain("UPDATE");
  });

  it("renders the header  with correct date", () => {
    const wrapper = mount(HomeView, { global: { plugins: [store] } });
    const header = wrapper.findComponent(headerView);
    expect(header.exists()).toBe(true);
    expect(header.props().date).toBe(wrapper.vm.getFormattedDate);
  });

  it("displays the thumbnail image", () => {
    const wrapper = mount(HomeView, { global: { plugins: [store] } });
    const img = wrapper.find("v-img");
    expect(img.attributes().src).toBe(
      store.getters.getCurrentImg.thumbNailImage
    );
    expect(img.attributes().alt).toBe(store.getters.getCurrentImg.title);
  });

  it("opens dialog on image click", async () => {
    const wrapper = mount(HomeView, { global: { plugins: [store] } });
    const img = wrapper.find("v-img");
    await img.trigger("click");
    expect(wrapper.vm.openContentDialog).toBe(true);
  });

  //  not working
  it("calls refreshImg method on refresh event", async () => {
    const wrapper = mount(HomeView, { global: { plugins: [store] } });
    const imageDescComponent = wrapper.findComponent(imageDesc);
    await imageDescComponent.vm.$emit("refresh");
    expect(mockGetAnimeContent).toHaveBeenCalled();
  });

  it("capitalizes the first three words of the text", () => {
    const wrapper = mount(HomeView, { global: { plugins: [store] } });
    const result = wrapper.vm.capitalizeText(
      "this is a test text for capitalization."
    );
    expect(result).toBe(
      "<span class='text-h6 text-black font-weight-bold' style='line-height: 1.5'> this is a </span> test text for capitalization.</br></br>"
    );
  });
});

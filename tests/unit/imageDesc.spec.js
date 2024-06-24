import { mount } from "@vue/test-utils";
import imageDesc from "@/components/imageDesc.vue";

describe("imageDesc.vue", () => {
  const getCurrentImg = {
    logo: "logo.jpg",
    userName: "Test User",
    title: "Test Title",
  };
  const wrapper = mount(imageDesc, {
    props: { getCurrentImg },
  });
  it("renders the author image and details correctly", () => {
    const img = wrapper.find("v-img");
    expect(img.attributes().src).toBe(getCurrentImg.logo);
    expect(wrapper.find("h3").text()).toBe(getCurrentImg.userName);
    expect(wrapper.find("h5").text()).toBe(getCurrentImg.title);
  });

  it("emits refresh event on button click", async () => {
    const button = wrapper.find("v-btn");
    await button.trigger("click");
    expect(wrapper.emitted().refresh).toBeTruthy();
  });
});

import { mount } from "@vue/test-utils";
import headerView from "@/components/header.vue";

describe("headerView.vue", () => {
  it("renders the props date correctly", () => {
    const date = "WEDNESDAY 23 JUNE";
    const wrapper = mount(headerView, {
      props: { date },
    });
    expect(wrapper.find("span").text()).toBe(date);
  });
});

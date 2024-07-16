import { expand } from "../src/index";

describe("expand", () => {
  describe("when no template is found", () => {
    it("should return the same string", () => {
      expect(expand("Hello, World!", {})).toBe("Hello, World!");
    });
  });

  describe("when template is found", () => {
    it("should replace the template with the value from the object", () => {
      expect(expand("Hello, $name!", { name: "World" })).toBe("Hello, World!");
    });
  });
});

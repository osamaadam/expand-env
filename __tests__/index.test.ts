import { expand } from "../src/index";

describe("expand", () => {
  describe("when no template is found", () => {
    it("should return the same string", () => {
      expect(expand("Hello, World!", {})).toBe("Hello, World!");
    });

    it('should not replace "$"', () => {
      expect(expand("Hello, $!", {})).toBe("Hello, $!");
    });

    it('should not replace "$$"', () => {
      expect(expand("Hello, $$!", {})).toBe("Hello, $$!");
    });

    it('should not replace "${"', () => {
      expect(expand("Hello, ${!", {})).toBe("Hello, ${!");
    });

    it('should not replace "${}"', () => {
      expect(expand("Hello, ${}!", {})).toBe("Hello, ${}!");
    });
  });

  describe("when template is found", () => {
    describe("when template is $variable", () => {
      it("should replace the template with the value from the object", () => {
        expect(expand("Hello, $name!", { name: "World" })).toBe(
          "Hello, World!"
        );
      });

      it("should replace multiple templates", () => {
        expect(
          expand("Hello, $name! My name is $myName.", {
            name: "World",
            myName: "Osama",
          })
        ).toBe("Hello, World! My name is Osama.");
      });
    });

    describe("when template is ${variable}", () => {
      it("should replace the template with the value from the object", () => {
        expect(expand("Hello, ${name}!", { name: "World" })).toBe(
          "Hello, World!"
        );
      });

      it("should replace multiple templates", () => {
        expect(
          expand("Hello, ${name}! My name is ${myName}.", {
            name: "World",
            myName: "Osama",
          })
        ).toBe("Hello, World! My name is Osama.");
      });
    });

    describe("when template is mixed", () => {
      it("should replace the template with the value from the object", () => {
        expect(
          expand("Hello, $name! My name is ${myName}.", {
            name: "World",
            myName: "Osama",
          })
        ).toBe("Hello, World! My name is Osama.");
      });
    });
  });
});

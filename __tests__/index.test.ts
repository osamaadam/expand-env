import { expand, expandEnv } from "../src/index";

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

    describe("when variable is not in mapping", () => {
      it("should replace the template with an empty string", () => {
        expect(expand("Hello, $name!", {})).toBe("Hello, !");
      });
    });

    describe("when variable in mapping is also a template", () => {
      it("should replace the found template with the template from the mapping without expansion", () => {
        expect(expand("Hello, $name!", { name: "$other_name" })).toBe(
          "Hello, $other_name!"
        );
      });
    });
  });
});

describe("expandEnv", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("should replace the template with the value from the process.env", () => {
    process.env.name = "World";
    expect(expandEnv("Hello, $name!")).toBe("Hello, World!");
  });
});

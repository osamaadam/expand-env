import { explode, explodeEnv } from "../src/index";

describe("explode", () => {
  describe("when no template is found", () => {
    it("should return the same string", () => {
      expect(explode("Hello, World!", {})).toBe("Hello, World!");
    });

    it('should not replace "$"', () => {
      expect(explode("Hello, $!", {})).toBe("Hello, $!");
    });

    it('should not replace "$$"', () => {
      expect(explode("Hello, $$!", {})).toBe("Hello, $$!");
    });

    it('should not replace "${"', () => {
      expect(explode("Hello, ${!", {})).toBe("Hello, ${!");
    });

    it('should not replace "${}"', () => {
      expect(explode("Hello, ${}!", {})).toBe("Hello, ${}!");
    });
  });

  describe("when template is found", () => {
    describe("when template is $variable", () => {
      it("should replace the template with the value from the object", () => {
        expect(explode("Hello, $name!", { name: "World" })).toBe(
          "Hello, World!"
        );
      });

      it("should replace multiple templates", () => {
        expect(
          explode("Hello, $name! My name is $myName.", {
            name: "World",
            myName: "Osama",
          })
        ).toBe("Hello, World! My name is Osama.");
      });
    });

    describe("when template is ${variable}", () => {
      it("should replace the template with the value from the object", () => {
        expect(explode("Hello, ${name}!", { name: "World" })).toBe(
          "Hello, World!"
        );
      });

      it("should replace multiple templates", () => {
        expect(
          explode("Hello, ${name}! My name is ${myName}.", {
            name: "World",
            myName: "Osama",
          })
        ).toBe("Hello, World! My name is Osama.");
      });
    });

    describe("when template is mixed", () => {
      it("should replace the template with the value from the object", () => {
        expect(
          explode("Hello, $name! My name is ${myName}.", {
            name: "World",
            myName: "Osama",
          })
        ).toBe("Hello, World! My name is Osama.");
      });
    });

    describe("when variable is not in mapping", () => {
      it("should replace the template with an empty string", () => {
        expect(explode("Hello, $name!", {})).toBe("Hello, !");
      });
    });

    describe("when variable in mapping is also a template", () => {
      it("should replace the found template with the template from the mapping without expansion", () => {
        expect(explode("Hello, $name!", { name: "$other_name" })).toBe(
          "Hello, $other_name!"
        );
      });
    });

    describe("when it has default value", () => {
      describe.each([
        { input: "Hello, ${name:=World}!" },
        { input: "Hello, ${name:-World}!" },
      ])("When in the form of $input", ({ input }) => {
        describe("when key is in mapping", () => {
          it("should replace the template with the value from the object", () => {
            expect(explode(input, { name: "Osama" })).toBe("Hello, Osama!");
          });
        });

        describe("when key is not in mapping", () => {
          it("should replace the template with the value from the object", () => {
            expect(explode(input, {})).toBe("Hello, World!");
          });
        });
      });

      describe("when in form of ${key:=default}", () => {
        it("should replace following instances with the same value", () => {
          expect(
            explode("Hello, ${name:=World}! My name is ${name}.", {})
          ).toBe("Hello, World! My name is World.");
        });
      });

      describe("var === ${key:-default}", () => {
        describe("when key is in mapping", () => {
          it("should replace the template with the value from the object", () => {
            expect(explode("Hello, ${name:-World}!", { name: "Osama" })).toBe(
              "Hello, Osama!"
            );
          });
        });

        describe("when key is not in mapping", () => {
          it("should replace the template with the value from the object", () => {
            expect(explode("Hello, ${name:-World}!", {})).toBe("Hello, World!");
          });

          it("should NOT replace other instances with the same value", () => {
            expect(
              explode("Hello, ${name:-World}! My name is ${name}.", {})
            ).toBe("Hello, World! My name is .");
          });
        });
      });
    });

    describe("options", () => {
      describe("ignoreUnsetVars", () => {
        describe("when true", () => {
          it("should not replace the template with an empty string", () => {
            expect(
              explode("Hello, $name!", {}, { ignoreUnsetVars: true })
            ).toBe("Hello, $name!");
          });
          describe("when false", () => {
            it("should replace the template with an empty string", () => {
              expect(explode("Hello, $name!", {})).toBe("Hello, !");
            });
          });
        });
        describe("when not set", () => {
          it("should replace the template with an empty string", () => {
            expect(explode("Hello, $name!", {})).toBe("Hello, !");
          });
        });
        describe("when key has default value", () => {
          it("should replace the value from the default", () => {
            expect(explode("Hello, ${name:=World}!", {})).toBe("Hello, World!");
          });
        });
      });

      describe("ignoreDefaultExpansion", () => {
        describe("when true", () => {
          it("should not replace the template with the default value", () => {
            expect(
              explode(
                "Hello, ${name:=World}!",
                {},
                { ignoreDefaultExpansion: true }
              )
            ).toBe("Hello, !");
          });
        });

        describe("when false", () => {
          it("should replace the template with the default value", () => {
            expect(
              explode(
                "Hello, ${name:=World}!",
                {},
                { ignoreDefaultExpansion: false }
              )
            ).toBe("Hello, World!");
          });
        });

        describe("when not set", () => {
          it("should replace the template with the default value", () => {
            expect(explode("Hello, ${name:=World}!", {})).toBe("Hello, World!");
          });
        });
      });
    });
  });
});

describe("explodeEnv", () => {
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
    expect(explodeEnv("Hello, $name!")).toBe("Hello, World!");
  });
});

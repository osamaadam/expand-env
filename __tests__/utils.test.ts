import { getTemplateVariable } from "../src/util/get_template_variable";
import { isTemplateVariable } from "../src/util/is_template_variable";

describe("utils", () => {
  describe("getTemplateVariable", () => {
    describe("when template is $variable", () => {
      it('should return variable as "variable" and defaultValue as ""', () => {
        expect(getTemplateVariable("$variable")).toEqual({
          variable: "variable",
          defaultValue: "",
        });
      });

      describe("when template is $variable:-default", () => {
        it('should return variable as "variable" and defaultValue as "default"', () => {
          expect(getTemplateVariable("$variable:-default")).toEqual({
            variable: "variable",
            defaultValue: "default",
          });
        });
      });

      describe("when template is $variable:=default", () => {
        it('should return variable as "variable" and defaultValue as "default"', () => {
          expect(getTemplateVariable("$variable:=default")).toEqual({
            variable: "variable",
            defaultValue: "default",
          });
        });
      });
    });

    describe("when template is ${variable}", () => {
      it('should return variable as "variable" and defaultValue as ""', () => {
        expect(getTemplateVariable("${variable}")).toEqual({
          variable: "variable",
          defaultValue: "",
        });
      });
      describe("when template is ${variable:-default}", () => {
        it('should return variable as "variable" and defaultValue as "default"', () => {
          expect(getTemplateVariable("${variable:-default}")).toEqual({
            variable: "variable",
            defaultValue: "default",
          });
        });
      });

      describe("when template is ${variable:=default}", () => {
        it('should return variable as "variable" and defaultValue as "default"', () => {
          expect(getTemplateVariable("${variable:=default}")).toEqual({
            variable: "variable",
            defaultValue: "default",
          });
        });
      });

      describe("when template is ${variable:-}", () => {
        it('should return variable as "variable" and defaultValue as ""', () => {
          expect(getTemplateVariable("${variable:-}")).toEqual({
            variable: "variable",
            defaultValue: "",
          });
        });
      });
    });
  });

  describe("isTemplateVariable", () => {
    describe("when value is $variable", () => {
      it("should return true", () => {
        expect(isTemplateVariable("$variable")).toBe(true);
      });
    });

    describe("when value is ${variable}", () => {
      it("should return true", () => {
        expect(isTemplateVariable("${variable}")).toBe(true);
      });
    });

    describe("when value is ${variable:-}", () => {
      it("should return true", () => {
        expect(isTemplateVariable("${variable:-}")).toBe(true);
      });
    });

    describe("when value is ${variable:-default}", () => {
      it("should return true", () => {
        expect(isTemplateVariable("${variable:-default}")).toBe(true);
      });
    });

    describe("when value is ${variable:=default}", () => {
      it("should return true", () => {
        expect(isTemplateVariable("${variable:=default}")).toBe(true);
      });
    });

    describe("when value is variable", () => {
      it("should return false", () => {
        expect(isTemplateVariable("variable")).toBe(false);
      });
    });

    describe("when value is ${variable", () => {
      it("should return false", () => {
        expect(isTemplateVariable("${variable")).toBe(false);
      });
    });

    describe("when value is $variable}", () => {
      it("should return false", () => {
        expect(isTemplateVariable("$variable}")).toBe(false);
      });
    });

    describe("when value is $variable:-default", () => {
      it("should return true", () => {
        expect(isTemplateVariable("$variable:-default")).toBe(true);
      });
    });

    describe("when value is $variable:=default", () => {
      it("should return true", () => {
        expect(isTemplateVariable("$variable:=default")).toBe(true);
      });
    });
  });
});

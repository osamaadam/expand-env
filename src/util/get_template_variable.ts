export function getTemplateVariable(value: string): {
  variable: string;
  defaultValue: string;
} {
  const stripped = value
    .replace("$", "")
    .replace("{", "")
    .replace("}", "")
    .replace(":-", ";;")
    .replace(":=", ";;");

  const [variable, defaultValue] = stripped.split(";;");

  return {
    variable,
    defaultValue: defaultValue ?? "",
  };
}

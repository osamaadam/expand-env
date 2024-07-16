export function isTemplateVariable(value: string): boolean {
  return (
    (value.startsWith("${") && value.endsWith("}")) ||
    (!value.startsWith("${") && value.startsWith("$") && !value.endsWith("}"))
  );
}

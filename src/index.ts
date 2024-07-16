export function expand(
  str: string,
  mapping: Record<string, string | undefined>
): string {
  let buffer = "";
  let i = 0;
  for (let j = 0; j < str.length; j++) {
    if (str[j] === "$") {
      buffer += str.slice(i, j);
      const { key, length } = getTemplateKey(str.slice(j + 1));
      if (key === "") {
        // $ not followed by a valid template, just add the $ to the buffer
        buffer += str.slice(j, j + length + 1);
      } else {
        buffer += mapping[key] ?? "";
      }
      j += length;
      i = j + 1;
    }
  }

  buffer += str.slice(i);

  return buffer;
}

export function expandEnv(str: string): string {
  return expand(str, process.env);
}

function getTemplateKey(str: string): { key: string; length: number } {
  if (str[0] === "{") {
    const end = str.indexOf("}");
    if (end === 1) {
      // Invalid template ${}
      return { key: "", length: 2 };
    } else if (end === -1) {
      // Invalid template ${key
      const key = str.slice(0);
      return { key: "", length: key.length };
    }
    return { key: str.slice(1, end), length: end + 1 };
  }
  if (isShellSpecialVar(str[0])) {
    return { key: "", length: 0 };
  }
  let i = 0;
  while (i < str.length && isAlphaNumeric(str[i])) {
    i++;
  }

  return {
    key: str.slice(0, i),
    length: i,
  };
}

function isAlphaNumeric(char: string): boolean {
  return (
    char === "_" ||
    (char >= "a" && char <= "z") ||
    (char >= "A" && char <= "Z") ||
    (char >= "0" && char <= "9")
  );
}

function isShellSpecialVar(char: string): boolean {
  return [
    "*",
    "#",
    "$",
    "@",
    "!",
    "?",
    "-",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ].includes(char);
}

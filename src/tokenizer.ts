export interface Token {
  type: "paren" | "angle" | "label" | "string" | "break";
  value: string;
}

const WHITE_SPACE = /\s/;
const BREAK_LINE = /\n/;
const LABEL = /[FMD]/;

export function tokenize(lyric: string) {
  const tokens: Token[] = [];
  let current = 0;
  const length = lyric.length;

  while (current < length) {
    const char = lyric[current];

    if (char === "[" || char === "]") {
      tokens.push({
        type: "paren",
        value: char,
      });
      current++;
      continue;
    }

    if (char === "<" || char === ">") {
      tokens.push({
        type: "angle",
        value: char,
      });
      current++;
      continue;
    }

    if (LABEL.test(char) && lyric[current + 1] === ":") {
      tokens.push({
        type: "label",
        value: `${char}:`,
      });
      current += 2;
      continue;
    }

    if (BREAK_LINE.test(char)) {
      tokens.push({
        type: "break",
        value: char,
      });
      current++;
      continue;
    }

    if (WHITE_SPACE.test(char)) {
      current++;
      continue;
    }

    if (tokens.at(-1)?.type === "string") {
      tokens.at(-1)!.value += char;
    } else {
      tokens.push({
        type: "string",
        value: char,
      });
    }
    current++;
  }

  return tokens;
}

export interface Token {
  type: "Tag" | "Time" | "InlineTime" | "Role" | "Lyric" | "Break";
  value: string;
}

const WHITE_SPACE = /\s/;
const BREAK_LINE = /\n/;
const TAG = /^(?!\d{2}:\d{2}\.\d{0,2}$)\w+:.*$/;
const TIME = /^\d{2}:\d{2}\.\d{0,2}$/;
const LABEL = /[FMD]:/;

export function tokenize(lyric: string) {
  const tokens: Token[] = [];
  let current = 0;
  const length = lyric.length;

  while (current < length) {
    let char = lyric[current];

    // Break
    if (BREAK_LINE.test(char)) {
      tokens.push({
        type: "Break",
        value: char,
      });
      current++;
      continue;
    }

    // Whitespace
    if (WHITE_SPACE.test(char)) {
      current++;
      continue;
    }

    // Tag or Time
    if (char === "[") {
      let value = "";
      char = lyric[++current];
      while (char !== "]") {
        value += char;
        char = lyric[++current];
      }
      if (TIME.test(value)) {
        tokens.push({
          type: "Time",
          value,
        });
        current++;
        continue;
      } else if (TAG.test(value)) {
        tokens.push({
          type: "Tag",
          value,
        });
        current++;
        continue;
      }
      throw new TypeError(`[Lyricat] Unknown type: ${value}`);
    }

    // InlineTime
    if (char === "<") {
      let value = "";
      char = lyric[++current];
      while (char !== ">") {
        value += char;
        char = lyric[++current];
      }
      if (TIME.test(value)) {
        tokens.push({
          type: "InlineTime",
          value,
        });
        current++;
        continue;
      }
      throw new Error(`[Lyricat] Unknown type: ${value}`);
    }

    // Role
    if (tokens.at(-1)?.type === "Time") {
      const value = char + lyric[++current];
      if (LABEL.test(value)) {
        tokens.push({
          type: "Role",
          value: value[0],
        });
        current++;
        continue;
      }
      // Recover
      current--;
    }

    // Lyric
    if (tokens.at(-1)?.type === "Lyric") {
      tokens.at(-1)!.value += char;
    } else {
      tokens.push({
        type: "Lyric",
        value: char,
      });
    }
    current++;
  }

  return tokens;
}

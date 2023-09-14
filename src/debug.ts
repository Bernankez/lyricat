export interface Token {
  type: "paren" | "colon" | "dot" | "number" | "string" | "break";
  value: string;
}

const NUMBER = /[0-9]/;
const WHITE_SPACE = /\s+/;
const BREAK_LINE = /\n/;

export function tokenize(lyric: string) {
  const tokens: Token[] = [];
  let current = 0;
  const length = lyric.length;

  while (current < length) {
    let char = lyric[current];

    if (char === "[" || char === "]") {
      tokens.push({
        type: "paren",
        value: char,
      });
      current++;
      continue;
    }

    if (char === ":") {
      tokens.push({
        type: "colon",
        value: char,
      });
      current++;
      continue;
    }

    if (char === ".") {
      tokens.push({
        type: "dot",
        value: char,
      });
      current++;
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

    if (NUMBER.test(char)) {
      let value = "";
      while (NUMBER.test(char)) {
        value += char;
        char = lyric[++current];
      }
      tokens.push({
        type: "number",
        value,
      });
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

tokenize(`[ti:说爱你]
[ar:蔡依林]
[al:看我七十二变]
[by:]
[offset:500]
[02:51.48][00:20.93]我的世界变得奇妙更难以言喻
[02:51.48]<00:20.93>我 <00:22.43>的
[02:56.19][00:25.61]F: 还以为是从天而降的梦境
[03:00.85][00:30.24]M: 直到确定手的温度来自你心里
[03:05.60][00:34.94]D: 这一刻我终于勇敢说爱你`);

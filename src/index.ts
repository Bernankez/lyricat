import { tokenize } from "./tokenizer";
import { parse } from "./parser";

export function compile(lyric: string) {
  const tokens = tokenize(lyric);
  const parsed = parse(tokens);
  return parsed;
}

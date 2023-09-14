import { tokenize } from "./debug";

export function compile(lyric: string) {
  return tokenize(lyric);
}

import { describe } from "node:test";
import { expect, it } from "vitest";
import { tokenize } from "../src/tokenizer";
import { parse } from "../src/parser";
import { transform } from "../src/transformer";

const lrc = `[ti:说爱你]
[by:]
[offset:500]
[02:51.48]我的世界变得奇妙更难以言喻
[02:51.48]<02:52.50>我 <02:54.10>的
[02:56.19][00:25.61]F: 还以为是从天而降的梦境
[03:00.85][00:30.24]M: 直到确定手的温度来自你心里
[03:05.60][00:34.94]D: <02:52.50>这 <02:54.10>一刻我终于勇敢说爱你`;

describe("transformer", () => {
  it("transform", () => {
    expect(transform(parse(tokenize(lrc)))).toMatchInlineSnapshot();
  });
});

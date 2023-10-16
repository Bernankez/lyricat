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
    expect(transform(parse(tokenize(lrc)))).toMatchInlineSnapshot(`
      {
        "lyrics": [
          {
            "lyric": "我的世界变得奇妙更难以言喻",
            "stamp": "02:51.48",
          },
          {
            "inline": [
              {
                "lyric": "我",
                "stamp": "02:52.50",
              },
              {
                "lyric": "的",
                "stamp": "02:54.10",
              },
            ],
            "stamp": "02:51.48",
          },
          {
            "lyric": "直到确定手的温度来自你心里",
            "role": "M",
            "stamp": "03:00.85",
          },
          {
            "lyric": "直到确定手的温度来自你心里",
            "role": "M",
            "stamp": "00:30.24",
          },
          {
            "inline": [
              {
                "lyric": "这",
                "stamp": "02:52.50",
              },
              {
                "lyric": "一刻我终于勇敢说爱你",
                "stamp": "02:54.10",
              },
            ],
            "role": "D",
            "stamp": "03:05.60",
          },
          {
            "inline": [
              {
                "lyric": "这",
                "stamp": "02:52.50",
              },
              {
                "lyric": "一刻我终于勇敢说爱你",
                "stamp": "02:54.10",
              },
            ],
            "role": "D",
            "stamp": "00:34.94",
          },
        ],
        "tags": [
          {
            "title": "ti",
            "value": "说爱你",
          },
          {
            "title": "by",
            "value": "",
          },
          {
            "title": "offset",
            "value": "500",
          },
        ],
      }
    `);
  });
});

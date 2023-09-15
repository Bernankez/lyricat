import { describe } from "node:test";
import { expect, it } from "vitest";
import { tokenize } from "../src/tokenizer";

const lrc = `[ti:说爱你]
[by:]
[offset:500]
[02:51.48]我的世界变得奇妙更难以言喻
[02:51.48]<02:52.50>我 <02:54.10>的
[02:56.19][00:25.61]F: 还以为是从天而降的梦境
[03:00.85][00:30.24]M: 直到确定手的温度来自你心里
[03:05.60][00:34.94]D: <02:52.50>这 <02:54.10>一刻我终于勇敢说爱你`;

describe("tokenizer", () => {
  it("tokenize", () => {
    expect(tokenize(lrc)).toMatchInlineSnapshot(`
      [
        {
          "type": "Tag",
          "value": "ti:说爱你",
        },
        {
          "type": "Break",
          "value": "
      ",
        },
        {
          "type": "Tag",
          "value": "by:",
        },
        {
          "type": "Break",
          "value": "
      ",
        },
        {
          "type": "Tag",
          "value": "offset:500",
        },
        {
          "type": "Break",
          "value": "
      ",
        },
        {
          "type": "Time",
          "value": "02:51.48",
        },
        {
          "type": "Lyric",
          "value": "我的世界变得奇妙更难以言喻",
        },
        {
          "type": "Break",
          "value": "
      ",
        },
        {
          "type": "Time",
          "value": "02:51.48",
        },
        {
          "type": "InlineTime",
          "value": "02:52.50",
        },
        {
          "type": "Lyric",
          "value": "我",
        },
        {
          "type": "InlineTime",
          "value": "02:54.10",
        },
        {
          "type": "Lyric",
          "value": "的",
        },
        {
          "type": "Break",
          "value": "
      ",
        },
        {
          "type": "Time",
          "value": "02:56.19",
        },
        {
          "type": "Time",
          "value": "00:25.61",
        },
        {
          "type": "Role",
          "value": "F",
        },
        {
          "type": "Lyric",
          "value": "还以为是从天而降的梦境",
        },
        {
          "type": "Break",
          "value": "
      ",
        },
        {
          "type": "Time",
          "value": "03:00.85",
        },
        {
          "type": "Time",
          "value": "00:30.24",
        },
        {
          "type": "Role",
          "value": "M",
        },
        {
          "type": "Lyric",
          "value": "直到确定手的温度来自你心里",
        },
        {
          "type": "Break",
          "value": "
      ",
        },
        {
          "type": "Time",
          "value": "03:05.60",
        },
        {
          "type": "Time",
          "value": "00:34.94",
        },
        {
          "type": "Role",
          "value": "D",
        },
        {
          "type": "InlineTime",
          "value": "02:52.50",
        },
        {
          "type": "Lyric",
          "value": "这",
        },
        {
          "type": "InlineTime",
          "value": "02:54.10",
        },
        {
          "type": "Lyric",
          "value": "一刻我终于勇敢说爱你",
        },
      ]
    `);
  });
});

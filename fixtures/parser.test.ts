import { describe } from "node:test";
import { expect, it } from "vitest";
import { tokenize } from "../src/tokenizer";
import { parse } from "../src/parser";

const lrc = `[ti:说爱你]
[by:]
[offset:500]
[02:51.48]我的世界变得奇妙更难以言喻
[02:51.48]<02:52.50>我 <02:54.10>的
[02:56.19][00:25.61]F: 还以为是从天而降的梦境
[03:00.85][00:30.24]M: 直到确定手的温度来自你心里
[03:05.60][00:34.94]D: <02:52.50>这 <02:54.10>一刻我终于勇敢说爱你`;

const tokens = tokenize(lrc);

describe("parser", () => {
  it("parse", () => {
    expect(parse(tokens)).toMatchInlineSnapshot(`
      {
        "body": [
          {
            "key": "ti",
            "type": "Tag",
            "value": "说爱你",
          },
          {
            "key": "by",
            "type": "Tag",
            "value": "",
          },
          {
            "key": "offset",
            "type": "Tag",
            "value": "500",
          },
          {
            "stamp": [
              "02:51.48",
            ],
            "type": "Time",
            "value": {
              "type": "Lyric",
              "value": "我的世界变得奇妙更难以言喻",
            },
          },
          {
            "stamp": [
              "02:51.48",
            ],
            "type": "Time",
            "value": [
              {
                "stamp": "02:52.50",
                "type": "InlineTime",
                "value": {
                  "type": "Lyric",
                  "value": "我",
                },
              },
              {
                "stamp": "02:54.10",
                "type": "InlineTime",
                "value": {
                  "type": "Lyric",
                  "value": "的",
                },
              },
            ],
          },
          {
            "stamp": [
              "03:00.85",
              "00:30.24",
            ],
            "type": "Time",
            "value": {
              "name": "M",
              "type": "Role",
              "value": {
                "type": "Lyric",
                "value": "直到确定手的温度来自你心里",
              },
            },
          },
          {
            "stamp": [
              "03:05.60",
              "00:34.94",
            ],
            "type": "Time",
            "value": {
              "name": "D",
              "type": "Role",
              "value": [
                {
                  "stamp": "02:52.50",
                  "type": "InlineTime",
                  "value": {
                    "type": "Lyric",
                    "value": "这",
                  },
                },
                {
                  "stamp": "02:54.10",
                  "type": "InlineTime",
                  "value": {
                    "type": "Lyric",
                    "value": "一刻我终于勇敢说爱你",
                  },
                },
              ],
            },
          },
        ],
        "type": "Program",
      }
    `);
  });
});

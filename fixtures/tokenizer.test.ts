import { describe } from "node:test";
import { expect, it } from "vitest";
import { tokenize } from "../src/tokenizer";

const headers = `[ti:说爱你]
[by:]
[offset:500]
[02:51.48]我的世界变得奇妙更难以言喻
[02:51.48]<02:52.50>我 <02:54.10>的
[02:56.19][00:25.61]F: 还以为是从天而降的梦境
[03:00.85][00:30.24]M: 直到确定手的温度来自你心里
[03:05.60][00:34.94]D: 这一刻我终于勇敢说爱你`;

describe("tokenizer", () => {
  it("tokenize", () => {
    expect(tokenize(headers)).toMatchInlineSnapshot(`
      [
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "ti:说爱你",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "break",
          "value": "
      ",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "by:",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "break",
          "value": "
      ",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "offset:500",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "break",
          "value": "
      ",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "02:51.48",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "string",
          "value": "我的世界变得奇妙更难以言喻",
        },
        {
          "type": "break",
          "value": "
      ",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "02:51.48",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "angle",
          "value": "<",
        },
        {
          "type": "string",
          "value": "02:52.50",
        },
        {
          "type": "angle",
          "value": ">",
        },
        {
          "type": "string",
          "value": "我",
        },
        {
          "type": "angle",
          "value": "<",
        },
        {
          "type": "string",
          "value": "02:54.10",
        },
        {
          "type": "angle",
          "value": ">",
        },
        {
          "type": "string",
          "value": "的",
        },
        {
          "type": "break",
          "value": "
      ",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "02:56.19",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "00:25.61",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "label",
          "value": "F:",
        },
        {
          "type": "string",
          "value": "还以为是从天而降的梦境",
        },
        {
          "type": "break",
          "value": "
      ",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "03:00.85",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "00:30.24",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "label",
          "value": "M:",
        },
        {
          "type": "string",
          "value": "直到确定手的温度来自你心里",
        },
        {
          "type": "break",
          "value": "
      ",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "03:05.60",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "paren",
          "value": "[",
        },
        {
          "type": "string",
          "value": "00:34.94",
        },
        {
          "type": "paren",
          "value": "]",
        },
        {
          "type": "label",
          "value": "D:",
        },
        {
          "type": "string",
          "value": "这一刻我终于勇敢说爱你",
        },
      ]
    `);
  });
});

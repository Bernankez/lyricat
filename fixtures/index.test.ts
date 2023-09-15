import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { compile } from "../src";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe.skip("compile", () => {
  it("compile lrc file", () => {
    const file = readFileSync(resolve(__dirname, "./说爱你.lrc"), "utf-8");
    expect(compile(file)).toMatchInlineSnapshot();
  });
});

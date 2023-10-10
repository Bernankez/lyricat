import type { Token } from "./tokenizer";

export interface ParserAST {
  type: "Program";
  body: ParserNode[];
}

export type ParserNode = PTag | PTime | PRole | PInlineTime | PLyric;

export interface PTag {
  type: "Tag";
  key: string;
  value: string;
}

export interface PTime {
  type: "Time";
  stamp: string[];
  value: PInlineTime[] | PLyric | PRole;
}

export interface PRole {
  type: "Role";
  name: string;
  value: PInlineTime[] | PLyric;
}

export interface PInlineTime {
  type: "InlineTime";
  stamp: string;
  value: PLyric;
}

export interface PLyric {
  type: "Lyric";
  value: string;
}

export function parse(tokens: Token[]) {
  const ast: ParserAST = {
    type: "Program",
    body: [],
  };
  let current = 0;

  function walk(): ParserNode {
    const token = tokens[current];

    // Tag
    if (token.type === "Tag") {
      const [key, value] = token.value.split(":");
      current++;
      return {
        type: "Tag",
        key,
        value,
      };
    }

    // InlineTime
    if (token.type === "InlineTime") {
      const nextToken = tokens[++current];
      if (nextToken.type === "Lyric") {
        return {
          type: "InlineTime",
          stamp: token.value,
          value: {
            type: "Lyric",
            value: nextToken.value,
          },
        };
      }
      throw new Error(`[Lyricat] Unrecognized position: ${JSON.stringify(nextToken)}`);
    }

    // Role
    if (token.type === "Role") {
      const node: PRole = {
        type: "Role",
        name: token.value,
        value: [],
      };
      current++;
      let next = walk();
      while (next.type === "InlineTime" || next.type === "Lyric") {
        if (next.type === "Lyric") {
          node.value = next;
          current++;
          return node;
        }
        if (Array.isArray(node.value)) {
          node.value.push(next);
          current++;
        }
        if (current >= tokens.length) {
          break;
        }
        next = walk();
      }
      return node;
    }

    // Time
    if (token.type === "Time") {
      const node: PTime = {
        type: "Time",
        stamp: [token.value],
        value: [],
      };
      let nextToken = tokens[++current];
      while (nextToken.type === "Time") {
        node.stamp.push(nextToken.value);
        nextToken = tokens[++current];
      }
      let next = walk();
      if (next.type === "Lyric" || next.type === "Role") {
        node.value = next;
        current++;
        return node;
      }
      if (Array.isArray(node.value)) {
        while (next.type === "InlineTime") {
          node.value.push(next);
          current++;
          if (current >= tokens.length) {
            break;
          }
          next = walk();
        }
        return node;
      }
      throw new Error(`[Lyricat] Unrecognized position: ${next}`);
    }

    // Lyric
    if (token.type === "Lyric") {
      return {
        type: "Lyric",
        value: token.value,
      };
    }

    // Break
    if (token.type === "Break") {
      current++;
      return walk();
    }

    throw new TypeError(`[Lyricat] Unrecognized token: ${JSON.stringify(token)}`);
  }

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

import type { DeepPartial } from "ts-essentials";
import type { PInlineTime, PLyric, PRole, PTag, PTime, ParserAST, ParserNode } from "./parser";

export interface Visitor {
  Program: {
    enter: (node: ParserAST) => void;
    exit: (node: ParserAST) => void;
  };
  Tag: {
    enter: (node: PTag) => void;
    exit: (node: PTag) => void;
  };
  Time: {
    enter: (node: PTime) => void;
    exit: (node: PTime) => void;
  };
  Role: {
    enter: (node: PRole, parent: PTime) => void;
    exit: (node: PRole, parent: PTime) => void;
  };
  InlineTime: {
    enter: (node: PInlineTime, parent: PTime | PRole) => void;
    exit: (node: PInlineTime, parent: PTime | PRole) => void;
  };
  Lyric: {
    enter: (node: PLyric, parent: PTime | PRole | PInlineTime) => void;
    exit: (node: PLyric, parent: PTime | PRole | PInlineTime) => void;
  };
}

export interface TProgram {
  tags: TTag[];
  lyrics: TLyric[];
}

export interface TTag {
  title: string;
  value: string;
}

export interface TInlineTime {
  stamp: string;
  lyric: string;
}

export interface TLyric {
  stamp: string;
  lyric?: string;
  role?: string;
  inline?: TInlineTime[];
}

const example = {
  tags: [
    {
      title: "",
      value: "",
    },
  ],
  lyrics: [
    {
      stamp: "",
      lyric: "",
      role: "" || undefined,
      inline: [
        {
          stamp: "",
          lyric: "",
        },
      ],
    },
  ],
};

function traverser(ast: ParserAST, visitor: DeepPartial<Visitor>) {
  function traverseArray(nodes: ParserNode[], parent: ParserNode | ParserAST) {
    nodes.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(node: ParserNode | ParserAST, parent?: ParserNode | ParserAST) {
    const methods = visitor[node.type] as {
      enter: (node: ParserNode | ParserAST, parent?: ParserNode | ParserAST) => void;
      exit: (node: ParserNode | ParserAST, parent?: ParserNode | ParserAST) => void;
    } | undefined;

    if (methods?.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;

      case "Time":
        if (Array.isArray(node.value)) {
          traverseArray(node.value, node);
        } else {
          traverseNode(node.value, node);
        }
        break;

      case "Role":
        if (Array.isArray(node.value)) {
          traverseArray(node.value, node);
        } else {
          traverseNode(node.value, node);
        }
        break;

      case "InlineTime":
        traverseNode(node.value, node);
        break;

      case "Tag":
      case "Lyric":
        break;

      default:
        throw new TypeError(`[Lyricat] Unknown node type: ${(node as any).type}`);
    }

    if (methods?.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast);
}

export function transform(ast: ParserAST) {
  const newAst: TProgram = {
    tags: [],
    lyrics: [],
  };

  let lyrics = {} as Omit<TLyric, "stamp"> & {
    stamp: string[];
  };

  traverser(ast, {
    Tag: {
      enter(node) {
        newAst.tags.push({
          title: node.key,
          value: node.value,
        });
      },
    },
    Time: {
      enter(node) {
        lyrics.stamp = node.stamp;
      },
      exit(node) {
        newAst.lyrics.push(...lyrics.stamp.map(time => ({
          ...lyrics,
          stamp: time,
        })));
        lyrics = {} as Omit<TLyric, "stamp"> & {
          stamp: string[];
        };
      },
    },
    Role: {
      enter(node, parent) {
        lyrics.role = node.name;
      },
    },
    InlineTime: {
      enter(node, parent) {
        if (!lyrics.inline) {
          lyrics.inline = [];
        }
        lyrics.inline.push({
          stamp: node.stamp,
          lyric: node.value.value,
        });
      },
    },
    Lyric: {
      enter(node, parent) {
        if (parent.type !== "InlineTime") {
          lyrics.lyric = node.value;
        }
      },
    },
  });

  return newAst;
}

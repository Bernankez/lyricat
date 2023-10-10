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
  function traverseArray(nodes: ParserNode[], parent: ParserNode) {
    nodes.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(node: ParserNode | ParserAST, parent?: ParserNode) {
    const methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    // TODO
  }

  traverseNode(ast);
}

export function transform(ast: ParserAST) {

}

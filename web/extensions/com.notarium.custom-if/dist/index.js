import { Extension, method } from "@avg-studio/sdk";
function compareNumbers(a, b, op) {
  switch (op) {
    case "g":
      return a > b;
    case "ge":
      return a >= b;
    case "l":
      return a < b;
    case "le":
      return a <= b;
    case "eq":
      return a === b;
    case "ne":
      return a !== b;
    default:
      return false;
  }
}
function compareBooleans(a, b, op) {
  switch (op) {
    case "eq":
      return a === b;
    case "ne":
      return a !== b;
    default:
      return false;
  }
}
function compareStrings(a, b, op) {
  switch (op) {
    case "g":
      return a > b;
    case "ge":
      return a >= b;
    case "l":
      return a < b;
    case "le":
      return a <= b;
    case "eq":
      return a === b;
    case "ne":
      return a !== b;
    default:
      return false;
  }
}
const _CustomIfExtension = class _CustomIfExtension extends Extension {
};
_CustomIfExtension.cond = method({
  title: "自定义条件跳转",
  id: "cond-jump-custom",
  schema: {
    // currentChapter: { type: "string", label: "当前场景" },
    variable: { type: "variable", label: "参数" },
    opr: {
      type: "enum",
      label: "操作",
      options: [
        { label: ">", value: "g" },
        { label: ">=", value: "ge" },
        { label: "<", value: "l" },
        { label: "<=", value: "le" },
        { label: "==", value: "eq" },
        { label: "!=", value: "ne" }
      ]
    },
    compare: { type: "string", label: "对比值", description: "数字、布尔值(true/false)、字符串" },
    trueFrag: { type: "fragment", label: "√真跳转", required: false },
    falseFrag: { type: "fragment", label: "×假跳转", required: false }
  },
  async run(ctx, params) {
    var _a;
    console.log(`v:${params.variable},c:${params.compare},op:${params.opr},tf:${params.trueFrag},ff:${params.falseFrag}`);
    const val = (_a = ctx.variables.get(params.variable)) == null ? void 0 : _a.valueOf();
    let rslt = false;
    if (typeof val === "number") {
      const toNum = Number(params.compare);
      if (toNum !== void 0 && !isNaN(toNum)) {
        rslt = compareNumbers(val, toNum, params.opr);
      }
    } else if (typeof val === "string") {
      const toStr = params.compare;
      if (toStr !== void 0) {
        rslt = compareStrings(val, toStr, params.opr);
      }
    } else if (typeof val === "boolean") {
      let toBool;
      if (params.compare === "true") {
        toBool = true;
      } else if (params.compare === "false") {
        toBool = false;
      } else {
        toBool = void 0;
      }
      if (toBool !== void 0) {
        rslt = compareBooleans(val, toBool, params.opr);
      }
    }
    if (rslt) {
      if (params.trueFrag !== void 0) {
        console.log(`>cond>TRUE>${params.trueFrag}`);
        await ctx.flow.callFragment(params.trueFrag);
      }
    } else {
      if (params.falseFrag !== void 0) {
        console.log(`>cond>FALSE>${params.falseFrag}`);
        await ctx.flow.callFragment(params.falseFrag);
      }
    }
  }
});
let CustomIfExtension = _CustomIfExtension;
export {
  CustomIfExtension
};
//# sourceMappingURL=index.mjs.map

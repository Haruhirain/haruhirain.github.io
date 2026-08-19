import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { settings, extension, INTERNAL_SYSTEM_SLOT, Extension, useExtensionContext, defineSave, method } from "@avg-studio/sdk";
const version$e = 2;
const name$e = "剧情选项";
const canvas$e = {
  width: 1920,
  height: 1080
};
const elements$e = [
  {
    id: "choice-dialog-list",
    refId: "choice-list",
    type: "choice-list",
    name: "选项列表_故事分支",
    rect: {
      x: 500,
      y: 335,
      w: 920,
      h: 410
    },
    anchor: "c",
    style: {
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: 0.4,
      color: "#e8f1f0",
      fill: "transparent",
      borderColor: "transparent",
      borderWidth: 0,
      radius: 14,
      opacity: 100,
      customCss: 'font-family: "Plus Jakarta Sans", "M PLUS Rounded 1c", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif;'
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 420,
        delayMs: 90
      },
      exit: {
        preset: "fade",
        durationMs: 190,
        delayMs: 0
      }
    },
    props: {
      choiceTemplateSchema: "avg.visual-ui.choice/v1",
      direction: "vertical",
      gap: 14,
      bgImage: "",
      previewChoices: [
        "继续追问她",
        "保持沉默",
        "转身离开"
      ],
      previewDisabledIndex: 2
    }
  },
  {
    id: "choice-dialog-item",
    type: "choice-item",
    name: "选项按钮框体_模板",
    rect: {
      x: 504,
      y: 412,
      w: 912,
      h: 76
    },
    anchor: "c",
    style: {
      fill: "rgba(7, 16, 24, 0.86)",
      borderColor: "rgba(127, 212, 200, 0.36)",
      borderWidth: 1,
      radius: 14,
      opacity: 100
    },
    props: {
      choiceListId: "choice-dialog-list",
      hoverSound: "",
      clickSound: "",
      itemImage: "",
      itemHoverImage: "",
      itemPressedImage: "",
      itemDisabledImage: "",
      hoverFill: "rgba(20, 48, 54, 0.94)",
      pressedFill: "rgba(82, 184, 168, 0.24)",
      disabledFill: "rgba(6, 12, 18, 0.58)",
      focusColor: "#7fd4c8"
    }
  },
  {
    id: "choice-dialog-indicator",
    type: "choice-indicator",
    name: "选项强调线_模板",
    rect: {
      x: 505,
      y: 424,
      w: 3,
      h: 52
    },
    anchor: "c",
    style: {
      fill: "#7fd4c8",
      radius: 999,
      opacity: 46,
      customCss: "border-radius: 0 999px 999px 0 !important;"
    },
    props: {
      choiceListId: "choice-dialog-list",
      hoverOpacity: 100,
      pressedOpacity: 100,
      disabledOpacity: 20,
      glow: 14
    }
  },
  {
    id: "choice-dialog-number",
    type: "choice-number",
    name: "选项序号_模板",
    rect: {
      x: 535,
      y: 413,
      w: 34,
      h: 74
    },
    anchor: "c",
    style: {
      fontFamily: '"SFMono-Regular", Consolas, monospace',
      fontSize: 15.08,
      fontWeight: 700,
      letterSpacing: 1.8,
      color: "#7fd4c8",
      opacity: 62,
      textAlign: "left"
    },
    props: {
      choiceListId: "choice-dialog-list",
      numberFormat: "leading-zero",
      numberStart: 1,
      numberPrefix: "",
      numberSuffix: "",
      hoverColor: "#7fd4c8",
      pressedColor: "#7fd4c8",
      disabledColor: "#7fd4c8",
      hoverOpacity: 100,
      pressedOpacity: 100,
      disabledOpacity: 20
    }
  },
  {
    id: "choice-dialog-text",
    type: "choice-text",
    name: "选项正文_模板",
    rect: {
      x: 587,
      y: 413,
      w: 800,
      h: 74
    },
    anchor: "c",
    style: {
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: 0.4,
      color: "#e8f1f0",
      opacity: 100,
      textAlign: "left"
    },
    props: {
      choiceListId: "choice-dialog-list",
      hoverColor: "#f5fffd",
      pressedColor: "#ffffff",
      disabledColor: "rgba(190, 205, 203, 0.38)",
      lineHeight: 1.45
    }
  }
];
const choiceDialog = {
  version: version$e,
  name: name$e,
  canvas: canvas$e,
  elements: elements$e
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$e,
  default: choiceDialog,
  elements: elements$e,
  name: name$e,
  version: version$e
}, Symbol.toStringTag, { value: "Module" }));
const version$d = 2;
const name$d = "对话框";
const canvas$d = {
  width: 1920,
  height: 1080
};
const elements$d = [
  {
    id: "dialogue-backdrop",
    refId: "dialogue-backdrop",
    type: "dialogue-backdrop",
    name: "舞台遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "#000000",
      opacity: 0
    },
    props: {}
  },
  {
    id: "dialogue-frame",
    refId: "dialogue-frame",
    type: "dialogue-frame",
    name: "框体背景",
    rect: {
      x: 0,
      y: 880,
      w: 1920,
      h: 200
    },
    anchor: "tl",
    style: {
      fill: "transparent",
      borderColor: "transparent",
      borderWidth: 0,
      radius: 0,
      opacity: 100
    },
    props: {
      runtimeOverride: true,
      backgroundImage: "",
      backgroundImageFit: "stretch",
      backgroundImagePosition: "center",
      backgroundImageRepeat: "no-repeat",
      linearGradient: {
        enabled: true,
        angle: 0,
        startColor: "rgba(0,0,0,0.75)",
        endColor: "rgba(0,0,0,0.3)"
      },
      frameDecoration: {
        borderTop: "1px solid rgba(255,255,255,0.12)",
        borderRight: "",
        borderBottom: "",
        borderLeft: "",
        borderRadius: "",
        boxShadow: ""
      }
    }
  },
  {
    id: "dialogue-text",
    refId: "dialogue-text",
    type: "dialogue-text",
    name: "对白文本",
    rect: {
      x: 200,
      y: 900,
      w: 1520,
      h: 180
    },
    anchor: "tl",
    style: {
      fontFamily: "'Source Han Sans', 'PingFang SC', sans-serif",
      fontSize: 30,
      fontWeight: 500,
      color: "#f3ede2",
      letterSpacing: 1.2,
      textAlign: "left",
      opacity: 100
    },
    props: {
      lineHeight: 1.75,
      textShadows: [
        {
          offsetX: 0,
          offsetY: 0,
          blur: 1.5,
          color: "rgba(0,0,0,0.95)"
        },
        {
          offsetX: 0,
          offsetY: 0,
          blur: 3,
          color: "rgba(0,0,0,0.7)"
        },
        {
          offsetX: 1,
          offsetY: 2,
          blur: 4,
          color: "rgba(0,0,0,0.6)"
        }
      ],
      previewText: "有些故事，会从一个看似普通的夜晚开始。\n而我们，刚好站在它的入口。"
    }
  },
  {
    id: "dialogue-name",
    refId: "dialogue-name",
    type: "dialogue-name",
    name: "角色名",
    rect: {
      x: 200,
      y: 840,
      w: 384,
      h: 40
    },
    anchor: "tl",
    style: {
      fontFamily: "'Source Han Sans', 'PingFang SC', sans-serif",
      fontSize: 34,
      fontWeight: 600,
      color: "#ffd88a",
      fill: "transparent",
      borderColor: "transparent",
      borderWidth: 0,
      radius: 0,
      letterSpacing: 1.36,
      textAlign: "left",
      opacity: 100
    },
    props: {
      backgroundImage: "",
      backgroundImageFit: "stretch",
      backgroundImagePosition: "center",
      backgroundImageRepeat: "no-repeat",
      linearGradient: {
        enabled: false,
        angle: 180,
        startColor: "transparent",
        endColor: "transparent"
      },
      frameDecoration: {
        borderTop: "",
        borderRight: "",
        borderBottom: "",
        borderLeft: "",
        borderRadius: "",
        boxShadow: ""
      },
      lineHeight: 1.5,
      textShadows: [
        {
          offsetX: 0,
          offsetY: 0,
          blur: 1.5,
          color: "rgba(0,0,0,0.95)"
        },
        {
          offsetX: 0,
          offsetY: 0,
          blur: 3,
          color: "rgba(0,0,0,0.7)"
        },
        {
          offsetX: 1,
          offsetY: 2,
          blur: 4,
          color: "rgba(0,0,0,0.6)"
        }
      ],
      previewName: "小满"
    }
  },
  {
    id: "dialogue-wait-cursor",
    refId: "dialogue-wait-cursor",
    type: "dialogue-wait-cursor",
    name: "等待提示",
    rect: {
      x: 1546.4,
      y: 965.6,
      w: 28,
      h: 28
    },
    anchor: "tl",
    style: {
      color: "#ffffff",
      opacity: 100
    },
    props: {
      source: "legacy",
      imageAsset: "",
      shape: "diamond",
      accentColor: "#ff3d00",
      animation: "rotate",
      durationMs: 1e3
    }
  }
];
const dialogueBehavior = {
  text_speed: 30
};
const dialogueBox = {
  version: version$d,
  name: name$d,
  canvas: canvas$d,
  elements: elements$d,
  dialogueBehavior
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$d,
  default: dialogueBox,
  dialogueBehavior,
  elements: elements$d,
  name: name$d,
  version: version$d
}, Symbol.toStringTag, { value: "Module" }));
const version$c = 2;
const name$c = "鉴赏界面";
const canvas$c = {
  width: 1920,
  height: 1080
};
const transition$1 = {
  enter: {
    preset: "fade",
    durationMs: 320,
    delayMs: 0
  },
  exit: {
    preset: "fade",
    durationMs: 240,
    delayMs: 0
  }
};
const elements$c = [
  {
    id: "mask",
    type: "rect",
    name: "遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "rgba(7, 10, 8, 0.94)",
      radius: 0,
      backdropBlur: 28,
      opacity: 100,
      customCss: "background-image: radial-gradient(ellipse 70% 65% at 72% -5%, rgba(171,111,36,0.19), transparent 60%), radial-gradient(ellipse 55% 50% at 0% 100%, rgba(70,88,58,0.2), transparent 68%), repeating-linear-gradient(0deg, rgba(226,221,191,0.018) 0 1px, transparent 1px 5px), linear-gradient(135deg, rgba(21,28,21,0.98), rgba(5,8,6,0.98));"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 420,
        delayMs: 0
      },
      exit: {
        preset: "fade",
        durationMs: 220,
        delayMs: 80
      }
    }
  },
  {
    id: "grid-overlay",
    type: "rect",
    name: "装饰_坐标网格",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "transparent",
      radius: 0,
      opacity: 100,
      customCss: "background-image: linear-gradient(rgba(227,166,75,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(227,166,75,0.025) 1px, transparent 1px); background-size: 64px 64px; mask-image: linear-gradient(to bottom, black, transparent 78%);"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 520,
        delayMs: 40
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 40
      }
    }
  },
  {
    id: "eyebrow",
    type: "text",
    name: "文字_档案编号",
    rect: {
      x: 104,
      y: 72,
      w: 680,
      h: 24
    },
    anchor: "tl",
    style: {
      fontSize: 13,
      color: "#e3a64b",
      letterSpacing: 5,
      fontWeight: 700,
      fontFamily: '"JetBrains Mono", "SF Mono", "Menlo", monospace',
      opacity: 100,
      customCss: "text-transform: uppercase; text-shadow: 0 0 14px rgba(227,166,75,0.25);"
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 360,
        delayMs: 70
      },
      exit: {
        preset: "fade",
        durationMs: 140,
        delayMs: 40
      }
    },
    props: {
      text: "ARCHIVE 03 / RECOVERED MATERIALS"
    }
  },
  {
    id: "title",
    type: "text",
    name: "文字_鉴赏档案库",
    rect: {
      x: 100,
      y: 102,
      w: 820,
      h: 72
    },
    anchor: "tl",
    style: {
      fontSize: 50,
      color: "#e7e7da",
      letterSpacing: 2,
      fontWeight: 760,
      fontFamily: '"M PLUS Rounded 1c", "PingFang SC", "Microsoft YaHei", sans-serif',
      opacity: 100,
      customCss: "text-shadow: 0 4px 26px rgba(0,0,0,0.6);"
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 440,
        delayMs: 105
      },
      exit: {
        preset: "sink",
        durationMs: 200,
        delayMs: 20
      }
    },
    props: {
      text: "鉴赏档案库"
    }
  },
  {
    id: "status",
    type: "text",
    name: "文字_终端状态",
    rect: {
      x: 1270,
      y: 86,
      w: 470,
      h: 56
    },
    anchor: "tr",
    style: {
      fontSize: 11,
      color: "rgba(215,218,202,0.52)",
      letterSpacing: 3,
      textAlign: "right",
      fontFamily: '"JetBrains Mono", "SF Mono", monospace',
      opacity: 100,
      customCss: "line-height: 1.8;"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 380,
        delayMs: 170
      },
      exit: {
        preset: "fade",
        durationMs: 140,
        delayMs: 0
      }
    },
    props: {
      text: "TERMINAL ONLINE  ●\nCLEARANCE / SURVIVOR"
    }
  },
  {
    id: "close-btn",
    type: "button",
    name: "按钮_关闭当前界面",
    rect: {
      x: 1760,
      y: 84,
      w: 52,
      h: 52
    },
    anchor: "tr",
    style: {
      fontSize: 21,
      color: "#e3a64b",
      fill: "rgba(227,166,75,0.055)",
      borderColor: "rgba(227,166,75,0.32)",
      borderWidth: 1,
      radius: 4,
      opacity: 100,
      customCss: "box-shadow: inset 0 0 0 3px rgba(7,10,8,0.8), 0 8px 24px rgba(0,0,0,0.4); transition: background .16s, border-color .16s, transform .16s; &:hover { background: rgba(227,166,75,0.14); border-color: rgba(227,166,75,0.75); transform: rotate(90deg); }"
    },
    animation: {
      enter: {
        preset: "scale",
        durationMs: 300,
        delayMs: 190
      },
      exit: {
        preset: "shrink",
        durationMs: 160,
        delayMs: 0
      }
    },
    props: {
      text: "×"
    },
    events: {
      onClick: {
        type: "ui.close"
      }
    }
  },
  {
    id: "gallery-tabs",
    type: "tabs",
    name: "页签_CG音乐片段",
    rect: {
      x: 100,
      y: 190,
      w: 1040,
      h: 64
    },
    anchor: "t",
    style: {
      fontSize: 17,
      color: "#f0eadb",
      borderColor: "#e3a64b",
      letterSpacing: 3,
      radius: 0,
      opacity: 100,
      customCss: "& [data-visual-ui-tabs-bar] { border-bottom-color: rgba(227,166,75,0.18) !important; }"
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 420,
        delayMs: 180
      },
      exit: {
        preset: "fade",
        durationMs: 180,
        delayMs: 20
      }
    },
    props: {
      tabs: [
        "影像档案",
        "音频信号",
        "剧情记录"
      ],
      activeIndex: 0,
      gap: 6
    }
  },
  {
    id: "tab-hint",
    type: "text",
    name: "文字_页签提示",
    rect: {
      x: 1260,
      y: 211,
      w: 550,
      h: 28
    },
    anchor: "tr",
    style: {
      fontSize: 10,
      color: "rgba(209,213,197,0.4)",
      letterSpacing: 3,
      textAlign: "right",
      fontFamily: '"JetBrains Mono", monospace',
      opacity: 100
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 240
      },
      exit: {
        preset: "fade",
        durationMs: 140,
        delayMs: 0
      }
    },
    props: {
      text: "SELECT ARCHIVE TYPE / 点击页签切换鉴赏模式"
    }
  },
  {
    id: "cg-gallery",
    type: "cg-gallery",
    name: "智能组件_CG鉴赏",
    rect: {
      x: 100,
      y: 286,
      w: 1712,
      h: 680
    },
    anchor: "c",
    style: {
      radius: 6,
      opacity: 100
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 520,
        delayMs: 240
      },
      exit: {
        preset: "sink",
        durationMs: 240,
        delayMs: 0
      }
    },
    props: {
      sharedSource: "ext:avg.internal.default-shell.unlockedShared",
      slotSource: "ext:avg.internal.default-shell.unlockedSlot",
      cols: 4,
      rows: 2,
      gap: 20,
      emptyText: "尚未回收任何影像档案",
      accentColor: "#e3a64b"
    },
    tab: {
      of: "gallery-tabs",
      index: 0
    }
  },
  {
    id: "music-gallery",
    type: "music-gallery",
    name: "智能组件_音乐鉴赏",
    rect: {
      x: 100,
      y: 286,
      w: 1712,
      h: 680
    },
    anchor: "c",
    style: {
      radius: 6,
      opacity: 100
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 520,
        delayMs: 240
      },
      exit: {
        preset: "sink",
        durationMs: 240,
        delayMs: 0
      }
    },
    props: {
      sharedSource: "ext:avg.internal.default-shell.unlockedMusicShared",
      slotSource: "ext:avg.internal.default-shell.unlockedMusicSlot",
      emptyText: "尚未截获任何音频信号",
      accentColor: "#e3a64b",
      showArtist: true,
      showDescription: true
    },
    tab: {
      of: "gallery-tabs",
      index: 1
    }
  },
  {
    id: "fragment-gallery",
    type: "fragment-gallery",
    name: "智能组件_片段鉴赏",
    rect: {
      x: 100,
      y: 286,
      w: 1712,
      h: 680
    },
    anchor: "c",
    style: {
      radius: 6,
      opacity: 100
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 520,
        delayMs: 240
      },
      exit: {
        preset: "sink",
        durationMs: 240,
        delayMs: 0
      }
    },
    props: {
      sharedSource: "ext:avg.internal.default-shell.unlockedFragmentsShared",
      slotSource: "ext:avg.internal.default-shell.unlockedFragmentsSlot",
      cols: 3,
      rows: 2,
      gap: 20,
      emptyText: "尚未解密任何剧情记录",
      accentColor: "#e3a64b",
      showDescription: true
    },
    tab: {
      of: "gallery-tabs",
      index: 2
    }
  },
  {
    id: "footer-left",
    type: "text",
    name: "文字_底部操作提示",
    rect: {
      x: 102,
      y: 1006,
      w: 680,
      h: 22
    },
    anchor: "bl",
    style: {
      fontSize: 10,
      color: "rgba(211,215,200,0.38)",
      letterSpacing: 2,
      fontFamily: '"JetBrains Mono", monospace',
      opacity: 100
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 360
      },
      exit: {
        preset: "fade",
        durationMs: 120,
        delayMs: 0
      }
    },
    props: {
      text: "ESC / MIDDLE CLICK  返回上一级"
    }
  },
  {
    id: "footer-right",
    type: "text",
    name: "文字_档案权限",
    rect: {
      x: 1230,
      y: 1006,
      w: 580,
      h: 22
    },
    anchor: "br",
    style: {
      fontSize: 10,
      color: "rgba(227,166,75,0.46)",
      letterSpacing: 3,
      textAlign: "right",
      fontFamily: '"JetBrains Mono", monospace',
      opacity: 100
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 390
      },
      exit: {
        preset: "fade",
        durationMs: 120,
        delayMs: 0
      }
    },
    props: {
      text: "PROPERTY OF SHELTER NETWORK / LEVEL 03"
    }
  }
];
const galleryScreen = {
  version: version$c,
  name: name$c,
  canvas: canvas$c,
  transition: transition$1,
  elements: elements$c
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$c,
  default: galleryScreen,
  elements: elements$c,
  name: name$c,
  transition: transition$1,
  version: version$c
}, Symbol.toStringTag, { value: "Module" }));
const version$b = 1;
const name$b = "历史记录";
const canvas$b = {
  width: 1920,
  height: 1080
};
const transition = {
  exit: {
    preset: "fade",
    durationMs: 280,
    delayMs: 0
  }
};
const elements$b = [
  {
    id: "mask",
    type: "rect",
    name: "遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "rgba(8, 13, 20, 0.88)",
      radius: 0,
      backdropBlur: 28,
      opacity: 100,
      customCss: "background-image: radial-gradient(ellipse 110% 85% at 18% 0%, rgba(40,70,100,0.36), transparent 58%), linear-gradient(115deg, rgba(127,212,200,0.025), transparent 45%);"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 420,
        delayMs: 0
      },
      exit: {
        preset: "fade",
        durationMs: 260,
        delayMs: 80
      }
    }
  },
  {
    id: "eyebrow",
    type: "text",
    name: "文字_Narrative_Log",
    rect: {
      x: 120,
      y: 96,
      w: 560,
      h: 24
    },
    anchor: "tl",
    style: {
      fontSize: 15,
      color: "#7fd4c8",
      letterSpacing: 5,
      fontFamily: '"JetBrains Mono", "SF Mono", "Menlo", monospace',
      opacity: 100,
      customCss: "text-transform: uppercase; text-shadow: 0 0 12px rgba(127,212,200,0.4);"
    },
    props: {
      text: "Narrative Log"
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 360,
        delayMs: 80
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 60
      }
    }
  },
  {
    id: "title",
    type: "text",
    name: "文字_历史记录",
    rect: {
      x: 118,
      y: 122,
      w: 800,
      h: 80
    },
    anchor: "tl",
    style: {
      fontSize: 56,
      color: "#e8edf2",
      letterSpacing: 2,
      fontFamily: '"M PLUS Rounded 1c", "Plus Jakarta Sans", "PingFang SC", "Microsoft YaHei", sans-serif',
      opacity: 100
    },
    props: {
      text: "历史记录"
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 460,
        delayMs: 120
      },
      exit: {
        preset: "sink",
        durationMs: 220,
        delayMs: 40
      }
    }
  },
  {
    id: "title-accent",
    type: "rect",
    name: "玉青短横线",
    rect: {
      x: 120,
      y: 212,
      w: 72,
      h: 4
    },
    anchor: "tl",
    style: {
      fill: "#7fd4c8",
      radius: 999,
      opacity: 100,
      customCss: "background-image: linear-gradient(90deg, #7fd4c8, #5eb8d4); box-shadow: 0 0 14px rgba(94,184,212,0.5);"
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 420,
        delayMs: 190
      },
      exit: {
        preset: "shrink",
        durationMs: 180,
        delayMs: 20
      }
    }
  },
  {
    id: "hint",
    type: "text",
    name: "文字_回看说明",
    rect: {
      x: 1320,
      y: 172,
      w: 360,
      h: 28
    },
    anchor: "tr",
    style: {
      fontSize: 14,
      color: "rgba(232,237,242,0.46)",
      letterSpacing: 2,
      textAlign: "right",
      fontFamily: '"JetBrains Mono", "SF Mono", monospace',
      opacity: 100
    },
    props: {
      text: "SCROLL TO REVIEW  ·  ▶ REPLAY"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 360,
        delayMs: 220
      },
      exit: {
        preset: "fade",
        durationMs: 140,
        delayMs: 0
      }
    }
  },
  {
    id: "close-btn",
    type: "button",
    name: "按钮_关闭当前界面",
    rect: {
      x: 1748,
      y: 118,
      w: 52,
      h: 52
    },
    anchor: "tr",
    style: {
      fontSize: 22,
      color: "#dce8f2",
      fill: "rgba(120, 150, 180, 0.06)",
      borderColor: "rgba(150, 180, 210, 0.14)",
      borderWidth: 1,
      radius: 12,
      backdropBlur: 10,
      opacity: 100,
      customCss: "box-shadow: inset 0 1px 0 rgba(200,225,245,0.06), 0 4px 14px rgba(4,10,18,0.4); transition: transform 180ms cubic-bezier(0.22,1,0.36,1), background 180ms, border-color 180ms, box-shadow 180ms; &:hover { background: rgba(127,212,200,0.12); border-color: rgba(127,212,200,0.55); box-shadow: 0 0 22px rgba(94,184,212,0.3); transform: rotate(90deg); }"
    },
    props: {
      text: "✕"
    },
    events: {
      onClick: {
        type: "ui.close"
      }
    },
    animation: {
      enter: {
        preset: "scale",
        durationMs: 320,
        delayMs: 200
      },
      exit: {
        preset: "shrink",
        durationMs: 180,
        delayMs: 0
      }
    }
  },
  {
    id: "history-list",
    type: "history-list",
    name: "历史记录_对话",
    rect: {
      x: 300,
      y: 264,
      w: 1320,
      h: 718
    },
    anchor: "c",
    style: {
      fontSize: 22,
      color: "#e8edf2",
      fill: "rgba(9, 16, 24, 0.58)",
      borderColor: "rgba(127, 212, 200, 0.22)",
      borderWidth: 1,
      radius: 18,
      letterSpacing: 0.6,
      opacity: 100,
      customCss: "filter: drop-shadow(0 26px 68px rgba(0,0,0,0.26));"
    },
    props: {
      maxEntries: 200,
      gap: 12,
      showSpeaker: true,
      showVoiceButton: true,
      showTimeline: true,
      emptyText: "还没有可以回看的对话",
      accentColor: "#7fd4c8"
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 540,
        delayMs: 230
      },
      exit: {
        preset: "sink",
        durationMs: 260,
        delayMs: 0
      }
    }
  }
];
const historyScreen = {
  version: version$b,
  name: name$b,
  canvas: canvas$b,
  transition,
  elements: elements$b
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$b,
  default: historyScreen,
  elements: elements$b,
  name: name$b,
  transition,
  version: version$b
}, Symbol.toStringTag, { value: "Module" }));
const version$a = 1;
const name$a = "变量输入对话框";
const canvas$a = {
  width: 1920,
  height: 1080
};
const elements$a = [
  {
    id: "input-dialog-mask",
    type: "rect",
    name: "遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "rgba(3, 8, 13, 0.66)",
      radius: 0,
      backdropBlur: 16,
      opacity: 100,
      customCss: "background-image: radial-gradient(ellipse 70% 70% at 50% 42%, rgba(46,90,96,0.18), transparent 68%);"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 300,
        delayMs: 0
      },
      exit: {
        preset: "fade",
        durationMs: 220,
        delayMs: 60
      }
    }
  },
  {
    id: "input-dialog-standard",
    refId: "input-dialog",
    type: "input-dialog",
    name: "输入对话框_玩家姓名",
    rect: {
      x: 530,
      y: 300,
      w: 860,
      h: 480
    },
    anchor: "c",
    style: {
      fontSize: 24,
      color: "#f4f8f7",
      fill: "rgba(9, 18, 27, 0.96)",
      borderColor: "#7fd4c8",
      borderWidth: 1,
      radius: 18,
      opacity: 100
    },
    animation: {
      enter: {
        preset: "scale",
        durationMs: 380,
        delayMs: 70
      },
      exit: {
        preset: "shrink",
        durationMs: 220,
        delayMs: 0
      }
    },
    props: {
      variable: "playerName",
      valueType: "string",
      title: "请告诉我你的名字",
      description: "这个名字会在接下来的故事中使用。",
      placeholder: "输入名字",
      defaultValue: "",
      confirmText: "确认",
      requiredText: "请输入名字后再继续",
      required: true,
      minLength: 0,
      maxLength: 20,
      step: 1,
      dismissible: false
    }
  }
];
const inputDialog = {
  version: version$a,
  name: name$a,
  canvas: canvas$a,
  elements: elements$a
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$a,
  default: inputDialog,
  elements: elements$a,
  name: name$a,
  version: version$a
}, Symbol.toStringTag, { value: "Module" }));
const version$9 = 1;
const name$9 = "标准消息框";
const canvas$9 = {
  width: 1920,
  height: 1080
};
const elements$9 = [
  {
    id: "message-box-mask",
    type: "rect",
    name: "遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "rgba(3, 8, 13, 0.66)",
      radius: 0,
      backdropBlur: 16,
      opacity: 100,
      customCss: "background-image: radial-gradient(ellipse 70% 70% at 50% 42%, rgba(46,90,96,0.18), transparent 68%);"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 300,
        delayMs: 0
      },
      exit: {
        preset: "fade",
        durationMs: 220,
        delayMs: 60
      }
    }
  },
  {
    id: "message-box-standard",
    refId: "message-box",
    type: "message-box",
    name: "消息框_提示",
    rect: {
      x: 560,
      y: 340,
      w: 800,
      h: 400
    },
    anchor: "c",
    style: {
      fontSize: 24,
      color: "#f4f8f7",
      fill: "rgba(9, 18, 27, 0.96)",
      borderColor: "#7fd4c8",
      borderWidth: 1,
      radius: 18,
      opacity: 100
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 380,
        delayMs: 70
      },
      exit: {
        preset: "sink",
        durationMs: 220,
        delayMs: 0
      }
    },
    props: {
      mode: "alert",
      title: "提示",
      message: "这里显示需要告诉玩家的消息。",
      confirmText: "知道了",
      cancelText: "取消",
      tone: "info",
      dismissible: true
    }
  }
];
const messageBox = {
  version: version$9,
  name: name$9,
  canvas: canvas$9,
  elements: elements$9
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$9,
  default: messageBox,
  elements: elements$9,
  name: name$9,
  version: version$9
}, Symbol.toStringTag, { value: "Module" }));
const version$8 = 2;
const name$8 = "段落 · 电影留白";
const canvas$8 = {
  width: 1920,
  height: 1080
};
const elements$8 = [
  {
    id: "background-mask",
    refId: "background-mask",
    type: "background-mask",
    name: "背景遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "#05070d",
      opacity: 66
    }
  },
  {
    id: "paragraph",
    refId: "paragraph",
    type: "paragraph",
    name: "整屏段落",
    rect: {
      x: 400,
      y: 94,
      w: 1120,
      h: 892
    },
    anchor: "t",
    style: {
      fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      fontSize: 31,
      fontWeight: 500,
      color: "#f7f3ec",
      fill: "transparent",
      borderColor: "transparent",
      borderWidth: 0,
      radius: 0,
      backdropBlur: 0,
      letterSpacing: 1.6,
      textAlign: "left",
      opacity: 100
    },
    props: {
      gap: 32,
      lineHeight: 1.82,
      inactiveColor: "#cbc8c2",
      readBehavior: {
        mode: "dim",
        followMode: "overflow"
      },
      readStyle: {
        color: "#cbc8c2",
        opacity: 62,
        transform: {
          y: -4,
          scale: 100
        },
        transition: {
          preset: "fade-up",
          durationMs: 240,
          delayMs: 0,
          easing: "soft"
        }
      },
      textPadding: {
        top: 48,
        right: 56,
        bottom: 48,
        left: 56
      },
      backgroundImage: "",
      backgroundImageFit: "cover",
      backgroundImagePosition: "center",
      backgroundImageRepeat: "no-repeat",
      linearGradient: {
        enabled: false,
        angle: 180,
        startColor: "transparent",
        endColor: "transparent"
      },
      frameDecoration: {
        borderTop: "",
        borderRight: "",
        borderBottom: "",
        borderLeft: "",
        borderRadius: "",
        boxShadow: ""
      },
      textShadows: [
        {
          offsetX: 0,
          offsetY: 0,
          blur: 3,
          color: "rgba(0, 0, 0, 0.95)"
        },
        {
          offsetX: 0,
          offsetY: 2,
          blur: 14,
          color: "rgba(0, 0, 0, 0.85)"
        }
      ],
      previewParagraphs: [
        "银幕暗下去以后，远处的海潮才重新有了声音。",
        "我沿着那道微光向前，仿佛正走进故事尚未写完的部分。",
        "直到她在身后叫住我，所有沉默才有了方向。"
      ]
    }
  }
];
const paragraphCinematicCentered = {
  version: version$8,
  name: name$8,
  canvas: canvas$8,
  elements: elements$8
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$8,
  default: paragraphCinematicCentered,
  elements: elements$8,
  name: name$8,
  version: version$8
}, Symbol.toStringTag, { value: "Module" }));
const version$7 = 2;
const name$7 = "段落 · 暮色手账";
const canvas$7 = {
  width: 1920,
  height: 1080
};
const elements$7 = [
  {
    id: "background-mask",
    refId: "background-mask",
    type: "background-mask",
    name: "背景遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "#241618",
      opacity: 42
    }
  },
  {
    id: "paragraph",
    refId: "paragraph",
    type: "paragraph",
    name: "整屏段落",
    rect: {
      x: 336,
      y: 72,
      w: 1248,
      h: 936
    },
    anchor: "t",
    style: {
      fontFamily: "'Kaiti SC', STKaiti, KaiTi, 'Songti SC', serif",
      fontSize: 30,
      fontWeight: 400,
      color: "#fff8ef",
      fill: "rgba(68, 43, 39, 0.88)",
      borderColor: "rgba(255, 225, 205, 0.22)",
      borderWidth: 1,
      radius: 32,
      backdropBlur: 12,
      letterSpacing: 1.2,
      textAlign: "left",
      opacity: 100
    },
    props: {
      gap: 30,
      lineHeight: 1.82,
      inactiveColor: "#dcc6b9",
      readBehavior: {
        mode: "dim",
        followMode: "overflow"
      },
      readStyle: {
        color: "#dcc6b9",
        opacity: 74,
        filter: {
          blur: 0.3,
          grayscale: 4,
          brightness: 96
        },
        transform: {
          y: -2,
          scale: 99
        },
        transition: {
          preset: "settle",
          durationMs: 260,
          delayMs: 0,
          easing: "soft"
        }
      },
      textPadding: {
        top: 64,
        right: 72,
        bottom: 64,
        left: 72
      },
      backgroundImage: "",
      backgroundImageFit: "cover",
      backgroundImagePosition: "center",
      backgroundImageRepeat: "no-repeat",
      linearGradient: {
        enabled: true,
        angle: 150,
        startColor: "rgba(92, 57, 50, 0.92)",
        endColor: "rgba(49, 33, 39, 0.90)"
      },
      frameDecoration: {
        borderTop: "",
        borderRight: "",
        borderBottom: "",
        borderLeft: "",
        borderRadius: "",
        boxShadow: "0 24px 64px rgba(42, 20, 18, 0.32), inset 0 1px 0 rgba(255, 249, 241, 0.12)"
      },
      textShadows: [
        {
          offsetX: 0,
          offsetY: 2,
          blur: 7,
          color: "rgba(45, 24, 20, 0.55)"
        }
      ],
      previewParagraphs: [
        "傍晚的风把窗帘吹得鼓起来，也把厨房里的甜香送到了书桌边。",
        "她在便签背面画了一朵歪歪扭扭的花，然后认真地写下明天见。",
        "门铃响起时，那张便签还被晚风轻轻压在杯沿下。"
      ]
    }
  }
];
const paragraphHandwritten = {
  version: version$7,
  name: name$7,
  canvas: canvas$7,
  elements: elements$7
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$7,
  default: paragraphHandwritten,
  elements: elements$7,
  name: name$7,
  version: version$7
}, Symbol.toStringTag, { value: "Module" }));
const version$6 = 2;
const name$6 = "段落 · 书页叙事";
const canvas$6 = {
  width: 1920,
  height: 1080
};
const elements$6 = [
  {
    id: "background-mask",
    refId: "background-mask",
    type: "background-mask",
    name: "背景遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "#1a1410",
      opacity: 36
    }
  },
  {
    id: "paragraph",
    refId: "paragraph",
    type: "paragraph",
    name: "整屏段落",
    rect: {
      x: 320,
      y: 64,
      w: 1280,
      h: 952
    },
    anchor: "t",
    style: {
      fontFamily: "'Songti SC', STSong, SimSun, serif",
      fontSize: 29,
      fontWeight: 400,
      color: "#342b24",
      fill: "rgba(250, 244, 230, 0.96)",
      borderColor: "#d0b98f",
      borderWidth: 1,
      radius: 8,
      backdropBlur: 0,
      letterSpacing: 1.4,
      textAlign: "left",
      opacity: 100
    },
    props: {
      gap: 30,
      lineHeight: 1.9,
      inactiveColor: "#746659",
      readBehavior: {
        mode: "dim",
        followMode: "overflow"
      },
      readStyle: {
        color: "#746659",
        opacity: 82,
        filter: {
          grayscale: 8,
          brightness: 94
        },
        transform: {
          y: 1,
          scale: 99.5
        },
        transition: {
          preset: "settle",
          durationMs: 260,
          delayMs: 0,
          easing: "soft"
        }
      },
      textPadding: {
        top: 68,
        right: 88,
        bottom: 68,
        left: 88
      },
      backgroundImage: "",
      backgroundImageFit: "cover",
      backgroundImagePosition: "center",
      backgroundImageRepeat: "no-repeat",
      linearGradient: {
        enabled: true,
        angle: 165,
        startColor: "rgba(255, 251, 240, 0.98)",
        endColor: "rgba(237, 224, 200, 0.96)"
      },
      frameDecoration: {
        borderTop: "",
        borderRight: "",
        borderBottom: "",
        borderLeft: "",
        borderRadius: "",
        boxShadow: "0 20px 60px rgba(20, 12, 6, 0.34), inset 0 0 42px rgba(130, 92, 48, 0.10)"
      },
      textShadows: [],
      previewParagraphs: [
        "信纸在窗边压了一夜，边角沾着一点潮湿的月色。",
        "那些没有寄出的句子，如今读来，竟比当时更接近答案。",
        "我翻到最后一页，才发现答案一直藏在落款旁。"
      ]
    }
  }
];
const paragraphLiterary = {
  version: version$6,
  name: name$6,
  canvas: canvas$6,
  elements: elements$6
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$6,
  default: paragraphLiterary,
  elements: elements$6,
  name: name$6,
  version: version$6
}, Symbol.toStringTag, { value: "Module" }));
const version$5 = 2;
const name$5 = "段落 · 冷光档案";
const canvas$5 = {
  width: 1920,
  height: 1080
};
const elements$5 = [
  {
    id: "background-mask",
    refId: "background-mask",
    type: "background-mask",
    name: "背景遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "#041224",
      opacity: 58
    }
  },
  {
    id: "paragraph",
    refId: "paragraph",
    type: "paragraph",
    name: "整屏段落",
    rect: {
      x: 320,
      y: 72,
      w: 1280,
      h: 936
    },
    anchor: "t",
    style: {
      fontFamily: "'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
      fontSize: 29,
      fontWeight: 500,
      color: "#eaf7ff",
      fill: "rgba(4, 12, 24, 0.90)",
      borderColor: "rgba(91, 207, 255, 0.18)",
      borderWidth: 1,
      radius: 4,
      backdropBlur: 8,
      letterSpacing: 0.6,
      textAlign: "left",
      opacity: 100
    },
    props: {
      gap: 24,
      lineHeight: 1.68,
      inactiveColor: "#9fb9c8",
      readBehavior: {
        mode: "dim",
        followMode: "overflow"
      },
      readStyle: {
        color: "#9fb9c8",
        opacity: 58,
        filter: {
          grayscale: 18,
          brightness: 84
        },
        transform: {
          x: -4,
          scale: 100
        },
        transition: {
          preset: "settle",
          durationMs: 200,
          delayMs: 0,
          easing: "ease-out"
        }
      },
      textPadding: {
        top: 52,
        right: 68,
        bottom: 52,
        left: 68
      },
      backgroundImage: "",
      backgroundImageFit: "cover",
      backgroundImagePosition: "center",
      backgroundImageRepeat: "no-repeat",
      linearGradient: {
        enabled: true,
        angle: 180,
        startColor: "rgba(7, 26, 45, 0.95)",
        endColor: "rgba(2, 8, 18, 0.94)"
      },
      frameDecoration: {
        borderTop: "1px solid rgba(91, 207, 255, 0.18)",
        borderRight: "1px solid rgba(91, 207, 255, 0.18)",
        borderBottom: "1px solid rgba(91, 207, 255, 0.18)",
        borderLeft: "3px solid rgba(91, 207, 255, 0.85)",
        borderRadius: "4px",
        boxShadow: "0 0 30px rgba(67, 181, 255, 0.16), inset 0 0 40px rgba(0, 97, 156, 0.08)"
      },
      textShadows: [
        {
          offsetX: 0,
          offsetY: 1,
          blur: 2,
          color: "rgba(0, 0, 0, 0.85)"
        },
        {
          offsetX: 0,
          offsetY: 0,
          blur: 8,
          color: "rgba(81, 194, 255, 0.22)"
        }
      ],
      previewParagraphs: [
        "记录编号 07：城区照明在凌晨三点十七分同时熄灭。",
        "唯一仍在运转的终端，反复显示着同一句尚未解密的留言。",
        "我按下确认键，冷光里终于浮出了一个名字。"
      ]
    }
  }
];
const paragraphSharp = {
  version: version$5,
  name: name$5,
  canvas: canvas$5,
  elements: elements$5
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$5,
  default: paragraphSharp,
  elements: elements$5,
  name: name$5,
  version: version$5
}, Symbol.toStringTag, { value: "Module" }));
const version$4 = 2;
const name$4 = "段落";
const canvas$4 = {
  width: 1920,
  height: 1080
};
const elements$4 = [
  {
    id: "background-mask",
    refId: "background-mask",
    type: "background-mask",
    name: "背景遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "#000000",
      opacity: 70
    }
  },
  {
    id: "paragraph",
    refId: "paragraph",
    type: "paragraph",
    name: "整屏段落",
    rect: {
      x: 384,
      y: 80,
      w: 1152,
      h: 1e3
    },
    anchor: "t",
    style: {
      fontSize: 28,
      fontWeight: 400,
      color: "#ffffff",
      fill: "transparent",
      borderColor: "transparent",
      borderWidth: 0,
      radius: 0,
      backdropBlur: 0,
      letterSpacing: 0,
      textAlign: "left",
      opacity: 100
    },
    props: {
      layoutMode: "native-fluid",
      gap: 30,
      inactiveColor: "#808080",
      textPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      backgroundImage: "",
      backgroundImageFit: "cover",
      backgroundImagePosition: "center",
      backgroundImageRepeat: "no-repeat",
      linearGradient: {
        enabled: false,
        angle: 180,
        startColor: "transparent",
        endColor: "transparent"
      },
      frameDecoration: {
        borderTop: "",
        borderRight: "",
        borderBottom: "",
        borderLeft: "",
        borderRadius: "",
        boxShadow: ""
      },
      textShadows: [],
      previewParagraphs: [
        "有些故事，会从一个看似普通的夜晚开始。",
        "而我们，刚好站在它的入口。",
        "那一刻，远处的钟声正好响起。"
      ]
    }
  }
];
const paragraph = {
  version: version$4,
  name: name$4,
  canvas: canvas$4,
  elements: elements$4
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$4,
  default: paragraph,
  elements: elements$4,
  name: name$4,
  version: version$4
}, Symbol.toStringTag, { value: "Module" }));
const version$3 = 1;
const name$3 = "存档读档";
const canvas$3 = {
  width: 1920,
  height: 1080
};
const elements$3 = [
  {
    id: "mask",
    type: "rect",
    name: "遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "rgba(8, 13, 20, 0.86)",
      radius: 0,
      backdropBlur: 28,
      opacity: 100,
      customCss: "background-image: radial-gradient(ellipse 120% 80% at 20% 0%, rgba(40,70,100,0.35), transparent 60%);"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 420,
        delayMs: 0
      },
      exit: {
        preset: "fade",
        durationMs: 260,
        delayMs: 100
      }
    }
  },
  {
    id: "eyebrow",
    type: "text",
    name: "文字_Save",
    rect: {
      x: 120,
      y: 96,
      w: 500,
      h: 24
    },
    anchor: "tl",
    style: {
      fontSize: 15,
      color: "#7fd4c8",
      letterSpacing: 5,
      fontFamily: '"JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace',
      opacity: 100,
      customCss: "text-transform: uppercase; text-shadow: 0 0 12px rgba(127,212,200,0.4);"
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 360,
        delayMs: 80
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 60
      }
    },
    props: {
      text: "Save / Load"
    }
  },
  {
    id: "title",
    type: "text",
    name: "文字_保存存档",
    rect: {
      x: 118,
      y: 122,
      w: 800,
      h: 80
    },
    anchor: "tl",
    style: {
      fontSize: 56,
      color: "#e8edf2",
      letterSpacing: 2,
      fontFamily: '"M PLUS Rounded 1c", "Plus Jakarta Sans", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif',
      opacity: 100
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 460,
        delayMs: 120
      },
      exit: {
        preset: "sink",
        durationMs: 220,
        delayMs: 40
      }
    },
    props: {
      text: "存档 / 读档"
    }
  },
  {
    id: "title-accent",
    type: "rect",
    name: "玉青短横线",
    rect: {
      x: 120,
      y: 212,
      w: 72,
      h: 4
    },
    anchor: "tl",
    style: {
      fill: "#7fd4c8",
      radius: 999,
      opacity: 100,
      customCss: "background-image: linear-gradient(90deg, #7fd4c8, #5eb8d4); box-shadow: 0 0 14px rgba(94,184,212,0.5);"
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 420,
        delayMs: 190
      },
      exit: {
        preset: "shrink",
        durationMs: 180,
        delayMs: 20
      }
    }
  },
  {
    id: "close-btn",
    type: "button",
    name: "按钮_关闭当前界面",
    rect: {
      x: 1748,
      y: 118,
      w: 52,
      h: 52
    },
    anchor: "tr",
    style: {
      fontSize: 22,
      color: "#dce8f2",
      fill: "rgba(120, 150, 180, 0.06)",
      borderColor: "rgba(150, 180, 210, 0.14)",
      borderWidth: 1,
      radius: 12,
      backdropBlur: 10,
      opacity: 100,
      customCss: "box-shadow: inset 0 1px 0 rgba(200,225,245,0.06), 0 4px 14px rgba(4,10,18,0.4); transition: transform 180ms cubic-bezier(0.22,1,0.36,1), background 180ms, border-color 180ms, box-shadow 180ms; &:hover { background: rgba(127,212,200,0.12); border-color: rgba(127,212,200,0.55); box-shadow: 0 0 22px rgba(94,184,212,0.3); transform: rotate(90deg); }"
    },
    animation: {
      enter: {
        preset: "scale",
        durationMs: 320,
        delayMs: 200
      },
      exit: {
        preset: "shrink",
        durationMs: 180,
        delayMs: 0
      }
    },
    props: {
      text: "✕"
    },
    events: {
      onClick: {
        type: "ui.close"
      }
    }
  },
  {
    id: "save-grid",
    type: "save-grid",
    name: "存档格子",
    rect: {
      x: 120,
      y: 264,
      w: 1680,
      h: 720
    },
    anchor: "c",
    style: {
      radius: 16,
      opacity: 100
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 520,
        delayMs: 240
      },
      exit: {
        preset: "sink",
        durationMs: 260,
        delayMs: 0
      }
    },
    props: {
      cols: 3,
      rows: 2,
      gap: 28,
      showTime: true,
      showText: true,
      mode: "auto",
      confirmOverwrite: true,
      totalSlots: 30
    }
  }
];
const saveScreen = {
  version: version$3,
  name: name$3,
  canvas: canvas$3,
  elements: elements$3
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$3,
  default: saveScreen,
  elements: elements$3,
  name: name$3,
  version: version$3
}, Symbol.toStringTag, { value: "Module" }));
const version$2 = 2;
const name$2 = "系统设置";
const canvas$2 = {
  width: 1920,
  height: 1080
};
const elements$2 = [
  {
    id: "mask",
    type: "rect",
    name: "遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "rgba(8, 13, 20, 0.86)",
      radius: 0,
      backdropBlur: 28,
      opacity: 100,
      customCss: "background-image: radial-gradient(ellipse 120% 80% at 20% 0%, rgba(40,70,100,0.35), transparent 60%);"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 420,
        delayMs: 0
      },
      exit: {
        preset: "fade",
        durationMs: 260,
        delayMs: 100
      }
    }
  },
  {
    id: "eyebrow",
    type: "text",
    name: "文字_Settings",
    rect: {
      x: 120,
      y: 96,
      w: 500,
      h: 24
    },
    anchor: "tl",
    style: {
      fontSize: 15,
      color: "#7fd4c8",
      letterSpacing: 5,
      fontFamily: '"JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace',
      opacity: 100,
      customCss: "text-transform: uppercase; text-shadow: 0 0 12px rgba(127,212,200,0.4);"
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 360,
        delayMs: 80
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 60
      }
    },
    props: {
      text: "Settings"
    }
  },
  {
    id: "title",
    type: "text",
    name: "文字_系统设置",
    rect: {
      x: 118,
      y: 122,
      w: 800,
      h: 80
    },
    anchor: "tl",
    style: {
      fontSize: 56,
      color: "#e8edf2",
      letterSpacing: 2,
      fontFamily: '"M PLUS Rounded 1c", "Plus Jakarta Sans", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif',
      opacity: 100
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 460,
        delayMs: 120
      },
      exit: {
        preset: "sink",
        durationMs: 220,
        delayMs: 40
      }
    },
    props: {
      text: "系统设置"
    }
  },
  {
    id: "title-accent",
    type: "rect",
    name: "玉青短横线",
    rect: {
      x: 120,
      y: 212,
      w: 72,
      h: 4
    },
    anchor: "t",
    style: {
      fill: "#7fd4c8",
      radius: 999,
      opacity: 100,
      customCss: "background-image: linear-gradient(90deg, #7fd4c8, #5eb8d4); box-shadow: 0 0 14px rgba(94,184,212,0.5);"
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 420,
        delayMs: 190
      },
      exit: {
        preset: "shrink",
        durationMs: 180,
        delayMs: 20
      }
    }
  },
  {
    id: "close-btn",
    type: "button",
    name: "按钮_关闭当前界面",
    rect: {
      x: 1748,
      y: 118,
      w: 52,
      h: 52
    },
    anchor: "tr",
    style: {
      fontSize: 22,
      color: "#dce8f2",
      fill: "rgba(120, 150, 180, 0.06)",
      borderColor: "rgba(150, 180, 210, 0.14)",
      borderWidth: 1,
      radius: 10,
      backdropBlur: 10,
      opacity: 100,
      customCss: "box-shadow: inset 0 1px 0 rgba(200,225,245,0.06), 0 4px 14px rgba(4,10,18,0.4); transition: transform 180ms cubic-bezier(0.22,1,0.36,1), background 180ms, border-color 180ms, box-shadow 180ms; &:hover { background: rgba(127,212,200,0.12); border-color: rgba(127,212,200,0.55); box-shadow: 0 0 22px rgba(94,184,212,0.3); transform: rotate(90deg); }"
    },
    animation: {
      enter: {
        preset: "scale",
        durationMs: 320,
        delayMs: 200
      },
      exit: {
        preset: "shrink",
        durationMs: 180,
        delayMs: 0
      }
    },
    props: {
      text: "✕"
    },
    events: {
      onClick: {
        type: "ui.close"
      }
    }
  },
  {
    id: "settings-tabs",
    type: "tabs",
    name: "页签_设置分组",
    rect: {
      x: 210,
      y: 264,
      w: 1500,
      h: 40
    },
    anchor: "tl",
    style: {
      fontSize: 15,
      color: "#e8edf2",
      radius: 8,
      opacity: 100,
      fontFamily: '"Plus Jakarta Sans", "Noto Sans SC", "PingFang SC", sans-serif'
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 380,
        delayMs: 220
      },
      exit: {
        preset: "sink",
        durationMs: 200,
        delayMs: 0
      }
    },
    props: {
      tabs: [
        "音量",
        "文本与播放",
        "显示"
      ],
      activeIndex: 0,
      gap: 8
    }
  },
  {
    id: "vol-card",
    type: "rect",
    name: "矩形_音量卡片",
    rect: {
      x: 210,
      y: 314,
      w: 1500,
      h: 316
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "rise",
        durationMs: 340,
        delayMs: 80
      },
      exit: {
        preset: "sink",
        durationMs: 200,
        delayMs: 0
      }
    },
    style: {
      fill: "rgba(120,150,180,0.06)",
      radius: 12,
      opacity: 100
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "vol-title",
    type: "text",
    name: "文字_音量",
    rect: {
      x: 250,
      y: 334,
      w: 200,
      h: 32
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 280,
        delayMs: 130
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 20,
      color: "#e8edf2",
      letterSpacing: 4,
      opacity: 100
    },
    props: {
      text: "音量"
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "vol-master-label",
    type: "text",
    name: "文字_主音量",
    rect: {
      x: 250,
      y: 382,
      w: 320,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 300,
        delayMs: 180
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.82)",
      opacity: 100
    },
    props: {
      text: "主音量"
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "vol-master-slider",
    type: "slider",
    name: "滑块_主音量",
    rect: {
      x: 630,
      y: 382,
      w: 1040,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 200
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      opacity: 100
    },
    props: {
      bind: "masterVolume",
      value: 80,
      showValue: true
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "vol-bgm-label",
    type: "text",
    name: "文字_背景音乐",
    rect: {
      x: 250,
      y: 444,
      w: 320,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 300,
        delayMs: 230
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.82)",
      opacity: 100
    },
    props: {
      text: "背景音乐"
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "vol-bgm-slider",
    type: "slider",
    name: "滑块_背景音乐音量",
    rect: {
      x: 630,
      y: 444,
      w: 1040,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 250
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      opacity: 100
    },
    props: {
      bind: "bgmVolume",
      value: 80,
      showValue: true
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "vol-se-label",
    type: "text",
    name: "文字_音效",
    rect: {
      x: 250,
      y: 506,
      w: 320,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 300,
        delayMs: 280
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.82)",
      opacity: 100
    },
    props: {
      text: "音效"
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "vol-se-slider",
    type: "slider",
    name: "滑块_音效音量",
    rect: {
      x: 630,
      y: 506,
      w: 1040,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 300
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      opacity: 100
    },
    props: {
      bind: "seVolume",
      value: 80,
      showValue: true
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "vol-voice-label",
    type: "text",
    name: "文字_语音",
    rect: {
      x: 250,
      y: 568,
      w: 320,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 300,
        delayMs: 330
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.82)",
      opacity: 100
    },
    props: {
      text: "语音"
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "vol-voice-slider",
    type: "slider",
    name: "滑块_语音音量",
    rect: {
      x: 630,
      y: 568,
      w: 1040,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 350
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      opacity: 100
    },
    props: {
      bind: "voiceVolume",
      value: 80,
      showValue: true
    },
    tab: {
      of: "settings-tabs",
      index: 0
    }
  },
  {
    id: "text-card",
    type: "rect",
    name: "矩形_文本与播放卡片",
    rect: {
      x: 210,
      y: 314,
      w: 1500,
      h: 310
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "rise",
        durationMs: 340,
        delayMs: 80
      },
      exit: {
        preset: "sink",
        durationMs: 200,
        delayMs: 0
      }
    },
    style: {
      fill: "rgba(120,150,180,0.06)",
      radius: 12,
      opacity: 100
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "text-title",
    type: "text",
    name: "文字_文本与播放",
    rect: {
      x: 250,
      y: 334,
      w: 240,
      h: 32
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 280,
        delayMs: 130
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 20,
      color: "#e8edf2",
      letterSpacing: 4,
      opacity: 100
    },
    props: {
      text: "文本与播放"
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "speed-label",
    type: "text",
    name: "文字_文字速度",
    rect: {
      x: 250,
      y: 380,
      w: 320,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 300,
        delayMs: 180
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.82)",
      opacity: 100
    },
    props: {
      text: "文字速度"
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "speed-slider",
    type: "slider",
    name: "滑块_文字速度",
    rect: {
      x: 630,
      y: 380,
      w: 1040,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 200
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      opacity: 100
    },
    props: {
      bind: "textSpeed",
      value: 50,
      showValue: true
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "auto-speed-label",
    type: "text",
    name: "文字_自动模式速度",
    rect: {
      x: 250,
      y: 442,
      w: 320,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 300,
        delayMs: 230
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.82)",
      opacity: 100
    },
    props: {
      text: "自动模式速度"
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "auto-speed-slider",
    type: "slider",
    name: "滑块_自动模式速度",
    rect: {
      x: 630,
      y: 442,
      w: 1040,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 250
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      opacity: 100
    },
    props: {
      bind: "autoModeTextSpeed",
      value: 50,
      showValue: true
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "skip-label",
    type: "text",
    name: "文字_跳过模式",
    rect: {
      x: 250,
      y: 504,
      w: 320,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 300,
        delayMs: 280
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.82)",
      opacity: 100
    },
    props: {
      text: "跳过模式"
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "skip-select",
    type: "select",
    name: "下拉_跳过模式",
    rect: {
      x: 630,
      y: 502,
      w: 320,
      h: 48
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 300
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "#e8edf2",
      radius: 6,
      opacity: 100
    },
    props: {
      options: [
        "仅跳过已读",
        "跳过全部"
      ],
      value: 0,
      bind: "skipMode"
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "stopvoice-label",
    type: "text",
    name: "文字_下句中断语音",
    rect: {
      x: 250,
      y: 562,
      w: 320,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 300,
        delayMs: 330
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.82)",
      opacity: 100
    },
    props: {
      text: "下句中断语音"
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "stopvoice-switch",
    type: "switch",
    name: "开关_下句中断语音",
    rect: {
      x: 630,
      y: 560,
      w: 96,
      h: 48
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "scale",
        durationMs: 280,
        delayMs: 350
      },
      exit: {
        preset: "shrink",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      opacity: 100
    },
    props: {
      bind: "stopVoiceOnNextDialogue",
      value: true
    },
    tab: {
      of: "settings-tabs",
      index: 1
    }
  },
  {
    id: "display-card",
    type: "rect",
    name: "矩形_显示卡片",
    refId: "display-card",
    rect: {
      x: 210,
      y: 314,
      w: 1500,
      h: 120
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "rise",
        durationMs: 340,
        delayMs: 80
      },
      exit: {
        preset: "sink",
        durationMs: 200,
        delayMs: 0
      }
    },
    style: {
      fill: "rgba(120,150,180,0.06)",
      radius: 12,
      opacity: 100
    },
    tab: {
      of: "settings-tabs",
      index: 2
    }
  },
  {
    id: "display-title",
    type: "text",
    name: "文字_显示",
    refId: "display-title",
    rect: {
      x: 250,
      y: 332,
      w: 200,
      h: 30
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "fade",
        durationMs: 280,
        delayMs: 130
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 20,
      color: "#e8edf2",
      letterSpacing: 4,
      opacity: 100
    },
    props: {
      text: "显示"
    },
    tab: {
      of: "settings-tabs",
      index: 2
    }
  },
  {
    id: "display-label",
    type: "text",
    name: "文字_全屏",
    refId: "display-label",
    rect: {
      x: 250,
      y: 376,
      w: 320,
      h: 44
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 300,
        delayMs: 180
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.82)",
      opacity: 100
    },
    props: {
      text: "全屏"
    },
    tab: {
      of: "settings-tabs",
      index: 2
    }
  },
  {
    id: "display-switch",
    type: "switch",
    name: "开关_全屏",
    refId: "display-switch",
    rect: {
      x: 630,
      y: 374,
      w: 96,
      h: 48
    },
    anchor: "t",
    animation: {
      enter: {
        preset: "scale",
        durationMs: 280,
        delayMs: 200
      },
      exit: {
        preset: "shrink",
        durationMs: 160,
        delayMs: 0
      }
    },
    style: {
      opacity: 100
    },
    props: {
      bind: "fullscreen",
      value: false
    },
    tab: {
      of: "settings-tabs",
      index: 2
    }
  },
  {
    id: "reset-btn",
    type: "button",
    name: "按钮_恢复默认",
    refId: "reset-btn",
    rect: {
      x: 210,
      y: 1014,
      w: 168,
      h: 52
    },
    anchor: "b",
    animation: {
      enter: {
        preset: "scale",
        durationMs: 300,
        delayMs: 300
      },
      exit: {
        preset: "shrink",
        durationMs: 180,
        delayMs: 0
      }
    },
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.85)",
      fill: "rgba(120,150,180,0.06)",
      borderColor: "rgba(220,232,242,0.25)",
      borderWidth: 1,
      radius: 6,
      letterSpacing: 4,
      opacity: 100
    },
    props: {
      text: "恢复默认"
    },
    events: {
      onClick: {
        type: "config.reset"
      }
    }
  },
  {
    id: "button-mrvvgpma-1",
    type: "button",
    name: "按钮_退出游戏",
    rect: {
      x: 1350,
      y: 1014,
      w: 168,
      h: 52
    },
    anchor: "b",
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.85)",
      fill: "rgba(120,150,180,0.06)",
      borderColor: "rgba(220,232,242,0.25)",
      borderWidth: 1,
      radius: 6,
      letterSpacing: 4,
      opacity: 100
    },
    animation: {
      enter: {
        preset: "scale",
        durationMs: 300,
        delayMs: 300
      },
      exit: {
        preset: "shrink",
        durationMs: 180,
        delayMs: 0
      }
    },
    props: {
      text: "退出游戏"
    },
    events: {
      onClick: {
        type: "system.exit"
      }
    }
  },
  {
    id: "button-mrvvhi2h-2",
    type: "button",
    name: "按钮_返回标题",
    rect: {
      x: 1542,
      y: 1014,
      w: 168,
      h: 52
    },
    anchor: "b",
    style: {
      fontSize: 18,
      color: "rgba(220,232,242,0.85)",
      fill: "rgba(120,150,180,0.06)",
      borderColor: "rgba(220,232,242,0.25)",
      borderWidth: 1,
      radius: 6,
      letterSpacing: 4,
      opacity: 100
    },
    animation: {
      enter: {
        preset: "scale",
        durationMs: 300,
        delayMs: 300
      },
      exit: {
        preset: "shrink",
        durationMs: 180,
        delayMs: 0
      }
    },
    props: {
      text: "返回标题画面"
    },
    events: {
      onClick: {
        type: "system.openSlot",
        slot: "title"
      }
    }
  }
];
const settingsScreen = {
  version: version$2,
  name: name$2,
  canvas: canvas$2,
  elements: elements$2
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$2,
  default: settingsScreen,
  elements: elements$2,
  name: name$2,
  version: version$2
}, Symbol.toStringTag, { value: "Module" }));
const version$1 = 1;
const name$1 = "标题画面";
const canvas$1 = {
  width: 1920,
  height: 1080
};
const elements$1 = [
  {
    id: "vignette",
    type: "rect",
    name: "矩形_暗角遮罩",
    rect: {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080
    },
    anchor: "c",
    style: {
      fill: "transparent",
      radius: 0,
      opacity: 100,
      customCss: "background: radial-gradient(ellipse 70% 80% at 0% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%), radial-gradient(ellipse 80% 60% at 100% 100%, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.22) 100%); pointer-events: none;"
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 600,
        delayMs: 0
      },
      exit: {
        preset: "fade",
        durationMs: 260,
        delayMs: 160
      }
    }
  },
  {
    id: "top-line",
    type: "line",
    name: "线条_顶部细线",
    rect: {
      x: 48,
      y: 40,
      w: 1824,
      h: 12
    },
    anchor: "t",
    style: {
      color: "rgba(255,255,255,0.14)",
      opacity: 60
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 500,
        delayMs: 60
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 100
      }
    },
    props: {
      thickness: 1,
      lineStyle: "solid"
    }
  },
  {
    id: "version-tag",
    type: "text",
    name: "文字_版本号",
    rect: {
      x: 1536,
      y: 56,
      w: 320,
      h: 24
    },
    anchor: "tr",
    style: {
      fontSize: 10,
      color: "rgba(245,245,247,0.38)",
      letterSpacing: 6,
      textAlign: "right",
      opacity: 100,
      customCss: 'text-transform: uppercase; font-family: "JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace;'
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 320,
        delayMs: 140
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 100
      }
    },
    props: {
      text: "AVG · ENGINE"
    }
  },
  {
    id: "studio-tag",
    type: "text",
    name: "文字_工作室标签",
    rect: {
      x: 80,
      y: 984,
      w: 400,
      h: 24
    },
    anchor: "bl",
    style: {
      fontSize: 10,
      color: "#d4a574",
      letterSpacing: 7,
      opacity: 100,
      customCss: 'text-transform: uppercase; font-family: "JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace;'
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 360,
        delayMs: 220
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 80
      }
    },
    props: {
      text: "— LetsGal Studio"
    }
  },
  {
    id: "copyright",
    type: "text",
    name: "文字_版权",
    rect: {
      x: 1536,
      y: 984,
      w: 320,
      h: 24
    },
    anchor: "br",
    style: {
      fontSize: 10,
      color: "rgba(245,245,247,0.38)",
      letterSpacing: 4,
      textAlign: "right",
      opacity: 70,
      customCss: 'text-transform: uppercase; font-family: "JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace;'
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 360,
        delayMs: 260
      },
      exit: {
        preset: "fade",
        durationMs: 160,
        delayMs: 80
      }
    },
    props: {
      text: "© 2026"
    }
  },
  {
    id: "menu-num-1",
    type: "text",
    name: "文字_编号01",
    rect: {
      x: 96,
      y: 424,
      w: 32,
      h: 32
    },
    anchor: "l",
    style: {
      fontSize: 14,
      color: "rgba(245,245,247,0.38)",
      letterSpacing: 3,
      fontWeight: 600,
      opacity: 100,
      customCss: 'font-family: "JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace;'
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 260,
        delayMs: 180
      },
      exit: {
        preset: "fade",
        durationMs: 140,
        delayMs: 80
      }
    },
    props: {
      text: "01"
    }
  },
  {
    id: "menu-start",
    type: "button",
    name: "按钮_开始游戏",
    rect: {
      x: 144,
      y: 400,
      w: 520,
      h: 80
    },
    anchor: "l",
    style: {
      fontSize: 56,
      color: "#f5f5f7",
      fill: "transparent",
      borderWidth: 0,
      fontWeight: 600,
      letterSpacing: 1,
      textAlign: "left",
      opacity: 100,
      customCss: 'font-family: "Plus Jakarta Sans", "M PLUS Rounded 1c", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif; justify-content: flex-start; text-shadow: 0 2px 24px rgba(0,0,0,0.8); transition: color .18s cubic-bezier(0.22,1,0.36,1), transform .18s cubic-bezier(0.22,1,0.36,1); &:hover { color: #d4a574; transform: translateX(10px); }'
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 420,
        delayMs: 200
      },
      exit: {
        preset: "slide-left",
        durationMs: 200,
        delayMs: 80
      }
    },
    props: {
      text: "开始游戏"
    },
    events: {
      onClick: {
        type: "system.newGame"
      }
    }
  },
  {
    id: "menu-num-2",
    type: "text",
    name: "文字_编号02",
    rect: {
      x: 96,
      y: 520,
      w: 32,
      h: 32
    },
    anchor: "l",
    style: {
      fontSize: 14,
      color: "rgba(245,245,247,0.38)",
      letterSpacing: 3,
      fontWeight: 600,
      opacity: 100,
      customCss: 'font-family: "JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace;'
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 260,
        delayMs: 250
      },
      exit: {
        preset: "fade",
        durationMs: 140,
        delayMs: 60
      }
    },
    props: {
      text: "02"
    }
  },
  {
    id: "menu-load",
    type: "button",
    name: "按钮_读取存档",
    rect: {
      x: 144,
      y: 496,
      w: 520,
      h: 80
    },
    anchor: "l",
    style: {
      fontSize: 56,
      color: "#f5f5f7",
      fill: "transparent",
      borderWidth: 0,
      fontWeight: 600,
      letterSpacing: 1,
      textAlign: "left",
      opacity: 100,
      customCss: 'font-family: "Plus Jakarta Sans", "M PLUS Rounded 1c", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif; justify-content: flex-start; text-shadow: 0 2px 24px rgba(0,0,0,0.8); transition: color .18s cubic-bezier(0.22,1,0.36,1), transform .18s cubic-bezier(0.22,1,0.36,1); &:hover { color: #d4a574; transform: translateX(10px); }'
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 420,
        delayMs: 270
      },
      exit: {
        preset: "slide-left",
        durationMs: 200,
        delayMs: 60
      }
    },
    props: {
      text: "读取存档"
    },
    events: {
      onClick: {
        type: "system.openSlot",
        slot: "load"
      }
    }
  },
  {
    id: "menu-num-3",
    type: "text",
    name: "文字_编号03",
    rect: {
      x: 96,
      y: 616,
      w: 32,
      h: 32
    },
    anchor: "l",
    style: {
      fontSize: 14,
      color: "rgba(245,245,247,0.38)",
      letterSpacing: 3,
      fontWeight: 600,
      opacity: 100,
      customCss: 'font-family: "JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace;'
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 260,
        delayMs: 320
      },
      exit: {
        preset: "fade",
        durationMs: 140,
        delayMs: 40
      }
    },
    props: {
      text: "03"
    }
  },
  {
    id: "menu-gallery",
    type: "button",
    name: "按钮_鉴赏",
    rect: {
      x: 144,
      y: 592,
      w: 520,
      h: 80
    },
    anchor: "l",
    style: {
      fontSize: 56,
      color: "#f5f5f7",
      fill: "transparent",
      borderWidth: 0,
      fontWeight: 600,
      letterSpacing: 1,
      textAlign: "left",
      opacity: 100,
      customCss: 'font-family: "Plus Jakarta Sans", "M PLUS Rounded 1c", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif; justify-content: flex-start; text-shadow: 0 2px 24px rgba(0,0,0,0.8); transition: color .18s cubic-bezier(0.22,1,0.36,1), transform .18s cubic-bezier(0.22,1,0.36,1); &:hover { color: #d4a574; transform: translateX(10px); }'
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 420,
        delayMs: 340
      },
      exit: {
        preset: "slide-left",
        durationMs: 200,
        delayMs: 40
      }
    },
    props: {
      text: "鉴赏"
    },
    events: {
      onClick: {
        type: "system.openSlot",
        slot: "gallery"
      }
    }
  },
  {
    id: "menu-num-4",
    type: "text",
    name: "文字_编号04",
    rect: {
      x: 96,
      y: 712,
      w: 32,
      h: 32
    },
    anchor: "l",
    style: {
      fontSize: 14,
      color: "rgba(245,245,247,0.38)",
      letterSpacing: 3,
      fontWeight: 600,
      opacity: 100,
      customCss: 'font-family: "JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace;'
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 260,
        delayMs: 390
      },
      exit: {
        preset: "fade",
        durationMs: 140,
        delayMs: 20
      }
    },
    props: {
      text: "04"
    }
  },
  {
    id: "menu-settings",
    type: "button",
    name: "按钮_设置",
    rect: {
      x: 144,
      y: 688,
      w: 520,
      h: 80
    },
    anchor: "l",
    style: {
      fontSize: 56,
      color: "#f5f5f7",
      fill: "transparent",
      borderWidth: 0,
      fontWeight: 600,
      letterSpacing: 1,
      textAlign: "left",
      opacity: 100,
      customCss: 'font-family: "Plus Jakarta Sans", "M PLUS Rounded 1c", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif; justify-content: flex-start; text-shadow: 0 2px 24px rgba(0,0,0,0.8); transition: color .18s cubic-bezier(0.22,1,0.36,1), transform .18s cubic-bezier(0.22,1,0.36,1); &:hover { color: #d4a574; transform: translateX(10px); }'
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 420,
        delayMs: 410
      },
      exit: {
        preset: "slide-left",
        durationMs: 200,
        delayMs: 20
      }
    },
    props: {
      text: "设置"
    },
    events: {
      onClick: {
        type: "system.openSlot",
        slot: "settings"
      }
    }
  },
  {
    id: "menu-num-5",
    type: "text",
    name: "文字_编号05",
    rect: {
      x: 96,
      y: 808,
      w: 32,
      h: 32
    },
    anchor: "l",
    style: {
      fontSize: 14,
      color: "rgba(245,245,247,0.38)",
      letterSpacing: 3,
      fontWeight: 600,
      opacity: 100,
      customCss: 'font-family: "JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace;'
    },
    animation: {
      enter: {
        preset: "fade",
        durationMs: 260,
        delayMs: 460
      },
      exit: {
        preset: "fade",
        durationMs: 140,
        delayMs: 0
      }
    },
    props: {
      text: "05"
    }
  },
  {
    id: "menu-exit",
    type: "button",
    name: "按钮_退出",
    rect: {
      x: 144,
      y: 784,
      w: 520,
      h: 80
    },
    anchor: "l",
    style: {
      fontSize: 56,
      color: "#f5f5f7",
      fill: "transparent",
      borderWidth: 0,
      fontWeight: 600,
      letterSpacing: 1,
      textAlign: "left",
      opacity: 100,
      customCss: 'font-family: "Plus Jakarta Sans", "M PLUS Rounded 1c", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif; justify-content: flex-start; text-shadow: 0 2px 24px rgba(0,0,0,0.8); transition: color .18s cubic-bezier(0.22,1,0.36,1), transform .18s cubic-bezier(0.22,1,0.36,1); &:hover { color: #d4a574; transform: translateX(10px); }'
    },
    animation: {
      enter: {
        preset: "slide-left",
        durationMs: 420,
        delayMs: 480
      },
      exit: {
        preset: "slide-left",
        durationMs: 200,
        delayMs: 0
      }
    },
    props: {
      text: "退出"
    },
    events: {
      onClick: {
        type: "system.exit"
      }
    }
  }
];
const titleScreen = {
  version: version$1,
  name: name$1,
  canvas: canvas$1,
  elements: elements$1
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas: canvas$1,
  default: titleScreen,
  elements: elements$1,
  name: name$1,
  version: version$1
}, Symbol.toStringTag, { value: "Module" }));
const version = 1;
const canvas = {
  width: 1920,
  height: 1080
};
const elements = [
  {
    id: "toolbar",
    type: "toolbar",
    rect: {
      x: 210,
      y: 1027,
      w: 1500,
      h: 48
    },
    anchor: "b",
    name: "对话工具栏",
    style: {
      fontSize: 18,
      color: "#e8edf2",
      fill: "#c6c695",
      borderColor: "rgba(127, 212, 200, 0.28)",
      borderWidth: 0,
      radius: 27,
      letterSpacing: 1,
      opacity: 100
    },
    animation: {
      enter: {
        preset: "rise",
        durationMs: 420,
        delayMs: 30
      },
      exit: {
        preset: "sink",
        durationMs: 220,
        delayMs: 0
      }
    },
    props: {
      items: [
        "skip",
        "auto",
        "save",
        "load",
        "quickSave",
        "quickLoad",
        "history",
        "settings",
        "hide"
      ],
      direction: "horizontal",
      align: "center",
      gap: 4,
      showLabels: true,
      accentColor: "#7fd4c8",
      showFill: false
    }
  }
];
const name = "对话工具栏";
const toolbar = {
  version,
  canvas,
  elements,
  name
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canvas,
  default: toolbar,
  elements,
  name,
  version
}, Symbol.toStringTag, { value: "Module" }));
const manifest = {
  id: "avg.internal.default-shell",
  name: "默认游戏壳",
  description: "标题/存档/历史/设置/工具栏及剧情选项、标准输入、消息弹层一体的默认游戏 UI。每个 UI 子模块都可单独替换。",
  author: "LetsGal Studio",
  version: "1.0.0",
  // 跟用户扩展同形态:vite build 出 dist/index.mjs,加载方按 manifest.entry 找。
  // 历史上(2026-05 前)这里写的是 "<internal>",当时 default-shell 走 TS
  // 源码直接 import 进 Studio renderer bundle 的路径;2026-05-15 全栈统一后
  // 走真正的 ESM bundle 加载链路,entry 也跟着规范化。
  entry: "dist/index.mjs",
  // SDK 契约当前停在 1.x(src/sdk/constants.ts 的 SDK_VERSION = "1.0.0");
  // 历史上这里误写成 ">=2.0.0",2026-06 加载时兼容校验落地前理顺为 1.x 声明。
  sdkVersion: ">=1.0.0",
  // 2026-05 Internal Extension Points:DefaultShell 是引擎内置兜底扩展,
  // 不可禁用、不可卸载。仅 avg.internal.* namespace 可声明 builtin: true。
  // 详见 /docs/plans/2026-05-14-internal-extension-points-design.md §5.1
  builtin: true,
  contributes: {
    dialogueBoxStyles: [
      {
        id: "landing",
        name: "默认对话框",
        description: "LetsGal 的唯一系统对话框基线。项目未选择其它扩展样式时使用。",
        visualUI: "dialogue-box",
        dialogueBox: {}
      }
    ]
  }
  // 静态 manifest.actions 字段已在 2026-05 设计中废弃,扩展贡献的 action
  // 通过 onRegister 阶段调 ctx.input.registerAction(...) 注册即可。
};
const tokens = {
  // ---- color ----
  bgOverlay: "rgba(11, 13, 16, 0.82)",
  bgOverlayStrong: "rgba(11, 13, 16, 0.92)",
  bgSurface: "rgba(255, 255, 255, 0.04)",
  bgElevated: "rgba(255, 255, 255, 0.07)",
  bgSunken: "rgba(0, 0, 0, 0.28)",
  borderSubtle: "rgba(255, 255, 255, 0.08)",
  borderRegular: "rgba(255, 255, 255, 0.14)",
  borderStrong: "rgba(255, 255, 255, 0.24)",
  borderAccent: "rgba(212, 165, 116, 0.55)",
  textPrimary: "#f5f5f7",
  textMuted: "rgba(245, 245, 247, 0.62)",
  textFaint: "rgba(245, 245, 247, 0.38)",
  textOnAccent: "#1a1410",
  accent: "#d4a574",
  accentSoft: "rgba(212, 165, 116, 0.16)",
  accentGlow: "rgba(212, 165, 116, 0.32)",
  danger: "#e0635a",
  dangerSoft: "rgba(224, 99, 90, 0.14)",
  // ---- typography ----
  // 风格:现代圆润黑体(geometric rounded sans),不要衬线/宋体
  // - fontDisplay  : 大字标题用,粗+圆润,系统圆润字体优先
  // - fontUI       : 正文/按钮用,中粗黑体
  // - fontMono     : 数字/timestamp,等宽
  fontDisplay: '"Plus Jakarta Sans", "M PLUS Rounded 1c", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif',
  fontUI: '"Plus Jakarta Sans", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "HarmonyOS Sans", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  fontMono: '"JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace',
  // ---- motion ----
  // quint-out 是公认最 silky 的 UI 缓动之一
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeIn: "cubic-bezier(0.64, 0, 0.78, 0)",
  // 2026-05 提速:从 180/280/420 收紧到 140/220/320。
  // 原值整体偏慢一档,玩家反馈"重、迟钝"。新值与 Vercel/Linear 这类
  // 现代 UI 的节奏对齐,同时保留 quint-out 的丝滑感。
  durFast: 140,
  durBase: 220,
  durSlow: 320,
  // ---- spacing & radius ----
  radiusSm: 6,
  radiusMd: 10,
  radiusLg: 16,
  radiusPill: 999
};
const SHARED_STYLE_ID = "avg-default-shell-shared-style";
function ensureSharedStyle() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SHARED_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = SHARED_STYLE_ID;
  style.textContent = `
    /* overlay:只动 opacity,backdrop-filter 用 inline 写死避免合成层重建闪烁 */
    @keyframes avg-overlay-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes avg-overlay-out {
      from { opacity: 1; }
      to   { opacity: 0; }
    }
    @keyframes avg-content-rise {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes avg-content-fall {
      from { opacity: 1; transform: translateY(0); }
      to   { opacity: 0; transform: translateY(8px); }
    }
    @keyframes avg-stagger-rise {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes avg-title-reveal {
      from {
        opacity: 0;
        transform: translateY(18px);
        letter-spacing: 0.04em;
        filter: blur(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
        letter-spacing: 0.02em;
        filter: blur(0);
      }
    }
    @keyframes avg-page-slide-in-right {
      from { opacity: 0; transform: translateX(24px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes avg-page-slide-in-left {
      from { opacity: 0; transform: translateX(-24px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes avg-pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(212, 165, 116, 0); }
      50%      { box-shadow: 0 0 0 6px rgba(212, 165, 116, 0.06); }
    }
    @keyframes avg-row-rise {
      from { opacity: 0; transform: translateY(12px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes avg-card-rise {
      from { opacity: 0; transform: translateY(20px) scale(0.96); filter: blur(4px); }
      to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }
    @keyframes avg-header-slide {
      from { opacity: 0; transform: translateX(-16px); filter: blur(4px); }
      to   { opacity: 1; transform: translateX(0); filter: blur(0); }
    }
    @keyframes avg-line-expand {
      from { transform: scaleX(0); opacity: 0; }
      to   { transform: scaleX(1); opacity: 1; }
    }
    /* 工具栏按钮 active 态呼吸:用于标注当前处于 auto/skip 模式。
       双 keyframe 周期 2.4s,opacity + box-shadow 同步呼吸,
       动效柔和不抢戏。 */
    @keyframes avg-toolbar-active-breath {
      0%, 100% {
        opacity: 0.85;
        box-shadow: 0 0 0 0 rgba(212, 165, 116, 0.0);
      }
      50% {
        opacity: 1;
        box-shadow: 0 0 18px 2px rgba(212, 165, 116, 0.35);
      }
    }

    .avg-shell-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
    .avg-shell-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .avg-shell-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.08);
      border-radius: 999px;
      transition: background 220ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .avg-shell-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.18);
    }

    @media (prefers-reduced-motion: reduce) {
      [class*="avg-anim"] { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}
ensureSharedStyle();
function usePressable() {
  const [pressed, setPressed] = useState(false);
  const pressedAtRef = useRef(0);
  const releaseTimerRef = useRef(null);
  const release = useCallback(() => {
    if (releaseTimerRef.current !== null) return;
    const elapsed = Date.now() - pressedAtRef.current;
    const minVisible = 80;
    if (elapsed >= minVisible) {
      setPressed(false);
    } else {
      releaseTimerRef.current = window.setTimeout(() => {
        releaseTimerRef.current = null;
        setPressed(false);
      }, minVisible - elapsed);
    }
  }, []);
  const onPointerDown = useCallback(() => {
    if (releaseTimerRef.current !== null) {
      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }
    pressedAtRef.current = Date.now();
    setPressed(true);
  }, []);
  useEffect(() => {
    if (!pressed) return;
    const onUp = () => release();
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [pressed, release]);
  return {
    pressed,
    handlers: {
      onPointerDown,
      onPointerLeave: release
    }
  };
}
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __publicField$5 = (obj, key, value) => __defNormalProp$5(obj, key + "", value);
const MENU_DEFS = [
  { key: "start", settingKey: "startLabel", defaultLabel: "开始游戏" },
  { key: "load", settingKey: "loadLabel", defaultLabel: "读取存档" },
  { key: "gallery", settingKey: "galleryLabel", defaultLabel: "鉴赏" },
  { key: "settings", settingKey: "settingsLabel", defaultLabel: "设置" },
  { key: "exit", settingKey: "exitLabel", defaultLabel: "退出" }
];
const TitleScreenComponent = () => {
  const ctx = useExtensionContext();
  const showGallery = ctx.settings.get("showGallery") ?? true;
  const menuItems = MENU_DEFS.filter(
    (d) => d.key !== "gallery" || showGallery
  ).map((d) => {
    const v = (ctx.settings.get(d.settingKey) ?? "").trim();
    return { key: d.key, label: v || d.defaultLabel };
  });
  const [leaving, setLeaving] = useState(false);
  const [hoverKey, setHoverKey] = useState(null);
  const triggerLeave = (after) => {
    setLeaving(true);
    window.setTimeout(after, tokens.durBase);
  };
  const onItem = (key) => {
    if (key === "start") {
      triggerLeave(() => ctx.ui.hide("title-screen"));
    } else if (key === "load") {
      void ctx.system.invoke(INTERNAL_SYSTEM_SLOT.Load, { mode: "load", source: "title" });
    } else if (key === "gallery") {
      void ctx.system.invoke(INTERNAL_SYSTEM_SLOT.Gallery);
    } else if (key === "settings") {
      void ctx.system.invoke(INTERNAL_SYSTEM_SLOT.Settings);
    } else if (key === "exit") {
      triggerLeave(() => ctx.game.exit());
    }
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const visible = mounted && !leaving;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        backgroundColor: "transparent",
        color: tokens.textPrimary,
        fontFamily: tokens.fontUI,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transition: `opacity ${tokens.durBase}ms ${tokens.easeOut}`
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              background: `
            radial-gradient(ellipse 70% 80% at 0% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%),
            radial-gradient(ellipse 80% 60% at 100% 100%, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0) 60%),
            linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.22) 100%)
          `,
              pointerEvents: "none",
              opacity: visible ? 1 : 0,
              transition: `opacity ${tokens.durSlow}ms ${tokens.easeOut}`
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 40,
              left: "50%",
              height: 1,
              background: `linear-gradient(90deg, transparent 0%, ${tokens.borderRegular} 30%, ${tokens.borderRegular} 70%, transparent 100%)`,
              width: visible ? "calc(100% - 96px)" : 0,
              transform: "translateX(-50%)",
              transition: `width ${tokens.durSlow}ms ${tokens.easeOut} 50ms`,
              opacity: 0.6
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 56,
              right: 64,
              fontFamily: tokens.fontMono,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: tokens.textFaint,
              opacity: visible ? 1 : 0,
              transition: `opacity ${tokens.durSlow}ms ${tokens.easeOut} 140ms`
            },
            children: "AVG · ENGINE"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 48,
              left: 80,
              fontFamily: tokens.fontMono,
              fontSize: 10,
              letterSpacing: "0.40em",
              textTransform: "uppercase",
              color: tokens.accent,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(6px)",
              transition: `all ${tokens.durSlow}ms ${tokens.easeOut} 130ms`
            },
            children: "— LetsGal Studio"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 48,
              right: 64,
              fontFamily: tokens.fontMono,
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: tokens.textFaint,
              opacity: visible ? 0.7 : 0,
              transition: `opacity ${tokens.durSlow}ms ${tokens.easeOut} 160ms`
            },
            children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear()
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "nav",
          {
            "aria-label": "主菜单",
            style: {
              position: "absolute",
              left: 96,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 8
            },
            children: menuItems.map((item, idx) => /* @__PURE__ */ jsx(
              TitleMenuButton,
              {
                index: idx,
                label: item.label,
                isHover: hoverKey === item.key,
                isOtherHover: hoverKey !== null && hoverKey !== item.key,
                visible,
                onMouseEnter: () => setHoverKey(item.key),
                onMouseLeave: () => setHoverKey(null),
                onClick: () => onItem(item.key)
              },
              item.key
            ))
          }
        )
      ]
    }
  );
};
const TitleMenuButton = ({
  index,
  label,
  isHover,
  isOtherHover,
  visible,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const press = usePressable();
  const translateX = !visible ? -16 : press.pressed ? 4 : isHover ? 10 : 0;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onMouseEnter,
      onMouseLeave: (e) => {
        onMouseLeave();
        press.handlers.onPointerLeave(e);
      },
      onPointerDown: press.handlers.onPointerDown,
      onClick,
      style: {
        position: "relative",
        appearance: "none",
        background: "transparent",
        border: "none",
        color: press.pressed ? tokens.accent : isHover ? tokens.accent : tokens.textPrimary,
        fontFamily: tokens.fontDisplay,
        fontSize: "clamp(36px, 4.2vw, 56px)",
        fontWeight: 600,
        lineHeight: 1.15,
        letterSpacing: "0.01em",
        padding: "12px 0 12px 96px",
        textAlign: "left",
        cursor: "default",
        textShadow: "0 2px 24px rgba(0,0,0,0.8)",
        opacity: visible ? isOtherHover ? 0.4 : 1 : 0,
        transform: `translateX(${translateX}px) scale(${press.pressed ? 0.985 : 1})`,
        transformOrigin: "left center",
        filter: press.pressed ? "brightness(1.1)" : "brightness(1)",
        transition: `color ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}, opacity ${tokens.durBase}ms ${tokens.easeOut}, filter ${tokens.durFast}ms ${tokens.easeOut}`,
        animation: visible ? `avg-stagger-rise ${tokens.durSlow}ms ${tokens.easeOut} ${360 + index * 55}ms both` : "none",
        whiteSpace: "nowrap",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: tokens.fontMono,
              fontSize: 14,
              letterSpacing: "0.18em",
              color: isHover ? tokens.accent : tokens.textFaint,
              fontWeight: 600,
              transition: `color ${tokens.durBase}ms ${tokens.easeOut}`,
              fontVariantNumeric: "tabular-nums"
            },
            children: String(index + 1).padStart(2, "0")
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              left: 36,
              top: "50%",
              height: 2,
              background: tokens.accent,
              width: isHover ? 52 : 0,
              transform: "translateY(-50%)",
              transition: `width ${tokens.durBase}ms ${tokens.easeOut}`,
              boxShadow: isHover ? `0 0 12px ${tokens.accentGlow}` : "none",
              borderRadius: 999
            }
          }
        ),
        label
      ]
    }
  );
};
let TitleScreen = class extends Extension {
  render() {
    return { component: TitleScreenComponent, props: {} };
  }
};
__publicField$5(TitleScreen, "settings", settings((s) => ({
  startLabel: s.string("「开始游戏」按钮文本").default("开始游戏"),
  loadLabel: s.string("「读取存档」按钮文本").default("读取存档"),
  showGallery: s.boolean("显示「鉴赏」菜单项").default(true),
  galleryLabel: s.string("「鉴赏」按钮文本").default("鉴赏").enabledWhen("showGallery"),
  settingsLabel: s.string("「设置」按钮文本").default("设置"),
  exitLabel: s.string("「退出」按钮文本").default("退出")
})));
TitleScreen = __decorateClass$5([
  extension({
    id: "title-screen",
    label: "标题画面",
    exposeUI: false,
    // 1.6.0 起只导出 ui/title-screen.json,React 版不再进入 UI 列表
    // 2026-05 Internal Extension Points §6.1:声明本 UI 实现哪些系统槽位。
    supportsSlot: INTERNAL_SYSTEM_SLOT.Title
  })
], TitleScreen);
function useEnterStyles(cfg) {
  const [shown, setShown] = useState(false);
  const delay = cfg.delay ?? 0;
  const duration = cfg.duration ?? tokens.durSlow;
  useEffect(() => {
    const t = window.setTimeout(() => setShown(true), delay);
    return () => window.clearTimeout(t);
  }, [delay]);
  if (!shown) {
    return {
      ...cfg.hidden,
      transition: "none"
    };
  }
  const transition2 = `opacity ${duration}ms ${tokens.easeOut}, transform ${duration}ms ${tokens.easeOut}, filter ${duration}ms ${tokens.easeOut}`;
  return {
    opacity: 1,
    transform: "none",
    filter: "none",
    transition: transition2
  };
}
function useOverlayStyles(phase) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setShown(true), 0);
    return () => window.clearTimeout(t);
  }, []);
  if (phase === "exit") {
    return {
      opacity: 0,
      transition: `opacity ${tokens.durFast}ms ${tokens.easeIn}`
    };
  }
  if (!shown) {
    return { opacity: 0, transition: "none" };
  }
  return {
    opacity: 1,
    transition: `opacity ${tokens.durBase}ms ${tokens.easeOut}`
  };
}
function useScreenTransition(ctx, uiId, exitDuration = tokens.durFast) {
  const [phase, setPhase] = useState("shown");
  const requestClose = useCallback(() => {
    setPhase((prev) => prev === "exit" ? prev : "exit");
    window.setTimeout(() => {
      void ctx.ui.hide(uiId);
    }, exitDuration);
  }, [ctx, uiId, exitDuration]);
  return { phase, requestClose };
}
const ScreenHeader = ({ eyebrow, title, rightSlot }) => {
  const titleStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "translateX(-16px)" },
    delay: 40
  });
  const lineStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "scaleX(0)" },
    delay: 180
  });
  const rightStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "translateY(10px)" },
    delay: 120
  });
  return /* @__PURE__ */ jsxs(
    "header",
    {
      style: {
        padding: "48px 80px 32px",
        display: "flex",
        alignItems: "flex-end",
        gap: 24
      },
      children: [
        /* @__PURE__ */ jsxs("div", { style: titleStyles, children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                fontFamily: tokens.fontMono,
                fontSize: 11,
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: tokens.accent,
                marginBottom: 12,
                fontWeight: 600
              },
              children: eyebrow
            }
          ),
          /* @__PURE__ */ jsx(
            "h2",
            {
              style: {
                fontFamily: tokens.fontDisplay,
                fontSize: "clamp(40px, 4.4vw, 60px)",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "0.005em",
                lineHeight: 1.05
              },
              children: title
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                marginTop: 16,
                width: 64,
                height: 3,
                background: tokens.accent,
                borderRadius: 999,
                transformOrigin: "left center",
                boxShadow: `0 0 12px ${tokens.accentGlow}`,
                ...lineStyles
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 12,
              ...rightStyles
            },
            children: rightSlot
          }
        )
      ]
    }
  );
};
const SecondaryButton = ({ onClick, children }) => {
  const [hover, setHover] = useState(false);
  const press = usePressable();
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: (e) => {
        setHover(false);
        press.handlers.onPointerLeave(e);
      },
      onPointerDown: press.handlers.onPointerDown,
      style: {
        appearance: "none",
        background: hover ? tokens.bgElevated : tokens.bgSurface,
        border: `1px solid ${hover ? tokens.borderRegular : tokens.borderSubtle}`,
        borderRadius: tokens.radiusSm,
        height: 44,
        padding: "0 22px",
        color: tokens.textPrimary,
        fontFamily: tokens.fontUI,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.04em",
        cursor: "default",
        transform: press.pressed ? "scale(0.96)" : hover ? "translateY(-1px)" : "translateY(0)",
        transition: `background ${tokens.durFast}ms ${tokens.easeOut}, border-color ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}`
      },
      children
    }
  );
};
const CloseButton = ({ onClick }) => {
  const [hover, setHover] = useState(false);
  const press = usePressable();
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: (e) => {
        setHover(false);
        press.handlers.onPointerLeave(e);
      },
      onPointerDown: press.handlers.onPointerDown,
      "aria-label": "关闭",
      style: {
        appearance: "none",
        background: hover ? tokens.bgElevated : tokens.bgSurface,
        border: `1px solid ${hover ? tokens.borderRegular : tokens.borderSubtle}`,
        borderRadius: tokens.radiusSm,
        width: 44,
        height: 44,
        color: tokens.textPrimary,
        cursor: "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: press.pressed ? "scale(0.92) rotate(90deg)" : hover ? "rotate(90deg)" : "rotate(0)",
        transition: `background ${tokens.durFast}ms ${tokens.easeOut}, border-color ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}`
      },
      children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": true, children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M3 3l10 10M13 3L3 13",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinecap: "round"
        }
      ) })
    }
  );
};
function parseLayersJson(raw) {
  if (typeof raw !== "string" || !raw.trim()) return [];
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const out = [];
  for (const item of parsed) {
    if (!item || typeof item !== "object") continue;
    const layer = item;
    if (typeof layer.assetPath !== "string" || !layer.assetPath.trim()) {
      continue;
    }
    out.push({
      assetPath: layer.assetPath,
      distance: typeof layer.distance === "number" ? layer.distance : void 0,
      offset: typeof layer.offset === "string" ? layer.offset : void 0,
      name: typeof layer.name === "string" ? layer.name : void 0
    });
  }
  return out;
}
function isValidEntry(e) {
  if (!e) return false;
  if (typeof e.entryId !== "string" || !e.entryId) return false;
  if (typeof e.sceneId !== "string" || !e.sceneId) return false;
  if (!Array.isArray(e.layers) || e.layers.length === 0) return false;
  for (const l of e.layers) {
    if (!l || typeof l.assetPath !== "string" || !l.assetPath) return false;
  }
  return true;
}
function isValidMusicEntry(e) {
  if (!e) return false;
  if (typeof e.entryId !== "string" || !e.entryId.trim()) return false;
  if (typeof e.title !== "string" || !e.title.trim()) return false;
  return typeof e.audioUri === "string" && e.audioUri.trim().length > 0;
}
function isValidFragmentEntry(e) {
  if (!e) return false;
  if (typeof e.entryId !== "string" || !e.entryId.trim()) return false;
  if (typeof e.title !== "string" || !e.title.trim()) return false;
  return typeof e.fragmentId === "string" && e.fragmentId.trim().length > 0;
}
function optionalText(value) {
  if (typeof value !== "string") return void 0;
  const text = value.trim();
  return text || void 0;
}
function resolveGalleryTitle(input) {
  const custom = typeof input.customTitle === "string" ? input.customTitle.trim() : "";
  const name2 = typeof input.sceneName === "string" ? input.sceneName.trim() : "";
  return custom || name2 || input.sceneId;
}
function deriveCoverImage(layers) {
  for (const l of layers) {
    if (l && typeof l.assetPath === "string" && l.assetPath.trim()) {
      return l.assetPath;
    }
  }
  return "";
}
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
const UI_ID = "gallery-screen";
const SHARED_VAR = `${manifest.id}.unlockedShared`;
const SLOT_VAR = `${manifest.id}.unlockedSlot`;
function useGalleryEntries(ctx) {
  const [sharedRaw] = ctx.variables.useValue(SHARED_VAR);
  const [slotRaw] = ctx.variables.useValue(SLOT_VAR);
  const shared = sharedRaw ?? [];
  const slot = slotRaw ?? [];
  const seen = /* @__PURE__ */ new Set();
  const merged = [];
  for (const entry of [...shared, ...slot]) {
    if (!isValidEntry(entry)) continue;
    if (seen.has(entry.entryId)) continue;
    seen.add(entry.entryId);
    merged.push(entry);
  }
  return merged;
}
const GalleryScreenComponent = () => {
  const ctx = useExtensionContext();
  const entries = useGalleryEntries(ctx);
  const { phase, requestClose } = useScreenTransition(ctx, UI_ID);
  const [viewing, setViewing] = useState(null);
  useEffect(() => {
    if (viewing) return;
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    const onAux = (e) => {
      if (e.button === 1) {
        e.preventDefault();
        requestClose();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("auxclick", onAux);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("auxclick", onAux);
    };
  }, [viewing, requestClose]);
  const onContextMenu = (e) => {
    e.preventDefault();
    if (viewing) return;
    requestClose();
  };
  const overlayStyles = useOverlayStyles(phase);
  const emptyStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "translateY(14px)" },
    delay: 180
  });
  const STAGGER_COUNT = 12;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onContextMenu,
      style: {
        position: "absolute",
        inset: 0,
        background: tokens.bgOverlayStrong,
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        color: tokens.textPrimary,
        fontFamily: tokens.fontUI,
        display: "flex",
        flexDirection: "column",
        willChange: "opacity",
        ...overlayStyles
      },
      children: [
        /* @__PURE__ */ jsx(
          ScreenHeader,
          {
            eyebrow: "Gallery",
            title: "鉴赏室",
            phase,
            rightSlot: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(
                "span",
                {
                  style: {
                    fontFamily: tokens.fontMono,
                    fontSize: 14,
                    color: tokens.textMuted,
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                    marginRight: 4
                  },
                  children: [
                    entries.length,
                    " 张"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(CloseButton, { onClick: requestClose })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "avg-shell-scrollbar",
            style: {
              flex: 1,
              overflowY: "auto",
              padding: "24px 80px 80px"
            },
            children: /* @__PURE__ */ jsx("div", { style: { maxWidth: 1160, margin: "0 auto" }, children: entries.length === 0 ? /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  textAlign: "center",
                  marginTop: 100,
                  fontFamily: tokens.fontDisplay,
                  fontSize: 22,
                  color: tokens.textFaint,
                  fontWeight: 500,
                  ...emptyStyles
                },
                children: "还没有解锁任何鉴赏内容"
              }
            ) : /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 20
                },
                children: entries.map((entry, idx) => /* @__PURE__ */ jsx(
                  GalleryCard,
                  {
                    entry,
                    ctx,
                    animationDelay: 140 + Math.min(idx, STAGGER_COUNT) * 36,
                    onOpen: () => setViewing(entry)
                  },
                  entry.entryId
                ))
              }
            ) })
          }
        ),
        viewing && /* @__PURE__ */ jsx(
          Lightbox,
          {
            entry: viewing,
            ctx,
            onClose: () => setViewing(null)
          }
        )
      ]
    }
  );
};
const GalleryCard = ({ entry, ctx, animationDelay, onOpen }) => {
  const [hover, setHover] = useState(false);
  const press = usePressable();
  const enterStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "translateY(16px) scale(0.97)" },
    delay: animationDelay
  });
  return /* @__PURE__ */ jsx("div", { style: enterStyles, children: /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: onOpen,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => {
        setHover(false);
        press.handlers.onPointerLeave();
      },
      onPointerDown: press.handlers.onPointerDown,
      role: "button",
      "aria-label": entry.title,
      style: {
        position: "relative",
        aspectRatio: "16 / 9",
        borderRadius: tokens.radiusMd,
        overflow: "hidden",
        background: tokens.bgSunken,
        border: `1px solid ${hover ? tokens.borderAccent : tokens.borderSubtle}`,
        cursor: "default",
        transform: press.pressed ? "scale(0.97)" : hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? `0 8px 28px rgba(0, 0, 0, 0.4), 0 0 16px ${tokens.accentGlow}` : "0 2px 10px rgba(0, 0, 0, 0.25)",
        transition: `border-color ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}, box-shadow ${tokens.durBase}ms ${tokens.easeOut}`
      },
      children: [
        /* @__PURE__ */ jsx(
          LayeredThumb,
          {
            layers: entry.layers,
            ctx,
            hover,
            alt: entry.title
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "26px 12px 10px",
              background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 100%)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: hover ? tokens.accent : tokens.textPrimary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              transition: `color ${tokens.durFast}ms ${tokens.easeOut}`
            },
            children: entry.title
          }
        )
      ]
    }
  ) });
};
const LayeredThumb = ({ layers, ctx, hover, alt }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition: `transform ${tokens.durSlow}ms ${tokens.easeOut}`
      },
      children: layers.map((layer, i) => {
        const url = ctx.asset.resolve(layer.assetPath).url;
        return /* @__PURE__ */ jsx(
          "img",
          {
            src: url,
            alt: i === 0 ? alt : "",
            draggable: false,
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block"
            }
          },
          `${i}-${layer.assetPath}`
        );
      })
    }
  );
};
const Lightbox = ({ entry, ctx, onClose }) => {
  const backdropStyles = useEnterStyles({
    hidden: { opacity: 0 },
    duration: tokens.durBase
  });
  const figureStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "scale(0.96) translateY(10px)" },
    delay: 40
  });
  const stageRef = useRef(null);
  const [renderError, setRenderError] = useState(null);
  const [closing, setClosing] = useState(false);
  const closeTimerRef = useRef(null);
  const CLOSE_FADE_MS = tokens.durBase;
  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      onClose();
    }, CLOSE_FADE_MS);
  };
  useEffect(() => {
    return () => {
      if (closeTimerRef.current != null) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    const onAux = (e) => {
      if (e.button === 1) {
        e.preventDefault();
        requestClose();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("auxclick", onAux);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("auxclick", onAux);
    };
  }, []);
  useEffect(() => {
    if (!stageRef.current) return;
    const stage = stageRef.current;
    let handle = null;
    let cancelled = false;
    (async () => {
      try {
        const h = await ctx.sceneRender.mount(stage, entry.layers, {
          // 场景图按 AVG 常规呈现 = 铺满容器、超出裁掉(cover),
          // contain 会留黑边导致用户看到"显示不全"
          displayType: "cover"
        });
        if (cancelled) {
          h.dispose();
          return;
        }
        handle = h;
      } catch (err) {
        console.error("[gallery] 大图临时引擎渲染失败:", err);
        if (!cancelled) {
          setRenderError(
            err instanceof Error ? err.message : "场景渲染失败"
          );
        }
      }
    })();
    return () => {
      cancelled = true;
      handle == null ? void 0 : handle.dispose();
    };
  }, [ctx.sceneRender, entry.layers]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: requestClose,
      onContextMenu: (e) => {
        e.preventDefault();
        e.stopPropagation();
        requestClose();
      },
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 20,
        background: "rgba(0, 0, 0, 0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // 关闭态:整层 fade out,覆盖引擎 destroy 的中间态白闪
        ...closing ? {
          opacity: 0,
          transition: `opacity ${CLOSE_FADE_MS}ms ${tokens.easeOut}`,
          pointerEvents: "none"
        } : backdropStyles
      },
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "88%",
              ...closing ? {
                // 关闭态:figure 一并下沉淡出,跟 enter 动画对称
                opacity: 0,
                transform: "scale(0.96) translateY(10px)",
                transition: `opacity ${CLOSE_FADE_MS}ms ${tokens.easeOut}, transform ${CLOSE_FADE_MS}ms ${tokens.easeOut}`
              } : figureStyles
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: stageRef,
                  style: {
                    position: "relative",
                    width: "min(88vw, 1280px)",
                    aspectRatio: "16 / 9",
                    maxHeight: "72vh",
                    borderRadius: tokens.radiusLg,
                    border: `1px solid ${tokens.borderSubtle}`,
                    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6)",
                    background: "#000",
                    overflow: "hidden"
                  },
                  children: renderError && /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: tokens.textMuted,
                        fontSize: 14,
                        padding: 24,
                        textAlign: "center"
                      },
                      children: [
                        "场景渲染失败:",
                        renderError
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    marginTop: 20,
                    fontFamily: tokens.fontDisplay,
                    fontSize: 20,
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    textAlign: "center"
                  },
                  children: entry.title
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            style: { position: "absolute", top: 28, right: 32 },
            children: /* @__PURE__ */ jsx(CloseButton, { onClick: requestClose })
          }
        )
      ]
    }
  );
};
let GalleryScreen = class extends Extension {
  render() {
    return { component: GalleryScreenComponent, props: {} };
  }
};
__publicField$4(GalleryScreen, "saveSchema", defineSave({
  unlockedShared: {
    type: "list",
    persistence: "shared",
    default: []
  },
  unlockedSlot: {
    type: "list",
    persistence: "slot",
    default: []
  },
  unlockedMusicShared: {
    type: "list",
    persistence: "shared",
    default: []
  },
  unlockedMusicSlot: {
    type: "list",
    persistence: "slot",
    default: []
  },
  unlockedFragmentsShared: {
    type: "list",
    persistence: "shared",
    default: []
  },
  unlockedFragmentsSlot: {
    type: "list",
    persistence: "slot",
    default: []
  }
}));
__publicField$4(GalleryScreen, "settings", settings((s) => ({
  unlockScope: s.enum("解锁记录范围", ["shared", "slot"]).labels({ shared: "全局共享(跨存档)", slot: "跟随存档" }).default("shared").describe(
    "新解锁的鉴赏条目记到哪里:全局共享 = 任意周目解锁全局可见;跟随存档 = 只在当前存档可见。已解锁条目不受切换影响。"
  )
})));
__publicField$4(GalleryScreen, "addToGallery", method({
  id: "add-to-gallery",
  title: "加入鉴赏",
  description: "把一个场景解锁到鉴赏室,玩家可在鉴赏界面查看",
  schema: {
    // scene 字段值是 sceneId 字符串;Inspector 选场景时同步把 layers 快照
    // 写进兄弟字段 _sceneLayers、场景名写进 _sceneName(都是内部兄弟字段)。
    scene: { type: "scene", label: "鉴赏场景", required: true },
    // 选填:不填时缺省用场景名称(而非 sceneId)。
    title: { type: "string", label: "标题(选填,默认用场景名)" }
  },
  run(_ctx, params) {
    const sceneId = typeof params.scene === "string" ? params.scene.trim() : "";
    if (!sceneId) {
      console.warn("[gallery] 「加入鉴赏」缺少场景,已跳过:", params);
      return;
    }
    const entryId = sceneId;
    const save = this.save;
    const scope = _ctx.settings.get("unlockScope") ?? "shared";
    const shared = save.get("unlockedShared") ?? [];
    const slot = save.get("unlockedSlot") ?? [];
    const exists = [...shared, ...slot].some((e) => (e == null ? void 0 : e.entryId) === entryId);
    if (exists) return;
    const layersRaw = params._sceneLayers;
    const layers = parseLayersJson(
      typeof layersRaw === "string" ? layersRaw : void 0
    );
    if (layers.length === 0) {
      console.warn(
        "[gallery] 「加入鉴赏」layers 快照缺失或为空,已跳过:",
        { sceneId }
      );
      return;
    }
    const p = params;
    const title = resolveGalleryTitle({
      customTitle: p.title,
      sceneName: p._sceneName,
      sceneId
    });
    const entry = {
      entryId,
      title,
      sceneId,
      layers,
      // 拍平一张顶层封面,供可视化「数据列表」版鉴赏墙绑图(它取不到嵌套 layers)
      coverImage: deriveCoverImage(layers)
    };
    if (scope === "slot") {
      save.set("unlockedSlot", [...slot.filter(isValidEntry), entry]);
    } else {
      save.set("unlockedShared", [...shared.filter(isValidEntry), entry]);
    }
  }
}));
__publicField$4(GalleryScreen, "removeFromGallery", method({
  id: "remove-from-gallery",
  title: "移除鉴赏",
  description: "从鉴赏室移除指定场景对应的条目(两个记录桶都会找)",
  schema: {
    scene: { type: "scene", label: "鉴赏场景", required: true }
  },
  run(_ctx, params) {
    const sceneId = typeof params.scene === "string" ? params.scene.trim() : "";
    if (!sceneId) {
      console.warn("[gallery] 「移除鉴赏」缺少场景,已跳过");
      return;
    }
    const save = this.save;
    const keep = (e) => isValidEntry(e) && e.sceneId !== sceneId;
    save.set(
      "unlockedShared",
      (save.get("unlockedShared") ?? []).filter(keep)
    );
    save.set(
      "unlockedSlot",
      (save.get("unlockedSlot") ?? []).filter(keep)
    );
  }
}));
__publicField$4(GalleryScreen, "addMusicToGallery", method({
  id: "add-music-to-gallery",
  title: "加入音乐鉴赏",
  description: "解锁一首音乐，玩家可在鉴赏界面试听",
  schema: {
    audio: {
      type: "asset",
      assetType: "audio",
      label: "音乐资源",
      required: true
    },
    title: { type: "string", label: "曲名（选填）" },
    artist: { type: "string", label: "作者（选填）" },
    description: {
      type: "string",
      label: "曲目说明（选填）",
      multiline: true
    }
  },
  run(ctx, params) {
    var _a;
    const audioUri = optionalText(params.audio);
    if (!audioUri) {
      console.warn("[gallery] 「加入音乐鉴赏」缺少音乐资源，已跳过");
      return;
    }
    const title = optionalText(params.title) ?? ((_a = audioUri.split(/[\\/]/).pop()) == null ? void 0 : _a.replace(/\.[^.]+$/, "")) ?? audioUri;
    const entry = {
      entryId: audioUri,
      title,
      audioUri,
      artist: optionalText(params.artist),
      description: optionalText(params.description)
    };
    const save = this.save;
    const shared = save.get("unlockedMusicShared") ?? [];
    const slot = save.get("unlockedMusicSlot") ?? [];
    if ([...shared, ...slot].some((item) => (item == null ? void 0 : item.entryId) === entry.entryId)) {
      return;
    }
    const scope = ctx.settings.get("unlockScope") ?? "shared";
    if (scope === "slot") {
      save.set("unlockedMusicSlot", [
        ...slot.filter(isValidMusicEntry),
        entry
      ]);
    } else {
      save.set("unlockedMusicShared", [
        ...shared.filter(isValidMusicEntry),
        entry
      ]);
    }
  }
}));
__publicField$4(GalleryScreen, "removeMusicFromGallery", method({
  id: "remove-music-from-gallery",
  title: "移除音乐鉴赏",
  description: "从音乐鉴赏中移除指定音乐（全局与当前存档都会移除）",
  schema: {
    audio: {
      type: "asset",
      assetType: "audio",
      label: "音乐资源",
      required: true
    }
  },
  run(_ctx, params) {
    const audioUri = optionalText(params.audio);
    if (!audioUri) return;
    const save = this.save;
    const keep = (entry) => isValidMusicEntry(entry) && entry.audioUri !== audioUri;
    save.set(
      "unlockedMusicShared",
      (save.get("unlockedMusicShared") ?? []).filter(keep)
    );
    save.set(
      "unlockedMusicSlot",
      (save.get("unlockedMusicSlot") ?? []).filter(keep)
    );
  }
}));
__publicField$4(GalleryScreen, "addFragmentToGallery", method({
  id: "add-fragment-to-gallery",
  title: "加入片段鉴赏",
  description: "解锁一个剧情片段，玩家可在鉴赏界面重新播放",
  schema: {
    fragment: {
      type: "fragment",
      label: "剧情片段",
      required: true,
      chapterField: "chapterId"
    },
    chapterId: { type: "string", label: "章节 ID（跨章节时填写）" },
    title: { type: "string", label: "标题（选填，默认用片段名）" },
    description: {
      type: "string",
      label: "片段说明（选填）",
      multiline: true
    },
    cover: {
      type: "asset",
      assetType: "image",
      label: "封面图（选填）"
    }
  },
  async run(ctx, params) {
    const fragmentId = optionalText(params.fragment);
    if (!fragmentId) {
      console.warn("[gallery] 「加入片段鉴赏」缺少剧情片段，已跳过");
      return;
    }
    let chapterId = optionalText(params.chapterId);
    const providedTitle = optionalText(params.title);
    let fragmentName;
    let allChaptersPromise;
    const loadAllChapters = () => allChaptersPromise ?? (allChaptersPromise = ctx.story.getAllChapters());
    try {
      if (chapterId && providedTitle) {
        fragmentName = void 0;
      } else {
        let chapter = chapterId && typeof ctx.story.getChapter === "function" ? await ctx.story.getChapter(chapterId) : null;
        if (!chapter) {
          const chapters = await loadAllChapters();
          chapter = chapterId ? chapters.find((item) => item.id === chapterId) : chapters.find(
            (item) => item.fragments.some((fragment2) => fragment2.id === fragmentId)
          );
        }
        const fragment = chapter == null ? void 0 : chapter.fragments.find(
          (item) => item.id === fragmentId
        );
        chapterId = (chapter == null ? void 0 : chapter.id) ?? chapterId;
        fragmentName = optionalText(fragment == null ? void 0 : fragment.name);
      }
    } catch (error) {
      console.warn("[gallery] 读取片段标题失败，将使用片段 ID", error);
    }
    const entry = {
      entryId: `${chapterId ?? "current"}:${fragmentId}`,
      title: providedTitle ?? fragmentName ?? fragmentId,
      fragmentId,
      chapterId,
      description: optionalText(params.description),
      coverImage: optionalText(params.cover)
    };
    const save = this.save;
    const shared = save.get("unlockedFragmentsShared") ?? [];
    const slot = save.get("unlockedFragmentsSlot") ?? [];
    const legacyEntryId = `current:${entry.fragmentId}`;
    const hasLegacyAlias = [...shared, ...slot].some(
      (item) => (item == null ? void 0 : item.entryId) === legacyEntryId && item.fragmentId === entry.fragmentId && !item.chapterId
    );
    let canUpgradeLegacyAlias = false;
    if (entry.chapterId && hasLegacyAlias) {
      try {
        const matchingChapters = (await loadAllChapters()).filter(
          (chapter) => chapter.fragments.some(
            (fragment) => fragment.id === entry.fragmentId
          )
        );
        canUpgradeLegacyAlias = matchingChapters.length === 1 && matchingChapters[0].id === entry.chapterId;
      } catch (error) {
        console.warn(
          "[gallery] 无法确认历史 current 条目所属章节，将保留原记录",
          error
        );
      }
    }
    const hasTitle = Object.prototype.hasOwnProperty.call(params, "title") && params.title !== void 0;
    const hasDescription = Object.prototype.hasOwnProperty.call(params, "description") && params.description !== void 0;
    const hasCover = Object.prototype.hasOwnProperty.call(params, "cover") && params.cover !== void 0;
    const upsertExisting = (entries) => {
      const matchingIndexes = [];
      let canonicalIndex = -1;
      entries.forEach((item, index) => {
        if ((item == null ? void 0 : item.entryId) === entry.entryId) {
          canonicalIndex = canonicalIndex < 0 ? index : canonicalIndex;
          matchingIndexes.push(index);
          return;
        }
        if (canUpgradeLegacyAlias && (item == null ? void 0 : item.entryId) === legacyEntryId && item.fragmentId === entry.fragmentId && !item.chapterId) {
          matchingIndexes.push(index);
        }
      });
      if (matchingIndexes.length === 0) {
        return { entries, matched: false, changed: false };
      }
      const winnerIndex = canonicalIndex >= 0 ? canonicalIndex : matchingIndexes[0];
      let base = {};
      for (const index of matchingIndexes) {
        if (index === winnerIndex) continue;
        base = { ...base, ...entries[index] };
      }
      const winner = entries[winnerIndex];
      base = { ...base, ...winner };
      const updated = {
        ...base,
        entryId: entry.entryId,
        title: hasTitle ? entry.title : base.title,
        fragmentId: entry.fragmentId,
        chapterId: entry.chapterId,
        description: hasDescription ? entry.description : base.description,
        coverImage: hasCover ? entry.coverImage : base.coverImage
      };
      const changed = matchingIndexes.length > 1 || updated.entryId !== winner.entryId || updated.title !== winner.title || updated.fragmentId !== winner.fragmentId || updated.chapterId !== winner.chapterId || updated.description !== winner.description || updated.coverImage !== winner.coverImage || Object.keys(updated).length !== Object.keys(winner).length;
      if (!changed) {
        return { entries, matched: true, changed: false };
      }
      const matchingSet = new Set(matchingIndexes);
      const next = [];
      entries.forEach((item, index) => {
        if (index === winnerIndex) next.push(updated);
        else if (!matchingSet.has(index)) next.push(item);
      });
      return { entries: next, matched: true, changed: true };
    };
    const sharedUpsert = upsertExisting(shared);
    const slotUpsert = upsertExisting(slot);
    if (sharedUpsert.changed) {
      save.set("unlockedFragmentsShared", sharedUpsert.entries);
    }
    if (slotUpsert.changed) {
      save.set("unlockedFragmentsSlot", slotUpsert.entries);
    }
    if (sharedUpsert.matched || slotUpsert.matched) {
      return;
    }
    const scope = ctx.settings.get("unlockScope") ?? "shared";
    if (scope === "slot") {
      save.set("unlockedFragmentsSlot", [
        ...slot.filter(isValidFragmentEntry),
        entry
      ]);
    } else {
      save.set("unlockedFragmentsShared", [
        ...shared.filter(isValidFragmentEntry),
        entry
      ]);
    }
  }
}));
__publicField$4(GalleryScreen, "removeFragmentFromGallery", method({
  id: "remove-fragment-from-gallery",
  title: "移除片段鉴赏",
  description: "从片段鉴赏中移除指定剧情片段（全局与当前存档都会移除）",
  schema: {
    fragment: {
      type: "fragment",
      label: "剧情片段",
      required: true,
      chapterField: "chapterId"
    },
    chapterId: { type: "string", label: "章节 ID（选填）" }
  },
  run(_ctx, params) {
    const fragmentId = optionalText(params.fragment);
    const chapterId = optionalText(params.chapterId);
    if (!fragmentId) return;
    const save = this.save;
    const keep = (entry) => isValidFragmentEntry(entry) && (entry.fragmentId !== fragmentId || chapterId !== void 0 && entry.chapterId !== chapterId);
    save.set(
      "unlockedFragmentsShared",
      (save.get("unlockedFragmentsShared") ?? []).filter(keep)
    );
    save.set(
      "unlockedFragmentsSlot",
      (save.get("unlockedFragmentsSlot") ?? []).filter(keep)
    );
  }
}));
__publicField$4(GalleryScreen, "clearGallery", method({
  id: "clear-gallery",
  title: "清空鉴赏",
  description: "清空 CG、音乐与片段鉴赏的全部解锁记录（慎用）",
  run() {
    const save = this.save;
    save.set("unlockedShared", []);
    save.set("unlockedSlot", []);
    save.set("unlockedMusicShared", []);
    save.set("unlockedMusicSlot", []);
    save.set("unlockedFragmentsShared", []);
    save.set("unlockedFragmentsSlot", []);
  }
}));
GalleryScreen = __decorateClass$4([
  extension({
    id: "gallery-screen",
    label: "鉴赏管理",
    exposeUI: false,
    // 保留鉴赏方法和存档数据,React 版不再进入 UI 列表
    /** 声明本 UI 实现"鉴赏"槽位,Studio 系统槽位面板据此列为候选。 */
    supportsSlot: INTERNAL_SYSTEM_SLOT.Gallery
  })
], GalleryScreen);
const CONTAINER_ID = "avg-default-shell-toast-container";
const TOAST_DURATION_MS = 2400;
const FADE_DURATION_MS = 220;
function syncContainerToGameView(el) {
  const gameView = document.getElementById("game-view");
  if (!gameView) {
    el.style.left = "50%";
    el.style.bottom = "32px";
    el.style.top = "auto";
    el.style.right = "auto";
    el.style.width = "auto";
    return;
  }
  const rect = gameView.getBoundingClientRect();
  el.style.left = `${rect.left}px`;
  el.style.top = `${rect.bottom - 32 - 64}px`;
  el.style.width = `${rect.width}px`;
  el.style.bottom = "auto";
  el.style.right = "auto";
}
function ensureContainer() {
  if (typeof document === "undefined") return null;
  let el = document.getElementById(CONTAINER_ID);
  if (el) {
    syncContainerToGameView(el);
    return el;
  }
  el = document.createElement("div");
  el.id = CONTAINER_ID;
  el.style.cssText = [
    "position: fixed",
    // 跟引擎 engine-mask 同款 max int 层级,确保压在 SaveScreen overlay 之上。
    // SaveScreen 自己用 position:absolute 没设 z-index,但被引擎 UISystem
    // 装进 topmost 容器后实际有高层级,普通 99999 可能被盖。
    "z-index: 2147483647",
    "display: flex",
    "flex-direction: column",
    "align-items: center",
    "justify-content: flex-end",
    "gap: 8px",
    "pointer-events: none"
  ].join(";");
  document.body.appendChild(el);
  syncContainerToGameView(el);
  const gameView = document.getElementById("game-view");
  if (gameView && typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => syncContainerToGameView(el));
    ro.observe(gameView);
  }
  return el;
}
const ICON = {
  info: "·",
  success: "✓",
  warn: "!",
  error: "×"
};
const ACCENT_BY_TYPE = {
  info: tokens.textMuted,
  success: tokens.accent,
  warn: tokens.accent,
  error: tokens.danger
};
function showToast(message, opts = {}) {
  const container = ensureContainer();
  if (!container) return;
  const type = opts.type ?? "info";
  const duration = opts.durationMs ?? TOAST_DURATION_MS;
  const toast = document.createElement("div");
  toast.style.cssText = [
    `font-family: ${tokens.fontUI}`,
    "font-size: 13px",
    "font-weight: 500",
    "letter-spacing: 0.04em",
    `color: ${tokens.textPrimary}`,
    "background: rgba(11, 13, 16, 0.88)",
    `border: 1px solid ${tokens.borderRegular}`,
    "border-radius: 8px",
    "padding: 10px 16px",
    "backdrop-filter: blur(12px)",
    "-webkit-backdrop-filter: blur(12px)",
    "box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4)",
    "display: flex",
    "align-items: center",
    "gap: 10px",
    "opacity: 0",
    "transform: translateY(8px)",
    `transition: opacity ${FADE_DURATION_MS}ms ${tokens.easeOut}, transform ${FADE_DURATION_MS}ms ${tokens.easeOut}`,
    "max-width: 480px",
    "pointer-events: none"
  ].join(";");
  const dot = document.createElement("span");
  dot.textContent = ICON[type];
  dot.style.cssText = [
    `color: ${ACCENT_BY_TYPE[type]}`,
    "font-weight: 700",
    "font-size: 14px",
    "line-height: 1",
    "flex-shrink: 0"
  ].join(";");
  toast.appendChild(dot);
  const text = document.createElement("span");
  text.textContent = message;
  toast.appendChild(text);
  container.appendChild(toast);
  void toast.offsetHeight;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => {
      toast.remove();
      if (container.childElementCount === 0) container.remove();
    }, FADE_DURATION_MS);
  }, duration);
}
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "", value);
const PAGE_SIZE = 6;
const VISUAL_SAVE_SCREEN = "@avg.internal.default-shell/save-screen";
const SaveScreenComponent = ({ mode = "save", source = "game" }) => {
  const ctx = useExtensionContext();
  const slots = ctx.archive.useSlots();
  const slotCount = ctx.settings.get("slotCount") ?? 30;
  const allowDelete = ctx.settings.get("allowDelete") ?? true;
  const { phase, requestClose } = useScreenTransition(ctx, "save-screen");
  const [pendingConfirm, setPendingConfirm] = useState(null);
  const [page, setPage] = useState(0);
  const [pageDir, setPageDir] = useState("right");
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const totalPages = Math.max(1, Math.ceil(slotCount / PAGE_SIZE));
  const displaySlots = useMemo(() => {
    const start = page * PAGE_SIZE;
    const items = [];
    for (let i = 0; i < PAGE_SIZE; i++) {
      const id = start + i + 1;
      if (id > slotCount) break;
      const found = slots.find((s) => s.id === id) ?? null;
      items.push({ id, slot: found });
    }
    return items;
  }, [page, slots, slotCount]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (pendingConfirm) setPendingConfirm(null);
        else requestClose();
        return;
      }
      if (pendingConfirm) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, totalPages, pendingConfirm]);
  const goPrev = () => {
    if (page > 0) {
      setPageDir("left");
      setPage((p) => p - 1);
    }
  };
  const goNext = () => {
    if (page < totalPages - 1) {
      setPageDir("right");
      setPage((p) => p + 1);
    }
  };
  const doSave = (id) => {
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    ctx.archive.save(id).then((saved) => {
      if (!saved) return;
      showToast(`已保存到 #${String(id).padStart(2, "0")}`, { type: "success" });
    }).catch((err) => {
      console.error("[save-screen] save failed", err);
      showToast("保存失败", { type: "error" });
    }).finally(() => {
      savingRef.current = false;
      if (mountedRef.current) setSaving(false);
    });
  };
  const doLoad = (id) => {
    void ctx.archive.load(id);
    requestClose();
  };
  const doDelete = (id) => {
    ctx.archive.delete(id).then(() => showToast(`已删除 #${String(id).padStart(2, "0")}`, { type: "info" })).catch((err) => {
      console.error("[save-screen] delete failed", err);
      showToast("删除失败", { type: "error" });
    });
  };
  const onSaveClick = (id, _isEmpty) => doSave(id);
  const onLoadClick = (id) => {
    if (source === "title") {
      doLoad(id);
      return;
    }
    setPendingConfirm({ slotId: id, action: "load" });
  };
  const onDeleteClick = (id) => {
    setPendingConfirm({ slotId: id, action: "delete" });
  };
  const onConfirm = () => {
    if (!pendingConfirm) return;
    const { slotId, action } = pendingConfirm;
    setPendingConfirm(null);
    if (action === "load") doLoad(slotId);
    else if (action === "delete") doDelete(slotId);
  };
  const onCancelConfirm = () => setPendingConfirm(null);
  const overlayStyles = useOverlayStyles(phase);
  const footerStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "translateY(14px)" },
    delay: 280
  });
  const onContextMenu = (e) => {
    e.preventDefault();
    if (pendingConfirm) {
      setPendingConfirm(null);
    } else {
      requestClose();
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onContextMenu,
      style: {
        position: "absolute",
        inset: 0,
        background: tokens.bgOverlay,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        color: tokens.textPrimary,
        fontFamily: tokens.fontUI,
        display: "flex",
        flexDirection: "column",
        willChange: "opacity",
        ...overlayStyles
      },
      children: [
        /* @__PURE__ */ jsx(
          ScreenHeader,
          {
            eyebrow: mode === "load" ? "Load" : "Save",
            title: mode === "load" ? "读取存档" : "保存存档",
            phase,
            rightSlot: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(
                "span",
                {
                  style: {
                    fontFamily: tokens.fontMono,
                    fontSize: 14,
                    color: tokens.textMuted,
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                    marginRight: 4
                  },
                  children: [
                    String(page + 1).padStart(2, "0"),
                    " /",
                    " ",
                    String(totalPages).padStart(2, "0")
                  ]
                }
              ),
              /* @__PURE__ */ jsx(CloseButton, { onClick: requestClose })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              flex: 1,
              display: "grid",
              gridTemplateColumns: "88px 1fr 88px",
              gap: 16,
              padding: "0 56px 24px",
              minHeight: 0,
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsx(
                ArrowButton,
                {
                  dir: "left",
                  disabled: page === 0,
                  onClick: goPrev,
                  delay: 160,
                  phase
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  "aria-busy": saving || void 0,
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridTemplateRows: "repeat(2, 1fr)",
                    gap: 24,
                    height: "100%",
                    animation: `${pageDir === "right" ? "avg-page-slide-in-right" : "avg-page-slide-in-left"} ${tokens.durBase}ms ${tokens.easeOut}`
                  },
                  children: displaySlots.map(({ id, slot }, idx) => {
                    return /* @__PURE__ */ jsx(
                      SlotCard,
                      {
                        id,
                        slot,
                        snapshotUrl: (slot == null ? void 0 : slot.snapshotDataUri) ?? null,
                        allowDelete,
                        mode,
                        busy: saving,
                        onSave: () => onSaveClick(id),
                        onLoad: () => onLoadClick(id),
                        onDelete: () => onDeleteClick(id),
                        animationDelay: 120 + idx * 40,
                        phase
                      },
                      id
                    );
                  })
                },
                page
              ),
              /* @__PURE__ */ jsx(
                ArrowButton,
                {
                  dir: "right",
                  disabled: page >= totalPages - 1,
                  onClick: goNext,
                  delay: 160,
                  phase
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "footer",
          {
            style: {
              padding: "16px 0 40px",
              display: "flex",
              justifyContent: "center",
              gap: 10,
              ...footerStyles
            },
            children: Array.from({ length: totalPages }).map((_, i) => /* @__PURE__ */ jsx(
              PageDot,
              {
                active: i === page,
                onClick: () => {
                  setPageDir(i > page ? "right" : "left");
                  setPage(i);
                },
                label: `第 ${i + 1} 页`
              },
              i
            ))
          }
        ),
        pendingConfirm && /* @__PURE__ */ jsx(
          ConfirmOverlay,
          {
            action: pendingConfirm.action,
            slotId: pendingConfirm.slotId,
            onConfirm,
            onCancel: onCancelConfirm
          }
        )
      ]
    }
  );
};
const PageDot = ({ active, onClick, label }) => {
  const press = usePressable();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...press.handlers,
      onClick,
      "aria-label": label,
      style: {
        appearance: "none",
        width: active ? 32 : 8,
        height: 8,
        borderRadius: 999,
        border: "none",
        padding: 0,
        background: active ? tokens.accent : tokens.borderRegular,
        cursor: "default",
        boxShadow: active ? `0 0 12px ${tokens.accentGlow}` : "none",
        transform: press.pressed ? "scale(0.85)" : "scale(1)",
        transition: `width ${tokens.durBase}ms ${tokens.easeOut}, background ${tokens.durBase}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}, box-shadow ${tokens.durBase}ms ${tokens.easeOut}`
      }
    }
  );
};
const SlotCard = ({
  id,
  slot,
  snapshotUrl,
  allowDelete,
  mode,
  busy,
  onSave,
  onLoad,
  onDelete,
  animationDelay,
  phase
}) => {
  const [hover, setHover] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);
  const press = usePressable();
  const isEmpty = slot === null;
  const disabledInLoadMode = mode === "load" && isEmpty;
  const isInteractive = !disabledInLoadMode && !busy;
  const slotNumber = String(id).padStart(2, "0");
  const cardLabel = isEmpty ? mode === "save" ? `保存到空槽位 #${slotNumber}` : `空槽位 #${slotNumber}` : mode === "save" ? `覆盖存档 #${slotNumber}` : `读取存档 #${slotNumber}`;
  const onPrimaryAction = () => {
    if (!isInteractive) return;
    if (mode === "save") onSave();
    else onLoad();
  };
  const fallbackBg = useMemo(() => {
    const hue = id * 37 % 360;
    return `linear-gradient(135deg,
      hsl(${hue}, 12%, 22%) 0%,
      hsl(${(hue + 50) % 360}, 10%, 16%) 100%)`;
  }, [id]);
  const wrapperStyles = useEnterStyles({
    hidden: {
      opacity: 0,
      transform: "translateY(18px) scale(0.97)"
    },
    delay: animationDelay,
    duration: tokens.durSlow
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: { display: "flex", ...wrapperStyles },
      children: /* @__PURE__ */ jsxs(
        "article",
        {
          onMouseEnter: () => {
            if (isInteractive) setHover(true);
          },
          onMouseLeave: (e) => {
            setHover(false);
            setDeleteHover(false);
            press.handlers.onPointerLeave(e);
          },
          onPointerDown: (e) => {
            if (!isInteractive) return;
            press.handlers.onPointerDown(e);
          },
          style: {
            flex: 1,
            position: "relative",
            background: tokens.bgSurface,
            border: `1.5px solid ${hover && isInteractive ? tokens.borderAccent : tokens.borderSubtle}`,
            borderRadius: tokens.radiusLg,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transform: press.pressed ? "translateY(-2px) scale(0.98)" : hover && isInteractive ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
            boxShadow: hover && isInteractive ? "0 28px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,165,116,0.22), 0 0 32px rgba(212,165,116,0.10)" : "0 4px 16px rgba(0,0,0,0.25)",
            transition: `transform ${tokens.durFast}ms ${tokens.easeOut}, border-color ${tokens.durFast}ms ${tokens.easeOut}, box-shadow ${tokens.durBase}ms ${tokens.easeOut}`,
            cursor: isInteractive ? "default" : "not-allowed",
            // load 模式空槽位:整张卡灰化 + 不响应
            opacity: disabledInLoadMode ? 0.45 : 1
          },
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": cardLabel,
                disabled: !isInteractive,
                onClick: onPrimaryAction,
                style: {
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  appearance: "none",
                  border: "none",
                  padding: 0,
                  background: "transparent",
                  color: "transparent",
                  cursor: isInteractive ? "default" : "not-allowed"
                }
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  position: "relative",
                  flex: "1 1 0",
                  minHeight: 0,
                  background: fallbackBg,
                  overflow: "hidden"
                },
                children: [
                  snapshotUrl && /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: snapshotUrl,
                      alt: "",
                      decoding: "async",
                      loading: "lazy",
                      draggable: false,
                      style: {
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        pointerEvents: "none",
                        userSelect: "none"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        top: 14,
                        left: 16,
                        fontFamily: tokens.fontMono,
                        fontSize: 13,
                        letterSpacing: "0.24em",
                        color: tokens.textPrimary,
                        textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                        background: "rgba(0,0,0,0.45)",
                        padding: "5px 11px",
                        borderRadius: 6,
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        fontWeight: 600
                      },
                      children: [
                        "#",
                        String(id).padStart(2, "0")
                      ]
                    }
                  ),
                  (slot == null ? void 0 : slot.isQuickSave) && /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        top: 14,
                        right: 16,
                        fontFamily: tokens.fontMono,
                        fontSize: 11,
                        letterSpacing: "0.24em",
                        color: tokens.accent,
                        background: "rgba(0,0,0,0.45)",
                        padding: "5px 11px",
                        borderRadius: 6,
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        fontWeight: 700
                      },
                      children: "QUICK"
                    }
                  ),
                  !isEmpty && allowDelete && !busy && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": `删除存档 #${slotNumber}`,
                      "aria-hidden": !hover,
                      tabIndex: hover ? 0 : -1,
                      onClick: (e) => {
                        e.stopPropagation();
                        onDelete();
                      },
                      onPointerDown: (e) => e.stopPropagation(),
                      onMouseEnter: (e) => {
                        e.stopPropagation();
                        setDeleteHover(true);
                      },
                      onMouseLeave: (e) => {
                        e.stopPropagation();
                        setDeleteHover(false);
                      },
                      onFocus: () => {
                        setHover(true);
                        setDeleteHover(true);
                      },
                      onBlur: () => {
                        setHover(false);
                        setDeleteHover(false);
                      },
                      style: {
                        position: "absolute",
                        top: 14,
                        right: (slot == null ? void 0 : slot.isQuickSave) ? 98 : 16,
                        zIndex: 3,
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        border: `1.5px solid ${deleteHover ? "rgba(255,154,146,0.96)" : "rgba(255,126,116,0.82)"}`,
                        background: deleteHover ? "rgba(255,232,230,0.96)" : "rgba(255,246,245,0.88)",
                        color: tokens.danger,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: hover ? 1 : 0,
                        visibility: hover ? "visible" : "hidden",
                        transform: hover ? `translateY(0) scale(${deleteHover ? 1.1 : 1}) rotate(${deleteHover ? 4 : 0}deg)` : "translateY(-4px) scale(0.92) rotate(0deg)",
                        pointerEvents: hover ? "auto" : "none",
                        boxShadow: deleteHover ? "0 16px 34px rgba(0,0,0,0.38), 0 0 0 2px rgba(224,99,90,0.22), 0 0 30px rgba(224,99,90,0.38)" : "0 12px 26px rgba(0,0,0,0.30), 0 0 0 2px rgba(255,255,255,0.30), 0 0 22px rgba(224,99,90,0.22)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        transition: `opacity ${tokens.durFast}ms ${tokens.easeOut}, visibility ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}, background ${tokens.durFast}ms ${tokens.easeOut}, box-shadow ${tokens.durFast}ms ${tokens.easeOut}`,
                        cursor: "default"
                      },
                      children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true", children: [
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M5 5l10 10M15 5 5 15",
                            fill: "none",
                            stroke: "rgba(255,255,255,0.98)",
                            strokeWidth: "4.8",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M5 5l10 10M15 5 5 15",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2.6",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        )
                      ] })
                    }
                  ),
                  isEmpty && /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: tokens.textFaint,
                        fontFamily: tokens.fontDisplay,
                        fontSize: 24,
                        fontWeight: 500,
                        letterSpacing: "0.08em"
                      },
                      children: "EMPTY"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  padding: "14px 18px 16px",
                  background: tokens.bgSunken,
                  borderTop: `1px solid ${tokens.borderSubtle}`,
                  minHeight: 72
                },
                children: slot ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  slot.currentSpeaker && /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        fontFamily: tokens.fontUI,
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: tokens.accent,
                        marginBottom: 6
                      },
                      children: slot.currentSpeaker
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: tokens.textPrimary,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textWrap: "pretty",
                        fontWeight: 400
                      },
                      children: slot.currentDialogueText || "—"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        marginTop: 8,
                        fontFamily: tokens.fontMono,
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        color: tokens.textFaint,
                        fontWeight: 500
                      },
                      children: formatTime(slot.modifiedTime)
                    }
                  )
                ] }) : /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      fontFamily: tokens.fontMono,
                      fontSize: 12,
                      letterSpacing: "0.20em",
                      color: tokens.textFaint,
                      textTransform: "uppercase",
                      fontWeight: 600
                    },
                    children: "no data"
                  }
                )
              }
            )
          ]
        }
      )
    }
  );
};
const CardActionButton = ({ onClick, children, primary, danger }) => {
  const [hover, setHover] = useState(false);
  const press = usePressable();
  const bg = primary ? hover ? tokens.accent : "rgba(212,165,116,0.92)" : danger ? hover ? tokens.danger : tokens.dangerSoft : hover ? tokens.bgElevated : "rgba(255,255,255,0.10)";
  const color = primary ? tokens.textOnAccent : danger ? hover ? "#fff" : tokens.danger : tokens.textPrimary;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: (e) => {
        e.stopPropagation();
        onClick();
      },
      onMouseEnter: () => setHover(true),
      onMouseLeave: (e) => {
        setHover(false);
        press.handlers.onPointerLeave(e);
      },
      onPointerDown: press.handlers.onPointerDown,
      style: {
        appearance: "none",
        border: `1px solid ${primary ? "transparent" : danger ? "rgba(224,99,90,0.45)" : tokens.borderRegular}`,
        background: bg,
        color,
        fontFamily: tokens.fontUI,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.06em",
        padding: "10px 18px",
        borderRadius: tokens.radiusSm,
        cursor: "default",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: primary ? hover ? `0 6px 20px ${tokens.accentGlow}` : "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.3)",
        transform: press.pressed ? "scale(0.94)" : hover ? "translateY(-2px) scale(1.04)" : "scale(1)",
        transition: `background ${tokens.durFast}ms ${tokens.easeOut}, color ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}, box-shadow ${tokens.durBase}ms ${tokens.easeOut}`
      },
      children
    }
  );
};
const ConfirmOverlay = ({ action, slotId, onConfirm, onCancel }) => {
  const enterStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "scale(0.96)" },
    duration: tokens.durFast
  });
  const conf = CONFIRM_CONF[action];
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": conf.title,
      onClick: onCancel,
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.42)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 20
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: (e) => e.stopPropagation(),
          style: {
            width: 360,
            maxWidth: "calc(100% - 48px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            padding: "26px 28px 24px",
            background: "rgba(18,20,24,0.92)",
            border: `1px solid ${conf.danger ? "rgba(224,99,90,0.52)" : tokens.borderAccent}`,
            borderRadius: tokens.radiusLg,
            boxShadow: conf.danger ? "0 28px 72px rgba(0,0,0,0.62), 0 0 36px rgba(224,99,90,0.16)" : `0 28px 72px rgba(0,0,0,0.62), 0 0 36px ${tokens.accentGlow}`,
            ...enterStyles
          },
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  fontFamily: tokens.fontMono,
                  fontSize: 12,
                  letterSpacing: "0.20em",
                  color: conf.danger ? tokens.danger : tokens.accent,
                  textTransform: "uppercase",
                  fontWeight: 700
                },
                children: [
                  "#",
                  String(slotId).padStart(2, "0")
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  fontFamily: tokens.fontDisplay,
                  fontSize: 22,
                  fontWeight: 600,
                  color: tokens.textPrimary,
                  textAlign: "center"
                },
                children: conf.title
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  fontFamily: tokens.fontUI,
                  fontSize: 14,
                  fontWeight: 500,
                  color: tokens.textSecondary,
                  textAlign: "center",
                  lineHeight: 1.6
                },
                children: conf.message
              }
            ),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 10, marginTop: 2 }, children: [
              /* @__PURE__ */ jsx(CardActionButton, { onClick: onConfirm, primary: !conf.danger, danger: conf.danger, children: conf.confirmLabel }),
              /* @__PURE__ */ jsx(CardActionButton, { onClick: onCancel, children: "取消" })
            ] })
          ]
        }
      )
    }
  );
};
const CONFIRM_CONF = {
  load: { title: "确认读取存档", message: "读取此存档？未保存的内容会丢失。", confirmLabel: "读取" },
  delete: { title: "确认删除存档", message: "删除此存档？此操作不可撤销。", confirmLabel: "删除", danger: true }
};
const ArrowButton = ({ dir, disabled, onClick, delay }) => {
  const [hover, setHover] = useState(false);
  const press = usePressable();
  const wrapperStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "translateY(14px)" },
    delay
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: { display: "flex", ...wrapperStyles },
      children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick,
          disabled,
          onMouseEnter: () => setHover(true),
          onMouseLeave: (e) => {
            setHover(false);
            press.handlers.onPointerLeave(e);
          },
          onPointerDown: press.handlers.onPointerDown,
          "aria-label": dir === "left" ? "上一页" : "下一页",
          style: {
            appearance: "none",
            background: hover && !disabled ? tokens.accentSoft : "transparent",
            border: `1.5px solid ${hover && !disabled ? tokens.borderAccent : tokens.borderSubtle}`,
            borderRadius: "50%",
            width: 64,
            height: 64,
            color: disabled ? tokens.textFaint : tokens.textPrimary,
            cursor: disabled ? "not-allowed" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: disabled ? 0.25 : 1,
            boxShadow: hover && !disabled ? `0 8px 24px rgba(0,0,0,0.4), 0 0 24px ${tokens.accentGlow}` : "0 2px 8px rgba(0,0,0,0.2)",
            transform: press.pressed ? "scale(0.92)" : hover && !disabled ? dir === "left" ? "translateX(-6px) scale(1.05)" : "translateX(6px) scale(1.05)" : "translateX(0) scale(1)",
            transition: `border-color ${tokens.durFast}ms ${tokens.easeOut}, opacity ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}, background ${tokens.durFast}ms ${tokens.easeOut}, box-shadow ${tokens.durBase}ms ${tokens.easeOut}`
          },
          children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": true, children: dir === "left" ? /* @__PURE__ */ jsx(
            "path",
            {
              d: "M13 3L6 10l7 7",
              stroke: "currentColor",
              strokeWidth: "2",
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) : /* @__PURE__ */ jsx(
            "path",
            {
              d: "M7 3l7 7-7 7",
              stroke: "currentColor",
              strokeWidth: "2",
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      )
    }
  );
};
function formatTime(ts) {
  const d = new Date(ts);
  const diffMin = (Date.now() - ts) / 6e4;
  if (diffMin < 1) return "刚刚";
  if (diffMin < 60) return `${Math.floor(diffMin)} 分钟前`;
  if (diffMin < 60 * 24) return `${Math.floor(diffMin / 60)} 小时前`;
  return d.toLocaleString("zh-CN", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
let SaveScreen = class extends Extension {
  /**
   * 注册快存/快读语义动作,然后订阅触发。键位由 KeyBindingSystem 管理:
   *   - default_keys: F5 / F9 (跟之前 settings 默认一致)
   *   - 玩家在"输入按键"tab 改键 → 自动生效,不需要 settings.subscribe
   *   - 跨存档持久化(走 GAME_SETTINGS_TABLE.userKeyBindings)
   */
  static onRegister(ctx) {
    ctx.visualUI.onBeforeOpen(VISUAL_SAVE_SCREEN, async () => {
      await ctx.archive.cacheGameSnapshot();
    });
    ctx.visualUI.onOpen(VISUAL_SAVE_SCREEN, (view) => {
      view.onClose(() => ctx.archive.clearGameSnapshot());
    });
    ctx.input.registerAction({
      id: "avg.internal.default-shell.quick-save",
      label: "快速存档",
      defaultKeys: ["F5"]
    });
    ctx.input.registerAction({
      id: "avg.internal.default-shell.quick-load",
      label: "快速读档",
      defaultKeys: ["F9"]
    });
    ctx.input.onAction("avg.internal.default-shell.quick-save", () => {
      ctx.archive.quickSave().then(() => showToast("已快速存档 (F5)", { type: "success" })).catch((err) => {
        console.error("[save-screen] quickSave failed", err);
        showToast("快速存档失败", { type: "error" });
      });
    });
    ctx.input.onAction("avg.internal.default-shell.quick-load", async () => {
      try {
        const loaded = await ctx.archive.quickLoad();
        if (!loaded) {
          showToast("没有可读取的快速存档 (F5 创建)", { type: "warn" });
        }
      } catch (err) {
        console.error("[save-screen] quickLoad failed", err);
        showToast("快速读档失败", { type: "error" });
      }
    });
  }
  /**
   * onInit 在 React 把 SaveScreen 渲染进 DOM **之前**触发。
   * 此时画面上还没有 SaveScreen 自身覆盖,触发引擎截图正好拿到"打开存档画面
   * 之前"的纯游戏画面。缓存到 ArchiveSystem,后续点保存复用,完全不闪。
   *
   * 见 archive-system.ts cachedGameSnapshot 字段说明。
   */
  onInit() {
    void this.context.archive.cacheGameSnapshot();
  }
  /** onClose 清缓存,避免下次打开 SaveScreen 时还用着上次的旧画面。 */
  onClose() {
    this.context.archive.clearGameSnapshot();
  }
  render() {
    const data = this.data;
    const mode = (data == null ? void 0 : data.mode) === "save" || (data == null ? void 0 : data.mode) === "load" ? data.mode : void 0;
    const source = (data == null ? void 0 : data.source) === "title" || (data == null ? void 0 : data.source) === "game" ? data.source : void 0;
    return {
      component: SaveScreenComponent,
      props: { mode, source }
    };
  }
};
__publicField$3(SaveScreen, "settings", settings((s) => ({
  slotCount: s.number("槽位数量").default(30).range(1, 200),
  allowDelete: s.boolean("允许删除存档").default(true)
  // 注:F5 / F9 快捷键由 ctx.input.registerAction (走 KeyBindingSystem) 注册,
  // 玩家在个性化 → 输入按键 tab 改键。
})));
SaveScreen = __decorateClass$3([
  extension({
    id: "save-screen",
    label: "存档画面",
    exposeUI: false,
    // 保留快存/快读和截图控制器,React 版不再进入 UI 列表
    autonomous: true,
    // F5/F9 全局键由 onRegister 绑定
    /**
     * 2026-05 Internal Extension Points §11.2:SaveScreen 同时支持 save / load 两个 slot,
     * 通过 mode payload 区分(由 ctx.system.invoke 透传)。
     *
     * 2026-05-19 实装:ctx.system.invoke(Save) → payload 默认填 { mode: "save" };
     * ctx.system.invoke(Load) → 调用方应该传 { mode: "load" }。
     * 兼容:payload 为空时按 "save" 模式渲染(toolbar 现有调用没传 payload)。
     */
    supportsSlot: [INTERNAL_SYSTEM_SLOT.Save, INTERNAL_SYSTEM_SLOT.Load]
  })
], SaveScreen);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, key + "", value);
const HistoryScreenComponent = () => {
  const ctx = useExtensionContext();
  const snapshot = ctx.history.useSnapshot();
  const allowVoiceReplay = ctx.settings.get("allowVoiceReplay") ?? true;
  const max = ctx.settings.get("maxEntries") ?? 200;
  const { phase, requestClose } = useScreenTransition(ctx, "history-screen");
  const entries = snapshot.entries.slice(-max);
  const listRef = useRef(null);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 100);
    return () => window.clearTimeout(t);
  }, [entries.length]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    const onAux = (e) => {
      if (e.button === 1) {
        e.preventDefault();
        requestClose();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("auxclick", onAux);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("auxclick", onAux);
    };
  }, [requestClose]);
  const STAGGER_COUNT = 12;
  const staggerStart = Math.max(0, entries.length - STAGGER_COUNT);
  const overlayStyles = useOverlayStyles(phase);
  const timelineStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "scaleY(0)" },
    delay: 120,
    duration: tokens.durSlow + 80
  });
  const emptyStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "translateY(14px)" },
    delay: 180
  });
  const onContextMenu = (e) => {
    e.preventDefault();
    requestClose();
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onContextMenu,
      style: {
        position: "absolute",
        inset: 0,
        background: tokens.bgOverlayStrong,
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        color: tokens.textPrimary,
        fontFamily: tokens.fontUI,
        display: "flex",
        flexDirection: "column",
        willChange: "opacity",
        ...overlayStyles
      },
      children: [
        /* @__PURE__ */ jsx(
          ScreenHeader,
          {
            eyebrow: "History",
            title: "历史回顾",
            phase,
            rightSlot: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(
                "span",
                {
                  style: {
                    fontFamily: tokens.fontMono,
                    fontSize: 14,
                    color: tokens.textMuted,
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                    marginRight: 4
                  },
                  children: [
                    entries.length,
                    " 条"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(CloseButton, { onClick: requestClose })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: listRef,
            className: "avg-shell-scrollbar",
            style: {
              flex: 1,
              overflowY: "auto",
              padding: "24px 80px 80px"
            },
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  maxWidth: 880,
                  margin: "0 auto",
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: 156,
                        top: 8,
                        bottom: 8,
                        width: 1.5,
                        background: `linear-gradient(180deg, transparent 0%, ${tokens.borderRegular} 8%, ${tokens.borderRegular} 92%, transparent 100%)`,
                        transformOrigin: "top",
                        ...timelineStyles
                      }
                    }
                  ),
                  entries.length === 0 && /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        textAlign: "center",
                        marginTop: 100,
                        fontFamily: tokens.fontDisplay,
                        fontSize: 22,
                        color: tokens.textFaint,
                        fontWeight: 500,
                        ...emptyStyles
                      },
                      children: "暂无历史记录"
                    }
                  ),
                  entries.map((entry, idx) => {
                    const shouldStagger = idx >= staggerStart;
                    const staggerDelay = shouldStagger ? 140 + (idx - staggerStart) * 30 : 0;
                    return /* @__PURE__ */ jsx(
                      HistoryEntry,
                      {
                        speaker: entry.name,
                        text: entry.text,
                        voiceUri: allowVoiceReplay ? entry.voiceUri : void 0,
                        isChoice: !!entry.isChoice,
                        onReplay: (uri) => void ctx.history.replayVoice(uri),
                        animationDelay: staggerDelay,
                        shouldAnimate: shouldStagger
                      },
                      entry.uuid ?? idx
                    );
                  })
                ]
              }
            )
          }
        )
      ]
    }
  );
};
const HistoryEntry = ({
  speaker,
  text,
  voiceUri,
  isChoice,
  onReplay,
  animationDelay,
  shouldAnimate
}) => {
  const [hover, setHover] = useState(false);
  const wrapperStyles = useEnterStyles({
    hidden: shouldAnimate ? { opacity: 0, transform: "translateY(12px) scale(0.98)" } : {},
    delay: animationDelay
  });
  return /* @__PURE__ */ jsx("div", { style: shouldAnimate ? wrapperStyles : void 0, children: /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: "grid",
        gridTemplateColumns: "144px 24px 1fr auto",
        gap: 16,
        padding: "18px 16px",
        position: "relative",
        alignItems: "start",
        borderRadius: tokens.radiusMd,
        background: hover ? tokens.accentSoft : "transparent",
        marginLeft: -16,
        marginRight: -16,
        transition: `background ${tokens.durBase}ms ${tokens.easeOut}`
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              fontFamily: tokens.fontUI,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: isChoice ? tokens.accent : tokens.textPrimary,
              textAlign: "right",
              paddingTop: 2,
              paddingRight: 8
            },
            children: isChoice ? "▸ 选择" : speaker || ""
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "relative",
              height: "100%",
              display: "flex",
              justifyContent: "center"
            },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  width: 10,
                  height: 10,
                  marginTop: 8,
                  borderRadius: "50%",
                  background: hover || isChoice ? tokens.accent : tokens.borderStrong,
                  border: `2.5px solid ${tokens.bgOverlayStrong}`,
                  transition: `background ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}`,
                  transform: hover ? "scale(1.4)" : "scale(1)",
                  boxShadow: hover ? `0 0 0 6px ${tokens.accentSoft}, 0 0 16px ${tokens.accentGlow}` : "none"
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              fontSize: 16,
              lineHeight: 1.7,
              color: isChoice ? tokens.accent : tokens.textPrimary,
              fontStyle: isChoice ? "normal" : "normal",
              fontWeight: isChoice ? 600 : 400,
              paddingTop: 0,
              textWrap: "pretty"
            },
            children: text
          }
        ),
        /* @__PURE__ */ jsx("div", { style: { paddingTop: 0 }, children: voiceUri && /* @__PURE__ */ jsx(
          VoiceButton,
          {
            onClick: () => onReplay(voiceUri),
            highlight: hover
          }
        ) })
      ]
    }
  ) });
};
const VoiceButton = ({ onClick, highlight }) => {
  const press = usePressable();
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      onPointerDown: press.handlers.onPointerDown,
      onPointerLeave: press.handlers.onPointerLeave,
      "aria-label": "重播语音",
      title: "重播语音",
      style: {
        appearance: "none",
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: `1.5px solid ${highlight ? tokens.borderAccent : tokens.borderSubtle}`,
        background: highlight ? tokens.accentSoft : "transparent",
        color: highlight ? tokens.accent : tokens.textMuted,
        cursor: "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: press.pressed ? "scale(0.92)" : "scale(1)",
        transition: `all ${tokens.durFast}ms ${tokens.easeOut}`,
        boxShadow: highlight ? `0 0 12px ${tokens.accentGlow}` : "none"
      },
      children: /* @__PURE__ */ jsx("svg", { width: "13", height: "13", viewBox: "0 0 13 13", "aria-hidden": true, children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M3 2.5v8l7-4z",
          fill: "currentColor",
          stroke: "currentColor",
          strokeWidth: "0.5",
          strokeLinejoin: "round"
        }
      ) })
    }
  );
};
let HistoryScreen = class extends Extension {
  /**
   * 注册"打开历史画面"语义动作 + 订阅触发。键位由 KeyBindingSystem 管理:
   *   - default_keys: middleclick (鼠标中键,跟之前 settings 默认一致)
   *   - 玩家在"输入按键"tab 改键 → 自动生效
   */
  static onRegister(ctx) {
    ctx.input.registerAction({
      id: "avg.internal.default-shell.open-history",
      label: "呼出历史画面",
      defaultKeys: ["middleclick"]
    });
    ctx.input.onAction("avg.internal.default-shell.open-history", () => {
      void ctx.system.invoke(INTERNAL_SYSTEM_SLOT.History, void 0, {
        modal: true
      });
    });
  }
  render() {
    return { component: HistoryScreenComponent, props: {} };
  }
};
__publicField$2(HistoryScreen, "settings", settings((s) => ({
  maxEntries: s.number("最大历史条数").default(200).range(10, 1e3).step(10),
  allowVoiceReplay: s.boolean("允许语音重播").default(true)
  // 注:呼出快捷键由 ctx.input.registerAction (走 KeyBindingSystem) 注册,
  // 玩家在个性化 → 输入按键 tab 改键。
})));
HistoryScreen = __decorateClass$2([
  extension({
    id: "history-screen",
    label: "历史画面",
    exposeUI: false,
    // 保留呼出快捷键,React 版不再进入 UI 列表
    autonomous: true,
    // 全局打开历史快捷键由 onRegister 绑定
    /** 2026-05 Internal Extension Points §6.1:声明本 UI 实现"历史"槽位。 */
    supportsSlot: INTERNAL_SYSTEM_SLOT.History
  })
], HistoryScreen);
const NEUTRAL_TEXT_SPEED_SETTING = 50;
const MAX_TEXT_SPEED_SETTING = 100;
function finiteNumericValue(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value !== "string" || value.trim() === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}
function normalizeTextSpeedSetting(value) {
  const numeric = finiteNumericValue(value);
  if (numeric === null) return NEUTRAL_TEXT_SPEED_SETTING;
  return Math.round(Math.max(0, Math.min(MAX_TEXT_SPEED_SETTING, numeric)));
}
const FALLBACK_SETTINGS_TEXT_SPEED = NEUTRAL_TEXT_SPEED_SETTING;
function normalizeSettingsTextSpeed(value) {
  return normalizeTextSpeedSetting(value);
}
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, key + "", value);
const SettingsScreenComponent = () => {
  const ctx = useExtensionContext();
  const allowReset = ctx.settings.get("allowReset") ?? true;
  const { phase, requestClose } = useScreenTransition(ctx, "settings-screen");
  const [masterVolume, setMasterVolume] = ctx.config.useValue("masterVolume");
  const [bgmVolume, setBgmVolume] = ctx.config.useValue("bgmVolume");
  const [seVolume, setSeVolume] = ctx.config.useValue("seVolume");
  const [voiceVolume, setVoiceVolume] = ctx.config.useValue("voiceVolume");
  const [textSpeed, setTextSpeed] = ctx.config.useValue("textSpeed");
  const [autoSpeed, setAutoSpeed] = ctx.config.useValue("autoModeTextSpeed");
  const [skipMode, setSkipMode] = ctx.config.useValue("skipMode");
  const [stopVoice, setStopVoice] = ctx.config.useValue(
    "stopVoiceOnNextDialogue"
  );
  const canToggleFullscreen = ctx.game.window.canFullscreen();
  const [fullscreen, setFullscreen] = ctx.game.window.useFullscreen();
  const onReset = () => {
    void ctx.config.reset();
  };
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);
  const ROW_BASE = 120;
  const ROW_GAP = 35;
  const SECTION_GAP = 80;
  const DISPLAY_SECTION_DELAY = ROW_BASE + SECTION_GAP * 2;
  const overlayStyles = useOverlayStyles(phase);
  const [backdropOn, setBackdropOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setBackdropOn(true), 100);
    return () => window.clearTimeout(t);
  }, []);
  const onContextMenu = (e) => {
    e.preventDefault();
    requestClose();
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onContextMenu,
      style: {
        position: "absolute",
        inset: 0,
        background: tokens.bgOverlay,
        backdropFilter: backdropOn ? "blur(24px)" : "none",
        WebkitBackdropFilter: backdropOn ? "blur(24px)" : "none",
        color: tokens.textPrimary,
        fontFamily: tokens.fontUI,
        display: "flex",
        flexDirection: "column",
        ...overlayStyles
      },
      children: [
        /* @__PURE__ */ jsx(
          ScreenHeader,
          {
            eyebrow: "Preferences",
            title: "设置",
            phase,
            rightSlot: /* @__PURE__ */ jsxs(Fragment, { children: [
              allowReset && /* @__PURE__ */ jsx(SecondaryButton, { onClick: onReset, children: "恢复默认" }),
              /* @__PURE__ */ jsx(CloseButton, { onClick: requestClose })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "avg-shell-scrollbar",
            style: {
              flex: 1,
              overflowY: "auto",
              padding: "32px 80px 80px"
            },
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  maxWidth: 880,
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 40
                },
                children: [
                  /* @__PURE__ */ jsxs(Section, { title: "音量", sectionDelay: ROW_BASE - 40, phase, children: [
                    /* @__PURE__ */ jsx(
                      SliderRow,
                      {
                        label: "主音量",
                        value: masterVolume ?? 100,
                        onChange: (v) => setMasterVolume(v),
                        delay: ROW_BASE + ROW_GAP * 0,
                        phase
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      SliderRow,
                      {
                        label: "背景音乐",
                        value: bgmVolume ?? 100,
                        onChange: (v) => setBgmVolume(v),
                        delay: ROW_BASE + ROW_GAP * 1,
                        phase
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      SliderRow,
                      {
                        label: "音效",
                        value: seVolume ?? 100,
                        onChange: (v) => setSeVolume(v),
                        delay: ROW_BASE + ROW_GAP * 2,
                        phase
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      SliderRow,
                      {
                        label: "语音",
                        value: voiceVolume ?? 100,
                        onChange: (v) => setVoiceVolume(v),
                        delay: ROW_BASE + ROW_GAP * 3,
                        phase,
                        isLast: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs(Section, { title: "文本与播放", sectionDelay: ROW_BASE + SECTION_GAP, phase, children: [
                    /* @__PURE__ */ jsx(
                      SliderRow,
                      {
                        label: "文本速度",
                        value: normalizeSettingsTextSpeed(
                          textSpeed ?? FALLBACK_SETTINGS_TEXT_SPEED
                        ),
                        onChange: (v) => setTextSpeed(normalizeSettingsTextSpeed(v)),
                        delay: ROW_BASE + SECTION_GAP + ROW_GAP * 1,
                        phase
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      SliderRow,
                      {
                        label: "自动播放速度",
                        value: normalizeSettingsTextSpeed(
                          autoSpeed ?? FALLBACK_SETTINGS_TEXT_SPEED
                        ),
                        onChange: (v) => setAutoSpeed(normalizeSettingsTextSpeed(v)),
                        delay: ROW_BASE + SECTION_GAP + ROW_GAP * 2,
                        phase
                      }
                    ),
                    /* @__PURE__ */ jsx(Row, { label: "跳过模式", delay: ROW_BASE + SECTION_GAP + ROW_GAP * 3, phase, children: /* @__PURE__ */ jsx(
                      Segmented,
                      {
                        options: [
                          { value: "read", label: "只跳已读" },
                          { value: "all", label: "全部跳过" }
                        ],
                        value: skipMode ?? "read",
                        onChange: (v) => setSkipMode(v)
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Row, { label: "切换对话停止上句语音", delay: ROW_BASE + SECTION_GAP + ROW_GAP * 4, phase, isLast: true, children: /* @__PURE__ */ jsx(
                      Switch,
                      {
                        checked: !!stopVoice,
                        onChange: (v) => setStopVoice(v)
                      }
                    ) })
                  ] }),
                  canToggleFullscreen && /* @__PURE__ */ jsx(
                    Section,
                    {
                      title: "显示",
                      sectionDelay: DISPLAY_SECTION_DELAY,
                      phase,
                      children: /* @__PURE__ */ jsx(
                        Row,
                        {
                          label: "屏幕模式",
                          delay: DISPLAY_SECTION_DELAY + ROW_GAP,
                          phase,
                          isLast: true,
                          children: /* @__PURE__ */ jsx(
                            Segmented,
                            {
                              options: [
                                { value: "windowed", label: "窗口" },
                                { value: "fullscreen", label: "全屏" }
                              ],
                              value: fullscreen ? "fullscreen" : "windowed",
                              onChange: (v) => setFullscreen(v === "fullscreen")
                            }
                          )
                        }
                      )
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
};
const Section = ({ title, sectionDelay, children }) => {
  const headerStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "translateX(-16px)" },
    delay: sectionDelay
  });
  const lineStyles = useEnterStyles({
    hidden: { opacity: 0, transform: "scaleX(0)" },
    delay: sectionDelay + 60
  });
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 20,
          ...headerStyles
        },
        children: [
          /* @__PURE__ */ jsx(
            "h3",
            {
              style: {
                fontFamily: tokens.fontDisplay,
                fontSize: 24,
                fontWeight: 700,
                margin: 0,
                letterSpacing: "0.005em"
              },
              children: title
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                flex: 1,
                height: 1,
                background: `linear-gradient(90deg, ${tokens.borderRegular} 0%, transparent 100%)`,
                transformOrigin: "left",
                ...lineStyles
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          background: tokens.bgSurface,
          border: `1px solid ${tokens.borderSubtle}`,
          borderRadius: tokens.radiusLg,
          padding: "8px 32px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)"
        },
        children
      }
    )
  ] });
};
const Row = ({ label, delay, isLast, children }) => {
  const styles = useEnterStyles({
    hidden: { opacity: 0, transform: "translateY(12px) scale(0.98)" },
    delay
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "20px 0",
        borderBottom: isLast ? "none" : `1px solid ${tokens.borderSubtle}`,
        ...styles
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              minWidth: 200,
              fontSize: 16,
              color: tokens.textPrimary,
              fontWeight: 500
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center"
            },
            children
          }
        )
      ]
    }
  );
};
const SliderRow = ({ label, value, onChange, delay, phase, isLast }) => {
  const safeDisplayValue = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
  return /* @__PURE__ */ jsxs(Row, { label, delay, phase, isLast, children: [
    /* @__PURE__ */ jsx(Slider, { value: safeDisplayValue, onChange, min: 0, max: 100 }),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          fontFamily: tokens.fontMono,
          fontSize: 14,
          color: tokens.textPrimary,
          minWidth: 48,
          textAlign: "right",
          paddingLeft: 20,
          fontVariantNumeric: "tabular-nums",
          fontWeight: 600
        },
        children: Math.round(safeDisplayValue)
      }
    )
  ] });
};
const Slider = ({ value, min, max, onChange }) => {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const safeValue = Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
  const pct = (safeValue - min) / (max - min) * 100;
  const updateFromClientX = (clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onChange(min + ratio * (max - min));
  };
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: trackRef,
      onPointerDown: (e) => {
        setDragging(true);
        updateFromClientX(e.clientX);
      },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        position: "relative",
        flex: 1,
        height: 28,
        display: "flex",
        alignItems: "center",
        cursor: "default",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              height: 5,
              background: tokens.borderSubtle,
              borderRadius: 999
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: 0,
              width: `${pct}%`,
              height: 5,
              background: `linear-gradient(90deg, ${tokens.accent} 0%, ${tokens.accent} 100%)`,
              borderRadius: 999,
              boxShadow: hover || dragging ? `0 0 12px ${tokens.accentGlow}` : "none",
              transition: dragging ? "none" : `width ${tokens.durFast}ms ${tokens.easeOut}, box-shadow ${tokens.durBase}ms ${tokens.easeOut}`
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: `${pct}%`,
              width: 20,
              height: 20,
              marginLeft: -10,
              borderRadius: "50%",
              background: tokens.textPrimary,
              boxShadow: dragging || hover ? `0 0 0 8px ${tokens.accentSoft}, 0 4px 12px rgba(0,0,0,0.5)` : "0 2px 8px rgba(0,0,0,0.4)",
              transform: dragging ? "scale(1.18)" : hover ? "scale(1.08)" : "scale(1)",
              transition: dragging ? `box-shadow ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}` : `left ${tokens.durFast}ms ${tokens.easeOut}, box-shadow ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}`
            }
          }
        )
      ]
    }
  );
};
const Segmented = ({ options, value, onChange }) => {
  const idx = options.findIndex((o) => o.value === value);
  const safeIdx = idx >= 0 ? idx : 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        position: "relative",
        display: "inline-flex",
        background: tokens.bgSunken,
        border: `1px solid ${tokens.borderSubtle}`,
        borderRadius: tokens.radiusMd,
        padding: 4
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 4,
              bottom: 4,
              left: `calc(${safeIdx} * (100% - 8px) / ${options.length} + 4px)`,
              width: `calc((100% - 8px) / ${options.length})`,
              background: tokens.accent,
              borderRadius: tokens.radiusSm,
              transition: `left ${tokens.durBase}ms ${tokens.easeOut}`,
              boxShadow: `0 2px 12px ${tokens.accentGlow}`
            }
          }
        ),
        options.map((opt) => /* @__PURE__ */ jsx(
          SegmentedItem,
          {
            active: opt.value === value,
            onClick: () => onChange(opt.value),
            children: opt.label
          },
          opt.value
        ))
      ]
    }
  );
};
const SegmentedItem = ({ active, onClick, children }) => {
  const press = usePressable();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...press.handlers,
      onClick,
      style: {
        position: "relative",
        zIndex: 1,
        appearance: "none",
        background: "transparent",
        border: "none",
        padding: "10px 24px",
        fontSize: 14,
        fontFamily: tokens.fontUI,
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: active ? tokens.textOnAccent : tokens.textMuted,
        cursor: "default",
        minWidth: 116,
        transform: press.pressed ? "scale(0.96)" : "scale(1)",
        transition: `color ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}`
      },
      children
    }
  );
};
const Switch = ({ checked, onChange }) => {
  const press = usePressable();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...press.handlers,
      onClick: () => onChange(!checked),
      role: "switch",
      "aria-checked": checked,
      style: {
        appearance: "none",
        position: "relative",
        width: 52,
        height: 30,
        borderRadius: 999,
        border: `1px solid ${checked ? tokens.borderAccent : tokens.borderRegular}`,
        background: checked ? tokens.accent : tokens.bgSunken,
        cursor: "default",
        padding: 0,
        transform: press.pressed ? "scale(0.94)" : "scale(1)",
        transition: `background ${tokens.durBase}ms ${tokens.easeOut}, border-color ${tokens.durBase}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}`,
        boxShadow: checked ? `0 0 16px ${tokens.accentGlow}` : "none"
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            position: "absolute",
            top: 3,
            left: checked ? 24 : 3,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: checked ? tokens.textOnAccent : tokens.textPrimary,
            boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
            transition: `left ${tokens.durBase}ms ${tokens.easeOut}, background ${tokens.durBase}ms ${tokens.easeOut}`
          }
        }
      )
    }
  );
};
let SettingsScreen = class extends Extension {
  /**
   * 可视化设置界面(本扩展 ui/settings-screen.json)的控制器 ——
   * 扩展复合容器(视图/控制器)的第一个 dogfooding:布局住在 JSON
   * (编辑器可看可拷可改),动态行为在这里操作控件。
   * 「设置」槽位默认绑定 "ui:@avg.internal.default-shell/settings-screen"。
   * 本类只保留控制器职责,不再向 UI host 导出 React 版画面。
   */
  static onRegister(ctx) {
    ctx.visualUI.onOpen(
      "@avg.internal.default-shell/settings-screen",
      (view) => {
        var _a;
        if (!ctx.game.window.canFullscreen()) {
          for (const refId of [
            "display-card",
            "display-title",
            "display-label",
            "display-switch"
          ]) {
            (_a = view.get(refId)) == null ? void 0 : _a.setHidden(true);
          }
        }
        const resetButton = view.get("reset-btn");
        let feedbackTimer;
        resetButton == null ? void 0 : resetButton.on("click", () => {
          if (feedbackTimer !== void 0) clearTimeout(feedbackTimer);
          resetButton.setProps({ text: "正在恢复…" });
          void ctx.config.reset().then(() => {
            resetButton.setProps({ text: "已恢复" });
            feedbackTimer = setTimeout(() => {
              resetButton.setProps({ text: "恢复默认" });
            }, 1e3);
          }).catch((err) => {
            console.error("[settings-screen] 恢复默认设置失败", err);
            resetButton.setProps({ text: "恢复失败" });
            feedbackTimer = setTimeout(() => {
              resetButton.setProps({ text: "恢复默认" });
            }, 1400);
          });
        });
        view.onClose(() => {
          if (feedbackTimer !== void 0) clearTimeout(feedbackTimer);
        });
      }
    );
  }
  render() {
    return { component: SettingsScreenComponent, props: {} };
  }
};
__publicField$1(SettingsScreen, "settings", settings((s) => ({
  allowReset: s.boolean("允许重置默认").default(true)
})));
SettingsScreen = __decorateClass$1([
  extension({
    id: "settings-screen",
    label: "设置画面",
    exposeUI: false,
    // 保留可视化界面控制器,React 版不再进入 UI 列表
    // 2026-05 Internal Extension Points §6.1:声明本 UI 实现"设置"槽位。
    supportsSlot: INTERNAL_SYSTEM_SLOT.Settings
  })
], SettingsScreen);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "", value);
const ITEMS = [
  { key: "skip", label: "跳过" },
  { key: "auto", label: "自动" },
  { key: "save", label: "存档" },
  { key: "load", label: "读档" },
  { key: "quickSave", label: "快存" },
  { key: "quickLoad", label: "快读" },
  { key: "history", label: "历史" },
  { key: "settings", label: "设置" },
  { key: "hide", label: "隐藏" }
];
const ToolbarComponent = () => {
  const ctx = useExtensionContext();
  const showToolbar = ctx.settings.useValue("showToolbar")[0] ?? true;
  const showSkip = ctx.settings.useValue("showSkip")[0] ?? true;
  const showAuto = ctx.settings.useValue("showAuto")[0] ?? true;
  const showSave = ctx.settings.useValue("showSave")[0] ?? true;
  const showLoad = ctx.settings.useValue("showLoad")[0] ?? true;
  const showQuickSave = ctx.settings.useValue("showQuickSave")[0] ?? true;
  const showQuickLoad = ctx.settings.useValue("showQuickLoad")[0] ?? true;
  const showHistory = ctx.settings.useValue("showHistory")[0] ?? true;
  const showSettings = ctx.settings.useValue("showSettings")[0] ?? true;
  const showHide = ctx.settings.useValue("showHide")[0] ?? true;
  const skipActive = ctx.dialogue.useSkipMode();
  const autoActive = ctx.dialogue.useAutoMode();
  const activeSet = {
    skip: skipActive ? "SKIP" : void 0,
    auto: autoActive ? "AUTO" : void 0
  };
  const visibleSet = {
    skip: showSkip,
    auto: showAuto,
    save: showSave,
    load: showLoad,
    quickSave: showQuickSave,
    quickLoad: showQuickLoad,
    history: showHistory,
    settings: showSettings,
    hide: showHide
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const [hoverKey, setHoverKey] = useState(null);
  if (!showToolbar) return null;
  const handle = (key) => {
    if (key === "skip") {
      ctx.dialogue.toggleSkipMode();
    } else if (key === "auto") {
      ctx.dialogue.toggleAutoMode();
    } else if (key === "settings") {
      void ctx.system.invoke(INTERNAL_SYSTEM_SLOT.Settings, void 0, {
        modal: true
      });
    } else if (key === "save") {
      void ctx.system.invoke(
        INTERNAL_SYSTEM_SLOT.Save,
        { mode: "save" },
        { modal: true }
      );
    } else if (key === "load") {
      void ctx.system.invoke(
        INTERNAL_SYSTEM_SLOT.Load,
        { mode: "load", source: "game" },
        { modal: true }
      );
    } else if (key === "history") {
      void ctx.system.invoke(INTERNAL_SYSTEM_SLOT.History, void 0, {
        modal: true
      });
    } else if (key === "quickSave") {
      ctx.archive.quickSave().then(() => showToast("已快速存档", { type: "success" })).catch((err) => {
        console.error("[toolbar] quickSave failed", err);
        showToast("快速存档失败", { type: "error" });
      });
    } else if (key === "quickLoad") {
      void (async () => {
        try {
          const loaded = await ctx.archive.quickLoad();
          if (!loaded) {
            showToast("没有可读取的快速存档", { type: "warn" });
          }
        } catch (err) {
          console.error("[toolbar] quickLoad failed", err);
          showToast("快速读档失败", { type: "error" });
        }
      })();
    } else if (key === "hide") {
      ctx.dialogue.hideBox();
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "rgba(11, 13, 16, 0.82)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            border: `1px solid ${tokens.borderSubtle}`,
            borderRadius: tokens.radiusPill,
            padding: "8px 12px",
            boxShadow: "0 18px 48px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(255,255,255,0.02)",
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            opacity: mounted ? 1 : 0,
            transition: `transform ${tokens.durSlow}ms ${tokens.easeOut}, opacity ${tokens.durBase}ms ${tokens.easeOut}`
          },
          children: ITEMS.map((item) => {
            if (!visibleSet[item.key]) return null;
            return /* @__PURE__ */ jsx(
              ToolbarButton,
              {
                isHover: hoverKey === item.key,
                activeBadge: activeSet[item.key],
                onMouseEnter: () => setHoverKey(item.key),
                onMouseLeave: () => setHoverKey(null),
                onClick: () => handle(item.key),
                children: item.label
              },
              item.key
            );
          })
        }
      )
    }
  );
};
const ToolbarButton = ({
  isHover,
  activeBadge,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children
}) => {
  const press = usePressable();
  const isActive = !!activeBadge;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onMouseEnter,
      onMouseLeave: (e) => {
        onMouseLeave();
        press.handlers.onPointerLeave(e);
      },
      onPointerDown: press.handlers.onPointerDown,
      onClick,
      style: {
        position: "relative",
        appearance: "none",
        // active 态优先级高于 hover —— 让"自动播放中"始终以 accent 配色呈现,
        // 即便鼠标没悬停也能识别。
        background: isActive ? tokens.accentSoft : isHover ? tokens.accentSoft : "transparent",
        border: "none",
        color: isActive ? tokens.accent : isHover ? tokens.accent : tokens.textPrimary,
        fontFamily: tokens.fontUI,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.08em",
        padding: "10px 20px",
        borderRadius: tokens.radiusPill,
        cursor: "default",
        transform: press.pressed ? "scale(0.94) translateY(0)" : isHover ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        transition: `color ${tokens.durFast}ms ${tokens.easeOut}, background ${tokens.durFast}ms ${tokens.easeOut}, transform ${tokens.durFast}ms ${tokens.easeOut}`,
        // 呼吸动画只在 active 态运行;否则 animation:none 让 transition 接管样式。
        animation: isActive ? "avg-toolbar-active-breath 2.4s ease-in-out infinite" : "none"
      },
      children: [
        children,
        activeBadge && /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              top: -4,
              right: -4,
              padding: "2px 6px",
              background: tokens.accent,
              color: tokens.textOnAccent,
              borderRadius: 999,
              fontFamily: tokens.fontMono,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.12em",
              lineHeight: 1.1,
              boxShadow: `0 0 10px ${tokens.accentGlow}`,
              pointerEvents: "none"
            },
            children: activeBadge
          }
        )
      ]
    }
  );
};
const registeredEngines = /* @__PURE__ */ new WeakSet();
let Toolbar = class extends Extension {
  /**
   * Toolbar 跟随 dialogue 显隐 —— 当 dialogue.line() 非空时显示,空时隐藏。
   * 订阅 dialogue:changed,值变 → ensureToolbarVisibility 同步状态。
   */
  static onRegister(ctx) {
    const host = ctx.getHost();
    const engineKey = host == null ? void 0 : host.application;
    if (engineKey && registeredEngines.has(engineKey)) return;
    if (engineKey) registeredEngines.add(engineKey);
    let desiredVisible = false;
    let appliedVisible = null;
    let reconciling = false;
    let syncRevision = 0;
    const reconcile = async () => {
      if (reconciling) return;
      reconciling = true;
      try {
        while (appliedVisible === null || appliedVisible !== desiredVisible) {
          const targetVisible = desiredVisible;
          const attemptRevision = syncRevision;
          try {
            if (targetVisible) {
              await ctx.system.invoke(INTERNAL_SYSTEM_SLOT.Toolbar);
            } else {
              await ctx.system.close(INTERNAL_SYSTEM_SLOT.Toolbar);
            }
            appliedVisible = targetVisible;
          } catch (err) {
            if (targetVisible !== desiredVisible || attemptRevision !== syncRevision) {
              continue;
            }
            console.warn(
              targetVisible ? "[toolbar] 工具栏系统槽位打开失败" : "[toolbar] 工具栏系统槽位关闭失败",
              err
            );
            return;
          }
        }
      } finally {
        reconciling = false;
      }
    };
    const sync = () => {
      const enabled = ctx.settings.get("showToolbar") ?? true;
      const inDialogue = ctx.dialogue.line() !== null;
      desiredVisible = enabled && inDialogue;
      syncRevision += 1;
      void reconcile();
    };
    ctx.subscribe("dialogue:changed", sync);
    ctx.settings.subscribe("showToolbar", sync);
    sync();
  }
  render() {
    return { component: ToolbarComponent, props: {} };
  }
};
__publicField(Toolbar, "settings", settings((s) => ({
  // 总开关:整个工具栏是否在对话期间显示。
  // 关闭后,所有按钮一并隐藏 —— 这是相对下面按钮级开关更高一层的"模块级"开关。
  showToolbar: s.boolean("显示对话工具栏").default(true),
  // 下面每个按钮级开关用 enabledWhen 挂到总开关上:总开关关掉时,
  // 它们在设置面板里置灰(不可点),但各自的值保持不变 —— 重开总开关后恢复。
  showSkip: s.boolean("显示跳过按钮").default(true).enabledWhen("showToolbar"),
  showAuto: s.boolean("显示自动播放按钮").default(true).enabledWhen("showToolbar"),
  showSave: s.boolean("显示存档按钮").default(true).enabledWhen("showToolbar"),
  showLoad: s.boolean("显示读档按钮").default(true).enabledWhen("showToolbar"),
  showQuickSave: s.boolean("显示快速存档按钮").default(true).enabledWhen("showToolbar"),
  showQuickLoad: s.boolean("显示快速读档按钮").default(true).enabledWhen("showToolbar"),
  showHistory: s.boolean("显示历史按钮").default(true).enabledWhen("showToolbar"),
  showSettings: s.boolean("显示设置按钮").default(true).enabledWhen("showToolbar"),
  showHide: s.boolean("显示隐藏对话框按钮").default(true).enabledWhen("showToolbar")
})));
Toolbar = __decorateClass([
  extension({
    id: "toolbar",
    label: "工具栏",
    exposeUI: false,
    // 保留跟随对话显隐的控制器,React 版不再进入 UI 列表
    autonomous: true
    // toolbar 跟随 dialogue 显隐
    // 本类只负责跟随 dialogue 显隐；实际打开哪份工具栏由 Toolbar 系统槽位决定。
  })
], Toolbar);
const visualUIModules = /* @__PURE__ */ Object.assign({ "../ui/choice-dialog.json": __vite_glob_0_0, "../ui/dialogue-box.json": __vite_glob_0_1, "../ui/gallery-screen.json": __vite_glob_0_2, "../ui/history-screen.json": __vite_glob_0_3, "../ui/input-dialog.json": __vite_glob_0_4, "../ui/message-box.json": __vite_glob_0_5, "../ui/paragraph-cinematic-centered.json": __vite_glob_0_6, "../ui/paragraph-handwritten.json": __vite_glob_0_7, "../ui/paragraph-literary.json": __vite_glob_0_8, "../ui/paragraph-sharp.json": __vite_glob_0_9, "../ui/paragraph.json": __vite_glob_0_10, "../ui/save-screen.json": __vite_glob_0_11, "../ui/settings-screen.json": __vite_glob_0_12, "../ui/title-screen.json": __vite_glob_0_13, "../ui/toolbar.json": __vite_glob_0_14 });
const visualUI = Object.fromEntries(
  Object.entries(visualUIModules).map(([path, mod]) => [
    path.replace(/^.*\/([^/]+)\.json$/, "$1"),
    mod.default
  ])
);
export {
  GalleryScreen,
  HistoryScreen,
  SaveScreen,
  SettingsScreen,
  TitleScreen,
  Toolbar,
  manifest,
  visualUI
};
//# sourceMappingURL=index.mjs.map

import { Extension, meta, method } from "@avg-studio/sdk";
const EXTENSION_ID = "shiftz.backspace";
const METHOD_REF = `${EXTENSION_ID}/backspace-to`;
const INLINE_CLASS = "shiftz-backspace-inline";
const DIALOGUE_TYPES = /* @__PURE__ */ new Set(["dialogue", "narration", "storyParagraph"]);
const SOURCE_TRANSPARENT_TYPES = /* @__PURE__ */ new Set(["wait"]);
const WAIT_OPTIONS = [0, 200, 500, 1e3, 2e3, 3e3];
const DIALOGUE_TEXT_SELECTOR = [
  ".layer-container.dialogue .text",
  ".dialogue-box .text",
  "[data-visual-ui-dialogue-text]",
  '[data-visual-ui-dialogue-layer="text"]'
].join(", ");
const segmenter = typeof Intl.Segmenter === "function" ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null;
let activeRun = 0;
const manifest = {
  id: EXTENSION_ID,
  name: "句尾退格",
  description: "将已经显示完成的旁白或角色对白逐字退格到指定字符或完全清空。",
  author: "shiftz",
  version: "1.5.1",
  entry: "dist/index.mjs",
  sdkVersion: ">=1.9.0",
  minHostVersion: "1.9.1"
};
function graphemes(text) {
  if (segmenter) return [...segmenter.segment(text)].map(({ segment }) => segment);
  return Array.from(text);
}
function isVisible(element) {
  const rect = element.getBoundingClientRect();
  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  return rect.width > 0 && rect.height > 0 && style?.display !== "none" && style?.visibility !== "hidden" && Number(style?.opacity ?? 1) !== 0;
}
function findDialogueTextElement(text) {
  const gameViews = [...document.querySelectorAll("#game-view")];
  const roots = gameViews.length > 0 ? gameViews : [document];
  let best = null;
  let bestScore = -Infinity;
  for (const root of roots) {
    for (const element of root.querySelectorAll(DIALOGUE_TEXT_SELECTOR)) {
      if (!isVisible(element)) continue;
      if (element.closest('[contenteditable="true"], .bn-block-content')) continue;
      const content = element.textContent ?? "";
      if (!content.includes(text)) continue;
      const rect = element.getBoundingClientRect();
      const exact = content === text ? 1e4 : 0;
      const viewportHeight = element.ownerDocument.defaultView?.innerHeight ?? 1;
      const nearBottom = rect.bottom / Math.max(1, viewportHeight);
      const compact = -Math.abs(content.length - text.length) * 10;
      const score = exact + nearBottom * 100 + compact;
      if (score > bestScore) {
        best = element;
        bestScore = score;
      }
    }
    if (bestScore >= 1e4) break;
  }
  return best;
}
function waitForDialogueTextElement(text, timeout = 300) {
  const current = findDialogueTextElement(text);
  if (current) return Promise.resolve(current);
  return new Promise((resolve) => {
    let settled = false;
    const finish = (element) => {
      if (settled) return;
      settled = true;
      observer.disconnect();
      clearTimeout(timer);
      resolve(element);
    };
    const observer = new MutationObserver(() => {
      const element = findDialogueTextElement(text);
      if (element) finish(element);
    });
    const timer = setTimeout(() => finish(findDialogueTextElement(text)), timeout);
    observer.observe(document.documentElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
  });
}
function textNodesWithin(element) {
  const walker = element.ownerDocument.createTreeWalker(element, 4);
  const nodes = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    nodes.push(node);
  }
  return nodes;
}
function pointAt(nodes, offset) {
  let remaining = offset;
  for (const node2 of nodes) {
    const length = node2.nodeValue?.length ?? 0;
    if (remaining <= length) return { node: node2, offset: remaining };
    remaining -= length;
  }
  const node = nodes.at(-1);
  return node ? { node, offset: node.nodeValue?.length ?? 0 } : null;
}
function replaceText(element, before, after) {
  const nodes = textNodesWithin(element);
  const combined = nodes.map((node) => node.nodeValue ?? "").join("");
  const startOffset = combined.lastIndexOf(before);
  if (startOffset < 0) return false;
  const start = pointAt(nodes, startOffset);
  const end = pointAt(nodes, startOffset + before.length);
  if (!start || !end) return false;
  const ownerDocument = element.ownerDocument;
  const range = ownerDocument.createRange();
  range.setStart(start.node, start.offset);
  range.setEnd(end.node, end.offset);
  range.deleteContents();
  range.insertNode(ownerDocument.createTextNode(after));
  range.detach();
  return true;
}
function shortenedText(line, keep) {
  if (!line.startsWith(keep)) {
    throw new Error("退格终点与当前对白不一致，请在动作行内重新选择");
  }
  return keep;
}
function resolveParams(params, fallbackSource = "") {
  const keep = typeof params?.keep === "string" ? params.keep : null;
  const source = typeof params?.source === "string" ? params.source : fallbackSource;
  if (keep === null) throw new Error("请在动作行内点击退格终点");
  if (!source) throw new Error("找不到动作上一行的对白");
  return { keep, source };
}
async function applyImmediately(ctx, params) {
  activeRun += 1;
  const line = ctx.dialogue.line();
  const { keep, source } = resolveParams(params, line?.text ?? "");
  const element = await waitForDialogueTextElement(source);
  if (!element) throw new Error("找不到实时预览中的动作上一行对白，已停止退格以保护剧本文本");
  if (!replaceText(element, source, shortenedText(source, keep))) {
    throw new Error("动作上一行对白的显示内容已经发生变化");
  }
}
async function animateBackspace(ctx, params) {
  const line = ctx.dialogue.line();
  const { keep, source } = resolveParams(params, line?.text ?? "");
  const finalText = shortenedText(source, keep);
  const element = await waitForDialogueTextElement(source);
  if (!element) throw new Error("找不到实时预览中的动作上一行对白，已停止退格以保护剧本文本");
  const finalLength = graphemes(finalText).length;
  const parts = graphemes(source);
  const interval = Math.max(16, ctx.dialogue.getDefaultTextInterval() ?? 35);
  const run = ++activeRun;
  let current = source;
  let previousTime = performance.now();
  let elapsed = 0;
  await new Promise((resolve, reject) => {
    const frame = (time) => {
      if (run !== activeRun || parts.length <= finalLength) {
        resolve();
        return;
      }
      elapsed += Math.max(0, time - previousTime);
      previousTime = time;
      const count = Math.min(
        parts.length - finalLength,
        Math.floor(elapsed / interval)
      );
      if (count > 0) {
        parts.length -= count;
        elapsed -= count * interval;
        const next = parts.join("");
        if (!replaceText(element, current, next)) {
          reject(new Error("对白显示节点在退格过程中发生了变化"));
          return;
        }
        current = next;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  });
}
function waitForNextAdvance(ctx) {
  return new Promise((resolve) => {
    let settled = false;
    let unbind = () => {
    };
    const resumeAfterGesture = () => requestAnimationFrame(resolve);
    const finish = () => {
      if (settled) return;
      settled = true;
      unbind();
      window.addEventListener("mouseup", resumeAfterGesture, {
        capture: true,
        once: true
      });
    };
    unbind = ctx.input.bindShortcut("MouseLeft", finish);
  });
}
function waitMilliseconds(value) {
  if (value === null || value === void 0 || value === "") return null;
  const milliseconds = Number(value);
  return Number.isFinite(milliseconds) && milliseconds >= 0 ? Math.round(milliseconds) : null;
}
function waitAfterBackspace(ctx, params) {
  const waitMs = waitMilliseconds(params?.waitMs);
  return waitMs !== null ? new Promise((resolve) => setTimeout(resolve, waitMs)) : waitForNextAdvance(ctx);
}
function literalParams(paramsJson2) {
  try {
    const raw = JSON.parse(paramsJson2 || "{}");
    const result = {};
    for (const [key, value] of Object.entries(raw)) {
      result[key] = value?.kind === "lit" ? value.value : value;
    }
    return result;
  } catch {
    return {};
  }
}
function blockText(block) {
  const collect = (value) => {
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.map(collect).join("");
    if (!value || typeof value !== "object") return "";
    if (typeof value.text === "string") return value.text;
    return collect(value.content);
  };
  return collect(block?.content);
}
function flattenBlocks(blocks, result = []) {
  for (const block of blocks ?? []) {
    result.push(block);
    flattenBlocks(block.children, result);
  }
  return result;
}
function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}
function remapKeep(previousSource, previousKeep, nextSource, selected) {
  if (!selected) return void 0;
  if (previousKeep === "") return "";
  if (nextSource.startsWith(previousKeep)) return previousKeep;
  const keepLength = graphemes(previousKeep).length;
  const sourceLength = graphemes(previousSource).length;
  if (keepLength >= sourceLength) return nextSource;
  return graphemes(nextSource).slice(0, keepLength).join("");
}
function paramsJson({ keep, source, sourceBlockId, selected, waitMs }) {
  const params = {
    source: { kind: "lit", value: source },
    sourceBlockId: { kind: "lit", value: sourceBlockId }
  };
  if (selected) params.keep = { kind: "lit", value: keep };
  const milliseconds = waitMilliseconds(waitMs);
  if (milliseconds !== null) {
    params.waitMs = { kind: "lit", value: milliseconds };
  }
  return JSON.stringify(params);
}
function isBackspaceTarget(target) {
  return target === METHOD_REF;
}
function syncEditorDocument(editor, state) {
  const blocks = flattenBlocks(editor?.document);
  const byId = new Map(blocks.map((block) => [block.id, block]));
  const bindings = /* @__PURE__ */ new Map();
  const updates = [];
  let sourceBlock = null;
  let previousBinding = null;
  for (const block of blocks) {
    if (!isBackspaceBlock(block)) {
      if (SOURCE_TRANSPARENT_TYPES.has(block.type)) continue;
      sourceBlock = DIALOGUE_TYPES.has(block.type) ? block : null;
      previousBinding = null;
      continue;
    }
    const saved = literalParams(block.props?.paramsJson);
    const sourceBlockId = sourceBlock?.id ?? "";
    if (!sourceBlockId) {
      const binding2 = {
        status: "unbound",
        source: "",
        sourceBlockId: "",
        selected: false,
        keep: ""
      };
      bindings.set(block.id, binding2);
      previousBinding = binding2;
      continue;
    }
    let source = blockText(sourceBlock);
    if (previousBinding?.sourceBlockId === sourceBlockId) {
      source = previousBinding.selected ? previousBinding.keep : previousBinding.source;
    }
    const sameSource = saved.sourceBlockId === sourceBlockId || !saved.sourceBlockId && saved.source === source;
    const selected = sameSource && hasOwn(saved, "keep") && typeof saved.keep === "string";
    const previousSource = sameSource && typeof saved.source === "string" ? saved.source : source;
    const keep = remapKeep(previousSource, saved.keep ?? "", source, selected);
    const nextParams = paramsJson({
      keep: keep ?? "",
      source,
      sourceBlockId,
      selected,
      waitMs: waitMilliseconds(saved.waitMs)
    });
    const binding = {
      status: source ? "ready" : "empty",
      source,
      sourceBlockId,
      selected,
      keep: keep ?? "",
      waitMs: waitMilliseconds(saved.waitMs)
    };
    bindings.set(block.id, binding);
    previousBinding = binding;
    if (block.props?.paramsJson !== nextParams) {
      updates.push({
        id: block.id,
        props: {
          target: METHOD_REF,
          paramsJson: nextParams
        }
      });
    }
  }
  state.bindings = bindings;
  state.blocks = byId;
  for (const update of updates) editor.updateBlock(update.id, { props: update.props });
}
function isBackspaceBlock(block) {
  return block?.type === "callExtensionFunction" && isBackspaceTarget(block?.props?.target);
}
function editorContext(element) {
  const candidates = [];
  for (let node = element; node; node = node.parentElement) {
    candidates.push(node);
    if (node.matches?.("[data-id]")) break;
  }
  candidates.push(...element.querySelectorAll("*"));
  for (const node of candidates) {
    const key = Object.keys(node).find((name) => name.startsWith("__reactFiber$"));
    let fiber = key ? node[key] : null;
    while (fiber) {
      const props = fiber.memoizedProps;
      if (props?.block?.id && props?.editor?.updateBlock) {
        return { block: props.block, editor: props.editor };
      }
      fiber = fiber.return;
    }
  }
  return null;
}
function addInlineStyles() {
  if (document.querySelector("style[data-shiftz-backspace]")) return;
  const style = document.createElement("style");
  style.dataset.shiftzBackspace = "";
  style.textContent = `
    .${INLINE_CLASS} {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 6px;
      min-height: 36px;
      padding: 5px 12px;
      border: 1px solid var(--border-subtle, #303038);
      border-left: 2px solid #7c5cff;
      border-radius: 4px;
      background: var(--bg-canvas, #17171c);
      box-sizing: border-box;
      user-select: none;
    }
    .${INLINE_CLASS}__row {
      width: 100%;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .${INLINE_CLASS}__row--wait {
      gap: 6px;
    }
    .${INLINE_CLASS}__row--wait .${INLINE_CLASS}__label {
      min-height: 22px;
      padding: 2px 4px;
      border: 1px solid #654de8;
      background: transparent;
      color: #8e7aff;
      font-size: 10px;
      box-sizing: border-box;
    }
    .${INLINE_CLASS}__label {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 6px;
      border-radius: 3px;
      background: #654de8;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
    }
    .${INLINE_CLASS}__icon {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .${INLINE_CLASS}__text {
      min-width: 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1px;
    }
    .${INLINE_CLASS}__char {
      appearance: none;
      border: 0;
      border-radius: 2px;
      padding: 2px 3px;
      margin: 0;
      background: transparent;
      color: var(--fg-primary);
      font: inherit;
      line-height: 1.35;
      cursor: pointer;
      touch-action: manipulation;
      box-shadow: inset 0 0 0 1px transparent;
      transition:
        color 150ms cubic-bezier(.22, 1, .36, 1),
        background-color 150ms cubic-bezier(.22, 1, .36, 1),
        box-shadow 150ms cubic-bezier(.22, 1, .36, 1),
        opacity 150ms cubic-bezier(.22, 1, .36, 1);
    }
    .${INLINE_CLASS}__char:hover {
      color: #a995ff;
      background: #7c5cff22;
    }
    .${INLINE_CLASS}__char[data-endpoint="true"] {
      color: #fff;
      background: #654de8cc;
      box-shadow: inset 0 0 0 1px #8e7aff;
    }
    .${INLINE_CLASS}__char[data-removed="true"] {
      opacity: .32;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
    .${INLINE_CLASS}__char--empty {
      min-width: 18px;
      margin-right: 3px;
      color: var(--fg-tertiary);
    }
    .${INLINE_CLASS}__hint {
      color: var(--fg-tertiary);
      font-size: 12px;
    }
    .${INLINE_CLASS}__wait-options {
      min-width: 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 3px;
    }
    .${INLINE_CLASS}__wait-custom {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      width: 72px;
      height: 22px;
      padding: 2px 5px;
      border: 1px solid var(--border-subtle, #303038);
      border-radius: 3px;
      background: transparent;
      color: var(--fg-primary);
      font-family: var(--font-mono, monospace);
      font-variant-numeric: tabular-nums;
      font-size: 10px;
      line-height: 1;
      box-sizing: border-box;
      transition: border-color 150ms cubic-bezier(.22, 1, .36, 1);
    }
    .${INLINE_CLASS}__wait-custom:focus-within {
      border-color: #7c5cff;
    }
    .${INLINE_CLASS}__wait-input {
      flex: 1 1 auto;
      width: 0;
      min-width: 0;
      padding: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: right;
    }
    .${INLINE_CLASS}__wait-unit {
      flex: 0 0 auto;
      color: var(--fg-tertiary, #85858f);
    }
    .${INLINE_CLASS}__wait-input::placeholder {
      color: var(--fg-tertiary);
    }
    .${INLINE_CLASS}__wait-input::-webkit-inner-spin-button {
      appearance: none;
    }
    .${INLINE_CLASS}__wait {
      appearance: none;
      height: 22px;
      padding: 2px 6px;
      border: 1px solid var(--border-subtle, #303038);
      border-radius: 3px;
      background: transparent;
      color: var(--fg-secondary, #b7b7c0);
      font: inherit;
      font-size: 10px;
      line-height: 1;
      cursor: pointer;
      transition:
        color 150ms cubic-bezier(.22, 1, .36, 1),
        background-color 150ms cubic-bezier(.22, 1, .36, 1),
        border-color 150ms cubic-bezier(.22, 1, .36, 1);
    }
    .${INLINE_CLASS}__wait:hover {
      color: #fff;
      border-color: #7c5cff;
    }
    .${INLINE_CLASS}__wait[data-selected="true"] {
      color: #fff;
      border-color: #654de8;
      background: #654de8;
    }
    .${INLINE_CLASS}__wait[data-numeric="true"] {
      font-family: var(--font-mono, monospace);
      font-variant-numeric: tabular-nums;
    }
  `;
  document.head.append(style);
}
function bindingHint(status) {
  return status === "empty" ? "绑定的对白为空" : "请把动作放在要退格的对白后面（可跨等待）";
}
function applyEndpointState(text, selected, selectedLength) {
  for (const button of text.querySelectorAll(`.${INLINE_CLASS}__char`)) {
    const endpoint = Number(button.dataset.position);
    button.dataset.endpoint = String(selected && endpoint === selectedLength);
    button.dataset.removed = String(selected && endpoint > selectedLength);
  }
}
function backspaceIcon() {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.classList.add(`${INLINE_CLASS}__icon`);
  icon.setAttribute("viewBox", "0 0 16 16");
  icon.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M6.5 3.5 2 8l4.5 4.5H14v-9H6.5ZM8 6l3.5 4M11.5 6 8 10");
  icon.append(path);
  return icon;
}
function waitIcon() {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.classList.add(`${INLINE_CLASS}__icon`);
  icon.setAttribute("viewBox", "0 0 16 16");
  icon.setAttribute("aria-hidden", "true");
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "8");
  circle.setAttribute("cy", "8");
  circle.setAttribute("r", "5.5");
  const hand = document.createElementNS("http://www.w3.org/2000/svg", "path");
  hand.setAttribute("d", "M8 4.8V8l2.2 1.4");
  icon.append(circle, hand);
  return icon;
}
function bindEditorButton(button, activate) {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    activate();
  });
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.detail === 0) activate();
  });
}
function renderInlineEditor(content, block, editor, binding) {
  if (!isBackspaceBlock(block)) return;
  addInlineStyles();
  const original = [...content.children].find(
    (child) => !child.classList.contains(INLINE_CLASS)
  );
  if (original instanceof HTMLElement) original.style.display = "none";
  let inline = content.querySelector(`:scope > .${INLINE_CLASS}`);
  if (!inline) {
    inline = document.createElement("div");
    inline.className = INLINE_CLASS;
    content.append(inline);
  }
  const source = binding?.source ?? "";
  const signature = [
    binding?.status,
    binding?.sourceBlockId,
    source,
    binding?.selected,
    binding?.keep,
    binding?.waitMs
  ].join("\0");
  if (inline.dataset.signature === signature) return;
  inline.dataset.signature = signature;
  inline.replaceChildren();
  const backspaceRow = document.createElement("div");
  backspaceRow.className = `${INLINE_CLASS}__row`;
  const label = document.createElement("span");
  label.className = `${INLINE_CLASS}__label`;
  label.append(backspaceIcon(), document.createTextNode("句尾退格"));
  backspaceRow.append(label);
  if (binding?.status !== "ready") {
    const hint = document.createElement("span");
    hint.className = `${INLINE_CLASS}__hint`;
    hint.textContent = bindingHint(binding?.status);
    backspaceRow.append(hint);
    inline.append(backspaceRow);
    return;
  }
  const selected = binding.selected;
  const selectedLength = graphemes(binding.keep).length;
  const chars = graphemes(source);
  const text = document.createElement("span");
  text.className = `${INLINE_CLASS}__text`;
  const addEndpoint = (char, position, title, className = "") => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `${INLINE_CLASS}__char ${className}`.trim();
    button.textContent = char;
    button.title = title;
    button.setAttribute("aria-label", title);
    button.dataset.position = String(position);
    const selectEndpoint = () => {
      const keep = chars.slice(0, position).join("");
      binding.selected = true;
      binding.keep = keep;
      applyEndpointState(text, true, position);
      const nextParams = paramsJson({
        keep,
        source,
        sourceBlockId: binding.sourceBlockId,
        selected: true,
        waitMs: binding.waitMs
      });
      editor.updateBlock(block.id, { props: { paramsJson: nextParams } });
    };
    bindEditorButton(button, selectEndpoint);
    text.append(button);
  };
  addEndpoint("·", 0, "退完整句话", `${INLINE_CLASS}__char--empty`);
  chars.forEach((char, index) => {
    addEndpoint(char, index + 1, `退格到“${char}”`);
  });
  applyEndpointState(text, selected, selectedLength);
  backspaceRow.append(text);
  inline.append(backspaceRow);
  const waitRow = document.createElement("div");
  waitRow.className = `${INLINE_CLASS}__row ${INLINE_CLASS}__row--wait`;
  const waitLabel = document.createElement("span");
  waitLabel.className = `${INLINE_CLASS}__label`;
  waitLabel.append(waitIcon(), document.createTextNode("等待"));
  waitRow.append(waitLabel);
  const waitOptions = document.createElement("span");
  waitOptions.className = `${INLINE_CLASS}__wait-options`;
  const waitCustom = document.createElement("span");
  waitCustom.className = `${INLINE_CLASS}__wait-custom`;
  const waitInput = document.createElement("input");
  waitInput.className = `${INLINE_CLASS}__wait-input`;
  waitInput.type = "number";
  waitInput.min = "0";
  waitInput.step = "1";
  waitInput.setAttribute("aria-label", "自定义等待毫秒");
  waitInput.value = binding.waitMs === null ? "" : String(binding.waitMs);
  const waitUnit = document.createElement("span");
  waitUnit.className = `${INLINE_CLASS}__wait-unit`;
  waitUnit.textContent = "ms";
  waitCustom.append(waitInput, waitUnit);
  waitOptions.append(waitCustom);
  const choices = [
    ...WAIT_OPTIONS.map((value) => [String(value), value]),
    ["等待玩家继续", null]
  ];
  const choiceButtons = [];
  const saveWait = (waitMs) => {
    binding.waitMs = waitMs;
    for (const [button, value] of choiceButtons) {
      button.dataset.selected = String(value === waitMs);
    }
    const nextParams = paramsJson({
      keep: binding.keep,
      source,
      sourceBlockId: binding.sourceBlockId,
      selected: binding.selected,
      waitMs
    });
    editor.updateBlock(block.id, { props: { paramsJson: nextParams } });
  };
  waitInput.addEventListener("pointerdown", (event) => event.stopPropagation());
  waitInput.addEventListener("click", (event) => event.stopPropagation());
  waitInput.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      waitInput.blur();
    }
  });
  waitInput.addEventListener("change", () => {
    const waitMs = waitMilliseconds(waitInput.value);
    waitInput.value = waitMs === null ? "" : String(waitMs);
    saveWait(waitMs);
  });
  for (const [title, waitMs] of choices) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `${INLINE_CLASS}__wait`;
    button.textContent = title;
    button.dataset.numeric = String(waitMs !== null);
    button.dataset.selected = String(binding.waitMs === waitMs);
    bindEditorButton(button, () => {
      waitInput.value = waitMs === null ? "" : String(waitMs);
      saveWait(waitMs);
    });
    choiceButtons.push([button, waitMs]);
    waitOptions.append(button);
  }
  waitRow.append(waitOptions);
  inline.append(waitRow);
}
function clearInlineEditor(content) {
  const inline = content.querySelector(`:scope > .${INLINE_CLASS}`);
  if (!inline) return;
  inline.remove();
  for (const child of content.children) {
    if (child instanceof HTMLElement) child.style.removeProperty("display");
  }
}
const EDITOR_BLOCK_SELECTOR = '.bn-block-content[data-content-type="callExtensionFunction"]';
function refreshEditor(editor, state) {
  if (state.syncing) {
    state.pending = true;
    return;
  }
  state.syncing = true;
  try {
    do {
      state.pending = false;
      syncEditorDocument(editor, state);
    } while (state.pending);
    for (const content of [...state.contents]) {
      if (!content.isConnected) {
        state.contents.delete(content);
        continue;
      }
      const context = editorContext(content);
      const block = context ? state.blocks.get(context.block.id) : null;
      if (block && isBackspaceBlock(block)) {
        renderInlineEditor(content, block, editor, state.bindings.get(block.id));
      } else {
        clearInlineEditor(content);
      }
    }
  } finally {
    state.syncing = false;
  }
}
function trackContent(runtime, content) {
  const context = editorContext(content);
  if (!context) return;
  let state = runtime.editors.get(context.editor);
  if (!state) {
    state = {
      bindings: /* @__PURE__ */ new Map(),
      blocks: /* @__PURE__ */ new Map(),
      contents: /* @__PURE__ */ new Set(),
      pending: false,
      syncing: false,
      unsubscribe: () => {
      }
    };
    if (typeof context.editor.onChange !== "function") {
      console.error(`[${EXTENSION_ID}] 当前编辑器缺少 onChange 事件，无法实时同步`);
      return;
    }
    state.unsubscribe = context.editor.onChange(() => {
      refreshEditor(context.editor, state);
    });
    runtime.editors.set(context.editor, state);
  }
  state.contents.add(content);
  refreshEditor(context.editor, state);
}
function discoverContents(runtime, root) {
  const element = root instanceof Element ? root : root?.parentElement;
  if (!element) return;
  const owner = element.closest(EDITOR_BLOCK_SELECTOR);
  if (owner) trackContent(runtime, owner);
  if (element.matches(EDITOR_BLOCK_SELECTOR)) trackContent(runtime, element);
  for (const content of element.querySelectorAll(EDITOR_BLOCK_SELECTOR)) {
    trackContent(runtime, content);
  }
}
function pruneEditors(runtime) {
  for (const [editor, state] of runtime.editors) {
    for (const content of [...state.contents]) {
      if (!content.isConnected) state.contents.delete(content);
    }
    if (state.contents.size > 0) continue;
    state.unsubscribe();
    runtime.editors.delete(editor);
  }
}
function installInlineEditors() {
  if (typeof document === "undefined") return;
  const app = document.getElementById("app");
  if (!app) return;
  globalThis.__shiftzBackspaceEditor?.dispose?.();
  globalThis.__shiftzBackspaceEditor?.disconnect?.();
  const runtime = {
    editors: /* @__PURE__ */ new Map(),
    observer: null,
    dispose() {
      this.observer?.disconnect();
      for (const state of this.editors.values()) state.unsubscribe();
      this.editors.clear();
    }
  };
  runtime.observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) discoverContents(runtime, node);
    }
    pruneEditors(runtime);
  });
  runtime.observer.observe(app, { childList: true, subtree: true });
  discoverContents(runtime, app);
  globalThis.__shiftzBackspaceEditor = runtime;
}
installInlineEditors();
class BackspaceTo extends Extension {
  static meta = meta({
    id: "backspace",
    label: "句尾退格",
    description: "对已经显示完成的当前对白执行退格动画。",
    exposeUI: false
  });
  static backspaceTo = method({
    id: "backspace-to",
    title: "退格到字符",
    description: "点击句首圆点可退完整句话；源对白变化会实时同步，退格结束后再次点击才显示下一句。",
    async run(ctx, params) {
      await animateBackspace(ctx, params);
      await waitAfterBackspace(ctx, params);
    },
    async runImmediately(ctx, params) {
      await applyImmediately(ctx, params);
    },
    async skip(ctx, params) {
      await applyImmediately(ctx, params);
    }
  });
}
export {
  BackspaceTo as default,
  manifest
};
//# sourceMappingURL=index.mjs.map

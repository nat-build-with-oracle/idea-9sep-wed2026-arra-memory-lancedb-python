import { useEffect, useState } from "react";

/**
 * The interface speaks Thai by default. The corpus speaks whatever it was
 * written in.
 *
 * That line is the whole design. This file translates CHROME — nav labels, the
 * words on buttons, row headings, empty states — and nothing else. It must never
 * touch:
 *
 *   - memory titles, content, or tags
 *   - workspace, project, or agent names
 *   - anything returned by the API
 *
 * Those are data. A workspace called "arra-memory-haos" is that string, not a
 * label to be localised, and translating it would break the filter that matches
 * on it. When the corpus is bilingual — and this one is — translating the
 * container while leaving the contents alone is the only version that stays
 * honest.
 *
 * Thai is the default because the person this is built for reads Thai. English
 * is a switch, not the baseline.
 */

export type Lang = "th" | "en";

export const LANGS: Lang[] = ["th", "en"];

/**
 * Every string the interface says, in both languages.
 *
 * One flat object rather than nested namespaces: there are a few dozen keys, and
 * a nested structure would cost a lookup path on every use to organise something
 * that fits on two screens. If this ever outgrows one file, that is the moment
 * to nest it — not before.
 */
const STRINGS = {
  // ── nav
  "nav.archive": { th: "ความจำ", en: "Memory" },
  "nav.searchLog": { th: "ประวัติค้นหา", en: "Search log" },
  "nav.settings": { th: "ตั้งค่า", en: "Settings" },
  "nav.tools": { th: "เครื่องมือ", en: "Tools" },
  "nav.tools.title": { th: "เครื่องมือ MCP ที่เปิดให้ใช้", en: "Which MCP tools are offered" },
  "settings.options.eyebrow": { th: "ตั้งค่า", en: "Settings" },
  "settings.options.title": { th: "ตัวเลือกของ add-on", en: "Add-on options" },
  "settings.options.subtitle": {
    th: "ค่าที่เซิร์ฟเวอร์อ่านตอนเริ่มทำงาน — env มาก่อน แล้วจึงไฟล์ตั้งค่า",
    en: "What the server reads at start — environment first, then the settings file",
  },
  "settings.save": { th: "บันทึก", en: "Save" },
  "settings.revert": { th: "ย้อนกลับ", en: "Revert" },
  "settings.unset": { th: "ยังไม่ตั้ง", en: "not set" },
  "settings.show": { th: "แสดง", en: "show" },
  "settings.hide": { th: "ซ่อน", en: "hide" },
  "settings.pinned": { th: "ตรึงโดย env", en: "pinned by env" },
  "settings.pinned.title": {
    th: "ค่านี้มาจาก environment variable จึงแก้ที่นี่ไม่ได้",
    en: "This value comes from an environment variable, so it cannot be changed here",
  },
  "settings.restart": { th: "ต้องรีสตาร์ท", en: "restart required" },
  "settings.readonly": { th: "อ่านอย่างเดียว", en: "read-only" },
  "settings.regen": { th: "สร้างใหม่", en: "regenerate" },
  "settings.regen.title": {
    th: "สร้าง api_token ใหม่ — ตัวเก่าใช้ได้จนกว่าจะรีสตาร์ท",
    en: "Generate a new api_token — the old one keeps working until restart",
  },
  "settings.regen.confirm": {
    th: "สร้าง api_token ใหม่? ทุก client ที่ใช้ตัวเก่าจะหลุดหลังรีสตาร์ท",
    en: "Generate a new api_token? Every client using the old one breaks after restart.",
  },
  "access.title": { th: "ใครเข้าถึงได้", en: "Who has access" },
  "access.subtitle": {
    th: "OAuth clients ที่เคยเชื่อมต่อ — เพิกถอนได้ทันที มีผลกับ request ถัดไป",
    en: "OAuth clients that have connected — revoking takes effect on their next request",
  },
  "access.revoke": { th: "เพิกถอน", en: "revoke" },
  "access.revoke.confirm": {
    th: "เพิกถอน client นี้? มันต้อง authorize ใหม่จึงจะกลับมาใช้ได้",
    en: "Revoke this client? It must authorize again to regain access.",
  },
  "access.tokens": { th: "โทเคนที่ยังมีผล", en: "active tokens" },
  "access.none": { th: "ยังไม่มี client เชื่อมต่อผ่าน OAuth", en: "No OAuth client has connected yet" },
  "settings.source.environment": { th: "จาก environment", en: "from environment" },
  "settings.source.settings": { th: "จากไฟล์ตั้งค่า", en: "from settings file" },
  "settings.source.unset": { th: "ยังไม่ตั้ง", en: "not set" },
  "nav.lock": { th: "ล็อก", en: "Lock" },
  "nav.remember": { th: "จำไว้", en: "Remember" },
  "nav.searchLog.title": { th: "เคยค้นหาอะไรไปบ้าง", en: "What has been looked for" },
  "nav.settings.title": {
    th: "tool ไหนเปิดอยู่ และปิดอันไหนได้บ้าง",
    en: "Which MCP tools this connector offers, and what to switch off",
  },
  "nav.lock.title": { th: "จบ session นี้", en: "End this session" },

  "nav.atlas": { th: "\u0e41\u0e1c\u0e19\u0e17\u0e35\u0e48", en: "Atlas" },
  "nav.atlas.title": {
    th: "\u0e04\u0e25\u0e31\u0e07\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14\u0e40\u0e1b\u0e47\u0e19\u0e23\u0e39\u0e1b",
    en: "The whole corpus, drawn",
  },
  "atlas.title": { th: "\u0e41\u0e1c\u0e19\u0e04\u0e27\u0e32\u0e21\u0e08\u0e33", en: "The atlas" },
  "atlas.subtitle": {
    th: "\u0e15\u0e33\u0e41\u0e2b\u0e19\u0e48\u0e07\u0e21\u0e32\u0e08\u0e32\u0e01 embedding \u2014 \u0e2d\u0e22\u0e39\u0e48\u0e43\u0e01\u0e25\u0e49\u0e01\u0e31\u0e19\u0e04\u0e37\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2b\u0e21\u0e32\u0e22\u0e43\u0e01\u0e25\u0e49\u0e01\u0e31\u0e19 \u0e25\u0e32\u0e01\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e2b\u0e21\u0e38\u0e19 \u0e40\u0e25\u0e37\u0e48\u0e2d\u0e19\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e0b\u0e39\u0e21 \u0e01\u0e14\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e40\u0e1b\u0e34\u0e14",
    en: "Positions come from the embeddings — near means similar. Drag to turn, scroll to zoom, click to open.",
  },
  "atlas.map": { th: "\u0e41\u0e1c\u0e19", en: "map" },
  "atlas.web": { th: "\u0e43\u0e22", en: "web" },
  "atlas.names": { th: "\u0e0a\u0e37\u0e48\u0e2d", en: "names" },
  "atlas.namesTitle": {
    th: "\u0e41\u0e2a\u0e14\u0e07\u0e0a\u0e37\u0e48\u0e2d\u0e17\u0e38\u0e01\u0e08\u0e38\u0e14\u0e1e\u0e23\u0e49\u0e2d\u0e21\u0e01\u0e31\u0e19 \u2014 \u0e2a\u0e39\u0e07\u0e2a\u0e38\u0e14 20 \u0e0a\u0e37\u0e48\u0e2d \u0e40\u0e23\u0e35\u0e22\u0e07\u0e15\u0e32\u0e21\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e33\u0e04\u0e31\u0e0d",
    en: "Show every name at once — up to 20, most important first",
  },
  "atlas.explained": { th: "\u0e2d\u0e18\u0e34\u0e1a\u0e32\u0e22\u0e44\u0e14\u0e49", en: "explains" },
  "atlas.density": { th: "\u0e04\u0e27\u0e32\u0e21\u0e2b\u0e19\u0e32\u0e41\u0e19\u0e48\u0e19", en: "density" },
  "atlas.unembedded": { th: "\u0e22\u0e31\u0e07\u0e44\u0e21\u0e48\u0e21\u0e35\u0e40\u0e27\u0e01\u0e40\u0e15\u0e2d\u0e23\u0e4c", en: "without a vector" },
  // ── how the atlas is computed. Shown under the drawing, because a picture
  // that cannot be checked is decoration.
  "method.title": { th: "\u0e04\u0e33\u0e19\u0e27\u0e13\u0e21\u0e32\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e44\u0e23", en: "How this was computed" },
  "method.show": { th: "\u0e14\u0e39\u0e27\u0e34\u0e18\u0e35\u0e04\u0e34\u0e14", en: "Show the working" },
  "method.hide": { th: "\u0e0b\u0e48\u0e2d\u0e19", en: "Hide" },
  "method.posTitle": { th: "1 \u00b7 \u0e15\u0e33\u0e41\u0e2b\u0e19\u0e48\u0e07", en: "1 · Positions" },
  "method.edgeTitle": { th: "2 \u00b7 \u0e40\u0e2a\u0e49\u0e19\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21", en: "2 · Edges" },
  "method.honestTitle": { th: "3 \u00b7 \u0e02\u0e49\u0e2d\u0e08\u0e33\u0e01\u0e31\u0e14", en: "3 · What this cannot show" },
  "atlas.loading": { th: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e1b\u0e34\u0e14\u2026", en: "opening\u2026" },
  "atlas.loadFailed": { th: "\u0e40\u0e1b\u0e34\u0e14\u0e04\u0e27\u0e32\u0e21\u0e08\u0e33\u0e19\u0e35\u0e49\u0e44\u0e21\u0e48\u0e44\u0e14\u0e49", en: "Could not open that memory." },
  "atlas.close": { th: "\u0e1b\u0e34\u0e14", en: "Close" },
  "atlas.openInArchive": { th: "\u0e40\u0e1b\u0e34\u0e14\u0e43\u0e19\u0e04\u0e25\u0e31\u0e07", en: "Open in the archive" },
  "atlas.empty": {
    th: "\u0e22\u0e31\u0e07\u0e44\u0e21\u0e48\u0e21\u0e35\u0e04\u0e27\u0e32\u0e21\u0e08\u0e33\u0e17\u0e35\u0e48\u0e21\u0e35 embedding \u2014 \u0e40\u0e1b\u0e34\u0e14 semantic search \u0e01\u0e48\u0e2d\u0e19",
    en: "No memories carry a vector yet — semantic search has to be on for the atlas to have anything to draw.",
  },
  "atlas.denseWarning": {
    th: "\u0e40\u0e2a\u0e49\u0e19\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e40\u0e01\u0e37\u0e2d\u0e1a\u0e17\u0e38\u0e01\u0e04\u0e39\u0e48 \u2014 \u0e04\u0e25\u0e31\u0e07\u0e22\u0e31\u0e07\u0e40\u0e25\u0e47\u0e01\u0e40\u0e01\u0e34\u0e19\u0e01\u0e27\u0e48\u0e32\u0e08\u0e30\u0e40\u0e2b\u0e47\u0e19\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e08\u0e32\u0e01\u0e40\u0e2a\u0e49\u0e19\u0e44\u0e14\u0e49 \u0e43\u0e0a\u0e49\u0e21\u0e38\u0e21\u0e41\u0e1c\u0e19\u0e41\u0e17\u0e19",
    en: "Nearly every pair is an edge — the corpus is still too small for the web to show structure. The map carries the same information without the tangle.",
  },

  // ── archive
  "archive.eyebrow": { th: "ARRA MEMORY", en: "ARRA MEMORY" },
  "archive.title": { th: "ความจำ", en: "Memory" },
  "archive.search": { th: "ค้นหาในหัวข้อ เนื้อหา และแท็ก…", en: "Search titles, content, tags…" },
  "archive.searchLabel": { th: "ค้นหาความจำ", en: "Search memories" },
  "archive.searching": { th: "กำลังค้น…", en: "searching…" },
  "archive.shown": { th: "แสดง", en: "shown" },
  "archive.inCorpus": { th: "ทั้งหมด", en: "in corpus" },
  "archive.clear": { th: "ล้างตัวกรอง", en: "clear filters" },

  // ── chip rows. The ROW LABEL is chrome; the chips themselves are data.
  "facet.kind": { th: "ชนิด", en: "kind" },
  "facet.workspace": { th: "workspace", en: "workspace" },
  "facet.project": { th: "project", en: "project" },
  "facet.agent": { th: "ใครเขียน", en: "agent" },
  "facet.tag": { th: "แท็ก", en: "tag" },
  "facet.unfiled": { th: "ไม่ระบุ", en: "unfiled" },
  // {n} sits INSIDE the translation because word order is part of the
  // translation: Thai puts the quantifier first ("อีก 5"), English puts it
  // after the number ("+5 more"). Composing the phrase in the component would
  // hard-code English order and render the Thai backwards, which it did.
  "facet.more": { th: "อีก {n}", en: "+{n} more" },
  "facet.less": { th: "ย่อ", en: "less" },

  // ── empty states
  "empty.nothing": { th: "ไม่มีอะไรตรงกับที่กรอง", en: "Nothing matches that." },
  "empty.archive": { th: "ยังไม่มีความจำ", en: "No memories yet." },
  "empty.filteredHint": {
    th: "การค้นหาเป็นการจับคู่ตัวอักษรตรง ๆ ในหัวข้อ เนื้อหา และแท็ก — ลองคำที่รู้ว่ามีอยู่",
    en: "Recall is literal keyword matching across titles, content and tags — try a word you know is in there.",
  },
  "empty.emptyHint": {
    th: "ความจำที่เขียนที่นี่ หรือที่ Claude เขียนผ่าน MCP จะขึ้นในรายการนี้",
    en: "Memories written here or by Claude over MCP will appear in this list.",
  },
  "empty.writeFirst": { th: "เขียนอันแรกเลย", en: "Write the first one" },
  "empty.searchAll": { th: "ค้นความจำทั้งหมดแทน", en: "Search every memory instead" },

  // ── compose
  "compose.title": { th: "เขียนความจำ", en: "Write a memory" },
  "compose.content": { th: "เนื้อหา", en: "Content" },
  "compose.contentHint": { th: "อะไรที่ควรจำไว้ใช้ทีหลัง?", en: "What is worth recalling later?" },
  "compose.titleField": { th: "หัวข้อ", en: "Title" },
  "compose.optional": { th: "(ไม่ใส่ก็ได้)", en: "(optional)" },
  "compose.titleHint": { th: "เว้นไว้จะดึงจากบรรทัดแรก", en: "Inferred from the first line" },
  "compose.kind": { th: "ชนิด", en: "Kind" },
  "compose.kindOther": { th: "\u0e2b\u0e23\u0e37\u0e2d\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e40\u0e2d\u0e07", en: "or type your own" },
  "compose.tags": { th: "แท็ก", en: "Tags" },
  "compose.tagsHint": { th: "(คั่นด้วยจุลภาค)", en: "(comma separated)" },
  "compose.importance": { th: "ความสำคัญ", en: "Importance" },
  "compose.cancel": { th: "ยกเลิก", en: "Cancel" },
  "compose.save": { th: "จำไว้", en: "Remember" },
  "compose.saving": { th: "กำลังบันทึก…", en: "Saving…" },
  "compose.saveFailed": { th: "บันทึกไม่สำเร็จ", en: "Could not save." },

  // ── lock screen
  "lock.title": { th: "ความจำถูกล็อกอยู่", en: "Memory is locked" },
  "lock.hint": {
    th: "ใส่ owner passphrase ที่ตั้งไว้ใน config ของ add-on นี้",
    en: "Enter the owner passphrase set in this add-on's configuration.",
  },
  "lock.field": { th: "Owner passphrase", en: "Owner passphrase" },
  "lock.submit": { th: "ปลดล็อก", en: "Unlock" },
  "lock.opening": { th: "กำลังเปิด…", en: "Opening…" },
  "lock.failed": {
    th: "\u0e40\u0e02\u0e49\u0e32\u0e44\u0e21\u0e48\u0e44\u0e14\u0e49 \u2014 \u0e44\u0e21\u0e48\u0e43\u0e0a\u0e48\u0e40\u0e23\u0e37\u0e48\u0e2d\u0e07 passphrase",
    en: "Could not sign in — not a passphrase problem",
  },
  "lock.wrong": { th: "passphrase ไม่ตรง", en: "That passphrase does not match." },
  "lock.splash": { th: "กำลังเปิด…", en: "opening…" },

  // ── errors
  "error.load": { th: "โหลดความจำไม่ได้", en: "Could not load memories." },
  "error.forget": { th: "ลบความจำนั้นไม่ได้", en: "Could not forget that memory." },

  // ── settings
  "settings.theme": { th: "\u0e18\u0e35\u0e21", en: "Theme" },
  "settings.langNote": {
    th: "\u0e41\u0e1b\u0e25\u0e40\u0e09\u0e1e\u0e32\u0e30\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d \u2014 \u0e40\u0e19\u0e37\u0e49\u0e2d\u0e2b\u0e32\u0e04\u0e27\u0e32\u0e21\u0e08\u0e33 \u0e0a\u0e37\u0e48\u0e2d workspace project \u0e41\u0e17\u0e47\u0e01 \u0e41\u0e25\u0e30\u0e0a\u0e37\u0e48\u0e2d agent \u0e44\u0e21\u0e48\u0e16\u0e39\u0e01\u0e41\u0e1b\u0e25",
    en: "Only the interface is translated — memory content, workspace, project, tag and agent names are data and are never translated.",
  },

  // ── language switch itself
  "lang.label": { th: "ภาษา", en: "Language" },
  "lang.th": { th: "ไทย", en: "Thai" },
  "lang.en": { th: "อังกฤษ", en: "English" },
} as const;

export type StringKey = keyof typeof STRINGS;

/**
 * The instance's display name, set once from /api/health.
 *
 * A module-level value rather than a prop because the chrome that shows it
 * (lock screen eyebrow, archive eyebrow, tab title) renders at three different
 * depths — and rather than a STRINGS mutation because the table is readonly by
 * construction. Consumers re-render anyway when App's health state lands.
 */
let INSTANCE = "Arra Memory";
export function setInstanceName(name: string): void {
  INSTANCE = name;
}
export function instanceName(): string {
  return INSTANCE;
}

const STORAGE_KEY = "arra-memory-lang";

/**
 * Where the language comes from, in order: an explicit `?lang=` in the URL, then
 * what this browser chose last, then Thai.
 *
 * `?lang=en` is in the URL so an English view is a link you can send, which
 * matters more here than it looks: the person who reads this in English is
 * usually not the person who set the preference.
 */
export function initialLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "th" || fromUrl === "en") return fromUrl;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "th" || stored === "en") return stored;
  } catch {
    // A browser with storage blocked still gets an interface, in Thai.
  }
  return serverDefault;
}

/**
 * The add-on owner's default, from `language` in the add-on configuration.
 *
 * Applied only when this browser has expressed no preference — an explicit
 * `?lang=` or a previous choice always wins. The distinction matters because
 * these are different people: the owner sets what a FIRST visit looks like, the
 * visitor sets what THEIR visits look like, and neither should overrule the
 * other. Arrives after the first paint (health is a fetch), so it only takes
 * effect for someone who has never chosen.
 */
let serverDefault: Lang = "th";

export function applyServerDefaultLang(lang: string | undefined): void {
  if (lang !== "th" && lang !== "en") return;
  serverDefault = lang;
  let chosen = false;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    chosen = stored === "th" || stored === "en" ||
      new URLSearchParams(window.location.search).has("lang");
  } catch {
    /* storage blocked; treat as unchosen */
  }
  if (!chosen && current !== lang) {
    current = lang;
    try { document.documentElement.setAttribute("lang", lang); } catch { /* ignore */ }
    for (const fn of listeners) fn(lang);
  }
}

let current: Lang = typeof window === "undefined" ? "th" : initialLang();
const listeners = new Set<(lang: Lang) => void>();

export function getLang(): Lang {
  return current;
}

export function setLang(lang: Lang): void {
  current = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
    // Kept in the DOM too, so `lang` is right for screen readers and for any
    // font stack that selects on it.
    document.documentElement.setAttribute("lang", lang);
  } catch {
    // Preference not persisted; the session still switches.
  }
  for (const fn of listeners) fn(lang);
}

/**
 * Translate one chrome string.
 *
 * An unknown key returns the key itself rather than throwing or rendering blank
 * — a missing translation should look obviously missing in the UI, not silently
 * erase a label.
 */
export function t(key: StringKey, lang: Lang = current): string {
  const entry = STRINGS[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en ?? key;
}

/** Re-renders the component when the language changes. */
export function useLang(): [Lang, (lang: Lang) => void] {
  const [lang, set] = useState<Lang>(current);
  useEffect(() => {
    listeners.add(set);
    return () => {
      listeners.delete(set);
    };
  }, []);
  return [lang, setLang];
}

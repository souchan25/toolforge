// lib/tools/registry.ts
// Central registry of all tools — single source of truth

export type ToolBadge = "new" | "popular" | "free";
export type ToolCategory = "text" | "json" | "css" | "color" | "devutils" | "code";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ToolCategory;
  categoryLabel: string;
  icon: string; // lucide-react icon name
  badge?: ToolBadge;
  keywords: string[];
  howToUse: string[];
  relatedSlugs: string[];
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  text: "Text",
  json: "JSON",
  css: "CSS",
  color: "Color",
  devutils: "Dev Utils",
  code: "Code",
};

export const TOOLS: Tool[] = [
  // ──── Text Tools ────
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word & Character Counter",
    shortDescription: "Count words, characters, lines, and sentences instantly.",
    description: "Paste or type any text to instantly get word count, character count (with and without spaces), line count, sentence count, and average reading time.",
    category: "text",
    categoryLabel: "Text",
    icon: "AlignLeft",
    badge: "popular",
    keywords: ["word count", "character count", "text stats", "reading time"],
    howToUse: ["Paste or type your text in the input field.", "Stats update in real time — no button click needed.", "Use the summary cards to see all counts at a glance."],
    relatedSlugs: ["case-converter", "lorem-ipsum", "text-diff"],
  },
  {
    id: "case-converter",
    slug: "case-converter",
    name: "Case Converter",
    shortDescription: "Convert text to UPPER, lower, Title, camelCase, snake_case.",
    description: "Instantly convert any text to uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, or kebab-case with a single click.",
    category: "text",
    categoryLabel: "Text",
    icon: "Type",
    badge: "free",
    keywords: ["case", "uppercase", "lowercase", "camelCase", "snake_case", "title case"],
    howToUse: ["Paste your text into the input field.", "Click any of the conversion buttons.", "Copy the result using the Copy button."],
    relatedSlugs: ["word-counter", "lorem-ipsum", "text-diff"],
  },
  {
    id: "lorem-ipsum",
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    shortDescription: "Generate placeholder text by words, sentences, or paragraphs.",
    description: "Generate Lorem Ipsum placeholder text on demand. Configure the amount and unit (words, sentences, paragraphs). Optional: start with the classic 'Lorem ipsum dolor sit amet...'.",
    category: "text",
    categoryLabel: "Text",
    icon: "FileText",
    badge: "free",
    keywords: ["lorem ipsum", "placeholder text", "dummy text", "filler text"],
    howToUse: ["Choose the quantity and unit (words / sentences / paragraphs).", "Toggle whether to start with the classic phrase.", "Click Generate and copy the output."],
    relatedSlugs: ["word-counter", "case-converter", "markdown-previewer"],
  },
  {
    id: "text-diff",
    slug: "text-diff",
    name: "Text Diff Checker",
    shortDescription: "Compare two texts and highlight the differences.",
    description: "Side-by-side text comparison tool. Paste two versions of any text and see additions, deletions, and unchanged lines color-coded for easy review.",
    category: "text",
    categoryLabel: "Text",
    icon: "GitCompare",
    badge: "popular",
    keywords: ["diff", "compare", "text comparison", "changes"],
    howToUse: ["Paste the original text in the left panel.", "Paste the new/modified text in the right panel.", "Differences highlight automatically — green for additions, red for deletions."],
    relatedSlugs: ["word-counter", "case-converter", "json-formatter"],
  },

  // ──── JSON Tools ────
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    shortDescription: "Beautify and syntax-highlight JSON with configurable indent.",
    description: "Paste minified or messy JSON and get a beautifully formatted, syntax-highlighted result. Configure indentation (2 or 4 spaces). Also validates JSON and shows errors inline.",
    category: "json",
    categoryLabel: "JSON",
    icon: "Braces",
    badge: "popular",
    keywords: ["json", "format", "beautify", "pretty print", "validate"],
    howToUse: ["Paste your JSON in the input.", "Choose indentation (2 or 4 spaces).", "Click Format — errors will be shown with line numbers."],
    relatedSlugs: ["json-minifier", "json-validator", "json-to-csv"],
  },
  {
    id: "json-minifier",
    slug: "json-minifier",
    name: "JSON Minifier",
    shortDescription: "Strip whitespace from JSON to minimize file size.",
    description: "Remove all unnecessary whitespace and newlines from JSON to produce a compact, minified version ready for production use or APIs.",
    category: "json",
    categoryLabel: "JSON",
    icon: "Minimize2",
    badge: "free",
    keywords: ["json", "minify", "compress", "compact"],
    howToUse: ["Paste your formatted JSON into the input.", "Click Minify.", "Copy the compact result."],
    relatedSlugs: ["json-formatter", "json-validator", "css-minifier"],
  },
  {
    id: "json-to-csv",
    slug: "json-to-csv",
    name: "JSON to CSV Converter",
    shortDescription: "Convert a flat JSON array to a downloadable CSV file.",
    description: "Convert a JSON array of objects to CSV format. Automatically detects column headers from the first item. Supports download as .csv file.",
    category: "json",
    categoryLabel: "JSON",
    icon: "Table",
    badge: "new",
    keywords: ["json", "csv", "convert", "spreadsheet", "table"],
    howToUse: ["Paste a JSON array of objects in the input.", "Click Convert — the CSV preview appears.", "Click Download to save as a .csv file."],
    relatedSlugs: ["json-formatter", "json-minifier", "json-validator"],
  },
  {
    id: "json-validator",
    slug: "json-validator",
    name: "JSON Validator",
    shortDescription: "Validate JSON and get clear, line-level error messages.",
    description: "Paste any JSON and get instant validation feedback. Shows a success state if valid, or detailed error messages with line numbers for invalid JSON.",
    category: "json",
    categoryLabel: "JSON",
    icon: "ShieldCheck",
    badge: "free",
    keywords: ["json", "validate", "check", "error", "syntax"],
    howToUse: ["Paste your JSON in the input.", "Click Validate.", "A green check means valid JSON; errors show the exact problem location."],
    relatedSlugs: ["json-formatter", "json-minifier", "json-to-csv"],
  },

  // ──── CSS Tools ────
  {
    id: "css-minifier",
    slug: "css-minifier",
    name: "CSS Minifier",
    shortDescription: "Minify CSS by removing comments and whitespace.",
    description: "Paste your CSS and strip all comments, extra whitespace, and newlines to produce a compact stylesheet ready for production deployment.",
    category: "css",
    categoryLabel: "CSS",
    icon: "Code2",
    badge: "free",
    keywords: ["css", "minify", "compress", "optimize"],
    howToUse: ["Paste your CSS into the input.", "Click Minify.", "Copy the minified output."],
    relatedSlugs: ["css-gradient-generator", "box-shadow-generator", "border-radius-generator"],
  },
  {
    id: "css-gradient-generator",
    slug: "css-gradient-generator",
    name: "CSS Gradient Generator",
    shortDescription: "Build stunning gradients visually and copy the CSS output.",
    description: "Create linear or radial gradients with a visual editor. Add multiple color stops, control angle and position, and copy the generated CSS gradient instantly.",
    category: "css",
    categoryLabel: "CSS",
    icon: "Palette",
    badge: "popular",
    keywords: ["css", "gradient", "linear", "radial", "background"],
    howToUse: ["Choose gradient type (linear / radial).", "Add and adjust color stops.", "Set the angle or position.", "Copy the CSS output."],
    relatedSlugs: ["css-minifier", "box-shadow-generator", "color-picker"],
  },
  {
    id: "box-shadow-generator",
    slug: "box-shadow-generator",
    name: "Box Shadow Generator",
    shortDescription: "Build CSS box shadows visually with live preview.",
    description: "Use sliders to control horizontal/vertical offset, blur radius, spread, color, and opacity. See a live preview of your box shadow and copy the CSS value.",
    category: "css",
    categoryLabel: "CSS",
    icon: "Square",
    badge: "new",
    keywords: ["css", "box shadow", "shadow", "elevation"],
    howToUse: ["Adjust the sliders for offset, blur, spread, and color.", "Toggle inset if you want an inset shadow.", "Copy the generated CSS or the full property value."],
    relatedSlugs: ["border-radius-generator", "css-gradient-generator", "css-minifier"],
  },
  {
    id: "border-radius-generator",
    slug: "border-radius-generator",
    name: "Border Radius Generator",
    shortDescription: "Set per-corner radius and get the CSS border-radius value.",
    description: "Control each corner's radius independently (top-left, top-right, bottom-right, bottom-left) with sliders. See a live shape preview and copy the CSS.",
    category: "css",
    categoryLabel: "CSS",
    icon: "RoundedCorner",
    badge: "free",
    keywords: ["css", "border radius", "corner radius", "shape"],
    howToUse: ["Drag any of the 4 corner sliders.", "Toggle 'Lock All' to set all corners at once.", "Copy the CSS border-radius value."],
    relatedSlugs: ["box-shadow-generator", "css-gradient-generator", "css-minifier"],
  },

  // ──── Color Tools ────
  {
    id: "color-picker",
    slug: "color-picker",
    name: "Color Picker & Converter",
    shortDescription: "Convert between HEX, RGB, HSL, and OKLCH color formats.",
    description: "Enter a color in any format (HEX, RGB, HSL) and instantly get all equivalent values. Includes a color swatch, clipboard copy for each format, and a visual picker.",
    category: "color",
    categoryLabel: "Color",
    icon: "Pipette",
    badge: "popular",
    keywords: ["color", "hex", "rgb", "hsl", "picker", "converter"],
    howToUse: ["Enter a color value in any supported format.", "All other formats update automatically.", "Click any value to copy it."],
    relatedSlugs: ["color-palette", "contrast-checker", "css-gradient-generator"],
  },
  {
    id: "color-palette",
    slug: "color-palette",
    name: "Color Palette Generator",
    shortDescription: "Generate harmonious color palettes from a seed color.",
    description: "Enter a base/seed color and generate related palettes: complementary, analogous, triadic, split-complementary, and monochromatic. Export as CSS custom properties.",
    category: "color",
    categoryLabel: "Color",
    icon: "Swatch",
    badge: "new",
    keywords: ["color palette", "complementary", "analogous", "color theory", "design"],
    howToUse: ["Enter or pick a seed color.", "Choose a palette type.", "Copy individual swatches or export the whole palette as CSS."],
    relatedSlugs: ["color-picker", "contrast-checker", "css-gradient-generator"],
  },
  {
    id: "contrast-checker",
    slug: "contrast-checker",
    name: "Contrast Checker",
    shortDescription: "Check WCAG AA/AAA color contrast accessibility ratios.",
    description: "Input a foreground and background color pair and get their contrast ratio calculated instantly. Shows WCAG 2.1 AA and AAA pass/fail for normal text, large text, and UI components.",
    category: "color",
    categoryLabel: "Color",
    icon: "Eye",
    badge: "free",
    keywords: ["contrast", "accessibility", "wcag", "a11y", "color"],
    howToUse: ["Enter a foreground (text) color.", "Enter a background color.", "See contrast ratio, AA/AAA status, and a live preview of the text on the background."],
    relatedSlugs: ["color-picker", "color-palette"],
  },

  // ──── Dev Utilities ────
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    shortDescription: "Test regular expressions with real-time match highlighting.",
    description: "Write a regex pattern and test it against any sample text. Matches highlight in real time. Supports all standard flags (g, i, m, s). Includes a quick cheatsheet.",
    category: "devutils",
    categoryLabel: "Dev Utils",
    icon: "Regex",
    badge: "popular",
    keywords: ["regex", "regular expression", "pattern", "match", "test"],
    howToUse: ["Enter your regex pattern (without slashes).", "Set the flags (g, i, m, etc.).", "Paste your test string — matches highlight live."],
    relatedSlugs: ["text-diff", "url-encoder", "hash-generator"],
  },
  {
    id: "base64",
    slug: "base64",
    name: "Base64 Encoder / Decoder",
    shortDescription: "Encode or decode text and files to/from Base64.",
    description: "Encode plain text or files to Base64, or decode Base64 strings back to text. Everything runs in the browser — nothing is sent to a server.",
    category: "devutils",
    categoryLabel: "Dev Utils",
    icon: "Lock",
    badge: "free",
    keywords: ["base64", "encode", "decode", "binary", "data uri"],
    howToUse: ["Type or paste text in the input.", "Click Encode or Decode.", "Optionally upload a file to encode it to Base64."],
    relatedSlugs: ["url-encoder", "hash-generator", "uuid-generator"],
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    shortDescription: "Encode or decode URL components and query strings.",
    description: "Encode special characters in URL components (encodeURIComponent) or decode percent-encoded strings. Supports full URL encoding or component-only encoding.",
    category: "devutils",
    categoryLabel: "Dev Utils",
    icon: "Link",
    badge: "free",
    keywords: ["url", "encode", "decode", "percent encoding", "query string"],
    howToUse: ["Paste the URL or component to encode/decode.", "Click Encode URL or Decode URL.", "Copy the result."],
    relatedSlugs: ["base64", "hash-generator", "json-formatter"],
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Hash Generator",
    shortDescription: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text.",
    description: "Enter any text and generate cryptographic hashes in multiple algorithms simultaneously: MD5, SHA-1, SHA-256, and SHA-512. Runs locally in browser using Web Crypto API.",
    category: "devutils",
    categoryLabel: "Dev Utils",
    icon: "Hash",
    badge: "popular",
    keywords: ["hash", "md5", "sha256", "sha512", "checksum", "crypto"],
    howToUse: ["Type or paste your input text.", "Hashes for all algorithms generate automatically.", "Click any hash value to copy it."],
    relatedSlugs: ["base64", "url-encoder", "uuid-generator"],
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    shortDescription: "Generate one or many UUID v4 strings instantly.",
    description: "Generate cryptographically random UUID v4 identifiers. Control the quantity (1–100) and copy them individually or all at once. Useful for database IDs, API keys, and more.",
    category: "devutils",
    categoryLabel: "Dev Utils",
    icon: "Fingerprint",
    badge: "free",
    keywords: ["uuid", "guid", "identifier", "random", "id"],
    howToUse: ["Set the number of UUIDs to generate.", "Click Generate.", "Copy individual UUIDs or click 'Copy All'."],
    relatedSlugs: ["hash-generator", "base64", "timestamp-converter"],
  },
  {
    id: "timestamp-converter",
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    shortDescription: "Convert Unix timestamps to human-readable dates and back.",
    description: "Convert between Unix timestamps (seconds or milliseconds) and human-readable date/time strings. Shows UTC and local timezone values. Supports current time with one click.",
    category: "devutils",
    categoryLabel: "Dev Utils",
    icon: "Clock",
    badge: "new",
    keywords: ["timestamp", "unix", "epoch", "date", "time", "convert"],
    howToUse: ["Enter a Unix timestamp (seconds or ms) to convert to date.", "Or enter a date to get its Unix timestamp.", "Use 'Now' to grab the current timestamp."],
    relatedSlugs: ["uuid-generator", "hash-generator", "url-encoder"],
  },

  // ──── Code Tools ────
  {
    id: "html-formatter",
    slug: "html-formatter",
    name: "HTML Formatter",
    shortDescription: "Beautify and indent HTML markup with configurable settings.",
    description: "Paste minified or messy HTML and get nicely indented, formatted markup back. Configurable indentation size (2 or 4 spaces) and option to sort attributes.",
    category: "code",
    categoryLabel: "Code",
    icon: "FileCode",
    badge: "free",
    keywords: ["html", "format", "beautify", "indent", "markup"],
    howToUse: ["Paste your HTML into the input area.", "Choose indent size.", "Click Format and copy the result."],
    relatedSlugs: ["css-minifier", "json-formatter", "markdown-previewer"],
  },
  {
    id: "markdown-previewer",
    slug: "markdown-previewer",
    name: "Markdown Previewer",
    shortDescription: "Write Markdown and see a live rendered preview side-by-side.",
    description: "A split-pane Markdown editor with live preview. Write your Markdown on the left and see it rendered beautifully on the right. Supports GFM (GitHub Flavored Markdown).",
    category: "code",
    categoryLabel: "Code",
    icon: "BookOpen",
    badge: "popular",
    keywords: ["markdown", "preview", "md", "github", "editor"],
    howToUse: ["Type Markdown in the left pane.", "The right pane renders a live preview automatically.", "Click Export HTML to get the rendered HTML."],
    relatedSlugs: ["html-formatter", "word-counter", "code-to-image"],
  },
  {
    id: "code-to-image",
    slug: "code-to-image",
    name: "Code to Image",
    shortDescription: "Turn code snippets into beautiful shareable images.",
    description: "Paste code, choose a language, pick a theme and background gradient, then export a high-quality PNG image. Perfect for social media, presentations, and documentation.",
    category: "code",
    categoryLabel: "Code",
    icon: "ImageIcon",
    badge: "new",
    keywords: ["code", "image", "screenshot", "carbon", "snippet", "social"],
    howToUse: ["Paste your code snippet.", "Choose the language for syntax highlighting.", "Pick a background and theme.", "Click Download PNG."],
    relatedSlugs: ["markdown-previewer", "html-formatter", "json-formatter"],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q)) ||
      t.categoryLabel.toLowerCase().includes(q)
  );
}

export function getRelatedTools(tool: Tool): Tool[] {
  return tool.relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is Tool => t !== undefined)
    .slice(0, 4);
}

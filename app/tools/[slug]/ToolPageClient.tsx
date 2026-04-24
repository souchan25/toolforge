"use client";
// app/tools/[slug]/ToolPageClient.tsx
// Routes to the correct tool component based on slug

import type { Tool } from "@/lib/tools/registry";
import { HowToUse } from "@/components/tools/HowToUse";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolHeader } from "@/components/tools/ToolHeader";

// Tool imports
import { WordCounter } from "@/components/tools/impl/WordCounter";
import { CaseConverter } from "@/components/tools/impl/CaseConverter";
import { LoremIpsum } from "@/components/tools/impl/LoremIpsum";
import { TextDiff } from "@/components/tools/impl/TextDiff";
import { JsonFormatter } from "@/components/tools/impl/JsonFormatter";
import { JsonMinifier } from "@/components/tools/impl/JsonMinifier";
import { JsonToCsv } from "@/components/tools/impl/JsonToCsv";
import { JsonValidator } from "@/components/tools/impl/JsonValidator";
import { CssMinifier } from "@/components/tools/impl/CssMinifier";
import { CssGradientGenerator } from "@/components/tools/impl/CssGradientGenerator";
import { BoxShadowGenerator } from "@/components/tools/impl/BoxShadowGenerator";
import { BorderRadiusGenerator } from "@/components/tools/impl/BorderRadiusGenerator";
import { ColorPicker } from "@/components/tools/impl/ColorPicker";
import { ColorPalette } from "@/components/tools/impl/ColorPalette";
import { ContrastChecker } from "@/components/tools/impl/ContrastChecker";
import { RegexTester } from "@/components/tools/impl/RegexTester";
import { Base64 } from "@/components/tools/impl/Base64";
import { UrlEncoder } from "@/components/tools/impl/UrlEncoder";
import { HashGenerator } from "@/components/tools/impl/HashGenerator";
import { UuidGenerator } from "@/components/tools/impl/UuidGenerator";
import { TimestampConverter } from "@/components/tools/impl/TimestampConverter";
import { HtmlFormatter } from "@/components/tools/impl/HtmlFormatter";
import { MarkdownPreviewer } from "@/components/tools/impl/MarkdownPreviewer";
import { CodeToImage } from "@/components/tools/impl/CodeToImage";

const TOOL_MAP: Record<string, React.ComponentType> = {
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "lorem-ipsum": LoremIpsum,
  "text-diff": TextDiff,
  "json-formatter": JsonFormatter,
  "json-minifier": JsonMinifier,
  "json-to-csv": JsonToCsv,
  "json-validator": JsonValidator,
  "css-minifier": CssMinifier,
  "css-gradient-generator": CssGradientGenerator,
  "box-shadow-generator": BoxShadowGenerator,
  "border-radius-generator": BorderRadiusGenerator,
  "color-picker": ColorPicker,
  "color-palette": ColorPalette,
  "contrast-checker": ContrastChecker,
  "regex-tester": RegexTester,
  base64: Base64,
  "url-encoder": UrlEncoder,
  "hash-generator": HashGenerator,
  "uuid-generator": UuidGenerator,
  "timestamp-converter": TimestampConverter,
  "html-formatter": HtmlFormatter,
  "markdown-previewer": MarkdownPreviewer,
  "code-to-image": CodeToImage,
};

interface Props {
  tool: Tool;
  relatedTools: Tool[];
}

export function ToolPageClient({ tool, relatedTools }: Props) {
  const ToolComponent = TOOL_MAP[tool.slug];

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px" }}>
      <ToolHeader tool={tool} />

      <div className="tool-main-layout" style={{ marginTop: "32px" }}>
        {/* Main Content */}
        <div>
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <div className="glass-card-static" style={{ padding: "48px", textAlign: "center" }}>
              <p style={{ color: "#94a3b8", fontFamily: "var(--font-sans)" }}>Tool coming soon.</p>
            </div>
          )}

          <HowToUse steps={tool.howToUse} style={{ marginTop: "24px" }} />
        </div>

        {/* Sidebar */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {relatedTools.length > 0 && (
            <RelatedTools tools={relatedTools} />
          )}
        </aside>
      </div>
    </div>
  );
}

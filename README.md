# ToolForge

ToolForge is a suite of developer utilities designed to provide a fast and secure experience for everyday developer tasks.

## Features

- **Local Processing:** All tools process data locally in your browser. No data is sent to an external server.
- **Included Tools:**
  - **Text:** Word Counter, Case Converter, Lorem Ipsum Generator, Text Diff.
  - **JSON:** Formatter, Minifier, Validator, JSON to CSV.
  - **CSS:** Minifier, Gradient Generator, Box Shadow, Border Radius.
  - **Color:** Picker & Converter, Palette Generator, Contrast Checker.
  - **Dev Utils:** Regex Tester, Base64 Encoder/Decoder, Hash Generator, UUID Generator, Timestamp Converter.
  - **Code:** HTML Formatter, Markdown Previewer, Code to Image.
- **Responsive Design:** Functional on desktop, tablet, and mobile devices.

## Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/souchan25/DevToolsMicroSaas.git
   cd DevToolsMicroSaas/toolforge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
toolforge/
├── app/               # Next.js App Router (pages & layouts)
├── components/        # Shared & Tool-specific components
│   ├── layout/        # Navbar, Footer, etc.
│   └── tools/         # Tool implementation components
├── lib/               # Shared utilities & tool registry
├── public/            # Static assets
└── styles/            # Global CSS & Tailwind configuration
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

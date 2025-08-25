import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createMdxLanguagePlugin,
  createMdxServicePlugin,
} from '@mdx-js/language-service';
import { runTsc } from '@volar/typescript/lib/quickstart/runTsc.js';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

const tscUrl = import.meta.resolve('typescript/lib/tsc.js');
const tscPath = fileURLToPath(tscUrl);

const projectDir = path.dirname(fileURLToPath(import.meta.url));
const tsconfigPath = path.resolve(projectDir, 'tsconfig.mdx-tsc.json');

// Avoid discovering root tsconfig.json
if (!process.argv.includes('--project') && !process.argv.includes('-p')) {
  process.argv.push('--project', tsconfigPath);
}

// Run TypeScript through Volar for `.mdx` files.
runTsc(
  tscPath,
  ['.mdx'], // only MDX; add '.md' if you embed MDX in .md too
  () => ({
    languagePlugins: [
      createMdxLanguagePlugin(
        // Use default remark syntax plugins for MDX processing.
        // Only syntax plugins affect typing; keep default tiny +
        // safe:
        // - frontmatter (yaml/toml) syntax
        // - GFM extensions
        [[remarkFrontmatter, ['toml', 'yaml']], remarkGfm],
        [], // virtualCodePlugins - empty array for now
        true, // checkMdx flag - always true for type checking
        'react-jsx',
      ),
    ],
    servicePlugins: [
      // `applyEdit` is editor-only; for a CLI checker we provide
      // a no-op.
      createMdxServicePlugin({ applyEdit: async () => {} }),
    ],
  }),
);

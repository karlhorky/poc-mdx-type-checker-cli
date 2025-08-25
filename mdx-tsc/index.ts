import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMdxLanguagePlugin } from '@mdx-js/language-service';
import { runTsc } from '@volar/typescript/lib/quickstart/runTsc.js';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

// Avoid discovering root tsconfig.json
process.argv.push(
  '--project',
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    'tsconfig.mdx-tsc.json',
  ),
);

// Run TypeScript through Volar for `.mdx` files.
runTsc(
  fileURLToPath(import.meta.resolve('typescript/lib/tsc.js')),
  ['.mdx'],
  () => ({
    languagePlugins: [
      createMdxLanguagePlugin(
        [[remarkFrontmatter, ['toml', 'yaml']], remarkGfm], // Default remark plugins
        [], // virtualCodePlugins - empty array for now
        true, // checkMdx flag - always true for type checking
        'react-jsx',
      ),
    ],
  }),
);

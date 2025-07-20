#!/usr/bin/env node
/**
 * Auto-extract JSDoc/TsDoc from source and generate markdown per component/feature.
 */

const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');     // for React components
const jsdoc = require('jsdoc-api');            // for functions/classes

const SRC_DIR = path.resolve(__dirname, '../src');
const OUT_DIR = path.resolve(__dirname, '../docs/features');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Recursively find .tsx/.ts files
function walk(dir, filelist = []) {
  for (const fname of fs.readdirSync(dir)) {
    const full = path.join(dir, fname);
    if (fs.statSync(full).isDirectory()) walk(full, filelist);
    else if (/.(tsx|ts)$/.test(fname)) filelist.push(full);
  }
  return filelist;
}

for (const file of walk(SRC_DIR)) {
  const source = fs.readFileSync(file, 'utf8');
  // Try React component extraction
  let docs = [];
  try {
    docs = reactDocs.parse(source, null, null, { filename: file });
  } catch (e) {
    // console.error('React Docgen Error:', e);
  }
  // Fallback: JSDoc for functions/classes
  if (!docs.length) {
    const jsdocData = jsdoc.explainSync({ files: file });
    docs = jsdocData.filter(d => d.description);
  }

  if (docs.length) {
    const name = path.basename(file).replace(/.(tsx|ts)$/, '');
    const mdLines = [`# ${name}`, ''];
    docs.forEach(doc => {
      if (doc.displayName) mdLines.push(`## Component `${doc.displayName}``, '');
      if (doc.kind === 'function') mdLines.push(`## Function `${doc.name}``, '');
      if (doc.description) mdLines.push(doc.description.trim(), '');
      if (doc.props) {
        mdLines.push('### Props', '');
        mdLines.push('| Name | Type | Default | Description |', '|---|---|---|---|');
        for (const [prop, info] of Object.entries(doc.props)) {
          mdLines.push(`| ${prop} | `${info.type.name}` | ${info.defaultValue?.value || ''} | ${info.description || ''} |`);
        }
        mdLines.push('');
      }
    });

    const outPath = path.join(OUT_DIR, `${name}.md`);
    fs.writeFileSync(outPath, mdLines.join('
'));
    console.log(`Generated docs for ${name}`);
  }
}

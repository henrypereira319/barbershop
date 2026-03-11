import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Move up one directory from "scripts" to the root
const loaderPath = path.resolve(__dirname, '../node_modules/three/examples/jsm/loaders/3MFLoader.js');

if (fs.existsSync(loaderPath)) {
  let content = fs.readFileSync(loaderPath, 'utf-8');
  
  // Replace the faulty relative import that Rollup fails to resolve
  // `import { unzipSync } from '../libs/fflate.module.js';` -> `import { unzipSync } from 'fflate';`
  
  if (content.includes("from '../libs/fflate.module.js'")) {
    content = content.replace(
      "from '../libs/fflate.module.js'", 
      "from 'fflate'"
    );
    fs.writeFileSync(loaderPath, content, 'utf-8');
    console.log('Successfully patched 3MFLoader.js to use fflate npm package directly.');
  } else {
    console.log('3MFLoader.js already patched or does not contain the target import.');
  }
} else {
  console.warn('Could not find 3MFLoader.js to patch.');
}

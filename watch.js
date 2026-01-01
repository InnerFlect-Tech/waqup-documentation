import chokidar from 'chokidar';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, 'content');
const buildScript = path.join(__dirname, 'build.js');
const templateFile = path.join(__dirname, 'template.html');

console.log('🔍 Watching for changes...\n');
console.log(`📁 Watching directory: ${contentDir}\n`);

// Initial build
console.log('🔨 Running initial build...\n');
runBuild();

// Watch for changes in markdown files and template
const watcher = chokidar.watch([
  `${contentDir}/**/*.md`,
  templateFile
], {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: false
});

watcher
  .on('change', (filePath) => {
    console.log(`\n📝 File changed: ${path.basename(filePath)}`);
    console.log('🔨 Rebuilding...\n');
    runBuild();
  })
  .on('add', (filePath) => {
    console.log(`\n➕ New file added: ${path.basename(filePath)}`);
    console.log('🔨 Rebuilding...\n');
    runBuild();
  })
  .on('unlink', (filePath) => {
    console.log(`\n🗑️  File removed: ${path.basename(filePath)}`);
    console.log('🔨 Rebuilding...\n');
    runBuild();
  })
  .on('error', error => {
    console.error('❌ Watcher error:', error);
  });

console.log('✅ Watcher is active. Press Ctrl+C to stop.\n');

function runBuild() {
  const buildProcess = spawn('node', [buildScript], {
    stdio: 'inherit',
    shell: true
  });

  buildProcess.on('error', (error) => {
    console.error('❌ Build error:', error);
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping watcher...');
  watcher.close();
  process.exit(0);
});


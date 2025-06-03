const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');

// Build path
const buildPath = path.resolve(__dirname, 'build');

// Check if bundle.js exists
if (!fs.existsSync(path.join(buildPath, 'bundle.js'))) {
  console.error('Error: bundle.js not found in build directory!');
  process.exit(1);
}

// Read the index.html file
const indexPath = path.join(buildPath, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Fix any absolute paths to be relative
indexHtml = indexHtml.replace(/src="\/bundle.js"/g, 'src="./bundle.js"');
indexHtml = indexHtml.replace(/href="\/"/g, 'href="./"');

// Write the fixed HTML back
fs.writeFileSync(indexPath, indexHtml);
console.log('Fixed paths in index.html');

// Create .nojekyll file to bypass Jekyll processing
fs.writeFileSync(path.join(buildPath, '.nojekyll'), '');
console.log('Created .nojekyll file');

// Deploy with gh-pages
ghpages.publish(
  'build',
  {
    branch: 'gh-pages',
    dotfiles: true, // Include the .nojekyll file
    message: 'Auto-deploy with fixed paths'
  },
  (err) => {
    if (err) {
      console.error('Deployment error:', err);
    } else {
      console.log('Deployed successfully!');
    }
  }
);
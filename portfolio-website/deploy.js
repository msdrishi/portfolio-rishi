const ghpages = require('gh-pages');
const fs = require('fs');
const path = require('path');

// Build folder path
const buildPath = path.resolve(__dirname, 'build');

// Create .nojekyll file (prevents GitHub from ignoring files that begin with underscore)
fs.writeFileSync(path.join(buildPath, '.nojekyll'), '');
console.log('Created .nojekyll file');

// Deploy with gh-pages
ghpages.publish(
  'build',
  {
    branch: 'gh-pages',
    dotfiles: true, // Include dotfiles like .nojekyll
    message: 'Deploy portfolio website'
  },
  (err) => {
    if (err) {
      console.error('Deployment error:', err);
    } else {
      console.log('Deployed successfully!');
    }
  }
);
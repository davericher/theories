const axios = require('axios');

const owner = 'davericher';
const repo = 'https://github.com/davericher/theories';
const token = 'YOUR_PERSONAL_ACCESS_TOKEN'; // Generate this from GitHub Developer settings
const MAX_LENGTH = 2048; // Adjust this value based on the max length you want

function chunkString(str, length) {
  return str.match(new RegExp(`.{1,${length}}`, 'g'));
}

async function getFileContent(url) {
  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const response = await axios.get(url, { headers });
  const content = Buffer.from(response.data.content, 'base64').toString('utf8');
  return content;
}

async function getRepoContent() {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`;
  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const response = await axios.get(apiUrl, { headers });
  const files = response.data.tree.filter((file) => file.type === 'blob');

  let concatenatedContent = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const fileContent = await getFileContent(file.url);
    concatenatedContent += `---\nPath: ${file.path}\n---\n${fileContent}\n\n`;
  }

  return chunkString(concatenatedContent, MAX_LENGTH);
}

getRepoContent(owner, repo)
  .then((chunks) => {
    chunks.forEach((chunk, index) => {
      console.log(`Chunk ${index + 1}:\n`, chunk);
    });
  })
  .catch((error) => {
    console.error('Error fetching repository content:', error);
  });

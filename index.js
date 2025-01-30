const { readFileSync, writeFileSync } = require('./utils/fileUtils');  // Import helper functions
const skus = require('./src/data/skus');  // Import SKUs list
const config = require('./src/data/config.json');  // Import configuration file

// Path to the input and output files
const inputFilePath = './src/data/input.txt';
const outputFilePath = './src/data/output.txt';

// Read the input.txt file
const data = readFileSync(inputFilePath);
if (!data) {
  console.error('Failed to read input file.');
  return;
}

// Split input data into individual reviews (split by newline)
const reviews = data.split('\n').filter(review => review.trim() !== '');

// Function to get random unique reviews between minReviews and maxReviews
function getRandomReviews() {
  const numReviews = Math.floor(Math.random() * (config.maxReviews - config.minReviews + 1)) + config.minReviews;
  const randomReviews = [];
  const selectedIndexes = new Set();

  while (randomReviews.length < numReviews) {
    const randomIndex = Math.floor(Math.random() * reviews.length);

    // Ensure the review is unique by checking the index
    if (!selectedIndexes.has(randomIndex)) {
      selectedIndexes.add(randomIndex);
      randomReviews.push(reviews[randomIndex]);
    }
  }

  return randomReviews;
}

let allModifiedData = '';

// Loop through each SKU and replace the placeholder with the SKU for the selected random reviews
skus.forEach(sku => {
  const randomReviews = getRandomReviews();  // Get random reviews based on the config

  randomReviews.forEach((review, index) => {
    let modifiedReview = review.replace(new RegExp(config.placeholder, 'g'), sku); // Replace all occurrences of the placeholder with the SKU
    
    // Ensure the last review doesn't end with a comma
    if (index === randomReviews.length - 1 && modifiedReview.endsWith(',')) {
      modifiedReview = modifiedReview.slice(0, -1); // Remove the trailing comma
    }
    
    allModifiedData += modifiedReview + '\n';  // Add modified review to the final result
  });
});

// Write the modified data to output.txt
writeFileSync(outputFilePath, allModifiedData);
console.log('Results written to output.txt');

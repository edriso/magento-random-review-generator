# Random Review Generator for Magento Configurable Products

## Overview

This project automates the process of adding random reviews to configurable products in Magento 2. Instead of manually generating reviews or relying on slow AI tools, this app efficiently replaces a placeholder (`ZZZ`) in pre-populated review templates with unique SKUs from a list, and assigns 10 to 12 random reviews to each SKU.

## Purpose

The main goal of this project is to:

- Replace the `ZZZ` placeholder in a set of predefined reviews with unique SKUs.
- Assign 10 to 12 random reviews from a predefined pool to each SKU.
- Ensure that the last review in the output does not end with a comma.

## How It Works

1. **Input Data**:  
   The application uses a pre-populated `input.txt` file, which contains a list of review templates. Each review has the placeholder `ZZZ` that will be replaced with the SKUs of configurable products.

2. **SKUs List**:  
   The `skus.js` file holds a list of SKUs. These SKUs replace the placeholder (`ZZZ`) in each review.

   **How to get SKUs**:  
   To get the SKUs for configurable products in Magento, you can use the following SQL query in MySQL:

   ```sql
   SELECT cpe.sku
   FROM catalog_product_entity cpe
   JOIN catalog_product_super_link cpsl ON cpe.entity_id = cpsl.parent_id
   WHERE cpe.type_id = 'configurable'
   GROUP BY cpe.entity_id;
   ```

   This query will fetch the SKUs for all configurable products from the Magento database.

3. **Random Review Selection**:  
   For each SKU, the app randomly selects between 10 and 12 unique reviews from the pool and assigns them to that SKU. However, the number of reviews cannot exceed the total number of SKUs available.

4. **Validation**:  
   - The `minReviews` value cannot be less than 0.
   - The `maxReviews` value cannot be greater than the number of SKUs available.
   - The `maxReviews` value cannot be less than `minReviews`.

5. **Output Data**:  
   The modified reviews are written to the `output.txt` file.

   The output format follows the structure used in the Magento 2 sample data, specifically in the product reviews. You can find the example CSV format for reviews in Magento's official sample data repository:

   - **Example CSV Format for Reviews**:  
     [Magento 2 Sample Data Product Reviews CSV](https://github.com/magento/magento2-sample-data/blob/2.4-develop/app/code/Magento/ReviewSampleData/fixtures/products_reviews.csv)

     The format for each review looks like this:

     ```csv
     sku,rating_code,rating_value,title,review,reviewer,email
     24-MB01,Rating,2,"I prefer more compartments","I prefer more compartments. If you don't mind putting everything in one space, it's fine. Good for the gym.",Chi,
     ```

     This is how each generated review for a product will be structured.

## Configuration

You can configure the app by editing the `src/data/config.json` file. Here you can modify:

- **placeholder**: The placeholder text (default is `ZZZ`) used in `input.txt` to be replaced with SKUs.
- **minReviews**: The minimum number of reviews assigned to each SKU (default is 10).
- **maxReviews**: The maximum number of reviews assigned to each SKU (default is 12). This cannot exceed the total number of SKUs available, and it cannot be smaller than `minReviews`.

## Files

- **`input.txt`**: Contains the list of review templates with the placeholder (`ZZZ`).
- **`output.txt`**: Contains the modified reviews with SKUs replacing the placeholder.
- **`skus.js`**: A list of SKUs that will replace the placeholder in reviews.
- **`config.json`**: Configuration file for adjusting settings like the placeholder and number of reviews.

## How to Run

1. Clone or download the project.
2. Ensure that Node.js is installed on your system.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the script:
   ```bash
   node index.js
   ```
5. The modified reviews will be written to `output.txt`.

## License

This project is open-source and available under the MIT License.

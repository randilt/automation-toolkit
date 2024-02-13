// used this to download all the images of brawlers in brawlstars from a website,
// may not be the most optimal solution as it skipped some images because the names didn't match 
// should have just downloaded all the files in the destination without iterating through the array of names of brawlers
// it downloaded 71/76 brawler images
// this could be used not just for image downloading but for other files as well.

// how to run?
// 1. Update all the required parameters, json file name, variable names, baseURL, and output folder name and do any changes if needed.
// 2. install axios 
// 3. run the script (node download-multiple-files.js)



const fs = require("fs");
const axios = require("axios");
const brawlers = require("brawlers.json"); // Import the JSON file containing the file names
async function downloadImages(baseUrl, outputFolder) {
  // Create the output folder if it doesn't exist
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  // Iterate through the image names
  for (const brawler of brawlers.items) {
    //update the "brawlers" to the correct array u want to download
    try {
      // Construct the image URL
      const imageUrl = `${baseUrl}/${brawler.name
        .charAt(0)
        .toUpperCase()}${brawler.name.slice(1).toLowerCase()}.png`;

      // Send a GET request to download the image
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      // Save the image to the output folder
      fs.writeFileSync(
        `${outputFolder}/${brawler.name.charAt(0).toUpperCase()}${brawler.name
          .slice(1)
          .toLowerCase()}.png`,
        response.data
      );
      console.log(
        `Downloaded ${brawler.name.charAt(0).toUpperCase()}${brawler.name
          .slice(1)
          .toLowerCase()}.png`
      ); // Log the success
    } catch (error) {
      console.error(
        `Failed to download ${brawler.name
          .charAt(0)
          .toUpperCase()}${brawler.name.slice(1).toLowerCase()}.png: ${
          error.message
        }`
      ); // Log the error
    }
  }
}

const baseUrl = ""; // Base URL (e.g. https://example.com/images)
const outputFolder = ""; // Output folder to save the images (e.g. ./images)

downloadImages(baseUrl, outputFolder); // Call the function to download the images

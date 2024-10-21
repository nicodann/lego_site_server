import axios from "axios";
import * as cheerio from "cheerio";




export default async function getImageHrefs(url: string) {
  console.log("url:", url)
  try {
    // Download HTML page
    const response = await axios.get(url);
    const html = response.data;

    console.log("response.data:", html)

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Extract href values from image tags
    const imageHrefs: string[] = [];
    $('img').each((index, element) => {
      // const href = $(element).attr('data-src') ? $(element).attr('data-src') : $(element).attr('src')
      const href = $(element).attr('data-src')
      if (href) {
        imageHrefs.push(href);
      }
    });

    return imageHrefs;
  } catch (error) {
    throw new Error('Error fetching or parsing HTML.')
  }
}
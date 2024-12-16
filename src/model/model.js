import axios from 'axios';
import {load} from 'cheerio';
import { db } from '../config/data.js';

export const _getYnet = async () => {
  try {
    const response = await axios.get("https://www.ynet.co.il/home/0,7340,L-8,00.html", {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
          "Accept-Language": "he-IL,he;q=0.5",
        },
      });
  const $ = load(response.data);
  
  const headlinesContainer = $(".slotsContent");
  const headlines = headlinesContainer.find(".slotTitle a span")
    .map((i, el) => $(el).text().trim())
    .get();
  
  return headlines
} catch (error) {
  console.log(error);
  throw error
}
};


export const _addNewHeadlines = async ({date, data}) => {
  let trx
  try {
    trx = await db.transaction()
    for (const headline of data) {
      await db('ynetheadlines')
      .insert({headline: headline, created_at: date})
      .transacting(trx)
    }
    await trx.commit()
    console.log('model fine');
    return "success"
  } catch (error) {
    if (trx) await trx.rollback()
    console.log(error);
    throw(error)
  }
}

export const _getHeadlinesDB = async () => {
  try {
   return await db('ynetheadlines')
    .select('headline', 'created_at')

  } catch (error) {
      console.log(error);
      throw(error)
  }
}
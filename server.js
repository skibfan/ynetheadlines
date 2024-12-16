import express from 'express'
import {getHeadlinesDB, getYnet, updateData} from './src/controller/controllers.js';

const app = express();
app.use(express.json())

// let ynetHeadlines = []

// const updateData = async () => {
//     ynetHeadlines.push(await getYnet())
// }
// updateData()
updateData()
setInterval(updateData, 24* 60 * 60 * 1000)


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server listening on ${process.env.PORT || 3001}`);
  });
  
  app.get('/direct', async (req, res) => {
    const response = await getYnet()
    res.json(response)
  })

  app.get('/', getHeadlinesDB)

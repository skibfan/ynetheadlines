import {_addNewHeadlines, _getArticles, _getHeadlinesDB, _getYnet} from "../model/model.js";

export const getYnet = async () => {
    try {
        // const data = await _getYnet()
        const data = await _getArticles()
        const date = new Date()
        return {date, data}
    } catch (error) {
        console.log(error);
        return error
    }
}

export const updateData = async (req, res) => {
    try {
        const headlines = await getYnet()
        await _addNewHeadlines(headlines)
        console.log('controller fine');
        return "Successfully updated db"
    } catch (error) {
        console.log(error);
        return "Some errors on updating db"
    }
}

export const getHeadlinesDB = async (req, res) => {
    try {
        const response = await _getHeadlinesDB()
        res.json(response)
    } catch (error) {
        console.log(error);
        return "Some errors on getting from db"
    }
}
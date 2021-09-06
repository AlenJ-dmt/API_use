import config from "./config";
import axios from "axios";

const OpenLibraryServices = {
    searchBook(word){
        return axios.get(`${config.API_ENDPOINT}/search.json?q=${word}`)
    }
}

export default OpenLibraryServices;
import axios from "axios";

export const getFlags = async () => {
    try {
        const res = await axios.get('https://restcountries.com/v3.1/all');
        if(res){
            return res.data;
        }
        return [];
    } catch (error) {
        console.log(error);
    }

};   
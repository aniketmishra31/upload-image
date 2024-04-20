import axios from "axios";

export const getImages = async () => {
    try {
        const response = await axios.get(`${process.env.BASE_API_URL}/photos/random/?count=10`, {
            headers: {
                'Authorization': `Client-ID ${process.env.CLIENT_ID}`
            }
        });
        if (response.status !== 200) {
            throw {message: `Failed to fetch images: ${response.statusText}`};
        }
        return response.data;
    } catch (err: any) {
        console.log(err);
        return err;
    }
}
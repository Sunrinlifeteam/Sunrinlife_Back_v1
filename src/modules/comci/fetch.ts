import axios from 'axios';

export async function searchSchool(
    host: string,
    searchPath: string,
    search: string
) {
    const url = `http://${host}/${searchPath}${search}`;
    let res = await axios({
        url,
    });
    return res.data;
}

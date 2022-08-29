const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;
const url = "https://api.artic.edu/api/v1/artworks";


app.use(cors())
app.get('/', (req, res) => {
    res.send('Server On!');
});


/**
 * Return api response
 */
app.get('/getart', async (req, res) => {

    let artworkResponse = await getArtworkObject();

    res.json(artworkResponse);

});


/**
 * Get Artwork data from api
 */
function getArtworkObject() {

    return new Promise((resolve,reject) => {

        axios.get(url)
            .then(response => {

              let mandatoryData = {
                "pagination": response.data.pagination,
                "mainData": response.data.data
              }

                resolve(mandatoryData)
            })
            .catch(error => {
                console.log(error);
                reject("error getting artwork data")
            });

    }).then(data => {
        return data;
    })

}


app.listen(port, () => {
    return console.log(`Server is listening at http://localhost:${port}`);
});

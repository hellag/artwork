const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;




app.use(cors())
app.get('/', (req, res) => {
    res.send('Server On!');
});


/**
 * Return api response
 */
app.get('/getart/:page', async (req, res) => {

  let pageNumber = req.params.page;
  console.log(req.params.page);

  let artworkResponse = await getArtworkObject(pageNumber);

  res.json(artworkResponse);

});


/**
 * Get Artwork data from api
 */
function getArtworkObject(pageNumber) {
  let url = "https://api.artic.edu/api/v1/artworks";

  console.log("page number: " + pageNumber);

  if(pageNumber !== '1'){
    url = url + '?page=' + pageNumber;
  }else {
    url = "https://api.artic.edu/api/v1/artworks";
  }

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

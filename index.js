const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.get('/trains', (req, res) => {
    fs.readFile('data/trains.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Wystąpił błąd podczas odczytu pliku.')
        }
        else {
            try {

                const trainsData = JSON.parse(data);
                const formattedData = JSON.stringify(trainsData, null, 2);
                res.setHeader('Content-Type', 'application/json');
                res.send(formattedData);
            }
            catch(err) {
                console.error(err);
                res.status(500).send('Wystąpił błąd podczas parsowania danych JSON.');
            }
        }
    })
});


app.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});

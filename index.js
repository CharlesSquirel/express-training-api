const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.post('/trains', (req, res) => {
    const newTrain = req.body;

    fs.readFile('data/trains.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Wystąpił błąd podczas odczytu pliku.');
        } else {
            try {
                const trainsData = JSON.parse(data);

                trainsData.push(newTrain);

                fs.writeFile('data/trains.json', JSON.stringify(trainsData, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Wystąpił błąd podczas zapisywania danych.');
                    } else {
                        res.status(201).json(newTrain);
                    }
                });
            } catch (error) {
                console.error(error);
                res.status(500).send('Wystąpił błąd podczas parsowania danych JSON.');
            }
        }
    });
});


app.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});

import express, { Request, Response, Application } from 'express';

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send({ message: "Hello World=> 1000" });
});

app.listen(port, () => console.log(`Server listening on port:${port}`));

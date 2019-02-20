import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
	req;
	res.send('hello');
});

app.listen(8080, () => 'listening on port 8080');

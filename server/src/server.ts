import * as express from 'express';
import * as cors from 'cors';
import sequelize from './utils/database';

const app = express();

app.use(cors());

app.get('/', (req: any, res: any) => {
	req;
	res.send('Hi');
});

sequelize.sync().then(() => {
	app.listen(8080, () => 'listening on port 8080');
});

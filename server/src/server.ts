import * as express from 'express';
import * as cors from 'cors';
import sequelize from './utils/database';
import authRoutes from './routes/authRoutes';
import * as bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);

app.use(
	(
		error: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		req;
		next;
		console.log(error);
		const status = error.statusCode || 500;
		const message = error.message;
		const data = error.data;
		res.status(status).json({ message, data });
	}
);

sequelize.sync({force: true}).then(() => {
	app.listen(8080, () => 'listening on port 8080');
});

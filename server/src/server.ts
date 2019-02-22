import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

// UTILS
import sequelize from './utils/database';

// ROUTES
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

// MIDDLEWARE
import requireAuth from './middlewares/requireAuth';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
	req;
	res.send('hoa');
});

app.use('/auth', authRoutes);
app.use('/user', requireAuth, userRoutes);

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

sequelize.sync().then(() => {
	app.listen(8080, () => 'listening on port 8080');
});

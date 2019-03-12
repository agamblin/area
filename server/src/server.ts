import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

// MODELS
import User from './models/User';
import Project from './models/Project';

import GoogleProvider from './models/google/GoogleProvider';
import GoogleDriveFolder from './models/google/GoogleDriveFolder';
import GoogleDriveFile from './models/google/GoogleDriveFile';

import GithubProvider from './models/github/GithubProvider';
import GithubRepo from './models/github/GithubRepo';
import GithubMember from './models/github/GithubMember';
import GithubCommit from './models/github/GithubCommit';
import GithubBranch from './models/github/GithubBranch';
import GithubPullRequest from './models/github/GithubPullRequest';
import GithubIssue from './models/github/GithubIssue';

import TrelloProvider from './models/trello/TrelloProvider';
import TrelloBoard from './models/trello/TrelloBoard';
import TrelloCard from './models/trello/TrelloCard';
import TrelloMember from './models/trello/TrelloMember';
import TrelloAction from './models/trello/TrelloAction';
import TrelloList from './models/trello/TrelloList';

// UTILS
import sequelize from './utils/database';

// ROUTES
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import googleRoutes from './routes/googleRoutes';
import githubRoutes from './routes/githubRoutes';
import trelloRoutes from './routes/trelloRoutes';

// MIDDLEWARE
import requireAuth from './middlewares/requireAuth';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
	req;
	res.send('hoa');
});

app.get('/about.json', (req: any, res: any) => {
	req;
	res.status(200).json({
		client: {
			host: '10.103.14.56'
		},
		server: {
			current_time: Date.now(),
			services: [
				{
					name: 'Github',
					actions: [
						{
							name: 'Create repository',
							description: 'Create a repository'
						},
						{
							name: 'List commits',
							description: 'List commits'
						},
						{
							name: 'List merge requests',
							description: 'List merge requests'
						},
						{
							name: 'List members',
							description: 'Create a repository'
						}
					]
				},
				{
					name: 'Trello',
					actions: [
						{ name: 'Create a board', description: 'Create a board' },
						{
							name: 'Fetch all cards',
							description: 'Fetch all the cards present'
						}
					]
				},
				{ name: 'Google' }
			]
		}
	});
});

app.use('/auth', authRoutes);
app.use('/users', requireAuth, userRoutes);
app.use('/projects', requireAuth, projectRoutes);
app.use('/google', requireAuth, googleRoutes);
app.use('/github', requireAuth, githubRoutes);
app.use('/trello', requireAuth, trelloRoutes);

app.use(
	(
		error: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		req;
		next;
		const status = error.statusCode || 500;
		const message = error.message;
		const data = error.data;
		res.status(status).json({ message, data });
	}
);

// User has one GoogleProvider
User.hasOne(GoogleProvider);
GoogleProvider.belongsTo(User);

User.hasOne(GithubProvider);
GithubProvider.belongsTo(User);

User.hasOne(TrelloProvider);
TrelloProvider.belongsTo(User);

User.hasMany(Project);
Project.belongsTo(User);

Project.hasOne(TrelloBoard);
TrelloBoard.belongsTo(Project);

Project.hasOne(GithubRepo);
GithubRepo.belongsTo(Project);
GithubRepo.hasMany(GithubMember);
GithubRepo.hasMany(GithubBranch);
GithubRepo.hasMany(GithubPullRequest);
GithubPullRequest.belongsTo(GithubRepo);
GithubBranch.belongsTo(GithubRepo);
GithubMember.hasMany(GithubCommit);
GithubRepo.hasMany(GithubCommit);
GithubCommit.belongsTo(GithubMember);
GithubRepo.hasMany(GithubIssue);
GithubIssue.belongsTo(GithubRepo);

Project.hasOne(GoogleDriveFolder);
GoogleDriveFolder.belongsTo(Project);
GoogleDriveFolder.hasMany(GoogleDriveFile);
GoogleDriveFile.belongsTo(GoogleDriveFolder);

TrelloBoard.hasMany(TrelloCard);
TrelloCard.belongsTo(TrelloBoard);
TrelloBoard.hasMany(TrelloMember);
TrelloMember.belongsTo(TrelloBoard);
TrelloBoard.hasMany(TrelloAction);
TrelloMember.hasMany(TrelloAction);
TrelloAction.belongsTo(TrelloMember);
TrelloBoard.hasMany(TrelloList);
TrelloList.belongsTo(TrelloBoard);

sequelize.sync().then(() => {
	app.listen(8080, () => 'listening on port 8080');
});

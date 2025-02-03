import { App } from '@/app';
import GetGithubRepositoriesController from './controllers/getGithubRepo.controller';

const app = new App([GetGithubRepositoriesController]);
app.listen();

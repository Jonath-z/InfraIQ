import { GithubRepo } from '@/models/githubRepo';
import { Axios } from 'axios';

export default class GithubAPI {
  private githubAxios: Axios;
  constructor(accessToken: string) {
    this.githubAxios = new Axios({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  async getRepositoriesByUser(githubUsername: string) {
    return this.githubAxios.get<GithubRepo[]>(`/users/${githubUsername}/repos`);
  }
}

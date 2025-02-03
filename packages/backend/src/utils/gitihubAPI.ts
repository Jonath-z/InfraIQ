import { Axios } from 'axios';

export default class GithubAPI {
  private githubAxios: Axios;
  constructor(accessToken: string) {
    this.githubAxios = new Axios({
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  async getRepositoriesByUser(githubUsername: string) {
    return this.githubAxios.get(`/users/${githubUsername}/repos`);
  }
}

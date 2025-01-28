import GithubAPI from "../utils/githubApi";

export default class GetGithubRepositoriesService {
  async getGithubRepositoriesByUser(username: string, accessToken: string) {
    const githubAPI = new GithubAPI(accessToken);
    return await githubAPI.getRepositoriesByUser(username);
  }
}

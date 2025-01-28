import { Octokit } from "@octokit/core";

export default class GithubAPI {
  public octokit: Octokit;
  constructor(accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
  }

  async getRepositoriesByUser(githubUsername: string) {
    return this.octokit.request("GET /users/{username}/repos", {
      username: githubUsername,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  }
}

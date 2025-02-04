import { Controller, Get, NotFoundError, Param } from 'routing-controllers';
import GetGithubRepositoriesService from '../services/getGihubRepo.service';
import { ClerkOAuthProviders } from '@/utils/constants';
import { ClerkClient } from '@clerk/backend';
import Clerk from '@/utils/clerckClient';

@Controller('/github')
export default class GetGithubRepositoriesController {
  clerkClient: ClerkClient;
  githubService: GetGithubRepositoriesService;

  constructor() {
    this.clerkClient = new Clerk().client;
    this.githubService = new GetGithubRepositoriesService();
  }
  @Get('/repos/:clerkUserId')
  async getUsersRepositoriesByClerkUserId(@Param('clerkUserId') clerkUserId: string) {
    try {
      const OAuthAccessToken = await this.clerkClient.users.getUserOauthAccessToken(clerkUserId, ClerkOAuthProviders.GITHUB);

      if (OAuthAccessToken.data.length === 0) {
        throw new NotFoundError('No Access Token found');
      }

      const user = await this.clerkClient.users.getUser(clerkUserId);
      if (!user.username) {
        throw new NotFoundError('No userame found');
      }
      const { data: repos } = await this.githubService.getGithubRepositoriesByUser(user.username, OAuthAccessToken.data[0].token);
      return repos;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

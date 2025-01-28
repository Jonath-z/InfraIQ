import { ClerkClient } from "@clerk/backend";
import { Get, JsonController, NotFoundError, Param } from "routing-controllers";
import Clerk from "../utils/clerkClieknt";
import { ClerkOAuthProviders } from "../const/clerkOAuthProvider";
import GetGithubRepositoriesService from "../services/getGihubRepo.service";

@JsonController("/github")
export default class GetGithubRepositoriesController {
  clerkClient: ClerkClient;
  githubService: GetGithubRepositoriesService;

  constructor() {
    this.clerkClient = new Clerk().client;
    this.githubService = new GetGithubRepositoriesService();
  }
  @Get("/repos/:clerkUserId")
  async getUsersRepositoriesByClerkUserId(@Param("id") clerkUserId: string) {
    const OAuthAccessToken =
      await this.clerkClient.users.getUserOauthAccessToken(
        clerkUserId,
        ClerkOAuthProviders.GITHUB
      );

    if (OAuthAccessToken.data.length === 0) {
      throw new NotFoundError("No Access Token found");
    }

    const user = await this.clerkClient.users.getUser(clerkUserId);
    if (!user.username) {
      throw new NotFoundError("No userame found");
    }

    return await this.githubService.getGithubRepositoriesByUser(
      user.username,
      OAuthAccessToken.data[0].token
    );
  }
}

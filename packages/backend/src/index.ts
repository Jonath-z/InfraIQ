import { configDotenv } from "dotenv";
import { createExpressServer } from "routing-controllers";
import GetGithubRepositoriesController from "./controllers/getGithubRepo.controller";

configDotenv();

const app = createExpressServer({
  controllers: [GetGithubRepositoriesController],
});

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

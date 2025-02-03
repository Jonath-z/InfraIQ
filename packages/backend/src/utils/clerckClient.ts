import { createClerkClient } from '@clerk/backend';

export default class Clerk {
  public readonly client = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });
}

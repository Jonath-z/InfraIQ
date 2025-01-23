import { useAuth } from "@clerk/clerk-react";
import { Octokit } from "octokit";
import { useCallback } from "react";

const useOctokit = () => {
  const { getToken } = useAuth();

  return useCallback(async () => {
    const token = await getToken();
    return new Octokit({ auth: token });
  }, [getToken]);
};

export default useOctokit;

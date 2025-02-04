import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useClerk } from "@clerk/clerk-react";

export function UserRepository() {
  const { user } = useClerk();

  const { data } = useQuery({
    queryKey: ["getRepos", user?.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:4545/github/repos/${user?.id}`
      );
      return data;
    },
    enabled: !!user?.id,
    retry: false,
  });

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Repos</SelectLabel>
          {data?.map((repo) => (
            <SelectItem key={repo.id} value={repo.id}>
              {repo.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

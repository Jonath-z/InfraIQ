import { Search, User, ChevronDown, Box } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Header = () => {
  const { user } = useClerk();

  useQuery({
    queryKey: ["getRepos", user?.id],
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:4545/github/repos/${user?.id}`
      );
      console.log({ data });
    },
    enabled: !!user?.id,
    retry: false,
  });

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
          <Box className="w-5 h-5 text-white" />
        </div>

        <nav className="flex space-x-6">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <HeaderLink label="Dashboard" active={false} />
          <HeaderLink label="Visual Builder" active={true} />
          <HeaderLink label="Control Hub" active={false} />
          <HeaderLink label="Exchange Hub" active={false} />
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5 text-gray-500" />
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

const HeaderLink = ({ label, active }: { label: string; active: boolean }) => (
  <button
    className={`px-3 py-2 text-sm font-medium ${
      active ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
    }`}
  >
    {label}
  </button>
);

export default Header;

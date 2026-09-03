import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

export const AUTH_COOKIE = "codeorbit_auth";

export function setAuthCookie(authed) {
  if (typeof document === "undefined") return;

  if (authed) {
    document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${
      60 * 60 * 24 * 7
    }; SameSite=Lax`;
  } else {
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me(),

    queryFn: async () => {
      try {
        const user = await api.me();

        setAuthCookie(true);
        toast.success("signed in as "+user.displayName);

        return user;
      } catch (error) {
        setAuthCookie(false);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.logout(),

    onSettled: async () => {
      // Remove frontend auth indicator
      setAuthCookie(false);

      // Clear current user from React Query cache
      queryClient.setQueryData(
        queryKeys.auth.me(),
        null
      );

      // Invalidate authentication-related queries
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });

      // Redirect to login
      navigate("/", {
        replace: true,
      });
    },
  });
}
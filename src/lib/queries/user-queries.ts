// src/lib/queries/userQueries.ts
import { queryOptions } from "@tanstack/react-query";
import { userService } from "@/lib/services";

// Query options factories — reusable across loaders and hooks
export const userQueries = {
  detail: (id: string) =>
    queryOptions({
      queryKey: ["users", id],
      queryFn: () => userService.getUser(id),
      staleTime: 1000 * 60 * 5, // 5 min
    }),
};

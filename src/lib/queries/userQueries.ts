// src/lib/queries/userQueries.ts
import { queryOptions } from "@tanstack/react-query"
import { UserService } from "@/lib/services/userService"

// Query options factories — reusable across loaders and hooks
export const userQueries = {
    detail: (id: string) =>
        queryOptions({
            queryKey: ["users", id],
            queryFn: () => UserService.getUser(id),
            staleTime: 1000 * 60 * 5, // 5 min
        }),
}

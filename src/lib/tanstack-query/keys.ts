type Params = object;

const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (params?: Params) => [...usersKeys.lists(), params ?? {}] as const,
};

export const queryKeys = {
  users: usersKeys,
};

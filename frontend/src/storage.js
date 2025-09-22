// Utility for persisting user session
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

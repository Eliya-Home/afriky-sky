export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }

  return null;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};
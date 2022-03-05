export const checkUser = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      credentials: "include",
    });

    if (response.status === 404) {
      return;
    }

    const loggedIn = true;
    const user = await response.json();
    return { loggedIn, user };
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/logout`, {
    credentials: "include",
  });
  return response.status;
};

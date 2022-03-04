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

export const login = async (userData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    let user = null;
    if (response.status === 200) {
      // login
      user = await response.json();
    }
    return { status: response.status, user };
  } catch (error) {
    console.log(error);
  }
};

export const join = async (userData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.log(error);
  }
};

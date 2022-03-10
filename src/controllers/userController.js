export const checkUser = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      credentials: "include",
    });

    if (response.status === 404 || response.status === 401) {
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

export const checkArray = (array, targetId) => {
  let result = false;
  for (let i = 0; i < array.length; ++i) {
    if (String(array[i]) === String(targetId)) {
      result = true;
      break;
    }
  }
  return result;
};

export const book = (lectureId) => {
  fetch(`${process.env.REACT_APP_API_URL}/user/booked/${lectureId}`, {
    method: "POST",
    credentials: "include",
  });
};

export const cancelBook = (lectureId) => {
  fetch(`${process.env.REACT_APP_API_URL}/user/booked/${lectureId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const like = (lectureId) => {
  fetch(`${process.env.REACT_APP_API_URL}/user/liked/${lectureId}`, {
    method: "POST",
    credentials: "include",
  });
};

export const cancelLike = (lectureId) => {
  fetch(`${process.env.REACT_APP_API_URL}/user/liked/${lectureId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const hate = (lectureId) => {
  fetch(`${process.env.REACT_APP_API_URL}/user/hated/${lectureId}`, {
    method: "POST",
    credentials: "include",
  });
};

export const cancelHate = (lectureId) => {
  fetch(`${process.env.REACT_APP_API_URL}/user/hated/${lectureId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

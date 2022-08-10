export const checkArray = (array, targetId) => {
  if (!array) {
    return;
  }

  let result = false;
  for (let i = 0; i < array.length; ++i) {
    if (String(array[i]) === String(targetId)) {
      result = true;
      break;
    }
  }
  return result;
};

// fetch

export const checkUser = async () => {
  try {
    return await (
      await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        credentials: "include",
      })
    ).json();
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

export const getVideoInfo = async (videoId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/viewed/${videoId}`
    );

    let data;
    if (response.status === 200) {
      data = await response.json();
    }

    return { status: response.status, data };
  } catch (error) {
    console.log(error);
  }
};

export const putView = async (videoId, time, duration) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/viewed/${videoId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time,
          duration,
        }),
      }
    );

    let newViewed;
    if (response.status === 200) {
      newViewed = await response.json();
    }
    return { status: response.status, newViewed };
  } catch (error) {
    console.log(error);
  }
};

export const divideLectures = (lectures) => {
  if (!lectures || lectures.length === 0) {
    return [];
  }

  const result = [];
  const count = Math.floor((lectures.length - 1) / 6) + 1;
  const SCALE = 6;

  for (let i = 0; i < count; ++i) {
    result.push(
      lectures.slice(i * SCALE, i === count - 1 ? undefined : (i + 1) * SCALE)
    );
  }

  return result;
};

export const isMongoRegex = (id) => {
  // id regex validation
  const regex = new RegExp(process.env.REACT_APP_MONGO_REGEX_FORMAT);
  return regex.test(id);
};

// fetch

export const getFirstVideo = async (lectureId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/lectures/${lectureId}/first-video`
    );

    if (response.status === 404) {
      return;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getLecturesOfTopic = async (topicId, fetchIndex) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/topics/${topicId}`,
      {
        credentials: "include",
        headers: {
          fetch_index: fetchIndex,
        },
      }
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

export const getLecturesOfInstructor = async (instructorId, fetchIndex) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/topics/instructors/${instructorId}`,
      {
        headers: {
          fetch_index: fetchIndex,
        },
      }
    );

    if (response.status === 404) {
      return;
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

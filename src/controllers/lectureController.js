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

const getRandom = (max) => Math.floor(Math.random() * max);

// fetch

const BASE_URL = process.env.REACT_APP_API_URL;

export const getFirstVideo = async (lectureId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/lectures/${lectureId}/first-video`
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
    const response = await fetch(`${BASE_URL}/topics/${topicId}`, {
      credentials: "include",
      headers: {
        fetch_index: fetchIndex,
      },
    });

    let data;
    if (response.status === 200) {
      data = await response.json();
    }

    return { status: response.status, data };
  } catch (error) {
    console.log(error);
  }
};

export const getLecturesOfInstructor = async (instructorId, pageParam) => {
  try {
    const response = await fetch(
      `${BASE_URL}/topics/instructors/${instructorId}`,
      {
        headers: {
          fetch_index: pageParam - 1,
        },
      }
    );

    if (response.status === 404) {
      return { isError: true };
    }

    const data = await response.json();
    const { instructor, ended } = data;

    return {
      result: instructor,
      nextPage: pageParam + 1,
      isLast: ended,
      isError: false,
    };
  } catch (error) {
    console.log(error);
  }
};

export const searchLectures = async (keyword, excepts) => {
  try {
    const response = await fetch(`${BASE_URL}/lectures/search/${keyword}`, {
      credentials: "include",
      headers: {
        excepts: JSON.stringify(excepts),
      },
    });

    let data;
    if (response.status === 200) {
      data = await response.json();
    }

    return { status: response.status, data };
  } catch (error) {
    console.log(error);
  }
};

export const getLectureDetail = async (id) => {
  return await (await fetch(`${BASE_URL}/lectures/${id}`)).json();
};

export const browseLectures = async (pageParam, maxIndex, isContainedArr) => {
  const MAX_BROWSE_TOPICS = maxIndex === 0 ? 40 : Math.min(40, maxIndex);
  const MAX_TOPIC = 5;

  const isFirstPage = pageParam === 1;
  const isMax = MAX_BROWSE_TOPICS <= MAX_TOPIC * pageParam;
  const newIndexesLen = isMax
    ? MAX_BROWSE_TOPICS - MAX_TOPIC * (pageParam - 1)
    : MAX_TOPIC;
  const newIndexes = [];
  if (!isFirstPage) {
    // get new topic indexes
    for (let i = 0; i < newIndexesLen; ++i) {
      const random = getRandom(maxIndex) + 1;
      if (isContainedArr[random]) {
        --i;
        continue;
      }
      newIndexes.push(random);
      isContainedArr[random] = true;
    }
  }

  try {
    const result = await (
      await fetch(
        `${process.env.REACT_APP_API_URL}/topics/${
          isFirstPage ? "initial" : "browse"
        }`,
        {
          credentials: "include",
          headers: {
            new_indexes: JSON.stringify(newIndexes),
          },
        }
      )
    ).json();

    const { topics, numOfTopics } = result;

    return {
      result: topics,
      nextPage: pageParam + 1,
      isLast: isMax,
      numOfTopics,
    };
  } catch (error) {
    console.log(error);
  }
};

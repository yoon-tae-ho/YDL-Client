export const getVideoPath = (player, embededCode) => {
  let baseUrl = "/watch";
  switch (player) {
    case process.env.REACT_APP_YOUTUBE_PLAYER:
      baseUrl += `?code=${encodeURIComponent(embededCode)}`;
      break;
    default:
      break;
  }
  return baseUrl;
};

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

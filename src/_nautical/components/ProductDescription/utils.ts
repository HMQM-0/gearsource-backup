export const defaultRatingsAndReviewData = {
  bottomline: {
    averageScore: 0,
    totalReview: 0,
  },
  reviews: [
    {
      content: "",
      createdAt: "",
      score: 0,
      title: "",
      user: {
        displayName: "",
      },
    },
  ],
};

export const formatDate = (date: string) => {
  const tempDate = new Date(date);
  const newTempDate = tempDate.toString().split(" ").splice(1, 3);
  newTempDate[1] += ",";
  const formattedDate = newTempDate.join(" ");
  return formattedDate;
};

// This function takes in a string that might have HTML Entity Encoding and Decodes it
export const decodeEntities = (() => {
  var element = document.createElement("div");
  function decodeHTMLEntities(str) {
    if (str && typeof str === "string") {
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }
    return str;
  }
  return decodeHTMLEntities;
})();

const GO_TO_PAGE = "ROUTING//GO_TO_PAGE";

export const goToPage = (payload) => {
  return {
    type: GO_TO_PAGE,
    payload,
  };
};

goToPage.type = GO_TO_PAGE;
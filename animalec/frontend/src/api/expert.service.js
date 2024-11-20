const expertsList = [];

export const expertService = {
  async getExperts() {
    console.log("current", expertsList);
    return {
      body: expertsList,
      message: "ok",
    };
  },

  async addExpert(token, payload) {
    console.log("add", payload);
    expertsList.push(payload);
    return {
      body: { name: payload.name },
      message: "ok",
    };
  },
  async getAnimalPerExpert(token, payload) {
    const expertIndex = expertsList.findIndex(
      (sponsor) => sponsor.id === payload.id
    );
    if (expertIndex !== -1) {
      return {
        body: expertsList[expertIndex],
        message: "ok",
      };
    } else {
      throw Error("sponsor not found");
    }
  },
  async removeExpert(token, id) {
    const expertIndex = expertsList.findIndex((expert) => expert.id === id);

    if (expertIndex !== -1) {
      expertsList.splice(expertIndex, 1);
      return {
        message: "ok",
      };
    }
    return {
      message: "expert not found",
    };
  },
};
export default expertService;

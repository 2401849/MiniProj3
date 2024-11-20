const sponsorsList = [];

export const sponsorService = {
  async getSponsors() {
    console.log("current", sponsorsList);
    return {
      body: sponsorsList,
      message: "ok",
    };
  },

  async addSponsor(token, payload) {
    console.log("add", payload);
    sponsorsList.push(payload);
    return {
      body: { name: payload.name },
      message: "ok",
    };
  },

  async viewAnimalPerSponsor(token, payload) {
    const sponsorIndex = sponsorsList.findIndex(
      (sponsor) => sponsor.id === payload.id
    );
    if (sponsorIndex !== -1) {
      return {
        body: sponsorsList[sponsorIndex],
        message: "ok",
      };
    } else {
      throw Error("sponsor not found");
    }
  },

  async editSponsor(token, payload) {
    console.log("edit:", payload);
    const sponsorIndex = sponsorsList.findIndex(
      (sponsor) => sponsor.id === payload.id
    );
    if (sponsorIndex !== -1) {
      sponsorsList[sponsorIndex] = {
        ...sponsorsList[sponsorIndex],
        ...payload,
      };
      console.log(sponsorsList);
      return {
        body: { name: payload.name },
        message: "ok",
      };
    } else {
      throw Error("sponsor not found");
    }
  },
  async removeSponsor(token, id) {
    const sponsorIndex = sponsorsList.findIndex((sponsor) => sponsor.id === id);

    if (sponsorIndex !== -1) {
      sponsorsList.splice(sponsorIndex, 1);
      return {
        message: "ok",
      };
    }
    return {
      message: "sponsor not found",
    };
  },
};
export default sponsorService;

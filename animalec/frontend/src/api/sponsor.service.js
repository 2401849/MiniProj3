import userService from "./user.service";

export const sponsorService = {
  async getSponsors(token) {
    const response = await userService.getUsers(token);

    return {
      body: response.body.filter(user => user.sponsor),
      message: "ok"
    };
  },

  async addSponsor(token, payload) {
    userService.editUser(token, payload);

    return {
      body: { name: payload.name },
      message: "ok"
    };
  },

  async editSponsor(token, payload) {
    userService.editUser(token, payload);

    return {
      body: { name: payload.name },
      message: "ok"
    };
  },

  async removeSponsor(token, payload) {
    userService.editUser(token, payload);
    return {
      body: { name: payload.name },
      message: "ok"
    };
  }
};
export default sponsorService;

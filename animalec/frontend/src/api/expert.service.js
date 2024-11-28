import userService from "./user.service";

export const expertService = {
  async getExperts(token) {
    const response = await userService.getUsers(token);

    return {
      body: response.body.filter(user => user.isExpert),
      message: "ok"
    };
  },

  async addExpert(token, payload) {
    userService.editUser(token, payload);

    return {
      body: { name: payload.name },
      message: "ok"
    };
  },

  async removeExpert(token, payload) {
    userService.editUser(token, payload);
    return {
      body: { name: payload.name },
      message: "ok"
    };
  }
};
export default expertService;

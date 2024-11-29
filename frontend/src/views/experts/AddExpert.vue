<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Expert" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <!-- User Selection -->
            <div class="form-group">
              <label for="sltGroupUser">Selecionar Utilizador:</label>
              <select
                id="sltGroupUser"
                class="form-control form-control-lg"
                v-model="selectedUser"
                required
                aria-label="Seleciona Utilizador"
              >
                <option value="">-- SELECIONA UTILIZADOR --</option>
                <option v-for="user in users" :key="user._id" :value="user">
                  {{ user.name }}
                </option>
              </select>
            </div>

            <!-- Group Selection -->
            <div class="form-group">
              <label>Seleciona Grupo:</label>
              <div>
                <div
                  v-for="groupOption in groupOptions"
                  :key="groupOption.value"
                  class="form-check"
                >
                  <input
                    type="checkbox"
                    :id="'chk' + groupOption.value"
                    :value="groupOption.value"
                    class="form-check-input"
                    v-model="group"
                    :aria-label="`Seleciona ${groupOption.label}`"
                  />
                  <label
                    :for="'chk' + groupOption.value"
                    class="form-check-label"
                  >
                    {{ groupOption.label }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              ADICIONAR EXPERT
            </button>
            <router-link
              :to="{ name: 'listExperts' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import { ADD_EXPERT } from "@/store/experts/expert.constants";
import { FETCH_USERS } from "@/store/users/user.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      selectedUser: "",
      group: [],
      users: [],
      groupOptions: [
        { value: "anfibio", label: "ANFÍBIO" },
        { value: "ave", label: "AVE" },
        { value: "mamifero", label: "MAMÍFERO" },
        { value: "peixe", label: "PEIXE" },
        { value: "reptil", label: "RÉPTIL" }
      ]
    };
  },
  computed: {
    ...mapGetters("user", ["getUsers"]),
    selectedUserName() {
      const user = this.users.find(user => user._id === this.selectedUser._id);
      return user ? user.name : "";
    }
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch(`user/${FETCH_USERS}`).then(
        () => {
          if (this.getUsers.length > 0) {
            this.users = this.getUsers;
          }
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    add() {
      this.selectedUser["isExpert"] = true;
      this.selectedUser["expertTypes"] = this.group;
      this.$store.dispatch(`expert/${ADD_EXPERT}`, this.selectedUser).then(
        () => {
          this.$alert("Expert adicionado com sucesso!", "Sucesso", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

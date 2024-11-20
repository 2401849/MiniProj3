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
                <option v-for="user in users" :key="user.id" :value="user">
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
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";

export default {
  name: "AddExpert",
  components: {
    HeaderPage,
  },
  data: () => {
    return {
      selectedUser: null,
      group: [],
      users: [],
      groupOptions: [
        { value: "anfibio", label: "ANFÍBIO" },
        { value: "ave", label: "AVE" },
        { value: "mamífero", label: "MAMÍFERO" },
        { value: "peixe", label: "PEIXE" },
        { value: "reptil", label: "RÉPTIL" },
      ],
    };
  },
  computed: {
    selectedUserName() {
      return this.selectedUser ? this.selectedUser.name : "";
    },
  },
  methods: {
    fetchUsers() {
      this.users = [
        {
          id: 1,
          name: "João Silva",
          birthDate: "12/12/2012",
          points: 34,
          location: { city: "Porto", country: "Portugal" },
          active: true,
        },
        {
          id: 2,
          name: "Maria Filipa",
          birthDate: "12/12/2012",
          points: 34,
          location: { city: "Lisboa", country: "Portugal" },
          active: true,
        },
      ];
    },
    add() {
      if (!this.selectedUser) {
        this.$alert("Selecione um utilizador!", "Erro", "error");
        return;
      }
      this.selectedUser.group = this.group;
      this.$store
        .dispatch(`expert/${ADD_EXPERT}`, this.selectedUser)
        .then(() => {
          this.$alert("Expert adicionado com sucesso!", "Sucesso", "success");
          router.push({ name: "listExperts" });
        })
        .catch((err) => {
          this.$alert(`${err.message}`, "Erro", "error");
        });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

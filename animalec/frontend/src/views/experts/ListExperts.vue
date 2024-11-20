<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Lista de Experts" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addExpert' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR EXPERT
          </router-link>
          <router-link
            :to="{ name: 'admin' }"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2"
          >
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <!--TABLE-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortType === 1"
                    @click="sort()"
                  ></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">CIDADE</th>
                <th scope="col">ACÇÕES</th>
                <th scope="col">ESPECIALIDADE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expert of experts" :key="expert.id">
                <td class="pt-4">{{ expert.name }}</td>
                <td class="pt-4">{{ expert.location.city }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'viewAnimalsExpert',
                      params: { expertId: expert.id },
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> VER
                  </router-link>
                  <button
                    @click="removeExpert(expert.id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
                <td class="pt-4">
                  {{ expert.group?.join(", ") }}
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
    <b-modal v-model="showUserModal" title="Informações do Expert">
      <div v-if="selectedUser">
        <p><b>Nome:</b> {{ selectedUser.name }}</p>
        <p>
          <b>Tipo:</b>
          {{ selectedUser.type === "admin" ? "Administrador" : "Utilizador" }}
        </p>
        <p><b>Pontos:</b> {{ selectedUser.gamification.points }}</p>
        <p><b>Cidade:</b> {{ selectedUser.location.city }}</p>
        <p><b>País:</b> {{ selectedUser.location.country }}</p>
      </div>
      <div v-else>
        <p>A carregar informações do expert...</p>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { FETCH_EXPERTS, REMOVE_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageExperts",
  components: {
    HeaderPage,
  },
  data: function() {
    return {
      user: {},
      experts: [],
      sortType: 1,
      showUserModal: false,
      selectedUser: null,
    };
  },
  computed: {
    ...mapGetters("expert", ["getExperts"]),
    ...mapGetters("user", ["getUsersById"]),
  },
  methods: {
    fetchExperts() {
      this.$store.dispatch(`expert/${FETCH_EXPERTS}`).then(
        () => {
          if (this.getExperts.length > 0) {
            this.experts = this.getExperts;
          }
        },
        (err) => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    removeExpert(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o expert?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`expert/${REMOVE_EXPERT}`, id).then(() => {
            this.$alert("Expert removido!", "Sucesso", "success");
            this.fetchExperts();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    },
    sort() {
      this.experts.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },
  },
  mounted() {
    this.fetchExperts();
  },
};
</script>

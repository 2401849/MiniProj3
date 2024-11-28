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
              <tr v-for="expert of experts" :key="expert._id">
                <td class="pt-4">{{ expert.name }}</td>
                <td class="pt-4">{{ expert.location.city }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'viewAnimalsExpert',
                      params: { expertId: expert._id },
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> VER
                  </router-link>
                  <button
                    @click="removeExpert(expert._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
                <td class="pt-4">
                  {{ expert.expertTypes?.join(", ") }}
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_EXPERTS, REMOVE_EXPERT } from "@/store/experts/expert.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
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
    };
  },
  computed: {
    ...mapGetters("expert", ["getExperts"]),
    ...mapGetters("expert", ["getExpertById"]),
    ...mapGetters("animal", ["getListAnimalsByIds"]),
  },
  methods: {
    fetchAnimals() {
      this.$store.dispatch(`animal/${FETCH_ANIMALS}`);
    },
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
          const selectedUser = this.getExpertById(id);
          selectedUser["isExpert"] = false;
          selectedUser["expertTypes"] = [];
          this.$store
            .dispatch(`expert/${REMOVE_EXPERT}`, selectedUser)
            .then(() => {
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
    getAnimalNamesByIds(animals) {
      const animalIds = animals.map((animal) => animal._id);
      const animalNames = this.getListAnimalsByIds(animalIds).map(
        (animal) => animal.name
      );
      return animalNames.join(", ");
    },
  },
  mounted() {
    this.fetchExperts();
    this.fetchAnimals();
  },
};
</script>

<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Lista de Sponsors" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addSponsor' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR SPONSOR
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
                <th scope="col">ANIMAIS PATRICIONADOS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sponsor of sponsors" :key="sponsor._id">
                <td class="pt-4">{{ sponsor.name }}</td>
                <td class="pt-4">{{ sponsor.location.city }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'editSponsor',
                      params: { sponsorId: sponsor._id },
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
                  <router-link
                    :to="{
                      name: 'viewAnimalsSponsor',
                      params: { sponsorId: sponsor._id },
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> VER
                  </router-link>
                  <button
                    @click="removeSponsor(sponsor._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
                <td class="pt-4">
                  {{ getAnimalNamesByIds(sponsor.animals) }}
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
import {
  FETCH_SPONSORS,
  REMOVE_SPONSOR,
} from "@/store/sponsors/sponsor.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageSponsors",
  components: {
    HeaderPage,
  },
  data: function() {
    return {
      user: {},
      sponsors: [],
      sortType: 1,
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsors"]),
    ...mapGetters("sponsor", ["getSponsorsById"]),
    ...mapGetters("animal", ["getListAnimalsByIds"]),
  },
  methods: {
    fetchAnimals() {
      this.$store.dispatch(`animal/${FETCH_ANIMALS}`);
    },
    fetchSponsors() {
      this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).then(
        () => {
          this.sponsors = this.getSponsors;
        },
        (err) => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    removeSponsor(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o sponsor?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`sponsor/${REMOVE_SPONSOR}`, id).then(() => {
            this.$alert(this.getMessage, "Sponsor removido!", "success");
            this.fetchSponsors();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    },
    // removeSponsor(id) {
    //   this.$confirm(
    //     "Se sim, clique em OK",
    //     "Deseja mesmo remover o sponsor?",
    //     "warning",
    //     { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
    //   ).then(
    //     () => {
    //       const selectedUser = this.getSponsorsById(id);
    //       selectedUser.sponsor = false;
    //       this.$store
    //         .dispatch(`sponsor/${REMOVE_SPONSOR}`, selectedUser)
    //         .then(() => {
    //           this.$alert("Sponsor removido!", "Sucesso", "success");
    //           this.fetchSponsors();
    //         });
    //     },
    //     () => {
    //       this.$alert("Remoção cancelada!", "Informação", "info");
    //     }
    //   );
    // },
    sort() {
      this.sponsors.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },
    getAnimalNamesByIds(animals) {
      const animalNames = this.getListAnimalsByIds(animals).map(
        (animal) => animal.name
      );
      return animalNames.join(", ");
    },
  },
  mounted() {
    this.fetchSponsors();
    this.fetchAnimals();
  },
};
</script>

<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Lista Animais Por Sponsor" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <h1 style="text-align: center;">{{ selectedSponsor.name }}</h1>
        <br />
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
                <th scope="col">GRUPO</th>
                <th scope="col">NÍVEL</th>
                <th scope="col">ACÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="animal of animals" :key="animal.id">
                <td class="pt-4">{{ animal.name }}</td>
                <td class="pt-4">{{ animal.group }}</td>
                <td class="pt-4">{{ animal.level }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'editSponsor',
                      params: { sponsorId: selectedSponsor.id },
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
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
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageAnimals",
  components: {
    HeaderPage,
  },
  data: function() {
    return {
      selectedSponsor: "",
      animals: [],
      sortType: 1,
    };
  },
  computed: {
    ...mapGetters("animal", ["getAnimals", "getMessage"]),
    ...mapGetters("sponsor", ["getSponsorsById"]),
  },
  methods: {
    fetchAnimals() {
      const sponsorAnimalIds =
        this.selectedSponsor?.animals?.map((animal) => animal.id) || [];
      this.animals = [
        {
          id: 1,
          name: "cão",
          group: "mamífero",
          level: 1,
          description: "O cão é o melhor amigo do homem",
          links: {
            photo:
              "https://www.purina.pt/sites/g/files/mcldtz1671/files/2018-03/cao-em-casa.jpg",
            video: "https:",
            sound: "https",
          },
          active: true,
        },
        {
          id: 2,
          name: "gato",
          group: "mamífero",
          level: 1,
          description: "O gato é o melhor amigo do homem",
          links: {
            photo:
              "https://www.royalcanin.es/wp-content/uploads/2017/10/bigotesnew.jpg",
            video: "https:",
            sound: "https",
          },
          active: true,
        },
        {
          id: 3,
          name: "pardal",
          group: "ave",
          level: 2,
          description: "O pardal é o melhor amigo do homem",
          links: {
            photo:
              "https://cdn.pixabay.com/photo/2019/07/23/00/55/sparrow-4356373_960_720.png",
            video: "https:",
            sound: "https",
          },
          active: true,
        },
        {
          id: 4,
          name: "cavalo",
          group: "mamífero",
          level: 2,
          description: "O cavalo é o melhor amigo do homem",
          links: {
            photo:
              "https://cdn.pixabay.com/photo/2017/03/29/20/02/arabian-2186313_960_720.png",
            video: "https:",
            sound: "https",
          },
          active: true,
        },
      ].filter((animal) => sponsorAnimalIds.includes(animal.id));
    },
    sort() {
      this.animals.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },
  },
  created() {
    this.selectedSponsor = this.getSponsorsById(this.$route.params.sponsorId);
    this.fetchAnimals();
  },
};
</script>

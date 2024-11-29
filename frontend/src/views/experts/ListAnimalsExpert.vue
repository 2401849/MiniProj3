<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Lista Animais Por Expert" />
      <!--MENU TOPO-->
      <h1 style="text-align: center;">{{ selectedExpert.name }}</h1>
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <router-link
          :to="{ name: 'admin' }"
          tag="button"
          class="btn btn-outline-info mr-2 mt-2"
        >
          <i class="fas fa-bars"></i> MENU PRINCIPAL
        </router-link>
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="animal of animals" :key="animal._id">
                <td class="pt-4">{{ animal.name }}</td>
                <td class="pt-4">{{ animal.group }}</td>
                <td class="pt-4">{{ animal.level }}</td>
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
      selectedExpert: "",
      animals: [],
      sortType: 1,
    };
  },
  computed: {
    ...mapGetters("animal", ["getListAnimalsByGroup"]),
    ...mapGetters("expert", ["getExpertById"]),
  },
  methods: {
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
    this.selectedExpert = this.getExpertById(this.$route.params.expertId);
    this.animals = this.getListAnimalsByGroup(this.selectedExpert.expertTypes);
  },
};
</script>

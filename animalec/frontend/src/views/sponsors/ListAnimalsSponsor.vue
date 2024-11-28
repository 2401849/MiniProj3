<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Lista Animais Por Sponsor" />
      <!--MENU TOPO-->
      <h1 style="text-align: center;">{{ selectedSponsor.name }}</h1>
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
                <th scope="col">ACÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="animal of animals" :key="animal._id">
                <td class="pt-4">{{ animal.name }}</td>
                <td class="pt-4">{{ animal.group }}</td>
                <td class="pt-4">{{ animal.level }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'editSponsor',
                      params: { sponsorId: selectedSponsor._id },
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
    ...mapGetters("sponsor", ["getSponsorsById"]),
    ...mapGetters("animal", ["getListAnimalsByIds"]),
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
    this.selectedSponsor = this.getSponsorsById(this.$route.params.sponsorId);
    this.animals = this.getListAnimalsByIds(
      this.selectedSponsor.animals.map((obj) => obj._id)
    );
  },
};
</script>

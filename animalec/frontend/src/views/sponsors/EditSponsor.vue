<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Animais ao Sponsor" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <h1 style="text-align: center;">{{ selectedSponsor.name }}</h1>
          <br />
          <form @submit.prevent="update">
            <div class="form-group d-flex align-items-center">
              <select
                id="sltGroupAnimal"
                class="form-control form-control-lg"
                v-model="selectedAnimal._id"
              >
                <option value="">-- SELECIONA ANIMAL --</option>
                <option
                  v-for="animal of animals"
                  :key="animal._id"
                  :value="animal._id"
                >
                  {{ animal.name }}
                </option>
              </select>
              <button
                type="button"
                class="btn btn-outline-success btn-m mr-2 ml-2"
                @click="addAnimal"
              >
                ADICIONAR
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-m mr-2"
                @click="clearAnimals"
              >
                APAGAR
              </button>
            </div>
            <div class="form-group">
              <textarea
                id="txtEdDescription"
                class="form-control form-control-lg"
                placeholder="<ANIMAIS A PATRICIONAR>"
                cols="30"
                rows="10"
                v-model="sponsoredAnimalsNames"
                readonly
              ></textarea>
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              CONCLUIR
            </button>
            <router-link
              :to="{ name: 'listSponsors' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
              >CANCELAR</router-link
            >
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";
import { EDIT_SPONSOR } from "@/store/sponsors/sponsor.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";

export default {
  name: "EditSponsor",
  components: {
    HeaderPage,
  },
  data: () => {
    return {
      selectedSponsor: {},
      selectedAnimal: {},
      sponsoredAnimalsSet: new Set(),
      sponsoredAnimalsArray: [],
      sponsoredAnimalsNames: "",
      animals: [],
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsorsById"]),
    ...mapGetters("animal", ["getAnimals"]),
    ...mapGetters("animal", ["getListAnimalsByIds"]),
  },
  mounted() {
    this.fetchAnimals();
  },
  methods: {
    fetchAnimals() {
      this.$store.dispatch(`animal/${FETCH_ANIMALS}`).then(
        () => {
          if (this.getAnimals.length > 0) {
            this.animals = this.getAnimals;
          }
        },
        (err) => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    update() {
      const animalsToSend = this.sponsoredAnimalsArray.map((animal) => ({
        _id: animal._id,
      }));
      this.selectedSponsor["animals"] = animalsToSend;
      this.$store
        .dispatch(`sponsor/${EDIT_SPONSOR}`, this.selectedSponsor)
        .then(
          () => {
            this.$alert("Sponsor adicionado!", "Success", "success");
            router.push({ name: "listSponsors" });
          },
          (err) => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    },
    addAnimal() {
      const animal = this.animals.find(
        (animal) => animal._id === this.selectedAnimal._id
      );
      if (animal && !this.sponsoredAnimalsSet.has(animal._id)) {
        this.sponsoredAnimalsSet.add(animal._id);
        this.sponsoredAnimalsArray.push(animal);
        this.sponsoredAnimalsNames = this.sponsoredAnimalsArray
          .map((animal) => animal.name)
          .join("\n");
      }
    },
    clearAnimals() {
      if (this.selectedAnimal._id) {
        const animalId = this.selectedAnimal._id;
        this.sponsoredAnimalsSet.delete(animalId);
        this.sponsoredAnimalsArray = this.sponsoredAnimalsArray.filter(
          (animal) => animal._id !== animalId
        );
        this.sponsoredAnimalsNames = this.sponsoredAnimalsArray
          .map((animal) => animal.name)
          .join("\n");
      }
    },
  },
  created() {
    this.selectedSponsor = this.getSponsorsById(this.$route.params.sponsorId);
    if (this.selectedSponsor && this.selectedSponsor.animals) {
      this.sponsoredAnimalsArray = this.getListAnimalsByIds(
        this.selectedSponsor.animals.map((obj) => obj._id)
      );
      this.sponsoredAnimalsNames = this.sponsoredAnimalsArray
        .map((animal) => animal.name)
        .join("\n");
    }
  },
};
</script>

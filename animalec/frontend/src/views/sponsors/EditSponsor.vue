<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Animais ao Sponsor" />

      <!--FORM-->
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
                v-model="selectedAnimal"
              >
                <option value="">-- SELECIONA ANIMAL --</option>
                <option
                  v-for="animal of animals"
                  :key="animal._id"
                  :value="animal"
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
                v-model="sponsoredAnimalsText"
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

export default {
  name: "EditSponsor",
  components: {
    HeaderPage,
  },
  data: () => {
    return {
      selectedSponsor: "",
      selectedAnimal: "",
      sponsoredAnimalsSet: new Set(),
      sponsoredAnimalsArray: [],
      sponsor: {},
      animals: [],
    };
  },
  computed: {
    sponsoredAnimalsText() {
      return this.sponsoredAnimalsArray.map((animal) => animal.name).join("\n");
    },
    ...mapGetters("sponsor", ["getSponsorsById"]),
  },
  mounted() {
    this.fetchAnimals();
    this.fillAnimalsSponsored();
  },
  methods: {
    fetchAnimals() {
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
      ];
    },
    fillAnimalsSponsored() {
      this.sponsoredAnimalsArray = this.selectedSponsor.animals;
    },
    update() {
      const sponsorData = {
        id: this.selectedSponsor.id,
        name: this.selectedSponsor.name,
        animals: this.sponsoredAnimalsArray,
      };
      this.$store.dispatch(`sponsor/${EDIT_SPONSOR}`, sponsorData).then(
        () => {
          this.$alert(this.getMeNssage, "Sponsor adicionado!", "success");
          router.push({ name: "listSponsors" });
        },
        (err) => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    addAnimal() {
      if (
        this.selectedAnimal &&
        !this.sponsoredAnimalsSet.has(this.selectedAnimal.id)
      ) {
        this.sponsoredAnimalsSet.add(this.selectedAnimal.id);
        this.sponsoredAnimalsArray.push(this.selectedAnimal);
      }
    },
    clearAnimals() {
      if (this.selectedAnimal) {
        const animalId = this.selectedAnimal.id;
        this.sponsoredAnimalsSet.delete(animalId);
        this.sponsoredAnimalsArray = this.sponsoredAnimalsArray.filter(
          (animal) => animal.id !== animalId
        );
      }
    },
  },
  created() {
    this.selectedSponsor = this.getSponsorsById(this.$route.params.sponsorId);
  },
};
</script>

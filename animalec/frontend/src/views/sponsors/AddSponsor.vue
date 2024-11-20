<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Sponsor" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <select
                id="sltGroupUser"
                class="form-control form-control-lg"
                v-model="selectedUser"
                required
              >
                <option value="">-- SELECIONA UTILIZADOR --</option>
                <option v-for="user of users" :key="user.id" :value="user">
                  {{ user.name }}
                </option>
              </select>
            </div>
            <div class="form-group d-flex align-items-center">
              <select
                id="sltGroupAnimal"
                class="form-control form-control-lg"
                v-model="selectedAnimal"
              >
                <option value="">-- SELECIONA ANIMAL --</option>
                <option
                  v-for="animal of animals"
                  :key="animal.id"
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
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="<ANIMAIS A PATRICIONAR>"
                cols="30"
                rows="10"
                v-model="sponsoredAnimalsText"
                readonly
              ></textarea>
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              ADICIONAR SPONSOR
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
import { ADD_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddSponsor",
  components: {
    HeaderPage,
  },
  data: () => {
    return {
      selectedUser: "",
      selectedAnimal: "",
      sponsoredAnimalsSet: new Set(),
      sponsoredAnimalsArray: [],
      users: [],
      animals: [],
    };
  },
  computed: {
    sponsoredAnimalsText() {
      return this.sponsoredAnimalsArray.map((animal) => animal.name).join("\n");
    },
    selectedUserName() {
      const user = this.users.find((user) => user.id === this.selectedUser.id);
      return user ? user.name : "";
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
    add() {
      this.selectedUser.animals = this.sponsoredAnimalsArray;
      this.$store.dispatch(`sponsor/${ADD_SPONSOR}`, this.selectedUser).then(
        () => {
          this.$alert(this.getMessage, "Sponsor adicionado!", "success");
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
  mounted() {
    this.fetchUsers();
    this.fetchAnimals();
  },
};
</script>

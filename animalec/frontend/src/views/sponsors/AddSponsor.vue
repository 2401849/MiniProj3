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
import { FETCH_USERS } from "@/store/users/user.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
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
    ...mapGetters("user", ["getUsers"]),
    ...mapGetters("animal", ["getAnimals"]),
    sponsoredAnimalsText() {
      return this.sponsoredAnimalsArray.map((animal) => animal.name).join("\n");
    },
    selectedUserName() {
      const user = this.users.find(
        (user) => user._id === this.selectedUser._id
      );
      return user ? user.name : "";
    },
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch(`user/${FETCH_USERS}`).then(
        () => {
          if (this.getUsers.length > 0) {
            this.users = this.getUsers;
          }
        },
        (err) => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
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
    add() {
      this.selectedUser.animals = this.sponsoredAnimalsArray.map(
        (animal) => animal._id
      );
      this.selectedUser["sponsor"] = true;
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
        !this.sponsoredAnimalsSet.has(this.selectedAnimal._id)
      ) {
        this.sponsoredAnimalsSet.add(this.selectedAnimal._id);
        this.sponsoredAnimalsArray.push(this.selectedAnimal);
      }
    },
    clearAnimals() {
      if (this.selectedAnimal) {
        const animalId = this.selectedAnimal._id;
        this.sponsoredAnimalsSet.delete(animalId);
        this.sponsoredAnimalsArray = this.sponsoredAnimalsArray.filter(
          (animal) => animal._id !== animalId
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

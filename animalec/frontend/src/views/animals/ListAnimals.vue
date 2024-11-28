<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Animais" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addAnimal' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR ANIMAL
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
                <th scope="col">GRUPO</th>
                <th scope="col">NÍVEL</th>
                <th scope="col">ACÇÕES</th>
                <th scope="col">SPONSORS</th>
                <th scope="col">EXPERTS</th>
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
                      name: 'editAnimal',
                      params: { animalId: animal._id },
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
                  <button
                    @click="viewAnimal(animal._id)"
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>
                  <button
                    @click="removeAnimal(animal._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
                <td class="pt-4">
                  {{
                    sponsors
                      .filter((sponsor) => {
                        if (
                          sponsor.animals.filter(
                            (obj) => obj._id === animal._id
                          ).length > 0
                        )
                          return true;
                      })
                      .map((sponsor) => sponsor.name)
                      .join(",\n")
                  }}
                </td>
                <td class="pt-4">
                  {{
                    experts
                      .filter((obj) => obj.expert.includes(animal.group))
                      .join(",\n")
                  }}
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
import { FETCH_ANIMALS, REMOVE_ANIMAL } from "@/store/animals/animal.constants";
import { FETCH_SPONSORS } from "@/store/sponsors/sponsor.constants";
// import {
//   FETCH_EXPERTS
// } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageAnimals",
  components: {
    HeaderPage,
  },
  data: function() {
    return {
      animals: [],
      sponsors: [],
      experts: [],
      sortType: 1,
    };
  },
  computed: {
    ...mapGetters("animal", ["getAnimals", "getMessage"]),
    ...mapGetters("sponsor", ["getSponsors"]),
    ...mapGetters("expert", ["getExperts"]),
  },
  methods: {
    fetchAnimals() {
      this.$store.dispatch(`animal/${FETCH_ANIMALS}`).then(
        () => {
          this.animals = this.getAnimals;
        },
        (err) => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    fetchSponsors() {
      this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).then(
        () => {
          if (this.getSponsors.length > 0) {
            this.sponsors = this.getSponsors;
          }
        },
        (err) => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
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

    viewAnimal(id) {
      const animal = this.animals.find((animal) => animal._id === id);

      this.$fire({
        title: animal.name,
        html: this.generateTemplate(animal),
        imageUrl: animal.links[0].url,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Imagem desconhecida",
      });
    },

    generateTemplate(animal) {
      let response = `
          <h4>Grupo:</b> ${animal.group}</h4>
          <h5>(nível:</b> ${animal.level})</h5>
          <p>${animal.description}</p> 
          <p>Elementos multimédia:
        `;
      for (const link of animal.links) {
        response += ` <a href='${link.url}' target='_blank'>${link.types}</a>`;
      }
      response += `</p><p>Comentários: ${animal.comments.length} Avaliações: ${animal.evaluation.length}</p> `;
      return response;
    },
    removeAnimal(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o animal?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`animal/${REMOVE_ANIMAL}`, id).then(() => {
            this.$alert(this.getMessage, "Animal removido!", "success");
            this.fetchAnimals();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    },
  },
  created() {
    this.fetchSponsors();
    // this.fetchExperts();
    this.fetchAnimals();
  },
};
</script>

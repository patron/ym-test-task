<template>
  <div class="container">
    <form @submit.prevent="getMovies">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputName">Movie name</label>
          <input
            type="text"
            v-model="movieName"
            class="form-control"
            id="inputName"
          />
        </div>
        <div class="form-group col-md-2">
          <label for="inputId">MovieId</label>
          <input
            v-model="movieId"
            type="text"
            class="form-control"
            id="inputId"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="inputGenre">Genre</label>
          <select v-model="movieGenre" id="inputGenre" class="form-control">
            <option selected>None</option>
            <option value="0">ACTION</option>
            <option value="1">ADVENTURES</option>
            <option value="2">COMEDY</option>
            <option value="3">DRAMA</option>
            <option value="4">HORROR</option>
            <option value="5">WESTERNS</option>
          </select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Search Movie</button>
      <button type="reset" class="btn btn-danger ml-2">Clear</button>
    </form>

    <div class="card-columns">
      <CinemaPoster
        v-for="poster of posters"
        :posterData="poster"
        :key="poster.id"
      />
    </div>
  </div>
</template>

<script>
import CinemaPoster from "@/components/CinemaPoster.vue";

export default {
  name: "CinemaApp",
  components: {
    CinemaPoster,
  },
  data() {
    return {
      posters: [],
      movieGenre: "",
      movieId: null,
    };
  },
  mounted() {
    this.getMovies();
  },
  methods: {
    async getMovies() {
      const {
        data: { data },
      } = await this.axios.get("https://cinema-api-test.y-media.io/v1/movies", {
        params: {
          movie_id: this.movieId,
          genres: this.movieGenre,
          name: this.movieName,
        },
      });
      this.posters = data;
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/mixins/_breakpoints.scss";

.card-columns {
  margin-top: 10px;
  @include media-breakpoint-only(sm) {
    column-count: 1;
  }

  @include media-breakpoint-only(md) {
    column-count: 2;
  }
  @include media-breakpoint-only(lg) {
    column-count: 3;
  }
}
</style>

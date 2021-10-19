<template>
  <div class="container">
    <div class="card mx-auto d-block mt-3" style="max-width: 728px">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img class="mx-auto d-block" :src="poster.image" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title" v-html="poster.name"></h5>
            <p class="card-text" v-html="poster.additional"></p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="show in shows"
      class="alert alert-light"
      :key="show.id"
      @click="selectDate(show.showdate)"
    >
      Showdate: {{ show.showdate }}
      <p
        class="btn mt-2 ml-2"
        :class="
          show.showdate === currentDate && time === currentTime
            ? 'btn-warning'
            : 'btn-primary'
        "
        v-for="time in show.daytime.split(';')"
        :key="time.index"
        @click="selectTime(time), takeSeats()"
      >
        {{ time }}
      </p>
    </div>

    <h2 v-if="seatArray.length" class="text-center">Choose your seat:</h2>

    <div
      v-for="row in seatArray"
      class="alert alert-light"
      :key="row[0].row"
      @click="selectRow(row[0].row)"
    >
      Row: {{ row[0].row }}
      <p
        class="btn mt-2 ml-2"
        :class="
          (seat.is_free ? 'btn-success' : 'btn-danger',
          row[0].row === currentRow && seat.seat === currentSeat.seat
            ? 'btn-warning'
            : 'btn-success')
        "
        v-for="seat in row[1]"
        :key="seat.index"
        @click="selectSeat(seat)"
      >
        {{ seat.seat }}
      </p>
    </div>

    <button
      @click="bookTicket"
      v-if="currentDate && currentTime && currentRow && currentSeat"
      class="btn btn-danger mx-auto d-block text-center"
    >
      Book a ticket
    </button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getMovie();
    this.getSceances();
  },
  data: () => ({
    shows: [],
    poster: {},
    currentDate: "",
    currentTime: "",
    seatArray: [],
    currentRow: "",
    currentSeat: "",
  }),
  methods: {
    async getSceances() {
      const {
        data: { data },
      } = await this.axios.get(
        "https://cinema-api-test.y-media.io/v1/movieShows",
        {
          params: {
            movie_id: this.$router.currentRoute.value.params.id,
          },
        }
      );
      this.seatArray = [];
      this.shows = data[this.$router.currentRoute.value.params.id];
    },
    async bookTicket() {
      this.axios
        .post("https://cinema-api-test.y-media.io/v1/bookPlace", {
          movie_id: this.$router.currentRoute.value.params.id,
          row: this.currentRow,
          seat: this.currentSeat,
          showdate: this.currentDate,
          daytime: this.currentTime,
        })
        .then((data) => {
          alert("ticket succesfuly booked!");
          console.log(data);
        });
    },
    async getMovie() {
      const {
        data: { data },
      } = await this.axios.get("https://cinema-api-test.y-media.io/v1/movies", {
        params: {
          movie_id: this.$router.currentRoute.value.params.id,
        },
      });
      this.poster = data[0];
    },
    selectDate(date) {
      this.currentDate = date;
    },
    selectTime(time) {
      this.currentTime = time;
    },
    selectRow(row) {
      this.currentRow = row;
    },
    selectSeat(seat) {
      this.currentSeat = seat;
    },
    async takeSeats() {
      const data = await this.axios.get(
        "https://cinema-api-test.y-media.io/v1/showPlaces",
        {
          params: {
            movie_id: this.$router.currentRoute.value.params.id,
            daytime: this.currentTime,
            showdate: this.currentDate,
          },
        }
      );
      this.seatArray = data.data.data;
    },
  },
};
</script>

<style lang="scss">
.val,
.key {
  display: inline;
}

li {
  list-style-type: "\1F3AC";
}

li.rating {
  list-style-type: "\1F51E";
}

li::marker {
  font-size: 24px;
}
</style>

<template>
  <div class="card" style="width: 320px">
    <img :src="posterData.image" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title" v-html="posterData.name"></h5>
      <p class="card-text" v-html="posterData.description"></p>
      <p class="card-text" v-html="posterData.additional"></p>
      <router-link :to="`/seances/${posterData.id}`" class="btn btn-primary"
        >Look seances</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CinemaPoster",
  props: {
    posterData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
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

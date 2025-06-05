<template>
  <div class="movie-list">
    <div class="movie-items">
      <div
        v-for="movie in movies"
        :key="movie.id"
        :class="{
          'movie-item': true,
          selected: selectedMovie && selectedMovie.id === movie.id,
        }"
        @click="$emit('selectMovie', movie)"
      >
        {{ movie.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieList",
  props: {
    movies: {
      type: Array,
      required: true,
    },
    selectedMovie: {
      type: Object,
      default: null,
    },
  },
  emits: ["selectMovie"],
};
</script>

<style scoped lang="scss">
.movie-list {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}

.movie-items {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;

  .movie-item {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    min-width: 100px;
    text-align: center;

    &:hover {
      background-color: #f0f0f0;
    }

    &.selected {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }
  }
}
</style>

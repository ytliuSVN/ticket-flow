<template>
  <div class="movie-combo-selection">
    <h1>電影與餐點選擇</h1>
    <div class="movie-list">
      <div
        v-for="movie in movies"
        :key="movie.id"
        :class="{
          'movie-item': true,
          selected: selectedMovieLocal && selectedMovieLocal.id === movie.id,
        }"
        @click="selectMovie(movie)"
      >
        {{ movie.title }}
      </div>
    </div>
   <ComboSelection
     :initialSelectedCombos="selectedCombosLocal"
     @update:selectedCombos="updateSelectedCombos"
   />
    <NavigationButtons
      prevRouteName=""
      nextRouteName="booking-seat"
      :nextButtonDisabled="nextButtonDisabled"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBookingStore } from "../stores/booking";
import NavigationButtons from "../components/NavigationButtons.vue";
import ComboSelection from "../components/ComboSelection.vue";

const bookingStore = useBookingStore();

const movies = ref([
  { id: "m1", title: "電影 A" },
  { id: "m2", title: "電影 B" },
  { id: "m3", title: "電影 C" },
]);

const selectedMovieLocal = ref(bookingStore.selectedMovie);
const selectedCombosLocal = ref(bookingStore.selectedCombos);

const selectMovie = (movie) => {
  selectedMovieLocal.value = movie;
  bookingStore.setSelectedMovie(movie);
};

const updateSelectedCombos = (combos) => {
  selectedCombosLocal.value = combos;
  bookingStore.setSelectedCombos(combos);
};

const nextButtonDisabled = computed(
  () => !selectedMovieLocal.value || selectedCombosLocal.value.length === 0
);
</script>

<style lang="scss" scoped>
.movie-combo-selection {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-list {
  display: flex;
  gap: 15px;
  margin-top: 20px;

  .movie-item {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

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

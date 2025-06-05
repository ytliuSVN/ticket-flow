<template>
  <div class="movie-combo-selection">
    <h1>電影與餐點選擇</h1>
    <MovieList
      :movies="movies"
      :selectedMovie="selectedMovieLocal"
      @selectMovie="selectMovie"
    />
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
import MovieList from "../components/MovieList.vue";

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
</style>

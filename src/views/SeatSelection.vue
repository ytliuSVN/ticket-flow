<template>
  <div class="seat-selection">
    <h1>座位選擇</h1>
    <TheaterSeatingChart />
    <!-- TODO: Add BookingSummary component -->
    <NavigationButtons
      prevRouteName="booking-movie-combo"
      nextRouteName="booking-payment"
      :nextButtonDisabled="nextButtonDisabled"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useBookingStore } from "../stores/booking";
import NavigationButtons from "../components/NavigationButtons.vue";
import TheaterSeatingChart from "../components/TheaterSeatingChart.vue";

const bookingStore = useBookingStore();

const nextButtonDisabled = computed(() => !bookingStore.isSeatSelected);
</script>

<style scoped>
.seat-selection {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

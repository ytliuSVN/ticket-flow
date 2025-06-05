<template>
  <div class="order-result">
    <h1>訂購結果</h1>
    <p>這裡是訂購結果頁面。</p>
    <!-- TODO: Add OrderDetails component -->
    <button @click="goToHome" class="home-button">回首頁</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useBookingStore } from "@/stores/booking";

const router = useRouter();
const bookingStore = useBookingStore();

const goToHome = () => {
  bookingStore.resetBooking();
  router.push("/");
};
</script>

<style scoped>
.order-result {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50; /* Green */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.home-button:hover {
  background-color: #45a049;
}
</style>

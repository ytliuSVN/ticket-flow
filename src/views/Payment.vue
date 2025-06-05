<template>
  <div class="payment">
    <h1>付款</h1>
    <PaymentForm />
    <!-- TODO: Add BookingSummary components -->
    <NavigationButtons
      prevRouteName="booking-seat"
      nextRouteName="booking-result"
      :nextButtonDisabled="nextButtonDisabled"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBookingStore } from '../stores/booking';
import NavigationButtons from '../components/NavigationButtons.vue';
import PaymentForm from '../components/PaymentForm.vue';

const bookingStore = useBookingStore();

const nextButtonDisabled = computed(() => !bookingStore.isPaymentProcessed);
</script>

<style scoped>
.payment {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
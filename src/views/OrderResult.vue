<template>
  <div class="order-result">
    <h1>訂購結果</h1>
    <p>這裡是訂購結果頁面。</p>
    <!-- TODO: Add OrderDetails component -->
    <NavigationButtons
      prevRouteName="booking-payment"
      nextRouteName=""
      :nextButtonDisabled="true"
    />
  </div>
</template>

<script setup>
import NavigationButtons from '../components/NavigationButtons.vue';
</script>

<style scoped>
.order-result {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
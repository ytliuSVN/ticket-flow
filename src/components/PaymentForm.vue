<template>
  <div class="payment-form">
    <form @submit.prevent="processPayment">
      <div class="form-group">
        <label for="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" v-model="cardNumber" />
      </div>
      <div class="form-group">
        <label for="cardName">Card Holder Name:</label>
        <input type="text" id="cardName" v-model="cardName" />
      </div>
      <div class="form-group">
        <label for="expiryDate">Expiry Date (MM/YY):</label>
        <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/YY" />
      </div>
      <div class="form-group">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" v-model="cvv" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const cardNumber = ref('');
const cardName = ref('');
const expiryDate = ref('');
const cvv = ref('');

const emit = defineEmits(['form-validity-change']);

const isFormValid = computed(() => {
  return cardNumber.value.length > 0 &&
         cardName.value.length > 0 &&
         expiryDate.value.length > 0 &&
         cvv.value.length > 0;
});

watch(isFormValid, (newValue) => {
  emit('form-validity-change', newValue);
}, { immediate: true });

const processPayment = () => {
  // No validation logic for demo purposes
  console.log('Processing payment with:', {
    cardNumber: cardNumber.value,
    cardName: cardName.value,
    expiryDate: expiryDate.value,
    cvv: cvv.value
  });
  alert('Payment processed (demo only)!');
  // In a real application, you would emit an event or call a store action here
};
</script>

<style scoped>
.payment-form {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
  background-color: #f9f9f9;
}

.payment-form h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input[type="text"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
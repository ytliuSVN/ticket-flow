<template>
  <div class="payment-form">
    <form @submit.prevent="processPayment">
      <div class="form-group">
        <label for="cardNumber">信用卡卡號</label>
        <input type="text" id="cardNumber" v-model="cardNumber" />
      </div>
      <div class="form-group">
        <label for="cardName">持卡人名稱</label>
        <input type="text" id="cardName" v-model="cardName" />
      </div>
      <div class="form-group">
        <label for="expiryDate">卡片到期日</label>
        <input
          type="text"
          id="expiryDate"
          v-model="expiryDate"
          placeholder="MM/YY"
        />
      </div>
      <div class="form-group">
        <label for="cvv">CVV</label>
        <input type="text" id="cvv" v-model="cvv" />
      </div>
      <button type="submit">付款</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useBookingStore } from "@/stores/booking";

const cardNumber = ref("");
const cardName = ref("");
const expiryDate = ref("");
const cvv = ref("");

const emit = defineEmits(["form-validity-change"]);

const isFormValid = computed(() => {
  return (
    cardNumber.value.length > 0 &&
    cardName.value.length > 0 &&
    expiryDate.value.length > 0 &&
    cvv.value.length > 0
  );
});

watch(
  isFormValid,
  (newValue) => {
    emit("form-validity-change", newValue);
  },
  { immediate: true }
);

const bookingStore = useBookingStore();

const processPayment = () => {
  if (isFormValid.value) {
    console.log("Processing payment with:", {
      cardNumber: cardNumber.value,
      cardName: cardName.value,
      expiryDate: expiryDate.value,
      cvv: cvv.value,
    });
    bookingStore.setPaymentStatus("paid");
    alert("Payment processed (demo only)!");
  } else {
    alert("Please fill in all payment details.");
  }
};
</script>

<style scoped>
.payment-form {
  padding: 20px;
  margin: 20px auto;
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

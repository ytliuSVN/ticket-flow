<template>
  <div class="combo-selection">
    <h2>選擇餐點</h2>
    <div class="combo-list">
      <div v-for="combo in combos" :key="combo.id" class="combo-item">
        <div class="combo-info">
          <span>{{ combo.name }} - ${{ combo.price }}</span>
        </div>
        <div class="combo-quantity">
          <button @click="decreaseQuantity(combo)">-</button>
          <span>{{ getQuantity(combo.id) }}</span>
          <button @click="increaseQuantity(combo)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  initialSelectedCombos: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:selectedCombos"]);

const combos = ref([
  { id: "c1", name: "單人套餐", price: 150 },
  { id: "c2", name: "雙人套餐", price: 280 },
  { id: "c3", name: "家庭套餐", price: 400 },
]);

const selectedCombosLocal = ref([]);

// Initialize selectedCombosLocal from props
watch(
  () => props.initialSelectedCombos,
  (newVal) => {
    selectedCombosLocal.value = newVal.map((item) => ({ ...item }));
  },
  { immediate: true, deep: true }
);

const getQuantity = (comboId) => {
  const item = selectedCombosLocal.value.find((c) => c.id === comboId);
  return item ? item.quantity : 0;
};

const increaseQuantity = (combo) => {
  const index = selectedCombosLocal.value.findIndex((c) => c.id === combo.id);
  if (index > -1) {
    selectedCombosLocal.value[index].quantity++;
  } else {
    selectedCombosLocal.value.push({ ...combo, quantity: 1 });
  }
  emit("update:selectedCombos", selectedCombosLocal.value);
};

const decreaseQuantity = (combo) => {
  const index = selectedCombosLocal.value.findIndex((c) => c.id === combo.id);
  if (index > -1) {
    if (selectedCombosLocal.value[index].quantity > 0) {
      selectedCombosLocal.value[index].quantity--;
      if (selectedCombosLocal.value[index].quantity === 0) {
        selectedCombosLocal.value.splice(index, 1);
      }
    }
  }
  emit("update:selectedCombos", selectedCombosLocal.value);
};
</script>

<style lang="scss" scoped>
.combo-selection {
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
    color: #333;
  }
}

.combo-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.combo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .combo-info {
    font-size: 1.1em;
    color: #555;
  }

  .combo-quantity {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #0056b3;
      }

      &:active {
        background-color: #004085;
      }
    }

    span {
      font-size: 1.1em;
      min-width: 20px;
      text-align: center;
    }
  }
}
</style>
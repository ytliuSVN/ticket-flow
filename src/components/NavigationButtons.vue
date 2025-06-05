<template>
  <div class="navigation-buttons">
    <button @click="navigatePrev" :disabled="!prevRouteName">上一步</button>
    <button @click="navigateNext" :disabled="nextButtonDisabled">下一步</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  prevRouteName: {
    type: String,
    default: '',
  },
  nextRouteName: {
    type: String,
    default: '',
  },
  nextButtonDisabled: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const navigatePrev = () => {
  if (props.prevRouteName) {
    router.push({ name: props.prevRouteName });
  }
};

const navigateNext = () => {
  if (props.nextRouteName) {
    router.push({ name: props.nextRouteName });
  }
};
</script>

<style scoped>
.navigation-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.navigation-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.navigation-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
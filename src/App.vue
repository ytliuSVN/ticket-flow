<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/booking/movie-combo">電影與餐點</RouterLink>
        <RouterLink to="/booking/seat">座位</RouterLink>
        <RouterLink to="/booking/payment">付款</RouterLink>
        <RouterLink to="/booking/result">訂購結果</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavigationButtons from "./components/NavigationButtons.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const currentRouteIndex = computed(() => {
  const routes = [
    "booking-movie-combo",
    "booking-seat",
    "booking-payment",
    "booking-result",
  ];
  return routes.indexOf(route.name);
});

const prevRouteName = computed(() => {
  const routes = [
    "booking-movie-combo",
    "booking-seat",
    "booking-payment",
    "booking-result",
  ];
  if (currentRouteIndex.value > 0) {
    return routes[currentRouteIndex.value - 1];
  }
  return "";
});

const nextRouteName = computed(() => {
  const routes = [
    "booking-movie-combo",
    "booking-seat",
    "booking-payment",
    "booking-result",
  ];
  if (currentRouteIndex.value < routes.length - 1) {
    return routes[currentRouteIndex.value + 1];
  }
  return "";
});

// For demonstration purposes, next button is always enabled.
// In a real application, this would be dynamically controlled based on form validation or data completion.
const nextButtonDisabled = ref(false);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  margin-top: 40px;
}
</style>

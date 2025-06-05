import { createRouter, createWebHistory } from "vue-router";

// Importing the booking store to manage booking state
import { useBookingStore } from "../stores/booking";

// Importing views for the booking process
import MovieComboSelection from "../views/MovieComboSelection.vue";
import SeatSelection from "../views/SeatSelection.vue";
import Payment from "../views/Payment.vue";
import OrderResult from "../views/OrderResult.vue";

const routes = [
  {
    path: "/",
    redirect: "/booking/movie-combo",
  },
  {
    name: "booking-movie-combo",
    path: "/booking/movie-combo",
    component: MovieComboSelection,
  },
  {
    name: "booking-seat",
    path: "/booking/seat",
    component: SeatSelection,
    beforeEnter: (to, from, next) => {
      const bookingStore = useBookingStore();
      if (
        from.name === "booking-movie-combo" &&
        bookingStore.isMovieComboSelected
      ) {
        next();
      } else {
        next({ name: "booking-movie-combo" });
      }
    },
  },
  {
    name: "booking-payment",
    path: "/booking/payment",
    component: Payment,
    beforeEnter: (to, from, next) => {
      const bookingStore = useBookingStore();
      if (
        from.name === "booking-seat" &&
        bookingStore.selectedSeats.length > 0
      ) {
        next();
      } else {
        next({ name: "booking-seat" });
      }
    },
  },
  {
    name: "booking-result",
    path: "/booking/result/:orderId?",
    component: OrderResult,
    props: true,
    beforeEnter: (to, from, next) => {
      const bookingStore = useBookingStore();
      if (
        from.name === "booking-payment" &&
        bookingStore.paymentStatus === "paid"
      ) {
        next();
      } else if (to.params.orderId) {
        // Allow direct access if orderId is present (e.g., from a shared link)
        next();
      } else {
        next({ name: "booking-payment" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

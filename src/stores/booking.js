import { defineStore } from 'pinia';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    selectedMovie: null,
    selectedCombos: [],
    selectedSeats: [],
    orderId: null,
    paymentStatus: null,
    ticketCode: null,
  }),
  actions: {
    setSelectedMovie(movie) {
      this.selectedMovie = movie;
    },
    setSelectedCombos(combos) {
      this.selectedCombos = combos;
    },
    setSelectedSeats(seats) {
      this.selectedSeats = seats;
    },
    setOrderId(id) {
      this.orderId = id;
    },
    setPaymentStatus(status) {
      this.paymentStatus = status;
    },
    setTicketCode(code) {
      this.ticketCode = code;
    },
    resetBooking() {
      this.selectedMovie = null;
      this.selectedCombos = [];
      this.selectedSeats = [];
      this.orderId = null;
      this.paymentStatus = null;
      this.ticketCode = null;
    },
  },
  getters: {
    isMovieComboSelected: (state) => state.selectedMovie !== null && state.selectedCombos.length > 0,
    isSeatSelected: (state) => state.selectedSeats.length > 0,
    isPaymentProcessed: (state) => state.paymentStatus === 'paid',
  },
});
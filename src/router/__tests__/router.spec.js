import { describe, it, expect, beforeEach, vi } from "vitest";
import { createRouter, createWebHistory } from "vue-router";
import { useBookingStore } from "@/stores/booking";
import { routes } from "../index";

// Mock the booking store
vi.mock("@/stores/booking", () => ({
  useBookingStore: vi.fn(),
}));

describe("Router Navigation Guards - Core Flows", () => {
  let router;
  let bookingStoreMock;

  beforeEach(() => {
    // Reset mocks before each test
    bookingStoreMock = {
      isMovieComboSelected: false,
      selectedSeats: [],
      paymentStatus: null,
      resetBooking: vi.fn(),
    };
    useBookingStore.mockReturnValue(bookingStoreMock);

    router = createRouter({
      history: createWebHistory(),
      routes,
    });
  });

  it("should redirect from / to /booking/movie-combo", async () => {
    await router.push("/");
    await router.isReady();
    expect(router.currentRoute.value.path).toBe("/booking/movie-combo");
  });

  it("should allow navigation to booking-seat if coming from booking-movie-combo and movie/combo is selected", async () => {
    bookingStoreMock.isMovieComboSelected = true;
    await router.push({ name: "booking-movie-combo" });
    await router.push({ name: "booking-seat" });
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("booking-seat");
  });

  it("should allow navigation to booking-payment if coming from booking-seat and seats are selected", async () => {
    bookingStoreMock.isMovieComboSelected = true; // Ensure movie/combo is selected to pass previous guard
    bookingStoreMock.selectedSeats = ["A1", "A2"];
    await router.push({ name: "booking-movie-combo" }); // Start from a valid previous route
    await router.push({ name: "booking-seat" });
    await router.isReady(); // Wait for seat selection navigation to complete
    await router.push({ name: "booking-payment" });
    await router.isReady(); // Wait for payment navigation to complete
    expect(router.currentRoute.value.name).toBe("booking-payment");
  });
});

<template>
  <div class="theater-seating-chart">
    <div class="legend">
      <div class="legend-item">
        <span class="seat selected"></span> 您的座位
      </div>
      <div class="legend-item"><span class="seat available"></span> 未售出</div>
      <div class="legend-item"><span class="seat occupied"></span> 已售出</div>
    </div>

    <div class="screen">銀幕 Screen</div>
    <div class="seating-grid">
      <div
        v-for="(row, rowIndex) in seatingLayout"
        :key="rowIndex"
        class="seat-row"
      >
        <div
          v-for="(seat, seatIndex) in row"
          :key="`${rowIndex}-${seatIndex}`"
          :class="[
            'seat',
            {
              selected: isSeatSelected(rowIndex, seatIndex),
              occupied: isSeatOccupied(rowIndex, seatIndex),
              aisle: seat === null,
            },
          ]"
          @click="toggleSeatSelection(rowIndex, seatIndex)"
        >
          <template v-if="seat !== null">{{
            getSeatLabel(rowIndex, seatIndex)
          }}</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";
import { ref, watch } from "vue";

const props = defineProps({
  theaterId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});

const bookingStore = useBookingStore();
const selectedSeats = ref(bookingStore.selectedSeats);

// Dummy seating layout for demonstration
const seatingLayout = ref([]);
const numRows = 10;
const seatsPerRow = 16;
const aislePosition1 = 3; // After 3 seats
const aislePosition2 = 13; // After 3 + 10 = 13 seats

for (let i = 0; i < numRows; i++) {
  const row = [];
  const rowLabel = String.fromCharCode(65 + i); // A, B, C...
  for (let j = 0; j < seatsPerRow; j++) {
    if (j === aislePosition1 || j === aislePosition2) {
      row.push(null); // Represents an aisle space
    }
    row.push(`${rowLabel}${j + 1}`);
  }
  seatingLayout.value.push(row);
}

// Simulate fetching occupied seats (replace with actual API call)
const occupiedSeats = ref([]);
const fetchOccupiedSeats = () => {
  // In a real application, you would fetch occupied seats based on theaterId, movieId, and showtime
  // For now, let's simulate some occupied seats
  occupiedSeats.value = ["A3", "B5", "C1", "D8"];
};

fetchOccupiedSeats(); // Call on component mount

const isSeatSelected = (rowIndex, seatIndex) =>
  selectedSeats.value.includes(getSeatLabel(rowIndex, seatIndex));

const isSeatOccupied = (rowIndex, seatIndex) =>
  occupiedSeats.value.includes(getSeatLabel(rowIndex, seatIndex));

const toggleSeatSelection = (rowIndex, seatIndex) => {
  const seatLabel = getSeatLabel(rowIndex, seatIndex);
  if (seatLabel === null || isSeatOccupied(rowIndex, seatIndex)) {
    return; // Cannot select aisle or occupied seats
  }

  if (selectedSeats.value.includes(seatLabel)) {
    selectedSeats.value = []; // Deselect if already selected
  } else {
    selectedSeats.value = [seatLabel]; // Select new seat, deselecting others
  }
};

const getSeatLabel = (rowIndex, seatIndex) =>
  seatingLayout.value[rowIndex][seatIndex];

// Watch for changes in selectedSeats and update the store
watch(
  selectedSeats,
  (newSeats) => {
    bookingStore.setSelectedSeats(newSeats);
  },
  { deep: true }
);
</script>

<style scoped>
.theater-seating-chart {
  text-align: center;
  padding: 20px;
}

.screen {
  background-color: #333;
  color: white;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: bold;
}

.seating-grid {
  display: grid;
  gap: 10px;
  justify-content: center;
}

.seat-row {
  display: flex;
  gap: 5px; /* Reduced gap for more seats */
}

.seat {
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s;
}

.seat:not(.occupied):not(.aisle):hover {
  background-color: #e0e0e0;
}

.seat.selected {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

.seat.occupied {
  background-color: #ff6347;
  color: white;
  border-color: #ff6347;
  cursor: not-allowed;
}

.seat.aisle {
  background-color: transparent;
  border: none;
  cursor: default;
}

.legend {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-item .seat {
  width: 20px;
  height: 20px;
  cursor: default;
  border-radius: 50%;
}

.legend-item .seat.available {
  background-color: #f0f0f0;
}

.legend-item .seat.selected {
  background-color: #4caf50;
}

.legend-item .seat.occupied {
  background-color: #ff6347;
}
</style>

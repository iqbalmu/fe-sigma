<template>
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="(room, index) in rooms" :key="index">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ room.name }}</h5>
              <p class="card-text">{{ room.status }}</p>
              <button
                v-if="room.available"
                class="btn btn-primary"
                @click="bookRoom(index)"
              >
                Book
              </button>
              <button v-else class="btn btn-secondary" disabled>
                Booked
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rooms: [
          {
            name: "Ruang Meeting 2",
            status: "Available (0/20 people)",
            available: false,
          },
          // Add other room objects here...
        ],
      };
    },
    methods: {
      bookRoom(index) {
        // Handle booking logic here
        console.log("Booking room:", this.rooms[index].name);
      },
    },
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  
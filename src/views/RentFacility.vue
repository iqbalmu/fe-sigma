<template>
    <div>
        <navbar></navbar>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                    type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Inventory</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                    type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Facility</button>
            </li>
        </ul>
        <div class="container">

            <div class="tab-content" id="myTabContent">

                <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
                    tabindex="0">
                    <nav>


                        <div class="row px-4" v-for="(room, index) in roomInventory" :key="room.id">
                            <router-link class="router" :to="'/RentDetail/' + room.id">
                                <div class="card mb-3 mt-4 d-flex flex-row" style="max-width: 540px;">
                                    <div class="col-md-4 d-flex align-items-center ">
                                        <img :src="'https://tnrxkmc3-8080.asse.devtunnels.ms/upload/inventories/' + room.images"
                                            style="width: 79px; height: 79px;" class="m-3 facility " alt="...">
                                    </div>
                                    <div class="col-md-8 float-right">
                                        <div class="card-body">
                                            <h5 class="room-name">{{ room.name }}</h5>
                                            <p class="card-text descripsi">{{ room.description }}</p>

                                            <button type="button" class="btn btn-sm"
                                                :class="room.stock == 'inStock' ? 'btn-success' : 'btn-secondary'">{{
                                                    room.stock }}</button>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </nav>
                </div>

                <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

                    <div class="row px-4" v-for="(room, index) in roomFacility " :key="room.id">                        
                        <router-link class="router" :to="'/RentDetail/' + room.id">
                            <div class="card mb-3 mt-4 d-flex flex-row " style="max-width: 540px;">
                                <div class="col-4 d-flex align-items-center">
                                    <img :src="'https://tnrxkmc3-8080.asse.devtunnels.ms/upload/inventories/' + room.images"
                                        style="width: 79px; height: 79px;" class="m-3 facility " alt="...">
                                </div>
                                <div class="col-8">
                                    <div class="card-body ">
                                        <h2 class=" room-name">{{ room.name }}</h2>
                                        <h5 class="card-text descripsi ">{{ room.description }}</h5>

                                        <span class="badge p-2" :class="room.stock == 'inStock' ? 'bg-success' : 'bg-secondary'">
                                            <span v-if="room.stock == 'inStock'">Available</span>
                                            <span v-else>Unavailable</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios'
import navbar from '../components/navbar.vue'
export default {
    components: {
        navbar
    },

    data() {
        return {
            roomFacility: [],
            roomInventory: [],
        }
    },

    async mounted() {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        let result = await axios.get('https://tnrxkmc3-8080.asse.devtunnels.ms/api/v1/inventories', config);

        let data = result.data.data
        console.log(data);
        this.roomFacility = data.filter(item => item.category == 'facility')
        this.roomInventory = data.filter(item => item.category == 'inventory')

        // let result1 = await axios.get('https://tnrxkmc3-8080.asse.devtunnels.ms/api/v1/inventories');
        // console.log("Inventories data: ", result1.data);
        // this.roomInventory = result1.data.data;
    },
    updated() {

    },
    methods: {
        bookRoom() {
            this.$router.push({
                name: 'RentDetail'
            });
        },

    }
}
</script>

<style scoped>
.avaliable {
    color: greenyellow;
    font-size: 1.0rem;

}

.card {
    border: 2px solid;
}

button {
    width: 89px;
    /* height: 22px ;
top: 72px ;
left: 118px ; */
    border-radius: 18px;

}

.room-name {
    font-family: Rubik;
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    /* letter-spacing: 0em; */
    text-align: left;

}

.descripsi {
    font-family: Inter;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;

}


.booked {
    color: red;
    font-size: 1.0rem;
}

.router {
    text-decoration: none;
    color: black;
    /* Atau warna teks yang Anda inginkan */
}

.material-symbols-outlined {
    color: black;
    /* Mengubah warna ikon menjadi hitam */
}

/* .room-name {

    font-size: 26px;
    font-weight: 600;


}

.descripsi {

    font-size: 12px;
    font-weight: 400;


} */

.stok {
    font-size: px;
    font-weight: 400;
}

.facility {
    border: 2px solid;
}
</style>

<template>
    <div>


        <navbar></navbar>

        <div class="" style="width: 100%;" >

            <div class="container ">
                <h3 class="text-center">
                    <img :src="'https://tnrxkmc3-8080.asse.devtunnels.ms/upload/inventories/'+images" class=" mt-3" alt="..."
                        style="width: 100px;">
                    <br>
                    <p>{{ name }}</p>
                    <p class="deskripsi">{{ descripsi }}</p>
                </h3>
                <br>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Start Date</label>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
                        v-model="start">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">End Data</label>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
                        v-model="end">
                </div>

               

                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="descripsi1"></textarea>
                </div>

                <div class="mb-3">

                    <button type="button" class=" button btn  btn-lg form-control text-white" v-on:click="submit">
                        <p class="text-btn">BOOK NOW</p>
                    </button>

                </div>

            </div>
        </div>

        <div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import navbar from '../components/navbar.vue'
export default {
    data() {
        return {
            images: '',
            descripsi: '',
            name: '',
            start: '',
            end: '',
         
            descripsi1:''





        }
    },

    methods: {
        async submit() {
            const id = this.$route.params.id
            const token = sessionStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            let result = await axios.post(`https://tnrxkmc3-8080.asse.devtunnels.ms/api/v1/inventories/${id}/book`, {
                startDate: this.start,
                endDate: this.end,
           
                description: this.descripsi1
            }, config);

            let data = result.data.data
            console.log(result);
        
            
          
            setTimeout(() => {
                // Redirect ke halaman 'RentFacility'
                this.$router.push({ path: '/RentFacility' });
            }, 2000); 

            toast.success("Success Booked !", {
                autoClose: 1000,
            });

        }
    },
    components: {
        navbar
    },



    // },
    async mounted() {
        const id = this.$route.params.id
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        let result = await axios.get(`https://tnrxkmc3-8080.asse.devtunnels.ms/api/v1/inventories/${id}`, config);
        let data = result.data.data
        this.images = data.images
        this.descripsi = data.description
        this.name = data.name

        console.log(data);

    },

}
</script>

<style scoped>
.button {
    width: 100%;
    height: 48px;
    top: 693px;
    left: 23px;
    gap: 10px;
    background-color: #003F62;
    ;

}
.deskripsi{
    font-family: Inter;
font-size: 12px;
font-weight: 400;
line-height: 15px;
letter-spacing: 0.5px;
text-align: center;

}

.text-btn {
    font-family: Rubik;
}</style>

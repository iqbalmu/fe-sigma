<template>
<div class="card text-white">
    <div class="d-flex justify-content-start container m-2">
        <router-link to="/RentFacility">
            <span class="material-symbols-outlined" style="color: #000;">
                arrow_back
            </span>
        </router-link>
    </div>
    <div class="text-center ">
        <div class="card-body mt-3">
            <!-- <p class="">Edit Profile</p> -->
            <!-- <img :src="'https://tnrxkmc3-8080.asse.devtunnels.ms/upload/user-profiles/' + images" class="rounded-circle" alt="profile" style="width: 100px; height: 100px; object-fit: cover;"> -->
            <img :src="imageUrl" class="rounded-circle" alt="profile" style="width: 150px; height: 150px; object-fit: cover; margin-bottom: -200px;">
        </div>
        <br><br><br><br><br><br>
        <div class="card-body mb-4 text-center " style="margin-right: -190px;">
            <div>

                <input type="file" ref="fileInput" @change="handleFileChange" name="images" label="Change Picture" />

            </div>
        </div>

    </div>
    <div class="d-flex justify-content-end ">
        <div class="container text-black">
            <div class="container text-black">
                <form @submit.prevent="updateProfile">
                    <div class="mb-4">
                        <label for="name" class="form-label">Name</label>
                        <input v-model="profile.name" type="text" class="form-control" id="name" aria-describedby="nameHelp" name="name">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="profile.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email">
                    </div>
                    <div class="mb-4">
                        <label for="phone" class="form-label">Phone Number</label>
                        <input v-model="profile.phone" type="number" class="form-control" id="phone" aria-describedby="phoneHelp" name="phone">
                    </div>
                    <div class="mb-4">
                        <label for="employeeId" class="form-label">ID Pegawai</label>
                        <input v-model="profile.userId" type="number" class="form-control" id="employeeId" aria-describedby="employeeIdHelp" name="userId" disabled>
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="profile.password" type="password" class="form-control" id="password" name="password">
                    </div>
                    <button type="submit" class="button btn  btn-lg form-control text-white" v-on:click="updateProfile">Save</button>
                   
                    <br><br><br><br><br><br>
                </form>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import {
    toast
} from 'vue3-toastify';
import axios from 'axios';
export default {
    data() {
        return {
            selectedFile: null,
            imageUrl: null,

            profile: {
                name: '',
                email: '',
                phone: '',
                userId: '',
                password: '',
                images: ''
            }
        }
    },

    async mounted() {
        try {
            const id = this.$route.params.id
            const token = sessionStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            let result = await axios.get('https://tnrxkmc3-8080.asse.devtunnels.ms/api/v1/profile', config)
            let data = result.data
            console.log(data)
            this.profile = data.profile;
            this.imageUrl = `https://tnrxkmc3-8080.asse.devtunnels.ms/upload/user-profiles/${data.profile.images}`;
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    },

    methods: {
        async updateProfile() {
            try {
                const id = this.$route.params.id;
                const token = sessionStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                };

                let formData = new FormData();
                formData.append("images", this.selectedFile);
                formData.append("name", this.profile.name)
                formData.append("email", this.profile.email)
                formData.append("phone", this.profile.phone)
                formData.append("password", this.profile.password)

                console.log("formData: ", formData);
                console.log("images: ", this.selectedFile);

                let result = await axios.put(`https://tnrxkmc3-8080.asse.devtunnels.ms/api/v1/profile`,
                    formData,
                    config);

                let data = result.data;
                console.log('Profile update success', data);
                toast.success("Berhasil Diedit ", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log('Profile update failed', error);
            }
        },
        handleFileChange(event) {
            console.log(event.target.files[0]);
            this.selectedFile = event.target.files[0];

            const reader = new FileReader();
            console.log('reader: ', reader);
            reader.onload = () => {
                this.imageUrl = reader.result;
            };
            reader.readAsDataURL(this.selectedFile);
        },
      

    },

}
</script>

<style scoped>
/* .file-input {
   display: none;
 } */
.card {
    height: 180px !important;
    background-color: #003F62;
}

.card-body img {
    margin-top: -40px;
}

.button {

    border-radius: 10px;
    background: #003F62;

}

.button:hover {
    background: #003F62;
    border-radius: 10px;

}
</style>

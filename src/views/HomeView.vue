<template>
  <div>
    <navbar></navbar>
    <br><br>
    <p class="judulhome">Welcome, {{ profile.name }}</p>
    <p class="text-center">
      <img src="../assets/undraw_Online_test_re_kyfx.png" width="277px" alt="" srcset="">
    </p>

    <img src="" alt="">
    <p class="texthome">Optimize Your Operations with <br> Easy and Fast Inventory <br> Lending.</p>
    <br>
    <div class="d-flex justify-content-center align-items-center">
      <router-link to="/RentFacility" class="btn button btn-primary d-flex justify-content-center align-items-center">
        <span class="text-center d-flex align-items-center justify-content-center">Get Started</span>
      </router-link>
    </div>
    <br><br><br>
  </div>
</template>

<script>
import axios from 'axios';
import navbar from '../components/navbar.vue';

export default {
  components: {
    navbar
  },
  data() {
    return {
      profile: {
        name: '',
      }
    };
  },
  async mounted() {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      let result = await axios.get('https://tnrxkmc3-8080.asse.devtunnels.ms/api/v1/profile', config);
      let data = result.data;
      console.log(data);
      this.profile.name = data.profile.name;
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  },
  components: {
    navbar
  },
};
</script>


<style scoped>
.judulhome {
  font-family: Lato;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.01em;
  text-align: center;

}

.texthome {
  font-family: Lato;
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;


}

.button {
  margin: auto;
  width: 170px;
  height: 52px;
  top: 604px;
  left: 108px;
  border-radius: 40px;
  background-color: #003F62;
  ;

}
</style>
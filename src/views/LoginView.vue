<template>
<section id="contact">
    <div class="container  ">

        <div class="row justify-content-center align-items-center ">
            <div class="col-lg-4">
                <div class="container">
                    <form>
                        <div class="container-fluid">
                            <div class="mb-2">
                                <br>
                                <div v-if="erorrMessage" class="alert alert-danger text-center" role="alert">
                                    {{ erorrMessage }}
                                </div>

                                <p class=" text-center mt-1 judul1"> <img src="../assets/logo sigma.jpg" alt="" style="width: 200px;"> <br> Welcome to </p>
                                <h5 class="sigma text-center">sigma’s company</h5>
                                <br>
                                <p class="login">Login</p>

                                <div class="mb-4 input-group">

                                    <input type="id" class="form-control" id="id" aria-describedby="emailHelp" placeholder="id" v-model="id">
                                </div>

                            </div>
                            <div class="mb-3">

                                <div class="mb-3 input-group">
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                                </div>

                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    Keep me logged in
                                </label>
                            </div>
                            <div class="col-lg-3 mt-3">
                                <button type="button" class="btn btn-primary" v-on:click="login">Login</button>
                            </div>

                            <a href="#" class="text-center d-flex justify-content-center mt-4">Forgot your password?</a>
                        </div>
                    </form>
                </div>

            </div>

        </div>

    </div>
</section>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            id: '',
            password: '',
            erorrMessage: null,
            isLoggedIn: false
        }
    },
    methods: {
        
    async login() {
      try {
        let result = await axios.post('https://tnrxkmc3-8080.asse.devtunnels.ms/api/v1/login', {
          id: this.id,
          password: this.password
        });

        if (result.status === 200) {
          console.log(result.data);
        
          sessionStorage.setItem('token', result.data.token);
        
          this.isLoggedIn = true;
          
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        this.erorrMessage = error.response.data.message;
      }
    }
  },

//   created() {
//     // Check if the user is already logged in based on the token in sessionStorage
//     const storedToken = sessionStorage.getItem('token');
//     if (storedToken) {
//       this.isLoggedIn = true;
//     }
//   },
  }

    

</script>

<style scoped>
.justify-content-center {
    min-height: 10vh;
}

.judul1 {
    font-family: Inter;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.011em;
    text-align: left;

}

.sigma {
    font-family: Inter;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.011em;
    text-align: left;
    color: #003F62;

}

.btn {
    width: 247px;
    height: 48px;
    top: 593px;
    left: 68px;
    gap: 10px;
    background: #003F62;

}

.login {
    font-family: Rubik;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;

}

a {
    font-family: Open Sans;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color:
        #003F62;

}

form {
    display: flex;
    flex-direction: column;
    /* margin-left: 20px; */
    margin-right: 20px;
}

.btn {
    width: 100%;
    margin-top: 10px;
    /* Adjust as needed for spacing */
}

/* @media (max-width: 768px) {
    form {
        width: 100%;
    }

    .btn {
        width: 100%;
    }
} */
</style>

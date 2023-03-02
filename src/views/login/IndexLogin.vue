<template>
    <body class="">

        <main class="mt-5">

            <div class="row mt-5">
                <div class="col"></div>
                <div class="col">
                    <!-- <div v-if="error" class="alert alert-danger" role="alert">
                        <strong>{{ error }}</strong>
                    </div> -->
                    <form @submit.prevent="handleSubmit">
                        <h1 class="h3 mb-3 fw-normal d-block text-center">Log In</h1>
                        <br />
                        <div class="form-floating w-100">
                            <input type="email" name="email" class="form-control" id="email" placeholder="name@example.com"
                                autofocus required v-model="email">
                            <label for="email">Email address</label>

                        </div>
                        <div class="form-floating">
                            <input type="password" name="password" class="form-control" id="password" placeholder="Password"
                                required v-model="password">
                            <label for="password">Password</label>
                        </div>
                        <br />

                        <button class="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
                        <p class="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
                    </form>
                    <a href="/register">Register</a>
                </div>
                <div class="col"></div>
            </div>
        </main>
        <!-- <toast /> -->
</body>
</template>>
<script>



import axios from 'axios'
// import toast from '@/components/ToastNotif.vue'
import {baseURL} from '@/config.js'

export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        handleSubmit() {


            const data = {
                email: this.email,
                password: this.password
            }

            console.log(data)
            axios.post(baseURL+'/loginAPI',data)
                .then(
                    res => {
                        console.log(res),
                            // localStorage.setItem("token", res.data.access_token),
                            this.$router.push('/reservasi');
                    }

                ).catch(
                    err => {
                        console.log(err)
                            // this.$toasted.show("Login Gagal")
                    }
                )


        }
    },
    components: {
        // toast
    }
}
</script>
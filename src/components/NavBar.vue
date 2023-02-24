<template>
    <div>
        <nav class="navbar navbar-expand-lg color-prime">
            <div class="container-fluid">
                <!-- <vue-feather type="star"></vue-feather> -->
                <!-- <vue-feather :type="star"></vue-feather> -->
                <!-- <span>{{ star }}</span> -->
                <!-- <a class="navbar-brand" href="">Tenta Tour</a> -->
                <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-2">
                        <li class="nav-item">
                            <span>
                                <vue-feather type="compass" size="18" class="mx-1 color-white"/>
                                <a class="navbar-brand color-white">Tenta Tour</a>
                            </span>
                        </li>
                        <li class="nav-item">
                            <!-- <a class="nav-link active" aria-current="page" href="#">Reservasi</a> -->
                            <router-link :to="{ name: 'reservasi.index' }" class="nav-link color-white"
                                aria-current="page">Reservasi</router-link>
                        </li>
                        <li class="nav-item">
                            <!-- <a class="nav-link" href="#">Link</a> -->
                            <router-link :to="{ name: 'paket.index' }" class="nav-link color-white"
                                aria-current="page">Paket</router-link>
                        </li>
                        <!-- <li class="nav-item">
                            <router-link :to="{ name: 'kota.index' }" class="nav-link"
                                aria-current="page">Kota</router-link>
                        </li> -->
                        <li class="nav-item">
                            <!-- <a class="nav-link" href="#">Link</a> -->
                            <router-link :to="{ name: 'objek.index' }" class="nav-link color-white"
                                aria-current="page">Objek</router-link>
                        </li>
                    </ul>
                    <form class="d-flex"> 
                        <a class="btn color-white logout" v-on:click="logOut">
                            Log Out <vue-feather type="log-out" size="14" class="color-white"/></a>
                    </form>
                </div>
            </div>
        </nav>
        <!-- ... -->
    </div>
</template>
   
<script>
export default {
    name: "App",
    data() {
        return {
        };
    },
    methods: {
    logOut() {
        this.$router.push('/');
    }
}
}

</script>
<style>

.color-prime{
    background-color: #297373;
    color: antiquewhite;
}
.color-white {
    color: floralwhite;
}
.logout:hover{
    color:aliceblue
}
/* 
a{
    color: floralwhite;
} */

</style>
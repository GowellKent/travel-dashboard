<template>
    <div>
        <nav class="navbar navbar-expand-lg color-prime">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-2 py-2">
                        <li class="nav-item">
                            <span>
                                <vue-feather type="compass" size="18" class="mx-1 color-white"/>
                                <!-- <a class="navbar-brand color-white">Tenta Tour</a> -->
                                <router-link :to="{ name: 'dash.board' }" class="navbar-brand color-white"
                        aria-current="page">Tenta Tour</router-link>
                            </span>
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
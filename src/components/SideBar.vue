<template>
    <div id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-secondary collapse sidenav">
        <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <!-- <a class="nav-link active" aria-current="page" href="#">Reservasi</a> -->
                    <router-link :to="{ name: 'reservasi.index' }" class="nav-link text-light"
                        aria-current="page">Reservasi</router-link>
                </li>
                <!-- <li class="border-top my-3"></li> -->
                <li class="nav-item">
                    <!-- <a class="nav-link" href="#">Link</a> -->
                    <router-link :to="{ name: 'paket.index' }" class="nav-link text-light"
                        aria-current="page">Paket</router-link>
                </li>
                <!-- <li class="border-top my-3"></li> -->
                <li class="nav-item">
                    <router-link :to="{ name: 'objek.index' }" class="nav-link text-light"
                        aria-current="page">Objek</router-link>
                </li>
                <!-- <li class="border-top my-3"></li> -->
                <li class="nav-item">
                    <router-link :to="{ name: 'bus.index' }" class="nav-link text-light"
                        aria-current="page">Bus</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "App",
    data() {
        return {
        };
    },
    
}
</script>
<style>
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 15%; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 0; /* Stay on top */
  top: 1; /* Stay at the top */
  left: 0;
  background-color:#85FFC7; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 10px;
}
</style>
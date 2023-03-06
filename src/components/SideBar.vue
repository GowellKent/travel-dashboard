<template>
    <div id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <!-- <a class="nav-link active" aria-current="page" href="#">Reservasi</a> -->
                    <router-link :to="{ name: 'reservasi.index' }" class="nav-link"
                        aria-current="page">Reservasi</router-link>
                </li>
                <li class="nav-item">
                    <!-- <a class="nav-link" href="#">Link</a> -->
                    <router-link :to="{ name: 'paket.index' }" class="nav-link"
                        aria-current="page">Paket</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'objek.index' }" class="nav-link"
                        aria-current="page">Objek</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'bus.index' }" class="nav-link"
                        aria-current="page">Bus</router-link>
                </li>
            </ul>

            <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                <span>Saved reports</span>
                <a class="link-secondary" href="#" aria-label="Add a new report">
                    <span data-feather="plus-circle" class="align-text-bottom"></span>
                </a>
            </h6>
            <ul class="nav flex-column mb-2">
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span data-feather="file-text" class="align-text-bottom"></span>
                        Current month
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span data-feather="file-text" class="align-text-bottom"></span>
                        Last quarter
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span data-feather="file-text" class="align-text-bottom"></span>
                        Social engagement
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span data-feather="file-text" class="align-text-bottom"></span>
                        Year-end sale
                    </a>
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
<template>
    <header>
        <navbar />
    </header>
    <div class="container-fluid">
        <div class="row">
            <sideBar />

            <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="container mt-5">
                    <div class="card border-0 rounded shadow">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-10 pt-2">
                                    <h4><strong>DATA RESERVASI</strong></h4>
                                </div>
                                <div class="col-1">
                                    <router-link :to="{ name: 'reservasi.custom' }"
                                        class="btn btn-md btn-primary float-end py-xl-2 mt-1 font-w">
                                        Custom
                                    </router-link>
                                </div>
                                <div class="col-1">
                                    <router-link :to="{ name: 'reservasi.create' }"
                                        class="btn btn-md btn-success float-end">
                                        <vue-feather type="plus" size="24" class="color-white pt-1"></vue-feather>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div style="height: 40em; overflow: auto;" class="mt-4">
                                <table class="table table-striped table-bordered">
                                    <thead class="thead-dark">
                                        <tr
                                            style="position: sticky; top: 0; z-index: 1; box-shadow: inset .1px .1px #000, 0 1px #000; background-color: #eee;">
                                            <th scope="col">Kode Reservasi</th>
                                            <th scope="col">Paket Perjalanan</th>
                                            <th scope="col">Tanggal Perjalanan</th>
                                            <th scope="col">Client</th>
                                            <th scope="col">Pax</th>
                                            <th scope="col">Tanggal Reservasi</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">OPTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in resers" :key="data.trh_kode"
                                            style="box-shadow: inset .1px -.1px #000">
                                            <td><router-link
                                                    :to="{ name: 'reservasi.edit', params: { id: data.trh_kode } }">{{
                                                        data.trh_kode }}</router-link></td>
                                            <td>{{ data.tph_nama }}</td>
                                            <td>{{ data.trh_tgl_jalan }}</td>
                                            <td>{{ data.name }}</td>
                                            <td>{{ data.trh_pax }}</td>
                                            <td>{{ data.trh_tgl_reservasi }}</td>
                                            <td>{{ data.tsr_desc }}</td>
                                            <td class="text-center">
                                                <button class="btn btn-sm ml-1 btn-danger"
                                                    @click.prevent="postDelete(data.trh_kode)">
                                                    <vue-feather type="trash-2" size="20" class="color-white pt-1" />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import { onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'
import navbar from '@/components/NavBar.vue'
import sideBar from '@/components/SideBar.vue'
import { baseURL } from '@/config.js'

export default {
    data() {
        return {
            resers: [],
            searchTar: ''
        }
    },
    methods: {
        setResers(data) {
            this.resers = data;
        },
        postDelete(id) {

            //delete data post by ID
            axios.get(baseURL + '/reservasi/delete?trh_kode=' + id)
                .then(() => {

                    this.getData()

                }).catch(error => {
                    console.log(error.response.data)
                })

        },
        getData() {
            this.setResers([])
            axios.get(baseURL + '/reservasi/all')
                .then(res => {
                    this.setResers(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },

    mounted() {
        this.getData()
    }, components: {
        navbar, sideBar
    },

    // setup(){
    //     const router = useRouter()
    //     return {
    //         router
    //     }
    // }

}
</script>

<style>
body {
    background: #F2f4ff;
    color: #39393A;
}

.color-prime {
    background-color: #297373;
    color: antiquewhite;
}

.color-second {
    background-color: #85FFC7;
}

.color-triple {
    background-color: #FF8552;
    color: white;
}

.color-triple:hover {
    outline-color: #FF8552;
    color: #FF8552;
    border: 1em;
    border-color: #FF8552;
}</style>
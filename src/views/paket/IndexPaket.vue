<template>
    <header>
        <navbar />
    </header>
    <div class="container-fluid">
        <div class="row">

            <sideBar />
            <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div class="container mt-5">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card border-0 rounded shadow">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-11 pt-2">
                                            <h4><strong>DATA PAKET</strong></h4>
                                        </div>
                                        <div class="col-1">
                                            <router-link :to="{ name: 'paket.create' }"
                                                class="btn btn-md btn-success"><vue-feather type="plus" size="24"
                                                    class="color-white pt-1" /></router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div style="height: 40em; overflow: auto;" class="mt-4">
                                        <table class="table table-striped table-bordered">
                                            <thead class="thead-dark">
                                                <tr
                                                    style="position: sticky; top: 0; z-index: 1; box-shadow: inset 0.1px 0.1px #000, 0 1px #000; background-color: #eee;">
                                                    <th scope="col">KODE</th>
                                                    <th scope="col">TRIP</th>
                                                    <th scope="col">NAMA</th>
                                                    <th scope="col">DURASI</th>
                                                    <th scope="col">HARGA</th>
                                                    <th scope="col">ASAL</th>
                                                    <th scope="col">TUJUAN</th>
                                                    <th scope="col">BUS</th>
                                                    <th scope="col" class="text-center" style="min-width: 10rem;">OPTIONS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="data in pakets" :key="data.tph_kode"
                                                    style="box-shadow: inset 0.1px -0.1px #000">
                                                    <td>{{ data.tph_kode }}</td>
                                                    <td>{{ data.tjt_desc }}</td>
                                                    <td>{{ data.tph_nama }}</td>
                                                    <td>{{ data.tph_durasi}}</td>
                                                    <td>{{ data.tph_harga }}</td>
                                                    <td>{{ data.tph_kota_asal }}, {{ data.tph_provinsi_asal }}</td>
                                                    <td>{{ data.tph_kota_tujuan }}, {{ data.tph_provinsi_tujuan }}</td>
                                                    <td>{{ data.tb_nama }}</td>
                                                    <td class="text-center" style="width:20%;">
                                                        <router-link
                                                            :to="{ name: 'paket.detail', params: { id: data.tph_kode } }"
                                                            class="btn btn-sm btn-secondary mr-1"><vue-feather type="list"
                                                                size="20" class="color-white pt-1" /> </router-link>
                                                        &nbsp;&nbsp;
                                                        <router-link
                                                            :to="{ name: 'paket.edit', params: { id: data.tph_kode } }"
                                                            class="btn btn-sm btn-info mr-1"><vue-feather type="edit"
                                                                size="20" class="color-white pt-1" /></router-link>
                                                        &nbsp;&nbsp;
                                                        <button @click.prevent="postDelete(data.tph_kode)"
                                                            class="btn btn-sm btn-danger ml-1"><vue-feather type="trash-2"
                                                                size="20  " class="color-white pt-1" /></button>
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
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import navbar from '@/components/NavBar.vue'
import sideBar from "@/components/SideBar.vue";
// import { onMounted, ref } from 'vue'
import { baseURL } from '@/config.js'

export default {
    data() {
        return {
            pakets: [],
            searchTar: ''
        }
    },
    methods: {
        setpakets(data) {
            this.pakets = data;
        },
        detailPaket(kode) {
            //delete data post by ID
            axios.get(baseURL + '/paket/det/find?tpd_tph_kode=' + kode)
                .then(() => {

                    //splice posts 
                    // kotas.value.splice(kotas.value.indexOf(id), 1);
                    this.$router.go()

                }).catch(error => {
                    console.log(error.response.data)
                })

        },
        postDelete(id) {

            //delete data post by ID
            axios.get(baseURL + '/paket/delete?tph_kode=' + id)
                .then(() => {
                    this.getData()
                //     axios.get(baseURL + '/paket/det/deleteAll?tph_kode=' + id)
                //     .then(
                //     ).catch(error => {
                //     console.log(error.response.data)
                // })

                }).catch(error => {
                    console.log(error.response.data)
                })

        },
        getData() {
            this.setpakets([])
            axios.get(baseURL + '/paket/all')
                .then(res => {
                    this.setpakets(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },

    mounted() {
        this.getData()
    },
    components: {
        navbar, sideBar
    }

}
</script>

<style>
body {
    background: lightgray;
}
</style>
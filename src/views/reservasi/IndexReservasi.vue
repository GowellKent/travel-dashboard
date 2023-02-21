<template>
    <navbar />
    <!-- <div class="container mt-5"> -->
    <div class="row">
        <!-- <div class="col-md-2 pr-5 left-align">
            <sidebar />
        </div> -->
        <div class="col-md-12">
            <div class="container mt-5">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA RESREVASI</h4>
                        <hr>
                        <!-- <router-link :to="{name: 'paket.create'}" class="btn btn-md btn-success">TAMBAH PAKET</router-link> -->

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Kode Paket</th>
                                    <th scope="col">Tanggal Perjalanan</th>
                                    <th scope="col">Client</th>
                                    <th scope="col">Pax</th>
                                    <th scope="col">Tanggal Reservasi</th>
                                    <th scope="col">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in resers" :key="data.trh_kode">
                                    <td>{{ data.trh_tph_kode }}</td>
                                    <td>{{ data.trh_tgl_perjalanan }}</td>
                                    <td>{{ data.trh_tu_kode }}</td>
                                    <td>{{ data.trh_pax }}</td>
                                    <td>{{ data.trh_tgl_reservasi }}</td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{name: 'paket.edit', params:{id: data.tph_kode }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link> -->
                                        &nbsp;&nbsp;
                                        <button class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>
    </div>
<!-- </div> --></template>

<script>
import axios from 'axios'
// import { onMounted, ref } from 'vue'
import navbar from '@/components/NavBar.vue'
// import sidebar from '@/components/SideBar.vue'

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
        }
    },

    mounted() {
        axios.get('http://localhost:8000/api/getRes')
            .then(res => {
                this.setResers(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, components: {
        navbar
    }

}
</script>

<style>
body {
    background: lightgray;
}
</style>
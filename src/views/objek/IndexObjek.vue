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
                            <div class="card rounded shadow">
                                <div class="card-body">
                                    <div class="row mt-2">
                                        <div class="col-10">
                                            <h4>DATA OBJEK WISATA</h4>
                                        </div>
                                        <div class="col-2 align-right">
                                            <router-link :to="{ name: 'objek.create' }"
                                                class="btn btn-md btn-success">TAMBAH
                                                OBJEK</router-link>
                                        </div>
                                    </div>
                                    <hr>

                                    <table class="table table-striped table-bordered mt-4">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">NAMA</th>
                                                <th scope="col">JENIS</th>
                                                <th scope="col">TELP</th>
                                                <th scope="col">ALAMAT</th>
                                                <th scope="col">KOTA</th>
                                                <th scope="col">OPTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="data in objeks" :key="data.tot_kode">
                                                <td><router-link
                                                        :to="{ name: 'objek.edit', params: { id: data.tot_kode } }">{{
                                                            data.tot_nama }}</router-link></td>
                                                <td>{{ data.tjo_deskripsi }}</td>
                                                <td>{{ data.tot_telp }}</td>
                                                <td>{{ data.tot_alamat }}</td>
                                                <td>{{ data.tot_kota }}, {{ data.tot_provinsi }}</td>
                                                <td>
                                                    <button @click.prevent="postDelete(data.tot_kode)"
                                                        class="btn btn-sm btn-danger">DELETE</button>
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
</template>

<script>



import axios from 'axios'
// import { onMounted, ref } from 'vue'
import navbar from '@/components/NavBar.vue'
import sideBar from "@/components/SideBar.vue";
import { baseURL } from '@/config.js'

export default {
    data() {
        return {
            objeks: []
        }
    },
    methods: {
        setObjek(data) {
            this.objeks = data;
        },
        postDelete(id) {

            //delete data post by ID
            axios.get(baseURL + '/delObjek?tot_kode=' + id)
                .then(() => {

                    //splice posts 
                    // kotas.value.splice(kotas.value.indexOf(id), 1);
                    location.reload()

                }).catch(error => {
                    console.log(error.response.data)
                })

        }
    },

    mounted() {
        axios.get(baseURL + '/objekAll')
            .then(res => {
                this.setObjek(res.data)
                //   console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
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
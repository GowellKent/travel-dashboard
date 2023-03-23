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
                                <div class="card-header">
                                    <div class="row mt-2">
                                        <div class="col-11 pt-1">
                                            <h4><strong>DATA OBJEK WISATA</strong></h4>
                                        </div>
                                        <div class="col float-end pb-2">
                                            <router-link :to="{ name: 'objek.create' }"
                                                class="btn btn-md btn-success"><vue-feather type="plus" size="24"
                                                    class="color-white pt-1" /></router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div style="height: 40em; overflow: auto;" class="mt-4">
                                        <table class="table table-striped table-bordered">
                                            <thead class="thead-dark">
                                                <tr style="position: sticky; top: 0; z-index: 1; box-shadow: inset .1px .1px #000, 0 1px #000; background-color: #eee;">
                                                    <th scope="col">NAMA</th>
                                                    <th scope="col">JENIS</th>
                                                    <th scope="col">TELP</th>
                                                    <th scope="col">ALAMAT</th>
                                                    <th scope="col">KOTA</th>
                                                    <th scope="col">HARGA</th>
                                                    <th scope="col">OPTIONS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="data in objeks" :key="data.tot_kode" style="box-shadow: inset .1px -.1px #000">
                                                    <td><router-link
                                                            :to="{ name: 'objek.edit', params: { id: data.tot_kode } }">{{
                                                                data.tot_nama }}</router-link></td>
                                                    <td>{{ data.tjo_desc }}</td>
                                                    <td>{{ data.tot_telp }}</td>
                                                    <td>{{ data.tot_alamat }}</td>
                                                    <td>{{ data.tot_kota }}, {{ data.tot_provinsi }}</td>
                                                    <td>{{ data.tot_harga }}</td>
                                                    <td>
                                                        <button @click.prevent="postDelete(data.tot_kode)"
                                                            class="btn btn-sm btn-danger text-center">DELETE</button>
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
            axios.get(baseURL + '/objek/delete?tot_kode=' + id)
                .then(() => {

                    this.getData()

                }).catch(error => {
                    console.log(error.response.data)
                })

        },
        getData(){
            this.setObjek([])
            axios.get(baseURL + '/objek/all')
            .then(res => {
                this.setObjek(res.data)
                //   console.log(res.data)
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
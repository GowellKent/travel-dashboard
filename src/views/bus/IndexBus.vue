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
                                <div class="col-11 pt-2">
                                    <h4><strong>DATA BUS</strong></h4>
                                </div>
                                <div class="col-1 float-end">
                                    <router-link :to="{ name: 'bus.create' }" class="btn btn-md btn-success"><vue-feather
                                            type="plus" size="24" class="color-white pt-1" /></router-link>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div style="height: 40em; overflow: auto;" class="mt-4">
                                <table class="table table-striped table-bordered">
                                    <thead class="thead-dark">
                                        <tr
                                            style="position: sticky; top: 0; z-index: 1; box-shadow: inset .1px .1px #000, 0 1px #000; background-color: #eee;">
                                            <th scope="col" class="text-center">KODE</th>
                                            <th scope="col">NAMA</th>
                                            <th scope="col">KOTA ASAL</th>
                                            <th scope="col">KOTA TUJUAN</th>
                                            <th scope="col" class="text-end">PAX</th>
                                            <th scope="col" class="text-end">HARGA</th>
                                            <th scope="col" class="text-center">OPTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in objeks" :key="data.tb_kode"
                                            style="box-shadow: inset .1px -.1px #000">
                                            <td><router-link :to="{ name: 'bus.edit', params: { id: data.tb_kode } }">{{
                                                data.tb_kode }}</router-link></td>
                                            <td>{{ data.tb_nama }}</td>
                                            <td>{{ data.tb_kota_asal }}</td>
                                            <td>{{ data.tb_kota_tujuan }}</td>
                                            <td class="text-end">{{ data.tb_pax }}</td>
                                            <td class="text-end">{{ data.tb_harga }}</td>
                                            <td class="text-center">
                                                <button @click.prevent="postDelete(data.tb_kode)"
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
</template>

<script>



import axios from 'axios'
// import { onMounted, ref } from 'vue'
import navbar from '@/components/NavBar.vue'
import sideBar from '@/components/SideBar.vue'
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
            axios.get(baseURL + '/bus/delete?tb_kode=' + id)
                .then(() => {

                    this.getData()

                }).catch(error => {
                    console.log(error.response.data)
                })

        },
        getData() {
            this.setObjek([])
            axios.get(baseURL + '/bus/all')
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
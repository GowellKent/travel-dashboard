<template>
    <navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA PAKET</h4>
                        <hr>
                        <router-link :to="{ name: 'paket.create' }" class="btn btn-md btn-success">TAMBAH PAKET</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">TRIP</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">DESKRIPSI</th>
                                    <th scope="col">HARGA</th>
                                    <th scope="col">ASAL</th>
                                    <th scope="col">TUJUAN</th>
                                    <th scope="col">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in pakets" :key="data.tph_kode">
                                    <td>{{ data.tjp_deskripsi }}</td>
                                    <td>{{ data.tjt_nama }}</td>
                                    <!-- <td><router-link :to="{ name: 'paket.edit', params: { id: data.tph_kode } }">{{ data.tph_nama }}</router-link></td> -->
                                    <td>{{ data.tph_nama }}</td>
                                    <td>{{ data.tph_deskripsi }}</td>
                                    <td>{{ data.tph_harga }}</td>
                                    <td>{{ data.tph_kota_asal }}</td>
                                    <td>{{ data.tph_kota_destinasi }}</td>
                                    <td class="text-center">
                                        <!-- <button @click.prevent="detailPaket(data.tph_kode)" class="btn btn-sm btn-success ml-1">Detail</button> -->
                                        <router-link :to="{ name: 'paket.detail', params: { id: data.tph_kode } }"
                                            class="btn btn-sm btn-success mr-1">DETAIL</router-link>
                                        &nbsp;&nbsp;
                                        <router-link :to="{ name: 'paket.edit', params: { id: data.tph_kode } }"
                                            class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        &nbsp;&nbsp;
                                        <button @click.prevent="postDelete(data.tph_kode)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>

import axios from 'axios'
import navbar from '@/components/NavBar.vue'
// import { onMounted, ref } from 'vue'

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
        detailPaket(kode){
            //delete data post by ID
            axios.get('http://localhost:8000/api/paketDet?tpd_tipe=D&tpd_tph_kode='+kode)
            .then(() => {
                       
                //splice posts 
                // kotas.value.splice(kotas.value.indexOf(id), 1);
                location.reload()
         
             }).catch(error => {
                 console.log(error.response.data)
             })
            
        },
        postDelete(id) {
            
            //delete data post by ID
            axios.get('http://localhost:8000/api/delPaket?tph_kode='+id)
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
        axios.get('http://localhost:8000/api/paketAll')
            .then(res => {
                this.setpakets(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    components: {
        navbar
    }

}
</script>

<style>
body {
    background: lightgray;
}
</style>
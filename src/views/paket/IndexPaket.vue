<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA PAKET</h4>
                        <hr>
                        <router-link :to="{name: 'paket.create'}" class="btn btn-md btn-success">TAMBAH PAKET</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">JENIS</th>
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
                                    <td>{{ data.tph_tjp_kode }}</td>
                                    <td>{{ data.tph_nama }}</td>
                                    <td>{{ data.tph_deskripsi }}</td>
                                    <td>{{ data.tph_harga }}</td>
                                    <td>{{ data.tph_kota_asal }}</td>
                                    <td>{{ data.tph_kota_destinasi }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'paket.edit', params:{id: data.tph_kode }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
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
</template>

<script>
import axios from 'axios'
// import { onMounted, ref } from 'vue'

export default {
    data() {
       return{
          pakets: [],
          searchTar:''
       }
   },
   methods:{
       setpakets(data){
           this.pakets = data;
       }},

    mounted(){
       axios.get('http://localhost:8000/api/PaketAll')
        .then(res => {
          this.setpakets(res.data),
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
   }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>
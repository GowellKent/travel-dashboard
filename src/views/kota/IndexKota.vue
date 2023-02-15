<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA KOTA DESTINASI</h4>
                        <hr>
                        <router-link :to="{name: 'kota.create'}" class="btn btn-md btn-success">TAMBAH KOTA</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">KOTA</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">PROVINSI</th>
                                    <th scope="col">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in kotas" :key="data.tot_kode">
                                    <td>{{ data.tot_kota }}</td>
                                    <td>{{ data.tot_nama }}</td>
                                    <td>{{ data.tot_provinsi }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'kota.edit', params:{id: data.tot_kode }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
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
          kotas: [],
          searchTar:''
       }
   },
   methods:{
       setkotas(data){
           this.kotas = data;
       }},

    mounted(){
       axios.get('http://localhost:8000/api/ListKota')
        .then(res => {
          this.setkotas(res.data),
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
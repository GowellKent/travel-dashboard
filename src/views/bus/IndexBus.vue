<template>
    <navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card rounded shadow">
                    <div class="card-body">
                        <div class="row mt-2">
                            <div class="col-10">
                                <h4>DATA BUS</h4>
                            </div>
                            <div class="col-2 align-right">
                                <router-link :to="{ name: 'bus.index' }" class="btn btn-md btn-success">TAMBAH</router-link>
                            </div>
                        </div>
                        <hr>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col" class="text-center">KODE</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">KOTA ASAL</th>
                                    <th scope="col">KOTA TUJUAN</th>
                                    <th scope="col" class="text-end">PAX</th>
                                    <th scope="col" class="text-center">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="data in objeks" :key="data.tb_kode">
                                    <td><router-link :to="{ name: 'objek.edit', params: { id: data.tb_kode } }">{{ data.tb_kode }}</router-link></td>
                                    <td>{{ data.tb_nama }}</td>
                                    <td>{{ data.tb_kota_asal }}</td>
                                    <td>{{ data.tb_kota_destinasi }}</td>
                                    <td class="text-end">{{ data.tb_pax }}</td>
                                    <td class="text-center" >
                                        <button @click.prevent="postDelete(data.tb_kode)" class="btn btn-sm btn-danger">DELETE</button>
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
import navbar from '@/components/NavBar.vue'
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
            axios.get(baseURL+'/delBus?tb_kode='+id)
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
        axios.get(baseURL+'/listBus')
            .then(res => {
                this.setObjek(res.data)
                //   console.log(res.data)
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
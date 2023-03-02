<template>
    <navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA KOTA DESTINASI</h4>
                        <hr>
                        <router-link :to="{ name: 'kota.create' }" class="btn btn-md btn-success">TAMBAH KOTA</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">KOTA</th>
                                    <!-- <th scope="col">NAMA</th> -->
                                    <th scope="col">PROVINSI</th>
                                    <th scope="col">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in kotas" :key="data.tot_kode">
                                    <td>{{ data.tot_kota }}</td>
                                    <!-- <td>{{ data.tot_nama }}</td> -->
                                    <td>{{ data.tot_provinsi }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'kota.edit', params: { id: data.tot_kode } }"
                                            class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        &nbsp;&nbsp;
                                        <button @click.prevent="postDelete(data.tot_kota)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <!-- <option v-for="data in provs" :key="data.id">{{ data.nama }}</option> -->

                    <!-- <select v-model="provs">
                            <option disabled value="">Please select one</option>
                            <option v-for="item in provs" :key="item.id">{{ item.nama }}</option>
                        </select> -->

                    <!-- <div>
                        <button @click='toggleShow' class='anchor'>Select an Instrument</button>
                        <div v-if='showMenu' class='menu'>
                            <div class='menu-item' v-for='item in provs' :key="item.id" @click='itemClicked(item.nama)'>{{ item.nama }}</div>
                        </div>
                    </div> -->
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
            kotas: [],
            searchTar: '',
            provs: []
        }
    },
    methods: {
        setkotas(data) {
            this.kotas = data;
        },
        setProvs(data) {
            this.provs = data;
        },
        postDelete(id) {
            
            //delete data post by ID
            axios.get(baseURL+'/delKota?tot_kota='+id)
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
        axios.get(baseURL+'/listKota')
            .then(res => {
                this.setkotas(res.data)
                //   console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            }),
            axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
                .then(ress => {
                    this.setProvs(ress.data.provinsi)
                    // console.log(ress.data.provinsi)
                })
                .catch(error => {
                    console.log(error)
                })

    },
//     setup() {
//         //method delete
// function postDelete(id) {
            
//             //delete data post by ID
//             axios.get(baseURL+'/api/delKota/tot_kota'+id)
//             .then(() => {
                       
//                 //splice posts 
//                 // kotas.value.splice(kotas.value.indexOf(id), 1);
         
//              }).catch(error => {
//                  console.log(error.response.data)
//              })
         
//          }   
//     },
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
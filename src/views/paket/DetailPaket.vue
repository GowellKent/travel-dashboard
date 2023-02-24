<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h4>Detail Paket</h4>
                            </div>
                            <div class="col right-align">
                                <router-link :to="{ name: 'paket.index', params:{id:post.kode}}"
                                    class="btn btn-sm btn-success mr-1">Back</router-link>
                            </div>
                        </div>
                        <hr>
                        <!-- <div class="row">
                                            <div class="col"> -->
                        <form>
                            <fieldset disabled>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Jenis Paket</label>
                                    <input type="text" class="form-control" v-model="post.jenis"
                                        placeholder="Masukkan Judul Post">
                                    <!-- validation -->
                                    <div v-if="validation.title" class="mt-2 alert alert-danger">
                                        {{ validation.title[0] }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Jenis Trip</label>
                                    <input type="text" class="form-control" v-model="post.trip"
                                        placeholder="Masukkan Judul Post">
                                    <!-- validation -->
                                    <div v-if="validation.title" class="mt-2 alert alert-danger">
                                        {{ validation.title[0] }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Nama Paket</label>
                                    <input type="text" class="form-control" v-model="post.nama"
                                        placeholder="Masukkan Judul Post">
                                    <!-- validation -->
                                    <div v-if="validation.title" class="mt-2 alert alert-danger">
                                        {{ validation.title[0] }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="content" class="font-weight-bold mt-2 mb-1">Deskripsi</label>
                                    <textarea class="form-control" rows="4" v-model="post.deskripsi"
                                        placeholder="Masukkan Konten Post"></textarea>
                                    <!-- validation -->
                                    <div v-if="validation.content" class="mt-2 alert alert-danger">
                                        {{ validation.content[0] }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Harga Paket</label>
                                    <input type="text" class="form-control" v-model="post.harga"
                                        placeholder="Masukkan Judul Post">
                                    <!-- validation -->
                                    <div v-if="validation.title" class="mt-2 alert alert-danger">
                                        {{ validation.title[0] }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Kota Destinasi</label>
                                    <input type="text" class="form-control" v-model="post.kotaDes"
                                        placeholder="Masukkan Judul Post">
                                    <!-- validation -->
                                    <div v-if="validation.title" class="mt-2 alert alert-danger">
                                        {{ validation.title[0] }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Kota Asal</label>
                                    <input type="text" class="form-control disabled" v-model="post.kotaAs"
                                        placeholder="Masukkan Judul Post">
                                    <!-- validation -->
                                    <div v-if="validation.title" class="mt-2 alert alert-danger">
                                        {{ validation.title[0] }}
                                    </div>
                                </div>
                                <br /><br />
                                <!-- <button type="submit" class="btn btn-primary">SIMPAN</button> -->

                            </fieldset>
                        </form>

                        <div class="card border-0 rounded shadow">

                            <div class="card-body">
                                <div class="row">
                                    <div class="col-11">
                                        <h2>LIST OBJEK WISATA</h2>
                                    </div>
                                    <div class="col">
                                        <router-link :to="{ name: 'detail.create', params:{id:post.kode} }" class="btn btn-sm btn-primary mr-1">Add
                                        </router-link>
                                    </div>
                                </div>
                                <hr />
                                <table class="table table-striped table-bordered mt-4">
                                    <thead class="thead-dark">
                                        <tr>
                                            <!-- <th scope="col">JENIS</th> -->
                                            <th scope="col">NAMA</th>
                                            <th scope="col">ALAMAT</th>
                                            <th scope="col">KOTA</th>
                                            <th scope="col">PROVINSI</th>
                                            <th scope="col">OPTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in post.details" :key="data.tpd_kode">
                                            <!-- <td>{{ data.tph_tjp_kode }}</td> -->
                                            <td>{{ data.tot_nama }}</td>
                                            <td style="width: 45%;">{{ data.tot_alamat }}</td>
                                            <td>{{ data.tot_kota }}</td>
                                            <td>{{ data.tot_provinsi }}</td>
                                            <td>
                                                <button @click.prevent="postDelete(data.tpd_kode)"
                                                    class="btn btn-sm btn-danger ml-1">DELETE</button>
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    methods:{
        postDelete(id) {
            
            //delete data post by ID
            axios.get('http://localhost:8000/api/delPaketDet?tpd_kode='+id)
            .then(() => {
                       
                //splice posts 
                // kotas.value.splice(kotas.value.indexOf(id), 1);
                location.reload()
                // this.$router.push({name:'paket.detail', params:{id:this.$route.params.id}});
         
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }
    },

    setup() {

        //state posts
        const post = reactive({
            kode: '',
            jenis: '',
            trip: '',
            nama: '',
            deskripsi: '',
            harga: '',
            kotaDes: '',
            kotaAs: '',
            details: []
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {


            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/findPaket?tph_kode=${route.params.id}`)
                .then(response => {

                    //assign state posts with response data
                    post.kode = response.data[0].tph_kode
                    post.jenis = response.data[0].tph_tjp_kode
                    post.trip = response.data[0].tph_tjt_kode
                    post.nama = response.data[0].tph_nama
                    post.deskripsi = response.data[0].tph_deskripsi
                    post.harga = response.data[0].tph_harga
                    post.kotaDes = response.data[0].tph_kota_destinasi
                    post.kotaAs = response.data[0].tph_kota_asal

                }).catch(error => {
                    console.log(error.response.data)
                })
            axios.get(`http://localhost:8000/api/paketDet?tpd_tipe=D&tpd_tph_kode=${route.params.id}`)
                .then(response => {

                    //assign state posts with response data
                    post.details = response.data

                }).catch(error => {
                    console.log(error.response.data)
                })

        })

        //return
        return {
            post,
            validation,
            router
        }

    }

}
</script>

<style>
body {
    background: lightgray;
}
</style>
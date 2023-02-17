<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h4>EDIT PAKET</h4>
                            </div>
                            <div class="col right-align">
                                <router-link :to="{ name: 'paket.index' }" class="btn btn-md btn-primary">BACK</router-link>
                            </div>
                        </div>
                        <hr>

                        <form @submit.prevent="update">
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
                                <input type="text" class="form-control" v-model="post.kotaAs"
                                    placeholder="Masukkan Judul Post">
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <br /><br />
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>

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
            kotaAs: ''
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

        })

        //method update
        function update() {

            let tph_tjp_kode = post.jenis
            let tph_tjt_kode = post.trip
            let tph_nama = post.nama
            let tph_kota_asal = post.kotaAs
            let tph_kota_tujuan = post.kotaDes
            let tph_harga = post.harga
            let tph_deskripsi = post.deskripsi

            axios.put(`http://localhost:8000/api/updPaket`, {
                tph_kode: route.params.id,
                tph_tjp_kode: tph_tjp_kode,
                tph_tjt_kode: tph_tjt_kode,
                tph_nama: tph_nama,
                tph_kota_asal: tph_kota_asal,
                tph_kota_destinasi: tph_kota_tujuan,
                tph_harga: tph_harga,
                tph_deskripsi: tph_deskripsi
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'paket.index'
                })

            }).catch(error => {
                //assign state validation with error 
                // validation.value = error.response.data
                console.log(error)
            })

        }

        //return
        return {
            post,
            validation,
            router,
            update
        }

    }

}
</script>

<style>body {
    background: lightgray;
}</style>
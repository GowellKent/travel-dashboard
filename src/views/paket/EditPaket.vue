<template>
    <div class="container mt-5">
        <h4>EDIT PAKET</h4> 
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col float-start">
                                <router-link :to="{ name: 'paket.index' }" class="btn btn-md btn-primary"><vue-feather type="chevron-left" size="24" class="color-white pt-1"/></router-link>
                            </div>
                        </div>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Jenis Paket</label>
                                <br />
                                <div class="row">
                                    <div class="col">

                                        <input type="text" class="form-control" v-model="post.jenis"
                                            placeholder="Masukkan Judul Post" disabled>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" aria-label="Jenis Paket" v-model="post.jenis">
                                            <option v-for="data in jenis" :key="data.tjp_kode">{{ data.tjp_kode }}-{{
                                                data.tjp_deskripsi }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Jenis Trip</label>
                                <br />
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" v-model="post.trip"
                                            placeholder="Masukkan Judul Post" disabled>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" aria-label="Jenis Paket" v-model="post.trip">
                                            <option v-for="data in trips" :key="data.tjt_kode">{{ data.tjt_kode }}-{{
                                                data.tjt_nama }}</option>
                                        </select>
                                    </div>
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
                            <!-- <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Kota Destinasi</label>
                                <input type="text" class="form-control" v-model="post.kotaDes"
                                    placeholder="Masukkan Judul Post">
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Kota Asal</label>
                                <input type="text" class="form-control" v-model="post.kotaAs"
                                    placeholder="Masukkan Judul Post">
                            </div> -->
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Provinsi Asal</label>
                                <!-- <input class="form-control" v-model="kota.tot_provinsi" placeholder="Masukkan Provinsi"> -->
                                <br />
                                <select class="form-select" v-model="post.tph_provinsi_asal"
                                    v-on:change="getKota(post.tph_provinsi_asal)" aria-label="Provinsi Asal">
                                    <!-- <option class="dropdown-item">Provinsi</option> -->
                                    <option v-for="data in provs" :key="data.id">{{ data.id }}-{{ data.nama }}</option>
                                </select>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">Kota Asal</label>
                                <br />
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" v-model="post.kotaAs"
                                            placeholder="Masukkan Kota" disabled>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="post.kotaAs" aria-label="Kota Asal">
                                            <option v-for="data in kotas" :key="data.id">{{ data.nama }}</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="provinsi2" class="font-weight-bold">Provinsi Tujuan</label>
                                <br />
                                <select class="form-select" v-model="post.tph_provinsi_tujuan"
                                    v-on:change="getKota2(post.tph_provinsi_tujuan)" aria-label="Provinsi Tujuan">
                                    <option v-for="data in provs2" :key="data.id">{{ data.id }}-{{ data.nama }}</option>
                                </select>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="nama2" class="font-weight-bold">Kota Tujuan</label>
                                <br />
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" v-model="post.kotaDes"
                                            placeholder="Masukkan Kota" disabled>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="post.kotaDes" aria-label="Kota Tujuan">
                                            <option v-for="data in kotas2" :key="data.id">{{ data.nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br /><br />
                            <button type="submit" class="btn btn-primary float-end">SIMPAN</button>
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
import { baseURL } from '@/config.js'

export default {

    data() {
        return {
            jenis: [],
            provs: [],
            provs2: [],
            kotas: [],
            kotas2: [],
            trips: []
        }
    },
    methods: {
        setProvs(data) {
            this.provs = data;
        },
        setProvs2(data) {
            this.provs2 = data;
        },

        setKotas(data) {
            this.kotas = data;
        },
        setKotas2(data) {
            this.kotas2 = data;
        },
        setJenis(data) {
            this.jenis = data;
        },
        setTrips(data) {
            this.trips = data;
        },

        getKota(id) {
            let idProvinsi = id.split("-")[0]
            axios.get('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' + idProvinsi)
                .then(ress => {
                    this.setKotas(ress.data.kota_kabupaten)
                })
                .catch(error => {
                    console.log(error)
                })

        },
        getKota2(id) {
            let idProvinsi = id.split("-")[0]
            axios.get('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' + idProvinsi)
                .then(ress => {
                    this.setKotas2(ress.data.kota_kabupaten)
                })
                .catch(error => {
                    console.log(error)
                })

        }
    },
    mounted() {
        axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
            .then(ress => {
                this.setProvs(ress.data.provinsi)
                this.setProvs2(ress.data.provinsi)
            })
            .catch(error => {
                console.log(error)
            }),
            axios.get(baseURL + '/jenisPaket')
                .then(ress => {
                    this.setJenis(ress.data)
                })
                .catch(error => {
                    console.log(error)
                }),
            axios.get(baseURL + '/jenisTrip')
                .then(ress => {
                    this.setTrips(ress.data)
                })
                .catch(error => {
                    console.log(error)
                })
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
            axios.get(baseURL + `/findPaket?tph_kode=${route.params.id}`)
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

            let tph_tjp_kode = post.jenis.split("-")[0]
            let tph_tjt_kode = post.trip.split("-")[0]
            let tph_nama = post.nama
            let tph_kota_asal = post.kotaAs
            let tph_kota_tujuan = post.kotaDes
            let tph_harga = post.harga
            let tph_deskripsi = post.deskripsi

            axios.get(baseURL + '/updPaket', {
                params: {
                    tph_kode: route.params.id,
                    tph_tjp_kode: tph_tjp_kode,
                    tph_tjt_kode: tph_tjt_kode,
                    tph_nama: tph_nama,
                    tph_kota_asal: tph_kota_asal,
                    tph_kota_destinasi: tph_kota_tujuan,
                    tph_harga: tph_harga,
                    tph_deskripsi: tph_deskripsi
                }
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

<style>
body {
    background: lightgray;
}</style>
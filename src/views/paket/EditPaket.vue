<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-header">
                        <div class="row">
                            <div class="col float-start">
                                <router-link :to="{ name: 'paket.index' }" class="btn btn-md btn-primary"><vue-feather type="chevron-left" size="24" class="color-white pt-1"/></router-link>
                            </div>
                            <div class="col-11 pt-2">
                                <h4><strong>EDIT PAKET</strong></h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update">
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
                                                data.tjt_desc }}</option>
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
                                <label for="content" class="font-weight-bold mt-2 mb-1">Durasi (Hari)</label>
                                <input class="form-control" rows="4" v-model="post.durasi"
                                    placeholder="Masukkan Konten Post" />
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
                                <label for="title" class="font-weight-bold mt-2 mb-1">Min. Pax</label>
                                <input type="text" class="form-control" v-model="post.minPax"
                                    placeholder="Masukkan Judul Post">
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Max. Pax</label>
                                <input type="text" class="form-control" v-model="post.maxPax"
                                    placeholder="Masukkan Judul Post">
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Provinsi Asal</label>
                                <!-- <input class="form-control" v-model="kota.tot_provinsi" placeholder="Masukkan Provinsi"> -->
                                <br />
                                <select class="form-select" v-model="post.provAs"
                                    v-on:change="getKota(post.provAs)" aria-label="Provinsi Asal">
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
                                <select class="form-select" v-model="post.provTujuan"
                                    v-on:change="getKota2(post.provTujuan)" aria-label="Provinsi Tujuan">
                                    <option v-for="data in provs2" :key="data.id">{{ data.id }}-{{ data.nama }}</option>
                                </select>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="nama2" class="font-weight-bold">Kota Tujuan</label>
                                <br />
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" v-model="post.kotaTujuan"
                                            placeholder="Masukkan Kota" disabled>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="post.kotaTujuan" aria-label="Kota Tujuan">
                                            <option v-for="data in kotas2" :key="data.id">{{ data.nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Bus</label>
                                <br />
                                <div class="row">
                                    <div class="col">

                                        <input type="text" class="form-control" v-model="post.bus"
                                            placeholder="Masukkan Judul Post" disabled>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" aria-label="Jenis Paket" v-model="post.bus">
                                            <option v-for="data in jenis" :key="data.tjp_kode">{{ data.tjp_kode }}-{{
                                                data.tjp_deskripsi }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div> -->
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
            axios.get(baseURL + '/paket/trip')
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
            bus: '',
            trip: '',
            nama: '',
            durasi: '',
            harga: '',
            provTujuan: '',
            kotaTujuan: '',
            kotaAs: '',
            provAs: '',
            minPax: '',
            maxPax: '',
            details: [],
            objeks: []
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
            axios.get(baseURL + `/paket/find?tph_kode=${route.params.id}`)
                .then(response => {

                    //assign state posts with response data
                    post.kode = response.data[0].tph_kode
                    post.trip = response.data[0].tph_tjt_kode + ' - ' + response.data[0].tjt_desc
                    post.nama = response.data[0].tph_nama
                    post.durasi = response.data[0].tph_durasi + " Hari"
                    post.harga = response.data[0].tph_harga
                    post.provTujuan = response.data[0].tph_provinsi_tujuan
                    post.kotaTujuan = response.data[0].tph_kota_tujuan
                    post.provAs = response.data[0].tph_provinsi_asal
                    post.kotaAs = response.data[0].tph_kota_asal
                    post.minPax = response.data[0].tph_min_pax
                    post.maxPax = response.data[0].tph_max_pax
                    post.bus = response.data[0].tb_nama

                }).catch(error => {
                    console.log(error.response.data)
                })

        })

        //method update
        function update() {

            let tph_tjt_kode = post.trip.split("-")[0]
            let tph_nama = post.nama
            let tph_provinsi_asal = post.provAs.split("-")[1]
            let tph_kota_asal = post.kotaAs
            let tph_provinsi_tujuan = post.provTujuan.split("-")[1]
            let tph_kota_tujuan = post.kotaTujuan
            let tph_harga = post.harga
            let tph_durasi = post.durasi.split(" ")[0]
            let tph_min_pax = post.minPax
            let tph_max_pax = post.maxPax
            // let tph_tb_kode = post.bus.split("-")[0]

            axios.get(baseURL + '/paket/update', {
                params: {
                    tph_kode: route.params.id,
                    tph_nama: tph_nama,
                    tph_provinsi_asal: tph_provinsi_asal,
                    tph_kota_asal: tph_kota_asal,
                    tph_provinsi_tujuan: tph_provinsi_tujuan,
                    tph_kota_tujuan: tph_kota_tujuan,
                    tph_harga: tph_harga,
                    tph_durasi: tph_durasi,
                    tph_min_pax: tph_min_pax,
                    tph_max_pax: tph_max_pax,
                    tph_tjt_kode:tph_tjt_kode
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
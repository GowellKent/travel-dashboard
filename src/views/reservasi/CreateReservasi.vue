<template>
    <navbar />
    <div class="container mt-5">
        <h4>TAMBAH RESERVASI</h4>
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <router-link :to="{ name: 'reservasi.index' }" class="btn btn-md btn-primary"><vue-feather
                                        type="chevron-left" size="20" class="color-white pt-1 pl-5" /></router-link>
                            </div>
                        </div>
                        <hr>

                        <form @submit.prevent="check">
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Provinsi Asal</label>
                                <!-- <input class="form-control" v-model="kota.tot_provinsi" placeholder="Masukkan Provinsi"> -->
                                <select class="form-select" v-model="paket.tph_provinsi_asal"
                                    v-on:change="getKota(paket.tph_provinsi_asal)" aria-label="Provinsi Asal">
                                    <!-- <option class="dropdown-item">Provinsi</option> -->
                                    <option v-for="data in provs" :key="data.id">{{ data.id }}-{{ data.nama }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">Kota Asal</label>
                                <!-- <input type="text" class="form-control" v-model="kota.tph_nama" placeholder="Masukkan Kota"> -->
                                <br />
                                <select class="form-select" v-model="paket.tph_kota_asal" aria-label="Kota Asal">
                                    <option v-for="data in kotas" :key="data.id">{{ data.nama }}</option>
                                </select>
                            </div>
                            <br>
                            <div class="form-group">
                                <label for="provinsi2" class="font-weight-bold">Provinsi Tujuan</label>
                                <br />
                                <select class="form-select" v-model="paket.tph_provinsi_tujuan"
                                    v-on:change="getKota2(paket.tph_provinsi_tujuan)" aria-label="Provinsi Tujuan">
                                    <option v-for="data in provs2" :key="data.id">{{ data.id }}-{{ data.nama }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="nama2" class="font-weight-bold">Kota Tujuan</label>
                                <br />
                                <select class="form-select" v-model="paket.tph_kota_tujuan" aria-label="Kota Tujuan">
                                    <option v-for="data in kotas2" :key="data.id">{{ data.nama }}</option>
                                </select>
                            </div>
                            <br>
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Jenis Trip</label>
                                <br />
                                <select class="form-select" aria-label="Jenis Trip" v-model="paket.tph_tjt_kode">
                                    <option v-for="data in trips" :key="data.tjt_kode">{{ data.tjt_kode }}-{{
                                        data.tjt_desc }}</option>
                                </select>
                            </div>
                            <br><br>
                            <div class="row">
                                <div class="col">
                                    <button type="submit" class="btn btn-success float-end">SEARCH</button>

                                </div>
                            </div>
                        </form>

                        <hr><br>
                        <form @submit.prevent="store">

                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Paket Wisata</label>
                                <br />
                                <select class="form-select" aria-label="Jenis Paket" v-model="paket.trh_tph_kode">
                                    <option v-for="data in paket.pakets" :key="data.tph_kode">{{ data.tph_kode }}-{{
                                        data.tph_nama }}</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Kode Client</label>
                                <input type="text" class="form-control" v-model="paket.trh_tu_kode"
                                    placeholder="Masukkan Kode Client">
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold mt-2 mb-1">Tanggal Perjalanan</label>
                                <VueDatePicker v-model="paket.trh_tgl_perjalanan" :enable-time-picker="false" class="mb-2">
                                </VueDatePicker>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Pax</label>
                                <input type="text" class="form-control" v-model="paket.trh_pax" placeholder="Masukkan Pax">
                            </div>
                            <!-- <a class="btn btn-sm btn-success" v-on:click="getBus()">Test</a> -->

                            <!-- <div class="form-group">
                                <label for="bus" class="font-weight-bold">Bus</label>
                                <br />
                                <select class="form-select" aria-label="Pilihan Bus" v-model="paket.trh_tb_kode">
                                    <option v-for="data in paket.buses" :key="data.tb_kode">{{ data.tb_kode }}-{{
                                        data.tb_nama }}</option>
                                </select>
                            </div> -->


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


import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import navbar from '@/components/NavBar.vue'
import { baseURL } from '@/config.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

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

    setup() {

        //state posts
        const paket = reactive({
            trh_tph_kode: '',
            trh_tu_kode: '',
            trh_tgl_perjalanan: '',
            trh_pax: '',
            // trh_tb_kode: '',
            pakets: [],
            buses: []
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            // console.log(paket.trh_tb_kode)

            let trh_tph_kode = paket.trh_tph_kode.split("-")[0]
            // let trh_tb_kode = paket.trh_tb_kode.split("-")[0]
            let trh_tu_kode = paket.trh_tu_kode
            // let trh_tgl_perjalanan = paket.trh_tgl_perjalanan
            let trh_tgl_perjalanan = paket.trh_tgl_perjalanan.toISOString().split('T')[0]
            let trh_pax = paket.trh_pax
            axios.get(baseURL + '/reservasi/add', {
                params: {

                    trh_tph_kode: trh_tph_kode,
                    trh_tu_kode: trh_tu_kode,
                    trh_tgl_jalan: trh_tgl_perjalanan,
                    trh_pax: trh_pax
                }

            }).then((resp) => {

                //redirect ke post index
                console.log(resp.data)
                router.push({
                    name: 'reservasi.edit', params: { id: resp.data.data.trh_kode }
                })

            }).catch(error => {
                //assign state validation with error 
                // validation.value = error.response.data
                console.log(error)
            })

        }

        function check() {
            let tph_tjt_kode = paket.tph_tjt_kode.split("-")[0]
            let tph_kota_asal = paket.tph_kota_asal
            let tph_kota_tujuan = paket.tph_kota_tujuan
            axios.get(baseURL+"/paket/search?tph_tjt_kode=" + tph_tjt_kode + "&tph_kota_asal=" + tph_kota_asal + "&tph_kota_tujuan=" + tph_kota_tujuan)
                .then((resp) => {
                    // console.log(resp.data)
                    paket.pakets = resp.data
                    // console.log(paket.pakets[0])
                }).catch(error => {
                    //assign state validation with error 
                    console.log(error)
                })
        }

        // function getBus() {
        //     paket.buses = []
        //     let tph_kode = paket.trh_tph_kode.split("-")[0]
        //     let tph_pax = paket.trh_pax
        //     axios.get(baseURL+"/bus/search?tb_pax=" + tph_pax + "&tph_kode=" + tph_kode)
        //         .then((resp) => {
        //             // console.log(resp.data)
        //             paket.buses = resp.data
        //             // console.log(paket.pakets[0])
        //         }).catch(error => {
        //             //assign state validation with error 
        //             console.log(error)
        //         })
        // }

        //return
        return {
            paket,
            validation,
            router,
            store,
            check
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
            // axios.get('http://127.0.0.1:8000/api/jenisPaket')
            //     .then(ress => {
            //         this.setJenis(ress.data)
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     }),
            axios.get(baseURL+'/paket/trip')
                .then(ress => {
                    this.setTrips(ress.data)
                })
                .catch(error => {
                    console.log(error)
                })
    },
    components: {
        navbar, VueDatePicker
    }

}
</script>

<style>
body {
    background: lightgray;
}
</style>
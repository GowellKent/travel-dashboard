<template>
    <navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h4>TAMBAH PAKET</h4>
                            </div>
                            <div class="col right-align">
                                <router-link :to="{ name: 'kota.index' }" class="btn btn-md btn-primary">BACK</router-link>
                            </div>
                        </div>
                        <hr>

                        <form @submit.prevent="store">

                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Jenis Paket</label>
                                <br />
                                <select class="form-select" aria-label="Jenis Paket" v-model="paket.tph_tjp_kode">
                                    <option v-for="data in jenis" :key="data.tjp_kode">{{ data.tjp_kode }}-{{
                                        data.tjp_deskripsi }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Jenis Trip</label>
                                <br />
                                <select class="form-select" aria-label="Jenis Trip" v-model="paket.tph_tjt_kode">
                                    <option v-for="data in trips" :key="data.tjt_kode">{{ data.tjt_kode }}-{{
                                        data.tjt_nama }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Nama Paket</label>
                                <input type="text" class="form-control" v-model="paket.tph_nama"
                                    placeholder="Masukkan Nama Paket">
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                    <label for="content" class="font-weight-bold mt-2 mb-1">Deskripsi</label>
                                    <textarea class="form-control" rows="4" v-model="paket.tph_deskripsi"
                                        placeholder="Masukkan Deskripsi Paket"></textarea>
                                    <!-- validation -->
                                    <div v-if="validation.content" class="mt-2 alert alert-danger">
                                        {{ validation.content[0] }}
                                    </div>
                                </div>
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Provinsi Asal</label>
                                <!-- <input class="form-control" v-model="kota.tot_provinsi" placeholder="Masukkan Provinsi"> -->
                                <br />
                                <select class="form-select" v-model="paket.tph_provinsi_asal"
                                    v-on:change="getKota(paket.tph_provinsi_asal)" aria-label="Provinsi Asal">
                                    <!-- <option class="dropdown-item">Provinsi</option> -->
                                    <option v-for="data in provs" :key="data.id">{{ data.id }}-{{ data.nama }}</option>
                                </select>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">Kota Asal</label>
                                <!-- <input type="text" class="form-control" v-model="kota.tph_nama" placeholder="Masukkan Kota"> -->
                                <br />
                                <select class="form-select" v-model="paket.tph_kota_asal" aria-label="Kota Asal">
                                    <option v-for="data in kotas" :key="data.id">{{ data.nama }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="provinsi2" class="font-weight-bold">Provinsi Tujuan</label>
                                <br />
                                <select class="form-select" v-model="paket.tph_provinsi_tujuan"
                                    v-on:change="getKota2(paket.tph_provinsi_tujuan)" aria-label="Provinsi Tujuan">
                                    <option v-for="data in provs2" :key="data.id">{{ data.id }}-{{ data.nama }}</option>
                                </select>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="nama2" class="font-weight-bold">Kota Tujuan</label>
                                <br />
                                <select class="form-select" v-model="paket.tph_kota_tujuan" aria-label="Kota Tujuan">
                                    <option v-for="data in kotas2" :key="data.id">{{ data.nama }}</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Harga</label>
                                <input type="text" class="form-control" v-model="paket.tph_harga"
                                    placeholder="Masukkan Harga">
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


import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import navbar from '@/components/NavBar.vue'

export default {

    data() {
        return {
            jenis: [],
            provs: [],
            provs2: [],
            kotas: [],
            kotas2: [],
            trips:[]
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
            tph_tjp_kode: '',
            tph_nama:'',
            tph_provinsi_asal: '',
            tph_kota_asal: '',
            tph_provinsi_tujuan: '',
            tph_kota_tujuan: '',
            tph_harga:'',
            tph_deskripsi:'',
            tph_tjt_kode:''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {


            let tph_tjp_kode = paket.tph_tjp_kode.split("-")[0]
            let tph_tjt_kode = paket.tph_tjt_kode.split("-")[0]
            let tph_nama = paket.tph_nama
            let tph_kota_asal = paket.tph_kota_asal
            let tph_kota_tujuan = paket.tph_kota_tujuan
            let tph_harga = paket.tph_harga
            let tph_deskripsi = paket.tph_deskripsi

            axios.post('http://localhost:8000/api/addPaket', {
                tph_tjp_kode: tph_tjp_kode,
                tph_tjt_kode: tph_tjt_kode,
                tph_nama: tph_nama,
                tph_kota_asal: tph_kota_asal,
                tph_kota_destinasi: tph_kota_tujuan,
                tph_harga: tph_harga,
                tph_deskripsi: tph_deskripsi

                
            }).then((resp) => {

                //redirect ke post index
                router.push({
                    name: 'paket.detail', params:{id:resp.data.data.tph_kode}
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            paket,
            validation,
            router,
            store
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
            axios.get('http://127.0.0.1:8000/api/jenisPaket')
                .then(ress => {
                    this.setJenis(ress.data)
                })
                .catch(error => {
                    console.log(error)
                }),
            axios.get('http://127.0.0.1:8000/api/jenisTrip')
                .then(ress => {
                    this.setTrips(ress.data)
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
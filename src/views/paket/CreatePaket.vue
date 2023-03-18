<template>
    <navbar />
    <div class="container mt-5">
        <h4>TAMBAH PAKET</h4>
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col float-start">
                                <router-link :to="{ name: 'paket.index' }" class="btn btn-md btn-primary"><vue-feather
                                        type="chevron-left" size="24" class="color-white pt-1" /></router-link>
                            </div>
                        </div>
                        <hr>

                        <form @submit.prevent="store">

                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">Jenis Trip</label>
                                <br />
                                <select class="form-select" aria-label="Jenis Trip" v-model="paket.tph_tjt_kode">
                                    <option v-for="data in trips" :key="data.tjt_kode">{{ data.tjt_kode }}-{{
                                        data.tjt_desc }}</option>
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
                                <label for="content" class="font-weight-bold mt-2 mb-1">Durasi Wisata (Hari)</label>
                                <input type="text" class="form-control" v-model="paket.tph_durasi"
                                    placeholder="Masukkan Durasi Wisata ">
                                <!-- validation -->
                                <div v-if="validation.content" class="mt-2 alert alert-danger">
                                    {{ validation.content[0] }}
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="provinsi" class="font-weight-bold">Provinsi Asal</label>
                                        <!-- <input class="form-control" v-model="kota.tot_provinsi" placeholder="Masukkan Provinsi"> -->
                                        <br />
                                        <select class="form-select" v-model="paket.tph_provinsi_asal"
                                            v-on:change="getKota(paket.tph_provinsi_asal)" aria-label="Provinsi Asal">
                                            <!-- <option class="dropdown-item">Provinsi</option> -->
                                            <option v-for="data in provs" :key="data.id">{{ data.id }}-{{ data.nama }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="nama" class="font-weight-bold">Kota Asal</label>
                                        <!-- <input type="text" class="form-control" v-model="kota.tph_nama" placeholder="Masukkan Kota"> -->
                                        <br />
                                        <select class="form-select" v-model="paket.tph_kota_asal" aria-label="Kota Asal">
                                            <option v-for="data in kotas" :key="data.id">{{ data.nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="provinsi2" class="font-weight-bold">Provinsi Tujuan</label>
                                        <select class="form-select" v-model="paket.tph_provinsi_tujuan"
                                            v-on:change="getKota2(paket.tph_provinsi_tujuan)" aria-label="Provinsi Tujuan">
                                            <option v-for="data in provs2" :key="data.id">{{ data.id }}-{{ data.nama }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="nama2" class="font-weight-bold">Kota Tujuan</label>
                                        <br />
                                        <select class="form-select" v-model="paket.tph_kota_tujuan"
                                            aria-label="Kota Tujuan">
                                            <option v-for="data in kotas2" :key="data.id">{{ data.nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Harga</label>
                                <input type="text" class="form-control" v-model="paket.tph_harga"
                                    placeholder="Masukkan Harga" disabled>
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Min. Pax</label>
                                <input type="text" class="form-control" v-model="paket.tph_min_pax"
                                    placeholder="Masukkan Pax Minimum">
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Max. Pax</label>
                                <input type="text" class="form-control" v-model="paket.tph_max_pax"
                                    placeholder="Masukkan Pax Maximum">
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <hr>
                            <div>
                            </div>
                            <div class="form-group">
                                <a class="btn btn-success float-start mb-2"  v-on:click="getBus(paket.tph_max_pax, paket.tph_kota_asal, paket.tph_kota_tujuan)">Cari Bus</a>
                                <select class="form-select" v-model="paket.tph_tb_kode" aria-label="Bus">
                                    <option v-for="data in buses" :key="data.tb_kode">{{ data.tb_kode }}-{{ data.tb_nama }}
                                    </option>
                                </select>
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


import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { baseURL } from '@/config.js'
import navbar from '@/components/NavBar.vue'

export default {

    data() {
        return {
            provs: [],
            provs2: [],
            kotas: [],
            kotas2: [],
            trips: [],
            buses: []
        }
    },
    methods: {
        setProvs(data) {
            this.provs = data;
        },
        setProvs2(data) {
            this.provs2 = data;
        },
        setBuses(data) {
            this.buses = data;
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
                    // console.log(ress.data)
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

        },
        getBus(pax, asal, tujuan) {
            // console.log(pax, asal, tujuan)
            axios.get(baseURL + '/bus/search', {
                params: {
                    tb_pax:pax,
                    tb_kota_asal:asal,
                    tb_kota_tujuan:tujuan
                }
            })
                .then(ress => {
                    this.setBuses(ress.data)
                })
        }
    },

    setup() {

        //state posts
        const paket = reactive({
            tph_tb_kode: '',
            tph_nama: '',
            tph_provinsi_asal: '',
            tph_kota_asal: '',
            tph_provinsi_tujuan: '',
            tph_kota_tujuan: '',
            tph_harga: '',
            tph_durasi: '',
            tph_tjt_kode: '',
            tph_min_pax: '',
            tph_max_pax: '',
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let tph_tjt_kode = paket.tph_tjt_kode.split("-")[0]
            let tph_nama = paket.tph_nama
            let tph_provinsi_asal = paket.tph_provinsi_asal.split("-")[1]
            let tph_kota_asal = paket.tph_kota_asal
            let tph_provinsi_tujuan = paket.tph_provinsi_tujuan.split("-")[1]
            let tph_kota_tujuan = paket.tph_kota_tujuan
            let tph_harga = 0
            let tph_durasi = paket.tph_durasi
            let tph_min_pax = paket.tph_min_pax
            let tph_max_pax = paket.tph_max_pax
            let tph_tb_kode = paket.tph_tb_kode.split("-")[0]

            axios.get(baseURL + '/paket/add', {
                params: {
                    tph_tjt_kode: tph_tjt_kode,
                    tph_nama: tph_nama,
                    tph_provinsi_asal: tph_provinsi_asal,
                    tph_kota_asal: tph_kota_asal,
                    tph_provinsi_tujuan: tph_provinsi_tujuan,
                    tph_kota_tujuan: tph_kota_tujuan,
                    tph_harga: tph_harga,
                    tph_durasi: tph_durasi,
                    tph_min_pax: tph_min_pax,
                    tph_max_pax: tph_max_pax,
                    tph_tb_kode: tph_tb_kode
                }
            }).then((resp) => {

                //redirect ke post index
                router.push({
                    name: 'paket.detail', params: { id: resp.data.data.tph_kode }
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
            axios.get(baseURL + '/paket/trip')
                .then(ress => {
                    this.setTrips(ress.data)
                }).catch(error => {
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
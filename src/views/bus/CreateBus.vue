<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-header">
                        <div class="row">
                            <div class="col">
                                <router-link :to="{ name: 'bus.index' }" class="btn btn-md btn-primary"><vue-feather
                                        type="chevron-left" size="24" class="color-white pt-1" /></router-link>
                            </div>
                            <div class="col-11 pt-2">
                                <h4><strong>TAMBAH DATA BUS</strong></h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Nama Bus</label>
                                <input type="text" class="form-control" v-model="bus.tb_nama"
                                    placeholder="Masukkan Nama Bus">
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col form-group">
                                        <label for="title" class="font-weight-bold mt-2 mb-1">Provinsi Asal</label>
                                        <select class="form-select" v-model="bus.tot_provinsi_asal"
                                            v-on:change="getKota(bus.tot_provinsi_asal)" aria-label="Provinsi">
                                            <option v-for="data in provs" :key="data.id">{{ data.id }}-{{ data.nama }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col form-group">
                                        <label for="title" class="font-weight-bold mt-2 mb-1">Kota Asal</label>
                                        <select class="form-select" v-model="bus.tb_kota_asal" aria-label="Kota/ Kabupaten">
                                            <option v-for="data in kotas" :key="data.id">{{ data.nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col form-group">
                                        <label for="title" class="font-weight-bold mt-2 mb-1">Provinsi Tujuan</label>
                                        <select class="form-select" v-model="bus.tot_provinsi"
                                            v-on:change="getKota2(bus.tot_provinsi)" aria-label="Provinsi Tujuan">
                                            <option v-for="data in provs2" :key="data.id">{{ data.id }}-{{ data.nama }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col form-group">
                                        <label for="title" class="font-weight-bold mt-2 mb-1">Kota Tujuan</label>
                                        <!-- <input type="text" class="form-control" v-model="bus.tot_kota"
                                        placeholder="Masukkan Kota"> -->
                                        <select class="form-select" v-model="bus.tb_kota_tujuan"
                                            aria-label="Kota/ Kabupaten">
                                            <option v-for="data in kotas2" :key="data.id">{{ data.nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Pax</label>
                                <input type="text" class="form-control" v-model="bus.tb_pax" placeholder="Masukkan Pax Bus">
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Harga</label>
                                <input type="text" class="form-control" v-model="bus.tb_harga" placeholder="Masukkan Harga Bus">
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

export default {

    data() {
        return {
            jenis: [],
            provs: [],
            provs2: [],
            kotas: [],
            kotas2: [],
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
            })
    },

    setup() {

        //state posts
        const bus = reactive({
            tb_nama: '',
            tb_kota_asal: '',
            tb_kota_tujuan: '',
            tb_pax: '',
            tb_harga: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let tb_nama = bus.tb_nama
            let tb_kota_asal = bus.tb_kota_asal
            let tb_kota_tujuan = bus.tb_kota_tujuan
            let tb_pax = bus.tb_pax
            let tb_harga = bus.tb_harga

            axios.get(baseURL + '/bus/add', {
                params: {
                    tb_nama: tb_nama,
                    tb_kota_asal: tb_kota_asal,
                    tb_kota_tujuan: tb_kota_tujuan,
                    tb_pax: tb_pax,
                    tb_harga: tb_harga
                }
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'bus.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            bus,
            validation,
            router,
            store
        }

    }

}
</script>

<style>
body {
    background: lightgray;
}</style>
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h4>CREATE BUS</h4>
                            </div>
                            <div class="col right-align">
                                <router-link :to="{ name: 'bus.index' }" class="btn btn-md btn-primary">BACK</router-link>
                            </div>
                        </div>
                        <hr>

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
                                            v-on:change="getKota(bus.tot_provinsi)" aria-label="Provinsi Tujuan">
                                            <option v-for="data in provs" :key="data.id">{{ data.id }}-{{ data.nama }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col form-group">
                                        <label for="title" class="font-weight-bold mt-2 mb-1">Kota Tujuan</label>
                                        <!-- <input type="text" class="form-control" v-model="bus.tot_kota"
                                        placeholder="Masukkan Kota"> -->
                                        <select class="form-select" v-model="bus.tb_kota_destinasi" aria-label="Kota/ Kabupaten">
                                            <option v-for="data in kotas" :key="data.id">{{ data.nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        <div class="form-group">
                            <label for="title" class="font-weight-bold mt-2 mb-1">Pax</label>
                            <input type="text" class="form-control" v-model="bus.tb_pax" placeholder="Masukkan Pax Bus">
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
import { baseURL } from '@/config.js'

export default {

    data() {
        return {
            jenis: [],
            provs: [],
            kotas: [],
        }
    },
    methods: {
        setProvs(data) {
            this.provs = data;
        },

        setKotas(data) {
            this.kotas = data;
        },
        setJenis(data) {
            this.jenis = data;
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

        }
    },
    mounted() {
        axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
            .then(ress => {
                this.setProvs(ress.data.provinsi)
            })
            .catch(error => {
                console.log(error)
            }),
            axios.get('http://127.0.0.1:8000/api/jenisObjek')
                .then(ress => {
                    this.setJenis(ress.data)
                    // console.log(this.jenis)
                })
                .catch(error => {
                    console.log(error)
                })
    },

    setup() {

        //state posts
        const bus = reactive({
            tb_nama:'',
            tb_kota_asal:'',
            tb_kota_destinasi:'',
            tb_pax:''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let tb_nama = bus.tb_nama
            let tb_kota_asal = bus.tb_kota_asal
            let tb_kota_destinasi = bus.tb_kota_destinasi
            let tb_pax = bus.tb_pax

            axios.get(baseURL + '/addBus', {
                params:{tb_nama: tb_nama,
                tb_kota_asal: tb_kota_asal,
                tb_kota_destinasi: tb_kota_destinasi,
                tb_pax: tb_pax}
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
}
</style>
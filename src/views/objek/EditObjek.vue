<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h4>EDIT OBJEK WISATA</h4>
                            </div>
                            <div class="col right-align">
                                <router-link :to="{ name: 'objek.index' }" class="btn btn-md btn-primary">BACK</router-link>
                            </div>
                        </div>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Nama Objek Wisata</label>
                                <input type="text" class="form-control" v-model="objek.tot_nama"
                                    placeholder="Masukkan Nama Objek Tujuan">
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Jenis Objek Wisata</label>
                                <!-- <input type="text" class="form-control" v-model="objek.tot_tjo_kode"
                                    placeholder="Masukkan Jenis Objek Tujuan"> -->
                                    <select class="form-select" v-model="objek.tot_tjo_kode">
                                        <option v-for="data in jenis" :key="data.tjo_kode">{{ data.tjo_kode }}-{{ data.tjo_deskripsi }}</option>
                                    </select>
                                </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Nama Pimpinan</label>
                                <input type="text" class="form-control" v-model="objek.tot_pimpinan"
                                    placeholder="Masukkan Nama Pimpinan">
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Telepon</label>
                                <input type="text" class="form-control" v-model="objek.tot_telp"
                                    placeholder="Masukkan Nomor Telepon">
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Alamat</label>
                                <input type="text" class="form-control" v-model="objek.tot_alamat"
                                    placeholder="Masukkan Alamat Objek Tujuan">
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Provinsi</label>
                                <!-- <input type="text" class="form-control" v-model="objek.tot_provinsi"
                                        placeholder="Masukkan Provinsi"> -->
                                <select class="form-select" v-model="objek.tot_provinsi"
                                    v-on:change="getKota(objek.tot_provinsi)" aria-label="Provinsi">
                                    <!-- <option class="dropdown-item">Provinsi</option> -->
                                    <option v-for="data in provs" :key="data.id">{{ data.id }}-{{ data.nama }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Kota</label>
                                <!-- <input type="text" class="form-control" v-model="objek.tot_kota"
                                        placeholder="Masukkan Kota"> -->
                                <select class="form-select" v-model="objek.tot_kota" aria-label="Kota/ Kabupaten">
                                    <option v-for="data in kotas" :key="data.id">{{ data.nama }}</option>
                                </select>
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
            axios.get(baseURL+'/jenisObjek')
                .then(ress => {
                    this.setJenis(ress.data)
                })
                .catch(error => {
                    console.log(error)
                })
    },

    setup() {

        //state posts
        const objek = reactive({
            tot_kode: '',
            tot_tjo_kode: '',
            tjo_deskripsi: '',
            tot_nama: '',
            tot_pimpinan: '',
            tot_telp: '',
            tot_alamat: '',
            tot_provinsi: '',
            tot_kota: ''
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
            axios.get(`http://localhost:8000/api/findObjek?tot_kode=${route.params.id}`)
                .then(response => {

                    //assign state posts with response data
                    objek.tot_kode = response.data[0].tot_kode
                    objek.tot_tjo_kode = response.data[0].tot_tjo_kode
                    objek.tjo_deskripsi = response.data[0].tjo_deskripsi
                    objek.tot_nama = response.data[0].tot_nama
                    objek.tot_pimpinan = response.data[0].tot_pimpinan
                    objek.tot_telp = response.data[0].tot_telp
                    objek.tot_alamat = response.data[0].tot_alamat
                    objek.tot_provinsi = response.data[0].tot_provinsi
                    objek.tot_kota = response.data[0].tot_kota

                }).catch(error => {
                    console.log(error.response.data)
                })

        })

        //method update
        function update() {

            let tot_nama= objek.tot_nama
            let tot_tjo_kode= objek.tot_tjo_kode.split("-")[0]
            let tot_pimpinan= objek.tot_pimpinan
            let tot_telp= objek.tot_telp
            let tot_alamat= objek.tot_alamat
            let tot_provinsi= objek.tot_provinsi.split("-")[1]
            let tot_kota= objek.tot_kota
            // let tot_deskripsi = objek.tot_deskripsi

            axios.put(`http://localhost:8000/api/updObjek`, {
                tot_kode: route.params.id,
                tot_nama: tot_nama,
                tot_tjo_kode: tot_tjo_kode,
                tot_pimpinan: tot_pimpinan,
                tot_telp: tot_telp,
                tot_alamat: tot_alamat,
                tot_provinsi: tot_provinsi,
                tot_kota: tot_kota,
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'objek.index'
                })

            }).catch(error => {
                //assign state validation with error 
                // validation.value = error.response.data
                console.log(error)
            })

        }

        //return
        return {
            objek,
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
}
</style>
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-header">
                        <div class="row">
                            <div class="col right-align">
                                <router-link :to="{ name: 'objek.index' }" class="btn btn-md btn-primary"><vue-feather
                                        type="chevron-left" size="24" class="color-white pt-1" /></router-link>
                            </div>
                            <div class="col-11 pt-2">
                                <h4><strong>CREATE OBJEK WISATA</strong></h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
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
                                        <option v-for="data in jenis" :key="data.tjo_kode">{{ data.tjo_kode }}-{{ data.tjo_desc }}</option>
                                    </select>
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
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Harga</label>
                                <input type="text" class="form-control" v-model="objek.tot_harga"
                                    placeholder="Masukkan Harga Objek Tujuan">
                            </div>
                            <br />
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
            axios.get(baseURL+'/objek/jenis')
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
        const objek = reactive({
            tot_kode: '',
            tot_tjo_kode: '',
            tjo_deskripsi: '',
            tot_nama: '',
            tot_pimpinan: '',
            tot_telp: '',
            tot_alamat: '',
            tot_provinsi: '',
            tot_harga: '',
            tot_foto: '',
            tot_kota: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let tot_nama= objek.tot_nama
            let tot_tjo_kode= objek.tot_tjo_kode.split("-")[0]
            let tot_telp= objek.tot_telp
            let tot_alamat= objek.tot_alamat
            let tot_harga= objek.tot_harga
            let tot_provinsi= objek.tot_provinsi.split("-")[1]
            let tot_kota= objek.tot_kota

            axios.get(baseURL+'/objek/add', {
                params :{tot_nama: tot_nama,
                tot_tjo_kode: tot_tjo_kode,
                tot_telp: tot_telp,
                tot_alamat: tot_alamat,
                tot_provinsi: tot_provinsi,
                tot_harga: tot_harga,
                tot_foto: 'https://docs.google.com/uc?id=1hTEApOQK5ZZnzQz1TLtswes3sRBKPbCm',
                tot_kota: tot_kota}
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'objek.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            objek,
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
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
                                <input type="text" class="form-control" v-model="objek.tot_tjo_kode"
                                    placeholder="Masukkan Jenis Objek Tujuan">
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
                                <input type="text" class="form-control" v-model="objek.tot_provinsi"
                                    placeholder="Masukkan Provinsi">
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Kota</label>
                                <input type="text" class="form-control" v-model="objek.tot_kota"
                                    placeholder="Masukkan Kota">
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

            let tph_tjp_kode = objek.jenis.split("-")[0]
            let tph_tjt_kode = objek.trip.split("-")[0]
            let tph_nama = objek.nama
            let tph_kota_asal = objek.kotaAs
            let tph_kota_tujuan = objek.kotaDes
            let tph_harga = objek.harga
            let tph_deskripsi = objek.deskripsi

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
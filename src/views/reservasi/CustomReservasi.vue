<template>
    <navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-header pt-3">
                        <div class="row mb-2">
                            <div class="col-1">
                                <router-link :to="{ name: 'reservasi.index' }" class="btn btn-md btn-primary"><vue-feather
                                        type="chevron-left" size="20" class="color-white pt-1 pl-5" /></router-link>
                            </div>
                            <div class="col float-start pt-2">
                                <h4><strong>TAMBAH RESERVASI CUSTOM</strong></h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
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
                                <label for="content" class="font-weight-bold mt-2">Tanggal Perjalanan</label>
                                <VueDatePicker v-model="paket.trh_tgl_perjalanan" :enable-time-picker="false" class="mb-1">
                                </VueDatePicker>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mb-1">Pax</label>
                                <input type="text" class="form-control" v-model="paket.trh_pax" placeholder="Masukkan Pax">
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mb-1">Durasi</label>
                                <input type="number" class="form-control" v-model="paket.trh_durasi"
                                    placeholder="Masukkan Durasi Wisata">
                            </div>

                            <div class="row mt-1">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="provinsi" class="font-weight-bold">Provinsi Asal</label>
                                        <!-- <input class="form-control" v-model="kota.tot_provinsi" placeholder="Masukkan Provinsi"> -->
                                        <select class="form-select" v-model="paket.trh_prov_asal"
                                            v-on:change="getKota(paket.trh_prov_asal)" aria-label="Provinsi Asal">
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
                                        <select class="form-select" v-model="paket.trh_kota_asal" aria-label="Kota Asal">
                                            <option v-for="data in kotas" :key="data.id">{{ data.nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="provinsi2" class="font-weight-bold">Provinsi Tujuan</label>
                                        <br />
                                        <select class="form-select" v-model="paket.trh_prov_tujuan"
                                            v-on:change="getKota2(paket.trh_prov_tujuan)" aria-label="Provinsi Tujuan">
                                            <option v-for="data in provs2" :key="data.id">{{ data.id }}-{{ data.nama }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="nama2" class="font-weight-bold">Kota Tujuan</label>
                                        <br />
                                        <select class="form-select" v-model="paket.trh_kota_tujuan"
                                            aria-label="Kota Tujuan">
                                            <option v-for="data in kotas2" :key="data.id">{{ data.nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <a class="btn btn-success float-start mb-2"
                                v-on:click="getBus(paket.trh_pax, paket.trh_kota_asal, paket.trh_kota_tujuan)">Cari
                                Bus</a>
                            <br><br>
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold mb-2">Pilihan Bus :</label>
                                <br />
                                <div class="form-check-inline" v-for="data in buses" :key="data.tb_kode">
                                    <div class="card card-default card-input mb-2" style="width: 100%; min-width: 10rem;">
                                        <label class="p-1">
                                            <div class="card-header"><input type="radio" class="mx-2"
                                                    v-model="paket.trh_tb_kode" :value="data.tb_kode">{{ data.tb_nama }}
                                            </div>
                                            <div class="card-body font-weight-bold">
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="card border-0 rounded shadow">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-11">
                                            <h4><strong>List Objek Wisata</strong></h4>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                @click.prevent="getObjeks(paket.trh_prov_tujuan, paket.trh_kota_tujuan)">
                                                <vue-feather type="plus" size="24" class="color-white pt-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <hr />
                                    <table class="table table-striped table-bordered mt-4">
                                        <thead class="thead-dark">
                                            <tr>
                                                <!-- <th scope="col">JENIS</th> -->
                                                <th scope="col">NAMA</th>
                                                <th scope="col">JENIS</th>
                                                <th scope="col">ALAMAT</th>
                                                <th scope="col">KOTA</th>
                                                <th scope="col">PROVINSI</th>
                                                <th scope="col">HARGA</th>
                                                <th scope="col">OPTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="data in detail.details" :key="data.tot_kode">
                                                <!-- <td>{{ data.tph_tjp_kode }}</td> -->
                                                <td>{{ data.tot_nama }}</td>
                                                <td>{{ data.tjo_desc }}</td>
                                                <td style="width: 45%;">{{ data.tot_alamat }}</td>
                                                <td>{{ data.tot_kota }}</td>
                                                <td>{{ data.tot_provinsi }}</td>
                                                <td>{{ data.tot_harga }}</td>
                                                <td>
                                                    <button @click.prevent="postDelete(data.tot_kode)"
                                                        class="btn btn-sm btn-danger ml-1">DELETE</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Detail Paket</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="storeDetail">

                        <div class="form-group">
                            <label for="objek" class="font-weight-bold">Objek Wisata</label>
                            <br />
                            <select class="form-select" v-model="detail.tot_kode_temp" aria-label="Kota Tujuan">
                                <option v-for="data in objs" :key="data.tot_kode">{{ data.tot_kode }}-{{ data.tot_nama }}
                                </option>
                            </select>
                        </div>

                        <br /><br />
                        <button type="submit" class="btn btn-primary float-end" data-bs-dismiss="modal">SIMPAN</button>

                    </form>
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
            buses: [],
            provs: [],
            provs2: [],
            kotas: [],
            kotas2: [],
            objs: []
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
        setBuses(data) {
            this.buses = data;
        },
        setObjs(data) {
            this.objs = data;
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

        },
        getBus(pax, asal, tujuan) {
            // console.log(pax, asal, tujuan)
            axios.get(baseURL + '/bus/search', {
                params: {
                    tb_pax: pax,
                    tb_kota_asal: asal,
                    tb_kota_tujuan: tujuan
                }
            })
                .then(ress => {
                    this.setBuses(ress.data)
                })
        }
        ,
        getObjeks(prov, kota) {
            axios.get(baseURL + '/objek/search', {
                params: {
                    tot_provinsi: prov,
                    tot_kota: kota
                }
            }).then(resp => {
                this.setObjs(resp.data)
            }).catch(error => {
                console.log(error)
            })
        }
    },

    setup() {

        //state details
        const paket = reactive({
            trh_tu_kode: '',
            trh_tgl_perjalanan: '',
            trh_pax: '',
            trh_durasi: '',
            trh_tb_kode: '',
            trh_prov_asal: '',
            trh_kota_asal: '',
            trh_prov_tujuan: '',
            trh_kota_tujuan: ''
        })

        const detail = reactive({
            tot_kode_temp: '',
            trd_tot_kode: [],
            details: []
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let trh_tb_kode = paket.trh_tb_kode
            let trh_tu_kode = paket.trh_tu_kode
            let trh_tgl_perjalanan = paket.trh_tgl_perjalanan.toISOString().split('T')[0]
            let trh_pax = paket.trh_pax
            let trh_durasi = paket.trh_durasi
            let trh_prov_asal = paket.trh_prov_asal
            let trh_kota_asal = paket.trh_kota_asal
            let trh_prov_tujuan = paket.trh_prov_tujuan
            let trh_kota_tujuan = paket.trh_kota_tujuan
            let trd_tot_kode = detail.trd_tot_kode

            axios.get(baseURL + '/reservasi/custom', {
                params: {
                    trh_tb_kode: trh_tb_kode,
                    trh_tu_kode: trh_tu_kode,
                    trh_tgl_jalan: trh_tgl_perjalanan,
                    trh_pax: trh_pax,
                    trh_durasi: trh_durasi,
                    trh_provinsi_asal: trh_prov_asal,
                    trh_kota_asal: trh_kota_asal,
                    trh_provinsi_tujuan: trh_prov_tujuan,
                    trh_kota_tujuan: trh_kota_tujuan,
                    trd_tot_kode : trd_tot_kode
                }

            }).then(

                //redirect ke post index
                // console.log(resp.data)
                router.push({
                    name: 'reservasi.index'
                })

            ).catch(error => {
                //assign state validation with error 
                // validation.value = error.response.data
                console.log(error)
            })

        }

        function storeDetail() {
            let tot_kode = detail.tot_kode_temp

            axios.get(baseURL + '/objek/find', {
                params: {
                    tot_kode: tot_kode
                }
            }).then((res) => {
                // console.log(res.data)
                detail.details.push(res.data[0])
                detail.trd_tot_kode.push(res.data[0].tot_kode)
                // console.log(detail.trd_tot_kode)

            })

        }

        function postDelete(tot_kode) {
            const index = detail.trd_tot_kode.indexOf(tot_kode)

            if (index > -1) {
                detail.trd_tot_kode.splice(index, 1);
                detail.details.splice(index, 1);
            }

            // console.log(detail.trd_tot_kode)
        }

        return {
            paket,
            detail,
            validation,
            router,
            store,
            storeDetail,
            postDelete
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
    components: {
        navbar, VueDatePicker
    }

}
</script>

<style>
body {
    background: lightgray;
}

.card-input:hover {
    cursor: pointer;
}

card-input:checked+.card-input {
    box-shadow: 1 1 1px 1px #2ecc71;
}
</style>
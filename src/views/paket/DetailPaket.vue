<template>
    <div class="container mt-5">
        <h4>Detail Paket</h4>
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col float-start">
                                <router-link :to="{ name: 'paket.index', params: { id: post.kode } }"
                                    class="btn btn-sm btn-success mr-1"><vue-feather type="chevron-left" size="24"
                                        class="color-white pt-1" /></router-link>
                            </div>
                        </div>
                        <hr>
                        <!-- <div class="row">
                                            <div class="col"> -->
                        <form>
                            <fieldset disabled>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Jenis Trip</label>
                                    <input type="text" class="form-control" v-model="post.trip"
                                        placeholder="Masukkan Judul Post">
                                </div>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Nama Paket</label>
                                    <input type="text" class="form-control" v-model="post.nama"
                                        placeholder="Masukkan Judul Post">
                                </div>
                                <div class="form-group">
                                    <label for="content" class="font-weight-bold mt-2 mb-1">Durasi Wisata</label>
                                    <input class="form-control" v-model="post.durasi" placeholder="Masukkan Konten Post">
                                </div>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Harga Paket</label>
                                    <input type="text" class="form-control" v-model="post.harga"
                                        placeholder="Masukkan Judul Post">
                                </div>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Min. Pax</label>
                                    <input type="text" class="form-control" v-model="post.minPax"
                                        placeholder="Masukkan Judul Post">
                                </div>
                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Max. Pax</label>
                                    <input type="text" class="form-control" v-model="post.maxPax"
                                        placeholder="Masukkan Judul Post">
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="title" class="font-weight-bold mt-2 mb-1">Provinsi Tujuan</label>
                                            <input type="text" class="form-control" v-model="post.provTujuan"
                                                placeholder="Masukkan Judul Post">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="title" class="font-weight-bold mt-2 mb-1">Kota Tujuan</label>
                                            <input type="text" class="form-control" v-model="post.kotaTujuan"
                                                placeholder="Masukkan Judul Post">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="title" class="font-weight-bold mt-2 mb-1">Provinsi Asal</label>
                                            <input type="text" class="form-control disabled" v-model="post.provAs"
                                                placeholder="Masukkan Judul Post">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="title" class="font-weight-bold mt-2 mb-1">Kota Asal</label>
                                            <input type="text" class="form-control disabled" v-model="post.kotaAs"
                                                placeholder="Masukkan Judul Post">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Bus</label>
                                    <input type="text" class="form-control disabled" v-model="post.bus"
                                        placeholder="Masukkan Judul Post">
                                </div>
                                <br /><br />
                                <!-- <button type="submit" class="btn btn-primary">SIMPAN</button> -->

                            </fieldset>
                        </form>

                        <div class="card border-0 rounded shadow">

                            <div class="card-body">
                                <div class="row">
                                    <div class="col-11">
                                        <h2>LIST OBJEK WISATA</h2>
                                    </div>
                                    <div class="col">
                                        <!-- <router-link :to="{ name: 'detail.create', params: { id: post.kode } }"
                                            class="btn btn-sm btn-primary mr-1"><vue-feather type="plus" size="24"
                                                class="color-white pt-1" />
                                        </router-link> -->
                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            @click.prevent="getObjeks(post.provTujuan, post.kotaTujuan)">
                                            <vue-feather type="plus" size="24" class="color-white pt-1" />
                                        </button>

                                    </div>
                                </div>
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
                                        <tr v-for="data in post.details" :key="data.tpd_kode">
                                            <!-- <td>{{ data.tph_tjp_kode }}</td> -->
                                            <td>{{ data.tot_nama }}</td>
                                            <td>{{ data.tjo_desc }}</td>
                                            <td style="width: 45%;">{{ data.tot_alamat }}</td>
                                            <td>{{ data.tot_kota }}</td>
                                            <td>{{ data.tot_provinsi }}</td>
                                            <td>{{ data.tot_harga }}</td>
                                            <td>
                                                <button @click.prevent="postDelete(data.tpd_kode)"
                                                    class="btn btn-sm btn-danger ml-1">DELETE</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

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
                            <select class="form-select" v-model="detail.tpd_tot_kode" aria-label="Kota Tujuan">
                                <option v-for="data in objs" :key="data.tot_kode">{{ data.tot_kode }}-{{ data.tot_nama }}
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
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { baseURL } from '@/config.js'

export default {
    data() {
        return {
            objs: [],
            pakets: [],
            tph_kode: ''
        }
    },

    methods: {
        setObjs(data) {
            this.objs = data;
        },
        postDelete(id) {

            //delete data post by ID
            axios.get(baseURL + '/paket/det/delete?tpd_kode=' + id)
                .then(() => {

                    //splice posts 
                    // kotas.value.splice(kotas.value.indexOf(id), 1);
                    location.reload()
                    // this.$router.push({name:'paket.detail', params:{id:this.$route.params.id}});

                }).catch(error => {
                    console.log(error.response.data)
                })

        },
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

        const detail = reactive({
            tpd_tot_kode: '',
            tpd_tph_kode: ''
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

            getDetail()

        })

        function getDetail() {
            post.details = []
            axios.get(baseURL + `/paket/det/get?&tpd_tph_kode=${route.params.id}`)
                .then(response => {

                    //assign state posts with response data
                    post.details = response.data

                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        function storeDetail() {

            let tpd_tph_kode = post.kode
            let tpd_tot_kode = detail.tpd_tot_kode.split("-")[0]

            axios.get(baseURL + '/paket/det/add', {
                params: {
                    tpd_tph_kode: tpd_tph_kode,
                    tpd_tot_kode: tpd_tot_kode
                }
            }).then(() => {

                //redirect ke post index
                // router.push({
                //     name: 'paket.detail', params: { id: route.params.id }
                // })

                getDetail()

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            post,
            validation,
            router,
            detail,
            storeDetail,
            getDetail
        }

    }

}
</script>

<style>
body {
    background: lightgray;
}
</style>
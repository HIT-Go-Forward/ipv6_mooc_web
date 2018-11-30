<template>
    <div>
        <div id="dplayer"></div>
    </div>
</template>

<script>
    import 'dplayer/dist/DPlayer.min.css';
    import DPlayer from 'dplayer';

    export default {
        components:{
            'd-player': DPlayer,
        },
        name: "dplayer",
        data(){
            return{
                options: Object,
            }
        },
        mounted(){
            this.initPlayer();
        },
        methods:{
            initPlayer(){
                this.options = new DPlayer({
                    container: document.getElementById('dplayer'),
                    video:{
                        url: 'http://172.17.21.94:8080/media/test.44badb44.mp4',
                    },
                    screenshot: false,
                    autoplay: false,
                    // contextmenu: [
                    //
                    // ],
                    danmaku: {
                        id: this.$route.params.lessonId,
                        api: 'http://39.106.156.178:1207/',
                        maximum: 1000,
                        user: this.$store.getters.getStorge.user.id,
                        bottom: '15%',
                        unlimited: true
                    },
                });
            },
            play(){
                console.log('play callback')
            },
        }
    }
</script>

<style scoped>

</style>
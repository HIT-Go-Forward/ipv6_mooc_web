<template>
    <div>
        <div class="d-player" id="dplayer"></div>
    </div>
</template>

<script>
    import 'dplayer/dist/DPlayer.min.css';
    import DPlayer from 'dplayer';

    export default {
        name: "dplayer",
        data(){
            return{
                options: Object,
            }
        },
        props:{
            url: ""
        },
        mounted(){
            this.initPlayer();
        },
        methods:{
            initPlayer(){
                this.options = new DPlayer({
                    container: document.getElementById('dplayer'),
                    video:{
                        // url: "/media" + this.url,
                        url: "/media/resource/45/37/36/[道兰MT][NHK纪录片][永不止步的人 宫崎骏][中日双语].mp4"
                    },
                    screenshot: false,
                    autoplay: false,
                    danmaku: {
                        id: this.$route.params.lessonId,
                        api: '/barrage/',
                        maximum: 1000,
                        user: this.$store.getters.getStorge.user.id,
                        bottom: '15%',
                        unlimited: true
                    },
                    contextmenu:[
                        {
                            text:"hello",
                            link:"www.baidu.com"
                        }
                    ],
                });
            },
        }
    }
</script>

<style scoped>

</style>
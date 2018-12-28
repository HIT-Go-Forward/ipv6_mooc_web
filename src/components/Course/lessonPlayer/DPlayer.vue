<template>
    <div>
        <div id="dplayer"></div>
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
                        url: "/media" + this.url,
                    },
                    screenshot: false,
                    autoplay: false,
                    danmaku: {
                        id: this.$route.params.lessonId,
                        // api: 'http://39.106.156.178:1207/',
                        api: '/barrage/',
                        maximum: 1000,
                        user: this.$store.getters.getStorge.user.id,
                        bottom: '15%',
                        unlimited: true
                    },
                });
            },
        }
    }
</script>

<style scoped>

</style>
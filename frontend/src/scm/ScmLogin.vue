<template>
    <section id="loginBack">
        <div id="loginBody" class="common-inner">
            <p data-login-subt>GEUMGANG SM</p>
            <h1>Login <span>to</span> <label class="display-block">SCM<span>.</span></label> </h1>
            <div data-login-input-box>
                <font-awesome-icon icon="fa-solid fa-user" />
                <input type="text" id="loginId" placeholder="ID">
            </div>
            <div data-login-input-box>
                <font-awesome-icon icon="fa-solid fa-lock" />
                <input type="text" id="loginPw" placeholder="Password">
            </div>
            <router-link :to="{name: 'Scm', params: {category: 'fwd'}}" data-login-button-container>
                <button class="bg-bid-blue" data-login-button type="button">LOGIN</button>
            </router-link>
        </div>
    </section>
</template>

<script setup>
    import SubpHero from '@/components/SubpHero.vue';

    //store에서 영역별 데이터 import
    import { useDataStore } from '@/store/dataStore'
    import { storeToRefs } from 'pinia';
    import { useRoute } from 'vue-router'

    const dataStore = useDataStore()
    const { dataGroup } = storeToRefs(dataStore)
    
</script>

<style lang="scss" scoped>


    #loginBack {
        position: fixed;
        width: 100vw;
        height: 100vh;
        
        &:before {
            content: '';
            z-index: -1;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-image: url('/img/login_back.jpg');
            background-size: cover;
            filter: grayscale(1);
            opacity: .5;
        }
    }

    #loginBody {
        position: absolute;
        top: calc(50% + 2rem);
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: rgba(var(--white), 1);
        width: 100%;
        max-width: 400px;
        padding: 1rem;
        
        h1 {
            margin-bottom: 3rem;
            font-size: 4rem;
            font-weight: 900;
            line-height: 1.35;
            // filter: drop-shadow(0 0 4px rgba(var(--black) .35));
            user-select: none;

            label {
                font-size: 4rem;
            }

            span {
                color: rgba(var(--deepblue), 1);
            }
        }

        input {
            width: 100%;
            border-radius: 1rem;
            background-color: rgba(var(--white), .7);
            padding: 1rem 1rem 1rem 3.5rem;
            color: rgba(var(--black) 1);
            filter: drop-shadow(0 0 8px rgba(var(--main-clr), 0.5));
            cursor: pointer;

            &:focus {
                outline: 4px solid rgba(var(--deepblue), 1);
            }
        }
    }

    [data-login-input-box] {
        position: relative;

        svg {
            position: absolute;
            top: 50%;
            left: 1rem;
            transform: translateY(-50%);
            z-index: 2;
            color: rgba(var(--black) .25);
            font-size: 1.25rem;
        }
    }

    [data-login-button-container] {
        display: contents;
    }

    [data-login-button] {
        margin-top: 6rem;
        padding: 1.25rem 1rem;
        // background-color: rgba(var(--deepblue), 1);
        border-radius: 3rem;
        font-size: 1.25rem;
        transition: all .35s;
        // filter: drop-shadow(0 0 4px rgba(var(--main-clr) 0.5));
        font-weight: 900;
        letter-spacing: 2px;

        &:hover {
            // color: rgb(var(--main-clr));
            background-color: rgb(var(--sub-clr));
            
        }
    }

    [data-login-subt] {
        font-size: 1rem;
        // filter: drop-shadow(0 0 8px rgba(var(--black) .5));
        user-select: none;
    }

    .display-block {
        display: block;
    }
</style>
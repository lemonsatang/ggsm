<template>
    <section id="loginBack">
        <div id="loginBody" class="common-inner">
            <p data-login-subt @click="router.push('/')">GEUMGANG SM</p>
            <h1>Login <span>to</span> <label class="display-block">SCM<span>.</span></label> </h1>
            <div data-login-input-box>
                <font-awesome-icon icon="fa-solid fa-user" />
                <input @keyup.enter="postUserData()" type="text" id="loginId" placeholder="거래처코드" v-model="userData.userID">
            </div>
            <div data-login-input-box>
                <font-awesome-icon icon="fa-solid fa-lock" />
                <input @keyup.enter="postUserData()" type="password" ref="inputPW" id="loginPw" placeholder="Password" v-model="userData.userPW">
                <!-- 비밀번호 보기 버튼 -->
                <button class="login-pw-show-hide" data-pw-show-button v-show="pwHide == false" @click="pwHide = true" type="button">
                    <font-awesome-icon icon="fa-eye" />
                </button>
                <!-- 비밀번호 숨기기 버튼 -->
                <button class="login-pw-show-hide" data-pw-hide-button v-show="pwHide == true" @click="pwHide = false" type="button">
                    <font-awesome-icon icon="fa-eye-slash" />
                </button>
            </div>
            <p class="login-msg-alert">
                <span v-if="loginMsgAlert">아이디 또는 비밀번호가 일치하지 않습니다. 입력하신 사항을 다시 확인해 주세요.</span>
            </p>
            <button class="bg-bid-blue" data-login-button type="button" @click="postUserData()">LOGIN</button>
        </div>
    </section>
</template>

<script setup>
    import SubpHero from '@/components/SubpHero.vue';

    //store에서 영역별 데이터 import
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import { toast } from 'vue3-toastify';

    const router = useRouter() // 라우터
    const userData = ref({}) // 사용자 정보
    const { userID, userPW } = userData.value
    const loginMsg = ref('')
    const pwHide = ref(true)
    const inputPW = ref()
    const loginMsgAlert = ref(false)

    async function postUserData() {
        if (!!userData.value.userID === false) {
            return toast.error('ID는 필수 입력 사항입니다.', { position: 'top-center' })
        } else if (!!userData.value.userPW === false) {
            return toast.error('비밀번호는 필수 입력 사항입니다.', { position: 'top-center' })
        }

        try {
            loginMsg.value = ''

            const response = await axios.post('/api/user/check',
                {
                    cvcod: userData.value.userID,
                    passwd: userData.value.userPW
                }
            )

            if (response.status === 200) {
                if (response.data.result == "Success") {

                    if(sessionStorage.getItem("whatsNext") == 'nonScm') {
                        console.log('일반 Web 로그인')

                        sessionStorage.setItem("whatsNext", "")
                        
                        router.go(-1)

                        localStorage.setItem('CVCOD', response.data.info.cvcod)
                        localStorage.setItem('CVNAM', response.data.info.cvnam)
                        localStorage.setItem('SANO', response.data.info.sano)
                        localStorage.setItem('OWNAM', response.data.info.ownam)
                        localStorage.setItem('UPTAE', response.data.info.uptae)
                        localStorage.setItem('JONGK', response.data.info.jongk)
                        localStorage.setItem('ZIPCD', response.data.info.zipcd)
                        localStorage.setItem('ADDR1', response.data.info.addr1)
                        localStorage.setItem('ADDR2', response.data.info.addr2)

                    } else {
                        router.push('/scm/fwd')

                        console.log(response.data.info)
                        localStorage.setItem('CVCOD', response.data.info.cvcod)
                        localStorage.setItem('CVNAM', response.data.info.cvnam)
                        localStorage.setItem('SANO', response.data.info.sano)
                        localStorage.setItem('OWNAM', response.data.info.ownam)
                        localStorage.setItem('UPTAE', response.data.info.uptae)
                        localStorage.setItem('JONGK', response.data.info.jongk)
                        localStorage.setItem('ZIPCD', response.data.info.zipcd)
                        localStorage.setItem('ADDR1', response.data.info.addr1)
                        localStorage.setItem('ADDR2', response.data.info.addr2)

                        toast.success('로그인에 성공했습니다.')
                    }                  
                    
                } else {
                    loginMsgAlert.value = true
                    setTimeout(() => {
                        loginMsgAlert.value = false
                    }, 4000)
                    

                    return toast.error('로그인에 실패하였습니다.', { position: 'top-center' })
                }
            }
        } catch (error) {
            console.warn('Error : ' + error)
        }
    }

    watch(pwHide, (newValue, oldValue) => {
        console.log(newValue)

        if( pwHide.value == true ) {
            inputPW.value.type = 'password'
            // console.log(recentPW.value[0].type)
            // console.log(recentPW)
        } else {
            inputPW.value.type = 'text'
        }
    })

    console.log(localStorage.getItem('CVNAM'))
    
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

        > svg {
            position: absolute;
            top: 50%;
            left: 1rem;
            transform: translateY(-50%);
            z-index: 2;
            color: rgba(var(--black) .25);
            font-size: 1.25rem;
        }

        button.login-pw-show-hide {
            position: absolute;
            top: 52%;
            right: 1rem;
            transform: translateY(-50%);
            z-index: 2;

            &:hover svg {
                color: rgba(var(--black) .5);
            }

            svg {
                color: rgba(var(--black) .25);
                font-size: 1.25rem
            }
            
        }
    }

    [data-login-button-container] {
        display: contents;
    }

    [data-login-button] {
        margin-top: 3rem;
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

    .login-msg-alert {
        height: 3rem;

        span {
            color: rgba(var(--alertred), 1);
            font-weight: 700;
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
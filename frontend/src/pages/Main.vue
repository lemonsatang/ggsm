<template>
    <section id="mainSection">
        <div data-main-catch-phrase class="common-inner">
            <div>
                <p>Lorem ipsum, <span class="m-block">dolor sit amet consectetur adipisicing elit.</span></p>    
            </div>
            <div data-main-catch-bottom>    
                <h1> Ipsam atque delectus sint. Corrupti unde, aspernatur ducimus quod</h1>
                <div></div>
            </div>
            
        </div>
        <p></p>
    </section>
</template>

<script setup>


    
    
</script>

<style lang="scss" scoped>
    #mainSection {
        @apply fixed;

        top:0;
        left:0;
        width: 100vw;
        height: 100vh;
        background-image: url('/img/login_back.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        z-index: -1;
    }

    [data-main-catch-phrase] {
        @apply flex flex-col w-full absolute;

        top: 50%;
        left: 50%;
        gap: 1rem;

        p {
            font-size: 1.25rem;
            font-weight: 100;
            filter: drop-shadow(0 0 4px rgba(var(--black) 1));
        }

        h1 {
            font-size: 2.5rem;
            filter: drop-shadow(0 0 4px rgba(var(--black) 1));
        }

        > div {
            color: rgb(var(--white));
            transform: translate(-50%, -50%);

        }

        [data-main-catch-bottom] {
            @apply grid;

            grid-template-columns: max-content 1fr;
            align-items: center;
            gap: 1rem;

            div {
                height: 2px;
                background: rgb(var(--white));
                
            }


        }
    }



    //mediaquery
    @media (max-width: 767px) {

        .m-block {
            display: block;
        }

        [data-main-catch-phrase] {

            h1 {
                font-size: var(--font32);
            }

            > div {
                transform: translate(-50%, 0);
            }

            [data-main-catch-bottom] {
                grid-template-columns: 1fr;

                div {
                    height: 0;
                }
            }
        }

    }








    
</style>
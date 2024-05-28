<template>
    <li class="col-md-2 col-12">
        <a :href="'https://24h.pchome.com.tw/prod/' + item.id" target="_blank">
            <div class="pic">
                <img :src="item.image + '?width=320'" :alt="item.name" class="d-block">
            </div>
            <main>
                <div class="slogag d-flex justify-content-md-center align-items-center">
                    <div class="slogag__label best" v-if="item.price.discount == '' ">
                        <i class="srrow"></i>
                        精選
                    </div>
                    <div class="slogag__label" v-else>
                        <i class="srrow"></i>
                        {{ item.price.discount }}折
                    </div>
                    <div class="slogag__text">{{ item.slogan }}</div>
                </div>
                <div class="name">{{ item.name }}</div>
                <div class="price d-flex justify-content-between align-items-baseline">
                    <div class="price__origin">${{ item.price.origin.toLocaleString() }}</div>
                    <div class="price__onsale">
                        <small>$</small>
                        <strong>{{ item.price.onsale.toLocaleString() }}</strong>
                        <small class="unit" v-if="item.price.unit">/{{ item.price.unit }}</small>
                    </div>
                </div>
                <div class="goToBuy">
                    <img src="@/assets/new/onsale_btn.png" alt="馬上搶" class="d-block">
                </div>
            </main>
        </a>
    </li>
</template>
    
<script>
export default {
    props: {
        item: Object
    }
}
</script>

<style lang="scss" scoped>

.onsale__box {
    @media only screen and (max-width: 991px) {
        padding: 0 1rem;
    }
    li {
        padding: 0 10px;
        margin-bottom: 1rem;
        width: 20%;
        @media only screen and (max-width: 1024px) {
            padding: 0 6px;
        }
        @media only screen and (max-width: 767px) {
            width: 100%;
        }
    }
    a {
        position: relative;
        display: block;
        height: 100%;
        text-align: center;
        color: #3c3c3c;
        background-color: #fff;
        border-radius: 8px;
        transition: .3s all;
        @media only screen and (max-width: 767px) {
            display: flex;
            text-align: left;
        }
        /* &:hover {
            filter: brightness(1.2);
            transform: scale(1.04);
            @media only screen and (max-width: 991px) {
                filter: none;
                transform: none;
            }
        } */
    }
    .pic {
        padding: 8px;
        overflow: hidden;
        @media only screen and (max-width: 767px) {
            min-width: 120px;
            width: 50%;
        }
        img {
            border-radius: 6px;
        }
    }
    main {
        @media only screen and (max-width: 767px) {
            width: 100%;
            padding: 8px 0 8px;
            position: relative;
        }
    }
    .slogag {
        width: 100%;
        background-color: #E7C77D;
        padding: 2px 0;
        @media only screen and (max-width: 767px) {
            padding-left: 5px;
        }
        .slogag__label {
            height: 20px;
            width: 45px;
            font-size: 12px;
            font-weight: 500;
            color: #fff;
            background-color: #FD7777;
            border-radius: 12px;
            padding: 0 3px 0 8px;
            position: relative;
            overflow: hidden;
            text-align: center;
            &.best {
                background-color: #2e769e;
            }
        }
        i {
            border-color: currentcolor;
            border-color: hsla(0,0%,100%,.9) hsla(0,0%,100%,.1) transparent transparent;
            border-style: solid;
            border-width: 7px;
            left: -7px;
            position: absolute;
            top: 4px;
            transform: rotate(135deg);
            z-index: 1;
            &::before {
                content: "";
                height: 12px;
                position: absolute;
                right: 0;
                top: 0;
                transform: rotate(-45deg) translate(2px,1px);
                width: 16px;
                z-index: 1;
                background: linear-gradient(90deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,.9));
            }
        }
        .slogag__text {
            margin-left: 3px;
            font-size: 0.94rem;
            font-weight: 600;
            color:#fff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            @media only screen and (max-width: 991px) {
                font-size: 14px;
            }
        }
    }
    .name {
        height: 2.9rem;
        color: #000;
        font-size: 1.125rem;
        line-height: 1.25;
        font-weight: 500;
        padding: 0 5px;
        margin: 3px 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .price {
        width: 90%;
        margin: auto;
        line-height: 1.2;

        @media only screen and (max-width: 991px) {
            flex-wrap: wrap;
            line-height: 1.3;
        }
        * {
            font-family: Montserrat, "Noto Sans TC";
        }
        .price__origin {
            font-size: 13px;
            text-decoration: line-through;
            @media only screen and (max-width: 991px) {
                width: 100%;
                order: 2;
            } 
        }
        .price__onsale {
            color: #F9014B;
            font-weight: bold;
            @media only screen and (max-width: 991px) {
                width: 100%;
                order: 1;
            } 
            small {
                font-size: 0.875rem;
                @media only screen and (max-width: 991px) {
                    font-size: 12px;
                }
            }
            strong {
                font-size: 1.5rem;
                @media only screen and (max-width: 991px) {
                    font-size: 3vw;
                }
                @media only screen and (max-width: 767px) {
                    font-size: 5vw;
                }
            }
        }
    }
    .goToBuy {
        width: 6rem;
        margin: 4px auto;
        @media only screen and (max-width: 767px) {
            margin: 0;
            position: absolute;
            right: 2vw;
            bottom: 2vw;
        }
    }
}
</style>
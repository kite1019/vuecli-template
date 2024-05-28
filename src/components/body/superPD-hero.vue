<template>
    <!-- 第一大格 -->
    <li class="col-lg-6 col-12 sizeXL" v-if="index === 0">
        <a :href="getLinkUrl(item)" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
            <img :src="item.Img.Src" class="heroImg absolute" :alt="item.Link.Text">
            <img src="@/assets/new/hero-new.png" class="d-block" alt="bg">
        </a>
        <img src="@/assets/new/superPD_bg_xl2.png" alt="bg" class="bg absolute d-block">
    </li>
    <!-- 其他小格 -->
    <li class="col-lg-3 col-6 sizeM" v-else>
        <a :href="getLinkUrl(item)" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
            <div class="box">
                <div class="hotline">{{ item.Link.Text2 }}</div>
                <div class="content">
                    <div class="pd_title">{{ item.Link.Text }}</div>
                    <div class="pic">
                        <img :src="item.Img.Src" class="d-block" :alt="item.Link.Text">
                    </div>
                    <div class="price">
                        <small>{{ item.Link.Text3 === '' ? '' : '$' + item.Link.Text3 }}</small>
                        <strong><i>$</i>{{ item.Link.Text1 }}</strong>
                    </div>
                </div>
            </div>
            <img src="@/assets/new/superPD_bg_m.png" alt="bg" class="bg d-block">
        </a>
    </li>

</template>

<script>

import { linkMixin } from '../mixin.js';
export default {
    name: 'oneDayTemplate',
	mixins: [linkMixin],
	props: ['item', 'index'],
};
</script>

<style lang="scss" scoped>
$priceColor: #ea0651;
$txtColor: #303321;
$purple: #8072ed;

strong, small, b, em {
    font-family: Montserrat, Arial, Helvetica, sans-serif;
}
li {
    padding: 0 .5rem;
    margin-bottom: .8rem;
    @media only screen and (max-width: 640px) {
        padding: 0 .3rem;
        margin-bottom: 1rem;
        filter: none;
    }
    a {
        position: relative;
        display: block;
        height: 100%;
        transition: .3s ease;
        &:hover {
            filter: brightness(1.1);
            transform: scale(1.04);
        }
    }
}
.sizeXL {
    position: relative;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 991px) {
        margin-bottom: 2rem;
    }
    img.bg {
        top: 50%;
        transform: translate(-50%, -50%);
        /* width: calc(100% - 1rem); */
        @media only screen and (max-width: 991px) {
            width: 98%;
        }
    }
    a {
        margin: auto;
        position: relative;
        display: block;
        height: auto;
        border-radius: 1.25rem;
        overflow: hidden;
        z-index: 1;
        @media only screen and (max-width: 991px) {
            width: 98%;
        }
        img {
            border-radius: 1rem;
            transition: .3s;
            border-radius: 1.25rem;
        }
        img.heroImg {
            transform: translate(-50%, 0) !important;
            width: auto;
            height: 100%;
            pointer-events: none;
        }
        &:hover img.heroImg {
            transform: translate(-50%, 0) !important;
            filter: brightness(1.1);
            @media only screen and (max-width: 991px) {
                filter: none;
            }
        }
    }
}
.sizeM {
    text-align: center;
    a {
        @media only screen and (max-width: 640px) {
            margin-bottom: 14%;
        }
    }
    img {
        height: 100%;
    }
    .box {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
    .hotline {
        font-size: 1.15rem;
        font-weight: 700;
        color: $txtColor;
        line-height: 3;
        height: 3.1rem;
        overflow: hidden;
        padding: 0 0.62rem;
        @media only screen and (max-width: 991px) {
            font-size: 1.4rem;
            height: 3.5rem;
            line-height: 2.8;
        }
        @media only screen and (max-width: 640px) {
            font-size: 4.5vw;
            height: 10vw;
            line-height: 2.5;
        }
    }
    .pd_title {
        color: $txtColor;
        font-size: 1.15rem;
        font-weight: 500;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        padding: 0 8px;
        margin: 5px 0;
        @media only screen and (max-width: 640px) {
            font-size: 4vw;
            height: 6vw;
            padding: 0 5px;
            margin: 3px 0;
            display: block;
        }
    }
    .pic {
        width: 65%;
        margin: 0 auto;
        border-radius: 12px;
        background-color: #fff;
        overflow: hidden;
        -webkit-mask: -webkit-radial-gradient(circle, white 100%, black 100%);
        @media only screen and (max-width: 640px) {
            width: 74%;
        }
    }
    .price {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        position: absolute;
        bottom: 0;
        strong {
            font-size: 2rem;
            font-weight: 700;
            color: #ea1717;
            display: block;
            line-height: 1;
            background: var(--yellow);
            border-radius: 1.5rem 0;
            padding: 5px 13px;
            @media only screen and (max-width: 640px) {
                font-size: 5vw;
            }
            i {
                font-weight: 500;
                font-size: 60%;
            }
        }
        small {
            display: block;
            font-size: 1rem;
            font-weight: 500;
            text-decoration: line-through;
            color: #000;
            margin-right: 5px;
            @media only screen and (max-width: 640px) {
                display: none;
            }
        }
    }
}
</style>

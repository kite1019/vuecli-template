<template>
    <!-- 第一大格 -->
    <li class="col-lg-6 col-12 sizeXL" v-if="index === 0">
        <a :href="getLinkUrl(item)" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
            <div class="tag">{{ item.Img.Title }}</div>
            <div class="box">
                <div class="content text-center">
                    <div class="hotline">{{ item.Link.Text2 }}</div>
                    <div class="pd_title">{{ item.Link.Text }}</div>
                    <div class="price">
                        <small>{{ item.Link.Text3 === '' ? '' : '$' + item.Link.Text3 }}</small>
                        <strong><i>$</i>{{ item.Link.Text1 }}</strong>
                    </div>
                </div>
                <span class="absolute"></span>
                <div class="pic">
                    <img :src="item.Img.Src" class="d-block" :alt="item.Link.Text">
                </div>
            </div>
            <img src="@/assets/new/superPD_bg_xl.png" alt="bg" class="bg d-block">
        </a>
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
    filter: drop-shadow( 2px 2px 5px rgba($color: #000000, $alpha: .3));
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
    .tag {
        width: 12.5rem;
        height: 3.2rem;
        overflow: hidden;
        text-align: center;
        color: #fff;
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.9;
        position: absolute;
        left: 1rem;
        z-index: 3;
        background: url('@/assets/new/superPD_tag.png') top center no-repeat;
        background-size: 100%;
        @media only screen and (max-width: 991px) {
            width: 10.9rem;
            line-height: 2;
        }
        @media only screen and (max-width: 640px) {
            width: 36vw;
            font-size: 4vw;
            font-weight: 700;
        }
    }
    .box {
        position: absolute;
        top: 1rem;
        display: grid;
        grid-template-columns: 51% auto;
        gap: 5.5%;
        align-items: center;
        z-index: 2;
        padding: 0 1.7rem 0 0.6rem;
        height: calc(100% - 2.1rem);
        @media only screen and (max-width: 640px) {
            top: 1rem;
            padding: 0 1rem 0 0.5rem;
            height: calc(100% - 2rem);
        }
    }
    span.absolute {
        width: 1px;
        height: 95%;
        position: absolute;
        top: 3%;
        border-left: 7px dotted #dedede;
        transform: translate(0.5rem,0);
        @media only screen and (max-width: 640px) {
            border-left: 3px dotted #dedede;
        }
    }
    .hotline {
        background-color: $purple;
        color: #fdff00;
        font-size: 1.25rem;
        font-weight: 500;
        padding: 0 10px;
        border-radius: 100px;
        display: inline-block;
        overflow: hidden;
        line-height: 2;
        height: 2.5rem;
        margin: 1rem 0 0.5rem;
        @media only screen and (max-width: 640px) {
            font-size: 4vw;
            padding: 0 3px;
            margin: 6vw 0 1vw;
        }
    }
    .pd_title {
        color: $txtColor;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 0.8rem;
        @media only screen and (max-width: 640px) {
            font-size: 4vw;
            margin-bottom: 2vw;
        }
    }
    .price {
        width: 100%;
        display: flex;
        align-items: baseline;
        justify-content: center;
        strong {
            font-size: 2.5rem;
            font-weight: bold;
            color: $priceColor;
            display: block;
            line-height: 1;
            @media only screen and (max-width: 640px) {
                font-size: 8vw;
            }
            i {
                font-weight: 500;
                font-size: 60%;
            }
        }
        small {
            display: block;
            font-size: 1rem;
            text-decoration: line-through;
            color: #481c0f;
            margin-right: 5px;
            @media only screen and (max-width: 640px) {
                display: none;
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
            font-weight: 600;
            color: #fff;
            display: block;
            line-height: 1;
            background: linear-gradient(to bottom,  #fe1d2d 0%,#ff730c 100%);
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

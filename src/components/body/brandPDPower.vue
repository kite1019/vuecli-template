<template>
    <li class="col-lg-3 col-6">
        <a :href="getLinkUrl(item)" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
            <div class="pic">
                <img :src="item.Img.Src" class="d-block" :alt="item.Link.Text">
            </div>
            <div class="hotline">
                {{ item.Link.Text2 }}
            </div>
            <div class="pd_title">{{ item.Link.Text }}</div>
            <div class="price">
                <small>{{ item.Link.Text3 === '' ? '' : '$' + item.Link.Text3 }}</small>
                <strong><i>$</i>{{ item.Link.Text1 }}</strong>
            </div>
        </a>
    </li>
</template>

<script>
import { linkMixin } from '../mixin.js';

export default {
    name: 'brandPDPowerTemplate',
	mixins: [linkMixin],
	props: ['item', 'index'],
};
</script>

<style lang="scss" scoped>
$priceColor: #ea0651;
$txtColor: #440015;
.brandPDPower {
    li {
        // padding: 0 1rem;
        /* padding-top: 5rem; */
        position: relative;
        z-index: 1;
        @media only screen and (max-width: 991px) {
            margin-bottom: 1rem;
        }
    }
    a {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        padding: 0 0 5px;
        text-decoration: none;
        background: url('@/assets/new/brandPDPower_bg.png') top center no-repeat;
        background-size: 100% 100%;
        transition: .3s all;
        text-align: center;
        strong, small, b, em {
            font-family: Montserrat, Arial, Helvetica, sans-serif;
        }
        .pic {
            width: 73%;
            margin: 4rem auto 3px;
            mix-blend-mode: multiply;
        }
    }
    .hotline {
        width: calc(100% - 1.6rem);
        margin-left: 0.6rem;
        background: #fa5369;
        color: #fff;
        font-size: 1.2rem;
        line-height: 1.8;
        font-weight: 500;
        text-align: center;
        border-radius: 0 50px 50px 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        @media only screen and (max-width: 767px) {
            font-size: 3.8vw;
        }
    }
    .pd_title {
        width: 100%;
        height: 2.95rem;
        padding: 0 1.6rem 0 1rem;
        margin: .3rem 0;
        line-height: 1.3;
        font-size: 1.1rem;
        font-weight: 500;
        color: #000;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        @media only screen and (max-width: 767px) {
            font-size: 3.5vw;
            height: 9.9vw;
            line-height: 1.4;
            margin-bottom: 5px;
        }
    }
    .price {
        width: 100%;
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin-bottom: 0.6rem;
        strong {
            font-size: 2rem;
            font-weight: bold;
            color: $priceColor;
            display: block;
            line-height: 1;
            @media only screen and (max-width: 767px) {
                font-size: 6vw;
            }
            i {
                font-weight: 500;
                font-size: 60%;
            }
        }
        small {
            display: block;
            font-size: .9rem;
            text-decoration: line-through;
            color: #8e8e8e;
            margin-right: 5px;
            @media only screen and (max-width: 767px) {
                font-size: 11px;
            }
        }
    }
    a:hover {
        transform: scale(1.03);
        filter: brightness(1.1);
        @media only screen and (max-width: 991px) {
            filter: none;
            transform: none;
        }
    }
}
</style>

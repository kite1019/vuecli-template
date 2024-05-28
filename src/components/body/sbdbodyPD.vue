<template>
    <!-- web -->
    <template v-if="index === 0 || index === 6">
        <li class="d-lg-block d-none big" :id="index">
            <a :href="getLinkUrl(item)" class="p-0" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
                <img :src="item.Img.Src" class="d-block" :alt="item.Link.Text">
            </a>
        </li>
    </template>

    <!-- app -->
    <template v-if="index === 1 || index === 7">
        <li class="col-12 d-lg-none d-block big" :id="index">
            <a :href="getLinkUrl(item)" class="p-0" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
                <img :src="item.Img.Src" class="d-block" :alt="item.Link.Text">
            </a>
        </li>
    </template>

    <!-- body -->
    <template v-if="index >=2 && index <=5 || index >=8 && index <20 ">
        <li class="col-6 col-lg-auto" :id="index">
            <a :href="getLinkUrl(item)" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
                <div class="pic"><img :src="item.Img.Src" class="d-block" :alt="item.Link.Text"></div>
                <div class="hotline">{{ item.Link.Text2 }}</div>
                <div class="pd_title">{{ item.Link.Text }}</div>
                <div class="price">
                    <small>{{ item.Link.Text3 === '' ? '' : '$' + item.Link.Text3 }}</small>
                    <strong><i>$</i>{{ item.Link.Text1 }}</strong>
                </div>
            </a>
        </li>
    </template>
</template>

<script>
import { linkMixin } from '../mixin.js';
export default {
    name: 'sbdbodyPDTemplate',
	mixins: [linkMixin],
	props: ['item', 'index'],
};
</script>

<style lang="scss" scoped>
$priceColor: #ea0651;
$txtColor: #440015;

.sbdbody {
    .col-lg-auto {
        @media (min-width: 992px) {
            width: calc(74% / 4);
            padding: 0 0.5rem;
        }
    }
    li {
        transition: .3s ease;
        transform-origin: 50% 100%;
        @media only screen and (max-width: 991px) {
            margin-bottom: .5rem;
        }
        @media only screen and (max-width: 767px) {
            padding: 0 3px;
        }
        &:hover {
            filter: brightness(1.1);
            transform: scale(1.03);
            @media only screen and (max-width: 991px) {
                transform: none;
            }
        }
        &.big {
            flex: 0 0 auto;
            width: 26%;
            position: relative;
            padding: 0;
            @media only screen and (max-width: 991px) {
                width: 100%;
                padding: 0;
                margin-bottom: .8rem;
            }
            a {
                margin-top: 0;
            }
        }
    }
    a {
        margin-top: 3.6rem;
        display: block;
        width: 100%;
        position: relative;
        text-align: center;
        text-decoration: none;
        @media only screen and (max-width: 991px) {
            margin-top: 0;
        }
        strong, small, b, em {
            font-family: Montserrat, Arial, Helvetica, sans-serif;
        }
    }
    .pic {
        border-radius: 4.5rem .5rem .5rem .5rem;
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    .hotline {
        background: linear-gradient(to right,  #fcd0ae 0%,#fff5e7 34%,#fdd0b1 60%,#fff8ec 100%);
        font-size: 1.15rem;
        font-weight: 400;
        color: $txtColor;
        padding: 9px 3px 2px;
        border-radius:0 0 .3rem .3rem;
        box-shadow: 0 2px 3px rgba($color: #720007, $alpha: .3);
        margin: -6px 0 5px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        position: relative;
        z-index: 0;
    }
    .pd_title {
        color: $txtColor;
        font-weight: 500;
        font-size: 1.1rem;
        line-height: 1.4;
        margin-bottom: 0.5rem;
        height: 3.1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        @media only screen and (max-width: 767px) {
        }
    }
    .price {
        width: 100%;
        display: flex;
        align-items: baseline;
        justify-content: center;
        strong {
            font-size: 2rem;
            font-weight: bold;
            color: $priceColor;
            display: block;
            line-height: 1;
            i {
                font-weight: 500;
                font-size: 60%;
            }
        }
        small {
            display: block;
            font-size: .9rem;
            text-decoration: line-through;
            color: #fff;
            margin-right: 5px;
        }
    }
}
</style>

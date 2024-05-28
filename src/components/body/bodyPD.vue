<template>
	<li class="col-lg-3 col-6">
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

<script>

import { linkMixin } from '../mixin.js';
export default {
    name: 'bodyPDTemplate',
	mixins: [linkMixin],
	props: ['item', 'index'],
};
</script>

<style lang="scss" scoped>
$priceColor: #ea0651;
.promo {
    li {
        padding: 0 8px;
        margin-bottom: 20px;
        @media only screen and (max-width: 991px) {
            padding: 0 5px;
        }
        @media only screen and (max-width: 767px) {
            padding: 0 3px;
        }
    }
    a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 1rem;
        position: relative;
        text-align: center;
        background: url('@/assets/new/bodyPD_bg.png') top center no-repeat;
        background-size: 100% 100%;
        transition: .3s all;
        @media only screen and (max-width: 991px) {
            background-size: 100% 100%;
        }
        &:hover {
            filter: brightness(1.1);
            transform: scale(1.03);
            @media only screen and (max-width: 991px) {
                transform: none !important;
            }
        }
    }
    .pic {
        margin: 0 auto;
    }
    .hotline {
        font-size: 1.25rem;
        font-weight: 500;
        color: #fff;
        background: linear-gradient(to bottom,  #9aa7eb 0%,#c266d9 100%);
        border-radius: 10rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin: .4rem 0 0;
        transition: all .3s ease;
        // @media only screen and (max-width: 767px) {
        //     font-size: 13px;
        // }
    }
    .pd_title {
        height: 2.9rem;
        color: #481c0f;
        font-size: 1.1rem;
        font-weight: 500;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin: 0.4rem 0;
    }
    strong, small, b, em {
        font-family: Montserrat, Arial, Helvetica, sans-serif;
        font-size: 125%;
        line-height: 1.3;
    }
    .price {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        small {
            display: block;
            text-decoration: line-through;
            color: #481c0f;
            font-size: 1rem;
            margin-right: 5px;
        }
        strong {
            color: $priceColor;
            font-size: 2rem;
            font-weight: bold;
            display: block;
            line-height: 1;
            i {
                font-weight: 500;
                font-size: 60%;
            }
        }
    }
}


</style>

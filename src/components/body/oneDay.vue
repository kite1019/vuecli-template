<template>
    <li class="col-lg-6 col-12" v-if="index <= 1">
        <a :href="getLinkUrl(item)" class="d-flex" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
            <div class="pic">
                <img :src="item.Img.Src" class="d-block" :alt="item.Link.Text">
            </div>
            <div class="content">
                <div class="hotline">{{ item.Link.Text2 }}</div>
                <div class="pd_title">{{ item.Link.Text }}</div>
                <div class="price">
                    <small>{{ item.Link.Text3 === '' ? '' : '$' + item.Link.Text3 }}</small>
                    <strong><i>$</i>{{ item.Link.Text1 }}</strong>
                </div>
            </div>
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
$txtColor: #440015;

li {
    transition: .3s ease;
    @media only screen and (max-width: 991px) {
        margin-bottom: 1.5rem;
    }
    &:hover {
        filter: brightness(1.1);
        transform: scale(1.03);
        @media only screen and (max-width: 991px) {
            transform: none;
        }
    }
}
a {
    position: relative;
    margin: 0;
    background: url('@/assets/new/pink_bodybg.jpg') top center #fbb9c4;
    background-size: cover;
    border-radius: 8rem;
    border: 2px solid #fff;
    padding: 1rem 3rem 1rem 5rem;
    text-decoration: none;
    transition: .3s all;
    // @media only screen and (max-width: 991px) {
    //     box-shadow: 0 1rem 1.5rem rgba($color: #ff758c, $alpha: 0.9);
    // }
    @media only screen and (max-width: 767px) {
        padding: 2vw 8vw 2vw 12vw;
    }
    strong, small, b, em {
        font-family: Montserrat, Arial, Helvetica, sans-serif;
    }
    .pic {
        width: 45%;
        padding: 0;
        border-radius: 1.25rem;
        overflow: hidden;
        @media only screen and (max-width: 767px) {
            
        }
    }
    .content {
        width: 55%;
        padding: 0 0 0 8px;
        position: relative;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        @media only screen and (max-width: 767px) {
            // width: 100%;
            // padding: 0 0 5.5vw;
            // margin-top: 5px;
        }
    }
}
.hotline {
    width: 93%;
    margin: 0 auto 8px;
    background-color: #fcd0ae;
    background: linear-gradient(to right,  #fcd0ae 0%,#fff5e7 34%,#fdd0b1 60%,#fff8ec 100%);
    color: $txtColor;
    font-size: 1.5rem;
    font-weight: 500;
    padding: 5px 2px;
    border-radius: 5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    transition: all .3s ease;
    @media only screen and (max-width: 991px) {
        width: 100%;
    }
    @media only screen and (max-width: 767px) {
        font-size: 15px;
    }
}
.pd_title {
    width: 100%;
    height: 3.25rem;
    line-height: 1.3;
    font-size: 1.25rem;
    font-weight: 500;
    color: $txtColor;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    @media only screen and (max-width: 767px) {
        font-size: 14px;
        line-height: 1.4;
        margin-bottom: 5px;
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
        @media only screen and (max-width: 767px) {
            font-size: 7vw;
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
        @media only screen and (max-width: 767px) {
            font-size: 12px;
        }
    }
}
a, img, .hotline {
    transition: .3s all;
}
// a:hover {
//     transform: scale(1.03);
//     @media only screen and (max-width: 991px) {
//         filter: none;
//         transform: none;
//     }
//     img {
//         filter: brightness(1.15);
//         @media only screen and (max-width: 991px) {
//             filter: none;
//             transform: none;
//         }
//     }
//     .hotline {
//         color: #fff;
//         background-color: var(--red);
//     }
// }

</style>

<template>
    <div class="p-0">
        <div class="topBox">
            <div class="tabsBox">
                <!-- 選單 -->
                <ul class="nav nav-tabs" id="millionPDTab" role="tablist">
                    <li class="col-6 nav-item">
                        <button class="nav-link now active" data-bs-toggle="tab" data-bs-target="#millionPD_01" role="tab" aria-selected="true">
                            <img src="@/assets/new/button_01.png" alt="甜心女神" class="d-block">
                        </button>
                    </li>
                    <li class="col-6 nav-item">
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#millionPD_02" role="tab" aria-selected="false">
                            <img src="@/assets/new/button_02.png" alt="個性女神" class="d-block">
                        </button>
                    </li>
                </ul>
                <!-- END // 選單 -->
            </div>
            <div class="title">
                <img class="d-block" src="@/assets/new/sect_title_tag.png" alt="女神攻略">
            </div>
        </div>
    </div>

    <div class="promoMainBox">
        <div class="tab-content">
            <div class="tab-pane fade show active" id="millionPD_01" role="tabpanel">
                <OverlayScrollbarsComponent defer>
                    <ul class="row promo">
                        <template v-for="(item, index) in data_1" :key="index">
                            <li class="col-3">
                                <a :href="getLinkUrl(item)" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
                                    <div class="pic"><img :src="item.Img.Src" class="d-block" :alt="item.Link.Text"></div>
                                    <div class="hotline">
                                        <span>{{ item.Link.Text2 }}</span>
                                        <img src="@/assets/new/strategy_hotline.png" alt="hotline" class="d-block">
                                    </div>
                                    <div class="pd_title">{{ item.Link.Text }}</div>
                                    <div class="price">
                                        <small>{{ item.Link.Text3 === '' ? '' : '$' + item.Link.Text3 }}</small>
                                        <strong><i>$</i>{{ item.Link.Text1 }}</strong>
                                    </div>
                                </a>
                            </li> 
                        </template>
                    </ul>
                </OverlayScrollbarsComponent>
            </div>
            <div class="tab-pane fade" id="millionPD_02" role="tabpanel">
                <OverlayScrollbarsComponent defer>
                    <ul class="row promo">
                        <template v-for="(item, index) in data_2" :key="index">
                            <li class="col-3">
                                <a :href="getLinkUrl(item)" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
                                    <div class="pic"><img :src="item.Img.Src" class="d-block" :alt="item.Link.Text"></div>
                                    <div class="hotline">
                                        <span>{{ item.Link.Text2 }}</span>
                                        <img src="@/assets/new/strategy_hotline.png" alt="hotline" class="d-block">
                                    </div>
                                    <div class="pd_title">{{ item.Link.Text }}</div>
                                    <div class="price">
                                        <small>{{ item.Link.Text3 === '' ? '' : '$' + item.Link.Text3 }}</small>
                                        <strong><i>$</i>{{ item.Link.Text1 }}</strong>
                                    </div>
                                </a>
                            </li> 
                        </template>
                    </ul>
                </OverlayScrollbarsComponent>
            </div>
            
        </div>
    </div>
</template>

<script>
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { linkMixin } from '../mixin.js';

export default {
    name: 'tabsPDTemplate',
	mixins: [linkMixin],
	props: ['data_1','data_2'],
    components: {
        OverlayScrollbarsComponent,
    },
};
</script>
<style lang="scss" scoped>
$priceColor: #ea0651;
$txtColor: #440015;
.nav-tabs {
    border: 0;
    justify-content: center;
    padding: 0 0.5rem 0 1rem;
    margin-top: -3rem;
	@media only screen and (max-width: 991px) {
        width: 80%;
        margin: -8vw auto 0;
    }
    li {
        padding: 0 .3rem;
    }
    .nav-link {
        // border: 0;
        width: 100%;
        border: 0;
        padding: 0;
        background: transparent !important;
        filter: saturate(0);
        &.active {
            filter: saturate(1);
        }
    }
}
.topBox {
    display: grid;
    grid-template-columns: 40% auto;
    align-items: end;
    @media only screen and (max-width: 991px) {
        display: flex;
        flex-wrap: wrap;
    }
    >div {
        position: relative;
    }
    .title {
        padding: 1rem 1rem 0;
        // position: relative;
        @media only screen and (max-width: 991px) {
            width: 95%;
            order: 1;
            margin: 0 auto 1rem;
        }
        @media only screen and (max-width: 767px) {
            width: 100%;
            padding: 0;
        }
        &::before, &::after {
            content: '';
            width: 3.5rem;
            height: 3rem;
            position: absolute;
            bottom: -3px;
            left: -3px;
            transform: scaleX(-1);
            z-index: 2;
            @media only screen and (max-width: 991px) {
                display: none !important;
            }
        }
        &::before {
            background: #fcd3d8;
        }
        &::after {
            background: #ffa3b5;
            border-right: 3px solid #fff;
            border-bottom: 3px solid #fff;
            border-radius: 0 0 2.5rem 0;
        }
        img {
            position: absolute;
            top: -8rem;
            width: 93%;
            left: 1.7rem;
            z-index: 2;
            @media only screen and (max-width: 991px) {
                position: static;
                width: 100%;
            }
        }
    }
    .tabsBox {
        background: #fcd3d8;
        padding: 1rem 1rem 0;
        border-radius: 2.5rem 2.5rem 0 0;
        border: 3px solid #fff;
        border-bottom: 0;
        margin-bottom: -3px;
        z-index: 1;
        @media only screen and (max-width: 991px) {
            width: 100%;
            margin: 0 auto;
            order: 2;
            padding-bottom: 0;
        }
    }
}

.promoMainBox {
    width: 100%;
    background: linear-gradient(165deg,  #fcd3d8 24%,#fcc6ce 43%,#f9e0e5 62%,#f9a0ad 83%);
    border-radius: 0 2.5rem 2.5rem 2.5rem;
    border: 3px solid #fff;
    position: relative;
    @media only screen and (max-width: 991px) {
        border-top: 0;
        border-radius: 0 0 2.5rem 2.5rem;
    }
    strong, small, b, em {
        font-family: Montserrat, Arial, Helvetica, sans-serif;
    }
    ul {
        margin: 0;
        padding: 1.5rem 1.6rem 1rem;
        @media only screen and (max-width: 1024px) {
            width: 110rem;
            padding-bottom: 20px;
        }
        @media only screen and (max-width: 991px) {
            width: 145vw;
            padding: 0 0 1rem;
        }
        li {
            margin-bottom: 1rem;
            // padding: 0 4px;
            @media only screen and (max-width: 991px) {
                padding: 0 5px;
                margin-bottom: .5rem;
            }
            @media only screen and (max-width: 767px) {
                padding: 0 3px;
            }
        }
        a {
            display: block;
            width: 100%;
            height: 100%;
            padding: 5px;
            border-radius: .5rem;
            position: relative;
            text-align: center;
            text-decoration: none;
            background: #fff;
            transition: .3s all;
            @media only screen and (max-width: 991px) {
                font-size: 1rem;   
                line-height: 1.45rem;  
                // padding: 5px 5px 1.8rem;
                background-color: #fff;
            }
            @media only screen and (max-width: 767px) {
                font-weight: 500;
                // padding: 5px 5px 8vw; 
            }
            &:hover {
                filter: brightness(1.1);
                transform: scale(1.03);
                @media only screen and (max-width: 991px) {
                    transform: none;
                }
            }
        }
        .pic {
            margin-bottom: 5px;
            @media only screen and (max-width: 991px) {
                margin-bottom: 3px;
            }
        }
        .hotline {
            width: 100%;
            margin-top: -1rem;
            position: relative;
            span {
                padding-top: 0.8rem;
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                font-size: 1.35rem;
                font-weight: 500;
                color: #fff;
                @media only screen and (max-width: 767px) {
                    font-size: 16px;
                }
            }
            img {
                @media only screen and (max-width: 767px) {
                    height: 34px;
                }
            }
        }
        .pd_title {
            color: $txtColor;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 1.4;
            height: 3.5rem;
            margin: 0.3rem 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            @media only screen and (max-width: 767px) {
                font-size: 15px;
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
                color: #8e8e8e;
                margin-right: 5px;
                @media only screen and (max-width: 767px) {
                    display: none;
                }
            }
        }
    }
}
.tab-content {
    position: relative;
    z-index: 6;
	@media only screen and (max-width: 991px) {
        padding: 1rem;
    }
}
</style>
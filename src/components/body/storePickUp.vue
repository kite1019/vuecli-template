<template>
    <div class="container" v-if="prodsList" id="">
        <div class="h6" style="font-size: 3rem; text-align: center; margin: 2rem auto 2rem">超取館</div>
        <ul class="row promo">
            <template v-for="(item, index) in prodsAllPd" :key="index">
                <li class="col">
                    <a :href="'https://24h.pchome.com.tw/prod/' + item.Id" target="_blank">
                        <div class="pic">
                            <img :src="'https://img.pchome.com.tw/cs' + item.Pic.W + '?width=320'" class="d-block" :alt="item.Name">
                        </div>
                        <div class="pd_title">{{ item.Name }}</div>
                        <div class="price">
                            <small>{{ item.Price.M === 0 ? '' : '$' + item.Price.M }}</small>
                            <strong><i>$</i>{{ item.Price.Low === null ? item.Price.P : item.Price.Low }}
                            </strong>
                        </div>
                    </a>
                </li> 
            </template>
        </ul>
    </div>
</template>

<script>
import fetchJsonp from 'fetch-jsonp';

export default {
    name: 'storePickUpTemplate',
	data: () => {
        return {
            prodsList: null,
            prodsAllPd: [],
        }
    },
    created() {
        this.fetchStoreListData();
    },
    methods : {
        getRandomProducts(products, count) {
            const productsRandom = JSON.parse(JSON.stringify(products));
            for (let i = productsRandom.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [productsRandom[i], productsRandom[j]] = [productsRandom[j], productsRandom[i]];
            }
            // 從洗牌後的數組中取出指定數量的元素
            return productsRandom.slice(0, count);
        },
        async fetchStoreListData() {
            const storeName = 'DAAL67'; //館名
            const countNum = '20'; //要取的數量，最少20
            const dataURL = `https://ecshweb.pchome.com.tw/search/v4.3/all/results?cateid=${storeName}&attr=&pageCount=${countNum}&_callback=jsonpcb_pdlist`;
            try {
                const response = await fetchJsonp(
                    dataURL,
                    {jsonpCallbackFunction: 'jsonpcb_pdlist'}
                );
                const jsonData = await response.json();
                this.prodsList = jsonData.Prods; //更新組件狀態
                this.fetchProdData(); //取得List資料後，執行取內容
            } catch (error) {
                console.log(`活動資訊解析失敗: ${error}`);
            }
        },
        async fetchProdData() {
            if (this.prodsList) {
                const prodsAllList = this.prodsList.map(item => item.Id).join(',');
                const url = `https://ecapi-cdn.pchome.com.tw/ecshop/prodapi/v2/prod?id=${prodsAllList}&fields=Id,Name,Nick,Store,Price,Discount,Pic&_callback=callback_products`;
                try {
                    const response = await fetchJsonp(
                        url,
                        {jsonpCallbackFunction: 'callback_products'}
                    );
                    const jsonData = await response.json();
                    // 更新組件狀態，轉換為數組，並隨機排序
                    this.prodsAllPd = this.getRandomProducts(Object.values(jsonData), 10);
                } catch (error) {
                    console.log(`活動資訊解析失敗: ${error}`);
                }
                console.log('prodsAllPd-- ', this.prodsAllPd);
                console.log('prodsAllList -- ', prodsAllList);
            }
        }
    }
}


</script>


<style lang="scss" scoped>

$priceColor: #ea0651;
.promo {
    li {
        padding: 0 8px;
        margin-bottom: 20px;
        width: 20%;
        flex: auto;
        @media only screen and (max-width: 991px) {
            padding: 0 5px;
            width: 50%;
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

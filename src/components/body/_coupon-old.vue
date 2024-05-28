<template>
    <!-- <h3 class="text-center">islogin = {{ islogin }}</h3> -->
    <ul class="row couponBox radius">
        <template v-for="(item, index) in coupon" :key="item.uniqueIdentifier" >
            <li class="col-lg-6 col-12" :id="activityCouponData[index].Id">
                <!-- status: {{ activityCouponData[index].Status }} -->
                <a ref="couponLink" class="main" :class="getLinkClass(index)" :href="getLinkUrl(index)" @click="getMyCouponClick(index)">
                    <div class="gridBox">
                        <div class="txt d-flex justify-content-end">
                            <span v-html="item.Link.Text3"></span>
                        </div>
                        <div class="content">
                            <div class="h3" v-html="item.Link.Text"></div>
                            <div class="amt" v-html="getAmt(index)"></div>
                        </div>
                        <div class="btn" :class="getButtonClass(index)" ref="couponButton">
                            <span v-html="getButtonText(index)"></span><i></i>
                        </div>
                    </div>
                    <div class="date">
                        {{ activityCouponData[index].UseStartDate }} ~ {{ activityCouponData[index].UseEndDate }}
                    </div>
                </a>
            </li>
        </template>
    </ul>
    <div class="collection">
        <swiper
            :modules="modules"
            :space-between="15"
            :speed="600"
            :pagination="{ clickable: true }"
            :breakpoints="{
                '320': { slidesPerView: 1.3, spaceBetween: 10, },
                '768': { slidesPerView: 1.3, spaceBetween: 15, },
                '1024': { slidesPerView: 3.1, spaceBetween: 10, },
                '1601': { slidesPerView: 3.1, spaceBetween: 15, },
            }"
        >
            <template v-for="(item, index) in collection" :key="item.uniqueIdentifier" >
                <swiper-slide class="couponBox">
                    <div :id="activityCollectionData[index].Id">
                        <!-- status: {{ activityCollectionData[index].Status }} -->
                        <a ref="couponLink2" class="main" :class="getCollectionLinkClass(index)" :href="getCollectionLinkUrl(index)" @click="getMyCollectionCoupon(index)">
                            <div class="gridBox">
                                <div class="content">
                                <div class="txt">
                                    <i v-html="item.Link.Text3"></i>
                                    <div class="h3" v-html="item.Link.Text"></div>
                                </div>
                                    <div class="amt" v-html="getAmtCollection(index)"></div>
                                </div>
                                <div class="btn" :class="getCollectionButtonClass(index)" ref="couponButton2">
                                    <span v-html="getCollectionButtonText(index)"></span><i></i>
                                </div>
                            </div>
                            <div class="date">
                                {{ activityCollectionData[index].UseStartDate }} ~ {{ activityCollectionData[index].UseEndDate }}
                            </div>
                        </a>
                    </div>
                </swiper-slide>
            </template>
        </swiper>

    </div>

    <div class="getAll d-flex justify-content-center">
        <template v-for="index in getAllCoupone" :key="index">
            <a id="getAllcoupon" class="btn" :href="getAllLinkUrl()"  @click="getAllCouponClick()">
                一鍵領取 <i></i><small>限量用完為止</small>
            </a>
        </template>       
        <a href="https://24h.pchome.com.tw/activity/coupon" class="btn moreCoupon" target="_blank">更多折價券 <i></i></a>     
    </div>

    <!-- 領取訊息 -->
    <div class="modal fade" id="takeCoupon" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div id="info__pic">
                        <img src="" alt="">
                    </div>
                    <h4 id="info__text">領取資訊</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                </div>
            </div>
        </div>
    </div>
    <!-- END // 領取訊息 -->
</template>

<script>
import fetchJsonp from 'fetch-jsonp';
import { Modal } from 'bootstrap'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/bundle'

// ---------------------------------
// (2) 讀取後台資料並重組資料格式
// ---------------------------------
let dataArr = {};
function toDataArr (arr){
    arr.forEach(function(item){
        dataArr[item.BlockId] = item;
    });
}

//計算區塊實際資料 (因IndexBlock資料中有空白陣列)
function dataNode(data, blockNumFirst) {
    for(let i=blockNumFirst; i<=(blockNumFirst + 9); i++){
        if(dataArr[i]){
            dataArr[i].Nodes.forEach(function(node){
                // 檢查node.Link.Ur，如有資料再堆疊至新陣列{}
                if(node.Link.Url){
                    data.push(node);
                }
            });
        }
    }
}

export default {
    name: 'myCoupon',
	data() {
		return {
			islogin: this.islogin,
            coupon: this.coupon,
            activityCouponData: this.activityCouponData,
			getAllCoupone: this.getAllCoupone,
            modal: null,
            isCouponReceived: false,
            collection: this.collection,
            activityCollectionData: this.activityCollectionData,
		}
	},
    components: {
        Swiper,
        SwiperSlide,
	},
    setup() {
        return {
            modules: [Navigation, Pagination, Autoplay],
        }
    },
    created() {
        // 讀取後台資料並重組資料格式
        let coupon = [];
        let collection = [];
        toDataArr(IndexBlock);
        dataNode(coupon, 717);
        dataNode(collection, 728);

        // 會員登入	get
        // 回傳：0（未登入）1（已登入）
        let islogin;
        async function fetchLogin() {
            const loginURL = `https://ecapi.pchome.com.tw/member/v2/member/islogin?_callback=callback_coupon`;
            try {
                const response = await fetchJsonp(loginURL, {
                    jsonpCallbackFunction: 'callback_coupon'
                });
                const jsonData = await response.json();
                islogin = jsonData; // 將資料儲存至全域變數
                return islogin;
            } catch (error) {
                console.log(`解析失敗: ${error}`);
            }
        }


        // ---------------------------------
        // 折價券，需要會員登入狀態
        // 1. 取會場佈置後台輸入的ActId，並且合併
        // 2. api to activity 取折價券內容
        // 3. 折價券名稱：item.Link.Text ＝ 品名欄(必填)
        // 3. 折價券編號：item.Link.Text1 ＝ 價格欄(必填)
        // ---------------------------------

        // 取主打折價券資料
        let activityCouponData;
        let getAllCoupone = {};

        const couponList = coupon.map(item => item.Link.Text1).join(',');
        // console.log('couponList--',couponList);

        async function fetchActivityCouponData() {
            const jsonpURL = `https://ecapi.pchome.com.tw/marketing/coupon/v2/activity?id=${couponList}&_callback=jsonpcb_CouponCollection`;
            try {
                const response = await fetchJsonp(jsonpURL, {
                    jsonpCallbackFunction: 'jsonpcb_CouponCollection'
                });
                const jsonData = await response.json();
                activityCouponData = jsonData; // 將資料儲存至全域變數
            } catch (error) {
                console.log(`活動資訊解析失敗: ${error}`);
                activityCouponData = {}; // 若發生錯誤，設定為空陣列或其他預設值
            }
        }


        // 取品類折價券資料
        let activityCollectionData;
        let getAllCollection = {};

        const collectionList = collection.map(item => item.Link.Text1).join(',');
        // console.log('collectionList--',collectionList);

        async function fetchActivityCollectioneData() {
            const jsonpURL = `https://ecapi.pchome.com.tw/marketing/coupon/v2/activity?id=${collectionList}&_callback=jsonpcb_CouponCollection`;
            try {
                const response = await fetchJsonp(jsonpURL, {
                    jsonpCallbackFunction: 'jsonpcb_CouponCollection'
                });
                const jsonData = await response.json();
                activityCollectionData = jsonData; // 將資料儲存至全域變數
            } catch (error) {
                console.log(`活動資訊解析失敗: ${error}`);
                activityCollectionData = {}; // 若發生錯誤，設定為空陣列或其他預設值
            }
        }
        
        // 載入會員狀態後，執行取折價券資料
        fetchLogin().then(() => {
            this.islogin = islogin;
            fetchActivityCollectioneData().then(() => {
                // 如果CouponId空值，則取Id (折價券編號)
                const collectionAllId = [].concat(
                    ...activityCollectionData.map(item => item.CouponId === '' ? item.Id : item.CouponId),
                ).join(',');
                getAllCollection.couponList = collectionAllId;

                fetchActivityCouponData().then(() => {
                    // 執行後，couponAllId = 合併CouponId (一鍵領)
                    // 如果CouponId空值，則取Id (折價券編號)
                    const couponAllId = [].concat(
                        ...activityCouponData.map(item => item.CouponId === '' ? item.Id : item.CouponId),
                    ).join(',');
                    getAllCoupone.couponList = couponAllId+','+collectionAllId;
                    
                    //  取完折價券資料後，開始傳值到data
                    this.coupon = coupon;
                    this.activityCouponData = activityCouponData;
                    this.getAllCoupone = getAllCoupone;

                    this.collection = collection;
                    this.activityCollectionData = activityCollectionData;
                    
                    // this.islogin = 1; // 測試登入
                    console.log('islogin--', islogin);
                    // console.log('coupon--', coupon);
                    // console.log('activityCouponData--',activityCouponData);
                    // console.log('couponAllId: ', couponAllId);
                    // console.log('collection-- ', collection);
                    // console.log('collectionAllId: ', collectionAllId);
                    // console.log('activityCollectionData: ', activityCollectionData);
                    // console.log('this.getAllCoupone: ', this.getAllCoupone);
                });

            });
        });
    },
	methods: {
        // 檢查登入狀態
		getAllLinkUrl() {
            const rurl = window.location.href;
            const encodedStr = encodeURIComponent(rurl); //將網址轉碼，避免GA出錯
			return this.islogin === 0
				? `https://ecvip.pchome.com.tw/login/v3/login.htm?rurl=${encodedStr}`
				: `javascript:void(0)`;
		},
        // 折扣計算
		getAmt(index) {
			const actData = this.activityCouponData[index];
			const SendAmt =  actData.SendAmt;
			const SendAmtMode = actData.SendAmtMode
            
			// 折扣金額或折數，折數顯示「1位數」或「2位數」的處理
            switch (SendAmtMode) {
                case 'Discount': {
                    const amtRes = (1 - SendAmt) * 100;
                    const amtText = amtRes % 10 === 0 ? (amtRes / 10).toString() : amtRes.toString();
                    return `<strong style="margin-right:4px">${amtText}</strong><small>折</small>`;
                }
                default:
                    return `<small>現抵 $</small><strong>${SendAmt}</strong>`;
            }
		},
        // Status 折價券狀態檢
        // Progress：進行中
        // UseStart：兌換開始
        // UseFinish：兌換結束
        isStatusActive(index) {
            const actData = this.activityCouponData[index];
            const Status =  actData.Status;
            let statusSet;
            if (Status === 'Progress'|| Status === 'UseStart') {
                statusSet = 'open';
            } else if (Status == 'UseFinish') {
                statusSet = 'close';
            }
            return statusSet;
        },
        //根劇狀態 設定btn class, 不用判斷登入
		getButtonClass(index) {
            const statusSet = this.isStatusActive(index);

            if (statusSet === 'open') {
                return 'btn goBtn';
            } else if (statusSet === 'close') {
                return 'btn theend';
            }

            return 'btn theend'; // Default class
		},
        //根劇狀態 設定對應文案, 要判斷登入
        getButtonText(index) {
            const statusSet = this.isStatusActive(index);
            let Text = '';
            if (statusSet === 'open') {
                this.islogin === 0 ? Text = '登入領' : Text = '立即領';
            } else if (statusSet === 'close') {
                Text = '活動<br>結束';
            }
            // console.log('Text: ', Text);
            return Text; 
		},
        
        //根劇狀態 設定link class, 要斷登入
		getLinkClass(index) {
            const statusSet = this.isStatusActive(index);
            let addClass = '';
            if (statusSet === 'open') {
                this.islogin === 0 ? addClass = 'main' : addClass = 'main getmycoupon';
            } else if (statusSet === 'close') {
                addClass = 'pe-none'; //結束
            }
            return addClass; 
		},

        //根劇狀態 設定url, 要判斷登入
		getLinkUrl(index) {
            const rurl = window.location.href;
            const encodedStr = encodeURIComponent(rurl); //將網址轉碼，避免GA出錯
            const loginUrl = `https://ecvip.pchome.com.tw/login/v3/login.htm?rurl=${encodedStr}`;
            const statusSet = this.isStatusActive(index);
            let urlMap = '';
            if (statusSet === 'open') {
                this.islogin === 0 ? urlMap = loginUrl : urlMap = 'javascript: void(0)';
            } else if (statusSet === 'close') {
                urlMap = 'javascript:;'; //結束
            }
            return urlMap; 
		},

        // 當a.class有 getmycoupon 執行監聽，可領取
        getMyCouponClick(index) {
            // console.log(index);
            if (this.getLinkClass(index).includes('getmycoupon')) {
                console.log('a'+index);
                const actData = this.activityCouponData[index];
                const couponId = actData.CouponId || actData.Id;
				const infoTextDiv = document.querySelector('#info__text');
				const infoPicDiv = document.querySelector('#info__pic');
                const infoModal = new Modal('#takeCoupon')
                const url = `https://shopping.pchome.com.tw/ecapi/marketing/coupon/v2/index.php/coupon?id=${couponId}`;
                // console.log('post- ', couponId );
                fetch(url, {
                    method: 'POST',
                    credentials: 'include'
                })
                .then(response => {
                    // console.log('response: ',response);
                    return response.json();
                })
                .then(data => {
                    // POST 成功後的回應 data Success
					// console.log('POST OK ', 'data: ',data[0].Msg);

                    const msg = data[0].Msg;
                    switch (msg) {
                        case 'Success': {
							infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_accept.svg"></object>`;
							infoTextDiv.innerHTML='折價券領取成功';
							break;
                        }
                        case 'Finished': {
							infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_accept.svg"></object>`;
							infoTextDiv.innerHTML='折價券已索取完畢';
							break;
                        }
                        default:
							infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_accept.svg"></object>`;
							infoTextDiv.innerHTML='折價券已歸戶';
                    }
                    infoModal.show();
                    
					// 更新按鈕文字和連結
                    const couponLink = this.$refs.couponLink[index];
                    // console.log(couponLink);
                    couponLink.classList.add('pe-none');
					this.$refs.couponButton[index].innerText = '已領取';
                })
                .catch(error => {
                    // 處理錯誤
					console.error('POST error: ', error);
                    const rurl = window.location.href;
                    const encodedStr = encodeURIComponent(rurl); //將網址轉碼，避免GA出錯
					infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_warning.svg"></object>`;
					infoTextDiv.innerHTML=`<a class="warning" href="https://ecvip.pchome.com.tw/login/v3/login.htm?rurl=${encodedStr}">« 請先登入會員 »</a>`;
					infoModal.show();
                });
            }
        },

        // -----------------------------------------------------------------------------------------------------------
        // 一鍵領取
        // -----------------------------------------------------------------------------------------------------------
        getAllCouponClick() {
            console.log('getAll', this.getAllCoupone.couponList);
			if (this.islogin) {
				console.log('post');
				const infoTextDiv = document.querySelector('#info__text');
				const infoPicDiv = document.querySelector('#info__pic');
                const infoModal = new Modal('#takeCoupon')
                const url = `https://shopping.pchome.com.tw/ecapi/marketing/coupon/v2/index.php/coupon?id=${this.getAllCoupone.couponList}`;

				fetch(url, {
					method: 'POST',
					credentials: 'include' // 帶全頁cookie
				})
				.then(response => {
					return response.json();
				})
                .then(data => {
                    // POST 成功後的回應 data Success
					console.log('POST OK ', 'data: ',data[0].Msg);
                    
                    const msg = data[0].Msg;
                    switch (msg) {
                        case 'Success': {
							infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_accept.svg"></object>`;
							infoTextDiv.innerHTML='折價券領取成功';
							break;
                        }
                        case 'Finished': {
							infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_accept.svg"></object>`;
							infoTextDiv.innerHTML='折價券已索取完畢';
							break;
                        }
                        default:
							infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_accept.svg"></object>`;
							infoTextDiv.innerHTML='折價券已歸戶';
                    }
					infoModal.show();
					
					// 領取成功，更新卡片按鈕文字和連結不可點擊
					const allGetLink = document.querySelectorAll('a.getmycoupon');
					// console.log(allGetLink);
					allGetLink.forEach(item => {
						item.classList.add('pe-none');
					});
					const allGetText = document.querySelectorAll('.btn.goBtn');
					// console.log(allGetText);
					allGetText.forEach(item => {
						item.innerText = '已領取';
					});
					// 領取成功，更新一鍵領按鈕和連結不可點擊
					const couponLink = document.querySelector('#getAllcoupon');
					couponLink.classList.add('pe-none');
					couponLink.innerHTML = '已全部領取<i></i><small>限量用完為止</small>';
				})
                .catch(error => {
					// POST 失敗
                    const rurl = window.location.href;
                    const encodedStr = encodeURIComponent(rurl); //將網址轉碼，避免GA出錯
					infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_warning.svg"></object>`;
					infoTextDiv.innerHTML=`<a class="warning" href="https://ecvip.pchome.com.tw/login/v3/login.htm?rurl=${encodedStr}">« 請先登入會員 »</a>`;
					infoModal.show();
					console.error('API POST 失敗', error);
				});
            }
        },

        // -----------------------------------------------------------------------------------------------------------
        // 品類券們
        // -----------------------------------------------------------------------------------------------------------
        // 折扣計算
		getAmtCollection(index) {
			const actData = this.activityCollectionData[index];
			const SendAmt =  actData.SendAmt;
			const SendAmtMode = actData.SendAmtMode
            
			// 折扣金額或折數，折數顯示「1位數」或「2位數」的處理
            switch (SendAmtMode) {
                case 'Discount': {
                    const amtRes = (1 - SendAmt) * 100;
                    const amtText = amtRes % 10 === 0 ? (amtRes / 10).toString() : amtRes.toString();
                    return `<strong style="margin-right:4px">${amtText}</strong><small>折</small>`;
                }
                default:
                    return `<small>現抵 $</small><strong>${SendAmt}</strong>`;
            }
		},
        // Status 折價券狀態檢查:
        // Progress：進行中
        // UseStart：兌換開始
        // UseFinish：兌換結束
        isCollectionStatusActive(index) {
            const actData = this.activityCollectionData[index];
            const Status =  actData.Status;
            let statusSet;
            if (Status === 'Progress'|| Status === 'UseStart') {
                statusSet = 'open';
            } else if (Status == 'UseFinish') {
                statusSet = 'close';
            }
            return statusSet;
        },
        //根劇狀態 設定btn class, 不用判斷登入
		getCollectionButtonClass(index) {
            const statusSet = this.isCollectionStatusActive(index);

            if (statusSet === 'open') {
                return 'btn goBtn';
            } else if (statusSet === 'close') {
                return 'btn theend';
            }

            return 'btn theend'; // Default class
		},
        //根劇狀態 設定對應文案, 要判斷登入
        getCollectionButtonText(index) {
            const statusSet = this.isCollectionStatusActive(index);
            let Text = '';
            if (statusSet === 'open') {
                this.islogin === 0 ? Text = '登入領' : Text = '立即領';
            } else if (statusSet === 'close') {
                Text = '活動<br>結束';
            }
            // console.log('Text: ', Text);
            return Text; 
		},
        //根劇狀態 設定link class, 要斷登入
		getCollectionLinkClass(index) {
            const statusSet = this.isCollectionStatusActive(index);
            let addClass = '';
            if (statusSet === 'open') {
                this.islogin === 0 ? addClass = 'main' : addClass = 'main getmycoupon';
            } else if (statusSet === 'close') {
                addClass = 'pe-none'; //結束
            }
            return addClass; 
		},
        //根劇狀態 設定url, 要判斷登入
		getCollectionLinkUrl(index) {
            const rurl = window.location.href;
            const encodedStr = encodeURIComponent(rurl); //將網址轉碼，避免GA出錯
            const loginUrl = `https://ecvip.pchome.com.tw/login/v3/login.htm?rurl=${encodedStr}`;
            const statusSet = this.isCollectionStatusActive(index);
            let urlMap = '';
            if (statusSet === 'open') {
                this.islogin === 0 ? urlMap = loginUrl : urlMap = 'javascript: void(0)';
            } else if (statusSet === 'close') {
                urlMap = 'javascript:;'; //結束
            }
            return urlMap; 
		},
        // 當a.class有 getmycoupon 執行監聽，可領取
        getMyCollectionCoupon(index) {
            console.log(index);
            if (this.getCollectionLinkClass(index).includes('getmycoupon')) {
                console.log('a'+index);
                const actData = this.activityCollectionData[index];
                const couponId = actData.CouponId || actData.Id;
				const infoTextDiv = document.querySelector('#info__text');
				const infoPicDiv = document.querySelector('#info__pic');
                const infoModal = new Modal('#takeCoupon')
                const url = `https://shopping.pchome.com.tw/ecapi/marketing/coupon/v2/index.php/coupon?id=${couponId}`;
                console.log('post- ', couponId );
                fetch(url, {
                    method: 'POST',
                    credentials: 'include'
                })
                .then(response => {
                    // console.log('response: ',response);
                    return response.json();
                })
                .then(data => {
                    // POST 成功後的回應 data Success
					// console.log('POST OK ', 'data: ',data[0].Msg);

                    const msg = data[0].Msg;
                    switch (msg) {
                        case 'Success': {
							infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_accept.svg"></object>`;
							infoTextDiv.innerHTML='折價券領取成功';
							break;
                        }
                        case 'Finished': {
							infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_accept.svg"></object>`;
							infoTextDiv.innerHTML='折價券已索取完畢';
							break;
                        }
                        default:
							infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_accept.svg"></object>`;
							infoTextDiv.innerHTML='折價券已歸戶';
                    }
                    infoModal.show();
                    
					// 更新按鈕文字和連結
                    const couponLink2 = this.$refs.couponLink2[index];
                    // console.log(couponLink);
                    couponLink2.classList.add('pe-none');
					this.$refs.couponButton2[index].innerText = '已領取';
                })
                .catch(error => {
                    // 處理錯誤
					console.error('POST error: ', error);
                    const rurl = window.location.href;
                    const encodedStr = encodeURIComponent(rurl); //將網址轉碼，避免GA出錯
					infoPicDiv.innerHTML= `<object data="https://fs-a.ecimg.tw/img/sites/marketing/shareImg/coupon_warning.svg"></object>`;
					infoTextDiv.innerHTML=`<a class="warning" href="https://ecvip.pchome.com.tw/login/v3/login.htm?rurl=${encodedStr}">« 請先登入會員 »</a>`;
					infoModal.show();
                });
            }
        },
    }
}
</script>


<style lang="scss" scoped>

#getAllcoupon {
    &.gotit {
        pointer-events: none;
    }
}


</style>

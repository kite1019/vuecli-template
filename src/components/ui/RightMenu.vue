<template>
    <!-- 右側選單 (手機置頂) -->
    <div class="right__menu d-flex align-items-center navbar" :class="{ 'go--act': isMenuActive }">
        <div class="nav_btn" @click="toggleMenu">
            <span class="arrow"></span>
        </div>
        <div class="menu_mb_head">快速導覽：</div>
        <ul class="menu_box nav navbar-nav" id="navbar">
			<li data-scroll-active="kv" class="noline"></li>
            <template v-for="(item, index) in hashMenu" :key="index">
                <li :data-scroll-active="item.hash" v-if="hasData(item.data)" :id="'nv-'+ item.hash">
                    <a :href="'#' + item.hash" @click.prevent v-html="'<i></i>' + item.name"></a>
                </li>
            </template>
			
			<template v-for="(item, index) in otherData"  :key="item.uniqueIdentifier">
				<li class="mt-3 px-2 pt-3 d-lg-flex d-none noline" v-if="index === 0">
					<a :href="item.Link.Url" target="_blank">
						<img :src="item.Img.Src" class="d-block" :alt="item.Link.Text">
					</a>
				</li>
			</template>
			<li data-scroll-active="seoBox" class="noline"></li>
        </ul>
        <div class="gotop">
            <a href="#top" @click.prevent="goTop()">
                <img src="@/assets/ui/goTop.svg" class="d-block">
            </a>
        </div>
    </div>
</template>

<script>

import hashMenu from '../hashMenu.js'
export default {
    name: 'RightMenu',
    data() {
        return {
			hashMenu: hashMenu,
            isMenuActive: false
        };
    },
    props: ['otherData'],
    computed: {
        // 動態檢查 hashMenu 中每個 data 是否有內容
        hasData() {
            return dataName => {
                return this.$parent[dataName] && this.$parent[dataName].length > 0;
            };
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuActive = !this.isMenuActive;
        },
		goTop() {
			const goTop = document.getElementById("top");
			goTop.scrollIntoView({ behavior: 'instant' });
		},
    },
};
</script>

<style lang="scss" scoped>
.right__menu {
    width: 100px;
	height: 100vh;
    position: fixed;
	right: 0;
	top: 0;
    z-index: 99;
	background: rgba($color: #fff2dc, $alpha: .7);
	@media only screen and (max-width: 991px) {
		width: 95%;
		margin: 2rem auto;
		height: auto;
		z-index: 22;
		padding: 0 3rem 0 0;
		// position: fixed;
		// top: 0;
		overflow-x: auto;
		overflow-y: hidden;
		pointer-events: auto;
		position: static;
		border-radius: 10px;
		background-color: rgba($color: #fff, $alpha: .9);
	}
    .menu_box {
		// margin-right: 5px;
		width: 100%;
		justify-content: center;
		@media only screen and (max-width: 991px) {
			left: 0;
			width: auto;
			min-height: 43px;
			// background-color: #fff;
			-webkit-overflow-scrolling: touch;
			white-space: nowrap;
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			padding: 0;
			pointer-events: auto;
			position: relative;
            top: 0;
			justify-content: left;
		}
		a {
			display: flex;
			justify-content: center;
			color: #653a37;
			font-size: 15px;
			font-weight: 500;
			padding: 6px 0;
			text-align: center;
			@media only screen and (max-width: 1024px) {
				padding: 4px 0;
			}
			@media only screen and (max-width: 991px) {
				position: relative;
				color: #3f3f3f !important;
				font-size: 16px;
				font-weight: 500;
				padding: 8px;
				&::before {
					content: "";
					position: absolute;
					bottom: 18%;
					right: 0;
					width: 1px;
					height: 60%;
					background-color: #ccc;
				}
				br {
					display: none;
				}
			}
		}
		li {
			margin: 3px 0;
			width: 100%;
			position: relative;
			@media only screen and (max-width: 991px) {
				width: auto;
				margin: 0;
				&:nth-last-child(2) {
					padding-right: 3rem;
				}
			}
			&::before {
				content: '';
				display: block;
				position: absolute;
				bottom: -4px;
				width: 50%;
				height: 1px;
				background-color: #ffabbc;
				left: 50%;
				transform: translateX(-50%);
				@media only screen and (max-width: 991px) {
					display: none;
				}
			}
			&.noline::before {
				display: none;
			}
			&.active {
				a {
					font-weight: 600;
				}
			}
			&.beauty.active a {
				text-align: justify;
			}
		}
		#smallBn {
			width: 100%;
			@media only screen and (max-width: 991px) {
				display: none !important;
			}
		}
	}
	.gotop {
		display: block;
		width: 40px;
		margin: auto;
		@media only screen and (max-width: 991px) {
			display: none !important;
		}
	}
	.menu_mb_head {
		color: #e54040;
		text-align: left;
		width: 100%;
		height: 41px;
		line-height: 41px;
		font-size: 1.2rem;
		font-weight: 500;
		padding: 0 0 0 10px;
		display: none;
	}
	&.go--act {
		box-shadow: 0 0 13px rgba($color: #000000, $alpha: .5);
		background: #fff;
		.nav_btn span {
			transform: rotate(-135deg);
		}
		.menu_box {
			@media only screen and (max-width: 991px) {
				display: flex;
				flex-wrap: wrap;
				align-content: center;
				justify-content: center;
				padding-bottom: 10px;
				li a:before {
					display: none;
				}
			}
			li:nth-last-child(2) {
				padding-right: 0;
			}
		}
	}
}

// app 上選單展開
.nav_btn {
	display: none !important;
	cursor: pointer;
	background: #fff;
	position: absolute;
	z-index: 88;
	top: 0px;
	right: 0;
	width: 30px;
	height: 43px;
	z-index: 9;
	@media only screen and (max-width:991px) {
		display: flex !important;
		align-items: center;
		justify-content: center;
	}
	span {
		transform: rotate(45deg);
		width: 12px;
		height: 12px;
		border: solid rgba($color: #000000, $alpha: 0.8);
		border-width: 0 2px 2px 0;
		margin: 0;
		transition: .3s;
	}
	&.go--act {
		z-index: 9999;
		span {
			transform: rotate(-135deg);
		}
	}
}
</style>

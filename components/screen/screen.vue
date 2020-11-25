<template>
	<view class="wrap">
		<view class="selective">
			<view class="box" style="padding-left: 20rpx;">
				<view class="tospur-layout bg-purple" @click="handelShowPopup(1)" :class="{
						curs: (isShowPopup == 1 && showCity) || areaCur
					}">
					区域
					<text class="iconfont btn_arrow_top" :class="{
							arrow: (isShowPopup == 1 && showCity) || areaCur
						}">
						{{ isShowPopup == 1 && showCity ? '&#xe629;' : '&#xe62a;' }}
					</text>
				</view>
			</view>
			<view class="box">
				<view class="tospur-layout bg-purple-light" @click="handelShowPopup(2)" :class="{ curs: (isShowPopup == 2 && showPrice) || priceCur }">
					价格
					<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 2 && showPrice) || priceCur }">
						{{ isShowPopup == 2 && showPrice ? '&#xe629;' : '&#xe62a;' }}
					</text>
				</view>
			</view>
			<view class="box">
				<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(3)" :class="{ curs: (isShowPopup == 3 && showHouse) || huxingCur }">
					户型
					<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 3 && showHouse) || huxingCur }">
						{{ isShowPopup == 3 && showHouse ? '&#xe629;' : '&#xe62a;' }}
					</text>
				</view>
			</view>
			<view class="box">
				<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(4)" :class="{
						curs: (isShowPopup == 4 && showMore) || moreCur
					}">
					更多
					<text class="iconfont btn_arrow_top" :class="{
							arrow: (isShowPopup == 4 && showMore) || moreCur
						}">
						{{ isShowPopup == 4 && showMore ? '&#xe629;' : '&#xe62a;' }}
					</text>
				</view>
			</view>
			<view class="box">
				<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(5)">
					<text class="iconfont iconshaixuan" :class="{ arrow: (isShowPopup == 5 && showSort) || selectAll.sidx }"></text>
				</view>
			</view>
		</view>
		<view class="selectedSpanList">
			<span class="selectedSpanList_span" v-for="(item, index) in selectedSpanList" :key="index" @click="clearSelectedList(item)">
				{{ item.value }}
				<em class="iconfont iconbtn_close selectedSpanList_icon"></em>
			</span>
		</view>
		</u-sticky>
		
		<!-- 区域 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-popup v-model="showCity" mode="top" :class="{'popup-top':true,'noscroll':showCity}" @catchtouchmove="preventD"  :negative-top="200" ref="item">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view v-show="showCity" class="baidu-popup">
				<!-- #endif -->
				<view class="baidu-bg">
					<view class="selective line-bottom">
						<view class="box" style="padding-left: 20rpx;">
							<view class="tospur-layout bg-purple" @click="handelShowPopup(1)" :class="{
								curs: (isShowPopup == 1 && showCity) || areaCur
							}">
								区域
								<text class="iconfont btn_arrow_top" :class="{
									arrow: (isShowPopup == 1 && showCity) || areaCur
								}">
									{{ isShowPopup == 1 && showCity ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-light" @click="handelShowPopup(2)" :class="{ curs: (isShowPopup == 2 && showPrice) || priceCur }">
								价格
								<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 2 && showPrice) || priceCur }">
									{{ isShowPopup == 2 && showPrice ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(3)" :class="{ curs: (isShowPopup == 3 && showHouse) || huxingCur }">
								户型
								<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 3 && showHouse) || huxingCur }">
									{{ isShowPopup == 3 && showHouse ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(4)" :class="{
								curs: (isShowPopup == 4 && showMore) || moreCur
							}">
								更多
								<text class="iconfont btn_arrow_top" :class="{
									arrow: isShowPopup == 4 && showMore
								}">
									{{ isShowPopup == 4 && showMore ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(5)">
								<text class="iconfont iconshaixuan" :class="{ arrow: (isShowPopup == 5 && showSort) || selectAll.sidx }"></text>
							</view>
						</view>
					</view>
					<view class="popup-text">
						<view class="area-layout">
							<view v-for="(item, index) in areaTit" :key="item.id" @click="tab(item)" class="area-text" :class="{ current: qieNum === item.id }">{{ item.text }}</view>
						</view>
						<view class="area-qie" v-if="qieNum == 0">
							<scroll-view class="scroll-Y scroll-view" show-scrollbar scroll-y="true" scroll-left="120">
								<view class="scroll-county" v-for="(item, index) in countys" :key="index" @click="onNavCountysClick(item, index)"
								 :class="{ cur: countysIndex == index }">
									{{ item.text }}
								</view>
							</scroll-view>
							<scroll-view class="scroll-Y" scroll-y="true" scroll-left="120" style="background-color:#fbfbfb;">
								<view class="scroll-children" v-for="(item, index) in childrenList" :key="index" @click="onItemCountysClick(item, index)"
								 :class="{ cur: item.check }">
									<text>{{ item.text }}</text>
									<u-icon name="checkmark-circle-fill" color="#00a4ff" size="45" v-if="item.check"></u-icon>
								</view>
							</scroll-view>
						</view>
						<view class="area-qie" v-if="qieNum == 1">
							<scroll-view class="scroll-Y" show-scrollbar scroll-y="true" scroll-left="120">
								<view class="scroll-county" v-for="(item, index) in metros" :key="index" @click="onNavMetrosClick(item, index)"
								 :class="{ cur: metrosIndex == index }">
									{{ item.text }}
								</view>
							</scroll-view>
						</view>
						<view class="area-qie" v-if="qieNum == 2">
							<scroll-view class="scroll-Y" show-scrollbar scroll-y="true" scroll-left="120" style="background-color:#fbfbfb;">
								<view class="scroll-county" v-for="(item, index) in nearbys" :key="index" @click="onNavNearbyClick(item, index)"
								 :class="{ cur: nearbysIndex == index }">
									{{ item.text }}
								</view>
							</scroll-view>
						</view>
					</view>
					<view class="areaButton">
						<view class="reset" @click="areaReset">
							<view class="iconfont iconshaixuanzhongzhi"></view>
							<view>重置</view>
						</view>
						<u-button type="primary" class="button" @click="onAreaConfirm('area', 'item')">确认</u-button>
					</view>
				</view>
				<!-- #ifndef MP-WEIXIN -->
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
		</u-popup>
		<!-- #endif -->
		
		<!-- 价格 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-popup v-model="showPrice" mode="top"  :class="{'popup-top':true,'noscroll':showPrice}" @catchtouchmove="preventD">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view v-show="showPrice" class="baidu-popup">
				<!-- #endif -->
				<view class="baidu-bg">
					<view class="selective line-bottom">
						<view class="box" style="padding-left: 20rpx;">
							<view class="tospur-layout bg-purple" @click="handelShowPopup(1)" :class="{
								curs: (isShowPopup == 1 && showCity) || areaCur
							}">
								区域
								<text class="iconfont btn_arrow_top" :class="{
									arrow: (isShowPopup == 1 && showCity) || areaCur
								}">
									{{ isShowPopup == 1 && showCity ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-light" @click="handelShowPopup(2)" :class="{ curs: (isShowPopup == 2 && showPrice) || priceCur }">
								价格
								<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 2 && showPrice) || priceCur }">
									{{ isShowPopup == 2 && showPrice ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(3)" :class="{ curs: (isShowPopup == 3 && showHouse) || huxingCur }">
								户型
								<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 3 && showHouse) || huxingCur }">
									{{ isShowPopup == 3 && showHouse ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(4)" :class="{
								curs: (isShowPopup == 4 && showMore) || moreCur
							}">
								更多
								<text class="iconfont btn_arrow_top" :class="{
									arrow: isShowPopup == 4 && showMore
								}">
									{{ isShowPopup == 4 && showMore ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(5)">
								<text class="iconfont iconshaixuan" :class="{ arrow: (isShowPopup == 5 && showSort) || selectAll.sidx }"></text>
							</view>
						</view>
					</view>
					<view class="popup-text">
						<view class="area-layout">
							<view v-for="(item, index) in priceTit" :key="item.id" @click="tab2(item, index)" class="area-text" :class="{ current: qieNum2 === item.id }">
								{{ item.text }}
							</view>
						</view>

						<view class="area-qie price-qie">
							<view class="pirce-text" v-if="qieNum2 == 0">
								<span class="average" v-for="(item, index) in averagePrice" :key="item.id" @click="danChoose($event, index, 'unit')"
								 :class="item.selected ? 'curs' : ''">
									{{ carry(item) }}
								</span>
							</view>

							<view class="pirce-text" v-if="qieNum2 == 1">
								<span class="average" v-for="(item, index) in totalPrice" :key="item.id" @click="danChoose($event, index, 'total')"
								 :class="item.selected ? 'curs' : ''">
									{{ carry1(item) }}
								</span>
							</view>
							<view class="pirce-input">
								<input v-model="priceShu1" class="input-boder" type="text" value="" :placeholder="priceText1" @keyup="inputChange" />
								<text>至</text>
								<input v-model="priceShu2" class="input-boder" type="text" value="" :placeholder="priceText2" @keyup="inputChange" />
							</view>
						</view>
					</view>

					<view class="areaButton">
						<view class="reset" @click="priceReset">
							<view class="iconfont iconshaixuanzhongzhi"></view>
							<view>重置</view>
						</view>
						<u-button type="primary" class="button" @click="onAreaConfirm('price', 'priceRef')">确认</u-button>
					</view>
				</view>
				<!-- #ifndef MP-WEIXIN -->
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
		</u-popup>
		<!-- #endif -->
		
		<!-- 户型 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-popup v-model="showHouse" mode="top" :class="{'popup-top':true,'noscroll':showHouse}" @catchtouchmove="preventD">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view v-show="showHouse" class="baidu-popup">
				<!-- #endif -->
				<view class="baidu-bg">
					<view class="selective line-bottom">
						<view class="box" style="padding-left: 20rpx;">
							<view class="tospur-layout bg-purple" @click="handelShowPopup(1)" :class="{
								curs: (isShowPopup == 1 && showCity) || areaCur
							}">
								区域
								<text class="iconfont btn_arrow_top" :class="{
									arrow: (isShowPopup == 1 && showCity) || areaCur
								}">
									{{ isShowPopup == 1 && showCity ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-light" @click="handelShowPopup(2)" :class="{ curs: (isShowPopup == 2 && showPrice) || priceCur }">
								价格
								<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 2 && showPrice) || priceCur }">
									{{ isShowPopup == 2 && showPrice ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(3)" :class="{ curs: (isShowPopup == 3 && showHouse) || huxingCur }">
								户型
								<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 3 && showHouse) || huxingCur }">
									{{ isShowPopup == 3 && showHouse ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(4)" :class="{
								curs: (isShowPopup == 4 && showMore) || moreCur
							}">
								更多
								<text class="iconfont btn_arrow_top" :class="{
									arrow: isShowPopup == 4 && showMore
								}">
									{{ isShowPopup == 4 && showMore ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(5)">
								<text class="iconfont iconshaixuan" :class="{ arrow: (isShowPopup == 5 && showSort) || selectAll.sidx }"></text>
							</view>
						</view>
					</view>
					<view class="house-title">户型区间</view>
					<view class="popup-text">
						<view class="area-qie">
							<view class="pirce-text">
								<text class="average  house" v-for="(item, index) in houseLayout" :key="item.id" @click="houseChoose(item, $event)"
								 :class="item.selected ? 'curs' : ''">
									{{ item.text }}
								</text>
							</view>
						</view>
					</view>
					<view class="areaButton">
						<view class="reset" @click="houseReset">
							<view class="iconfont iconshaixuanzhongzhi"></view>
							<view>重置</view>
						</view>
						<u-button type="primary" class="button" @click="onAreaConfirm('huxing', 'houseRef')">确认</u-button>
					</view>
				</view>
				<!-- #ifndef MP-WEIXIN -->
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
		</u-popup>
		<!-- #endif -->
		
		<!-- 更多 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-popup v-model="showMore" mode="top" :class="{'popup-top':true,'noscroll':showMore}"  :safe-area-inset-bottom="true" @catchtouchmove="preventD">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view v-show="showMore" class="baidu-popup">
				<!-- #endif -->
				<view class="baidu-bg more-bg">
					<view class="selective line-bottom">
						<view class="box" style="padding-left: 20rpx;">
							<view class="tospur-layout bg-purple" @click="handelShowPopup(1)" :class="{
								curs: isShowPopup == 1 && showCity
							}">
								区域
								<text class="iconfont btn_arrow_top" :class="{
									arrow: isShowPopup == 1 && showCity
								}">
									{{ isShowPopup == 1 && showCity ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-light" @click="handelShowPopup(2)" :class="{ curs: isShowPopup == 2 && showPrice }">
								价格
								<text class="iconfont btn_arrow_top" :class="{ arrow: isShowPopup == 2 && showPrice }">
									{{ isShowPopup == 2 && showPrice ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(3)" :class="{ curs: isShowPopup == 3 && showHouse }">
								户型
								<text class="iconfont btn_arrow_top" :class="{ arrow: isShowPopup == 3 && showHouse }">
									{{ isShowPopup == 3 && showHouse ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(4)" :class="{
								curs: isShowPopup == 4 && showMore
							}">
								更多
								<text class="iconfont btn_arrow_top" :class="{
									arrow: isShowPopup == 4 && showMore
								}">
									{{ isShowPopup == 4 && showMore ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(5)">
								<text class="iconfont iconshaixuan" :class="{ arrow: (isShowPopup == 5 && showSort) || selectAll.sidx }"></text>
							</view>
						</view>
					</view>
					<view class="popup-more">
						<scroll-view class="scroll-Y" show-scrollbar scroll-y="true" :style="{height:scrollTop*2+'rpx'}">
							<view v-if="buildingAreaLen">
								<view class="title">面积（㎡）</view>
								<view class="area-qie">
									<view class="pirce-text">
										<text class="average house" v-for="(item, index) in buildingArea" :key="index" @click="buildingAreaClick(item, $event)"
										 :class="item.selected ? 'curs' : ''">
											{{ carry2(item) }}
										</text>
									</view>
								</view>
							</view>
							<view class="title">物业类型</view>
							<view class="area-qie">
								<view class="pirce-text">
									<text class="average  house" v-for="item in propertyType" :key="item.key" @click="propertyTypeClick(item)"
									 :class="item.selected ? 'curs' : ''">
										{{ item.value }}
									</text>
								</view>
							</view>
							<view class="title">销售状态</view>
							<view class="area-qie">
								<view class="pirce-text">
									<text class="average  house" v-for="item in salesStatus" :key="item.key" @click="salesStatusClick(item)"
									 :class="item.selected ? 'curs' : ''">
										{{ item.value[0] }}
									</text>
								</view>
							</view>
							<view v-if="loopLineLen">
								<view class="title">环线选择</view>
								<view class="area-qie">
									<view class="pirce-text">
										<text class="average  house" v-for="item in loopLine" :key="item.code" @click="loopLineClick(item)" :class="item.selected ? 'curs' : ''">
											{{ item.title }}
										</text>
									</view>
								</view>
							</view>
							<view class="title">装修</view>
							<view class="area-qie">
								<view class="pirce-text">
									<text class="average  house" v-for="item in decorationStatus" :key="item.key" @click="decorationStatusClick(item)"
									 :class="item.selected ? 'curs' : ''">
										{{ item.value }}
									</text>
								</view>
							</view>
							<view v-if="buildingTagsLen">
								<view class="title">更多特色</view>
								<view class="area-qie more-ts">
									<view class="pirce-text">
										<text class="average  house" v-for="item in buildingTags" :key="item.code" @click="buildingTagsClick(item)"
										 :class="item.selected ? 'curs' : ''">
											{{ item.title }}
										</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="areaButton more-button">
						<view class="reset" @click="moreReset('more')">
							<view class="iconfont iconshaixuanzhongzhi"></view>
							<view>重置</view>
						</view>
						<u-button type="primary" class="button" @click="onAreaConfirm('more', 'item')">确认</u-button>
					</view>
				</view>
				<!-- #ifndef MP-WEIXIN -->
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
		</u-popup>
		<!-- #endif -->
		
		<!-- 排序 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-popup v-model="showSort" mode="top" class="popup-top">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view v-show="showSort" class="baidu-popup">
				<!-- #endif -->
				<view class="baidu-bg">
					<view class="selective line-bottom">
						<view class="box" style="padding-left: 20rpx;">
							<view class="tospur-layout bg-purple" @click="handelShowPopup(1)" :class="{
								curs: (isShowPopup == 1 && showCity) || areaCur
							}">
								区域
								<text class="iconfont btn_arrow_top" :class="{
									arrow: (isShowPopup == 1 && showCity) || areaCur
								}">
									{{ isShowPopup == 1 && showCity ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-light" @click="handelShowPopup(2)" :class="{ curs: (isShowPopup == 2 && showPrice) || priceCur }">
								价格
								<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 2 && showPrice) || priceCur }">
									{{ isShowPopup == 2 && showPrice ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(3)" :class="{ curs: (isShowPopup == 3 && showHouse) || huxingCur }">
								户型
								<text class="iconfont btn_arrow_top" :class="{ arrow: (isShowPopup == 3 && showHouse) || huxingCur }">
									{{ isShowPopup == 3 && showHouse ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(4)" :class="{
								curs: (isShowPopup == 4 && showMore) || moreCur
							}">
								更多
								<text class="iconfont btn_arrow_top" :class="{
									arrow: isShowPopup == 4 && showMore
								}">
									{{ isShowPopup == 4 && showMore ? '&#xe629;' : '&#xe62a;' }}
								</text>
							</view>
						</view>
						<view class="box">
							<view class="tospur-layout bg-purple-dark" @click="handelShowPopup(5)">
								<text class="iconfont iconshaixuan" :class="{ arrow: (isShowPopup == 5 && showSort) || selectAll.sidx }"></text>
							</view>
						</view>
					</view>
					<view class="popup-text">
						<view class="screen">
							<view v-for="item in screenSort" :key="item.id" @click="screenSortClick(item)" :class="item.selected ? 'curs' : ''">{{ item.text }}</view>
						</view>
					</view>
				</view>
				<!-- #ifndef MP-WEIXIN -->
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
		</u-popup>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getData
	} from '@/request/api';
	import {
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				scrollTop: 400,
				isStyle: false,
				showCity: false,
				showPrice: false,
				showHouse: false,
				showMore: false,
				showSort: false,
				showTags: false,
				showTag: true,
				showStick: false,
				isSelective: true,
				isShowPopup: '',
				topHight: '',
				title: '上海市',
				nextPage: 1,
				total: 0,
				endRow: 10,
				areaTit: [{
					text: '区域',
					id: 0
				}, {
					text: '地铁',
					id: 1
				}, {
					text: '附近',
					id: 2
				}],
				currentTabItem: {
					text: '区域',
					id: 0
				},
				qieNum: 0,
				childrenList: [],
				selectedSpanList: [],
				// 有数据的样式
				areaCur: false,
				priceCur: false,
				huxingCur: false,
				moreCur: false,
				//区域
				countys: [],
				countysId: [],
				countysIndex: 0,
				countysVal: 0,

				//地铁
				metros: [],
				metrosId: [],
				metrosIndex: 0,

				//附近
				nearbys: [{
					text: '不限',
					id: 0
				}, {
					text: '1km',
					id: 1
				}, {
					text: '2km',
					id: 2
				}, {
					text: '3km',
					id: 3
				}],
				nearbysId: [],
				nearbysIndex: 0,

				//选中的
				chooseSelected: [],
				//选中的
				selectAll: {},
				selectAllValue: {},
				//价格
				averagePrice: [], //单价
				totalPrice: [], //总价
				priceShu1: '', //输入价格start
				priceShu2: '', //输入价格end
				priceText1: '最低单价',
				priceText2: '最高单价',

				priceTit: [{
					text: '单价',
					id: 0
				}, {
					text: '总价',
					id: 1
				}],
				qieNum2: 0,
				// 选中的价位
				chooseSelectedPrice: [],
				priceArr: [],
				inputNumber: {},

				//户型
				chooseSelectedHouse: [], //最后选中的户型
				houseLayout: [{
						text: '不限',
						selected: true,
						id: 0
					},
					{
						text: '1室',
						selected: false,
						id: 1
					},
					{
						text: '2室',
						selected: false,
						id: 2
					},
					{
						text: '3室',
						selected: false,
						id: 3
					},
					{
						text: '4室',
						selected: false,
						id: 4
					},
					{
						text: '5室',
						selected: false,
						id: 5
					},
					{
						text: '5室以上',
						selected: false,
						id: 6
					}
				],

				//更多
				buildingAreaLen: 0,
				buildingArea: [], //面积
				chooseSelectedBuildingAreae: [], //选中面积

				buildingTagsLen: 0,
				buildingTags: [], //更多特色
				chooseSelectedBuildingTags: [], //选中特色

				propertyType: [], //物业类型
				chooseSelectedPropertyType: [], //选中的物业类型

				salesStatus: [], //销售状态
				chooseSelectedSalesStatus: [], //选中的销售状态

				loopLineLen: 0,
				loopLine: [], //环线
				chooseSelectedLoopLine: [], //选中环线

				decorationStatus: [], //装修
				chooseSelectedDecorationStatus: [], //选中的装修

				moreResultData: [],

				//排序
				chooseSelectedSort: [],
				screenSort: [{
						text: '默认排序',
						id: 0,
						selected: true,
						sidx: null,
						sord: null
					},
					{
						text: '单价由低到高',
						id: 1,
						selected: false,
						sidx: 'reference_average_price',
						sord: 'asc'
					},
					{
						text: '单价由高到低',
						id: 2,
						selected: false,
						sidx: 'reference_average_price',
						sord: 'desc'
					},
					{
						text: '开盘时间顺序',
						id: 3,
						selected: false,
						sidx: 'open_time',
						sord: 'asc'
					},
					{
						text: '开盘时间倒序',
						id: 4,
						selected: false,
						sidx: 'open_time',
						sord: 'desc'
					}
				]
			};
		},

		mounted() {
			// #ifndef MP-WEIXIN
			const self = this
			uni.getSystemInfo({
				success: function(res) {
					self.scrollTop = res.windowHeight - 140
					console.log(self.scrollTop, '手机高度')
				}
			});
			// #endif
			if (this.areaCode && this.areaCode.code && this.$route.name == 'houseList') this.changeCodeFromUrl(this.areaCode,
				true);
		},
		created() {
			this.$formatter.cache.propertyType2.forEach(val => {
				this.$set(val, 'selected', false);
			});
			this.propertyType = this.$formatter.cache.propertyType2;

			this.$formatter.cache.salesStatus.forEach(val => {
				this.$set(val, 'selected', false);
			});
			this.salesStatus = this.$formatter.cache.salesStatus;

			this.$formatter.cache.decorationStatus2.forEach(val => {
				this.$set(val, 'selected', false);
			});
			this.decorationStatus = this.$formatter.cache.decorationStatus2;
			this.getAreaData();
		},
		watch: {
			areaCode(newValue, oldValue) {
				if (newValue.code === oldValue.code) return;
				this.changeCodeFromUrl(newValue);
			},
			cityCode(newValue) {
				this.getAreaData();
			}
		},
		computed: {
			//获取vuex中的cityCode
			...mapState({
				cityCode: state => state.cityCode,
				areaCode: state => state.cityCode
			}),
			...mapGetters(['areaCode', 'cityCode'])
		},
		methods: {
			getAreaData(code) {
				let city = this.$cache.getCache('storageCity');
				console.log(city, 120);
				let params = {
					city: city.code || 310100000
				};
				getData('/building/capp/SearchParam', params)
					.then(res => {
						this.countys = this.changeData(res.countys); //区域
						this.metros = this.changeData(res.metros); //地铁
						console.log(res.averagePrice, 1456222);
						res.averagePrice.forEach(val => {
							this.$set(val, 'selected', false);
							this.$set(val, 'type', 1);
						});
						res.averagePrice.unshift({
							start: '不限',
							selected: true,
							end: '不限'
						});
						this.averagePrice = res.averagePrice; //单价
						console.log(this.averagePrice);

						res.totalPrice.forEach(val => {
							this.$set(val, 'selected', false);
							this.$set(val, 'type', 2);
						});
						res.totalPrice.unshift({
							start: '不限',
							selected: true,
							end: '不限'
						});
						this.totalPrice = res.totalPrice; //总价
						this.buildingAreaLen = res.buildingArea.length;
						res.buildingArea.forEach(val => {
							this.$set(val, 'selected', false);
						});
						this.buildingArea = res.buildingArea; //面积

						this.buildingTagsLen = res.buildingTags.length;
						res.buildingTags.forEach(val => {
							this.$set(val, 'selected', false);
						});
						this.buildingTags = res.buildingTags; //特色

						this.loopLineLen = res.loopLine.length;

						res.loopLine.forEach(val => {
							this.$set(val, 'selected', false);
						});
						this.loopLine = res.loopLine; //环线
					})
					.catch(err => {
						console.log('请求结果报错', err);
					});
			},
			clearSelectedList(item) {
				let index = 0;
				this.selectedSpanList.map((res, i) => {
					if (res == item) index = i;
				});
				let sd = this.selectedSpanList.splice(index, 1);
				this.selectedSpanList = JSON.parse(JSON.stringify(this.selectedSpanList));
				this.againSelectedList(sd);
			},
			// 筛选切换
			handelShowPopup(i) {
				// this.areaOpen()
				this.$emit('changeTab', true);
				this.isShowPopup = i;
				this.showStick = true;
				this.qieNum = 0;
				this.isSelective = false;
				if (i == 1) {
					this.showCity = !this.showCity;
					this.showPrice = false;
					this.showHouse = false;
					this.showMore = false;
					this.showSort = false;
					this.showTags = false;
					this.isSelective = true;
				} else if (i == 2) {
					this.showPrice = !this.showPrice;
					this.showCity = false;
					this.showHouse = false;
					this.showMore = false;
					this.showSort = false;
					this.showTags = false;
					this.isSelective = true;
					// if (!this.selectedPrice) this.selectedPrice = {};
					// this.selectedPrice.unit = [];
				} else if (i == 3) {
					this.showHouse = !this.showHouse;
					this.showCity = false;
					this.showPrice = false;
					this.showMore = false;
					this.showSort = false;
					this.showTags = false;
					this.isSelective = true;
				} else if (i == 4) {
					this.showMore = !this.showMore;
					this.showCity = false;
					this.showPrice = false;
					this.showHouse = false;
					this.showSort = false;
					this.showTags = false;
					this.isSelective = true;
				} else if (i == 5) {
					this.showSort = !this.showSort;
					this.showCity = false;
					this.showPrice = false;
					this.showHouse = false;
					this.showMore = false;
					this.showTags = false;
					this.isSelective = true;
				}
			},
			changeCodeFromUrl(data, flag) {
				this.selectAll = {};
				this.selectAllValue = {};
				let code = data.code;
				this.selectAll.areas = code ? [code] : '';
				this.selectAllValue.areas = code ? [data] : '';
				this.lightShow(this.selectAll);
				this.$emit('screenChoose', this.selectAll);
				if (!data.code) return;
				this.$store.dispatch('saveArea', Object.assign({}, data, {
					flag: true
				}));
				!flag && this.$router.push({
					path: 'houseList'
				});
			},
			changeCitycode() {
				this.selectAll = {};
				this.selectAllValue = {};
				this.lightShow(this.selectAll);
			},
			carry(value) {
				let priceText = '';
				if (value.start == '不限') {
					priceText = '不限';
				} else if (value.end > 80000) {
					priceText = this.division(value.start) + '万以上';
				} else if (value.start == 0) {
					priceText = this.division(value.end) + '万以下';
				} else {
					priceText = this.division(value.start) + '-' + this.division(value.end) + '万';
				}
				return priceText;
			},

			carry1(value) {
				let priceText = '';
				if (value.start == '不限') {
					priceText = '不限';
				} else if (value.end > 1000) {
					priceText = value.start + '万以上';
				} else if (value.start == 0) {
					priceText = value.end + '万以下';
				} else {
					priceText = value.start + '-' + value.end + '万';
				}
				return priceText;
			},

			division(value) {
				return parseFloat((value / 10000).toFixed(1));
			},
			tab(item, flag) {
				if (this.currentTabItem && this.currentTabItem.id === item.id) return;
				//只要切换  选择的清空
				!flag && this.clearChoose();
				this.currentTabItem = item;
				this.qieNum = item.id;
				item.selected = true;
				!flag && (this.chooseSelected = []);
			},
			clearChoose() {
				this.countysIndex = this.metrosIndex = this.nearbysIndex = 0;
				this.countysId = ['001'];
				this.countysId = ['001'];
				this.nearbysId = ['001'];
				this.current_area_B = [];
				this.current_area_S = [];
				this.current_metro = [];
				this.current_nearby = [];
				this.childrenList = [];
			},
			//数据请求
			areaOpen() {
				console.log('数据请求');
				this.$emit('changeTab', true);
				console.log(this.selectAll.streets, this.selectAll.areas, this.selectAll);
				if (Object.keys(this.selectAll).length > 0) {
					//区域回显
					//城市
					if (this.selectAll.streets && this.selectAll.streets.length > 0) {
						this.currentTabItem = this.areaTit[0];
						this.qieNum = this.areaTit[0].id;
						this.areaTit.map((item, index) => (index == 0 ? (item.selected = true) : (item.selected = false)));
						this.countys.map((item, index) => {
							if (item.id == this.selectAll.current_area_B[0].code) this.countysIndex = index;
						});
						this.countysId = this.selectAll.streets.slice(0);
						this.areaCur = true;
					} else if (this.selectAll.areas && this.selectAll.areas.length > 0) {
						this.qieNum = this.areaTit[0].id;
						this.areaTit.map((item, index) => (index == 0 ? (item.selected = true) : (item.selected = false)));
						this.countys.map((item, index) => {
							if (item.id == this.selectAll.areas[0]) this.countysIndex = index;
						});
						this.areaCur = true;
					} else if ((!this.selectAll.streets || this.selectAll.streets.length < 1) && (!this.selectAll.areas || this.selectAll
							.areas.length < 1)) {
						this.countysId = [];
						this.countysIndex = 0;
						this.childrenList = [];
						this.areaCur = false;
					}

					if (this.selectAll.distance && this.selectAll.metroIds.length > 0) {
						//地铁
						this.qieNum = this.areaTit[1].id;
						this.metros.map((item, index) => {
							if (item.id == this.selectAll.metroIds[0]) this.metrosIndex = index;
						});
					} else if (this.selectAll.distance) {
						//附近
						this.qieNum = this.areaTit[2].id;
						this.nearbys.map((item, index) => {
							if (item.text.indexOf(this.selectAll.distance) > -1) this.nearbysIndex = index;
						});
					} else {
						this.qieNum = this.areaTit[0].id;
						this.metrosIndex = 0;
					}
					//价格
					if (this.selectAll.totalPriceScopes && this.selectAll.totalPriceScopes.length > 0) {
						this.qieNum2 = this.priceTit[1].id;
						this.totalPrice.forEach(item => {
							let sd = this.selectAll.totalPriceScopes.filter(res => res.averagePriceEnd == item.end && res.averagePriceStart ==
								item.start);
							sd.length > 0 ? (item.selected = true) : (item.selected = false);
						});
						let l = this.selectAllValue.totalPriceScopes.filter(item => item.flag);
						if (l.length > 0) {
							this.priceShu1 = l[0].start;
							this.priceShu2 = l[0].end;
						}
					} else if (this.selectAll.averagePriceScopes && this.selectAll.averagePriceScopes.length > 0) {
						this.qieNum2 = this.priceTit[0].id;
						this.averagePrice.forEach(item => {
							let sd = this.selectAll.averagePriceScopes.filter(res => res.averagePriceEnd == item.end && res.averagePriceStart ==
								item.start);
							sd.length > 0 ? (item.selected = true) : (item.selected = false);
						});
						let l = this.selectAllValue.averagePriceScopes.filter(item => item.flag);
						if (l.length > 0) {
							this.priceShu1 = l[0].start / 10000;
							this.priceShu2 = l[0].end / 10000;
						}
					} else {
						this.priceCur = false;
						this.qieNum2 = this.priceTit[0].id;
						this.totalPrice.map((item, index) => (index == 0 ? (item.selected = true) : (item.selected = false)));
						this.averagePrice.map((item, index) => (index == 0 ? (item.selected = true) : (item.selected = false)));
					}
					//户型
					if (this.selectAll.bedrooms && this.selectAll.bedrooms.length > 0) {
						this.houseLayout.map(item => {
							let s = this.selectAll.bedrooms.filter(r => item.id == r);
							s.length > 0 ? (item.selected = true) : (item.selected = false);
						});
					} else {
						this.huxingCur = false;
						this.houseLayout.map((item, index) => (index == 0 ? (item.selected = true) : (item.selected = false)));
					}
					//更多
					if (
						(this.selectAll.areaScopes && this.selectAll.areaScopes.length > 0) ||
						(this.selectAll.propertyTypes && this.selectAll.propertyTypes.length > 0) ||
						(this.selectAll.salesStatus && this.selectAll.salesStatus.length > 0) ||
						(this.selectAll.loopLine && this.selectAll.loopLine.length > 0) ||
						(this.selectAll.decorationStatus && this.selectAll.decorationStatus.length > 0) ||
						(this.selectAll.buildingTags && this.selectAll.buildingTags.length > 0)
					) {
						this.moreCur = true;
					} else {
						this.moreCur = false;
					}
					if (this.selectAll.areaScopes && this.selectAll.areaScopes.length > 0) {
						this.buildingArea.forEach(item => {
							let s = this.selectAll.areaScopes.filter(r => r.areaStart == item.start);
							s.length > 0 ? (item.selected = true) : (item.selected = false);
						});
					} else {
						this.buildingArea.forEach(item => (item.selected = false));
					}
					if (this.selectAll.propertyTypes && this.selectAll.propertyTypes.length > 0) {
						this.propertyType.forEach(item => {
							let s = this.selectAll.propertyTypes.filter(r => r == item.key);
							s.length > 0 ? (item.selected = true) : (item.selected = false);
						});
					} else {
						this.propertyType.forEach(item => (item.selected = false));
					}
					if (this.selectAll.salesStatus && this.selectAll.salesStatus.length > 0) {
						this.salesStatus.forEach(item => {
							let s = this.selectAll.salesStatus.filter(r => r == item.key);
							s.length > 0 ? (item.selected = true) : (item.selected = false);
						});
					} else {
						this.salesStatus.forEach(item => (item.selected = false));
					}
					if (this.selectAll.loopLine && this.selectAll.loopLine.length > 0) {
						this.loopLine.forEach(item => {
							let s = this.selectAll.loopLine.filter(r => r == item.code);
							s.length > 0 ? (item.selected = true) : (item.selected = false);
						});
					} else {
						this.loopLine.forEach(item => (item.selected = false));
					}
					if (this.selectAll.decorationStatus && this.selectAll.decorationStatus.length > 0) {
						this.decorationStatus.forEach(item => {
							let s = this.selectAll.decorationStatus.filter(r => r == item.key);
							s.length > 0 ? (item.selected = true) : (item.selected = false);
						});
					} else {
						this.decorationStatus.forEach(item => (item.selected = false));
					}
					if (this.selectAll.buildingTags && this.selectAll.buildingTags.length > 0) {
						this.buildingTags.forEach(item => {
							let s = this.selectAll.buildingTags.filter(r => r == item.code);
							s.length > 0 ? (item.selected = true) : (item.selected = false);
						});
					} else {
						this.buildingTags.forEach(item => (item.selected = false));
					}
				} else {
					this.countysId = [];
					this.countysIndex = 0;
					this.metrosIndex = 0;
					this.nearbysIndex = 0;
					this.priceReset();
					this.houseReset();
					this.moreReset();
				}
			},
			//数据转换
			changeData(data) {
				let resData = [];
				data.map(item => {
					let rel = {
						text: item.title,
						id: item.code,
						check: false
					};
					if (item.childAreacode && item.childAreacode.length > 0) {
						rel.children = this.changeData(item.childAreacode);
					}
					resData.push(rel);
				});
				resData.unshift({
					text: '不限',
					id: '001',
					check: true
				});
				return resData;
			},

			onNavCountysClick(item, val) {
				console.log(item.children);
				//如果大区域是不限
				this.countysIndex = val;
				this.current_area_B = [];
				this.countysId = ['001'];
				this.current_area_S = [];

				if (val != 0) {
					this.childrenList = item.children;
				} else {
					this.childrenList = [];
					return;
				}

				this.childrenList.forEach(val => {
					this.$set(val, 'check', false);
				});
				this.childrenList[0].check = true;
				this.current_area_B.push({
					value: this.countys[val].text,
					code: this.countys[val].id
				});
			},
			onItemCountysClick(item, index) {
				const self = this;
				let check = this.childrenList[index].check;
				self.current_area_S = [];
				if (item.id == '001') {
					self.countysId = ['001'];
					self.fruitIds = [];
					self.childrenList.forEach((val, index) => {
						self.fruitIds.push((val.check = false));
					});
					self.childrenList[0].check = true;
					return;
				} else {
					if (!check) {
						self.childrenList.forEach((val, index) => {
							console.log(val.id, item.id, 1);
							if (item.id == val.id) {
								self.countysId.push(item.id);
							}
						});
						console.log(self.countysId, 101);
					} else {
						self.countysId.forEach((val, index) => {
							if (item.id == val) {
								self.countysId.splice(index, 1);
							}
						});

						console.log(self.countysId, 102);
					}
					self.childrenList[index].check = check === true ? false : true;
					self.childrenList[0].check = false;
				}

				//不限跟下面的多选  不能同时被选中
				let f;
				if ((f = self.countysId.indexOf('001')) > -1) self.countysId.splice(f, 1);
				let list = self.countys[self.countysIndex].children || [];
				console.log(list, 1147);
				console.log(self.countysId, 456);
				self.countysId.forEach(item => {
					console.log(item, 'id');
					let l = list.filter(res => res.id === item);
					console.log(l, 4566666);
					self.current_area_S.push({
						value: l[0].text,
						code: l[0].id
					});
				});
				console.log(self.current_area_S, '区');
				console.log(this.countysId, '区3');
			},
			onNavMetrosClick(item, index) {
				this.metrosIndex = index;
				this.current_metro = [];
				if (index === 0) return;
				this.current_metro.push({
					value: this.metros[index].text,
					code: this.metros[index].id
				});
			},
			onNavNearbyClick(item, val) {
				this.nearbysIndex = val;
				this.current_nearby = [];
				if (val === 0) return;
				this.current_nearby.push({
					value: this.nearbys[val].text,
					code: this.nearbys[val].id
				});
			},
			areaReset() {
				this.countysId = [];
				this.countysIndex = '';
				this.metrosIndex = '';
				this.nearbysIndex = '';
				this.current_area_S = this.current_area_B = [];
				this.current_metro = [];
				this.current_nearby = [];
				this.childrenList = [];
			},
			// 选择样式
			checkedCur(flag) {
				console.log(flag, '你好');
				if (flag == 'area') {
					if (this.selectAll.areas.length > 0 || this.selectAll.metroIds.length > 0 || this.selectAll.distance || this.selectAll
						.streets.length > 0) {
						this.areaCur = true;
					} else {
						this.areaCur = false;
						console.log('走到这1');
					}
				} else if (flag == 'price') {
					if (this.selectAll.averagePriceScopes.length > 0 || this.selectAll.totalPriceScopes.length > 0) {
						this.priceCur = true;
					} else {
						this.priceCur = false;
					}
				} else if (flag == 'huxing') {
					if (this.selectAll.bedrooms.length > 0) {
						this.huxingCur = true;
					} else {
						this.huxingCur = false;
					}
				} else if (flag == 'more') {
					if (
						this.selectAll.areaScopes.length > 0 ||
						this.selectAll.propertyTypes.length > 0 ||
						this.selectAll.salesStatus.length > 0 ||
						this.selectAll.loopLine.length > 0 ||
						this.selectAll.decorationStatus.length > 0 ||
						this.selectAll.buildingTags.length > 0
					) {
						this.moreCur = true;
					} else {
						this.moreCur = false;
					}
				}
			},
			//确认按钮，抛出选中的数据
			onAreaConfirm(flag, item) {
				let message = {};
				if (flag === 'area') {
					//区域点确定
					this.showCity = false;
					message = this.areaConfirm();
					this.checkedCur(flag);
				} else if (flag === 'price') {
					//价格
					if (this.priceShu1 || this.priceShu2) {
						if (this.priceShu1 > this.priceShu2) {
							uni.showToast({
								title: '请输入正确的价格区间',
								icon: 'none',
								duration: 1000
							});
							return;
						}
					}
					this.showPrice = false;
					message = this.priceAllConfirm();
					this.checkedCur(flag);
				} else if (flag === 'huxing') {
					this.showHouse = false;
					message = this.huxingConfirm();
					this.checkedCur(flag);
				} else if (flag === 'more') {
					this.showMore = false;
					message = this.moreChoose();
					this.checkedCur(flag);
				} else if (flag === 'sort') {
					this.showSort = false;
					message = this.sortChoose();
				}
				this.lightShow(this.selectAll);
				this.$emit('screenChoose', this.selectAll);
			},
			areaConfirm() {
				if (this.currentTabItem.id == 0) {
					//区域
					let S = this.current_area_S,
						B = this.current_area_B,
						object = {},
						Br = [];
					//区域  地铁  附近  只能显示一个
					this.selectAllValue.metroIds = '';
					this.selectAll.metroIds = '';
					this.selectAllValue.distance = '';
					this.selectAll.distance = '';

					if (S.length < 1) {
						object.B = B;
						B.map(item => Br.push(item.code));
						this.selectAll.areas = Br;
						this.selectAllValue.areas = B;
						this.selectAllValue.streets = this.selectAll.streets = [];
					} else {
						object.B = B;
						object.S = S;
						S.map(item => Br.push(item.code));
						this.selectAll.streets = Br;
						this.selectAll.current_area_B = B;
						this.selectAllValue.streets = S;
						this.selectAllValue.areas = this.selectAll.areas = [];
					}
				} else if (this.currentTabItem.id == 1) {
					this.selectAllValue.distance = this.selectAll.distance = '';
					this.selectAllValue.areas = this.selectAll.areas = '';
					this.selectAll.streets = this.selectAllValue.streets = '';

					this.selectAllValue.metroIds = this.current_metro;
					this.selectAll.metroIds = this.current_metro[0] ? [this.current_metro[0].code - 0] : [];
				} else if (this.currentTabItem.id == 2) {
					this.selectAllValue.metroIds = this.selectAll.metroIds = '';
					this.selectAllValue.areas = this.selectAll.areas = '';
					this.selectAll.streets = this.selectAllValue.streets = '';

					this.selectAllValue.distance = this.current_nearby;
					this.selectAll.distance = this.current_nearby[0] ? this.current_nearby[0].code - 0 : '';
				}
			},
			priceAllConfirm () {
			      let ob = "", array = [];
			      if (this.priceShu1 || this.priceShu2) {
			        ob = {};
			        ob.flag = "interval";
			        ob.start = this.priceShu1;
			        ob.end = this.priceShu2;
			        ob.value = this.priceShu1
			          ? (this.priceShu2 ? `${this.priceShu1}-${this.priceShu2}万` : `${this.priceShu1}万以上`) : (this.priceShu2 ? `0-${this.priceShu2}万` : '')
			      }
			      console.log(ob.value)
			      if (this.qieNum2 == 0) {//单价
			        // 单价 跟 总价  不能同时选
			        this.selectAllValue.totalPriceScopes = this.selectAll.totalPriceScopes = [];
			        let unit = this.selectedPrice.unit || [], index;
			        if (
			          !this.priceShu1 && !this.priceShu2 && unit.length < 1)
			          return (this.selectAll.averagePriceScopes = []) && (this.selectAllValue.averagePriceScopes = []);
			        ob && (ob.start = ob.start ? parseInt((ob.start - 0) * 10000) : 0) && (ob.end = ob.end ? parseInt((ob.end - 0) * 10000) : 99999999)
			        if (unit.length > 0 && (index = unit.findIndex(item => item.flag === "interval")) > -1) {
			          ob && (unit[index] = ob);
			        } else {
			          ob && unit.push(ob);
			        }
			        this.selectAllValue.averagePriceScopes = unit;
			        unit.forEach(item => {
			          array.push({
			            averagePriceStart: item.start,
			            averagePriceEnd: item.end
			          })
			        })
			        this.selectAll.averagePriceScopes = array;
			      } else if (this.qieNum2 == 1) {//总价
			        this.selectAllValue.averagePriceScopes = this.selectAll.averagePriceScopes = [];
			
			
			        let total = this.selectedPrice.total || [], index;
			        if (!this.priceShu1 && !this.priceShu2 && total.length < 1) return (this.selectAll.totalPriceScopes = []) && (this.selectAllValue.totalPriceScopes = []);
			        ob && (ob.start = ob.start ? ob.start : 0) && (ob.end = ob.end ? ob.end : 99999999)
			        if (total.length > 0 && (index = total.findIndex(item => item.flag === "interval")) > -1) {
			          ob && (total[index] = ob);
			        } else {
			          ob && total.push(ob);
			        }
			        this.selectAllValue.totalPriceScopes = total;
			        total.forEach(item => {
			          array.push({
			            averagePriceStart: item.start,
			            averagePriceEnd: item.end
			          })
			        })
			        this.selectAll.totalPriceScopes = array;
			      }
			
			    },
			huxingConfirm() {
				if (this.chooseSelectedHouse[0] && this.chooseSelectedHouse[0].length > 0) {
					let arr = [];
					this.chooseSelectedHouse[0].map(item => {
						arr.push(item.id);
					});
					this.selectAll.bedrooms = arr;
					this.selectAllValue.bedrooms = this.chooseSelectedHouse[0];
				} else {
					this.selectAll.bedrooms = [];
					this.selectAllValue.bedrooms = [];
				}
			},
			moreChoose() {
				if (this.chooseSelectedBuildingAreae && this.chooseSelectedBuildingAreae.length > 0) {
					let arr = [];
					this.chooseSelectedBuildingAreae.map(item =>
						arr.push({
							areaEnd: item.end,
							areaStart: item.start
						})
					);
					this.selectAll.areaScopes = arr;
					this.selectAllValue.areaScopes = this.chooseSelectedBuildingAreae;
				} else {
					this.selectAll.areaScopes = [];
				}
				if (this.chooseSelectedPropertyType && this.chooseSelectedPropertyType.length > 0) {
					let arr = [];
					this.chooseSelectedPropertyType.map(item => arr.push(item.key));
					this.selectAll.propertyTypes = arr;
					this.selectAllValue.propertyTypes = this.chooseSelectedPropertyType;
				} else {
					this.selectAll.propertyTypes = [];
				}
				if (this.chooseSelectedSalesStatus && this.chooseSelectedSalesStatus.length > 0) {
					let arr = [];
					this.chooseSelectedSalesStatus.map(item => arr.push(item.key));
					this.selectAll.salesStatus = arr;
					this.selectAllValue.salesStatus = this.chooseSelectedSalesStatus;
				} else {
					this.selectAll.salesStatus = [];
				}
				if (this.chooseSelectedLoopLine && this.chooseSelectedLoopLine.length > 0) {
					let arr = [];
					this.chooseSelectedLoopLine.map(item => arr.push(item.code));
					this.selectAll.loopLine = arr;
					this.selectAllValue.loopLine = this.chooseSelectedLoopLine;
				} else {
					this.selectAll.loopLine = [];
				}
				if (this.chooseSelectedDecorationStatus && this.chooseSelectedDecorationStatus.length > 0) {
					let arr = [];
					this.chooseSelectedDecorationStatus.map(item => arr.push(item.key));
					this.selectAll.decorationStatus = arr;
					this.selectAllValue.decorationStatus = this.chooseSelectedDecorationStatus;
				} else {
					this.selectAll.decorationStatus = [];
				}
				if (this.chooseSelectedBuildingTags && this.chooseSelectedBuildingTags.length > 0) {
					let arr = [];
					this.chooseSelectedBuildingTags.map(item => arr.push(item.code));
					this.selectAll.buildingTags = arr;
					this.selectAllValue.buildingTags = this.chooseSelectedBuildingTags;
				} else {
					this.selectAll.buildingTags = [];
				}
			},
			againSelectedList(sd) {
				let [{
					parent,
					value,
					code
				}] = sd;
				if (!this.selectAll[parent]) return;
				if (parent == 'averagePriceScopes' || parent == 'totalPriceScopes') {
					this.deleteValue(parent, 'averagePriceStart', 'averagePriceEnd', value, code);
				} else if (parent == 'areaScopes') {
					this.deleteValue(parent, 'areaStart', 'areaEnd', value);
				} else {
					if (this.$tool.isArray(this.selectAll[parent])) {
						let s = '',
							f1 = '';
						if ((s = this.selectAll[parent].findIndex(item => item == code || item == value)) > -1) {
							this.selectAll[parent].splice(s, 1);
							f1 = this.selectAllValue[parent].findIndex(item => item.code == code || item.key == code || item.value == code || item.id == code);
							this.selectAllValue[parent].splice(f1, 1);
						}
					} else {
						delete this.selectAll[parent];
					}
				}

				this.lightShow(this.selectAll);
				this.$emit('screenChoose', this.selectAll);
				this.areaOpen();
			},
			deleteValue(parent, dataStart, dataEnd, value) {
				let f;
				if ((f = this.selectAllValue[parent].findIndex(r => r.value == value)) > -1) {
					let data = this.selectAllValue[parent],
						start = data[f].start, 
						end = data[f].end,
						s = '';
					if (
						(s = this.selectAll[parent].findIndex(item => {
							item[dataStart] == start && item[dataEnd] == end;
						}))
					) {
						this.selectAll[parent].splice(f, 1);
						this.selectAllValue[parent].splice(f, 1);
					}
				}
			},
			//处理 显示问题 高亮问题
			lightShow(data) {
				let array = [];
				Object.keys(data).forEach(item => {
					if (this.ifCurrent(data[item])) {
						this.selectAllValue[item] &&
							this.selectAllValue[item].forEach(res => {
								array.push({
									parent: item,
									value: res.value ? (this.$tool.isArray(res.value) ? res.value[0] : res.value) : res.text || res.title,
									code: res.code || res.id || res.key
								});
							});
					}
				});
				this.selectedSpanList = array;
			},
			ifCurrent(data) {
				if (this.$tool.isArray(data)) {
					return data.length > 0;
				} else if (data) {
					return true;
				}
				return false;
			},
			//价格
			tab2(tabItem) {
				this.qieNum2 = tabItem.id;
				if (tabItem.id === 0) {
					this.priceText1 = '最低单价';
					this.priceText2 = '最高单价';
				} else {
					this.priceText1 = '最低总价';
					this.priceText2 = '最高总价';
				}
				this.priceReset();
				this.chooseSelectedPrice = [];
				if (!this.selectedPrice) this.selectedPrice = {};
				this.selectedPrice.unit = [];
				this.selectedPrice.total = [];
			},

			danChoose(e, index, flag) {
				this.selectedPrice = {};
				let item = [];
				if (index == 0) {
					this.priceReset();
					return;
				}

				if (flag == 'unit') {
					this.averagePrice.forEach((val, i) => {
						if (index != 0) {
							if (i == index) {
								val.selected = !val.selected;
								item.push(val);
							}
						}
					});
					item.value = this.carry(item[0]) || '';
					this.$set(this.averagePrice[index], 'value', item.value);
				} else {
					this.totalPrice.forEach((val, i) => {
						if (index != 0) {
							if (i == index) {
								val.selected = !val.selected;
								item.push(val);
							}
						}
					});
					item.value = this.carry1(item[0]) || '';
					this.$set(this.totalPrice[index], 'value', item.value);
				}

				if (flag === 'unit') {
					this.averagePrice[0].end === '不限' && this.$set(this.averagePrice[0], 'selected', false);
					this.selectedPrice.unit = this.averagePrice.filter(item => item.selected);
					console.log(this.selectedPrice.unit, '走到这了');
				} else if (flag === 'total') {
					this.totalPrice[0].end === '不限' && this.$set(this.totalPrice[0], 'selected', false);
					this.selectedPrice.total = this.totalPrice.filter(item => item.selected);
					console.log(this.selectedPrice.total, 1475);
				}
			},

			priceReset() {
				this.chooseSelectedPrice = [];
				this.averagePrice.forEach(val => {
					if (val.end == '不限') {
						this.$set(val, 'selected', true);
					} else {
						this.$set(val, 'selected', false);
					}
				});
				this.totalPrice.forEach(val => {
					if (val.end == '不限') {
						this.$set(val, 'selected', true);
					} else {
						this.$set(val, 'selected', false);
					}
				});
				this.priceShu1 = '';
				this.priceShu2 = '';
				this.selectedPrice = {};
			},
			//input输入框限制
			inputChange() {
				this.priceShu1 = this.priceShu1
					.replace(/[^\d.]/g, '')
					.replace(/\.{2,}/g, '.')
					.replace('.', '$#$')
					.replace(/\./g, '')
					.replace('$#$', '.')
					.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');
				this.priceShu2 = this.priceShu2
					.replace(/[^\d.]/g, '')
					.replace(/\.{2,}/g, '.')
					.replace('.', '$#$')
					.replace(/\./g, '')
					.replace('$#$', '.')
					.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');
			},

			priceConfirm() {
				if (this.priceShu1 == '') {
					this.priceShu1 = 0;
				}

				if (this.priceShu1 > this.priceShu2) {
					Toast('请输入正确的价格区间');
					return false;
				}
				if (this.priceShu2 !== '') {
					if (this.qieNum2 === 0) {
						this.chooseSelectedPrice.push({
							start: this.priceShu1,
							end: this.priceShu2,
							value: this.priceShu1 + '-' + this.priceShu2 + '万',
							type: 0
						});
					} else {
						this.chooseSelectedPrice.push({
							start: this.priceShu1,
							end: this.priceShu2,
							value: this.priceShu1 + '-' + this.priceShu2 + '万',
							type: 1
						});
					}
				}
				this.$emit('screenChoosePrice', this.chooseSelectedPrice);

				// this.$refs.priceRef.toggle();
				this.chooseSelectedPrice = [];
				this.inputNumber = {};
				this.priceShu1 = '';
				this.priceShu2 = '';
				this.priceReset();
			},

			//户型
			houseChoose(item, $event) {
				this.chooseSelectedHouse = [];
				if (item.id == 0) {
					this.houseReset();
					this.$set(item, 'selected', true);
					return;
				}
				this.$set(this.houseLayout[0], 'selected', false);
				this.houseLayout[0];
				item.selected = !item.selected;
				this.chooseSelectedHouse.push(this.houseLayout.filter(item => item.selected));
			},
			houseReset() {
				this.chooseSelectedHouse = [];
				this.houseLayout.forEach(val => {
					if (val.id === 0) {
						this.$set(val, 'selected', true);
					} else {
						this.$set(val, 'selected', false);
					}
				});
				this.chooseSelectedHouse = [];
			},
			houseConfirm() {
				// this.$refs.houseRef.toggle();
				this.$emit('screenChooseHouse', this.chooseSelectedHouse);
				this.houseReset();
			},

			//更多
			carry2(value) {
				let priceText = '';
				if (value.start == 0) {
					priceText = value.end + '㎡以下';
				} else if (value.end > 150) {
					priceText = value.start + '㎡以上';
				} else {
					priceText = value.start + '-' + value.end + '㎡';
				}
				return priceText;
			},

			buildingAreaClick(item, $event) {
				console.log(item, 1456);
				item.selected = !item.selected;
				// item.value = $event.srcElement.innerHTML;
				item.value = this.carry2(item);
				this.chooseSelectedBuildingAreae = this.buildingArea.filter(item => item.selected);
			},
			propertyTypeClick(item) {
				item.selected = !item.selected;
				this.chooseSelectedPropertyType = this.propertyType.filter(item => item.selected);
			},

			salesStatusClick(item) {
				item.selected = !item.selected;
				this.chooseSelectedSalesStatus = this.salesStatus.filter(item => item.selected);
			},
			loopLineClick(item) {
				item.selected = !item.selected;
				this.chooseSelectedLoopLine = this.loopLine.filter(item => item.selected);
			},

			decorationStatusClick(item) {
				item.selected = !item.selected;
				this.chooseSelectedDecorationStatus = this.decorationStatus.filter(item => item.selected);
			},
			buildingTagsClick(item) {
				item.selected = !item.selected;
				this.chooseSelectedBuildingTags = this.buildingTags.filter(item => item.selected);
			},
			moreReset() {
				console.log(111);
				this.buildingArea.forEach(val => {
					this.$set(val, 'selected', false);
				});
				this.buildingTags.forEach(val => {
					this.$set(val, 'selected', false);
				});
				this.propertyType.forEach(val => {
					this.$set(val, 'selected', false);
				});
				this.salesStatus.forEach(val => {
					this.$set(val, 'selected', false);
				});
				this.loopLine.forEach(val => {
					this.$set(val, 'selected', false);
				});
				this.decorationStatus.forEach(val => {
					this.$set(val, 'selected', false);
				});
				this.chooseSelectedBuildingAreae = [];
				this.chooseSelectedBuildingTags = [];
				this.chooseSelectedPropertyType = [];
				this.chooseSelectedSalesStatus = [];
				this.chooseSelectedLoopLine = [];
				this.chooseSelectedDecorationStatus = [];
			},
			moreConfirm() {
				// this.$refs.moreRef.toggle();
				this.$emit(
					'screenChooseMore',
					this.chooseSelectedBuildingAreae,
					this.chooseSelectedPropertyType,
					this.chooseSelectedSalesStatus,
					this.chooseSelectedLoopLine,
					this.chooseSelectedDecorationStatus,
					this.chooseSelectedBuildingTags
				);

				this.moreReset();
			},
			//排序
			screenSortClick(item) {
				this.showSort = false;
				this.screenSort.forEach(val => {
					this.$set(val, 'selected', false);
				});
				this.$set(item, 'selected', true);
				this.selectAll.sidx = item.sidx;
				this.selectAll.sord = item.sord;
				// this.$refs.sortRef.toggle();
				this.selectAll.listSort = 'sort';
				this.$emit('screenChoose', this.selectAll);
				this.selectAll.listSort = '';
			},
			 preventD() {
			    return
			  }
		}
	};
</script>

<style lang="scss" scoped>
	.load-bg {
		background-color: #f8f8f8;
	}

	.tospur-layout {
		.btn_arrow_top {
			border: 0;
			border-color: transparent;
			transform: rotate(0);
			opacity: 0.8;
			font-size: 14px;
			color: #d1d1d1;
			transition: all 0.5s ease-out;
			padding-left: 2px;
			vertical-align: top;
		}

		.iconshaixuan {
			font-size: 14px;
		}

		.arrow {
			color: #1989fa;
			transform: rotate(180deg);
			font-size: 14px;
		}
	}

	/* #ifndef MP-WEIXIN */
	.baidu-popup {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99999;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);


		.baidu-bg {
			background-color: #fff;


		}

		.more-bg {
			height: 100%;
		}
	}

	/*  #endif  */
	.selective {
		width: 100%;
		line-height: 88rpx;
		height: 88rpx;
		text-align: center;
		background-color: #fff;
		display: flex;

		&.line-bottom {
			border-bottom: 1px solid #f0f0f0;

		}

		.box {
			width: 20%;
			text-align: center;
		}
	}

	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	.popup-text {
		display: flex;
		line-height: 100rpx;
		flex-direction: row;

		.screen {
			padding-left: 30rpx;
			width: 100%;
		}
	}

	.popup-more {
		line-height: 50px;
		padding-top: 40rpx;
		/* #ifdef MP-WEIXIN */
		padding-bottom: 100rpx;

		/*  #endif  */
		.title {
			font-size: 32rpx;
			color: #282828;
			margin-left: 30rpx;
			font-weight: bold;
			height: 80rpx;
		}
	}

	.cur {
		color: #00a4ff;
		background-color: #fff !important;
	}

	.curs {
		color: #1989fa;
	}

	.current {
		background: #fbfbfb;
	}

	.area-text {
		width: 160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.area-layout {
		display: flex;
		flex-direction: column;
		background: #f2f2f6;
	}

	.area-qie {
		width: 100%;
		display: flex;

		&.more-ts {
			padding-bottom: 60rpx;
		}

		.scroll-view {
			width: 240rpx;
		}

		.scroll-county {
			background-color: #f7f8fa;
			padding: 0 10px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.scroll-Y {
			height: 600rpx;
		}

		.scroll-children {
			background: #fbfbfb;
			padding: 0 20rpx;

			text {
				width: 80%;
				display: inline-block;
			}
		}

		.pirce-text {
			padding: 20rpx 0 20rpx 40rpx;
			width: 100%;

			.average {
				display: inline-block;
				width: 31%;
				height: 68rpx;
				line-height: 68rpx;
				text-align: center;
				background: #f8f9fa;
				margin-top: 20rpx;
				margin-right: 2%;
			}

			.house {
				width: auto;
				padding:0 10rpx;
				min-width: 22%;
			}
		}

		.pirce-input {
			display: flex;
			text-align: center;
			height: 60rpx;
			line-height: 70rpx;
			padding: 0 0 120rpx 40rpx;

			text {
				padding: 0 10px;
			}

			.input-boder {
				border-bottom: 1px solid #f0f0f0;
				display: inline-block;
				height: 70rpx;
				border-radius: 0;
				font-size: 12px;
				width: 40%;

				.uni-input-placeholder {
					color: #cbcbcb;
				}
			}
		}
	}

	.price-qie {
		display: inline-block;
	}

	.area-iocn {}

	.areaTag {
		padding: 0 0 20rpx 40rpx;
		background-color: #fff;
		margin-right: 10rpx;
	}

	.more-button {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
		padding-top: 30px;
	}

	.areaButton {
		display: flex;
		padding-bottom: 20rpx;
		padding-top: 20rpx;
		border-top: 1px solid #f0f0f0;
		background-color: #fff;

		.reset {
			width: 70px;
			text-align: center;
		}

		.button {
			flex: 4;
			height: 80rpx;
			background: #00a4ff;
			text-align: center;
			color: #fff;
			line-height: 80rpx;
			border-radius: 80rpx;
			margin: 0 40rpx;
		}
	}

	.selectedSpanList {
		background-color: white;
		margin-top: 0px;
		overflow-y: auto;
		white-space: nowrap;
		margin-bottom: 20rpx;

		&_span {
			border-radius: 4px;
			padding: 7px 9px;
			background-color: #f3f3f3;
			margin-right: 5px;
			color: #333333;
			font-size: 12px;
			display: inline-block;
			margin: 4px 5px 10px 0;
		}

		&_span:first-child {
			margin-left: 40rpx;
		}

		&_icon {
			font-size: 12px;
			color: #ccc;
			transform: scale(0.8);
			display: inline-block;
		}
	}

	.priceText {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 0 25px;
		margin-top: 30px;

		text {
			text-align: center;
			width: 20%;
			text-align: center;
			display: inline-block;
			line-height: 25px;
		}

		input {
			border-bottom: 1px #cbcbcb solid;
			display: inline-block;
			width: 40%;
			line-height: 25px;
			text-align: center;
			border-radius: 0;
		}
	}

	.house-title {
		font-size: 32rpx;
		color: #282828;
		margin-left: 40rpx;
		font-weight: bold;

		padding-top: 60rpx;
	}
	
	.noscroll {
	  top: 0px;
	  left: 0px;
	  width: 100%;
	  height: 100%;
	  overflow: hidden;
	  position: fixed;
	  z-index: 99999;
	}
</style>

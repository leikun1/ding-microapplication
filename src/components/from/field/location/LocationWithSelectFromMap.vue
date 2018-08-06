<template>
   <div class="field">
       <label class="label">{{label}}</label>
       <div class="field has-addons has-addons-left">
           <div class="control">
               <input  class="input" :type="type" :name="name" v-model="orientation" placeholder="点击定位" @input="handInput" aria-readonly="true" disabled>
           </div>
           <div class="control">
               <button type="button" class="button" @click="handleCheck">定位</button>
           </div>
       </div>
       <template v-show="showModal">
           <div class="modal" :class="showModal?'is-active':''">
               <div class="modal-background"></div>
               <div class="modal-content" style="margin:0;height:100%;max-height:100%;">
                   <div style="height: 100%;width: 100%">
                        <div id="baiduMap" style="width: 100%;height:80vh;"></div>
                       <div style="height:20vh;width: 100%;background-color: whitesmoke">
                           <div>
                               <a class="panel-block" style="font-size: small">
                                   {{orientation}}
                               </a>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </template>
   </div>
</template>
<script>
    import {MP} from '../../../../map/map'
    import { CardModal } from '../../../../component/modal/index';
    export default {
        name: 'inputComponent',
        components: {
            CardModal
        },
        props: {
            name: {
                type: String,
                default: 'fieldName'
            },
            label: {
                type: String,
                default: 'fieldName'
            },
            value: [String, Number],
            type: {
                type: String,
                default: 'text'
            }
        },
        data(){
            return {
                currentValue:this.value,
                orientation:'',
                lng:'',
                lat:'',
                showModal: false,
            }
        },
        mounted () {
            let _this=this
            this.$nextTick(function () {
                if(_this.value!=='' && _this.value != null){
                    var locationArray1 =_this.value;
                    if(locationArray1.indexOf("|")>-1){
                        let locationArray=_this.value.split('|');
                        _this.orientation=locationArray[0];
                        _this.lng=locationArray[1];
                        _this.lat=locationArray[2];
                    }else{
                        _this.orientation=_this.value
                    }

                }
            })
        },
        computed:{

        },
        methods: {
            setCurrentValue() {
                this.currentValue = this.orientation+'|'+this.lng+'|'+this.lat;
                this.$emit('input', this.currentValue);
            },
            handInput(){
                this.$emit('input', this.currentValue);
                this.setCurrentValue();
            },
            close(){
                this.showModal = false
            },
            handleCheck(){
                let _this = this
                _this.showModal = true
                MP().then(BMap => {
                    var map = new BMap.Map("baiduMap")
                    map.addControl(new BMap.NavigationControl());
                    var point = new BMap.Point('云南');
                    var geoc = new BMap.Geocoder();
                    map.centerAndZoom(point,18);


                    // 定义一个控件类,即function
                    function ZoomControl(){
                        // 默认停靠位置和偏移量
                        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
                        this.defaultOffset = new BMap.Size(10, 10);
                    }

                    // 通过JavaScript的prototype属性继承于BMap.Control
                    ZoomControl.prototype = new BMap.Control();

                    // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
                    // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
                    ZoomControl.prototype.initialize = function(map){
                        // 创建一个DOM元素
                        var div = document.createElement("div");
                        // 添加文字说明
                        div.appendChild(document.createTextNode("确定"));
                        // 设置样式
                        div.style.size = "15px";
                        div.style.cursor = "pointer";
                        div.style.border = "1px solid gray";
                        div.style.backgroundColor = "white";
                        // 绑定事件,点击一次放大两级
                        div.onclick = function(e){
                           _this.close()
                        }
                        // 添加DOM元素到地图中
                        map.getContainer().appendChild(div);
                        // 将DOM元素返回
                        return div;
                    }
                    // 创建控件
                    var myZoomCtrl = new ZoomControl();
                    // 添加到地图当中
                    map.addControl(myZoomCtrl);





                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function(r){
                        if(this.getStatus() == BMAP_STATUS_SUCCESS){
                            var mk;
                            mk = new BMap.Marker(r.point);
                            map.addOverlay(mk);
                            map.panTo(r.point);
                            geoc.getLocation(r.point, function(rs){getLocation(r.point,rs)});

                            map.addEventListener("dragging",function(e){ // 拖拽过程中事件
                                getCenterPointAndSetOverlay()
                            })
                            map.addEventListener("dragend",function(e){// 拖拽结束触发事件
                                var centPoint = getCenterPointAndSetOverlay()
                                geoc.getLocation(centPoint, function(rs){getLocation(centPoint,rs)});
                            })
                            //获取拖拽地图的中心点并设置标注点
                            function getCenterPointAndSetOverlay(){
                                var centPoint = map.getCenter() // 获取地图中心位置
                                map.removeOverlay(mk.getLabel()); // 移除原来的标记
                                map.clearOverlays();
                                mk = new BMap.Marker(centPoint);
                                map.addOverlay(mk);
                                map.panTo(centPoint);
                                return centPoint
                            }
                            // 获取标注信息和设置获取的地址  经纬度
                            function getLocation(e,rs){
                                var addComp = rs.addressComponents;
                                var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
                                // var label = new BMap.Label(address,{offset:new BMap.Size(20,-10)});
                                // mk.setLabel(label);
                                _this.orientation = address
                                _this.lng = e.lng
                                _this.lat = e.lat
                            }
                            //获取标注信息和设置获取的地址  经纬度 END
                        } else {
                            alert('获取位置失败：'+this.getStatus());
                        }
                    },{enableHighAccuracy: true});
                    //标注拖拽后的位置


                })
            },
        },
        watch: {
            orientation(val) {
                this.setCurrentValue();
            }
        }
    }
</script>
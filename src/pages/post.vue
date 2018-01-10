<template>
    <div>
    <div class="main">
        <textarea class="question-describe" placeholder="请描述您遇到的问题" rows="5" v-model="form.questioninfo"></textarea>
        <span class="question-describe-holder">{{form.questioninfo.length}}/100</span>
        <div class="post__imgs">
            <div class="post__img" v-for="img in imgs">
                <img @click="previewImg($index)" :src="img.base64">
                <span @click="deleteImg($index)" class="post__img-del"><img src="../components/img/delete.png"/></span>
            </div>
            <div class="post__img" @click="showActions" v-if="imgs.length < imgLimit">
                <img src="../components/img/post1.png" />
            </div>
        </div>
        <div class="list-item first-item">
            <label class="item-left phone-label" @click="debug">手机号</label>
            <input type="tel" class="phone-number" placeholder="请填写手机号" v-model="form.phone">
        </div>
        <div class="list-type">
            <label class="type-label">故障类型</label>
            <span class="type-right" @click="showpicker('breaks')">
        <span>{{ form.breaks ? form.breaks : '请选择' }}</span>
            <i class="iconfont icon-keyboardarrowright"></i>
            </span>
        </div>
        <div class="list-type">
            <label class="type-label">故障区域</label>
            <span class="type-right" @click="showpicker('area')">
        <span>{{ form.area ? form.area : '请选择' }}</span>
            <i class="iconfont icon-keyboardarrowright"></i>
            </span>
        </div>
        <div class="list-item first-item" style="margin-top: 0;display:flex">
            <label class="item-left">详细地址</label>
            <textarea class="item-right text-textarea" placeholder="请填写详细地址" v-model="form.locationinfo"></textarea>
        </div>
        <div class="btn">
            <mt-button size="large" class="save-button cancel" @click="cancel">取消</mt-button>
            <mt-button size="large" type="primary" class="save-button" @click="save">提交</mt-button>
        </div>
    </div>
    <mt-popup v-model="popupVisibleBreaks" position="bottom" style="width:100%;">
        <!-- <mt-picker :slots="slots" @change="onBreakChange" :show-toolbar="true">
            <slot><span class="toolbar-btn" @click="cancelPopup">取消</span></slot>
            <slot><span class="toolbar-btn" style="float: right" @click="doOkBreaks">确定</span></slot>
        </mt-picker> -->
        <mt-picker
        showToolbar
        :columns="slots"
        @change="onBreakChange"
        @cancel="cancelPopup"
        @confirm="doOkBreaks" />
    </mt-popup>
    <mt-popup v-model="popupVisibleArea" position="bottom" style="width:100%;">
        <!-- <mt-picker :columns="slotsArea" @change="onAreaChange" :show-toolbar="true">
            <slot><span class="toolbar-btn" @click="cancelPopup">取消</span></slot>
            <slot><span class="toolbar-btn" style="float: right" @click="doOkArea">确定</span></slot>
        </mt-picker> -->
        <mt-picker
        showToolbar
        :columns="slotsArea"
        @change="onAreaChange"
        @cancel="cancelPopup"
        @confirm="doOkArea" />
    </mt-popup>
    <mt-actionsheet :actions="sheetActions" v-model="sheetVisible"></mt-actionsheet>
    </div>
    
</template>
<script>
import {
    Header,
    Indicator,
    Toast,
    Button,
    Cell,
    MessageBox,
    Picker,
    Popup,
    Actionsheet
} from 'bh-mint-ui2';
import api from '../api.js';
import cpHeader from '../components/cpHeader.vue';
var citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
};
var errTipsInfo = {
        questioninfo: '请描述您遇到的问题',
        phone: '请输入正确的手机号',
        locationinfo: '请输入详细地址',
        breaks: '请输入故障类型',
        area: '请输入报修区域'
    }
    //根据不同的类型取数据
String.prototype.getTextLen = function() {
    let len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i].match(/[^\x00-\xff]/ig) != null) len += 1;
        else len += 1;
    }
    return len
}

function validForm() {
    for (var i in this.form) {
        if (this.form[i] == '')
            return errTipsInfo[i];
        if (i == 'phone' && !this.form[i].match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
            return errTipsInfo[i];
        }
        if (i == 'questioninfo' && this.form[i].getTextLen() > 100) {
            return '问题描述字数过长'
        }
    }
    return true;
}
export default {
    created(){
        this.form.phone = this.$route.query.userPhone;
        var config = {
            left: {
                left1: {
                    title: '',
                    callFunction: function() {
                        history.back();
                    }
                }
            }
        };
        // BH_MIXIN_SDK.setNavHeader(config);
        BH_MIXIN_SDK.setTitleText('我要报修');
        api.getRepaireAreaInfo.call(this);
        if (document.querySelector('.nav-header')) {
            document.querySelector('.nav-header').style="display:none;";
        }
        if (document.querySelector('.post')) {
            document.querySelector('.post').style="display:none;";
        }
    },
    methods: {
        cancelPopup() {
            this.popupVisibleBreaks = false;
            this.popupVisibleArea = false;
        },
        doOkBreaks() {
            //alert('doOkBreaks')
            var keys = Object.keys(this.address);
            var index0 = keys.indexOf(this.tempBreak[0]);
            var index1 = this.address[this.tempBreak[0]].indexOf(this.tempBreak[1]);
            var data = [index0, index1];
            // 子类型code
            this.type.loc.val = this.mapTypeArr[String(data[0]) + String(data[1])].id;
            // name
            let column2 = this.mapTypeArr[String(data[0]) + String(data[1])].name;
            let column1 = this.GZLX[String(data[0])].name;
            if (column1 == column2) {
                this.form.breaks = column1;
            } else {
                this.form.breaks = `${column1}/${column2}`
            }
            // 父类型code
            this.type.area.val = this.GZLX[String(data[0])].id;
            this.popupVisibleBreaks = false;
        },
        onBreakChange(picker, values) {
            picker.setColumnValues(1, this.address[values[0]]);
            this.tempBreak = values;
        },
        doOkArea() {
            var keys = Object.keys(this.addressArea);
            var index0 = keys.indexOf(this.tempArea[0]);
            var index1 = this.addressArea[this.tempArea[0]].indexOf(this.tempArea[1]);
            var data = [index0, index1];
            //子类型id
            this.repair.loc.val = this.mapArr[String(data[0]) + String(data[1])].id;
            this.form.area = `${this.QYArr[String(data[0])].name}/${this.mapArr[String(data[0]) + String(data[1])].name}` //name
            this.repair.area.val = this.QYArr[String(data[0])].id;
            this.popupVisibleArea = false;
        },
        onAreaChange(picker, values) {
            picker.setColumnValues(1, this.addressArea[values[0]]);
            this.tempArea = values;
        },
        cancel() {
            history.back();
        },
        debug: function() {
            this.debugnum += 1;
            if (this.debugnum == 10) {
                this.$router.push('debug');
            }
        },
        showActions() {
            this.sheetVisible = true;
        },
        takeCamera() {
            let takeCamera = BH_MIXIN_SDK.takeCamera
            takeCamera((ret) => {
                this.imgs = this.imgs.concat(ret)
            })
            this.uploadImgType = '拍照';
        },
        takePhoto() {
            console.log('BH_MIXIN_SDK---')
            //(JSON.stringify(SDK))
            let takePhoto = BH_MIXIN_SDK.takePhoto
            takePhoto((ret) => {
                this.imgs = this.imgs.concat(ret);
            }, this.imgLimit - this.imgs.length)
            this.uploadImgType = '相册';
        },
        deleteImg(index) {
            this.imgs.splice(index, 1)
        },
        previewImg(index) {
            BH_MIXIN_SDK.preViewImages(this.imgs, index);
        },
        showpicker: function(val) {
            if (val == 'breaks') {
                this.popupVisibleBreaks = true;
            } else {
                this.popupVisibleArea = true;
            }
        },
        uploadImage() {
            if (BH_MIXIN_SDK.bh) {
                return BH_MOBILE_SDK.wisedu.uploadToEMAP(HOST, this.imgs.map(img => img.url)).then((result) => {
                    return result
                }).catch((err) => {
                    Toast('上传图片出错啦')
                    Indicator.close()
                })
            } else {
                return BH_MIXIN_SDK.uploadImgsToEmap({
                    urls: this.imgs.map(img => img.url)
                }).then((result) => {
                    return result
                }).catch((err) => {
                    alert(JSON.stringify(err));
                    Toast('上传图片出错啦')
                    Indicator.close()
                })
            }
        },
        save: function() {
            var result = validForm.call(this);
            if (result === true) {
                var options = {
                    BXRSJ: this.form.phone,
                    GZLX: this.type.loc.val,
                    BXQY: this.repair.area.val,
                    BXDD: this.repair.loc.val,
                    XXDD: this.form.locationinfo,
                    MS: this.form.questioninfo
                }
                if (this.imgs.length > 0) {
                    Indicator.open();
                    this.uploadImage().then((result) => {
                        options.TP = result.token;
                        Indicator.close();
                        api.saveRepair.call(this, options)
                    });
                } else {
                    api.saveRepair.call(this, options)
                }
            } else {
                Toast(result)
            }
        }
    },

    data() {
        return {
            debugnum: 0,
            showToolbar: true,
            form: {
                questioninfo: '',
                phone: '',
                breaks: '',
                area: '',
                locationinfo: ''
            },
            repair: {
                breaks: {
                    map: '',
                    val: ''
                },
                area: {
                    map: '',
                    val: ''
                },
                loc: {
                    map: '',
                    val: ''
                }
            },
            type: {
                breaks: {
                    map: '',
                    val: ''
                },
                area: {
                    map: '',
                    val: ''
                },
                loc: {
                    map: '',
                    val: ''
                }
            },
            changeval: '请选择',
            isshowpicker: false,
            presentPicker: '',
            returnArr: [],
            mapArr: {},
            returnTypeArr: [],
            mapTypeArr: {},
            QYArr: [],
            GZLX: [],
            imgs: [],
            actions: [{
                title: '拍照',
                action: this.takeCamera
            }, {
                title: '从相册选择',
                action: this.takePhoto
            }],
            sheetVisible: false,
            sheetActions: [{
                name: '拍照',
                method: this.takeCamera
            }, {
                name: '从相册选择',
                method: this.takePhoto
            }],
            imgLimit: 3,
            address: {},
            addressArea: {},
            popupVisibleBreaks: false,
            popupVisibleArea: false,
            // slots: [{
            //     flex: 1,
            //     values: [], //Object.keys(address)
            //     className: 'slot1',
            //     textAlign: 'center'
            // }, {
            //     divider: true,
            //     content: '-',
            //     className: 'slot2'
            // }, {
            //     flex: 1,
            //     values: [], //address[Object.keys(address)[0]]
            //     className: 'slot3',
            //     textAlign: 'center'
            // }],
            slots: [{
                //flex: 1,
                values: Object.keys(citys), //Object.keys(address)
                className: 'column1',
                //textAlign: 'center'
            }, {
                //flex: 1,
                values: citys['浙江'], //address[Object.keys(address)[0]]
                className: 'column2',
                //textAlign: 'center'
            }],
            slotsArea: [{
                flex: 1,
                values: [], //Object.keys(address)
                className: 'slot1',
                textAlign: 'center'
            }, {
                divider: true,
                content: '-',
                className: 'slot2'
            }, {
                flex: 1,
                values: [], //address[Object.keys(address)[0]]
                className: 'slot3',
                textAlign: 'center'
            }],
            tempBreak:[],
            tempArea:[]
        };
    },
    components: {
        [Header.name]: Header,
        [Button.name]: Button,
        [Cell.name]: Cell,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [Actionsheet.name]: Actionsheet,
        cpHeader
    }
}
</script>
<style scoped>
#repair-mt-header {
    background-color: #fff;
    color: #000000;
}
.main {
    & .title {
        height: 70px;
        background: #F2F2F4;
        font-size: 28px;
        color: #92969C;
        line-height: 70px;
        padding-left: 30px;
    }
    & .question-describe {
        overflow: auto;
        resize: none;
        vertical-align: top;
        width: 100%;
        height: 200px;
        font-size: 28px;
        border: none;
        padding: 15px 30px;
        box-sizing: border-box;
    }
    & .question-describe-holder {
        color: #B4B4B4;
        display: block;
        background: #fff;
        text-align: right;
        padding-right: 15px;
    }
}

.first-item {
    border-top: 1Px solid #eaeaea;
}

.list-item {
    background-color: #fff;
}

.item-left {
    display: inline-block;
    width: 25%;
    height: 100px;
    text-align: left;
    color: #403F44;
    padding-left: 30px;
    font-size: 28px;
    line-height: 100px;
}

.item-right {
    display: inline-block;
    width: 70%;
    height: 100px;
    line-height: 100px;
}

.mint-cell-text-fix {
    padding-left: 30px;
}

.text-input {
    padding: 0;
    font-size: 30px;
    border: 0;
    color: darkgrey;
    & i {
        font-size: 40px;
        float: right;
        color: #BDC0C5;
    }
}

.mint-cell {
    height: 100px;
}

.mint-cell:before {
    left: 0px;
    color: #d9d9d9;
}

.mint-cell-text {
    color: #403F44;
}

.mint-cell-value {
    color: #C2C2C2;
    font-size: 28px;
}

.picker-show {
    background-color: #fff;
    width: 100%;
    height: 350px;
    position: absolute;
    bottom: 0;
}

.picker-toolbar {
    background: #fff;
    border-bottom: 1PX solid #BABABA;
    border-top: 1PX solid #BABABA;
    & .toolbar-btn {
        height: 40PX;
        line-height: 40PX;
        color: #2196F3;
        text-align: center;
        display: inline-block;
        padding: 0PX 15PX;
        font-size: 16PX;
    }
}

.btn {
    width: 100%;
    display: flex;
    align-items: center;
    height: 120px;
    border-top: 1Px solid #E8E8E8;
}

.save-button {
    top: 20px;
    border-radius: 0;
    width: calc(50% - 52px);
    border-radius: 10px;
}

.cancel {
    margin-left: 40px;
    margin-right: 24px;
}

.post__imgs {
    padding-left: 30px;
    background-color: #fff;
    color: #eee;
    overflow: hidden;
}

.post__img {
    position: relative;
    float: left;
    width: 20%;
    box-sizing: border-box;
    margin: 10px;
}

.post__img .post__img-del {
    position: absolute;
    right: -10px;
    top: -10px;
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 30px;
    background-color: #000;
}

.post__img:after {
    content: "";
    display: block;
    padding-bottom: 100%;
}

.post__img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.text-textarea {
    overflow: auto;
    resize: none;
    vertical-align: middle;
    height: 180px;
    line-height: 1.2;
    font-size: 30px;
    border: none;
    padding: 30px 0;
    color: darkgrey;
}

.phone-label {
    position: relative;
    top: 4px;
}

.phone-number {
    display: inline-block;
    width: 62%;
    padding: 0;
    font-size: 30px;
    border: 0;
    color: darkgrey;
    height: 100px;
}

.list-type {
    border-top: 1Px solid #eaeaea;
    background-color: #fff;
    display: flex;
    min-height: 100px;
    align-items: center;
    color: #403F44;
    font-size: 28px;
    & .type-label {
        padding-left: 30px;
        flex: 0 0 auto;
        width: 25%;
    }
    & .type-right {
        width: 70%;
        position: relative;
        & span {
            display: inline-block;
            color: #BDC0C5;
            width: 90%;
        }
        & i {
            font-size: 2rem;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            color: #BDC0C5;
        }
    }
}
</style>
<style>
.mint-cell-title {
    font-size: 28px;
}
</style>

<template>
  <div class="credit-page">
        <Card title = "充值">
            <div class="item">
                <p class="title">当前余额:</p>
                <p class="content">{{balanceTotal}}</p>
            </div>
            <div class="item active">
                <p class="title">充值金额：</p>
                <el-input class="input" v-model="money" type="Number" style="width:260px" ></el-input>
            </div>
            <div class="item">
                <div class="back-btn" v-for="(item,index) in moneyData" :key="index" @click="changeMoney(item)" :class="{active:money==item}">{{item}}</div>
            </div>
        </Card>
        <Card title = "选择支付方式">
            <div class="item">
                <div class="back-btn" v-for="(item, index) in payType" :key="index" @click="changePayType(item.title,item.value)" :class="{active:valuePay==item.title}"> 
                    <img :src="item.img" alt="" class="back-img">
                    {{item.title}}
                </div>
            </div>
        </Card>
        <Button @click.native="handlePay" style="margin-top:20px">立即支付</Button>
  </div>
</template>

<script>
import Card from '@/components/card'
import Button from '@/components/button'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            moneyData:[
                50,100, 200, 500
            ],
            payType:[
                {img: require("@/assets/weixin.png"),title: '微信', value: 'wxpay'},
                {img: require("@/assets/alipay.png"),title: '支付宝', value: 'alipay'},
                {img: require("@/assets/paypal.png"),title: 'Paypal', value: 'paypal'}
            ],
            money:'',
            valuePay:'微信',
            paymentMethod:'wxpay'
        }
    },
    components:{
        Card,
        Button
    },
    computed:{
        ...mapState({
            balanceTotal: state => state.balance.balanceTotal  
        })
    },
    created(){
        this.$store.dispatch('balance/detail')
    },
    methods:{
        changeMoney(value){
            this.money = value
        },
        changePayType(value,type){
            console.log(value)
            this.valuePay = value
            this.paymentMethod = type
        },
        handlePay(){
            this.$store.dispatch('recharge/create',{amount:this.money, paymentMethod:this.paymentMethod})
        }
    }
}
</script>

<style scoped>
.back-img{
    height: 20px;
    margin-right: 10px;
}
.back-btn{
    width: 140px;
    height: 40px;
    color: #5F5F5F;
    border: 2px solid #5F5F5F;
    line-height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 20px;
    font-size: 14px;
}
.back-btn.active{
    border: 2px solid #014785;
}
p{
    padding:0px;
    margin:0px;
}
.item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
}
.title{
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 23px;
    color: #1B1B1B;
    opacity: 1;
}
.input-title{
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 23px;
    color: #1B1B1B;
    opacity: 1;
    margin-left: 10px;
}
.content{
    margin-left: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 22px;
    color: #1B1B1B;
    opacity: 1;

}
.input{
    margin-left: 40px;
}
.item.active{
    background: #F8F8F8;
    padding: 10px 20px;
    /* padding-right: 40px;  */
    width: auto;
}
</style>
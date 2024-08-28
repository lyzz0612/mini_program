"use strict";const e=require("../../common/vendor.js"),t={data:()=>({prizeTypes:["无","一秀","二举","四进","三红","对堂","状元"],activityId:"",round:1,activityName:"",participants:[],prizes:[],currentPerson:"",selectedPrizeType:"无",selectedPrize:"无",records:[]}),onLoad(t){if(!t.id)return e.index.showToast({title:"参数错误"}),void e.index.redirectTo({url:"/pages/index/index"});this.loadActivityDetail(t.id)},computed:{filteredPrizes:function(){let e=this.prizes.filter((e=>e.type===this.selectedPrizeType));return e.unshift({name:"无",amount:1e3}),e}},methods:{loadActivityDetail:function(t){const i=e.index.getStorageSync(t);if(!i)return e.index.showToast({title:"找不到该活动"}),void e.index.redirectTo({url:"/pages/index/index"});this.activityId=t,this.activityName=i.activityName,this.maxParticipants=i.maxParticipants,this.participants=i.participants||[],this.prizes=i.prizes,this.currentPerson=this.participants[0]},onPrizeCategoryChange:function(e){this.selectedPrizeType=e.detail.value,this.selectedPrize="无"},onPrizeSelect:function(e){this.selectedPrize=e.detail.value},saveResult(){this.records.push({person:this.currentPerson,prize:this.selectedPrize,prizeType:this.selectedPrizeType,round:this.round});let t=this.prizes.filter((e=>e.name==this.selectedPrize));if(t.length>0&&(t[0].amount-=1),0==this.prizes.filter((e=>e.amount>0)).length)return void e.index.showModal({content:"所有奖品都已经领完",showCancel:!1,success:()=>{let t=e.index.getStorageSync(this.activityId);t.records=this.records,e.index.setStorageSync(this.activityId,t),e.index.redirectTo({url:`/pages/activityResult/activityResult?id=${this.activityId}`})}});let i=(this.participants.indexOf(this.currentPerson)+1)%this.participants.length;0==i&&(this.round+=1),this.currentPerson=this.participants[i],this.selectedPrizeType="无",this.selectedPrize="无"}}};const i=e._export_sfc(t,[["render",function(t,i,r,s,n,a){return{a:e.t(n.round),b:e.t(n.currentPerson),c:e.f(n.prizeTypes,((t,i,r)=>({a:e.t(t),b:t,c:t===n.selectedPrizeType,d:i}))),d:e.o(((...e)=>a.onPrizeCategoryChange&&a.onPrizeCategoryChange(...e))),e:e.f(a.filteredPrizes,((t,i,r)=>({a:e.t(t.name),b:e.t(t.amount),c:0==t.amount,d:t.name,e:t.name===n.selectedPrize,f:t.name}))),f:e.o(((...e)=>a.onPrizeSelect&&a.onPrizeSelect(...e))),g:e.o(((...e)=>a.saveResult&&a.saveResult(...e))),h:e.f(n.participants,((t,i,r)=>({a:e.t(i+1),b:e.t(t),c:e.n("participant "+(t===n.currentPerson?"highlight":"")),d:i}))),i:e.f(n.records,((t,i,r)=>({a:e.t(t.round),b:e.t(t.person),c:e.t(t.prizeType),d:e.t(t.prize),e:i})))}}]]);wx.createPage(i);

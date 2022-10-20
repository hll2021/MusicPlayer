"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[801],{6801:function(e,t,n){n.r(t),n.d(t,{default:function(){return y}});var o=n(4821),i=(n(563),n(4250)),r=n(6056),l=(n(9247),n(2229)),a=(n(8228),n(3805)),c=(n(3081),n(3)),s=(n(6171),n(9420)),d=(n(2097),n(168)),u=(n(4165),n(311));const f={class:"background-wrap"},p={key:1,class:"van-multi-ellipsis--l3 recommend-title"},h={class:"res-title"};function g(e,t,n,g,m,k){const v=d.J,x=s.l,y=c.E,w=a.J,N=l.g,V=r.X,b=i.Z,B=o.a;return(0,u.openBlock)(),(0,u.createElementBlock)("div",null,[(0,u.createVNode)(x,{title:"歌单",fixed:"","z-index":"10",onClickLeft:t[0]||(t[0]=t=>e.$router.back())},{left:(0,u.withCtx)((()=>[(0,u.createVNode)(v,{name:"arrow-left",color:"#8648D3",size:"0.48rem"})])),_:1}),(0,u.createElementVNode)("div",f,[(0,u.createElementVNode)("div",{class:"background",style:(0,u.normalizeStyle)(`background-image: url(${m.picUrl})`)},null,4)]),(0,u.createVNode)(V,{class:"title-wrap"},{default:(0,u.withCtx)((()=>[(0,u.createVNode)(w,{class:"cover-img",span:"8",offset:"1"},{default:(0,u.withCtx)((()=>[(0,u.createVNode)(y,{width:"100%",height:"3.5rem",fit:"cover",src:m.picUrl},null,8,["src"])])),_:1}),(0,u.createVNode)(w,{class:"title",span:"12",offset:"1"},{default:(0,u.withCtx)((()=>[(0,u.createTextVNode)((0,u.toDisplayString)(m.title)+" ",1),0===this.playlist.length?((0,u.openBlock)(),(0,u.createBlock)(N,{key:0,class:"loading"},{default:(0,u.withCtx)((()=>[(0,u.createTextVNode)(" 加载中... ")])),_:1})):((0,u.openBlock)(),(0,u.createElementBlock)("p",p,[(0,u.createTextVNode)("推荐歌曲: "),((0,u.openBlock)(!0),(0,u.createElementBlock)(u.Fragment,null,(0,u.renderList)(m.playlist,((e,t)=>((0,u.openBlock)(),(0,u.createElementBlock)("span",{key:t}," 《"+(0,u.toDisplayString)(e.name)+"》 ",1)))),128))]))])),_:1})])),_:1}),(0,u.createVNode)(B,{loading:m.loading,"onUpdate:loading":t[1]||(t[1]=e=>m.loading=e),finished:m.finished,"finished-text":"没有更多了",onLoad:k.onLoad},{default:(0,u.withCtx)((()=>[(0,u.createElementVNode)("p",h,[(0,u.createVNode)(v,{color:"#8648D3",name:"smile-o",size:"0.48rem"}),(0,u.createTextVNode)(" 全部歌曲 ")]),((0,u.openBlock)(!0),(0,u.createElementBlock)(u.Fragment,null,(0,u.renderList)(m.playlist,((e,t)=>((0,u.openBlock)(),(0,u.createBlock)(b,{key:e.id,index:t,name:e.name,author:e.ar[0].name,id:e.id,"pic-url":e.al.picUrl},null,8,["index","name","author","id","pic-url"])))),128))])),_:1},8,["loading","finished","onLoad"])])}var m=n(8737),k={data(){return{id:this.$route.query.id,picUrl:this.$route.query.picUrl,title:this.$route.query.title,playlist:[],page:1,loading:!1,finished:!1}},name:"playlist-view",created(){this.getSongs()},methods:{async getSongs(){const e=await(0,m.QY)({id:this.id,limit:10,offset:10*(this.page-1),realIP:"116.25.146.177"});this.playlist=e.data.songs.filter((e=>8===e.fee||0===e.fee&&!e.noCopyrightRcmd))},async onLoad(){this.page++;const e=await(0,m.QY)({id:this.id,limit:10,offset:10*(this.page-1)});0===e.data.songs.length?(this.finished=!0,this.loading=!1):(this.playlist.push(...e.data.songs.filter((e=>8===e.fee||0===e.fee))),this.loading=!1)}},components:{SongItem:i.Z}},v=n(7477);const x=(0,v.Z)(k,[["render",g]]);var y=x},3444:function(e,t,n){n.d(t,{F:function(){return r}});var o=n(311),i=n(2220);function r(e){const t=(0,o.getCurrentInstance)();t&&(0,i.l7)(t.proxy,e)}},4821:function(e,t,n){n.d(t,{a:function(){return v}});var o=n(1404),i=n(311),r=n(610),l=n(5323),a=n(7936),c=n(253),s=n(3444);const d=Symbol(),u=()=>(0,i.inject)(d,null);var f=n(2229);const[p,h,g]=(0,r["do"])("list"),m={error:Boolean,offset:(0,l.SI)(300),loading:Boolean,finished:Boolean,errorText:String,direction:(0,l.SQ)("down"),loadingText:String,finishedText:String,immediateCheck:l.J5};var k=(0,i.defineComponent)({name:p,props:m,emits:["load","update:error","update:loading"],setup(e,t){let{emit:n,slots:o}=t;const r=(0,i.ref)(!1),l=(0,i.ref)(),d=(0,i.ref)(),p=u(),m=(0,c.eo)(l),k=()=>{(0,i.nextTick)((()=>{if(r.value||e.finished||e.error||!1===(null==p?void 0:p.value))return;const{offset:t,direction:o}=e,i=(0,c.EL)(m);if(!i.height||(0,a.xj)(l))return;let s=!1;const u=(0,c.EL)(d);s="up"===o?i.top-u.top<=t:u.bottom-i.bottom<=t,s&&(r.value=!0,n("update:loading",!0),n("load"))}))},v=()=>{if(e.finished){const t=o.finished?o.finished():e.finishedText;if(t)return(0,i.createVNode)("div",{class:h("finished-text")},[t])}},x=()=>{n("update:error",!1),k()},y=()=>{if(e.error){const t=o.error?o.error():e.errorText;if(t)return(0,i.createVNode)("div",{role:"button",class:h("error-text"),tabindex:0,onClick:x},[t])}},w=()=>{if(r.value&&!e.finished)return(0,i.createVNode)("div",{class:h("loading")},[o.loading?o.loading():(0,i.createVNode)(f.g,{class:h("loading-icon")},{default:()=>[e.loadingText||g("loading")]})])};return(0,i.watch)((()=>[e.loading,e.finished,e.error]),k),p&&(0,i.watch)(p,(e=>{e&&k()})),(0,i.onUpdated)((()=>{r.value=e.loading})),(0,i.onMounted)((()=>{e.immediateCheck&&k()})),(0,s.F)({check:k}),(0,c.OR)("scroll",k,{target:m,passive:!0}),()=>{var t;const n=null==(t=o.default)?void 0:t.call(o),a=(0,i.createVNode)("div",{ref:d,class:h("placeholder")},null);return(0,i.createVNode)("div",{ref:l,role:"feed",class:h(),"aria-busy":r.value},["down"===e.direction?n:a,w(),v(),y(),"up"===e.direction?n:a])}}});const v=(0,o.n)(k)},563:function(e,t,n){n(1958),n(2939)},7936:function(e,t,n){n.d(t,{PF:function(){return f},kn:function(){return c},oD:function(){return a},pe:function(){return d},xj:function(){return p}});var o=n(253),i=n(311),r=n(6491);function l(e,t){"scrollTop"in e?e.scrollTop=t:e.scrollTo(e.scrollX,t)}function a(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}function c(e){l(window,e),l(document.body,e)}const s=(0,r.gn)();function d(){s&&c(a())}const u=e=>e.stopPropagation();function f(e,t){("boolean"!==typeof e.cancelable||e.cancelable)&&e.preventDefault(),t&&u(e)}function p(e){const t=(0,i.unref)(e);if(!t)return!1;const n=window.getComputedStyle(t),o="none"===n.display,r=null===t.offsetParent&&"fixed"!==n.position;return o||r}const{width:h,height:g}=(0,o.iP)()}}]);
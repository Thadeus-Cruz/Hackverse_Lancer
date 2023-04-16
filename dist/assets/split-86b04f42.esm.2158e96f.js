import{C as p,_ as n,a as h,a1 as l,b as u,h as w,G as g,f as m,j as W,B as d,a2 as v,a3 as C,a4 as b}from"./index.5836337d.js";class o{get chainId(){return this._chainId}constructor(t,a,r){let e=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,i=arguments.length>5?arguments[5]:void 0,c=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new p(t,a,s,e);n(this,"contractWrapper",void 0),n(this,"storage",void 0),n(this,"abi",void 0),n(this,"metadata",void 0),n(this,"encoder",void 0),n(this,"estimator",void 0),n(this,"events",void 0),n(this,"roles",void 0),n(this,"interceptor",void 0),n(this,"_chainId",void 0),this._chainId=i,this.abi=s,this.contractWrapper=c,this.storage=r,this.metadata=new h(this.contractWrapper,l,this.storage),this.roles=new u(this.contractWrapper,o.contractRoles),this.encoder=new w(this.contractWrapper),this.estimator=new g(this.contractWrapper),this.events=new m(this.contractWrapper),this.interceptor=new W(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async getAllRecipients(){const t=[];let a=d.from(0);const r=await this.contractWrapper.readContract.payeeCount();for(;a.lt(r);)try{const e=await this.contractWrapper.readContract.payee(a);t.push(await this.getRecipientSplitPercentage(e)),a=a.add(1)}catch(e){if("method"in e&&e.method.toLowerCase().includes("payee(uint256)"))break;throw e}return t}async balanceOfAllRecipients(){const t=await this.getAllRecipients(),a={};for(const r of t)a[r.address]=await this.balanceOf(r.address);return a}async balanceOfTokenAllRecipients(t){const a=await this.getAllRecipients(),r={};for(const e of a)r[e.address]=await this.balanceOfToken(e.address,t);return r}async balanceOf(t){const a=await this.contractWrapper.readContract.provider.getBalance(this.getAddress()),r=await this.contractWrapper.readContract["totalReleased()"](),e=a.add(r);return this._pendingPayment(t,e,await this.contractWrapper.readContract["released(address)"](t))}async balanceOfToken(t,a){const e=await new v(a,C,this.contractWrapper.getProvider()).balanceOf(this.getAddress()),s=await this.contractWrapper.readContract["totalReleased(address)"](a),i=e.add(s),c=await this._pendingPayment(t,i,await this.contractWrapper.readContract["released(address,address)"](a,t));return await b(this.contractWrapper.getProvider(),a,c)}async getRecipientSplitPercentage(t){const[a,r]=await Promise.all([this.contractWrapper.readContract.totalShares(),this.contractWrapper.readContract.shares(t)]);return{address:t,splitPercentage:r.mul(d.from(1e7)).div(a).toNumber()/1e5}}async withdraw(t){return{receipt:await this.contractWrapper.sendTransaction("release(address)",[t])}}async withdrawToken(t,a){return{receipt:await this.contractWrapper.sendTransaction("release(address,address)",[a,t])}}async distribute(){return{receipt:await this.contractWrapper.sendTransaction("distribute()",[])}}async distributeToken(t){return{receipt:await this.contractWrapper.sendTransaction("distribute(address)",[t])}}async _pendingPayment(t,a,r){return a.mul(await this.contractWrapper.readContract.shares(t)).div(await this.contractWrapper.readContract.totalShares()).sub(r)}async call(t){for(var a=arguments.length,r=new Array(a>1?a-1:0),e=1;e<a;e++)r[e-1]=arguments[e];return this.contractWrapper.call(t,...r)}}n(o,"contractRoles",["admin"]);export{o as Split};

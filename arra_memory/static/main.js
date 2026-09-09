var nL=Object.create;var{getPrototypeOf:oL,defineProperty:pH,getOwnPropertyNames:aL}=Object;var rL=Object.prototype.hasOwnProperty;function tL(J){return this[J]}var eL,JB,W$=(J,Z,W)=>{var Q=J!=null&&typeof J==="object";if(Q){var Y=Z?eL??=new WeakMap:JB??=new WeakMap,X=Y.get(J);if(X)return X}W=J!=null?nL(oL(J)):{};let H=Z||!J||!J.__esModule?pH(W,"default",{value:J,enumerable:!0}):W;for(let U of aL(J))if(!rL.call(H,U))pH(H,U,{get:tL.bind(J,U),enumerable:!0});if(Q)Y.set(J,H);return H};var Q$=(J,Z)=>()=>(Z||J((Z={exports:{}}).exports,Z),Z.exports);var ZB=(J)=>J;function WB(J,Z){this[J]=ZB.bind(null,Z)}var Y$=(J,Z)=>{for(var W in Z)pH(J,W,{get:Z[W],enumerable:!0,configurable:!0,set:WB.bind(Z,W)})};var XY=(J,Z)=>()=>(J&&(Z=J(J=0)),Z);function kW(J,Z,W){this.props=J,this.context=Z,this.refs=H$,this.updater=W||X$}function U$(){}function G$(J,Z,W){this.props=J,this.context=Z,this.refs=H$,this.updater=W||X$}var QB,X$,YB,H$,dH,XZ,uH,CW,y7=function(J,Z){return XZ.H.useCallback(J,Z)},c0=function(J,Z){return XZ.H.useEffect(J,Z)},VW=function(J,Z){return XZ.H.useMemo(J,Z)},r7=function(J){return XZ.H.useRef(J)},G0=function(J){return XZ.H.useState(J)},lH="19.2.8";var W7=XY(()=>{QB=Symbol.for("react.strict_mode"),X$={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},YB=Object.assign,H$={};kW.prototype.isReactComponent={};kW.prototype.setState=function(J,Z){if(typeof J!=="object"&&typeof J!=="function"&&J!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,J,Z,"setState")};kW.prototype.forceUpdate=function(J){this.updater.enqueueForceUpdate(this,J,"forceUpdate")};U$.prototype=kW.prototype;dH=G$.prototype=new U$;dH.constructor=G$;YB(dH,kW.prototype);dH.isPureReactComponent=!0;XZ={H:null,A:null,T:null,S:null};uH=QB,CW=XZ});function iH(J,Z){var W=J.length;J.push(Z);J:for(;0<W;){var Q=W-1>>>1,Y=J[Q];if(0<HY(Y,Z))J[Q]=Z,J[W]=Y,W=Q;else break J}}function C6(J){return J.length===0?null:J[0]}function $Y(J){if(J.length===0)return null;var Z=J[0],W=J.pop();if(W!==Z){J[0]=W;J:for(var Q=0,Y=J.length,X=Y>>>1;Q<X;){var H=2*(Q+1)-1,U=J[H],G=H+1,K=J[G];if(0>HY(U,W))G<Y&&0>HY(K,U)?(J[Q]=K,J[G]=W,Q=G):(J[Q]=U,J[H]=W,Q=H);else if(G<Y&&0>HY(K,W))J[Q]=K,J[G]=W,Q=G;else break J}}return Z}function HY(J,Z){var W=J.sortIndex-Z.sortIndex;return W!==0?W:J.id-Z.id}function KY(J){for(var Z=C6(_8);Z!==null;){if(Z.callback===null)$Y(_8);else if(Z.startTime<=J)$Y(_8),Z.sortIndex=Z.expirationTime,iH(p6,Z);else break;Z=C6(_8)}}function tH(J){if(PW=!1,KY(J),!TW)if(C6(p6)!==null)TW=!0,UZ||(UZ=!0,HZ());else{var Z=C6(_8);Z!==null&&eH(tH,Z.startTime-J)}}function F$(){return rH?!0:V6()-R$<HB?!1:!0}function cH(){if(rH=!1,UZ){var J=V6();R$=J;var Z=!0;try{J:{TW=!1,PW&&(PW=!1,O$(EW),EW=-1),oH=!0;var W=GY;try{Z:{KY(J);for(t7=C6(p6);t7!==null&&!(t7.expirationTime>J&&F$());){var Q=t7.callback;if(typeof Q==="function"){t7.callback=null,GY=t7.priorityLevel;var Y=Q(t7.expirationTime<=J);if(J=V6(),typeof Y==="function"){t7.callback=Y,KY(J),Z=!0;break Z}t7===C6(p6)&&$Y(p6),KY(J)}else $Y(p6);t7=C6(p6)}if(t7!==null)Z=!0;else{var X=C6(_8);X!==null&&eH(tH,X.startTime-J),Z=!1}}break J}finally{t7=null,GY=W,oH=!1}Z=void 0}}finally{Z?HZ():UZ=!1}}}function eH(J,Z){EW=$$(function(){J(V6())},Z)}var V6=void 0,sH,UY,nH,p6,_8,XB=1,t7=null,GY=3,oH=!1,TW=!1,PW=!1,rH=!1,$$,O$,q$,UZ=!1,EW=-1,HB=5,R$=-1,HZ,qY,aH,JU=5,ZU=1,WU=4,GZ=3,QU=2,YU=function(J){J.callback=null},XU=function(){return GY},HU=function(){rH=!0},KZ=function(J,Z,W){var Q=V6();switch(typeof W==="object"&&W!==null?(W=W.delay,W=typeof W==="number"&&0<W?Q+W:Q):W=Q,J){case 1:var Y=-1;break;case 2:Y=250;break;case 5:Y=1073741823;break;case 4:Y=1e4;break;default:Y=5000}return Y=W+Y,J={id:XB++,callback:Z,priorityLevel:J,startTime:W,expirationTime:Y,sortIndex:-1},W>Q?(J.sortIndex=W,iH(_8,J),C6(p6)===null&&J===C6(_8)&&(PW?(O$(EW),EW=-1):PW=!0,eH(tH,W-Q))):(J.sortIndex=Y,iH(p6,J),TW||oH||(TW=!0,UZ||(UZ=!0,HZ()))),J},UU;var M$=XY(()=>{if(typeof performance==="object"&&typeof performance.now==="function")sH=performance,V6=function(){return sH.now()};else UY=Date,nH=UY.now(),V6=function(){return UY.now()-nH};p6=[],_8=[],$$=typeof setTimeout==="function"?setTimeout:null,O$=typeof clearTimeout==="function"?clearTimeout:null,q$=typeof setImmediate<"u"?setImmediate:null;if(typeof q$==="function")HZ=function(){q$(cH)};else if(typeof MessageChannel<"u")qY=new MessageChannel,aH=qY.port2,qY.port1.onmessage=cH,HZ=function(){aH.postMessage(null)};else HZ=function(){$$(cH,0)};UU=F$});var GU={};Y$(GU,{version:()=>E$,useFormStatus:()=>P$,useFormState:()=>T$,unstable_batchedUpdates:()=>V$,requestFormReset:()=>C$,preloadModule:()=>k$,preload:()=>D$,preinitModule:()=>w$,preinit:()=>I$,prefetchDNS:()=>_$,preconnect:()=>A$,flushSync:()=>z$,createPortal:()=>B$,__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE:()=>L$});function N$(J){var Z="https://react.dev/errors/"+J;if(1<arguments.length){Z+="?args[]="+encodeURIComponent(arguments[1]);for(var W=2;W<arguments.length;W++)Z+="&args[]="+encodeURIComponent(arguments[W])}return"Minified React error #"+J+"; visit "+Z+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function I8(){}function KB(J,Z,W){var Q=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:GB,key:Q==null?null:""+Q,children:J,containerInfo:Z,implementation:W}}function OY(J,Z){if(J==="font")return"";if(typeof Z==="string")return Z==="use-credentials"?Z:""}var z7,GB,SW,L$,B$=function(J,Z){var W=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Z||Z.nodeType!==1&&Z.nodeType!==9&&Z.nodeType!==11)throw Error(N$(299));return KB(J,Z,null,W)},z$=function(J){var Z=SW.T,W=z7.p;try{if(SW.T=null,z7.p=2,J)return J()}finally{SW.T=Z,z7.p=W,z7.d.f()}},A$=function(J,Z){typeof J==="string"&&(Z?(Z=Z.crossOrigin,Z=typeof Z==="string"?Z==="use-credentials"?Z:"":void 0):Z=null,z7.d.C(J,Z))},_$=function(J){typeof J==="string"&&z7.d.D(J)},I$=function(J,Z){if(typeof J==="string"&&Z&&typeof Z.as==="string"){var W=Z.as,Q=OY(W,Z.crossOrigin),Y=typeof Z.integrity==="string"?Z.integrity:void 0,X=typeof Z.fetchPriority==="string"?Z.fetchPriority:void 0;W==="style"?z7.d.S(J,typeof Z.precedence==="string"?Z.precedence:void 0,{crossOrigin:Q,integrity:Y,fetchPriority:X}):W==="script"&&z7.d.X(J,{crossOrigin:Q,integrity:Y,fetchPriority:X,nonce:typeof Z.nonce==="string"?Z.nonce:void 0})}},w$=function(J,Z){if(typeof J==="string")if(typeof Z==="object"&&Z!==null){if(Z.as==null||Z.as==="script"){var W=OY(Z.as,Z.crossOrigin);z7.d.M(J,{crossOrigin:W,integrity:typeof Z.integrity==="string"?Z.integrity:void 0,nonce:typeof Z.nonce==="string"?Z.nonce:void 0})}}else Z==null&&z7.d.M(J)},D$=function(J,Z){if(typeof J==="string"&&typeof Z==="object"&&Z!==null&&typeof Z.as==="string"){var W=Z.as,Q=OY(W,Z.crossOrigin);z7.d.L(J,W,{crossOrigin:Q,integrity:typeof Z.integrity==="string"?Z.integrity:void 0,nonce:typeof Z.nonce==="string"?Z.nonce:void 0,type:typeof Z.type==="string"?Z.type:void 0,fetchPriority:typeof Z.fetchPriority==="string"?Z.fetchPriority:void 0,referrerPolicy:typeof Z.referrerPolicy==="string"?Z.referrerPolicy:void 0,imageSrcSet:typeof Z.imageSrcSet==="string"?Z.imageSrcSet:void 0,imageSizes:typeof Z.imageSizes==="string"?Z.imageSizes:void 0,media:typeof Z.media==="string"?Z.media:void 0})}},k$=function(J,Z){if(typeof J==="string")if(Z){var W=OY(Z.as,Z.crossOrigin);z7.d.m(J,{as:typeof Z.as==="string"&&Z.as!=="script"?Z.as:void 0,crossOrigin:W,integrity:typeof Z.integrity==="string"?Z.integrity:void 0})}else z7.d.m(J)},C$=function(J){z7.d.r(J)},V$=function(J,Z){return J(Z)},T$=function(J,Z,W){return SW.H.useFormState(J,Z,W)},P$=function(){return SW.H.useHostTransitionStatus()},E$="19.2.8";var S$=XY(()=>{W7();z7={d:{f:I8,r:function(){throw Error(N$(522))},D:I8,C:I8,L:I8,m:I8,X:I8,S:I8,M:I8},p:0,findDOMNode:null},GB=Symbol.for("react.portal");SW=CW;L$=z7});var b$=Q$((fk,f$)=>{S$();function j$(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=="function")return;try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(j$)}catch(J){console.error(J)}}j$(),f$.exports=GU});var bK={};Y$(bK,{version:()=>iF,hydrateRoot:()=>cF,createRoot:()=>lF});function J0(J){var Z="https://react.dev/errors/"+J;if(1<arguments.length){Z+="?args[]="+encodeURIComponent(arguments[1]);for(var W=2;W<arguments.length;W++)Z+="&args[]="+encodeURIComponent(arguments[W])}return"Minified React error #"+J+"; visit "+Z+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function XO(J){return!(!J||J.nodeType!==1&&J.nodeType!==9&&J.nodeType!==11)}function AQ(J){var Z=J,W=J;if(J.alternate)for(;Z.return;)Z=Z.return;else{J=Z;do Z=J,(Z.flags&4098)!==0&&(W=Z.return),J=Z.return;while(J)}return Z.tag===3?W:null}function HO(J){if(J.tag===13){var Z=J.memoizedState;if(Z===null&&(J=J.alternate,J!==null&&(Z=J.memoizedState)),Z!==null)return Z.dehydrated}return null}function UO(J){if(J.tag===31){var Z=J.memoizedState;if(Z===null&&(J=J.alternate,J!==null&&(Z=J.memoizedState)),Z!==null)return Z.dehydrated}return null}function y$(J){if(AQ(J)!==J)throw Error(J0(188))}function qB(J){var Z=J.alternate;if(!Z){if(Z=AQ(J),Z===null)throw Error(J0(188));return Z!==J?null:J}for(var W=J,Q=Z;;){var Y=W.return;if(Y===null)break;var X=Y.alternate;if(X===null){if(Q=Y.return,Q!==null){W=Q;continue}break}if(Y.child===X.child){for(X=Y.child;X;){if(X===W)return y$(Y),J;if(X===Q)return y$(Y),Z;X=X.sibling}throw Error(J0(188))}if(W.return!==Q.return)W=Y,Q=X;else{for(var H=!1,U=Y.child;U;){if(U===W){H=!0,W=Y,Q=X;break}if(U===Q){H=!0,Q=Y,W=X;break}U=U.sibling}if(!H){for(U=X.child;U;){if(U===W){H=!0,W=X,Q=Y;break}if(U===Q){H=!0,Q=X,W=Y;break}U=U.sibling}if(!H)throw Error(J0(189))}}if(W.alternate!==Q)throw Error(J0(190))}if(W.tag!==3)throw Error(J0(188));return W.stateNode.current===W?J:Z}function GO(J){var Z=J.tag;if(Z===5||Z===26||Z===27||Z===6)return J;for(J=J.child;J!==null;){if(Z=GO(J),Z!==null)return Z;J=J.sibling}return null}function jW(J){if(J===null||typeof J!=="object")return null;return J=v$&&J[v$]||J["@@iterator"],typeof J==="function"?J:null}function cU(J){if(J==null)return null;if(typeof J==="function")return J.$$typeof===RB?null:J.displayName||J.name||null;if(typeof J==="string")return J;switch(J){case MZ:return"Fragment";case pU:return"Profiler";case KO:return"StrictMode";case dU:return"Suspense";case uU:return"SuspenseList";case lU:return"Activity"}if(typeof J==="object")switch(J.$$typeof){case hW:return"Portal";case o6:return J.displayName||"Context";case qO:return(J._context.displayName||"Context")+".Consumer";case hG:var Z=J.render;return J=J.displayName,J||(J=Z.displayName||Z.name||"",J=J!==""?"ForwardRef("+J+")":"ForwardRef"),J;case gG:return Z=J.displayName||null,Z!==null?Z:cU(J.type)||"Memo";case w8:Z=J._payload,J=J._init;try{return cU(J(Z))}catch(W){}}return null}function j6(J){return{current:J}}function X7(J){0>NZ||(J.current=iU[NZ],iU[NZ]=null,NZ--)}function CJ(J,Z){NZ++,iU[NZ]=J.current,J.current=Z}function lY(J,Z){switch(CJ(b8,Z),CJ(HQ,J),CJ(S6,null),Z.nodeType){case 9:case 11:J=(J=Z.documentElement)?(J=J.namespaceURI)?p1(J):0:0;break;default:if(J=Z.tagName,Z=Z.namespaceURI)Z=p1(Z),J=EF(Z,J);else switch(J){case"svg":J=1;break;case"math":J=2;break;default:J=0}}X7(S6),CJ(S6,J)}function bZ(){X7(S6),X7(HQ),X7(b8)}function sU(J){J.memoizedState!==null&&CJ(uY,J);var Z=S6.current,W=EF(Z,J.type);Z!==W&&(CJ(HQ,J),CJ(S6,W))}function cY(J){HQ.current===J&&(X7(S6),X7(HQ)),uY.current===J&&(X7(uY),LQ._currentValue=N9)}function $9(J){if(KU===void 0)try{throw Error()}catch(W){var Z=W.stack.trim().match(/\n( *(at )?)/);KU=Z&&Z[1]||"",x$=-1<W.stack.indexOf(`
    at`)?" (<anonymous>)":-1<W.stack.indexOf("@")?"@unknown:0:0":""}return`
`+KU+J+x$}function $U(J,Z){if(!J||qU)return"";qU=!0;var W=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var Q={DetermineComponentFrameRoot:function(){try{if(Z){var F=function(){throw Error()};if(Object.defineProperty(F.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==="object"&&Reflect.construct){try{Reflect.construct(F,[])}catch(R){var q=R}Reflect.construct(J,[],F)}else{try{F.call()}catch(R){q=R}J.call(F.prototype)}}else{try{throw Error()}catch(R){q=R}(F=J())&&typeof F.catch==="function"&&F.catch(function(){})}}catch(R){if(R&&q&&typeof R.stack==="string")return[R.stack,q.stack]}return[null,null]}};Q.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var Y=Object.getOwnPropertyDescriptor(Q.DetermineComponentFrameRoot,"name");Y&&Y.configurable&&Object.defineProperty(Q.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var X=Q.DetermineComponentFrameRoot(),H=X[0],U=X[1];if(H&&U){var G=H.split(`
`),K=U.split(`
`);for(Y=Q=0;Q<G.length&&!G[Q].includes("DetermineComponentFrameRoot");)Q++;for(;Y<K.length&&!K[Y].includes("DetermineComponentFrameRoot");)Y++;if(Q===G.length||Y===K.length)for(Q=G.length-1,Y=K.length-1;1<=Q&&0<=Y&&G[Q]!==K[Y];)Y--;for(;1<=Q&&0<=Y;Q--,Y--)if(G[Q]!==K[Y]){if(Q!==1||Y!==1)do if(Q--,Y--,0>Y||G[Q]!==K[Y]){var O=`
`+G[Q].replace(" at new "," at ");return J.displayName&&O.includes("<anonymous>")&&(O=O.replace("<anonymous>",J.displayName)),O}while(1<=Q&&0<=Y);break}}}finally{qU=!1,Error.prepareStackTrace=W}return(W=J?J.displayName||J.name:"")?$9(W):""}function FB(J,Z){switch(J.tag){case 26:case 27:case 5:return $9(J.type);case 16:return $9("Lazy");case 13:return J.child!==Z&&Z!==null?$9("Suspense Fallback"):$9("Suspense");case 19:return $9("SuspenseList");case 0:case 15:return $U(J.type,!1);case 11:return $U(J.type.render,!1);case 1:return $U(J.type,!0);case 31:return $9("Activity");default:return""}}function h$(J){try{var Z="",W=null;do Z+=FB(J,W),W=J,J=J.return;while(J);return Z}catch(Q){return`
Error generating stack: `+Q.message+`
`+Q.stack}}function P8(J){if(typeof zB==="function"&&AB(J),p7&&typeof p7.setStrictMode==="function")try{p7.setStrictMode(_Q,J)}catch(Z){}}function wB(J){return J>>>=0,J===0?32:31-(_B(J)/IB|0)|0}function O9(J){var Z=J&42;if(Z!==0)return Z;switch(J&-J){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return J&261888;case 262144:case 524288:case 1048576:case 2097152:return J&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return J&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return J}}function BX(J,Z,W){var Q=J.pendingLanes;if(Q===0)return 0;var Y=0,X=J.suspendedLanes,H=J.pingedLanes;J=J.warmLanes;var U=Q&134217727;return U!==0?(Q=U&~X,Q!==0?Y=O9(Q):(H&=U,H!==0?Y=O9(H):W||(W=U&~J,W!==0&&(Y=O9(W))))):(U=Q&~X,U!==0?Y=O9(U):H!==0?Y=O9(H):W||(W=Q&~J,W!==0&&(Y=O9(W)))),Y===0?0:Z!==0&&Z!==Y&&(Z&X)===0&&(X=Y&-Y,W=Z&-Z,X>=W||X===32&&(W&4194048)!==0)?Z:Y}function IQ(J,Z){return(J.pendingLanes&~(J.suspendedLanes&~J.pingedLanes)&Z)===0}function DB(J,Z){switch(J){case 1:case 2:case 4:case 8:case 64:return Z+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return Z+5000;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function FO(){var J=NY;return NY<<=1,(NY&62914560)===0&&(NY=4194304),J}function RU(J){for(var Z=[],W=0;31>W;W++)Z.push(J);return Z}function wQ(J,Z){J.pendingLanes|=Z,Z!==268435456&&(J.suspendedLanes=0,J.pingedLanes=0,J.warmLanes=0)}function kB(J,Z,W,Q,Y,X){var H=J.pendingLanes;J.pendingLanes=W,J.suspendedLanes=0,J.pingedLanes=0,J.warmLanes=0,J.expiredLanes&=W,J.entangledLanes&=W,J.errorRecoveryDisabledLanes&=W,J.shellSuspendCounter=0;var{entanglements:U,expirationTimes:G,hiddenUpdates:K}=J;for(W=H&~W;0<W;){var O=31-d7(W),F=1<<O;U[O]=0,G[O]=-1;var q=K[O];if(q!==null)for(K[O]=null,O=0;O<q.length;O++){var R=q[O];R!==null&&(R.lane&=-536870913)}W&=~F}Q!==0&&MO(J,Q,0),X!==0&&Y===0&&J.tag!==0&&(J.suspendedLanes|=X&~(H&~Z))}function MO(J,Z,W){J.pendingLanes|=Z,J.suspendedLanes&=~Z;var Q=31-d7(Z);J.entangledLanes|=Z,J.entanglements[Q]=J.entanglements[Q]|1073741824|W&261930}function NO(J,Z){var W=J.entangledLanes|=Z;for(J=J.entanglements;W;){var Q=31-d7(W),Y=1<<Q;Y&Z|J[Q]&Z&&(J[Q]|=Z),W&=~Y}}function LO(J,Z){var W=Z&-Z;return W=(W&42)!==0?1:pG(W),(W&(J.suspendedLanes|Z))!==0?0:W}function pG(J){switch(J){case 2:J=1;break;case 8:J=4;break;case 32:J=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:J=128;break;case 268435456:J=134217728;break;default:J=0}return J}function dG(J){return J&=-J,2<J?8<J?(J&134217727)!==0?32:268435456:8:2}function BO(){var J=qJ.p;if(J!==0)return J;return J=window.event,J===void 0?32:pF(J.type)}function g$(J,Z){var W=qJ.p;try{return qJ.p=J,Z()}finally{qJ.p=W}}function uG(J){delete J[G7],delete J[T7],delete J[oU],delete J[CB],delete J[VB]}function LZ(J){var Z=J[G7];if(Z)return Z;for(var W=J.parentNode;W;){if(Z=W[cZ]||W[G7]){if(W=Z.alternate,Z.child!==null||W!==null&&W.child!==null)for(J=i1(J);J!==null;){if(W=J[G7])return W;J=i1(J)}return Z}J=W,W=J.parentNode}return null}function iZ(J){if(J=J[G7]||J[cZ]){var Z=J.tag;if(Z===5||Z===6||Z===13||Z===31||Z===26||Z===27||Z===3)return J}return null}function mW(J){var Z=J.tag;if(Z===5||Z===26||Z===27||Z===6)return J.stateNode;throw Error(J0(33))}function VZ(J){var Z=J[m$];return Z||(Z=J[m$]={hoistableStyles:new Map,hoistableScripts:new Map}),Z}function Y7(J){J[DQ]=!0}function C9(J,Z){yZ(J,Z),yZ(J+"Capture",Z)}function yZ(J,Z){AO[J]=Z;for(J=0;J<Z.length;J++)zO.add(Z[J])}function PB(J){if(nU.call(d$,J))return!0;if(nU.call(p$,J))return!1;if(TB.test(J))return d$[J]=!0;return p$[J]=!0,!1}function VY(J,Z,W){if(PB(Z))if(W===null)J.removeAttribute(Z);else{switch(typeof W){case"undefined":case"function":case"symbol":J.removeAttribute(Z);return;case"boolean":var Q=Z.toLowerCase().slice(0,5);if(Q!=="data-"&&Q!=="aria-"){J.removeAttribute(Z);return}}J.setAttribute(Z,""+W)}}function LY(J,Z,W){if(W===null)J.removeAttribute(Z);else{switch(typeof W){case"undefined":case"function":case"symbol":case"boolean":J.removeAttribute(Z);return}J.setAttribute(Z,""+W)}}function d6(J,Z,W,Q){if(Q===null)J.removeAttribute(W);else{switch(typeof Q){case"undefined":case"function":case"symbol":case"boolean":J.removeAttribute(W);return}J.setAttributeNS(Z,W,""+Q)}}function J6(J){switch(typeof J){case"bigint":case"boolean":case"number":case"string":case"undefined":return J;case"object":return J;default:return""}}function _O(J){var Z=J.type;return(J=J.nodeName)&&J.toLowerCase()==="input"&&(Z==="checkbox"||Z==="radio")}function EB(J,Z,W){var Q=Object.getOwnPropertyDescriptor(J.constructor.prototype,Z);if(!J.hasOwnProperty(Z)&&typeof Q<"u"&&typeof Q.get==="function"&&typeof Q.set==="function"){var{get:Y,set:X}=Q;return Object.defineProperty(J,Z,{configurable:!0,get:function(){return Y.call(this)},set:function(H){W=""+H,X.call(this,H)}}),Object.defineProperty(J,Z,{enumerable:Q.enumerable}),{getValue:function(){return W},setValue:function(H){W=""+H},stopTracking:function(){J._valueTracker=null,delete J[Z]}}}}function aU(J){if(!J._valueTracker){var Z=_O(J)?"checked":"value";J._valueTracker=EB(J,Z,""+J[Z])}}function IO(J){if(!J)return!1;var Z=J._valueTracker;if(!Z)return!0;var W=Z.getValue(),Q="";return J&&(Q=_O(J)?J.checked?"true":"false":J.value),J=Q,J!==W?(Z.setValue(J),!0):!1}function sY(J){if(J=J||(typeof document<"u"?document:void 0),typeof J>"u")return null;try{return J.activeElement||J.body}catch(Z){return J.body}}function Q6(J){return J.replace(SB,function(Z){return"\\"+Z.charCodeAt(0).toString(16)+" "})}function rU(J,Z,W,Q,Y,X,H,U){if(J.name="",H!=null&&typeof H!=="function"&&typeof H!=="symbol"&&typeof H!=="boolean"?J.type=H:J.removeAttribute("type"),Z!=null)if(H==="number"){if(Z===0&&J.value===""||J.value!=Z)J.value=""+J6(Z)}else J.value!==""+J6(Z)&&(J.value=""+J6(Z));else H!=="submit"&&H!=="reset"||J.removeAttribute("value");Z!=null?tU(J,H,J6(Z)):W!=null?tU(J,H,J6(W)):Q!=null&&J.removeAttribute("value"),Y==null&&X!=null&&(J.defaultChecked=!!X),Y!=null&&(J.checked=Y&&typeof Y!=="function"&&typeof Y!=="symbol"),U!=null&&typeof U!=="function"&&typeof U!=="symbol"&&typeof U!=="boolean"?J.name=""+J6(U):J.removeAttribute("name")}function wO(J,Z,W,Q,Y,X,H,U){if(X!=null&&typeof X!=="function"&&typeof X!=="symbol"&&typeof X!=="boolean"&&(J.type=X),Z!=null||W!=null){if(!(X!=="submit"&&X!=="reset"||Z!==void 0&&Z!==null)){aU(J);return}W=W!=null?""+J6(W):"",Z=Z!=null?""+J6(Z):W,U||Z===J.value||(J.value=Z),J.defaultValue=Z}Q=Q!=null?Q:Y,Q=typeof Q!=="function"&&typeof Q!=="symbol"&&!!Q,J.checked=U?J.checked:!!Q,J.defaultChecked=!!Q,H!=null&&typeof H!=="function"&&typeof H!=="symbol"&&typeof H!=="boolean"&&(J.name=H),aU(J)}function tU(J,Z,W){Z==="number"&&sY(J.ownerDocument)===J||J.defaultValue===""+W||(J.defaultValue=""+W)}function TZ(J,Z,W,Q){if(J=J.options,Z){Z={};for(var Y=0;Y<W.length;Y++)Z["$"+W[Y]]=!0;for(W=0;W<J.length;W++)Y=Z.hasOwnProperty("$"+J[W].value),J[W].selected!==Y&&(J[W].selected=Y),Y&&Q&&(J[W].defaultSelected=!0)}else{W=""+J6(W),Z=null;for(Y=0;Y<J.length;Y++){if(J[Y].value===W){J[Y].selected=!0,Q&&(J[Y].defaultSelected=!0);return}Z!==null||J[Y].disabled||(Z=J[Y])}Z!==null&&(Z.selected=!0)}}function DO(J,Z,W){if(Z!=null&&(Z=""+J6(Z),Z!==J.value&&(J.value=Z),W==null)){J.defaultValue!==Z&&(J.defaultValue=Z);return}J.defaultValue=W!=null?""+J6(W):""}function kO(J,Z,W,Q){if(Z==null){if(Q!=null){if(W!=null)throw Error(J0(92));if(gW(Q)){if(1<Q.length)throw Error(J0(93));Q=Q[0]}W=Q}W==null&&(W=""),Z=W}W=J6(Z),J.defaultValue=W,Q=J.textContent,Q===W&&Q!==""&&Q!==null&&(J.value=Q),aU(J)}function vZ(J,Z){if(Z){var W=J.firstChild;if(W&&W===J.lastChild&&W.nodeType===3){W.nodeValue=Z;return}}J.textContent=Z}function u$(J,Z,W){var Q=Z.indexOf("--")===0;W==null||typeof W==="boolean"||W===""?Q?J.setProperty(Z,""):Z==="float"?J.cssFloat="":J[Z]="":Q?J.setProperty(Z,W):typeof W!=="number"||W===0||jB.has(Z)?Z==="float"?J.cssFloat=W:J[Z]=(""+W).trim():J[Z]=W+"px"}function CO(J,Z,W){if(Z!=null&&typeof Z!=="object")throw Error(J0(62));if(J=J.style,W!=null){for(var Q in W)!W.hasOwnProperty(Q)||Z!=null&&Z.hasOwnProperty(Q)||(Q.indexOf("--")===0?J.setProperty(Q,""):Q==="float"?J.cssFloat="":J[Q]="");for(var Y in Z)Q=Z[Y],Z.hasOwnProperty(Y)&&W[Y]!==Q&&u$(J,Y,Q)}else for(var X in Z)Z.hasOwnProperty(X)&&u$(J,X,Z[X])}function lG(J){if(J.indexOf("-")===-1)return!1;switch(J){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function TY(J){return bB.test(""+J)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":J}function a6(){}function cG(J){return J=J.target||J.srcElement||window,J.correspondingUseElement&&(J=J.correspondingUseElement),J.nodeType===3?J.parentNode:J}function l$(J){var Z=iZ(J);if(Z&&(J=Z.stateNode)){var W=J[T7]||null;J:switch(J=Z.stateNode,Z.type){case"input":if(rU(J,W.value,W.defaultValue,W.defaultValue,W.checked,W.defaultChecked,W.type,W.name),Z=W.name,W.type==="radio"&&Z!=null){for(W=J;W.parentNode;)W=W.parentNode;W=W.querySelectorAll('input[name="'+Q6(""+Z)+'"][type="radio"]');for(Z=0;Z<W.length;Z++){var Q=W[Z];if(Q!==J&&Q.form===J.form){var Y=Q[T7]||null;if(!Y)throw Error(J0(90));rU(Q,Y.value,Y.defaultValue,Y.defaultValue,Y.checked,Y.defaultChecked,Y.type,Y.name)}}for(Z=0;Z<W.length;Z++)Q=W[Z],Q.form===J.form&&IO(Q)}break J;case"textarea":DO(J,W.value,W.defaultValue);break J;case"select":Z=W.value,Z!=null&&TZ(J,!!W.multiple,Z,!1)}}}function VO(J,Z,W){if(FU)return J(Z,W);FU=!0;try{var Q=J(Z);return Q}finally{if(FU=!1,BZ!==null||PZ!==null){if(EX(),BZ&&(Z=BZ,J=PZ,PZ=BZ=null,l$(Z),J))for(Z=0;Z<J.length;Z++)l$(J[Z])}}}function UQ(J,Z){var W=J.stateNode;if(W===null)return null;var Q=W[T7]||null;if(Q===null)return null;W=Q[Z];J:switch(Z){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(Q=!Q.disabled)||(J=J.type,Q=!(J==="button"||J==="input"||J==="select"||J==="textarea")),J=!Q;break J;default:J=!1}if(J)return null;if(W&&typeof W!=="function")throw Error(J0(231,Z,typeof W));return W}function TO(){if(PY)return PY;var J,Z=iG,W=Z.length,Q,Y="value"in E8?E8.value:E8.textContent,X=Y.length;for(J=0;J<W&&Z[J]===Y[J];J++);var H=W-J;for(Q=1;Q<=H&&Z[W-Q]===Y[X-Q];Q++);return PY=Y.slice(J,1<Q?1-Q:void 0)}function EY(J){var Z=J.keyCode;return"charCode"in J?(J=J.charCode,J===0&&Z===13&&(J=13)):J=Z,J===10&&(J=13),32<=J||J===13?J:0}function BY(){return!0}function c$(){return!1}function P7(J){function Z(W,Q,Y,X,H){this._reactName=W,this._targetInst=Y,this.type=Q,this.nativeEvent=X,this.target=H,this.currentTarget=null;for(var U in J)J.hasOwnProperty(U)&&(W=J[U],this[U]=W?W(X):X[U]);return this.isDefaultPrevented=(X.defaultPrevented!=null?X.defaultPrevented:X.returnValue===!1)?BY:c$,this.isPropagationStopped=c$,this}return SJ(Z.prototype,{preventDefault:function(){this.defaultPrevented=!0;var W=this.nativeEvent;W&&(W.preventDefault?W.preventDefault():typeof W.returnValue!=="unknown"&&(W.returnValue=!1),this.isDefaultPrevented=BY)},stopPropagation:function(){var W=this.nativeEvent;W&&(W.stopPropagation?W.stopPropagation():typeof W.cancelBubble!=="unknown"&&(W.cancelBubble=!0),this.isPropagationStopped=BY)},persist:function(){},isPersistent:BY}),Z}function sB(J){var Z=this.nativeEvent;return Z.getModifierState?Z.getModifierState(J):(J=iB[J])?!!Z[J]:!1}function sG(){return sB}function EO(J,Z){switch(J){case"keyup":return Xz.indexOf(Z.keyCode)!==-1;case"keydown":return Z.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function SO(J){return J=J.detail,typeof J==="object"&&"data"in J?J.data:null}function Uz(J,Z){switch(J){case"compositionend":return SO(Z);case"keypress":if(Z.which!==32)return null;return a$=!0,o$;case"textInput":return J=Z.data,J===o$&&a$?null:J;default:return null}}function Gz(J,Z){if(zZ)return J==="compositionend"||!nG&&EO(J,Z)?(J=TO(),PY=iG=E8=null,zZ=!1,J):null;switch(J){case"paste":return null;case"keypress":if(!(Z.ctrlKey||Z.altKey||Z.metaKey)||Z.ctrlKey&&Z.altKey){if(Z.char&&1<Z.char.length)return Z.char;if(Z.which)return String.fromCharCode(Z.which)}return null;case"compositionend":return PO&&Z.locale!=="ko"?null:Z.data;default:return null}}function r$(J){var Z=J&&J.nodeName&&J.nodeName.toLowerCase();return Z==="input"?!!Kz[J.type]:Z==="textarea"?!0:!1}function jO(J,Z,W,Q){BZ?PZ?PZ.push(Q):PZ=[Q]:BZ=Q,Z=$X(Z,"onChange"),0<Z.length&&(W=new zX("onChange","change",null,W,Q),J.push({event:W,listeners:Z}))}function qz(J){VF(J,0)}function _X(J){var Z=mW(J);if(IO(Z))return J}function t$(J,Z){if(J==="change")return Z}function e$(){nW&&(nW.detachEvent("onpropertychange",bO),GQ=nW=null)}function bO(J){if(J.propertyName==="value"&&_X(GQ)){var Z=[];jO(Z,GQ,J,cG(J)),VO(qz,Z)}}function $z(J,Z,W){J==="focusin"?(e$(),nW=Z,GQ=W,nW.attachEvent("onpropertychange",bO)):J==="focusout"&&e$()}function Oz(J){if(J==="selectionchange"||J==="keyup"||J==="keydown")return _X(GQ)}function Rz(J,Z){if(J==="click")return _X(Z)}function Fz(J,Z){if(J==="input"||J==="change")return _X(Z)}function Mz(J,Z){return J===Z&&(J!==0||1/J===1/Z)||J!==J&&Z!==Z}function KQ(J,Z){if(l7(J,Z))return!0;if(typeof J!=="object"||J===null||typeof Z!=="object"||Z===null)return!1;var W=Object.keys(J),Q=Object.keys(Z);if(W.length!==Q.length)return!1;for(Q=0;Q<W.length;Q++){var Y=W[Q];if(!nU.call(Z,Y)||!l7(J[Y],Z[Y]))return!1}return!0}function J1(J){for(;J&&J.firstChild;)J=J.firstChild;return J}function Z1(J,Z){var W=J1(J);J=0;for(var Q;W;){if(W.nodeType===3){if(Q=J+W.textContent.length,J<=Z&&Q>=Z)return{node:W,offset:Z-J};J=Q}J:{for(;W;){if(W.nextSibling){W=W.nextSibling;break J}W=W.parentNode}W=void 0}W=J1(W)}}function yO(J,Z){return J&&Z?J===Z?!0:J&&J.nodeType===3?!1:Z&&Z.nodeType===3?yO(J,Z.parentNode):("contains"in J)?J.contains(Z):J.compareDocumentPosition?!!(J.compareDocumentPosition(Z)&16):!1:!1}function vO(J){J=J!=null&&J.ownerDocument!=null&&J.ownerDocument.defaultView!=null?J.ownerDocument.defaultView:window;for(var Z=sY(J.document);Z instanceof J.HTMLIFrameElement;){try{var W=typeof Z.contentWindow.location.href==="string"}catch(Q){W=!1}if(W)J=Z.contentWindow;else break;Z=sY(J.document)}return Z}function oG(J){var Z=J&&J.nodeName&&J.nodeName.toLowerCase();return Z&&(Z==="input"&&(J.type==="text"||J.type==="search"||J.type==="tel"||J.type==="url"||J.type==="password")||Z==="textarea"||J.contentEditable==="true")}function W1(J,Z,W){var Q=W.window===W?W.document:W.nodeType===9?W:W.ownerDocument;WG||AZ==null||AZ!==sY(Q)||(Q=AZ,("selectionStart"in Q)&&oG(Q)?Q={start:Q.selectionStart,end:Q.selectionEnd}:(Q=(Q.ownerDocument&&Q.ownerDocument.defaultView||window).getSelection(),Q={anchorNode:Q.anchorNode,anchorOffset:Q.anchorOffset,focusNode:Q.focusNode,focusOffset:Q.focusOffset}),oW&&KQ(oW,Q)||(oW=Q,Q=$X(ZG,"onSelect"),0<Q.length&&(Z=new zX("onSelect","select",null,Z,W),J.push({event:Z,listeners:Q}),Z.target=AZ)))}function q9(J,Z){var W={};return W[J.toLowerCase()]=Z.toLowerCase(),W["Webkit"+J]="webkit"+Z,W["Moz"+J]="moz"+Z,W}function T9(J){if(BU[J])return BU[J];if(!_Z[J])return J;var Z=_Z[J],W;for(W in Z)if(Z.hasOwnProperty(W)&&W in xO)return BU[J]=Z[W];return J}function L6(J,Z){dO.set(J,Z),C9(Z,[J])}function IX(){for(var J=IZ,Z=aG=IZ=0;Z<J;){var W=e7[Z];e7[Z++]=null;var Q=e7[Z];e7[Z++]=null;var Y=e7[Z];e7[Z++]=null;var X=e7[Z];if(e7[Z++]=null,Q!==null&&Y!==null){var H=Q.pending;H===null?Y.next=Y:(Y.next=H.next,H.next=Y),Q.pending=Y}X!==0&&uO(W,Y,X)}}function wX(J,Z,W,Q){e7[IZ++]=J,e7[IZ++]=Z,e7[IZ++]=W,e7[IZ++]=Q,aG|=Q,J.lanes|=Q,J=J.alternate,J!==null&&(J.lanes|=Q)}function rG(J,Z,W,Q){return wX(J,Z,W,Q),oY(J)}function P9(J,Z){return wX(J,null,null,Z),oY(J)}function uO(J,Z,W){J.lanes|=W;var Q=J.alternate;Q!==null&&(Q.lanes|=W);for(var Y=!1,X=J.return;X!==null;)X.childLanes|=W,Q=X.alternate,Q!==null&&(Q.childLanes|=W),X.tag===22&&(J=X.stateNode,J===null||J._visibility&1||(Y=!0)),J=X,X=X.return;return J.tag===3?(X=J.stateNode,Y&&Z!==null&&(Y=31-d7(W),J=X.hiddenUpdates,Q=J[Y],Q===null?J[Y]=[Z]:Q.push(Z),Z.lane=W|536870912),X):null}function oY(J){if(50<YQ)throw YQ=0,DG=null,Error(J0(185));for(var Z=J.return;Z!==null;)J=Z,Z=J.return;return J.tag===3?J.stateNode:null}function Az(J,Z,W,Q){this.tag=J,this.key=W,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=Z,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=Q,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function h7(J,Z,W,Q){return new Az(J,Z,W,Q)}function tG(J){return J=J.prototype,!(!J||!J.isReactComponent)}function t6(J,Z){var W=J.alternate;return W===null?(W=h7(J.tag,Z,J.key,J.mode),W.elementType=J.elementType,W.type=J.type,W.stateNode=J.stateNode,W.alternate=J,J.alternate=W):(W.pendingProps=Z,W.type=J.type,W.flags=0,W.subtreeFlags=0,W.deletions=null),W.flags=J.flags&65011712,W.childLanes=J.childLanes,W.lanes=J.lanes,W.child=J.child,W.memoizedProps=J.memoizedProps,W.memoizedState=J.memoizedState,W.updateQueue=J.updateQueue,Z=J.dependencies,W.dependencies=Z===null?null:{lanes:Z.lanes,firstContext:Z.firstContext},W.sibling=J.sibling,W.index=J.index,W.ref=J.ref,W.refCleanup=J.refCleanup,W}function lO(J,Z){J.flags&=65011714;var W=J.alternate;return W===null?(J.childLanes=0,J.lanes=Z,J.child=null,J.subtreeFlags=0,J.memoizedProps=null,J.memoizedState=null,J.updateQueue=null,J.dependencies=null,J.stateNode=null):(J.childLanes=W.childLanes,J.lanes=W.lanes,J.child=W.child,J.subtreeFlags=0,J.deletions=null,J.memoizedProps=W.memoizedProps,J.memoizedState=W.memoizedState,J.updateQueue=W.updateQueue,J.type=W.type,Z=W.dependencies,J.dependencies=Z===null?null:{lanes:Z.lanes,firstContext:Z.firstContext}),J}function jY(J,Z,W,Q,Y,X){var H=0;if(Q=J,typeof J==="function")tG(J)&&(H=1);else if(typeof J==="string")H=wA(J,W,S6.current)?26:J==="html"||J==="head"||J==="body"?27:5;else J:switch(J){case lU:return J=h7(31,W,Z,Y),J.elementType=lU,J.lanes=X,J;case MZ:return L9(W.children,Y,X,Z);case KO:H=8,Y|=24;break;case pU:return J=h7(12,W,Z,Y|2),J.elementType=pU,J.lanes=X,J;case dU:return J=h7(13,W,Z,Y),J.elementType=dU,J.lanes=X,J;case uU:return J=h7(19,W,Z,Y),J.elementType=uU,J.lanes=X,J;default:if(typeof J==="object"&&J!==null)switch(J.$$typeof){case o6:H=10;break J;case qO:H=9;break J;case hG:H=11;break J;case gG:H=14;break J;case w8:H=16,Q=null;break J}H=29,W=Error(J0(130,J===null?"null":typeof J,"")),Q=null}return Z=h7(H,W,Z,Y),Z.elementType=J,Z.type=Q,Z.lanes=X,Z}function L9(J,Z,W,Q){return J=h7(7,J,Q,Z),J.lanes=W,J}function zU(J,Z,W){return J=h7(6,J,null,Z),J.lanes=W,J}function cO(J){var Z=h7(18,null,null,0);return Z.stateNode=J,Z}function AU(J,Z,W){return Z=h7(4,J.children!==null?J.children:[],J.key,Z),Z.lanes=W,Z.stateNode={containerInfo:J.containerInfo,pendingChildren:null,implementation:J.implementation},Z}function Y6(J,Z){if(typeof J==="object"&&J!==null){var W=Q1.get(J);if(W!==void 0)return W;return Z={value:J,source:Z,stack:h$(Z)},Q1.set(J,Z),Z}return{value:J,source:Z,stack:h$(Z)}}function s6(J,Z){DZ[kZ++]=qQ,DZ[kZ++]=aY,aY=J,qQ=Z}function iO(J,Z,W){Z6[W6++]=T6,Z6[W6++]=P6,Z6[W6++]=u8,u8=J;var Q=T6;J=P6;var Y=32-d7(Q)-1;Q&=~(1<<Y),W+=1;var X=32-d7(Z)+Y;if(30<X){var H=Y-Y%5;X=(Q&(1<<H)-1).toString(32),Q>>=H,Y-=H,T6=1<<32-d7(Z)+Y|W<<Y|Q,P6=X+J}else T6=1<<X|W<<Y|Q,P6=J}function eG(J){J.return!==null&&(s6(J,1),iO(J,1,0))}function JK(J){for(;J===aY;)aY=DZ[--kZ],DZ[kZ]=null,qQ=DZ[--kZ],DZ[kZ]=null;for(;J===u8;)u8=Z6[--W6],Z6[W6]=null,P6=Z6[--W6],Z6[W6]=null,T6=Z6[--W6],Z6[W6]=null}function sO(J,Z){Z6[W6++]=T6,Z6[W6++]=P6,Z6[W6++]=u8,T6=Z.id,P6=Z.overflow,u8=J}function l8(J){var Z=Error(J0(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw $Q(Y6(Z,J)),YG}function Y1(J){var{stateNode:Z,type:W,memoizedProps:Q}=J;switch(Z[G7]=J,Z[T7]=Q,W){case"dialog":s0("cancel",Z),s0("close",Z);break;case"iframe":case"object":case"embed":s0("load",Z);break;case"video":case"audio":for(W=0;W<MQ.length;W++)s0(MQ[W],Z);break;case"source":s0("error",Z);break;case"img":case"image":case"link":s0("error",Z),s0("load",Z);break;case"details":s0("toggle",Z);break;case"input":s0("invalid",Z),wO(Z,Q.value,Q.defaultValue,Q.checked,Q.defaultChecked,Q.type,Q.name,!0);break;case"select":s0("invalid",Z);break;case"textarea":s0("invalid",Z),kO(Z,Q.value,Q.defaultValue,Q.children)}W=Q.children,typeof W!=="string"&&typeof W!=="number"&&typeof W!=="bigint"||Z.textContent===""+W||Q.suppressHydrationWarning===!0||PF(Z.textContent,W)?(Q.popover!=null&&(s0("beforetoggle",Z),s0("toggle",Z)),Q.onScroll!=null&&s0("scroll",Z),Q.onScrollEnd!=null&&s0("scrollend",Z),Q.onClick!=null&&(Z.onclick=a6),Z=!0):Z=!1,Z||l8(J,!0)}function X1(J){for(K7=J.return;K7;)switch(K7.tag){case 5:case 31:case 13:X6=!1;return;case 27:case 3:X6=!0;return;default:K7=K7.return}}function qZ(J){if(J!==K7)return!1;if(!QJ)return X1(J),QJ=!0,!1;var Z=J.tag,W;if(W=Z!==3&&Z!==27){if(W=Z===5)W=J.type,W=!(W!=="form"&&W!=="button")||SG(J.type,J.memoizedProps);W=!W}if(W&&EJ&&l8(J),X1(J),Z===13){if(J=J.memoizedState,J=J!==null?J.dehydrated:null,!J)throw Error(J0(317));EJ=c1(J)}else if(Z===31){if(J=J.memoizedState,J=J!==null?J.dehydrated:null,!J)throw Error(J0(317));EJ=c1(J)}else Z===27?(Z=EJ,n8(J.type)?(J=yG,yG=null,EJ=J):EJ=Z):EJ=K7?U6(J.stateNode.nextSibling):null;return!0}function _9(){EJ=K7=null,QJ=!1}function _U(){var J=y8;return J!==null&&(C7===null?C7=J:C7.push.apply(C7,J),y8=null),J}function $Q(J){y8===null?y8=[J]:y8.push(J)}function k8(J,Z,W){CJ(XG,Z._currentValue),Z._currentValue=W}function e6(J){J._currentValue=XG.current,X7(XG)}function HG(J,Z,W){for(;J!==null;){var Q=J.alternate;if((J.childLanes&Z)!==Z?(J.childLanes|=Z,Q!==null&&(Q.childLanes|=Z)):Q!==null&&(Q.childLanes&Z)!==Z&&(Q.childLanes|=Z),J===W)break;J=J.return}}function UG(J,Z,W,Q){var Y=J.child;Y!==null&&(Y.return=J);for(;Y!==null;){var X=Y.dependencies;if(X!==null){var H=Y.child;X=X.firstContext;J:for(;X!==null;){var U=X;X=Y;for(var G=0;G<Z.length;G++)if(U.context===Z[G]){X.lanes|=W,U=X.alternate,U!==null&&(U.lanes|=W),HG(X.return,W,J),Q||(H=null);break J}X=U.next}}else if(Y.tag===18){if(H=Y.return,H===null)throw Error(J0(341));H.lanes|=W,X=H.alternate,X!==null&&(X.lanes|=W),HG(H,W,J),H=null}else H=Y.child;if(H!==null)H.return=Y;else for(H=Y;H!==null;){if(H===J){H=null;break}if(Y=H.sibling,Y!==null){Y.return=H.return,H=Y;break}H=H.return}Y=H}}function sZ(J,Z,W,Q){J=null;for(var Y=Z,X=!1;Y!==null;){if(!X){if((Y.flags&524288)!==0)X=!0;else if((Y.flags&262144)!==0)break}if(Y.tag===10){var H=Y.alternate;if(H===null)throw Error(J0(387));if(H=H.memoizedProps,H!==null){var U=Y.type;l7(Y.pendingProps.value,H.value)||(J!==null?J.push(U):J=[U])}}else if(Y===uY.current){if(H=Y.alternate,H===null)throw Error(J0(387));H.memoizedState.memoizedState!==Y.memoizedState.memoizedState&&(J!==null?J.push(LQ):J=[LQ])}Y=Y.return}J!==null&&UG(Z,J,W,Q),Z.flags|=262144}function rY(J){for(J=J.firstContext;J!==null;){if(!l7(J.context._currentValue,J.memoizedValue))return!0;J=J.next}return!1}function I9(J){E9=J,r6=null,J=J.dependencies,J!==null&&(J.firstContext=null)}function q7(J){return nO(E9,J)}function zY(J,Z){return E9===null&&I9(J),nO(J,Z)}function nO(J,Z){var W=Z._currentValue;if(Z={context:Z,memoizedValue:W,next:null},r6===null){if(J===null)throw Error(J0(308));r6=Z,J.dependencies={lanes:0,firstContext:Z},J.flags|=524288}else r6=r6.next=Z;return W}function ZK(){return{controller:new _z,data:new Map,refCount:0}}function CQ(J){J.refCount--,J.refCount===0&&Iz(wz,function(){J.controller.abort()})}function Dz(J,Z){if(aW===null){var W=aW=[];GG=0,xZ=CK(),EZ={status:"pending",value:void 0,then:function(Q){W.push(Q)}}}return GG++,Z.then(H1,H1),Z}function H1(){if(--GG===0&&aW!==null){EZ!==null&&(EZ.status="fulfilled");var J=aW;aW=null,xZ=0,EZ=null;for(var Z=0;Z<J.length;Z++)(0,J[Z])()}}function kz(J,Z){var W=[],Q={status:"pending",value:null,reason:null,then:function(Y){W.push(Y)}};return J.then(function(){Q.status="fulfilled",Q.value=Z;for(var Y=0;Y<W.length;Y++)(0,W[Y])(Z)},function(Y){Q.status="rejected",Q.reason=Y;for(Y=0;Y<W.length;Y++)(0,W[Y])(void 0)}),Q}function WK(){var J=B9.current;return J!==null?J:IJ.pooledCache}function fY(J,Z){Z===null?CJ(B9,B9.current):CJ(B9,Z.pool)}function oO(){var J=WK();return J===null?null:{parent:oJ._currentValue,pool:J}}function G1(J){return J=J.status,J==="fulfilled"||J==="rejected"}function aO(J,Z,W){switch(W=J[W],W===void 0?J.push(Z):W!==Z&&(Z.then(a6,a6),Z=W),Z.status){case"fulfilled":return Z.value;case"rejected":throw J=Z.reason,q1(J),J;default:if(typeof Z.status==="string")Z.then(a6,a6);else{if(J=IJ,J!==null&&100<J.shellSuspendCounter)throw Error(J0(482));J=Z,J.status="pending",J.then(function(Q){if(Z.status==="pending"){var Y=Z;Y.status="fulfilled",Y.value=Q}},function(Q){if(Z.status==="pending"){var Y=Z;Y.status="rejected",Y.reason=Q}})}switch(Z.status){case"fulfilled":return Z.value;case"rejected":throw J=Z.reason,q1(J),J}throw z9=Z,nZ}}function F9(J){try{var Z=J._init;return Z(J._payload)}catch(W){if(W!==null&&typeof W==="object"&&typeof W.then==="function")throw z9=W,nZ;throw W}}function K1(){if(z9===null)throw Error(J0(459));var J=z9;return z9=null,J}function q1(J){if(J===nZ||J===DX)throw Error(J0(483))}function AY(J){var Z=OQ;return OQ+=1,SZ===null&&(SZ=[]),aO(SZ,J,Z)}function bW(J,Z){Z=Z.props.ref,J.ref=Z!==void 0?Z:null}function _Y(J,Z){if(Z.$$typeof===$B)throw Error(J0(525));throw J=Object.prototype.toString.call(Z),Error(J0(31,J==="[object Object]"?"object with keys {"+Object.keys(Z).join(", ")+"}":J))}function rO(J){function Z($,B){if(J){var _=$.deletions;_===null?($.deletions=[B],$.flags|=16):_.push(B)}}function W($,B){if(!J)return null;for(;B!==null;)Z($,B),B=B.sibling;return null}function Q($){for(var B=new Map;$!==null;)$.key!==null?B.set($.key,$):B.set($.index,$),$=$.sibling;return B}function Y($,B){return $=t6($,B),$.index=0,$.sibling=null,$}function X($,B,_){if($.index=_,!J)return $.flags|=1048576,B;if(_=$.alternate,_!==null)return _=_.index,_<B?($.flags|=67108866,B):_;return $.flags|=67108866,B}function H($){return J&&$.alternate===null&&($.flags|=67108866),$}function U($,B,_,z){if(B===null||B.tag!==6)return B=zU(_,$.mode,z),B.return=$,B;return B=Y(B,_),B.return=$,B}function G($,B,_,z){var P=_.type;if(P===MZ)return O($,B,_.props.children,z,_.key);if(B!==null&&(B.elementType===P||typeof P==="object"&&P!==null&&P.$$typeof===w8&&F9(P)===B.type))return B=Y(B,_.props),bW(B,_),B.return=$,B;return B=jY(_.type,_.key,_.props,null,$.mode,z),bW(B,_),B.return=$,B}function K($,B,_,z){if(B===null||B.tag!==4||B.stateNode.containerInfo!==_.containerInfo||B.stateNode.implementation!==_.implementation)return B=AU(_,$.mode,z),B.return=$,B;return B=Y(B,_.children||[]),B.return=$,B}function O($,B,_,z,P){if(B===null||B.tag!==7)return B=L9(_,$.mode,z,P),B.return=$,B;return B=Y(B,_),B.return=$,B}function F($,B,_){if(typeof B==="string"&&B!==""||typeof B==="number"||typeof B==="bigint")return B=zU(""+B,$.mode,_),B.return=$,B;if(typeof B==="object"&&B!==null){switch(B.$$typeof){case RY:return _=jY(B.type,B.key,B.props,null,$.mode,_),bW(_,B),_.return=$,_;case hW:return B=AU(B,$.mode,_),B.return=$,B;case w8:return B=F9(B),F($,B,_)}if(gW(B)||jW(B))return B=L9(B,$.mode,_,null),B.return=$,B;if(typeof B.then==="function")return F($,AY(B),_);if(B.$$typeof===o6)return F($,zY($,B),_);_Y($,B)}return null}function q($,B,_,z){var P=B!==null?B.key:null;if(typeof _==="string"&&_!==""||typeof _==="number"||typeof _==="bigint")return P!==null?null:U($,B,""+_,z);if(typeof _==="object"&&_!==null){switch(_.$$typeof){case RY:return _.key===P?G($,B,_,z):null;case hW:return _.key===P?K($,B,_,z):null;case w8:return _=F9(_),q($,B,_,z)}if(gW(_)||jW(_))return P!==null?null:O($,B,_,z,null);if(typeof _.then==="function")return q($,B,AY(_),z);if(_.$$typeof===o6)return q($,B,zY($,_),z);_Y($,_)}return null}function R($,B,_,z,P){if(typeof z==="string"&&z!==""||typeof z==="number"||typeof z==="bigint")return $=$.get(_)||null,U(B,$,""+z,P);if(typeof z==="object"&&z!==null){switch(z.$$typeof){case RY:return $=$.get(z.key===null?_:z.key)||null,G(B,$,z,P);case hW:return $=$.get(z.key===null?_:z.key)||null,K(B,$,z,P);case w8:return z=F9(z),R($,B,_,z,P)}if(gW(z)||jW(z))return $=$.get(_)||null,O(B,$,z,P,null);if(typeof z.then==="function")return R($,B,_,AY(z),P);if(z.$$typeof===o6)return R($,B,_,zY(B,z),P);_Y(B,z)}return null}function L($,B,_,z){for(var P=null,D=null,T=B,A=B=0,C=null;T!==null&&A<_.length;A++){T.index>A?(C=T,T=null):C=T.sibling;var x=q($,T,_[A],z);if(x===null){T===null&&(T=C);break}J&&T&&x.alternate===null&&Z($,T),B=X(x,B,A),D===null?P=x:D.sibling=x,D=x,T=C}if(A===_.length)return W($,T),QJ&&s6($,A),P;if(T===null){for(;A<_.length;A++)T=F($,_[A],z),T!==null&&(B=X(T,B,A),D===null?P=T:D.sibling=T,D=T);return QJ&&s6($,A),P}for(T=Q(T);A<_.length;A++)C=R(T,$,A,_[A],z),C!==null&&(J&&C.alternate!==null&&T.delete(C.key===null?A:C.key),B=X(C,B,A),D===null?P=C:D.sibling=C,D=C);return J&&T.forEach(function(E){return Z($,E)}),QJ&&s6($,A),P}function w($,B,_,z){if(_==null)throw Error(J0(151));for(var P=null,D=null,T=B,A=B=0,C=null,x=_.next();T!==null&&!x.done;A++,x=_.next()){T.index>A?(C=T,T=null):C=T.sibling;var E=q($,T,x.value,z);if(E===null){T===null&&(T=C);break}J&&T&&E.alternate===null&&Z($,T),B=X(E,B,A),D===null?P=E:D.sibling=E,D=E,T=C}if(x.done)return W($,T),QJ&&s6($,A),P;if(T===null){for(;!x.done;A++,x=_.next())x=F($,x.value,z),x!==null&&(B=X(x,B,A),D===null?P=x:D.sibling=x,D=x);return QJ&&s6($,A),P}for(T=Q(T);!x.done;A++,x=_.next())x=R(T,$,A,x.value,z),x!==null&&(J&&x.alternate!==null&&T.delete(x.key===null?A:x.key),B=X(x,B,A),D===null?P=x:D.sibling=x,D=x);return J&&T.forEach(function(u){return Z($,u)}),QJ&&s6($,A),P}function N($,B,_,z){if(typeof _==="object"&&_!==null&&_.type===MZ&&_.key===null&&(_=_.props.children),typeof _==="object"&&_!==null){switch(_.$$typeof){case RY:J:{for(var P=_.key;B!==null;){if(B.key===P){if(P=_.type,P===MZ){if(B.tag===7){W($,B.sibling),z=Y(B,_.props.children),z.return=$,$=z;break J}}else if(B.elementType===P||typeof P==="object"&&P!==null&&P.$$typeof===w8&&F9(P)===B.type){W($,B.sibling),z=Y(B,_.props),bW(z,_),z.return=$,$=z;break J}W($,B);break}else Z($,B);B=B.sibling}_.type===MZ?(z=L9(_.props.children,$.mode,z,_.key),z.return=$,$=z):(z=jY(_.type,_.key,_.props,null,$.mode,z),bW(z,_),z.return=$,$=z)}return H($);case hW:J:{for(P=_.key;B!==null;){if(B.key===P)if(B.tag===4&&B.stateNode.containerInfo===_.containerInfo&&B.stateNode.implementation===_.implementation){W($,B.sibling),z=Y(B,_.children||[]),z.return=$,$=z;break J}else{W($,B);break}else Z($,B);B=B.sibling}z=AU(_,$.mode,z),z.return=$,$=z}return H($);case w8:return _=F9(_),N($,B,_,z)}if(gW(_))return L($,B,_,z);if(jW(_)){if(P=jW(_),typeof P!=="function")throw Error(J0(150));return _=P.call(_),w($,B,_,z)}if(typeof _.then==="function")return N($,B,AY(_),z);if(_.$$typeof===o6)return N($,B,zY($,_),z);_Y($,_)}return typeof _==="string"&&_!==""||typeof _==="number"||typeof _==="bigint"?(_=""+_,B!==null&&B.tag===6?(W($,B.sibling),z=Y(B,_),z.return=$,$=z):(W($,B),z=zU(_,$.mode,z),z.return=$,$=z),H($)):W($,B)}return function($,B,_,z){try{OQ=0;var P=N($,B,_,z);return SZ=null,P}catch(T){if(T===nZ||T===DX)throw T;var D=h7(29,T,null,$.mode);return D.lanes=z,D.return=$,D}finally{}}}function YK(J){J.updateQueue={baseState:J.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function KG(J,Z){J=J.updateQueue,Z.updateQueue===J&&(Z.updateQueue={baseState:J.baseState,firstBaseUpdate:J.firstBaseUpdate,lastBaseUpdate:J.lastBaseUpdate,shared:J.shared,callbacks:null})}function v8(J){return{lane:J,tag:0,payload:null,callback:null,next:null}}function x8(J,Z,W){var Q=J.updateQueue;if(Q===null)return null;if(Q=Q.shared,(KJ&2)!==0){var Y=Q.pending;return Y===null?Z.next=Z:(Z.next=Y.next,Y.next=Z),Q.pending=Z,Z=oY(J),uO(J,null,W),Z}return wX(J,Q,Z,W),oY(J)}function rW(J,Z,W){if(Z=Z.updateQueue,Z!==null&&(Z=Z.shared,(W&4194048)!==0)){var Q=Z.lanes;Q&=J.pendingLanes,W|=Q,Z.lanes=W,NO(J,W)}}function IU(J,Z){var{updateQueue:W,alternate:Q}=J;if(Q!==null&&(Q=Q.updateQueue,W===Q)){var Y=null,X=null;if(W=W.firstBaseUpdate,W!==null){do{var H={lane:W.lane,tag:W.tag,payload:W.payload,callback:null,next:null};X===null?Y=X=H:X=X.next=H,W=W.next}while(W!==null);X===null?Y=X=Z:X=X.next=Z}else Y=X=Z;W={baseState:Q.baseState,firstBaseUpdate:Y,lastBaseUpdate:X,shared:Q.shared,callbacks:Q.callbacks},J.updateQueue=W;return}J=W.lastBaseUpdate,J===null?W.firstBaseUpdate=Z:J.next=Z,W.lastBaseUpdate=Z}function tW(){if(qG){var J=EZ;if(J!==null)throw J}}function eW(J,Z,W,Q){qG=!1;var Y=J.updateQueue;D8=!1;var{firstBaseUpdate:X,lastBaseUpdate:H}=Y,U=Y.shared.pending;if(U!==null){Y.shared.pending=null;var G=U,K=G.next;G.next=null,H===null?X=K:H.next=K,H=G;var O=J.alternate;O!==null&&(O=O.updateQueue,U=O.lastBaseUpdate,U!==H&&(U===null?O.firstBaseUpdate=K:U.next=K,O.lastBaseUpdate=G))}if(X!==null){var F=Y.baseState;H=0,O=K=G=null,U=X;do{var q=U.lane&-536870913,R=q!==U.lane;if(R?(JJ&q)===q:(Q&q)===q){q!==0&&q===xZ&&(qG=!0),O!==null&&(O=O.next={lane:0,tag:U.tag,payload:U.payload,callback:null,next:null});J:{var L=J,w=U;q=Z;var N=W;switch(w.tag){case 1:if(L=w.payload,typeof L==="function"){F=L.call(N,F,q);break J}F=L;break J;case 3:L.flags=L.flags&-65537|128;case 0:if(L=w.payload,q=typeof L==="function"?L.call(N,F,q):L,q===null||q===void 0)break J;F=SJ({},F,q);break J;case 2:D8=!0}}q=U.callback,q!==null&&(J.flags|=64,R&&(J.flags|=8192),R=Y.callbacks,R===null?Y.callbacks=[q]:R.push(q))}else R={lane:q,tag:U.tag,payload:U.payload,callback:U.callback,next:null},O===null?(K=O=R,G=F):O=O.next=R,H|=q;if(U=U.next,U===null)if(U=Y.shared.pending,U===null)break;else R=U,U=R.next,R.next=null,Y.lastBaseUpdate=R,Y.shared.pending=null}while(1);O===null&&(G=F),Y.baseState=G,Y.firstBaseUpdate=K,Y.lastBaseUpdate=O,X===null&&(Y.shared.lanes=0),i8|=H,J.lanes=H,J.memoizedState=F}}function eO(J,Z){if(typeof J!=="function")throw Error(J0(191,J));J.call(Z)}function JR(J,Z){var W=J.callbacks;if(W!==null)for(J.callbacks=null,J=0;J<W.length;J++)eO(W[J],Z)}function $1(J,Z){J=X8,CJ(eY,J),CJ(hZ,Z),X8=J|Z.baseLanes}function $G(){CJ(eY,X8),CJ(hZ,hZ.current)}function XK(){X8=eY.current,X7(hZ),X7(eY)}function C8(J){var Z=J.alternate;CJ(uJ,uJ.current&1),CJ(c7,J),H6===null&&(Z===null||hZ.current!==null?H6=J:Z.memoizedState!==null&&(H6=J))}function OG(J){CJ(uJ,uJ.current),CJ(c7,J),H6===null&&(H6=J)}function ZR(J){J.tag===22?(CJ(uJ,uJ.current),CJ(c7,J),H6===null&&(H6=J)):V8(J)}function V8(){CJ(uJ,uJ.current),CJ(c7,c7.current)}function x7(J){X7(c7),H6===J&&(H6=null),X7(uJ)}function JX(J){for(var Z=J;Z!==null;){if(Z.tag===13){var W=Z.memoizedState;if(W!==null&&(W=W.dehydrated,W===null||fG(W)||bG(W)))return Z}else if(Z.tag===19&&(Z.memoizedProps.revealOrder==="forwards"||Z.memoizedProps.revealOrder==="backwards"||Z.memoizedProps.revealOrder==="unstable_legacy-backwards"||Z.memoizedProps.revealOrder==="together")){if((Z.flags&128)!==0)return Z}else if(Z.child!==null){Z.child.return=Z,Z=Z.child;continue}if(Z===J)break;for(;Z.sibling===null;){if(Z.return===null||Z.return===J)return null;Z=Z.return}Z.sibling.return=Z.return,Z=Z.sibling}return null}function hJ(){throw Error(J0(321))}function HK(J,Z){if(Z===null)return!1;for(var W=0;W<Z.length&&W<J.length;W++)if(!l7(J[W],Z[W]))return!1;return!0}function UK(J,Z,W,Q,Y,X){return W8=X,h0=Z,Z.memoizedState=null,Z.updateQueue=null,Z.lanes=0,y0.H=J===null||J.memoizedState===null?jR:BK,D9=!1,X=W(Q,Y),D9=!1,jZ&&(X=QR(Z,W,Q,Y)),WR(J),X}function WR(J){y0.H=FQ;var Z=BJ!==null&&BJ.next!==null;if(W8=0,sJ=BJ=h0=null,ZX=!1,RQ=0,fZ=null,Z)throw Error(J0(300));J===null||aJ||(J=J.dependencies,J!==null&&rY(J)&&(aJ=!0))}function QR(J,Z,W,Q){h0=J;var Y=0;do{if(jZ&&(fZ=null),RQ=0,jZ=!1,25<=Y)throw Error(J0(301));if(Y+=1,sJ=BJ=null,J.updateQueue!=null){var X=J.updateQueue;X.lastEffect=null,X.events=null,X.stores=null,X.memoCache!=null&&(X.memoCache.index=0)}y0.H=fR,X=Z(W,Q)}while(jZ);return X}function Vz(){var J=y0.H,Z=J.useState()[0];return Z=typeof Z.then==="function"?VQ(Z):Z,J=J.useState()[0],(BJ!==null?BJ.memoizedState:null)!==J&&(h0.flags|=1024),Z}function GK(){var J=WX!==0;return WX=0,J}function KK(J,Z,W){Z.updateQueue=J.updateQueue,Z.flags&=-2053,J.lanes&=~W}function qK(J){if(ZX){for(J=J.memoizedState;J!==null;){var Z=J.queue;Z!==null&&(Z.pending=null),J=J.next}ZX=!1}W8=0,sJ=BJ=h0=null,jZ=!1,RQ=WX=0,fZ=null}function A7(){var J={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return sJ===null?h0.memoizedState=sJ=J:sJ=sJ.next=J,sJ}function lJ(){if(BJ===null){var J=h0.alternate;J=J!==null?J.memoizedState:null}else J=BJ.next;var Z=sJ===null?h0.memoizedState:sJ.next;if(Z!==null)sJ=Z,BJ=J;else{if(J===null){if(h0.alternate===null)throw Error(J0(467));throw Error(J0(310))}BJ=J,J={memoizedState:BJ.memoizedState,baseState:BJ.baseState,baseQueue:BJ.baseQueue,queue:BJ.queue,next:null},sJ===null?h0.memoizedState=sJ=J:sJ=sJ.next=J}return sJ}function kX(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function VQ(J){var Z=RQ;return RQ+=1,fZ===null&&(fZ=[]),J=aO(fZ,J,Z),Z=h0,(sJ===null?Z.memoizedState:sJ.next)===null&&(Z=Z.alternate,y0.H=Z===null||Z.memoizedState===null?jR:BK),J}function CX(J){if(J!==null&&typeof J==="object"){if(typeof J.then==="function")return VQ(J);if(J.$$typeof===o6)return q7(J)}throw Error(J0(438,String(J)))}function $K(J){var Z=null,W=h0.updateQueue;if(W!==null&&(Z=W.memoCache),Z==null){var Q=h0.alternate;Q!==null&&(Q=Q.updateQueue,Q!==null&&(Q=Q.memoCache,Q!=null&&(Z={data:Q.data.map(function(Y){return Y.slice()}),index:0})))}if(Z==null&&(Z={data:[],index:0}),W===null&&(W=kX(),h0.updateQueue=W),W.memoCache=Z,W=Z.data[Z.index],W===void 0)for(W=Z.data[Z.index]=Array(J),Q=0;Q<J;Q++)W[Q]=OB;return Z.index++,W}function Q8(J,Z){return typeof Z==="function"?Z(J):Z}function bY(J){var Z=lJ();return OK(Z,BJ,J)}function OK(J,Z,W){var Q=J.queue;if(Q===null)throw Error(J0(311));Q.lastRenderedReducer=W;var Y=J.baseQueue,X=Q.pending;if(X!==null){if(Y!==null){var H=Y.next;Y.next=X.next,X.next=H}Z.baseQueue=Y=X,Q.pending=null}if(X=J.baseState,Y===null)J.memoizedState=X;else{Z=Y.next;var U=H=null,G=null,K=Z,O=!1;do{var F=K.lane&-536870913;if(F!==K.lane?(JJ&F)===F:(W8&F)===F){var q=K.revertLane;if(q===0)G!==null&&(G=G.next={lane:0,revertLane:0,gesture:null,action:K.action,hasEagerState:K.hasEagerState,eagerState:K.eagerState,next:null}),F===xZ&&(O=!0);else if((W8&q)===q){K=K.next,q===xZ&&(O=!0);continue}else F={lane:0,revertLane:K.revertLane,gesture:null,action:K.action,hasEagerState:K.hasEagerState,eagerState:K.eagerState,next:null},G===null?(U=G=F,H=X):G=G.next=F,h0.lanes|=q,i8|=q;F=K.action,D9&&W(X,F),X=K.hasEagerState?K.eagerState:W(X,F)}else q={lane:F,revertLane:K.revertLane,gesture:K.gesture,action:K.action,hasEagerState:K.hasEagerState,eagerState:K.eagerState,next:null},G===null?(U=G=q,H=X):G=G.next=q,h0.lanes|=F,i8|=F;K=K.next}while(K!==null&&K!==Z);if(G===null?H=X:G.next=U,!l7(X,J.memoizedState)&&(aJ=!0,O&&(W=EZ,W!==null)))throw W;J.memoizedState=X,J.baseState=H,J.baseQueue=G,Q.lastRenderedState=X}return Y===null&&(Q.lanes=0),[J.memoizedState,Q.dispatch]}function wU(J){var Z=lJ(),W=Z.queue;if(W===null)throw Error(J0(311));W.lastRenderedReducer=J;var{dispatch:Q,pending:Y}=W,X=Z.memoizedState;if(Y!==null){W.pending=null;var H=Y=Y.next;do X=J(X,H.action),H=H.next;while(H!==Y);l7(X,Z.memoizedState)||(aJ=!0),Z.memoizedState=X,Z.baseQueue===null&&(Z.baseState=X),W.lastRenderedState=X}return[X,Q]}function YR(J,Z,W){var Q=h0,Y=lJ(),X=QJ;if(X){if(W===void 0)throw Error(J0(407));W=W()}else W=Z();var H=!l7((BJ||Y).memoizedState,W);if(H&&(Y.memoizedState=W,aJ=!0),Y=Y.queue,RK(UR.bind(null,Q,Y,J),[J]),Y.getSnapshot!==Z||H||sJ!==null&&sJ.memoizedState.tag&1){if(Q.flags|=2048,gZ(9,{destroy:void 0},HR.bind(null,Q,Y,W,Z),null),IJ===null)throw Error(J0(349));X||(W8&127)!==0||XR(Q,Z,W)}return W}function XR(J,Z,W){J.flags|=16384,J={getSnapshot:Z,value:W},Z=h0.updateQueue,Z===null?(Z=kX(),h0.updateQueue=Z,Z.stores=[J]):(W=Z.stores,W===null?Z.stores=[J]:W.push(J))}function HR(J,Z,W,Q){Z.value=W,Z.getSnapshot=Q,GR(Z)&&KR(J)}function UR(J,Z,W){return W(function(){GR(Z)&&KR(J)})}function GR(J){var Z=J.getSnapshot;J=J.value;try{var W=Z();return!l7(J,W)}catch(Q){return!0}}function KR(J){var Z=P9(J,2);Z!==null&&V7(Z,J,2)}function RG(J){var Z=A7();if(typeof J==="function"){var W=J;if(J=W(),D9){P8(!0);try{W()}finally{P8(!1)}}}return Z.memoizedState=Z.baseState=J,Z.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Q8,lastRenderedState:J},Z}function qR(J,Z,W,Q){return J.baseState=W,OK(J,BJ,typeof Q==="function"?Q:Q8)}function Tz(J,Z,W,Q,Y){if(TX(J))throw Error(J0(485));if(J=Z.action,J!==null){var X={payload:Y,action:J,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(H){X.listeners.push(H)}};y0.T!==null?W(!0):X.isTransition=!1,Q(X),W=Z.pending,W===null?(X.next=Z.pending=X,$R(Z,X)):(X.next=W.next,Z.pending=W.next=X)}}function $R(J,Z){var{action:W,payload:Q}=Z,Y=J.state;if(Z.isTransition){var X=y0.T,H={};y0.T=H;try{var U=W(Y,Q),G=y0.S;G!==null&&G(H,U),O1(J,Z,U)}catch(K){FG(J,Z,K)}finally{X!==null&&H.types!==null&&(X.types=H.types),y0.T=X}}else try{X=W(Y,Q),O1(J,Z,X)}catch(K){FG(J,Z,K)}}function O1(J,Z,W){W!==null&&typeof W==="object"&&typeof W.then==="function"?W.then(function(Q){R1(J,Z,Q)},function(Q){return FG(J,Z,Q)}):R1(J,Z,W)}function R1(J,Z,W){Z.status="fulfilled",Z.value=W,OR(Z),J.state=W,Z=J.pending,Z!==null&&(W=Z.next,W===Z?J.pending=null:(W=W.next,Z.next=W,$R(J,W)))}function FG(J,Z,W){var Q=J.pending;if(J.pending=null,Q!==null){Q=Q.next;do Z.status="rejected",Z.reason=W,OR(Z),Z=Z.next;while(Z!==Q)}J.action=null}function OR(J){J=J.listeners;for(var Z=0;Z<J.length;Z++)(0,J[Z])()}function RR(J,Z){return Z}function F1(J,Z){if(QJ){var W=IJ.formState;if(W!==null){J:{var Q=h0;if(QJ){if(EJ){Z:{var Y=EJ;for(var X=X6;Y.nodeType!==8;){if(!X){Y=null;break Z}if(Y=U6(Y.nextSibling),Y===null){Y=null;break Z}}X=Y.data,Y=X==="F!"||X==="F"?Y:null}if(Y){EJ=U6(Y.nextSibling),Q=Y.data==="F!";break J}}l8(Q)}Q=!1}Q&&(Z=W[0])}}return W=A7(),W.memoizedState=W.baseState=Z,Q={pending:null,lanes:0,dispatch:null,lastRenderedReducer:RR,lastRenderedState:Z},W.queue=Q,W=PR.bind(null,h0,Q),Q.dispatch=W,Q=RG(!1),X=LK.bind(null,h0,!1,Q.queue),Q=A7(),Y={state:Z,dispatch:null,action:J,pending:null},Q.queue=Y,W=Tz.bind(null,h0,Y,X,W),Y.dispatch=W,Q.memoizedState=J,[Z,W,!1]}function M1(J){var Z=lJ();return FR(Z,BJ,J)}function FR(J,Z,W){if(Z=OK(J,Z,RR)[0],J=bY(Q8)[0],typeof Z==="object"&&Z!==null&&typeof Z.then==="function")try{var Q=VQ(Z)}catch(H){if(H===nZ)throw DX;throw H}else Q=Z;Z=lJ();var Y=Z.queue,X=Y.dispatch;return W!==Z.memoizedState&&(h0.flags|=2048,gZ(9,{destroy:void 0},Pz.bind(null,Y,W),null)),[Q,X,J]}function Pz(J,Z){J.action=Z}function N1(J){var Z=lJ(),W=BJ;if(W!==null)return FR(Z,W,J);lJ(),Z=Z.memoizedState,W=lJ();var Q=W.queue.dispatch;return W.memoizedState=J,[Z,Q,!1]}function gZ(J,Z,W,Q){return J={tag:J,create:W,deps:Q,inst:Z,next:null},Z=h0.updateQueue,Z===null&&(Z=kX(),h0.updateQueue=Z),W=Z.lastEffect,W===null?Z.lastEffect=J.next=J:(Q=W.next,W.next=J,J.next=Q,Z.lastEffect=J),J}function MR(){return lJ().memoizedState}function yY(J,Z,W,Q){var Y=A7();h0.flags|=J,Y.memoizedState=gZ(1|Z,{destroy:void 0},W,Q===void 0?null:Q)}function VX(J,Z,W,Q){var Y=lJ();Q=Q===void 0?null:Q;var X=Y.memoizedState.inst;BJ!==null&&Q!==null&&HK(Q,BJ.memoizedState.deps)?Y.memoizedState=gZ(Z,X,W,Q):(h0.flags|=J,Y.memoizedState=gZ(1|Z,X,W,Q))}function L1(J,Z){yY(8390656,8,J,Z)}function RK(J,Z){VX(2048,8,J,Z)}function Ez(J){h0.flags|=4;var Z=h0.updateQueue;if(Z===null)Z=kX(),h0.updateQueue=Z,Z.events=[J];else{var W=Z.events;W===null?Z.events=[J]:W.push(J)}}function NR(J){var Z=lJ().memoizedState;return Ez({ref:Z,nextImpl:J}),function(){if((KJ&2)!==0)throw Error(J0(440));return Z.impl.apply(void 0,arguments)}}function LR(J,Z){return VX(4,2,J,Z)}function BR(J,Z){return VX(4,4,J,Z)}function zR(J,Z){if(typeof Z==="function"){J=J();var W=Z(J);return function(){typeof W==="function"?W():Z(null)}}if(Z!==null&&Z!==void 0)return J=J(),Z.current=J,function(){Z.current=null}}function AR(J,Z,W){W=W!==null&&W!==void 0?W.concat([J]):null,VX(4,4,zR.bind(null,Z,J),W)}function FK(){}function _R(J,Z){var W=lJ();Z=Z===void 0?null:Z;var Q=W.memoizedState;if(Z!==null&&HK(Z,Q[1]))return Q[0];return W.memoizedState=[J,Z],J}function IR(J,Z){var W=lJ();Z=Z===void 0?null:Z;var Q=W.memoizedState;if(Z!==null&&HK(Z,Q[1]))return Q[0];if(Q=J(),D9){P8(!0);try{J()}finally{P8(!1)}}return W.memoizedState=[Q,Z],Q}function MK(J,Z,W){if(W===void 0||(W8&1073741824)!==0&&(JJ&261930)===0)return J.memoizedState=Z;return J.memoizedState=W,J=qF(),h0.lanes|=J,i8|=J,W}function wR(J,Z,W,Q){if(l7(W,Z))return W;if(hZ.current!==null)return J=MK(J,W,Q),l7(J,Z)||(aJ=!0),J;if((W8&42)===0||(W8&1073741824)!==0&&(JJ&261930)===0)return aJ=!0,J.memoizedState=W;return J=qF(),h0.lanes|=J,i8|=J,Z}function DR(J,Z,W,Q,Y){var X=qJ.p;qJ.p=X!==0&&8>X?X:8;var H=y0.T,U={};y0.T=U,LK(J,!1,Z,W);try{var G=Y(),K=y0.S;if(K!==null&&K(U,G),G!==null&&typeof G==="object"&&typeof G.then==="function"){var O=kz(G,Q);JQ(J,Z,O,u7(J))}else JQ(J,Z,Q,u7(J))}catch(F){JQ(J,Z,{then:function(){},status:"rejected",reason:F},u7())}finally{qJ.p=X,H!==null&&U.types!==null&&(H.types=U.types),y0.T=H}}function Sz(){}function MG(J,Z,W,Q){if(J.tag!==5)throw Error(J0(476));var Y=kR(J).queue;DR(J,Y,Z,N9,W===null?Sz:function(){return CR(J),W(Q)})}function kR(J){var Z=J.memoizedState;if(Z!==null)return Z;Z={memoizedState:N9,baseState:N9,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Q8,lastRenderedState:N9},next:null};var W={};return Z.next={memoizedState:W,baseState:W,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Q8,lastRenderedState:W},next:null},J.memoizedState=Z,J=J.alternate,J!==null&&(J.memoizedState=Z),Z}function CR(J){var Z=kR(J);Z.next===null&&(Z=J.alternate.memoizedState),JQ(J,Z.next.queue,{},u7())}function NK(){return q7(LQ)}function VR(){return lJ().memoizedState}function TR(){return lJ().memoizedState}function jz(J){for(var Z=J.return;Z!==null;){switch(Z.tag){case 24:case 3:var W=u7();J=v8(W);var Q=x8(Z,J,W);Q!==null&&(V7(Q,Z,W),rW(Q,Z,W)),Z={cache:ZK()},J.payload=Z;return}Z=Z.return}}function fz(J,Z,W){var Q=u7();W={lane:Q,revertLane:0,gesture:null,action:W,hasEagerState:!1,eagerState:null,next:null},TX(J)?ER(Z,W):(W=rG(J,Z,W,Q),W!==null&&(V7(W,J,Q),SR(W,Z,Q)))}function PR(J,Z,W){var Q=u7();JQ(J,Z,W,Q)}function JQ(J,Z,W,Q){var Y={lane:Q,revertLane:0,gesture:null,action:W,hasEagerState:!1,eagerState:null,next:null};if(TX(J))ER(Z,Y);else{var X=J.alternate;if(J.lanes===0&&(X===null||X.lanes===0)&&(X=Z.lastRenderedReducer,X!==null))try{var H=Z.lastRenderedState,U=X(H,W);if(Y.hasEagerState=!0,Y.eagerState=U,l7(U,H))return wX(J,Z,Y,0),IJ===null&&IX(),!1}catch(G){}finally{}if(W=rG(J,Z,Y,Q),W!==null)return V7(W,J,Q),SR(W,Z,Q),!0}return!1}function LK(J,Z,W,Q){if(Q={lane:2,revertLane:CK(),gesture:null,action:Q,hasEagerState:!1,eagerState:null,next:null},TX(J)){if(Z)throw Error(J0(479))}else Z=rG(J,W,Q,2),Z!==null&&V7(Z,J,2)}function TX(J){var Z=J.alternate;return J===h0||Z!==null&&Z===h0}function ER(J,Z){jZ=ZX=!0;var W=J.pending;W===null?Z.next=Z:(Z.next=W.next,W.next=Z),J.pending=Z}function SR(J,Z,W){if((W&4194048)!==0){var Q=Z.lanes;Q&=J.pendingLanes,W|=Q,Z.lanes=W,NO(J,W)}}function DU(J,Z,W,Q){Z=J.memoizedState,W=W(Q,Z),W=W===null||W===void 0?Z:SJ({},Z,W),J.memoizedState=W,J.lanes===0&&(J.updateQueue.baseState=W)}function B1(J,Z,W,Q,Y,X,H){return J=J.stateNode,typeof J.shouldComponentUpdate==="function"?J.shouldComponentUpdate(Q,X,H):Z.prototype&&Z.prototype.isPureReactComponent?!KQ(W,Q)||!KQ(Y,X):!0}function z1(J,Z,W,Q){J=Z.state,typeof Z.componentWillReceiveProps==="function"&&Z.componentWillReceiveProps(W,Q),typeof Z.UNSAFE_componentWillReceiveProps==="function"&&Z.UNSAFE_componentWillReceiveProps(W,Q),Z.state!==J&&NG.enqueueReplaceState(Z,Z.state,null)}function k9(J,Z){var W=Z;if("ref"in Z){W={};for(var Q in Z)Q!=="ref"&&(W[Q]=Z[Q])}if(J=J.defaultProps){W===Z&&(W=SJ({},W));for(var Y in J)W[Y]===void 0&&(W[Y]=J[Y])}return W}function bR(J){nY(J)}function yR(J){console.error(J)}function vR(J){nY(J)}function QX(J,Z){try{var W=J.onUncaughtError;W(Z.value,{componentStack:Z.stack})}catch(Q){setTimeout(function(){throw Q})}}function A1(J,Z,W){try{var Q=J.onCaughtError;Q(W.value,{componentStack:W.stack,errorBoundary:Z.tag===1?Z.stateNode:null})}catch(Y){setTimeout(function(){throw Y})}}function LG(J,Z,W){return W=v8(W),W.tag=3,W.payload={element:null},W.callback=function(){QX(J,Z)},W}function xR(J){return J=v8(J),J.tag=3,J}function hR(J,Z,W,Q){var Y=W.type.getDerivedStateFromError;if(typeof Y==="function"){var X=Q.value;J.payload=function(){return Y(X)},J.callback=function(){A1(Z,W,Q)}}var H=W.stateNode;H!==null&&typeof H.componentDidCatch==="function"&&(J.callback=function(){A1(Z,W,Q),typeof Y!=="function"&&(h8===null?h8=new Set([this]):h8.add(this));var U=Q.stack;this.componentDidCatch(Q.value,{componentStack:U!==null?U:""})})}function bz(J,Z,W,Q,Y){if(W.flags|=32768,Q!==null&&typeof Q==="object"&&typeof Q.then==="function"){if(Z=W.alternate,Z!==null&&sZ(Z,W,Y,!0),W=c7.current,W!==null){switch(W.tag){case 31:case 13:return H6===null?GX():W.alternate===null&&gJ===0&&(gJ=3),W.flags&=-257,W.flags|=65536,W.lanes=Y,Q===tY?W.flags|=16384:(Z=W.updateQueue,Z===null?W.updateQueue=new Set([Q]):Z.add(Q),yU(J,Q,Y)),!1;case 22:return W.flags|=65536,Q===tY?W.flags|=16384:(Z=W.updateQueue,Z===null?(Z={transitions:null,markerInstances:null,retryQueue:new Set([Q])},W.updateQueue=Z):(W=Z.retryQueue,W===null?Z.retryQueue=new Set([Q]):W.add(Q)),yU(J,Q,Y)),!1}throw Error(J0(435,W.tag))}return yU(J,Q,Y),GX(),!1}if(QJ)return Z=c7.current,Z!==null?((Z.flags&65536)===0&&(Z.flags|=256),Z.flags|=65536,Z.lanes=Y,Q!==YG&&(J=Error(J0(422),{cause:Q}),$Q(Y6(J,W)))):(Q!==YG&&(Z=Error(J0(423),{cause:Q}),$Q(Y6(Z,W))),J=J.current.alternate,J.flags|=65536,Y&=-Y,J.lanes|=Y,Q=Y6(Q,W),Y=LG(J.stateNode,Q,Y),IU(J,Y),gJ!==4&&(gJ=2)),!1;var X=Error(J0(520),{cause:Q});if(X=Y6(X,W),QQ===null?QQ=[X]:QQ.push(X),gJ!==4&&(gJ=2),Z===null)return!0;Q=Y6(Q,W),W=Z;do{switch(W.tag){case 3:return W.flags|=65536,J=Y&-Y,W.lanes|=J,J=LG(W.stateNode,Q,J),IU(W,J),!1;case 1:if(Z=W.type,X=W.stateNode,(W.flags&128)===0&&(typeof Z.getDerivedStateFromError==="function"||X!==null&&typeof X.componentDidCatch==="function"&&(h8===null||!h8.has(X))))return W.flags|=65536,Y&=-Y,W.lanes|=Y,Y=xR(Y),hR(Y,J,W,Q),IU(W,Y),!1}W=W.return}while(W!==null);return!1}function U7(J,Z,W,Q){Z.child=J===null?tO(Z,null,W,Q):w9(Z,J.child,W,Q)}function _1(J,Z,W,Q,Y){W=W.render;var X=Z.ref;if("ref"in Q){var H={};for(var U in Q)U!=="ref"&&(H[U]=Q[U])}else H=Q;if(I9(Z),Q=UK(J,Z,W,H,X,Y),U=GK(),J!==null&&!aJ)return KK(J,Z,Y),Y8(J,Z,Y);return QJ&&U&&eG(Z),Z.flags|=1,U7(J,Z,Q,Y),Z.child}function I1(J,Z,W,Q,Y){if(J===null){var X=W.type;if(typeof X==="function"&&!tG(X)&&X.defaultProps===void 0&&W.compare===null)return Z.tag=15,Z.type=X,gR(J,Z,X,Q,Y);return J=jY(W.type,null,Q,Z,Z.mode,Y),J.ref=Z.ref,J.return=Z,Z.child=J}if(X=J.child,!AK(J,Y)){var H=X.memoizedProps;if(W=W.compare,W=W!==null?W:KQ,W(H,Q)&&J.ref===Z.ref)return Y8(J,Z,Y)}return Z.flags|=1,J=t6(X,Q),J.ref=Z.ref,J.return=Z,Z.child=J}function gR(J,Z,W,Q,Y){if(J!==null){var X=J.memoizedProps;if(KQ(X,Q)&&J.ref===Z.ref)if(aJ=!1,Z.pendingProps=Q=X,AK(J,Y))(J.flags&131072)!==0&&(aJ=!0);else return Z.lanes=J.lanes,Y8(J,Z,Y)}return BG(J,Z,W,Q,Y)}function mR(J,Z,W,Q){var Y=Q.children,X=J!==null?J.memoizedState:null;if(J===null&&Z.stateNode===null&&(Z.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),Q.mode==="hidden"){if((Z.flags&128)!==0){if(X=X!==null?X.baseLanes|W:W,J!==null){Q=Z.child=J.child;for(Y=0;Q!==null;)Y=Y|Q.lanes|Q.childLanes,Q=Q.sibling;Q=Y&~X}else Q=0,Z.child=null;return w1(J,Z,X,W,Q)}if((W&536870912)!==0)Z.memoizedState={baseLanes:0,cachePool:null},J!==null&&fY(Z,X!==null?X.cachePool:null),X!==null?$1(Z,X):$G(),ZR(Z);else return Q=Z.lanes=536870912,w1(J,Z,X!==null?X.baseLanes|W:W,W,Q)}else X!==null?(fY(Z,X.cachePool),$1(Z,X),V8(Z),Z.memoizedState=null):(J!==null&&fY(Z,null),$G(),V8(Z));return U7(J,Z,Y,W),Z.child}function uW(J,Z){return J!==null&&J.tag===22||Z.stateNode!==null||(Z.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),Z.sibling}function w1(J,Z,W,Q,Y){var X=WK();return X=X===null?null:{parent:oJ._currentValue,pool:X},Z.memoizedState={baseLanes:W,cachePool:X},J!==null&&fY(Z,null),$G(),ZR(Z),J!==null&&sZ(J,Z,Q,!0),Z.childLanes=Y,null}function vY(J,Z){return Z=YX({mode:Z.mode,children:Z.children},J.mode),Z.ref=J.ref,J.child=Z,Z.return=J,Z}function D1(J,Z,W){return w9(Z,J.child,null,W),J=vY(Z,Z.pendingProps),J.flags|=2,x7(Z),Z.memoizedState=null,J}function yz(J,Z,W){var Q=Z.pendingProps,Y=(Z.flags&128)!==0;if(Z.flags&=-129,J===null){if(QJ){if(Q.mode==="hidden")return J=vY(Z,Q),Z.lanes=536870912,uW(null,J);if(OG(Z),(J=EJ)?(J=jF(J,X6),J=J!==null&&J.data==="&"?J:null,J!==null&&(Z.memoizedState={dehydrated:J,treeContext:u8!==null?{id:T6,overflow:P6}:null,retryLane:536870912,hydrationErrors:null},W=cO(J),W.return=Z,Z.child=W,K7=Z,EJ=null)):J=null,J===null)throw l8(Z);return Z.lanes=536870912,null}return vY(Z,Q)}var X=J.memoizedState;if(X!==null){var H=X.dehydrated;if(OG(Z),Y)if(Z.flags&256)Z.flags&=-257,Z=D1(J,Z,W);else if(Z.memoizedState!==null)Z.child=J.child,Z.flags|=128,Z=null;else throw Error(J0(558));else if(aJ||sZ(J,Z,W,!1),Y=(W&J.childLanes)!==0,aJ||Y){if(Q=IJ,Q!==null&&(H=LO(Q,W),H!==0&&H!==X.retryLane))throw X.retryLane=H,P9(J,H),V7(Q,J,H),zK;GX(),Z=D1(J,Z,W)}else J=X.treeContext,EJ=U6(H.nextSibling),K7=Z,QJ=!0,y8=null,X6=!1,J!==null&&sO(Z,J),Z=vY(Z,Q),Z.flags|=4096;return Z}return J=t6(J.child,{mode:Q.mode,children:Q.children}),J.ref=Z.ref,Z.child=J,J.return=Z,J}function xY(J,Z){var W=Z.ref;if(W===null)J!==null&&J.ref!==null&&(Z.flags|=4194816);else{if(typeof W!=="function"&&typeof W!=="object")throw Error(J0(284));if(J===null||J.ref!==W)Z.flags|=4194816}}function BG(J,Z,W,Q,Y){if(I9(Z),W=UK(J,Z,W,Q,void 0,Y),Q=GK(),J!==null&&!aJ)return KK(J,Z,Y),Y8(J,Z,Y);return QJ&&Q&&eG(Z),Z.flags|=1,U7(J,Z,W,Y),Z.child}function k1(J,Z,W,Q,Y,X){if(I9(Z),Z.updateQueue=null,W=QR(Z,Q,W,Y),WR(J),Q=GK(),J!==null&&!aJ)return KK(J,Z,X),Y8(J,Z,X);return QJ&&Q&&eG(Z),Z.flags|=1,U7(J,Z,W,X),Z.child}function C1(J,Z,W,Q,Y){if(I9(Z),Z.stateNode===null){var X=wZ,H=W.contextType;typeof H==="object"&&H!==null&&(X=q7(H)),X=new W(Q,X),Z.memoizedState=X.state!==null&&X.state!==void 0?X.state:null,X.updater=NG,Z.stateNode=X,X._reactInternals=Z,X=Z.stateNode,X.props=Q,X.state=Z.memoizedState,X.refs={},YK(Z),H=W.contextType,X.context=typeof H==="object"&&H!==null?q7(H):wZ,X.state=Z.memoizedState,H=W.getDerivedStateFromProps,typeof H==="function"&&(DU(Z,W,H,Q),X.state=Z.memoizedState),typeof W.getDerivedStateFromProps==="function"||typeof X.getSnapshotBeforeUpdate==="function"||typeof X.UNSAFE_componentWillMount!=="function"&&typeof X.componentWillMount!=="function"||(H=X.state,typeof X.componentWillMount==="function"&&X.componentWillMount(),typeof X.UNSAFE_componentWillMount==="function"&&X.UNSAFE_componentWillMount(),H!==X.state&&NG.enqueueReplaceState(X,X.state,null),eW(Z,Q,X,Y),tW(),X.state=Z.memoizedState),typeof X.componentDidMount==="function"&&(Z.flags|=4194308),Q=!0}else if(J===null){X=Z.stateNode;var U=Z.memoizedProps,G=k9(W,U);X.props=G;var K=X.context,O=W.contextType;H=wZ,typeof O==="object"&&O!==null&&(H=q7(O));var F=W.getDerivedStateFromProps;O=typeof F==="function"||typeof X.getSnapshotBeforeUpdate==="function",U=Z.pendingProps!==U,O||typeof X.UNSAFE_componentWillReceiveProps!=="function"&&typeof X.componentWillReceiveProps!=="function"||(U||K!==H)&&z1(Z,X,Q,H),D8=!1;var q=Z.memoizedState;X.state=q,eW(Z,Q,X,Y),tW(),K=Z.memoizedState,U||q!==K||D8?(typeof F==="function"&&(DU(Z,W,F,Q),K=Z.memoizedState),(G=D8||B1(Z,W,G,Q,q,K,H))?(O||typeof X.UNSAFE_componentWillMount!=="function"&&typeof X.componentWillMount!=="function"||(typeof X.componentWillMount==="function"&&X.componentWillMount(),typeof X.UNSAFE_componentWillMount==="function"&&X.UNSAFE_componentWillMount()),typeof X.componentDidMount==="function"&&(Z.flags|=4194308)):(typeof X.componentDidMount==="function"&&(Z.flags|=4194308),Z.memoizedProps=Q,Z.memoizedState=K),X.props=Q,X.state=K,X.context=H,Q=G):(typeof X.componentDidMount==="function"&&(Z.flags|=4194308),Q=!1)}else{X=Z.stateNode,KG(J,Z),H=Z.memoizedProps,O=k9(W,H),X.props=O,F=Z.pendingProps,q=X.context,K=W.contextType,G=wZ,typeof K==="object"&&K!==null&&(G=q7(K)),U=W.getDerivedStateFromProps,(K=typeof U==="function"||typeof X.getSnapshotBeforeUpdate==="function")||typeof X.UNSAFE_componentWillReceiveProps!=="function"&&typeof X.componentWillReceiveProps!=="function"||(H!==F||q!==G)&&z1(Z,X,Q,G),D8=!1,q=Z.memoizedState,X.state=q,eW(Z,Q,X,Y),tW();var R=Z.memoizedState;H!==F||q!==R||D8||J!==null&&J.dependencies!==null&&rY(J.dependencies)?(typeof U==="function"&&(DU(Z,W,U,Q),R=Z.memoizedState),(O=D8||B1(Z,W,O,Q,q,R,G)||J!==null&&J.dependencies!==null&&rY(J.dependencies))?(K||typeof X.UNSAFE_componentWillUpdate!=="function"&&typeof X.componentWillUpdate!=="function"||(typeof X.componentWillUpdate==="function"&&X.componentWillUpdate(Q,R,G),typeof X.UNSAFE_componentWillUpdate==="function"&&X.UNSAFE_componentWillUpdate(Q,R,G)),typeof X.componentDidUpdate==="function"&&(Z.flags|=4),typeof X.getSnapshotBeforeUpdate==="function"&&(Z.flags|=1024)):(typeof X.componentDidUpdate!=="function"||H===J.memoizedProps&&q===J.memoizedState||(Z.flags|=4),typeof X.getSnapshotBeforeUpdate!=="function"||H===J.memoizedProps&&q===J.memoizedState||(Z.flags|=1024),Z.memoizedProps=Q,Z.memoizedState=R),X.props=Q,X.state=R,X.context=G,Q=O):(typeof X.componentDidUpdate!=="function"||H===J.memoizedProps&&q===J.memoizedState||(Z.flags|=4),typeof X.getSnapshotBeforeUpdate!=="function"||H===J.memoizedProps&&q===J.memoizedState||(Z.flags|=1024),Q=!1)}return X=Q,xY(J,Z),Q=(Z.flags&128)!==0,X||Q?(X=Z.stateNode,W=Q&&typeof W.getDerivedStateFromError!=="function"?null:X.render(),Z.flags|=1,J!==null&&Q?(Z.child=w9(Z,J.child,null,Y),Z.child=w9(Z,null,W,Y)):U7(J,Z,W,Y),Z.memoizedState=X.state,J=Z.child):J=Y8(J,Z,Y),J}function V1(J,Z,W,Q){return _9(),Z.flags|=256,U7(J,Z,W,Q),Z.child}function CU(J){return{baseLanes:J,cachePool:oO()}}function VU(J,Z,W){return J=J!==null?J.childLanes&~W:0,Z&&(J|=g7),J}function pR(J,Z,W){var Q=Z.pendingProps,Y=!1,X=(Z.flags&128)!==0,H;if((H=X)||(H=J!==null&&J.memoizedState===null?!1:(uJ.current&2)!==0),H&&(Y=!0,Z.flags&=-129),H=(Z.flags&32)!==0,Z.flags&=-33,J===null){if(QJ){if(Y?C8(Z):V8(Z),(J=EJ)?(J=jF(J,X6),J=J!==null&&J.data!=="&"?J:null,J!==null&&(Z.memoizedState={dehydrated:J,treeContext:u8!==null?{id:T6,overflow:P6}:null,retryLane:536870912,hydrationErrors:null},W=cO(J),W.return=Z,Z.child=W,K7=Z,EJ=null)):J=null,J===null)throw l8(Z);return bG(J)?Z.lanes=32:Z.lanes=536870912,null}var U=Q.children;if(Q=Q.fallback,Y)return V8(Z),Y=Z.mode,U=YX({mode:"hidden",children:U},Y),Q=L9(Q,Y,W,null),U.return=Z,Q.return=Z,U.sibling=Q,Z.child=U,Q=Z.child,Q.memoizedState=CU(W),Q.childLanes=VU(J,H,W),Z.memoizedState=kU,uW(null,Q);return C8(Z),zG(Z,U)}var G=J.memoizedState;if(G!==null&&(U=G.dehydrated,U!==null)){if(X)Z.flags&256?(C8(Z),Z.flags&=-257,Z=TU(J,Z,W)):Z.memoizedState!==null?(V8(Z),Z.child=J.child,Z.flags|=128,Z=null):(V8(Z),U=Q.fallback,Y=Z.mode,Q=YX({mode:"visible",children:Q.children},Y),U=L9(U,Y,W,null),U.flags|=2,Q.return=Z,U.return=Z,Q.sibling=U,Z.child=Q,w9(Z,J.child,null,W),Q=Z.child,Q.memoizedState=CU(W),Q.childLanes=VU(J,H,W),Z.memoizedState=kU,Z=uW(null,Q));else if(C8(Z),bG(U)){if(H=U.nextSibling&&U.nextSibling.dataset,H)var K=H.dgst;H=K,Q=Error(J0(419)),Q.stack="",Q.digest=H,$Q({value:Q,source:null,stack:null}),Z=TU(J,Z,W)}else if(aJ||sZ(J,Z,W,!1),H=(W&J.childLanes)!==0,aJ||H){if(H=IJ,H!==null&&(Q=LO(H,W),Q!==0&&Q!==G.retryLane))throw G.retryLane=Q,P9(J,Q),V7(H,J,Q),zK;fG(U)||GX(),Z=TU(J,Z,W)}else fG(U)?(Z.flags|=192,Z.child=J.child,Z=null):(J=G.treeContext,EJ=U6(U.nextSibling),K7=Z,QJ=!0,y8=null,X6=!1,J!==null&&sO(Z,J),Z=zG(Z,Q.children),Z.flags|=4096);return Z}if(Y)return V8(Z),U=Q.fallback,Y=Z.mode,G=J.child,K=G.sibling,Q=t6(G,{mode:"hidden",children:Q.children}),Q.subtreeFlags=G.subtreeFlags&65011712,K!==null?U=t6(K,U):(U=L9(U,Y,W,null),U.flags|=2),U.return=Z,Q.return=Z,Q.sibling=U,Z.child=Q,uW(null,Q),Q=Z.child,U=J.child.memoizedState,U===null?U=CU(W):(Y=U.cachePool,Y!==null?(G=oJ._currentValue,Y=Y.parent!==G?{parent:G,pool:G}:Y):Y=oO(),U={baseLanes:U.baseLanes|W,cachePool:Y}),Q.memoizedState=U,Q.childLanes=VU(J,H,W),Z.memoizedState=kU,uW(J.child,Q);return C8(Z),W=J.child,J=W.sibling,W=t6(W,{mode:"visible",children:Q.children}),W.return=Z,W.sibling=null,J!==null&&(H=Z.deletions,H===null?(Z.deletions=[J],Z.flags|=16):H.push(J)),Z.child=W,Z.memoizedState=null,W}function zG(J,Z){return Z=YX({mode:"visible",children:Z},J.mode),Z.return=J,J.child=Z}function YX(J,Z){return J=h7(22,J,null,Z),J.lanes=0,J}function TU(J,Z,W){return w9(Z,J.child,null,W),J=zG(Z,Z.pendingProps.children),J.flags|=2,Z.memoizedState=null,J}function T1(J,Z,W){J.lanes|=Z;var Q=J.alternate;Q!==null&&(Q.lanes|=Z),HG(J.return,Z,W)}function PU(J,Z,W,Q,Y,X){var H=J.memoizedState;H===null?J.memoizedState={isBackwards:Z,rendering:null,renderingStartTime:0,last:Q,tail:W,tailMode:Y,treeForkCount:X}:(H.isBackwards=Z,H.rendering=null,H.renderingStartTime=0,H.last=Q,H.tail=W,H.tailMode=Y,H.treeForkCount=X)}function dR(J,Z,W){var Q=Z.pendingProps,Y=Q.revealOrder,X=Q.tail;Q=Q.children;var H=uJ.current,U=(H&2)!==0;if(U?(H=H&1|2,Z.flags|=128):H&=1,CJ(uJ,H),U7(J,Z,Q,W),Q=QJ?qQ:0,!U&&J!==null&&(J.flags&128)!==0)J:for(J=Z.child;J!==null;){if(J.tag===13)J.memoizedState!==null&&T1(J,W,Z);else if(J.tag===19)T1(J,W,Z);else if(J.child!==null){J.child.return=J,J=J.child;continue}if(J===Z)break J;for(;J.sibling===null;){if(J.return===null||J.return===Z)break J;J=J.return}J.sibling.return=J.return,J=J.sibling}switch(Y){case"forwards":W=Z.child;for(Y=null;W!==null;)J=W.alternate,J!==null&&JX(J)===null&&(Y=W),W=W.sibling;W=Y,W===null?(Y=Z.child,Z.child=null):(Y=W.sibling,W.sibling=null),PU(Z,!1,Y,W,X,Q);break;case"backwards":case"unstable_legacy-backwards":W=null,Y=Z.child;for(Z.child=null;Y!==null;){if(J=Y.alternate,J!==null&&JX(J)===null){Z.child=Y;break}J=Y.sibling,Y.sibling=W,W=Y,Y=J}PU(Z,!0,W,null,X,Q);break;case"together":PU(Z,!1,null,null,void 0,Q);break;default:Z.memoizedState=null}return Z.child}function Y8(J,Z,W){if(J!==null&&(Z.dependencies=J.dependencies),i8|=Z.lanes,(W&Z.childLanes)===0)if(J!==null){if(sZ(J,Z,W,!1),(W&Z.childLanes)===0)return null}else return null;if(J!==null&&Z.child!==J.child)throw Error(J0(153));if(Z.child!==null){J=Z.child,W=t6(J,J.pendingProps),Z.child=W;for(W.return=Z;J.sibling!==null;)J=J.sibling,W=W.sibling=t6(J,J.pendingProps),W.return=Z;W.sibling=null}return Z.child}function AK(J,Z){if((J.lanes&Z)!==0)return!0;return J=J.dependencies,J!==null&&rY(J)?!0:!1}function vz(J,Z,W){switch(Z.tag){case 3:lY(Z,Z.stateNode.containerInfo),k8(Z,oJ,J.memoizedState.cache),_9();break;case 27:case 5:sU(Z);break;case 4:lY(Z,Z.stateNode.containerInfo);break;case 10:k8(Z,Z.type,Z.memoizedProps.value);break;case 31:if(Z.memoizedState!==null)return Z.flags|=128,OG(Z),null;break;case 13:var Q=Z.memoizedState;if(Q!==null){if(Q.dehydrated!==null)return C8(Z),Z.flags|=128,null;if((W&Z.child.childLanes)!==0)return pR(J,Z,W);return C8(Z),J=Y8(J,Z,W),J!==null?J.sibling:null}C8(Z);break;case 19:var Y=(J.flags&128)!==0;if(Q=(W&Z.childLanes)!==0,Q||(sZ(J,Z,W,!1),Q=(W&Z.childLanes)!==0),Y){if(Q)return dR(J,Z,W);Z.flags|=128}if(Y=Z.memoizedState,Y!==null&&(Y.rendering=null,Y.tail=null,Y.lastEffect=null),CJ(uJ,uJ.current),Q)break;else return null;case 22:return Z.lanes=0,mR(J,Z,W,Z.pendingProps);case 24:k8(Z,oJ,J.memoizedState.cache)}return Y8(J,Z,W)}function uR(J,Z,W){if(J!==null)if(J.memoizedProps!==Z.pendingProps)aJ=!0;else{if(!AK(J,W)&&(Z.flags&128)===0)return aJ=!1,vz(J,Z,W);aJ=(J.flags&131072)!==0?!0:!1}else aJ=!1,QJ&&(Z.flags&1048576)!==0&&iO(Z,qQ,Z.index);switch(Z.lanes=0,Z.tag){case 16:J:{var Q=Z.pendingProps;if(J=F9(Z.elementType),Z.type=J,typeof J==="function")tG(J)?(Q=k9(J,Q),Z.tag=1,Z=C1(null,Z,J,Q,W)):(Z.tag=0,Z=BG(null,Z,J,Q,W));else{if(J!==void 0&&J!==null){var Y=J.$$typeof;if(Y===hG){Z.tag=11,Z=_1(null,Z,J,Q,W);break J}else if(Y===gG){Z.tag=14,Z=I1(null,Z,J,Q,W);break J}}throw Z=cU(J)||J,Error(J0(306,Z,""))}}return Z;case 0:return BG(J,Z,Z.type,Z.pendingProps,W);case 1:return Q=Z.type,Y=k9(Q,Z.pendingProps),C1(J,Z,Q,Y,W);case 3:J:{if(lY(Z,Z.stateNode.containerInfo),J===null)throw Error(J0(387));Q=Z.pendingProps;var X=Z.memoizedState;Y=X.element,KG(J,Z),eW(Z,Q,null,W);var H=Z.memoizedState;if(Q=H.cache,k8(Z,oJ,Q),Q!==X.cache&&UG(Z,[oJ],W,!0),tW(),Q=H.element,X.isDehydrated)if(X={element:Q,isDehydrated:!1,cache:H.cache},Z.updateQueue.baseState=X,Z.memoizedState=X,Z.flags&256){Z=V1(J,Z,Q,W);break J}else if(Q!==Y){Y=Y6(Error(J0(424)),Z),$Q(Y),Z=V1(J,Z,Q,W);break J}else{switch(J=Z.stateNode.containerInfo,J.nodeType){case 9:J=J.body;break;default:J=J.nodeName==="HTML"?J.ownerDocument.body:J}EJ=U6(J.firstChild),K7=Z,QJ=!0,y8=null,X6=!0,W=tO(Z,null,Q,W);for(Z.child=W;W;)W.flags=W.flags&-3|4096,W=W.sibling}else{if(_9(),Q===Y){Z=Y8(J,Z,W);break J}U7(J,Z,Q,W)}Z=Z.child}return Z;case 26:return xY(J,Z),J===null?(W=n1(Z.type,null,Z.pendingProps,null))?Z.memoizedState=W:QJ||(W=Z.type,J=Z.pendingProps,Q=OX(b8.current).createElement(W),Q[G7]=Z,Q[T7]=J,$7(Q,W,J),Y7(Q),Z.stateNode=Q):Z.memoizedState=n1(Z.type,J.memoizedProps,Z.pendingProps,J.memoizedState),null;case 27:return sU(Z),J===null&&QJ&&(Q=Z.stateNode=fF(Z.type,Z.pendingProps,b8.current),K7=Z,X6=!0,Y=EJ,n8(Z.type)?(yG=Y,EJ=U6(Q.firstChild)):EJ=Y),U7(J,Z,Z.pendingProps.children,W),xY(J,Z),J===null&&(Z.flags|=4194304),Z.child;case 5:if(J===null&&QJ){if(Y=Q=EJ)Q=qA(Q,Z.type,Z.pendingProps,X6),Q!==null?(Z.stateNode=Q,K7=Z,EJ=U6(Q.firstChild),X6=!1,Y=!0):Y=!1;Y||l8(Z)}return sU(Z),Y=Z.type,X=Z.pendingProps,H=J!==null?J.memoizedProps:null,Q=X.children,SG(Y,X)?Q=null:H!==null&&SG(Y,H)&&(Z.flags|=32),Z.memoizedState!==null&&(Y=UK(J,Z,Vz,null,null,W),LQ._currentValue=Y),xY(J,Z),U7(J,Z,Q,W),Z.child;case 6:if(J===null&&QJ){if(J=W=EJ)W=$A(W,Z.pendingProps,X6),W!==null?(Z.stateNode=W,K7=Z,EJ=null,J=!0):J=!1;J||l8(Z)}return null;case 13:return pR(J,Z,W);case 4:return lY(Z,Z.stateNode.containerInfo),Q=Z.pendingProps,J===null?Z.child=w9(Z,null,Q,W):U7(J,Z,Q,W),Z.child;case 11:return _1(J,Z,Z.type,Z.pendingProps,W);case 7:return U7(J,Z,Z.pendingProps,W),Z.child;case 8:return U7(J,Z,Z.pendingProps.children,W),Z.child;case 12:return U7(J,Z,Z.pendingProps.children,W),Z.child;case 10:return Q=Z.pendingProps,k8(Z,Z.type,Q.value),U7(J,Z,Q.children,W),Z.child;case 9:return Y=Z.type._context,Q=Z.pendingProps.children,I9(Z),Y=q7(Y),Q=Q(Y),Z.flags|=1,U7(J,Z,Q,W),Z.child;case 14:return I1(J,Z,Z.type,Z.pendingProps,W);case 15:return gR(J,Z,Z.type,Z.pendingProps,W);case 19:return dR(J,Z,W);case 31:return yz(J,Z,W);case 22:return mR(J,Z,W,Z.pendingProps);case 24:return I9(Z),Q=q7(oJ),J===null?(Y=WK(),Y===null&&(Y=IJ,X=ZK(),Y.pooledCache=X,X.refCount++,X!==null&&(Y.pooledCacheLanes|=W),Y=X),Z.memoizedState={parent:Q,cache:Y},YK(Z),k8(Z,oJ,Y)):((J.lanes&W)!==0&&(KG(J,Z),eW(Z,null,null,W),tW()),Y=J.memoizedState,X=Z.memoizedState,Y.parent!==Q?(Y={parent:Q,cache:Q},Z.memoizedState=Y,Z.lanes===0&&(Z.memoizedState=Z.updateQueue.baseState=Y),k8(Z,oJ,Q)):(Q=X.cache,k8(Z,oJ,Q),Q!==Y.cache&&UG(Z,[oJ],W,!0))),U7(J,Z,Z.pendingProps.children,W),Z.child;case 29:throw Z.pendingProps}throw Error(J0(156,Z.tag))}function u6(J){J.flags|=4}function EU(J,Z,W,Q,Y){if(Z=(J.mode&32)!==0)Z=!1;if(Z){if(J.flags|=16777216,(Y&335544128)===Y)if(J.stateNode.complete)J.flags|=8192;else if(RF())J.flags|=8192;else throw z9=tY,QK}else J.flags&=-16777217}function P1(J,Z){if(Z.type!=="stylesheet"||(Z.state.loading&4)!==0)J.flags&=-16777217;else if(J.flags|=16777216,!vF(Z))if(RF())J.flags|=8192;else throw z9=tY,QK}function IY(J,Z){Z!==null&&(J.flags|=4),J.flags&16384&&(Z=J.tag!==22?FO():536870912,J.lanes|=Z,mZ|=Z)}function yW(J,Z){if(!QJ)switch(J.tailMode){case"hidden":Z=J.tail;for(var W=null;Z!==null;)Z.alternate!==null&&(W=Z),Z=Z.sibling;W===null?J.tail=null:W.sibling=null;break;case"collapsed":W=J.tail;for(var Q=null;W!==null;)W.alternate!==null&&(Q=W),W=W.sibling;Q===null?Z||J.tail===null?J.tail=null:J.tail.sibling=null:Q.sibling=null}}function PJ(J){var Z=J.alternate!==null&&J.alternate.child===J.child,W=0,Q=0;if(Z)for(var Y=J.child;Y!==null;)W|=Y.lanes|Y.childLanes,Q|=Y.subtreeFlags&65011712,Q|=Y.flags&65011712,Y.return=J,Y=Y.sibling;else for(Y=J.child;Y!==null;)W|=Y.lanes|Y.childLanes,Q|=Y.subtreeFlags,Q|=Y.flags,Y.return=J,Y=Y.sibling;return J.subtreeFlags|=Q,J.childLanes=W,Z}function xz(J,Z,W){var Q=Z.pendingProps;switch(JK(Z),Z.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return PJ(Z),null;case 1:return PJ(Z),null;case 3:if(W=Z.stateNode,Q=null,J!==null&&(Q=J.memoizedState.cache),Z.memoizedState.cache!==Q&&(Z.flags|=2048),e6(oJ),bZ(),W.pendingContext&&(W.context=W.pendingContext,W.pendingContext=null),J===null||J.child===null)qZ(Z)?u6(Z):J===null||J.memoizedState.isDehydrated&&(Z.flags&256)===0||(Z.flags|=1024,_U());return PJ(Z),null;case 26:var{type:Y,memoizedState:X}=Z;return J===null?(u6(Z),X!==null?(PJ(Z),P1(Z,X)):(PJ(Z),EU(Z,Y,null,Q,W))):X?X!==J.memoizedState?(u6(Z),PJ(Z),P1(Z,X)):(PJ(Z),Z.flags&=-16777217):(J=J.memoizedProps,J!==Q&&u6(Z),PJ(Z),EU(Z,Y,J,Q,W)),null;case 27:if(cY(Z),W=b8.current,Y=Z.type,J!==null&&Z.stateNode!=null)J.memoizedProps!==Q&&u6(Z);else{if(!Q){if(Z.stateNode===null)throw Error(J0(166));return PJ(Z),null}J=S6.current,qZ(Z)?Y1(Z,J):(J=fF(Y,Q,W),Z.stateNode=J,u6(Z))}return PJ(Z),null;case 5:if(cY(Z),Y=Z.type,J!==null&&Z.stateNode!=null)J.memoizedProps!==Q&&u6(Z);else{if(!Q){if(Z.stateNode===null)throw Error(J0(166));return PJ(Z),null}if(X=S6.current,qZ(Z))Y1(Z,X);else{var H=OX(b8.current);switch(X){case 1:X=H.createElementNS("http://www.w3.org/2000/svg",Y);break;case 2:X=H.createElementNS("http://www.w3.org/1998/Math/MathML",Y);break;default:switch(Y){case"svg":X=H.createElementNS("http://www.w3.org/2000/svg",Y);break;case"math":X=H.createElementNS("http://www.w3.org/1998/Math/MathML",Y);break;case"script":X=H.createElement("div"),X.innerHTML="<script></script>",X=X.removeChild(X.firstChild);break;case"select":X=typeof Q.is==="string"?H.createElement("select",{is:Q.is}):H.createElement("select"),Q.multiple?X.multiple=!0:Q.size&&(X.size=Q.size);break;default:X=typeof Q.is==="string"?H.createElement(Y,{is:Q.is}):H.createElement(Y)}}X[G7]=Z,X[T7]=Q;J:for(H=Z.child;H!==null;){if(H.tag===5||H.tag===6)X.appendChild(H.stateNode);else if(H.tag!==4&&H.tag!==27&&H.child!==null){H.child.return=H,H=H.child;continue}if(H===Z)break J;for(;H.sibling===null;){if(H.return===null||H.return===Z)break J;H=H.return}H.sibling.return=H.return,H=H.sibling}Z.stateNode=X;J:switch($7(X,Y,Q),Y){case"button":case"input":case"select":case"textarea":Q=!!Q.autoFocus;break J;case"img":Q=!0;break J;default:Q=!1}Q&&u6(Z)}}return PJ(Z),EU(Z,Z.type,J===null?null:J.memoizedProps,Z.pendingProps,W),null;case 6:if(J&&Z.stateNode!=null)J.memoizedProps!==Q&&u6(Z);else{if(typeof Q!=="string"&&Z.stateNode===null)throw Error(J0(166));if(J=b8.current,qZ(Z)){if(J=Z.stateNode,W=Z.memoizedProps,Q=null,Y=K7,Y!==null)switch(Y.tag){case 27:case 5:Q=Y.memoizedProps}J[G7]=Z,J=J.nodeValue===W||Q!==null&&Q.suppressHydrationWarning===!0||PF(J.nodeValue,W)?!0:!1,J||l8(Z,!0)}else J=OX(J).createTextNode(Q),J[G7]=Z,Z.stateNode=J}return PJ(Z),null;case 31:if(W=Z.memoizedState,J===null||J.memoizedState!==null){if(Q=qZ(Z),W!==null){if(J===null){if(!Q)throw Error(J0(318));if(J=Z.memoizedState,J=J!==null?J.dehydrated:null,!J)throw Error(J0(557));J[G7]=Z}else _9(),(Z.flags&128)===0&&(Z.memoizedState=null),Z.flags|=4;PJ(Z),J=!1}else W=_U(),J!==null&&J.memoizedState!==null&&(J.memoizedState.hydrationErrors=W),J=!0;if(!J){if(Z.flags&256)return x7(Z),Z;return x7(Z),null}if((Z.flags&128)!==0)throw Error(J0(558))}return PJ(Z),null;case 13:if(Q=Z.memoizedState,J===null||J.memoizedState!==null&&J.memoizedState.dehydrated!==null){if(Y=qZ(Z),Q!==null&&Q.dehydrated!==null){if(J===null){if(!Y)throw Error(J0(318));if(Y=Z.memoizedState,Y=Y!==null?Y.dehydrated:null,!Y)throw Error(J0(317));Y[G7]=Z}else _9(),(Z.flags&128)===0&&(Z.memoizedState=null),Z.flags|=4;PJ(Z),Y=!1}else Y=_U(),J!==null&&J.memoizedState!==null&&(J.memoizedState.hydrationErrors=Y),Y=!0;if(!Y){if(Z.flags&256)return x7(Z),Z;return x7(Z),null}}if(x7(Z),(Z.flags&128)!==0)return Z.lanes=W,Z;return W=Q!==null,J=J!==null&&J.memoizedState!==null,W&&(Q=Z.child,Y=null,Q.alternate!==null&&Q.alternate.memoizedState!==null&&Q.alternate.memoizedState.cachePool!==null&&(Y=Q.alternate.memoizedState.cachePool.pool),X=null,Q.memoizedState!==null&&Q.memoizedState.cachePool!==null&&(X=Q.memoizedState.cachePool.pool),X!==Y&&(Q.flags|=2048)),W!==J&&W&&(Z.child.flags|=8192),IY(Z,Z.updateQueue),PJ(Z),null;case 4:return bZ(),J===null&&VK(Z.stateNode.containerInfo),PJ(Z),null;case 10:return e6(Z.type),PJ(Z),null;case 19:if(X7(uJ),Q=Z.memoizedState,Q===null)return PJ(Z),null;if(Y=(Z.flags&128)!==0,X=Q.rendering,X===null)if(Y)yW(Q,!1);else{if(gJ!==0||J!==null&&(J.flags&128)!==0)for(J=Z.child;J!==null;){if(X=JX(J),X!==null){Z.flags|=128,yW(Q,!1),J=X.updateQueue,Z.updateQueue=J,IY(Z,J),Z.subtreeFlags=0,J=W;for(W=Z.child;W!==null;)lO(W,J),W=W.sibling;return CJ(uJ,uJ.current&1|2),QJ&&s6(Z,Q.treeForkCount),Z.child}J=J.sibling}Q.tail!==null&&m7()>HX&&(Z.flags|=128,Y=!0,yW(Q,!1),Z.lanes=4194304)}else{if(!Y)if(J=JX(X),J!==null){if(Z.flags|=128,Y=!0,J=J.updateQueue,Z.updateQueue=J,IY(Z,J),yW(Q,!0),Q.tail===null&&Q.tailMode==="hidden"&&!X.alternate&&!QJ)return PJ(Z),null}else 2*m7()-Q.renderingStartTime>HX&&W!==536870912&&(Z.flags|=128,Y=!0,yW(Q,!1),Z.lanes=4194304);Q.isBackwards?(X.sibling=Z.child,Z.child=X):(J=Q.last,J!==null?J.sibling=X:Z.child=X,Q.last=X)}if(Q.tail!==null)return J=Q.tail,Q.rendering=J,Q.tail=J.sibling,Q.renderingStartTime=m7(),J.sibling=null,W=uJ.current,CJ(uJ,Y?W&1|2:W&1),QJ&&s6(Z,Q.treeForkCount),J;return PJ(Z),null;case 22:case 23:return x7(Z),XK(),Q=Z.memoizedState!==null,J!==null?J.memoizedState!==null!==Q&&(Z.flags|=8192):Q&&(Z.flags|=8192),Q?(W&536870912)!==0&&(Z.flags&128)===0&&(PJ(Z),Z.subtreeFlags&6&&(Z.flags|=8192)):PJ(Z),W=Z.updateQueue,W!==null&&IY(Z,W.retryQueue),W=null,J!==null&&J.memoizedState!==null&&J.memoizedState.cachePool!==null&&(W=J.memoizedState.cachePool.pool),Q=null,Z.memoizedState!==null&&Z.memoizedState.cachePool!==null&&(Q=Z.memoizedState.cachePool.pool),Q!==W&&(Z.flags|=2048),J!==null&&X7(B9),null;case 24:return W=null,J!==null&&(W=J.memoizedState.cache),Z.memoizedState.cache!==W&&(Z.flags|=2048),e6(oJ),PJ(Z),null;case 25:return null;case 30:return null}throw Error(J0(156,Z.tag))}function hz(J,Z){switch(JK(Z),Z.tag){case 1:return J=Z.flags,J&65536?(Z.flags=J&-65537|128,Z):null;case 3:return e6(oJ),bZ(),J=Z.flags,(J&65536)!==0&&(J&128)===0?(Z.flags=J&-65537|128,Z):null;case 26:case 27:case 5:return cY(Z),null;case 31:if(Z.memoizedState!==null){if(x7(Z),Z.alternate===null)throw Error(J0(340));_9()}return J=Z.flags,J&65536?(Z.flags=J&-65537|128,Z):null;case 13:if(x7(Z),J=Z.memoizedState,J!==null&&J.dehydrated!==null){if(Z.alternate===null)throw Error(J0(340));_9()}return J=Z.flags,J&65536?(Z.flags=J&-65537|128,Z):null;case 19:return X7(uJ),null;case 4:return bZ(),null;case 10:return e6(Z.type),null;case 22:case 23:return x7(Z),XK(),J!==null&&X7(B9),J=Z.flags,J&65536?(Z.flags=J&-65537|128,Z):null;case 24:return e6(oJ),null;case 25:return null;default:return null}}function lR(J,Z){switch(JK(Z),Z.tag){case 3:e6(oJ),bZ();break;case 26:case 27:case 5:cY(Z);break;case 4:bZ();break;case 31:Z.memoizedState!==null&&x7(Z);break;case 13:x7(Z);break;case 19:X7(uJ);break;case 10:e6(Z.type);break;case 22:case 23:x7(Z),XK(),J!==null&&X7(B9);break;case 24:e6(oJ)}}function TQ(J,Z){try{var W=Z.updateQueue,Q=W!==null?W.lastEffect:null;if(Q!==null){var Y=Q.next;W=Y;do{if((W.tag&J)===J){Q=void 0;var{create:X,inst:H}=W;Q=X(),H.destroy=Q}W=W.next}while(W!==Y)}}catch(U){RJ(Z,Z.return,U)}}function c8(J,Z,W){try{var Q=Z.updateQueue,Y=Q!==null?Q.lastEffect:null;if(Y!==null){var X=Y.next;Q=X;do{if((Q.tag&J)===J){var H=Q.inst,U=H.destroy;if(U!==void 0){H.destroy=void 0,Y=Z;var G=W,K=U;try{K()}catch(O){RJ(Y,G,O)}}}Q=Q.next}while(Q!==X)}}catch(O){RJ(Z,Z.return,O)}}function cR(J){var Z=J.updateQueue;if(Z!==null){var W=J.stateNode;try{JR(Z,W)}catch(Q){RJ(J,J.return,Q)}}}function iR(J,Z,W){W.props=k9(J.type,J.memoizedProps),W.state=J.memoizedState;try{W.componentWillUnmount()}catch(Q){RJ(J,Z,Q)}}function ZQ(J,Z){try{var W=J.ref;if(W!==null){switch(J.tag){case 26:case 27:case 5:var Q=J.stateNode;break;case 30:Q=J.stateNode;break;default:Q=J.stateNode}typeof W==="function"?J.refCleanup=W(Q):W.current=Q}}catch(Y){RJ(J,Z,Y)}}function E6(J,Z){var{ref:W,refCleanup:Q}=J;if(W!==null)if(typeof Q==="function")try{Q()}catch(Y){RJ(J,Z,Y)}finally{J.refCleanup=null,J=J.alternate,J!=null&&(J.refCleanup=null)}else if(typeof W==="function")try{W(null)}catch(Y){RJ(J,Z,Y)}else W.current=null}function sR(J){var{type:Z,memoizedProps:W,stateNode:Q}=J;try{J:switch(Z){case"button":case"input":case"select":case"textarea":W.autoFocus&&Q.focus();break J;case"img":W.src?Q.src=W.src:W.srcSet&&(Q.srcset=W.srcSet)}}catch(Y){RJ(J,J.return,Y)}}function SU(J,Z,W){try{var Q=J.stateNode;YA(Q,J.type,W,Z),Q[T7]=Z}catch(Y){RJ(J,J.return,Y)}}function nR(J){return J.tag===5||J.tag===3||J.tag===26||J.tag===27&&n8(J.type)||J.tag===4}function jU(J){J:for(;;){for(;J.sibling===null;){if(J.return===null||nR(J.return))return null;J=J.return}J.sibling.return=J.return;for(J=J.sibling;J.tag!==5&&J.tag!==6&&J.tag!==18;){if(J.tag===27&&n8(J.type))continue J;if(J.flags&2)continue J;if(J.child===null||J.tag===4)continue J;else J.child.return=J,J=J.child}if(!(J.flags&2))return J.stateNode}}function AG(J,Z,W){var Q=J.tag;if(Q===5||Q===6)J=J.stateNode,Z?(W.nodeType===9?W.body:W.nodeName==="HTML"?W.ownerDocument.body:W).insertBefore(J,Z):(Z=W.nodeType===9?W.body:W.nodeName==="HTML"?W.ownerDocument.body:W,Z.appendChild(J),W=W._reactRootContainer,W!==null&&W!==void 0||Z.onclick!==null||(Z.onclick=a6));else if(Q!==4&&(Q===27&&n8(J.type)&&(W=J.stateNode,Z=null),J=J.child,J!==null))for(AG(J,Z,W),J=J.sibling;J!==null;)AG(J,Z,W),J=J.sibling}function XX(J,Z,W){var Q=J.tag;if(Q===5||Q===6)J=J.stateNode,Z?W.insertBefore(J,Z):W.appendChild(J);else if(Q!==4&&(Q===27&&n8(J.type)&&(W=J.stateNode),J=J.child,J!==null))for(XX(J,Z,W),J=J.sibling;J!==null;)XX(J,Z,W),J=J.sibling}function oR(J){var{stateNode:Z,memoizedProps:W}=J;try{for(var Q=J.type,Y=Z.attributes;Y.length;)Z.removeAttributeNode(Y[0]);$7(Z,Q,W),Z[G7]=J,Z[T7]=W}catch(X){RJ(J,J.return,X)}}function gz(J,Z){if(J=J.containerInfo,PG=NX,J=vO(J),oG(J)){if("selectionStart"in J)var W={start:J.selectionStart,end:J.selectionEnd};else J:{W=(W=J.ownerDocument)&&W.defaultView||window;var Q=W.getSelection&&W.getSelection();if(Q&&Q.rangeCount!==0){W=Q.anchorNode;var{anchorOffset:Y,focusNode:X}=Q;Q=Q.focusOffset;try{W.nodeType,X.nodeType}catch(w){W=null;break J}var H=0,U=-1,G=-1,K=0,O=0,F=J,q=null;Z:for(;;){for(var R;;){if(F!==W||Y!==0&&F.nodeType!==3||(U=H+Y),F!==X||Q!==0&&F.nodeType!==3||(G=H+Q),F.nodeType===3&&(H+=F.nodeValue.length),(R=F.firstChild)===null)break;q=F,F=R}for(;;){if(F===J)break Z;if(q===W&&++K===Y&&(U=H),q===X&&++O===Q&&(G=H),(R=F.nextSibling)!==null)break;F=q,q=F.parentNode}F=R}W=U===-1||G===-1?null:{start:U,end:G}}else W=null}W=W||{start:0,end:0}}else W=null;EG={focusedElem:J,selectionRange:W},NX=!1;for(Q7=Z;Q7!==null;)if(Z=Q7,J=Z.child,(Z.subtreeFlags&1028)!==0&&J!==null)J.return=Z,Q7=J;else for(;Q7!==null;){switch(Z=Q7,X=Z.alternate,J=Z.flags,Z.tag){case 0:if((J&4)!==0&&(J=Z.updateQueue,J=J!==null?J.events:null,J!==null))for(W=0;W<J.length;W++)Y=J[W],Y.ref.impl=Y.nextImpl;break;case 11:case 15:break;case 1:if((J&1024)!==0&&X!==null){J=void 0,W=Z,Y=X.memoizedProps,X=X.memoizedState,Q=W.stateNode;try{var L=k9(W.type,Y);J=Q.getSnapshotBeforeUpdate(L,X),Q.__reactInternalSnapshotBeforeUpdate=J}catch(w){RJ(W,W.return,w)}}break;case 3:if((J&1024)!==0){if(J=Z.stateNode.containerInfo,W=J.nodeType,W===9)jG(J);else if(W===1)switch(J.nodeName){case"HEAD":case"HTML":case"BODY":jG(J);break;default:J.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((J&1024)!==0)throw Error(J0(163))}if(J=Z.sibling,J!==null){J.return=Z.return,Q7=J;break}Q7=Z.return}}function aR(J,Z,W){var Q=W.flags;switch(W.tag){case 0:case 11:case 15:c6(J,W),Q&4&&TQ(5,W);break;case 1:if(c6(J,W),Q&4)if(J=W.stateNode,Z===null)try{J.componentDidMount()}catch(H){RJ(W,W.return,H)}else{var Y=k9(W.type,Z.memoizedProps);Z=Z.memoizedState;try{J.componentDidUpdate(Y,Z,J.__reactInternalSnapshotBeforeUpdate)}catch(H){RJ(W,W.return,H)}}Q&64&&cR(W),Q&512&&ZQ(W,W.return);break;case 3:if(c6(J,W),Q&64&&(J=W.updateQueue,J!==null)){if(Z=null,W.child!==null)switch(W.child.tag){case 27:case 5:Z=W.child.stateNode;break;case 1:Z=W.child.stateNode}try{JR(J,Z)}catch(H){RJ(W,W.return,H)}}break;case 27:Z===null&&Q&4&&oR(W);case 26:case 5:c6(J,W),Z===null&&Q&4&&sR(W),Q&512&&ZQ(W,W.return);break;case 12:c6(J,W);break;case 31:c6(J,W),Q&4&&eR(J,W);break;case 13:c6(J,W),Q&4&&JF(J,W),Q&64&&(J=W.memoizedState,J!==null&&(J=J.dehydrated,J!==null&&(W=nz.bind(null,W),OA(J,W))));break;case 22:if(Q=W.memoizedState!==null||n6,!Q){Z=Z!==null&&Z.memoizedState!==null||nJ,Y=n6;var X=nJ;n6=Q,(nJ=Z)&&!X?i6(J,W,(W.subtreeFlags&8772)!==0):c6(J,W),n6=Y,nJ=X}break;case 30:break;default:c6(J,W)}}function rR(J){var Z=J.alternate;Z!==null&&(J.alternate=null,rR(Z)),J.child=null,J.deletions=null,J.sibling=null,J.tag===5&&(Z=J.stateNode,Z!==null&&uG(Z)),J.stateNode=null,J.return=null,J.dependencies=null,J.memoizedProps=null,J.memoizedState=null,J.pendingProps=null,J.stateNode=null,J.updateQueue=null}function l6(J,Z,W){for(W=W.child;W!==null;)tR(J,Z,W),W=W.sibling}function tR(J,Z,W){if(p7&&typeof p7.onCommitFiberUnmount==="function")try{p7.onCommitFiberUnmount(_Q,W)}catch(X){}switch(W.tag){case 26:nJ||E6(W,Z),l6(J,Z,W),W.memoizedState?W.memoizedState.count--:W.stateNode&&(W=W.stateNode,W.parentNode.removeChild(W));break;case 27:nJ||E6(W,Z);var Q=fJ,Y=k7;n8(W.type)&&(fJ=W.stateNode,k7=!1),l6(J,Z,W),XQ(W.stateNode),fJ=Q,k7=Y;break;case 5:nJ||E6(W,Z);case 6:if(Q=fJ,Y=k7,fJ=null,l6(J,Z,W),fJ=Q,k7=Y,fJ!==null)if(k7)try{(fJ.nodeType===9?fJ.body:fJ.nodeName==="HTML"?fJ.ownerDocument.body:fJ).removeChild(W.stateNode)}catch(X){RJ(W,Z,X)}else try{fJ.removeChild(W.stateNode)}catch(X){RJ(W,Z,X)}break;case 18:fJ!==null&&(k7?(J=fJ,u1(J.nodeType===9?J.body:J.nodeName==="HTML"?J.ownerDocument.body:J,W.stateNode),lZ(J)):u1(fJ,W.stateNode));break;case 4:Q=fJ,Y=k7,fJ=W.stateNode.containerInfo,k7=!0,l6(J,Z,W),fJ=Q,k7=Y;break;case 0:case 11:case 14:case 15:c8(2,W,Z),nJ||c8(4,W,Z),l6(J,Z,W);break;case 1:nJ||(E6(W,Z),Q=W.stateNode,typeof Q.componentWillUnmount==="function"&&iR(W,Z,Q)),l6(J,Z,W);break;case 21:l6(J,Z,W);break;case 22:nJ=(Q=nJ)||W.memoizedState!==null,l6(J,Z,W),nJ=Q;break;default:l6(J,Z,W)}}function eR(J,Z){if(Z.memoizedState===null&&(J=Z.alternate,J!==null&&(J=J.memoizedState,J!==null))){J=J.dehydrated;try{lZ(J)}catch(W){RJ(Z,Z.return,W)}}}function JF(J,Z){if(Z.memoizedState===null&&(J=Z.alternate,J!==null&&(J=J.memoizedState,J!==null&&(J=J.dehydrated,J!==null))))try{lZ(J)}catch(W){RJ(Z,Z.return,W)}}function mz(J){switch(J.tag){case 31:case 13:case 19:var Z=J.stateNode;return Z===null&&(Z=J.stateNode=new E1),Z;case 22:return J=J.stateNode,Z=J._retryCache,Z===null&&(Z=J._retryCache=new E1),Z;default:throw Error(J0(435,J.tag))}}function wY(J,Z){var W=mz(J);Z.forEach(function(Q){if(!W.has(Q)){W.add(Q);var Y=oz.bind(null,J,Q);Q.then(Y,Y)}})}function w7(J,Z){var W=Z.deletions;if(W!==null)for(var Q=0;Q<W.length;Q++){var Y=W[Q],X=J,H=Z,U=H;J:for(;U!==null;){switch(U.tag){case 27:if(n8(U.type)){fJ=U.stateNode,k7=!1;break J}break;case 5:fJ=U.stateNode,k7=!1;break J;case 3:case 4:fJ=U.stateNode.containerInfo,k7=!0;break J}U=U.return}if(fJ===null)throw Error(J0(160));tR(X,H,Y),fJ=null,k7=!1,X=Y.alternate,X!==null&&(X.return=null),Y.return=null}if(Z.subtreeFlags&13886)for(Z=Z.child;Z!==null;)ZF(Z,J),Z=Z.sibling}function ZF(J,Z){var{alternate:W,flags:Q}=J;switch(J.tag){case 0:case 11:case 14:case 15:w7(Z,J),D7(J),Q&4&&(c8(3,J,J.return),TQ(3,J),c8(5,J,J.return));break;case 1:w7(Z,J),D7(J),Q&512&&(nJ||W===null||E6(W,W.return)),Q&64&&n6&&(J=J.updateQueue,J!==null&&(Q=J.callbacks,Q!==null&&(W=J.shared.hiddenCallbacks,J.shared.hiddenCallbacks=W===null?Q:W.concat(Q))));break;case 26:var Y=N6;if(w7(Z,J),D7(J),Q&512&&(nJ||W===null||E6(W,W.return)),Q&4){var X=W!==null?W.memoizedState:null;if(Q=J.memoizedState,W===null)if(Q===null)if(J.stateNode===null){J:{Q=J.type,W=J.memoizedProps,Y=Y.ownerDocument||Y;Z:switch(Q){case"title":if(X=Y.getElementsByTagName("title")[0],!X||X[DQ]||X[G7]||X.namespaceURI==="http://www.w3.org/2000/svg"||X.hasAttribute("itemprop"))X=Y.createElement(Q),Y.head.insertBefore(X,Y.querySelector("head > title"));$7(X,Q,W),X[G7]=J,Y7(X),Q=X;break J;case"link":var H=a1("link","href",Y).get(Q+(W.href||""));if(H){for(var U=0;U<H.length;U++)if(X=H[U],X.getAttribute("href")===(W.href==null||W.href===""?null:W.href)&&X.getAttribute("rel")===(W.rel==null?null:W.rel)&&X.getAttribute("title")===(W.title==null?null:W.title)&&X.getAttribute("crossorigin")===(W.crossOrigin==null?null:W.crossOrigin)){H.splice(U,1);break Z}}X=Y.createElement(Q),$7(X,Q,W),Y.head.appendChild(X);break;case"meta":if(H=a1("meta","content",Y).get(Q+(W.content||""))){for(U=0;U<H.length;U++)if(X=H[U],X.getAttribute("content")===(W.content==null?null:""+W.content)&&X.getAttribute("name")===(W.name==null?null:W.name)&&X.getAttribute("property")===(W.property==null?null:W.property)&&X.getAttribute("http-equiv")===(W.httpEquiv==null?null:W.httpEquiv)&&X.getAttribute("charset")===(W.charSet==null?null:W.charSet)){H.splice(U,1);break Z}}X=Y.createElement(Q),$7(X,Q,W),Y.head.appendChild(X);break;default:throw Error(J0(468,Q))}X[G7]=J,Y7(X),Q=X}J.stateNode=Q}else r1(Y,J.type,J.stateNode);else J.stateNode=o1(Y,Q,J.memoizedProps);else X!==Q?(X===null?W.stateNode!==null&&(W=W.stateNode,W.parentNode.removeChild(W)):X.count--,Q===null?r1(Y,J.type,J.stateNode):o1(Y,Q,J.memoizedProps)):Q===null&&J.stateNode!==null&&SU(J,J.memoizedProps,W.memoizedProps)}break;case 27:w7(Z,J),D7(J),Q&512&&(nJ||W===null||E6(W,W.return)),W!==null&&Q&4&&SU(J,J.memoizedProps,W.memoizedProps);break;case 5:if(w7(Z,J),D7(J),Q&512&&(nJ||W===null||E6(W,W.return)),J.flags&32){Y=J.stateNode;try{vZ(Y,"")}catch(L){RJ(J,J.return,L)}}Q&4&&J.stateNode!=null&&(Y=J.memoizedProps,SU(J,Y,W!==null?W.memoizedProps:Y)),Q&1024&&(fU=!0);break;case 6:if(w7(Z,J),D7(J),Q&4){if(J.stateNode===null)throw Error(J0(162));Q=J.memoizedProps,W=J.stateNode;try{W.nodeValue=Q}catch(L){RJ(J,J.return,L)}}break;case 3:if(mY=null,Y=N6,N6=RX(Z.containerInfo),w7(Z,J),N6=Y,D7(J),Q&4&&W!==null&&W.memoizedState.isDehydrated)try{lZ(Z.containerInfo)}catch(L){RJ(J,J.return,L)}fU&&(fU=!1,WF(J));break;case 4:Q=N6,N6=RX(J.stateNode.containerInfo),w7(Z,J),D7(J),N6=Q;break;case 12:w7(Z,J),D7(J);break;case 31:w7(Z,J),D7(J),Q&4&&(Q=J.updateQueue,Q!==null&&(J.updateQueue=null,wY(J,Q)));break;case 13:w7(Z,J),D7(J),J.child.flags&8192&&J.memoizedState!==null!==(W!==null&&W.memoizedState!==null)&&(PX=m7()),Q&4&&(Q=J.updateQueue,Q!==null&&(J.updateQueue=null,wY(J,Q)));break;case 22:Y=J.memoizedState!==null;var G=W!==null&&W.memoizedState!==null,K=n6,O=nJ;if(n6=K||Y,nJ=O||G,w7(Z,J),nJ=O,n6=K,D7(J),Q&8192)J:for(Z=J.stateNode,Z._visibility=Y?Z._visibility&-2:Z._visibility|1,Y&&(W===null||G||n6||nJ||M9(J)),W=null,Z=J;;){if(Z.tag===5||Z.tag===26){if(W===null){G=W=Z;try{if(X=G.stateNode,Y)H=X.style,typeof H.setProperty==="function"?H.setProperty("display","none","important"):H.display="none";else{U=G.stateNode;var F=G.memoizedProps.style,q=F!==void 0&&F!==null&&F.hasOwnProperty("display")?F.display:null;U.style.display=q==null||typeof q==="boolean"?"":(""+q).trim()}}catch(L){RJ(G,G.return,L)}}}else if(Z.tag===6){if(W===null){G=Z;try{G.stateNode.nodeValue=Y?"":G.memoizedProps}catch(L){RJ(G,G.return,L)}}}else if(Z.tag===18){if(W===null){G=Z;try{var R=G.stateNode;Y?l1(R,!0):l1(G.stateNode,!1)}catch(L){RJ(G,G.return,L)}}}else if((Z.tag!==22&&Z.tag!==23||Z.memoizedState===null||Z===J)&&Z.child!==null){Z.child.return=Z,Z=Z.child;continue}if(Z===J)break J;for(;Z.sibling===null;){if(Z.return===null||Z.return===J)break J;W===Z&&(W=null),Z=Z.return}W===Z&&(W=null),Z.sibling.return=Z.return,Z=Z.sibling}Q&4&&(Q=J.updateQueue,Q!==null&&(W=Q.retryQueue,W!==null&&(Q.retryQueue=null,wY(J,W))));break;case 19:w7(Z,J),D7(J),Q&4&&(Q=J.updateQueue,Q!==null&&(J.updateQueue=null,wY(J,Q)));break;case 30:break;case 21:break;default:w7(Z,J),D7(J)}}function D7(J){var Z=J.flags;if(Z&2){try{for(var W,Q=J.return;Q!==null;){if(nR(Q)){W=Q;break}Q=Q.return}if(W==null)throw Error(J0(160));switch(W.tag){case 27:var Y=W.stateNode,X=jU(J);XX(J,X,Y);break;case 5:var H=W.stateNode;W.flags&32&&(vZ(H,""),W.flags&=-33);var U=jU(J);XX(J,U,H);break;case 3:case 4:var G=W.stateNode.containerInfo,K=jU(J);AG(J,K,G);break;default:throw Error(J0(161))}}catch(O){RJ(J,J.return,O)}J.flags&=-3}Z&4096&&(J.flags&=-4097)}function WF(J){if(J.subtreeFlags&1024)for(J=J.child;J!==null;){var Z=J;WF(Z),Z.tag===5&&Z.flags&1024&&Z.stateNode.reset(),J=J.sibling}}function c6(J,Z){if(Z.subtreeFlags&8772)for(Z=Z.child;Z!==null;)aR(J,Z.alternate,Z),Z=Z.sibling}function M9(J){for(J=J.child;J!==null;){var Z=J;switch(Z.tag){case 0:case 11:case 14:case 15:c8(4,Z,Z.return),M9(Z);break;case 1:E6(Z,Z.return);var W=Z.stateNode;typeof W.componentWillUnmount==="function"&&iR(Z,Z.return,W),M9(Z);break;case 27:XQ(Z.stateNode);case 26:case 5:E6(Z,Z.return),M9(Z);break;case 22:Z.memoizedState===null&&M9(Z);break;case 30:M9(Z);break;default:M9(Z)}J=J.sibling}}function i6(J,Z,W){W=W&&(Z.subtreeFlags&8772)!==0;for(Z=Z.child;Z!==null;){var Q=Z.alternate,Y=J,X=Z,H=X.flags;switch(X.tag){case 0:case 11:case 15:i6(Y,X,W),TQ(4,X);break;case 1:if(i6(Y,X,W),Q=X,Y=Q.stateNode,typeof Y.componentDidMount==="function")try{Y.componentDidMount()}catch(K){RJ(Q,Q.return,K)}if(Q=X,Y=Q.updateQueue,Y!==null){var U=Q.stateNode;try{var G=Y.shared.hiddenCallbacks;if(G!==null)for(Y.shared.hiddenCallbacks=null,Y=0;Y<G.length;Y++)eO(G[Y],U)}catch(K){RJ(Q,Q.return,K)}}W&&H&64&&cR(X),ZQ(X,X.return);break;case 27:oR(X);case 26:case 5:i6(Y,X,W),W&&Q===null&&H&4&&sR(X),ZQ(X,X.return);break;case 12:i6(Y,X,W);break;case 31:i6(Y,X,W),W&&H&4&&eR(Y,X);break;case 13:i6(Y,X,W),W&&H&4&&JF(Y,X);break;case 22:X.memoizedState===null&&i6(Y,X,W),ZQ(X,X.return);break;case 30:break;default:i6(Y,X,W)}Z=Z.sibling}}function _K(J,Z){var W=null;J!==null&&J.memoizedState!==null&&J.memoizedState.cachePool!==null&&(W=J.memoizedState.cachePool.pool),J=null,Z.memoizedState!==null&&Z.memoizedState.cachePool!==null&&(J=Z.memoizedState.cachePool.pool),J!==W&&(J!=null&&J.refCount++,W!=null&&CQ(W))}function IK(J,Z){J=null,Z.alternate!==null&&(J=Z.alternate.memoizedState.cache),Z=Z.memoizedState.cache,Z!==J&&(Z.refCount++,J!=null&&CQ(J))}function M6(J,Z,W,Q){if(Z.subtreeFlags&10256)for(Z=Z.child;Z!==null;)QF(J,Z,W,Q),Z=Z.sibling}function QF(J,Z,W,Q){var Y=Z.flags;switch(Z.tag){case 0:case 11:case 15:M6(J,Z,W,Q),Y&2048&&TQ(9,Z);break;case 1:M6(J,Z,W,Q);break;case 3:M6(J,Z,W,Q),Y&2048&&(J=null,Z.alternate!==null&&(J=Z.alternate.memoizedState.cache),Z=Z.memoizedState.cache,Z!==J&&(Z.refCount++,J!=null&&CQ(J)));break;case 12:if(Y&2048){M6(J,Z,W,Q),J=Z.stateNode;try{var X=Z.memoizedProps,H=X.id,U=X.onPostCommit;typeof U==="function"&&U(H,Z.alternate===null?"mount":"update",J.passiveEffectDuration,-0)}catch(G){RJ(Z,Z.return,G)}}else M6(J,Z,W,Q);break;case 31:M6(J,Z,W,Q);break;case 13:M6(J,Z,W,Q);break;case 23:break;case 22:X=Z.stateNode,H=Z.alternate,Z.memoizedState!==null?X._visibility&2?M6(J,Z,W,Q):WQ(J,Z):X._visibility&2?M6(J,Z,W,Q):(X._visibility|=2,OZ(J,Z,W,Q,(Z.subtreeFlags&10256)!==0||!1)),Y&2048&&_K(H,Z);break;case 24:M6(J,Z,W,Q),Y&2048&&IK(Z.alternate,Z);break;default:M6(J,Z,W,Q)}}function OZ(J,Z,W,Q,Y){Y=Y&&((Z.subtreeFlags&10256)!==0||!1);for(Z=Z.child;Z!==null;){var X=J,H=Z,U=W,G=Q,K=H.flags;switch(H.tag){case 0:case 11:case 15:OZ(X,H,U,G,Y),TQ(8,H);break;case 23:break;case 22:var O=H.stateNode;H.memoizedState!==null?O._visibility&2?OZ(X,H,U,G,Y):WQ(X,H):(O._visibility|=2,OZ(X,H,U,G,Y)),Y&&K&2048&&_K(H.alternate,H);break;case 24:OZ(X,H,U,G,Y),Y&&K&2048&&IK(H.alternate,H);break;default:OZ(X,H,U,G,Y)}Z=Z.sibling}}function WQ(J,Z){if(Z.subtreeFlags&10256)for(Z=Z.child;Z!==null;){var W=J,Q=Z,Y=Q.flags;switch(Q.tag){case 22:WQ(W,Q),Y&2048&&_K(Q.alternate,Q);break;case 24:WQ(W,Q),Y&2048&&IK(Q.alternate,Q);break;default:WQ(W,Q)}Z=Z.sibling}}function $Z(J,Z,W){if(J.subtreeFlags&lW)for(J=J.child;J!==null;)YF(J,Z,W),J=J.sibling}function YF(J,Z,W){switch(J.tag){case 26:$Z(J,Z,W),J.flags&lW&&J.memoizedState!==null&&DA(W,N6,J.memoizedState,J.memoizedProps);break;case 5:$Z(J,Z,W);break;case 3:case 4:var Q=N6;N6=RX(J.stateNode.containerInfo),$Z(J,Z,W),N6=Q;break;case 22:J.memoizedState===null&&(Q=J.alternate,Q!==null&&Q.memoizedState!==null?(Q=lW,lW=16777216,$Z(J,Z,W),lW=Q):$Z(J,Z,W));break;default:$Z(J,Z,W)}}function XF(J){var Z=J.alternate;if(Z!==null&&(J=Z.child,J!==null)){Z.child=null;do Z=J.sibling,J.sibling=null,J=Z;while(J!==null)}}function vW(J){var Z=J.deletions;if((J.flags&16)!==0){if(Z!==null)for(var W=0;W<Z.length;W++){var Q=Z[W];Q7=Q,UF(Q,J)}XF(J)}if(J.subtreeFlags&10256)for(J=J.child;J!==null;)HF(J),J=J.sibling}function HF(J){switch(J.tag){case 0:case 11:case 15:vW(J),J.flags&2048&&c8(9,J,J.return);break;case 3:vW(J);break;case 12:vW(J);break;case 22:var Z=J.stateNode;J.memoizedState!==null&&Z._visibility&2&&(J.return===null||J.return.tag!==13)?(Z._visibility&=-3,hY(J)):vW(J);break;default:vW(J)}}function hY(J){var Z=J.deletions;if((J.flags&16)!==0){if(Z!==null)for(var W=0;W<Z.length;W++){var Q=Z[W];Q7=Q,UF(Q,J)}XF(J)}for(J=J.child;J!==null;){switch(Z=J,Z.tag){case 0:case 11:case 15:c8(8,Z,Z.return),hY(Z);break;case 22:W=Z.stateNode,W._visibility&2&&(W._visibility&=-3,hY(Z));break;default:hY(Z)}J=J.sibling}}function UF(J,Z){for(;Q7!==null;){var W=Q7;switch(W.tag){case 0:case 11:case 15:c8(8,W,Z);break;case 23:case 22:if(W.memoizedState!==null&&W.memoizedState.cachePool!==null){var Q=W.memoizedState.cachePool.pool;Q!=null&&Q.refCount++}break;case 24:CQ(W.memoizedState.cache)}if(Q=W.child,Q!==null)Q.return=W,Q7=Q;else J:for(W=J;Q7!==null;){Q=Q7;var{sibling:Y,return:X}=Q;if(rR(Q),Q===W){Q7=null;break J}if(Y!==null){Y.return=X,Q7=Y;break J}Q7=X}}}function u7(){return(KJ&2)!==0&&JJ!==0?JJ&-JJ:y0.T!==null?CK():BO()}function qF(){if(g7===0)if((JJ&536870912)===0||QJ){var J=MY;MY<<=1,(MY&3932160)===0&&(MY=262144),g7=J}else g7=536870912;return J=c7.current,J!==null&&(J.flags|=32),g7}function V7(J,Z,W){if(J===IJ&&(OJ===2||OJ===9)||J.cancelPendingCommit!==null)dZ(J,0),j8(J,JJ,g7,!1);if(wQ(J,W),(KJ&2)===0||J!==IJ)J===IJ&&((KJ&2)===0&&(A9|=W),gJ===4&&j8(J,JJ,g7,!1)),f6(J)}function $F(J,Z,W){if((KJ&6)!==0)throw Error(J0(327));var Q=!W&&(Z&127)===0&&(Z&J.expiredLanes)===0||IQ(J,Z),Y=Q?cz(J,Z):bU(J,Z,!0),X=Q;do{if(Y===0){oZ&&!Q&&j8(J,Z,0,!1);break}else{if(W=J.current.alternate,X&&!uz(W)){Y=bU(J,Z,!1),X=!1;continue}if(Y===2){if(X=Z,J.errorRecoveryDisabledLanes&X)var H=0;else H=J.pendingLanes&-536870913,H=H!==0?H:H&536870912?536870912:0;if(H!==0){Z=H;J:{var U=J;Y=QQ;var G=U.current.memoizedState.isDehydrated;if(G&&(dZ(U,H).flags|=256),H=bU(U,H,!1),H!==2){if(wK&&!G){U.errorRecoveryDisabledLanes|=X,A9|=X,Y=4;break J}X=C7,C7=Y,X!==null&&(C7===null?C7=X:C7.push.apply(C7,X))}Y=H}if(X=!1,Y!==2)continue}}if(Y===1){dZ(J,0),j8(J,Z,0,!0);break}J:{switch(Q=J,X=Y,X){case 0:case 1:throw Error(J0(345));case 4:if((Z&4194048)!==Z)break;case 6:j8(Q,Z,g7,!S8);break J;case 2:C7=null;break;case 3:case 5:break;default:throw Error(J0(329))}if((Z&62914560)===Z&&(Y=PX+300-m7(),10<Y)){if(j8(Q,Z,g7,!S8),BX(Q,0,!0)!==0)break J;J8=Z,Q.timeoutHandle=SF(S1.bind(null,Q,W,C7,UX,_G,Z,g7,A9,mZ,S8,X,"Throttled",-0,0),Y);break J}S1(Q,W,C7,UX,_G,Z,g7,A9,mZ,S8,X,null,-0,0)}}break}while(1);f6(J)}function S1(J,Z,W,Q,Y,X,H,U,G,K,O,F,q,R){if(J.timeoutHandle=-1,F=Z.subtreeFlags,F&8192||(F&16785408)===16785408){F={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:a6},YF(Z,X,F);var L=(X&62914560)===X?PX-m7():(X&4194048)===X?GF-m7():0;if(L=kA(F,L),L!==null){J8=X,J.cancelPendingCommit=L(f1.bind(null,J,Z,X,W,Q,Y,H,U,G,O,F,null,q,R)),j8(J,X,H,!K);return}}f1(J,Z,X,W,Q,Y,H,U,G)}function uz(J){for(var Z=J;;){var W=Z.tag;if((W===0||W===11||W===15)&&Z.flags&16384&&(W=Z.updateQueue,W!==null&&(W=W.stores,W!==null)))for(var Q=0;Q<W.length;Q++){var Y=W[Q],X=Y.getSnapshot;Y=Y.value;try{if(!l7(X(),Y))return!1}catch(H){return!1}}if(W=Z.child,Z.subtreeFlags&16384&&W!==null)W.return=Z,Z=W;else{if(Z===J)break;for(;Z.sibling===null;){if(Z.return===null||Z.return===J)return!0;Z=Z.return}Z.sibling.return=Z.return,Z=Z.sibling}}return!0}function j8(J,Z,W,Q){Z&=~DK,Z&=~A9,J.suspendedLanes|=Z,J.pingedLanes&=~Z,Q&&(J.warmLanes|=Z),Q=J.expirationTimes;for(var Y=Z;0<Y;){var X=31-d7(Y),H=1<<X;Q[X]=-1,Y&=~H}W!==0&&MO(J,W,Z)}function EX(){return(KJ&6)===0?(PQ(0,!1),!1):!0}function kK(){if(n0!==null){if(OJ===0)var J=n0.return;else J=n0,r6=E9=null,qK(J),SZ=null,OQ=0,J=n0;for(;J!==null;)lR(J.alternate,J),J=J.return;n0=null}}function dZ(J,Z){var W=J.timeoutHandle;W!==-1&&(J.timeoutHandle=-1,UA(W)),W=J.cancelPendingCommit,W!==null&&(J.cancelPendingCommit=null,W()),J8=0,kK(),IJ=J,n0=W=t6(J.current,null),JJ=Z,OJ=0,v7=null,S8=!1,oZ=IQ(J,Z),wK=!1,mZ=g7=DK=A9=i8=gJ=0,C7=QQ=null,_G=!1,(Z&8)!==0&&(Z|=Z&32);var Q=J.entangledLanes;if(Q!==0)for(J=J.entanglements,Q&=Z;0<Q;){var Y=31-d7(Q),X=1<<Y;Z|=J[Y],Q&=~X}return X8=Z,IX(),W}function OF(J,Z){h0=null,y0.H=FQ,Z===nZ||Z===DX?(Z=K1(),OJ=3):Z===QK?(Z=K1(),OJ=4):OJ=Z===zK?8:Z!==null&&typeof Z==="object"&&typeof Z.then==="function"?6:1,v7=Z,n0===null&&(gJ=1,QX(J,Y6(Z,J.current)))}function RF(){var J=c7.current;return J===null?!0:(JJ&4194048)===JJ?H6===null?!0:!1:(JJ&62914560)===JJ||(JJ&536870912)!==0?J===H6:!1}function FF(){var J=y0.H;return y0.H=FQ,J===null?FQ:J}function MF(){var J=y0.A;return y0.A=pz,J}function GX(){gJ=4,S8||(JJ&4194048)!==JJ&&c7.current!==null||(oZ=!0),(i8&134217727)===0&&(A9&134217727)===0||IJ===null||j8(IJ,JJ,g7,!1)}function bU(J,Z,W){var Q=KJ;KJ|=2;var Y=FF(),X=MF();if(IJ!==J||JJ!==Z)UX=null,dZ(J,Z);Z=!1;var H=gJ;J:do try{if(OJ!==0&&n0!==null){var U=n0,G=v7;switch(OJ){case 8:kK(),H=6;break J;case 3:case 2:case 9:case 6:c7.current===null&&(Z=!0);var K=OJ;if(OJ=0,v7=null,CZ(J,U,G,K),W&&oZ){H=0;break J}break;default:K=OJ,OJ=0,v7=null,CZ(J,U,G,K)}}lz(),H=gJ;break}catch(O){OF(J,O)}while(1);return Z&&J.shellSuspendCounter++,r6=E9=null,KJ=Q,y0.H=Y,y0.A=X,n0===null&&(IJ=null,JJ=0,IX()),H}function lz(){for(;n0!==null;)NF(n0)}function cz(J,Z){var W=KJ;KJ|=2;var Q=FF(),Y=MF();IJ!==J||JJ!==Z?(UX=null,HX=m7()+500,dZ(J,Z)):oZ=IQ(J,Z);J:do try{if(OJ!==0&&n0!==null){Z=n0;var X=v7;Z:switch(OJ){case 1:OJ=0,v7=null,CZ(J,Z,X,1);break;case 2:case 9:if(G1(X)){OJ=0,v7=null,j1(Z);break}Z=function(){OJ!==2&&OJ!==9||IJ!==J||(OJ=7),f6(J)},X.then(Z,Z);break J;case 3:OJ=7;break J;case 4:OJ=5;break J;case 7:G1(X)?(OJ=0,v7=null,j1(Z)):(OJ=0,v7=null,CZ(J,Z,X,7));break;case 5:var H=null;switch(n0.tag){case 26:H=n0.memoizedState;case 5:case 27:var U=n0;if(H?vF(H):U.stateNode.complete){OJ=0,v7=null;var G=U.sibling;if(G!==null)n0=G;else{var K=U.return;K!==null?(n0=K,SX(K)):n0=null}break Z}}OJ=0,v7=null,CZ(J,Z,X,5);break;case 6:OJ=0,v7=null,CZ(J,Z,X,6);break;case 8:kK(),gJ=6;break J;default:throw Error(J0(462))}}iz();break}catch(O){OF(J,O)}while(1);if(r6=E9=null,y0.H=Q,y0.A=Y,KJ=W,n0!==null)return 0;return IJ=null,JJ=0,IX(),gJ}function iz(){for(;n0!==null&&!MB();)NF(n0)}function NF(J){var Z=uR(J.alternate,J,X8);J.memoizedProps=J.pendingProps,Z===null?SX(J):n0=Z}function j1(J){var Z=J,W=Z.alternate;switch(Z.tag){case 15:case 0:Z=k1(W,Z,Z.pendingProps,Z.type,void 0,JJ);break;case 11:Z=k1(W,Z,Z.pendingProps,Z.type.render,Z.ref,JJ);break;case 5:qK(Z);default:lR(W,Z),Z=n0=lO(Z,X8),Z=uR(W,Z,X8)}J.memoizedProps=J.pendingProps,Z===null?SX(J):n0=Z}function CZ(J,Z,W,Q){r6=E9=null,qK(Z),SZ=null,OQ=0;var Y=Z.return;try{if(bz(J,Y,Z,W,JJ)){gJ=1,QX(J,Y6(W,J.current)),n0=null;return}}catch(X){if(Y!==null)throw n0=Y,X;gJ=1,QX(J,Y6(W,J.current)),n0=null;return}if(Z.flags&32768){if(QJ||Q===1)J=!0;else if(oZ||(JJ&536870912)!==0)J=!1;else if(S8=J=!0,Q===2||Q===9||Q===3||Q===6)Q=c7.current,Q!==null&&Q.tag===13&&(Q.flags|=16384);LF(Z,J)}else SX(Z)}function SX(J){var Z=J;do{if((Z.flags&32768)!==0){LF(Z,S8);return}J=Z.return;var W=xz(Z.alternate,Z,X8);if(W!==null){n0=W;return}if(Z=Z.sibling,Z!==null){n0=Z;return}n0=Z=J}while(Z!==null);gJ===0&&(gJ=5)}function LF(J,Z){do{var W=hz(J.alternate,J);if(W!==null){W.flags&=32767,n0=W;return}if(W=J.return,W!==null&&(W.flags|=32768,W.subtreeFlags=0,W.deletions=null),!Z&&(J=J.sibling,J!==null)){n0=J;return}n0=J=W}while(J!==null);gJ=6,n0=null}function f1(J,Z,W,Q,Y,X,H,U,G){J.cancelPendingCommit=null;do jX();while(tJ!==0);if((KJ&6)!==0)throw Error(J0(327));if(Z!==null){if(Z===J.current)throw Error(J0(177));if(X=Z.lanes|Z.childLanes,X|=aG,kB(J,W,X,H,U,G),J===IJ&&(n0=IJ=null,JJ=0),pZ=Z,g8=J,J8=W,IG=X,wG=Y,KF=Q,(Z.subtreeFlags&10256)!==0||(Z.flags&10256)!==0?(J.callbackNode=null,J.callbackPriority=0,az(iY,function(){return IF(),null})):(J.callbackNode=null,J.callbackPriority=0),Q=(Z.flags&13878)!==0,(Z.subtreeFlags&13878)!==0||Q){Q=y0.T,y0.T=null,Y=qJ.p,qJ.p=2,H=KJ,KJ|=4;try{gz(J,Z,W)}finally{KJ=H,qJ.p=Y,y0.T=Q}}tJ=1,BF(),zF(),AF()}}function BF(){if(tJ===1){tJ=0;var J=g8,Z=pZ,W=(Z.flags&13878)!==0;if((Z.subtreeFlags&13878)!==0||W){W=y0.T,y0.T=null;var Q=qJ.p;qJ.p=2;var Y=KJ;KJ|=4;try{ZF(Z,J);var X=EG,H=vO(J.containerInfo),U=X.focusedElem,G=X.selectionRange;if(H!==U&&U&&U.ownerDocument&&yO(U.ownerDocument.documentElement,U)){if(G!==null&&oG(U)){var{start:K,end:O}=G;if(O===void 0&&(O=K),"selectionStart"in U)U.selectionStart=K,U.selectionEnd=Math.min(O,U.value.length);else{var F=U.ownerDocument||document,q=F&&F.defaultView||window;if(q.getSelection){var R=q.getSelection(),L=U.textContent.length,w=Math.min(G.start,L),N=G.end===void 0?w:Math.min(G.end,L);!R.extend&&w>N&&(H=N,N=w,w=H);var $=Z1(U,w),B=Z1(U,N);if($&&B&&(R.rangeCount!==1||R.anchorNode!==$.node||R.anchorOffset!==$.offset||R.focusNode!==B.node||R.focusOffset!==B.offset)){var _=F.createRange();_.setStart($.node,$.offset),R.removeAllRanges(),w>N?(R.addRange(_),R.extend(B.node,B.offset)):(_.setEnd(B.node,B.offset),R.addRange(_))}}}}F=[];for(R=U;R=R.parentNode;)R.nodeType===1&&F.push({element:R,left:R.scrollLeft,top:R.scrollTop});typeof U.focus==="function"&&U.focus();for(U=0;U<F.length;U++){var z=F[U];z.element.scrollLeft=z.left,z.element.scrollTop=z.top}}NX=!!PG,EG=PG=null}finally{KJ=Y,qJ.p=Q,y0.T=W}}J.current=Z,tJ=2}}function zF(){if(tJ===2){tJ=0;var J=g8,Z=pZ,W=(Z.flags&8772)!==0;if((Z.subtreeFlags&8772)!==0||W){W=y0.T,y0.T=null;var Q=qJ.p;qJ.p=2;var Y=KJ;KJ|=4;try{aR(J,Z.alternate,Z)}finally{KJ=Y,qJ.p=Q,y0.T=W}}tJ=3}}function AF(){if(tJ===4||tJ===3){tJ=0,NB();var J=g8,Z=pZ,W=J8,Q=KF;(Z.subtreeFlags&10256)!==0||(Z.flags&10256)!==0?tJ=5:(tJ=0,pZ=g8=null,_F(J,J.pendingLanes));var Y=J.pendingLanes;if(Y===0&&(h8=null),dG(W),Z=Z.stateNode,p7&&typeof p7.onCommitFiberRoot==="function")try{p7.onCommitFiberRoot(_Q,Z,void 0,(Z.current.flags&128)===128)}catch(G){}if(Q!==null){Z=y0.T,Y=qJ.p,qJ.p=2,y0.T=null;try{for(var X=J.onRecoverableError,H=0;H<Q.length;H++){var U=Q[H];X(U.value,{componentStack:U.stack})}}finally{y0.T=Z,qJ.p=Y}}(J8&3)!==0&&jX(),f6(J),Y=J.pendingLanes,(W&261930)!==0&&(Y&42)!==0?J===DG?YQ++:(YQ=0,DG=J):YQ=0,PQ(0,!1)}}function _F(J,Z){(J.pooledCacheLanes&=Z)===0&&(Z=J.pooledCache,Z!=null&&(J.pooledCache=null,CQ(Z)))}function jX(){return BF(),zF(),AF(),IF()}function IF(){if(tJ!==5)return!1;var J=g8,Z=IG;IG=0;var W=dG(J8),Q=y0.T,Y=qJ.p;try{qJ.p=32>W?32:W,y0.T=null,W=wG,wG=null;var X=g8,H=J8;if(tJ=0,pZ=g8=null,J8=0,(KJ&6)!==0)throw Error(J0(331));var U=KJ;if(KJ|=4,HF(X.current),QF(X,X.current,H,W),KJ=U,PQ(0,!1),p7&&typeof p7.onPostCommitFiberRoot==="function")try{p7.onPostCommitFiberRoot(_Q,X)}catch(G){}return!0}finally{qJ.p=Y,y0.T=Q,_F(J,Z)}}function b1(J,Z,W){Z=Y6(W,Z),Z=LG(J.stateNode,Z,2),J=x8(J,Z,2),J!==null&&(wQ(J,2),f6(J))}function RJ(J,Z,W){if(J.tag===3)b1(J,J,W);else for(;Z!==null;){if(Z.tag===3){b1(Z,J,W);break}else if(Z.tag===1){var Q=Z.stateNode;if(typeof Z.type.getDerivedStateFromError==="function"||typeof Q.componentDidCatch==="function"&&(h8===null||!h8.has(Q))){J=Y6(W,J),W=xR(2),Q=x8(Z,W,2),Q!==null&&(hR(W,Q,Z,J),wQ(Q,2),f6(Q));break}}Z=Z.return}}function yU(J,Z,W){var Q=J.pingCache;if(Q===null){Q=J.pingCache=new dz;var Y=new Set;Q.set(Z,Y)}else Y=Q.get(Z),Y===void 0&&(Y=new Set,Q.set(Z,Y));Y.has(W)||(wK=!0,Y.add(W),J=sz.bind(null,J,Z,W),Z.then(J,J))}function sz(J,Z,W){var Q=J.pingCache;Q!==null&&Q.delete(Z),J.pingedLanes|=J.suspendedLanes&W,J.warmLanes&=~W,IJ===J&&(JJ&W)===W&&(gJ===4||gJ===3&&(JJ&62914560)===JJ&&300>m7()-PX?(KJ&2)===0&&dZ(J,0):DK|=W,mZ===JJ&&(mZ=0)),f6(J)}function wF(J,Z){Z===0&&(Z=FO()),J=P9(J,Z),J!==null&&(wQ(J,Z),f6(J))}function nz(J){var Z=J.memoizedState,W=0;Z!==null&&(W=Z.retryLane),wF(J,W)}function oz(J,Z){var W=0;switch(J.tag){case 31:case 13:var{stateNode:Q,memoizedState:Y}=J;Y!==null&&(W=Y.retryLane);break;case 19:Q=J.stateNode;break;case 22:Q=J.stateNode._retryCache;break;default:throw Error(J0(314))}Q!==null&&Q.delete(Z),wF(J,W)}function az(J,Z){return mG(J,Z)}function f6(J){J!==RZ&&J.next===null&&(RZ===null?KX=RZ=J:RZ=RZ.next=J),qX=!0,kG||(kG=!0,tz())}function PQ(J,Z){if(!vU&&qX){vU=!0;do{var W=!1;for(var Q=KX;Q!==null;){if(!Z)if(J!==0){var Y=Q.pendingLanes;if(Y===0)var X=0;else{var{suspendedLanes:H,pingedLanes:U}=Q;X=(1<<31-d7(42|J)+1)-1,X&=Y&~(H&~U),X=X&201326741?X&201326741|1:X?X|2:0}X!==0&&(W=!0,y1(Q,X))}else X=JJ,X=BX(Q,Q===IJ?X:0,Q.cancelPendingCommit!==null||Q.timeoutHandle!==-1),(X&3)===0||IQ(Q,X)||(W=!0,y1(Q,X));Q=Q.next}}while(W);vU=!1}}function rz(){DF()}function DF(){qX=kG=!1;var J=0;f8!==0&&HA()&&(J=f8);for(var Z=m7(),W=null,Q=KX;Q!==null;){var Y=Q.next,X=kF(Q,Z);if(X===0)Q.next=null,W===null?KX=Y:W.next=Y,Y===null&&(RZ=W);else if(W=Q,J!==0||(X&3)!==0)qX=!0;Q=Y}tJ!==0&&tJ!==5||PQ(J,!1),f8!==0&&(f8=0)}function kF(J,Z){for(var{suspendedLanes:W,pingedLanes:Q,expirationTimes:Y}=J,X=J.pendingLanes&-62914561;0<X;){var H=31-d7(X),U=1<<H,G=Y[H];if(G===-1){if((U&W)===0||(U&Q)!==0)Y[H]=DB(U,Z)}else G<=Z&&(J.expiredLanes|=U);X&=~U}if(Z=IJ,W=JJ,W=BX(J,J===Z?W:0,J.cancelPendingCommit!==null||J.timeoutHandle!==-1),Q=J.callbackNode,W===0||J===Z&&(OJ===2||OJ===9)||J.cancelPendingCommit!==null)return Q!==null&&Q!==null&&OU(Q),J.callbackNode=null,J.callbackPriority=0;if((W&3)===0||IQ(J,W)){if(Z=W&-W,Z===J.callbackPriority)return Z;switch(Q!==null&&OU(Q),dG(W)){case 2:case 8:W=OO;break;case 32:W=iY;break;case 268435456:W=RO;break;default:W=iY}return Q=CF.bind(null,J),W=mG(W,Q),J.callbackPriority=Z,J.callbackNode=W,Z}return Q!==null&&Q!==null&&OU(Q),J.callbackPriority=2,J.callbackNode=null,2}function CF(J,Z){if(tJ!==0&&tJ!==5)return J.callbackNode=null,J.callbackPriority=0,null;var W=J.callbackNode;if(jX()&&J.callbackNode!==W)return null;var Q=JJ;if(Q=BX(J,J===IJ?Q:0,J.cancelPendingCommit!==null||J.timeoutHandle!==-1),Q===0)return null;return $F(J,Q,Z),kF(J,m7()),J.callbackNode!=null&&J.callbackNode===W?CF.bind(null,J):null}function y1(J,Z){if(jX())return null;$F(J,Z,!0)}function tz(){GA(function(){(KJ&6)!==0?mG($O,rz):DF()})}function CK(){if(f8===0){var J=xZ;J===0&&(J=FY,FY<<=1,(FY&261888)===0&&(FY=256)),f8=J}return f8}function v1(J){return J==null||typeof J==="symbol"||typeof J==="boolean"?null:typeof J==="function"?J:TY(""+J)}function x1(J,Z){var W=Z.ownerDocument.createElement("input");return W.name=Z.name,W.value=Z.value,J.id&&W.setAttribute("form",J.id),Z.parentNode.insertBefore(W,Z),J=new FormData(J),W.parentNode.removeChild(W),J}function ez(J,Z,W,Q,Y){if(Z==="submit"&&W&&W.stateNode===Y){var X=v1((Y[T7]||null).action),H=Q.submitter;H&&(Z=(Z=H[T7]||null)?v1(Z.formAction):H.getAttribute("formAction"),Z!==null&&(X=Z,H=null));var U=new zX("action","action",null,Q,Y);J.push({event:U,listeners:[{instance:null,listener:function(){if(Q.defaultPrevented){if(f8!==0){var G=H?x1(Y,H):new FormData(Y);MG(W,{pending:!0,data:G,method:Y.method,action:X},null,G)}}else typeof X==="function"&&(U.preventDefault(),G=H?x1(Y,H):new FormData(Y),MG(W,{pending:!0,data:G,method:Y.method,action:X},X,G))},currentTarget:Y}]})}}function VF(J,Z){Z=(Z&4)!==0;for(var W=0;W<J.length;W++){var Q=J[W],Y=Q.event;Q=Q.listeners;J:{var X=void 0;if(Z)for(var H=Q.length-1;0<=H;H--){var U=Q[H],G=U.instance,K=U.currentTarget;if(U=U.listener,G!==X&&Y.isPropagationStopped())break J;X=U,Y.currentTarget=K;try{X(Y)}catch(O){nY(O)}Y.currentTarget=null,X=G}else for(H=0;H<Q.length;H++){if(U=Q[H],G=U.instance,K=U.currentTarget,U=U.listener,G!==X&&Y.isPropagationStopped())break J;X=U,Y.currentTarget=K;try{X(Y)}catch(O){nY(O)}Y.currentTarget=null,X=G}}}}function s0(J,Z){var W=Z[oU];W===void 0&&(W=Z[oU]=new Set);var Q=J+"__bubble";W.has(Q)||(TF(Z,J,2,!1),W.add(Q))}function xU(J,Z,W){var Q=0;Z&&(Q|=4),TF(W,J,Q,Z)}function VK(J){if(!J[DY]){J[DY]=!0,zO.forEach(function(W){W!=="selectionchange"&&(JA.has(W)||xU(W,!1,J),xU(W,!0,J))});var Z=J.nodeType===9?J:J.ownerDocument;Z===null||Z[DY]||(Z[DY]=!0,xU("selectionchange",!1,Z))}}function TF(J,Z,W,Q){switch(pF(Z)){case 2:var Y=TA;break;case 8:Y=PA;break;default:Y=SK}W=Y.bind(null,Z,W,J),Y=void 0,!JG||Z!=="touchstart"&&Z!=="touchmove"&&Z!=="wheel"||(Y=!0),Q?Y!==void 0?J.addEventListener(Z,W,{capture:!0,passive:Y}):J.addEventListener(Z,W,!0):Y!==void 0?J.addEventListener(Z,W,{passive:Y}):J.addEventListener(Z,W,!1)}function hU(J,Z,W,Q,Y){var X=Q;if((Z&1)===0&&(Z&2)===0&&Q!==null)J:for(;;){if(Q===null)return;var H=Q.tag;if(H===3||H===4){var U=Q.stateNode.containerInfo;if(U===Y)break;if(H===4)for(H=Q.return;H!==null;){var G=H.tag;if((G===3||G===4)&&H.stateNode.containerInfo===Y)return;H=H.return}for(;U!==null;){if(H=LZ(U),H===null)return;if(G=H.tag,G===5||G===6||G===26||G===27){Q=X=H;continue J}U=U.parentNode}}Q=Q.return}VO(function(){var K=X,O=cG(W),F=[];J:{var q=dO.get(J);if(q!==void 0){var R=zX,L=J;switch(J){case"keypress":if(EY(W)===0)break J;case"keydown":case"keyup":R=oB;break;case"focusin":L="focus",R=LU;break;case"focusout":L="blur",R=LU;break;case"beforeblur":case"afterblur":R=LU;break;case"click":if(W.button===2)break J;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":R=i$;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":R=xB;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":R=tB;break;case hO:case gO:case mO:R=mB;break;case pO:R=Jz;break;case"scroll":case"scrollend":R=yB;break;case"wheel":R=Wz;break;case"copy":case"cut":case"paste":R=dB;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":R=n$;break;case"toggle":case"beforetoggle":R=Yz}var w=(Z&4)!==0,N=!w&&(J==="scroll"||J==="scrollend"),$=w?q!==null?q+"Capture":null:q;w=[];for(var B=K,_;B!==null;){var z=B;if(_=z.stateNode,z=z.tag,z!==5&&z!==26&&z!==27||_===null||$===null||(z=UQ(B,$),z!=null&&w.push(NQ(B,z,_))),N)break;B=B.return}0<w.length&&(q=new R(q,L,null,W,O),F.push({event:q,listeners:w}))}}if((Z&7)===0){J:{if(q=J==="mouseover"||J==="pointerover",R=J==="mouseout"||J==="pointerout",q&&W!==eU&&(L=W.relatedTarget||W.fromElement)&&(LZ(L)||L[cZ]))break J;if(R||q){if(q=O.window===O?O:(q=O.ownerDocument)?q.defaultView||q.parentWindow:window,R){if(L=W.relatedTarget||W.toElement,R=K,L=L?LZ(L):null,L!==null&&(N=AQ(L),w=L.tag,L!==N||w!==5&&w!==27&&w!==6))L=null}else R=null,L=K;if(R!==L){if(w=i$,z="onMouseLeave",$="onMouseEnter",B="mouse",J==="pointerout"||J==="pointerover")w=n$,z="onPointerLeave",$="onPointerEnter",B="pointer";if(N=R==null?q:mW(R),_=L==null?q:mW(L),q=new w(z,B+"leave",R,W,O),q.target=N,q.relatedTarget=_,z=null,LZ(O)===K&&(w=new w($,B+"enter",L,W,O),w.target=_,w.relatedTarget=N,z=w),N=z,R&&L)Z:{w=ZA,$=R,B=L,_=0;for(z=$;z;z=w(z))_++;z=0;for(var P=B;P;P=w(P))z++;for(;0<_-z;)$=w($),_--;for(;0<z-_;)B=w(B),z--;for(;_--;){if($===B||B!==null&&$===B.alternate){w=$;break Z}$=w($),B=w(B)}w=null}else w=null;R!==null&&h1(F,q,R,w,!1),L!==null&&N!==null&&h1(F,N,L,w,!0)}}}J:{if(q=K?mW(K):window,R=q.nodeName&&q.nodeName.toLowerCase(),R==="select"||R==="input"&&q.type==="file")var D=t$;else if(r$(q))if(fO)D=Fz;else{D=Oz;var T=$z}else R=q.nodeName,!R||R.toLowerCase()!=="input"||q.type!=="checkbox"&&q.type!=="radio"?K&&lG(K.elementType)&&(D=t$):D=Rz;if(D&&(D=D(J,K))){jO(F,D,W,O);break J}T&&T(J,q,K),J==="focusout"&&K&&q.type==="number"&&K.memoizedProps.value!=null&&tU(q,"number",q.value)}switch(T=K?mW(K):window,J){case"focusin":if(r$(T)||T.contentEditable==="true")AZ=T,ZG=K,oW=null;break;case"focusout":oW=ZG=AZ=null;break;case"mousedown":WG=!0;break;case"contextmenu":case"mouseup":case"dragend":WG=!1,W1(F,W,O);break;case"selectionchange":if(Nz)break;case"keydown":case"keyup":W1(F,W,O)}var A;if(nG)J:{switch(J){case"compositionstart":var C="onCompositionStart";break J;case"compositionend":C="onCompositionEnd";break J;case"compositionupdate":C="onCompositionUpdate";break J}C=void 0}else zZ?EO(J,W)&&(C="onCompositionEnd"):J==="keydown"&&W.keyCode===229&&(C="onCompositionStart");if(C&&(PO&&W.locale!=="ko"&&(zZ||C!=="onCompositionStart"?C==="onCompositionEnd"&&zZ&&(A=TO()):(E8=O,iG=("value"in E8)?E8.value:E8.textContent,zZ=!0)),T=$X(K,C),0<T.length&&(C=new s$(C,J,null,W,O),F.push({event:C,listeners:T}),A?C.data=A:(A=SO(W),A!==null&&(C.data=A)))),A=Hz?Uz(J,W):Gz(J,W))C=$X(K,"onBeforeInput"),0<C.length&&(T=new s$("onBeforeInput","beforeinput",null,W,O),F.push({event:T,listeners:C}),T.data=A);ez(F,J,K,W,O)}VF(F,Z)})}function NQ(J,Z,W){return{instance:J,listener:Z,currentTarget:W}}function $X(J,Z){for(var W=Z+"Capture",Q=[];J!==null;){var Y=J,X=Y.stateNode;if(Y=Y.tag,Y!==5&&Y!==26&&Y!==27||X===null||(Y=UQ(J,W),Y!=null&&Q.unshift(NQ(J,Y,X)),Y=UQ(J,Z),Y!=null&&Q.push(NQ(J,Y,X))),J.tag===3)return Q;J=J.return}return[]}function ZA(J){if(J===null)return null;do J=J.return;while(J&&J.tag!==5&&J.tag!==27);return J?J:null}function h1(J,Z,W,Q,Y){for(var X=Z._reactName,H=[];W!==null&&W!==Q;){var U=W,G=U.alternate,K=U.stateNode;if(U=U.tag,G!==null&&G===Q)break;U!==5&&U!==26&&U!==27||K===null||(G=K,Y?(K=UQ(W,X),K!=null&&H.unshift(NQ(W,K,G))):Y||(K=UQ(W,X),K!=null&&H.push(NQ(W,K,G)))),W=W.return}H.length!==0&&J.push({event:Z,listeners:H})}function g1(J){return(typeof J==="string"?J:""+J).replace(WA,`
`).replace(QA,"")}function PF(J,Z){return Z=g1(Z),g1(J)===Z?!0:!1}function LJ(J,Z,W,Q,Y,X){switch(W){case"children":typeof Q==="string"?Z==="body"||Z==="textarea"&&Q===""||vZ(J,Q):(typeof Q==="number"||typeof Q==="bigint")&&Z!=="body"&&vZ(J,""+Q);break;case"className":LY(J,"class",Q);break;case"tabIndex":LY(J,"tabindex",Q);break;case"dir":case"role":case"viewBox":case"width":case"height":LY(J,W,Q);break;case"style":CO(J,Q,X);break;case"data":if(Z!=="object"){LY(J,"data",Q);break}case"src":case"href":if(Q===""&&(Z!=="a"||W!=="href")){J.removeAttribute(W);break}if(Q==null||typeof Q==="function"||typeof Q==="symbol"||typeof Q==="boolean"){J.removeAttribute(W);break}Q=TY(""+Q),J.setAttribute(W,Q);break;case"action":case"formAction":if(typeof Q==="function"){J.setAttribute(W,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof X==="function"&&(W==="formAction"?(Z!=="input"&&LJ(J,Z,"name",Y.name,Y,null),LJ(J,Z,"formEncType",Y.formEncType,Y,null),LJ(J,Z,"formMethod",Y.formMethod,Y,null),LJ(J,Z,"formTarget",Y.formTarget,Y,null)):(LJ(J,Z,"encType",Y.encType,Y,null),LJ(J,Z,"method",Y.method,Y,null),LJ(J,Z,"target",Y.target,Y,null)));if(Q==null||typeof Q==="symbol"||typeof Q==="boolean"){J.removeAttribute(W);break}Q=TY(""+Q),J.setAttribute(W,Q);break;case"onClick":Q!=null&&(J.onclick=a6);break;case"onScroll":Q!=null&&s0("scroll",J);break;case"onScrollEnd":Q!=null&&s0("scrollend",J);break;case"dangerouslySetInnerHTML":if(Q!=null){if(typeof Q!=="object"||!("__html"in Q))throw Error(J0(61));if(W=Q.__html,W!=null){if(Y.children!=null)throw Error(J0(60));J.innerHTML=W}}break;case"multiple":J.multiple=Q&&typeof Q!=="function"&&typeof Q!=="symbol";break;case"muted":J.muted=Q&&typeof Q!=="function"&&typeof Q!=="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(Q==null||typeof Q==="function"||typeof Q==="boolean"||typeof Q==="symbol"){J.removeAttribute("xlink:href");break}W=TY(""+Q),J.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",W);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":Q!=null&&typeof Q!=="function"&&typeof Q!=="symbol"?J.setAttribute(W,""+Q):J.removeAttribute(W);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":Q&&typeof Q!=="function"&&typeof Q!=="symbol"?J.setAttribute(W,""):J.removeAttribute(W);break;case"capture":case"download":Q===!0?J.setAttribute(W,""):Q!==!1&&Q!=null&&typeof Q!=="function"&&typeof Q!=="symbol"?J.setAttribute(W,Q):J.removeAttribute(W);break;case"cols":case"rows":case"size":case"span":Q!=null&&typeof Q!=="function"&&typeof Q!=="symbol"&&!isNaN(Q)&&1<=Q?J.setAttribute(W,Q):J.removeAttribute(W);break;case"rowSpan":case"start":Q==null||typeof Q==="function"||typeof Q==="symbol"||isNaN(Q)?J.removeAttribute(W):J.setAttribute(W,Q);break;case"popover":s0("beforetoggle",J),s0("toggle",J),VY(J,"popover",Q);break;case"xlinkActuate":d6(J,"http://www.w3.org/1999/xlink","xlink:actuate",Q);break;case"xlinkArcrole":d6(J,"http://www.w3.org/1999/xlink","xlink:arcrole",Q);break;case"xlinkRole":d6(J,"http://www.w3.org/1999/xlink","xlink:role",Q);break;case"xlinkShow":d6(J,"http://www.w3.org/1999/xlink","xlink:show",Q);break;case"xlinkTitle":d6(J,"http://www.w3.org/1999/xlink","xlink:title",Q);break;case"xlinkType":d6(J,"http://www.w3.org/1999/xlink","xlink:type",Q);break;case"xmlBase":d6(J,"http://www.w3.org/XML/1998/namespace","xml:base",Q);break;case"xmlLang":d6(J,"http://www.w3.org/XML/1998/namespace","xml:lang",Q);break;case"xmlSpace":d6(J,"http://www.w3.org/XML/1998/namespace","xml:space",Q);break;case"is":VY(J,"is",Q);break;case"innerText":case"textContent":break;default:if(!(2<W.length)||W[0]!=="o"&&W[0]!=="O"||W[1]!=="n"&&W[1]!=="N")W=fB.get(W)||W,VY(J,W,Q)}}function TG(J,Z,W,Q,Y,X){switch(W){case"style":CO(J,Q,X);break;case"dangerouslySetInnerHTML":if(Q!=null){if(typeof Q!=="object"||!("__html"in Q))throw Error(J0(61));if(W=Q.__html,W!=null){if(Y.children!=null)throw Error(J0(60));J.innerHTML=W}}break;case"children":typeof Q==="string"?vZ(J,Q):(typeof Q==="number"||typeof Q==="bigint")&&vZ(J,""+Q);break;case"onScroll":Q!=null&&s0("scroll",J);break;case"onScrollEnd":Q!=null&&s0("scrollend",J);break;case"onClick":Q!=null&&(J.onclick=a6);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!AO.hasOwnProperty(W))J:{if(W[0]==="o"&&W[1]==="n"&&(Y=W.endsWith("Capture"),Z=W.slice(2,Y?W.length-7:void 0),X=J[T7]||null,X=X!=null?X[W]:null,typeof X==="function"&&J.removeEventListener(Z,X,Y),typeof Q==="function")){typeof X!=="function"&&X!==null&&(W in J?J[W]=null:J.hasAttribute(W)&&J.removeAttribute(W)),J.addEventListener(Z,Q,Y);break J}W in J?J[W]=Q:Q===!0?J.setAttribute(W,""):VY(J,W,Q)}}}function $7(J,Z,W){switch(Z){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":s0("error",J),s0("load",J);var Q=!1,Y=!1,X;for(X in W)if(W.hasOwnProperty(X)){var H=W[X];if(H!=null)switch(X){case"src":Q=!0;break;case"srcSet":Y=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(J0(137,Z));default:LJ(J,Z,X,H,W,null)}}Y&&LJ(J,Z,"srcSet",W.srcSet,W,null),Q&&LJ(J,Z,"src",W.src,W,null);return;case"input":s0("invalid",J);var U=X=H=Y=null,G=null,K=null;for(Q in W)if(W.hasOwnProperty(Q)){var O=W[Q];if(O!=null)switch(Q){case"name":Y=O;break;case"type":H=O;break;case"checked":G=O;break;case"defaultChecked":K=O;break;case"value":X=O;break;case"defaultValue":U=O;break;case"children":case"dangerouslySetInnerHTML":if(O!=null)throw Error(J0(137,Z));break;default:LJ(J,Z,Q,O,W,null)}}wO(J,X,U,G,K,H,Y,!1);return;case"select":s0("invalid",J),Q=H=X=null;for(Y in W)if(W.hasOwnProperty(Y)&&(U=W[Y],U!=null))switch(Y){case"value":X=U;break;case"defaultValue":H=U;break;case"multiple":Q=U;default:LJ(J,Z,Y,U,W,null)}Z=X,W=H,J.multiple=!!Q,Z!=null?TZ(J,!!Q,Z,!1):W!=null&&TZ(J,!!Q,W,!0);return;case"textarea":s0("invalid",J),X=Y=Q=null;for(H in W)if(W.hasOwnProperty(H)&&(U=W[H],U!=null))switch(H){case"value":Q=U;break;case"defaultValue":Y=U;break;case"children":X=U;break;case"dangerouslySetInnerHTML":if(U!=null)throw Error(J0(91));break;default:LJ(J,Z,H,U,W,null)}kO(J,Q,Y,X);return;case"option":for(G in W)if(W.hasOwnProperty(G)&&(Q=W[G],Q!=null))switch(G){case"selected":J.selected=Q&&typeof Q!=="function"&&typeof Q!=="symbol";break;default:LJ(J,Z,G,Q,W,null)}return;case"dialog":s0("beforetoggle",J),s0("toggle",J),s0("cancel",J),s0("close",J);break;case"iframe":case"object":s0("load",J);break;case"video":case"audio":for(Q=0;Q<MQ.length;Q++)s0(MQ[Q],J);break;case"image":s0("error",J),s0("load",J);break;case"details":s0("toggle",J);break;case"embed":case"source":case"link":s0("error",J),s0("load",J);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(K in W)if(W.hasOwnProperty(K)&&(Q=W[K],Q!=null))switch(K){case"children":case"dangerouslySetInnerHTML":throw Error(J0(137,Z));default:LJ(J,Z,K,Q,W,null)}return;default:if(lG(Z)){for(O in W)W.hasOwnProperty(O)&&(Q=W[O],Q!==void 0&&TG(J,Z,O,Q,W,void 0));return}}for(U in W)W.hasOwnProperty(U)&&(Q=W[U],Q!=null&&LJ(J,Z,U,Q,W,null))}function YA(J,Z,W,Q){switch(Z){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var Y=null,X=null,H=null,U=null,G=null,K=null,O=null;for(R in W){var F=W[R];if(W.hasOwnProperty(R)&&F!=null)switch(R){case"checked":break;case"value":break;case"defaultValue":G=F;default:Q.hasOwnProperty(R)||LJ(J,Z,R,null,Q,F)}}for(var q in Q){var R=Q[q];if(F=W[q],Q.hasOwnProperty(q)&&(R!=null||F!=null))switch(q){case"type":X=R;break;case"name":Y=R;break;case"checked":K=R;break;case"defaultChecked":O=R;break;case"value":H=R;break;case"defaultValue":U=R;break;case"children":case"dangerouslySetInnerHTML":if(R!=null)throw Error(J0(137,Z));break;default:R!==F&&LJ(J,Z,q,R,Q,F)}}rU(J,H,U,G,K,O,X,Y);return;case"select":R=H=U=q=null;for(X in W)if(G=W[X],W.hasOwnProperty(X)&&G!=null)switch(X){case"value":break;case"multiple":R=G;default:Q.hasOwnProperty(X)||LJ(J,Z,X,null,Q,G)}for(Y in Q)if(X=Q[Y],G=W[Y],Q.hasOwnProperty(Y)&&(X!=null||G!=null))switch(Y){case"value":q=X;break;case"defaultValue":U=X;break;case"multiple":H=X;default:X!==G&&LJ(J,Z,Y,X,Q,G)}Z=U,W=H,Q=R,q!=null?TZ(J,!!W,q,!1):!!Q!==!!W&&(Z!=null?TZ(J,!!W,Z,!0):TZ(J,!!W,W?[]:"",!1));return;case"textarea":R=q=null;for(U in W)if(Y=W[U],W.hasOwnProperty(U)&&Y!=null&&!Q.hasOwnProperty(U))switch(U){case"value":break;case"children":break;default:LJ(J,Z,U,null,Q,Y)}for(H in Q)if(Y=Q[H],X=W[H],Q.hasOwnProperty(H)&&(Y!=null||X!=null))switch(H){case"value":q=Y;break;case"defaultValue":R=Y;break;case"children":break;case"dangerouslySetInnerHTML":if(Y!=null)throw Error(J0(91));break;default:Y!==X&&LJ(J,Z,H,Y,Q,X)}DO(J,q,R);return;case"option":for(var L in W)if(q=W[L],W.hasOwnProperty(L)&&q!=null&&!Q.hasOwnProperty(L))switch(L){case"selected":J.selected=!1;break;default:LJ(J,Z,L,null,Q,q)}for(G in Q)if(q=Q[G],R=W[G],Q.hasOwnProperty(G)&&q!==R&&(q!=null||R!=null))switch(G){case"selected":J.selected=q&&typeof q!=="function"&&typeof q!=="symbol";break;default:LJ(J,Z,G,q,Q,R)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var w in W)q=W[w],W.hasOwnProperty(w)&&q!=null&&!Q.hasOwnProperty(w)&&LJ(J,Z,w,null,Q,q);for(K in Q)if(q=Q[K],R=W[K],Q.hasOwnProperty(K)&&q!==R&&(q!=null||R!=null))switch(K){case"children":case"dangerouslySetInnerHTML":if(q!=null)throw Error(J0(137,Z));break;default:LJ(J,Z,K,q,Q,R)}return;default:if(lG(Z)){for(var N in W)q=W[N],W.hasOwnProperty(N)&&q!==void 0&&!Q.hasOwnProperty(N)&&TG(J,Z,N,void 0,Q,q);for(O in Q)q=Q[O],R=W[O],!Q.hasOwnProperty(O)||q===R||q===void 0&&R===void 0||TG(J,Z,O,q,Q,R);return}}for(var $ in W)q=W[$],W.hasOwnProperty($)&&q!=null&&!Q.hasOwnProperty($)&&LJ(J,Z,$,null,Q,q);for(F in Q)q=Q[F],R=W[F],!Q.hasOwnProperty(F)||q===R||q==null&&R==null||LJ(J,Z,F,q,Q,R)}function m1(J){switch(J){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function XA(){if(typeof performance.getEntriesByType==="function"){for(var J=0,Z=0,W=performance.getEntriesByType("resource"),Q=0;Q<W.length;Q++){var Y=W[Q],X=Y.transferSize,H=Y.initiatorType,U=Y.duration;if(X&&U&&m1(H)){H=0,U=Y.responseEnd;for(Q+=1;Q<W.length;Q++){var G=W[Q],K=G.startTime;if(K>U)break;var{transferSize:O,initiatorType:F}=G;O&&m1(F)&&(G=G.responseEnd,H+=O*(G<U?1:(U-K)/(G-K)))}if(--Q,Z+=8*(X+H)/(Y.duration/1000),J++,10<J)break}}if(0<J)return Z/J/1e6}return navigator.connection&&(J=navigator.connection.downlink,typeof J==="number")?J:5}function OX(J){return J.nodeType===9?J:J.ownerDocument}function p1(J){switch(J){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function EF(J,Z){if(J===0)switch(Z){case"svg":return 1;case"math":return 2;default:return 0}return J===1&&Z==="foreignObject"?0:J}function SG(J,Z){return J==="textarea"||J==="noscript"||typeof Z.children==="string"||typeof Z.children==="number"||typeof Z.children==="bigint"||typeof Z.dangerouslySetInnerHTML==="object"&&Z.dangerouslySetInnerHTML!==null&&Z.dangerouslySetInnerHTML.__html!=null}function HA(){var J=window.event;if(J&&J.type==="popstate"){if(J===gU)return!1;return gU=J,!0}return gU=null,!1}function KA(J){setTimeout(function(){throw J})}function n8(J){return J==="head"}function u1(J,Z){var W=Z,Q=0;do{var Y=W.nextSibling;if(J.removeChild(W),Y&&Y.nodeType===8)if(W=Y.data,W==="/$"||W==="/&"){if(Q===0){J.removeChild(Y),lZ(Z);return}Q--}else if(W==="$"||W==="$?"||W==="$~"||W==="$!"||W==="&")Q++;else if(W==="html")XQ(J.ownerDocument.documentElement);else if(W==="head"){W=J.ownerDocument.head,XQ(W);for(var X=W.firstChild;X;){var{nextSibling:H,nodeName:U}=X;X[DQ]||U==="SCRIPT"||U==="STYLE"||U==="LINK"&&X.rel.toLowerCase()==="stylesheet"||W.removeChild(X),X=H}}else W==="body"&&XQ(J.ownerDocument.body);W=Y}while(W);lZ(Z)}function l1(J,Z){var W=J;J=0;do{var Q=W.nextSibling;if(W.nodeType===1?Z?(W._stashedDisplay=W.style.display,W.style.display="none"):(W.style.display=W._stashedDisplay||"",W.getAttribute("style")===""&&W.removeAttribute("style")):W.nodeType===3&&(Z?(W._stashedText=W.nodeValue,W.nodeValue=""):W.nodeValue=W._stashedText||""),Q&&Q.nodeType===8)if(W=Q.data,W==="/$")if(J===0)break;else J--;else W!=="$"&&W!=="$?"&&W!=="$~"&&W!=="$!"||J++;W=Q}while(W)}function jG(J){var Z=J.firstChild;Z&&Z.nodeType===10&&(Z=Z.nextSibling);for(;Z;){var W=Z;switch(Z=Z.nextSibling,W.nodeName){case"HTML":case"HEAD":case"BODY":jG(W),uG(W);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(W.rel.toLowerCase()==="stylesheet")continue}J.removeChild(W)}}function qA(J,Z,W,Q){for(;J.nodeType===1;){var Y=W;if(J.nodeName.toLowerCase()!==Z.toLowerCase()){if(!Q&&(J.nodeName!=="INPUT"||J.type!=="hidden"))break}else if(!Q)if(Z==="input"&&J.type==="hidden"){var X=Y.name==null?null:""+Y.name;if(Y.type==="hidden"&&J.getAttribute("name")===X)return J}else return J;else if(!J[DQ])switch(Z){case"meta":if(!J.hasAttribute("itemprop"))break;return J;case"link":if(X=J.getAttribute("rel"),X==="stylesheet"&&J.hasAttribute("data-precedence"))break;else if(X!==Y.rel||J.getAttribute("href")!==(Y.href==null||Y.href===""?null:Y.href)||J.getAttribute("crossorigin")!==(Y.crossOrigin==null?null:Y.crossOrigin)||J.getAttribute("title")!==(Y.title==null?null:Y.title))break;return J;case"style":if(J.hasAttribute("data-precedence"))break;return J;case"script":if(X=J.getAttribute("src"),(X!==(Y.src==null?null:Y.src)||J.getAttribute("type")!==(Y.type==null?null:Y.type)||J.getAttribute("crossorigin")!==(Y.crossOrigin==null?null:Y.crossOrigin))&&X&&J.hasAttribute("async")&&!J.hasAttribute("itemprop"))break;return J;default:return J}if(J=U6(J.nextSibling),J===null)break}return null}function $A(J,Z,W){if(Z==="")return null;for(;J.nodeType!==3;){if((J.nodeType!==1||J.nodeName!=="INPUT"||J.type!=="hidden")&&!W)return null;if(J=U6(J.nextSibling),J===null)return null}return J}function jF(J,Z){for(;J.nodeType!==8;){if((J.nodeType!==1||J.nodeName!=="INPUT"||J.type!=="hidden")&&!Z)return null;if(J=U6(J.nextSibling),J===null)return null}return J}function fG(J){return J.data==="$?"||J.data==="$~"}function bG(J){return J.data==="$!"||J.data==="$?"&&J.ownerDocument.readyState!=="loading"}function OA(J,Z){var W=J.ownerDocument;if(J.data==="$~")J._reactRetry=Z;else if(J.data!=="$?"||W.readyState!=="loading")Z();else{var Q=function(){Z(),W.removeEventListener("DOMContentLoaded",Q)};W.addEventListener("DOMContentLoaded",Q),J._reactRetry=Q}}function U6(J){for(;J!=null;J=J.nextSibling){var Z=J.nodeType;if(Z===1||Z===3)break;if(Z===8){if(Z=J.data,Z==="$"||Z==="$!"||Z==="$?"||Z==="$~"||Z==="&"||Z==="F!"||Z==="F")break;if(Z==="/$"||Z==="/&")return null}}return J}function c1(J){J=J.nextSibling;for(var Z=0;J;){if(J.nodeType===8){var W=J.data;if(W==="/$"||W==="/&"){if(Z===0)return U6(J.nextSibling);Z--}else W!=="$"&&W!=="$!"&&W!=="$?"&&W!=="$~"&&W!=="&"||Z++}J=J.nextSibling}return null}function i1(J){J=J.previousSibling;for(var Z=0;J;){if(J.nodeType===8){var W=J.data;if(W==="$"||W==="$!"||W==="$?"||W==="$~"||W==="&"){if(Z===0)return J;Z--}else W!=="/$"&&W!=="/&"||Z++}J=J.previousSibling}return null}function fF(J,Z,W){switch(Z=OX(W),J){case"html":if(J=Z.documentElement,!J)throw Error(J0(452));return J;case"head":if(J=Z.head,!J)throw Error(J0(453));return J;case"body":if(J=Z.body,!J)throw Error(J0(454));return J;default:throw Error(J0(451))}}function XQ(J){for(var Z=J.attributes;Z.length;)J.removeAttributeNode(Z[0]);uG(J)}function RX(J){return typeof J.getRootNode==="function"?J.getRootNode():J.nodeType===9?J:J.ownerDocument}function RA(){var J=H8.f(),Z=EX();return J||Z}function FA(J){var Z=iZ(J);Z!==null&&Z.tag===5&&Z.type==="form"?CR(Z):H8.r(J)}function bF(J,Z,W){var Q=aZ;if(Q&&typeof Z==="string"&&Z){var Y=Q6(Z);Y='link[rel="'+J+'"][href="'+Y+'"]',typeof W==="string"&&(Y+='[crossorigin="'+W+'"]'),s1.has(Y)||(s1.add(Y),J={rel:J,crossOrigin:W,href:Z},Q.querySelector(Y)===null&&(Z=Q.createElement("link"),$7(Z,"link",J),Y7(Z),Q.head.appendChild(Z)))}}function MA(J){H8.D(J),bF("dns-prefetch",J,null)}function NA(J,Z){H8.C(J,Z),bF("preconnect",J,Z)}function LA(J,Z,W){H8.L(J,Z,W);var Q=aZ;if(Q&&J&&Z){var Y='link[rel="preload"][as="'+Q6(Z)+'"]';Z==="image"?W&&W.imageSrcSet?(Y+='[imagesrcset="'+Q6(W.imageSrcSet)+'"]',typeof W.imageSizes==="string"&&(Y+='[imagesizes="'+Q6(W.imageSizes)+'"]')):Y+='[href="'+Q6(J)+'"]':Y+='[href="'+Q6(J)+'"]';var X=Y;switch(Z){case"style":X=uZ(J);break;case"script":X=rZ(J)}G6.has(X)||(J=SJ({rel:"preload",href:Z==="image"&&W&&W.imageSrcSet?void 0:J,as:Z},W),G6.set(X,J),Q.querySelector(Y)!==null||Z==="style"&&Q.querySelector(EQ(X))||Z==="script"&&Q.querySelector(SQ(X))||(Z=Q.createElement("link"),$7(Z,"link",J),Y7(Z),Q.head.appendChild(Z)))}}function BA(J,Z){H8.m(J,Z);var W=aZ;if(W&&J){var Q=Z&&typeof Z.as==="string"?Z.as:"script",Y='link[rel="modulepreload"][as="'+Q6(Q)+'"][href="'+Q6(J)+'"]',X=Y;switch(Q){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":X=rZ(J)}if(!G6.has(X)&&(J=SJ({rel:"modulepreload",href:J},Z),G6.set(X,J),W.querySelector(Y)===null)){switch(Q){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(W.querySelector(SQ(X)))return}Q=W.createElement("link"),$7(Q,"link",J),Y7(Q),W.head.appendChild(Q)}}}function zA(J,Z,W){H8.S(J,Z,W);var Q=aZ;if(Q&&J){var Y=VZ(Q).hoistableStyles,X=uZ(J);Z=Z||"default";var H=Y.get(X);if(!H){var U={loading:0,preload:null};if(H=Q.querySelector(EQ(X)))U.loading=5;else{J=SJ({rel:"stylesheet",href:J,"data-precedence":Z},W),(W=G6.get(X))&&TK(J,W);var G=H=Q.createElement("link");Y7(G),$7(G,"link",J),G._p=new Promise(function(K,O){G.onload=K,G.onerror=O}),G.addEventListener("load",function(){U.loading|=1}),G.addEventListener("error",function(){U.loading|=2}),U.loading|=4,gY(H,Z,Q)}H={type:"stylesheet",instance:H,count:1,state:U},Y.set(X,H)}}}function AA(J,Z){H8.X(J,Z);var W=aZ;if(W&&J){var Q=VZ(W).hoistableScripts,Y=rZ(J),X=Q.get(Y);X||(X=W.querySelector(SQ(Y)),X||(J=SJ({src:J,async:!0},Z),(Z=G6.get(Y))&&PK(J,Z),X=W.createElement("script"),Y7(X),$7(X,"link",J),W.head.appendChild(X)),X={type:"script",instance:X,count:1,state:null},Q.set(Y,X))}}function _A(J,Z){H8.M(J,Z);var W=aZ;if(W&&J){var Q=VZ(W).hoistableScripts,Y=rZ(J),X=Q.get(Y);X||(X=W.querySelector(SQ(Y)),X||(J=SJ({src:J,async:!0,type:"module"},Z),(Z=G6.get(Y))&&PK(J,Z),X=W.createElement("script"),Y7(X),$7(X,"link",J),W.head.appendChild(X)),X={type:"script",instance:X,count:1,state:null},Q.set(Y,X))}}function n1(J,Z,W,Q){var Y=(Y=b8.current)?RX(Y):null;if(!Y)throw Error(J0(446));switch(J){case"meta":case"title":return null;case"style":return typeof W.precedence==="string"&&typeof W.href==="string"?(Z=uZ(W.href),W=VZ(Y).hoistableStyles,Q=W.get(Z),Q||(Q={type:"style",instance:null,count:0,state:null},W.set(Z,Q)),Q):{type:"void",instance:null,count:0,state:null};case"link":if(W.rel==="stylesheet"&&typeof W.href==="string"&&typeof W.precedence==="string"){J=uZ(W.href);var X=VZ(Y).hoistableStyles,H=X.get(J);if(H||(Y=Y.ownerDocument||Y,H={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},X.set(J,H),(X=Y.querySelector(EQ(J)))&&!X._p&&(H.instance=X,H.state.loading=5),G6.has(J)||(W={rel:"preload",as:"style",href:W.href,crossOrigin:W.crossOrigin,integrity:W.integrity,media:W.media,hrefLang:W.hrefLang,referrerPolicy:W.referrerPolicy},G6.set(J,W),X||IA(Y,J,W,H.state))),Z&&Q===null)throw Error(J0(528,""));return H}if(Z&&Q!==null)throw Error(J0(529,""));return null;case"script":return Z=W.async,W=W.src,typeof W==="string"&&Z&&typeof Z!=="function"&&typeof Z!=="symbol"?(Z=rZ(W),W=VZ(Y).hoistableScripts,Q=W.get(Z),Q||(Q={type:"script",instance:null,count:0,state:null},W.set(Z,Q)),Q):{type:"void",instance:null,count:0,state:null};default:throw Error(J0(444,J))}}function uZ(J){return'href="'+Q6(J)+'"'}function EQ(J){return'link[rel="stylesheet"]['+J+"]"}function yF(J){return SJ({},J,{"data-precedence":J.precedence,precedence:null})}function IA(J,Z,W,Q){J.querySelector('link[rel="preload"][as="style"]['+Z+"]")?Q.loading=1:(Z=J.createElement("link"),Q.preload=Z,Z.addEventListener("load",function(){return Q.loading|=1}),Z.addEventListener("error",function(){return Q.loading|=2}),$7(Z,"link",W),Y7(Z),J.head.appendChild(Z))}function rZ(J){return'[src="'+Q6(J)+'"]'}function SQ(J){return"script[async]"+J}function o1(J,Z,W){if(Z.count++,Z.instance===null)switch(Z.type){case"style":var Q=J.querySelector('style[data-href~="'+Q6(W.href)+'"]');if(Q)return Z.instance=Q,Y7(Q),Q;var Y=SJ({},W,{"data-href":W.href,"data-precedence":W.precedence,href:null,precedence:null});return Q=(J.ownerDocument||J).createElement("style"),Y7(Q),$7(Q,"style",Y),gY(Q,W.precedence,J),Z.instance=Q;case"stylesheet":Y=uZ(W.href);var X=J.querySelector(EQ(Y));if(X)return Z.state.loading|=4,Z.instance=X,Y7(X),X;Q=yF(W),(Y=G6.get(Y))&&TK(Q,Y),X=(J.ownerDocument||J).createElement("link"),Y7(X);var H=X;return H._p=new Promise(function(U,G){H.onload=U,H.onerror=G}),$7(X,"link",Q),Z.state.loading|=4,gY(X,W.precedence,J),Z.instance=X;case"script":if(X=rZ(W.src),Y=J.querySelector(SQ(X)))return Z.instance=Y,Y7(Y),Y;if(Q=W,Y=G6.get(X))Q=SJ({},W),PK(Q,Y);return J=J.ownerDocument||J,Y=J.createElement("script"),Y7(Y),$7(Y,"link",Q),J.head.appendChild(Y),Z.instance=Y;case"void":return null;default:throw Error(J0(443,Z.type))}else Z.type==="stylesheet"&&(Z.state.loading&4)===0&&(Q=Z.instance,Z.state.loading|=4,gY(Q,W.precedence,J));return Z.instance}function gY(J,Z,W){for(var Q=W.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),Y=Q.length?Q[Q.length-1]:null,X=Y,H=0;H<Q.length;H++){var U=Q[H];if(U.dataset.precedence===Z)X=U;else if(X!==Y)break}X?X.parentNode.insertBefore(J,X.nextSibling):(Z=W.nodeType===9?W.head:W,Z.insertBefore(J,Z.firstChild))}function TK(J,Z){J.crossOrigin==null&&(J.crossOrigin=Z.crossOrigin),J.referrerPolicy==null&&(J.referrerPolicy=Z.referrerPolicy),J.title==null&&(J.title=Z.title)}function PK(J,Z){J.crossOrigin==null&&(J.crossOrigin=Z.crossOrigin),J.referrerPolicy==null&&(J.referrerPolicy=Z.referrerPolicy),J.integrity==null&&(J.integrity=Z.integrity)}function a1(J,Z,W){if(mY===null){var Q=new Map,Y=mY=new Map;Y.set(W,Q)}else Y=mY,Q=Y.get(W),Q||(Q=new Map,Y.set(W,Q));if(Q.has(J))return Q;Q.set(J,null),W=W.getElementsByTagName(J);for(Y=0;Y<W.length;Y++){var X=W[Y];if(!(X[DQ]||X[G7]||J==="link"&&X.getAttribute("rel")==="stylesheet")&&X.namespaceURI!=="http://www.w3.org/2000/svg"){var H=X.getAttribute(Z)||"";H=J+H;var U=Q.get(H);U?U.push(X):Q.set(H,[X])}}return Q}function r1(J,Z,W){J=J.ownerDocument||J,J.head.insertBefore(W,Z==="title"?J.querySelector("head > title"):null)}function wA(J,Z,W){if(W===1||Z.itemProp!=null)return!1;switch(J){case"meta":case"title":return!0;case"style":if(typeof Z.precedence!=="string"||typeof Z.href!=="string"||Z.href==="")break;return!0;case"link":if(typeof Z.rel!=="string"||typeof Z.href!=="string"||Z.href===""||Z.onLoad||Z.onError)break;switch(Z.rel){case"stylesheet":return J=Z.disabled,typeof Z.precedence==="string"&&J==null;default:return!0}case"script":if(Z.async&&typeof Z.async!=="function"&&typeof Z.async!=="symbol"&&!Z.onLoad&&!Z.onError&&Z.src&&typeof Z.src==="string")return!0}return!1}function vF(J){return J.type==="stylesheet"&&(J.state.loading&3)===0?!1:!0}function DA(J,Z,W,Q){if(W.type==="stylesheet"&&(typeof Q.media!=="string"||matchMedia(Q.media).matches!==!1)&&(W.state.loading&4)===0){if(W.instance===null){var Y=uZ(Q.href),X=Z.querySelector(EQ(Y));if(X){Z=X._p,Z!==null&&typeof Z==="object"&&typeof Z.then==="function"&&(J.count++,J=FX.bind(J),Z.then(J,J)),W.state.loading|=4,W.instance=X,Y7(X);return}X=Z.ownerDocument||Z,Q=yF(Q),(Y=G6.get(Y))&&TK(Q,Y),X=X.createElement("link"),Y7(X);var H=X;H._p=new Promise(function(U,G){H.onload=U,H.onerror=G}),$7(X,"link",Q),W.instance=X}J.stylesheets===null&&(J.stylesheets=new Map),J.stylesheets.set(W,Z),(Z=W.state.preload)&&(W.state.loading&3)===0&&(J.count++,W=FX.bind(J),Z.addEventListener("load",W),Z.addEventListener("error",W))}}function kA(J,Z){return J.stylesheets&&J.count===0&&pY(J,J.stylesheets),0<J.count||0<J.imgCount?function(W){var Q=setTimeout(function(){if(J.stylesheets&&pY(J,J.stylesheets),J.unsuspend){var X=J.unsuspend;J.unsuspend=null,X()}},60000+Z);0<J.imgBytes&&mU===0&&(mU=62500*XA());var Y=setTimeout(function(){if(J.waitingForImages=!1,J.count===0&&(J.stylesheets&&pY(J,J.stylesheets),J.unsuspend)){var X=J.unsuspend;J.unsuspend=null,X()}},(J.imgBytes>mU?50:800)+Z);return J.unsuspend=W,function(){J.unsuspend=null,clearTimeout(Q),clearTimeout(Y)}}:null}function FX(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)pY(this,this.stylesheets);else if(this.unsuspend){var J=this.unsuspend;this.unsuspend=null,J()}}}function pY(J,Z){J.stylesheets=null,J.unsuspend!==null&&(J.count++,MX=new Map,Z.forEach(CA,J),MX=null,FX.call(J))}function CA(J,Z){if(!(Z.state.loading&4)){var W=MX.get(J);if(W)var Q=W.get(null);else{W=new Map,MX.set(J,W);for(var Y=J.querySelectorAll("link[data-precedence],style[data-precedence]"),X=0;X<Y.length;X++){var H=Y[X];if(H.nodeName==="LINK"||H.getAttribute("media")!=="not all")W.set(H.dataset.precedence,H),Q=H}Q&&W.set(null,Q)}Y=Z.instance,H=Y.getAttribute("data-precedence"),X=W.get(H)||Q,X===Q&&W.set(null,Y),W.set(H,Y),this.count++,Q=FX.bind(this),Y.addEventListener("load",Q),Y.addEventListener("error",Q),X?X.parentNode.insertBefore(Y,X.nextSibling):(J=J.nodeType===9?J.head:J,J.insertBefore(Y,J.firstChild)),Z.state.loading|=4}}function VA(J,Z,W,Q,Y,X,H,U,G){this.tag=1,this.containerInfo=J,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=RU(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=RU(0),this.hiddenUpdates=RU(null),this.identifierPrefix=Q,this.onUncaughtError=Y,this.onCaughtError=X,this.onRecoverableError=H,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=G,this.incompleteTransitions=new Map}function xF(J,Z,W,Q,Y,X,H,U,G,K,O,F){return J=new VA(J,Z,W,H,G,K,O,F,U),Z=1,X===!0&&(Z|=24),X=h7(3,null,null,Z),J.current=X,X.stateNode=J,Z=ZK(),Z.refCount++,J.pooledCache=Z,Z.refCount++,X.memoizedState={element:Q,isDehydrated:W,cache:Z},YK(X),J}function hF(J){if(!J)return wZ;return J=wZ,J}function gF(J,Z,W,Q,Y,X){Y=hF(Y),Q.context===null?Q.context=Y:Q.pendingContext=Y,Q=v8(Z),Q.payload={element:W},X=X===void 0?null:X,X!==null&&(Q.callback=X),W=x8(J,Q,Z),W!==null&&(V7(W,J,Z),rW(W,J,Z))}function t1(J,Z){if(J=J.memoizedState,J!==null&&J.dehydrated!==null){var W=J.retryLane;J.retryLane=W!==0&&W<Z?W:Z}}function EK(J,Z){t1(J,Z),(J=J.alternate)&&t1(J,Z)}function mF(J){if(J.tag===13||J.tag===31){var Z=P9(J,67108864);Z!==null&&V7(Z,J,67108864),EK(J,67108864)}}function e1(J){if(J.tag===13||J.tag===31){var Z=u7();Z=pG(Z);var W=P9(J,Z);W!==null&&V7(W,J,Z),EK(J,Z)}}function TA(J,Z,W,Q){var Y=y0.T;y0.T=null;var X=qJ.p;try{qJ.p=2,SK(J,Z,W,Q)}finally{qJ.p=X,y0.T=Y}}function PA(J,Z,W,Q){var Y=y0.T;y0.T=null;var X=qJ.p;try{qJ.p=8,SK(J,Z,W,Q)}finally{qJ.p=X,y0.T=Y}}function SK(J,Z,W,Q){if(NX){var Y=vG(Q);if(Y===null)hU(J,Z,Q,LX,W),JO(J,Q);else if(SA(Y,J,Z,W,Q))Q.stopPropagation();else if(JO(J,Q),Z&4&&-1<EA.indexOf(J)){for(;Y!==null;){var X=iZ(Y);if(X!==null)switch(X.tag){case 3:if(X=X.stateNode,X.current.memoizedState.isDehydrated){var H=O9(X.pendingLanes);if(H!==0){var U=X;U.pendingLanes|=2;for(U.entangledLanes|=2;H;){var G=1<<31-d7(H);U.entanglements[1]|=G,H&=~G}f6(X),(KJ&6)===0&&(HX=m7()+500,PQ(0,!1))}}break;case 31:case 13:U=P9(X,2),U!==null&&V7(U,X,2),EX(),EK(X,2)}if(X=vG(Q),X===null&&hU(J,Z,Q,LX,W),X===Y)break;Y=X}Y!==null&&Q.stopPropagation()}else hU(J,Z,Q,null,W)}}function vG(J){return J=cG(J),jK(J)}function jK(J){if(LX=null,J=LZ(J),J!==null){var Z=AQ(J);if(Z===null)J=null;else{var W=Z.tag;if(W===13){if(J=HO(Z),J!==null)return J;J=null}else if(W===31){if(J=UO(Z),J!==null)return J;J=null}else if(W===3){if(Z.stateNode.current.memoizedState.isDehydrated)return Z.tag===3?Z.stateNode.containerInfo:null;J=null}else Z!==J&&(J=null)}}return LX=J,null}function pF(J){switch(J){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(LB()){case $O:return 2;case OO:return 8;case iY:case BB:return 32;case RO:return 268435456;default:return 32}default:return 32}}function JO(J,Z){switch(J){case"focusin":case"focusout":m8=null;break;case"dragenter":case"dragleave":p8=null;break;case"mouseover":case"mouseout":d8=null;break;case"pointerover":case"pointerout":BQ.delete(Z.pointerId);break;case"gotpointercapture":case"lostpointercapture":zQ.delete(Z.pointerId)}}function xW(J,Z,W,Q,Y,X){if(J===null||J.nativeEvent!==X)return J={blockedOn:Z,domEventName:W,eventSystemFlags:Q,nativeEvent:X,targetContainers:[Y]},Z!==null&&(Z=iZ(Z),Z!==null&&mF(Z)),J;return J.eventSystemFlags|=Q,Z=J.targetContainers,Y!==null&&Z.indexOf(Y)===-1&&Z.push(Y),J}function SA(J,Z,W,Q,Y){switch(Z){case"focusin":return m8=xW(m8,J,Z,W,Q,Y),!0;case"dragenter":return p8=xW(p8,J,Z,W,Q,Y),!0;case"mouseover":return d8=xW(d8,J,Z,W,Q,Y),!0;case"pointerover":var X=Y.pointerId;return BQ.set(X,xW(BQ.get(X)||null,J,Z,W,Q,Y)),!0;case"gotpointercapture":return X=Y.pointerId,zQ.set(X,xW(zQ.get(X)||null,J,Z,W,Q,Y)),!0}return!1}function dF(J){var Z=LZ(J.target);if(Z!==null){var W=AQ(Z);if(W!==null){if(Z=W.tag,Z===13){if(Z=HO(W),Z!==null){J.blockedOn=Z,g$(J.priority,function(){e1(W)});return}}else if(Z===31){if(Z=UO(W),Z!==null){J.blockedOn=Z,g$(J.priority,function(){e1(W)});return}}else if(Z===3&&W.stateNode.current.memoizedState.isDehydrated){J.blockedOn=W.tag===3?W.stateNode.containerInfo:null;return}}}J.blockedOn=null}function dY(J){if(J.blockedOn!==null)return!1;for(var Z=J.targetContainers;0<Z.length;){var W=vG(J.nativeEvent);if(W===null){W=J.nativeEvent;var Q=new W.constructor(W.type,W);eU=Q,W.target.dispatchEvent(Q),eU=null}else return Z=iZ(W),Z!==null&&mF(Z),J.blockedOn=W,!1;Z.shift()}return!0}function ZO(J,Z,W){dY(J)&&W.delete(Z)}function jA(){xG=!1,m8!==null&&dY(m8)&&(m8=null),p8!==null&&dY(p8)&&(p8=null),d8!==null&&dY(d8)&&(d8=null),BQ.forEach(ZO),zQ.forEach(ZO)}function kY(J,Z){J.blockedOn===Z&&(J.blockedOn=null,xG||(xG=!0,KZ(GZ,jA)))}function WO(J){CY!==J&&(CY=J,KZ(GZ,function(){CY===J&&(CY=null);for(var Z=0;Z<J.length;Z+=3){var W=J[Z],Q=J[Z+1],Y=J[Z+2];if(typeof Q!=="function")if(jK(Q||W)===null)continue;else break;var X=iZ(W);X!==null&&(J.splice(Z,3),Z-=3,MG(X,{pending:!0,data:Y,method:W.method,action:Q},Q,Y))}}))}function lZ(J){function Z(G){return kY(G,J)}m8!==null&&kY(m8,J),p8!==null&&kY(p8,J),d8!==null&&kY(d8,J),BQ.forEach(Z),zQ.forEach(Z);for(var W=0;W<T8.length;W++){var Q=T8[W];Q.blockedOn===J&&(Q.blockedOn=null)}for(;0<T8.length&&(W=T8[0],W.blockedOn===null);)dF(W),W.blockedOn===null&&T8.shift();if(W=(J.ownerDocument||J).$$reactFormReplay,W!=null)for(Q=0;Q<W.length;Q+=3){var Y=W[Q],X=W[Q+1],H=Y[T7]||null;if(typeof X==="function")H||WO(W);else if(H){var U=null;if(X&&X.hasAttribute("formAction")){if(Y=X,H=X[T7]||null)U=H.formAction;else if(jK(Y)!==null)continue}else U=H.action;typeof U==="function"?W[Q+1]=U:(W.splice(Q,3),Q-=3),WO(W)}}}function uF(){function J(X){X.canIntercept&&X.info==="react-transition"&&X.intercept({handler:function(){return new Promise(function(H){return Y=H})},focusReset:"manual",scroll:"manual"})}function Z(){Y!==null&&(Y(),Y=null),Q||setTimeout(W,20)}function W(){if(!Q&&!navigation.transition){var X=navigation.currentEntry;X&&X.url!=null&&navigation.navigate(X.url,{state:X.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation==="object"){var Q=!1,Y=null;return navigation.addEventListener("navigate",J),navigation.addEventListener("navigatesuccess",Z),navigation.addEventListener("navigateerror",Z),setTimeout(W,100),function(){Q=!0,navigation.removeEventListener("navigate",J),navigation.removeEventListener("navigatesuccess",Z),navigation.removeEventListener("navigateerror",Z),Y!==null&&(Y(),Y=null)}}}function fK(J){this._internalRoot=J}function fX(J){this._internalRoot=J}var YO,SJ,$B,RY,hW,MZ,KO,pU,qO,o6,hG,dU,uU,gG,w8,lU,OB,v$,RB,gW,y0,qJ,N9,iU,NZ=-1,S6,HQ,b8,uY,KU,x$,qU=!1,nU,mG,OU,MB,NB,m7,LB,$O,OO,iY,BB,RO,zB,AB,_Q=null,p7=null,d7,_B,IB,FY=256,MY=262144,NY=4194304,s8,G7,T7,cZ,oU,CB,VB,m$,DQ,zO,AO,TB,p$,d$,SB,jB,fB,bB,eU=null,BZ=null,PZ=null,FU=!1,Z8,JG=!1,R9,E8=null,iG=null,PY=null,V9,zX,kQ,yB,MU,NU,fW,AX,i$,vB,xB,hB,LU,gB,mB,pB,dB,uB,s$,lB,cB,iB,nB,oB,aB,n$,rB,tB,eB,Jz,Zz,Wz,Qz,Yz,Xz,nG,sW=null,Hz,PO,o$,a$=!1,zZ=!1,Kz,nW=null,GQ=null,fO=!1,pW,dW,SY,l7,Nz,AZ=null,ZG=null,oW=null,WG=!1,_Z,BU,xO,hO,gO,mO,Lz,Bz,zz,pO,dO,QG,nY,e7,IZ=0,aG=0,wZ,Q1,DZ,kZ=0,aY=null,qQ=0,Z6,W6=0,u8=null,T6=1,P6="",K7=null,EJ=null,QJ=!1,y8=null,X6=!1,YG,XG,E9=null,r6=null,_z,Iz,wz,oJ,aW=null,GG=0,xZ=0,EZ=null,U1,B9,nZ,QK,DX,tY,z9=null,SZ=null,OQ=0,w9,tO,D8=!1,qG=!1,hZ,eY,c7,H6=null,uJ,W8=0,h0=null,BJ=null,sJ=null,ZX=!1,jZ=!1,D9=!1,WX=0,RQ=0,fZ=null,Cz=0,FQ,jR,BK,fR,NG,zK,aJ=!1,kU,n6=!1,nJ=!1,fU=!1,E1,Q7=null,fJ=null,k7=!1,N6=null,lW=8192,pz,dz,KJ=0,IJ=null,n0=null,JJ=0,OJ=0,v7=null,S8=!1,oZ=!1,wK=!1,X8=0,gJ=0,i8=0,A9=0,DK=0,g7=0,mZ=0,QQ=null,C7=null,_G=!1,PX=0,GF=0,HX=1/0,UX=null,h8=null,tJ=0,g8=null,pZ=null,J8=0,IG=0,wG=null,KF=null,YQ=0,DG=null,KX=null,RZ=null,kG=!1,qX=!1,vU=!1,f8=0,iW,CG,VG,cW,MQ,JA,DY,WA,QA,PG=null,EG=null,gU=null,SF,UA,d1,GA,yG=null,G6,s1,H8,aZ,mY=null,mU=0,MX=null,LQ,NX=!0,LX=null,xG=!1,m8=null,p8=null,d8=null,BQ,zQ,T8,EA,CY=null,QO,fA,FZ,lF=function(J,Z){if(!XO(J))throw Error(J0(299));var W=!1,Q="",Y=bR,X=yR,H=vR;return Z!==null&&Z!==void 0&&(Z.unstable_strictMode===!0&&(W=!0),Z.identifierPrefix!==void 0&&(Q=Z.identifierPrefix),Z.onUncaughtError!==void 0&&(Y=Z.onUncaughtError),Z.onCaughtError!==void 0&&(X=Z.onCaughtError),Z.onRecoverableError!==void 0&&(H=Z.onRecoverableError)),Z=xF(J,1,!1,null,null,W,Q,null,Y,X,H,uF),J[cZ]=Z.current,VK(J),new fK(Z)},cF=function(J,Z,W){if(!XO(J))throw Error(J0(299));var Q=!1,Y="",X=bR,H=yR,U=vR,G=null;return W!==null&&W!==void 0&&(W.unstable_strictMode===!0&&(Q=!0),W.identifierPrefix!==void 0&&(Y=W.identifierPrefix),W.onUncaughtError!==void 0&&(X=W.onUncaughtError),W.onCaughtError!==void 0&&(H=W.onCaughtError),W.onRecoverableError!==void 0&&(U=W.onRecoverableError),W.formState!==void 0&&(G=W.formState)),Z=xF(J,1,!0,Z,W!=null?W:null,Q,Y,G,X,H,U,uF),Z.context=hF(null),W=Z.current,Q=u7(),Q=pG(Q),Y=v8(Q),Y.callback=null,x8(W,Y,Q),W=Q,Z.current.lanes=W,wQ(Z,W),f6(Z),J[cZ]=Z.current,VK(J),new fX(Z)},iF="19.2.8";var sF=XY(()=>{M$();W7();YO=W$(b$(),1);SJ=Object.assign,$B=Symbol.for("react.element"),RY=Symbol.for("react.transitional.element"),hW=Symbol.for("react.portal"),MZ=Symbol.for("react.fragment"),KO=Symbol.for("react.strict_mode"),pU=Symbol.for("react.profiler"),qO=Symbol.for("react.consumer"),o6=Symbol.for("react.context"),hG=Symbol.for("react.forward_ref"),dU=Symbol.for("react.suspense"),uU=Symbol.for("react.suspense_list"),gG=Symbol.for("react.memo"),w8=Symbol.for("react.lazy"),lU=Symbol.for("react.activity"),OB=Symbol.for("react.memo_cache_sentinel"),v$=Symbol.iterator;RB=Symbol.for("react.client.reference");gW=Array.isArray,y0=CW,qJ=YO.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,N9={pending:!1,data:null,method:null,action:null},iU=[];S6=j6(null),HQ=j6(null),b8=j6(null),uY=j6(null);nU=Object.prototype.hasOwnProperty,mG=KZ,OU=YU,MB=UU,NB=HU,m7=V6,LB=XU,$O=ZU,OO=QU,iY=GZ,BB=WU,RO=JU,zB=void 0,AB=void 0;d7=Math.clz32?Math.clz32:wB,_B=Math.log,IB=Math.LN2;s8=Math.random().toString(36).slice(2),G7="__reactFiber$"+s8,T7="__reactProps$"+s8,cZ="__reactContainer$"+s8,oU="__reactEvents$"+s8,CB="__reactListeners$"+s8,VB="__reactHandles$"+s8,m$="__reactResources$"+s8,DQ="__reactMarker$"+s8;zO=new Set,AO={};TB=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),p$={},d$={};SB=/[\n"\\]/g;jB=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));fB=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),bB=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;Z8=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u");if(Z8)try{R9={},Object.defineProperty(R9,"passive",{get:function(){JG=!0}}),window.addEventListener("test",R9,R9),window.removeEventListener("test",R9,R9)}catch(J){JG=!1}V9={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(J){return J.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zX=P7(V9),kQ=SJ({},V9,{view:0,detail:0}),yB=P7(kQ),AX=SJ({},kQ,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sG,button:0,buttons:0,relatedTarget:function(J){return J.relatedTarget===void 0?J.fromElement===J.srcElement?J.toElement:J.fromElement:J.relatedTarget},movementX:function(J){if("movementX"in J)return J.movementX;return J!==fW&&(fW&&J.type==="mousemove"?(MU=J.screenX-fW.screenX,NU=J.screenY-fW.screenY):NU=MU=0,fW=J),MU},movementY:function(J){return"movementY"in J?J.movementY:NU}}),i$=P7(AX),vB=SJ({},AX,{dataTransfer:0}),xB=P7(vB),hB=SJ({},kQ,{relatedTarget:0}),LU=P7(hB),gB=SJ({},V9,{animationName:0,elapsedTime:0,pseudoElement:0}),mB=P7(gB),pB=SJ({},V9,{clipboardData:function(J){return"clipboardData"in J?J.clipboardData:window.clipboardData}}),dB=P7(pB),uB=SJ({},V9,{data:0}),s$=P7(uB),lB={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cB={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},iB={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};nB=SJ({},kQ,{key:function(J){if(J.key){var Z=lB[J.key]||J.key;if(Z!=="Unidentified")return Z}return J.type==="keypress"?(J=EY(J),J===13?"Enter":String.fromCharCode(J)):J.type==="keydown"||J.type==="keyup"?cB[J.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sG,charCode:function(J){return J.type==="keypress"?EY(J):0},keyCode:function(J){return J.type==="keydown"||J.type==="keyup"?J.keyCode:0},which:function(J){return J.type==="keypress"?EY(J):J.type==="keydown"||J.type==="keyup"?J.keyCode:0}}),oB=P7(nB),aB=SJ({},AX,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),n$=P7(aB),rB=SJ({},kQ,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sG}),tB=P7(rB),eB=SJ({},V9,{propertyName:0,elapsedTime:0,pseudoElement:0}),Jz=P7(eB),Zz=SJ({},AX,{deltaX:function(J){return"deltaX"in J?J.deltaX:("wheelDeltaX"in J)?-J.wheelDeltaX:0},deltaY:function(J){return"deltaY"in J?J.deltaY:("wheelDeltaY"in J)?-J.wheelDeltaY:("wheelDelta"in J)?-J.wheelDelta:0},deltaZ:0,deltaMode:0}),Wz=P7(Zz),Qz=SJ({},V9,{newState:0,oldState:0}),Yz=P7(Qz),Xz=[9,13,27,32],nG=Z8&&"CompositionEvent"in window;Z8&&"documentMode"in document&&(sW=document.documentMode);Hz=Z8&&"TextEvent"in window&&!sW,PO=Z8&&(!nG||sW&&8<sW&&11>=sW),o$=String.fromCharCode(32);Kz={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};if(Z8){if(Z8){if(dW="oninput"in document,!dW)SY=document.createElement("div"),SY.setAttribute("oninput","return;"),dW=typeof SY.oninput==="function";pW=dW}else pW=!1;fO=pW&&(!document.documentMode||9<document.documentMode)}l7=typeof Object.is==="function"?Object.is:Mz;Nz=Z8&&"documentMode"in document&&11>=document.documentMode;_Z={animationend:q9("Animation","AnimationEnd"),animationiteration:q9("Animation","AnimationIteration"),animationstart:q9("Animation","AnimationStart"),transitionrun:q9("Transition","TransitionRun"),transitionstart:q9("Transition","TransitionStart"),transitioncancel:q9("Transition","TransitionCancel"),transitionend:q9("Transition","TransitionEnd")},BU={},xO={};Z8&&(xO=document.createElement("div").style,("AnimationEvent"in window)||(delete _Z.animationend.animation,delete _Z.animationiteration.animation,delete _Z.animationstart.animation),("TransitionEvent"in window)||delete _Z.transitionend.transition);hO=T9("animationend"),gO=T9("animationiteration"),mO=T9("animationstart"),Lz=T9("transitionrun"),Bz=T9("transitionstart"),zz=T9("transitioncancel"),pO=T9("transitionend"),dO=new Map,QG="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");QG.push("scrollEnd");nY=typeof reportError==="function"?reportError:function(J){if(typeof window==="object"&&typeof window.ErrorEvent==="function"){var Z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof J==="object"&&J!==null&&typeof J.message==="string"?String(J.message):String(J),error:J});if(!window.dispatchEvent(Z))return}else if(typeof process==="object"&&typeof process.emit==="function"){process.emit("uncaughtException",J);return}console.error(J)},e7=[];wZ={};Q1=new WeakMap;DZ=[],Z6=[];YG=Error(J0(519));XG=j6(null);_z=typeof AbortController<"u"?AbortController:function(){var J=[],Z=this.signal={aborted:!1,addEventListener:function(W,Q){J.push(Q)}};this.abort=function(){Z.aborted=!0,J.forEach(function(W){return W()})}},Iz=KZ,wz=GZ,oJ={$$typeof:o6,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};U1=y0.S;y0.S=function(J,Z){GF=m7(),typeof Z==="object"&&Z!==null&&typeof Z.then==="function"&&Dz(J,Z),U1!==null&&U1(J,Z)};B9=j6(null);nZ=Error(J0(460)),QK=Error(J0(474)),DX=Error(J0(542)),tY={then:function(){}};w9=rO(!0),tO=rO(!1);hZ=j6(null),eY=j6(0);c7=j6(null);uJ=j6(0);FQ={readContext:q7,use:CX,useCallback:hJ,useContext:hJ,useEffect:hJ,useImperativeHandle:hJ,useLayoutEffect:hJ,useInsertionEffect:hJ,useMemo:hJ,useReducer:hJ,useRef:hJ,useState:hJ,useDebugValue:hJ,useDeferredValue:hJ,useTransition:hJ,useSyncExternalStore:hJ,useId:hJ,useHostTransitionStatus:hJ,useFormState:hJ,useActionState:hJ,useOptimistic:hJ,useMemoCache:hJ,useCacheRefresh:hJ};FQ.useEffectEvent=hJ;jR={readContext:q7,use:CX,useCallback:function(J,Z){return A7().memoizedState=[J,Z===void 0?null:Z],J},useContext:q7,useEffect:L1,useImperativeHandle:function(J,Z,W){W=W!==null&&W!==void 0?W.concat([J]):null,yY(4194308,4,zR.bind(null,Z,J),W)},useLayoutEffect:function(J,Z){return yY(4194308,4,J,Z)},useInsertionEffect:function(J,Z){yY(4,2,J,Z)},useMemo:function(J,Z){var W=A7();Z=Z===void 0?null:Z;var Q=J();if(D9){P8(!0);try{J()}finally{P8(!1)}}return W.memoizedState=[Q,Z],Q},useReducer:function(J,Z,W){var Q=A7();if(W!==void 0){var Y=W(Z);if(D9){P8(!0);try{W(Z)}finally{P8(!1)}}}else Y=Z;return Q.memoizedState=Q.baseState=Y,J={pending:null,lanes:0,dispatch:null,lastRenderedReducer:J,lastRenderedState:Y},Q.queue=J,J=J.dispatch=fz.bind(null,h0,J),[Q.memoizedState,J]},useRef:function(J){var Z=A7();return J={current:J},Z.memoizedState=J},useState:function(J){J=RG(J);var Z=J.queue,W=PR.bind(null,h0,Z);return Z.dispatch=W,[J.memoizedState,W]},useDebugValue:FK,useDeferredValue:function(J,Z){var W=A7();return MK(W,J,Z)},useTransition:function(){var J=RG(!1);return J=DR.bind(null,h0,J.queue,!0,!1),A7().memoizedState=J,[!1,J]},useSyncExternalStore:function(J,Z,W){var Q=h0,Y=A7();if(QJ){if(W===void 0)throw Error(J0(407));W=W()}else{if(W=Z(),IJ===null)throw Error(J0(349));(JJ&127)!==0||XR(Q,Z,W)}Y.memoizedState=W;var X={value:W,getSnapshot:Z};return Y.queue=X,L1(UR.bind(null,Q,X,J),[J]),Q.flags|=2048,gZ(9,{destroy:void 0},HR.bind(null,Q,X,W,Z),null),W},useId:function(){var J=A7(),Z=IJ.identifierPrefix;if(QJ){var W=P6,Q=T6;W=(Q&~(1<<32-d7(Q)-1)).toString(32)+W,Z="_"+Z+"R_"+W,W=WX++,0<W&&(Z+="H"+W.toString(32)),Z+="_"}else W=Cz++,Z="_"+Z+"r_"+W.toString(32)+"_";return J.memoizedState=Z},useHostTransitionStatus:NK,useFormState:F1,useActionState:F1,useOptimistic:function(J){var Z=A7();Z.memoizedState=Z.baseState=J;var W={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return Z.queue=W,Z=LK.bind(null,h0,!0,W),W.dispatch=Z,[J,Z]},useMemoCache:$K,useCacheRefresh:function(){return A7().memoizedState=jz.bind(null,h0)},useEffectEvent:function(J){var Z=A7(),W={impl:J};return Z.memoizedState=W,function(){if((KJ&2)!==0)throw Error(J0(440));return W.impl.apply(void 0,arguments)}}},BK={readContext:q7,use:CX,useCallback:_R,useContext:q7,useEffect:RK,useImperativeHandle:AR,useInsertionEffect:LR,useLayoutEffect:BR,useMemo:IR,useReducer:bY,useRef:MR,useState:function(){return bY(Q8)},useDebugValue:FK,useDeferredValue:function(J,Z){var W=lJ();return wR(W,BJ.memoizedState,J,Z)},useTransition:function(){var J=bY(Q8)[0],Z=lJ().memoizedState;return[typeof J==="boolean"?J:VQ(J),Z]},useSyncExternalStore:YR,useId:VR,useHostTransitionStatus:NK,useFormState:M1,useActionState:M1,useOptimistic:function(J,Z){var W=lJ();return qR(W,BJ,J,Z)},useMemoCache:$K,useCacheRefresh:TR};BK.useEffectEvent=NR;fR={readContext:q7,use:CX,useCallback:_R,useContext:q7,useEffect:RK,useImperativeHandle:AR,useInsertionEffect:LR,useLayoutEffect:BR,useMemo:IR,useReducer:wU,useRef:MR,useState:function(){return wU(Q8)},useDebugValue:FK,useDeferredValue:function(J,Z){var W=lJ();return BJ===null?MK(W,J,Z):wR(W,BJ.memoizedState,J,Z)},useTransition:function(){var J=wU(Q8)[0],Z=lJ().memoizedState;return[typeof J==="boolean"?J:VQ(J),Z]},useSyncExternalStore:YR,useId:VR,useHostTransitionStatus:NK,useFormState:N1,useActionState:N1,useOptimistic:function(J,Z){var W=lJ();if(BJ!==null)return qR(W,BJ,J,Z);return W.baseState=J,[J,W.queue.dispatch]},useMemoCache:$K,useCacheRefresh:TR};fR.useEffectEvent=NR;NG={enqueueSetState:function(J,Z,W){J=J._reactInternals;var Q=u7(),Y=v8(Q);Y.payload=Z,W!==void 0&&W!==null&&(Y.callback=W),Z=x8(J,Y,Q),Z!==null&&(V7(Z,J,Q),rW(Z,J,Q))},enqueueReplaceState:function(J,Z,W){J=J._reactInternals;var Q=u7(),Y=v8(Q);Y.tag=1,Y.payload=Z,W!==void 0&&W!==null&&(Y.callback=W),Z=x8(J,Y,Q),Z!==null&&(V7(Z,J,Q),rW(Z,J,Q))},enqueueForceUpdate:function(J,Z){J=J._reactInternals;var W=u7(),Q=v8(W);Q.tag=2,Z!==void 0&&Z!==null&&(Q.callback=Z),Z=x8(J,Q,W),Z!==null&&(V7(Z,J,W),rW(Z,J,W))}};zK=Error(J0(461));kU={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};E1=typeof WeakSet==="function"?WeakSet:Set;pz={getCacheForType:function(J){var Z=q7(oJ),W=Z.data.get(J);return W===void 0&&(W=J(),Z.data.set(J,W)),W},cacheSignal:function(){return q7(oJ).controller.signal}},dz=typeof WeakMap==="function"?WeakMap:Map;for(cW=0;cW<QG.length;cW++)iW=QG[cW],CG=iW.toLowerCase(),VG=iW[0].toUpperCase()+iW.slice(1),L6(CG,"on"+VG);L6(hO,"onAnimationEnd");L6(gO,"onAnimationIteration");L6(mO,"onAnimationStart");L6("dblclick","onDoubleClick");L6("focusin","onFocus");L6("focusout","onBlur");L6(Lz,"onTransitionRun");L6(Bz,"onTransitionStart");L6(zz,"onTransitionCancel");L6(pO,"onTransitionEnd");yZ("onMouseEnter",["mouseout","mouseover"]);yZ("onMouseLeave",["mouseout","mouseover"]);yZ("onPointerEnter",["pointerout","pointerover"]);yZ("onPointerLeave",["pointerout","pointerover"]);C9("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));C9("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));C9("onBeforeInput",["compositionend","keypress","textInput","paste"]);C9("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));C9("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));C9("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));MQ="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),JA=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(MQ));DY="_reactListening"+Math.random().toString(36).slice(2);WA=/\r\n?/g,QA=/\u0000|\uFFFD/g;SF=typeof setTimeout==="function"?setTimeout:void 0,UA=typeof clearTimeout==="function"?clearTimeout:void 0,d1=typeof Promise==="function"?Promise:void 0,GA=typeof queueMicrotask==="function"?queueMicrotask:typeof d1<"u"?function(J){return d1.resolve(null).then(J).catch(KA)}:SF;G6=new Map,s1=new Set;H8=qJ.d;qJ.d={f:RA,r:FA,D:MA,C:NA,L:LA,m:BA,X:AA,S:zA,M:_A};aZ=typeof document>"u"?null:document;LQ={$$typeof:o6,Provider:null,Consumer:null,_currentValue:N9,_currentValue2:N9,_threadCount:0};BQ=new Map,zQ=new Map,T8=[],EA="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");fX.prototype.render=fK.prototype.render=function(J){var Z=this._internalRoot;if(Z===null)throw Error(J0(409));var W=Z.current,Q=u7();gF(W,Q,J,Z,null,null)};fX.prototype.unmount=fK.prototype.unmount=function(){var J=this._internalRoot;if(J!==null){this._internalRoot=null;var Z=J.containerInfo;gF(J.current,2,null,J,null,null),EX(),Z[cZ]=null}};fX.prototype.unstable_scheduleHydration=function(J){if(J){var Z=BO();J={blockedOn:null,target:J,priority:Z};for(var W=0;W<T8.length&&Z!==0&&Z<T8[W].priority;W++);T8.splice(W,0,J),W===0&&dF(J)}};QO=lH;if(QO!=="19.2.8")throw Error(J0(527,QO,"19.2.8"));qJ.findDOMNode=function(J){var Z=J._reactInternals;if(Z===void 0){if(typeof J.render==="function")throw Error(J0(188));throw J=Object.keys(J).join(","),Error(J0(268,J))}return J=qB(Z),J=J!==null?GO(J):null,J=J===null?null:J.stateNode,J};fA={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:y0,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){if(FZ=__REACT_DEVTOOLS_GLOBAL_HOOK__,!FZ.isDisabled&&FZ.supportsFiber)try{_Q=FZ.inject(fA),p7=FZ}catch(J){}}});var aF=Q$((bk,oF)=>{sF();function nF(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=="function")return;try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nF)}catch(J){console.error(J)}}nF(),oF.exports=bK});W7();var dL=W$(aF(),1);W7();class jQ extends Error{status;constructor(J,Z){super(J);this.status=Z}}async function ZJ(J,Z={}){let W=await fetch(`.${J}`,{...Z,credentials:"same-origin",headers:{...Z.body?{"content-type":"application/json"}:{},...Z.headers}});if(!W.ok){let Q=await W.json().catch(()=>({}));throw new jQ(Q.message??Q.error??W.statusText,W.status)}return W.status===204?void 0:await W.json()}var g0={session:{check:()=>ZJ("/api/session"),open:(J)=>ZJ("/api/session",{method:"POST",body:JSON.stringify({passphrase:J})}),close:()=>ZJ("/api/session",{method:"DELETE"})},memories:{search:(J)=>{let Z=new URLSearchParams;if(J.q)Z.set("q",J.q);for(let[Q,Y]of[["kind",J.kind],["workspace",J.workspace],["project",J.project],["createdBy",J.createdBy],["tag",J.tag]])for(let X of Y??[])if(X)Z.append(Q,X);if(J.limit)Z.set("limit",String(J.limit));let W=Z.toString();return ZJ(`/api/memories${W?`?${W}`:""}`)},create:(J)=>ZJ("/api/memories",{method:"POST",body:JSON.stringify(J)}),recall:(J)=>ZJ("/api/search",{method:"POST",body:JSON.stringify(J)}),get:(J)=>ZJ(`/api/memories/${encodeURIComponent(J)}`),update:(J,Z)=>ZJ(`/api/memories/${J}`,{method:"PATCH",body:JSON.stringify(Z)}),remove:(J)=>ZJ(`/api/memories/${J}`,{method:"DELETE"})},graph:(J)=>{let Z=new URLSearchParams;for(let[Q,Y]of[["kind",J.kind],["workspace",J.workspace],["project",J.project],["createdBy",J.createdBy]])for(let X of Y??[])if(X)Z.append(Q,X);let W=Z.toString();return ZJ(`/api/graph${W?`?${W}`:""}`)},facets:()=>ZJ("/api/facets"),cloud:(J)=>ZJ(`/api/cloud${J?`?workspace=${encodeURIComponent(J)}`:""}`),timeline:(J=30)=>ZJ(`/api/timeline?days=${J}`),traces:{cloud:(J)=>ZJ(`/api/traces/cloud${J?`?days=${J}`:""}`),list:(J={})=>{let Z=new URLSearchParams;for(let[Q,Y]of Object.entries(J))if(Y)Z.set(Q,String(Y));let W=Z.toString();return ZJ(`/api/traces${W?`?${W}`:""}`)},forget:(J)=>ZJ(`/api/traces?keyword=${encodeURIComponent(J)}`,{method:"DELETE"}),prune:(J)=>ZJ(`/api/traces?olderThanDays=${J}`,{method:"DELETE"}),clear:()=>ZJ("/api/traces?all=true",{method:"DELETE"})},merge:(J,Z,W)=>ZJ("/api/merge",{method:"POST",body:JSON.stringify({facet:J,from:Z,to:W})}),workspaces:{list:()=>ZJ("/api/workspaces"),get:(J)=>ZJ(`/api/workspaces/${encodeURIComponent(J)}`)},stats:()=>ZJ("/api/stats"),health:()=>ZJ("/api/health"),access:{clients:()=>ZJ("/api/access/clients"),revoke:(J)=>ZJ(`/api/access/clients/${encodeURIComponent(J)}`,{method:"DELETE"})},settings:{get:()=>ZJ("/api/settings"),patch:(J)=>ZJ("/api/settings",{method:"PATCH",body:JSON.stringify(J)}),reveal:(J)=>ZJ(`/api/settings/reveal/${encodeURIComponent(J)}`),regenerate:(J)=>ZJ(`/api/settings/regenerate/${encodeURIComponent(J)}`,{method:"POST"})},tools:{list:()=>ZJ("/api/tools"),setDisabled:(J,Z)=>ZJ(`/api/tools/${encodeURIComponent(J)}`,{method:"PATCH",body:JSON.stringify({disabled:Z})}),enableAll:()=>ZJ("/api/tools/enable-all",{method:"POST"})},searchLog:{list:(J={})=>{let Z=new URLSearchParams;if(J.limit)Z.set("limit",String(J.limit));if(J.q)Z.set("q",J.q);let W=Z.toString();return ZJ(`/api/search-log${W?`?${W}`:""}`)},remove:(J)=>ZJ(`/api/search-log/${J}`,{method:"DELETE"}),prune:(J)=>ZJ(`/api/search-log?olderThanDays=${J}`,{method:"DELETE"}),clear:()=>ZJ("/api/search-log?all=true",{method:"DELETE"})}};W7();W7();W7();var vA={"nav.archive":{th:"ความจำ",en:"Memory"},"nav.searchLog":{th:"ประวัติค้นหา",en:"Search log"},"nav.settings":{th:"ตั้งค่า",en:"Settings"},"nav.tools":{th:"เครื่องมือ",en:"Tools"},"nav.tools.title":{th:"เครื่องมือ MCP ที่เปิดให้ใช้",en:"Which MCP tools are offered"},"settings.options.eyebrow":{th:"ตั้งค่า",en:"Settings"},"settings.options.title":{th:"ตัวเลือกของ add-on",en:"Add-on options"},"settings.options.subtitle":{th:"ค่าที่เซิร์ฟเวอร์อ่านตอนเริ่มทำงาน — env มาก่อน แล้วจึงไฟล์ตั้งค่า",en:"What the server reads at start — environment first, then the settings file"},"settings.save":{th:"บันทึก",en:"Save"},"settings.revert":{th:"ย้อนกลับ",en:"Revert"},"settings.unset":{th:"ยังไม่ตั้ง",en:"not set"},"settings.show":{th:"แสดง",en:"show"},"settings.hide":{th:"ซ่อน",en:"hide"},"settings.pinned":{th:"ตรึงโดย env",en:"pinned by env"},"settings.pinned.title":{th:"ค่านี้มาจาก environment variable จึงแก้ที่นี่ไม่ได้",en:"This value comes from an environment variable, so it cannot be changed here"},"settings.restart":{th:"ต้องรีสตาร์ท",en:"restart required"},"settings.readonly":{th:"อ่านอย่างเดียว",en:"read-only"},"settings.regen":{th:"สร้างใหม่",en:"regenerate"},"settings.regen.title":{th:"สร้าง api_token ใหม่ — ตัวเก่าใช้ได้จนกว่าจะรีสตาร์ท",en:"Generate a new api_token — the old one keeps working until restart"},"settings.regen.confirm":{th:"สร้าง api_token ใหม่? ทุก client ที่ใช้ตัวเก่าจะหลุดหลังรีสตาร์ท",en:"Generate a new api_token? Every client using the old one breaks after restart."},"access.title":{th:"ใครเข้าถึงได้",en:"Who has access"},"access.subtitle":{th:"OAuth clients ที่เคยเชื่อมต่อ — เพิกถอนได้ทันที มีผลกับ request ถัดไป",en:"OAuth clients that have connected — revoking takes effect on their next request"},"access.revoke":{th:"เพิกถอน",en:"revoke"},"access.revoke.confirm":{th:"เพิกถอน client นี้? มันต้อง authorize ใหม่จึงจะกลับมาใช้ได้",en:"Revoke this client? It must authorize again to regain access."},"access.tokens":{th:"โทเคนที่ยังมีผล",en:"active tokens"},"access.none":{th:"ยังไม่มี client เชื่อมต่อผ่าน OAuth",en:"No OAuth client has connected yet"},"settings.source.environment":{th:"จาก environment",en:"from environment"},"settings.source.settings":{th:"จากไฟล์ตั้งค่า",en:"from settings file"},"settings.source.unset":{th:"ยังไม่ตั้ง",en:"not set"},"nav.lock":{th:"ล็อก",en:"Lock"},"nav.remember":{th:"จำไว้",en:"Remember"},"nav.searchLog.title":{th:"เคยค้นหาอะไรไปบ้าง",en:"What has been looked for"},"nav.settings.title":{th:"tool ไหนเปิดอยู่ และปิดอันไหนได้บ้าง",en:"Which MCP tools this connector offers, and what to switch off"},"nav.lock.title":{th:"จบ session นี้",en:"End this session"},"nav.atlas":{th:"แผนที่",en:"Atlas"},"nav.atlas.title":{th:"คลังทั้งหมดเป็นรูป",en:"The whole corpus, drawn"},"atlas.title":{th:"แผนความจำ",en:"The atlas"},"atlas.subtitle":{th:"ตำแหน่งมาจาก embedding — อยู่ใกล้กันคือความหมายใกล้กัน ลากเพื่อหมุน เลื่อนเพื่อซูม กดเพื่อเปิด",en:"Positions come from the embeddings — near means similar. Drag to turn, scroll to zoom, click to open."},"atlas.map":{th:"แผน",en:"map"},"atlas.web":{th:"ใย",en:"web"},"atlas.names":{th:"ชื่อ",en:"names"},"atlas.namesTitle":{th:"แสดงชื่อทุกจุดพร้อมกัน — สูงสุด 20 ชื่อ เรียงตามความสำคัญ",en:"Show every name at once — up to 20, most important first"},"atlas.explained":{th:"อธิบายได้",en:"explains"},"atlas.density":{th:"ความหนาแน่น",en:"density"},"atlas.unembedded":{th:"ยังไม่มีเวกเตอร์",en:"without a vector"},"method.title":{th:"คำนวณมาอย่างไร",en:"How this was computed"},"method.show":{th:"ดูวิธีคิด",en:"Show the working"},"method.hide":{th:"ซ่อน",en:"Hide"},"method.posTitle":{th:"1 · ตำแหน่ง",en:"1 · Positions"},"method.edgeTitle":{th:"2 · เส้นเชื่อม",en:"2 · Edges"},"method.honestTitle":{th:"3 · ข้อจำกัด",en:"3 · What this cannot show"},"atlas.loading":{th:"กำลังเปิด…",en:"opening…"},"atlas.loadFailed":{th:"เปิดความจำนี้ไม่ได้",en:"Could not open that memory."},"atlas.close":{th:"ปิด",en:"Close"},"atlas.openInArchive":{th:"เปิดในคลัง",en:"Open in the archive"},"atlas.empty":{th:"ยังไม่มีความจำที่มี embedding — เปิด semantic search ก่อน",en:"No memories carry a vector yet — semantic search has to be on for the atlas to have anything to draw."},"atlas.denseWarning":{th:"เส้นเชื่อมเกือบทุกคู่ — คลังยังเล็กเกินกว่าจะเห็นโครงสร้างจากเส้นได้ ใช้มุมแผนแทน",en:"Nearly every pair is an edge — the corpus is still too small for the web to show structure. The map carries the same information without the tangle."},"archive.eyebrow":{th:"ARRA MEMORY",en:"ARRA MEMORY"},"archive.title":{th:"ความจำ",en:"Memory"},"archive.search":{th:"ค้นหาในหัวข้อ เนื้อหา และแท็ก…",en:"Search titles, content, tags…"},"archive.searchLabel":{th:"ค้นหาความจำ",en:"Search memories"},"archive.searching":{th:"กำลังค้น…",en:"searching…"},"archive.shown":{th:"แสดง",en:"shown"},"archive.inCorpus":{th:"ทั้งหมด",en:"in corpus"},"archive.clear":{th:"ล้างตัวกรอง",en:"clear filters"},"facet.kind":{th:"ชนิด",en:"kind"},"facet.workspace":{th:"workspace",en:"workspace"},"facet.project":{th:"project",en:"project"},"facet.agent":{th:"ใครเขียน",en:"agent"},"facet.tag":{th:"แท็ก",en:"tag"},"cloud.uniform":{th:"ทุกแท็กถูกใช้เท่ากัน",en:"every tag is used equally often"},"nav.traces":{th:"รอยที่ถูกถาม",en:"trace log"},"nav.traces.title":{th:"ทุกครั้งที่ถูกถาม และได้อะไรกลับไป",en:"every call that arrived, and what came back"},"trace.eyebrow":{th:"TRACE LOG",en:"TRACE LOG"},"trace.title":{th:"อะไรถูกถามบ้าง",en:"What was asked"},"trace.blurb":{th:"ทุกการเรียกเครื่องมือ และทุกการอ่านที่มีเจตนา — รวมถึงครั้งที่พังและครั้งที่ไม่เจออะไรเลย กดแถวเพื่อดูสิ่งที่ส่งมาจริง",en:"Every tool call and every read that carried an intent — including the ones that failed and the ones that found nothing. Open a row to see what was actually sent."},"trace.off":{th:"ไม่ได้บันทึกอยู่ ตั้ง trace_log ในหน้า settings เพื่อเริ่มเก็บ",en:"Recording is off. Set trace_log in the settings to start keeping a record."},"trace.search":{th:"ค้นในเครื่องมือ คำที่ถาม โหมด หรือข้อผิดพลาด…",en:"Search the tool, subject, mode or error…"},"trace.empty":{th:"ยังไม่มีอะไรถูกบันทึก",en:"Nothing recorded yet."},"trace.recorded":{th:"ทั้งหมด",en:"recorded"},"trace.hits":{th:"ผล",en:"hit(s)"},"trace.written":{th:"เขียน",en:"written"},"trace.asked":{th:"ถูกถาม",en:"asked"},"trace.emptyOnly":{th:"ที่ไม่เจอ",en:"found nothing"},"trace.errorsOnly":{th:"ที่พัง",en:"errors"},"trace.prune":{th:"ลบที่เก่ากว่า 30 วัน",en:"prune > 30 days"},"trace.clear":{th:"ล้างทั้งหมด",en:"clear all"},"trace.clearConfirm":{th:"ลบ {n} แถวจริง",en:"really delete {n}"},"trace.forget":{th:"ลืม “{k}”",en:"forget “{k}”"},"facet.unfiled":{th:"ไม่ระบุ",en:"unfiled"},"facet.more":{th:"อีก {n}",en:"+{n} more"},"facet.less":{th:"ย่อ",en:"less"},"empty.nothing":{th:"ไม่มีอะไรตรงกับที่กรอง",en:"Nothing matches that."},"search.byMeaning":{th:"ค้นด้วยความหมาย",en:"by meaning"},"search.byKeyword":{th:"ค้นแบบตรงตัวอักษร",en:"by keyword"},"search.degraded":{th:"ค้นแบบตรงตัวอักษรเท่านั้น — การค้นด้วยความหมายใช้ไม่ได้ตอนนี้",en:"keyword only — search by meaning is unavailable right now"},"empty.archive":{th:"ยังไม่มีความจำ",en:"No memories yet."},"empty.filteredHint":{th:"ลองคำที่รู้ว่ามีอยู่ หรือถามเป็นประโยค — ถ้าเปิด semantic ไว้ จะค้นด้วยความหมายให้ด้วย",en:"Recall is literal keyword matching across titles, content and tags — try a word you know is in there."},"empty.emptyHint":{th:"ความจำที่เขียนที่นี่ หรือที่ Claude เขียนผ่าน MCP จะขึ้นในรายการนี้",en:"Memories written here or by Claude over MCP will appear in this list."},"empty.writeFirst":{th:"เขียนอันแรกเลย",en:"Write the first one"},"empty.searchAll":{th:"ค้นความจำทั้งหมดแทน",en:"Search every memory instead"},"compose.title":{th:"เขียนความจำ",en:"Write a memory"},"compose.content":{th:"เนื้อหา",en:"Content"},"compose.contentHint":{th:"อะไรที่ควรจำไว้ใช้ทีหลัง?",en:"What is worth recalling later?"},"compose.titleField":{th:"หัวข้อ",en:"Title"},"compose.optional":{th:"(ไม่ใส่ก็ได้)",en:"(optional)"},"compose.titleHint":{th:"เว้นไว้จะดึงจากบรรทัดแรก",en:"Inferred from the first line"},"compose.kind":{th:"ชนิด",en:"Kind"},"compose.kindOther":{th:"หรือพิมพ์เอง",en:"or type your own"},"compose.tags":{th:"แท็ก",en:"Tags"},"compose.tagsHint":{th:"(คั่นด้วยจุลภาค)",en:"(comma separated)"},"compose.importance":{th:"ความสำคัญ",en:"Importance"},"compose.cancel":{th:"ยกเลิก",en:"Cancel"},"compose.save":{th:"จำไว้",en:"Remember"},"compose.saving":{th:"กำลังบันทึก…",en:"Saving…"},"compose.saveFailed":{th:"บันทึกไม่สำเร็จ",en:"Could not save."},"lock.title":{th:"ความจำถูกล็อกอยู่",en:"Memory is locked"},"lock.hint":{th:"ใส่ owner passphrase ที่ตั้งไว้ใน config ของ add-on นี้",en:"Enter the owner passphrase set in this add-on's configuration."},"lock.field":{th:"Owner passphrase",en:"Owner passphrase"},"lock.submit":{th:"ปลดล็อก",en:"Unlock"},"lock.opening":{th:"กำลังเปิด…",en:"Opening…"},"lock.failed":{th:"เข้าไม่ได้ — ไม่ใช่เรื่อง passphrase",en:"Could not sign in — not a passphrase problem"},"lock.wrong":{th:"passphrase ไม่ตรง",en:"That passphrase does not match."},"lock.splash":{th:"กำลังเปิด…",en:"opening…"},"error.load":{th:"โหลดความจำไม่ได้",en:"Could not load memories."},"error.forget":{th:"ลบความจำนั้นไม่ได้",en:"Could not forget that memory."},"settings.theme":{th:"ธีม",en:"Theme"},"settings.langNote":{th:"แปลเฉพาะหน้าจอ — เนื้อหาความจำ ชื่อ workspace project แท็ก และชื่อ agent ไม่ถูกแปล",en:"Only the interface is translated — memory content, workspace, project, tag and agent names are data and are never translated."},"lang.label":{th:"ภาษา",en:"Language"},"lang.th":{th:"ไทย",en:"Thai"},"lang.en":{th:"อังกฤษ",en:"English"}},rF="Arra Memory";function tF(J){rF=J}function yK(){return rF}var vK="arra-memory-lang";function xA(){try{let J=new URLSearchParams(window.location.search).get("lang");if(J==="th"||J==="en")return J;let Z=window.localStorage.getItem(vK);if(Z==="th"||Z==="en")return Z}catch{}return eF}var eF="th";function JM(J){if(J!=="th"&&J!=="en")return;eF=J;let Z=!1;try{let W=window.localStorage.getItem(vK);Z=W==="th"||W==="en"||new URLSearchParams(window.location.search).has("lang")}catch{}if(!Z&&tZ!==J){tZ=J;try{document.documentElement.setAttribute("lang",J)}catch{}for(let W of bX)W(J)}}var tZ=typeof window>"u"?"th":xA(),bX=new Set;function ZM(){return tZ}function hA(J){tZ=J;try{window.localStorage.setItem(vK,J),document.documentElement.setAttribute("lang",J)}catch{}for(let Z of bX)Z(J)}function n(J,Z=tZ){let W=vA[J];if(!W)return J;return W[Z]??W.en??J}function WM(){let[J,Z]=G0(tZ);return c0(()=>{return bX.add(Z),()=>{bX.delete(Z)}},[]),[J,hA]}var gA=Symbol.for("react.fragment");var YJ=gA,M=void 0;var mA=40,pA={kind:{top:10,layout:"inline"},workspace:{top:8,layout:"inline"},project:{top:4,layout:"table"},createdBy:{top:8,layout:"inline"},tag:{top:mA,layout:"inline"}};function QM({facets:J,scope:Z,tags:W,onChange:Q,onClear:Y}){let X=[{key:"kind",label:n("facet.kind"),values:J.kinds.map((K)=>({value:K.kind,count:K.count}))},{key:"workspace",label:n("facet.workspace"),values:J.workspaces.map((K)=>({value:K.workspace,count:K.count}))},{key:"project",label:n("facet.project"),values:J.projects.map((K)=>({value:K.project,count:K.count}))},{key:"createdBy",label:n("facet.agent"),values:J.agents.map((K)=>({value:K.agent,count:K.count}))},{key:"tag",label:n("facet.tag"),values:J.tags.map((K)=>({value:K.tag,count:K.count,size:K.size}))}].filter((K)=>K.values.length>0),H=(K)=>K==="tag"?W:Z[K]??[],U=(K,O)=>{let F=H(K),q=F.includes(O)?F.filter((R)=>R!==O):[...F,O];if(K==="tag")Q({scope:Z,tags:q});else Q({scope:{...Z,[K]:q},tags:W})},G=W.length>0||Z.kind.length>0||Z.workspace.length>0||Z.project.length>0||Z.createdBy.length>0;if(!X.length&&!G)return null;return M("div",{className:"mt-3 flex flex-col gap-1.5",children:[X.map((K)=>{let O=(R,L="chip")=>{let w=H(K.key).includes(R.value),N=K.key==="tag"&&R.size!==void 0;return M("button",{type:"button",className:N?`${L} chip-cloud`:L,"aria-pressed":w,onClick:()=>U(K.key,R.value),"aria-label":N?`${R.value}, ${R.count}`:void 0,title:N?`${R.value} — ${R.count}`:void 0,style:N?{fontSize:`${R.size}px`}:K.key==="kind"&&!w?{color:b6(R.value)}:void 0,children:[M("span",{children:R.value},void 0,!1,void 0,this),N?M("span",{className:"sr-only",children:R.count},void 0,!1,void 0,this):M("span",{className:"chip-count",children:R.count},void 0,!1,void 0,this)]},R.value,!0,void 0,this)},{top:F,layout:q}=pA[K.key];return M(dA,{label:K.label,values:K.values,top:F,layout:q,isTicked:(R)=>H(K.key).includes(R),chip:O},K.key,!1,void 0,this)}),G&&M("div",{className:"facet-row",children:[M("span",{className:"eyebrow"},void 0,!1,void 0,this),M("div",{children:M("button",{type:"button",onClick:Y,className:"chip",style:{color:"var(--color-faint)"},children:n("archive.clear")},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}function dA({label:J,values:Z,top:W,layout:Q,isTicked:Y,chip:X}){let[H,U]=G0(!1),G=Z.slice(0,W),K=Z.slice(W).filter((L)=>Y(L.value)),O=Z.slice(W).filter((L)=>!Y(L.value)),F=O.reduce((L,w)=>L+w.count,0),q=Q==="table",R=q?"chip chip-line":"chip";return M("div",{className:"facet-row",children:[M("span",{className:"eyebrow",children:J},void 0,!1,void 0,this),M("div",{className:q?"facet-fold-list":"flex flex-wrap items-baseline gap-1.5",children:[G.map((L)=>X(L,R)),K.map((L)=>X(L,R)),H&&O.map((L)=>X(L,R)),O.length>0&&M("button",{type:"button",className:`${R} facet-more`,"aria-expanded":H,onClick:()=>U(!H),children:[M("span",{children:[M("span",{className:"facet-more-marker",children:"▸"},void 0,!1,void 0,this),H?n("facet.less"):n("facet.more").replace("{n}",String(O.length))]},void 0,!0,void 0,this),M("span",{className:"chip-count",children:H?"":F},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}function b6(J){let Z={learn:"var(--color-kind-learn)",enlighten:"var(--color-kind-enlighten)",retro:"var(--color-kind-retro)",artifact:"var(--color-kind-artifact)"};if(Z[J])return Z[J];let W=0;for(let Q=0;Q<J.length;Q++)W=W*31+J.charCodeAt(Q)|0;return`hsl(${Math.abs(W)%360} 42% 68%)`}function uA({kind:J}){return M("span",{className:"inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 font-mono text-[0.68rem] tracking-wide",style:{color:b6(J),background:`color-mix(in oklab, ${b6(J)} 14%, transparent)`},children:[M("span",{"aria-hidden":"true",className:"size-1.5 rounded-full",style:{background:b6(J)}},void 0,!1,void 0,this),J]},void 0,!0,void 0,this)}function lA({value:J}){return M("span",{className:"inline-flex items-center gap-0.5",title:`importance ${J} of 5`,"aria-label":`importance ${J} of 5`,children:[1,2,3,4,5].map((Z)=>M("span",{"aria-hidden":"true",className:"h-2.5 w-[3px] rounded-full transition-colors",style:{background:Z<=J?"var(--color-ember)":"var(--color-line-bright)"}},Z,!1,void 0,this))},void 0,!1,void 0,this)}function fQ(J){let Z=new Date(J).getTime();if(Number.isNaN(Z))return J;let W=Math.floor((Date.now()-Z)/1000);if(W<45)return"just now";if(W<3600)return`${Math.floor(W/60)}m ago`;if(W<86400)return`${Math.floor(W/3600)}h ago`;if(W<1209600)return`${Math.floor(W/86400)}d ago`;return new Date(Z).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}function XM({memory:J,query:Z,onDelete:W,onFollow:Q}){let[Y,X]=G0(!1),[H,U]=G0(!1);c0(()=>U(!1),[J.id]);let G=J.content.length>280;return M("article",{className:"group rounded-xl border border-line bg-panel transition-colors hover:border-line-bright",children:M("div",{className:"flex items-start gap-3 p-4",children:[M("div",{className:"min-w-0 flex-1",children:[M("div",{className:"mb-1.5 flex flex-wrap items-center gap-2",children:[M(uA,{kind:J.kind},void 0,!1,void 0,this),M(lA,{value:J.importance},void 0,!1,void 0,this),J.workspace&&M(YM,{label:J.workspace,title:"Workspace",accent:!0},void 0,!1,void 0,this),J.project&&M(YM,{label:J.project,title:"Project"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("h3",{className:"mb-2 text-[0.98rem] font-semibold leading-snug text-ink",children:M(iA,{text:J.title,query:Z},void 0,!1,void 0,this)},void 0,!1,void 0,this),M("div",{className:`prose-memory ${Y||!G?"":"line-clamp-3"}`,id:`memory-body-${J.id}`,children:M(cA,{text:J.content,onFollow:Q},void 0,!1,void 0,this)},void 0,!1,void 0,this),G&&M("button",{type:"button",onClick:()=>X((K)=>!K),"aria-expanded":Y,"aria-controls":`memory-body-${J.id}`,className:"mt-2 font-mono text-[0.7rem] tracking-wide text-ember hover:underline",children:Y?"show less":"read all"},void 0,!1,void 0,this),J.tags.length>0&&M("ul",{className:"mt-3 flex flex-wrap gap-1.5",children:J.tags.map((K)=>M("li",{className:"rounded border border-line px-1.5 py-0.5 font-mono text-[0.68rem] text-dim",children:K},K,!1,void 0,this))},void 0,!1,void 0,this),M("div",{className:"meta mt-3 flex flex-wrap items-center gap-x-3 gap-y-1",children:[M("span",{title:J.updatedAt,children:fQ(J.updatedAt)},void 0,!1,void 0,this),M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{children:J.source},void 0,!1,void 0,this),J.createdBy&&M(YJ,{children:[M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{title:"Written by",children:["by ",J.createdBy]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{className:"truncate opacity-60",children:J.id.slice(0,8)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),M("div",{className:"shrink-0",children:H?M("div",{className:"flex items-center gap-1",children:[M("button",{type:"button",onClick:()=>W(J.id),className:"rounded bg-[#5c2320] px-2 py-1 font-mono text-[0.68rem] text-[#f0928f] hover:brightness-125",children:"delete"},void 0,!1,void 0,this),M("button",{type:"button",onClick:()=>U(!1),className:"rounded px-2 py-1 font-mono text-[0.68rem] text-dim hover:text-ink",children:"keep"},void 0,!1,void 0,this)]},void 0,!0,void 0,this):M("button",{type:"button",onClick:()=>U(!0),"aria-label":`Forget “${J.title}”`,className:"rounded p-1.5 text-faint opacity-0 transition-opacity hover:text-[#f0928f] focus-visible:opacity-100 group-hover:opacity-100",children:M("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:M("path",{d:"M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this)}function YM({label:J,title:Z,accent:W}){return M("span",{title:Z,className:"max-w-[12rem] truncate rounded border px-1.5 py-0.5 font-mono text-[0.68rem]",style:{borderColor:W?"var(--color-ember)":"var(--color-line)",color:W?"var(--color-ember)":"var(--color-dim)"},children:J},void 0,!1,void 0,this)}function cA({text:J,onFollow:Z}){if(!Z||!J.includes("[["))return M(YJ,{children:J},void 0,!1,void 0,this);let W=[],Q=/\[\[([^\]|]{1,160})(?:\|([^\]]*))?\]\]/g,Y=0,X,H=0;while((X=Q.exec(J))!==null){if(X.index>Y)W.push(J.slice(Y,X.index));let U=X[1].trim(),G=(X[2]??X[1]).trim();W.push(M("button",{type:"button",onClick:(K)=>{K.stopPropagation(),Z(U)},className:"underline decoration-dotted underline-offset-2 transition-colors hover:decoration-solid",style:{color:"var(--color-ember)"},title:U,children:G},`link-${H++}`,!1,void 0,this)),Y=X.index+X[0].length}if(Y<J.length)W.push(J.slice(Y));return M(YJ,{children:W},void 0,!1,void 0,this)}function iA({text:J,query:Z}){let W=Z.trim();if(!W)return M(YJ,{children:J},void 0,!1,void 0,this);let Q=J.toLocaleLowerCase().indexOf(W.toLocaleLowerCase());if(Q===-1)return M(YJ,{children:J},void 0,!1,void 0,this);return M(YJ,{children:[J.slice(0,Q),M("mark",{className:"rounded bg-ember-soft px-0.5 text-ember",children:J.slice(Q,Q+W.length)},void 0,!1,void 0,this),J.slice(Q+W.length)]},void 0,!0,void 0,this)}function HM(){let J=r7(null);return c0(()=>{let Z=(W)=>{let Q=W.target,Y=Q&&(Q.tagName==="INPUT"||Q.tagName==="TEXTAREA"||Q.isContentEditable);if(W.key==="/"&&!Y)W.preventDefault(),J.current?.focus()};return window.addEventListener("keydown",Z),()=>window.removeEventListener("keydown",Z)},[]),J}W7();var SM="185";var jM=0,K5=1,fM=2;var pQ=1,bM=2,FW=3,MW=0,S7=1,v6=2,x6=0,dQ=1,W9=2,q5=3,$5=4,yM=5;var NW=100,vM=101,xM=102,hM=103,gM=104,mM=200,pM=201,dM=202,uM=203,lM=204,cM=205,iM=206,sM=207,nM=208,oM=209,aM=210,rM=211,tM=212,eM=213,JN=214,ZN=0,WN=1,QN=2,O5=3,YN=4,XN=5,HN=6,UN=7,GN=0,KN=1,qN=2,_6=0,R5=1,F5=2,M5=3,N5=4,L5=5,B5=6,z5=7;var LW=301,v9=302,GH=303,KH=304,uQ=306,$N=1000,qH=1001,ON=1002,Q9=1003,RN=1004;var lQ=1005;var j7=1006,$H=1007;var x9=1008;var I6=1009,FN=1010,MN=1011,cQ=1012,A5=1013,Y9=1014,F8=1015,M8=1016,_5=1017,I5=1018,BW=1020,NN=35902,LN=35899,BN=1021,zN=1022,h6=1023,h9=1026,g9=1027,AN=1028,w5=1029,m9=1030,D5=1031;var k5=1033,OH=33776,RH=33777,FH=33778,MH=33779,C5=35840,V5=35841,T5=35842,P5=35843,E5=36196,S5=37492,j5=37496,f5=37488,b5=37489,NH=37490,y5=37491,v5=37808,x5=37809,h5=37810,g5=37811,m5=37812,p5=37813,d5=37814,u5=37815,l5=37816,c5=37817,i5=37818,s5=37819,n5=37820,o5=37821,a5=36492,r5=36494,t5=36495,e5=36283,Jq=36284,LH=36285,Zq=36286;var Wq=0,_N=1,p9="",IN="srgb",Qq="srgb-linear",Yq="linear",wJ="srgb";var wN=512,DN=513,kN=514,BH=515,CN=516,VN=517,zH=518,TN=519;var Xq="300 es",Hq=2000;function sA(J){for(let Z=J.length-1;Z>=0;--Z)if(J[Z]>=65535)return!0;return!1}function nA(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function mQ(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function PN(){let J=mQ("canvas");return J.style.display="block",J}var UM={},RW=null;function Uq(...J){let Z="THREE."+J.shift();if(RW)RW("log",Z,...J);else console.log(Z,...J)}function EN(J){let Z=J[0];if(typeof Z==="string"&&Z.startsWith("TSL:")){let W=J[1];if(W&&W.isStackTrace)J[0]+=" "+W.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function j0(...J){J=EN(J);let Z="THREE."+J.shift();if(RW)RW("warn",Z,...J);else{let W=J[0];if(W&&W.isStackTrace)console.warn(W.getError(Z));else console.warn(Z,...J)}}function b0(...J){J=EN(J);let Z="THREE."+J.shift();if(RW)RW("error",Z,...J);else{let W=J[0];if(W&&W.isStackTrace)console.error(W.getError(Z));else console.error(Z,...J)}}function y9(...J){let Z=J.join(" ");if(Z in UM)return;UM[Z]=!0,j0(...J)}function SN(J,Z,W){return new Promise(function(Q,Y){function X(){switch(J.clientWaitSync(Z,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:Y();break;case J.TIMEOUT_EXPIRED:setTimeout(X,W);break;default:Q()}}setTimeout(X,W)})}var jN={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class N8{addEventListener(J,Z){if(this._listeners===void 0)this._listeners={};let W=this._listeners;if(W[J]===void 0)W[J]=[];if(W[J].indexOf(Z)===-1)W[J].push(Z)}hasEventListener(J,Z){let W=this._listeners;if(W===void 0)return!1;return W[J]!==void 0&&W[J].indexOf(Z)!==-1}removeEventListener(J,Z){let W=this._listeners;if(W===void 0)return;let Q=W[J];if(Q!==void 0){let Y=Q.indexOf(Z);if(Y!==-1)Q.splice(Y,1)}}dispatchEvent(J){let Z=this._listeners;if(Z===void 0)return;let W=Z[J.type];if(W!==void 0){J.target=this;let Q=W.slice(0);for(let Y=0,X=Q.length;Y<X;Y++)Q[Y].call(this,J);J.target=null}}}var F7=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var xK=Math.PI/180,XH=180/Math.PI;function iQ(){let J=Math.random()*4294967295|0,Z=Math.random()*4294967295|0,W=Math.random()*4294967295|0,Q=Math.random()*4294967295|0;return(F7[J&255]+F7[J>>8&255]+F7[J>>16&255]+F7[J>>24&255]+"-"+F7[Z&255]+F7[Z>>8&255]+"-"+F7[Z>>16&15|64]+F7[Z>>24&255]+"-"+F7[W&63|128]+F7[W>>8&255]+"-"+F7[W>>16&255]+F7[W>>24&255]+F7[Q&255]+F7[Q>>8&255]+F7[Q>>16&255]+F7[Q>>24&255]).toLowerCase()}function o0(J,Z,W){return Math.max(Z,Math.min(W,J))}function oA(J,Z){return(J%Z+Z)%Z}function hK(J,Z,W){return(1-W)*J+W*Z}function bQ(J,Z){switch(Z.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function E7(J,Z){switch(Z.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class XJ{static{XJ.prototype.isVector2=!0}constructor(J=0,Z=0){this.x=J,this.y=Z}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Z){return this.x=J,this.y=Z,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Z){switch(J){case 0:this.x=Z;break;case 1:this.y=Z;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Z){return this.x=J.x+Z.x,this.y=J.y+Z.y,this}addScaledVector(J,Z){return this.x+=J.x*Z,this.y+=J.y*Z,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Z){return this.x=J.x-Z.x,this.y=J.y-Z.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Z=this.x,W=this.y,Q=J.elements;return this.x=Q[0]*Z+Q[3]*W+Q[6],this.y=Q[1]*Z+Q[4]*W+Q[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Z){return this.x=o0(this.x,J.x,Z.x),this.y=o0(this.y,J.y,Z.y),this}clampScalar(J,Z){return this.x=o0(this.x,J,Z),this.y=o0(this.y,J,Z),this}clampLength(J,Z){let W=this.length();return this.divideScalar(W||1).multiplyScalar(o0(W,J,Z))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Z=Math.sqrt(this.lengthSq()*J.lengthSq());if(Z===0)return Math.PI/2;let W=this.dot(J)/Z;return Math.acos(o0(W,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Z=this.x-J.x,W=this.y-J.y;return Z*Z+W*W}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Z){return this.x+=(J.x-this.x)*Z,this.y+=(J.y-this.y)*Z,this}lerpVectors(J,Z,W){return this.x=J.x+(Z.x-J.x)*W,this.y=J.y+(Z.y-J.y)*W,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Z=0){return this.x=J[Z],this.y=J[Z+1],this}toArray(J=[],Z=0){return J[Z]=this.x,J[Z+1]=this.y,J}fromBufferAttribute(J,Z){return this.x=J.getX(Z),this.y=J.getY(Z),this}rotateAround(J,Z){let W=Math.cos(Z),Q=Math.sin(Z),Y=this.x-J.x,X=this.y-J.y;return this.x=Y*W-X*Q+J.x,this.y=Y*Q+X*W+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class L8{constructor(J=0,Z=0,W=0,Q=1){this.isQuaternion=!0,this._x=J,this._y=Z,this._z=W,this._w=Q}static slerpFlat(J,Z,W,Q,Y,X,H){let U=W[Q+0],G=W[Q+1],K=W[Q+2],O=W[Q+3],F=Y[X+0],q=Y[X+1],R=Y[X+2],L=Y[X+3];if(O!==L||U!==F||G!==q||K!==R){let w=U*F+G*q+K*R+O*L;if(w<0)F=-F,q=-q,R=-R,L=-L,w=-w;let N=1-H;if(w<0.9995){let $=Math.acos(w),B=Math.sin($);N=Math.sin(N*$)/B,H=Math.sin(H*$)/B,U=U*N+F*H,G=G*N+q*H,K=K*N+R*H,O=O*N+L*H}else{U=U*N+F*H,G=G*N+q*H,K=K*N+R*H,O=O*N+L*H;let $=1/Math.sqrt(U*U+G*G+K*K+O*O);U*=$,G*=$,K*=$,O*=$}}J[Z]=U,J[Z+1]=G,J[Z+2]=K,J[Z+3]=O}static multiplyQuaternionsFlat(J,Z,W,Q,Y,X){let H=W[Q],U=W[Q+1],G=W[Q+2],K=W[Q+3],O=Y[X],F=Y[X+1],q=Y[X+2],R=Y[X+3];return J[Z]=H*R+K*O+U*q-G*F,J[Z+1]=U*R+K*F+G*O-H*q,J[Z+2]=G*R+K*q+H*F-U*O,J[Z+3]=K*R-H*O-U*F-G*q,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Z,W,Q){return this._x=J,this._y=Z,this._z=W,this._w=Q,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Z=!0){let{_x:W,_y:Q,_z:Y,_order:X}=J,H=Math.cos,U=Math.sin,G=H(W/2),K=H(Q/2),O=H(Y/2),F=U(W/2),q=U(Q/2),R=U(Y/2);switch(X){case"XYZ":this._x=F*K*O+G*q*R,this._y=G*q*O-F*K*R,this._z=G*K*R+F*q*O,this._w=G*K*O-F*q*R;break;case"YXZ":this._x=F*K*O+G*q*R,this._y=G*q*O-F*K*R,this._z=G*K*R-F*q*O,this._w=G*K*O+F*q*R;break;case"ZXY":this._x=F*K*O-G*q*R,this._y=G*q*O+F*K*R,this._z=G*K*R+F*q*O,this._w=G*K*O-F*q*R;break;case"ZYX":this._x=F*K*O-G*q*R,this._y=G*q*O+F*K*R,this._z=G*K*R-F*q*O,this._w=G*K*O+F*q*R;break;case"YZX":this._x=F*K*O+G*q*R,this._y=G*q*O+F*K*R,this._z=G*K*R-F*q*O,this._w=G*K*O-F*q*R;break;case"XZY":this._x=F*K*O-G*q*R,this._y=G*q*O-F*K*R,this._z=G*K*R+F*q*O,this._w=G*K*O+F*q*R;break;default:j0("Quaternion: .setFromEuler() encountered an unknown order: "+X)}if(Z===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Z){let W=Z/2,Q=Math.sin(W);return this._x=J.x*Q,this._y=J.y*Q,this._z=J.z*Q,this._w=Math.cos(W),this._onChangeCallback(),this}setFromRotationMatrix(J){let Z=J.elements,W=Z[0],Q=Z[4],Y=Z[8],X=Z[1],H=Z[5],U=Z[9],G=Z[2],K=Z[6],O=Z[10],F=W+H+O;if(F>0){let q=0.5/Math.sqrt(F+1);this._w=0.25/q,this._x=(K-U)*q,this._y=(Y-G)*q,this._z=(X-Q)*q}else if(W>H&&W>O){let q=2*Math.sqrt(1+W-H-O);this._w=(K-U)/q,this._x=0.25*q,this._y=(Q+X)/q,this._z=(Y+G)/q}else if(H>O){let q=2*Math.sqrt(1+H-W-O);this._w=(Y-G)/q,this._x=(Q+X)/q,this._y=0.25*q,this._z=(U+K)/q}else{let q=2*Math.sqrt(1+O-W-H);this._w=(X-Q)/q,this._x=(Y+G)/q,this._y=(U+K)/q,this._z=0.25*q}return this._onChangeCallback(),this}setFromUnitVectors(J,Z){let W=J.dot(Z)+1;if(W<0.00000001)if(W=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=W;else this._x=0,this._y=-J.z,this._z=J.y,this._w=W;else this._x=J.y*Z.z-J.z*Z.y,this._y=J.z*Z.x-J.x*Z.z,this._z=J.x*Z.y-J.y*Z.x,this._w=W;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(o0(this.dot(J),-1,1)))}rotateTowards(J,Z){let W=this.angleTo(J);if(W===0)return this;let Q=Math.min(1,Z/W);return this.slerp(J,Q),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Z){let{_x:W,_y:Q,_z:Y,_w:X}=J,H=Z._x,U=Z._y,G=Z._z,K=Z._w;return this._x=W*K+X*H+Q*G-Y*U,this._y=Q*K+X*U+Y*H-W*G,this._z=Y*K+X*G+W*U-Q*H,this._w=X*K-W*H-Q*U-Y*G,this._onChangeCallback(),this}slerp(J,Z){let{_x:W,_y:Q,_z:Y,_w:X}=J,H=this.dot(J);if(H<0)W=-W,Q=-Q,Y=-Y,X=-X,H=-H;let U=1-Z;if(H<0.9995){let G=Math.acos(H),K=Math.sin(G);U=Math.sin(U*G)/K,Z=Math.sin(Z*G)/K,this._x=this._x*U+W*Z,this._y=this._y*U+Q*Z,this._z=this._z*U+Y*Z,this._w=this._w*U+X*Z,this._onChangeCallback()}else this._x=this._x*U+W*Z,this._y=this._y*U+Q*Z,this._z=this._z*U+Y*Z,this._w=this._w*U+X*Z,this.normalize();return this}slerpQuaternions(J,Z,W){return this.copy(J).slerp(Z,W)}random(){let J=2*Math.PI*Math.random(),Z=2*Math.PI*Math.random(),W=Math.random(),Q=Math.sqrt(1-W),Y=Math.sqrt(W);return this.set(Q*Math.sin(J),Q*Math.cos(J),Y*Math.sin(Z),Y*Math.cos(Z))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Z=0){return this._x=J[Z],this._y=J[Z+1],this._z=J[Z+2],this._w=J[Z+3],this._onChangeCallback(),this}toArray(J=[],Z=0){return J[Z]=this._x,J[Z+1]=this._y,J[Z+2]=this._z,J[Z+3]=this._w,J}fromBufferAttribute(J,Z){return this._x=J.getX(Z),this._y=J.getY(Z),this._z=J.getZ(Z),this._w=J.getW(Z),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class v{static{v.prototype.isVector3=!0}constructor(J=0,Z=0,W=0){this.x=J,this.y=Z,this.z=W}set(J,Z,W){if(W===void 0)W=this.z;return this.x=J,this.y=Z,this.z=W,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Z){switch(J){case 0:this.x=Z;break;case 1:this.y=Z;break;case 2:this.z=Z;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Z){return this.x=J.x+Z.x,this.y=J.y+Z.y,this.z=J.z+Z.z,this}addScaledVector(J,Z){return this.x+=J.x*Z,this.y+=J.y*Z,this.z+=J.z*Z,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Z){return this.x=J.x-Z.x,this.y=J.y-Z.y,this.z=J.z-Z.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Z){return this.x=J.x*Z.x,this.y=J.y*Z.y,this.z=J.z*Z.z,this}applyEuler(J){return this.applyQuaternion(GM.setFromEuler(J))}applyAxisAngle(J,Z){return this.applyQuaternion(GM.setFromAxisAngle(J,Z))}applyMatrix3(J){let Z=this.x,W=this.y,Q=this.z,Y=J.elements;return this.x=Y[0]*Z+Y[3]*W+Y[6]*Q,this.y=Y[1]*Z+Y[4]*W+Y[7]*Q,this.z=Y[2]*Z+Y[5]*W+Y[8]*Q,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Z=this.x,W=this.y,Q=this.z,Y=J.elements,X=1/(Y[3]*Z+Y[7]*W+Y[11]*Q+Y[15]);return this.x=(Y[0]*Z+Y[4]*W+Y[8]*Q+Y[12])*X,this.y=(Y[1]*Z+Y[5]*W+Y[9]*Q+Y[13])*X,this.z=(Y[2]*Z+Y[6]*W+Y[10]*Q+Y[14])*X,this}applyQuaternion(J){let Z=this.x,W=this.y,Q=this.z,Y=J.x,X=J.y,H=J.z,U=J.w,G=2*(X*Q-H*W),K=2*(H*Z-Y*Q),O=2*(Y*W-X*Z);return this.x=Z+U*G+X*O-H*K,this.y=W+U*K+H*G-Y*O,this.z=Q+U*O+Y*K-X*G,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Z=this.x,W=this.y,Q=this.z,Y=J.elements;return this.x=Y[0]*Z+Y[4]*W+Y[8]*Q,this.y=Y[1]*Z+Y[5]*W+Y[9]*Q,this.z=Y[2]*Z+Y[6]*W+Y[10]*Q,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Z){return this.x=o0(this.x,J.x,Z.x),this.y=o0(this.y,J.y,Z.y),this.z=o0(this.z,J.z,Z.z),this}clampScalar(J,Z){return this.x=o0(this.x,J,Z),this.y=o0(this.y,J,Z),this.z=o0(this.z,J,Z),this}clampLength(J,Z){let W=this.length();return this.divideScalar(W||1).multiplyScalar(o0(W,J,Z))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Z){return this.x+=(J.x-this.x)*Z,this.y+=(J.y-this.y)*Z,this.z+=(J.z-this.z)*Z,this}lerpVectors(J,Z,W){return this.x=J.x+(Z.x-J.x)*W,this.y=J.y+(Z.y-J.y)*W,this.z=J.z+(Z.z-J.z)*W,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Z){let{x:W,y:Q,z:Y}=J,X=Z.x,H=Z.y,U=Z.z;return this.x=Q*U-Y*H,this.y=Y*X-W*U,this.z=W*H-Q*X,this}projectOnVector(J){let Z=J.lengthSq();if(Z===0)return this.set(0,0,0);let W=J.dot(this)/Z;return this.copy(J).multiplyScalar(W)}projectOnPlane(J){return gK.copy(this).projectOnVector(J),this.sub(gK)}reflect(J){return this.sub(gK.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Z=Math.sqrt(this.lengthSq()*J.lengthSq());if(Z===0)return Math.PI/2;let W=this.dot(J)/Z;return Math.acos(o0(W,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Z=this.x-J.x,W=this.y-J.y,Q=this.z-J.z;return Z*Z+W*W+Q*Q}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Z,W){let Q=Math.sin(Z)*J;return this.x=Q*Math.sin(W),this.y=Math.cos(Z)*J,this.z=Q*Math.cos(W),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Z,W){return this.x=J*Math.sin(Z),this.y=W,this.z=J*Math.cos(Z),this}setFromMatrixPosition(J){let Z=J.elements;return this.x=Z[12],this.y=Z[13],this.z=Z[14],this}setFromMatrixScale(J){let Z=this.setFromMatrixColumn(J,0).length(),W=this.setFromMatrixColumn(J,1).length(),Q=this.setFromMatrixColumn(J,2).length();return this.x=Z,this.y=W,this.z=Q,this}setFromMatrixColumn(J,Z){return this.fromArray(J.elements,Z*4)}setFromMatrix3Column(J,Z){return this.fromArray(J.elements,Z*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Z=0){return this.x=J[Z],this.y=J[Z+1],this.z=J[Z+2],this}toArray(J=[],Z=0){return J[Z]=this.x,J[Z+1]=this.y,J[Z+2]=this.z,J}fromBufferAttribute(J,Z){return this.x=J.getX(Z),this.y=J.getY(Z),this.z=J.getZ(Z),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Z=Math.random()*2-1,W=Math.sqrt(1-Z*Z);return this.x=W*Math.cos(J),this.y=Z,this.z=W*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var gK=new v,GM=new L8;class v0{static{v0.prototype.isMatrix3=!0}constructor(J,Z,W,Q,Y,X,H,U,G){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Z,W,Q,Y,X,H,U,G)}set(J,Z,W,Q,Y,X,H,U,G){let K=this.elements;return K[0]=J,K[1]=Q,K[2]=H,K[3]=Z,K[4]=Y,K[5]=U,K[6]=W,K[7]=X,K[8]=G,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Z=this.elements,W=J.elements;return Z[0]=W[0],Z[1]=W[1],Z[2]=W[2],Z[3]=W[3],Z[4]=W[4],Z[5]=W[5],Z[6]=W[6],Z[7]=W[7],Z[8]=W[8],this}extractBasis(J,Z,W){return J.setFromMatrix3Column(this,0),Z.setFromMatrix3Column(this,1),W.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Z=J.elements;return this.set(Z[0],Z[4],Z[8],Z[1],Z[5],Z[9],Z[2],Z[6],Z[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Z){let W=J.elements,Q=Z.elements,Y=this.elements,X=W[0],H=W[3],U=W[6],G=W[1],K=W[4],O=W[7],F=W[2],q=W[5],R=W[8],L=Q[0],w=Q[3],N=Q[6],$=Q[1],B=Q[4],_=Q[7],z=Q[2],P=Q[5],D=Q[8];return Y[0]=X*L+H*$+U*z,Y[3]=X*w+H*B+U*P,Y[6]=X*N+H*_+U*D,Y[1]=G*L+K*$+O*z,Y[4]=G*w+K*B+O*P,Y[7]=G*N+K*_+O*D,Y[2]=F*L+q*$+R*z,Y[5]=F*w+q*B+R*P,Y[8]=F*N+q*_+R*D,this}multiplyScalar(J){let Z=this.elements;return Z[0]*=J,Z[3]*=J,Z[6]*=J,Z[1]*=J,Z[4]*=J,Z[7]*=J,Z[2]*=J,Z[5]*=J,Z[8]*=J,this}determinant(){let J=this.elements,Z=J[0],W=J[1],Q=J[2],Y=J[3],X=J[4],H=J[5],U=J[6],G=J[7],K=J[8];return Z*X*K-Z*H*G-W*Y*K+W*H*U+Q*Y*G-Q*X*U}invert(){let J=this.elements,Z=J[0],W=J[1],Q=J[2],Y=J[3],X=J[4],H=J[5],U=J[6],G=J[7],K=J[8],O=K*X-H*G,F=H*U-K*Y,q=G*Y-X*U,R=Z*O+W*F+Q*q;if(R===0)return this.set(0,0,0,0,0,0,0,0,0);let L=1/R;return J[0]=O*L,J[1]=(Q*G-K*W)*L,J[2]=(H*W-Q*X)*L,J[3]=F*L,J[4]=(K*Z-Q*U)*L,J[5]=(Q*Y-H*Z)*L,J[6]=q*L,J[7]=(W*U-G*Z)*L,J[8]=(X*Z-W*Y)*L,this}transpose(){let J,Z=this.elements;return J=Z[1],Z[1]=Z[3],Z[3]=J,J=Z[2],Z[2]=Z[6],Z[6]=J,J=Z[5],Z[5]=Z[7],Z[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Z=this.elements;return J[0]=Z[0],J[1]=Z[3],J[2]=Z[6],J[3]=Z[1],J[4]=Z[4],J[5]=Z[7],J[6]=Z[2],J[7]=Z[5],J[8]=Z[8],this}setUvTransform(J,Z,W,Q,Y,X,H){let U=Math.cos(Y),G=Math.sin(Y);return this.set(W*U,W*G,-W*(U*X+G*H)+X+J,-Q*G,Q*U,-Q*(-G*X+U*H)+H+Z,0,0,1),this}scale(J,Z){return y9("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(mK.makeScale(J,Z)),this}rotate(J){return y9("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(mK.makeRotation(-J)),this}translate(J,Z){return y9("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(mK.makeTranslation(J,Z)),this}makeTranslation(J,Z){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Z,0,0,1);return this}makeRotation(J){let Z=Math.cos(J),W=Math.sin(J);return this.set(Z,-W,0,W,Z,0,0,0,1),this}makeScale(J,Z){return this.set(J,0,0,0,Z,0,0,0,1),this}equals(J){let Z=this.elements,W=J.elements;for(let Q=0;Q<9;Q++)if(Z[Q]!==W[Q])return!1;return!0}fromArray(J,Z=0){for(let W=0;W<9;W++)this.elements[W]=J[W+Z];return this}toArray(J=[],Z=0){let W=this.elements;return J[Z]=W[0],J[Z+1]=W[1],J[Z+2]=W[2],J[Z+3]=W[3],J[Z+4]=W[4],J[Z+5]=W[5],J[Z+6]=W[6],J[Z+7]=W[7],J[Z+8]=W[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var mK=new v0,KM=new v0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),qM=new v0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function aA(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(Y,X,H){if(this.enabled===!1||X===H||!X||!H)return Y;if(this.spaces[X].transfer==="srgb")Y.r=R8(Y.r),Y.g=R8(Y.g),Y.b=R8(Y.b);if(this.spaces[X].primaries!==this.spaces[H].primaries)Y.applyMatrix3(this.spaces[X].toXYZ),Y.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")Y.r=OW(Y.r),Y.g=OW(Y.g),Y.b=OW(Y.b);return Y},workingToColorSpace:function(Y,X){return this.convert(Y,this.workingColorSpace,X)},colorSpaceToWorking:function(Y,X){return this.convert(Y,X,this.workingColorSpace)},getPrimaries:function(Y){return this.spaces[Y].primaries},getTransfer:function(Y){if(Y==="")return"linear";return this.spaces[Y].transfer},getToneMappingMode:function(Y){return this.spaces[Y].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(Y,X=this.workingColorSpace){return Y.fromArray(this.spaces[X].luminanceCoefficients)},define:function(Y){Object.assign(this.spaces,Y)},_getMatrix:function(Y,X,H){return Y.copy(this.spaces[X].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(Y){return this.spaces[Y].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(Y=this.workingColorSpace){return this.spaces[Y].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(Y,X){return y9("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(Y,X)},toWorkingColorSpace:function(Y,X){return y9("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(Y,X)}},Z=[0.64,0.33,0.3,0.6,0.15,0.06],W=[0.2126,0.7152,0.0722],Q=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Z,whitePoint:Q,transfer:"linear",toXYZ:KM,fromXYZ:qM,luminanceCoefficients:W,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Z,whitePoint:Q,transfer:"srgb",toXYZ:KM,fromXYZ:qM,luminanceCoefficients:W,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var WJ=aA();function R8(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function OW(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var eZ;class Gq{static getDataURL(J,Z="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let W;if(J instanceof HTMLCanvasElement)W=J;else{if(eZ===void 0)eZ=mQ("canvas");eZ.width=J.width,eZ.height=J.height;let Q=eZ.getContext("2d");if(J instanceof ImageData)Q.putImageData(J,0,0);else Q.drawImage(J,0,0,J.width,J.height);W=eZ}return W.toDataURL(Z)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Z=mQ("canvas");Z.width=J.width,Z.height=J.height;let W=Z.getContext("2d");W.drawImage(J,0,0,J.width,J.height);let Q=W.getImageData(0,0,J.width,J.height),Y=Q.data;for(let X=0;X<Y.length;X++)Y[X]=R8(Y[X]/255)*255;return W.putImageData(Q,0,0),Z}else if(J.data){let Z=J.data.slice(0);for(let W=0;W<Z.length;W++)if(Z instanceof Uint8Array||Z instanceof Uint8ClampedArray)Z[W]=Math.floor(R8(Z[W]/255)*255);else Z[W]=R8(Z[W]);return{data:Z,width:J.width,height:J.height}}else return j0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var rA=0;class sQ{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rA++}),this.uuid=iQ(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Z=this.data;if(typeof HTMLVideoElement<"u"&&Z instanceof HTMLVideoElement)J.set(Z.videoWidth,Z.videoHeight,0);else if(typeof VideoFrame<"u"&&Z instanceof VideoFrame)J.set(Z.displayWidth,Z.displayHeight,0);else if(Z!==null)J.set(Z.width,Z.height,Z.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Z=J===void 0||typeof J==="string";if(!Z&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let W={uuid:this.uuid,url:""},Q=this.data;if(Q!==null){let Y;if(Array.isArray(Q)){Y=[];for(let X=0,H=Q.length;X<H;X++)if(Q[X].isDataTexture)Y.push(pK(Q[X].image));else Y.push(pK(Q[X]))}else Y=pK(Q);W.url=Y}if(!Z)J.images[this.uuid]=W;return W}}function pK(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return Gq.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return j0("Texture: Unable to serialize Texture."),{}}var tA=0,dK=new v;class N7 extends N8{constructor(J=N7.DEFAULT_IMAGE,Z=N7.DEFAULT_MAPPING,W=1001,Q=1001,Y=1006,X=1008,H=1023,U=1009,G=N7.DEFAULT_ANISOTROPY,K=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:tA++}),this.uuid=iQ(),this.name="",this.source=new sQ(J),this.mipmaps=[],this.mapping=Z,this.channel=0,this.wrapS=W,this.wrapT=Q,this.magFilter=Y,this.minFilter=X,this.anisotropy=G,this.format=H,this.internalFormat=null,this.type=U,this.offset=new XJ(0,0),this.repeat=new XJ(1,1),this.center=new XJ(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new v0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=K,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(dK).x}get height(){return this.source.getSize(dK).y}get depth(){return this.source.getSize(dK).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Z){this.updateRanges.push({start:J,count:Z})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Z in J){let W=J[Z];if(W===void 0){j0(`Texture.setValues(): parameter '${Z}' has value of undefined.`);continue}let Q=this[Z];if(Q===void 0){j0(`Texture.setValues(): property '${Z}' does not exist.`);continue}if(Q&&W&&(Q.isVector2&&W.isVector2))Q.copy(W);else if(Q&&W&&(Q.isVector3&&W.isVector3))Q.copy(W);else if(Q&&W&&(Q.isMatrix3&&W.isMatrix3))Q.copy(W);else this[Z]=W}}toJSON(J){let Z=J===void 0||typeof J==="string";if(!Z&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let W={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)W.userData=this.userData;if(!Z)J.textures[this.uuid]=W;return W}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}N7.DEFAULT_IMAGE=null;N7.DEFAULT_MAPPING=300;N7.DEFAULT_ANISOTROPY=1;class bJ{static{bJ.prototype.isVector4=!0}constructor(J=0,Z=0,W=0,Q=1){this.x=J,this.y=Z,this.z=W,this.w=Q}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Z,W,Q){return this.x=J,this.y=Z,this.z=W,this.w=Q,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Z){switch(J){case 0:this.x=Z;break;case 1:this.y=Z;break;case 2:this.z=Z;break;case 3:this.w=Z;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Z){return this.x=J.x+Z.x,this.y=J.y+Z.y,this.z=J.z+Z.z,this.w=J.w+Z.w,this}addScaledVector(J,Z){return this.x+=J.x*Z,this.y+=J.y*Z,this.z+=J.z*Z,this.w+=J.w*Z,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Z){return this.x=J.x-Z.x,this.y=J.y-Z.y,this.z=J.z-Z.z,this.w=J.w-Z.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Z=this.x,W=this.y,Q=this.z,Y=this.w,X=J.elements;return this.x=X[0]*Z+X[4]*W+X[8]*Q+X[12]*Y,this.y=X[1]*Z+X[5]*W+X[9]*Q+X[13]*Y,this.z=X[2]*Z+X[6]*W+X[10]*Q+X[14]*Y,this.w=X[3]*Z+X[7]*W+X[11]*Q+X[15]*Y,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Z=Math.sqrt(1-J.w*J.w);if(Z<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Z,this.y=J.y/Z,this.z=J.z/Z;return this}setAxisAngleFromRotationMatrix(J){let Z,W,Q,Y,X=0.01,H=0.1,U=J.elements,G=U[0],K=U[4],O=U[8],F=U[1],q=U[5],R=U[9],L=U[2],w=U[6],N=U[10];if(Math.abs(K-F)<0.01&&Math.abs(O-L)<0.01&&Math.abs(R-w)<0.01){if(Math.abs(K+F)<0.1&&Math.abs(O+L)<0.1&&Math.abs(R+w)<0.1&&Math.abs(G+q+N-3)<0.1)return this.set(1,0,0,0),this;Z=Math.PI;let B=(G+1)/2,_=(q+1)/2,z=(N+1)/2,P=(K+F)/4,D=(O+L)/4,T=(R+w)/4;if(B>_&&B>z)if(B<0.01)W=0,Q=0.707106781,Y=0.707106781;else W=Math.sqrt(B),Q=P/W,Y=D/W;else if(_>z)if(_<0.01)W=0.707106781,Q=0,Y=0.707106781;else Q=Math.sqrt(_),W=P/Q,Y=T/Q;else if(z<0.01)W=0.707106781,Q=0.707106781,Y=0;else Y=Math.sqrt(z),W=D/Y,Q=T/Y;return this.set(W,Q,Y,Z),this}let $=Math.sqrt((w-R)*(w-R)+(O-L)*(O-L)+(F-K)*(F-K));if(Math.abs($)<0.001)$=1;return this.x=(w-R)/$,this.y=(O-L)/$,this.z=(F-K)/$,this.w=Math.acos((G+q+N-1)/2),this}setFromMatrixPosition(J){let Z=J.elements;return this.x=Z[12],this.y=Z[13],this.z=Z[14],this.w=Z[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Z){return this.x=o0(this.x,J.x,Z.x),this.y=o0(this.y,J.y,Z.y),this.z=o0(this.z,J.z,Z.z),this.w=o0(this.w,J.w,Z.w),this}clampScalar(J,Z){return this.x=o0(this.x,J,Z),this.y=o0(this.y,J,Z),this.z=o0(this.z,J,Z),this.w=o0(this.w,J,Z),this}clampLength(J,Z){let W=this.length();return this.divideScalar(W||1).multiplyScalar(o0(W,J,Z))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Z){return this.x+=(J.x-this.x)*Z,this.y+=(J.y-this.y)*Z,this.z+=(J.z-this.z)*Z,this.w+=(J.w-this.w)*Z,this}lerpVectors(J,Z,W){return this.x=J.x+(Z.x-J.x)*W,this.y=J.y+(Z.y-J.y)*W,this.z=J.z+(Z.z-J.z)*W,this.w=J.w+(Z.w-J.w)*W,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Z=0){return this.x=J[Z],this.y=J[Z+1],this.z=J[Z+2],this.w=J[Z+3],this}toArray(J=[],Z=0){return J[Z]=this.x,J[Z+1]=this.y,J[Z+2]=this.z,J[Z+3]=this.w,J}fromBufferAttribute(J,Z){return this.x=J.getX(Z),this.y=J.getY(Z),this.z=J.getZ(Z),this.w=J.getW(Z),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Kq extends N8{constructor(J=1,Z=1,W={}){super();W=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},W),this.isRenderTarget=!0,this.width=J,this.height=Z,this.depth=W.depth,this.scissor=new bJ(0,0,J,Z),this.scissorTest=!1,this.viewport=new bJ(0,0,J,Z),this.textures=[];let Q={width:J,height:Z,depth:W.depth},Y=new N7(Q),X=W.count;for(let H=0;H<X;H++)this.textures[H]=Y.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions(W),this.depthBuffer=W.depthBuffer,this.stencilBuffer=W.stencilBuffer,this.resolveDepthBuffer=W.resolveDepthBuffer,this.resolveStencilBuffer=W.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=W.depthTexture,this.samples=W.samples,this.multiview=W.multiview,this.useArrayDepthTexture=W.useArrayDepthTexture}_setTextureOptions(J={}){let Z={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Z.mapping=J.mapping;if(J.wrapS!==void 0)Z.wrapS=J.wrapS;if(J.wrapT!==void 0)Z.wrapT=J.wrapT;if(J.wrapR!==void 0)Z.wrapR=J.wrapR;if(J.magFilter!==void 0)Z.magFilter=J.magFilter;if(J.minFilter!==void 0)Z.minFilter=J.minFilter;if(J.format!==void 0)Z.format=J.format;if(J.type!==void 0)Z.type=J.type;if(J.anisotropy!==void 0)Z.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Z.colorSpace=J.colorSpace;if(J.flipY!==void 0)Z.flipY=J.flipY;if(J.generateMipmaps!==void 0)Z.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Z.internalFormat=J.internalFormat;for(let W=0;W<this.textures.length;W++)this.textures[W].setValues(Z)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Z,W=1){if(this.width!==J||this.height!==Z||this.depth!==W){this.width=J,this.height=Z,this.depth=W;for(let Q=0,Y=this.textures.length;Q<Y;Q++)if(this.textures[Q].image.width=J,this.textures[Q].image.height=Z,this.textures[Q].image.depth=W,this.textures[Q].isData3DTexture!==!0)this.textures[Q].isArrayTexture=this.textures[Q].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Z),this.scissor.set(0,0,J,Z)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Z=0,W=J.textures.length;Z<W;Z++){this.textures[Z]=J.textures[Z].clone(),this.textures[Z].isRenderTargetTexture=!0,this.textures[Z].renderTarget=this;let Q=Object.assign({},J.textures[Z].image);this.textures[Z].source=new sQ(Q)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $6 extends Kq{constructor(J=1,Z=1,W={}){super(J,Z,W);this.isWebGLRenderTarget=!0}}class AH extends N7{constructor(J=null,Z=1,W=1,Q=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Z,height:W,depth:Q},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class qq extends N7{constructor(J=null,Z=1,W=1,Q=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Z,height:W,depth:Q},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jJ{static{jJ.prototype.isMatrix4=!0}constructor(J,Z,W,Q,Y,X,H,U,G,K,O,F,q,R,L,w){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Z,W,Q,Y,X,H,U,G,K,O,F,q,R,L,w)}set(J,Z,W,Q,Y,X,H,U,G,K,O,F,q,R,L,w){let N=this.elements;return N[0]=J,N[4]=Z,N[8]=W,N[12]=Q,N[1]=Y,N[5]=X,N[9]=H,N[13]=U,N[2]=G,N[6]=K,N[10]=O,N[14]=F,N[3]=q,N[7]=R,N[11]=L,N[15]=w,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new jJ().fromArray(this.elements)}copy(J){let Z=this.elements,W=J.elements;return Z[0]=W[0],Z[1]=W[1],Z[2]=W[2],Z[3]=W[3],Z[4]=W[4],Z[5]=W[5],Z[6]=W[6],Z[7]=W[7],Z[8]=W[8],Z[9]=W[9],Z[10]=W[10],Z[11]=W[11],Z[12]=W[12],Z[13]=W[13],Z[14]=W[14],Z[15]=W[15],this}copyPosition(J){let Z=this.elements,W=J.elements;return Z[12]=W[12],Z[13]=W[13],Z[14]=W[14],this}setFromMatrix3(J){let Z=J.elements;return this.set(Z[0],Z[3],Z[6],0,Z[1],Z[4],Z[7],0,Z[2],Z[5],Z[8],0,0,0,0,1),this}extractBasis(J,Z,W){if(this.determinantAffine()===0)return J.set(1,0,0),Z.set(0,1,0),W.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Z.setFromMatrixColumn(this,1),W.setFromMatrixColumn(this,2),this}makeBasis(J,Z,W){return this.set(J.x,Z.x,W.x,0,J.y,Z.y,W.y,0,J.z,Z.z,W.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Z=this.elements,W=J.elements,Q=1/JW.setFromMatrixColumn(J,0).length(),Y=1/JW.setFromMatrixColumn(J,1).length(),X=1/JW.setFromMatrixColumn(J,2).length();return Z[0]=W[0]*Q,Z[1]=W[1]*Q,Z[2]=W[2]*Q,Z[3]=0,Z[4]=W[4]*Y,Z[5]=W[5]*Y,Z[6]=W[6]*Y,Z[7]=0,Z[8]=W[8]*X,Z[9]=W[9]*X,Z[10]=W[10]*X,Z[11]=0,Z[12]=0,Z[13]=0,Z[14]=0,Z[15]=1,this}makeRotationFromEuler(J){let Z=this.elements,W=J.x,Q=J.y,Y=J.z,X=Math.cos(W),H=Math.sin(W),U=Math.cos(Q),G=Math.sin(Q),K=Math.cos(Y),O=Math.sin(Y);if(J.order==="XYZ"){let F=X*K,q=X*O,R=H*K,L=H*O;Z[0]=U*K,Z[4]=-U*O,Z[8]=G,Z[1]=q+R*G,Z[5]=F-L*G,Z[9]=-H*U,Z[2]=L-F*G,Z[6]=R+q*G,Z[10]=X*U}else if(J.order==="YXZ"){let F=U*K,q=U*O,R=G*K,L=G*O;Z[0]=F+L*H,Z[4]=R*H-q,Z[8]=X*G,Z[1]=X*O,Z[5]=X*K,Z[9]=-H,Z[2]=q*H-R,Z[6]=L+F*H,Z[10]=X*U}else if(J.order==="ZXY"){let F=U*K,q=U*O,R=G*K,L=G*O;Z[0]=F-L*H,Z[4]=-X*O,Z[8]=R+q*H,Z[1]=q+R*H,Z[5]=X*K,Z[9]=L-F*H,Z[2]=-X*G,Z[6]=H,Z[10]=X*U}else if(J.order==="ZYX"){let F=X*K,q=X*O,R=H*K,L=H*O;Z[0]=U*K,Z[4]=R*G-q,Z[8]=F*G+L,Z[1]=U*O,Z[5]=L*G+F,Z[9]=q*G-R,Z[2]=-G,Z[6]=H*U,Z[10]=X*U}else if(J.order==="YZX"){let F=X*U,q=X*G,R=H*U,L=H*G;Z[0]=U*K,Z[4]=L-F*O,Z[8]=R*O+q,Z[1]=O,Z[5]=X*K,Z[9]=-H*K,Z[2]=-G*K,Z[6]=q*O+R,Z[10]=F-L*O}else if(J.order==="XZY"){let F=X*U,q=X*G,R=H*U,L=H*G;Z[0]=U*K,Z[4]=-O,Z[8]=G*K,Z[1]=F*O+L,Z[5]=X*K,Z[9]=q*O-R,Z[2]=R*O-q,Z[6]=H*K,Z[10]=L*O+F}return Z[3]=0,Z[7]=0,Z[11]=0,Z[12]=0,Z[13]=0,Z[14]=0,Z[15]=1,this}makeRotationFromQuaternion(J){return this.compose(eA,J,J_)}lookAt(J,Z,W){let Q=this.elements;if(i7.subVectors(J,Z),i7.lengthSq()===0)i7.z=1;if(i7.normalize(),o8.crossVectors(W,i7),o8.lengthSq()===0){if(Math.abs(W.z)===1)i7.x+=0.0001;else i7.z+=0.0001;i7.normalize(),o8.crossVectors(W,i7)}return o8.normalize(),yX.crossVectors(i7,o8),Q[0]=o8.x,Q[4]=yX.x,Q[8]=i7.x,Q[1]=o8.y,Q[5]=yX.y,Q[9]=i7.y,Q[2]=o8.z,Q[6]=yX.z,Q[10]=i7.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Z){let W=J.elements,Q=Z.elements,Y=this.elements,X=W[0],H=W[4],U=W[8],G=W[12],K=W[1],O=W[5],F=W[9],q=W[13],R=W[2],L=W[6],w=W[10],N=W[14],$=W[3],B=W[7],_=W[11],z=W[15],P=Q[0],D=Q[4],T=Q[8],A=Q[12],C=Q[1],x=Q[5],E=Q[9],u=Q[13],e=Q[2],b=Q[6],c=Q[10],l=Q[14],h=Q[3],g=Q[7],Y0=Q[11],O0=Q[15];return Y[0]=X*P+H*C+U*e+G*h,Y[4]=X*D+H*x+U*b+G*g,Y[8]=X*T+H*E+U*c+G*Y0,Y[12]=X*A+H*u+U*l+G*O0,Y[1]=K*P+O*C+F*e+q*h,Y[5]=K*D+O*x+F*b+q*g,Y[9]=K*T+O*E+F*c+q*Y0,Y[13]=K*A+O*u+F*l+q*O0,Y[2]=R*P+L*C+w*e+N*h,Y[6]=R*D+L*x+w*b+N*g,Y[10]=R*T+L*E+w*c+N*Y0,Y[14]=R*A+L*u+w*l+N*O0,Y[3]=$*P+B*C+_*e+z*h,Y[7]=$*D+B*x+_*b+z*g,Y[11]=$*T+B*E+_*c+z*Y0,Y[15]=$*A+B*u+_*l+z*O0,this}multiplyScalar(J){let Z=this.elements;return Z[0]*=J,Z[4]*=J,Z[8]*=J,Z[12]*=J,Z[1]*=J,Z[5]*=J,Z[9]*=J,Z[13]*=J,Z[2]*=J,Z[6]*=J,Z[10]*=J,Z[14]*=J,Z[3]*=J,Z[7]*=J,Z[11]*=J,Z[15]*=J,this}determinant(){let J=this.elements,Z=J[0],W=J[4],Q=J[8],Y=J[12],X=J[1],H=J[5],U=J[9],G=J[13],K=J[2],O=J[6],F=J[10],q=J[14],R=J[3],L=J[7],w=J[11],N=J[15],$=U*q-G*F,B=H*q-G*O,_=H*F-U*O,z=X*q-G*K,P=X*F-U*K,D=X*O-H*K;return Z*(L*$-w*B+N*_)-W*(R*$-w*z+N*P)+Q*(R*B-L*z+N*D)-Y*(R*_-L*P+w*D)}determinantAffine(){let J=this.elements,Z=J[0],W=J[4],Q=J[8],Y=J[1],X=J[5],H=J[9],U=J[2],G=J[6],K=J[10];return Z*(X*K-H*G)-W*(Y*K-H*U)+Q*(Y*G-X*U)}transpose(){let J=this.elements,Z;return Z=J[1],J[1]=J[4],J[4]=Z,Z=J[2],J[2]=J[8],J[8]=Z,Z=J[6],J[6]=J[9],J[9]=Z,Z=J[3],J[3]=J[12],J[12]=Z,Z=J[7],J[7]=J[13],J[13]=Z,Z=J[11],J[11]=J[14],J[14]=Z,this}setPosition(J,Z,W){let Q=this.elements;if(J.isVector3)Q[12]=J.x,Q[13]=J.y,Q[14]=J.z;else Q[12]=J,Q[13]=Z,Q[14]=W;return this}invert(){let J=this.elements,Z=J[0],W=J[1],Q=J[2],Y=J[3],X=J[4],H=J[5],U=J[6],G=J[7],K=J[8],O=J[9],F=J[10],q=J[11],R=J[12],L=J[13],w=J[14],N=J[15],$=Z*H-W*X,B=Z*U-Q*X,_=Z*G-Y*X,z=W*U-Q*H,P=W*G-Y*H,D=Q*G-Y*U,T=K*L-O*R,A=K*w-F*R,C=K*N-q*R,x=O*w-F*L,E=O*N-q*L,u=F*N-q*w,e=$*u-B*E+_*x+z*C-P*A+D*T;if(e===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/e;return J[0]=(H*u-U*E+G*x)*b,J[1]=(Q*E-W*u-Y*x)*b,J[2]=(L*D-w*P+N*z)*b,J[3]=(F*P-O*D-q*z)*b,J[4]=(U*C-X*u-G*A)*b,J[5]=(Z*u-Q*C+Y*A)*b,J[6]=(w*_-R*D-N*B)*b,J[7]=(K*D-F*_+q*B)*b,J[8]=(X*E-H*C+G*T)*b,J[9]=(W*C-Z*E-Y*T)*b,J[10]=(R*P-L*_+N*$)*b,J[11]=(O*_-K*P-q*$)*b,J[12]=(H*A-X*x-U*T)*b,J[13]=(Z*x-W*A+Q*T)*b,J[14]=(L*B-R*z-w*$)*b,J[15]=(K*z-O*B+F*$)*b,this}scale(J){let Z=this.elements,W=J.x,Q=J.y,Y=J.z;return Z[0]*=W,Z[4]*=Q,Z[8]*=Y,Z[1]*=W,Z[5]*=Q,Z[9]*=Y,Z[2]*=W,Z[6]*=Q,Z[10]*=Y,Z[3]*=W,Z[7]*=Q,Z[11]*=Y,this}getMaxScaleOnAxis(){let J=this.elements,Z=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],W=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Q=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Z,W,Q))}makeTranslation(J,Z,W){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Z,0,0,1,W,0,0,0,1);return this}makeRotationX(J){let Z=Math.cos(J),W=Math.sin(J);return this.set(1,0,0,0,0,Z,-W,0,0,W,Z,0,0,0,0,1),this}makeRotationY(J){let Z=Math.cos(J),W=Math.sin(J);return this.set(Z,0,W,0,0,1,0,0,-W,0,Z,0,0,0,0,1),this}makeRotationZ(J){let Z=Math.cos(J),W=Math.sin(J);return this.set(Z,-W,0,0,W,Z,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Z){let W=Math.cos(Z),Q=Math.sin(Z),Y=1-W,X=J.x,H=J.y,U=J.z,G=Y*X,K=Y*H;return this.set(G*X+W,G*H-Q*U,G*U+Q*H,0,G*H+Q*U,K*H+W,K*U-Q*X,0,G*U-Q*H,K*U+Q*X,Y*U*U+W,0,0,0,0,1),this}makeScale(J,Z,W){return this.set(J,0,0,0,0,Z,0,0,0,0,W,0,0,0,0,1),this}makeShear(J,Z,W,Q,Y,X){return this.set(1,W,Y,0,J,1,X,0,Z,Q,1,0,0,0,0,1),this}compose(J,Z,W){let Q=this.elements,Y=Z._x,X=Z._y,H=Z._z,U=Z._w,G=Y+Y,K=X+X,O=H+H,F=Y*G,q=Y*K,R=Y*O,L=X*K,w=X*O,N=H*O,$=U*G,B=U*K,_=U*O,z=W.x,P=W.y,D=W.z;return Q[0]=(1-(L+N))*z,Q[1]=(q+_)*z,Q[2]=(R-B)*z,Q[3]=0,Q[4]=(q-_)*P,Q[5]=(1-(F+N))*P,Q[6]=(w+$)*P,Q[7]=0,Q[8]=(R+B)*D,Q[9]=(w-$)*D,Q[10]=(1-(F+L))*D,Q[11]=0,Q[12]=J.x,Q[13]=J.y,Q[14]=J.z,Q[15]=1,this}decompose(J,Z,W){let Q=this.elements;J.x=Q[12],J.y=Q[13],J.z=Q[14];let Y=this.determinantAffine();if(Y===0)return W.set(1,1,1),Z.identity(),this;let X=JW.set(Q[0],Q[1],Q[2]).length(),H=JW.set(Q[4],Q[5],Q[6]).length(),U=JW.set(Q[8],Q[9],Q[10]).length();if(Y<0)X=-X;B6.copy(this);let G=1/X,K=1/H,O=1/U;return B6.elements[0]*=G,B6.elements[1]*=G,B6.elements[2]*=G,B6.elements[4]*=K,B6.elements[5]*=K,B6.elements[6]*=K,B6.elements[8]*=O,B6.elements[9]*=O,B6.elements[10]*=O,Z.setFromRotationMatrix(B6),W.x=X,W.y=H,W.z=U,this}makePerspective(J,Z,W,Q,Y,X,H=2000,U=!1){let G=this.elements,K=2*Y/(Z-J),O=2*Y/(W-Q),F=(Z+J)/(Z-J),q=(W+Q)/(W-Q),R,L;if(U)R=Y/(X-Y),L=X*Y/(X-Y);else if(H===2000)R=-(X+Y)/(X-Y),L=-2*X*Y/(X-Y);else if(H===2001)R=-X/(X-Y),L=-X*Y/(X-Y);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return G[0]=K,G[4]=0,G[8]=F,G[12]=0,G[1]=0,G[5]=O,G[9]=q,G[13]=0,G[2]=0,G[6]=0,G[10]=R,G[14]=L,G[3]=0,G[7]=0,G[11]=-1,G[15]=0,this}makeOrthographic(J,Z,W,Q,Y,X,H=2000,U=!1){let G=this.elements,K=2/(Z-J),O=2/(W-Q),F=-(Z+J)/(Z-J),q=-(W+Q)/(W-Q),R,L;if(U)R=1/(X-Y),L=X/(X-Y);else if(H===2000)R=-2/(X-Y),L=-(X+Y)/(X-Y);else if(H===2001)R=-1/(X-Y),L=-Y/(X-Y);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return G[0]=K,G[4]=0,G[8]=0,G[12]=F,G[1]=0,G[5]=O,G[9]=0,G[13]=q,G[2]=0,G[6]=0,G[10]=R,G[14]=L,G[3]=0,G[7]=0,G[11]=0,G[15]=1,this}equals(J){let Z=this.elements,W=J.elements;for(let Q=0;Q<16;Q++)if(Z[Q]!==W[Q])return!1;return!0}fromArray(J,Z=0){for(let W=0;W<16;W++)this.elements[W]=J[W+Z];return this}toArray(J=[],Z=0){let W=this.elements;return J[Z]=W[0],J[Z+1]=W[1],J[Z+2]=W[2],J[Z+3]=W[3],J[Z+4]=W[4],J[Z+5]=W[5],J[Z+6]=W[6],J[Z+7]=W[7],J[Z+8]=W[8],J[Z+9]=W[9],J[Z+10]=W[10],J[Z+11]=W[11],J[Z+12]=W[12],J[Z+13]=W[13],J[Z+14]=W[14],J[Z+15]=W[15],J}}var JW=new v,B6=new jJ,eA=new v(0,0,0),J_=new v(1,1,1),o8=new v,yX=new v,i7=new v,$M=new jJ,OM=new L8;class Z9{constructor(J=0,Z=0,W=0,Q=Z9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Z,this._z=W,this._order=Q}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Z,W,Q=this._order){return this._x=J,this._y=Z,this._z=W,this._order=Q,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Z=this._order,W=!0){let Q=J.elements,Y=Q[0],X=Q[4],H=Q[8],U=Q[1],G=Q[5],K=Q[9],O=Q[2],F=Q[6],q=Q[10];switch(Z){case"XYZ":if(this._y=Math.asin(o0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-K,q),this._z=Math.atan2(-X,Y);else this._x=Math.atan2(F,G),this._z=0;break;case"YXZ":if(this._x=Math.asin(-o0(K,-1,1)),Math.abs(K)<0.9999999)this._y=Math.atan2(H,q),this._z=Math.atan2(U,G);else this._y=Math.atan2(-O,Y),this._z=0;break;case"ZXY":if(this._x=Math.asin(o0(F,-1,1)),Math.abs(F)<0.9999999)this._y=Math.atan2(-O,q),this._z=Math.atan2(-X,G);else this._y=0,this._z=Math.atan2(U,Y);break;case"ZYX":if(this._y=Math.asin(-o0(O,-1,1)),Math.abs(O)<0.9999999)this._x=Math.atan2(F,q),this._z=Math.atan2(U,Y);else this._x=0,this._z=Math.atan2(-X,G);break;case"YZX":if(this._z=Math.asin(o0(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(-K,G),this._y=Math.atan2(-O,Y);else this._x=0,this._y=Math.atan2(H,q);break;case"XZY":if(this._z=Math.asin(-o0(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(F,G),this._y=Math.atan2(H,Y);else this._x=Math.atan2(-K,q),this._y=0;break;default:j0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Z)}if(this._order=Z,W===!0)this._onChangeCallback();return this}setFromQuaternion(J,Z,W){return $M.makeRotationFromQuaternion(J),this.setFromRotationMatrix($M,Z,W)}setFromVector3(J,Z=this._order){return this.set(J.x,J.y,J.z,Z)}reorder(J){return OM.setFromEuler(this),this.setFromQuaternion(OM,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Z=0){return J[Z]=this._x,J[Z+1]=this._y,J[Z+2]=this._z,J[Z+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Z9.DEFAULT_ORDER="XYZ";class _H{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var Z_=0,RM=new v,ZW=new L8,U8=new jJ,vX=new v,yQ=new v,W_=new v,Q_=new L8,FM=new v(1,0,0),MM=new v(0,1,0),NM=new v(0,0,1),LM={type:"added"},Y_={type:"removed"},WW={type:"childadded",child:null},uK={type:"childremoved",child:null};class L7 extends N8{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=iQ(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=L7.DEFAULT_UP.clone();let J=new v,Z=new Z9,W=new L8,Q=new v(1,1,1);function Y(){W.setFromEuler(Z,!1)}function X(){Z.setFromQuaternion(W,void 0,!1)}Z._onChange(Y),W._onChange(X),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Z},quaternion:{configurable:!0,enumerable:!0,value:W},scale:{configurable:!0,enumerable:!0,value:Q},modelViewMatrix:{value:new jJ},normalMatrix:{value:new v0}}),this.matrix=new jJ,this.matrixWorld=new jJ,this.matrixAutoUpdate=L7.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=L7.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _H,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Z){this.quaternion.setFromAxisAngle(J,Z)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Z){return ZW.setFromAxisAngle(J,Z),this.quaternion.multiply(ZW),this}rotateOnWorldAxis(J,Z){return ZW.setFromAxisAngle(J,Z),this.quaternion.premultiply(ZW),this}rotateX(J){return this.rotateOnAxis(FM,J)}rotateY(J){return this.rotateOnAxis(MM,J)}rotateZ(J){return this.rotateOnAxis(NM,J)}translateOnAxis(J,Z){return RM.copy(J).applyQuaternion(this.quaternion),this.position.add(RM.multiplyScalar(Z)),this}translateX(J){return this.translateOnAxis(FM,J)}translateY(J){return this.translateOnAxis(MM,J)}translateZ(J){return this.translateOnAxis(NM,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(U8.copy(this.matrixWorld).invert())}lookAt(J,Z,W){if(J.isVector3)vX.copy(J);else vX.set(J,Z,W);let Q=this.parent;if(this.updateWorldMatrix(!0,!1),yQ.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)U8.lookAt(yQ,vX,this.up);else U8.lookAt(vX,yQ,this.up);if(this.quaternion.setFromRotationMatrix(U8),Q)U8.extractRotation(Q.matrixWorld),ZW.setFromRotationMatrix(U8),this.quaternion.premultiply(ZW.invert())}add(J){if(arguments.length>1){for(let Z=0;Z<arguments.length;Z++)this.add(arguments[Z]);return this}if(J===this)return b0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(LM),WW.child=J,this.dispatchEvent(WW),WW.child=null;else b0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let W=0;W<arguments.length;W++)this.remove(arguments[W]);return this}let Z=this.children.indexOf(J);if(Z!==-1)J.parent=null,this.children.splice(Z,1),J.dispatchEvent(Y_),uK.child=J,this.dispatchEvent(uK),uK.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),U8.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),U8.multiply(J.parent.matrixWorld);return J.applyMatrix4(U8),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(LM),WW.child=J,this.dispatchEvent(WW),WW.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Z){if(this[J]===Z)return this;for(let W=0,Q=this.children.length;W<Q;W++){let X=this.children[W].getObjectByProperty(J,Z);if(X!==void 0)return X}return}getObjectsByProperty(J,Z,W=[]){if(this[J]===Z)W.push(this);let Q=this.children;for(let Y=0,X=Q.length;Y<X;Y++)Q[Y].getObjectsByProperty(J,Z,W);return W}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yQ,J,W_),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yQ,Q_,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Z=this.matrixWorld.elements;return J.set(Z[8],Z[9],Z[10]).normalize()}raycast(){}traverse(J){J(this);let Z=this.children;for(let W=0,Q=Z.length;W<Q;W++)Z[W].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Z=this.children;for(let W=0,Q=Z.length;W<Q;W++)Z[W].traverseVisible(J)}traverseAncestors(J){let Z=this.parent;if(Z!==null)J(Z),Z.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Z,y:W,z:Q}=J,Y=this.matrix.elements;Y[12]+=Z-Y[0]*Z-Y[4]*W-Y[8]*Q,Y[13]+=W-Y[1]*Z-Y[5]*W-Y[9]*Q,Y[14]+=Q-Y[2]*Z-Y[6]*W-Y[10]*Q}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Z=this.children;for(let W=0,Q=Z.length;W<Q;W++)Z[W].updateMatrixWorld(J)}updateWorldMatrix(J,Z,W=!1){let Q=this.parent;if(J===!0&&Q!==null)Q.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||W){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,W=!0}if(Z===!0){let Y=this.children;for(let X=0,H=Y.length;X<H;X++)Y[X].updateWorldMatrix(!1,!0,W)}}toJSON(J){let Z=J===void 0||typeof J==="string",W={};if(Z)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},W.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Q={};if(Q.uuid=this.uuid,Q.type=this.type,this.name!=="")Q.name=this.name;if(this.castShadow===!0)Q.castShadow=!0;if(this.receiveShadow===!0)Q.receiveShadow=!0;if(this.visible===!1)Q.visible=!1;if(this.frustumCulled===!1)Q.frustumCulled=!1;if(this.renderOrder!==0)Q.renderOrder=this.renderOrder;if(this.static!==!1)Q.static=this.static;if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(Q.layers=this.layers.mask,Q.matrix=this.matrix.toArray(),Q.up=this.up.toArray(),this.pivot!==null)Q.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)Q.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)Q.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Q.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Q.type="InstancedMesh",Q.count=this.count,Q.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Q.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Q.type="BatchedMesh",Q.perObjectFrustumCulled=this.perObjectFrustumCulled,Q.sortObjects=this.sortObjects,Q.drawRanges=this._drawRanges,Q.reservedRanges=this._reservedRanges,Q.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),Q.instanceInfo=this._instanceInfo.map((H)=>({...H})),Q.availableInstanceIds=this._availableInstanceIds.slice(),Q.availableGeometryIds=this._availableGeometryIds.slice(),Q.nextIndexStart=this._nextIndexStart,Q.nextVertexStart=this._nextVertexStart,Q.geometryCount=this._geometryCount,Q.maxInstanceCount=this._maxInstanceCount,Q.maxVertexCount=this._maxVertexCount,Q.maxIndexCount=this._maxIndexCount,Q.geometryInitialized=this._geometryInitialized,Q.matricesTexture=this._matricesTexture.toJSON(J),Q.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Q.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Q.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Q.boundingBox=this.boundingBox.toJSON()}function Y(H,U){if(H[U.uuid]===void 0)H[U.uuid]=U.toJSON(J);return U.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Q.background=this.background.toJSON();else if(this.background.isTexture)Q.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Q.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Q.geometry=Y(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let U=H.shapes;if(Array.isArray(U))for(let G=0,K=U.length;G<K;G++){let O=U[G];Y(J.shapes,O)}else Y(J.shapes,U)}}if(this.isSkinnedMesh){if(Q.bindMode=this.bindMode,Q.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)Y(J.skeletons,this.skeleton),Q.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let U=0,G=this.material.length;U<G;U++)H.push(Y(J.materials,this.material[U]));Q.material=H}else Q.material=Y(J.materials,this.material);if(this.children.length>0){Q.children=[];for(let H=0;H<this.children.length;H++)Q.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){Q.animations=[];for(let H=0;H<this.animations.length;H++){let U=this.animations[H];Q.animations.push(Y(J.animations,U))}}if(Z){let H=X(J.geometries),U=X(J.materials),G=X(J.textures),K=X(J.images),O=X(J.shapes),F=X(J.skeletons),q=X(J.animations),R=X(J.nodes);if(H.length>0)W.geometries=H;if(U.length>0)W.materials=U;if(G.length>0)W.textures=G;if(K.length>0)W.images=K;if(O.length>0)W.shapes=O;if(F.length>0)W.skeletons=F;if(q.length>0)W.animations=q;if(R.length>0)W.nodes=R}return W.object=Q,W;function X(H){let U=[];for(let G in H){let K=H[G];delete K.metadata,U.push(K)}return U}}clone(J){return new this.constructor().copy(this,J)}copy(J,Z=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Z===!0)for(let W=0;W<J.children.length;W++){let Q=J.children[W];this.add(Q.clone())}return this}}L7.DEFAULT_UP=new v(0,1,0);L7.DEFAULT_MATRIX_AUTO_UPDATE=!0;L7.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class $W extends L7{constructor(){super();this.isGroup=!0,this.type="Group"}}var X_={type:"move"};class nQ{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new $W,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new $W,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new v,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new v;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new $W,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new v,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new v,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Z=this._hand;if(Z)for(let W of J.hand.values())this._getHandJoint(Z,W)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Z,W){let Q=null,Y=null,X=null,H=this._targetRay,U=this._grip,G=this._hand;if(J&&Z.session.visibilityState!=="visible-blurred"){if(G&&J.hand){X=!0;for(let L of J.hand.values()){let w=Z.getJointPose(L,W),N=this._getHandJoint(G,L);if(w!==null)N.matrix.fromArray(w.transform.matrix),N.matrix.decompose(N.position,N.rotation,N.scale),N.matrixWorldNeedsUpdate=!0,N.jointRadius=w.radius;N.visible=w!==null}let K=G.joints["index-finger-tip"],O=G.joints["thumb-tip"],F=K.position.distanceTo(O.position),q=0.02,R=0.005;if(G.inputState.pinching&&F>q+R)G.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!G.inputState.pinching&&F<=q-R)G.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(U!==null&&J.gripSpace){if(Y=Z.getPose(J.gripSpace,W),Y!==null){if(U.matrix.fromArray(Y.transform.matrix),U.matrix.decompose(U.position,U.rotation,U.scale),U.matrixWorldNeedsUpdate=!0,Y.linearVelocity)U.hasLinearVelocity=!0,U.linearVelocity.copy(Y.linearVelocity);else U.hasLinearVelocity=!1;if(Y.angularVelocity)U.hasAngularVelocity=!0,U.angularVelocity.copy(Y.angularVelocity);else U.hasAngularVelocity=!1;if(U.eventsEnabled)U.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(Q=Z.getPose(J.targetRaySpace,W),Q===null&&Y!==null)Q=Y;if(Q!==null){if(H.matrix.fromArray(Q.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,Q.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(Q.linearVelocity);else H.hasLinearVelocity=!1;if(Q.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(Q.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(X_)}}}if(H!==null)H.visible=Q!==null;if(U!==null)U.visible=Y!==null;if(G!==null)G.visible=X!==null;return this}_getHandJoint(J,Z){if(J.joints[Z.jointName]===void 0){let W=new $W;W.matrixAutoUpdate=!1,W.visible=!1,J.joints[Z.jointName]=W,J.add(W)}return J.joints[Z.jointName]}}var fN={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},a8={h:0,s:0,l:0},xX={h:0,s:0,l:0};function lK(J,Z,W){if(W<0)W+=1;if(W>1)W-=1;if(W<0.16666666666666666)return J+(Z-J)*6*W;if(W<0.5)return Z;if(W<0.6666666666666666)return J+(Z-J)*6*(0.6666666666666666-W);return J}class a0{constructor(J,Z,W){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Z,W)}set(J,Z,W){if(Z===void 0&&W===void 0){let Q=J;if(Q&&Q.isColor)this.copy(Q);else if(typeof Q==="number")this.setHex(Q);else if(typeof Q==="string")this.setStyle(Q)}else this.setRGB(J,Z,W);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Z="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,WJ.colorSpaceToWorking(this,Z),this}setRGB(J,Z,W,Q=WJ.workingColorSpace){return this.r=J,this.g=Z,this.b=W,WJ.colorSpaceToWorking(this,Q),this}setHSL(J,Z,W,Q=WJ.workingColorSpace){if(J=oA(J,1),Z=o0(Z,0,1),W=o0(W,0,1),Z===0)this.r=this.g=this.b=W;else{let Y=W<=0.5?W*(1+Z):W+Z-W*Z,X=2*W-Y;this.r=lK(X,Y,J+0.3333333333333333),this.g=lK(X,Y,J),this.b=lK(X,Y,J-0.3333333333333333)}return WJ.colorSpaceToWorking(this,Q),this}setStyle(J,Z="srgb"){function W(Y){if(Y===void 0)return;if(parseFloat(Y)<1)j0("Color: Alpha component of "+J+" will be ignored.")}let Q;if(Q=/^(\w+)\(([^\)]*)\)/.exec(J)){let Y,X=Q[1],H=Q[2];switch(X){case"rgb":case"rgba":if(Y=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return W(Y[4]),this.setRGB(Math.min(255,parseInt(Y[1],10))/255,Math.min(255,parseInt(Y[2],10))/255,Math.min(255,parseInt(Y[3],10))/255,Z);if(Y=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return W(Y[4]),this.setRGB(Math.min(100,parseInt(Y[1],10))/100,Math.min(100,parseInt(Y[2],10))/100,Math.min(100,parseInt(Y[3],10))/100,Z);break;case"hsl":case"hsla":if(Y=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return W(Y[4]),this.setHSL(parseFloat(Y[1])/360,parseFloat(Y[2])/100,parseFloat(Y[3])/100,Z);break;default:j0("Color: Unknown color model "+J)}}else if(Q=/^\#([A-Fa-f\d]+)$/.exec(J)){let Y=Q[1],X=Y.length;if(X===3)return this.setRGB(parseInt(Y.charAt(0),16)/15,parseInt(Y.charAt(1),16)/15,parseInt(Y.charAt(2),16)/15,Z);else if(X===6)return this.setHex(parseInt(Y,16),Z);else j0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Z);return this}setColorName(J,Z="srgb"){let W=fN[J.toLowerCase()];if(W!==void 0)this.setHex(W,Z);else j0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=R8(J.r),this.g=R8(J.g),this.b=R8(J.b),this}copyLinearToSRGB(J){return this.r=OW(J.r),this.g=OW(J.g),this.b=OW(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return WJ.workingToColorSpace(M7.copy(this),J),Math.round(o0(M7.r*255,0,255))*65536+Math.round(o0(M7.g*255,0,255))*256+Math.round(o0(M7.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Z=WJ.workingColorSpace){WJ.workingToColorSpace(M7.copy(this),Z);let{r:W,g:Q,b:Y}=M7,X=Math.max(W,Q,Y),H=Math.min(W,Q,Y),U,G,K=(H+X)/2;if(H===X)U=0,G=0;else{let O=X-H;switch(G=K<=0.5?O/(X+H):O/(2-X-H),X){case W:U=(Q-Y)/O+(Q<Y?6:0);break;case Q:U=(Y-W)/O+2;break;case Y:U=(W-Q)/O+4;break}U/=6}return J.h=U,J.s=G,J.l=K,J}getRGB(J,Z=WJ.workingColorSpace){return WJ.workingToColorSpace(M7.copy(this),Z),J.r=M7.r,J.g=M7.g,J.b=M7.b,J}getStyle(J="srgb"){WJ.workingToColorSpace(M7.copy(this),J);let{r:Z,g:W,b:Q}=M7;if(J!=="srgb")return`color(${J} ${Z.toFixed(3)} ${W.toFixed(3)} ${Q.toFixed(3)})`;return`rgb(${Math.round(Z*255)},${Math.round(W*255)},${Math.round(Q*255)})`}offsetHSL(J,Z,W){return this.getHSL(a8),this.setHSL(a8.h+J,a8.s+Z,a8.l+W)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Z){return this.r=J.r+Z.r,this.g=J.g+Z.g,this.b=J.b+Z.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Z){return this.r+=(J.r-this.r)*Z,this.g+=(J.g-this.g)*Z,this.b+=(J.b-this.b)*Z,this}lerpColors(J,Z,W){return this.r=J.r+(Z.r-J.r)*W,this.g=J.g+(Z.g-J.g)*W,this.b=J.b+(Z.b-J.b)*W,this}lerpHSL(J,Z){this.getHSL(a8),J.getHSL(xX);let W=hK(a8.h,xX.h,Z),Q=hK(a8.s,xX.s,Z),Y=hK(a8.l,xX.l,Z);return this.setHSL(W,Q,Y),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Z=this.r,W=this.g,Q=this.b,Y=J.elements;return this.r=Y[0]*Z+Y[3]*W+Y[6]*Q,this.g=Y[1]*Z+Y[4]*W+Y[7]*Q,this.b=Y[2]*Z+Y[5]*W+Y[8]*Q,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Z=0){return this.r=J[Z],this.g=J[Z+1],this.b=J[Z+2],this}toArray(J=[],Z=0){return J[Z]=this.r,J[Z+1]=this.g,J[Z+2]=this.b,J}fromBufferAttribute(J,Z){return this.r=J.getX(Z),this.g=J.getY(Z),this.b=J.getZ(Z),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var M7=new a0;a0.NAMES=fN;class IH extends L7{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Z9,this.environmentIntensity=1,this.environmentRotation=new Z9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Z){if(super.copy(J,Z),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Z=super.toJSON(J);if(this.fog!==null)Z.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Z.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Z.object.backgroundIntensity=this.backgroundIntensity;if(Z.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Z.object.environmentIntensity=this.environmentIntensity;return Z.object.environmentRotation=this.environmentRotation.toArray(),Z}}var z6=new v,G8=new v,cK=new v,K8=new v,QW=new v,YW=new v,BM=new v,iK=new v,sK=new v,nK=new v,oK=new bJ,aK=new bJ,rK=new bJ;class q6{constructor(J=new v,Z=new v,W=new v){this.a=J,this.b=Z,this.c=W}static getNormal(J,Z,W,Q){Q.subVectors(W,Z),z6.subVectors(J,Z),Q.cross(z6);let Y=Q.lengthSq();if(Y>0)return Q.multiplyScalar(1/Math.sqrt(Y));return Q.set(0,0,0)}static getBarycoord(J,Z,W,Q,Y){z6.subVectors(Q,Z),G8.subVectors(W,Z),cK.subVectors(J,Z);let X=z6.dot(z6),H=z6.dot(G8),U=z6.dot(cK),G=G8.dot(G8),K=G8.dot(cK),O=X*G-H*H;if(O===0)return Y.set(0,0,0),null;let F=1/O,q=(G*U-H*K)*F,R=(X*K-H*U)*F;return Y.set(1-q-R,R,q)}static containsPoint(J,Z,W,Q){if(this.getBarycoord(J,Z,W,Q,K8)===null)return!1;return K8.x>=0&&K8.y>=0&&K8.x+K8.y<=1}static getInterpolation(J,Z,W,Q,Y,X,H,U){if(this.getBarycoord(J,Z,W,Q,K8)===null){if(U.x=0,U.y=0,"z"in U)U.z=0;if("w"in U)U.w=0;return null}return U.setScalar(0),U.addScaledVector(Y,K8.x),U.addScaledVector(X,K8.y),U.addScaledVector(H,K8.z),U}static getInterpolatedAttribute(J,Z,W,Q,Y,X){return oK.setScalar(0),aK.setScalar(0),rK.setScalar(0),oK.fromBufferAttribute(J,Z),aK.fromBufferAttribute(J,W),rK.fromBufferAttribute(J,Q),X.setScalar(0),X.addScaledVector(oK,Y.x),X.addScaledVector(aK,Y.y),X.addScaledVector(rK,Y.z),X}static isFrontFacing(J,Z,W,Q){return z6.subVectors(W,Z),G8.subVectors(J,Z),z6.cross(G8).dot(Q)<0}set(J,Z,W){return this.a.copy(J),this.b.copy(Z),this.c.copy(W),this}setFromPointsAndIndices(J,Z,W,Q){return this.a.copy(J[Z]),this.b.copy(J[W]),this.c.copy(J[Q]),this}setFromAttributeAndIndices(J,Z,W,Q){return this.a.fromBufferAttribute(J,Z),this.b.fromBufferAttribute(J,W),this.c.fromBufferAttribute(J,Q),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return z6.subVectors(this.c,this.b),G8.subVectors(this.a,this.b),z6.cross(G8).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return q6.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Z){return q6.getBarycoord(J,this.a,this.b,this.c,Z)}getInterpolation(J,Z,W,Q,Y){return q6.getInterpolation(J,this.a,this.b,this.c,Z,W,Q,Y)}containsPoint(J){return q6.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return q6.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Z){let W=this.a,Q=this.b,Y=this.c,X,H;QW.subVectors(Q,W),YW.subVectors(Y,W),iK.subVectors(J,W);let U=QW.dot(iK),G=YW.dot(iK);if(U<=0&&G<=0)return Z.copy(W);sK.subVectors(J,Q);let K=QW.dot(sK),O=YW.dot(sK);if(K>=0&&O<=K)return Z.copy(Q);let F=U*O-K*G;if(F<=0&&U>=0&&K<=0)return X=U/(U-K),Z.copy(W).addScaledVector(QW,X);nK.subVectors(J,Y);let q=QW.dot(nK),R=YW.dot(nK);if(R>=0&&q<=R)return Z.copy(Y);let L=q*G-U*R;if(L<=0&&G>=0&&R<=0)return H=G/(G-R),Z.copy(W).addScaledVector(YW,H);let w=K*R-q*O;if(w<=0&&O-K>=0&&q-R>=0)return BM.subVectors(Y,Q),H=(O-K)/(O-K+(q-R)),Z.copy(Q).addScaledVector(BM,H);let N=1/(w+L+F);return X=L*N,H=F*N,Z.copy(W).addScaledVector(QW,X).addScaledVector(YW,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class d9{constructor(J=new v(1/0,1/0,1/0),Z=new v(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Z}set(J,Z){return this.min.copy(J),this.max.copy(Z),this}setFromArray(J){this.makeEmpty();for(let Z=0,W=J.length;Z<W;Z+=3)this.expandByPoint(A6.fromArray(J,Z));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Z=0,W=J.count;Z<W;Z++)this.expandByPoint(A6.fromBufferAttribute(J,Z));return this}setFromPoints(J){this.makeEmpty();for(let Z=0,W=J.length;Z<W;Z++)this.expandByPoint(J[Z]);return this}setFromCenterAndSize(J,Z){let W=A6.copy(Z).multiplyScalar(0.5);return this.min.copy(J).sub(W),this.max.copy(J).add(W),this}setFromObject(J,Z=!1){return this.makeEmpty(),this.expandByObject(J,Z)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Z=!1){J.updateWorldMatrix(!1,!1);let W=J.geometry;if(W!==void 0){let Y=W.getAttribute("position");if(Z===!0&&Y!==void 0&&J.isInstancedMesh!==!0)for(let X=0,H=Y.count;X<H;X++){if(J.isMesh===!0)J.getVertexPosition(X,A6);else A6.fromBufferAttribute(Y,X);A6.applyMatrix4(J.matrixWorld),this.expandByPoint(A6)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();hX.copy(J.boundingBox)}else{if(W.boundingBox===null)W.computeBoundingBox();hX.copy(W.boundingBox)}hX.applyMatrix4(J.matrixWorld),this.union(hX)}}let Q=J.children;for(let Y=0,X=Q.length;Y<X;Y++)this.expandByObject(Q[Y],Z);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Z){return Z.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,A6),A6.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Z,W;if(J.normal.x>0)Z=J.normal.x*this.min.x,W=J.normal.x*this.max.x;else Z=J.normal.x*this.max.x,W=J.normal.x*this.min.x;if(J.normal.y>0)Z+=J.normal.y*this.min.y,W+=J.normal.y*this.max.y;else Z+=J.normal.y*this.max.y,W+=J.normal.y*this.min.y;if(J.normal.z>0)Z+=J.normal.z*this.min.z,W+=J.normal.z*this.max.z;else Z+=J.normal.z*this.max.z,W+=J.normal.z*this.min.z;return Z<=-J.constant&&W>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(vQ),gX.subVectors(this.max,vQ),XW.subVectors(J.a,vQ),HW.subVectors(J.b,vQ),UW.subVectors(J.c,vQ),r8.subVectors(HW,XW),t8.subVectors(UW,HW),S9.subVectors(XW,UW);let Z=[0,-r8.z,r8.y,0,-t8.z,t8.y,0,-S9.z,S9.y,r8.z,0,-r8.x,t8.z,0,-t8.x,S9.z,0,-S9.x,-r8.y,r8.x,0,-t8.y,t8.x,0,-S9.y,S9.x,0];if(!tK(Z,XW,HW,UW,gX))return!1;if(Z=[1,0,0,0,1,0,0,0,1],!tK(Z,XW,HW,UW,gX))return!1;return mX.crossVectors(r8,t8),Z=[mX.x,mX.y,mX.z],tK(Z,XW,HW,UW,gX)}clampPoint(J,Z){return Z.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,A6).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(A6).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return q8[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),q8[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),q8[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),q8[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),q8[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),q8[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),q8[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),q8[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(q8),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var q8=[new v,new v,new v,new v,new v,new v,new v,new v],A6=new v,hX=new d9,XW=new v,HW=new v,UW=new v,r8=new v,t8=new v,S9=new v,vQ=new v,gX=new v,mX=new v,j9=new v;function tK(J,Z,W,Q,Y){for(let X=0,H=J.length-3;X<=H;X+=3){j9.fromArray(J,X);let U=Y.x*Math.abs(j9.x)+Y.y*Math.abs(j9.y)+Y.z*Math.abs(j9.z),G=Z.dot(j9),K=W.dot(j9),O=Q.dot(j9);if(Math.max(-Math.max(G,K,O),Math.min(G,K,O))>U)return!1}return!0}var rJ=new v,pX=new XJ,H_=0;class mJ extends N8{constructor(J,Z,W=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:H_++}),this.name="",this.array=J,this.itemSize=Z,this.count=J!==void 0?J.length/Z:0,this.normalized=W,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Z){this.updateRanges.push({start:J,count:Z})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Z,W){J*=this.itemSize,W*=Z.itemSize;for(let Q=0,Y=this.itemSize;Q<Y;Q++)this.array[J+Q]=Z.array[W+Q];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Z=0,W=this.count;Z<W;Z++)pX.fromBufferAttribute(this,Z),pX.applyMatrix3(J),this.setXY(Z,pX.x,pX.y);else if(this.itemSize===3)for(let Z=0,W=this.count;Z<W;Z++)rJ.fromBufferAttribute(this,Z),rJ.applyMatrix3(J),this.setXYZ(Z,rJ.x,rJ.y,rJ.z);return this}applyMatrix4(J){for(let Z=0,W=this.count;Z<W;Z++)rJ.fromBufferAttribute(this,Z),rJ.applyMatrix4(J),this.setXYZ(Z,rJ.x,rJ.y,rJ.z);return this}applyNormalMatrix(J){for(let Z=0,W=this.count;Z<W;Z++)rJ.fromBufferAttribute(this,Z),rJ.applyNormalMatrix(J),this.setXYZ(Z,rJ.x,rJ.y,rJ.z);return this}transformDirection(J){for(let Z=0,W=this.count;Z<W;Z++)rJ.fromBufferAttribute(this,Z),rJ.transformDirection(J),this.setXYZ(Z,rJ.x,rJ.y,rJ.z);return this}set(J,Z=0){return this.array.set(J,Z),this}getComponent(J,Z){let W=this.array[J*this.itemSize+Z];if(this.normalized)W=bQ(W,this.array);return W}setComponent(J,Z,W){if(this.normalized)W=E7(W,this.array);return this.array[J*this.itemSize+Z]=W,this}getX(J){let Z=this.array[J*this.itemSize];if(this.normalized)Z=bQ(Z,this.array);return Z}setX(J,Z){if(this.normalized)Z=E7(Z,this.array);return this.array[J*this.itemSize]=Z,this}getY(J){let Z=this.array[J*this.itemSize+1];if(this.normalized)Z=bQ(Z,this.array);return Z}setY(J,Z){if(this.normalized)Z=E7(Z,this.array);return this.array[J*this.itemSize+1]=Z,this}getZ(J){let Z=this.array[J*this.itemSize+2];if(this.normalized)Z=bQ(Z,this.array);return Z}setZ(J,Z){if(this.normalized)Z=E7(Z,this.array);return this.array[J*this.itemSize+2]=Z,this}getW(J){let Z=this.array[J*this.itemSize+3];if(this.normalized)Z=bQ(Z,this.array);return Z}setW(J,Z){if(this.normalized)Z=E7(Z,this.array);return this.array[J*this.itemSize+3]=Z,this}setXY(J,Z,W){if(J*=this.itemSize,this.normalized)Z=E7(Z,this.array),W=E7(W,this.array);return this.array[J+0]=Z,this.array[J+1]=W,this}setXYZ(J,Z,W,Q){if(J*=this.itemSize,this.normalized)Z=E7(Z,this.array),W=E7(W,this.array),Q=E7(Q,this.array);return this.array[J+0]=Z,this.array[J+1]=W,this.array[J+2]=Q,this}setXYZW(J,Z,W,Q,Y){if(J*=this.itemSize,this.normalized)Z=E7(Z,this.array),W=E7(W,this.array),Q=E7(Q,this.array),Y=E7(Y,this.array);return this.array[J+0]=Z,this.array[J+1]=W,this.array[J+2]=Q,this.array[J+3]=Y,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class wH extends mJ{constructor(J,Z,W){super(new Uint16Array(J),Z,W)}}class DH extends mJ{constructor(J,Z,W){super(new Uint32Array(J),Z,W)}}class n7 extends mJ{constructor(J,Z,W){super(new Float32Array(J),Z,W)}}var U_=new d9,xQ=new v,eK=new v;class u9{constructor(J=new v,Z=-1){this.isSphere=!0,this.center=J,this.radius=Z}set(J,Z){return this.center.copy(J),this.radius=Z,this}setFromPoints(J,Z){let W=this.center;if(Z!==void 0)W.copy(Z);else U_.setFromPoints(J).getCenter(W);let Q=0;for(let Y=0,X=J.length;Y<X;Y++)Q=Math.max(Q,W.distanceToSquared(J[Y]));return this.radius=Math.sqrt(Q),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Z=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Z*Z}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Z){let W=this.center.distanceToSquared(J);if(Z.copy(J),W>this.radius*this.radius)Z.sub(this.center).normalize(),Z.multiplyScalar(this.radius).add(this.center);return Z}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;xQ.subVectors(J,this.center);let Z=xQ.lengthSq();if(Z>this.radius*this.radius){let W=Math.sqrt(Z),Q=(W-this.radius)*0.5;this.center.addScaledVector(xQ,Q/W),this.radius+=Q}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else eK.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(xQ.copy(J.center).add(eK)),this.expandByPoint(xQ.copy(J.center).sub(eK));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var G_=0,K6=new jJ,J5=new L7,GW=new v,s7=new d9,hQ=new d9,H7=new v;class O7 extends N8{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:G_++}),this.uuid=iQ(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((sA(J))?DH:wH)(J,1);else this.index=J;return this}setIndirect(J,Z=0){return this.indirect=J,this.indirectOffset=Z,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Z){return this.attributes[J]=Z,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Z,W=0){this.groups.push({start:J,count:Z,materialIndex:W})}clearGroups(){this.groups=[]}setDrawRange(J,Z){this.drawRange.start=J,this.drawRange.count=Z}applyMatrix4(J){let Z=this.attributes.position;if(Z!==void 0)Z.applyMatrix4(J),Z.needsUpdate=!0;let W=this.attributes.normal;if(W!==void 0){let Y=new v0().getNormalMatrix(J);W.applyNormalMatrix(Y),W.needsUpdate=!0}let Q=this.attributes.tangent;if(Q!==void 0)Q.transformDirection(J),Q.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return K6.makeRotationFromQuaternion(J),this.applyMatrix4(K6),this}rotateX(J){return K6.makeRotationX(J),this.applyMatrix4(K6),this}rotateY(J){return K6.makeRotationY(J),this.applyMatrix4(K6),this}rotateZ(J){return K6.makeRotationZ(J),this.applyMatrix4(K6),this}translate(J,Z,W){return K6.makeTranslation(J,Z,W),this.applyMatrix4(K6),this}scale(J,Z,W){return K6.makeScale(J,Z,W),this.applyMatrix4(K6),this}lookAt(J){return J5.lookAt(J),J5.updateMatrix(),this.applyMatrix4(J5.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(GW).negate(),this.translate(GW.x,GW.y,GW.z),this}setFromPoints(J){let Z=this.getAttribute("position");if(Z===void 0){let W=[];for(let Q=0,Y=J.length;Q<Y;Q++){let X=J[Q];W.push(X.x,X.y,X.z||0)}this.setAttribute("position",new n7(W,3))}else{let W=Math.min(J.length,Z.count);for(let Q=0;Q<W;Q++){let Y=J[Q];Z.setXYZ(Q,Y.x,Y.y,Y.z||0)}if(J.length>Z.count)j0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Z.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new d9;let J=this.attributes.position,Z=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){b0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new v(-1/0,-1/0,-1/0),new v(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Z)for(let W=0,Q=Z.length;W<Q;W++){let Y=Z[W];if(s7.setFromBufferAttribute(Y),this.morphTargetsRelative)H7.addVectors(this.boundingBox.min,s7.min),this.boundingBox.expandByPoint(H7),H7.addVectors(this.boundingBox.max,s7.max),this.boundingBox.expandByPoint(H7);else this.boundingBox.expandByPoint(s7.min),this.boundingBox.expandByPoint(s7.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))b0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new u9;let J=this.attributes.position,Z=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){b0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new v,1/0);return}if(J){let W=this.boundingSphere.center;if(s7.setFromBufferAttribute(J),Z)for(let Y=0,X=Z.length;Y<X;Y++){let H=Z[Y];if(hQ.setFromBufferAttribute(H),this.morphTargetsRelative)H7.addVectors(s7.min,hQ.min),s7.expandByPoint(H7),H7.addVectors(s7.max,hQ.max),s7.expandByPoint(H7);else s7.expandByPoint(hQ.min),s7.expandByPoint(hQ.max)}s7.getCenter(W);let Q=0;for(let Y=0,X=J.count;Y<X;Y++)H7.fromBufferAttribute(J,Y),Q=Math.max(Q,W.distanceToSquared(H7));if(Z)for(let Y=0,X=Z.length;Y<X;Y++){let H=Z[Y],U=this.morphTargetsRelative;for(let G=0,K=H.count;G<K;G++){if(H7.fromBufferAttribute(H,G),U)GW.fromBufferAttribute(J,G),H7.add(GW);Q=Math.max(Q,W.distanceToSquared(H7))}}if(this.boundingSphere.radius=Math.sqrt(Q),isNaN(this.boundingSphere.radius))b0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Z=this.attributes;if(J===null||Z.position===void 0||Z.normal===void 0||Z.uv===void 0){b0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:W,normal:Q,uv:Y}=Z,X=this.getAttribute("tangent");if(X===void 0||X.count!==W.count)X=new mJ(new Float32Array(4*W.count),4),this.setAttribute("tangent",X);let H=[],U=[];for(let T=0;T<W.count;T++)H[T]=new v,U[T]=new v;let G=new v,K=new v,O=new v,F=new XJ,q=new XJ,R=new XJ,L=new v,w=new v;function N(T,A,C){G.fromBufferAttribute(W,T),K.fromBufferAttribute(W,A),O.fromBufferAttribute(W,C),F.fromBufferAttribute(Y,T),q.fromBufferAttribute(Y,A),R.fromBufferAttribute(Y,C),K.sub(G),O.sub(G),q.sub(F),R.sub(F);let x=1/(q.x*R.y-R.x*q.y);if(!isFinite(x))return;L.copy(K).multiplyScalar(R.y).addScaledVector(O,-q.y).multiplyScalar(x),w.copy(O).multiplyScalar(q.x).addScaledVector(K,-R.x).multiplyScalar(x),H[T].add(L),H[A].add(L),H[C].add(L),U[T].add(w),U[A].add(w),U[C].add(w)}let $=this.groups;if($.length===0)$=[{start:0,count:J.count}];for(let T=0,A=$.length;T<A;++T){let C=$[T],x=C.start,E=C.count;for(let u=x,e=x+E;u<e;u+=3)N(J.getX(u+0),J.getX(u+1),J.getX(u+2))}let B=new v,_=new v,z=new v,P=new v;function D(T){z.fromBufferAttribute(Q,T),P.copy(z);let A=H[T];B.copy(A),B.sub(z.multiplyScalar(z.dot(A))).normalize(),_.crossVectors(P,A);let x=_.dot(U[T])<0?-1:1;X.setXYZW(T,B.x,B.y,B.z,x)}for(let T=0,A=$.length;T<A;++T){let C=$[T],x=C.start,E=C.count;for(let u=x,e=x+E;u<e;u+=3)D(J.getX(u+0)),D(J.getX(u+1)),D(J.getX(u+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Z=this.getAttribute("position");if(Z!==void 0){let W=this.getAttribute("normal");if(W===void 0||W.count!==Z.count)W=new mJ(new Float32Array(Z.count*3),3),this.setAttribute("normal",W);else for(let F=0,q=W.count;F<q;F++)W.setXYZ(F,0,0,0);let Q=new v,Y=new v,X=new v,H=new v,U=new v,G=new v,K=new v,O=new v;if(J)for(let F=0,q=J.count;F<q;F+=3){let R=J.getX(F+0),L=J.getX(F+1),w=J.getX(F+2);Q.fromBufferAttribute(Z,R),Y.fromBufferAttribute(Z,L),X.fromBufferAttribute(Z,w),K.subVectors(X,Y),O.subVectors(Q,Y),K.cross(O),H.fromBufferAttribute(W,R),U.fromBufferAttribute(W,L),G.fromBufferAttribute(W,w),H.add(K),U.add(K),G.add(K),W.setXYZ(R,H.x,H.y,H.z),W.setXYZ(L,U.x,U.y,U.z),W.setXYZ(w,G.x,G.y,G.z)}else for(let F=0,q=Z.count;F<q;F+=3)Q.fromBufferAttribute(Z,F+0),Y.fromBufferAttribute(Z,F+1),X.fromBufferAttribute(Z,F+2),K.subVectors(X,Y),O.subVectors(Q,Y),K.cross(O),W.setXYZ(F+0,K.x,K.y,K.z),W.setXYZ(F+1,K.x,K.y,K.z),W.setXYZ(F+2,K.x,K.y,K.z);this.normalizeNormals(),W.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Z=0,W=J.count;Z<W;Z++)H7.fromBufferAttribute(J,Z),H7.normalize(),J.setXYZ(Z,H7.x,H7.y,H7.z)}toNonIndexed(){function J(H,U){let{array:G,itemSize:K,normalized:O}=H,F=new G.constructor(U.length*K),q=0,R=0;for(let L=0,w=U.length;L<w;L++){if(H.isInterleavedBufferAttribute)q=U[L]*H.data.stride+H.offset;else q=U[L]*K;for(let N=0;N<K;N++)F[R++]=G[q++]}return new mJ(F,K,O)}if(this.index===null)return j0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Z=new O7,W=this.index.array,Q=this.attributes;for(let H in Q){let U=Q[H],G=J(U,W);Z.setAttribute(H,G)}let Y=this.morphAttributes;for(let H in Y){let U=[],G=Y[H];for(let K=0,O=G.length;K<O;K++){let F=G[K],q=J(F,W);U.push(q)}Z.morphAttributes[H]=U}Z.morphTargetsRelative=this.morphTargetsRelative;let X=this.groups;for(let H=0,U=X.length;H<U;H++){let G=X[H];Z.addGroup(G.start,G.count,G.materialIndex)}return Z}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let U=this.parameters;for(let G in U)if(U[G]!==void 0)J[G]=U[G];return J}J.data={attributes:{}};let Z=this.index;if(Z!==null)J.data.index={type:Z.array.constructor.name,array:Array.prototype.slice.call(Z.array)};let W=this.attributes;for(let U in W){let G=W[U];J.data.attributes[U]=G.toJSON(J.data)}let Q={},Y=!1;for(let U in this.morphAttributes){let G=this.morphAttributes[U],K=[];for(let O=0,F=G.length;O<F;O++){let q=G[O];K.push(q.toJSON(J.data))}if(K.length>0)Q[U]=K,Y=!0}if(Y)J.data.morphAttributes=Q,J.data.morphTargetsRelative=this.morphTargetsRelative;let X=this.groups;if(X.length>0)J.data.groups=JSON.parse(JSON.stringify(X));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Z={};this.name=J.name;let W=J.index;if(W!==null)this.setIndex(W.clone());let Q=J.attributes;for(let G in Q){let K=Q[G];this.setAttribute(G,K.clone(Z))}let Y=J.morphAttributes;for(let G in Y){let K=[],O=Y[G];for(let F=0,q=O.length;F<q;F++)K.push(O[F].clone(Z));this.morphAttributes[G]=K}this.morphTargetsRelative=J.morphTargetsRelative;let X=J.groups;for(let G=0,K=X.length;G<K;G++){let O=X[G];this.addGroup(O.start,O.count,O.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let U=J.boundingSphere;if(U!==null)this.boundingSphere=U.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var K_=0;class X9 extends N8{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:K_++}),this.uuid=iQ(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new a0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Z in J){let W=J[Z];if(W===void 0){j0(`Material: parameter '${Z}' has value of undefined.`);continue}let Q=this[Z];if(Q===void 0){j0(`Material: '${Z}' is not a property of THREE.${this.type}.`);continue}if(Q&&Q.isColor)Q.set(W);else if(Q&&Q.isVector2&&(W&&W.isVector2)||Q&&Q.isEuler&&(W&&W.isEuler)||Q&&Q.isVector3&&(W&&W.isVector3))Q.copy(W);else this[Z]=W}}toJSON(J){let Z=J===void 0||typeof J==="string";if(Z)J={textures:{},images:{}};let W={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(W.uuid=this.uuid,W.type=this.type,this.name!=="")W.name=this.name;if(this.color&&this.color.isColor)W.color=this.color.getHex();if(this.roughness!==void 0)W.roughness=this.roughness;if(this.metalness!==void 0)W.metalness=this.metalness;if(this.sheen!==void 0)W.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)W.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)W.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)W.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)W.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)W.specular=this.specular.getHex();if(this.specularIntensity!==void 0)W.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)W.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)W.shininess=this.shininess;if(this.clearcoat!==void 0)W.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)W.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)W.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)W.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)W.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,W.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)W.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)W.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)W.dispersion=this.dispersion;if(this.iridescence!==void 0)W.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)W.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)W.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)W.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)W.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)W.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)W.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)W.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)W.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)W.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)W.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)W.lightMap=this.lightMap.toJSON(J).uuid,W.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)W.aoMap=this.aoMap.toJSON(J).uuid,W.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)W.bumpMap=this.bumpMap.toJSON(J).uuid,W.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)W.normalMap=this.normalMap.toJSON(J).uuid,W.normalMapType=this.normalMapType,W.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)W.displacementMap=this.displacementMap.toJSON(J).uuid,W.displacementScale=this.displacementScale,W.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)W.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)W.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)W.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)W.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)W.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)W.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(W.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)W.combine=this.combine}if(this.envMapRotation!==void 0)W.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)W.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)W.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)W.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)W.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)W.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)W.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)W.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)W.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)W.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)W.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)W.size=this.size;if(this.shadowSide!==null)W.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)W.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)W.blending=this.blending;if(this.side!==0)W.side=this.side;if(this.vertexColors===!0)W.vertexColors=!0;if(this.opacity<1)W.opacity=this.opacity;if(this.transparent===!0)W.transparent=!0;if(this.blendSrc!==204)W.blendSrc=this.blendSrc;if(this.blendDst!==205)W.blendDst=this.blendDst;if(this.blendEquation!==100)W.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)W.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)W.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)W.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)W.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)W.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)W.depthFunc=this.depthFunc;if(this.depthTest===!1)W.depthTest=this.depthTest;if(this.depthWrite===!1)W.depthWrite=this.depthWrite;if(this.colorWrite===!1)W.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)W.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)W.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)W.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)W.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)W.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)W.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)W.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)W.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)W.rotation=this.rotation;if(this.polygonOffset===!0)W.polygonOffset=!0;if(this.polygonOffsetFactor!==0)W.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)W.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)W.linewidth=this.linewidth;if(this.dashSize!==void 0)W.dashSize=this.dashSize;if(this.gapSize!==void 0)W.gapSize=this.gapSize;if(this.scale!==void 0)W.scale=this.scale;if(this.dithering===!0)W.dithering=!0;if(this.alphaTest>0)W.alphaTest=this.alphaTest;if(this.alphaHash===!0)W.alphaHash=!0;if(this.alphaToCoverage===!0)W.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)W.premultipliedAlpha=!0;if(this.forceSinglePass===!0)W.forceSinglePass=!0;if(this.allowOverride===!1)W.allowOverride=!1;if(this.wireframe===!0)W.wireframe=!0;if(this.wireframeLinewidth>1)W.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")W.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")W.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)W.flatShading=!0;if(this.visible===!1)W.visible=!1;if(this.toneMapped===!1)W.toneMapped=!1;if(this.fog===!1)W.fog=!1;if(Object.keys(this.userData).length>0)W.userData=this.userData;function Q(Y){let X=[];for(let H in Y){let U=Y[H];delete U.metadata,X.push(U)}return X}if(Z){let Y=Q(J.textures),X=Q(J.images);if(Y.length>0)W.textures=Y;if(X.length>0)W.images=X}return W}fromJSON(J,Z){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new a0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Z[J.map]||null;if(J.matcap!==void 0)this.matcap=Z[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Z[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Z[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Z[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let W=J.normalScale;if(Array.isArray(W)===!1)W=[W,W];this.normalScale=new XJ().fromArray(W)}if(J.displacementMap!==void 0)this.displacementMap=Z[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Z[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Z[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Z[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Z[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Z[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Z[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Z[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Z[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Z[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Z[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Z[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Z[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Z[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new XJ().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Z[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Z[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Z[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Z[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Z[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Z[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Z[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Z=J.clippingPlanes,W=null;if(Z!==null){let Q=Z.length;W=Array(Q);for(let Y=0;Y!==Q;++Y)W[Y]=Z[Y].clone()}return this.clippingPlanes=W,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var $8=new v,Z5=new v,dX=new v,e8=new v,W5=new v,uX=new v,Q5=new v;class oQ{constructor(J=new v,Z=new v(0,0,-1)){this.origin=J,this.direction=Z}set(J,Z){return this.origin.copy(J),this.direction.copy(Z),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Z){return Z.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,$8)),this}closestPointToPoint(J,Z){Z.subVectors(J,this.origin);let W=Z.dot(this.direction);if(W<0)return Z.copy(this.origin);return Z.copy(this.origin).addScaledVector(this.direction,W)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Z=$8.subVectors(J,this.origin).dot(this.direction);if(Z<0)return this.origin.distanceToSquared(J);return $8.copy(this.origin).addScaledVector(this.direction,Z),$8.distanceToSquared(J)}distanceSqToSegment(J,Z,W,Q){Z5.copy(J).add(Z).multiplyScalar(0.5),dX.copy(Z).sub(J).normalize(),e8.copy(this.origin).sub(Z5);let Y=J.distanceTo(Z)*0.5,X=-this.direction.dot(dX),H=e8.dot(this.direction),U=-e8.dot(dX),G=e8.lengthSq(),K=Math.abs(1-X*X),O,F,q,R;if(K>0)if(O=X*U-H,F=X*H-U,R=Y*K,O>=0)if(F>=-R)if(F<=R){let L=1/K;O*=L,F*=L,q=O*(O+X*F+2*H)+F*(X*O+F+2*U)+G}else F=Y,O=Math.max(0,-(X*F+H)),q=-O*O+F*(F+2*U)+G;else F=-Y,O=Math.max(0,-(X*F+H)),q=-O*O+F*(F+2*U)+G;else if(F<=-R)O=Math.max(0,-(-X*Y+H)),F=O>0?-Y:Math.min(Math.max(-Y,-U),Y),q=-O*O+F*(F+2*U)+G;else if(F<=R)O=0,F=Math.min(Math.max(-Y,-U),Y),q=F*(F+2*U)+G;else O=Math.max(0,-(X*Y+H)),F=O>0?Y:Math.min(Math.max(-Y,-U),Y),q=-O*O+F*(F+2*U)+G;else F=X>0?-Y:Y,O=Math.max(0,-(X*F+H)),q=-O*O+F*(F+2*U)+G;if(W)W.copy(this.origin).addScaledVector(this.direction,O);if(Q)Q.copy(Z5).addScaledVector(dX,F);return q}intersectSphere(J,Z){$8.subVectors(J.center,this.origin);let W=$8.dot(this.direction),Q=$8.dot($8)-W*W,Y=J.radius*J.radius;if(Q>Y)return null;let X=Math.sqrt(Y-Q),H=W-X,U=W+X;if(U<0)return null;if(H<0)return this.at(U,Z);return this.at(H,Z)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Z=J.normal.dot(this.direction);if(Z===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let W=-(this.origin.dot(J.normal)+J.constant)/Z;return W>=0?W:null}intersectPlane(J,Z){let W=this.distanceToPlane(J);if(W===null)return null;return this.at(W,Z)}intersectsPlane(J){let Z=J.distanceToPoint(this.origin);if(Z===0)return!0;if(J.normal.dot(this.direction)*Z<0)return!0;return!1}intersectBox(J,Z){let W,Q,Y,X,H,U,G=1/this.direction.x,K=1/this.direction.y,O=1/this.direction.z,F=this.origin;if(G>=0)W=(J.min.x-F.x)*G,Q=(J.max.x-F.x)*G;else W=(J.max.x-F.x)*G,Q=(J.min.x-F.x)*G;if(K>=0)Y=(J.min.y-F.y)*K,X=(J.max.y-F.y)*K;else Y=(J.max.y-F.y)*K,X=(J.min.y-F.y)*K;if(W>X||Y>Q)return null;if(Y>W||isNaN(W))W=Y;if(X<Q||isNaN(Q))Q=X;if(O>=0)H=(J.min.z-F.z)*O,U=(J.max.z-F.z)*O;else H=(J.max.z-F.z)*O,U=(J.min.z-F.z)*O;if(W>U||H>Q)return null;if(H>W||W!==W)W=H;if(U<Q||Q!==Q)Q=U;if(Q<0)return null;return this.at(W>=0?W:Q,Z)}intersectsBox(J){return this.intersectBox(J,$8)!==null}intersectTriangle(J,Z,W,Q,Y){W5.subVectors(Z,J),uX.subVectors(W,J),Q5.crossVectors(W5,uX);let X=this.direction.dot(Q5),H;if(X>0){if(Q)return null;H=1}else if(X<0)H=-1,X=-X;else return null;e8.subVectors(this.origin,J);let U=H*this.direction.dot(uX.crossVectors(e8,uX));if(U<0)return null;let G=H*this.direction.dot(W5.cross(e8));if(G<0)return null;if(U+G>X)return null;let K=-H*e8.dot(Q5);if(K<0)return null;return this.at(K/X,Y)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kH extends X9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new a0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Z9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var zM=new jJ,f9=new oQ,lX=new u9,AM=new v,cX=new v,iX=new v,sX=new v,Y5=new v,nX=new v,_M=new v,oX=new v;class w6 extends L7{constructor(J=new O7,Z=new kH){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Z,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Z){if(super.copy(J,Z),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Z=this.geometry.morphAttributes,W=Object.keys(Z);if(W.length>0){let Q=Z[W[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Y=0,X=Q.length;Y<X;Y++){let H=Q[Y].name||String(Y);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Y}}}}getVertexPosition(J,Z){let W=this.geometry,Q=W.attributes.position,Y=W.morphAttributes.position,X=W.morphTargetsRelative;Z.fromBufferAttribute(Q,J);let H=this.morphTargetInfluences;if(Y&&H){nX.set(0,0,0);for(let U=0,G=Y.length;U<G;U++){let K=H[U],O=Y[U];if(K===0)continue;if(Y5.fromBufferAttribute(O,J),X)nX.addScaledVector(Y5,K);else nX.addScaledVector(Y5.sub(Z),K)}Z.add(nX)}return Z}raycast(J,Z){let W=this.geometry,Q=this.material,Y=this.matrixWorld;if(Q===void 0)return;if(W.boundingSphere===null)W.computeBoundingSphere();if(lX.copy(W.boundingSphere),lX.applyMatrix4(Y),f9.copy(J.ray).recast(J.near),lX.containsPoint(f9.origin)===!1){if(f9.intersectSphere(lX,AM)===null)return;if(f9.origin.distanceToSquared(AM)>(J.far-J.near)**2)return}if(zM.copy(Y).invert(),f9.copy(J.ray).applyMatrix4(zM),W.boundingBox!==null){if(f9.intersectsBox(W.boundingBox)===!1)return}this._computeIntersections(J,Z,f9)}_computeIntersections(J,Z,W){let Q,Y=this.geometry,X=this.material,H=Y.index,U=Y.attributes.position,G=Y.attributes.uv,K=Y.attributes.uv1,O=Y.attributes.normal,F=Y.groups,q=Y.drawRange;if(H!==null)if(Array.isArray(X))for(let R=0,L=F.length;R<L;R++){let w=F[R],N=X[w.materialIndex],$=Math.max(w.start,q.start),B=Math.min(H.count,Math.min(w.start+w.count,q.start+q.count));for(let _=$,z=B;_<z;_+=3){let P=H.getX(_),D=H.getX(_+1),T=H.getX(_+2);if(Q=aX(this,N,J,W,G,K,O,P,D,T),Q)Q.faceIndex=Math.floor(_/3),Q.face.materialIndex=w.materialIndex,Z.push(Q)}}else{let R=Math.max(0,q.start),L=Math.min(H.count,q.start+q.count);for(let w=R,N=L;w<N;w+=3){let $=H.getX(w),B=H.getX(w+1),_=H.getX(w+2);if(Q=aX(this,X,J,W,G,K,O,$,B,_),Q)Q.faceIndex=Math.floor(w/3),Z.push(Q)}}else if(U!==void 0)if(Array.isArray(X))for(let R=0,L=F.length;R<L;R++){let w=F[R],N=X[w.materialIndex],$=Math.max(w.start,q.start),B=Math.min(U.count,Math.min(w.start+w.count,q.start+q.count));for(let _=$,z=B;_<z;_+=3){let P=_,D=_+1,T=_+2;if(Q=aX(this,N,J,W,G,K,O,P,D,T),Q)Q.faceIndex=Math.floor(_/3),Q.face.materialIndex=w.materialIndex,Z.push(Q)}}else{let R=Math.max(0,q.start),L=Math.min(U.count,q.start+q.count);for(let w=R,N=L;w<N;w+=3){let $=w,B=w+1,_=w+2;if(Q=aX(this,X,J,W,G,K,O,$,B,_),Q)Q.faceIndex=Math.floor(w/3),Z.push(Q)}}}}function q_(J,Z,W,Q,Y,X,H,U){let G;if(Z.side===1)G=Q.intersectTriangle(H,X,Y,!0,U);else G=Q.intersectTriangle(Y,X,H,Z.side===0,U);if(G===null)return null;oX.copy(U),oX.applyMatrix4(J.matrixWorld);let K=W.ray.origin.distanceTo(oX);if(K<W.near||K>W.far)return null;return{distance:K,point:oX.clone(),object:J}}function aX(J,Z,W,Q,Y,X,H,U,G,K){J.getVertexPosition(U,cX),J.getVertexPosition(G,iX),J.getVertexPosition(K,sX);let O=q_(J,Z,W,Q,cX,iX,sX,_M);if(O){let F=new v;if(q6.getBarycoord(_M,cX,iX,sX,F),Y)O.uv=q6.getInterpolatedAttribute(Y,U,G,K,F,new XJ);if(X)O.uv1=q6.getInterpolatedAttribute(X,U,G,K,F,new XJ);if(H){if(O.normal=q6.getInterpolatedAttribute(H,U,G,K,F,new v),O.normal.dot(Q.direction)>0)O.normal.multiplyScalar(-1)}let q={a:U,b:G,c:K,normal:new v,materialIndex:0};q6.getNormal(cX,iX,sX,q.normal),O.face=q,O.barycoord=F}return O}class $q extends N7{constructor(J=null,Z=1,W=1,Q,Y,X,H,U,G=1003,K=1003,O,F){super(null,X,H,U,G,K,Q,Y,O,F);this.isDataTexture=!0,this.image={data:J,width:Z,height:W},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var X5=new v,$_=new v,O_=new v0;class O8{constructor(J=new v(1,0,0),Z=0){this.isPlane=!0,this.normal=J,this.constant=Z}set(J,Z){return this.normal.copy(J),this.constant=Z,this}setComponents(J,Z,W,Q){return this.normal.set(J,Z,W),this.constant=Q,this}setFromNormalAndCoplanarPoint(J,Z){return this.normal.copy(J),this.constant=-Z.dot(this.normal),this}setFromCoplanarPoints(J,Z,W){let Q=X5.subVectors(W,Z).cross($_.subVectors(J,Z)).normalize();return this.setFromNormalAndCoplanarPoint(Q,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Z){return Z.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Z,W=!0){let Q=J.delta(X5),Y=this.normal.dot(Q);if(Y===0){if(this.distanceToPoint(J.start)===0)return Z.copy(J.start);return null}let X=-(J.start.dot(this.normal)+this.constant)/Y;if(W===!0&&(X<0||X>1))return null;return Z.copy(J.start).addScaledVector(Q,X)}intersectsLine(J){let Z=this.distanceToPoint(J.start),W=this.distanceToPoint(J.end);return Z<0&&W>0||W<0&&Z>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Z){let W=Z||O_.getNormalMatrix(J),Q=this.coplanarPoint(X5).applyMatrix4(J),Y=this.normal.applyMatrix3(W).normalize();return this.constant=-Q.dot(Y),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var b9=new u9,R_=new XJ(0.5,0.5),rX=new v;class CH{constructor(J=new O8,Z=new O8,W=new O8,Q=new O8,Y=new O8,X=new O8){this.planes=[J,Z,W,Q,Y,X]}set(J,Z,W,Q,Y,X){let H=this.planes;return H[0].copy(J),H[1].copy(Z),H[2].copy(W),H[3].copy(Q),H[4].copy(Y),H[5].copy(X),this}copy(J){let Z=this.planes;for(let W=0;W<6;W++)Z[W].copy(J.planes[W]);return this}setFromProjectionMatrix(J,Z=2000,W=!1){let Q=this.planes,Y=J.elements,X=Y[0],H=Y[1],U=Y[2],G=Y[3],K=Y[4],O=Y[5],F=Y[6],q=Y[7],R=Y[8],L=Y[9],w=Y[10],N=Y[11],$=Y[12],B=Y[13],_=Y[14],z=Y[15];if(Q[0].setComponents(G-X,q-K,N-R,z-$).normalize(),Q[1].setComponents(G+X,q+K,N+R,z+$).normalize(),Q[2].setComponents(G+H,q+O,N+L,z+B).normalize(),Q[3].setComponents(G-H,q-O,N-L,z-B).normalize(),W)Q[4].setComponents(U,F,w,_).normalize(),Q[5].setComponents(G-U,q-F,N-w,z-_).normalize();else if(Q[4].setComponents(G-U,q-F,N-w,z-_).normalize(),Z===2000)Q[5].setComponents(G+U,q+F,N+w,z+_).normalize();else if(Z===2001)Q[5].setComponents(U,F,w,_).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Z);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();b9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Z=J.geometry;if(Z.boundingSphere===null)Z.computeBoundingSphere();b9.copy(Z.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(b9)}intersectsSprite(J){b9.center.set(0,0,0);let Z=R_.distanceTo(J.center);return b9.radius=0.7071067811865476+Z,b9.applyMatrix4(J.matrixWorld),this.intersectsSphere(b9)}intersectsSphere(J){let Z=this.planes,W=J.center,Q=-J.radius;for(let Y=0;Y<6;Y++)if(Z[Y].distanceToPoint(W)<Q)return!1;return!0}intersectsBox(J){let Z=this.planes;for(let W=0;W<6;W++){let Q=Z[W];if(rX.x=Q.normal.x>0?J.max.x:J.min.x,rX.y=Q.normal.y>0?J.max.y:J.min.y,rX.z=Q.normal.z>0?J.max.z:J.min.z,Q.distanceToPoint(rX)<0)return!1}return!0}containsPoint(J){let Z=this.planes;for(let W=0;W<6;W++)if(Z[W].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class aQ extends X9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new a0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var HH=new v,UH=new v,IM=new jJ,gQ=new oQ,tX=new u9,H5=new v,wM=new v;class Oq extends L7{constructor(J=new O7,Z=new aQ){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Z,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Z){return super.copy(J,Z),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Z=J.attributes.position,W=[0];for(let Q=1,Y=Z.count;Q<Y;Q++)HH.fromBufferAttribute(Z,Q-1),UH.fromBufferAttribute(Z,Q),W[Q]=W[Q-1],W[Q]+=HH.distanceTo(UH);J.setAttribute("lineDistance",new n7(W,1))}else j0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,Z){let W=this.geometry,Q=this.matrixWorld,Y=J.params.Line.threshold,X=W.drawRange;if(W.boundingSphere===null)W.computeBoundingSphere();if(tX.copy(W.boundingSphere),tX.applyMatrix4(Q),tX.radius+=Y,J.ray.intersectsSphere(tX)===!1)return;IM.copy(Q).invert(),gQ.copy(J.ray).applyMatrix4(IM);let H=Y/((this.scale.x+this.scale.y+this.scale.z)/3),U=H*H,G=this.isLineSegments?2:1,K=W.index,F=W.attributes.position;if(K!==null){let q=Math.max(0,X.start),R=Math.min(K.count,X.start+X.count);for(let L=q,w=R-1;L<w;L+=G){let N=K.getX(L),$=K.getX(L+1),B=eX(this,J,gQ,U,N,$,L);if(B)Z.push(B)}if(this.isLineLoop){let L=K.getX(R-1),w=K.getX(q),N=eX(this,J,gQ,U,L,w,R-1);if(N)Z.push(N)}}else{let q=Math.max(0,X.start),R=Math.min(F.count,X.start+X.count);for(let L=q,w=R-1;L<w;L+=G){let N=eX(this,J,gQ,U,L,L+1,L);if(N)Z.push(N)}if(this.isLineLoop){let L=eX(this,J,gQ,U,R-1,q,R-1);if(L)Z.push(L)}}}updateMorphTargets(){let Z=this.geometry.morphAttributes,W=Object.keys(Z);if(W.length>0){let Q=Z[W[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Y=0,X=Q.length;Y<X;Y++){let H=Q[Y].name||String(Y);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Y}}}}}function eX(J,Z,W,Q,Y,X,H){let U=J.geometry.attributes.position;if(HH.fromBufferAttribute(U,Y),UH.fromBufferAttribute(U,X),W.distanceSqToSegment(HH,UH,H5,wM)>Q)return;H5.applyMatrix4(J.matrixWorld);let K=Z.ray.origin.distanceTo(H5);if(K<Z.near||K>Z.far)return;return{distance:K,point:wM.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var DM=new v,kM=new v;class VH extends Oq{constructor(J,Z){super(J,Z);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Z=J.attributes.position,W=[];for(let Q=0,Y=Z.count;Q<Y;Q+=2)DM.fromBufferAttribute(Z,Q),kM.fromBufferAttribute(Z,Q+1),W[Q]=Q===0?0:W[Q-1],W[Q+1]=W[Q]+DM.distanceTo(kM);J.setAttribute("lineDistance",new n7(W,1))}else j0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rQ extends X9{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new a0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var CM=new jJ,G5=new oQ,JH=new u9,ZH=new v;class zW extends L7{constructor(J=new O7,Z=new rQ){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Z,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Z){return super.copy(J,Z),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,Z){let W=this.geometry,Q=this.matrixWorld,Y=J.params.Points.threshold,X=W.drawRange;if(W.boundingSphere===null)W.computeBoundingSphere();if(JH.copy(W.boundingSphere),JH.applyMatrix4(Q),JH.radius+=Y,J.ray.intersectsSphere(JH)===!1)return;CM.copy(Q).invert(),G5.copy(J.ray).applyMatrix4(CM);let H=Y/((this.scale.x+this.scale.y+this.scale.z)/3),U=H*H,G=W.index,O=W.attributes.position;if(G!==null){let F=Math.max(0,X.start),q=Math.min(G.count,X.start+X.count);for(let R=F,L=q;R<L;R++){let w=G.getX(R);ZH.fromBufferAttribute(O,w),VM(ZH,w,U,Q,J,Z,this)}}else{let F=Math.max(0,X.start),q=Math.min(O.count,X.start+X.count);for(let R=F,L=q;R<L;R++)ZH.fromBufferAttribute(O,R),VM(ZH,R,U,Q,J,Z,this)}}updateMorphTargets(){let Z=this.geometry.morphAttributes,W=Object.keys(Z);if(W.length>0){let Q=Z[W[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Y=0,X=Q.length;Y<X;Y++){let H=Q[Y].name||String(Y);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Y}}}}}function VM(J,Z,W,Q,Y,X,H){let U=G5.distanceSqToPoint(J);if(U<W){let G=new v;G5.closestPointToPoint(J,G),G.applyMatrix4(Q);let K=Y.ray.origin.distanceTo(G);if(K<Y.near||K>Y.far)return;X.push({distance:K,distanceToRay:Math.sqrt(U),point:G,index:Z,face:null,faceIndex:null,barycoord:null,object:H})}}class TH extends N7{constructor(J=[],Z=301,W,Q,Y,X,H,U,G,K){super(J,Z,W,Q,Y,X,H,U,G,K);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class H9 extends N7{constructor(J,Z,W=1014,Q,Y,X,H=1003,U=1003,G,K=1026,O=1){if(K!==1026&&K!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let F={width:J,height:Z,depth:O};super(F,Q,Y,X,H,U,K,W,G);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new sQ(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Z=super.toJSON(J);if(this.compareFunction!==null)Z.compareFunction=this.compareFunction;return Z}}class Rq extends H9{constructor(J,Z=1014,W=301,Q,Y,X=1003,H=1003,U,G=1026){let K={width:J,height:J,depth:1},O=[K,K,K,K,K,K];super(J,J,Z,W,Q,Y,X,H,U,G);this.image=O,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class PH extends N7{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class AW extends O7{constructor(J=1,Z=1,W=1,Q=1,Y=1,X=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Z,depth:W,widthSegments:Q,heightSegments:Y,depthSegments:X};let H=this;Q=Math.floor(Q),Y=Math.floor(Y),X=Math.floor(X);let U=[],G=[],K=[],O=[],F=0,q=0;R("z","y","x",-1,-1,W,Z,J,X,Y,0),R("z","y","x",1,-1,W,Z,-J,X,Y,1),R("x","z","y",1,1,J,W,Z,Q,X,2),R("x","z","y",1,-1,J,W,-Z,Q,X,3),R("x","y","z",1,-1,J,Z,W,Q,Y,4),R("x","y","z",-1,-1,J,Z,-W,Q,Y,5),this.setIndex(U),this.setAttribute("position",new n7(G,3)),this.setAttribute("normal",new n7(K,3)),this.setAttribute("uv",new n7(O,2));function R(L,w,N,$,B,_,z,P,D,T,A){let C=_/D,x=z/T,E=_/2,u=z/2,e=P/2,b=D+1,c=T+1,l=0,h=0,g=new v;for(let Y0=0;Y0<c;Y0++){let O0=Y0*x-u;for(let _0=0;_0<b;_0++){let I0=_0*C-E;g[L]=I0*$,g[w]=O0*B,g[N]=e,G.push(g.x,g.y,g.z),g[L]=0,g[w]=0,g[N]=P>0?1:-1,K.push(g.x,g.y,g.z),O.push(_0/D),O.push(1-Y0/T),l+=1}}for(let Y0=0;Y0<T;Y0++)for(let O0=0;O0<D;O0++){let _0=F+O0+b*Y0,I0=F+O0+b*(Y0+1),zJ=F+(O0+1)+b*(Y0+1),HJ=F+(O0+1)+b*Y0;U.push(_0,I0,HJ),U.push(I0,zJ,HJ),h+=6}H.addGroup(q,h,A),q+=h,F+=l}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new AW(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class Fq{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){j0("Curve: .getPoint() not implemented.")}getPointAt(J,Z){let W=this.getUtoTmapping(J);return this.getPoint(W,Z)}getPoints(J=5){let Z=[];for(let W=0;W<=J;W++)Z.push(this.getPoint(W/J));return Z}getSpacedPoints(J=5){let Z=[];for(let W=0;W<=J;W++)Z.push(this.getPointAt(W/J));return Z}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let Z=[],W,Q=this.getPoint(0),Y=0;Z.push(0);for(let X=1;X<=J;X++)W=this.getPoint(X/J),Y+=W.distanceTo(Q),Z.push(Y),Q=W;return this.cacheArcLengths=Z,Z}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,Z=null){let W=this.getLengths(),Q=0,Y=W.length,X;if(Z)X=Z;else X=J*W[Y-1];let H=0,U=Y-1,G;while(H<=U)if(Q=Math.floor(H+(U-H)/2),G=W[Q]-X,G<0)H=Q+1;else if(G>0)U=Q-1;else{U=Q;break}if(Q=U,W[Q]===X)return Q/(Y-1);let K=W[Q],F=W[Q+1]-K,q=(X-K)/F;return(Q+q)/(Y-1)}getTangent(J,Z){let Q=J-0.0001,Y=J+0.0001;if(Q<0)Q=0;if(Y>1)Y=1;let X=this.getPoint(Q),H=this.getPoint(Y),U=Z||(X.isVector2?new XJ:new v);return U.copy(H).sub(X).normalize(),U}getTangentAt(J,Z){let W=this.getUtoTmapping(J);return this.getTangent(W,Z)}computeFrenetFrames(J,Z=!1){let W=new v,Q=[],Y=[],X=[],H=new v,U=new jJ;for(let q=0;q<=J;q++){let R=q/J;Q[q]=this.getTangentAt(R,new v)}Y[0]=new v,X[0]=new v;let G=Number.MAX_VALUE,K=Math.abs(Q[0].x),O=Math.abs(Q[0].y),F=Math.abs(Q[0].z);if(K<=G)G=K,W.set(1,0,0);if(O<=G)G=O,W.set(0,1,0);if(F<=G)W.set(0,0,1);H.crossVectors(Q[0],W).normalize(),Y[0].crossVectors(Q[0],H),X[0].crossVectors(Q[0],Y[0]);for(let q=1;q<=J;q++){if(Y[q]=Y[q-1].clone(),X[q]=X[q-1].clone(),H.crossVectors(Q[q-1],Q[q]),H.length()>Number.EPSILON){H.normalize();let R=Math.acos(o0(Q[q-1].dot(Q[q]),-1,1));Y[q].applyMatrix4(U.makeRotationAxis(H,R))}X[q].crossVectors(Q[q],Y[q])}if(Z===!0){let q=Math.acos(o0(Y[0].dot(Y[J]),-1,1));if(q/=J,Q[0].dot(H.crossVectors(Y[0],Y[J]))>0)q=-q;for(let R=1;R<=J;R++)Y[R].applyMatrix4(U.makeRotationAxis(Q[R],q*R)),X[R].crossVectors(Q[R],Y[R])}return{tangents:Q,normals:Y,binormals:X}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}function F_(J,Z){let W=1-J;return W*W*Z}function M_(J,Z){return 2*(1-J)*J*Z}function N_(J,Z){return J*J*Z}function U5(J,Z,W,Q){return F_(J,Z)+M_(J,W)+N_(J,Q)}class EH extends Fq{constructor(J=new v,Z=new v,W=new v){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=Z,this.v2=W}getPoint(J,Z=new v){let W=Z,Q=this.v0,Y=this.v1,X=this.v2;return W.set(U5(J,Q.x,Y.x,X.x),U5(J,Q.y,Y.y,X.y),U5(J,Q.z,Y.z,X.z)),W}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class tQ extends O7{constructor(J=1,Z=1,W=1,Q=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Z,widthSegments:W,heightSegments:Q};let Y=J/2,X=Z/2,H=Math.floor(W),U=Math.floor(Q),G=H+1,K=U+1,O=J/H,F=Z/U,q=[],R=[],L=[],w=[];for(let N=0;N<K;N++){let $=N*F-X;for(let B=0;B<G;B++){let _=B*O-Y;R.push(_,-$,0),L.push(0,0,1),w.push(B/H),w.push(1-N/U)}}for(let N=0;N<U;N++)for(let $=0;$<H;$++){let B=$+G*N,_=$+G*(N+1),z=$+1+G*(N+1),P=$+1+G*N;q.push(B,_,P),q.push(_,z,P)}this.setIndex(q),this.setAttribute("position",new n7(R,3)),this.setAttribute("normal",new n7(L,3)),this.setAttribute("uv",new n7(w,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new tQ(J.width,J.height,J.widthSegments,J.heightSegments)}}function l9(J){let Z={};for(let W in J){Z[W]={};for(let Q in J[W]){let Y=J[W][Q];if(TM(Y))if(Y.isRenderTargetTexture)j0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Z[W][Q]=null;else Z[W][Q]=Y.clone();else if(Array.isArray(Y))if(TM(Y[0])){let X=[];for(let H=0,U=Y.length;H<U;H++)X[H]=Y[H].clone();Z[W][Q]=X}else Z[W][Q]=Y.slice();else Z[W][Q]=Y}}return Z}function B7(J){let Z={};for(let W=0;W<J.length;W++){let Q=l9(J[W]);for(let Y in Q)Z[Y]=Q[Y]}return Z}function TM(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function L_(J){let Z=[];for(let W=0;W<J.length;W++)Z.push(J[W].clone());return Z}function Mq(J){let Z=J.getRenderTarget();if(Z===null)return J.outputColorSpace;if(Z.isXRRenderTarget===!0)return Z.texture.colorSpace;return WJ.workingColorSpace}var bN={clone:l9,merge:B7},B_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,z_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class I7 extends X9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=B_,this.fragmentShader=z_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=l9(J.uniforms),this.uniformsGroups=L_(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Z=super.toJSON(J);Z.glslVersion=this.glslVersion,Z.uniforms={};for(let Q in this.uniforms){let X=this.uniforms[Q].value;if(X&&X.isTexture)Z.uniforms[Q]={type:"t",value:X.toJSON(J).uuid};else if(X&&X.isColor)Z.uniforms[Q]={type:"c",value:X.getHex()};else if(X&&X.isVector2)Z.uniforms[Q]={type:"v2",value:X.toArray()};else if(X&&X.isVector3)Z.uniforms[Q]={type:"v3",value:X.toArray()};else if(X&&X.isVector4)Z.uniforms[Q]={type:"v4",value:X.toArray()};else if(X&&X.isMatrix3)Z.uniforms[Q]={type:"m3",value:X.toArray()};else if(X&&X.isMatrix4)Z.uniforms[Q]={type:"m4",value:X.toArray()};else Z.uniforms[Q]={value:X}}if(Object.keys(this.defines).length>0)Z.defines=this.defines;Z.vertexShader=this.vertexShader,Z.fragmentShader=this.fragmentShader,Z.lights=this.lights,Z.clipping=this.clipping;let W={};for(let Q in this.extensions)if(this.extensions[Q]===!0)W[Q]=!0;if(Object.keys(W).length>0)Z.extensions=W;return Z}fromJSON(J,Z){if(super.fromJSON(J,Z),J.uniforms!==void 0)for(let W in J.uniforms){let Q=J.uniforms[W];switch(this.uniforms[W]={},Q.type){case"t":this.uniforms[W].value=Z[Q.value]||null;break;case"c":this.uniforms[W].value=new a0().setHex(Q.value);break;case"v2":this.uniforms[W].value=new XJ().fromArray(Q.value);break;case"v3":this.uniforms[W].value=new v().fromArray(Q.value);break;case"v4":this.uniforms[W].value=new bJ().fromArray(Q.value);break;case"m3":this.uniforms[W].value=new v0().fromArray(Q.value);break;case"m4":this.uniforms[W].value=new jJ().fromArray(Q.value);break;default:this.uniforms[W].value=Q.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let W in J.extensions)this.extensions[W]=J.extensions[W];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class Nq extends I7{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Lq extends X9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class Bq extends X9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function WH(J,Z){if(!J||J.constructor===Z)return J;if(typeof Z.BYTES_PER_ELEMENT==="number")return new Z(J);return Array.prototype.slice.call(J)}class c9{constructor(J,Z,W,Q){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Q!==void 0?Q:new Z.constructor(W),this.sampleValues=Z,this.valueSize=W,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Z=this.parameterPositions,W=this._cachedIndex,Q=Z[W],Y=Z[W-1];J:{Z:{let X;W:{Q:if(!(J<Q)){for(let H=W+2;;){if(Q===void 0){if(J<Y)break Q;return W=Z.length,this._cachedIndex=W,this.copySampleValue_(W-1)}if(W===H)break;if(Y=Q,Q=Z[++W],J<Q)break Z}X=Z.length;break W}if(!(J>=Y)){let H=Z[1];if(J<H)W=2,Y=H;for(let U=W-2;;){if(Y===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(W===U)break;if(Q=Y,Y=Z[--W-1],J>=Y)break Z}X=W,W=0;break W}break J}while(W<X){let H=W+X>>>1;if(J<Z[H])X=H;else W=H+1}if(Q=Z[W],Y=Z[W-1],Y===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===void 0)return W=Z.length,this._cachedIndex=W,this.copySampleValue_(W-1)}this._cachedIndex=W,this.intervalChanged_(W,Y,Q)}return this.interpolate_(W,Y,J,Q)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Z=this.resultBuffer,W=this.sampleValues,Q=this.valueSize,Y=J*Q;for(let X=0;X!==Q;++X)Z[X]=W[Y+X];return Z}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class zq extends c9{constructor(J,Z,W,Q){super(J,Z,W,Q);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Z,W){let Q=this.parameterPositions,Y=J-2,X=J+1,H=Q[Y],U=Q[X];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:Y=J,H=2*Z-W;break;case 2402:Y=Q.length-2,H=Z+Q[Y]-Q[Y+1];break;default:Y=J,H=W}if(U===void 0)switch(this.getSettings_().endingEnd){case 2401:X=J,U=2*W-Z;break;case 2402:X=1,U=W+Q[1]-Q[0];break;default:X=J-1,U=Z}let G=(W-Z)*0.5,K=this.valueSize;this._weightPrev=G/(Z-H),this._weightNext=G/(U-W),this._offsetPrev=Y*K,this._offsetNext=X*K}interpolate_(J,Z,W,Q){let Y=this.resultBuffer,X=this.sampleValues,H=this.valueSize,U=J*H,G=U-H,K=this._offsetPrev,O=this._offsetNext,F=this._weightPrev,q=this._weightNext,R=(W-Z)/(Q-Z),L=R*R,w=L*R,N=-F*w+2*F*L-F*R,$=(1+F)*w+(-1.5-2*F)*L+(-0.5+F)*R+1,B=(-1-q)*w+(1.5+q)*L+0.5*R,_=q*w-q*L;for(let z=0;z!==H;++z)Y[z]=N*X[K+z]+$*X[G+z]+B*X[U+z]+_*X[O+z];return Y}}class Aq extends c9{constructor(J,Z,W,Q){super(J,Z,W,Q)}interpolate_(J,Z,W,Q){let Y=this.resultBuffer,X=this.sampleValues,H=this.valueSize,U=J*H,G=U-H,K=(W-Z)/(Q-Z),O=1-K;for(let F=0;F!==H;++F)Y[F]=X[G+F]*O+X[U+F]*K;return Y}}class _q extends c9{constructor(J,Z,W,Q){super(J,Z,W,Q)}interpolate_(J){return this.copySampleValue_(J-1)}}class Iq extends c9{interpolate_(J,Z,W,Q){let Y=this.resultBuffer,X=this.sampleValues,H=this.valueSize,U=J*H,G=U-H,K=this.inTangents,O=this.outTangents;if(!K||!O){let R=(W-Z)/(Q-Z),L=1-R;for(let w=0;w!==H;++w)Y[w]=X[G+w]*L+X[U+w]*R;return Y}let F=H*2,q=J-1;for(let R=0;R!==H;++R){let L=X[G+R],w=X[U+R],N=q*F+R*2,$=O[N],B=O[N+1],_=J*F+R*2,z=K[_],P=K[_+1],D=(W-Z)/(Q-Z),T,A,C,x,E;for(let u=0;u<8;u++){T=D*D,A=T*D,C=1-D,x=C*C,E=x*C;let b=E*Z+3*x*D*$+3*C*T*z+A*Q-W;if(Math.abs(b)<0.0000000001)break;let c=3*x*($-Z)+6*C*D*(z-$)+3*T*(Q-z);if(Math.abs(c)<0.0000000001)break;D=D-b/c,D=Math.max(0,Math.min(1,D))}Y[R]=E*L+3*x*D*B+3*C*T*P+A*w}return Y}}class O6{constructor(J,Z,W,Q){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Z===void 0||Z.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=WH(Z,this.TimeBufferType),this.values=WH(W,this.ValueBufferType),this.setInterpolation(Q||this.DefaultInterpolation)}static toJSON(J){let Z=J.constructor,W;if(Z.toJSON!==this.toJSON)W=Z.toJSON(J);else{W={name:J.name,times:WH(J.times,Array),values:WH(J.values,Array)};let Q=J.getInterpolation();if(Q!==J.DefaultInterpolation)W.interpolation=Q}return W.type=J.ValueTypeName,W}InterpolantFactoryMethodDiscrete(J){return new _q(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new Aq(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new zq(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Z=new Iq(this.times,this.values,this.getValueSize(),J);if(this.settings)Z.inTangents=this.settings.inTangents,Z.outTangents=this.settings.outTangents;return Z}setInterpolation(J){let Z;switch(J){case 2300:Z=this.InterpolantFactoryMethodDiscrete;break;case 2301:Z=this.InterpolantFactoryMethodLinear;break;case 2302:Z=this.InterpolantFactoryMethodSmooth;break;case 2303:Z=this.InterpolantFactoryMethodBezier;break}if(Z===void 0){let W="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(W);return j0("KeyframeTrack:",W),this}return this.createInterpolant=Z,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Z=this.times;for(let W=0,Q=Z.length;W!==Q;++W)Z[W]+=J}return this}scale(J){if(J!==1){let Z=this.times;for(let W=0,Q=Z.length;W!==Q;++W)Z[W]*=J}return this}trim(J,Z){let W=this.times,Q=W.length,Y=0,X=Q-1;while(Y!==Q&&W[Y]<J)++Y;while(X!==-1&&W[X]>Z)--X;if(++X,Y!==0||X!==Q){if(Y>=X)X=Math.max(X,1),Y=X-1;let H=this.getValueSize();this.times=W.slice(Y,X),this.values=this.values.slice(Y*H,X*H)}return this}validate(){let J=!0,Z=this.getValueSize();if(Z-Math.floor(Z)!==0)b0("KeyframeTrack: Invalid value size in track.",this),J=!1;let W=this.times,Q=this.values,Y=W.length;if(Y===0)b0("KeyframeTrack: Track is empty.",this),J=!1;let X=null;for(let H=0;H!==Y;H++){let U=W[H];if(typeof U==="number"&&isNaN(U)){b0("KeyframeTrack: Time is not a valid number.",this,H,U),J=!1;break}if(X!==null&&X>U){b0("KeyframeTrack: Out of order keys.",this,H,U,X),J=!1;break}X=U}if(Q!==void 0){if(nA(Q))for(let H=0,U=Q.length;H!==U;++H){let G=Q[H];if(isNaN(G)){b0("KeyframeTrack: Value is not a valid number.",this,H,G),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Z=this.values.slice(),W=this.getValueSize(),Q=this.getInterpolation()===2302,Y=J.length-1,X=1;for(let H=1;H<Y;++H){let U=!1,G=J[H],K=J[H+1];if(G!==K&&(H!==1||G!==J[0]))if(!Q){let O=H*W,F=O-W,q=O+W;for(let R=0;R!==W;++R){let L=Z[O+R];if(L!==Z[F+R]||L!==Z[q+R]){U=!0;break}}}else U=!0;if(U){if(H!==X){J[X]=J[H];let O=H*W,F=X*W;for(let q=0;q!==W;++q)Z[F+q]=Z[O+q]}++X}}if(Y>0){J[X]=J[Y];for(let H=Y*W,U=X*W,G=0;G!==W;++G)Z[U+G]=Z[H+G];++X}if(X!==J.length)this.times=J.slice(0,X),this.values=Z.slice(0,X*W);else this.times=J,this.values=Z;return this}clone(){let J=this.times.slice(),Z=this.values.slice(),Q=new this.constructor(this.name,J,Z);return Q.createInterpolant=this.createInterpolant,Q}}O6.prototype.ValueTypeName="";O6.prototype.TimeBufferType=Float32Array;O6.prototype.ValueBufferType=Float32Array;O6.prototype.DefaultInterpolation=2301;class i9 extends O6{constructor(J,Z,W){super(J,Z,W)}}i9.prototype.ValueTypeName="bool";i9.prototype.ValueBufferType=Array;i9.prototype.DefaultInterpolation=2300;i9.prototype.InterpolantFactoryMethodLinear=void 0;i9.prototype.InterpolantFactoryMethodSmooth=void 0;class wq extends O6{constructor(J,Z,W,Q){super(J,Z,W,Q)}}wq.prototype.ValueTypeName="color";class Dq extends O6{constructor(J,Z,W,Q){super(J,Z,W,Q)}}Dq.prototype.ValueTypeName="number";class kq extends c9{constructor(J,Z,W,Q){super(J,Z,W,Q)}interpolate_(J,Z,W,Q){let Y=this.resultBuffer,X=this.sampleValues,H=this.valueSize,U=(W-Z)/(Q-Z),G=J*H;for(let K=G+H;G!==K;G+=4)L8.slerpFlat(Y,0,X,G-H,X,G,U);return Y}}class SH extends O6{constructor(J,Z,W,Q){super(J,Z,W,Q)}InterpolantFactoryMethodLinear(J){return new kq(this.times,this.values,this.getValueSize(),J)}}SH.prototype.ValueTypeName="quaternion";SH.prototype.InterpolantFactoryMethodSmooth=void 0;class s9 extends O6{constructor(J,Z,W){super(J,Z,W)}}s9.prototype.ValueTypeName="string";s9.prototype.ValueBufferType=Array;s9.prototype.DefaultInterpolation=2300;s9.prototype.InterpolantFactoryMethodLinear=void 0;s9.prototype.InterpolantFactoryMethodSmooth=void 0;class Cq extends O6{constructor(J,Z,W,Q){super(J,Z,W,Q)}}Cq.prototype.ValueTypeName="vector";class Vq{constructor(J,Z,W){let Q=this,Y=!1,X=0,H=0,U=void 0,G=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Z,this.onError=W,this._abortController=null,this.itemStart=function(K){if(H++,Y===!1){if(Q.onStart!==void 0)Q.onStart(K,X,H)}Y=!0},this.itemEnd=function(K){if(X++,Q.onProgress!==void 0)Q.onProgress(K,X,H);if(X===H){if(Y=!1,Q.onLoad!==void 0)Q.onLoad()}},this.itemError=function(K){if(Q.onError!==void 0)Q.onError(K)},this.resolveURL=function(K){if(K=K.normalize("NFC"),U)return U(K);return K},this.setURLModifier=function(K){return U=K,this},this.addHandler=function(K,O){return G.push(K,O),this},this.removeHandler=function(K){let O=G.indexOf(K);if(O!==-1)G.splice(O,2);return this},this.getHandler=function(K){for(let O=0,F=G.length;O<F;O+=2){let q=G[O],R=G[O+1];if(q.global)q.lastIndex=0;if(q.test(K))return R}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var yN=new Vq;class Tq{constructor(J){if(this.manager=J!==void 0?J:yN,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Z){let W=this;return new Promise(function(Q,Y){W.load(J,Q,Z,Y)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}Tq.DEFAULT_MATERIAL_NAME="__DEFAULT";var QH=new v,YH=new L8,y6=new v;class jH extends L7{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new jJ,this.projectionMatrix=new jJ,this.projectionMatrixInverse=new jJ,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Z){return super.copy(J,Z),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(QH,YH,y6),y6.x===1&&y6.y===1&&y6.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(QH,YH,y6.set(1,1,1)).invert()}updateWorldMatrix(J,Z,W=!1){if(super.updateWorldMatrix(J,Z,W),this.matrixWorld.decompose(QH,YH,y6),y6.x===1&&y6.y===1&&y6.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(QH,YH,y6.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var J9=new v,PM=new XJ,EM=new XJ;class _7 extends jH{constructor(J=50,Z=1,W=0.1,Q=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=W,this.far=Q,this.focus=10,this.aspect=Z,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Z){return super.copy(J,Z),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Z=0.5*this.getFilmHeight()/J;this.fov=XH*2*Math.atan(Z),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(xK*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return XH*2*Math.atan(Math.tan(xK*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Z,W){J9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Z.set(J9.x,J9.y).multiplyScalar(-J/J9.z),J9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),W.set(J9.x,J9.y).multiplyScalar(-J/J9.z)}getViewSize(J,Z){return this.getViewBounds(J,PM,EM),Z.subVectors(EM,PM)}setViewOffset(J,Z,W,Q,Y,X){if(this.aspect=J/Z,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Z,this.view.offsetX=W,this.view.offsetY=Q,this.view.width=Y,this.view.height=X,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Z=J*Math.tan(xK*0.5*this.fov)/this.zoom,W=2*Z,Q=this.aspect*W,Y=-0.5*Q,X=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:U,fullHeight:G}=X;Y+=X.offsetX*Q/U,Z-=X.offsetY*W/G,Q*=X.width/U,W*=X.height/G}let H=this.filmOffset;if(H!==0)Y+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(Y,Y+Q,Z,Z-W,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Z=super.toJSON(J);if(Z.object.fov=this.fov,Z.object.zoom=this.zoom,Z.object.near=this.near,Z.object.far=this.far,Z.object.focus=this.focus,Z.object.aspect=this.aspect,this.view!==null)Z.object.view=Object.assign({},this.view);return Z.object.filmGauge=this.filmGauge,Z.object.filmOffset=this.filmOffset,Z}}class fH extends jH{constructor(J=-1,Z=1,W=1,Q=-1,Y=0.1,X=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Z,this.top=W,this.bottom=Q,this.near=Y,this.far=X,this.updateProjectionMatrix()}copy(J,Z){return super.copy(J,Z),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Z,W,Q,Y,X){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Z,this.view.offsetX=W,this.view.offsetY=Q,this.view.width=Y,this.view.height=X,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Z=(this.top-this.bottom)/(2*this.zoom),W=(this.right+this.left)/2,Q=(this.top+this.bottom)/2,Y=W-J,X=W+J,H=Q+Z,U=Q-Z;if(this.view!==null&&this.view.enabled){let G=(this.right-this.left)/this.view.fullWidth/this.zoom,K=(this.top-this.bottom)/this.view.fullHeight/this.zoom;Y+=G*this.view.offsetX,X=Y+G*this.view.width,H-=K*this.view.offsetY,U=H-K*this.view.height}this.projectionMatrix.makeOrthographic(Y,X,H,U,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Z=super.toJSON(J);if(Z.object.zoom=this.zoom,Z.object.left=this.left,Z.object.right=this.right,Z.object.top=this.top,Z.object.bottom=this.bottom,Z.object.near=this.near,Z.object.far=this.far,this.view!==null)Z.object.view=Object.assign({},this.view);return Z}}var KW=-90,qW=1;class Pq extends L7{constructor(J,Z,W){super();this.type="CubeCamera",this.renderTarget=W,this.coordinateSystem=null,this.activeMipmapLevel=0;let Q=new _7(KW,qW,J,Z);Q.layers=this.layers,this.add(Q);let Y=new _7(KW,qW,J,Z);Y.layers=this.layers,this.add(Y);let X=new _7(KW,qW,J,Z);X.layers=this.layers,this.add(X);let H=new _7(KW,qW,J,Z);H.layers=this.layers,this.add(H);let U=new _7(KW,qW,J,Z);U.layers=this.layers,this.add(U);let G=new _7(KW,qW,J,Z);G.layers=this.layers,this.add(G)}updateCoordinateSystem(){let J=this.coordinateSystem,Z=this.children.concat(),[W,Q,Y,X,H,U]=Z;for(let G of Z)this.remove(G);if(J===2000)W.up.set(0,1,0),W.lookAt(1,0,0),Q.up.set(0,1,0),Q.lookAt(-1,0,0),Y.up.set(0,0,-1),Y.lookAt(0,1,0),X.up.set(0,0,1),X.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),U.up.set(0,1,0),U.lookAt(0,0,-1);else if(J===2001)W.up.set(0,-1,0),W.lookAt(-1,0,0),Q.up.set(0,-1,0),Q.lookAt(1,0,0),Y.up.set(0,0,1),Y.lookAt(0,1,0),X.up.set(0,0,-1),X.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),U.up.set(0,-1,0),U.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let G of Z)this.add(G),G.updateMatrixWorld()}update(J,Z){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:W,activeMipmapLevel:Q}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[Y,X,H,U,G,K]=this.children,O=J.getRenderTarget(),F=J.getActiveCubeFace(),q=J.getActiveMipmapLevel(),R=J.xr.enabled;J.xr.enabled=!1;let L=W.texture.generateMipmaps;W.texture.generateMipmaps=!1;let w=!1;if(J.isWebGLRenderer===!0)w=J.state.buffers.depth.getReversed();else w=J.reversedDepthBuffer;if(J.setRenderTarget(W,0,Q),w&&J.autoClear===!1)J.clearDepth();if(J.render(Z,Y),J.setRenderTarget(W,1,Q),w&&J.autoClear===!1)J.clearDepth();if(J.render(Z,X),J.setRenderTarget(W,2,Q),w&&J.autoClear===!1)J.clearDepth();if(J.render(Z,H),J.setRenderTarget(W,3,Q),w&&J.autoClear===!1)J.clearDepth();if(J.render(Z,U),J.setRenderTarget(W,4,Q),w&&J.autoClear===!1)J.clearDepth();if(J.render(Z,G),W.texture.generateMipmaps=L,J.setRenderTarget(W,5,Q),w&&J.autoClear===!1)J.clearDepth();J.render(Z,K),J.setRenderTarget(O,F,q),J.xr.enabled=R,W.texture.needsPMREMUpdate=!0}}class Eq extends _7{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var Sq="\\[\\]\\.:\\/",A_=new RegExp("["+Sq+"]","g"),jq="[^"+Sq+"]",__="[^"+Sq.replace("\\.","")+"]",I_=/((?:WC+[\/:])*)/.source.replace("WC",jq),w_=/(WCOD+)?/.source.replace("WCOD",__),D_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jq),k_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jq),C_=new RegExp("^"+I_+w_+D_+k_+"$"),V_=["material","materials","bones","map"];class vN{constructor(J,Z,W){let Q=W||FJ.parseTrackName(Z);this._targetGroup=J,this._bindings=J.subscribe_(Z,Q)}getValue(J,Z){this.bind();let W=this._targetGroup.nCachedObjects_,Q=this._bindings[W];if(Q!==void 0)Q.getValue(J,Z)}setValue(J,Z){let W=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,Y=W.length;Q!==Y;++Q)W[Q].setValue(J,Z)}bind(){let J=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=J.length;Z!==W;++Z)J[Z].bind()}unbind(){let J=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=J.length;Z!==W;++Z)J[Z].unbind()}}class FJ{constructor(J,Z,W){this.path=Z,this.parsedPath=W||FJ.parseTrackName(Z),this.node=FJ.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Z,W){if(!(J&&J.isAnimationObjectGroup))return new FJ(J,Z,W);else return new FJ.Composite(J,Z,W)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(A_,"")}static parseTrackName(J){let Z=C_.exec(J);if(Z===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let W={nodeName:Z[2],objectName:Z[3],objectIndex:Z[4],propertyName:Z[5],propertyIndex:Z[6]},Q=W.nodeName&&W.nodeName.lastIndexOf(".");if(Q!==void 0&&Q!==-1){let Y=W.nodeName.substring(Q+1);if(V_.indexOf(Y)!==-1)W.nodeName=W.nodeName.substring(0,Q),W.objectName=Y}if(W.propertyName===null||W.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return W}static findNode(J,Z){if(Z===void 0||Z===""||Z==="."||Z===-1||Z===J.name||Z===J.uuid)return J;if(J.skeleton){let W=J.skeleton.getBoneByName(Z);if(W!==void 0)return W}if(J.children){let W=function(Y){for(let X=0;X<Y.length;X++){let H=Y[X];if(H.name===Z||H.uuid===Z)return H;let U=W(H.children);if(U)return U}return null},Q=W(J.children);if(Q)return Q}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Z){J[Z]=this.targetObject[this.propertyName]}_getValue_array(J,Z){let W=this.resolvedProperty;for(let Q=0,Y=W.length;Q!==Y;++Q)J[Z++]=W[Q]}_getValue_arrayElement(J,Z){J[Z]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Z){this.resolvedProperty.toArray(J,Z)}_setValue_direct(J,Z){this.targetObject[this.propertyName]=J[Z]}_setValue_direct_setNeedsUpdate(J,Z){this.targetObject[this.propertyName]=J[Z],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Z){this.targetObject[this.propertyName]=J[Z],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Z){let W=this.resolvedProperty;for(let Q=0,Y=W.length;Q!==Y;++Q)W[Q]=J[Z++]}_setValue_array_setNeedsUpdate(J,Z){let W=this.resolvedProperty;for(let Q=0,Y=W.length;Q!==Y;++Q)W[Q]=J[Z++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Z){let W=this.resolvedProperty;for(let Q=0,Y=W.length;Q!==Y;++Q)W[Q]=J[Z++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Z){this.resolvedProperty[this.propertyIndex]=J[Z]}_setValue_arrayElement_setNeedsUpdate(J,Z){this.resolvedProperty[this.propertyIndex]=J[Z],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Z){this.resolvedProperty[this.propertyIndex]=J[Z],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Z){this.resolvedProperty.fromArray(J,Z)}_setValue_fromArray_setNeedsUpdate(J,Z){this.resolvedProperty.fromArray(J,Z),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Z){this.resolvedProperty.fromArray(J,Z),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Z){this.bind(),this.getValue(J,Z)}_setValue_unbound(J,Z){this.bind(),this.setValue(J,Z)}bind(){let J=this.node,Z=this.parsedPath,W=Z.objectName,Q=Z.propertyName,Y=Z.propertyIndex;if(!J)J=FJ.findNode(this.rootNode,Z.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){j0("PropertyBinding: No target node found for track: "+this.path+".");return}if(W){let G=Z.objectIndex;switch(W){case"materials":if(!J.material){b0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){b0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){b0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let K=0;K<J.length;K++)if(J[K].name===G){G=K;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){b0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){b0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[W]===void 0){b0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[W]}if(G!==void 0){if(J[G]===void 0){b0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[G]}}let X=J[Q];if(X===void 0){let G=Z.nodeName;b0("PropertyBinding: Trying to update property for track: "+G+"."+Q+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let U=this.BindingType.Direct;if(Y!==void 0){if(Q==="morphTargetInfluences"){if(!J.geometry){b0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){b0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[Y]!==void 0)Y=J.morphTargetDictionary[Y]}U=this.BindingType.ArrayElement,this.resolvedProperty=X,this.propertyIndex=Y}else if(X.fromArray!==void 0&&X.toArray!==void 0)U=this.BindingType.HasFromToArray,this.resolvedProperty=X;else if(Array.isArray(X))U=this.BindingType.EntireArray,this.resolvedProperty=X;else this.propertyName=Q;this.getValue=this.GetterByBindingType[U],this.setValue=this.SetterByBindingTypeAndVersioning[U][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}FJ.Composite=vN;FJ.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};FJ.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};FJ.prototype.GetterByBindingType=[FJ.prototype._getValue_direct,FJ.prototype._getValue_array,FJ.prototype._getValue_arrayElement,FJ.prototype._getValue_toArray];FJ.prototype.SetterByBindingTypeAndVersioning=[[FJ.prototype._setValue_direct,FJ.prototype._setValue_direct_setNeedsUpdate,FJ.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[FJ.prototype._setValue_array,FJ.prototype._setValue_array_setNeedsUpdate,FJ.prototype._setValue_array_setMatrixWorldNeedsUpdate],[FJ.prototype._setValue_arrayElement,FJ.prototype._setValue_arrayElement_setNeedsUpdate,FJ.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[FJ.prototype._setValue_fromArray,FJ.prototype._setValue_fromArray_setNeedsUpdate,FJ.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var sk=new Float32Array(1);class fq{static{fq.prototype.isMatrix2=!0}constructor(J,Z,W,Q){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Z,W,Q)}identity(){return this.set(1,0,0,1),this}fromArray(J,Z=0){for(let W=0;W<4;W++)this.elements[W]=J[W+Z];return this}set(J,Z,W,Q){let Y=this.elements;return Y[0]=J,Y[2]=Z,Y[1]=W,Y[3]=Q,this}}function bq(J,Z,W,Q){let Y=T_(Q);switch(W){case 1021:return J*Z;case 1028:return J*Z/Y.components*Y.byteLength;case 1029:return J*Z/Y.components*Y.byteLength;case 1030:return J*Z*2/Y.components*Y.byteLength;case 1031:return J*Z*2/Y.components*Y.byteLength;case 1022:return J*Z*3/Y.components*Y.byteLength;case 1023:return J*Z*4/Y.components*Y.byteLength;case 1033:return J*Z*4/Y.components*Y.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Z+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Z+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Z,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Z,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Z+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Z+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Z+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Z+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Z+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Z+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Z+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Z+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Z+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Z+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Z+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Z+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Z+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Z+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Z+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Z+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Z/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Z/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Z/4)*16}throw Error(`Unable to determine texture byte length for ${W} format.`)}function T_(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));if(typeof window<"u")if(window.__THREE__)j0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="185";function XL(){let J=null,Z=!1,W=null,Q=null;function Y(X,H){W(X,H),Q=J.requestAnimationFrame(Y)}return{start:function(){if(Z===!0)return;if(W===null)return;if(J===null)return;Q=J.requestAnimationFrame(Y),Z=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Q);Z=!1},setAnimationLoop:function(X){W=X},setContext:function(X){J=X}}}function P_(J){let Z=new WeakMap;function W(U,G){let{array:K,usage:O}=U,F=K.byteLength,q=J.createBuffer();J.bindBuffer(G,q),J.bufferData(G,K,O),U.onUploadCallback();let R;if(K instanceof Float32Array)R=J.FLOAT;else if(typeof Float16Array<"u"&&K instanceof Float16Array)R=J.HALF_FLOAT;else if(K instanceof Uint16Array)if(U.isFloat16BufferAttribute)R=J.HALF_FLOAT;else R=J.UNSIGNED_SHORT;else if(K instanceof Int16Array)R=J.SHORT;else if(K instanceof Uint32Array)R=J.UNSIGNED_INT;else if(K instanceof Int32Array)R=J.INT;else if(K instanceof Int8Array)R=J.BYTE;else if(K instanceof Uint8Array)R=J.UNSIGNED_BYTE;else if(K instanceof Uint8ClampedArray)R=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+K);return{buffer:q,type:R,bytesPerElement:K.BYTES_PER_ELEMENT,version:U.version,size:F}}function Q(U,G,K){let{array:O,updateRanges:F}=G;if(J.bindBuffer(K,U),F.length===0)J.bufferSubData(K,0,O);else{F.sort((R,L)=>R.start-L.start);let q=0;for(let R=1;R<F.length;R++){let L=F[q],w=F[R];if(w.start<=L.start+L.count+1)L.count=Math.max(L.count,w.start+w.count-L.start);else++q,F[q]=w}F.length=q+1;for(let R=0,L=F.length;R<L;R++){let w=F[R];J.bufferSubData(K,w.start*O.BYTES_PER_ELEMENT,O,w.start,w.count)}G.clearUpdateRanges()}G.onUploadCallback()}function Y(U){if(U.isInterleavedBufferAttribute)U=U.data;return Z.get(U)}function X(U){if(U.isInterleavedBufferAttribute)U=U.data;let G=Z.get(U);if(G)J.deleteBuffer(G.buffer),Z.delete(U)}function H(U,G){if(U.isInterleavedBufferAttribute)U=U.data;if(U.isGLBufferAttribute){let O=Z.get(U);if(!O||O.version<U.version)Z.set(U,{buffer:U.buffer,type:U.type,bytesPerElement:U.elementSize,version:U.version});return}let K=Z.get(U);if(K===void 0)Z.set(U,W(U,G));else if(K.version<U.version){if(K.size!==U.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Q(K.buffer,U,G),K.version=U.version}}return{get:Y,remove:X,update:H}}var E_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,S_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,j_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,f_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,b_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,y_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,v_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,x_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,h_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,g_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,m_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,p_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,d_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,u_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,l_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,c_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,i_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,s_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,n_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,o_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,a_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,r_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,t_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,e_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,JI=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ZI=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,WI=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,QI=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,YI=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XI=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,HI="gl_FragColor = linearToOutputTexel( gl_FragColor );",UI=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,GI=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,KI=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,qI=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$I=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,OI=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,RI=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,FI=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,MI=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,NI=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,LI=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,BI=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zI=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,AI=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_I=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,II=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,wI=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,DI=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kI=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,CI=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,VI=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,TI=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,PI=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,EI=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,SI=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jI=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,fI=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bI=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yI=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vI=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xI=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hI=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gI=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,mI=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pI=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dI=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uI=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lI=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cI=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iI=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sI=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nI=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,oI=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,aI=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rI=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tI=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,eI=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ww=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Hw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$w=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ow=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Rw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Mw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Nw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Aw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_w=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Iw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ww=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Pw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ew=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,mw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ow=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ew=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JD=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ZD=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WD=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QD=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YD=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,XD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,HD=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,UD=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,GD=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,KD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,d0={alphahash_fragment:E_,alphahash_pars_fragment:S_,alphamap_fragment:j_,alphamap_pars_fragment:f_,alphatest_fragment:b_,alphatest_pars_fragment:y_,aomap_fragment:v_,aomap_pars_fragment:x_,batching_pars_vertex:h_,batching_vertex:g_,begin_vertex:m_,beginnormal_vertex:p_,bsdfs:d_,iridescence_fragment:u_,bumpmap_pars_fragment:l_,clipping_planes_fragment:c_,clipping_planes_pars_fragment:i_,clipping_planes_pars_vertex:s_,clipping_planes_vertex:n_,color_fragment:o_,color_pars_fragment:a_,color_pars_vertex:r_,color_vertex:t_,common:e_,cube_uv_reflection_fragment:JI,defaultnormal_vertex:ZI,displacementmap_pars_vertex:WI,displacementmap_vertex:QI,emissivemap_fragment:YI,emissivemap_pars_fragment:XI,colorspace_fragment:HI,colorspace_pars_fragment:UI,envmap_fragment:GI,envmap_common_pars_fragment:KI,envmap_pars_fragment:qI,envmap_pars_vertex:$I,envmap_physical_pars_fragment:II,envmap_vertex:OI,fog_vertex:RI,fog_pars_vertex:FI,fog_fragment:MI,fog_pars_fragment:NI,gradientmap_pars_fragment:LI,lightmap_pars_fragment:BI,lights_lambert_fragment:zI,lights_lambert_pars_fragment:AI,lights_pars_begin:_I,lights_toon_fragment:wI,lights_toon_pars_fragment:DI,lights_phong_fragment:kI,lights_phong_pars_fragment:CI,lights_physical_fragment:VI,lights_physical_pars_fragment:TI,lights_fragment_begin:PI,lights_fragment_maps:EI,lights_fragment_end:SI,lightprobes_pars_fragment:jI,logdepthbuf_fragment:fI,logdepthbuf_pars_fragment:bI,logdepthbuf_pars_vertex:yI,logdepthbuf_vertex:vI,map_fragment:xI,map_pars_fragment:hI,map_particle_fragment:gI,map_particle_pars_fragment:mI,metalnessmap_fragment:pI,metalnessmap_pars_fragment:dI,morphinstance_vertex:uI,morphcolor_vertex:lI,morphnormal_vertex:cI,morphtarget_pars_vertex:iI,morphtarget_vertex:sI,normal_fragment_begin:nI,normal_fragment_maps:oI,normal_pars_fragment:aI,normal_pars_vertex:rI,normal_vertex:tI,normalmap_pars_fragment:eI,clearcoat_normal_fragment_begin:Jw,clearcoat_normal_fragment_maps:Zw,clearcoat_pars_fragment:Ww,iridescence_pars_fragment:Qw,opaque_fragment:Yw,packing:Xw,premultiplied_alpha_fragment:Hw,project_vertex:Uw,dithering_fragment:Gw,dithering_pars_fragment:Kw,roughnessmap_fragment:qw,roughnessmap_pars_fragment:$w,shadowmap_pars_fragment:Ow,shadowmap_pars_vertex:Rw,shadowmap_vertex:Fw,shadowmask_pars_fragment:Mw,skinbase_vertex:Nw,skinning_pars_vertex:Lw,skinning_vertex:Bw,skinnormal_vertex:zw,specularmap_fragment:Aw,specularmap_pars_fragment:_w,tonemapping_fragment:Iw,tonemapping_pars_fragment:ww,transmission_fragment:Dw,transmission_pars_fragment:kw,uv_pars_fragment:Cw,uv_pars_vertex:Vw,uv_vertex:Tw,worldpos_vertex:Pw,background_vert:Ew,background_frag:Sw,backgroundCube_vert:jw,backgroundCube_frag:fw,cube_vert:bw,cube_frag:yw,depth_vert:vw,depth_frag:xw,distance_vert:hw,distance_frag:gw,equirect_vert:mw,equirect_frag:pw,linedashed_vert:dw,linedashed_frag:uw,meshbasic_vert:lw,meshbasic_frag:cw,meshlambert_vert:iw,meshlambert_frag:sw,meshmatcap_vert:nw,meshmatcap_frag:ow,meshnormal_vert:aw,meshnormal_frag:rw,meshphong_vert:tw,meshphong_frag:ew,meshphysical_vert:JD,meshphysical_frag:ZD,meshtoon_vert:WD,meshtoon_frag:QD,points_vert:YD,points_frag:XD,shadow_vert:HD,shadow_frag:UD,sprite_vert:GD,sprite_frag:KD},N0={common:{diffuse:{value:new a0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new v0},alphaMap:{value:null},alphaMapTransform:{value:new v0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new v0}},envmap:{envMap:{value:null},envMapRotation:{value:new v0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new v0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new v0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new v0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new v0},normalScale:{value:new XJ(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new v0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new v0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new v0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new v0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new a0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new v},probesMax:{value:new v},probesResolution:{value:new v}},points:{diffuse:{value:new a0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new v0},alphaTest:{value:0},uvTransform:{value:new v0}},sprite:{diffuse:{value:new a0(16777215)},opacity:{value:1},center:{value:new XJ(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new v0},alphaMap:{value:null},alphaMapTransform:{value:new v0},alphaTest:{value:0}}},m6={basic:{uniforms:B7([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.fog]),vertexShader:d0.meshbasic_vert,fragmentShader:d0.meshbasic_frag},lambert:{uniforms:B7([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,N0.lights,{emissive:{value:new a0(0)},envMapIntensity:{value:1}}]),vertexShader:d0.meshlambert_vert,fragmentShader:d0.meshlambert_frag},phong:{uniforms:B7([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,N0.lights,{emissive:{value:new a0(0)},specular:{value:new a0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:d0.meshphong_vert,fragmentShader:d0.meshphong_frag},standard:{uniforms:B7([N0.common,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.roughnessmap,N0.metalnessmap,N0.fog,N0.lights,{emissive:{value:new a0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:d0.meshphysical_vert,fragmentShader:d0.meshphysical_frag},toon:{uniforms:B7([N0.common,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.gradientmap,N0.fog,N0.lights,{emissive:{value:new a0(0)}}]),vertexShader:d0.meshtoon_vert,fragmentShader:d0.meshtoon_frag},matcap:{uniforms:B7([N0.common,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,{matcap:{value:null}}]),vertexShader:d0.meshmatcap_vert,fragmentShader:d0.meshmatcap_frag},points:{uniforms:B7([N0.points,N0.fog]),vertexShader:d0.points_vert,fragmentShader:d0.points_frag},dashed:{uniforms:B7([N0.common,N0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:d0.linedashed_vert,fragmentShader:d0.linedashed_frag},depth:{uniforms:B7([N0.common,N0.displacementmap]),vertexShader:d0.depth_vert,fragmentShader:d0.depth_frag},normal:{uniforms:B7([N0.common,N0.bumpmap,N0.normalmap,N0.displacementmap,{opacity:{value:1}}]),vertexShader:d0.meshnormal_vert,fragmentShader:d0.meshnormal_frag},sprite:{uniforms:B7([N0.sprite,N0.fog]),vertexShader:d0.sprite_vert,fragmentShader:d0.sprite_frag},background:{uniforms:{uvTransform:{value:new v0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:d0.background_vert,fragmentShader:d0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new v0}},vertexShader:d0.backgroundCube_vert,fragmentShader:d0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:d0.cube_vert,fragmentShader:d0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:d0.equirect_vert,fragmentShader:d0.equirect_frag},distance:{uniforms:B7([N0.common,N0.displacementmap,{referencePosition:{value:new v},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:d0.distance_vert,fragmentShader:d0.distance_frag},shadow:{uniforms:B7([N0.lights,N0.fog,{color:{value:new a0(0)},opacity:{value:1}}]),vertexShader:d0.shadow_vert,fragmentShader:d0.shadow_frag}};m6.physical={uniforms:B7([m6.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new v0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new v0},clearcoatNormalScale:{value:new XJ(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new v0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new v0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new v0},sheen:{value:0},sheenColor:{value:new a0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new v0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new v0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new v0},transmissionSamplerSize:{value:new XJ},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new v0},attenuationDistance:{value:0},attenuationColor:{value:new a0(0)},specularColor:{value:new a0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new v0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new v0},anisotropyVector:{value:new XJ},anisotropyMap:{value:null},anisotropyMapTransform:{value:new v0}}]),vertexShader:d0.meshphysical_vert,fragmentShader:d0.meshphysical_frag};var bH={r:0,b:0,g:0},qD=new jJ,HL=new v0;HL.set(-1,0,0,0,1,0,0,0,1);function $D(J,Z,W,Q,Y,X){let H=new a0(0),U=Y===!0?0:1,G,K,O=null,F=0,q=null;function R(B){let _=B.isScene===!0?B.background:null;if(_&&_.isTexture){let z=B.backgroundBlurriness>0;_=Z.get(_,z)}return _}function L(B){let _=!1,z=R(B);if(z===null)N(H,U);else if(z&&z.isColor)N(z,1),_=!0;let P=J.xr.getEnvironmentBlendMode();if(P==="additive")W.buffers.color.setClear(0,0,0,1,X);else if(P==="alpha-blend")W.buffers.color.setClear(0,0,0,0,X);if(J.autoClear||_)W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function w(B,_){let z=R(_);if(z&&(z.isCubeTexture||z.mapping===uQ)){if(K===void 0)K=new w6(new AW(1,1,1),new I7({name:"BackgroundCubeMaterial",uniforms:l9(m6.backgroundCube.uniforms),vertexShader:m6.backgroundCube.vertexShader,fragmentShader:m6.backgroundCube.fragmentShader,side:S7,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),K.geometry.deleteAttribute("normal"),K.geometry.deleteAttribute("uv"),K.onBeforeRender=function(P,D,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(K.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Q.update(K);if(K.material.uniforms.envMap.value=z,K.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,K.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,K.material.uniforms.backgroundRotation.value.setFromMatrix4(qD.makeRotationFromEuler(_.backgroundRotation)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1)K.material.uniforms.backgroundRotation.value.premultiply(HL);if(K.material.toneMapped=WJ.getTransfer(z.colorSpace)!==wJ,O!==z||F!==z.version||q!==J.toneMapping)K.material.needsUpdate=!0,O=z,F=z.version,q=J.toneMapping;K.layers.enableAll(),B.unshift(K,K.geometry,K.material,0,0,null)}else if(z&&z.isTexture){if(G===void 0)G=new w6(new tQ(2,2),new I7({name:"BackgroundMaterial",uniforms:l9(m6.background.uniforms),vertexShader:m6.background.vertexShader,fragmentShader:m6.background.fragmentShader,side:MW,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),G.geometry.deleteAttribute("normal"),Object.defineProperty(G.material,"map",{get:function(){return this.uniforms.t2D.value}}),Q.update(G);if(G.material.uniforms.t2D.value=z,G.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,G.material.toneMapped=WJ.getTransfer(z.colorSpace)!==wJ,z.matrixAutoUpdate===!0)z.updateMatrix();if(G.material.uniforms.uvTransform.value.copy(z.matrix),O!==z||F!==z.version||q!==J.toneMapping)G.material.needsUpdate=!0,O=z,F=z.version,q=J.toneMapping;G.layers.enableAll(),B.unshift(G,G.geometry,G.material,0,0,null)}}function N(B,_){B.getRGB(bH,Mq(J)),W.buffers.color.setClear(bH.r,bH.g,bH.b,_,X)}function $(){if(K!==void 0)K.geometry.dispose(),K.material.dispose(),K=void 0;if(G!==void 0)G.geometry.dispose(),G.material.dispose(),G=void 0}return{getClearColor:function(){return H},setClearColor:function(B,_=1){H.set(B),U=_,N(H,U)},getClearAlpha:function(){return U},setClearAlpha:function(B){U=B,N(H,U)},render:L,addToRenderList:w,dispose:$}}function OD(J,Z){let W=J.getParameter(J.MAX_VERTEX_ATTRIBS),Q={},Y=q(null),X=Y,H=!1;function U(E,u,e,b,c){let l=!1,h=F(E,b,e,u);if(X!==h)X=h,K(X.object);if(l=R(E,b,e,c),l)L(E,b,e,c);if(c!==null)Z.update(c,J.ELEMENT_ARRAY_BUFFER);if(l||H){if(H=!1,z(E,u,e,b),c!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Z.get(c).buffer)}}function G(){return J.createVertexArray()}function K(E){return J.bindVertexArray(E)}function O(E){return J.deleteVertexArray(E)}function F(E,u,e,b){let c=b.wireframe===!0,l=Q[u.id];if(l===void 0)l={},Q[u.id]=l;let h=E.isInstancedMesh===!0?E.id:0,g=l[h];if(g===void 0)g={},l[h]=g;let Y0=g[e.id];if(Y0===void 0)Y0={},g[e.id]=Y0;let O0=Y0[c];if(O0===void 0)O0=q(G()),Y0[c]=O0;return O0}function q(E){let u=[],e=[],b=[];for(let c=0;c<W;c++)u[c]=0,e[c]=0,b[c]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:u,enabledAttributes:e,attributeDivisors:b,object:E,attributes:{},index:null}}function R(E,u,e,b){let c=X.attributes,l=u.attributes,h=0,g=e.getAttributes();for(let Y0 in g)if(g[Y0].location>=0){let _0=c[Y0],I0=l[Y0];if(I0===void 0){if(Y0==="instanceMatrix"&&E.instanceMatrix)I0=E.instanceMatrix;if(Y0==="instanceColor"&&E.instanceColor)I0=E.instanceColor}if(_0===void 0)return!0;if(_0.attribute!==I0)return!0;if(I0&&_0.data!==I0.data)return!0;h++}if(X.attributesNum!==h)return!0;if(X.index!==b)return!0;return!1}function L(E,u,e,b){let c={},l=u.attributes,h=0,g=e.getAttributes();for(let Y0 in g)if(g[Y0].location>=0){let _0=l[Y0];if(_0===void 0){if(Y0==="instanceMatrix"&&E.instanceMatrix)_0=E.instanceMatrix;if(Y0==="instanceColor"&&E.instanceColor)_0=E.instanceColor}let I0={};if(I0.attribute=_0,_0&&_0.data)I0.data=_0.data;c[Y0]=I0,h++}X.attributes=c,X.attributesNum=h,X.index=b}function w(){let E=X.newAttributes;for(let u=0,e=E.length;u<e;u++)E[u]=0}function N(E){$(E,0)}function $(E,u){let{newAttributes:e,enabledAttributes:b,attributeDivisors:c}=X;if(e[E]=1,b[E]===0)J.enableVertexAttribArray(E),b[E]=1;if(c[E]!==u)J.vertexAttribDivisor(E,u),c[E]=u}function B(){let{newAttributes:E,enabledAttributes:u}=X;for(let e=0,b=u.length;e<b;e++)if(u[e]!==E[e])J.disableVertexAttribArray(e),u[e]=0}function _(E,u,e,b,c,l,h){if(h===!0)J.vertexAttribIPointer(E,u,e,c,l);else J.vertexAttribPointer(E,u,e,b,c,l)}function z(E,u,e,b){w();let c=b.attributes,l=e.getAttributes(),h=u.defaultAttributeValues;for(let g in l){let Y0=l[g];if(Y0.location>=0){let O0=c[g];if(O0===void 0){if(g==="instanceMatrix"&&E.instanceMatrix)O0=E.instanceMatrix;if(g==="instanceColor"&&E.instanceColor)O0=E.instanceColor}if(O0!==void 0){let{normalized:_0,itemSize:I0}=O0,zJ=Z.get(O0);if(zJ===void 0)continue;let{buffer:HJ,type:t,bytesPerElement:q0}=zJ,A0=t===J.INT||t===J.UNSIGNED_INT||O0.gpuType===A5;if(O0.isInterleavedBufferAttribute){let L0=O0.data,V0=L0.stride,r0=O0.offset;if(L0.isInstancedInterleavedBuffer){for(let m0=0;m0<Y0.locationSize;m0++)$(Y0.location+m0,L0.meshPerAttribute);if(E.isInstancedMesh!==!0&&b._maxInstanceCount===void 0)b._maxInstanceCount=L0.meshPerAttribute*L0.count}else for(let m0=0;m0<Y0.locationSize;m0++)N(Y0.location+m0);J.bindBuffer(J.ARRAY_BUFFER,HJ);for(let m0=0;m0<Y0.locationSize;m0++)_(Y0.location+m0,I0/Y0.locationSize,t,_0,V0*q0,(r0+I0/Y0.locationSize*m0)*q0,A0)}else{if(O0.isInstancedBufferAttribute){for(let L0=0;L0<Y0.locationSize;L0++)$(Y0.location+L0,O0.meshPerAttribute);if(E.isInstancedMesh!==!0&&b._maxInstanceCount===void 0)b._maxInstanceCount=O0.meshPerAttribute*O0.count}else for(let L0=0;L0<Y0.locationSize;L0++)N(Y0.location+L0);J.bindBuffer(J.ARRAY_BUFFER,HJ);for(let L0=0;L0<Y0.locationSize;L0++)_(Y0.location+L0,I0/Y0.locationSize,t,_0,I0*q0,I0/Y0.locationSize*L0*q0,A0)}}else if(h!==void 0){let _0=h[g];if(_0!==void 0)switch(_0.length){case 2:J.vertexAttrib2fv(Y0.location,_0);break;case 3:J.vertexAttrib3fv(Y0.location,_0);break;case 4:J.vertexAttrib4fv(Y0.location,_0);break;default:J.vertexAttrib1fv(Y0.location,_0)}}}}B()}function P(){C();for(let E in Q){let u=Q[E];for(let e in u){let b=u[e];for(let c in b){let l=b[c];for(let h in l)O(l[h].object),delete l[h];delete b[c]}}delete Q[E]}}function D(E){if(Q[E.id]===void 0)return;let u=Q[E.id];for(let e in u){let b=u[e];for(let c in b){let l=b[c];for(let h in l)O(l[h].object),delete l[h];delete b[c]}}delete Q[E.id]}function T(E){for(let u in Q){let e=Q[u];for(let b in e){let c=e[b];if(c[E.id]===void 0)continue;let l=c[E.id];for(let h in l)O(l[h].object),delete l[h];delete c[E.id]}}}function A(E){for(let u in Q){let e=Q[u],b=E.isInstancedMesh===!0?E.id:0,c=e[b];if(c===void 0)continue;for(let l in c){let h=c[l];for(let g in h)O(h[g].object),delete h[g];delete c[l]}if(delete e[b],Object.keys(e).length===0)delete Q[u]}}function C(){if(x(),H=!0,X===Y)return;X=Y,K(X.object)}function x(){Y.geometry=null,Y.program=null,Y.wireframe=!1}return{setup:U,reset:C,resetDefaultState:x,dispose:P,releaseStatesOfGeometry:D,releaseStatesOfObject:A,releaseStatesOfProgram:T,initAttributes:w,enableAttribute:N,disableUnusedAttributes:B}}function RD(J,Z,W){let Q;function Y(G){Q=G}function X(G,K){J.drawArrays(Q,G,K),W.update(K,Q,1)}function H(G,K,O){if(O===0)return;J.drawArraysInstanced(Q,G,K,O),W.update(K,Q,O)}function U(G,K,O){if(O===0)return;Z.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Q,G,0,K,0,O);let q=0;for(let R=0;R<O;R++)q+=K[R];W.update(q,Q,1)}this.setMode=Y,this.render=X,this.renderInstances=H,this.renderMultiDraw=U}function FD(J,Z,W,Q){let Y;function X(){if(Y!==void 0)return Y;if(Z.has("EXT_texture_filter_anisotropic")===!0){let T=Z.get("EXT_texture_filter_anisotropic");Y=J.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Y=0;return Y}function H(T){if(T!==h6&&Q.convert(T)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function U(T){let A=T===M8&&(Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float"));if(T!==I6&&Q.convert(T)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==F8&&!A)return!1;return!0}function G(T){if(T==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";T="mediump"}if(T==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let K=W.precision!==void 0?W.precision:"highp",O=G(K);if(O!==K)j0("WebGLRenderer:",K,"not supported, using",O,"instead."),K=O;let F=W.logarithmicDepthBuffer===!0,q=W.reversedDepthBuffer===!0&&Z.has("EXT_clip_control");if(W.reversedDepthBuffer===!0&&q===!1)j0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let R=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),L=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=J.getParameter(J.MAX_TEXTURE_SIZE),N=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),$=J.getParameter(J.MAX_VERTEX_ATTRIBS),B=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),_=J.getParameter(J.MAX_VARYING_VECTORS),z=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),P=J.getParameter(J.MAX_SAMPLES),D=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:X,getMaxPrecision:G,textureFormatReadable:H,textureTypeReadable:U,precision:K,logarithmicDepthBuffer:F,reversedDepthBuffer:q,maxTextures:R,maxVertexTextures:L,maxTextureSize:w,maxCubemapSize:N,maxAttributes:$,maxVertexUniforms:B,maxVaryings:_,maxFragmentUniforms:z,maxSamples:P,samples:D}}function MD(J){let Z=this,W=null,Q=0,Y=!1,X=!1,H=new O8,U=new v0,G={value:null,needsUpdate:!1};this.uniform=G,this.numPlanes=0,this.numIntersection=0,this.init=function(F,q){let R=F.length!==0||q||Q!==0||Y;return Y=q,Q=F.length,R},this.beginShadows=function(){X=!0,O(null)},this.endShadows=function(){X=!1},this.setGlobalState=function(F,q){W=O(F,q,0)},this.setState=function(F,q,R){let{clippingPlanes:L,clipIntersection:w,clipShadows:N}=F,$=J.get(F);if(!Y||L===null||L.length===0||X&&!N)if(X)O(null);else K();else{let B=X?0:Q,_=B*4,z=$.clippingState||null;G.value=z,z=O(L,q,_,R);for(let P=0;P!==_;++P)z[P]=W[P];$.clippingState=z,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=B}};function K(){if(G.value!==W)G.value=W,G.needsUpdate=Q>0;Z.numPlanes=Q,Z.numIntersection=0}function O(F,q,R,L){let w=F!==null?F.length:0,N=null;if(w!==0){if(N=G.value,L!==!0||N===null){let $=R+w*4,B=q.matrixWorldInverse;if(U.getNormalMatrix(B),N===null||N.length<$)N=new Float32Array($);for(let _=0,z=R;_!==w;++_,z+=4)H.copy(F[_]).applyMatrix4(B,U),H.normal.toArray(N,z),N[z+3]=H.constant}G.value=N,G.needsUpdate=!0}return Z.numPlanes=w,Z.numIntersection=0,N}}var U9=4,xN=[0.125,0.215,0.35,0.446,0.526,0.582],n9=20,ND=256,eQ=new fH,hN=new a0,yq=null,vq=0,xq=0,hq=!1,LD=new v;class pq{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Z=0,W=0.1,Q=100,Y={}){let{size:X=256,position:H=LD}=Y;yq=this._renderer.getRenderTarget(),vq=this._renderer.getActiveCubeFace(),xq=this._renderer.getActiveMipmapLevel(),hq=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(X);let U=this._allocateTargets();if(U.depthBuffer=!0,this._sceneToCubeUV(J,W,Q,U,H),Z>0)this._blur(U,0,0,Z);return this._applyPMREM(U),this._cleanup(U),U}fromEquirectangular(J,Z=null){return this._fromTexture(J,Z)}fromCubemap(J,Z=null){return this._fromTexture(J,Z)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=pN(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=mN(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(yq,vq,xq),this._renderer.xr.enabled=hq,J.scissorTest=!1,_W(J,0,0,J.width,J.height)}_fromTexture(J,Z){if(J.mapping===LW||J.mapping===v9)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);yq=this._renderer.getRenderTarget(),vq=this._renderer.getActiveCubeFace(),xq=this._renderer.getActiveMipmapLevel(),hq=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let W=Z||this._allocateTargets();return this._textureToCubeUV(J,W),this._applyPMREM(W),this._cleanup(W),W}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Z=4*this._cubeSize,W={magFilter:j7,minFilter:j7,generateMipmaps:!1,type:M8,format:h6,colorSpace:Qq,depthBuffer:!1},Q=gN(J,Z,W);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Z){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=gN(J,Z,W);let{_lodMax:Y}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=BD(Y)),this._blurMaterial=AD(Y,J,Z),this._ggxMaterial=zD(Y,J,Z)}return Q}_compileMaterial(J){let Z=new w6(new O7,J);this._renderer.compile(Z,eQ)}_sceneToCubeUV(J,Z,W,Q,Y){let U=new _7(90,1,Z,W),G=[1,-1,1,1,1,1],K=[1,1,1,-1,-1,-1],O=this._renderer,F=O.autoClear,q=O.toneMapping;if(O.getClearColor(hN),O.toneMapping=_6,O.autoClear=!1,O.state.buffers.depth.getReversed())O.setRenderTarget(Q),O.clearDepth(),O.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new w6(new AW,new kH({name:"PMREM.Background",side:S7,depthWrite:!1,depthTest:!1}));let L=this._backgroundBox,w=L.material,N=!1,$=J.background;if($){if($.isColor)w.color.copy($),J.background=null,N=!0}else w.color.copy(hN),N=!0;for(let B=0;B<6;B++){let _=B%3;if(_===0)U.up.set(0,G[B],0),U.position.set(Y.x,Y.y,Y.z),U.lookAt(Y.x+K[B],Y.y,Y.z);else if(_===1)U.up.set(0,0,G[B]),U.position.set(Y.x,Y.y,Y.z),U.lookAt(Y.x,Y.y+K[B],Y.z);else U.up.set(0,G[B],0),U.position.set(Y.x,Y.y,Y.z),U.lookAt(Y.x,Y.y,Y.z+K[B]);let z=this._cubeSize;if(_W(Q,_*z,B>2?z:0,z,z),O.setRenderTarget(Q),N)O.render(L,U);O.render(J,U)}O.toneMapping=q,O.autoClear=F,J.background=$}_textureToCubeUV(J,Z){let W=this._renderer,Q=J.mapping===LW||J.mapping===v9;if(Q){if(this._cubemapMaterial===null)this._cubemapMaterial=pN();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=mN();let Y=Q?this._cubemapMaterial:this._equirectMaterial,X=this._lodMeshes[0];X.material=Y;let H=Y.uniforms;H.envMap.value=J;let U=this._cubeSize;_W(Z,0,0,3*U,2*U),W.setRenderTarget(Z),W.render(X,eQ)}_applyPMREM(J){let Z=this._renderer,W=Z.autoClear;Z.autoClear=!1;let Q=this._lodMeshes.length;for(let Y=1;Y<Q;Y++)this._applyGGXFilter(J,Y-1,Y);Z.autoClear=W}_applyGGXFilter(J,Z,W){let Q=this._renderer,Y=this._pingPongRenderTarget,X=this._ggxMaterial,H=this._lodMeshes[W];H.material=X;let U=X.uniforms,G=W/(this._lodMeshes.length-1),K=Z/(this._lodMeshes.length-1),O=Math.sqrt(G*G-K*K),F=0+G*1.25,q=O*F,{_lodMax:R}=this,L=this._sizeLods[W],w=3*L*(W>R-U9?W-R+U9:0),N=4*(this._cubeSize-L);U.envMap.value=J.texture,U.roughness.value=q,U.mipInt.value=R-Z,_W(Y,w,N,3*L,2*L),Q.setRenderTarget(Y),Q.render(H,eQ),U.envMap.value=Y.texture,U.roughness.value=0,U.mipInt.value=R-W,_W(J,w,N,3*L,2*L),Q.setRenderTarget(J),Q.render(H,eQ)}_blur(J,Z,W,Q,Y){let X=this._pingPongRenderTarget;this._halfBlur(J,X,Z,W,Q,"latitudinal",Y),this._halfBlur(X,J,W,W,Q,"longitudinal",Y)}_halfBlur(J,Z,W,Q,Y,X,H){let U=this._renderer,G=this._blurMaterial;if(X!=="latitudinal"&&X!=="longitudinal")b0("blur direction must be either latitudinal or longitudinal!");let K=3,O=this._lodMeshes[Q];O.material=G;let F=G.uniforms,q=this._sizeLods[W]-1,R=isFinite(Y)?Math.PI/(2*q):2*Math.PI/(2*n9-1),L=Y/R,w=isFinite(Y)?1+Math.floor(K*L):n9;if(w>n9)j0(`sigmaRadians, ${Y}, is too large and will clip, as it requested ${w} samples when the maximum is set to ${n9}`);let N=[],$=0;for(let D=0;D<n9;++D){let T=D/L,A=Math.exp(-T*T/2);if(N.push(A),D===0)$+=A;else if(D<w)$+=2*A}for(let D=0;D<N.length;D++)N[D]=N[D]/$;if(F.envMap.value=J.texture,F.samples.value=w,F.weights.value=N,F.latitudinal.value=X==="latitudinal",H)F.poleAxis.value=H;let{_lodMax:B}=this;F.dTheta.value=R,F.mipInt.value=B-W;let _=this._sizeLods[Q],z=3*_*(Q>B-U9?Q-B+U9:0),P=4*(this._cubeSize-_);_W(Z,z,P,3*_,2*_),U.setRenderTarget(Z),U.render(O,eQ)}}function BD(J){let Z=[],W=[],Q=[],Y=J,X=J-U9+1+xN.length;for(let H=0;H<X;H++){let U=Math.pow(2,Y);Z.push(U);let G=1/U;if(H>J-U9)G=xN[H-J+U9-1];else if(H===0)G=0;W.push(G);let K=1/(U-2),O=-K,F=1+K,q=[O,O,F,O,F,F,O,O,F,F,O,F],R=6,L=6,w=3,N=2,$=1,B=new Float32Array(w*L*R),_=new Float32Array(N*L*R),z=new Float32Array($*L*R);for(let D=0;D<R;D++){let T=D%3*2/3-1,A=D>2?0:-1,C=[T,A,0,T+0.6666666666666666,A,0,T+0.6666666666666666,A+1,0,T,A,0,T+0.6666666666666666,A+1,0,T,A+1,0];B.set(C,w*L*D),_.set(q,N*L*D);let x=[D,D,D,D,D,D];z.set(x,$*L*D)}let P=new O7;if(P.setAttribute("position",new mJ(B,w)),P.setAttribute("uv",new mJ(_,N)),P.setAttribute("faceIndex",new mJ(z,$)),Q.push(new w6(P,null)),Y>U9)Y--}return{lodMeshes:Q,sizeLods:Z,sigmas:W}}function gN(J,Z,W){let Q=new $6(J,Z,W);return Q.texture.mapping=uQ,Q.texture.name="PMREM.cubeUv",Q.scissorTest=!0,Q}function _W(J,Z,W,Q,Y){J.viewport.set(Z,W,Q,Y),J.scissor.set(Z,W,Q,Y)}function zD(J,Z,W){return new I7({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ND,CUBEUV_TEXEL_WIDTH:1/Z,CUBEUV_TEXEL_HEIGHT:1/W,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:vH(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:x6,depthTest:!1,depthWrite:!1})}function AD(J,Z,W){let Q=new Float32Array(n9),Y=new v(0,1,0);return new I7({name:"SphericalGaussianBlur",defines:{n:n9,CUBEUV_TEXEL_WIDTH:1/Z,CUBEUV_TEXEL_HEIGHT:1/W,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Q},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:Y}},vertexShader:vH(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:x6,depthTest:!1,depthWrite:!1})}function mN(){return new I7({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vH(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:x6,depthTest:!1,depthWrite:!1})}function pN(){return new I7({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vH(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:x6,depthTest:!1,depthWrite:!1})}function vH(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class lq extends $6{constructor(J=1,Z={}){super(J,J,Z);this.isWebGLCubeRenderTarget=!0;let W={width:J,height:J,depth:1},Q=[W,W,W,W,W,W];this.texture=new TH(Q),this._setTextureOptions(Z),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Z){this.texture.type=Z.type,this.texture.colorSpace=Z.colorSpace,this.texture.generateMipmaps=Z.generateMipmaps,this.texture.minFilter=Z.minFilter,this.texture.magFilter=Z.magFilter;let W={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},Q=new AW(5,5,5),Y=new I7({name:"CubemapFromEquirect",uniforms:l9(W.uniforms),vertexShader:W.vertexShader,fragmentShader:W.fragmentShader,side:S7,blending:x6});Y.uniforms.tEquirect.value=Z;let X=new w6(Q,Y),H=Z.minFilter;if(Z.minFilter===x9)Z.minFilter=j7;return new Pq(1,10,this).update(J,X),Z.minFilter=H,X.geometry.dispose(),X.material.dispose(),this}clear(J,Z=!0,W=!0,Q=!0){let Y=J.getRenderTarget();for(let X=0;X<6;X++)J.setRenderTarget(this,X),J.clear(Z,W,Q);J.setRenderTarget(Y)}}function _D(J){let Z=new WeakMap,W=new WeakMap,Q=null;function Y(q,R=!1){if(q===null||q===void 0)return null;if(R)return H(q);return X(q)}function X(q){if(q&&q.isTexture){let R=q.mapping;if(R===GH||R===KH)if(Z.has(q)){let L=Z.get(q).texture;return U(L,q.mapping)}else{let L=q.image;if(L&&L.height>0){let w=new lq(L.height);return w.fromEquirectangularTexture(J,q),Z.set(q,w),q.addEventListener("dispose",K),U(w.texture,q.mapping)}else return null}}return q}function H(q){if(q&&q.isTexture){let R=q.mapping,L=R===GH||R===KH,w=R===LW||R===v9;if(L||w){let N=W.get(q),$=N!==void 0?N.texture.pmremVersion:0;if(q.isRenderTargetTexture&&q.pmremVersion!==$){if(Q===null)Q=new pq(J);return N=L?Q.fromEquirectangular(q,N):Q.fromCubemap(q,N),N.texture.pmremVersion=q.pmremVersion,W.set(q,N),N.texture}else if(N!==void 0)return N.texture;else{let B=q.image;if(L&&B&&B.height>0||w&&B&&G(B)){if(Q===null)Q=new pq(J);return N=L?Q.fromEquirectangular(q):Q.fromCubemap(q),N.texture.pmremVersion=q.pmremVersion,W.set(q,N),q.addEventListener("dispose",O),N.texture}else return null}}}return q}function U(q,R){if(R===GH)q.mapping=LW;else if(R===KH)q.mapping=v9;return q}function G(q){let R=0,L=6;for(let w=0;w<L;w++)if(q[w]!==void 0)R++;return R===L}function K(q){let R=q.target;R.removeEventListener("dispose",K);let L=Z.get(R);if(L!==void 0)Z.delete(R),L.dispose()}function O(q){let R=q.target;R.removeEventListener("dispose",O);let L=W.get(R);if(L!==void 0)W.delete(R),L.dispose()}function F(){if(Z=new WeakMap,W=new WeakMap,Q!==null)Q.dispose(),Q=null}return{get:Y,dispose:F}}function ID(J){let Z={};function W(Q){if(Z[Q]!==void 0)return Z[Q];let Y=J.getExtension(Q);return Z[Q]=Y,Y}return{has:function(Q){return W(Q)!==null},init:function(){W("EXT_color_buffer_float"),W("WEBGL_clip_cull_distance"),W("OES_texture_float_linear"),W("EXT_color_buffer_half_float"),W("WEBGL_multisampled_render_to_texture"),W("WEBGL_render_shared_exponent")},get:function(Q){let Y=W(Q);if(Y===null)y9("WebGLRenderer: "+Q+" extension not supported.");return Y}}}function wD(J,Z,W,Q){let Y={},X=new WeakMap;function H(F){let q=F.target;if(q.index!==null)Z.remove(q.index);for(let L in q.attributes)Z.remove(q.attributes[L]);q.removeEventListener("dispose",H),delete Y[q.id];let R=X.get(q);if(R)Z.remove(R),X.delete(q);if(Q.releaseStatesOfGeometry(q),q.isInstancedBufferGeometry===!0)delete q._maxInstanceCount;W.memory.geometries--}function U(F,q){if(Y[q.id]===!0)return q;return q.addEventListener("dispose",H),Y[q.id]=!0,W.memory.geometries++,q}function G(F){let q=F.attributes;for(let R in q)Z.update(q[R],J.ARRAY_BUFFER)}function K(F){let q=[],R=F.index,L=F.attributes.position,w=0;if(L===void 0)return;if(R!==null){let B=R.array;w=R.version;for(let _=0,z=B.length;_<z;_+=3){let P=B[_+0],D=B[_+1],T=B[_+2];q.push(P,D,D,T,T,P)}}else{let B=L.array;w=L.version;for(let _=0,z=B.length/3-1;_<z;_+=3){let P=_+0,D=_+1,T=_+2;q.push(P,D,D,T,T,P)}}let N=new(L.count>=65535?DH:wH)(q,1);N.version=w;let $=X.get(F);if($)Z.remove($);X.set(F,N)}function O(F){let q=X.get(F);if(q){let R=F.index;if(R!==null){if(q.version<R.version)K(F)}}else K(F);return X.get(F)}return{get:U,update:G,getWireframeAttribute:O}}function DD(J,Z,W){let Q;function Y(F){Q=F}let X,H;function U(F){X=F.type,H=F.bytesPerElement}function G(F,q){J.drawElements(Q,q,X,F*H),W.update(q,Q,1)}function K(F,q,R){if(R===0)return;J.drawElementsInstanced(Q,q,X,F*H,R),W.update(q,Q,R)}function O(F,q,R){if(R===0)return;Z.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Q,q,0,X,F,0,R);let w=0;for(let N=0;N<R;N++)w+=q[N];W.update(w,Q,1)}this.setMode=Y,this.setIndex=U,this.render=G,this.renderInstances=K,this.renderMultiDraw=O}function kD(J){let Z={geometries:0,textures:0},W={frame:0,calls:0,triangles:0,points:0,lines:0};function Q(X,H,U){switch(W.calls++,H){case J.TRIANGLES:W.triangles+=U*(X/3);break;case J.LINES:W.lines+=U*(X/2);break;case J.LINE_STRIP:W.lines+=U*(X-1);break;case J.LINE_LOOP:W.lines+=U*X;break;case J.POINTS:W.points+=U*X;break;default:b0("WebGLInfo: Unknown draw mode:",H);break}}function Y(){W.calls=0,W.triangles=0,W.points=0,W.lines=0}return{memory:Z,render:W,programs:null,autoReset:!0,reset:Y,update:Q}}function CD(J,Z,W){let Q=new WeakMap,Y=new bJ;function X(H,U,G){let K=H.morphTargetInfluences,O=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,F=O!==void 0?O.length:0,q=Q.get(U);if(q===void 0||q.count!==F){let C=function(){T.dispose(),Q.delete(U),U.removeEventListener("dispose",C)};if(q!==void 0)q.texture.dispose();let R=U.morphAttributes.position!==void 0,L=U.morphAttributes.normal!==void 0,w=U.morphAttributes.color!==void 0,N=U.morphAttributes.position||[],$=U.morphAttributes.normal||[],B=U.morphAttributes.color||[],_=0;if(R===!0)_=1;if(L===!0)_=2;if(w===!0)_=3;let z=U.attributes.position.count*_,P=1;if(z>Z.maxTextureSize)P=Math.ceil(z/Z.maxTextureSize),z=Z.maxTextureSize;let D=new Float32Array(z*P*4*F),T=new AH(D,z,P,F);T.type=F8,T.needsUpdate=!0;let A=_*4;for(let x=0;x<F;x++){let E=N[x],u=$[x],e=B[x],b=z*P*4*x;for(let c=0;c<E.count;c++){let l=c*A;if(R===!0)Y.fromBufferAttribute(E,c),D[b+l+0]=Y.x,D[b+l+1]=Y.y,D[b+l+2]=Y.z,D[b+l+3]=0;if(L===!0)Y.fromBufferAttribute(u,c),D[b+l+4]=Y.x,D[b+l+5]=Y.y,D[b+l+6]=Y.z,D[b+l+7]=0;if(w===!0)Y.fromBufferAttribute(e,c),D[b+l+8]=Y.x,D[b+l+9]=Y.y,D[b+l+10]=Y.z,D[b+l+11]=e.itemSize===4?Y.w:1}}q={count:F,texture:T,size:new XJ(z,P)},Q.set(U,q),U.addEventListener("dispose",C)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)G.getUniforms().setValue(J,"morphTexture",H.morphTexture,W);else{let R=0;for(let w=0;w<K.length;w++)R+=K[w];let L=U.morphTargetsRelative?1:1-R;G.getUniforms().setValue(J,"morphTargetBaseInfluence",L),G.getUniforms().setValue(J,"morphTargetInfluences",K)}G.getUniforms().setValue(J,"morphTargetsTexture",q.texture,W),G.getUniforms().setValue(J,"morphTargetsTextureSize",q.size)}return{update:X}}function VD(J,Z,W,Q,Y){let X=new WeakMap;function H(K){let O=Y.render.frame,F=K.geometry,q=Z.get(K,F);if(X.get(q)!==O)Z.update(q),X.set(q,O);if(K.isInstancedMesh){if(K.hasEventListener("dispose",G)===!1)K.addEventListener("dispose",G);if(X.get(K)!==O){if(W.update(K.instanceMatrix,J.ARRAY_BUFFER),K.instanceColor!==null)W.update(K.instanceColor,J.ARRAY_BUFFER);X.set(K,O)}}if(K.isSkinnedMesh){let R=K.skeleton;if(X.get(R)!==O)R.update(),X.set(R,O)}return q}function U(){X=new WeakMap}function G(K){let O=K.target;if(O.removeEventListener("dispose",G),Q.releaseStatesOfObject(O),W.remove(O.instanceMatrix),O.instanceColor!==null)W.remove(O.instanceColor)}return{update:H,dispose:U}}var TD={[R5]:"LINEAR_TONE_MAPPING",[F5]:"REINHARD_TONE_MAPPING",[M5]:"CINEON_TONE_MAPPING",[N5]:"ACES_FILMIC_TONE_MAPPING",[B5]:"AGX_TONE_MAPPING",[z5]:"NEUTRAL_TONE_MAPPING",[L5]:"CUSTOM_TONE_MAPPING"};function PD(J,Z,W,Q,Y,X){let H=new $6(Z,W,{type:J,depthBuffer:Y,stencilBuffer:X,samples:Q?4:0,depthTexture:Y?new H9(Z,W):void 0}),U=new $6(Z,W,{type:M8,depthBuffer:!1,stencilBuffer:!1}),G=new O7;G.setAttribute("position",new n7([-1,3,0,-1,-1,0,3,-1,0],3)),G.setAttribute("uv",new n7([0,2,0,0,2,0],2));let K=new Nq({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),O=new w6(G,K),F=new fH(-1,1,1,-1,0,1),q=null,R=null,L=!1,w,N=null,$=[],B=!1;this.setSize=function(_,z){H.setSize(_,z),U.setSize(_,z);for(let P=0;P<$.length;P++){let D=$[P];if(D.setSize)D.setSize(_,z)}},this.setEffects=function(_){$=_,B=$.length>0&&$[0].isRenderPass===!0;let{width:z,height:P}=H;for(let D=0;D<$.length;D++){let T=$[D];if(T.setSize)T.setSize(z,P)}},this.begin=function(_,z){if(L)return!1;if(_.toneMapping===_6&&$.length===0)return!1;if(N=z,z!==null){let{width:P,height:D}=z;if(H.width!==P||H.height!==D)this.setSize(P,D)}if(B===!1)_.setRenderTarget(H);return w=_.toneMapping,_.toneMapping=_6,!0},this.hasRenderPass=function(){return B},this.end=function(_,z){_.toneMapping=w,L=!0;let P=H,D=U;for(let T=0;T<$.length;T++){let A=$[T];if(A.enabled===!1)continue;if(A.render(_,D,P,z),A.needsSwap!==!1){let C=P;P=D,D=C}}if(q!==_.outputColorSpace||R!==_.toneMapping){if(q=_.outputColorSpace,R=_.toneMapping,K.defines={},WJ.getTransfer(q)===wJ)K.defines.SRGB_TRANSFER="";let T=TD[R];if(T)K.defines[T]="";K.needsUpdate=!0}K.uniforms.tDiffuse.value=P.texture,_.setRenderTarget(N),_.render(O,F),N=null,L=!1},this.isCompositing=function(){return L},this.dispose=function(){if(H.depthTexture)H.depthTexture.dispose();H.dispose(),U.dispose(),G.dispose(),K.dispose()}}var UL=new N7,dq=new H9(1,1),GL=new AH,KL=new qq,qL=new TH,dN=[],uN=[],lN=new Float32Array(16),cN=new Float32Array(9),iN=new Float32Array(4);function IW(J,Z,W){let Q=J[0];if(Q<=0||Q>0)return J;let Y=Z*W,X=dN[Y];if(X===void 0)X=new Float32Array(Y),dN[Y]=X;if(Z!==0){Q.toArray(X,0);for(let H=1,U=0;H!==Z;++H)U+=W,J[H].toArray(X,U)}return X}function eJ(J,Z){if(J.length!==Z.length)return!1;for(let W=0,Q=J.length;W<Q;W++)if(J[W]!==Z[W])return!1;return!0}function J7(J,Z){for(let W=0,Q=Z.length;W<Q;W++)J[W]=Z[W]}function xH(J,Z){let W=uN[Z];if(W===void 0)W=new Int32Array(Z),uN[Z]=W;for(let Q=0;Q!==Z;++Q)W[Q]=J.allocateTextureUnit();return W}function ED(J,Z){let W=this.cache;if(W[0]===Z)return;J.uniform1f(this.addr,Z),W[0]=Z}function SD(J,Z){let W=this.cache;if(Z.x!==void 0){if(W[0]!==Z.x||W[1]!==Z.y)J.uniform2f(this.addr,Z.x,Z.y),W[0]=Z.x,W[1]=Z.y}else{if(eJ(W,Z))return;J.uniform2fv(this.addr,Z),J7(W,Z)}}function jD(J,Z){let W=this.cache;if(Z.x!==void 0){if(W[0]!==Z.x||W[1]!==Z.y||W[2]!==Z.z)J.uniform3f(this.addr,Z.x,Z.y,Z.z),W[0]=Z.x,W[1]=Z.y,W[2]=Z.z}else if(Z.r!==void 0){if(W[0]!==Z.r||W[1]!==Z.g||W[2]!==Z.b)J.uniform3f(this.addr,Z.r,Z.g,Z.b),W[0]=Z.r,W[1]=Z.g,W[2]=Z.b}else{if(eJ(W,Z))return;J.uniform3fv(this.addr,Z),J7(W,Z)}}function fD(J,Z){let W=this.cache;if(Z.x!==void 0){if(W[0]!==Z.x||W[1]!==Z.y||W[2]!==Z.z||W[3]!==Z.w)J.uniform4f(this.addr,Z.x,Z.y,Z.z,Z.w),W[0]=Z.x,W[1]=Z.y,W[2]=Z.z,W[3]=Z.w}else{if(eJ(W,Z))return;J.uniform4fv(this.addr,Z),J7(W,Z)}}function bD(J,Z){let W=this.cache,Q=Z.elements;if(Q===void 0){if(eJ(W,Z))return;J.uniformMatrix2fv(this.addr,!1,Z),J7(W,Z)}else{if(eJ(W,Q))return;iN.set(Q),J.uniformMatrix2fv(this.addr,!1,iN),J7(W,Q)}}function yD(J,Z){let W=this.cache,Q=Z.elements;if(Q===void 0){if(eJ(W,Z))return;J.uniformMatrix3fv(this.addr,!1,Z),J7(W,Z)}else{if(eJ(W,Q))return;cN.set(Q),J.uniformMatrix3fv(this.addr,!1,cN),J7(W,Q)}}function vD(J,Z){let W=this.cache,Q=Z.elements;if(Q===void 0){if(eJ(W,Z))return;J.uniformMatrix4fv(this.addr,!1,Z),J7(W,Z)}else{if(eJ(W,Q))return;lN.set(Q),J.uniformMatrix4fv(this.addr,!1,lN),J7(W,Q)}}function xD(J,Z){let W=this.cache;if(W[0]===Z)return;J.uniform1i(this.addr,Z),W[0]=Z}function hD(J,Z){let W=this.cache;if(Z.x!==void 0){if(W[0]!==Z.x||W[1]!==Z.y)J.uniform2i(this.addr,Z.x,Z.y),W[0]=Z.x,W[1]=Z.y}else{if(eJ(W,Z))return;J.uniform2iv(this.addr,Z),J7(W,Z)}}function gD(J,Z){let W=this.cache;if(Z.x!==void 0){if(W[0]!==Z.x||W[1]!==Z.y||W[2]!==Z.z)J.uniform3i(this.addr,Z.x,Z.y,Z.z),W[0]=Z.x,W[1]=Z.y,W[2]=Z.z}else{if(eJ(W,Z))return;J.uniform3iv(this.addr,Z),J7(W,Z)}}function mD(J,Z){let W=this.cache;if(Z.x!==void 0){if(W[0]!==Z.x||W[1]!==Z.y||W[2]!==Z.z||W[3]!==Z.w)J.uniform4i(this.addr,Z.x,Z.y,Z.z,Z.w),W[0]=Z.x,W[1]=Z.y,W[2]=Z.z,W[3]=Z.w}else{if(eJ(W,Z))return;J.uniform4iv(this.addr,Z),J7(W,Z)}}function pD(J,Z){let W=this.cache;if(W[0]===Z)return;J.uniform1ui(this.addr,Z),W[0]=Z}function dD(J,Z){let W=this.cache;if(Z.x!==void 0){if(W[0]!==Z.x||W[1]!==Z.y)J.uniform2ui(this.addr,Z.x,Z.y),W[0]=Z.x,W[1]=Z.y}else{if(eJ(W,Z))return;J.uniform2uiv(this.addr,Z),J7(W,Z)}}function uD(J,Z){let W=this.cache;if(Z.x!==void 0){if(W[0]!==Z.x||W[1]!==Z.y||W[2]!==Z.z)J.uniform3ui(this.addr,Z.x,Z.y,Z.z),W[0]=Z.x,W[1]=Z.y,W[2]=Z.z}else{if(eJ(W,Z))return;J.uniform3uiv(this.addr,Z),J7(W,Z)}}function lD(J,Z){let W=this.cache;if(Z.x!==void 0){if(W[0]!==Z.x||W[1]!==Z.y||W[2]!==Z.z||W[3]!==Z.w)J.uniform4ui(this.addr,Z.x,Z.y,Z.z,Z.w),W[0]=Z.x,W[1]=Z.y,W[2]=Z.z,W[3]=Z.w}else{if(eJ(W,Z))return;J.uniform4uiv(this.addr,Z),J7(W,Z)}}function cD(J,Z,W){let Q=this.cache,Y=W.allocateTextureUnit();if(Q[0]!==Y)J.uniform1i(this.addr,Y),Q[0]=Y;let X;if(this.type===J.SAMPLER_2D_SHADOW)dq.compareFunction=W.isReversedDepthBuffer()?zH:BH,X=dq;else X=UL;W.setTexture2D(Z||X,Y)}function iD(J,Z,W){let Q=this.cache,Y=W.allocateTextureUnit();if(Q[0]!==Y)J.uniform1i(this.addr,Y),Q[0]=Y;W.setTexture3D(Z||KL,Y)}function sD(J,Z,W){let Q=this.cache,Y=W.allocateTextureUnit();if(Q[0]!==Y)J.uniform1i(this.addr,Y),Q[0]=Y;W.setTextureCube(Z||qL,Y)}function nD(J,Z,W){let Q=this.cache,Y=W.allocateTextureUnit();if(Q[0]!==Y)J.uniform1i(this.addr,Y),Q[0]=Y;W.setTexture2DArray(Z||GL,Y)}function oD(J){switch(J){case 5126:return ED;case 35664:return SD;case 35665:return jD;case 35666:return fD;case 35674:return bD;case 35675:return yD;case 35676:return vD;case 5124:case 35670:return xD;case 35667:case 35671:return hD;case 35668:case 35672:return gD;case 35669:case 35673:return mD;case 5125:return pD;case 36294:return dD;case 36295:return uD;case 36296:return lD;case 35678:case 36198:case 36298:case 36306:case 35682:return cD;case 35679:case 36299:case 36307:return iD;case 35680:case 36300:case 36308:case 36293:return sD;case 36289:case 36303:case 36311:case 36292:return nD}}function aD(J,Z){J.uniform1fv(this.addr,Z)}function rD(J,Z){let W=IW(Z,this.size,2);J.uniform2fv(this.addr,W)}function tD(J,Z){let W=IW(Z,this.size,3);J.uniform3fv(this.addr,W)}function eD(J,Z){let W=IW(Z,this.size,4);J.uniform4fv(this.addr,W)}function J4(J,Z){let W=IW(Z,this.size,4);J.uniformMatrix2fv(this.addr,!1,W)}function Z4(J,Z){let W=IW(Z,this.size,9);J.uniformMatrix3fv(this.addr,!1,W)}function W4(J,Z){let W=IW(Z,this.size,16);J.uniformMatrix4fv(this.addr,!1,W)}function Q4(J,Z){J.uniform1iv(this.addr,Z)}function Y4(J,Z){J.uniform2iv(this.addr,Z)}function X4(J,Z){J.uniform3iv(this.addr,Z)}function H4(J,Z){J.uniform4iv(this.addr,Z)}function U4(J,Z){J.uniform1uiv(this.addr,Z)}function G4(J,Z){J.uniform2uiv(this.addr,Z)}function K4(J,Z){J.uniform3uiv(this.addr,Z)}function q4(J,Z){J.uniform4uiv(this.addr,Z)}function $4(J,Z,W){let Q=this.cache,Y=Z.length,X=xH(W,Y);if(!eJ(Q,X))J.uniform1iv(this.addr,X),J7(Q,X);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=dq;else H=UL;for(let U=0;U!==Y;++U)W.setTexture2D(Z[U]||H,X[U])}function O4(J,Z,W){let Q=this.cache,Y=Z.length,X=xH(W,Y);if(!eJ(Q,X))J.uniform1iv(this.addr,X),J7(Q,X);for(let H=0;H!==Y;++H)W.setTexture3D(Z[H]||KL,X[H])}function R4(J,Z,W){let Q=this.cache,Y=Z.length,X=xH(W,Y);if(!eJ(Q,X))J.uniform1iv(this.addr,X),J7(Q,X);for(let H=0;H!==Y;++H)W.setTextureCube(Z[H]||qL,X[H])}function F4(J,Z,W){let Q=this.cache,Y=Z.length,X=xH(W,Y);if(!eJ(Q,X))J.uniform1iv(this.addr,X),J7(Q,X);for(let H=0;H!==Y;++H)W.setTexture2DArray(Z[H]||GL,X[H])}function M4(J){switch(J){case 5126:return aD;case 35664:return rD;case 35665:return tD;case 35666:return eD;case 35674:return J4;case 35675:return Z4;case 35676:return W4;case 5124:case 35670:return Q4;case 35667:case 35671:return Y4;case 35668:case 35672:return X4;case 35669:case 35673:return H4;case 5125:return U4;case 36294:return G4;case 36295:return K4;case 36296:return q4;case 35678:case 36198:case 36298:case 36306:case 35682:return $4;case 35679:case 36299:case 36307:return O4;case 35680:case 36300:case 36308:case 36293:return R4;case 36289:case 36303:case 36311:case 36292:return F4}}class $L{constructor(J,Z,W){this.id=J,this.addr=W,this.cache=[],this.type=Z.type,this.setValue=oD(Z.type)}}class OL{constructor(J,Z,W){this.id=J,this.addr=W,this.cache=[],this.type=Z.type,this.size=Z.size,this.setValue=M4(Z.type)}}class RL{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Z,W){let Q=this.seq;for(let Y=0,X=Q.length;Y!==X;++Y){let H=Q[Y];H.setValue(J,Z[H.id],W)}}}var gq=/(\w+)(\])?(\[|\.)?/g;function sN(J,Z){J.seq.push(Z),J.map[Z.id]=Z}function N4(J,Z,W){let Q=J.name,Y=Q.length;gq.lastIndex=0;while(!0){let X=gq.exec(Q),H=gq.lastIndex,U=X[1],G=X[2]==="]",K=X[3];if(G)U=U|0;if(K===void 0||K==="["&&H+2===Y){sN(W,K===void 0?new $L(U,J,Z):new OL(U,J,Z));break}else{let F=W.map[U];if(F===void 0)F=new RL(U),sN(W,F);W=F}}}class WY{constructor(J,Z){this.seq=[],this.map={};let W=J.getProgramParameter(Z,J.ACTIVE_UNIFORMS);for(let X=0;X<W;++X){let H=J.getActiveUniform(Z,X),U=J.getUniformLocation(Z,H.name);N4(H,U,this)}let Q=[],Y=[];for(let X of this.seq)if(X.type===J.SAMPLER_2D_SHADOW||X.type===J.SAMPLER_CUBE_SHADOW||X.type===J.SAMPLER_2D_ARRAY_SHADOW)Q.push(X);else Y.push(X);if(Q.length>0)this.seq=Q.concat(Y)}setValue(J,Z,W,Q){let Y=this.map[Z];if(Y!==void 0)Y.setValue(J,W,Q)}setOptional(J,Z,W){let Q=Z[W];if(Q!==void 0)this.setValue(J,W,Q)}static upload(J,Z,W,Q){for(let Y=0,X=Z.length;Y!==X;++Y){let H=Z[Y],U=W[H.id];if(U.needsUpdate!==!1)H.setValue(J,U.value,Q)}}static seqWithValue(J,Z){let W=[];for(let Q=0,Y=J.length;Q!==Y;++Q){let X=J[Q];if(X.id in Z)W.push(X)}return W}}function nN(J,Z,W){let Q=J.createShader(Z);return J.shaderSource(Q,W),J.compileShader(Q),Q}var L4=37297,B4=0;function z4(J,Z){let W=J.split(`
`),Q=[],Y=Math.max(Z-6,0),X=Math.min(Z+6,W.length);for(let H=Y;H<X;H++){let U=H+1;Q.push(`${U===Z?">":" "} ${U}: ${W[H]}`)}return Q.join(`
`)}var oN=new v0;function A4(J){WJ._getMatrix(oN,WJ.workingColorSpace,J);let Z=`mat3( ${oN.elements.map((W)=>W.toFixed(4))} )`;switch(WJ.getTransfer(J)){case Yq:return[Z,"LinearTransferOETF"];case wJ:return[Z,"sRGBTransferOETF"];default:return j0("WebGLProgram: Unsupported color space: ",J),[Z,"LinearTransferOETF"]}}function aN(J,Z,W){let Q=J.getShaderParameter(Z,J.COMPILE_STATUS),X=(J.getShaderInfoLog(Z)||"").trim();if(Q&&X==="")return"";let H=/ERROR: 0:(\d+)/.exec(X);if(H){let U=parseInt(H[1]);return W.toUpperCase()+`

`+X+`

`+z4(J.getShaderSource(Z),U)}else return X}function _4(J,Z){let W=A4(Z);return[`vec4 ${J}( vec4 value ) {`,`	return ${W[1]}( vec4( value.rgb * ${W[0]}, value.a ) );`,"}"].join(`
`)}var I4={[R5]:"Linear",[F5]:"Reinhard",[M5]:"Cineon",[N5]:"ACESFilmic",[B5]:"AgX",[z5]:"Neutral",[L5]:"Custom"};function w4(J,Z){let W=I4[Z];if(W===void 0)return j0("WebGLProgram: Unsupported toneMapping:",Z),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+W+"ToneMapping( color ); }"}var yH=new v;function D4(){WJ.getLuminanceCoefficients(yH);let J=yH.x.toFixed(4),Z=yH.y.toFixed(4),W=yH.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Z}, ${W} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function k4(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ZY).join(`
`)}function C4(J){let Z=[];for(let W in J){let Q=J[W];if(Q===!1)continue;Z.push("#define "+W+" "+Q)}return Z.join(`
`)}function V4(J,Z){let W={},Q=J.getProgramParameter(Z,J.ACTIVE_ATTRIBUTES);for(let Y=0;Y<Q;Y++){let X=J.getActiveAttrib(Z,Y),H=X.name,U=1;if(X.type===J.FLOAT_MAT2)U=2;if(X.type===J.FLOAT_MAT3)U=3;if(X.type===J.FLOAT_MAT4)U=4;W[H]={type:X.type,location:J.getAttribLocation(Z,H),locationSize:U}}return W}function ZY(J){return J!==""}function rN(J,Z){let W=Z.numSpotLightShadows+Z.numSpotLightMaps-Z.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Z.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Z.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Z.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,W).replace(/NUM_RECT_AREA_LIGHTS/g,Z.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Z.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Z.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Z.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Z.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Z.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Z.numPointLightShadows)}function tN(J,Z){return J.replace(/NUM_CLIPPING_PLANES/g,Z.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Z.numClippingPlanes-Z.numClipIntersection)}var T4=/^[ \t]*#include +<([\w\d./]+)>/gm;function uq(J){return J.replace(T4,E4)}var P4=new Map;function E4(J,Z){let W=d0[Z];if(W===void 0){let Q=P4.get(Z);if(Q!==void 0)W=d0[Q],j0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Z,Q);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Z+">")}return uq(W)}var S4=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eN(J){return J.replace(S4,j4)}function j4(J,Z,W,Q){let Y="";for(let X=parseInt(Z);X<parseInt(W);X++)Y+=Q.replace(/\[\s*i\s*\]/g,"[ "+X+" ]").replace(/UNROLLED_LOOP_INDEX/g,X);return Y}function JL(J){let Z=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")Z+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Z+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Z+=`
#define LOW_PRECISION`;return Z}var f4={[pQ]:"SHADOWMAP_TYPE_PCF",[FW]:"SHADOWMAP_TYPE_VSM"};function b4(J){return f4[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var y4={[LW]:"ENVMAP_TYPE_CUBE",[v9]:"ENVMAP_TYPE_CUBE",[uQ]:"ENVMAP_TYPE_CUBE_UV"};function v4(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return y4[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var x4={[v9]:"ENVMAP_MODE_REFRACTION"};function h4(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return x4[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var g4={[GN]:"ENVMAP_BLENDING_MULTIPLY",[KN]:"ENVMAP_BLENDING_MIX",[qN]:"ENVMAP_BLENDING_ADD"};function m4(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return g4[J.combine]||"ENVMAP_BLENDING_NONE"}function p4(J){let Z=J.envMapCubeUVHeight;if(Z===null)return null;let W=Math.log2(Z)-2,Q=1/Z;return{texelWidth:1/(3*Math.max(Math.pow(2,W),112)),texelHeight:Q,maxMip:W}}function d4(J,Z,W,Q){let Y=J.getContext(),X=W.defines,H=W.vertexShader,U=W.fragmentShader,G=b4(W),K=v4(W),O=h4(W),F=m4(W),q=p4(W),R=k4(W),L=C4(X),w=Y.createProgram(),N,$,B=W.glslVersion?"#version "+W.glslVersion+`
`:"";if(W.isRawShaderMaterial){if(N=["#define SHADER_TYPE "+W.shaderType,"#define SHADER_NAME "+W.shaderName,L].filter(ZY).join(`
`),N.length>0)N+=`
`;if($=["#define SHADER_TYPE "+W.shaderType,"#define SHADER_NAME "+W.shaderName,L].filter(ZY).join(`
`),$.length>0)$+=`
`}else N=[JL(W),"#define SHADER_TYPE "+W.shaderType,"#define SHADER_NAME "+W.shaderName,L,W.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",W.batching?"#define USE_BATCHING":"",W.batchingColor?"#define USE_BATCHING_COLOR":"",W.instancing?"#define USE_INSTANCING":"",W.instancingColor?"#define USE_INSTANCING_COLOR":"",W.instancingMorph?"#define USE_INSTANCING_MORPH":"",W.useFog&&W.fog?"#define USE_FOG":"",W.useFog&&W.fogExp2?"#define FOG_EXP2":"",W.map?"#define USE_MAP":"",W.envMap?"#define USE_ENVMAP":"",W.envMap?"#define "+O:"",W.lightMap?"#define USE_LIGHTMAP":"",W.aoMap?"#define USE_AOMAP":"",W.bumpMap?"#define USE_BUMPMAP":"",W.normalMap?"#define USE_NORMALMAP":"",W.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",W.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",W.displacementMap?"#define USE_DISPLACEMENTMAP":"",W.emissiveMap?"#define USE_EMISSIVEMAP":"",W.anisotropy?"#define USE_ANISOTROPY":"",W.anisotropyMap?"#define USE_ANISOTROPYMAP":"",W.clearcoatMap?"#define USE_CLEARCOATMAP":"",W.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",W.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",W.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",W.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",W.specularMap?"#define USE_SPECULARMAP":"",W.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",W.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",W.roughnessMap?"#define USE_ROUGHNESSMAP":"",W.metalnessMap?"#define USE_METALNESSMAP":"",W.alphaMap?"#define USE_ALPHAMAP":"",W.alphaHash?"#define USE_ALPHAHASH":"",W.transmission?"#define USE_TRANSMISSION":"",W.transmissionMap?"#define USE_TRANSMISSIONMAP":"",W.thicknessMap?"#define USE_THICKNESSMAP":"",W.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",W.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",W.mapUv?"#define MAP_UV "+W.mapUv:"",W.alphaMapUv?"#define ALPHAMAP_UV "+W.alphaMapUv:"",W.lightMapUv?"#define LIGHTMAP_UV "+W.lightMapUv:"",W.aoMapUv?"#define AOMAP_UV "+W.aoMapUv:"",W.emissiveMapUv?"#define EMISSIVEMAP_UV "+W.emissiveMapUv:"",W.bumpMapUv?"#define BUMPMAP_UV "+W.bumpMapUv:"",W.normalMapUv?"#define NORMALMAP_UV "+W.normalMapUv:"",W.displacementMapUv?"#define DISPLACEMENTMAP_UV "+W.displacementMapUv:"",W.metalnessMapUv?"#define METALNESSMAP_UV "+W.metalnessMapUv:"",W.roughnessMapUv?"#define ROUGHNESSMAP_UV "+W.roughnessMapUv:"",W.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+W.anisotropyMapUv:"",W.clearcoatMapUv?"#define CLEARCOATMAP_UV "+W.clearcoatMapUv:"",W.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+W.clearcoatNormalMapUv:"",W.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+W.clearcoatRoughnessMapUv:"",W.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+W.iridescenceMapUv:"",W.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+W.iridescenceThicknessMapUv:"",W.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+W.sheenColorMapUv:"",W.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+W.sheenRoughnessMapUv:"",W.specularMapUv?"#define SPECULARMAP_UV "+W.specularMapUv:"",W.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+W.specularColorMapUv:"",W.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+W.specularIntensityMapUv:"",W.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+W.transmissionMapUv:"",W.thicknessMapUv?"#define THICKNESSMAP_UV "+W.thicknessMapUv:"",W.vertexTangents&&W.flatShading===!1?"#define USE_TANGENT":"",W.vertexNormals?"#define HAS_NORMAL":"",W.vertexColors?"#define USE_COLOR":"",W.vertexAlphas?"#define USE_COLOR_ALPHA":"",W.vertexUv1s?"#define USE_UV1":"",W.vertexUv2s?"#define USE_UV2":"",W.vertexUv3s?"#define USE_UV3":"",W.pointsUvs?"#define USE_POINTS_UV":"",W.flatShading?"#define FLAT_SHADED":"",W.skinning?"#define USE_SKINNING":"",W.morphTargets?"#define USE_MORPHTARGETS":"",W.morphNormals&&W.flatShading===!1?"#define USE_MORPHNORMALS":"",W.morphColors?"#define USE_MORPHCOLORS":"",W.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+W.morphTextureStride:"",W.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+W.morphTargetsCount:"",W.doubleSided?"#define DOUBLE_SIDED":"",W.flipSided?"#define FLIP_SIDED":"",W.shadowMapEnabled?"#define USE_SHADOWMAP":"",W.shadowMapEnabled?"#define "+G:"",W.sizeAttenuation?"#define USE_SIZEATTENUATION":"",W.numLightProbes>0?"#define USE_LIGHT_PROBES":"",W.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",W.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(ZY).join(`
`),$=[JL(W),"#define SHADER_TYPE "+W.shaderType,"#define SHADER_NAME "+W.shaderName,L,W.useFog&&W.fog?"#define USE_FOG":"",W.useFog&&W.fogExp2?"#define FOG_EXP2":"",W.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",W.map?"#define USE_MAP":"",W.matcap?"#define USE_MATCAP":"",W.envMap?"#define USE_ENVMAP":"",W.envMap?"#define "+K:"",W.envMap?"#define "+O:"",W.envMap?"#define "+F:"",q?"#define CUBEUV_TEXEL_WIDTH "+q.texelWidth:"",q?"#define CUBEUV_TEXEL_HEIGHT "+q.texelHeight:"",q?"#define CUBEUV_MAX_MIP "+q.maxMip+".0":"",W.lightMap?"#define USE_LIGHTMAP":"",W.aoMap?"#define USE_AOMAP":"",W.bumpMap?"#define USE_BUMPMAP":"",W.normalMap?"#define USE_NORMALMAP":"",W.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",W.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",W.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",W.emissiveMap?"#define USE_EMISSIVEMAP":"",W.anisotropy?"#define USE_ANISOTROPY":"",W.anisotropyMap?"#define USE_ANISOTROPYMAP":"",W.clearcoat?"#define USE_CLEARCOAT":"",W.clearcoatMap?"#define USE_CLEARCOATMAP":"",W.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",W.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",W.dispersion?"#define USE_DISPERSION":"",W.iridescence?"#define USE_IRIDESCENCE":"",W.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",W.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",W.specularMap?"#define USE_SPECULARMAP":"",W.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",W.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",W.roughnessMap?"#define USE_ROUGHNESSMAP":"",W.metalnessMap?"#define USE_METALNESSMAP":"",W.alphaMap?"#define USE_ALPHAMAP":"",W.alphaTest?"#define USE_ALPHATEST":"",W.alphaHash?"#define USE_ALPHAHASH":"",W.sheen?"#define USE_SHEEN":"",W.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",W.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",W.transmission?"#define USE_TRANSMISSION":"",W.transmissionMap?"#define USE_TRANSMISSIONMAP":"",W.thicknessMap?"#define USE_THICKNESSMAP":"",W.vertexTangents&&W.flatShading===!1?"#define USE_TANGENT":"",W.vertexColors||W.instancingColor?"#define USE_COLOR":"",W.vertexAlphas||W.batchingColor?"#define USE_COLOR_ALPHA":"",W.vertexUv1s?"#define USE_UV1":"",W.vertexUv2s?"#define USE_UV2":"",W.vertexUv3s?"#define USE_UV3":"",W.pointsUvs?"#define USE_POINTS_UV":"",W.gradientMap?"#define USE_GRADIENTMAP":"",W.flatShading?"#define FLAT_SHADED":"",W.doubleSided?"#define DOUBLE_SIDED":"",W.flipSided?"#define FLIP_SIDED":"",W.shadowMapEnabled?"#define USE_SHADOWMAP":"",W.shadowMapEnabled?"#define "+G:"",W.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",W.numLightProbes>0?"#define USE_LIGHT_PROBES":"",W.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",W.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",W.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",W.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",W.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",W.toneMapping!==_6?"#define TONE_MAPPING":"",W.toneMapping!==_6?d0.tonemapping_pars_fragment:"",W.toneMapping!==_6?w4("toneMapping",W.toneMapping):"",W.dithering?"#define DITHERING":"",W.opaque?"#define OPAQUE":"",d0.colorspace_pars_fragment,_4("linearToOutputTexel",W.outputColorSpace),D4(),W.useDepthPacking?"#define DEPTH_PACKING "+W.depthPacking:"",`
`].filter(ZY).join(`
`);if(H=uq(H),H=rN(H,W),H=tN(H,W),U=uq(U),U=rN(U,W),U=tN(U,W),H=eN(H),U=eN(U),W.isRawShaderMaterial!==!0)B=`#version 300 es
`,N=[R,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+N,$=["#define varying in",W.glslVersion===Xq?"":"layout(location = 0) out highp vec4 pc_fragColor;",W.glslVersion===Xq?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+$;let _=B+N+H,z=B+$+U,P=nN(Y,Y.VERTEX_SHADER,_),D=nN(Y,Y.FRAGMENT_SHADER,z);if(Y.attachShader(w,P),Y.attachShader(w,D),W.index0AttributeName!==void 0)Y.bindAttribLocation(w,0,W.index0AttributeName);else if(W.hasPositionAttribute===!0)Y.bindAttribLocation(w,0,"position");Y.linkProgram(w);function T(E){if(J.debug.checkShaderErrors){let u=Y.getProgramInfoLog(w)||"",e=Y.getShaderInfoLog(P)||"",b=Y.getShaderInfoLog(D)||"",c=u.trim(),l=e.trim(),h=b.trim(),g=!0,Y0=!0;if(Y.getProgramParameter(w,Y.LINK_STATUS)===!1)if(g=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(Y,w,P,D);else{let O0=aN(Y,P,"vertex"),_0=aN(Y,D,"fragment");b0("WebGLProgram: Shader Error "+Y.getError()+" - VALIDATE_STATUS "+Y.getProgramParameter(w,Y.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+c+`
`+O0+`
`+_0)}else if(c!=="")j0("WebGLProgram: Program Info Log:",c);else if(l===""||h==="")Y0=!1;if(Y0)E.diagnostics={runnable:g,programLog:c,vertexShader:{log:l,prefix:N},fragmentShader:{log:h,prefix:$}}}Y.deleteShader(P),Y.deleteShader(D),A=new WY(Y,w),C=V4(Y,w)}let A;this.getUniforms=function(){if(A===void 0)T(this);return A};let C;this.getAttributes=function(){if(C===void 0)T(this);return C};let x=W.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(x===!1)x=Y.getProgramParameter(w,L4);return x},this.destroy=function(){Q.releaseStatesOfProgram(this),Y.deleteProgram(w),this.program=void 0},this.type=W.shaderType,this.name=W.shaderName,this.id=B4++,this.cacheKey=Z,this.usedTimes=1,this.program=w,this.vertexShader=P,this.fragmentShader=D,this}var u4=0;class FL{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Z,W){let Q=this._getShaderCacheForMaterial(J);if(Q.has(Z)===!1)Q.add(Z),Z.usedTimes++;if(Q.has(W)===!1)Q.add(W),W.usedTimes++;return this}remove(J){let Z=this.materialCache.get(J);for(let W of Z)if(W.usedTimes--,W.usedTimes===0)this.shaderCache.delete(W.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Z=this.materialCache,W=Z.get(J);if(W===void 0)W=new Set,Z.set(J,W);return W}_getShaderStage(J){let Z=this.shaderCache,W=Z.get(J);if(W===void 0)W=new ML(J),Z.set(J,W);return W}}class ML{constructor(J){this.id=u4++,this.code=J,this.usedTimes=0}}function l4(J){return J===m9||J===NH||J===LH}function c4(J,Z,W,Q,Y,X){let H=new _H,U=new FL,G=new Set,K=[],O=new Map,F=Q.logarithmicDepthBuffer,q=Q.precision,R={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function L(A){if(G.add(A),A===0)return"uv";return`uv${A}`}function w(A,C,x,E,u,e){let b=E.fog,c=u.geometry,l=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?E.environment:null,h=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,g=Z.get(A.envMap||l,h),Y0=!!g&&g.mapping===uQ?g.image.height:null,O0=R[A.type];if(A.precision!==null){if(q=Q.getMaxPrecision(A.precision),q!==A.precision)j0("WebGLProgram.getParameters:",A.precision,"not supported, using",q,"instead.")}let _0=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,I0=_0!==void 0?_0.length:0,zJ=0;if(c.morphAttributes.position!==void 0)zJ=1;if(c.morphAttributes.normal!==void 0)zJ=2;if(c.morphAttributes.color!==void 0)zJ=3;let HJ,t,q0,A0;if(O0){let f0=m6[O0];HJ=f0.vertexShader,t=f0.fragmentShader}else{HJ=A.vertexShader,t=A.fragmentShader;let f0=U.getVertexShaderStage(A),e0=U.getFragmentShaderStage(A);U.update(A,f0,e0),q0=f0.id,A0=e0.id}let L0=J.getRenderTarget(),V0=J.state.buffers.depth.getReversed(),r0=u.isInstancedMesh===!0,m0=u.isBatchedMesh===!0,u0=!!A.map,$J=!!A.matcap,i0=!!g,p0=!!A.aoMap,yJ=!!A.lightMap,VJ=!!A.bumpMap&&A.wireframe===!1,DJ=!!A.normalMap,TJ=!!A.displacementMap,cJ=!!A.emissiveMap,vJ=!!A.metalnessMap,j=!!A.roughnessMap,iJ=A.anisotropy>0,t0=A.clearcoat>0,MJ=A.dispersion>0,V=A.iridescence>0,I=A.sheen>0,f=A.transmission>0,i=iJ&&!!A.anisotropyMap,W0=t0&&!!A.clearcoatMap,U0=t0&&!!A.clearcoatNormalMap,F0=t0&&!!A.clearcoatRoughnessMap,o=V&&!!A.iridescenceMap,a=V&&!!A.iridescenceThicknessMap,X0=I&&!!A.sheenColorMap,k0=I&&!!A.sheenRoughnessMap,M0=!!A.specularMap,H0=!!A.specularColorMap,E0=!!A.specularIntensityMap,S0=f&&!!A.transmissionMap,R0=f&&!!A.thicknessMap,S=!!A.gradientMap,Q0=!!A.alphaMap,m=A.alphaTest>0,Z0=!!A.alphaHash,K0=!!A.extensions,r=_6;if(A.toneMapped){if(L0===null||L0.isXRRenderTarget===!0)r=J.toneMapping}let $0={shaderID:O0,shaderType:A.type,shaderName:A.name,vertexShader:HJ,fragmentShader:t,defines:A.defines,customVertexShaderID:q0,customFragmentShaderID:A0,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:q,batching:m0,batchingColor:m0&&u._colorsTexture!==null,instancing:r0,instancingColor:r0&&u.instanceColor!==null,instancingMorph:r0&&u.morphTexture!==null,outputColorSpace:L0===null?J.outputColorSpace:L0.isXRRenderTarget===!0?L0.texture.colorSpace:WJ.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:u0,matcap:$J,envMap:i0,envMapMode:i0&&g.mapping,envMapCubeUVHeight:Y0,aoMap:p0,lightMap:yJ,bumpMap:VJ,normalMap:DJ,displacementMap:TJ,emissiveMap:cJ,normalMapObjectSpace:DJ&&A.normalMapType===_N,normalMapTangentSpace:DJ&&A.normalMapType===Wq,packedNormalMap:DJ&&A.normalMapType===Wq&&l4(A.normalMap.format),metalnessMap:vJ,roughnessMap:j,anisotropy:iJ,anisotropyMap:i,clearcoat:t0,clearcoatMap:W0,clearcoatNormalMap:U0,clearcoatRoughnessMap:F0,dispersion:MJ,iridescence:V,iridescenceMap:o,iridescenceThicknessMap:a,sheen:I,sheenColorMap:X0,sheenRoughnessMap:k0,specularMap:M0,specularColorMap:H0,specularIntensityMap:E0,transmission:f,transmissionMap:S0,thicknessMap:R0,gradientMap:S,opaque:A.transparent===!1&&A.blending===dQ&&A.alphaToCoverage===!1,alphaMap:Q0,alphaTest:m,alphaHash:Z0,combine:A.combine,mapUv:u0&&L(A.map.channel),aoMapUv:p0&&L(A.aoMap.channel),lightMapUv:yJ&&L(A.lightMap.channel),bumpMapUv:VJ&&L(A.bumpMap.channel),normalMapUv:DJ&&L(A.normalMap.channel),displacementMapUv:TJ&&L(A.displacementMap.channel),emissiveMapUv:cJ&&L(A.emissiveMap.channel),metalnessMapUv:vJ&&L(A.metalnessMap.channel),roughnessMapUv:j&&L(A.roughnessMap.channel),anisotropyMapUv:i&&L(A.anisotropyMap.channel),clearcoatMapUv:W0&&L(A.clearcoatMap.channel),clearcoatNormalMapUv:U0&&L(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:F0&&L(A.clearcoatRoughnessMap.channel),iridescenceMapUv:o&&L(A.iridescenceMap.channel),iridescenceThicknessMapUv:a&&L(A.iridescenceThicknessMap.channel),sheenColorMapUv:X0&&L(A.sheenColorMap.channel),sheenRoughnessMapUv:k0&&L(A.sheenRoughnessMap.channel),specularMapUv:M0&&L(A.specularMap.channel),specularColorMapUv:H0&&L(A.specularColorMap.channel),specularIntensityMapUv:E0&&L(A.specularIntensityMap.channel),transmissionMapUv:S0&&L(A.transmissionMap.channel),thicknessMapUv:R0&&L(A.thicknessMap.channel),alphaMapUv:Q0&&L(A.alphaMap.channel),vertexTangents:!!c.attributes.tangent&&(DJ||iJ),vertexNormals:!!c.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!c.attributes.color&&c.attributes.color.itemSize===4,pointsUvs:u.isPoints===!0&&!!c.attributes.uv&&(u0||Q0),fog:!!b,useFog:A.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||c.attributes.normal===void 0&&DJ===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:F,reversedDepthBuffer:V0,skinning:u.isSkinnedMesh===!0,hasPositionAttribute:c.attributes.position!==void 0,morphTargets:c.morphAttributes.position!==void 0,morphNormals:c.morphAttributes.normal!==void 0,morphColors:c.morphAttributes.color!==void 0,morphTargetsCount:I0,morphTextureStride:zJ,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:e.length,numClippingPlanes:X.numPlanes,numClipIntersection:X.numIntersection,dithering:A.dithering,shadowMapEnabled:J.shadowMap.enabled&&x.length>0,shadowMapType:J.shadowMap.type,toneMapping:r,decodeVideoTexture:u0&&A.map.isVideoTexture===!0&&WJ.getTransfer(A.map.colorSpace)===wJ,decodeVideoTextureEmissive:cJ&&A.emissiveMap.isVideoTexture===!0&&WJ.getTransfer(A.emissiveMap.colorSpace)===wJ,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===v6,flipSided:A.side===S7,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:K0&&A.extensions.clipCullDistance===!0&&W.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(K0&&A.extensions.multiDraw===!0||m0)&&W.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:W.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return $0.vertexUv1s=G.has(1),$0.vertexUv2s=G.has(2),$0.vertexUv3s=G.has(3),G.clear(),$0}function N(A){let C=[];if(A.shaderID)C.push(A.shaderID);else C.push(A.customVertexShaderID),C.push(A.customFragmentShaderID);if(A.defines!==void 0)for(let x in A.defines)C.push(x),C.push(A.defines[x]);if(A.isRawShaderMaterial===!1)$(C,A),B(C,A),C.push(J.outputColorSpace);return C.push(A.customProgramCacheKey),C.join()}function $(A,C){A.push(C.precision),A.push(C.outputColorSpace),A.push(C.envMapMode),A.push(C.envMapCubeUVHeight),A.push(C.mapUv),A.push(C.alphaMapUv),A.push(C.lightMapUv),A.push(C.aoMapUv),A.push(C.bumpMapUv),A.push(C.normalMapUv),A.push(C.displacementMapUv),A.push(C.emissiveMapUv),A.push(C.metalnessMapUv),A.push(C.roughnessMapUv),A.push(C.anisotropyMapUv),A.push(C.clearcoatMapUv),A.push(C.clearcoatNormalMapUv),A.push(C.clearcoatRoughnessMapUv),A.push(C.iridescenceMapUv),A.push(C.iridescenceThicknessMapUv),A.push(C.sheenColorMapUv),A.push(C.sheenRoughnessMapUv),A.push(C.specularMapUv),A.push(C.specularColorMapUv),A.push(C.specularIntensityMapUv),A.push(C.transmissionMapUv),A.push(C.thicknessMapUv),A.push(C.combine),A.push(C.fogExp2),A.push(C.sizeAttenuation),A.push(C.morphTargetsCount),A.push(C.morphAttributeCount),A.push(C.numDirLights),A.push(C.numPointLights),A.push(C.numSpotLights),A.push(C.numSpotLightMaps),A.push(C.numHemiLights),A.push(C.numRectAreaLights),A.push(C.numDirLightShadows),A.push(C.numPointLightShadows),A.push(C.numSpotLightShadows),A.push(C.numSpotLightShadowsWithMaps),A.push(C.numLightProbes),A.push(C.shadowMapType),A.push(C.toneMapping),A.push(C.numClippingPlanes),A.push(C.numClipIntersection),A.push(C.depthPacking)}function B(A,C){if(H.disableAll(),C.instancing)H.enable(0);if(C.instancingColor)H.enable(1);if(C.instancingMorph)H.enable(2);if(C.matcap)H.enable(3);if(C.envMap)H.enable(4);if(C.normalMapObjectSpace)H.enable(5);if(C.normalMapTangentSpace)H.enable(6);if(C.clearcoat)H.enable(7);if(C.iridescence)H.enable(8);if(C.alphaTest)H.enable(9);if(C.vertexColors)H.enable(10);if(C.vertexAlphas)H.enable(11);if(C.vertexUv1s)H.enable(12);if(C.vertexUv2s)H.enable(13);if(C.vertexUv3s)H.enable(14);if(C.vertexTangents)H.enable(15);if(C.anisotropy)H.enable(16);if(C.alphaHash)H.enable(17);if(C.batching)H.enable(18);if(C.dispersion)H.enable(19);if(C.batchingColor)H.enable(20);if(C.gradientMap)H.enable(21);if(C.packedNormalMap)H.enable(22);if(C.vertexNormals)H.enable(23);if(A.push(H.mask),H.disableAll(),C.fog)H.enable(0);if(C.useFog)H.enable(1);if(C.flatShading)H.enable(2);if(C.logarithmicDepthBuffer)H.enable(3);if(C.reversedDepthBuffer)H.enable(4);if(C.skinning)H.enable(5);if(C.morphTargets)H.enable(6);if(C.morphNormals)H.enable(7);if(C.morphColors)H.enable(8);if(C.premultipliedAlpha)H.enable(9);if(C.shadowMapEnabled)H.enable(10);if(C.doubleSided)H.enable(11);if(C.flipSided)H.enable(12);if(C.useDepthPacking)H.enable(13);if(C.dithering)H.enable(14);if(C.transmission)H.enable(15);if(C.sheen)H.enable(16);if(C.opaque)H.enable(17);if(C.pointsUvs)H.enable(18);if(C.decodeVideoTexture)H.enable(19);if(C.decodeVideoTextureEmissive)H.enable(20);if(C.alphaToCoverage)H.enable(21);if(C.numLightProbeGrids>0)H.enable(22);if(C.hasPositionAttribute)H.enable(23);A.push(H.mask)}function _(A){let C=R[A.type],x;if(C){let E=m6[C];x=bN.clone(E.uniforms)}else x=A.uniforms;return x}function z(A,C){let x=O.get(C);if(x!==void 0)++x.usedTimes;else x=new d4(J,C,A,Y),K.push(x),O.set(C,x);return x}function P(A){if(--A.usedTimes===0){let C=K.indexOf(A);K[C]=K[K.length-1],K.pop(),O.delete(A.cacheKey),A.destroy()}}function D(A){U.remove(A)}function T(){U.dispose()}return{getParameters:w,getProgramCacheKey:N,getUniforms:_,acquireProgram:z,releaseProgram:P,releaseShaderCache:D,programs:K,dispose:T}}function i4(){let J=new WeakMap;function Z(H){return J.has(H)}function W(H){let U=J.get(H);if(U===void 0)U={},J.set(H,U);return U}function Q(H){J.delete(H)}function Y(H,U,G){J.get(H)[U]=G}function X(){J=new WeakMap}return{has:Z,get:W,remove:Q,update:Y,dispose:X}}function s4(J,Z){if(J.groupOrder!==Z.groupOrder)return J.groupOrder-Z.groupOrder;else if(J.renderOrder!==Z.renderOrder)return J.renderOrder-Z.renderOrder;else if(J.material.id!==Z.material.id)return J.material.id-Z.material.id;else if(J.materialVariant!==Z.materialVariant)return J.materialVariant-Z.materialVariant;else if(J.z!==Z.z)return J.z-Z.z;else return J.id-Z.id}function ZL(J,Z){if(J.groupOrder!==Z.groupOrder)return J.groupOrder-Z.groupOrder;else if(J.renderOrder!==Z.renderOrder)return J.renderOrder-Z.renderOrder;else if(J.z!==Z.z)return Z.z-J.z;else return J.id-Z.id}function WL(){let J=[],Z=0,W=[],Q=[],Y=[];function X(){Z=0,W.length=0,Q.length=0,Y.length=0}function H(q){let R=0;if(q.isInstancedMesh)R+=2;if(q.isSkinnedMesh)R+=1;return R}function U(q,R,L,w,N,$){let B=J[Z];if(B===void 0)B={id:q.id,object:q,geometry:R,material:L,materialVariant:H(q),groupOrder:w,renderOrder:q.renderOrder,z:N,group:$},J[Z]=B;else B.id=q.id,B.object=q,B.geometry=R,B.material=L,B.materialVariant=H(q),B.groupOrder=w,B.renderOrder=q.renderOrder,B.z=N,B.group=$;return Z++,B}function G(q,R,L,w,N,$){let B=U(q,R,L,w,N,$);if(L.transmission>0)Q.push(B);else if(L.transparent===!0)Y.push(B);else W.push(B)}function K(q,R,L,w,N,$){let B=U(q,R,L,w,N,$);if(L.transmission>0)Q.unshift(B);else if(L.transparent===!0)Y.unshift(B);else W.unshift(B)}function O(q,R,L){if(W.length>1)W.sort(q||s4);if(Q.length>1)Q.sort(R||ZL);if(Y.length>1)Y.sort(R||ZL);if(L)W.reverse(),Q.reverse(),Y.reverse()}function F(){for(let q=Z,R=J.length;q<R;q++){let L=J[q];if(L.id===null)break;L.id=null,L.object=null,L.geometry=null,L.material=null,L.group=null}}return{opaque:W,transmissive:Q,transparent:Y,init:X,push:G,unshift:K,finish:F,sort:O}}function n4(){let J=new WeakMap;function Z(Q,Y){let X=J.get(Q),H;if(X===void 0)H=new WL,J.set(Q,[H]);else if(Y>=X.length)H=new WL,X.push(H);else H=X[Y];return H}function W(){J=new WeakMap}return{get:Z,dispose:W}}function o4(){let J={};return{get:function(Z){if(J[Z.id]!==void 0)return J[Z.id];let W;switch(Z.type){case"DirectionalLight":W={direction:new v,color:new a0};break;case"SpotLight":W={position:new v,direction:new v,color:new a0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":W={position:new v,color:new a0,distance:0,decay:0};break;case"HemisphereLight":W={direction:new v,skyColor:new a0,groundColor:new a0};break;case"RectAreaLight":W={color:new a0,position:new v,halfWidth:new v,halfHeight:new v};break}return J[Z.id]=W,W}}}function a4(){let J={};return{get:function(Z){if(J[Z.id]!==void 0)return J[Z.id];let W;switch(Z.type){case"DirectionalLight":W={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new XJ};break;case"SpotLight":W={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new XJ};break;case"PointLight":W={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new XJ,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Z.id]=W,W}}}var r4=0;function t4(J,Z){return(Z.castShadow?2:0)-(J.castShadow?2:0)+(Z.map?1:0)-(J.map?1:0)}function e4(J){let Z=new o4,W=a4(),Q={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let K=0;K<9;K++)Q.probe.push(new v);let Y=new v,X=new jJ,H=new jJ;function U(K){let O=0,F=0,q=0;for(let C=0;C<9;C++)Q.probe[C].set(0,0,0);let R=0,L=0,w=0,N=0,$=0,B=0,_=0,z=0,P=0,D=0,T=0;K.sort(t4);for(let C=0,x=K.length;C<x;C++){let E=K[C],u=E.color,e=E.intensity,b=E.distance,c=null;if(E.shadow&&E.shadow.map)if(E.shadow.map.texture.format===m9)c=E.shadow.map.texture;else c=E.shadow.map.depthTexture||E.shadow.map.texture;if(E.isAmbientLight)O+=u.r*e,F+=u.g*e,q+=u.b*e;else if(E.isLightProbe){for(let l=0;l<9;l++)Q.probe[l].addScaledVector(E.sh.coefficients[l],e);T++}else if(E.isDirectionalLight){let l=Z.get(E);if(l.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){let h=E.shadow,g=W.get(E);g.shadowIntensity=h.intensity,g.shadowBias=h.bias,g.shadowNormalBias=h.normalBias,g.shadowRadius=h.radius,g.shadowMapSize=h.mapSize,Q.directionalShadow[R]=g,Q.directionalShadowMap[R]=c,Q.directionalShadowMatrix[R]=E.shadow.matrix,B++}Q.directional[R]=l,R++}else if(E.isSpotLight){let l=Z.get(E);l.position.setFromMatrixPosition(E.matrixWorld),l.color.copy(u).multiplyScalar(e),l.distance=b,l.coneCos=Math.cos(E.angle),l.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),l.decay=E.decay,Q.spot[w]=l;let h=E.shadow;if(E.map){if(Q.spotLightMap[P]=E.map,P++,h.updateMatrices(E),E.castShadow)D++}if(Q.spotLightMatrix[w]=h.matrix,E.castShadow){let g=W.get(E);g.shadowIntensity=h.intensity,g.shadowBias=h.bias,g.shadowNormalBias=h.normalBias,g.shadowRadius=h.radius,g.shadowMapSize=h.mapSize,Q.spotShadow[w]=g,Q.spotShadowMap[w]=c,z++}w++}else if(E.isRectAreaLight){let l=Z.get(E);l.color.copy(u).multiplyScalar(e),l.halfWidth.set(E.width*0.5,0,0),l.halfHeight.set(0,E.height*0.5,0),Q.rectArea[N]=l,N++}else if(E.isPointLight){let l=Z.get(E);if(l.color.copy(E.color).multiplyScalar(E.intensity),l.distance=E.distance,l.decay=E.decay,E.castShadow){let h=E.shadow,g=W.get(E);g.shadowIntensity=h.intensity,g.shadowBias=h.bias,g.shadowNormalBias=h.normalBias,g.shadowRadius=h.radius,g.shadowMapSize=h.mapSize,g.shadowCameraNear=h.camera.near,g.shadowCameraFar=h.camera.far,Q.pointShadow[L]=g,Q.pointShadowMap[L]=c,Q.pointShadowMatrix[L]=E.shadow.matrix,_++}Q.point[L]=l,L++}else if(E.isHemisphereLight){let l=Z.get(E);l.skyColor.copy(E.color).multiplyScalar(e),l.groundColor.copy(E.groundColor).multiplyScalar(e),Q.hemi[$]=l,$++}}if(N>0)if(J.has("OES_texture_float_linear")===!0)Q.rectAreaLTC1=N0.LTC_FLOAT_1,Q.rectAreaLTC2=N0.LTC_FLOAT_2;else Q.rectAreaLTC1=N0.LTC_HALF_1,Q.rectAreaLTC2=N0.LTC_HALF_2;Q.ambient[0]=O,Q.ambient[1]=F,Q.ambient[2]=q;let A=Q.hash;if(A.directionalLength!==R||A.pointLength!==L||A.spotLength!==w||A.rectAreaLength!==N||A.hemiLength!==$||A.numDirectionalShadows!==B||A.numPointShadows!==_||A.numSpotShadows!==z||A.numSpotMaps!==P||A.numLightProbes!==T)Q.directional.length=R,Q.spot.length=w,Q.rectArea.length=N,Q.point.length=L,Q.hemi.length=$,Q.directionalShadow.length=B,Q.directionalShadowMap.length=B,Q.pointShadow.length=_,Q.pointShadowMap.length=_,Q.spotShadow.length=z,Q.spotShadowMap.length=z,Q.directionalShadowMatrix.length=B,Q.pointShadowMatrix.length=_,Q.spotLightMatrix.length=z+P-D,Q.spotLightMap.length=P,Q.numSpotLightShadowsWithMaps=D,Q.numLightProbes=T,A.directionalLength=R,A.pointLength=L,A.spotLength=w,A.rectAreaLength=N,A.hemiLength=$,A.numDirectionalShadows=B,A.numPointShadows=_,A.numSpotShadows=z,A.numSpotMaps=P,A.numLightProbes=T,Q.version=r4++}function G(K,O){let F=0,q=0,R=0,L=0,w=0,N=O.matrixWorldInverse;for(let $=0,B=K.length;$<B;$++){let _=K[$];if(_.isDirectionalLight){let z=Q.directional[F];z.direction.setFromMatrixPosition(_.matrixWorld),Y.setFromMatrixPosition(_.target.matrixWorld),z.direction.sub(Y),z.direction.transformDirection(N),F++}else if(_.isSpotLight){let z=Q.spot[R];z.position.setFromMatrixPosition(_.matrixWorld),z.position.applyMatrix4(N),z.direction.setFromMatrixPosition(_.matrixWorld),Y.setFromMatrixPosition(_.target.matrixWorld),z.direction.sub(Y),z.direction.transformDirection(N),R++}else if(_.isRectAreaLight){let z=Q.rectArea[L];z.position.setFromMatrixPosition(_.matrixWorld),z.position.applyMatrix4(N),H.identity(),X.copy(_.matrixWorld),X.premultiply(N),H.extractRotation(X),z.halfWidth.set(_.width*0.5,0,0),z.halfHeight.set(0,_.height*0.5,0),z.halfWidth.applyMatrix4(H),z.halfHeight.applyMatrix4(H),L++}else if(_.isPointLight){let z=Q.point[q];z.position.setFromMatrixPosition(_.matrixWorld),z.position.applyMatrix4(N),q++}else if(_.isHemisphereLight){let z=Q.hemi[w];z.direction.setFromMatrixPosition(_.matrixWorld),z.direction.transformDirection(N),w++}}}return{setup:U,setupView:G,state:Q}}function QL(J){let Z=new e4(J),W=[],Q=[],Y=[];function X(q){F.camera=q,W.length=0,Q.length=0,Y.length=0}function H(q){W.push(q)}function U(q){Q.push(q)}function G(q){Y.push(q)}function K(){Z.setup(W)}function O(q){Z.setupView(W,q)}let F={lightsArray:W,shadowsArray:Q,lightProbeGridArray:Y,camera:null,lights:Z,transmissionRenderTarget:{},textureUnits:0};return{init:X,state:F,setupLights:K,setupLightsView:O,pushLight:H,pushShadow:U,pushLightProbeGrid:G}}function Jk(J){let Z=new WeakMap;function W(Y,X=0){let H=Z.get(Y),U;if(H===void 0)U=new QL(J),Z.set(Y,[U]);else if(X>=H.length)U=new QL(J),H.push(U);else U=H[X];return U}function Q(){Z=new WeakMap}return{get:W,dispose:Q}}var Zk=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wk=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Qk=[new v(1,0,0),new v(-1,0,0),new v(0,1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1)],Yk=[new v(0,-1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1),new v(0,-1,0),new v(0,-1,0)],YL=new jJ,JY=new v,mq=new v;function Xk(J,Z,W){let Q=new CH,Y=new XJ,X=new XJ,H=new bJ,U=new Lq,G=new Bq,K={},O=W.maxTextureSize,F={[MW]:S7,[S7]:MW,[v6]:v6},q=new I7({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new XJ},radius:{value:4}},vertexShader:Zk,fragmentShader:Wk}),R=q.clone();R.defines.HORIZONTAL_PASS=1;let L=new O7;L.setAttribute("position",new mJ(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let w=new w6(L,q),N=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pQ;let $=this.type;this.render=function(D,T,A){if(N.enabled===!1)return;if(N.autoUpdate===!1&&N.needsUpdate===!1)return;if(D.length===0)return;if(this.type===bM)j0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=pQ;let C=J.getRenderTarget(),x=J.getActiveCubeFace(),E=J.getActiveMipmapLevel(),u=J.state;if(u.setBlending(x6),u.buffers.depth.getReversed()===!0)u.buffers.color.setClear(0,0,0,0);else u.buffers.color.setClear(1,1,1,1);u.buffers.depth.setTest(!0),u.setScissorTest(!1);let e=$!==this.type;if(e)T.traverse(function(b){if(b.material)if(Array.isArray(b.material))b.material.forEach((c)=>c.needsUpdate=!0);else b.material.needsUpdate=!0});for(let b=0,c=D.length;b<c;b++){let l=D[b],h=l.shadow;if(h===void 0){j0("WebGLShadowMap:",l,"has no shadow.");continue}if(h.autoUpdate===!1&&h.needsUpdate===!1)continue;Y.copy(h.mapSize);let g=h.getFrameExtents();if(Y.multiply(g),X.copy(h.mapSize),Y.x>O||Y.y>O){if(Y.x>O)X.x=Math.floor(O/g.x),Y.x=X.x*g.x,h.mapSize.x=X.x;if(Y.y>O)X.y=Math.floor(O/g.y),Y.y=X.y*g.y,h.mapSize.y=X.y}let Y0=J.state.buffers.depth.getReversed();if(h.camera._reversedDepth=Y0,h.map===null||e===!0){if(h.map!==null){if(h.map.depthTexture!==null)h.map.depthTexture.dispose(),h.map.depthTexture=null;h.map.dispose()}if(this.type===FW){if(l.isPointLight){j0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}h.map=new $6(Y.x,Y.y,{format:m9,type:M8,minFilter:j7,magFilter:j7,generateMipmaps:!1}),h.map.texture.name=l.name+".shadowMap",h.map.depthTexture=new H9(Y.x,Y.y,F8),h.map.depthTexture.name=l.name+".shadowMapDepth",h.map.depthTexture.format=h9,h.map.depthTexture.compareFunction=null,h.map.depthTexture.minFilter=Q9,h.map.depthTexture.magFilter=Q9}else{if(l.isPointLight)h.map=new lq(Y.x),h.map.depthTexture=new Rq(Y.x,Y9);else h.map=new $6(Y.x,Y.y),h.map.depthTexture=new H9(Y.x,Y.y,Y9);if(h.map.depthTexture.name=l.name+".shadowMap",h.map.depthTexture.format=h9,this.type===pQ)h.map.depthTexture.compareFunction=Y0?zH:BH,h.map.depthTexture.minFilter=j7,h.map.depthTexture.magFilter=j7;else h.map.depthTexture.compareFunction=null,h.map.depthTexture.minFilter=Q9,h.map.depthTexture.magFilter=Q9}h.camera.updateProjectionMatrix()}let O0=h.map.isWebGLCubeRenderTarget?6:1;for(let _0=0;_0<O0;_0++){if(h.map.isWebGLCubeRenderTarget)J.setRenderTarget(h.map,_0),J.clear();else{if(_0===0)J.setRenderTarget(h.map),J.clear();let I0=h.getViewport(_0);H.set(X.x*I0.x,X.y*I0.y,X.x*I0.z,X.y*I0.w),u.viewport(H)}if(l.isPointLight){let{camera:I0,matrix:zJ}=h,HJ=l.distance||I0.far;if(HJ!==I0.far)I0.far=HJ,I0.updateProjectionMatrix();JY.setFromMatrixPosition(l.matrixWorld),I0.position.copy(JY),mq.copy(I0.position),mq.add(Qk[_0]),I0.up.copy(Yk[_0]),I0.lookAt(mq),I0.updateMatrixWorld(),zJ.makeTranslation(-JY.x,-JY.y,-JY.z),YL.multiplyMatrices(I0.projectionMatrix,I0.matrixWorldInverse),h._frustum.setFromProjectionMatrix(YL,I0.coordinateSystem,I0.reversedDepth)}else h.updateMatrices(l);Q=h.getFrustum(),z(T,A,h.camera,l,this.type)}if(h.isPointLightShadow!==!0&&this.type===FW)B(h,A);h.needsUpdate=!1}$=this.type,N.needsUpdate=!1,J.setRenderTarget(C,x,E)};function B(D,T){let A=Z.update(w);if(q.defines.VSM_SAMPLES!==D.blurSamples)q.defines.VSM_SAMPLES=D.blurSamples,R.defines.VSM_SAMPLES=D.blurSamples,q.needsUpdate=!0,R.needsUpdate=!0;if(D.mapPass===null)D.mapPass=new $6(Y.x,Y.y,{format:m9,type:M8});q.uniforms.shadow_pass.value=D.map.depthTexture,q.uniforms.resolution.value=D.mapSize,q.uniforms.radius.value=D.radius,J.setRenderTarget(D.mapPass),J.clear(),J.renderBufferDirect(T,null,A,q,w,null),R.uniforms.shadow_pass.value=D.mapPass.texture,R.uniforms.resolution.value=D.mapSize,R.uniforms.radius.value=D.radius,J.setRenderTarget(D.map),J.clear(),J.renderBufferDirect(T,null,A,R,w,null)}function _(D,T,A,C){let x=null,E=A.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(E!==void 0)x=E;else if(x=A.isPointLight===!0?G:U,J.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let u=x.uuid,e=T.uuid,b=K[u];if(b===void 0)b={},K[u]=b;let c=b[e];if(c===void 0)c=x.clone(),b[e]=c,T.addEventListener("dispose",P);x=c}if(x.visible=T.visible,x.wireframe=T.wireframe,C===FW)x.side=T.shadowSide!==null?T.shadowSide:T.side;else x.side=T.shadowSide!==null?T.shadowSide:F[T.side];if(x.alphaMap=T.alphaMap,x.alphaTest=T.alphaToCoverage===!0?0.5:T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,A.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let u=J.properties.get(x);u.light=A}return x}function z(D,T,A,C,x){if(D.visible===!1)return;if(D.layers.test(T.layers)&&(D.isMesh||D.isLine||D.isPoints)){if((D.castShadow||D.receiveShadow&&x===FW)&&(!D.frustumCulled||Q.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,D.matrixWorld);let e=Z.update(D),b=D.material;if(Array.isArray(b)){let c=e.groups;for(let l=0,h=c.length;l<h;l++){let g=c[l],Y0=b[g.materialIndex];if(Y0&&Y0.visible){let O0=_(D,Y0,C,x);D.onBeforeShadow(J,D,T,A,e,O0,g),J.renderBufferDirect(A,null,e,O0,D,g),D.onAfterShadow(J,D,T,A,e,O0,g)}}}else if(b.visible){let c=_(D,b,C,x);D.onBeforeShadow(J,D,T,A,e,c,null),J.renderBufferDirect(A,null,e,c,D,null),D.onAfterShadow(J,D,T,A,e,c,null)}}}let u=D.children;for(let e=0,b=u.length;e<b;e++)z(u[e],T,A,C,x)}function P(D){D.target.removeEventListener("dispose",P);for(let A in K){let C=K[A],x=D.target.uuid;if(x in C)C[x].dispose(),delete C[x]}}}function Hk(J,Z){function W(){let S=!1,Q0=new bJ,m=null,Z0=new bJ(0,0,0,0);return{setMask:function(K0){if(m!==K0&&!S)J.colorMask(K0,K0,K0,K0),m=K0},setLocked:function(K0){S=K0},setClear:function(K0,r,$0,f0,e0){if(e0===!0)K0*=f0,r*=f0,$0*=f0;if(Q0.set(K0,r,$0,f0),Z0.equals(Q0)===!1)J.clearColor(K0,r,$0,f0),Z0.copy(Q0)},reset:function(){S=!1,m=null,Z0.set(-1,0,0,0)}}}function Q(){let S=!1,Q0=!1,m=null,Z0=null,K0=null;return{setReversed:function(r){if(Q0!==r){let $0=Z.get("EXT_clip_control");if(r)$0.clipControlEXT($0.LOWER_LEFT_EXT,$0.ZERO_TO_ONE_EXT);else $0.clipControlEXT($0.LOWER_LEFT_EXT,$0.NEGATIVE_ONE_TO_ONE_EXT);Q0=r;let f0=K0;K0=null,this.setClear(f0)}},getReversed:function(){return Q0},setTest:function(r){if(r)L0(J.DEPTH_TEST);else V0(J.DEPTH_TEST)},setMask:function(r){if(m!==r&&!S)J.depthMask(r),m=r},setFunc:function(r){if(Q0)r=jN[r];if(Z0!==r){switch(r){case ZN:J.depthFunc(J.NEVER);break;case WN:J.depthFunc(J.ALWAYS);break;case QN:J.depthFunc(J.LESS);break;case O5:J.depthFunc(J.LEQUAL);break;case YN:J.depthFunc(J.EQUAL);break;case XN:J.depthFunc(J.GEQUAL);break;case HN:J.depthFunc(J.GREATER);break;case UN:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}Z0=r}},setLocked:function(r){S=r},setClear:function(r){if(K0!==r){if(K0=r,Q0)r=1-r;J.clearDepth(r)}},reset:function(){S=!1,m=null,Z0=null,K0=null,Q0=!1}}}function Y(){let S=!1,Q0=null,m=null,Z0=null,K0=null,r=null,$0=null,f0=null,e0=null;return{setTest:function(GJ){if(!S)if(GJ)L0(J.STENCIL_TEST);else V0(J.STENCIL_TEST)},setMask:function(GJ){if(Q0!==GJ&&!S)J.stencilMask(GJ),Q0=GJ},setFunc:function(GJ,Z7,f7){if(m!==GJ||Z0!==Z7||K0!==f7)J.stencilFunc(GJ,Z7,f7),m=GJ,Z0=Z7,K0=f7},setOp:function(GJ,Z7,f7){if(r!==GJ||$0!==Z7||f0!==f7)J.stencilOp(GJ,Z7,f7),r=GJ,$0=Z7,f0=f7},setLocked:function(GJ){S=GJ},setClear:function(GJ){if(e0!==GJ)J.clearStencil(GJ),e0=GJ},reset:function(){S=!1,Q0=null,m=null,Z0=null,K0=null,r=null,$0=null,f0=null,e0=null}}}let X=new W,H=new Q,U=new Y,G=new WeakMap,K=new WeakMap,O={},F={},q={},R=new WeakMap,L=[],w=null,N=!1,$=null,B=null,_=null,z=null,P=null,D=null,T=null,A=new a0(0,0,0),C=0,x=!1,E=null,u=null,e=null,b=null,c=null,l=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),h=!1,g=0,Y0=J.getParameter(J.VERSION);if(Y0.indexOf("WebGL")!==-1)g=parseFloat(/^WebGL (\d)/.exec(Y0)[1]),h=g>=1;else if(Y0.indexOf("OpenGL ES")!==-1)g=parseFloat(/^OpenGL ES (\d)/.exec(Y0)[1]),h=g>=2;let O0=null,_0={},I0=J.getParameter(J.SCISSOR_BOX),zJ=J.getParameter(J.VIEWPORT),HJ=new bJ().fromArray(I0),t=new bJ().fromArray(zJ);function q0(S,Q0,m,Z0){let K0=new Uint8Array(4),r=J.createTexture();J.bindTexture(S,r),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let $0=0;$0<m;$0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D(Q0,0,J.RGBA,1,1,Z0,0,J.RGBA,J.UNSIGNED_BYTE,K0);else J.texImage2D(Q0+$0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,K0);return r}let A0={};A0[J.TEXTURE_2D]=q0(J.TEXTURE_2D,J.TEXTURE_2D,1),A0[J.TEXTURE_CUBE_MAP]=q0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),A0[J.TEXTURE_2D_ARRAY]=q0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),A0[J.TEXTURE_3D]=q0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),X.setClear(0,0,0,1),H.setClear(1),U.setClear(0),L0(J.DEPTH_TEST),H.setFunc(O5),VJ(!1),DJ(K5),L0(J.CULL_FACE),p0(x6);function L0(S){if(O[S]!==!0)J.enable(S),O[S]=!0}function V0(S){if(O[S]!==!1)J.disable(S),O[S]=!1}function r0(S,Q0){if(q[S]!==Q0){if(J.bindFramebuffer(S,Q0),q[S]=Q0,S===J.DRAW_FRAMEBUFFER)q[J.FRAMEBUFFER]=Q0;if(S===J.FRAMEBUFFER)q[J.DRAW_FRAMEBUFFER]=Q0;return!0}return!1}function m0(S,Q0){let m=L,Z0=!1;if(S){if(m=R.get(Q0),m===void 0)m=[],R.set(Q0,m);let K0=S.textures;if(m.length!==K0.length||m[0]!==J.COLOR_ATTACHMENT0){for(let r=0,$0=K0.length;r<$0;r++)m[r]=J.COLOR_ATTACHMENT0+r;m.length=K0.length,Z0=!0}}else if(m[0]!==J.BACK)m[0]=J.BACK,Z0=!0;if(Z0)J.drawBuffers(m)}function u0(S){if(w!==S)return J.useProgram(S),w=S,!0;return!1}let $J={[NW]:J.FUNC_ADD,[vM]:J.FUNC_SUBTRACT,[xM]:J.FUNC_REVERSE_SUBTRACT};$J[hM]=J.MIN,$J[gM]=J.MAX;let i0={[mM]:J.ZERO,[pM]:J.ONE,[dM]:J.SRC_COLOR,[lM]:J.SRC_ALPHA,[aM]:J.SRC_ALPHA_SATURATE,[nM]:J.DST_COLOR,[iM]:J.DST_ALPHA,[uM]:J.ONE_MINUS_SRC_COLOR,[cM]:J.ONE_MINUS_SRC_ALPHA,[oM]:J.ONE_MINUS_DST_COLOR,[sM]:J.ONE_MINUS_DST_ALPHA,[rM]:J.CONSTANT_COLOR,[tM]:J.ONE_MINUS_CONSTANT_COLOR,[eM]:J.CONSTANT_ALPHA,[JN]:J.ONE_MINUS_CONSTANT_ALPHA};function p0(S,Q0,m,Z0,K0,r,$0,f0,e0,GJ){if(S===x6){if(N===!0)V0(J.BLEND),N=!1;return}if(N===!1)L0(J.BLEND),N=!0;if(S!==yM){if(S!==$||GJ!==x){if(B!==NW||P!==NW)J.blendEquation(J.FUNC_ADD),B=NW,P=NW;if(GJ)switch(S){case dQ:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case W9:J.blendFunc(J.ONE,J.ONE);break;case q5:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case $5:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:b0("WebGLState: Invalid blending: ",S);break}else switch(S){case dQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case W9:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case q5:b0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $5:b0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:b0("WebGLState: Invalid blending: ",S);break}_=null,z=null,D=null,T=null,A.set(0,0,0),C=0,$=S,x=GJ}return}if(K0=K0||Q0,r=r||m,$0=$0||Z0,Q0!==B||K0!==P)J.blendEquationSeparate($J[Q0],$J[K0]),B=Q0,P=K0;if(m!==_||Z0!==z||r!==D||$0!==T)J.blendFuncSeparate(i0[m],i0[Z0],i0[r],i0[$0]),_=m,z=Z0,D=r,T=$0;if(f0.equals(A)===!1||e0!==C)J.blendColor(f0.r,f0.g,f0.b,e0),A.copy(f0),C=e0;$=S,x=!1}function yJ(S,Q0){S.side===v6?V0(J.CULL_FACE):L0(J.CULL_FACE);let m=S.side===S7;if(Q0)m=!m;VJ(m),S.blending===dQ&&S.transparent===!1?p0(x6):p0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),H.setFunc(S.depthFunc),H.setTest(S.depthTest),H.setMask(S.depthWrite),X.setMask(S.colorWrite);let Z0=S.stencilWrite;if(U.setTest(Z0),Z0)U.setMask(S.stencilWriteMask),U.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),U.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);cJ(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?L0(J.SAMPLE_ALPHA_TO_COVERAGE):V0(J.SAMPLE_ALPHA_TO_COVERAGE)}function VJ(S){if(E!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);E=S}}function DJ(S){if(S!==jM){if(L0(J.CULL_FACE),S!==u)if(S===K5)J.cullFace(J.BACK);else if(S===fM)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else V0(J.CULL_FACE);u=S}function TJ(S){if(S!==e){if(h)J.lineWidth(S);e=S}}function cJ(S,Q0,m){if(S){if(L0(J.POLYGON_OFFSET_FILL),b!==Q0||c!==m){if(b=Q0,c=m,H.getReversed())Q0=-Q0;J.polygonOffset(Q0,m)}}else V0(J.POLYGON_OFFSET_FILL)}function vJ(S){if(S)L0(J.SCISSOR_TEST);else V0(J.SCISSOR_TEST)}function j(S){if(S===void 0)S=J.TEXTURE0+l-1;if(O0!==S)J.activeTexture(S),O0=S}function iJ(S,Q0,m){if(m===void 0)if(O0===null)m=J.TEXTURE0+l-1;else m=O0;let Z0=_0[m];if(Z0===void 0)Z0={type:void 0,texture:void 0},_0[m]=Z0;if(Z0.type!==S||Z0.texture!==Q0){if(O0!==m)J.activeTexture(m),O0=m;J.bindTexture(S,Q0||A0[S]),Z0.type=S,Z0.texture=Q0}}function t0(){let S=_0[O0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function MJ(){try{J.compressedTexImage2D(...arguments)}catch(S){b0("WebGLState:",S)}}function V(){try{J.compressedTexImage3D(...arguments)}catch(S){b0("WebGLState:",S)}}function I(){try{J.texSubImage2D(...arguments)}catch(S){b0("WebGLState:",S)}}function f(){try{J.texSubImage3D(...arguments)}catch(S){b0("WebGLState:",S)}}function i(){try{J.compressedTexSubImage2D(...arguments)}catch(S){b0("WebGLState:",S)}}function W0(){try{J.compressedTexSubImage3D(...arguments)}catch(S){b0("WebGLState:",S)}}function U0(){try{J.texStorage2D(...arguments)}catch(S){b0("WebGLState:",S)}}function F0(){try{J.texStorage3D(...arguments)}catch(S){b0("WebGLState:",S)}}function o(){try{J.texImage2D(...arguments)}catch(S){b0("WebGLState:",S)}}function a(){try{J.texImage3D(...arguments)}catch(S){b0("WebGLState:",S)}}function X0(S){if(F[S]!==void 0)return F[S];else return J.getParameter(S)}function k0(S,Q0){if(F[S]!==Q0)J.pixelStorei(S,Q0),F[S]=Q0}function M0(S){if(HJ.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),HJ.copy(S)}function H0(S){if(t.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),t.copy(S)}function E0(S,Q0){let m=K.get(Q0);if(m===void 0)m=new WeakMap,K.set(Q0,m);let Z0=m.get(S);if(Z0===void 0)Z0=J.getUniformBlockIndex(Q0,S.name),m.set(S,Z0)}function S0(S,Q0){let Z0=K.get(Q0).get(S);if(G.get(Q0)!==Z0)J.uniformBlockBinding(Q0,Z0,S.__bindingPointIndex),G.set(Q0,Z0)}function R0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),O={},F={},O0=null,_0={},q={},R=new WeakMap,L=[],w=null,N=!1,$=null,B=null,_=null,z=null,P=null,D=null,T=null,A=new a0(0,0,0),C=0,x=!1,E=null,u=null,e=null,b=null,c=null,HJ.set(0,0,J.canvas.width,J.canvas.height),t.set(0,0,J.canvas.width,J.canvas.height),X.reset(),H.reset(),U.reset()}return{buffers:{color:X,depth:H,stencil:U},enable:L0,disable:V0,bindFramebuffer:r0,drawBuffers:m0,useProgram:u0,setBlending:p0,setMaterial:yJ,setFlipSided:VJ,setCullFace:DJ,setLineWidth:TJ,setPolygonOffset:cJ,setScissorTest:vJ,activeTexture:j,bindTexture:iJ,unbindTexture:t0,compressedTexImage2D:MJ,compressedTexImage3D:V,texImage2D:o,texImage3D:a,pixelStorei:k0,getParameter:X0,updateUBOMapping:E0,uniformBlockBinding:S0,texStorage2D:U0,texStorage3D:F0,texSubImage2D:I,texSubImage3D:f,compressedTexSubImage2D:i,compressedTexSubImage3D:W0,scissor:M0,viewport:H0,reset:R0}}function Uk(J,Z,W,Q,Y,X,H){let U=Z.has("WEBGL_multisampled_render_to_texture")?Z.get("WEBGL_multisampled_render_to_texture"):null,G=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),K=new XJ,O=new WeakMap,F=new Set,q,R=new WeakMap,L=!1;try{L=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(V){}function w(V,I){return L?new OffscreenCanvas(V,I):mQ("canvas")}function N(V,I,f){let i=1,W0=MJ(V);if(W0.width>f||W0.height>f)i=f/Math.max(W0.width,W0.height);if(i<1)if(typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&V instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&V instanceof ImageBitmap||typeof VideoFrame<"u"&&V instanceof VideoFrame){let U0=Math.floor(i*W0.width),F0=Math.floor(i*W0.height);if(q===void 0)q=w(U0,F0);let o=I?w(U0,F0):q;return o.width=U0,o.height=F0,o.getContext("2d").drawImage(V,0,0,U0,F0),j0("WebGLRenderer: Texture has been resized from ("+W0.width+"x"+W0.height+") to ("+U0+"x"+F0+")."),o}else{if("data"in V)j0("WebGLRenderer: Image in DataTexture is too big ("+W0.width+"x"+W0.height+").");return V}return V}function $(V){return V.generateMipmaps}function B(V){J.generateMipmap(V)}function _(V){if(V.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(V.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(V.isWebGLArrayRenderTarget||V.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function z(V,I,f,i,W0,U0=!1){if(V!==null){if(J[V]!==void 0)return J[V];j0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+V+"'")}let F0;if(i){if(F0=Z.get("EXT_texture_norm16"),!F0)j0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let o=I;if(I===J.RED){if(f===J.FLOAT)o=J.R32F;if(f===J.HALF_FLOAT)o=J.R16F;if(f===J.UNSIGNED_BYTE)o=J.R8;if(f===J.UNSIGNED_SHORT&&F0)o=F0.R16_EXT;if(f===J.SHORT&&F0)o=F0.R16_SNORM_EXT}if(I===J.RED_INTEGER){if(f===J.UNSIGNED_BYTE)o=J.R8UI;if(f===J.UNSIGNED_SHORT)o=J.R16UI;if(f===J.UNSIGNED_INT)o=J.R32UI;if(f===J.BYTE)o=J.R8I;if(f===J.SHORT)o=J.R16I;if(f===J.INT)o=J.R32I}if(I===J.RG){if(f===J.FLOAT)o=J.RG32F;if(f===J.HALF_FLOAT)o=J.RG16F;if(f===J.UNSIGNED_BYTE)o=J.RG8;if(f===J.UNSIGNED_SHORT&&F0)o=F0.RG16_EXT;if(f===J.SHORT&&F0)o=F0.RG16_SNORM_EXT}if(I===J.RG_INTEGER){if(f===J.UNSIGNED_BYTE)o=J.RG8UI;if(f===J.UNSIGNED_SHORT)o=J.RG16UI;if(f===J.UNSIGNED_INT)o=J.RG32UI;if(f===J.BYTE)o=J.RG8I;if(f===J.SHORT)o=J.RG16I;if(f===J.INT)o=J.RG32I}if(I===J.RGB_INTEGER){if(f===J.UNSIGNED_BYTE)o=J.RGB8UI;if(f===J.UNSIGNED_SHORT)o=J.RGB16UI;if(f===J.UNSIGNED_INT)o=J.RGB32UI;if(f===J.BYTE)o=J.RGB8I;if(f===J.SHORT)o=J.RGB16I;if(f===J.INT)o=J.RGB32I}if(I===J.RGBA_INTEGER){if(f===J.UNSIGNED_BYTE)o=J.RGBA8UI;if(f===J.UNSIGNED_SHORT)o=J.RGBA16UI;if(f===J.UNSIGNED_INT)o=J.RGBA32UI;if(f===J.BYTE)o=J.RGBA8I;if(f===J.SHORT)o=J.RGBA16I;if(f===J.INT)o=J.RGBA32I}if(I===J.RGB){if(f===J.UNSIGNED_SHORT&&F0)o=F0.RGB16_EXT;if(f===J.SHORT&&F0)o=F0.RGB16_SNORM_EXT;if(f===J.UNSIGNED_INT_5_9_9_9_REV)o=J.RGB9_E5;if(f===J.UNSIGNED_INT_10F_11F_11F_REV)o=J.R11F_G11F_B10F}if(I===J.RGBA){let a=U0?Yq:WJ.getTransfer(W0);if(f===J.FLOAT)o=J.RGBA32F;if(f===J.HALF_FLOAT)o=J.RGBA16F;if(f===J.UNSIGNED_BYTE)o=a===wJ?J.SRGB8_ALPHA8:J.RGBA8;if(f===J.UNSIGNED_SHORT&&F0)o=F0.RGBA16_EXT;if(f===J.SHORT&&F0)o=F0.RGBA16_SNORM_EXT;if(f===J.UNSIGNED_SHORT_4_4_4_4)o=J.RGBA4;if(f===J.UNSIGNED_SHORT_5_5_5_1)o=J.RGB5_A1}if(o===J.R16F||o===J.R32F||o===J.RG16F||o===J.RG32F||o===J.RGBA16F||o===J.RGBA32F)Z.get("EXT_color_buffer_float");return o}function P(V,I){let f;if(V){if(I===null||I===Y9||I===BW)f=J.DEPTH24_STENCIL8;else if(I===F8)f=J.DEPTH32F_STENCIL8;else if(I===cQ)f=J.DEPTH24_STENCIL8,j0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(I===null||I===Y9||I===BW)f=J.DEPTH_COMPONENT24;else if(I===F8)f=J.DEPTH_COMPONENT32F;else if(I===cQ)f=J.DEPTH_COMPONENT16;return f}function D(V,I){if($(V)===!0||V.isFramebufferTexture&&V.minFilter!==Q9&&V.minFilter!==j7)return Math.log2(Math.max(I.width,I.height))+1;else if(V.mipmaps!==void 0&&V.mipmaps.length>0)return V.mipmaps.length;else if(V.isCompressedTexture&&Array.isArray(V.image))return I.mipmaps.length;else return 1}function T(V){let I=V.target;if(I.removeEventListener("dispose",T),C(I),I.isVideoTexture)O.delete(I);if(I.isHTMLTexture)F.delete(I)}function A(V){let I=V.target;I.removeEventListener("dispose",A),E(I)}function C(V){let I=Q.get(V);if(I.__webglInit===void 0)return;let f=V.source,i=R.get(f);if(i){let W0=i[I.__cacheKey];if(W0.usedTimes--,W0.usedTimes===0)x(V);if(Object.keys(i).length===0)R.delete(f)}Q.remove(V)}function x(V){let I=Q.get(V);J.deleteTexture(I.__webglTexture);let f=V.source,i=R.get(f);delete i[I.__cacheKey],H.memory.textures--}function E(V){let I=Q.get(V);if(V.depthTexture)V.depthTexture.dispose(),Q.remove(V.depthTexture);if(V.isWebGLCubeRenderTarget)for(let i=0;i<6;i++){if(Array.isArray(I.__webglFramebuffer[i]))for(let W0=0;W0<I.__webglFramebuffer[i].length;W0++)J.deleteFramebuffer(I.__webglFramebuffer[i][W0]);else J.deleteFramebuffer(I.__webglFramebuffer[i]);if(I.__webglDepthbuffer)J.deleteRenderbuffer(I.__webglDepthbuffer[i])}else{if(Array.isArray(I.__webglFramebuffer))for(let i=0;i<I.__webglFramebuffer.length;i++)J.deleteFramebuffer(I.__webglFramebuffer[i]);else J.deleteFramebuffer(I.__webglFramebuffer);if(I.__webglDepthbuffer)J.deleteRenderbuffer(I.__webglDepthbuffer);if(I.__webglMultisampledFramebuffer)J.deleteFramebuffer(I.__webglMultisampledFramebuffer);if(I.__webglColorRenderbuffer){for(let i=0;i<I.__webglColorRenderbuffer.length;i++)if(I.__webglColorRenderbuffer[i])J.deleteRenderbuffer(I.__webglColorRenderbuffer[i])}if(I.__webglDepthRenderbuffer)J.deleteRenderbuffer(I.__webglDepthRenderbuffer)}let f=V.textures;for(let i=0,W0=f.length;i<W0;i++){let U0=Q.get(f[i]);if(U0.__webglTexture)J.deleteTexture(U0.__webglTexture),H.memory.textures--;Q.remove(f[i])}Q.remove(V)}let u=0;function e(){u=0}function b(){return u}function c(V){u=V}function l(){let V=u;if(V>=Y.maxTextures)j0("WebGLTextures: Trying to use "+V+" texture units while this GPU supports only "+Y.maxTextures);return u+=1,V}function h(V){let I=[];return I.push(V.wrapS),I.push(V.wrapT),I.push(V.wrapR||0),I.push(V.magFilter),I.push(V.minFilter),I.push(V.anisotropy),I.push(V.internalFormat),I.push(V.format),I.push(V.type),I.push(V.generateMipmaps),I.push(V.premultiplyAlpha),I.push(V.flipY),I.push(V.unpackAlignment),I.push(V.colorSpace),I.join()}function g(V,I){let f=Q.get(V);if(V.isVideoTexture)iJ(V);if(V.isRenderTargetTexture===!1&&V.isExternalTexture!==!0&&V.version>0&&f.__version!==V.version){let i=V.image;if(i===null)j0("WebGLRenderer: Texture marked for update but no image data found.");else if(i.complete===!1)j0("WebGLRenderer: Texture marked for update but image is incomplete");else{V0(f,V,I);return}}else if(V.isExternalTexture)f.__webglTexture=V.sourceTexture?V.sourceTexture:null;W.bindTexture(J.TEXTURE_2D,f.__webglTexture,J.TEXTURE0+I)}function Y0(V,I){let f=Q.get(V);if(V.isRenderTargetTexture===!1&&V.version>0&&f.__version!==V.version){V0(f,V,I);return}else if(V.isExternalTexture)f.__webglTexture=V.sourceTexture?V.sourceTexture:null;W.bindTexture(J.TEXTURE_2D_ARRAY,f.__webglTexture,J.TEXTURE0+I)}function O0(V,I){let f=Q.get(V);if(V.isRenderTargetTexture===!1&&V.version>0&&f.__version!==V.version){V0(f,V,I);return}W.bindTexture(J.TEXTURE_3D,f.__webglTexture,J.TEXTURE0+I)}function _0(V,I){let f=Q.get(V);if(V.isCubeDepthTexture!==!0&&V.version>0&&f.__version!==V.version){r0(f,V,I);return}W.bindTexture(J.TEXTURE_CUBE_MAP,f.__webglTexture,J.TEXTURE0+I)}let I0={[$N]:J.REPEAT,[qH]:J.CLAMP_TO_EDGE,[ON]:J.MIRRORED_REPEAT},zJ={[Q9]:J.NEAREST,[RN]:J.NEAREST_MIPMAP_NEAREST,[lQ]:J.NEAREST_MIPMAP_LINEAR,[j7]:J.LINEAR,[$H]:J.LINEAR_MIPMAP_NEAREST,[x9]:J.LINEAR_MIPMAP_LINEAR},HJ={[wN]:J.NEVER,[TN]:J.ALWAYS,[DN]:J.LESS,[BH]:J.LEQUAL,[kN]:J.EQUAL,[zH]:J.GEQUAL,[CN]:J.GREATER,[VN]:J.NOTEQUAL};function t(V,I){if(I.type===F8&&Z.has("OES_texture_float_linear")===!1&&(I.magFilter===j7||I.magFilter===$H||I.magFilter===lQ||I.magFilter===x9||I.minFilter===j7||I.minFilter===$H||I.minFilter===lQ||I.minFilter===x9))j0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(V,J.TEXTURE_WRAP_S,I0[I.wrapS]),J.texParameteri(V,J.TEXTURE_WRAP_T,I0[I.wrapT]),V===J.TEXTURE_3D||V===J.TEXTURE_2D_ARRAY)J.texParameteri(V,J.TEXTURE_WRAP_R,I0[I.wrapR]);if(J.texParameteri(V,J.TEXTURE_MAG_FILTER,zJ[I.magFilter]),J.texParameteri(V,J.TEXTURE_MIN_FILTER,zJ[I.minFilter]),I.compareFunction)J.texParameteri(V,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(V,J.TEXTURE_COMPARE_FUNC,HJ[I.compareFunction]);if(Z.has("EXT_texture_filter_anisotropic")===!0){if(I.magFilter===Q9)return;if(I.minFilter!==lQ&&I.minFilter!==x9)return;if(I.type===F8&&Z.has("OES_texture_float_linear")===!1)return;if(I.anisotropy>1||Q.get(I).__currentAnisotropy){let f=Z.get("EXT_texture_filter_anisotropic");J.texParameterf(V,f.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(I.anisotropy,Y.getMaxAnisotropy())),Q.get(I).__currentAnisotropy=I.anisotropy}}}function q0(V,I){let f=!1;if(V.__webglInit===void 0)V.__webglInit=!0,I.addEventListener("dispose",T);let i=I.source,W0=R.get(i);if(W0===void 0)W0={},R.set(i,W0);let U0=h(I);if(U0!==V.__cacheKey){if(W0[U0]===void 0)W0[U0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,f=!0;W0[U0].usedTimes++;let F0=W0[V.__cacheKey];if(F0!==void 0){if(W0[V.__cacheKey].usedTimes--,F0.usedTimes===0)x(I)}V.__cacheKey=U0,V.__webglTexture=W0[U0].texture}return f}function A0(V,I,f){return Math.floor(Math.floor(V/f)/I)}function L0(V,I,f,i){let U0=V.updateRanges;if(U0.length===0)W.texSubImage2D(J.TEXTURE_2D,0,0,0,I.width,I.height,f,i,I.data);else{U0.sort((k0,M0)=>k0.start-M0.start);let F0=0;for(let k0=1;k0<U0.length;k0++){let M0=U0[F0],H0=U0[k0],E0=M0.start+M0.count,S0=A0(H0.start,I.width,4),R0=A0(M0.start,I.width,4);if(H0.start<=E0+1&&S0===R0&&A0(H0.start+H0.count-1,I.width,4)===S0)M0.count=Math.max(M0.count,H0.start+H0.count-M0.start);else++F0,U0[F0]=H0}U0.length=F0+1;let o=W.getParameter(J.UNPACK_ROW_LENGTH),a=W.getParameter(J.UNPACK_SKIP_PIXELS),X0=W.getParameter(J.UNPACK_SKIP_ROWS);W.pixelStorei(J.UNPACK_ROW_LENGTH,I.width);for(let k0=0,M0=U0.length;k0<M0;k0++){let H0=U0[k0],E0=Math.floor(H0.start/4),S0=Math.ceil(H0.count/4),R0=E0%I.width,S=Math.floor(E0/I.width),Q0=S0,m=1;W.pixelStorei(J.UNPACK_SKIP_PIXELS,R0),W.pixelStorei(J.UNPACK_SKIP_ROWS,S),W.texSubImage2D(J.TEXTURE_2D,0,R0,S,Q0,1,f,i,I.data)}V.clearUpdateRanges(),W.pixelStorei(J.UNPACK_ROW_LENGTH,o),W.pixelStorei(J.UNPACK_SKIP_PIXELS,a),W.pixelStorei(J.UNPACK_SKIP_ROWS,X0)}}function V0(V,I,f){let i=J.TEXTURE_2D;if(I.isDataArrayTexture||I.isCompressedArrayTexture)i=J.TEXTURE_2D_ARRAY;if(I.isData3DTexture)i=J.TEXTURE_3D;let W0=q0(V,I),U0=I.source;W.bindTexture(i,V.__webglTexture,J.TEXTURE0+f);let F0=Q.get(U0);if(U0.version!==F0.__version||W0===!0){if(W.activeTexture(J.TEXTURE0+f),(typeof ImageBitmap<"u"&&I.image instanceof ImageBitmap)===!1){let m=WJ.getPrimaries(WJ.workingColorSpace),Z0=I.colorSpace===p9?null:WJ.getPrimaries(I.colorSpace),K0=I.colorSpace===p9||m===Z0?J.NONE:J.BROWSER_DEFAULT_WEBGL;W.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,I.flipY),W.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),W.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,K0)}W.pixelStorei(J.UNPACK_ALIGNMENT,I.unpackAlignment);let a=N(I.image,!1,Y.maxTextureSize);a=t0(I,a);let X0=X.convert(I.format,I.colorSpace),k0=X.convert(I.type),M0=z(I.internalFormat,X0,k0,I.normalized,I.colorSpace,I.isVideoTexture);t(i,I);let H0,E0=I.mipmaps,S0=I.isVideoTexture!==!0,R0=F0.__version===void 0||W0===!0,S=U0.dataReady,Q0=D(I,a);if(I.isDepthTexture){if(M0=P(I.format===g9,I.type),R0)if(S0)W.texStorage2D(J.TEXTURE_2D,1,M0,a.width,a.height);else W.texImage2D(J.TEXTURE_2D,0,M0,a.width,a.height,0,X0,k0,null)}else if(I.isDataTexture)if(E0.length>0){if(S0&&R0)W.texStorage2D(J.TEXTURE_2D,Q0,M0,E0[0].width,E0[0].height);for(let m=0,Z0=E0.length;m<Z0;m++)if(H0=E0[m],S0){if(S)W.texSubImage2D(J.TEXTURE_2D,m,0,0,H0.width,H0.height,X0,k0,H0.data)}else W.texImage2D(J.TEXTURE_2D,m,M0,H0.width,H0.height,0,X0,k0,H0.data);I.generateMipmaps=!1}else if(S0){if(R0)W.texStorage2D(J.TEXTURE_2D,Q0,M0,a.width,a.height);if(S)L0(I,a,X0,k0)}else W.texImage2D(J.TEXTURE_2D,0,M0,a.width,a.height,0,X0,k0,a.data);else if(I.isCompressedTexture)if(I.isCompressedArrayTexture){if(S0&&R0)W.texStorage3D(J.TEXTURE_2D_ARRAY,Q0,M0,E0[0].width,E0[0].height,a.depth);for(let m=0,Z0=E0.length;m<Z0;m++)if(H0=E0[m],I.format!==h6)if(X0!==null)if(S0){if(S)if(I.layerUpdates.size>0){let K0=bq(H0.width,H0.height,I.format,I.type);for(let r of I.layerUpdates){let $0=H0.data.subarray(r*K0/H0.data.BYTES_PER_ELEMENT,(r+1)*K0/H0.data.BYTES_PER_ELEMENT);W.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,m,0,0,r,H0.width,H0.height,1,X0,$0)}I.clearLayerUpdates()}else W.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,m,0,0,0,H0.width,H0.height,a.depth,X0,H0.data)}else W.compressedTexImage3D(J.TEXTURE_2D_ARRAY,m,M0,H0.width,H0.height,a.depth,0,H0.data,0,0);else j0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(S0){if(S)W.texSubImage3D(J.TEXTURE_2D_ARRAY,m,0,0,0,H0.width,H0.height,a.depth,X0,k0,H0.data)}else W.texImage3D(J.TEXTURE_2D_ARRAY,m,M0,H0.width,H0.height,a.depth,0,X0,k0,H0.data)}else{if(S0&&R0)W.texStorage2D(J.TEXTURE_2D,Q0,M0,E0[0].width,E0[0].height);for(let m=0,Z0=E0.length;m<Z0;m++)if(H0=E0[m],I.format!==h6)if(X0!==null)if(S0){if(S)W.compressedTexSubImage2D(J.TEXTURE_2D,m,0,0,H0.width,H0.height,X0,H0.data)}else W.compressedTexImage2D(J.TEXTURE_2D,m,M0,H0.width,H0.height,0,H0.data);else j0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(S0){if(S)W.texSubImage2D(J.TEXTURE_2D,m,0,0,H0.width,H0.height,X0,k0,H0.data)}else W.texImage2D(J.TEXTURE_2D,m,M0,H0.width,H0.height,0,X0,k0,H0.data)}else if(I.isDataArrayTexture)if(S0){if(R0)W.texStorage3D(J.TEXTURE_2D_ARRAY,Q0,M0,a.width,a.height,a.depth);if(S)if(I.layerUpdates.size>0){let m=bq(a.width,a.height,I.format,I.type);for(let Z0 of I.layerUpdates){let K0=a.data.subarray(Z0*m/a.data.BYTES_PER_ELEMENT,(Z0+1)*m/a.data.BYTES_PER_ELEMENT);W.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,Z0,a.width,a.height,1,X0,k0,K0)}I.clearLayerUpdates()}else W.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,a.width,a.height,a.depth,X0,k0,a.data)}else W.texImage3D(J.TEXTURE_2D_ARRAY,0,M0,a.width,a.height,a.depth,0,X0,k0,a.data);else if(I.isData3DTexture)if(S0){if(R0)W.texStorage3D(J.TEXTURE_3D,Q0,M0,a.width,a.height,a.depth);if(S)W.texSubImage3D(J.TEXTURE_3D,0,0,0,0,a.width,a.height,a.depth,X0,k0,a.data)}else W.texImage3D(J.TEXTURE_3D,0,M0,a.width,a.height,a.depth,0,X0,k0,a.data);else if(I.isFramebufferTexture){if(R0)if(S0)W.texStorage2D(J.TEXTURE_2D,Q0,M0,a.width,a.height);else{let{width:m,height:Z0}=a;for(let K0=0;K0<Q0;K0++)W.texImage2D(J.TEXTURE_2D,K0,M0,m,Z0,0,X0,k0,null),m>>=1,Z0>>=1}}else if(I.isHTMLTexture){if("texElementImage2D"in J){let m=J.canvas;if(!m.hasAttribute("layoutsubtree"))m.setAttribute("layoutsubtree","true");if(a.parentNode!==m){m.appendChild(a),F.add(I),m.onpaint=(Z0)=>{let K0=Z0.changedElements;for(let r of F)if(K0.includes(r.image))r.needsUpdate=!0},m.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,a);else{let{RGBA:K0,RGBA:r,UNSIGNED_BYTE:$0}=J;J.texElementImage2D(J.TEXTURE_2D,0,K0,r,$0,a)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(E0.length>0){if(S0&&R0){let m=MJ(E0[0]);W.texStorage2D(J.TEXTURE_2D,Q0,M0,m.width,m.height)}for(let m=0,Z0=E0.length;m<Z0;m++)if(H0=E0[m],S0){if(S)W.texSubImage2D(J.TEXTURE_2D,m,0,0,X0,k0,H0)}else W.texImage2D(J.TEXTURE_2D,m,M0,X0,k0,H0);I.generateMipmaps=!1}else if(S0){if(R0){let m=MJ(a);W.texStorage2D(J.TEXTURE_2D,Q0,M0,m.width,m.height)}if(S)W.texSubImage2D(J.TEXTURE_2D,0,0,0,X0,k0,a)}else W.texImage2D(J.TEXTURE_2D,0,M0,X0,k0,a);if($(I))B(i);if(F0.__version=U0.version,I.onUpdate)I.onUpdate(I)}V.__version=I.version}function r0(V,I,f){if(I.image.length!==6)return;let i=q0(V,I),W0=I.source;W.bindTexture(J.TEXTURE_CUBE_MAP,V.__webglTexture,J.TEXTURE0+f);let U0=Q.get(W0);if(W0.version!==U0.__version||i===!0){W.activeTexture(J.TEXTURE0+f);let F0=WJ.getPrimaries(WJ.workingColorSpace),o=I.colorSpace===p9?null:WJ.getPrimaries(I.colorSpace),a=I.colorSpace===p9||F0===o?J.NONE:J.BROWSER_DEFAULT_WEBGL;W.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,I.flipY),W.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),W.pixelStorei(J.UNPACK_ALIGNMENT,I.unpackAlignment),W.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,a);let X0=I.isCompressedTexture||I.image[0].isCompressedTexture,k0=I.image[0]&&I.image[0].isDataTexture,M0=[];for(let r=0;r<6;r++){if(!X0&&!k0)M0[r]=N(I.image[r],!0,Y.maxCubemapSize);else M0[r]=k0?I.image[r].image:I.image[r];M0[r]=t0(I,M0[r])}let H0=M0[0],E0=X.convert(I.format,I.colorSpace),S0=X.convert(I.type),R0=z(I.internalFormat,E0,S0,I.normalized,I.colorSpace),S=I.isVideoTexture!==!0,Q0=U0.__version===void 0||i===!0,m=W0.dataReady,Z0=D(I,H0);t(J.TEXTURE_CUBE_MAP,I);let K0;if(X0){if(S&&Q0)W.texStorage2D(J.TEXTURE_CUBE_MAP,Z0,R0,H0.width,H0.height);for(let r=0;r<6;r++){K0=M0[r].mipmaps;for(let $0=0;$0<K0.length;$0++){let f0=K0[$0];if(I.format!==h6)if(E0!==null)if(S){if(m)W.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,$0,0,0,f0.width,f0.height,E0,f0.data)}else W.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,$0,R0,f0.width,f0.height,0,f0.data);else j0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(m)W.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,$0,0,0,f0.width,f0.height,E0,S0,f0.data)}else W.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,$0,R0,f0.width,f0.height,0,E0,S0,f0.data)}}}else{if(K0=I.mipmaps,S&&Q0){if(K0.length>0)Z0++;let r=MJ(M0[0]);W.texStorage2D(J.TEXTURE_CUBE_MAP,Z0,R0,r.width,r.height)}for(let r=0;r<6;r++)if(k0){if(S){if(m)W.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,M0[r].width,M0[r].height,E0,S0,M0[r].data)}else W.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,R0,M0[r].width,M0[r].height,0,E0,S0,M0[r].data);for(let $0=0;$0<K0.length;$0++){let e0=K0[$0].image[r].image;if(S){if(m)W.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,$0+1,0,0,e0.width,e0.height,E0,S0,e0.data)}else W.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,$0+1,R0,e0.width,e0.height,0,E0,S0,e0.data)}}else{if(S){if(m)W.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,E0,S0,M0[r])}else W.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,R0,E0,S0,M0[r]);for(let $0=0;$0<K0.length;$0++){let f0=K0[$0];if(S){if(m)W.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,$0+1,0,0,E0,S0,f0.image[r])}else W.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,$0+1,R0,E0,S0,f0.image[r])}}}if($(I))B(J.TEXTURE_CUBE_MAP);if(U0.__version=W0.version,I.onUpdate)I.onUpdate(I)}V.__version=I.version}function m0(V,I,f,i,W0,U0){let F0=X.convert(f.format,f.colorSpace),o=X.convert(f.type),a=z(f.internalFormat,F0,o,f.normalized,f.colorSpace),X0=Q.get(I),k0=Q.get(f);if(k0.__renderTarget=I,!X0.__hasExternalTextures){let M0=Math.max(1,I.width>>U0),H0=Math.max(1,I.height>>U0);if(W0===J.TEXTURE_3D||W0===J.TEXTURE_2D_ARRAY)W.texImage3D(W0,U0,a,M0,H0,I.depth,0,F0,o,null);else W.texImage2D(W0,U0,a,M0,H0,0,F0,o,null)}if(W.bindFramebuffer(J.FRAMEBUFFER,V),j(I))U.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,W0,k0.__webglTexture,0,vJ(I));else if(W0===J.TEXTURE_2D||W0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&W0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,i,W0,k0.__webglTexture,U0);W.bindFramebuffer(J.FRAMEBUFFER,null)}function u0(V,I,f){if(J.bindRenderbuffer(J.RENDERBUFFER,V),I.depthBuffer){let i=I.depthTexture,W0=i&&i.isDepthTexture?i.type:null,U0=P(I.stencilBuffer,W0),F0=I.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(I))U.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,vJ(I),U0,I.width,I.height);else if(f)J.renderbufferStorageMultisample(J.RENDERBUFFER,vJ(I),U0,I.width,I.height);else J.renderbufferStorage(J.RENDERBUFFER,U0,I.width,I.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,F0,J.RENDERBUFFER,V)}else{let i=I.textures;for(let W0=0;W0<i.length;W0++){let U0=i[W0],F0=X.convert(U0.format,U0.colorSpace),o=X.convert(U0.type),a=z(U0.internalFormat,F0,o,U0.normalized,U0.colorSpace);if(j(I))U.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,vJ(I),a,I.width,I.height);else if(f)J.renderbufferStorageMultisample(J.RENDERBUFFER,vJ(I),a,I.width,I.height);else J.renderbufferStorage(J.RENDERBUFFER,a,I.width,I.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function $J(V,I,f){let i=I.isWebGLCubeRenderTarget===!0;if(W.bindFramebuffer(J.FRAMEBUFFER,V),!(I.depthTexture&&I.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let W0=Q.get(I.depthTexture);if(W0.__renderTarget=I,!W0.__webglTexture||I.depthTexture.image.width!==I.width||I.depthTexture.image.height!==I.height)I.depthTexture.image.width=I.width,I.depthTexture.image.height=I.height,I.depthTexture.needsUpdate=!0;if(i){if(W0.__webglInit===void 0)W0.__webglInit=!0,I.depthTexture.addEventListener("dispose",T);if(W0.__webglTexture===void 0){W0.__webglTexture=J.createTexture(),W.bindTexture(J.TEXTURE_CUBE_MAP,W0.__webglTexture),t(J.TEXTURE_CUBE_MAP,I.depthTexture);let X0=X.convert(I.depthTexture.format),k0=X.convert(I.depthTexture.type),M0;if(I.depthTexture.format===h9)M0=J.DEPTH_COMPONENT24;else if(I.depthTexture.format===g9)M0=J.DEPTH24_STENCIL8;for(let H0=0;H0<6;H0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,0,M0,I.width,I.height,0,X0,k0,null)}}else g(I.depthTexture,0);let U0=W0.__webglTexture,F0=vJ(I),o=i?J.TEXTURE_CUBE_MAP_POSITIVE_X+f:J.TEXTURE_2D,a=I.depthTexture.format===g9?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(I.depthTexture.format===h9)if(j(I))U.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,a,o,U0,0,F0);else J.framebufferTexture2D(J.FRAMEBUFFER,a,o,U0,0);else if(I.depthTexture.format===g9)if(j(I))U.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,a,o,U0,0,F0);else J.framebufferTexture2D(J.FRAMEBUFFER,a,o,U0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function i0(V){let I=Q.get(V),f=V.isWebGLCubeRenderTarget===!0;if(I.__boundDepthTexture!==V.depthTexture){let i=V.depthTexture;if(I.__depthDisposeCallback)I.__depthDisposeCallback();if(i){let W0=()=>{delete I.__boundDepthTexture,delete I.__depthDisposeCallback,i.removeEventListener("dispose",W0)};i.addEventListener("dispose",W0),I.__depthDisposeCallback=W0}I.__boundDepthTexture=i}if(V.depthTexture&&!I.__autoAllocateDepthBuffer)if(f)for(let i=0;i<6;i++)$J(I.__webglFramebuffer[i],V,i);else{let i=V.texture.mipmaps;if(i&&i.length>0)$J(I.__webglFramebuffer[0],V,0);else $J(I.__webglFramebuffer,V,0)}else if(f){I.__webglDepthbuffer=[];for(let i=0;i<6;i++)if(W.bindFramebuffer(J.FRAMEBUFFER,I.__webglFramebuffer[i]),I.__webglDepthbuffer[i]===void 0)I.__webglDepthbuffer[i]=J.createRenderbuffer(),u0(I.__webglDepthbuffer[i],V,!1);else{let W0=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,U0=I.__webglDepthbuffer[i];J.bindRenderbuffer(J.RENDERBUFFER,U0),J.framebufferRenderbuffer(J.FRAMEBUFFER,W0,J.RENDERBUFFER,U0)}}else{let i=V.texture.mipmaps;if(i&&i.length>0)W.bindFramebuffer(J.FRAMEBUFFER,I.__webglFramebuffer[0]);else W.bindFramebuffer(J.FRAMEBUFFER,I.__webglFramebuffer);if(I.__webglDepthbuffer===void 0)I.__webglDepthbuffer=J.createRenderbuffer(),u0(I.__webglDepthbuffer,V,!1);else{let W0=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,U0=I.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,U0),J.framebufferRenderbuffer(J.FRAMEBUFFER,W0,J.RENDERBUFFER,U0)}}W.bindFramebuffer(J.FRAMEBUFFER,null)}function p0(V,I,f){let i=Q.get(V);if(I!==void 0)m0(i.__webglFramebuffer,V,V.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(f!==void 0)i0(V)}function yJ(V){let I=V.texture,f=Q.get(V),i=Q.get(I);V.addEventListener("dispose",A);let W0=V.textures,U0=V.isWebGLCubeRenderTarget===!0,F0=W0.length>1;if(!F0){if(i.__webglTexture===void 0)i.__webglTexture=J.createTexture();i.__version=I.version,H.memory.textures++}if(U0){f.__webglFramebuffer=[];for(let o=0;o<6;o++)if(I.mipmaps&&I.mipmaps.length>0){f.__webglFramebuffer[o]=[];for(let a=0;a<I.mipmaps.length;a++)f.__webglFramebuffer[o][a]=J.createFramebuffer()}else f.__webglFramebuffer[o]=J.createFramebuffer()}else{if(I.mipmaps&&I.mipmaps.length>0){f.__webglFramebuffer=[];for(let o=0;o<I.mipmaps.length;o++)f.__webglFramebuffer[o]=J.createFramebuffer()}else f.__webglFramebuffer=J.createFramebuffer();if(F0)for(let o=0,a=W0.length;o<a;o++){let X0=Q.get(W0[o]);if(X0.__webglTexture===void 0)X0.__webglTexture=J.createTexture(),H.memory.textures++}if(V.samples>0&&j(V)===!1){f.__webglMultisampledFramebuffer=J.createFramebuffer(),f.__webglColorRenderbuffer=[],W.bindFramebuffer(J.FRAMEBUFFER,f.__webglMultisampledFramebuffer);for(let o=0;o<W0.length;o++){let a=W0[o];f.__webglColorRenderbuffer[o]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,f.__webglColorRenderbuffer[o]);let X0=X.convert(a.format,a.colorSpace),k0=X.convert(a.type),M0=z(a.internalFormat,X0,k0,a.normalized,a.colorSpace,V.isXRRenderTarget===!0),H0=vJ(V);J.renderbufferStorageMultisample(J.RENDERBUFFER,H0,M0,V.width,V.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+o,J.RENDERBUFFER,f.__webglColorRenderbuffer[o])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),V.depthBuffer)f.__webglDepthRenderbuffer=J.createRenderbuffer(),u0(f.__webglDepthRenderbuffer,V,!0);W.bindFramebuffer(J.FRAMEBUFFER,null)}}if(U0){W.bindTexture(J.TEXTURE_CUBE_MAP,i.__webglTexture),t(J.TEXTURE_CUBE_MAP,I);for(let o=0;o<6;o++)if(I.mipmaps&&I.mipmaps.length>0)for(let a=0;a<I.mipmaps.length;a++)m0(f.__webglFramebuffer[o][a],V,I,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+o,a);else m0(f.__webglFramebuffer[o],V,I,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+o,0);if($(I))B(J.TEXTURE_CUBE_MAP);W.unbindTexture()}else if(F0){for(let o=0,a=W0.length;o<a;o++){let X0=W0[o],k0=Q.get(X0),M0=J.TEXTURE_2D;if(V.isWebGL3DRenderTarget||V.isWebGLArrayRenderTarget)M0=V.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(W.bindTexture(M0,k0.__webglTexture),t(M0,X0),m0(f.__webglFramebuffer,V,X0,J.COLOR_ATTACHMENT0+o,M0,0),$(X0))B(M0)}W.unbindTexture()}else{let o=J.TEXTURE_2D;if(V.isWebGL3DRenderTarget||V.isWebGLArrayRenderTarget)o=V.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(W.bindTexture(o,i.__webglTexture),t(o,I),I.mipmaps&&I.mipmaps.length>0)for(let a=0;a<I.mipmaps.length;a++)m0(f.__webglFramebuffer[a],V,I,J.COLOR_ATTACHMENT0,o,a);else m0(f.__webglFramebuffer,V,I,J.COLOR_ATTACHMENT0,o,0);if($(I))B(o);W.unbindTexture()}if(V.depthBuffer)i0(V)}function VJ(V){let I=V.textures;for(let f=0,i=I.length;f<i;f++){let W0=I[f];if($(W0)){let U0=_(V),F0=Q.get(W0).__webglTexture;W.bindTexture(U0,F0),B(U0),W.unbindTexture()}}}let DJ=[],TJ=[];function cJ(V){if(V.samples>0){if(j(V)===!1){let{textures:I,width:f,height:i}=V,W0=J.COLOR_BUFFER_BIT,U0=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,F0=Q.get(V),o=I.length>1;if(o)for(let X0=0;X0<I.length;X0++)W.bindFramebuffer(J.FRAMEBUFFER,F0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+X0,J.RENDERBUFFER,null),W.bindFramebuffer(J.FRAMEBUFFER,F0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+X0,J.TEXTURE_2D,null,0);W.bindFramebuffer(J.READ_FRAMEBUFFER,F0.__webglMultisampledFramebuffer);let a=V.texture.mipmaps;if(a&&a.length>0)W.bindFramebuffer(J.DRAW_FRAMEBUFFER,F0.__webglFramebuffer[0]);else W.bindFramebuffer(J.DRAW_FRAMEBUFFER,F0.__webglFramebuffer);for(let X0=0;X0<I.length;X0++){if(V.resolveDepthBuffer){if(V.depthBuffer)W0|=J.DEPTH_BUFFER_BIT;if(V.stencilBuffer&&V.resolveStencilBuffer)W0|=J.STENCIL_BUFFER_BIT}if(o){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,F0.__webglColorRenderbuffer[X0]);let k0=Q.get(I[X0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,k0,0)}if(J.blitFramebuffer(0,0,f,i,0,0,f,i,W0,J.NEAREST),G===!0){if(DJ.length=0,TJ.length=0,DJ.push(J.COLOR_ATTACHMENT0+X0),V.depthBuffer&&V.resolveDepthBuffer===!1)DJ.push(U0),TJ.push(U0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,TJ);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,DJ)}}if(W.bindFramebuffer(J.READ_FRAMEBUFFER,null),W.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),o)for(let X0=0;X0<I.length;X0++){W.bindFramebuffer(J.FRAMEBUFFER,F0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+X0,J.RENDERBUFFER,F0.__webglColorRenderbuffer[X0]);let k0=Q.get(I[X0]).__webglTexture;W.bindFramebuffer(J.FRAMEBUFFER,F0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+X0,J.TEXTURE_2D,k0,0)}W.bindFramebuffer(J.DRAW_FRAMEBUFFER,F0.__webglMultisampledFramebuffer)}else if(V.depthBuffer&&V.resolveDepthBuffer===!1&&G){let I=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[I])}}}function vJ(V){return Math.min(Y.maxSamples,V.samples)}function j(V){let I=Q.get(V);return V.samples>0&&Z.has("WEBGL_multisampled_render_to_texture")===!0&&I.__useRenderToTexture!==!1}function iJ(V){let I=H.render.frame;if(O.get(V)!==I)O.set(V,I),V.update()}function t0(V,I){let{colorSpace:f,format:i,type:W0}=V;if(V.isCompressedTexture===!0||V.isVideoTexture===!0)return I;if(f!==Qq&&f!==p9)if(WJ.getTransfer(f)===wJ){if(i!==h6||W0!==I6)j0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else b0("WebGLTextures: Unsupported texture color space:",f);return I}function MJ(V){if(typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement)K.width=V.naturalWidth||V.width,K.height=V.naturalHeight||V.height;else if(typeof VideoFrame<"u"&&V instanceof VideoFrame)K.width=V.displayWidth,K.height=V.displayHeight;else K.width=V.width,K.height=V.height;return K}this.allocateTextureUnit=l,this.resetTextureUnits=e,this.getTextureUnits=b,this.setTextureUnits=c,this.setTexture2D=g,this.setTexture2DArray=Y0,this.setTexture3D=O0,this.setTextureCube=_0,this.rebindTextures=p0,this.setupRenderTarget=yJ,this.updateRenderTargetMipmap=VJ,this.updateMultisampleRenderTarget=cJ,this.setupDepthRenderbuffer=i0,this.setupFrameBufferTexture=m0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return W.buffers.depth.getReversed()}}function Gk(J,Z){function W(Q,Y=p9){let X,H=WJ.getTransfer(Y);if(Q===I6)return J.UNSIGNED_BYTE;if(Q===_5)return J.UNSIGNED_SHORT_4_4_4_4;if(Q===I5)return J.UNSIGNED_SHORT_5_5_5_1;if(Q===NN)return J.UNSIGNED_INT_5_9_9_9_REV;if(Q===LN)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Q===FN)return J.BYTE;if(Q===MN)return J.SHORT;if(Q===cQ)return J.UNSIGNED_SHORT;if(Q===A5)return J.INT;if(Q===Y9)return J.UNSIGNED_INT;if(Q===F8)return J.FLOAT;if(Q===M8)return J.HALF_FLOAT;if(Q===BN)return J.ALPHA;if(Q===zN)return J.RGB;if(Q===h6)return J.RGBA;if(Q===h9)return J.DEPTH_COMPONENT;if(Q===g9)return J.DEPTH_STENCIL;if(Q===AN)return J.RED;if(Q===w5)return J.RED_INTEGER;if(Q===m9)return J.RG;if(Q===D5)return J.RG_INTEGER;if(Q===k5)return J.RGBA_INTEGER;if(Q===OH||Q===RH||Q===FH||Q===MH)if(H===wJ)if(X=Z.get("WEBGL_compressed_texture_s3tc_srgb"),X!==null){if(Q===OH)return X.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Q===RH)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Q===FH)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Q===MH)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(X=Z.get("WEBGL_compressed_texture_s3tc"),X!==null){if(Q===OH)return X.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Q===RH)return X.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Q===FH)return X.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Q===MH)return X.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Q===C5||Q===V5||Q===T5||Q===P5)if(X=Z.get("WEBGL_compressed_texture_pvrtc"),X!==null){if(Q===C5)return X.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Q===V5)return X.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Q===T5)return X.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Q===P5)return X.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Q===E5||Q===S5||Q===j5||Q===f5||Q===b5||Q===NH||Q===y5)if(X=Z.get("WEBGL_compressed_texture_etc"),X!==null){if(Q===E5||Q===S5)return H===wJ?X.COMPRESSED_SRGB8_ETC2:X.COMPRESSED_RGB8_ETC2;if(Q===j5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:X.COMPRESSED_RGBA8_ETC2_EAC;if(Q===f5)return X.COMPRESSED_R11_EAC;if(Q===b5)return X.COMPRESSED_SIGNED_R11_EAC;if(Q===NH)return X.COMPRESSED_RG11_EAC;if(Q===y5)return X.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Q===v5||Q===x5||Q===h5||Q===g5||Q===m5||Q===p5||Q===d5||Q===u5||Q===l5||Q===c5||Q===i5||Q===s5||Q===n5||Q===o5)if(X=Z.get("WEBGL_compressed_texture_astc"),X!==null){if(Q===v5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:X.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Q===x5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:X.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Q===h5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:X.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Q===g5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:X.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Q===m5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:X.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Q===p5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:X.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Q===d5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:X.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Q===u5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:X.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Q===l5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:X.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Q===c5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:X.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Q===i5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:X.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Q===s5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:X.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Q===n5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:X.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Q===o5)return H===wJ?X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:X.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Q===a5||Q===r5||Q===t5)if(X=Z.get("EXT_texture_compression_bptc"),X!==null){if(Q===a5)return H===wJ?X.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:X.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Q===r5)return X.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Q===t5)return X.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Q===e5||Q===Jq||Q===LH||Q===Zq)if(X=Z.get("EXT_texture_compression_rgtc"),X!==null){if(Q===e5)return X.COMPRESSED_RED_RGTC1_EXT;if(Q===Jq)return X.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Q===LH)return X.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Q===Zq)return X.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Q===BW)return J.UNSIGNED_INT_24_8;return J[Q]!==void 0?J[Q]:null}return{convert:W}}var Kk=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qk=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class NL{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Z){if(this.texture===null){let W=new PH(J.texture);if(J.depthNear!==Z.depthNear||J.depthFar!==Z.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=W}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Z=J.cameras[0].viewport,W=new I7({vertexShader:Kk,fragmentShader:qk,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Z.z},depthHeight:{value:Z.w}}});this.mesh=new w6(new tQ(20,20),W)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class LL extends N8{constructor(J,Z){super();let W=this,Q=null,Y=1,X=null,H="local-floor",U=1,G=null,K=null,O=null,F=null,q=null,R=null,L=typeof XRWebGLBinding<"u",w=new NL,N={},$=Z.getContextAttributes(),B=null,_=null,z=[],P=[],D=new XJ,T=null,A=new _7;A.viewport=new bJ;let C=new _7;C.viewport=new bJ;let x=[A,C],E=new Eq,u=null,e=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(t){let q0=z[t];if(q0===void 0)q0=new nQ,z[t]=q0;return q0.getTargetRaySpace()},this.getControllerGrip=function(t){let q0=z[t];if(q0===void 0)q0=new nQ,z[t]=q0;return q0.getGripSpace()},this.getHand=function(t){let q0=z[t];if(q0===void 0)q0=new nQ,z[t]=q0;return q0.getHandSpace()};function b(t){let q0=P.indexOf(t.inputSource);if(q0===-1)return;let A0=z[q0];if(A0!==void 0)A0.update(t.inputSource,t.frame,G||X),A0.dispatchEvent({type:t.type,data:t.inputSource})}function c(){Q.removeEventListener("select",b),Q.removeEventListener("selectstart",b),Q.removeEventListener("selectend",b),Q.removeEventListener("squeeze",b),Q.removeEventListener("squeezestart",b),Q.removeEventListener("squeezeend",b),Q.removeEventListener("end",c),Q.removeEventListener("inputsourceschange",l);for(let t=0;t<z.length;t++){let q0=P[t];if(q0===null)continue;P[t]=null,z[t].disconnect(q0)}u=null,e=null,w.reset();for(let t in N)delete N[t];J.setRenderTarget(B),q=null,F=null,O=null,Q=null,_=null,HJ.stop(),W.isPresenting=!1,J.setPixelRatio(T),J.setSize(D.width,D.height,!1),W.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(t){if(Y=t,W.isPresenting===!0)j0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(t){if(H=t,W.isPresenting===!0)j0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return G||X},this.setReferenceSpace=function(t){G=t},this.getBaseLayer=function(){return F!==null?F:q},this.getBinding=function(){if(O===null&&L)O=new XRWebGLBinding(Q,Z);return O},this.getFrame=function(){return R},this.getSession=function(){return Q},this.setSession=async function(t){if(Q=t,Q!==null){if(B=J.getRenderTarget(),Q.addEventListener("select",b),Q.addEventListener("selectstart",b),Q.addEventListener("selectend",b),Q.addEventListener("squeeze",b),Q.addEventListener("squeezestart",b),Q.addEventListener("squeezeend",b),Q.addEventListener("end",c),Q.addEventListener("inputsourceschange",l),$.xrCompatible!==!0)await Z.makeXRCompatible();if(T=J.getPixelRatio(),J.getSize(D),!(L&&("createProjectionLayer"in XRWebGLBinding.prototype))){let A0={antialias:$.antialias,alpha:!0,depth:$.depth,stencil:$.stencil,framebufferScaleFactor:Y};q=new XRWebGLLayer(Q,Z,A0),Q.updateRenderState({baseLayer:q}),J.setPixelRatio(1),J.setSize(q.framebufferWidth,q.framebufferHeight,!1),_=new $6(q.framebufferWidth,q.framebufferHeight,{format:h6,type:I6,colorSpace:J.outputColorSpace,stencilBuffer:$.stencil,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1})}else{let A0=null,L0=null,V0=null;if($.depth)V0=$.stencil?Z.DEPTH24_STENCIL8:Z.DEPTH_COMPONENT24,A0=$.stencil?g9:h9,L0=$.stencil?BW:Y9;let r0={colorFormat:Z.RGBA8,depthFormat:V0,scaleFactor:Y};O=this.getBinding(),F=O.createProjectionLayer(r0),Q.updateRenderState({layers:[F]}),J.setPixelRatio(1),J.setSize(F.textureWidth,F.textureHeight,!1),_=new $6(F.textureWidth,F.textureHeight,{format:h6,type:I6,depthTexture:new H9(F.textureWidth,F.textureHeight,L0,void 0,void 0,void 0,void 0,void 0,void 0,A0),stencilBuffer:$.stencil,colorSpace:J.outputColorSpace,samples:$.antialias?4:0,resolveDepthBuffer:F.ignoreDepthValues===!1,resolveStencilBuffer:F.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(U),G=null,X=await Q.requestReferenceSpace(H),HJ.setContext(Q),HJ.start(),W.isPresenting=!0,W.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Q!==null)return Q.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function l(t){for(let q0=0;q0<t.removed.length;q0++){let A0=t.removed[q0],L0=P.indexOf(A0);if(L0>=0)P[L0]=null,z[L0].disconnect(A0)}for(let q0=0;q0<t.added.length;q0++){let A0=t.added[q0],L0=P.indexOf(A0);if(L0===-1){for(let r0=0;r0<z.length;r0++)if(r0>=P.length){P.push(A0),L0=r0;break}else if(P[r0]===null){P[r0]=A0,L0=r0;break}if(L0===-1)break}let V0=z[L0];if(V0)V0.connect(A0)}}let h=new v,g=new v;function Y0(t,q0,A0){h.setFromMatrixPosition(q0.matrixWorld),g.setFromMatrixPosition(A0.matrixWorld);let L0=h.distanceTo(g),V0=q0.projectionMatrix.elements,r0=A0.projectionMatrix.elements,m0=V0[14]/(V0[10]-1),u0=V0[14]/(V0[10]+1),$J=(V0[9]+1)/V0[5],i0=(V0[9]-1)/V0[5],p0=(V0[8]-1)/V0[0],yJ=(r0[8]+1)/r0[0],VJ=m0*p0,DJ=m0*yJ,TJ=L0/(-p0+yJ),cJ=TJ*-p0;if(q0.matrixWorld.decompose(t.position,t.quaternion,t.scale),t.translateX(cJ),t.translateZ(TJ),t.matrixWorld.compose(t.position,t.quaternion,t.scale),t.matrixWorldInverse.copy(t.matrixWorld).invert(),V0[10]===-1)t.projectionMatrix.copy(q0.projectionMatrix),t.projectionMatrixInverse.copy(q0.projectionMatrixInverse);else{let vJ=m0+TJ,j=u0+TJ,iJ=VJ-cJ,t0=DJ+(L0-cJ),MJ=$J*u0/j*vJ,V=i0*u0/j*vJ;t.projectionMatrix.makePerspective(iJ,t0,MJ,V,vJ,j),t.projectionMatrixInverse.copy(t.projectionMatrix).invert()}}function O0(t,q0){if(q0===null)t.matrixWorld.copy(t.matrix);else t.matrixWorld.multiplyMatrices(q0.matrixWorld,t.matrix);t.matrixWorldInverse.copy(t.matrixWorld).invert()}this.updateCamera=function(t){if(Q===null)return;let{near:q0,far:A0}=t;if(w.texture!==null){if(w.depthNear>0)q0=w.depthNear;if(w.depthFar>0)A0=w.depthFar}if(E.near=C.near=A.near=q0,E.far=C.far=A.far=A0,u!==E.near||e!==E.far)Q.updateRenderState({depthNear:E.near,depthFar:E.far}),u=E.near,e=E.far;E.layers.mask=t.layers.mask|6,A.layers.mask=E.layers.mask&-5,C.layers.mask=E.layers.mask&-3;let L0=t.parent,V0=E.cameras;O0(E,L0);for(let r0=0;r0<V0.length;r0++)O0(V0[r0],L0);if(V0.length===2)Y0(E,A,C);else E.projectionMatrix.copy(A.projectionMatrix);_0(t,E,L0)};function _0(t,q0,A0){if(A0===null)t.matrix.copy(q0.matrixWorld);else t.matrix.copy(A0.matrixWorld),t.matrix.invert(),t.matrix.multiply(q0.matrixWorld);if(t.matrix.decompose(t.position,t.quaternion,t.scale),t.updateMatrixWorld(!0),t.projectionMatrix.copy(q0.projectionMatrix),t.projectionMatrixInverse.copy(q0.projectionMatrixInverse),t.isPerspectiveCamera)t.fov=XH*2*Math.atan(1/t.projectionMatrix.elements[5]),t.zoom=1}this.getCamera=function(){return E},this.getFoveation=function(){if(F===null&&q===null)return;return U},this.setFoveation=function(t){if(U=t,F!==null)F.fixedFoveation=t;if(q!==null&&q.fixedFoveation!==void 0)q.fixedFoveation=t},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(E)},this.getCameraTexture=function(t){return N[t]};let I0=null;function zJ(t,q0){if(K=q0.getViewerPose(G||X),R=q0,K!==null){let A0=K.views;if(q!==null)J.setRenderTargetFramebuffer(_,q.framebuffer),J.setRenderTarget(_);let L0=!1;if(A0.length!==E.cameras.length)E.cameras.length=0,L0=!0;for(let u0=0;u0<A0.length;u0++){let $J=A0[u0],i0=null;if(q!==null)i0=q.getViewport($J);else{let yJ=O.getViewSubImage(F,$J);if(i0=yJ.viewport,u0===0)J.setRenderTargetTextures(_,yJ.colorTexture,yJ.depthStencilTexture),J.setRenderTarget(_)}let p0=x[u0];if(p0===void 0)p0=new _7,p0.layers.enable(u0),p0.viewport=new bJ,x[u0]=p0;if(p0.matrix.fromArray($J.transform.matrix),p0.matrix.decompose(p0.position,p0.quaternion,p0.scale),p0.projectionMatrix.fromArray($J.projectionMatrix),p0.projectionMatrixInverse.copy(p0.projectionMatrix).invert(),p0.viewport.set(i0.x,i0.y,i0.width,i0.height),u0===0)E.matrix.copy(p0.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale);if(L0===!0)E.cameras.push(p0)}let V0=Q.enabledFeatures;if(V0&&V0.includes("depth-sensing")&&Q.depthUsage=="gpu-optimized"&&L){O=W.getBinding();let u0=O.getDepthInformation(A0[0]);if(u0&&u0.isValid&&u0.texture)w.init(u0,Q.renderState)}if(V0&&V0.includes("camera-access")&&L){J.state.unbindTexture(),O=W.getBinding();for(let u0=0;u0<A0.length;u0++){let $J=A0[u0].camera;if($J){let i0=N[$J];if(!i0)i0=new PH,N[$J]=i0;let p0=O.getCameraImage($J);i0.sourceTexture=p0}}}}for(let A0=0;A0<z.length;A0++){let L0=P[A0],V0=z[A0];if(L0!==null&&V0!==void 0)V0.update(L0,q0,G||X)}if(I0)I0(t,q0);if(q0.detectedPlanes)W.dispatchEvent({type:"planesdetected",data:q0});R=null}let HJ=new XL;HJ.setAnimationLoop(zJ),this.setAnimationLoop=function(t){I0=t},this.dispose=function(){}}}var $k=new jJ,BL=new v0;BL.set(-1,0,0,0,1,0,0,0,1);function Ok(J,Z){function W(N,$){if(N.matrixAutoUpdate===!0)N.updateMatrix();$.value.copy(N.matrix)}function Q(N,$){if($.color.getRGB(N.fogColor.value,Mq(J)),$.isFog)N.fogNear.value=$.near,N.fogFar.value=$.far;else if($.isFogExp2)N.fogDensity.value=$.density}function Y(N,$,B,_,z){if($.isNodeMaterial)$.uniformsNeedUpdate=!1;else if($.isMeshBasicMaterial)X(N,$);else if($.isMeshLambertMaterial){if(X(N,$),$.envMap)N.envMapIntensity.value=$.envMapIntensity}else if($.isMeshToonMaterial)X(N,$),F(N,$);else if($.isMeshPhongMaterial){if(X(N,$),O(N,$),$.envMap)N.envMapIntensity.value=$.envMapIntensity}else if($.isMeshStandardMaterial){if(X(N,$),q(N,$),$.isMeshPhysicalMaterial)R(N,$,z)}else if($.isMeshMatcapMaterial)X(N,$),L(N,$);else if($.isMeshDepthMaterial)X(N,$);else if($.isMeshDistanceMaterial)X(N,$),w(N,$);else if($.isMeshNormalMaterial)X(N,$);else if($.isLineBasicMaterial){if(H(N,$),$.isLineDashedMaterial)U(N,$)}else if($.isPointsMaterial)G(N,$,B,_);else if($.isSpriteMaterial)K(N,$);else if($.isShadowMaterial)N.color.value.copy($.color),N.opacity.value=$.opacity;else if($.isShaderMaterial)$.uniformsNeedUpdate=!1}function X(N,$){if(N.opacity.value=$.opacity,$.color)N.diffuse.value.copy($.color);if($.emissive)N.emissive.value.copy($.emissive).multiplyScalar($.emissiveIntensity);if($.map)N.map.value=$.map,W($.map,N.mapTransform);if($.alphaMap)N.alphaMap.value=$.alphaMap,W($.alphaMap,N.alphaMapTransform);if($.bumpMap){if(N.bumpMap.value=$.bumpMap,W($.bumpMap,N.bumpMapTransform),N.bumpScale.value=$.bumpScale,$.side===S7)N.bumpScale.value*=-1}if($.normalMap){if(N.normalMap.value=$.normalMap,W($.normalMap,N.normalMapTransform),N.normalScale.value.copy($.normalScale),$.side===S7)N.normalScale.value.negate()}if($.displacementMap)N.displacementMap.value=$.displacementMap,W($.displacementMap,N.displacementMapTransform),N.displacementScale.value=$.displacementScale,N.displacementBias.value=$.displacementBias;if($.emissiveMap)N.emissiveMap.value=$.emissiveMap,W($.emissiveMap,N.emissiveMapTransform);if($.specularMap)N.specularMap.value=$.specularMap,W($.specularMap,N.specularMapTransform);if($.alphaTest>0)N.alphaTest.value=$.alphaTest;let B=Z.get($),_=B.envMap,z=B.envMapRotation;if(_){if(N.envMap.value=_,N.envMapRotation.value.setFromMatrix4($k.makeRotationFromEuler(z)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1)N.envMapRotation.value.premultiply(BL);N.reflectivity.value=$.reflectivity,N.ior.value=$.ior,N.refractionRatio.value=$.refractionRatio}if($.lightMap)N.lightMap.value=$.lightMap,N.lightMapIntensity.value=$.lightMapIntensity,W($.lightMap,N.lightMapTransform);if($.aoMap)N.aoMap.value=$.aoMap,N.aoMapIntensity.value=$.aoMapIntensity,W($.aoMap,N.aoMapTransform)}function H(N,$){if(N.diffuse.value.copy($.color),N.opacity.value=$.opacity,$.map)N.map.value=$.map,W($.map,N.mapTransform)}function U(N,$){N.dashSize.value=$.dashSize,N.totalSize.value=$.dashSize+$.gapSize,N.scale.value=$.scale}function G(N,$,B,_){if(N.diffuse.value.copy($.color),N.opacity.value=$.opacity,N.size.value=$.size*B,N.scale.value=_*0.5,$.map)N.map.value=$.map,W($.map,N.uvTransform);if($.alphaMap)N.alphaMap.value=$.alphaMap,W($.alphaMap,N.alphaMapTransform);if($.alphaTest>0)N.alphaTest.value=$.alphaTest}function K(N,$){if(N.diffuse.value.copy($.color),N.opacity.value=$.opacity,N.rotation.value=$.rotation,$.map)N.map.value=$.map,W($.map,N.mapTransform);if($.alphaMap)N.alphaMap.value=$.alphaMap,W($.alphaMap,N.alphaMapTransform);if($.alphaTest>0)N.alphaTest.value=$.alphaTest}function O(N,$){N.specular.value.copy($.specular),N.shininess.value=Math.max($.shininess,0.0001)}function F(N,$){if($.gradientMap)N.gradientMap.value=$.gradientMap}function q(N,$){if(N.metalness.value=$.metalness,$.metalnessMap)N.metalnessMap.value=$.metalnessMap,W($.metalnessMap,N.metalnessMapTransform);if(N.roughness.value=$.roughness,$.roughnessMap)N.roughnessMap.value=$.roughnessMap,W($.roughnessMap,N.roughnessMapTransform);if($.envMap)N.envMapIntensity.value=$.envMapIntensity}function R(N,$,B){if(N.ior.value=$.ior,$.sheen>0){if(N.sheenColor.value.copy($.sheenColor).multiplyScalar($.sheen),N.sheenRoughness.value=$.sheenRoughness,$.sheenColorMap)N.sheenColorMap.value=$.sheenColorMap,W($.sheenColorMap,N.sheenColorMapTransform);if($.sheenRoughnessMap)N.sheenRoughnessMap.value=$.sheenRoughnessMap,W($.sheenRoughnessMap,N.sheenRoughnessMapTransform)}if($.clearcoat>0){if(N.clearcoat.value=$.clearcoat,N.clearcoatRoughness.value=$.clearcoatRoughness,$.clearcoatMap)N.clearcoatMap.value=$.clearcoatMap,W($.clearcoatMap,N.clearcoatMapTransform);if($.clearcoatRoughnessMap)N.clearcoatRoughnessMap.value=$.clearcoatRoughnessMap,W($.clearcoatRoughnessMap,N.clearcoatRoughnessMapTransform);if($.clearcoatNormalMap){if(N.clearcoatNormalMap.value=$.clearcoatNormalMap,W($.clearcoatNormalMap,N.clearcoatNormalMapTransform),N.clearcoatNormalScale.value.copy($.clearcoatNormalScale),$.side===S7)N.clearcoatNormalScale.value.negate()}}if($.dispersion>0)N.dispersion.value=$.dispersion;if($.iridescence>0){if(N.iridescence.value=$.iridescence,N.iridescenceIOR.value=$.iridescenceIOR,N.iridescenceThicknessMinimum.value=$.iridescenceThicknessRange[0],N.iridescenceThicknessMaximum.value=$.iridescenceThicknessRange[1],$.iridescenceMap)N.iridescenceMap.value=$.iridescenceMap,W($.iridescenceMap,N.iridescenceMapTransform);if($.iridescenceThicknessMap)N.iridescenceThicknessMap.value=$.iridescenceThicknessMap,W($.iridescenceThicknessMap,N.iridescenceThicknessMapTransform)}if($.transmission>0){if(N.transmission.value=$.transmission,N.transmissionSamplerMap.value=B.texture,N.transmissionSamplerSize.value.set(B.width,B.height),$.transmissionMap)N.transmissionMap.value=$.transmissionMap,W($.transmissionMap,N.transmissionMapTransform);if(N.thickness.value=$.thickness,$.thicknessMap)N.thicknessMap.value=$.thicknessMap,W($.thicknessMap,N.thicknessMapTransform);N.attenuationDistance.value=$.attenuationDistance,N.attenuationColor.value.copy($.attenuationColor)}if($.anisotropy>0){if(N.anisotropyVector.value.set($.anisotropy*Math.cos($.anisotropyRotation),$.anisotropy*Math.sin($.anisotropyRotation)),$.anisotropyMap)N.anisotropyMap.value=$.anisotropyMap,W($.anisotropyMap,N.anisotropyMapTransform)}if(N.specularIntensity.value=$.specularIntensity,N.specularColor.value.copy($.specularColor),$.specularColorMap)N.specularColorMap.value=$.specularColorMap,W($.specularColorMap,N.specularColorMapTransform);if($.specularIntensityMap)N.specularIntensityMap.value=$.specularIntensityMap,W($.specularIntensityMap,N.specularIntensityMapTransform)}function L(N,$){if($.matcap)N.matcap.value=$.matcap}function w(N,$){let B=Z.get($).light;N.referencePosition.value.setFromMatrixPosition(B.matrixWorld),N.nearDistance.value=B.shadow.camera.near,N.farDistance.value=B.shadow.camera.far}return{refreshFogUniforms:Q,refreshMaterialUniforms:Y}}function Rk(J,Z,W,Q){let Y={},X={},H=[],U=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function G(z,P){let D=P.program;Q.uniformBlockBinding(z,D)}function K(z,P){let D=Y[z.id];if(D===void 0)N(z),D=O(z),Y[z.id]=D,z.addEventListener("dispose",B);let T=P.program;Q.updateUBOMapping(z,T);let A=Z.render.frame;if(X[z.id]!==A)q(z),X[z.id]=A}function O(z){let P=F();z.__bindingPointIndex=P;let D=J.createBuffer(),T=z.__size,A=z.usage;return J.bindBuffer(J.UNIFORM_BUFFER,D),J.bufferData(J.UNIFORM_BUFFER,T,A),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,P,D),D}function F(){for(let z=0;z<U;z++)if(H.indexOf(z)===-1)return H.push(z),z;return b0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function q(z){let P=Y[z.id],D=z.uniforms,T=z.__cache;J.bindBuffer(J.UNIFORM_BUFFER,P);for(let A=0,C=D.length;A<C;A++){let x=D[A];if(Array.isArray(x))for(let E=0,u=x.length;E<u;E++)R(x[E],A,E,T);else R(x,A,0,T)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function R(z,P,D,T){if(w(z,P,D,T)===!0){let{__offset:A,value:C}=z;if(Array.isArray(C)){let x=0;for(let E=0;E<C.length;E++){let u=C[E],e=$(u);if(L(u,z.__data,x),typeof u!=="number"&&typeof u!=="boolean"&&!u.isMatrix3&&!ArrayBuffer.isView(u))x+=e.storage/Float32Array.BYTES_PER_ELEMENT}}else L(C,z.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,A,z.__data)}}function L(z,P,D){if(typeof z==="number"||typeof z==="boolean")P[0]=z;else if(z.isMatrix3)P[0]=z.elements[0],P[1]=z.elements[1],P[2]=z.elements[2],P[3]=0,P[4]=z.elements[3],P[5]=z.elements[4],P[6]=z.elements[5],P[7]=0,P[8]=z.elements[6],P[9]=z.elements[7],P[10]=z.elements[8],P[11]=0;else if(ArrayBuffer.isView(z))P.set(new z.constructor(z.buffer,z.byteOffset,P.length));else z.toArray(P,D)}function w(z,P,D,T){let A=z.value,C=P+"_"+D;if(T[C]===void 0){if(typeof A==="number"||typeof A==="boolean")T[C]=A;else if(ArrayBuffer.isView(A))T[C]=A.slice();else T[C]=A.clone();return!0}else{let x=T[C];if(typeof A==="number"||typeof A==="boolean"){if(x!==A)return T[C]=A,!0}else if(ArrayBuffer.isView(A))return!0;else if(x.equals(A)===!1)return x.copy(A),!0}return!1}function N(z){let P=z.uniforms,D=0,T=16;for(let C=0,x=P.length;C<x;C++){let E=Array.isArray(P[C])?P[C]:[P[C]];for(let u=0,e=E.length;u<e;u++){let b=E[u],c=Array.isArray(b.value)?b.value:[b.value];for(let l=0,h=c.length;l<h;l++){let g=c[l],Y0=$(g),O0=D%T,_0=O0%Y0.boundary,I0=O0+_0;if(D+=_0,I0!==0&&T-I0<Y0.storage)D+=T-I0;b.__data=new Float32Array(Y0.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=D,D+=Y0.storage}}}let A=D%T;if(A>0)D+=T-A;return z.__size=D,z.__cache={},this}function $(z){let P={boundary:0,storage:0};if(typeof z==="number"||typeof z==="boolean")P.boundary=4,P.storage=4;else if(z.isVector2)P.boundary=8,P.storage=8;else if(z.isVector3||z.isColor)P.boundary=16,P.storage=12;else if(z.isVector4)P.boundary=16,P.storage=16;else if(z.isMatrix3)P.boundary=48,P.storage=48;else if(z.isMatrix4)P.boundary=64,P.storage=64;else if(z.isTexture)j0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(z))P.boundary=16,P.storage=z.byteLength;else j0("WebGLRenderer: Unsupported uniform value type.",z);return P}function B(z){let P=z.target;P.removeEventListener("dispose",B);let D=H.indexOf(P.__bindingPointIndex);H.splice(D,1),J.deleteBuffer(Y[P.id]),delete Y[P.id],delete X[P.id]}function _(){for(let z in Y)J.deleteBuffer(Y[z]);H=[],Y={},X={}}return{bind:G,update:K,dispose:_}}var Fk=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),g6=null;function Mk(){if(g6===null)g6=new $q(Fk,16,16,m9,M8),g6.name="DFG_LUT",g6.minFilter=j7,g6.magFilter=j7,g6.wrapS=qH,g6.wrapT=qH,g6.generateMipmaps=!1,g6.needsUpdate=!0;return g6}class cq{constructor(J={}){let{canvas:Z=PN(),context:W=null,depth:Q=!0,stencil:Y=!1,alpha:X=!1,antialias:H=!1,premultipliedAlpha:U=!0,preserveDrawingBuffer:G=!1,powerPreference:K="default",failIfMajorPerformanceCaveat:O=!1,reversedDepthBuffer:F=!1,outputBufferType:q=I6}=J;this.isWebGLRenderer=!0;let R;if(W!==null){if(typeof WebGLRenderingContext<"u"&&W instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");R=W.getContextAttributes().alpha}else R=X;let L=q,w=new Set([k5,D5,w5]),N=new Set([I6,Y9,cQ,BW,_5,I5]),$=new Uint32Array(4),B=new Int32Array(4),_=new v,z=null,P=null,D=[],T=[],A=null;this.domElement=Z,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_6,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,x=!1,E=null,u=null,e=null,b=null;this._outputColorSpace=IN;let c=0,l=0,h=null,g=-1,Y0=null,O0=new bJ,_0=new bJ,I0=null,zJ=new a0(0),HJ=0,t=Z.width,q0=Z.height,A0=1,L0=null,V0=null,r0=new bJ(0,0,t,q0),m0=new bJ(0,0,t,q0),u0=!1,$J=new CH,i0=!1,p0=!1,yJ=new jJ,VJ=new v,DJ=new bJ,TJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},cJ=!1;function vJ(){return h===null?A0:1}let j=W;function iJ(k,y){return Z.getContext(k,y)}try{let k={alpha:!0,depth:Q,stencil:Y,antialias:H,premultipliedAlpha:U,preserveDrawingBuffer:G,powerPreference:K,failIfMajorPerformanceCaveat:O};if("setAttribute"in Z)Z.setAttribute("data-engine",`three.js r${SM}`);if(Z.addEventListener("webglcontextlost",f0,!1),Z.addEventListener("webglcontextrestored",e0,!1),Z.addEventListener("webglcontextcreationerror",GJ,!1),j===null){if(j=iJ("webgl2",k),j===null)if(iJ("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(k){throw b0("WebGLRenderer: "+k.message),k}let t0,MJ,V,I,f,i,W0,U0,F0,o,a,X0,k0,M0,H0,E0,S0,R0,S,Q0,m,Z0,K0;function r(){if(t0=new ID(j),t0.init(),m=new Gk(j,t0),MJ=new FD(j,t0,J,m),V=new Hk(j,t0),MJ.reversedDepthBuffer&&F)V.buffers.depth.setReversed(!0);u=j.createFramebuffer(),e=j.createFramebuffer(),b=j.createFramebuffer(),I=new kD(j),f=new i4,i=new Uk(j,t0,V,f,MJ,m,I),W0=new _D(C),U0=new P_(j),Z0=new OD(j,U0),F0=new wD(j,U0,I,Z0),o=new VD(j,F0,U0,Z0,I),R0=new CD(j,MJ,i),H0=new MD(f),a=new c4(C,W0,t0,MJ,Z0,H0),X0=new Ok(C,f),k0=new n4,M0=new Jk(t0),S0=new $D(C,W0,V,o,R,U),E0=new Xk(C,o,MJ),K0=new Rk(j,I,MJ,V),S=new RD(j,t0,I),Q0=new DD(j,t0,I),I.programs=a.programs,C.capabilities=MJ,C.extensions=t0,C.properties=f,C.renderLists=k0,C.shadowMap=E0,C.state=V,C.info=I}if(r(),L!==I6)A=new PD(L,Z.width,Z.height,H,Q,Y);let $0=new LL(C,j);this.xr=$0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let k=t0.get("WEBGL_lose_context");if(k)k.loseContext()},this.forceContextRestore=function(){let k=t0.get("WEBGL_lose_context");if(k)k.restoreContext()},this.getPixelRatio=function(){return A0},this.setPixelRatio=function(k){if(k===void 0)return;A0=k,this.setSize(t,q0,!1)},this.getSize=function(k){return k.set(t,q0)},this.setSize=function(k,y,s=!0){if($0.isPresenting){j0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(t=k,q0=y,Z.width=Math.floor(k*A0),Z.height=Math.floor(y*A0),s===!0)Z.style.width=k+"px",Z.style.height=y+"px";if(A!==null)A.setSize(Z.width,Z.height);this.setViewport(0,0,k,y)},this.getDrawingBufferSize=function(k){return k.set(t*A0,q0*A0).floor()},this.setDrawingBufferSize=function(k,y,s){t=k,q0=y,A0=s,Z.width=Math.floor(k*s),Z.height=Math.floor(y*s),this.setViewport(0,0,k,y)},this.setEffects=function(k){if(L===I6){b0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(k){for(let y=0;y<k.length;y++)if(k[y].isOutputPass===!0){j0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(k||[])},this.getCurrentViewport=function(k){return k.copy(O0)},this.getViewport=function(k){return k.copy(r0)},this.setViewport=function(k,y,s,p){if(k.isVector4)r0.set(k.x,k.y,k.z,k.w);else r0.set(k,y,s,p);V.viewport(O0.copy(r0).multiplyScalar(A0).round())},this.getScissor=function(k){return k.copy(m0)},this.setScissor=function(k,y,s,p){if(k.isVector4)m0.set(k.x,k.y,k.z,k.w);else m0.set(k,y,s,p);V.scissor(_0.copy(m0).multiplyScalar(A0).round())},this.getScissorTest=function(){return u0},this.setScissorTest=function(k){V.setScissorTest(u0=k)},this.setOpaqueSort=function(k){L0=k},this.setTransparentSort=function(k){V0=k},this.getClearColor=function(k){return k.copy(S0.getClearColor())},this.setClearColor=function(){S0.setClearColor(...arguments)},this.getClearAlpha=function(){return S0.getClearAlpha()},this.setClearAlpha=function(){S0.setClearAlpha(...arguments)},this.clear=function(k=!0,y=!0,s=!0){let p=0;if(k){let d=!1;if(h!==null){let z0=h.texture.format;d=w.has(z0)}if(d){let z0=h.texture.type,D0=N.has(z0),B0=S0.getClearColor(),C0=S0.getClearAlpha(),T0=B0.r,x0=B0.g,l0=B0.b;if(D0)$[0]=T0,$[1]=x0,$[2]=l0,$[3]=C0,j.clearBufferuiv(j.COLOR,0,$);else B[0]=T0,B[1]=x0,B[2]=l0,B[3]=C0,j.clearBufferiv(j.COLOR,0,B)}else p|=j.COLOR_BUFFER_BIT}if(y)p|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(s)p|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(p!==0)j.clear(p)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(k){k.setRenderer(this),E=k},this.dispose=function(){Z.removeEventListener("webglcontextlost",f0,!1),Z.removeEventListener("webglcontextrestored",e0,!1),Z.removeEventListener("webglcontextcreationerror",GJ,!1),S0.dispose(),k0.dispose(),M0.dispose(),f.dispose(),W0.dispose(),o.dispose(),Z0.dispose(),K0.dispose(),a.dispose(),$0.dispose(),$0.removeEventListener("sessionstart",QY),$0.removeEventListener("sessionend",t9),o7.stop()};function f0(k){k.preventDefault(),Uq("WebGLRenderer: Context Lost."),x=!0}function e0(){Uq("WebGLRenderer: Context Restored."),x=!1;let k=I.autoReset,y=E0.enabled,s=E0.autoUpdate,p=E0.needsUpdate,d=E0.type;r(),I.autoReset=k,E0.enabled=y,E0.autoUpdate=s,E0.needsUpdate=p,E0.type=d}function GJ(k){b0("WebGLRenderer: A WebGL context could not be created. Reason: ",k.statusMessage)}function Z7(k){let y=k.target;y.removeEventListener("dispose",Z7),f7(y)}function f7(k){DW(k),f.remove(k)}function DW(k){let y=f.get(k).programs;if(y!==void 0){if(y.forEach(function(s){a.releaseProgram(s)}),k.isShaderMaterial)a.releaseShaderCache(k)}}this.renderBufferDirect=function(k,y,s,p,d,z0){if(y===null)y=TJ;let D0=d.isMesh&&d.matrixWorld.determinantAffine()<0,B0=cL(k,y,s,p,d);V.setMaterial(p,D0);let C0=s.index,T0=1;if(p.wireframe===!0){if(C0=F0.getWireframeAttribute(s),C0===void 0)return;T0=2}let x0=s.drawRange,l0=s.attributes.position,P0=x0.start*T0,NJ=(x0.start+x0.count)*T0;if(z0!==null)P0=Math.max(P0,z0.start*T0),NJ=Math.min(NJ,(z0.start+z0.count)*T0);if(C0!==null)P0=Math.max(P0,0),NJ=Math.min(NJ,C0.count);else if(l0!==void 0&&l0!==null)P0=Math.max(P0,0),NJ=Math.min(NJ,l0.count);let pJ=NJ-P0;if(pJ<0||pJ===1/0)return;Z0.setup(d,p,B0,s,C0);let xJ,AJ=S;if(C0!==null)xJ=U0.get(C0),AJ=Q0,AJ.setIndex(xJ);if(d.isMesh)if(p.wireframe===!0)V.setLineWidth(p.wireframeLinewidth*vJ()),AJ.setMode(j.LINES);else AJ.setMode(j.TRIANGLES);else if(d.isLine){let R7=p.linewidth;if(R7===void 0)R7=1;if(V.setLineWidth(R7*vJ()),d.isLineSegments)AJ.setMode(j.LINES);else if(d.isLineLoop)AJ.setMode(j.LINE_LOOP);else AJ.setMode(j.LINE_STRIP)}else if(d.isPoints)AJ.setMode(j.POINTS);else if(d.isSprite)AJ.setMode(j.TRIANGLES);if(d.isBatchedMesh)if(!t0.get("WEBGL_multi_draw")){let{_multiDrawStarts:R7,_multiDrawCounts:w0,_multiDrawCount:b7}=d,UJ=C0?U0.get(C0).bytesPerElement:1,a7=f.get(p).currentProgram.getUniforms();for(let k6=0;k6<b7;k6++)a7.setValue(j,"_gl_DrawID",k6),AJ.render(R7[k6]/UJ,w0[k6])}else AJ.renderMultiDraw(d._multiDrawStarts,d._multiDrawCounts,d._multiDrawCount);else if(d.isInstancedMesh)AJ.renderInstances(P0,pJ,d.count);else if(s.isInstancedBufferGeometry){let R7=s._maxInstanceCount!==void 0?s._maxInstanceCount:1/0,w0=Math.min(s.instanceCount,R7);AJ.renderInstances(P0,pJ,w0)}else AJ.render(P0,pJ)};function a9(k,y,s){if(k.transparent===!0&&k.side===v6&&k.forceSinglePass===!1)k.side=S7,k.needsUpdate=!0,ZZ(k,y,s),k.side=MW,k.needsUpdate=!0,ZZ(k,y,s),k.side=v6;else ZZ(k,y,s)}this.compile=function(k,y,s=null){if(s===null)s=k;if(P=M0.get(s),P.init(y),T.push(P),s.traverseVisible(function(d){if(d.isLight&&d.layers.test(y.layers)){if(P.pushLight(d),d.castShadow)P.pushShadow(d)}}),k!==s)k.traverseVisible(function(d){if(d.isLight&&d.layers.test(y.layers)){if(P.pushLight(d),d.castShadow)P.pushShadow(d)}});P.setupLights();let p=new Set;return k.traverse(function(d){if(!(d.isMesh||d.isPoints||d.isLine||d.isSprite))return;let z0=d.material;if(z0)if(Array.isArray(z0))for(let D0=0;D0<z0.length;D0++){let B0=z0[D0];a9(B0,s,d),p.add(B0)}else a9(z0,s,d),p.add(z0)}),P=T.pop(),p},this.compileAsync=function(k,y,s=null){let p=this.compile(k,y,s);return new Promise((d)=>{function z0(){if(p.forEach(function(D0){if(f.get(D0).currentProgram.isReady())p.delete(D0)}),p.size===0){d(k);return}setTimeout(z0,10)}if(t0.get("KHR_parallel_shader_compile")!==null)z0();else setTimeout(z0,10)})};let r9=null;function mH(k){if(r9)r9(k)}function QY(){o7.stop()}function t9(){o7.start()}let o7=new XL;if(o7.setAnimationLoop(mH),typeof self<"u")o7.setContext(self);this.setAnimationLoop=function(k){r9=k,$0.setAnimationLoop(k),k===null?o7.stop():o7.start()},$0.addEventListener("sessionstart",QY),$0.addEventListener("sessionend",t9),this.render=function(k,y){if(y!==void 0&&y.isCamera!==!0){b0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;if(E!==null)E.renderStart(k,y);let s=$0.enabled===!0&&$0.isPresenting===!0,p=A!==null&&(h===null||s)&&A.begin(C,h);if(k.matrixWorldAutoUpdate===!0)k.updateMatrixWorld();if(y.parent===null&&y.matrixWorldAutoUpdate===!0)y.updateMatrixWorld();if($0.enabled===!0&&$0.isPresenting===!0&&(A===null||A.isCompositing()===!1)){if($0.cameraAutoUpdate===!0)$0.updateCamera(y);y=$0.getCamera()}if(k.isScene===!0)k.onBeforeRender(C,k,y,h);if(P=M0.get(k,T.length),P.init(y),P.state.textureUnits=i.getTextureUnits(),T.push(P),yJ.multiplyMatrices(y.projectionMatrix,y.matrixWorldInverse),$J.setFromProjectionMatrix(yJ,Hq,y.reversedDepth),p0=this.localClippingEnabled,i0=H0.init(this.clippingPlanes,p0),z=k0.get(k,D.length),z.init(),D.push(z),$0.enabled===!0&&$0.isPresenting===!0){let D0=C.xr.getDepthSensingMesh();if(D0!==null)D6(D0,y,-1/0,C.sortObjects)}if(D6(k,y,0,C.sortObjects),z.finish(),C.sortObjects===!0)z.sort(L0,V0,y.reversedDepth);if(cJ=$0.enabled===!1||$0.isPresenting===!1||$0.hasDepthSensing()===!1,cJ)S0.addToRenderList(z,k);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(i0===!0)H0.beginShadows();let d=P.state.shadowsArray;if(E0.render(d,k,y),i0===!0)H0.endShadows();if((p&&A.hasRenderPass())===!1){let{opaque:D0,transmissive:B0}=z;if(P.setupLights(),y.isArrayCamera){let C0=y.cameras;if(B0.length>0)for(let T0=0,x0=C0.length;T0<x0;T0++){let l0=C0[T0];JZ(D0,B0,k,l0)}if(cJ)S0.render(k);for(let T0=0,x0=C0.length;T0<x0;T0++){let l0=C0[T0];e9(z,k,l0,l0.viewport)}}else{if(B0.length>0)JZ(D0,B0,k,y);if(cJ)S0.render(k);e9(z,k,y)}}if(h!==null&&l===0)i.updateMultisampleRenderTarget(h),i.updateRenderTargetMipmap(h);if(p)A.end(C);if(k.isScene===!0)k.onAfterRender(C,k,y);if(Z0.resetDefaultState(),g=-1,Y0=null,T.pop(),T.length>0){if(P=T[T.length-1],i.setTextureUnits(P.state.textureUnits),i0===!0)H0.setGlobalState(C.clippingPlanes,P.state.camera)}else P=null;if(D.pop(),D.length>0)z=D[D.length-1];else z=null;if(E!==null)E.renderEnd()};function D6(k,y,s,p){if(k.visible===!1)return;if(k.layers.test(y.layers)){if(k.isGroup)s=k.renderOrder;else if(k.isLOD){if(k.autoUpdate===!0)k.update(y)}else if(k.isLightProbeGrid)P.pushLightProbeGrid(k);else if(k.isLight){if(P.pushLight(k),k.castShadow)P.pushShadow(k)}else if(k.isSprite){if(!k.frustumCulled||$J.intersectsSprite(k)){if(p)DJ.setFromMatrixPosition(k.matrixWorld).applyMatrix4(yJ);let D0=o.update(k),B0=k.material;if(B0.visible)z.push(k,D0,B0,s,DJ.z,null)}}else if(k.isMesh||k.isLine||k.isPoints){if(!k.frustumCulled||$J.intersectsObject(k)){let D0=o.update(k),B0=k.material;if(p){if(k.boundingSphere!==void 0){if(k.boundingSphere===null)k.computeBoundingSphere();DJ.copy(k.boundingSphere.center)}else{if(D0.boundingSphere===null)D0.computeBoundingSphere();DJ.copy(D0.boundingSphere.center)}DJ.applyMatrix4(k.matrixWorld).applyMatrix4(yJ)}if(Array.isArray(B0)){let C0=D0.groups;for(let T0=0,x0=C0.length;T0<x0;T0++){let l0=C0[T0],P0=B0[l0.materialIndex];if(P0&&P0.visible)z.push(k,D0,P0,s,DJ.z,l0)}}else if(B0.visible)z.push(k,D0,B0,s,DJ.z,null)}}}let z0=k.children;for(let D0=0,B0=z0.length;D0<B0;D0++)D6(z0[D0],y,s,p)}function e9(k,y,s,p){let{opaque:d,transmissive:z0,transparent:D0}=k;if(P.setupLightsView(s),i0===!0)H0.setGlobalState(C.clippingPlanes,s);if(p)V.viewport(O0.copy(p));if(d.length>0)G9(d,y,s);if(z0.length>0)G9(z0,y,s);if(D0.length>0)G9(D0,y,s);V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function JZ(k,y,s,p){if((s.isScene===!0?s.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[p.id]===void 0){let P0=t0.has("EXT_color_buffer_half_float")||t0.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[p.id]=new $6(1,1,{generateMipmaps:!0,type:P0?M8:I6,minFilter:x9,samples:Math.max(4,MJ.samples),stencilBuffer:Y,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:WJ.workingColorSpace})}let z0=P.state.transmissionRenderTarget[p.id],D0=p.viewport||O0;z0.setSize(D0.z*C.transmissionResolutionScale,D0.w*C.transmissionResolutionScale);let B0=C.getRenderTarget(),C0=C.getActiveCubeFace(),T0=C.getActiveMipmapLevel();if(C.setRenderTarget(z0),C.getClearColor(zJ),HJ=C.getClearAlpha(),HJ<1)C.setClearColor(16777215,0.5);if(C.clear(),cJ)S0.render(s);let x0=C.toneMapping;C.toneMapping=_6;let l0=p.viewport;if(p.viewport!==void 0)p.viewport=void 0;if(P.setupLightsView(p),i0===!0)H0.setGlobalState(C.clippingPlanes,p);if(G9(k,s,p),i.updateMultisampleRenderTarget(z0),i.updateRenderTargetMipmap(z0),t0.has("WEBGL_multisampled_render_to_texture")===!1){let P0=!1;for(let NJ=0,pJ=y.length;NJ<pJ;NJ++){let xJ=y[NJ],{object:AJ,geometry:R7,material:w0,group:b7}=xJ;if(w0.side===v6&&AJ.layers.test(p.layers)){let UJ=w0.side;w0.side=S7,w0.needsUpdate=!0,K9(AJ,s,p,R7,w0,b7),w0.side=UJ,w0.needsUpdate=!0,P0=!0}}if(P0===!0)i.updateMultisampleRenderTarget(z0),i.updateRenderTargetMipmap(z0)}if(C.setRenderTarget(B0,C0,T0),C.setClearColor(zJ,HJ),l0!==void 0)p.viewport=l0;C.toneMapping=x0}function G9(k,y,s){let p=y.isScene===!0?y.overrideMaterial:null;for(let d=0,z0=k.length;d<z0;d++){let D0=k[d],{object:B0,geometry:C0,group:T0}=D0,x0=D0.material;if(x0.allowOverride===!0&&p!==null)x0=p;if(B0.layers.test(s.layers))K9(B0,y,s,C0,x0,T0)}}function K9(k,y,s,p,d,z0){if(k.onBeforeRender(C,y,s,p,d,z0),k.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse,k.matrixWorld),k.normalMatrix.getNormalMatrix(k.modelViewMatrix),d.onBeforeRender(C,y,s,p,k,z0),d.transparent===!0&&d.side===v6&&d.forceSinglePass===!1)d.side=S7,d.needsUpdate=!0,C.renderBufferDirect(s,y,p,d,k,z0),d.side=MW,d.needsUpdate=!0,C.renderBufferDirect(s,y,p,d,k,z0),d.side=v6;else C.renderBufferDirect(s,y,p,d,k,z0);k.onAfterRender(C,y,s,p,d,z0)}function ZZ(k,y,s){if(y.isScene!==!0)y=TJ;let p=f.get(k),d=P.state.lights,z0=P.state.shadowsArray,D0=d.state.version,B0=a.getParameters(k,d.state,z0,y,s,P.state.lightProbeGridArray),C0=a.getProgramCacheKey(B0),T0=p.programs;p.environment=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?y.environment:null,p.fog=y.fog;let x0=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap;if(p.envMap=W0.get(k.envMap||p.environment,x0),p.envMapRotation=p.environment!==null&&k.envMap===null?y.environmentRotation:k.envMapRotation,T0===void 0)k.addEventListener("dispose",Z7),T0=new Map,p.programs=T0;let l0=T0.get(C0);if(l0!==void 0){if(p.currentProgram===l0&&p.lightsStateVersion===D0)return WZ(k,B0),l0}else{if(B0.uniforms=a.getUniforms(k),E!==null&&k.isNodeMaterial)E.build(k,s,B0);k.onBeforeCompile(B0,C),l0=a.acquireProgram(B0,C0),T0.set(C0,l0),p.uniforms=B0.uniforms}let P0=p.uniforms;if(!k.isShaderMaterial&&!k.isRawShaderMaterial||k.clipping===!0)P0.clippingPlanes=H0.uniform;if(WZ(k,B0),p.needsLights=sL(k),p.lightsStateVersion=D0,p.needsLights)P0.ambientLightColor.value=d.state.ambient,P0.lightProbe.value=d.state.probe,P0.directionalLights.value=d.state.directional,P0.directionalLightShadows.value=d.state.directionalShadow,P0.spotLights.value=d.state.spot,P0.spotLightShadows.value=d.state.spotShadow,P0.rectAreaLights.value=d.state.rectArea,P0.ltc_1.value=d.state.rectAreaLTC1,P0.ltc_2.value=d.state.rectAreaLTC2,P0.pointLights.value=d.state.point,P0.pointLightShadows.value=d.state.pointShadow,P0.hemisphereLights.value=d.state.hemi,P0.directionalShadowMatrix.value=d.state.directionalShadowMatrix,P0.spotLightMatrix.value=d.state.spotLightMatrix,P0.spotLightMap.value=d.state.spotLightMap,P0.pointShadowMatrix.value=d.state.pointShadowMatrix;return p.lightProbeGrid=P.state.lightProbeGridArray.length>0,p.currentProgram=l0,p.uniformsList=null,l0}function YY(k){if(k.uniformsList===null){let y=k.currentProgram.getUniforms();k.uniformsList=WY.seqWithValue(y.seq,k.uniforms)}return k.uniformsList}function WZ(k,y){let s=f.get(k);s.outputColorSpace=y.outputColorSpace,s.batching=y.batching,s.batchingColor=y.batchingColor,s.instancing=y.instancing,s.instancingColor=y.instancingColor,s.instancingMorph=y.instancingMorph,s.skinning=y.skinning,s.morphTargets=y.morphTargets,s.morphNormals=y.morphNormals,s.morphColors=y.morphColors,s.morphTargetsCount=y.morphTargetsCount,s.numClippingPlanes=y.numClippingPlanes,s.numIntersection=y.numClipIntersection,s.vertexAlphas=y.vertexAlphas,s.vertexTangents=y.vertexTangents,s.toneMapping=y.toneMapping}function lL(k,y){if(k.length===0)return null;if(k.length===1)return k[0].texture!==null?k[0]:null;_.setFromMatrixPosition(y.matrixWorld);for(let s=0,p=k.length;s<p;s++){let d=k[s];if(d.texture!==null&&d.boundingBox.containsPoint(_))return d}return null}function cL(k,y,s,p,d){if(y.isScene!==!0)y=TJ;i.resetTextureUnits();let z0=y.fog,D0=p.isMeshStandardMaterial||p.isMeshLambertMaterial||p.isMeshPhongMaterial?y.environment:null,B0=h===null?C.outputColorSpace:h.isXRRenderTarget===!0?h.texture.colorSpace:WJ.workingColorSpace,C0=p.isMeshStandardMaterial||p.isMeshLambertMaterial&&!p.envMap||p.isMeshPhongMaterial&&!p.envMap,T0=W0.get(p.envMap||D0,C0),x0=p.vertexColors===!0&&!!s.attributes.color&&s.attributes.color.itemSize===4,l0=!!s.attributes.tangent&&(!!p.normalMap||p.anisotropy>0),P0=!!s.morphAttributes.position,NJ=!!s.morphAttributes.normal,pJ=!!s.morphAttributes.color,xJ=_6;if(p.toneMapped){if(h===null||h.isXRRenderTarget===!0)xJ=C.toneMapping}let AJ=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,R7=AJ!==void 0?AJ.length:0,w0=f.get(p),b7=P.state.lights;if(i0===!0){if(p0===!0||k!==Y0){let kJ=k===Y0&&p.id===g;H0.setState(p,k,kJ)}}let UJ=!1;if(p.version===w0.__version){if(w0.needsLights&&w0.lightsStateVersion!==b7.state.version)UJ=!0;else if(w0.outputColorSpace!==B0)UJ=!0;else if(d.isBatchedMesh&&w0.batching===!1)UJ=!0;else if(!d.isBatchedMesh&&w0.batching===!0)UJ=!0;else if(d.isBatchedMesh&&w0.batchingColor===!0&&d.colorTexture===null)UJ=!0;else if(d.isBatchedMesh&&w0.batchingColor===!1&&d.colorTexture!==null)UJ=!0;else if(d.isInstancedMesh&&w0.instancing===!1)UJ=!0;else if(!d.isInstancedMesh&&w0.instancing===!0)UJ=!0;else if(d.isSkinnedMesh&&w0.skinning===!1)UJ=!0;else if(!d.isSkinnedMesh&&w0.skinning===!0)UJ=!0;else if(d.isInstancedMesh&&w0.instancingColor===!0&&d.instanceColor===null)UJ=!0;else if(d.isInstancedMesh&&w0.instancingColor===!1&&d.instanceColor!==null)UJ=!0;else if(d.isInstancedMesh&&w0.instancingMorph===!0&&d.morphTexture===null)UJ=!0;else if(d.isInstancedMesh&&w0.instancingMorph===!1&&d.morphTexture!==null)UJ=!0;else if(w0.envMap!==T0)UJ=!0;else if(p.fog===!0&&w0.fog!==z0)UJ=!0;else if(w0.numClippingPlanes!==void 0&&(w0.numClippingPlanes!==H0.numPlanes||w0.numIntersection!==H0.numIntersection))UJ=!0;else if(w0.vertexAlphas!==x0)UJ=!0;else if(w0.vertexTangents!==l0)UJ=!0;else if(w0.morphTargets!==P0)UJ=!0;else if(w0.morphNormals!==NJ)UJ=!0;else if(w0.morphColors!==pJ)UJ=!0;else if(w0.toneMapping!==xJ)UJ=!0;else if(w0.morphTargetsCount!==R7)UJ=!0;else if(!!w0.lightProbeGrid!==P.state.lightProbeGridArray.length>0)UJ=!0}else UJ=!0,w0.__version=p.version;let a7=w0.currentProgram;if(UJ===!0){if(a7=ZZ(p,y,d),E&&p.isNodeMaterial)E.onUpdateProgram(p,a7,w0)}let k6=!1,B8=!1,QZ=!1,_J=a7.getUniforms(),dJ=w0.uniforms;if(V.useProgram(a7.program))k6=!0,B8=!0,QZ=!0;if(p.id!==g)g=p.id,B8=!0;if(w0.needsLights){let kJ=lL(P.state.lightProbeGridArray,d);if(w0.lightProbeGrid!==kJ)w0.lightProbeGrid=kJ,B8=!0}if(k6||Y0!==k){if(V.buffers.depth.getReversed()&&k.reversedDepth!==!0)k._reversedDepth=!0,k.updateProjectionMatrix();_J.setValue(j,"projectionMatrix",k.projectionMatrix),_J.setValue(j,"viewMatrix",k.matrixWorldInverse);let A8=_J.map.cameraPosition;if(A8!==void 0)A8.setValue(j,VJ.setFromMatrixPosition(k.matrixWorld));if(MJ.logarithmicDepthBuffer)_J.setValue(j,"logDepthBufFC",2/(Math.log(k.far+1)/Math.LN2));if(p.isMeshPhongMaterial||p.isMeshToonMaterial||p.isMeshLambertMaterial||p.isMeshBasicMaterial||p.isMeshStandardMaterial||p.isShaderMaterial)_J.setValue(j,"isOrthographic",k.isOrthographicCamera===!0);if(Y0!==k)Y0=k,B8=!0,QZ=!0}if(w0.needsLights){if(b7.state.directionalShadowMap.length>0)_J.setValue(j,"directionalShadowMap",b7.state.directionalShadowMap,i);if(b7.state.spotShadowMap.length>0)_J.setValue(j,"spotShadowMap",b7.state.spotShadowMap,i);if(b7.state.pointShadowMap.length>0)_J.setValue(j,"pointShadowMap",b7.state.pointShadowMap,i)}if(d.isSkinnedMesh){_J.setOptional(j,d,"bindMatrix"),_J.setOptional(j,d,"bindMatrixInverse");let kJ=d.skeleton;if(kJ){if(kJ.boneTexture===null)kJ.computeBoneTexture();_J.setValue(j,"boneTexture",kJ.boneTexture,i)}}if(d.isBatchedMesh){if(_J.setOptional(j,d,"batchingTexture"),_J.setValue(j,"batchingTexture",d._matricesTexture,i),_J.setOptional(j,d,"batchingIdTexture"),_J.setValue(j,"batchingIdTexture",d._indirectTexture,i),_J.setOptional(j,d,"batchingColorTexture"),d._colorsTexture!==null)_J.setValue(j,"batchingColorTexture",d._colorsTexture,i)}let z8=s.morphAttributes;if(z8.position!==void 0||z8.normal!==void 0||z8.color!==void 0)R0.update(d,s,a7);if(B8||w0.receiveShadow!==d.receiveShadow)w0.receiveShadow=d.receiveShadow,_J.setValue(j,"receiveShadow",d.receiveShadow);if((p.isMeshStandardMaterial||p.isMeshLambertMaterial||p.isMeshPhongMaterial)&&p.envMap===null&&y.environment!==null)dJ.envMapIntensity.value=y.environmentIntensity;if(dJ.dfgLUT!==void 0)dJ.dfgLUT.value=Mk();if(B8){if(_J.setValue(j,"toneMappingExposure",C.toneMappingExposure),w0.needsLights)iL(dJ,QZ);if(z0&&p.fog===!0)X0.refreshFogUniforms(dJ,z0);if(X0.refreshMaterialUniforms(dJ,p,A0,q0,P.state.transmissionRenderTarget[k.id]),w0.needsLights&&w0.lightProbeGrid){let kJ=w0.lightProbeGrid;dJ.probesSH.value=kJ.texture,dJ.probesMin.value.copy(kJ.boundingBox.min),dJ.probesMax.value.copy(kJ.boundingBox.max),dJ.probesResolution.value.copy(kJ.resolution)}WY.upload(j,YY(w0),dJ,i)}if(p.isShaderMaterial&&p.uniformsNeedUpdate===!0)WY.upload(j,YY(w0),dJ,i),p.uniformsNeedUpdate=!1;if(p.isSpriteMaterial)_J.setValue(j,"center",d.center);if(_J.setValue(j,"modelViewMatrix",d.modelViewMatrix),_J.setValue(j,"normalMatrix",d.normalMatrix),_J.setValue(j,"modelMatrix",d.matrixWorld),p.uniformsGroups!==void 0){let kJ=p.uniformsGroups;for(let A8=0,YZ=kJ.length;A8<YZ;A8++){let Z$=kJ[A8];K0.update(Z$,a7),K0.bind(Z$,a7)}}return a7}function iL(k,y){k.ambientLightColor.needsUpdate=y,k.lightProbe.needsUpdate=y,k.directionalLights.needsUpdate=y,k.directionalLightShadows.needsUpdate=y,k.pointLights.needsUpdate=y,k.pointLightShadows.needsUpdate=y,k.spotLights.needsUpdate=y,k.spotLightShadows.needsUpdate=y,k.rectAreaLights.needsUpdate=y,k.hemisphereLights.needsUpdate=y}function sL(k){return k.isMeshLambertMaterial||k.isMeshToonMaterial||k.isMeshPhongMaterial||k.isMeshStandardMaterial||k.isShadowMaterial||k.isShaderMaterial&&k.lights===!0}if(this.getActiveCubeFace=function(){return c},this.getActiveMipmapLevel=function(){return l},this.getRenderTarget=function(){return h},this.setRenderTargetTextures=function(k,y,s){let p=f.get(k);if(p.__autoAllocateDepthBuffer=k.resolveDepthBuffer===!1,p.__autoAllocateDepthBuffer===!1)p.__useRenderToTexture=!1;f.get(k.texture).__webglTexture=y,f.get(k.depthTexture).__webglTexture=p.__autoAllocateDepthBuffer?void 0:s,p.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(k,y){let s=f.get(k);s.__webglFramebuffer=y,s.__useDefaultFramebuffer=y===void 0},this.setRenderTarget=function(k,y=0,s=0){h=k,c=y,l=s;let p=null,d=!1,z0=!1;if(k){let B0=f.get(k);if(B0.__useDefaultFramebuffer!==void 0){V.bindFramebuffer(j.FRAMEBUFFER,B0.__webglFramebuffer),O0.copy(k.viewport),_0.copy(k.scissor),I0=k.scissorTest,V.viewport(O0),V.scissor(_0),V.setScissorTest(I0),g=-1;return}else if(B0.__webglFramebuffer===void 0)i.setupRenderTarget(k);else if(B0.__hasExternalTextures)i.rebindTextures(k,f.get(k.texture).__webglTexture,f.get(k.depthTexture).__webglTexture);else if(k.depthBuffer){let x0=k.depthTexture;if(B0.__boundDepthTexture!==x0){if(x0!==null&&f.has(x0)&&(k.width!==x0.image.width||k.height!==x0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");i.setupDepthRenderbuffer(k)}}let C0=k.texture;if(C0.isData3DTexture||C0.isDataArrayTexture||C0.isCompressedArrayTexture)z0=!0;let T0=f.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget){if(Array.isArray(T0[y]))p=T0[y][s];else p=T0[y];d=!0}else if(k.samples>0&&i.useMultisampledRTT(k)===!1)p=f.get(k).__webglMultisampledFramebuffer;else if(Array.isArray(T0))p=T0[s];else p=T0;O0.copy(k.viewport),_0.copy(k.scissor),I0=k.scissorTest}else O0.copy(r0).multiplyScalar(A0).floor(),_0.copy(m0).multiplyScalar(A0).floor(),I0=u0;if(s!==0)p=u;if(V.bindFramebuffer(j.FRAMEBUFFER,p))V.drawBuffers(k,p);if(V.viewport(O0),V.scissor(_0),V.setScissorTest(I0),d){let B0=f.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+y,B0.__webglTexture,s)}else if(z0){let B0=y;for(let C0=0;C0<k.textures.length;C0++){let T0=f.get(k.textures[C0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+C0,T0.__webglTexture,s,B0)}}else if(k!==null&&s!==0){let B0=f.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,B0.__webglTexture,s)}g=-1},this.readRenderTargetPixels=function(k,y,s,p,d,z0,D0,B0=0){if(!(k&&k.isWebGLRenderTarget)){b0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let C0=f.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&D0!==void 0)C0=C0[D0];if(C0){V.bindFramebuffer(j.FRAMEBUFFER,C0);try{let T0=k.textures[B0],x0=T0.format,l0=T0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+B0);if(!MJ.textureFormatReadable(x0)){b0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!MJ.textureTypeReadable(l0)){b0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(y>=0&&y<=k.width-p&&(s>=0&&s<=k.height-d))j.readPixels(y,s,p,d,m.convert(x0),m.convert(l0),z0)}finally{let T0=h!==null?f.get(h).__webglFramebuffer:null;V.bindFramebuffer(j.FRAMEBUFFER,T0)}}},this.readRenderTargetPixelsAsync=async function(k,y,s,p,d,z0,D0,B0=0){if(!(k&&k.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let C0=f.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&D0!==void 0)C0=C0[D0];if(C0)if(y>=0&&y<=k.width-p&&(s>=0&&s<=k.height-d)){V.bindFramebuffer(j.FRAMEBUFFER,C0);let T0=k.textures[B0],x0=T0.format,l0=T0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+B0);if(!MJ.textureFormatReadable(x0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!MJ.textureTypeReadable(l0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let P0=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,P0),j.bufferData(j.PIXEL_PACK_BUFFER,z0.byteLength,j.STREAM_READ),j.readPixels(y,s,p,d,m.convert(x0),m.convert(l0),0);let NJ=h!==null?f.get(h).__webglFramebuffer:null;V.bindFramebuffer(j.FRAMEBUFFER,NJ);let pJ=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await SN(j,pJ,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,P0),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,z0),j.deleteBuffer(P0),j.deleteSync(pJ),z0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(k,y=null,s=0){let p=Math.pow(2,-s),d=Math.floor(k.image.width*p),z0=Math.floor(k.image.height*p),D0=y!==null?y.x:0,B0=y!==null?y.y:0;i.setTexture2D(k,0),j.copyTexSubImage2D(j.TEXTURE_2D,s,0,0,D0,B0,d,z0),V.unbindTexture()},this.copyTextureToTexture=function(k,y,s=null,p=null,d=0,z0=0){let D0,B0,C0,T0,x0,l0,P0,NJ,pJ,xJ=k.isCompressedTexture?k.mipmaps[z0]:k.image;if(s!==null)D0=s.max.x-s.min.x,B0=s.max.y-s.min.y,C0=s.isBox3?s.max.z-s.min.z:1,T0=s.min.x,x0=s.min.y,l0=s.isBox3?s.min.z:0;else{let dJ=Math.pow(2,-d);if(D0=Math.floor(xJ.width*dJ),B0=Math.floor(xJ.height*dJ),k.isDataArrayTexture)C0=xJ.depth;else if(k.isData3DTexture)C0=Math.floor(xJ.depth*dJ);else C0=1;T0=0,x0=0,l0=0}if(p!==null)P0=p.x,NJ=p.y,pJ=p.z;else P0=0,NJ=0,pJ=0;let AJ=m.convert(y.format),R7=m.convert(y.type),w0;if(y.isData3DTexture)i.setTexture3D(y,0),w0=j.TEXTURE_3D;else if(y.isDataArrayTexture||y.isCompressedArrayTexture)i.setTexture2DArray(y,0),w0=j.TEXTURE_2D_ARRAY;else i.setTexture2D(y,0),w0=j.TEXTURE_2D;V.activeTexture(j.TEXTURE0),V.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,y.flipY),V.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),V.pixelStorei(j.UNPACK_ALIGNMENT,y.unpackAlignment);let b7=V.getParameter(j.UNPACK_ROW_LENGTH),UJ=V.getParameter(j.UNPACK_IMAGE_HEIGHT),a7=V.getParameter(j.UNPACK_SKIP_PIXELS),k6=V.getParameter(j.UNPACK_SKIP_ROWS),B8=V.getParameter(j.UNPACK_SKIP_IMAGES);V.pixelStorei(j.UNPACK_ROW_LENGTH,xJ.width),V.pixelStorei(j.UNPACK_IMAGE_HEIGHT,xJ.height),V.pixelStorei(j.UNPACK_SKIP_PIXELS,T0),V.pixelStorei(j.UNPACK_SKIP_ROWS,x0),V.pixelStorei(j.UNPACK_SKIP_IMAGES,l0);let QZ=k.isDataArrayTexture||k.isData3DTexture,_J=y.isDataArrayTexture||y.isData3DTexture;if(k.isDepthTexture){let dJ=f.get(k),z8=f.get(y),kJ=f.get(dJ.__renderTarget),A8=f.get(z8.__renderTarget);V.bindFramebuffer(j.READ_FRAMEBUFFER,kJ.__webglFramebuffer),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,A8.__webglFramebuffer);for(let YZ=0;YZ<C0;YZ++){if(QZ)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,f.get(k).__webglTexture,d,l0+YZ),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,f.get(y).__webglTexture,z0,pJ+YZ);j.blitFramebuffer(T0,x0,D0,B0,P0,NJ,D0,B0,j.DEPTH_BUFFER_BIT,j.NEAREST)}V.bindFramebuffer(j.READ_FRAMEBUFFER,null),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(d!==0||k.isRenderTargetTexture||f.has(k)){let dJ=f.get(k),z8=f.get(y);V.bindFramebuffer(j.READ_FRAMEBUFFER,e),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,b);for(let kJ=0;kJ<C0;kJ++){if(QZ)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,dJ.__webglTexture,d,l0+kJ);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,dJ.__webglTexture,d);if(_J)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,z8.__webglTexture,z0,pJ+kJ);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,z8.__webglTexture,z0);if(d!==0)j.blitFramebuffer(T0,x0,D0,B0,P0,NJ,D0,B0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(_J)j.copyTexSubImage3D(w0,z0,P0,NJ,pJ+kJ,T0,x0,D0,B0);else j.copyTexSubImage2D(w0,z0,P0,NJ,T0,x0,D0,B0)}V.bindFramebuffer(j.READ_FRAMEBUFFER,null),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(_J)if(k.isDataTexture||k.isData3DTexture)j.texSubImage3D(w0,z0,P0,NJ,pJ,D0,B0,C0,AJ,R7,xJ.data);else if(y.isCompressedArrayTexture)j.compressedTexSubImage3D(w0,z0,P0,NJ,pJ,D0,B0,C0,AJ,xJ.data);else j.texSubImage3D(w0,z0,P0,NJ,pJ,D0,B0,C0,AJ,R7,xJ);else if(k.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,z0,P0,NJ,D0,B0,AJ,R7,xJ.data);else if(k.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,z0,P0,NJ,xJ.width,xJ.height,AJ,xJ.data);else j.texSubImage2D(j.TEXTURE_2D,z0,P0,NJ,D0,B0,AJ,R7,xJ);if(V.pixelStorei(j.UNPACK_ROW_LENGTH,b7),V.pixelStorei(j.UNPACK_IMAGE_HEIGHT,UJ),V.pixelStorei(j.UNPACK_SKIP_PIXELS,a7),V.pixelStorei(j.UNPACK_SKIP_ROWS,k6),V.pixelStorei(j.UNPACK_SKIP_IMAGES,B8),z0===0&&y.generateMipmaps)j.generateMipmap(w0);V.unbindTexture()},this.initRenderTarget=function(k){if(f.get(k).__webglFramebuffer===void 0)i.setupRenderTarget(k)},this.initTexture=function(k){if(k.isCubeTexture)i.setTextureCube(k,0);else if(k.isData3DTexture)i.setTexture3D(k,0);else if(k.isDataArrayTexture||k.isCompressedArrayTexture)i.setTexture2DArray(k,0);else i.setTexture2D(k,0);V.unbindTexture()},this.resetState=function(){c=0,l=0,h=null,V.reset(),Z0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hq}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Z=this.getContext();Z.drawingBufferColorSpace=WJ._getDrawingBufferColorSpace(J),Z.unpackColorSpace=WJ._getUnpackColorSpace()}}W7();function AL({items:J,lang:Z,themes:W,session:Q}){let Y=[...J].sort((X,H)=>(X.weight??50)-(H.weight??50));return M("nav",{className:"flex flex-wrap items-center gap-1.5","aria-label":"Archive",children:[Y.map((X)=>M(zL,{item:X},X.label,!1,void 0,this)),W&&M(Lk,{...W},void 0,!1,void 0,this),Z&&M("button",{type:"button",onClick:Z.onSelect,title:Z.title,className:"ml-1 rounded-lg border border-line px-2.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors hover:border-line-bright",style:{color:"var(--color-faint)"},children:Z.label},void 0,!1,void 0,this),Q&&M(zL,{item:Q},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function zL({item:J}){return M("button",{type:"button",onClick:J.onSelect,title:J.title,"aria-current":J.active?"page":void 0,className:"rounded-lg border px-3 py-1.5 text-sm transition-colors",style:{borderColor:J.active?"var(--color-ember)":"var(--color-line)",background:J.active?"var(--color-ember-soft)":"transparent",color:J.danger?"#f0928f":J.active?"var(--color-ember)":"var(--color-dim)"},children:J.label},void 0,!1,void 0,this)}function Lk({current:J,options:Z,onSelect:W}){let[Q,Y]=G0(!1),X=r7(null),H=Z.find((U)=>U.id===J)??Z[0];return c0(()=>{if(!Q)return;let U=(K)=>{if(!X.current?.contains(K.target))Y(!1)},G=(K)=>{if(K.key==="Escape")Y(!1)};return document.addEventListener("mousedown",U),window.addEventListener("keydown",G),()=>{document.removeEventListener("mousedown",U),window.removeEventListener("keydown",G)}},[Q]),M("div",{ref:X,className:"relative ml-1","data-escape-guard":Q?"":void 0,children:[M("button",{type:"button",onClick:()=>Y((U)=>!U),"aria-haspopup":"menu","aria-expanded":Q,"aria-label":H.label,title:`${H.label} — ${H.note}`,className:"grid size-8 place-items-center rounded-lg border transition-colors",style:{background:H.swatch[0],borderColor:Q?"var(--color-ember)":"var(--color-line)"},children:M("span",{"aria-hidden":"true",className:"block size-2.5 rounded-full",style:{background:H.swatch[1]}},void 0,!1,void 0,this)},void 0,!1,void 0,this),Q&&M("div",{role:"menu",className:"absolute right-0 top-full z-30 mt-1.5 w-52 overflow-hidden rounded-lg border border-line shadow-xl",style:{background:"var(--color-panel)"},children:Z.map((U)=>{let G=U.id===J;return M("button",{type:"button",role:"menuitemradio","aria-checked":G,onClick:()=>{W(U.id),Y(!1)},className:"flex w-full items-center gap-2.5 px-2.5 py-2 text-left transition-colors hover:bg-raised",style:{background:G?"var(--color-ember-soft)":void 0},children:[M("span",{"aria-hidden":"true",className:"grid size-5 shrink-0 place-items-center rounded-full border",style:{background:U.swatch[0],borderColor:"var(--color-line-bright)"},children:M("span",{className:"block size-2 rounded-full",style:{background:U.swatch[1]}},void 0,!1,void 0,this)},void 0,!1,void 0,this),M("span",{className:"truncate text-sm",style:{color:G?"var(--color-ember)":"var(--color-ink)"},children:U.label},void 0,!1,void 0,this)]},U.id,!0,void 0,this)})},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function R6({title:J,eyebrow:Z,subtitle:W,actions:Q,onClose:Y,nav:X,children:H}){return c0(()=>{let U=(G)=>{if(G.key!=="Escape")return;if(document.querySelector('[role="dialog"], [data-escape-guard]'))return;Y()};return window.addEventListener("keydown",U),()=>window.removeEventListener("keydown",U)},[Y]),M(YJ,{children:[M("header",{className:"lamp border-b border-line",children:M("div",{className:"mx-auto max-w-4xl px-5 pb-5 pt-6",children:[M("div",{className:"mb-5",children:X??M("button",{type:"button",onClick:Y,className:"rounded-lg border border-line px-3 py-1.5 text-sm text-dim transition-colors hover:border-line-bright hover:text-ink",children:"← Archive"},void 0,!1,void 0,this)},void 0,!1,void 0,this),M("div",{className:"min-w-0",children:[M("p",{className:"eyebrow mb-1.5",children:Z},void 0,!1,void 0,this),M("h1",{className:"text-2xl font-semibold tracking-tight text-ink",children:J},void 0,!1,void 0,this),W&&M("p",{className:"mt-2 max-w-2xl text-sm text-dim",children:W},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Q&&M("div",{className:"mt-4",children:Q},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),M("main",{className:"mx-auto max-w-4xl px-5 py-6",children:H},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}W7();function IL({graph:J}){let[Z,W]=G0(!1),Q=J.nodes.length,Y=Q*(Q-1)/2,X=J.edges.reduce((G,K)=>{return G[K.kind]=(G[K.kind]??0)+1,G},{}),H=(G)=>`${Math.round(G*100)}%`,U=J.distance;return M("section",{className:"mt-4 rounded-xl border border-line",children:[M("button",{type:"button",onClick:()=>W((G)=>!G),"aria-expanded":Z,className:"flex w-full items-center justify-between gap-3 px-4 py-3 text-left",children:[M("span",{className:"eyebrow",children:n("method.title")},void 0,!1,void 0,this),M("span",{className:"meta",children:Z?n("method.hide"):n("method.show")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Z&&M("div",{className:"flex flex-col gap-5 border-t border-line px-4 py-4",children:[M(iq,{title:n("method.posTitle"),body:M(YJ,{children:["Every memory carries a ",M(F6,{children:"1024"},void 0,!1,void 0,this),"-dimension vector from"," ",M(_L,{children:"bge-m3"},void 0,!1,void 0,this),", the same one semantic search uses. Three numbers are needed to place a point, so the cloud is projected down by"," ",M("strong",{className:"text-ink",children:"PCA"},void 0,!1,void 0,this)," — power iteration, deflating between components, seeded so the same corpus lays out identically on every load.",M("br",{},void 0,!1,void 0,this),M("br",{},void 0,!1,void 0,this),"Those three axes capture ",M(F6,{children:H(J.explained)},void 0,!1,void 0,this)," of the variance in ",M(F6,{children:Q},void 0,!1,void 0,this)," vectors. The rest is lost. Two points sitting together here may be further apart than they look — the drawing is a shadow of a 1024-dimension object, and"," ",M(F6,{children:H(1-J.explained)},void 0,!1,void 0,this)," of it is the part you cannot see.",J.unembedded>0&&M(YJ,{children:[M("br",{},void 0,!1,void 0,this),M("br",{},void 0,!1,void 0,this),M(F6,{children:J.unembedded},void 0,!1,void 0,this)," ",J.unembedded===1?"memory carries":"memories carry"," no vector and ",J.unembedded===1?"is":"are"," absent from the drawing entirely."]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),M(iq,{title:n("method.edgeTitle"),body:M(YJ,{children:["Not a similarity threshold. In high dimensions similarities concentrate — across these ",Y," pairs, cosine distance runs from"," ",M(F6,{children:U?U.min.toFixed(3):"—"},void 0,!1,void 0,this)," to"," ",M(F6,{children:U?U.max.toFixed(3):"—"},void 0,!1,void 0,this)," with a median of"," ",M(F6,{children:U?U.median.toFixed(3):"—"},void 0,!1,void 0,this),". One cutoff in that band takes almost everything or almost nothing. bge-m3 makes it worse: its own documentation puts an ",M("em",{children:"unrelated"},void 0,!1,void 0,this)," pair near 0.35 similarity, so a threshold anchored at zero calls unrelated text related.",M("br",{},void 0,!1,void 0,this),M("br",{},void 0,!1,void 0,this),"Instead: ",M("strong",{className:"text-ink",children:"mutual k-nearest-neighbours"},void 0,!1,void 0,this)," ","at ",M(_L,{children:["k = ⌈√N⌉ = ",J.k]},void 0,!0,void 0,this),". An edge exists only if each memory is in the other's top ",J.k," — reciprocity caps how many connections any one memory can dominate. That disconnects the graph, so it is unioned with a"," ",M("strong",{className:"text-ink",children:"maximum spanning tree"},void 0,!1,void 0,this),"; those repair edges are marked and drawn faintest, because they carry almost nothing.",M("br",{},void 0,!1,void 0,this),M("br",{},void 0,!1,void 0,this),"Result: ",M(F6,{children:J.edges.length},void 0,!1,void 0,this)," edges out of ",M(F6,{children:Y},void 0,!1,void 0,this)," ","possible — ",M(F6,{children:H(J.density)},void 0,!1,void 0,this)," density.",M("ul",{className:"mt-3 flex flex-col gap-1",children:[M(sq,{swatch:"var(--color-ember)",n:X.link??0,label:"link — written as [[a reference]]. Someone said these belong together; it outranks an inferred edge for the same pair."},void 0,!1,void 0,this),M(sq,{swatch:"rgb(168,194,219)",n:X.similar??0,label:"similar — mutual kNN. Brightness is 1 − distance, so a nearer pair draws stronger."},void 0,!1,void 0,this),M(sq,{swatch:"rgba(140,150,160,0.45)",n:X.bridge??0,label:"bridge — spanning-tree repair. Exists only so nothing is stranded."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),M(iq,{title:n("method.honestTitle"),body:M(YJ,{children:["A node-link graph stops being readable past a few hundred memories — Obsidian's is a hairball past roughly 200, Roam's layout gives up around 600. No layout algorithm fixes that; it is what node-link diagrams do. At"," ",M(F6,{children:H(J.density)},void 0,!1,void 0,this)," density"," ",J.density>0.4?"this corpus is small enough that most pairs qualify as neighbours, so the web shows less structure than it appears to.":"the web is showing real structure rather than a complete graph.",M("br",{},void 0,!1,void 0,this),M("br",{},void 0,!1,void 0,this),"The ",M("strong",{className:"text-ink",children:"map"},void 0,!1,void 0,this)," has no such ceiling: it draws no edges, so nothing occludes anything, and proximity carries the same information the filaments do.",M("br",{},void 0,!1,void 0,this),M("br",{},void 0,!1,void 0,this),"Distances are cosine, computed from the vectors directly, not from anything shown on screen. Nothing here is illustrative."]},void 0,!0,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}function iq({title:J,body:Z}){return M("div",{children:[M("p",{className:"eyebrow mb-2",children:J},void 0,!1,void 0,this),M("div",{className:"max-w-2xl text-sm leading-relaxed text-dim",children:Z},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function F6({children:J}){return M("span",{className:"font-mono tabular-nums",style:{color:"var(--color-ember)"},children:J},void 0,!1,void 0,this)}function _L({children:J}){return M("code",{className:"font-mono text-[0.85em] text-ink",children:J},void 0,!1,void 0,this)}function sq({swatch:J,n:Z,label:W}){return M("li",{className:"flex items-baseline gap-2",children:[M("span",{"aria-hidden":"true",className:"mt-1.5 inline-block h-0.5 w-6 shrink-0 rounded",style:{background:J}},void 0,!1,void 0,this),M("span",{className:"text-sm text-dim",children:[M("span",{className:"font-mono tabular-nums text-ink",children:Z},void 0,!1,void 0,this)," ",W]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}var nq=20;function wL({onClose:J,nav:Z,scope:W,onOpenMemory:Q}){let[Y,X]=G0(null),[H,U]=G0("map"),[G,K]=G0(null),[O,F]=G0(null),[q,R]=G0(null),[L,w]=G0(null),N=r7(null),$=r7(null),B=r7(null),[_,z]=G0(!0),P=r7(!1),D=r7(!0);D.current=_,c0(()=>{if(P.current)return;z(H==="map")},[H]);let T=r7([]),[A,C]=G0("idle");c0(()=>{if(!O){R(null),C("idle");return}let b=!0;return R(null),C("loading"),g0.memories.get(O.id).then((c)=>{if(b)R(c.memory),C("idle")}).catch(()=>b&&C("error")),()=>{b=!1}},[O]);let x=VW(()=>JSON.stringify([W.kind,W.workspace,W.project,W.createdBy]),[W]),E=y7(()=>{let b=!0;return g0.graph(W).then((c)=>b&&(X(c),w(null))).catch((c)=>b&&w(c instanceof Error?c.message:"Could not build the graph.")),()=>{b=!1}},[x]);c0(()=>E(),[E]),c0(()=>{let b=()=>{if(document.visibilityState==="visible")E()};return window.addEventListener("focus",b),document.addEventListener("visibilitychange",b),()=>{window.removeEventListener("focus",b),document.removeEventListener("visibilitychange",b)}},[E]),c0(()=>{let b=N.current;if(!b||!Y||Y.nodes.length===0)return;let c=new IH,l=new _7(50,1,0.1,100);l.position.set(0,0,4);let h=new cq({antialias:!0,alpha:!0});h.setPixelRatio(Math.min(window.devicePixelRatio,2)),h.domElement.style.width="100%",h.domElement.style.height="100%",h.domElement.style.display="block",b.appendChild(h.domElement);let g=new Float32Array(Y.nodes.length*3),Y0=new Float32Array(Y.nodes.length*3),O0=new Float32Array(Y.nodes.length),_0=document.createElement("span");b.appendChild(_0),Y.nodes.forEach((R0,S)=>{g[S*3]=R0.x*1.6,g[S*3+1]=R0.y*1.6,g[S*3+2]=R0.z*1.6,_0.style.color=b6(R0.kind);let Q0=getComputedStyle(_0).color,m=new a0(Q0);Y0[S*3]=m.r,Y0[S*3+1]=m.g,Y0[S*3+2]=m.b,O0[S]=0.062+R0.importance*0.02}),b.removeChild(_0);let I0=new O7;I0.setAttribute("position",new mJ(g,3)),I0.setAttribute("color",new mJ(Y0,3)),I0.setAttribute("size",new mJ(O0,1));let zJ=new Float32Array(Y.nodes.length);for(let R0=0;R0<zJ.length;R0++)zJ[R0]=R0;I0.setAttribute("index",new mJ(zJ,1));let HJ=new I7({transparent:!0,depthWrite:!1,blending:W9,uniforms:{uScale:{value:1},uTime:{value:0},uActive:{value:-1}},vertexShader:`
        attribute float size;
        attribute float index;
        varying vec3 vColor;
        varying float vDepth;
        varying float vSeed;
        varying float vActive;
        uniform float uScale;
        uniform float uTime;
        uniform float uActive;
        void main() {
          vColor = color;
          // The open memory has to be findable in the cloud while its document
          // is on screen — otherwise "which one did I click" is unanswerable
          // the moment the page scrolls. It swells and pulses harder.
          vActive = abs(index - uActive) < 0.5 ? 1.0 : 0.0;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          // Depth, normalised over the range the camera actually travels. Fed
          // to the fragment shader so far somas dim — the cheapest and most
          // convincing depth cue there is, and the thing whose absence made
          // this look like a plane.
          vDepth = clamp((-mv.z - 1.0) / 9.0, 0.0, 1.0);
          // A per-point phase so they do not all breathe in unison, which would
          // read as one blinking object rather than many living ones.
          vSeed = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);
          float breathe = 0.88 + 0.12 * sin(uTime * 1.4 + vSeed * 6.283);
          float lift = 1.0 + vActive * (0.85 + 0.35 * sin(uTime * 3.4));
          gl_PointSize = size * breathe * lift * uScale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying vec3 vColor;
        varying float vDepth;
        varying float vActive;
        void main() {
          vec2 d = gl_PointCoord - vec2(0.5);
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          // A soma, not a disc: a hot near-white core inside a wide falloff
          // halo. The pow() is what separates the two — a linear falloff gives
          // a flat blob, and the whole difference between "dot" and "cell body"
          // is in that curve.
          float halo = pow(1.0 - r, 1.9);
          float core = pow(max(0.0, 1.0 - r * 2.6), 2.0);
          // The core is pushed past 1.0 deliberately: with additive blending an
          // over-bright centre blooms into its own halo, which is what a real
          // point of light does to a lens and what makes this read as emitting
          // rather than as a coloured circle.
          vec3 lit = vColor * halo * 1.25 + vec3(1.0) * core * 1.35;
          // Distance dims, and the far side of the cloud recedes instead of
          // sitting on the same plane as the near side.
          // The active soma ignores distance fade — it stays the brightest thing
          // on screen wherever the cloud has turned to.
          float fade = mix(mix(1.0, 0.22, vDepth), 1.0, vActive);
          gl_FragColor = vec4(lit * fade * (1.0 + vActive * 0.5), (halo * 0.9 + core) * fade);
        }`,vertexColors:!0}),t=new zW(I0,HJ);c.add(t);let q0=14,A0=null,L0=null,V0=null,r0=[];if(Y.edges.length){let R0=document.createElement("span");R0.style.color="var(--color-ember)",b.appendChild(R0);let S=new a0(getComputedStyle(R0).color);b.removeChild(R0);let Q0=H==="map"?0.45:1,m=Y.edges.length*q0,Z0=new Float32Array(m*6),K0=new Float32Array(m*6);Y.edges.forEach((e0,GJ)=>{let Z7=Y.nodes[e0.source],f7=Y.nodes[e0.target],DW=new v(Z7.x*1.6,Z7.y*1.6,Z7.z*1.6),a9=new v(f7.x*1.6,f7.y*1.6,f7.z*1.6),r9=DW.clone().add(a9).multiplyScalar(0.5),mH=r9.clone().normalize().multiplyScalar(DW.distanceTo(a9)*0.22),QY=r9.add(mH),t9=new EH(DW,QY,a9);r0.push(t9);let o7=e0.kind==="link"?{r:S.r*1.6,g:S.g*1.6,b:S.b*1.6,s:1}:e0.kind==="bridge"?{r:0.55,g:0.6,b:0.66,s:0.3}:{r:0.66,g:0.76,b:0.86,s:Math.max(0.22,1-e0.distance)*1.15};for(let D6=0;D6<q0;D6++){let e9=t9.getPoint(D6/q0),JZ=t9.getPoint((D6+1)/q0),G9=(GJ*q0+D6)*6;Z0.set([e9.x,e9.y,e9.z,JZ.x,JZ.y,JZ.z],G9);for(let K9=0;K9<2;K9++){let ZZ=(D6+K9)/q0,YY=0.35+0.65*Math.pow(Math.abs(ZZ-0.5)*2,1.6),WZ=o7.s*YY*Q0;K0.set([o7.r*WZ,o7.g*WZ,o7.b*WZ],G9+K9*3)}}});let r=new O7;r.setAttribute("position",new mJ(Z0,3)),r.setAttribute("color",new mJ(K0,3)),A0=new VH(r,new aQ({vertexColors:!0,transparent:!0,blending:W9,depthWrite:!1})),c.add(A0);let $0=new Float32Array(Y.edges.length*3),f0=new Float32Array(Y.edges.length*3);Y.edges.forEach((e0,GJ)=>{let Z7=e0.kind==="link"?[S.r,S.g,S.b]:[0.55,0.72,0.8];f0.set(Z7,GJ*3)}),V0=new O7,V0.setAttribute("position",new mJ($0,3)),V0.setAttribute("color",new mJ(f0,3)),L0=new zW(V0,new I7({transparent:!0,depthWrite:!1,blending:W9,vertexColors:!0,uniforms:{uScale:{value:1}},vertexShader:`
            varying vec3 vColor;
            uniform float uScale;
            void main() {
              vColor = color;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = 0.03 * uScale / -mv.z;
              gl_Position = projectionMatrix * mv;
            }`,fragmentShader:`
            varying vec3 vColor;
            void main() {
              float r = length(gl_PointCoord - vec2(0.5)) * 2.0;
              if (r > 1.0) discard;
              float a = pow(1.0 - r, 2.0);
              gl_FragColor = vec4(vColor * 1.4 + vec3(1.0) * pow(max(0.0, 1.0 - r * 2.4), 2.0), a);
            }`})),c.add(L0)}let m0=420,u0=new Float32Array(m0*3),$J=7,i0=()=>{return $J=$J*1103515245+12345&2147483647,$J/2147483647};for(let R0=0;R0<m0;R0++){let S=i0()*Math.PI*2,Q0=Math.acos(2*i0()-1),m=2.6+i0()*4.2;u0.set([m*Math.sin(Q0)*Math.cos(S),m*Math.sin(Q0)*Math.sin(S),m*Math.cos(Q0)],R0*3)}let p0=new O7;p0.setAttribute("position",new mJ(u0,3));let yJ=new zW(p0,new rQ({size:0.016,sizeAttenuation:!0,color:10467528,transparent:!0,opacity:0.42,depthWrite:!1,blending:W9}));c.add(yJ);let VJ=new Float32Array(Y.nodes.length*3),DJ=new XJ(-10,-10),TJ={x:-1,y:-1},cJ=()=>{let{clientWidth:R0,clientHeight:S}=b,Q0=S/(2*Math.tan(l.fov*Math.PI/360)),m=new v;for(let Z0=0;Z0<Y.nodes.length;Z0++){m.set(g[Z0*3],g[Z0*3+1],g[Z0*3+2]),m.applyMatrix4(l.matrixWorldInverse);let K0=-m.z;m.applyMatrix4(l.projectionMatrix),VJ[Z0*3]=(m.x*0.5+0.5)*R0,VJ[Z0*3+1]=(-m.y*0.5+0.5)*S,VJ[Z0*3+2]=K0>0?O0[Z0]*Q0/K0/2:-1}},vJ=()=>{if(TJ.x<0)return-1;let R0=-1,S=1/0;for(let Q0=0;Q0<Y.nodes.length;Q0++){let m=VJ[Q0*3+2];if(m<=0)continue;let Z0=VJ[Q0*3]-TJ.x,K0=VJ[Q0*3+1]-TJ.y,r=Math.hypot(Z0,K0);if(r<=Math.max(m*2.4,18)&&r<S)S=r,R0=Q0}return R0},j={x:0.2,y:0.5},iJ=null,t0=4,MJ=!0,V=-1,I=()=>{let{clientWidth:R0,clientHeight:S}=b;if(!R0||!S)return;h.setSize(R0,S,!1),l.aspect=R0/S,l.updateProjectionMatrix();let Q0=S*h.getPixelRatio()/(2*Math.tan(l.fov*Math.PI/360));if(HJ.uniforms.uScale.value=Q0,L0)L0.material.uniforms.uScale.value=Q0};I();let f=new ResizeObserver(I);f.observe(b);let i=(R0)=>{iJ={x:R0.clientX,y:R0.clientY},MJ=!1},W0=()=>{iJ=null},U0=(R0)=>{let S=h.domElement.getBoundingClientRect();if(TJ.x=R0.clientX-S.left,TJ.y=R0.clientY-S.top,!iJ)return;j.y+=(R0.clientX-iJ.x)*0.006,j.x+=(R0.clientY-iJ.y)*0.006,j.x=Math.max(-1.4,Math.min(1.4,j.x)),iJ={x:R0.clientX,y:R0.clientY}},F0=(R0)=>{R0.preventDefault(),t0=Math.max(1.4,Math.min(12,t0+R0.deltaY*0.003))},o=()=>{let R0=vJ();F(R0>=0?Y.nodes[R0]:null),V=R0},a=()=>{TJ.x=-1,TJ.y=-1},X0=h.domElement;X0.style.touchAction="none",X0.style.width="100%",X0.style.height="100%",X0.style.display="block",X0.addEventListener("pointerdown",i),window.addEventListener("pointerup",W0),X0.addEventListener("pointermove",U0),X0.addEventListener("wheel",F0,{passive:!1}),X0.addEventListener("click",o),X0.addEventListener("pointerleave",a),V=O?Y.nodes.findIndex((R0)=>R0.id===O.id):-1;let k0=0,M0=-1,H0=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,E0=performance.now(),S0=()=>{k0=requestAnimationFrame(S0);let R0=H0?0:(performance.now()-E0)/1000;if(HJ.uniforms.uTime.value=R0,HJ.uniforms.uActive.value=V,L0&&V0&&!H0){let m=V0.getAttribute("position"),Z0=m.array;r0.forEach((K0,r)=>{let $0=Y.edges[r].kind==="link"?0.42:0.24,f0=(R0*$0+r*0.37)%1,e0=K0.getPoint(f0);Z0[r*3]=e0.x,Z0[r*3+1]=e0.y,Z0[r*3+2]=e0.z}),m.needsUpdate=!0}if(MJ&&!H0)j.y+=0.0016;yJ.rotation.y-=0.0004,l.position.set(Math.sin(j.y)*Math.cos(j.x)*t0,Math.sin(j.x)*t0,Math.cos(j.y)*Math.cos(j.x)*t0),l.lookAt(0,0,0),l.updateMatrixWorld(),l.matrixWorldInverse.copy(l.matrixWorld).invert(),cJ();let S=vJ();if(S!==M0)M0=S,K(S>=0?Y.nodes[S]:null);X0.style.cursor=iJ?"grabbing":S>=0?"pointer":"grab";let Q0=(m,Z0,K0)=>{if(!m||Z0<0)return;let{clientWidth:r,clientHeight:$0}=b,f0=m.offsetWidth||260,e0=m.offsetHeight||90,GJ=Math.min(Math.max(VJ[Z0*3]+14,8),Math.max(8,r-f0-8)),Z7=Math.min(Math.max(VJ[Z0*3+1]+K0,8),Math.max(8,$0-e0-8));m.style.transform=`translate(${Math.round(GJ)}px, ${Math.round(Z7)}px)`,m.style.opacity=VJ[Z0*3+2]>0?"1":"0"};if(D.current)for(let m=0;m<T.current.length;m++){let Z0=T.current[m];if(!Z0)continue;let K0=Number(Z0.dataset.node),r=VJ[K0*3+2];if(r<=0){Z0.style.opacity="0";continue}let $0=VJ[K0*3],f0=VJ[K0*3+1];Z0.style.transform=`translate(${Math.round($0+r+6)}px, ${Math.round(f0-8)}px)`,Z0.style.opacity=K0===V||K0===S?"1":"0.55"}Q0($.current,S===V?-1:S,-10),h.render(c,l)};return S0(),()=>{if(cancelAnimationFrame(k0),f.disconnect(),X0.removeEventListener("pointerdown",i),window.removeEventListener("pointerup",W0),X0.removeEventListener("pointermove",U0),X0.removeEventListener("wheel",F0),X0.removeEventListener("click",o),X0.removeEventListener("pointerleave",a),I0.dispose(),HJ.dispose(),A0?.geometry.dispose(),A0?.material?.dispose(),V0?.dispose(),L0?.material?.dispose(),p0.dispose(),yJ.material.dispose(),h.dispose(),X0.parentNode===b)b.removeChild(X0)}},[Y,H,Q,O]);let u=(Y?.density??0)>0.5,e=(Y?.nodes??[]).map((b,c)=>({node:b,i:c})).sort((b,c)=>c.node.importance-b.node.importance).slice(0,nq);return M(R6,{eyebrow:n("nav.atlas"),title:n("atlas.title"),subtitle:n("atlas.subtitle"),onClose:J,nav:Z,actions:M("div",{className:"flex flex-wrap items-center gap-1.5",children:[["map","web"].map((b)=>M("button",{type:"button",className:"chip","aria-pressed":H===b,onClick:()=>U(b),children:n(b==="map"?"atlas.map":"atlas.web")},b,!1,void 0,this)),M("button",{type:"button",className:"chip","aria-pressed":_,onClick:()=>{P.current=!0,z((b)=>!b)},title:n("atlas.namesTitle"),children:[n("atlas.names"),Y&&Y.nodes.length>nq&&M("span",{className:"chip-count",children:nq},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Y&&M("span",{className:"meta ml-2",children:[Y.nodes.length," · ",Y.k?`k=${Y.k}`:"—"," ·"," ",n("atlas.explained")," ",Math.round(Y.explained*100),"%",H==="web"&&` · ${n("atlas.density")} ${Math.round(Y.density*100)}%`,Y.unembedded>0&&` · ${Y.unembedded} ${n("atlas.unembedded")}`]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),children:[L&&M("p",{role:"alert",className:"mb-3 rounded-lg border border-line px-3 py-2 text-sm text-[#f0928f]",children:L},void 0,!1,void 0,this),H==="web"&&u&&M("p",{className:"meta mb-3 rounded-lg border border-dashed border-line px-3 py-2",children:n("atlas.denseWarning")},void 0,!1,void 0,this),Y&&Y.nodes.length===0?M("p",{className:"py-16 text-center text-sm text-dim",children:n("atlas.empty")},void 0,!1,void 0,this):M("div",{className:"relative",children:[M("div",{ref:N,className:"w-full overflow-hidden rounded-xl border border-line bg-panel",style:{aspectRatio:"16 / 10"}},void 0,!1,void 0,this),_&&Y&&e.map(({node:b,i:c},l)=>M("div",{ref:(h)=>{T.current[l]=h},"data-node":c,className:"pointer-events-none absolute left-0 top-0 max-w-[13rem] truncate rounded px-1 font-mono text-[0.68rem] leading-tight",style:{background:"color-mix(in oklab, var(--color-ground) 72%, transparent)",color:"var(--color-dim)"},children:b.title},b.id,!1,void 0,this)),M("div",{ref:$,className:"pointer-events-none absolute left-0 top-0 max-w-xs rounded-lg border border-line bg-ground/95 px-3 py-2 transition-opacity",style:{opacity:G&&G.id!==O?.id?1:0},children:[M("p",{className:"text-sm text-ink",children:G?.title},void 0,!1,void 0,this),M("p",{className:"meta mt-1",children:[G?.kind,G?.workspace,G?.project,G?.createdBy].filter(Boolean).join(" · ")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),O&&M("section",{className:"mt-4 rounded-xl border",style:{borderColor:"var(--color-ember)",background:"var(--color-panel)"},children:[M("div",{className:"flex items-start justify-between gap-3 border-b border-line px-4 py-3",children:[M("div",{className:"min-w-0",children:[M("h2",{className:"text-base font-semibold leading-snug text-ink",children:O.title},void 0,!1,void 0,this),M("p",{className:"meta mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1",children:[M("span",{style:{color:b6(O.kind)},children:O.kind},void 0,!1,void 0,this),O.workspace&&M("span",{children:["· ",O.workspace]},void 0,!0,void 0,this),O.project&&M("span",{children:["· ",O.project]},void 0,!0,void 0,this),O.createdBy&&M("span",{children:["· ",O.createdBy]},void 0,!0,void 0,this),M("span",{children:["· ",O.createdAt.slice(0,10)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),M("button",{type:"button",onClick:()=>F(null),"aria-label":n("atlas.close"),className:"shrink-0 rounded px-1.5 py-0.5 text-faint transition-colors hover:text-ink",children:"✕"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("div",{className:"px-4 py-4",children:[A==="loading"&&M("p",{className:"meta",children:n("atlas.loading")},void 0,!1,void 0,this),A==="error"&&M("p",{className:"text-sm text-[#f0928f]",children:n("atlas.loadFailed")},void 0,!1,void 0,this),q&&M(YJ,{children:[M("div",{className:"prose-memory",children:q.content},void 0,!1,void 0,this),q.tags.length>0&&M("ul",{className:"mt-4 flex flex-wrap gap-1.5",children:q.tags.map((b)=>M("li",{className:"rounded border border-line px-1.5 py-0.5 font-mono text-[0.68rem] text-dim",children:b},b,!1,void 0,this))},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),M("div",{className:"flex items-center justify-between gap-2 border-t border-line px-4 py-2.5",children:[M("span",{className:"meta",children:O.id.slice(0,8)},void 0,!1,void 0,this),M("button",{type:"button",onClick:()=>Q(O.id),className:"rounded-lg border border-line px-3 py-1.5 text-xs text-dim transition-colors hover:border-ember hover:text-ember",children:n("atlas.openInArchive")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),Y&&Y.nodes.length>0&&M(IL,{graph:Y},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}W7();function DL({onClose:J,nav:Z,onReplay:W}){let[Q,Y]=G0([]),[X,H]=G0(null),[U,G]=G0(""),[K,O]=G0(!1),[F,q]=G0(null),[R,L]=G0(null),w=y7(async()=>{O(!0);try{let $=await g0.searchLog.list({limit:200,q:U||void 0});Y($.entries),H($.stats),q(null)}catch($){q($ instanceof Error?$.message:"Could not load the search log.")}finally{O(!1)}},[U]);c0(()=>{let $=setTimeout(w,U?180:0);return()=>clearTimeout($)},[w,U]);let N=async($)=>{O(!0);try{await $(),L(null),await w()}catch(B){q(B instanceof Error?B.message:"That did not work."),O(!1)}};return M(R6,{eyebrow:"Search log",title:"What was looked for",subtitle:X&&!X.enabled?"Recording is off. Turn on search_log in this add-on's configuration to start keeping a record.":void 0,onClose:J,nav:Z,actions:X?.enabled?M(YJ,{children:[M("p",{className:"meta mb-2",children:"Click any query to run it again — with the workspace and kind it was scoped to. The replay is recorded like any other search."},void 0,!1,void 0,this),M("input",{value:U,onChange:($)=>G($.target.value),placeholder:"Filter by what was searched…","aria-label":"Filter the search log",className:"w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"},void 0,!1,void 0,this),M("div",{className:"meta mt-3 flex flex-wrap items-center gap-x-3 gap-y-2",children:[M("span",{children:[K?"loading…":`${Q.length} shown`,X?` · ${X.total} recorded`:""]},void 0,!0,void 0,this),M("span",{className:"flex-1"},void 0,!1,void 0,this),M("button",{type:"button",disabled:K||!Q.length,onClick:()=>N(()=>g0.searchLog.prune(30)),className:"rounded border border-line px-2 py-1 transition-colors hover:border-ember hover:text-ember disabled:opacity-40",children:"prune > 30 days"},void 0,!1,void 0,this),R==="all"?M("span",{className:"flex items-center gap-1",children:[M("button",{type:"button",onClick:()=>N(()=>g0.searchLog.clear()),className:"rounded bg-[#5c2320] px-2 py-1 text-[#f0928f]",children:["delete all ",X?.total??""]},void 0,!0,void 0,this),M("button",{type:"button",onClick:()=>L(null),className:"rounded px-2 py-1 text-dim hover:text-ink",children:"keep"},void 0,!1,void 0,this)]},void 0,!0,void 0,this):M("button",{type:"button",disabled:K||!Q.length,onClick:()=>L("all"),className:"rounded border border-line px-2 py-1 transition-colors hover:border-[#f0928f] hover:text-[#f0928f] disabled:opacity-40",children:"clear all"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this):void 0,children:M(YJ,{children:[F&&M("p",{role:"alert",className:"mb-3 rounded-lg border border-[#5c2320] bg-[#2a1614] px-3 py-2 text-sm text-[#f0928f]",children:F},void 0,!1,void 0,this),Q.length===0&&!K?M("p",{className:"py-14 text-center text-sm text-dim",children:U?"No searches match that.":"Nothing recorded yet."},void 0,!1,void 0,this):M("ul",{className:"flex flex-col gap-2",children:Q.map(($)=>M("li",{className:"group flex items-start gap-3 rounded-lg border border-line px-3 py-2.5 transition-colors hover:border-line-bright",children:[M("button",{type:"button",onClick:()=>W({query:$.query,workspace:$.workspace,project:$.project,kind:$.kind}),title:$.query?`Search for “${$.query}” again${$.workspace?` in ${$.workspace}`:""}`:"This entry has no query to run",disabled:!$.query,className:"min-w-0 flex-1 rounded text-left transition-colors enabled:hover:text-ember disabled:cursor-default",children:[M("p",{className:"prose-memory !text-[0.95rem] truncate",children:$.query||M("span",{className:"text-faint",children:"(empty query)"},void 0,!1,void 0,this)},void 0,!1,void 0,this),M("div",{className:"meta mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1",children:[M("span",{title:$.createdAt,children:fQ($.createdAt)},void 0,!1,void 0,this),M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{style:{color:$.resultCount?void 0:"var(--color-ember)"},children:[$.resultCount," result",$.resultCount===1?"":"s"]},void 0,!0,void 0,this),M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{className:"tabular-nums",children:[$.durationMs,"ms"]},void 0,!0,void 0,this),$.source&&M(YJ,{children:[M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{children:$.source},void 0,!1,void 0,this)]},void 0,!0,void 0,this),$.kind&&M(YJ,{children:[M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{children:$.kind},void 0,!1,void 0,this)]},void 0,!0,void 0,this),$.workspace&&M(YJ,{children:[M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{title:"Scoped to workspace",style:{color:"var(--color-ember)"},children:["in ",$.workspace]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),$.project&&M(YJ,{children:[M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{title:"Scoped to project",children:$.project},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),M("button",{type:"button",onClick:()=>N(()=>g0.searchLog.remove($.id)),"aria-label":`Forget the search for “${$.query}”`,className:"shrink-0 rounded p-1.5 text-faint opacity-0 transition-opacity hover:text-[#f0928f] focus-visible:opacity-100 group-hover:opacity-100",children:M("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:M("path",{d:"M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},$.id,!0,void 0,this))},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this)}W7();var kL={error:"text-[#f0928f]",empty:"text-[#f0928f]"};function Bk({timeline:J}){let Z=Math.max(1,...J.days.map((W)=>W.written+W.traced));return M("div",{className:"mb-4",children:[M("div",{className:"flex items-end gap-[2px]",style:{height:"2.5rem"},children:J.days.map((W)=>{let Q=W.written+W.traced;return M("div",{className:"flex flex-1 flex-col justify-end",title:`${W.day} — ${W.written} ${n("trace.written")}, ${W.traced} ${n("trace.asked")}`,style:{minWidth:"3px"},children:[M("div",{style:{height:`${W.traced/Z*100}%`,background:"var(--color-line-bright)"}},void 0,!1,void 0,this),M("div",{style:{height:`${W.written/Z*100}%`,background:"var(--color-ember)"}},void 0,!1,void 0,this)]},W.day,!0,void 0,this)})},void 0,!1,void 0,this),M("p",{className:"meta mt-1.5 flex flex-wrap items-center gap-x-3",children:[M("span",{children:J.from},void 0,!1,void 0,this),M("span",{className:"flex-1"},void 0,!1,void 0,this),M("span",{style:{color:"var(--color-ember)"},children:[J.totals.written," ",n("trace.written")]},void 0,!0,void 0,this),M("span",{children:[J.totals.traced," ",n("trace.asked")]},void 0,!0,void 0,this),M("span",{children:J.to},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}function zk({cloud:J,onPick:Z}){if(!J.items.length)return null;return M("div",{className:"facet-row mb-4",children:[M("span",{className:"eyebrow",children:n("trace.asked")},void 0,!1,void 0,this),M("div",{className:"flex flex-wrap items-baseline gap-1.5",children:J.items.map((W)=>M("button",{type:"button",className:"chip chip-cloud",style:{fontSize:`${W.size}px`},"aria-label":`${W.subject}, ${W.count}`,title:`${W.subject} — ${W.count}`,onClick:()=>Z(W.subject),children:[M("span",{children:W.subject},void 0,!1,void 0,this),M("span",{className:"sr-only",children:W.count},void 0,!1,void 0,this)]},W.subject,!0,void 0,this))},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function CL({onClose:J,nav:Z}){let[W,Q]=G0([]),[Y,X]=G0(null),[H,U]=G0(null),[G,K]=G0(null),[O,F]=G0(""),[q,R]=G0(""),[L,w]=G0(""),[N,$]=G0(null),[B,_]=G0(!1),[z,P]=G0(null),[D,T]=G0(null),A=y7(async()=>{_(!0);try{let[E,u,e]=await Promise.all([g0.traces.list({limit:200,q:O||void 0,outcome:q||void 0,surface:L||void 0}),g0.timeline(30),g0.traces.cloud()]);Q(E.entries),X(E.stats),U(u),K(e),P(null)}catch(E){P(E instanceof Error?E.message:"Could not load the trace log.")}finally{_(!1)}},[O,q,L]);c0(()=>{let E=setTimeout(A,O?180:0);return()=>clearTimeout(E)},[A,O]);let C=async(E)=>{_(!0);try{await E(),T(null),await A()}catch(u){P(u instanceof Error?u.message:"That did not work."),_(!1)}},x=(E,u,e)=>E(u===e?"":e);return M(R6,{eyebrow:n("trace.eyebrow"),title:n("trace.title"),subtitle:Y&&!Y.enabled?n("trace.off"):void 0,onClose:J,nav:Z,actions:M(YJ,{children:[M("p",{className:"meta mb-2",children:n("trace.blurb")},void 0,!1,void 0,this),M("input",{value:O,onChange:(E)=>F(E.target.value),placeholder:n("trace.search"),className:"w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"},void 0,!1,void 0,this),M("div",{className:"meta mt-3 flex flex-wrap items-center gap-x-3 gap-y-2",children:[M("button",{type:"button",className:"chip","aria-pressed":q==="empty",onClick:()=>x(R,q,"empty"),children:n("trace.emptyOnly")},void 0,!1,void 0,this),M("button",{type:"button",className:"chip","aria-pressed":q==="error",onClick:()=>x(R,q,"error"),children:n("trace.errorsOnly")},void 0,!1,void 0,this),M("button",{type:"button",className:"chip","aria-pressed":L==="mcp",onClick:()=>x(w,L,"mcp"),children:"mcp"},void 0,!1,void 0,this),M("button",{type:"button",className:"chip","aria-pressed":L==="web",onClick:()=>x(w,L,"web"),children:"web"},void 0,!1,void 0,this),M("span",{className:"flex-1"},void 0,!1,void 0,this),M("span",{children:[W.length," ",n("archive.shown"),Y?` · ${Y.total} ${n("trace.recorded")}`:""]},void 0,!0,void 0,this),Y?.enabled&&Y.total>0&&M(YJ,{children:[M("button",{type:"button",disabled:B,onClick:()=>C(()=>g0.traces.prune(30)),className:"rounded border border-line px-2 py-1 transition-colors hover:border-ember hover:text-ember disabled:opacity-40",children:n("trace.prune")},void 0,!1,void 0,this),D==="all"?M("span",{className:"flex items-center gap-1",children:[M("button",{type:"button",disabled:B,onClick:()=>C(()=>g0.traces.clear()),className:"rounded bg-[#5c2320] px-2 py-1 text-[#f0928f]",children:n("trace.clearConfirm").replace("{n}",String(Y.total))},void 0,!1,void 0,this),M("button",{type:"button",onClick:()=>T(null),className:"rounded px-2 py-1 text-dim hover:text-ink",children:n("compose.cancel")},void 0,!1,void 0,this)]},void 0,!0,void 0,this):M("button",{type:"button",disabled:B,onClick:()=>T("all"),className:"rounded border border-line px-2 py-1 transition-colors hover:border-[#f0928f] hover:text-[#f0928f] disabled:opacity-40",children:n("trace.clear")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),children:[z&&M("p",{role:"alert",className:"mb-3 rounded-lg border border-[#5c2320] bg-[#2a1614] px-3 py-2 text-sm text-[#f0928f]",children:z},void 0,!1,void 0,this),H&&M(Bk,{timeline:H},void 0,!1,void 0,this),G&&M(zk,{cloud:G,onPick:(E)=>F(E)},void 0,!1,void 0,this),!W.length?M("p",{className:"py-14 text-center text-sm text-dim",children:n("trace.empty")},void 0,!1,void 0,this):M("div",{className:"overflow-x-auto",children:M("ul",{className:"flex flex-col gap-1",children:W.map((E)=>M("li",{className:"rounded-lg border border-line px-3 py-2 transition-colors hover:border-line-bright",children:[M("button",{type:"button",onClick:()=>$(N===E.id?null:E.id),className:"meta flex w-full flex-wrap items-baseline gap-x-2.5 gap-y-1 text-left","aria-expanded":N===E.id,children:[M("span",{className:"tabular-nums text-faint",children:fQ(E.at)},void 0,!1,void 0,this),M("span",{className:"text-faint",children:[E.surface,"/",E.kind]},void 0,!0,void 0,this),M("span",{className:"text-ink",children:E.tool},void 0,!1,void 0,this),E.subject&&M("span",{className:"text-ember",children:["“",E.subject,"”"]},void 0,!0,void 0,this),M("span",{className:"flex-1"},void 0,!1,void 0,this),E.mode&&M("span",{children:E.mode},void 0,!1,void 0,this),M("span",{className:`tabular-nums ${E.hits===0?kL.empty:""}`,children:[E.hits," ",n("trace.hits")]},void 0,!0,void 0,this),M("span",{className:"tabular-nums",children:[E.durationMs,"ms"]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),E.outcome==="error"&&E.error&&M("p",{className:`meta mt-1 ${kL.error}`,children:E.error},void 0,!1,void 0,this),N===E.id&&M("div",{className:"meta mt-2 flex flex-col gap-1.5 border-t border-line pt-2",children:[E.input&&M("pre",{className:"overflow-x-auto whitespace-pre-wrap break-all text-faint",children:E.input},void 0,!1,void 0,this),E.result&&M("pre",{className:"overflow-x-auto whitespace-pre-wrap break-all text-faint",children:E.result},void 0,!1,void 0,this),E.subject&&M("button",{type:"button",disabled:B,onClick:()=>C(()=>g0.traces.forget(E.subject)),className:"self-start rounded border border-line px-2 py-1 transition-colors hover:border-[#f0928f] hover:text-[#f0928f]",children:n("trace.forget").replace("{k}",E.subject)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},E.id,!0,void 0,this))},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}W7();W7();var o9=[{id:"slate",label:"Slate",note:"Cool and quiet. No warm cast.",swatch:["#101418","#5eb0c9"],dark:!0},{id:"ember",label:"Ember",note:"The original — warm charcoal, lamplit.",swatch:["#14120f","#d8853a"],dark:!0},{id:"moss",label:"Moss",note:"Green-black. Terminal lineage, no glare.",swatch:["#0f1411","#7fc98d"],dark:!0},{id:"iris",label:"Iris",note:"Near-black and violet.",swatch:["#121016","#a98ae0"],dark:!0},{id:"mono",label:"Mono",note:"No hue at all. Contrast does the work.",swatch:["#111111","#e8e8e8"],dark:!0},{id:"paper",label:"Paper",note:"The light one. Warm ground, ink on it.",swatch:["#f6f3ec","#a2591f"],dark:!1}],VL="slate",aq="arra-memory-theme";function hH(J){return Boolean(J)&&o9.some((Z)=>Z.id===J)}function TL(){try{let J=new URLSearchParams(window.location.search).get("theme");if(hH(J))return J;let Z=window.localStorage.getItem(aq);if(hH(Z))return Z}catch{}return PL}var PL=VL;function EL(J){if(!hH(J??null))return;PL=J;let Z=!1;try{Z=hH(window.localStorage.getItem(aq))||new URLSearchParams(window.location.search).has("theme")}catch{}if(!Z&&rq!==J)SL(J)}var rq=typeof window>"u"?VL:TL(),oq=new Set;function SL(J){let Z=o9.find((W)=>W.id===J)??o9[0];rq=Z.id;try{document.documentElement.setAttribute("data-theme",Z.id),window.localStorage.setItem(aq,Z.id)}catch{}for(let W of oq)W(Z.id)}function jL(){try{document.documentElement.setAttribute("data-theme",TL())}catch{}}function gH(){let[J,Z]=G0(rq);return c0(()=>{return oq.add(Z),()=>{oq.delete(Z)}},[]),[J,SL]}function fL(){let[J,Z]=gH();return M("section",{className:"mb-8 flex flex-col gap-6",children:M("div",{children:[M("p",{className:"eyebrow mb-2",children:n("settings.theme")},void 0,!1,void 0,this),M("div",{className:"flex flex-wrap gap-2",children:o9.map((W)=>{let Q=W.id===J;return M("button",{type:"button",onClick:()=>Z(W.id),"aria-pressed":Q,title:W.note,className:"flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors",style:{borderColor:Q?"var(--color-ember)":"var(--color-line)",background:Q?"var(--color-ember-soft)":"transparent"},children:[M("span",{"aria-hidden":"true",className:"flex size-6 shrink-0 items-center justify-center rounded-full border",style:{background:W.swatch[0],borderColor:"var(--color-line-bright)"},children:M("span",{className:"size-2.5 rounded-full",style:{background:W.swatch[1]}},void 0,!1,void 0,this)},void 0,!1,void 0,this),M("span",{className:"min-w-0",children:[M("span",{className:"block text-sm",style:{color:Q?"var(--color-ember)":"var(--color-ink)"},children:W.label},void 0,!1,void 0,this),M("span",{className:"meta block truncate",children:W.note},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},W.id,!0,void 0,this)})},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this)}W7();function bL(){let[J,Z]=G0(null),[W,Q]=G0({}),[Y,X]=G0({}),[H,U]=G0({}),[G,K]=G0(null),[O,F]=G0(!1),[q,R]=G0(null),[L,w]=G0(null),N=y7(async()=>{F(!0);try{Z(await g0.settings.get()),Q({}),R(null)}catch(D){R(D instanceof Error?D.message:"Could not load settings.")}finally{F(!1)}},[]);c0(()=>{N()},[N]),c0(()=>{g0.access.clients().then((D)=>K(D.clients)).catch(()=>K([]))},[]);async function $(D){let T=!Y[D];if(T&&!(D in H))try{let A=await g0.settings.reveal(D);U((C)=>({...C,[D]:A.value}))}catch{return}X((A)=>({...A,[D]:T}))}async function B(){if(!confirm(n("settings.regen.confirm")))return;try{let D=await g0.settings.regenerate("api_token");U((T)=>({...T,api_token:D.value})),X((T)=>({...T,api_token:!0})),w(n("settings.regen.title")),Z(await g0.settings.get())}catch(D){R(D instanceof Error?D.message:"Could not regenerate.")}}async function _(D){if(!confirm(n("access.revoke.confirm")))return;await g0.access.revoke(D).catch(()=>{});let T=await g0.access.clients().catch(()=>({clients:[]}));K(T.clients)}let z=Object.keys(W).length>0;async function P(){if(!z)return;F(!0),w(null);try{let D=await g0.settings.patch(W);Z(D),Q({});let T=[];if(D.written?.length)T.push(`Saved ${D.written.length}.`);if(D.ignored?.length)T.push(`Ignored ${D.ignored.join(", ")} — ${D.ignoredReason}.`);if(D.restartRequired)T.push("Restart the add-on for this to take effect.");w(T.join(" ")||"Nothing changed."),R(null)}catch(D){R(D instanceof Error?D.message:"Could not save.")}finally{F(!1)}}return M("details",{className:"server-options",children:[M("summary",{children:[M("span",{children:n("settings.options.title")},void 0,!1,void 0,this),M("span",{className:"meta",children:[J?`${J.settings.filter((D)=>D.value!=="").length}/${J.settings.length}`:"…",J&&!J.writable?` · ${n("settings.readonly")}`:""]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),M("p",{className:"meta mb-1",children:n("settings.options.subtitle")},void 0,!1,void 0,this),q&&M("p",{className:"error",children:q},void 0,!1,void 0,this),L&&M("p",{className:"note",children:L},void 0,!1,void 0,this),J&&!J.writable&&M("p",{className:"note warn",children:J.reason},void 0,!1,void 0,this),J?.writable&&M("div",{className:"row gap-1 mb-1",children:[M("button",{className:"act",disabled:!z||O,onClick:()=>void P(),children:O?"…":n("settings.save")},void 0,!1,void 0,this),z&&M("button",{className:"act",disabled:O,onClick:()=>Q({}),children:n("settings.revert")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("div",{className:"access-block",children:[M("h4",{children:n("access.title")},void 0,!1,void 0,this),M("p",{className:"meta",children:n("access.subtitle")},void 0,!1,void 0,this),G===null?null:G.length===0?M("p",{className:"meta",children:n("access.none")},void 0,!1,void 0,this):M("ul",{className:"access-list",children:G.map((D)=>{let T=D.clientName||"",A=/claude code/i.test(T)?"Claude Code":/codex/i.test(T)?"Codex":/^claude$/i.test(T.trim())?"claude.ai":"other";return M("li",{className:D.activeTokens===0?"inactive":void 0,children:[M("span",{className:"kind",children:A},void 0,!1,void 0,this),M("span",{className:"mono",children:T||D.clientId.slice(0,12)+"…"},void 0,!1,void 0,this),M("span",{className:"meta num",children:[D.activeTokens," ",n("access.tokens")]},void 0,!0,void 0,this),M("span",{className:"meta",children:[D.scope??"—"," · ",D.createdAt.slice(0,10)]},void 0,!0,void 0,this),M("button",{className:"act-danger",onClick:()=>void _(D.clientId),children:n("access.revoke")},void 0,!1,void 0,this)]},D.clientId,!0,void 0,this)})},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("div",{className:"settings-form",children:J?.settings.map((D)=>M(Ak,{field:D,editable:Boolean(J.writable)&&!D.pinnedByEnv,value:W[D.key]??(D.secret?"":D.value),revealed:Boolean(Y[D.key]),revealedValue:H[D.key],onReveal:()=>void $(D.key),onChange:(T)=>Q((A)=>({...A,[D.key]:T})),onRegenerate:D.key==="api_token"&&J.writable&&!D.pinnedByEnv?B:void 0,dirty:D.key in W},D.key,!1,void 0,this))},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function Ak({field:J,editable:Z,value:W,revealed:Q,revealedValue:Y,onReveal:X,onChange:H,onRegenerate:U,dirty:G}){let K=J.value!=="";return M("label",{className:`setting${Z?"":" locked"}${G?" dirty":""}`,children:[M("span",{className:"setting-key",children:[J.key,J.pinnedByEnv&&M("em",{className:"pin",title:n("settings.pinned.title"),children:n("settings.pinned")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("span",{className:"setting-input",children:[M("input",{type:J.secret&&!Q?"password":"text",value:J.secret&&Q&&!G?Y??"":W,disabled:!Z,spellCheck:!1,autoComplete:"off",placeholder:J.secret?K?J.value:n("settings.unset"):n("settings.unset"),onChange:(O)=>H(O.currentTarget.value)},void 0,!1,void 0,this),J.secret&&M("button",{type:"button",className:"act",onClick:X,children:Q?n("settings.hide"):n("settings.show")},void 0,!1,void 0,this),U&&M("button",{type:"button",className:"act",onClick:U,title:n("settings.regen.title"),children:n("settings.regen")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("span",{className:"setting-meta",children:[n(`settings.source.${J.source}`),J.restartRequired&&M(YJ,{children:[" · ",n("settings.restart")]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}function vL({onClose:J,nav:Z}){let[W,Q]=G0([]),[Y,X]=G0([]),[H,U]=G0(!1),[G,K]=G0(null),O=y7(async()=>{U(!0);try{let w=await g0.tools.list();Q(w.tools),X(w.locked),K(null)}catch(w){K(w instanceof Error?w.message:"Could not load the tool list.")}finally{U(!1)}},[]);c0(()=>{O()},[O]);let F=async(w)=>{let N=W;Q(($)=>$.map((B)=>B.name===w.name?{...B,disabled:!B.disabled}:B));try{await g0.tools.setDisabled(w.name,!w.disabled)}catch($){Q(N),K($ instanceof Error?$.message:"That tool could not be changed.")}},q=W.filter((w)=>!w.generated),R=W.filter((w)=>w.generated),L=W.filter((w)=>w.disabled).length;return M(R6,{eyebrow:n("nav.settings"),title:`${W.length} tools${L?`, ${L} off`:""}`,subtitle:"A tool that is off is hidden from clients and refused if called anyway. Nothing is deleted — switch it back on and it returns.",onClose:J,nav:Z,actions:L>0?M("button",{type:"button",disabled:H,onClick:async()=>{await g0.tools.enableAll(),await O()},className:"meta rounded border border-line px-2 py-1 transition-colors hover:border-ember hover:text-ember",children:"turn everything back on"},void 0,!1,void 0,this):void 0,children:[M(fL,{},void 0,!1,void 0,this),M(bL,{},void 0,!1,void 0,this),M(YJ,{children:[G&&M("p",{role:"alert",className:"mb-3 rounded-lg border border-[#5c2320] bg-[#2a1614] px-3 py-2 text-sm text-[#f0928f]",children:G},void 0,!1,void 0,this),M(yL,{title:"Built in",note:"Defined in the source. The same on every install.",tools:q,locked:Y,onToggle:F},void 0,!1,void 0,this),M(yL,{title:"Generated from the corpus",note:"One per project that has memories, plus the time windows. These appear and disappear as the archive changes.",tools:R,locked:Y,onToggle:F},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}function yL({title:J,note:Z,tools:W,locked:Q,onToggle:Y}){if(W.length===0)return null;return M("section",{className:"mb-6",children:[M("h3",{className:"eyebrow mb-1",children:[J," ",M("span",{className:"opacity-60",children:W.length},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("p",{className:"mb-3 text-xs text-faint",children:Z},void 0,!1,void 0,this),M("ul",{className:"flex flex-col gap-1.5",children:W.map((X)=>{let H=Q.includes(X.name);return M("li",{className:"flex items-start gap-3 rounded-lg border border-line px-3 py-2.5",style:{opacity:X.disabled?0.45:1},children:[M("div",{className:"min-w-0 flex-1",children:[M("div",{className:"flex flex-wrap items-center gap-2",children:[M("code",{className:"font-mono text-[0.82rem] text-ink",children:X.name},void 0,!1,void 0,this),X.destructive&&M("span",{className:"rounded bg-[#3a1d1b] px-1.5 py-0.5 font-mono text-[0.62rem] text-[#f0928f]",children:"destructive"},void 0,!1,void 0,this),X.project&&M("span",{className:"meta truncate",children:X.project},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("p",{className:"mt-1 text-xs leading-relaxed text-dim",children:X.description},void 0,!1,void 0,this)]},void 0,!0,void 0,this),H?M("span",{className:"meta shrink-0 pt-1",title:"Needed to discover the corpus",children:"always on"},void 0,!1,void 0,this):M("button",{type:"button",role:"switch","aria-checked":!X.disabled,"aria-label":`${X.disabled?"Enable":"Disable"} ${X.name}`,onClick:()=>Y(X),className:"mt-0.5 h-5 w-9 shrink-0 rounded-full border transition-colors",style:{borderColor:X.disabled?"var(--color-line)":"var(--color-ember)",background:X.disabled?"transparent":"var(--color-ember-soft)"},children:M("span",{"aria-hidden":"true",className:"block size-3.5 rounded-full transition-transform",style:{background:X.disabled?"var(--color-line-bright)":"var(--color-ember)",transform:X.disabled?"translateX(3px)":"translateX(17px)"}},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},X.name,!0,void 0,this)})},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}W7();function hL({onClose:J,nav:Z,onFilter:W}){let[Q,Y]=G0([]),[X,H]=G0(0),[U,G]=G0(null),[K,O]=G0(!0),[F,q]=G0(null);c0(()=>{g0.workspaces.list().then((L)=>{Y(L.workspaces),H(L.unassigned),q(null)}).catch((L)=>q(L instanceof Error?L.message:"Could not load workspaces.")).finally(()=>O(!1))},[]);let R=Q.reduce((L,w)=>L+w.count,0)+X;return M(R6,{eyebrow:"Arra Memory",title:"Workspaces",subtitle:"A workspace is the tier above project — one workspace holds many projects and many agents. Nothing here is configured: a workspace exists because a memory names it, and disappears when its last memory does.",onClose:J,nav:Z,children:[F&&M("p",{role:"alert",className:"mb-4 rounded-lg border border-[#5c2320] bg-[#2a1614] px-3 py-2 text-sm text-[#f0928f]",children:F},void 0,!1,void 0,this),K?M("p",{className:"meta",children:"reading the archive…"},void 0,!1,void 0,this):Q.length===0&&X===0?M(wk,{},void 0,!1,void 0,this):M(YJ,{children:[M("p",{className:"meta mb-4",children:[Q.length," workspace",Q.length===1?"":"s"," ·"," ",M("span",{className:"tabular-nums",children:R},void 0,!1,void 0,this)," memories"]},void 0,!0,void 0,this),M("div",{className:"flex flex-col gap-2",children:Q.map((L)=>M(_k,{facet:L,open:U===L.workspace,onToggle:()=>G(U===L.workspace?null:L.workspace),onFilter:W},L.workspace,!1,void 0,this))},void 0,!1,void 0,this),X>0&&M("div",{className:"mt-4 rounded-xl border border-dashed border-line px-4 py-3",children:[M("p",{className:"text-sm text-dim",children:[M("span",{className:"tabular-nums text-ink",children:X},void 0,!1,void 0,this)," memor",X===1?"y is":"ies are"," filed under no workspace — everything written before workspaces existed, plus anything saved without one."]},void 0,!0,void 0,this),M("p",{className:"meta mt-1.5",children:"They are not a workspace and have no page of their own. Clear the workspace filter in the archive to see them alongside everything else."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}function _k({facet:J,open:Z,onToggle:W,onFilter:Q}){return M("article",{className:"rounded-xl border border-line bg-panel transition-colors hover:border-line-bright",children:[M("div",{className:"flex items-start gap-3 p-4",children:[M("button",{type:"button",onClick:W,"aria-expanded":Z,className:"min-w-0 flex-1 text-left",children:[M("h3",{className:"truncate text-[0.98rem] font-semibold leading-snug text-ink",children:J.workspace},void 0,!1,void 0,this),M("p",{className:"meta mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1",children:[M("span",{className:"tabular-nums",children:[J.count," memories"]},void 0,!0,void 0,this),M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{className:"tabular-nums",children:[J.projects," project",J.projects===1?"":"s"]},void 0,!0,void 0,this),M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{className:"tabular-nums",children:[J.agents," agent",J.agents===1?"":"s"]},void 0,!0,void 0,this),M("span",{"aria-hidden":"true",children:"·"},void 0,!1,void 0,this),M("span",{title:J.latest,children:["last ",J.latest.slice(0,10)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),M("div",{className:"flex shrink-0 items-center gap-1.5",children:[M("button",{type:"button",onClick:()=>Q({workspace:J.workspace}),className:"rounded-lg border border-line px-2.5 py-1 font-mono text-[0.68rem] text-dim transition-colors hover:border-ember hover:text-ember",children:"open in archive"},void 0,!1,void 0,this),M("button",{type:"button",onClick:W,"aria-label":Z?"Collapse":"Expand",className:"rounded p-1.5 text-faint transition-colors hover:text-ink",children:M("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",style:{transform:Z?"rotate(180deg)":void 0},children:M("path",{d:"m6 9 6 6 6-6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),Z&&M(Ik,{workspace:J.workspace,onFilter:Q},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function Ik({workspace:J,onFilter:Z}){let[W,Q]=G0(null),[Y,X]=G0(null);if(c0(()=>{let H=!0;return g0.workspaces.get(J).then((U)=>H&&Q(U)).catch((U)=>H&&X(U instanceof Error?U.message:"Could not open that workspace.")),()=>{H=!1}},[J]),Y)return M("p",{role:"alert",className:"border-t border-line px-4 py-3 text-sm text-[#f0928f]",children:Y},void 0,!1,void 0,this);if(!W)return M("p",{className:"meta border-t border-line px-4 py-3",children:"opening…"},void 0,!1,void 0,this);return M("div",{className:"grid gap-5 border-t border-line px-4 py-4 sm:grid-cols-2",children:[M(xL,{label:"Projects",empty:"No memories here carry a project.",items:W.projects.map((H)=>({key:H.project,label:H.project,count:H.count,onSelect:()=>Z({workspace:J,project:H.project})}))},void 0,!1,void 0,this),M(xL,{label:"Agents",empty:"Nothing here records who wrote it.",items:W.agents.map((H)=>({key:H.agent,label:H.agent,count:H.count,onSelect:()=>Z({workspace:J,createdBy:H.agent})}))},void 0,!1,void 0,this),W.tags.length>0&&M("div",{className:"sm:col-span-2",children:[M("p",{className:"eyebrow mb-2",children:"Tags used here"},void 0,!1,void 0,this),M("ul",{className:"flex flex-wrap gap-1.5",children:W.tags.slice(0,24).map((H)=>M("li",{className:"rounded border border-line px-1.5 py-0.5 font-mono text-[0.68rem] text-dim",children:[H.tag,M("span",{className:"ml-1 opacity-50 tabular-nums",children:H.count},void 0,!1,void 0,this)]},H.tag,!0,void 0,this))},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}function xL({label:J,empty:Z,items:W}){return M("div",{children:[M("p",{className:"eyebrow mb-2",children:J},void 0,!1,void 0,this),W.length===0?M("p",{className:"text-sm text-faint",children:Z},void 0,!1,void 0,this):M("ul",{className:"flex flex-col gap-1",children:W.map((Q)=>M("li",{children:M("button",{type:"button",onClick:Q.onSelect,className:"flex w-full items-baseline justify-between gap-3 rounded px-1.5 py-1 text-left text-sm text-dim transition-colors hover:bg-ember-soft hover:text-ember",children:[M("span",{className:"truncate",children:Q.label},void 0,!1,void 0,this),M("span",{className:"shrink-0 font-mono text-[0.68rem] tabular-nums opacity-60",children:Q.count},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Q.key,!1,void 0,this))},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function wk(){return M("div",{className:"rounded-xl border border-dashed border-line py-16 text-center",children:[M("p",{className:"mb-1.5 text-ink",children:"No memories yet."},void 0,!1,void 0,this),M("p",{className:"mx-auto max-w-md text-sm text-dim",children:["Workspaces appear on their own. Save a memory with a workspace — from here, or by passing ",M("code",{className:"font-mono text-ember",children:"workspace"},void 0,!1,void 0,this)," to"," ",M("code",{className:"font-mono text-ember",children:"remember"},void 0,!1,void 0,this)," over MCP — and it will be listed here."]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}W7();var Dk=["memory","atlas","workspaces","settings","tools","log","traces"],kk={archive:"memory"},wW={view:"memory",query:"",kind:[],workspace:[],project:[],createdBy:[],tag:[]};function gL(J){let Z=J.replace(/^#\/?/,""),[W,Q]=Z.split("?"),Y=new URLSearchParams(Q??"");return{view:Dk.includes(W)?W:kk[W??""]??"memory",query:Y.get("q")??"",kind:Y.getAll("kind"),workspace:Y.getAll("workspace"),project:Y.getAll("project"),createdBy:Y.getAll("agent"),tag:Y.getAll("tag")}}function tq(J){let Z=new URLSearchParams;if(J.query)Z.set("q",J.query);for(let Q of J.kind)Z.append("kind",Q);for(let Q of J.workspace)Z.append("workspace",Q);for(let Q of J.project)Z.append("project",Q);for(let Q of J.createdBy)Z.append("agent",Q);for(let Q of J.tag)Z.append("tag",Q);let W=Z.toString();return`#/${J.view}${W?`?${W}`:""}`}function mL(){let[J,Z]=G0(()=>gL(typeof window>"u"?"":window.location.hash));return c0(()=>{let Q=()=>Z(gL(window.location.hash));return window.addEventListener("hashchange",Q),()=>window.removeEventListener("hashchange",Q)},[]),c0(()=>{if(!window.location.hash)window.history.replaceState(null,"",tq(J))},[]),[J,(Q)=>{let Y=tq(Q);if(Y!==tq(J))if(Q.view!==J.view)window.history.pushState(null,"",Y);else window.history.replaceState(null,"",Y);Z(Q)}]}var eq=["learn","enlighten","retro","artifact"],pL={kind:[],workspace:[],project:[],createdBy:[]};function J$(){let[J,Z]=G0("checking"),[W,Q]=G0([]),[Y,X]=G0(null),[H,U]=mL(),{view:G,query:K}=H,[O,F]=WM(),[q,R]=gH(),L={kind:H.kind,workspace:H.workspace,project:H.project,createdBy:H.createdBy},w=(g)=>U(g==="memory"?{...H,view:g}:{...wW,view:g}),N=(g)=>U({...H,query:g}),$=(g)=>U({...H,...g.scope,tag:g.tags}),[B,_]=G0({kinds:[],workspaces:[],unassigned:0,projects:[],agents:[],tags:[],total:0}),[z,P]=G0(!1),[D,T]=G0(null),[A,C]=G0(null),[x,E]=G0(!1),[u,e]=G0(null),b=HM();c0(()=>{g0.health().then((g)=>{if(e(g),JM(g.defaults?.language),EL(g.defaults?.theme),g.name)document.title=g.name,tF(g.name)}).catch(()=>{})},[]),c0(()=>{g0.session.check().then((g)=>Z(g.authenticated?"ready":"locked")).catch(()=>Z("locked"))},[]);let c=y7(async()=>{P(!0);try{let g=K.trim().length>0,[Y0,O0,_0]=await Promise.all([g?g0.memories.recall({query:K,...L,tag:H.tag,limit:100}):g0.memories.search({q:K,...L,tag:H.tag,limit:100}),g0.stats(),g0.facets()]);C(g?Y0.effectiveMode??null:null),Q(Y0.memories),X(O0.stats),_(_0),T(null)}catch(g){if(g instanceof jQ&&g.status===401){Z("locked");return}T(g instanceof Error?g.message:n("error.load"))}finally{P(!1)}},[K,H.kind,H.workspace,H.project,H.createdBy,H.tag]);if(c0(()=>{if(J!=="ready")return;let g=setTimeout(c,K?180:0);return()=>clearTimeout(g)},[J,c,K]),c0(()=>{if(J!=="ready")return;let g=()=>{if(document.visibilityState==="visible")c()};return window.addEventListener("focus",g),document.addEventListener("visibilitychange",g),()=>{window.removeEventListener("focus",g),document.removeEventListener("visibilitychange",g)}},[J,c]),J==="checking")return M(Tk,{},void 0,!1,void 0,this);if(J==="locked")return M(Pk,{onOpen:()=>Z("ready")},void 0,!1,void 0,this);let l=M(AL,{themes:{current:q,options:o9,onSelect:R},lang:{label:O==="th"?"EN":"ไทย",title:n("lang.label"),onSelect:()=>F(O==="th"?"en":"th")},items:[{label:n("nav.archive"),weight:10,active:G==="memory",onSelect:()=>w("memory")},{label:n("nav.atlas"),title:n("nav.atlas.title"),weight:20,active:G==="atlas",onSelect:()=>w("atlas")},...u?.features.searchLog?[{label:n("nav.searchLog"),title:n("nav.searchLog.title"),weight:30,active:G==="log",onSelect:()=>w("log")}]:[],{label:n("nav.traces"),title:n("nav.traces.title"),weight:40,active:G==="traces",onSelect:()=>w("traces")},{label:n("nav.settings"),title:n("nav.settings.title"),weight:50,active:G==="settings"||G==="tools",onSelect:()=>w("settings")}],session:{label:n("nav.lock"),title:n("nav.lock.title"),danger:!0,onSelect:()=>void g0.session.close().finally(()=>{Z("locked"),Q([])})}},void 0,!1,void 0,this),h=G==="atlas"?M(wL,{onClose:()=>w("memory"),nav:l,scope:L,onOpenMemory:(g)=>{U({...wW,view:"memory",query:g})}},void 0,!1,void 0,this):G==="workspaces"?M(hL,{onClose:()=>w("memory"),nav:l,onFilter:(g)=>{U({...wW,view:"memory",workspace:g.workspace?[g.workspace]:[],project:g.project?[g.project]:[],createdBy:g.createdBy?[g.createdBy]:[]})}},void 0,!1,void 0,this):G==="settings"||G==="tools"?M(vL,{onClose:()=>w("memory"),nav:l},void 0,!1,void 0,this):G==="traces"?M(CL,{onClose:()=>w("memory"),nav:l},void 0,!1,void 0,this):G==="log"?M(DL,{onClose:()=>w("memory"),nav:l,onReplay:(g)=>{U({...wW,view:"memory",query:g.query,kind:g.kind?[g.kind]:[],workspace:g.workspace?[g.workspace]:[],project:g.project?[g.project]:[]})}},void 0,!1,void 0,this):M(Ck,{nav:l,query:K,onQuery:N,searchRef:b,scope:L,tags:H.tag,onFilters:$,facets:B,stats:Y,memories:W,loading:z,error:D,mode:A,onCompose:()=>E(!0),onFollow:(g)=>U({...wW,view:"memory",query:g}),onForget:async(g)=>{let Y0=W;Q((O0)=>O0.filter((_0)=>_0.id!==g));try{await g0.memories.remove(g),c()}catch{Q(Y0),T(n("error.forget"))}}},void 0,!1,void 0,this);return M("div",{className:"min-h-screen",children:[h,x&&M(Sk,{scope:L,onClose:()=>E(!1),onSaved:()=>{E(!1),c()}},void 0,!1,void 0,this),M(Vk,{health:u},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function Ck({nav:J,query:Z,onQuery:W,searchRef:Q,scope:Y,tags:X,onFilters:H,facets:U,stats:G,memories:K,loading:O,error:F,mode:q,onCompose:R,onForget:L,onFollow:w}){let N=X.length>0||Y.kind.length>0||Y.workspace.length>0||Y.project.length>0||Y.createdBy.length>0,$=()=>H({scope:pL,tags:[]});return M(R6,{eyebrow:yK().toUpperCase(),title:n("archive.title"),nav:J,onClose:()=>{},actions:M(YJ,{children:[M("label",{className:"sr-only",htmlFor:"search",children:n("archive.searchLabel")},void 0,!1,void 0,this),M("div",{className:"flex items-stretch gap-2",children:[M("div",{className:"relative flex-1",children:[M("svg",{className:"pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[M("circle",{cx:"11",cy:"11",r:"7",stroke:"currentColor",strokeWidth:"1.8"},void 0,!1,void 0,this),M("path",{d:"m20 20-3.5-3.5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("input",{id:"search",ref:Q,value:Z,onChange:(B)=>W(B.target.value),placeholder:n("archive.search"),className:"w-full rounded-lg border border-line bg-panel py-2.5 pl-10 pr-16 text-ink placeholder:text-faint focus:border-transparent"},void 0,!1,void 0,this),M("kbd",{className:"meta pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-line px-1.5 py-0.5",children:"/"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("button",{type:"button",onClick:R,className:"shrink-0 rounded-lg bg-ember px-4 text-sm font-semibold text-[#17130e] transition hover:brightness-110",children:["+ ",n("nav.remember")]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),M(QM,{facets:U,scope:Y,tags:X,onChange:H,onClear:$},void 0,!1,void 0,this),M("p",{className:"meta mt-3",children:O?n("archive.searching"):`${K.length} ${n("archive.shown")}${q?` · ${q==="keyword"?n("search.byKeyword"):n("search.byMeaning")}`:""}${G?` · ${G.total} ${n("archive.inCorpus")}`:""}`},void 0,!1,void 0,this)]},void 0,!0,void 0,this),children:[F&&M("p",{role:"alert",className:"mb-4 rounded-lg border border-[#5c2320] bg-[#2a1614] px-3 py-2 text-sm text-[#f0928f]",children:F},void 0,!1,void 0,this),K.length===0&&!O?M(Ek,{filtered:Boolean(Z)||N,scoped:N,onClearScope:$,onCompose:R},void 0,!1,void 0,this):M("div",{className:"flex flex-col gap-3",children:K.map((B)=>M(XM,{memory:B,query:Z,onDelete:L,onFollow:w},B.id,!1,void 0,this))},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function Vk({health:J}){if(!J)return null;return M("footer",{className:"mx-auto max-w-4xl px-5 pb-8",children:M("p",{className:"meta border-t border-line pt-3",children:[J.name??"Arra Memory"," v",J.version,J.features.semantic&&` · semantic (${J.features.embeddingModel})`,J.features.replica&&" · replicated",J.features.searchLog&&" · logging searches"]},void 0,!0,void 0,this)},void 0,!1,void 0,this)}function Tk(){return M("div",{className:"grid min-h-screen place-items-center",children:M("p",{className:"eyebrow",children:n("lock.splash")},void 0,!1,void 0,this)},void 0,!1,void 0,this)}function Pk({onOpen:J}){let[Z,W]=G0(""),[Q,Y]=G0(null),[X,H]=G0(!1);return M("div",{className:"lamp grid min-h-screen place-items-center px-5",children:M("form",{onSubmit:async(U)=>{U.preventDefault(),H(!0),Y(null);try{await g0.session.open(Z),J()}catch(G){let K=G instanceof jQ?G.status:0;Y(K===401?n("lock.wrong"):`${n("lock.failed")} (${K||"network"})`)}finally{H(!1)}},className:"w-full max-w-sm rounded-2xl border border-line bg-panel p-8",children:[M("p",{className:"eyebrow mb-4",style:{color:"var(--color-ember)"},children:yK()},void 0,!1,void 0,this),M("h1",{className:"mb-2 text-xl font-semibold tracking-tight",children:n("lock.title")},void 0,!1,void 0,this),M("p",{className:"mb-6 text-sm text-dim",children:n("lock.hint")},void 0,!1,void 0,this),M("label",{htmlFor:"passphrase",className:"eyebrow mb-2 block",children:n("lock.field")},void 0,!1,void 0,this),M("input",{id:"passphrase",type:"password",autoComplete:"current-password",autoFocus:!0,required:!0,value:Z,onChange:(U)=>W(U.target.value),className:"w-full rounded-lg border border-line bg-ground px-3 py-2.5 text-ink"},void 0,!1,void 0,this),Q&&M("p",{role:"alert",className:"mt-3 text-sm text-[#f0928f]",children:Q},void 0,!1,void 0,this),M("button",{type:"submit",disabled:X,className:"mt-5 w-full rounded-lg bg-ember py-2.5 font-semibold text-[#17130e] transition hover:brightness-110 disabled:opacity-60",children:X?n("lock.opening"):n("lock.submit")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this)}function Ek({filtered:J,scoped:Z,onClearScope:W,onCompose:Q}){return M("div",{className:"rounded-xl border border-dashed border-line py-16 text-center",children:[M("p",{className:"mb-1.5 text-ink",children:J?n("empty.nothing"):n("empty.archive")},void 0,!1,void 0,this),M("p",{className:"mx-auto mb-5 max-w-sm text-sm text-dim",children:J?n("empty.filteredHint"):n("empty.emptyHint")},void 0,!1,void 0,this),Z&&M("button",{type:"button",onClick:W,className:"rounded-lg border border-line px-3 py-1.5 text-sm text-dim transition hover:border-ember hover:text-ember",children:n("empty.searchAll")},void 0,!1,void 0,this),!J&&M("button",{type:"button",onClick:Q,className:"rounded-lg border border-line px-3 py-1.5 text-sm text-dim transition hover:border-ember hover:text-ember",children:n("empty.writeFirst")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}function Sk({scope:J,onClose:Z,onSaved:W}){let[Q,Y]=G0(""),[X,H]=G0(""),[U,G]=G0(eq[0]),[K,O]=G0(""),[F,q]=G0(J.workspace.length===1?J.workspace[0]:""),[R,L]=G0(J.project.length===1?J.project[0]:""),[w,N]=G0(3),[$,B]=G0(!1),[_,z]=G0(null);c0(()=>{let D=(T)=>T.key==="Escape"&&Z();return window.addEventListener("keydown",D),()=>window.removeEventListener("keydown",D)},[Z]);let P=VW(()=>K.split(",").map((D)=>D.trim()).filter(Boolean).slice(0,10),[K]);return M("div",{className:"fixed inset-0 z-50 grid place-items-center bg-black/70 p-5",onClick:(D)=>D.target===D.currentTarget&&Z(),children:M("form",{role:"dialog","aria-modal":"true","aria-label":n("compose.title"),onSubmit:async(D)=>{D.preventDefault(),B(!0),z(null);try{await g0.memories.create({content:Q,title:X.trim()||void 0,kind:U,tags:P,importance:w,workspace:F.trim()||void 0,project:R.trim()||void 0}),W()}catch(T){z(T instanceof Error?T.message:n("compose.saveFailed"))}finally{B(!1)}},className:"max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-line bg-panel p-6",children:[M("h2",{className:"mb-5 text-lg font-semibold tracking-tight",children:n("compose.title")},void 0,!1,void 0,this),M("label",{htmlFor:"content",className:"eyebrow mb-2 block",children:n("compose.content")},void 0,!1,void 0,this),M("textarea",{id:"content",required:!0,autoFocus:!0,rows:7,value:Q,onChange:(D)=>Y(D.target.value),placeholder:n("compose.contentHint"),className:"prose-memory w-full resize-y rounded-lg border border-line bg-ground px-3 py-2.5 placeholder:text-faint"},void 0,!1,void 0,this),M("div",{className:"mt-4 grid gap-4 sm:grid-cols-2",children:[M("div",{children:[M("label",{htmlFor:"title",className:"eyebrow mb-2 block",children:[n("compose.titleField")," ",M("span",{className:"normal-case tracking-normal",children:n("compose.optional")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("input",{id:"title",value:X,onChange:(D)=>H(D.target.value),placeholder:n("compose.titleHint"),className:"w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("div",{children:[M("label",{htmlFor:"kind",className:"eyebrow mb-2 block",children:n("compose.kind")},void 0,!1,void 0,this),M("div",{className:"flex flex-wrap items-center gap-1.5",children:[eq.map((D)=>M("button",{type:"button",className:"chip","aria-pressed":U===D,onClick:()=>G(D),style:U===D?void 0:{color:b6(D)},children:D},D,!1,void 0,this)),M("input",{id:"kind",value:U,onChange:(D)=>G(D.target.value),"aria-label":n("compose.kind"),className:"min-w-[6rem] flex-1 rounded-lg border border-line bg-ground px-2.5 py-1 text-sm text-ink placeholder:text-faint",placeholder:n("compose.kindOther")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),M("div",{children:[M("label",{htmlFor:"tags",className:"eyebrow mb-2 block",children:[n("compose.tags")," ",M("span",{className:"normal-case tracking-normal",children:n("compose.tagsHint")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("input",{id:"tags",value:K,onChange:(D)=>O(D.target.value),placeholder:"turso, haos",className:"w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("div",{children:[M("label",{htmlFor:"workspace",className:"eyebrow mb-2 block",children:["Workspace ",M("span",{className:"normal-case tracking-normal",children:"(optional)"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("input",{id:"workspace",value:F,onChange:(D)=>q(D.target.value),placeholder:"arra-memory-haos",className:"w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("div",{children:[M("label",{htmlFor:"project",className:"eyebrow mb-2 block",children:["Project ",M("span",{className:"normal-case tracking-normal",children:"(optional)"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("input",{id:"project",value:R,onChange:(D)=>L(D.target.value),placeholder:"oauth",className:"w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),M("div",{children:[M("label",{htmlFor:"importance",className:"eyebrow mb-2 block",children:[n("compose.importance")," — ",w]},void 0,!0,void 0,this),M("input",{id:"importance",type:"range",min:1,max:5,value:w,onChange:(D)=>N(Number(D.target.value)),className:"mt-2 w-full accent-[var(--color-ember)]"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),_&&M("p",{role:"alert",className:"mt-4 text-sm text-[#f0928f]",children:_},void 0,!1,void 0,this),M("div",{className:"mt-6 flex justify-end gap-2",children:[M("button",{type:"button",onClick:Z,className:"rounded-lg border border-line px-3 py-2 text-sm text-dim transition hover:text-ink",children:n("compose.cancel")},void 0,!1,void 0,this),M("button",{type:"submit",disabled:$||!Q.trim(),className:"rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-[#17130e] transition hover:brightness-110 disabled:opacity-50",children:$?n("compose.saving"):n("compose.save")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this)}jL();document.documentElement.setAttribute("lang",ZM());var uL=document.getElementById("root");if(!uL)throw Error("#root is missing from index.html");dL.createRoot(uL).render(M(uH,{children:M(J$,{},void 0,!1,void 0,this)},void 0,!1,void 0,this));

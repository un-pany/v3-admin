(window.webpackJsonp=window.webpackJsonp||[]).push([["permission-directive"],{"0aa9":function(e,t,c){"use strict";var n=c("1da1"),r=(c("96cf"),c("7a23")),o=c("0613"),a={style:{"margin-bottom":"15px"}},i=Object(r.createElementVNode)("p",null,"切换权限：",-1),d=Object(r.defineComponent)({emits:["change"],setup:function(e,t){var c=t.emit,d=Object(r.computed)((function(){return o.a.state.user.roles})),s=Object(r.ref)(d.value[0]);return Object(r.watch)(s,function(){var e=Object(n.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.dispatch("user/changeRoles",t);case 2:c("change");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),function(e,t){var c=Object(r.resolveComponent)("el-radio-button"),n=Object(r.resolveComponent)("el-radio-group");return Object(r.openBlock)(),Object(r.createElementBlock)("div",null,[Object(r.createElementVNode)("div",a," 你的权限： "+Object(r.toDisplayString)(Object(r.unref)(d)),1),i,Object(r.createVNode)(n,{modelValue:s.value,"onUpdate:modelValue":t[0]||(t[0]=function(e){return s.value=e})},{default:Object(r.withCtx)((function(){return[Object(r.createVNode)(c,{label:"editor"}),Object(r.createVNode)(c,{label:"admin"})]})),_:1},8,["modelValue"])])}}});t.a=d},"785ac":function(e,t,c){},"95d4":function(e,t,c){"use strict";c("785ac")},a99f:function(e,t,c){"use strict";c.r(t);var n=c("7a23"),r=(c("caad"),c("2532"),c("0613")),o=function(e){if(e&&e instanceof Array&&e.length>0){var t=r.a.state.user.roles,c=e;return t.some((function(e){return c.includes(e)}))}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1},a=c("0aa9");Object(n.pushScopeId)("data-v-a72aafd4");var i={class:"app-container"},d={class:"permission-alert"},s=Object(n.createTextVNode)(" Only "),l=Object(n.createTextVNode)("admin"),u=Object(n.createTextVNode)("can see this "),b=Object(n.createTextVNode)(" v-permission=\"['admin']\" "),O={class:"permission-alert"},j=Object(n.createTextVNode)(" Only "),m=Object(n.createTextVNode)("editor"),f=Object(n.createTextVNode)("can see this "),p=Object(n.createTextVNode)(" v-permission=\"['editor']\" "),h={class:"permission-alert"},V=Object(n.createTextVNode)(" Both "),v=Object(n.createTextVNode)("admin"),N=Object(n.createTextVNode)("and "),x=Object(n.createTextVNode)("editor"),C=Object(n.createTextVNode)("can see this "),k=Object(n.createTextVNode)(" v-permission=\"['admin','editor']\" "),w=Object(n.createTextVNode)(" 在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。 "),y=Object(n.createTextVNode)(" Admin can see this "),T=Object(n.createTextVNode)(" v-if=\"checkPermission(['admin'])\" "),_=Object(n.createTextVNode)(" Editor can see this "),g=Object(n.createTextVNode)(" v-if=\"checkPermission(['editor'])\" "),B=Object(n.createTextVNode)(" Both admin or editor can see this "),E=Object(n.createTextVNode)(" v-if=\"checkPermission(['admin','editor'])\" ");Object(n.popScopeId)();var D=Object(n.defineComponent)({setup:function(e){var t=Object(n.reactive)({key:1,checkPermission:o,handleRolesChange:function(){t.key++}});return function(e,c){var r=Object(n.resolveComponent)("el-tag"),D=Object(n.resolveComponent)("el-tab-pane"),R=Object(n.resolveComponent)("el-tabs"),P=Object(n.resolveDirective)("permission");return Object(n.openBlock)(),Object(n.createElementBlock)("div",i,[Object(n.createVNode)(a.a,{onChange:Object(n.unref)(t).handleRolesChange},null,8,["onChange"]),(Object(n.openBlock)(),Object(n.createElementBlock)("div",{key:Object(n.unref)(t).key,style:{"margin-top":"30px"}},[Object(n.createElementVNode)("div",null,[Object(n.withDirectives)(Object(n.createElementVNode)("span",d,[s,Object(n.createVNode)(r,{size:"small"},{default:Object(n.withCtx)((function(){return[l]})),_:1}),u],512),[[P,["admin"]]]),Object(n.withDirectives)(Object(n.createVNode)(r,{class:"permission-sourceCode",type:"info"},{default:Object(n.withCtx)((function(){return[b]})),_:1},512),[[P,["admin"]]])]),Object(n.createElementVNode)("div",null,[Object(n.withDirectives)(Object(n.createElementVNode)("span",O,[j,Object(n.createVNode)(r,{size:"small"},{default:Object(n.withCtx)((function(){return[m]})),_:1}),f],512),[[P,["editor"]]]),Object(n.withDirectives)(Object(n.createVNode)(r,{class:"permission-sourceCode",type:"info"},{default:Object(n.withCtx)((function(){return[p]})),_:1},512),[[P,["editor"]]])]),Object(n.createElementVNode)("div",null,[Object(n.withDirectives)(Object(n.createElementVNode)("span",h,[V,Object(n.createVNode)(r,{size:"small"},{default:Object(n.withCtx)((function(){return[v]})),_:1}),N,Object(n.createVNode)(r,{size:"small"},{default:Object(n.withCtx)((function(){return[x]})),_:1}),C],512),[[P,["admin","editor"]]]),Object(n.withDirectives)(Object(n.createVNode)(r,{class:"permission-sourceCode",type:"info"},{default:Object(n.withCtx)((function(){return[k]})),_:1},512),[[P,["admin","editor"]]])])])),(Object(n.openBlock)(),Object(n.createElementBlock)("div",{key:"checkPermission"+Object(n.unref)(t).key,style:{"margin-top":"60px"}},[Object(n.createVNode)(r,{type:"info"},{default:Object(n.withCtx)((function(){return[w]})),_:1}),Object(n.createVNode)(R,{type:"border-card",style:{width:"550px","margin-top":"60px"}},{default:Object(n.withCtx)((function(){return[Object(n.unref)(o)(["admin"])?(Object(n.openBlock)(),Object(n.createBlock)(D,{key:0,label:"Admin"},{default:Object(n.withCtx)((function(){return[y,Object(n.createVNode)(r,{class:"permission-sourceCode",type:"info"},{default:Object(n.withCtx)((function(){return[T]})),_:1})]})),_:1})):Object(n.createCommentVNode)("",!0),Object(n.unref)(o)(["editor"])?(Object(n.openBlock)(),Object(n.createBlock)(D,{key:1,label:"Editor"},{default:Object(n.withCtx)((function(){return[_,Object(n.createVNode)(r,{class:"permission-sourceCode",type:"info"},{default:Object(n.withCtx)((function(){return[g]})),_:1})]})),_:1})):Object(n.createCommentVNode)("",!0),Object(n.unref)(o)(["admin","editor"])?(Object(n.openBlock)(),Object(n.createBlock)(D,{key:2,label:"Admin-OR-Editor"},{default:Object(n.withCtx)((function(){return[B,Object(n.createVNode)(r,{class:"permission-sourceCode",type:"info"},{default:Object(n.withCtx)((function(){return[E]})),_:1})]})),_:1})):Object(n.createCommentVNode)("",!0)]})),_:1})]))])}}});c("95d4"),D.__scopeId="data-v-a72aafd4",t.default=D}}]);
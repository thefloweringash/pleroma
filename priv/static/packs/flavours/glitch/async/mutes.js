(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{710:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return L});var n,s,o,c=a(0),r=a(2),i=a(7),u=a(1),d=a(63),p=a.n(d),l=(a(3),a(12)),b=a(6),f=a(5),h=a.n(f),j=a(18),m=a.n(j),O=a(293),M=a(662),g=a(668),v=a(459),y=a(117),w=a(19),I=a(963),q=Object(b.f)({heading:{id:"column.mutes",defaultMessage:"Muted users"}}),L=Object(l.connect)(function(e){return{accountIds:e.getIn(["user_lists","mutes","items"]),hasMore:!!e.getIn(["user_lists","mutes","next"])}})(n=Object(b.g)((o=s=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return t=e.call.apply(e,[this].concat(n))||this,Object(u.a)(Object(r.a)(t),"handleLoadMore",p()(function(){t.props.dispatch(Object(y.e)())},300,{leading:!0})),t}Object(i.a)(t,e);var a=t.prototype;return a.componentWillMount=function(){this.props.dispatch(Object(y.f)())},a.render=function(){var e=this.props,t=e.intl,a=e.accountIds,n=e.hasMore;if(!a)return Object(c.a)(M.a,{},void 0,Object(c.a)(O.a,{}));var s=Object(c.a)(b.b,{id:"empty_column.mutes",defaultMessage:"You haven't muted any users yet."});return Object(c.a)(M.a,{name:"mutes",icon:"volume-off",heading:t.formatMessage(q.heading)},void 0,Object(c.a)(g.a,{}),Object(c.a)(I.a,{scrollKey:"mutes",onLoadMore:this.handleLoadMore,hasMore:n,emptyMessage:s},void 0,a.map(function(e){return Object(c.a)(v.a,{id:e},e)})))},t}(w.a),Object(u.a)(s,"propTypes",{params:h.a.object.isRequired,dispatch:h.a.func.isRequired,hasMore:h.a.bool,accountIds:m.a.list,intl:h.a.object.isRequired}),n=o))||n)||n}}]);
//# sourceMappingURL=mutes.js.map
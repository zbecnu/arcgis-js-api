// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","./Bucket","./Geometry","../../core/libs/earcut/earcut"],function(e,t,n,r,i,o,l){var a=function(e){function t(t,n,r,i,o,l){e.call(this,t,n),this.polygonVertexBuffer=r,this.polygonIndexBuffer=i,this.polygonOutlineVertexBuffer=o,this.polygonOutlineIndexBuffer=l}return n(t,e),Object.defineProperty(t.prototype,"polygonIndexStart",{get:function(){return this._triangleElementsStart},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"polygonIndexCount",{get:function(){return this._triangleElementsNum},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"polygonOutlineIndexStart",{get:function(){return this._outlineElementsStart},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"polygonOutlineIndexCount",{get:function(){return this._outlineElementsNum},enumerable:!0,configurable:!0}),t.prototype.assignBufferInfo=function(e){var t=e;t._triangleElementsStart=this._triangleElementsStart,t._triangleElementsNum=this._triangleElementsNum;var n=e.layer.hasPaintProperty("fill-outline-color");n?(t._outlineElementsStart=this._outlineElementsStart,t._outlineElementsNum=this._outlineElementsNum):(t._outlineElementsStart=0,t._outlineElementsNum=0)},t.prototype.processFeatures=function(e,t){this._triangleElementsStart=this.polygonIndexBuffer.index,this._triangleElementsNum=0,this._outlineElementsStart=this.polygonOutlineIndexBuffer.index,this._outlineElementsNum=0,e&&e.setExtent(this.layerExtent);for(var n=this.layer.getPaintValue("fill-pattern",this.zoom),r=this.layer.getPaintValue("fill-antialias",this.zoom)&&void 0===n,i=0,o=this._features;i<o.length;i++){var l=o[i],a=l.getGeometry(e);this._processFeature(a,r)}},t.prototype._processFeature=function(e,n){if(e){var r=e.length;if(n)for(var i=0;r>i;i++)this._processOutline(e[i]);for(var o,i=0;r>i;i++){var l=t._area(e[i]);l>0?(void 0!==o&&this._processFill(e,o),o=[i]):0>l&&void 0!==o&&o.push(i)}void 0!==o&&this._processFill(e,o)}},t.prototype._processOutline=function(e){var t,n,r,i=this.polygonOutlineVertexBuffer,l=this.polygonOutlineIndexBuffer,a=l.index,s=new o.Point(0,0),u=new o.Point(0,0),d=new o.Point(0,0),f=-1,y=-1,p=-1,g=-1,h=-1,x=0,m=e.length;if(!(2>m)){for(var c=e[x],_=e[m-1];m&&_.isEqual(c);)--m,_=e[m-1];if(!(2>m-x)){for(var v=x;m>v;++v){v===x?(t=e[m-1],n=e[x],r=e[x+1],s.assignSub(n,t),s.normalize(),s.rightPerpendicular()):(t=n,n=r,r=v!==m-1?e[v+1]:e[x],s.assign(u)),u.assignSub(r,n),u.normalize(),u.rightPerpendicular();var E=s.x*u.y-s.y*u.x;d.assignAdd(s,u),d.normalize();var b=-d.x*-s.x+-d.y*-s.y,S=Math.abs(0!==b?1/b:1);S>8&&(S=8),E>=0?(p=i.add(n.x,n.y,s.x,s.y,0,1),-1===g&&(g=p),f>=0&&y>=0&&p>=0&&l.add(f,y,p),y=i.add(n.x,n.y,S*-d.x,S*-d.y,0,-1),-1===h&&(h=y),f>=0&&y>=0&&p>=0&&l.add(f,y,p),f=y,y=p,p=i.add(n.x,n.y,d.x,d.y,0,1),f>=0&&y>=0&&p>=0&&l.add(f,y,p),y=i.add(n.x,n.y,u.x,u.y,0,1),f>=0&&y>=0&&p>=0&&l.add(f,y,p)):(p=i.add(n.x,n.y,S*d.x,S*d.y,0,1),-1===g&&(g=p),f>=0&&y>=0&&p>=0&&l.add(f,y,p),y=i.add(n.x,n.y,-s.x,-s.y,0,-1),-1===h&&(h=y),f>=0&&y>=0&&p>=0&&l.add(f,y,p),f=y,y=p,p=i.add(n.x,n.y,-d.x,-d.y,0,-1),f>=0&&y>=0&&p>=0&&l.add(f,y,p),f=i.add(n.x,n.y,-u.x,-u.y,0,-1),f>=0&&y>=0&&p>=0&&l.add(f,y,p))}f>=0&&y>=0&&g>=0&&l.add(f,y,g),f>=0&&g>=0&&h>=0&&l.add(f,h,g),this._outlineElementsNum+=3*(l.index-a)}}},t.prototype._processFill=function(e,t){var n,r=t.length;r>1&&(n=[]);for(var i=0,o=0,a=t;o<a.length;o++){var s=a[o];0!==i&&n.push(i),i+=e[s].length}for(var u=2*i,d=new Float64Array(u),f=0,y=0,p=t;y<p.length;y++)for(var s=p[y],g=e[s],h=g.length,x=0;h>x;++x)d[f++]=g[x].x,d[f++]=g[x].y;var m=l(d,n,2),c=m.length;if(c>0){for(var _=this.polygonVertexBuffer.index,v=0;u>v;)this.polygonVertexBuffer.add(d[v++],d[v++]);for(var E=0;c>E;)this.polygonIndexBuffer.add(_+m[E++],_+m[E++],_+m[E++]);this._triangleElementsNum+=c}},t._area=function(e){for(var t=0,n=e.length-1,r=0;n>r;r++)t+=e[r].x*e[r+1].y-e[r+1].x*e[r].y;return t},t}(i);return a});
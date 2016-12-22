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

define(["require","exports","../../webgl-engine/lib/gl-matrix","../../../webgl/Program","../../../webgl/VertexArrayObject","../../../webgl/BufferObject","../../webgl-engine/lib/RenderPass","../../../webgl/enums"],function(e,t,i,n,o,r,a,s){var c={aPosition:0,aColor:1},d={positions:[{name:"aPosition",count:3,type:5126,offset:0,stride:12,normalized:!1}],colors:[{name:"aColor",count:3,type:5121,offset:0,stride:3,normalized:!0}]},u=function(){function e(){this.didRender=!1,this.needsRender=!0,this._scaleFactor=1,this._clipMin=i.vec3.createFrom(-(1/0),-(1/0),-(1/0)),this._clipMax=i.vec3.createFrom(1/0,1/0,1/0),this._program=null,this.tempMatrix4=i.mat4.create(),this.tempVec2=i.vec2.create(),this.tempVec3=i.vec3.create(),this.addQueue=[],this.nodeRenderInfos=[]}return e.prototype.initializeRenderContext=function(e){this._program=new n(e.rctx,p.shader.vertex,p.shader.fragment,c),this.needsRender=!0},e.prototype.uninitializeRenderContext=function(e){this._program&&this._program.dispose(),this._program=null},e.prototype.render=function(e){if(e.pass!==a.MATERIAL)return!1;for(var t=e.rctx;this.addQueue.length;)this._initNode(e,this.addQueue.shift());if(null==this._program||0===this.nodeRenderInfos.length)return!0;t.setDepthTestEnabled(!0),t.bindProgram(this._program);var n=e.camera.projectionMatrix;this._program.setUniformMatrix4fv("uProjectionMatrix",n);for(var o=0;o<this.nodeRenderInfos.length;o++){var r=this.nodeRenderInfos[o];this.tempVec2[0]=r.pointRadius*this._scaleFactor,this.tempVec2[1]=e.camera.fullHeight,this._program.setUniform2fv("uPointScale",this.tempVec2),i.vec3.subtract(this._clipMin,r.origin,this.tempVec3),this._program.setUniform3fv("uClipMin",this.tempVec3),i.vec3.subtract(this._clipMax,r.origin,this.tempVec3),this._program.setUniform3fv("uClipMax",this.tempVec3),i.mat4.identity(this.tempMatrix4),i.mat4.translate(this.tempMatrix4,r.origin,this.tempMatrix4),i.mat4.multiply(e.camera.viewMatrix,this.tempMatrix4,this.tempMatrix4),this._program.setUniformMatrix4fv("uModelViewMatrix",this.tempMatrix4),t.bindVAO(r.vao),t.drawArrays(0,0,r.pointCount)}return!0},Object.defineProperty(e.prototype,"scaleFactor",{get:function(){return this._scaleFactor},set:function(e){this._scaleFactor!==e&&(this._scaleFactor=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"clippingBox",{set:function(e){null!=e?(i.vec3.set3(e[0],e[1],e[2],this._clipMin),i.vec3.set3(e[3],e[4],e[5],this._clipMax)):(i.vec3.set3(-(1/0),-(1/0),-(1/0),this._clipMin),i.vec3.set3(1/0,1/0,1/0,this._clipMax))},enumerable:!0,configurable:!0}),e.prototype.addNode=function(e){this.addQueue.push(e),this._requestRender()},e.prototype.removeNode=function(e){this.nodeRenderInfos=this.nodeRenderInfos.filter(function(t){return t.id===e&&(t.vao.dispose(!0),t.vao=null),t.id!==e}),this.addQueue=this.addQueue.filter(function(t){return t.id!==e}),this._requestRender()},e.prototype.removeAll=function(){this.nodeRenderInfos.forEach(function(e){e.vao.dispose(!0),e.vao=null}),this.nodeRenderInfos=[],this.addQueue=[],this._requestRender()},e.prototype._initNode=function(e,t){var n=e.rctx,a=t.coordinates,s=i.vec3.createFrom(t.origin[0],t.origin[1],t.origin[2]),u=t.rgb,p=t.pointRadius,l=a.length/3,h=new o(n,c,d,{positions:r.createVertex(n,35044,a),colors:r.createVertex(n,35044,u)}),f={id:t.id,origin:s,pointCount:l,pointRadius:p,vao:h};this.nodeRenderInfos.push(f)},e.prototype._requestRender=function(){this.didRender=!1,this.needsRender=!0},e}(),p={shader:{vertex:"\n      attribute vec3 aPosition;\n      attribute vec3 aColor;\n\n      uniform mat4 uModelViewMatrix;\n      uniform mat4 uProjectionMatrix;\n      uniform vec2 uPointScale;\n      uniform vec3 uClipMin;\n      uniform vec3 uClipMax;\n\n      varying vec3 vColor;\n      void main(void) {\n\n        // Move clipped points outside of clipspace\n        if (min(aPosition, uClipMin) != uClipMin ||\n            max(aPosition, uClipMax) != uClipMax) {\n          vColor = vec3(0.0);\n          gl_Position = vec4(0.0,0.0,0.0,2.0);\n          gl_PointSize = 0.0;\n          return;\n        }\n        \n        // Position in camera space\n        vec4 camera = uModelViewMatrix * vec4(aPosition, 1.0);\n\n        // Shift towards camera\n        float pointRadius = uPointScale.x;\n        camera.z += pointRadius;\n\n        vec4 position = uProjectionMatrix * camera;\n        gl_Position = position;\n\n        // Calculate Size\n        vec4 positionOffset = uProjectionMatrix * (camera + vec4(0.0, pointRadius, 0.0, 0.0));\n        float radius = abs(positionOffset.y - position.y);\n\n        float viewHeight = uPointScale.y;\n        gl_PointSize = radius / position.w * viewHeight; // (2 * r / w) * (h / 2)\n\n        vColor = aColor;\n      }\n    ",fragment:"\n      precision mediump float;\n      varying vec3 vColor;\n      void main(void) {\n\n        vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);\n        float r2 = dot(vOffset, vOffset);\n        if (r2 > 0.25) {\n          discard;\n        }\n\n        gl_FragColor = vec4(vColor, 1.0);\n      }\n    "}};return u});
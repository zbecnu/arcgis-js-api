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

define(["dojo/_base/lang","dojo/text!./HUDMaterial.xml","./internal/MaterialUtil","../lib/ShaderVariations","../lib/Util","../lib/gl-matrix","../lib/RenderSlot","../../../webgl/Program","../lib/DefaultVertexAttributeLocations","../../../webgl/Util"],function(e,t,i,r,o,n,a,l,s,f){var d=n.vec2d,v=n.vec3d,c=n.mat4d,u=o.assert,S=o.VertexAttrConstants,x={"bottom-left":[0,0],bottom:[.5,0],"bottom-right":[1,0],left:[0,.5],center:[.5,.5],right:[1,.5],"top-left":[0,1],top:[.5,1],"top-right":[1,1]},h=[253/255,231/255,229/255],g=function(e,t){i.basicMaterialConstructor(this,t),e=e||null,e.texCoordScale=e.texCoordScale||[1,1],e.occlusionTest=void 0!==e.occlusionTest?e.occlusionTest:!0,e.color=e.color||[1,1,1,1],e.screenMinMaxSize=e.screenMinMaxSize||[0,1e5],e.outlineColor=e.outlineColor||[1,1,1,1],e.outlineSize=e.outlineSize||0,e.textureIsSignedDistanceField=e.textureIsSignedDistanceField?1:0,e.distanceFieldBoundingBox=e.distanceFieldBoundingBox||[.25,.25,.75,.75],e.vvSizeEnabled=e.vvSizeEnabled||!1,e.vvSizeMinDataValue=e.vvSizeMinDataValue||[0,0,0],e.vvSizeMinSize=e.vvSizeMinSize||[1,1,1],e.vvSizeMaxDataValue=e.vvSizeMaxDataValue||[0,0,0],e.vvSizeMaxSize=e.vvSizeMaxSize||[100,100,100],e.vvColorEnabled=e.vvColorEnabled||!1,e.vvColorValues=e.vvColorValues||[0,0,0,0,0,0,0,0],e.vvColorColors=e.vvColorColors||[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],e.screenOffset?e.screenOffset.forEach(function(t,i){e.screenOffset[i]=2*t}):e.screenOffset=[0,0],"string"==typeof e.anchorPos?(u(x[e.anchorPos],"HUDMaterial: invalid anchorPos specified"),e.anchorPos=x[e.anchorPos]):e.anchorPos||(e.anchorPos=x.center),null==e.shaderPolygonOffset&&(e.shaderPolygonOffset=1e-5);var r=[{name:"position",count:3,type:5126,offset:0,stride:76,normalized:!1},{name:"normal",count:3,type:5126,offset:12,stride:76,normalized:!1},{name:"uv0",count:2,type:5126,offset:24,stride:76,normalized:!1},{name:"color",count:4,type:5121,offset:32,stride:76,normalized:!1},{name:"size",count:2,type:5126,offset:36,stride:76,normalized:!1},{name:"auxpos1",count:4,type:5126,offset:44,stride:76,normalized:!1},{name:"auxpos2",count:4,type:5126,offset:60,stride:76,normalized:!1}],o=f.getStride(r),n=o/4;this.dispose=function(){},this.getParameterValues=function(){var t={color:e.color,texCoordScale:e.texCoordScale,polygonOffset:e.polygonOffset,anchorPos:e.anchorPos,screenOffset:e.screenOffset,screenMinMaxSize:e.screenMinMaxSize,shaderPolygonOffset:e.shaderPolygonOffset,textureIsSignedDistanceField:e.textureIsSignedDistanceField,outlineColor:e.outlineColor,outlineSize:e.outlineSize,distanceFieldBoundingBox:e.distanceFieldBoundingBox,vvSizeEnabled:e.vvSizeEnabled,vvSizeMinDataValue:e.vvSizeMinDataValue,vvSizeMinSize:e.vvSizeMinSize,vvSizeMaxDataValue:e.vvSizeMaxDataValue,vvSizeMaxSize:e.vvSizeMaxSize,vvColorEnabled:e.vvColorEnabled,vvColorValues:e.vvColorValues,vvColorColors:e.vvColorColors};return e.textureId&&(t.textureId=e.textureId),e.direction&&(t.direction=e.direction),t},this.setParameterValues=function(t){for(var i in t)"textureId"===i&&u(e.textureId,"Can only change texture of material that already has a texture"),"direction"===i&&u(e.direction,"Can only change direction of HUDMaterial which was initialized with a direction"),e[i]=t[i];this.notifyDirty("matChanged")},this.getParams=function(){return e},this.getOutputAmount=function(e){return e*n*6},this.getVertexBufferLayout=function(){return r},this.fillInterleaved=function(t,a,l,s,d,v){for(var c=4*v,u=i.fill,x=t.faces.indices[S.POSITION],h=t.vertexAttr[S.POSITION].data,g=v+f.findAttribute(r,S.POSITION).offset/4,m=0;m<x.length;++m){var z=3*x[m];u(h,z,d,g,a,3),g+=n,u(h,z,d,g,a,3),g+=n,u(h,z,d,g,a,3),g+=n,u(h,z,d,g,a,3),g+=n,u(h,z,d,g,a,3),g+=n,u(h,z,d,g,a,3),g+=n}var C=t.faces.indices[S.NORMAL],O=t.vertexAttr[S.NORMAL].data;for(g=v+f.findAttribute(r,S.NORMAL).offset/4,m=0;m<C.length;++m)z=3*C[m],u(O,z,d,g,l,3),g+=n,u(O,z,d,g,l,3),g+=n,u(O,z,d,g,l,3),g+=n,u(O,z,d,g,l,3),g+=n,u(O,z,d,g,l,3),g+=n,u(O,z,d,g,l,3),g+=n;g=v+f.findAttribute(r,S.UV0).offset/4;var M=t.vertexAttr[S.UV0].data;if(null==M||M.length<=3)var D=0,P=0,b=e.texCoordScale[0],p=e.texCoordScale[1];else D=t.vertexAttr[S.UV0].data[0],P=t.vertexAttr[S.UV0].data[1],b=t.vertexAttr[S.UV0].data[2],p=t.vertexAttr[S.UV0].data[3];for(b=Math.min(1.99999,b+1),p=Math.min(1.99999,p+1),m=0;m<x.length;++m)d[g]=D,d[g+1]=P,g+=n,d[g]=b,d[g+1]=P,g+=n,d[g]=b,d[g+1]=p,g+=n,d[g]=b,d[g+1]=p,g+=n,d[g]=D,d[g+1]=p,g+=n,d[g]=D,d[g+1]=P,g+=n;var U=t.faces.indices[S.COLOR],V=t.vertexAttr[S.COLOR].data;g=c+f.findAttribute(r,S.COLOR).offset;var y=new Uint8Array(d.buffer);for(m=0;m<U.length;++m)z=4*U[m],u(V,z,y,g,null,4),g+=o,u(V,z,y,g,null,4),g+=o,u(V,z,y,g,null,4),g+=o,u(V,z,y,g,null,4),g+=o,u(V,z,y,g,null,4),g+=o,u(V,z,y,g,null,4),g+=o;var I=t.faces.indices[S.SIZE],T=t.vertexAttr[S.SIZE].data;for(g=v+f.findAttribute(r,S.SIZE).offset/4,m=0;m<I.length;++m){var A=T[2*I[m]],E=T[2*I[m]+1];d[g]=A,d[g+1]=E,g+=n,d[g]=A,d[g+1]=E,g+=n,d[g]=A,d[g+1]=E,g+=n,d[g]=A,d[g+1]=E,g+=n,d[g]=A,d[g+1]=E,g+=n,d[g]=A,d[g+1]=E,g+=n}if(null!=t.faces.indices[S.AUXPOS1]&&null!=t.vertexAttr[S.AUXPOS1]){var w=t.faces.indices[S.AUXPOS1],L=t.vertexAttr[S.AUXPOS1].data;for(g=v+f.findAttribute(r,"auxpos1").offset/4,m=0;m<w.length;++m)z=4*w[m],u(L,z,d,g,null,4),g+=n,u(L,z,d,g,null,4),g+=n,u(L,z,d,g,null,4),g+=n,u(L,z,d,g,null,4),g+=n,u(L,z,d,g,null,4),g+=n,u(L,z,d,g,null,4),g+=n}if(null!=t.faces.indices[S.AUXPOS2]&&null!=t.vertexAttr[S.AUXPOS2]){var F=t.faces.indices[S.AUXPOS2],R=t.vertexAttr[S.AUXPOS2].data;for(g=v+f.findAttribute(r,"auxpos2").offset/4,m=0;m<F.length;++m)z=4*F[m],u(R,z,d,g,null,4),g+=n,u(R,z,d,g,null,4),g+=n,u(R,z,d,g,null,4),g+=n,u(R,z,d,g,null,4),g+=n,u(R,z,d,g,null,4),g+=n,u(R,z,d,g,null,4),g+=n}};var a=v.create(),l=v.create(),s=c.create();c.identity(s);var d=1,h=[0,0];this.intersect=function(t,i,r,o,n,f,x,g){if(o.isSelection&&o.enableHUDSelection){var m=1,z=1;if(g){var C=g(s);m=C[0],z=C[5]}var O=t.getData().getVertexAttr()[S.POSITION],M=t.getData().getVertexAttr()[S.SIZE];u(O.size>=3);for(var D=o.point,P=o.camera,b=o.p0,p=o.p1,U=0;U<O.data.length/O.size;U++){var V=U*O.size;v.set3(O.data[V],O.data[V+1],O.data[V+2],a),c.multiplyVec3(r,a,a);var y=U*M.size;if(h[0]=M.data[y]*m,h[1]=M.data[y+1]*z,P.projectPoint(a,l),l[0]>-1){var I=l[0],T=l[1],A=e.anchorPos,E=I-d-(A[0]>0?h[0]*A[0]:0),w=E+h[0],L=T-d-(A[1]>0?h[1]*A[1]:0),F=L+h[1];if(e.textureIsSignedDistanceField){var R=e.distanceFieldBoundingBox,_=e.outlineSize/2;E+=h[0]*R[0]-_,w-=h[0]*(1-R[2])-_,L+=h[1]*R[1]-_,F-=h[1]*(1-R[3])-_}if(D[0]>E&&D[0]<w&&D[1]>L&&D[1]<F){var B=v.subtract(b,a,v.create()),H=v.length(B);v.scale(B,1/H);var N=.98*H/v.dist(b,p);x(N,B,-1,1,!0)}}}}},this.getGLMaterials=function(){return{color:m,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:z}},this.getAllTextureIds=function(){return[e.textureId]},this._textureDirty=!1,this.setTextureDirty=function(){this._textureDirty=!0}},m=function(t,r,o){function n(){return r.shaderVariators.HUDMaterial.getProgram([!!v.direction,!!v.worldScale,v.occlusionTest,v.textureIsSignedDistanceField,!!v.vvSizeEnabled,!!v.vvColorEnabled])}i.basicGLMaterialConstructor(this,t);var l=a.OCCLUSION_PIXELS,s=a.OVERLAY,f=0,v=e.clone(t.getParams()),c=r.get("hudOcclusionTestPixel"),u=n();i.singleTextureGLMaterialConstructor(this,o,v),this.beginSlot=function(e){return f=e,v.occlusionTest?e===l||e===s:e===s},this.getProgram=function(){return f===l&&v.occlusionTest?c:u},this.getAllPrograms=function(){return[c,u]},this.updateParameters=function(){var e=t.getParams();v.color=e.color,v.texCoordScale=e.texCoordScale,v.polygonOffset=e.polygonOffset,v.anchorPos=e.anchorPos,v.screenOffset=e.screenOffset,v.screenMinMaxSize=e.screenMinMaxSize,v.direction=e.direction,v.shaderPolygonOffset=e.shaderPolygonOffset,v.textureIsSignedDistanceField=e.textureIsSignedDistanceField,v.outlineColor=e.outlineColor,v.outlineSize=e.outlineSize,v.vvSizeEnabled=e.vvSizeEnabled,v.vvSizeMinDataValue=e.vvSizeMinDataValue,v.vvSizeMinSize=e.vvSizeMinSize,v.vvSizeMaxDataValue=e.vvSizeMaxDataValue,v.vvSizeMaxSize=e.vvSizeMaxSize,v.vvColorEnabled=e.vvColorEnabled,v.vvColorValues=e.vvColorValues,v.vvColorColors=e.vvColorColors,this.updateTexture(e.textureId),u=n()},this.bind=function(e,i){t._textureDirty&&(this.renderTexture(e),t._textureDirty=!1);var r=e.gl,o=i.cameraAboveGround?1:-1;if(f===l&&v.occlusionTest)e.bindProgram(c),c.setUniform1f("cameraGroundRelative",o),c.setUniform1f("polygonOffset",v.shaderPolygonOffset),c.setUniform4fv("viewport",i.viewport),c.setUniform4f("color",h[0],h[1],h[2],1),e.setDepthFunction(r.LEQUAL);else{if(e.bindProgram(u),u.setUniform1f("cameraGroundRelative",o),this.bindTexture(e,u),u.setUniform1i("framebufferTex",1),e.bindTexture(i.framebufferTex,1),e.setActiveTexture(0),u.setUniform3fv("markerColor",h),u.setUniform4fv("viewport",i.viewport),u.setUniform4fv("overrideColor",v.color),u.setUniform1f("pixelRatio",i.pixelRatio),u.setUniform1f("polygonOffset",v.shaderPolygonOffset),v.textureIsSignedDistanceField&&(u.setUniform4fv("outlineColor",v.outlineColor),u.setUniform1f("outlineSize",v.outlineSize)),v.vvSizeEnabled&&(u.setUniform3fv("vvSizeMinDataValue",v.vvSizeMinDataValue),u.setUniform3fv("vvSizeMaxDataValue",v.vvSizeMaxDataValue),u.setUniform3fv("vvSizeMinSize",v.vvSizeMinSize),u.setUniform3fv("vvSizeMaxSize",v.vvSizeMaxSize)),v.vvColorEnabled&&(u.setUniform1fv("vvColorValues",v.vvColorValues),u.setUniform4fv("vvColorColors",v.vvColorColors)),v.worldScale){var n=[-1,-1],a=v.screenMinMaxSize,s=i.proj,S=i.viewport[2]/i.pixelRatio;if(a)if(0!==s[11]){var x=2*Math.atan(1/s[0]),g=Math.tan(x/2)/S*2;n[0]=a[0]*g,n[1]=a[1]*g}else{var m=2/(s[0]*S);d.scale(a,m,n)}u.setUniform2fv("minMaxWorldSizeFactor",n)}v.direction&&u.setUniform3fv("direction",v.direction),u.setUniform2fv("texScale",v.texCoordScale),u.setUniform2fv("screenOffset",v.screenOffset),u.setUniform2fv("anchorPos",v.anchorPos),v.polygonOffset&&(e.setPolygonOffsetFillEnabled(!0),e.setPolygonOffset(0,-4)),e.setBlendingEnabled(!0)}},this.release=function(e){var t=e.gl;f===l&&v.occlusionTest?e.setDepthFunction(t.LESS):(e.setPolygonOffsetFillEnabled(!1),e.setBlendingEnabled(!1))},this.bindView=function(e,t){var r=t.origin;f===l&&v.occlusionTest?(i.bindView(r,t.view,c),i.bindCamPos(r,t.viewInvTransp,c)):(i.bindView(r,t.view,u),i.bindCamPos(r,t.viewInvTransp,u))},this.bindInstance=function(e,t){f===l&&v.occlusionTest?(c.setUniformMatrix4fv("model",t.transformation),c.setUniformMatrix4fv("modelNormal",t.transformationNormal)):u.setUniformMatrix4fv("model",t.transformation)},this.getDrawMode=function(e){var t=e.gl;return f===l&&v.occlusionTest?t.POINTS:t.TRIANGLES}},z=function(t,r,o){function n(){return r.shaderVariators.HUDMaterialHighlight.getProgram([!!l.direction,!!l.worldScale,l.occlusionTest,l.textureIsSignedDistanceField,!!l.vvSizeEnabled,!!l.vvColorEnabled])}i.basicGLMaterialConstructor(this,t);var l=e.clone(t.getParams()),s=r.get("hudOcclusionTestPixel"),f=n();i.singleTextureGLMaterialConstructor(this,o,l),this.beginSlot=function(e){return e===a.OVERLAY},this.getProgram=function(){return f},this.getAllPrograms=function(){return[s,f]},this.updateParameters=function(){var e=t.getParams();l.color=e.color,l.texCoordScale=e.texCoordScale,l.polygonOffset=e.polygonOffset,l.anchorPos=e.anchorPos,l.screenOffset=e.screenOffset,l.screenMinMaxSize=e.screenMinMaxSize,l.direction=e.direction,l.shaderPolygonOffset=e.shaderPolygonOffset,l.textureIsSignedDistanceField=e.textureIsSignedDistanceField,l.outlineColor=e.outlineColor,l.outlineSize=e.outlineSize,this.updateTexture(e.textureId),f=n()},this.bind=function(e,i){if(t._textureDirty&&(this.renderTexture(e),t._textureDirty=!1),e.bindProgram(f),this.bindTexture(e,f),f.setUniform1i("framebufferTex",1),e.bindTexture(i.framebufferTex,1),e.setActiveTexture(0),f.setUniform3fv("markerColor",h),f.setUniform4fv("viewport",i.viewport),f.setUniform4fv("overrideColor",l.color),f.setUniform1f("pixelRatio",i.pixelRatio),f.setUniform1f("polygonOffset",l.shaderPolygonOffset),l.textureIsSignedDistanceField&&(f.setUniform4fv("outlineColor",l.outlineColor),f.setUniform1f("outlineSize",l.outlineSize)),l.worldScale){var r=[-1,-1],o=l.screenMinMaxSize,n=i.proj,a=i.viewport[2]/i.pixelRatio;if(o)if(0!==n[11]){var s=2*Math.atan(1/n[0]),v=Math.tan(s/2)/a*2;r[0]=o[0]*v,r[1]=o[1]*v}else{var c=2/(n[0]*a);d.scale(o,c,r)}f.setUniform2fv("minMaxWorldSizeFactor",r)}l.direction&&f.setUniform3fv("direction",l.direction),f.setUniform2fv("texScale",l.texCoordScale),f.setUniform2fv("screenOffset",l.screenOffset),f.setUniform2fv("anchorPos",l.anchorPos),l.polygonOffset&&(e.setPolygonOffsetFillEnabled(!0),e.setPolygonOffset(0,-4)),e.setBlendingEnabled(!0)},this.release=function(e){e.setPolygonOffsetFillEnabled(!1),e.setBlendingEnabled(!1)},this.bindView=function(e,t){var r=t.origin;i.bindView(r,t.view,f),i.bindCamPos(r,t.viewInvTransp,f)},this.bindInstance=function(e,t){f.setUniformMatrix4fv("model",t.transformation)},this.getDrawMode=function(e){var t=e.gl;return t.TRIANGLES}};return g.loadShaders=function(e,i,o,n){e._parse(t);var a=n.parameters.maxVertexTextureImageUnits>0,f=new r("hud",["vertexShaderHUD","fragmentShaderHUD"],null,o,i,e,n);f.addBinaryShaderSnippetSuffix("Direction","Direction",[!0,!1]),f.addBinaryShaderSnippetSuffix("WorldScale","WorldScale",[!0,!1]),f.addDefine("OcclTest",a?"OCCL_TEST":"OCCL_PIXELSHADER"),f.addDefine("SDF","SIGNED_DISTANCE_FIELD"),f.addDefine("vvSize","VV_SIZE"),f.addDefine("vvColor","VV_COLOR"),o.shaderVariators.HUDMaterial=f;var d=new r("hudHighlight",["vertexShaderHUD","fragmentShaderHUDHighlight"],null,o,i,e,n);d.addBinaryShaderSnippetSuffix("Direction","Direction",[!0,!1]),d.addBinaryShaderSnippetSuffix("WorldScale","WorldScale",[!0,!1]),d.addDefine("OcclTest",a?"OCCL_TEST":"OCCL_PIXELSHADER"),d.addDefine("SDF","SIGNED_DISTANCE_FIELD"),d.addDefine("vvSize","VV_SIZE"),d.addDefine("vvColor","VV_COLOR"),o.shaderVariators.HUDMaterialHighlight=d;var v=new l(n,e.vertexShaderOcclusionTestPixel,e.fragmentShaderSimple,s.Default3D);o.add("hudOcclusionTestPixel",v)},g});
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

define(["require","exports","./Texture"],function(t,e,i){var r=function(){function t(e,r,n,h){if(this._context=null,this._glName=null,this._depthAttachment=null,this._stencilAttachment=null,this._colorAttachment=null,this._initialized=!1,this._context=e,this._desc={colorTarget:r.colorTarget,depthStencilTarget:r.depthStencilTarget,width:r.width,height:r.height,multisampled:r.multisampled},this._id=t._nextId++,n){var o=void 0;n instanceof i?(this._colorAttachment=n,o=n.descriptor):(o=n,this._colorAttachment=new i(this._context,o)),0!==this._desc.colorTarget&&console.error("Framebuffer is initialized with a texture however the descriptor indicates using a renderbuffer color attachment!"),t._validateTextureDimensions(o,this._desc)}if(h){this._context.extensions.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");var s=void 0;h instanceof i?(this._depthStencilTexture=h,s=this._depthStencilTexture.descriptor):(s=h,this._depthStencilTexture=new i(this._context,s)),t._validateTextureDimensions(s,this._desc)}}return t.create=function(e,i){return new t(e,i)},t.createWithAttachments=function(e,i,r,n){return new t(e,r,i,n)},Object.defineProperty(t.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"glName",{get:function(){return this._glName},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"descriptor",{get:function(){return this._desc},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"colorTexture",{get:function(){return this._colorAttachment instanceof i?this._colorAttachment:null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"depthStencilTexture",{get:function(){return this._depthStencilTexture},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this._desc.width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._desc.height},enumerable:!0,configurable:!0}),t.prototype.dispose=function(){if(this._context&&this._glName){this._disposeColorAttachment(),this._disposeDepthStencilAttachments();var t=this._context.gl;t.deleteFramebuffer(this._glName),this._glName=null}},t.prototype.attachColorTexture=function(e){if(e){var i=e.descriptor;if(t._validateTextureDimensions(i,this._desc),this._disposeColorAttachment(),this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e.glName,0)}this._colorAttachment=e}},t.prototype.detachColorTexture=function(){var t=void 0;if(this._colorAttachment instanceof i){if(t=this._colorAttachment,this._initialized){this._context.bindFramebuffer(this);var e=this._context.gl;this._context.gl.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0)}this._colorAttachment=null}return t},t.prototype.attachDepthStencilTexture=function(e){if(e){var i=e.descriptor;if(34041!==i.pixelFormat&&console.error("Depth/Stencil texture must have a pixel type of DEPTH_STENCIL!"),34042!==i.dataType&&console.error("Depth/Stencil texture must have data type of UNSIGNED_INT_24_8_WEBGL!"),this._context.extensions.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture!"),t._validateTextureDimensions(i,this._desc),4!==this._desc.depthStencilTarget&&(this._desc.depthStencilTarget=4),this._disposeDepthStencilAttachments(),this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,e.glName,0)}this._depthStencilTexture=e}},t.prototype.detachDepthStencilTexture=function(){var t=this._depthStencilTexture;if(t&&this._initialized){this._context.bindFramebuffer(this);var e=this._context.gl;this._context.gl.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,null,0)}return this._depthStencilTexture=null,t},t.prototype.copyToTexture=function(t,e,i,r,n,h,o){(0>t||0>e||0>n||0>h)&&console.error("Offsets cannot be negative!"),(0>=i||0>=r)&&console.error("Copy width and height must be greater than zero!");var s=this._desc,c=o.descriptor;3553!==o.descriptor.target&&console.error("Texture target must be TEXTURE_2D!"),(t+i>s.width||e+r>s.height||n+i>c.width||h+r>c.height)&&console.error("Bad dimensions, the current input values will attempt to read or copy out of bounds!");var a=this._context;a.bindTexture(o),a.bindFramebuffer(this),a.gl.copyTexSubImage2D(3553,0,n,h,t,e,i,r)},t.prototype.readPixels=function(t,e,i,r,n,h,o){(0>=i||0>=r)&&console.error("Copy width and height must be greater than zero!"),o||console.error("Target memory is not initialized!"),this._context.bindFramebuffer(this);var s=this._context.gl;s.readPixels(t,e,i,r,n,h,o)},t.prototype.resize=function(e,r){var n=this._desc;if(n.width!==e||n.height!==r){if(!this._initialized){if(n.width=e,n.height=r,this._colorAttachment instanceof i){var h=this._colorAttachment;h.resize(e,r)}return void(this._depthStencilTexture&&this._depthStencilTexture.resize(e,r))}if(n.width=e,n.height=r,this._colorAttachment instanceof i){var h=this._colorAttachment,o=h.descriptor;o.width=e,o.height=r,this._colorAttachment=new i(this._context,o),t._validateTextureDimensions(h.descriptor,this._desc)}else this._colorAttachment=null;if(null!=this._depthStencilTexture){var o=this._depthStencilTexture.descriptor;o.width=e,o.height=r,this._depthStencilTexture=new i(this._context,o)}this._initialized=!1}},t.prototype.initialize=function(){if(this._initialized)return!1;var t=this._context.gl,e=t.createFramebuffer(),r=this._desc;if(t.bindFramebuffer(t.FRAMEBUFFER,e),!this._colorAttachment)if(0===r.colorTarget){var n={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,wrapMode:33071,width:r.width,height:r.height};this._colorAttachment=new i(this._context,n)}else{var h=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,h),t.renderbufferStorage(t.RENDERBUFFER,t.RGBA4,r.width,r.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,h),this._colorAttachment=h}if(this._colorAttachment instanceof i){var o=this._colorAttachment;t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o.glName,0)}switch(r.depthStencilTarget){case 1:case 3:var s=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,s);var c=1===r.depthStencilTarget?t.DEPTH_COMPONENT16:t.DEPTH_STENCIL,a=1===r.depthStencilTarget?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.renderbufferStorage(t.RENDERBUFFER,c,r.width,r.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,a,t.RENDERBUFFER,s),this._depthAttachment=s;break;case 2:var l=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,l),t.renderbufferStorage(t.RENDERBUFFER,t.STENCIL_INDEX8,r.width,r.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.STENCIL_ATTACHMENT,t.RENDERBUFFER,l),this._stencilAttachment=l;break;case 4:if(!this._depthStencilTexture){this._context.extensions.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");var d={target:3553,pixelFormat:34041,dataType:34042,samplingMode:9728,wrapMode:33071,width:r.width,height:r.height};this._depthStencilTexture=new i(this._context,d)}t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,this._depthStencilTexture.glName,0)}var u=t.checkFramebufferStatus(t.FRAMEBUFFER);return u!==t.FRAMEBUFFER_COMPLETE&&console.error("Framebuffer is incomplete!"),this._glName=e,this._initialized=!0,!0},t.prototype._disposeColorAttachment=function(){if(this._colorAttachment instanceof i){var t=this._colorAttachment;if(this._initialized){this._context.bindFramebuffer(this);var e=this._context.gl;e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0)}t.dispose()}else if(this._colorAttachment instanceof WebGLRenderbuffer){var r=this._colorAttachment,e=this._context.gl;this._initialized&&(this._context.bindFramebuffer(this),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,null)),this._context.gl.deleteRenderbuffer(r)}this._colorAttachment=null},t.prototype._disposeDepthStencilAttachments=function(){var t=this._context.gl;if(this._depthAttachment){if(this._initialized){this._context.bindFramebuffer(this);var e=this._context.gl,i=1===this._desc.depthStencilTarget?e.DEPTH_ATTACHMENT:e.DEPTH_STENCIL_ATTACHMENT;e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,null)}t.deleteRenderbuffer(this._depthAttachment),this._depthAttachment=null}if(this._stencilAttachment){if(this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferRenderbuffer(r.FRAMEBUFFER,r.STENCIL_ATTACHMENT,r.RENDERBUFFER,null)}t.deleteRenderbuffer(this._stencilAttachment),this._stencilAttachment=null}if(this._depthStencilTexture){if(this._initialized){this._context.bindFramebuffer(this);var n=this._context.gl;n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,null,0)}this._depthStencilTexture.dispose(),this._depthStencilTexture=null}},t._validateTextureDimensions=function(t,e){console.assert(t.width>=0&&t.height>=0),3553!==t.target&&console.error("Texture type must be TEXTURE_2D!"),void 0!==e.width&&e.width>=0&&void 0!==e.height&&e.height>=0?(e.width!==t.width||e.height!==t.height)&&console.error("Color attachment texture must match the framebuffer's!"):(e.width=t.width,e.height=t.height)},t._nextId=0,t}();return r});
/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "137d825f3c447ef288fb"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _App = __webpack_require__(1);\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = new _App2.default(); /**\r\n                                * Created by Edward_J_Apostol on 2016-08-29.\r\n                                */\n// this is where the \"main\" section of your app begins.\n// its like a launch pad, where you bring all your other classes\n// together for use.//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJhcHAiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7OztBQUNBLElBQUlBLE1BQU0sbUJBQVYsQyxDQVBBOzs7QUFHQTtBQUNBO0FBQ0EiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNi0wOC0yOS5cclxuICovXHJcbi8vIHRoaXMgaXMgd2hlcmUgdGhlIFwibWFpblwiIHNlY3Rpb24gb2YgeW91ciBhcHAgYmVnaW5zLlxyXG4vLyBpdHMgbGlrZSBhIGxhdW5jaCBwYWQsIHdoZXJlIHlvdSBicmluZyBhbGwgeW91ciBvdGhlciBjbGFzc2VzXHJcbi8vIHRvZ2V0aGVyIGZvciB1c2UuXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xyXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xyXG5cdFxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Edward_J_Apostol on 2017-01-28.\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\nvar _BestBuyWebService = __webpack_require__(2);\n\nvar _BestBuyWebService2 = _interopRequireDefault(_BestBuyWebService);\n\nvar _CatalogView = __webpack_require__(3);\n\nvar _CatalogView2 = _interopRequireDefault(_CatalogView);\n\nvar _ShoppingCart = __webpack_require__(4);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nvar _ShoppingCartView = __webpack_require__(5);\n\nvar _ShoppingCartView2 = _interopRequireDefault(_ShoppingCartView);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n    function App() {\n        _classCallCheck(this, App);\n\n        console.log(\"hi\");\n        this.productData = null; // this will store all our data\n        this.products = null; // stores specifically the products\n        this.shoppingCart = new _ShoppingCart2.default();\n        this.catalogView = new _CatalogView2.default(); // this will display our data\n\n        //this.shoppingCartView = new ShoppingCartView;\n        // call the initBestBuyWebService to initialize the\n        // BestBuy Web Service and return the data\n        this.initBestBuyWebService();\n        this.initShoppingCart();\n        this.initquickView();\n    }\n\n    _createClass(App, [{\n        key: 'initBestBuyWebService',\n        value: function initBestBuyWebService() {\n            this.bbws = new _BestBuyWebService2.default();\n            // use your own API key for this (the one from Cody)\n            this.bbws.apiKey = \"8ccddf4rtjz5k5btqam84qak\";\n\n            // this uses 'backticks' for long multi-line strings\n            this.bbws.url = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=' + this.bbws.apiKey + '&format=json';\n\n            // pass the reference to this app to store the data\n            this.bbws.getData(this);\n        }\n    }, {\n        key: 'prepCatalog',\n        value: function prepCatalog() {\n            // use this console.log to test the data\n            // console.log(this.productData);\n\n            if (this.productData != null) {\n                // only get the products property (for now)\n                // this code was copied from SimpleHTTPRequest.html\n                this.products = this.bbws.getProducts();\n                console.log(this.products, \"here i am producting\");\n            }\n\n            this.showCatalog();\n        }\n    }, {\n        key: 'showCatalog',\n        value: function showCatalog() {\n\n            // populate the catalog only if there are products\n            if (this.productData != null) {\n                this.catalogView.addProductsToCarousel(this.products, this);\n                // this.catalogView.showCatalog();\n            }\n        }\n    }, {\n        key: 'initShoppingCart',\n        value: function initShoppingCart() {\n            $(\"#cartIcon\").click(this, function (e) {\n                $(\"#cartView, .overlay\").fadeIn(\"slow\");\n            });\n            $(\".overlay\").click(this, function (e) {\n                $(\".overlay, #cartView\").fadeOut(\"slow\");\n            });\n        }\n    }, {\n        key: 'initquickView',\n        value: function initquickView() {\n            $(document).on(\"click\", '.quickViewBtn', function (e) {\n                //i want to add products in this quickViewBox\n                // i need img desc. price and sku\n                // get the products from this.products\n                // get the sku from Data-sku attribute of button\n                // loop throught the products to find match the sku with the data sku\n                // create for loop to cycle through products to find match\n                // use jquery to append html textnode\n                // use jquery to append html text\n                var imagesrc = \"https://lh5.ggpht.com/tq3WqEUxtRyBn-d_0t3j6WKNHuJDrmLq-FE3GAYrsAMQFIaS7FIgRLfzzql2SvfvLqto=w300\";\n                var someImage = new Image();\n                someImage.src = imagesrc;\n                someImage.addEventListener(\"load\", function (e) {\n                    $(\"#qvImage\").attr(\"src\", this.src);\n                }, false);\n\n                // $(\"#qvimage\").on(\"load\",imagesrc, function (e){\n                //    console.log(e.data);\n                // });\n\n                $(\".quickViewBox, .overlayQv\").fadeIn(\"slow\");\n            });\n            $(document).on(\"click\", '.overlayQv', function (e) {\n                $(\".overlayQv, .quickViewBox\").fadeOut(\"slow\");\n            });\n        }\n    }]);\n\n    return App;\n}();\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzP2E2NzMiXSwibmFtZXMiOlsiQXBwIiwiY29uc29sZSIsImxvZyIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJzaG9wcGluZ0NhcnQiLCJjYXRhbG9nVmlldyIsImluaXRCZXN0QnV5V2ViU2VydmljZSIsImluaXRTaG9wcGluZ0NhcnQiLCJpbml0cXVpY2tWaWV3IiwiYmJ3cyIsImFwaUtleSIsInVybCIsImdldERhdGEiLCJnZXRQcm9kdWN0cyIsInNob3dDYXRhbG9nIiwiYWRkUHJvZHVjdHNUb0Nhcm91c2VsIiwiJCIsImNsaWNrIiwiZSIsImZhZGVJbiIsImZhZGVPdXQiLCJkb2N1bWVudCIsIm9uIiwiaW1hZ2VzcmMiLCJzb21lSW1hZ2UiLCJJbWFnZSIsInNyYyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7cWpCQUFBOzs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBS3FCQSxHO0FBRWpCLG1CQUFjO0FBQUE7O0FBQ1ZDLGdCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkIsQ0FGVSxDQUVlO0FBQ3pCLGFBQUtDLFFBQUwsR0FBZ0IsSUFBaEIsQ0FIVSxDQUdZO0FBQ3RCLGFBQUtDLFlBQUwsR0FBb0IsNEJBQXBCO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQiwyQkFBbkIsQ0FMVSxDQUs0Qjs7QUFFdEM7QUFDQTtBQUNBO0FBQ0EsYUFBS0MscUJBQUw7QUFDQSxhQUFLQyxnQkFBTDtBQUNBLGFBQUtDLGFBQUw7QUFDSDs7OztnREFFdUI7QUFDcEIsaUJBQUtDLElBQUwsR0FBWSxpQ0FBWjtBQUNBO0FBQ0EsaUJBQUtBLElBQUwsQ0FBVUMsTUFBVixHQUFtQiwwQkFBbkI7O0FBRUE7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRSxHQUFWLG1GQUE4RixLQUFLRixJQUFMLENBQVVDLE1BQXhHOztBQUVBO0FBQ0EsaUJBQUtELElBQUwsQ0FBVUcsT0FBVixDQUFrQixJQUFsQjtBQUVIOzs7c0NBRWE7QUFDVjtBQUNBOztBQUVBLGdCQUFJLEtBQUtWLFdBQUwsSUFBb0IsSUFBeEIsRUFBOEI7QUFDMUI7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCLEtBQUtNLElBQUwsQ0FBVUksV0FBVixFQUFoQjtBQUNBYix3QkFBUUMsR0FBUixDQUFZLEtBQUtFLFFBQWpCLEVBQTJCLHNCQUEzQjtBQUNIOztBQUVELGlCQUFLVyxXQUFMO0FBQ0g7OztzQ0FFYTs7QUFFVjtBQUNBLGdCQUFJLEtBQUtaLFdBQUwsSUFBb0IsSUFBeEIsRUFBOEI7QUFDMUIscUJBQUtHLFdBQUwsQ0FBaUJVLHFCQUFqQixDQUF1QyxLQUFLWixRQUE1QyxFQUFxRCxJQUFyRDtBQUNBO0FBRUg7QUFHSjs7OzJDQUVrQjtBQUNmYSxjQUFFLFdBQUYsRUFBZUMsS0FBZixDQUFxQixJQUFyQixFQUEyQixVQUFVQyxDQUFWLEVBQWE7QUFDcENGLGtCQUFFLHFCQUFGLEVBQXlCRyxNQUF6QixDQUFnQyxNQUFoQztBQUNILGFBRkQ7QUFHQUgsY0FBRSxVQUFGLEVBQWNDLEtBQWQsQ0FBb0IsSUFBcEIsRUFBMEIsVUFBVUMsQ0FBVixFQUFhO0FBQ25DRixrQkFBRSxxQkFBRixFQUF5QkksT0FBekIsQ0FBaUMsTUFBakM7QUFDSCxhQUZEO0FBR0g7Ozt3Q0FFZTtBQUNaSixjQUFFSyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXVCLGVBQXZCLEVBQXdDLFVBQVVKLENBQVYsRUFBYTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQUlLLFdBQVcsaUdBQWY7QUFDQSxvQkFBSUMsWUFBWSxJQUFJQyxLQUFKLEVBQWhCO0FBQ0FELDBCQUFVRSxHQUFWLEdBQWdCSCxRQUFoQjtBQUNBQywwQkFBVUcsZ0JBQVYsQ0FBMkIsTUFBM0IsRUFBbUMsVUFBU1QsQ0FBVCxFQUFXO0FBQzFDRixzQkFBRSxVQUFGLEVBQWNZLElBQWQsQ0FBbUIsS0FBbkIsRUFBeUIsS0FBS0YsR0FBOUI7QUFDSCxpQkFGRCxFQUVFLEtBRkY7O0FBSUE7QUFDQTtBQUNBOztBQUVBVixrQkFBRSwyQkFBRixFQUErQkcsTUFBL0IsQ0FBc0MsTUFBdEM7QUFDSCxhQXJCRDtBQXNCQUgsY0FBRUssUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF1QixZQUF2QixFQUFxQyxVQUFVSixDQUFWLEVBQWE7QUFDOUNGLGtCQUFFLDJCQUFGLEVBQStCSSxPQUEvQixDQUF1QyxNQUF2QztBQUNILGFBRkQ7QUFHSDs7Ozs7O2tCQTNGZ0JyQixHIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE3LTAxLTI4LlxuICovXG5cbmltcG9ydCBCZXN0QnV5V2ViU2VydmljZSBmcm9tICcuL0Jlc3RCdXlXZWJTZXJ2aWNlJztcbmltcG9ydCBDYXRhbG9nVmlldyBmcm9tICcuL0NhdGFsb2dWaWV3JztcbmltcG9ydCBTaG9wcGluZ0NhcnQgZnJvbSAnLi9TaG9wcGluZ0NhcnQnO1xuaW1wb3J0IFNob3BwaW5nQ2FydFZpZXcgZnJvbSAnLi9TaG9wcGluZ0NhcnRWaWV3JztcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhpXCIpXG4gICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBudWxsOyAvLyB0aGlzIHdpbGwgc3RvcmUgYWxsIG91ciBkYXRhXG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBudWxsOyAvLyBzdG9yZXMgc3BlY2lmaWNhbGx5IHRoZSBwcm9kdWN0c1xuICAgICAgICB0aGlzLnNob3BwaW5nQ2FydCA9IG5ldyBTaG9wcGluZ0NhcnQoKTtcbiAgICAgICAgdGhpcy5jYXRhbG9nVmlldyA9IG5ldyBDYXRhbG9nVmlldygpOyAvLyB0aGlzIHdpbGwgZGlzcGxheSBvdXIgZGF0YVxuXG4gICAgICAgIC8vdGhpcy5zaG9wcGluZ0NhcnRWaWV3ID0gbmV3IFNob3BwaW5nQ2FydFZpZXc7XG4gICAgICAgIC8vIGNhbGwgdGhlIGluaXRCZXN0QnV5V2ViU2VydmljZSB0byBpbml0aWFsaXplIHRoZVxuICAgICAgICAvLyBCZXN0QnV5IFdlYiBTZXJ2aWNlIGFuZCByZXR1cm4gdGhlIGRhdGFcbiAgICAgICAgdGhpcy5pbml0QmVzdEJ1eVdlYlNlcnZpY2UoKTtcbiAgICAgICAgdGhpcy5pbml0U2hvcHBpbmdDYXJ0KCk7XG4gICAgICAgIHRoaXMuaW5pdHF1aWNrVmlldyAoKTtcbiAgICB9XG5cbiAgICBpbml0QmVzdEJ1eVdlYlNlcnZpY2UoKSB7XG4gICAgICAgIHRoaXMuYmJ3cyA9IG5ldyBCZXN0QnV5V2ViU2VydmljZSgpO1xuICAgICAgICAvLyB1c2UgeW91ciBvd24gQVBJIGtleSBmb3IgdGhpcyAodGhlIG9uZSBmcm9tIENvZHkpXG4gICAgICAgIHRoaXMuYmJ3cy5hcGlLZXkgPSBcIjhjY2RkZjRydGp6NWs1YnRxYW04NHFha1wiO1xuXG4gICAgICAgIC8vIHRoaXMgdXNlcyAnYmFja3RpY2tzJyBmb3IgbG9uZyBtdWx0aS1saW5lIHN0cmluZ3NcbiAgICAgICAgdGhpcy5iYndzLnVybCA9IGBodHRwczovL2FwaS5iZXN0YnV5LmNvbS92MS9wcm9kdWN0cygoY2F0ZWdvcnlQYXRoLmlkPWFiY2F0MDUwMjAwMCkpP2FwaUtleT0ke3RoaXMuYmJ3cy5hcGlLZXl9JmZvcm1hdD1qc29uYDtcblxuICAgICAgICAvLyBwYXNzIHRoZSByZWZlcmVuY2UgdG8gdGhpcyBhcHAgdG8gc3RvcmUgdGhlIGRhdGFcbiAgICAgICAgdGhpcy5iYndzLmdldERhdGEodGhpcyk7XG5cbiAgICB9XG5cbiAgICBwcmVwQ2F0YWxvZygpIHtcbiAgICAgICAgLy8gdXNlIHRoaXMgY29uc29sZS5sb2cgdG8gdGVzdCB0aGUgZGF0YVxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb2R1Y3REYXRhKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBvbmx5IGdldCB0aGUgcHJvZHVjdHMgcHJvcGVydHkgKGZvciBub3cpXG4gICAgICAgICAgICAvLyB0aGlzIGNvZGUgd2FzIGNvcGllZCBmcm9tIFNpbXBsZUhUVFBSZXF1ZXN0Lmh0bWxcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLmJid3MuZ2V0UHJvZHVjdHMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvZHVjdHMsIFwiaGVyZSBpIGFtIHByb2R1Y3RpbmdcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3dDYXRhbG9nKCk7XG4gICAgfVxuXG4gICAgc2hvd0NhdGFsb2coKSB7XG5cbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGNhdGFsb2cgb25seSBpZiB0aGVyZSBhcmUgcHJvZHVjdHNcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdERhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXRhbG9nVmlldy5hZGRQcm9kdWN0c1RvQ2Fyb3VzZWwodGhpcy5wcm9kdWN0cyx0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2F0YWxvZ1ZpZXcuc2hvd0NhdGFsb2coKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGluaXRTaG9wcGluZ0NhcnQoKSB7XG4gICAgICAgICQoXCIjY2FydEljb25cIikuY2xpY2sodGhpcywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICQoXCIjY2FydFZpZXcsIC5vdmVybGF5XCIpLmZhZGVJbihcInNsb3dcIik7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiLm92ZXJsYXlcIikuY2xpY2sodGhpcywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICQoXCIub3ZlcmxheSwgI2NhcnRWaWV3XCIpLmZhZGVPdXQoXCJzbG93XCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0cXVpY2tWaWV3KCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsJy5xdWlja1ZpZXdCdG4nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy9pIHdhbnQgdG8gYWRkIHByb2R1Y3RzIGluIHRoaXMgcXVpY2tWaWV3Qm94XG4gICAgICAgICAgICAvLyBpIG5lZWQgaW1nIGRlc2MuIHByaWNlIGFuZCBza3VcbiAgICAgICAgICAgIC8vIGdldCB0aGUgcHJvZHVjdHMgZnJvbSB0aGlzLnByb2R1Y3RzXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHNrdSBmcm9tIERhdGEtc2t1IGF0dHJpYnV0ZSBvZiBidXR0b25cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaHQgdGhlIHByb2R1Y3RzIHRvIGZpbmQgbWF0Y2ggdGhlIHNrdSB3aXRoIHRoZSBkYXRhIHNrdVxuICAgICAgICAgICAgLy8gY3JlYXRlIGZvciBsb29wIHRvIGN5Y2xlIHRocm91Z2ggcHJvZHVjdHMgdG8gZmluZCBtYXRjaFxuICAgICAgICAgICAgLy8gdXNlIGpxdWVyeSB0byBhcHBlbmQgaHRtbCB0ZXh0bm9kZVxuICAgICAgICAgICAgLy8gdXNlIGpxdWVyeSB0byBhcHBlbmQgaHRtbCB0ZXh0XG4gICAgICAgICAgICBsZXQgaW1hZ2VzcmMgPSBcImh0dHBzOi8vbGg1LmdncGh0LmNvbS90cTNXcUVVeHRSeUJuLWRfMHQzajZXS05IdUpEcm1McS1GRTNHQVlyc0FNUUZJYVM3RklnUkxmenpxbDJTdmZ2THF0bz13MzAwXCI7XG4gICAgICAgICAgICBsZXQgc29tZUltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBzb21lSW1hZ2Uuc3JjID0gaW1hZ2VzcmM7XG4gICAgICAgICAgICBzb21lSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgJChcIiNxdkltYWdlXCIpLmF0dHIoXCJzcmNcIix0aGlzLnNyYyk7XG4gICAgICAgICAgICB9LGZhbHNlKTtcblxuICAgICAgICAgICAgLy8gJChcIiNxdmltYWdlXCIpLm9uKFwibG9hZFwiLGltYWdlc3JjLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhlLmRhdGEpO1xuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgICQoXCIucXVpY2tWaWV3Qm94LCAub3ZlcmxheVF2XCIpLmZhZGVJbihcInNsb3dcIik7XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsJy5vdmVybGF5UXYnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgJChcIi5vdmVybGF5UXYsIC5xdWlja1ZpZXdCb3hcIikuZmFkZU91dChcInNsb3dcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHAuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-27.\n */\n\nvar BestBuyWebService = function () {\n    function BestBuyWebService() {\n        _classCallCheck(this, BestBuyWebService);\n\n        this.url = \"\";\n        this.apiKey = \"\";\n        this.productData = null;\n        this.products = null;\n    }\n\n    _createClass(BestBuyWebService, [{\n        key: \"getData\",\n        value: function getData(theApp) {\n            // theApp is a reference to the main app\n            // we can pass information to it, including data\n            // that is returned from this service\n\n            var serviceChannel = new XMLHttpRequest();\n            var url = this.url;\n\n            /*\n            // *** To solve the issue of passing the data back to the main app...\n            // *** and eventually, to catalogView\n            // *** You could the addEventListener to call\n            // *** a different function which will have both\n            // *** the event object and dataPlaceHolder as parameters\n            // *** see http://bit.ly/js-passmoreargsevent\n             */\n\n            serviceChannel.addEventListener(\"readystatechange\", this.resultsPreprocessor(theApp), false);\n            serviceChannel.open(\"GET\", url, true);\n            serviceChannel.send();\n        }\n    }, {\n        key: \"resultsPreprocessor\",\n        value: function resultsPreprocessor(theApp) {\n            /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.\n            */\n            var thisService = this; // a reference to the instance created from this class\n            var eventHandler = function eventHandler(evt) {\n                thisService.results(evt, theApp);\n            };\n            return eventHandler;\n        }\n    }, {\n        key: \"results\",\n        value: function results(evt, theApp) {\n\n            if (evt.target.readyState == 4 && evt.target.status == 200) {\n                // assign this instance's productData to be the responseText\n                this.productData = evt.target.responseText;\n                // assign the app's productData to be the responseText too\n                theApp.productData = evt.target.responseText;\n                // tell the app to prepare the catalog\n                // there is another way to do it, with custom\n                // events. but this will work for now.\n                theApp.prepCatalog();\n                //console.log(evt.target.responseText);\n                // return evt.target.responseText;\n            }\n        }\n    }, {\n        key: \"getProducts\",\n        value: function getProducts() {\n            // this method explicity gets the products property\n            // from the JSON object. it assumes you have the JSON data\n            if (this.productData != null) {\n                var jsonData = JSON.parse(this.productData);\n                this.products = jsonData.products;\n                return this.products;\n            }\n\n            return; // if we have no data, return nothing\n        }\n    }]);\n\n    return BestBuyWebService;\n}();\n\nexports.default = BestBuyWebService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanM/ODQzYyJdLCJuYW1lcyI6WyJCZXN0QnV5V2ViU2VydmljZSIsInVybCIsImFwaUtleSIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJzZXJ2aWNlQ2hhbm5lbCIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3VsdHNQcmVwcm9jZXNzb3IiLCJvcGVuIiwic2VuZCIsInRoaXNTZXJ2aWNlIiwiZXZlbnRIYW5kbGVyIiwiZXZ0IiwicmVzdWx0cyIsInRhcmdldCIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJwcmVwQ2F0YWxvZyIsImpzb25EYXRhIiwiSlNPTiIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJcUJBLGlCO0FBRWpCLGlDQUFhO0FBQUE7O0FBQ1QsYUFBS0MsR0FBTCxHQUFVLEVBQVY7QUFDQSxhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7Ozs7Z0NBR09DLE0sRUFBTztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxnQkFBSUMsaUJBQWlCLElBQUlDLGNBQUosRUFBckI7QUFDQSxnQkFBSU4sTUFBTSxLQUFLQSxHQUFmOztBQUVBOzs7Ozs7Ozs7QUFTQUssMkJBQWVFLGdCQUFmLENBQWdDLGtCQUFoQyxFQUFtRCxLQUFLQyxtQkFBTCxDQUF5QkosTUFBekIsQ0FBbkQsRUFBb0YsS0FBcEY7QUFDQUMsMkJBQWVJLElBQWYsQ0FBb0IsS0FBcEIsRUFBMEJULEdBQTFCLEVBQThCLElBQTlCO0FBQ0FLLDJCQUFlSyxJQUFmO0FBQ0g7Ozs0Q0FFbUJOLE0sRUFBTztBQUN2Qjs7QUFFQSxnQkFBSU8sY0FBYyxJQUFsQixDQUh1QixDQUdDO0FBQ3hCLGdCQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsR0FBVCxFQUFhO0FBQzVCRiw0QkFBWUcsT0FBWixDQUFvQkQsR0FBcEIsRUFBd0JULE1BQXhCO0FBQ0gsYUFGRDtBQUdBLG1CQUFPUSxZQUFQO0FBQ0g7OztnQ0FFT0MsRyxFQUFJVCxNLEVBQU87O0FBRWYsZ0JBQUlTLElBQUlFLE1BQUosQ0FBV0MsVUFBWCxJQUF5QixDQUF6QixJQUE4QkgsSUFBSUUsTUFBSixDQUFXRSxNQUFYLElBQXFCLEdBQXZELEVBQTJEO0FBQ3ZEO0FBQ0EscUJBQUtmLFdBQUwsR0FBbUJXLElBQUlFLE1BQUosQ0FBV0csWUFBOUI7QUFDQTtBQUNBZCx1QkFBT0YsV0FBUCxHQUFxQlcsSUFBSUUsTUFBSixDQUFXRyxZQUFoQztBQUNBO0FBQ0E7QUFDQTtBQUNBZCx1QkFBT2UsV0FBUDtBQUNBO0FBQ0E7QUFDSDtBQUNKOzs7c0NBRVk7QUFDVDtBQUNBO0FBQ0EsZ0JBQUcsS0FBS2pCLFdBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDdkIsb0JBQUlrQixXQUFXQyxLQUFLQyxLQUFMLENBQVcsS0FBS3BCLFdBQWhCLENBQWY7QUFDQSxxQkFBS0MsUUFBTCxHQUFnQmlCLFNBQVNqQixRQUF6QjtBQUNBLHVCQUFPLEtBQUtBLFFBQVo7QUFDRjs7QUFFRCxtQkFUUyxDQVNEO0FBQ1g7Ozs7OztrQkFwRWdCSixpQiIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNy0wMS0yNy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZXN0QnV5V2ViU2VydmljZXtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMudXJsID1cIlwiO1xuICAgICAgICB0aGlzLmFwaUtleSA9IFwiXCI7XG4gICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2R1Y3RzID0gbnVsbDtcbiAgICB9XG5cblxuICAgIGdldERhdGEodGhlQXBwKXtcbiAgICAgICAgLy8gdGhlQXBwIGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBtYWluIGFwcFxuICAgICAgICAvLyB3ZSBjYW4gcGFzcyBpbmZvcm1hdGlvbiB0byBpdCwgaW5jbHVkaW5nIGRhdGFcbiAgICAgICAgLy8gdGhhdCBpcyByZXR1cm5lZCBmcm9tIHRoaXMgc2VydmljZVxuXG4gICAgICAgIGxldCBzZXJ2aWNlQ2hhbm5lbCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy51cmw7XG5cbiAgICAgICAgLypcbiAgICAgICAgLy8gKioqIFRvIHNvbHZlIHRoZSBpc3N1ZSBvZiBwYXNzaW5nIHRoZSBkYXRhIGJhY2sgdG8gdGhlIG1haW4gYXBwLi4uXG4gICAgICAgIC8vICoqKiBhbmQgZXZlbnR1YWxseSwgdG8gY2F0YWxvZ1ZpZXdcbiAgICAgICAgLy8gKioqIFlvdSBjb3VsZCB0aGUgYWRkRXZlbnRMaXN0ZW5lciB0byBjYWxsXG4gICAgICAgIC8vICoqKiBhIGRpZmZlcmVudCBmdW5jdGlvbiB3aGljaCB3aWxsIGhhdmUgYm90aFxuICAgICAgICAvLyAqKiogdGhlIGV2ZW50IG9iamVjdCBhbmQgZGF0YVBsYWNlSG9sZGVyIGFzIHBhcmFtZXRlcnNcbiAgICAgICAgLy8gKioqIHNlZSBodHRwOi8vYml0Lmx5L2pzLXBhc3Ntb3JlYXJnc2V2ZW50XG4gICAgICAgICAqL1xuXG4gICAgICAgIHNlcnZpY2VDaGFubmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsdGhpcy5yZXN1bHRzUHJlcHJvY2Vzc29yKHRoZUFwcCksZmFsc2UpO1xuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5vcGVuKFwiR0VUXCIsdXJsLHRydWUpO1xuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5zZW5kKCk7XG4gICAgfVxuXG4gICAgcmVzdWx0c1ByZXByb2Nlc3Nvcih0aGVBcHApe1xuICAgICAgICAvKnRoZSBhZGRFdmVudExpc3RlbmVyIGZ1bmN0aW9uIG5lYXIgbGluZSAyOSByZXF1aXJlcyBhIHByb3BlciBmdW5jdGlvbiAoYW4gZXZlbnQgaGFuZGxlcikgdG8gYmUgcmV0dXJuZWQgc28gd2UgY2FuIGNyZWF0ZSBvbmUgdG8gYmUgcmV0dXJuZWQuXG4gICAgICAgICovXG4gICAgICAgIGxldCB0aGlzU2VydmljZSA9IHRoaXM7IC8vIGEgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSBjcmVhdGVkIGZyb20gdGhpcyBjbGFzc1xuICAgICAgICBsZXQgZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24oZXZ0KXtcbiAgICAgICAgICAgIHRoaXNTZXJ2aWNlLnJlc3VsdHMoZXZ0LHRoZUFwcClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlclxuICAgIH07XG5cbiAgICByZXN1bHRzKGV2dCx0aGVBcHApe1xuXG4gICAgICAgIGlmIChldnQudGFyZ2V0LnJlYWR5U3RhdGUgPT0gNCAmJiBldnQudGFyZ2V0LnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgICAgLy8gYXNzaWduIHRoaXMgaW5zdGFuY2UncyBwcm9kdWN0RGF0YSB0byBiZSB0aGUgcmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3REYXRhID0gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvLyBhc3NpZ24gdGhlIGFwcCdzIHByb2R1Y3REYXRhIHRvIGJlIHRoZSByZXNwb25zZVRleHQgdG9vXG4gICAgICAgICAgICB0aGVBcHAucHJvZHVjdERhdGEgPSBldnQudGFyZ2V0LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIC8vIHRlbGwgdGhlIGFwcCB0byBwcmVwYXJlIHRoZSBjYXRhbG9nXG4gICAgICAgICAgICAvLyB0aGVyZSBpcyBhbm90aGVyIHdheSB0byBkbyBpdCwgd2l0aCBjdXN0b21cbiAgICAgICAgICAgIC8vIGV2ZW50cy4gYnV0IHRoaXMgd2lsbCB3b3JrIGZvciBub3cuXG4gICAgICAgICAgICB0aGVBcHAucHJlcENhdGFsb2coKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgLy8gcmV0dXJuIGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHMoKXtcbiAgICAgICAgLy8gdGhpcyBtZXRob2QgZXhwbGljaXR5IGdldHMgdGhlIHByb2R1Y3RzIHByb3BlcnR5XG4gICAgICAgIC8vIGZyb20gdGhlIEpTT04gb2JqZWN0LiBpdCBhc3N1bWVzIHlvdSBoYXZlIHRoZSBKU09OIGRhdGFcbiAgICAgICAgaWYodGhpcy5wcm9kdWN0RGF0YSE9bnVsbCl7XG4gICAgICAgICAgIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UodGhpcy5wcm9kdWN0RGF0YSk7XG4gICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSBqc29uRGF0YS5wcm9kdWN0cztcbiAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47IC8vIGlmIHdlIGhhdmUgbm8gZGF0YSwgcmV0dXJuIG5vdGhpbmdcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-28.\n */\n\n// this class is responsible for displaying the product data...\n// Perhaps in a carousel.\nvar CatalogView = function () {\n    function CatalogView() {\n        _classCallCheck(this, CatalogView);\n\n        this.carousel = document.getElementsByClassName(\"owl-carousel\");\n        // this.initCarousel();\n        this.theApp = null;\n    }\n\n    _createClass(CatalogView, [{\n        key: \"initCarousel\",\n        value: function initCarousel() {\n            console.log(\"initializing carousel\");\n            $(document).ready(function () {\n                $('.owl-carousel').owlCarousel({\n                    items: 1,\n                    loop: true,\n                    autoplay: true,\n                    responsive: {\n                        0: {\n                            items: 1\n                        }, //from zero to 600 screen\n                        601: {\n                            items: 2\n                        }, //from 600 to 1050 screen\n                        1050: {\n                            items: 4\n                        } //from 1050 to 1240 screen\n                    }\n\n                });\n            });\n            console.log(\"carousel active\");\n            /*\n             You should initialize the flickicity carousel here.\n             Right now this code just adds the div tags you would need to add\n             inside the carousel 'container'.\n             Note that this.carousel refers to the div by its class attribute.\n             Since more than one tag can belong to the same class,\n             you either have to give the carousel tag an id as well...or\n             refer to the carousel div tag as this.carousel[0] using bracket\n             notation (since classes mean their *could* be more than one tag\n             belonging to that class) - see line 88 below.\n             */\n            //this.carousel = document.getElementById(\"owl-carousel\");\n        }\n    }, {\n        key: \"onClickCartButton\",\n        value: function onClickCartButton(theApp) {\n            console.log(theApp);\n            return function (e) {\n                console.log(\"onClickButton\");\n                console.log(e.target.getAttribute(\"data-sku\"));\n                var sku = e.target.getAttribute(\"data-sku\");\n                console.log(theApp);\n                console.log(theApp.shoppingCart);\n                theApp.shoppingCart.addItemToCart(sku);\n            };\n        }\n    }, {\n        key: \"addProductsToCarousel\",\n        value: function addProductsToCarousel(products, theApp) {\n            this.theApp = theApp;\n            console.log(products);\n            if (products === undefined || products == null) {\n                return; // do not do anything! there is no data\n            }\n\n            /* the loop creates all the elements for each item in the carousel.\n             * it recreates the following structure\n             * <div class=\"product-wrapper\">\n             * <img src=\"images/stretch-knit-dress.jpg\" alt=\"Image of stretch knit dress\" />\n             * <p class=\"product-type\">Dresses</p>\n             * <h3>Stretch Knit Dress</h3>\n             * <p class=\"price\">$169.00</p>\n             * </div>\n             * */\n\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                console.log(product);\n                // each product is a product object\n                // use it to create the element\n\n                // create the DIV tag with class 'product-wrapper'\n                var newDiv = document.createElement(\"div\");\n                newDiv.setAttribute(\"class\", \"product-wrapper\");\n\n                // create a new IMG tag. Suggest to add data-sku attribute here too\n                // so that if you 'click' on the image, it would pop up a quick-view\n                // window and you can use the sku.\n                var newImg = document.createElement(\"img\");\n                newImg.setAttribute(\"src\", product.image);\n                newImg.setAttribute(\"alt\", \"\" + product.name); // this works too\n                newImg.setAttribute(\"data-sku\", product.sku);\n\n                // create a new Paragraph to show a description\n                var newPara = document.createElement(\"p\");\n                newPara.setAttribute(\"class\", \"product-type\");\n                var newParaTextNode = document.createTextNode(product.longDescription);\n                newPara.appendChild(newParaTextNode);\n\n                // create a new H3 tag to show the name\n                var newH3Tag = document.createElement(\"h3\");\n                var newH3TagTextNode = document.createTextNode(product.name);\n                newH3Tag.appendChild(newH3TagTextNode);\n\n                var newPricePara = document.createElement(\"p\");\n                newPricePara.setAttribute(\"class\", \"price\");\n                var newPriceParaTextNode = document.createTextNode(product.regularPrice);\n                newPricePara.appendChild(newPriceParaTextNode);\n\n                /* you will need similar code to create\n                 an add to cart and a quick view button\n                 remember that each button you create should have\n                 a data-sku attribute that corresponds to the sku\n                 of each product.\n                 */\n\n                var quickViewButton = document.createElement(\"button\");\n                quickViewButton.setAttribute(\"id\", \"qv_\" + product.sku);\n                quickViewButton.setAttribute(\"data-sku\", product.sku);\n                quickViewButton.setAttribute(\"type\", \"button\");\n                quickViewButton.setAttribute(\"class\", \"quickViewBtn\");\n                var quickViewTextNode = document.createTextNode(\"Quick View\");\n                quickViewButton.appendChild(quickViewTextNode);\n\n                var addToCartButton = document.createElement(\"button\");\n                addToCartButton.setAttribute(\"id\", \"cart_\" + product.sku);\n                addToCartButton.setAttribute(\"data-sku\", product.sku);\n                addToCartButton.setAttribute(\"type\", \"button\");\n                addToCartButton.setAttribute(\"class\", \"add2Cart\");\n                var addToCartTextNode = document.createTextNode(\"Add To Cart\");\n\n                addToCartButton.appendChild(addToCartTextNode);\n                console.log(\"this.theApp is\");\n                console.log(this.theApp);\n                addToCartButton.addEventListener(\"click\", this.onClickCartButton(this.theApp), false);\n                console.log(\"click cart button\");\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(newPara);\n                newDiv.appendChild(newH3Tag);\n                newDiv.appendChild(newPricePara);\n                newDiv.appendChild(quickViewButton);\n                newDiv.appendChild(addToCartButton);\n                this.carousel[0].appendChild(newDiv);\n                console.log(this.carousel[0]);\n            }\n            console.log(this.carousel[0]);\n            this.initCarousel();\n        }\n    }]);\n\n    return CatalogView;\n}();\n\nexports.default = CatalogView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ2F0YWxvZ1ZpZXcuanM/MDY1YSJdLCJuYW1lcyI6WyJDYXRhbG9nVmlldyIsImNhcm91c2VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidGhlQXBwIiwiY29uc29sZSIsImxvZyIsIiQiLCJyZWFkeSIsIm93bENhcm91c2VsIiwiaXRlbXMiLCJsb29wIiwiYXV0b3BsYXkiLCJyZXNwb25zaXZlIiwiZSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInNrdSIsInNob3BwaW5nQ2FydCIsImFkZEl0ZW1Ub0NhcnQiLCJwcm9kdWN0cyIsInVuZGVmaW5lZCIsInAiLCJsZW5ndGgiLCJwcm9kdWN0IiwibmV3RGl2IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsIm5ld0ltZyIsImltYWdlIiwibmFtZSIsIm5ld1BhcmEiLCJuZXdQYXJhVGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsImxvbmdEZXNjcmlwdGlvbiIsImFwcGVuZENoaWxkIiwibmV3SDNUYWciLCJuZXdIM1RhZ1RleHROb2RlIiwibmV3UHJpY2VQYXJhIiwibmV3UHJpY2VQYXJhVGV4dE5vZGUiLCJyZWd1bGFyUHJpY2UiLCJxdWlja1ZpZXdCdXR0b24iLCJxdWlja1ZpZXdUZXh0Tm9kZSIsImFkZFRvQ2FydEJ1dHRvbiIsImFkZFRvQ2FydFRleHROb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2xpY2tDYXJ0QnV0dG9uIiwiaW5pdENhcm91c2VsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFJQTtBQUNBO0lBQ3FCQSxXO0FBRWpCLDJCQUFjO0FBQUE7O0FBQ1YsYUFBS0MsUUFBTCxHQUFnQkMsU0FBU0Msc0JBQVQsQ0FBZ0MsY0FBaEMsQ0FBaEI7QUFDQTtBQUNBLGFBQUtDLE1BQUwsR0FBYyxJQUFkO0FBRUg7Ozs7dUNBRWM7QUFDWEMsb0JBQVFDLEdBQVIsQ0FBWSx1QkFBWjtBQUNBQyxjQUFFTCxRQUFG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VSxXQUFQLENBQW1CUCxNQUFuQjtBQUNBSCx1QkFBT1UsV0FBUCxDQUFtQkosT0FBbkI7QUFDQU4sdUJBQU9VLFdBQVAsQ0FBbUJDLFFBQW5CO0FBQ0FYLHVCQUFPVSxXQUFQLENBQW1CRyxZQUFuQjtBQUNBYix1QkFBT1UsV0FBUCxDQUFtQk0sZUFBbkI7QUFDQWhCLHVCQUFPVSxXQUFQLENBQW1CUSxlQUFuQjtBQUNBLHFCQUFLMUMsUUFBTCxDQUFjLENBQWQsRUFBaUJrQyxXQUFqQixDQUE2QlYsTUFBN0I7QUFDQXBCLHdCQUFRQyxHQUFSLENBQVksS0FBS0wsUUFBTCxDQUFjLENBQWQsQ0FBWjtBQUVIO0FBQ0RJLG9CQUFRQyxHQUFSLENBQVksS0FBS0wsUUFBTCxDQUFjLENBQWQsQ0FBWjtBQUNBLGlCQUFLOEMsWUFBTDtBQUNIOzs7Ozs7a0JBcEpZL0MsVyIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNy0wMS0yOC5cbiAqL1xuXG4vLyB0aGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIHRoZSBwcm9kdWN0IGRhdGEuLi5cbi8vIFBlcmhhcHMgaW4gYSBjYXJvdXNlbC5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGFsb2dWaWV3e1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwib3dsLWNhcm91c2VsXCIpO1xuICAgICAgICAvLyB0aGlzLmluaXRDYXJvdXNlbCgpO1xuICAgICAgICB0aGlzLnRoZUFwcCA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBpbml0Q2Fyb3VzZWwoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW5pdGlhbGl6aW5nIGNhcm91c2VsXCIpO1xuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLm93bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcbiAgICAgICAgICAgICAgICBpdGVtczoxLFxuICAgICAgICAgICAgICAgIGxvb3A6dHJ1ZSxcbiAgICAgICAgICAgICAgICBhdXRvcGxheTp0cnVlLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmUgOiB7XG4gICAgICAgICAgICAgICAgICAgIDA6e1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6MVxuICAgICAgICAgICAgICAgICAgICB9LCAvL2Zyb20gemVybyB0byA2MDAgc2NyZWVuXG4gICAgICAgICAgICAgICAgICAgIDYwMTp7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczoyXG4gICAgICAgICAgICAgICAgICAgIH0sIC8vZnJvbSA2MDAgdG8gMTA1MCBzY3JlZW5cbiAgICAgICAgICAgICAgICAgICAgMTA1MDp7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczo0XG4gICAgICAgICAgICAgICAgICAgIH0gLy9mcm9tIDEwNTAgdG8gMTI0MCBzY3JlZW5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNhcm91c2VsIGFjdGl2ZVwiKTtcbiAgICAgICAgLypcbiAgICAgICAgIFlvdSBzaG91bGQgaW5pdGlhbGl6ZSB0aGUgZmxpY2tpY2l0eSBjYXJvdXNlbCBoZXJlLlxuICAgICAgICAgUmlnaHQgbm93IHRoaXMgY29kZSBqdXN0IGFkZHMgdGhlIGRpdiB0YWdzIHlvdSB3b3VsZCBuZWVkIHRvIGFkZFxuICAgICAgICAgaW5zaWRlIHRoZSBjYXJvdXNlbCAnY29udGFpbmVyJy5cbiAgICAgICAgIE5vdGUgdGhhdCB0aGlzLmNhcm91c2VsIHJlZmVycyB0byB0aGUgZGl2IGJ5IGl0cyBjbGFzcyBhdHRyaWJ1dGUuXG4gICAgICAgICBTaW5jZSBtb3JlIHRoYW4gb25lIHRhZyBjYW4gYmVsb25nIHRvIHRoZSBzYW1lIGNsYXNzLFxuICAgICAgICAgeW91IGVpdGhlciBoYXZlIHRvIGdpdmUgdGhlIGNhcm91c2VsIHRhZyBhbiBpZCBhcyB3ZWxsLi4ub3JcbiAgICAgICAgIHJlZmVyIHRvIHRoZSBjYXJvdXNlbCBkaXYgdGFnIGFzIHRoaXMuY2Fyb3VzZWxbMF0gdXNpbmcgYnJhY2tldFxuICAgICAgICAgbm90YXRpb24gKHNpbmNlIGNsYXNzZXMgbWVhbiB0aGVpciAqY291bGQqIGJlIG1vcmUgdGhhbiBvbmUgdGFnXG4gICAgICAgICBiZWxvbmdpbmcgdG8gdGhhdCBjbGFzcykgLSBzZWUgbGluZSA4OCBiZWxvdy5cbiAgICAgICAgICovXG4gICAgICAgIC8vdGhpcy5jYXJvdXNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3dsLWNhcm91c2VsXCIpO1xuXG4gICAgfVxuXG4gICAgb25DbGlja0NhcnRCdXR0b24odGhlQXBwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoZUFwcCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbkNsaWNrQnV0dG9uXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIikpO1xuICAgICAgICAgICAgbGV0IHNrdSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhlQXBwKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZUFwcC5zaG9wcGluZ0NhcnQpO1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydC5hZGRJdGVtVG9DYXJ0KHNrdSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIGFkZFByb2R1Y3RzVG9DYXJvdXNlbChwcm9kdWN0cywgdGhlQXBwKXtcbiAgICAgICAgICAgIHRoaXMudGhlQXBwID0gdGhlQXBwO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdHMpO1xuICAgICAgICAgICAgaWYgKHByb2R1Y3RzID09PSB1bmRlZmluZWQgfHwgcHJvZHVjdHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gZG8gbm90IGRvIGFueXRoaW5nISB0aGVyZSBpcyBubyBkYXRhXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIHRoZSBsb29wIGNyZWF0ZXMgYWxsIHRoZSBlbGVtZW50cyBmb3IgZWFjaCBpdGVtIGluIHRoZSBjYXJvdXNlbC5cbiAgICAgICAgICAgICAqIGl0IHJlY3JlYXRlcyB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZVxuICAgICAgICAgICAgICogPGRpdiBjbGFzcz1cInByb2R1Y3Qtd3JhcHBlclwiPlxuICAgICAgICAgICAgICogPGltZyBzcmM9XCJpbWFnZXMvc3RyZXRjaC1rbml0LWRyZXNzLmpwZ1wiIGFsdD1cIkltYWdlIG9mIHN0cmV0Y2gga25pdCBkcmVzc1wiIC8+XG4gICAgICAgICAgICAgKiA8cCBjbGFzcz1cInByb2R1Y3QtdHlwZVwiPkRyZXNzZXM8L3A+XG4gICAgICAgICAgICAgKiA8aDM+U3RyZXRjaCBLbml0IERyZXNzPC9oMz5cbiAgICAgICAgICAgICAqIDxwIGNsYXNzPVwicHJpY2VcIj4kMTY5LjAwPC9wPlxuICAgICAgICAgICAgICogPC9kaXY+XG4gICAgICAgICAgICAgKiAqL1xuXG4gICAgICAgICAgICBmb3IgKGxldCBwID0gMDsgcCA8IHByb2R1Y3RzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb2R1Y3QgPSBwcm9kdWN0c1twXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0KTtcbiAgICAgICAgICAgICAgICAvLyBlYWNoIHByb2R1Y3QgaXMgYSBwcm9kdWN0IG9iamVjdFxuICAgICAgICAgICAgICAgIC8vIHVzZSBpdCB0byBjcmVhdGUgdGhlIGVsZW1lbnRcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgRElWIHRhZyB3aXRoIGNsYXNzICdwcm9kdWN0LXdyYXBwZXInXG4gICAgICAgICAgICAgICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbmV3RGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJvZHVjdC13cmFwcGVyXCIpO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IElNRyB0YWcuIFN1Z2dlc3QgdG8gYWRkIGRhdGEtc2t1IGF0dHJpYnV0ZSBoZXJlIHRvb1xuICAgICAgICAgICAgICAgIC8vIHNvIHRoYXQgaWYgeW91ICdjbGljaycgb24gdGhlIGltYWdlLCBpdCB3b3VsZCBwb3AgdXAgYSBxdWljay12aWV3XG4gICAgICAgICAgICAgICAgLy8gd2luZG93IGFuZCB5b3UgY2FuIHVzZSB0aGUgc2t1LlxuICAgICAgICAgICAgICAgIGxldCBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgcHJvZHVjdC5pbWFnZSk7XG4gICAgICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcImFsdFwiLCBgJHtwcm9kdWN0Lm5hbWV9YCk7IC8vIHRoaXMgd29ya3MgdG9vXG4gICAgICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIsIHByb2R1Y3Quc2t1KTtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBQYXJhZ3JhcGggdG8gc2hvdyBhIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgbGV0IG5ld1BhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICBuZXdQYXJhLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJvZHVjdC10eXBlXCIpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdQYXJhVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9kdWN0LmxvbmdEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgbmV3UGFyYS5hcHBlbmRDaGlsZChuZXdQYXJhVGV4dE5vZGUpO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IEgzIHRhZyB0byBzaG93IHRoZSBuYW1lXG4gICAgICAgICAgICAgICAgbGV0IG5ld0gzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdIM1RhZ1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocHJvZHVjdC5uYW1lKTtcbiAgICAgICAgICAgICAgICBuZXdIM1RhZy5hcHBlbmRDaGlsZChuZXdIM1RhZ1RleHROb2RlKTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXdQcmljZVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICBuZXdQcmljZVBhcmEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmljZVwiKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3UHJpY2VQYXJhVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9kdWN0LnJlZ3VsYXJQcmljZSk7XG4gICAgICAgICAgICAgICAgbmV3UHJpY2VQYXJhLmFwcGVuZENoaWxkKG5ld1ByaWNlUGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgICAgIC8qIHlvdSB3aWxsIG5lZWQgc2ltaWxhciBjb2RlIHRvIGNyZWF0ZVxuICAgICAgICAgICAgICAgICBhbiBhZGQgdG8gY2FydCBhbmQgYSBxdWljayB2aWV3IGJ1dHRvblxuICAgICAgICAgICAgICAgICByZW1lbWJlciB0aGF0IGVhY2ggYnV0dG9uIHlvdSBjcmVhdGUgc2hvdWxkIGhhdmVcbiAgICAgICAgICAgICAgICAgYSBkYXRhLXNrdSBhdHRyaWJ1dGUgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgc2t1XG4gICAgICAgICAgICAgICAgIG9mIGVhY2ggcHJvZHVjdC5cbiAgICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGxldCBxdWlja1ZpZXdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcXZfJHtwcm9kdWN0LnNrdX1gKTtcbiAgICAgICAgICAgICAgICBxdWlja1ZpZXdCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIiwgcHJvZHVjdC5za3UpO1xuICAgICAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInF1aWNrVmlld0J0blwiKTtcbiAgICAgICAgICAgICAgICBsZXQgcXVpY2tWaWV3VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlF1aWNrIFZpZXdcIik7XG4gICAgICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLmFwcGVuZENoaWxkKHF1aWNrVmlld1RleHROb2RlKTtcblxuICAgICAgICAgICAgICAgIGxldCBhZGRUb0NhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgY2FydF8ke3Byb2R1Y3Quc2t1fWApO1xuICAgICAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiLCBwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYWRkMkNhcnRcIik7XG4gICAgICAgICAgICAgICAgbGV0IGFkZFRvQ2FydFRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJBZGQgVG8gQ2FydFwiKTtcblxuICAgICAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5hcHBlbmRDaGlsZChhZGRUb0NhcnRUZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLnRoZUFwcCBpc1wiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRoZUFwcCk7XG4gICAgICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tDYXJ0QnV0dG9uKHRoaXMudGhlQXBwKSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGljayBjYXJ0IGJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3SW1nKTtcbiAgICAgICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UGFyYSk7XG4gICAgICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKG5ld0gzVGFnKTtcbiAgICAgICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhKTtcbiAgICAgICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQocXVpY2tWaWV3QnV0dG9uKTtcbiAgICAgICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0QnV0dG9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcm91c2VsWzBdLmFwcGVuZENoaWxkKG5ld0Rpdik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jYXJvdXNlbFswXSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2Fyb3VzZWxbMF0pO1xuICAgICAgICAgICAgdGhpcy5pbml0Q2Fyb3VzZWwoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NhdGFsb2dWaWV3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-29.\n */\n\nvar ShoppingCart = function () {\n    function ShoppingCart() {\n        _classCallCheck(this, ShoppingCart);\n\n        console.log(\"creating shopping cart\");\n        if (Storage) {\n            this.ss = sessionStorage;\n            // you can create a shoppingCart!\n            this.initShoppingCart();\n        } else {\n            console.log(\"Error! SessionStorage not supported in your browser!\");\n        }\n    }\n\n    _createClass(ShoppingCart, [{\n        key: \"initShoppingCart\",\n        value: function initShoppingCart() {\n            // create the sessionStorage object that will be used\n            // to store the items.\n            console.log(\"finished creating shopping cart\");\n        }\n    }, {\n        key: \"addItemToCart\",\n        value: function addItemToCart(sku) {\n            console.log(\"adding items to cart\");\n            var numMatches = 0;\n\n            for (var i = 0; i < this.ss.length; i++) {\n\n                if (this.ss.key(i) == sku) {\n                    console.log(\"I found an item with a matching sku : \" + sku);\n\n                    var oldQuanity = this.ss.getItem(sku);\n                    console.log(\"oldVal is equal to \" + oldQuanity);\n\n                    this.ss.setItem(sku, parseInt(oldQuanity) + 1);\n                    console.log(\"I just set the value to: \" + this.ss.getItem(sku));\n                    numMatches = 1;\n                    //break;\n                }\n            }\n            if (numMatches == 0) {\n                console.log(\"could not find sku in memory adding now\");\n                this.ss.setItem(sku, 1);\n            }\n        }\n    }, {\n        key: \"removeItemFromCart\",\n        value: function removeItemFromCart(sku) {}\n    }, {\n        key: \"updateQuantityofItemInCart\",\n        value: function updateQuantityofItemInCart(sku, qty) {}\n    }, {\n        key: \"clearCart\",\n        value: function clearCart() {\n            // clear the entire cart\n        }\n    }]);\n\n    return ShoppingCart;\n}();\n\nexports.default = ShoppingCart;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0LmpzPzc5MWEiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0IiwiY29uc29sZSIsImxvZyIsIlN0b3JhZ2UiLCJzcyIsInNlc3Npb25TdG9yYWdlIiwiaW5pdFNob3BwaW5nQ2FydCIsInNrdSIsIm51bU1hdGNoZXMiLCJpIiwibGVuZ3RoIiwia2V5Iiwib2xkUXVhbml0eSIsImdldEl0ZW0iLCJzZXRJdGVtIiwicGFyc2VJbnQiLCJxdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztJQUlxQkEsWTtBQUVqQiw0QkFBYTtBQUFBOztBQUNUQyxnQkFBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0EsWUFBR0MsT0FBSCxFQUFXO0FBQ1AsaUJBQUtDLEVBQUwsR0FBVUMsY0FBVjtBQUNBO0FBQ0EsaUJBQUtDLGdCQUFMO0FBQ0gsU0FKRCxNQUtBO0FBQ0lMLG9CQUFRQyxHQUFSLENBQVksc0RBQVo7QUFDSDtBQUNKOzs7OzJDQUVpQjtBQUNkO0FBQ0E7QUFDQUQsb0JBQVFDLEdBQVIsQ0FBWSxpQ0FBWjtBQUNIOzs7c0NBRWFLLEcsRUFBSTtBQUNkTixvQkFBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0EsZ0JBQUlNLGFBQWEsQ0FBakI7O0FBRUEsaUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtMLEVBQUwsQ0FBUU0sTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDOztBQUVyQyxvQkFBSyxLQUFLTCxFQUFMLENBQVFPLEdBQVIsQ0FBWUYsQ0FBWixLQUFrQkYsR0FBdkIsRUFBMkI7QUFDdkJOLDRCQUFRQyxHQUFSLENBQVksMkNBQTJDSyxHQUF2RDs7QUFFQSx3QkFBSUssYUFBYSxLQUFLUixFQUFMLENBQVFTLE9BQVIsQ0FBZ0JOLEdBQWhCLENBQWpCO0FBQ0FOLDRCQUFRQyxHQUFSLENBQVksd0JBQXdCVSxVQUFwQzs7QUFFQSx5QkFBS1IsRUFBTCxDQUFRVSxPQUFSLENBQWdCUCxHQUFoQixFQUFxQlEsU0FBU0gsVUFBVCxJQUF1QixDQUE1QztBQUNBWCw0QkFBUUMsR0FBUixDQUFZLDhCQUE4QixLQUFLRSxFQUFMLENBQVFTLE9BQVIsQ0FBZ0JOLEdBQWhCLENBQTFDO0FBQ0FDLGlDQUFhLENBQWI7QUFDQTtBQUNIO0FBRUo7QUFDRCxnQkFBR0EsY0FBYyxDQUFqQixFQUFtQjtBQUNmUCx3QkFBUUMsR0FBUixDQUFZLHlDQUFaO0FBQ0EscUJBQUtFLEVBQUwsQ0FBUVUsT0FBUixDQUFnQlAsR0FBaEIsRUFBb0IsQ0FBcEI7QUFDSDtBQUdKOzs7MkNBRWtCQSxHLEVBQUksQ0FFdEI7OzttREFFMEJBLEcsRUFBSVMsRyxFQUFJLENBRWxDOzs7b0NBRVU7QUFDUDtBQUNIOzs7Ozs7a0JBekRnQmhCLFkiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBFZHdhcmRfSl9BcG9zdG9sIG9uIDIwMTctMDEtMjkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcHBpbmdDYXJ0e1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGluZyBzaG9wcGluZyBjYXJ0XCIpO1xuICAgICAgICBpZihTdG9yYWdlKXtcbiAgICAgICAgICAgIHRoaXMuc3MgPSBzZXNzaW9uU3RvcmFnZTtcbiAgICAgICAgICAgIC8vIHlvdSBjYW4gY3JlYXRlIGEgc2hvcHBpbmdDYXJ0IVxuICAgICAgICAgICAgdGhpcy5pbml0U2hvcHBpbmdDYXJ0KCk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yISBTZXNzaW9uU3RvcmFnZSBub3Qgc3VwcG9ydGVkIGluIHlvdXIgYnJvd3NlciFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0U2hvcHBpbmdDYXJ0KCl7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2Vzc2lvblN0b3JhZ2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkXG4gICAgICAgIC8vIHRvIHN0b3JlIHRoZSBpdGVtcy5cbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5pc2hlZCBjcmVhdGluZyBzaG9wcGluZyBjYXJ0XCIpO1xuICAgIH1cblxuICAgIGFkZEl0ZW1Ub0NhcnQoc2t1KXtcbiAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgaXRlbXMgdG8gY2FydFwiKVxuICAgICAgICBsZXQgbnVtTWF0Y2hlcyA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5zcy5rZXkoaSkgPT0gc2t1KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgZm91bmQgYW4gaXRlbSB3aXRoIGEgbWF0Y2hpbmcgc2t1IDogXCIgKyBza3UpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG9sZFF1YW5pdHkgPSB0aGlzLnNzLmdldEl0ZW0oc2t1KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9sZFZhbCBpcyBlcXVhbCB0byBcIiArIG9sZFF1YW5pdHkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zcy5zZXRJdGVtKHNrdSwgcGFyc2VJbnQob2xkUXVhbml0eSkgKyAxKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkkganVzdCBzZXQgdGhlIHZhbHVlIHRvOiBcIiArIHRoaXMuc3MuZ2V0SXRlbShza3UpKTtcbiAgICAgICAgICAgICAgICBudW1NYXRjaGVzID0gMTtcbiAgICAgICAgICAgICAgICAvL2JyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgaWYobnVtTWF0Y2hlcyA9PSAwKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY291bGQgbm90IGZpbmQgc2t1IGluIG1lbW9yeSBhZGRpbmcgbm93XCIpXG4gICAgICAgICAgICB0aGlzLnNzLnNldEl0ZW0oc2t1LDEpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIHJlbW92ZUl0ZW1Gcm9tQ2FydChza3Upe1xuXG4gICAgfVxuXG4gICAgdXBkYXRlUXVhbnRpdHlvZkl0ZW1JbkNhcnQoc2t1LHF0eSl7XG5cbiAgICB9XG5cbiAgICBjbGVhckNhcnQoKXtcbiAgICAgICAgLy8gY2xlYXIgdGhlIGVudGlyZSBjYXJ0XG4gICAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TaG9wcGluZ0NhcnQuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("//export default class ShoppingCartView{\n//}\n\n\n//initShoppingCart(){\n//$(\"#cartIcon\").click(this, function (e) {\n//  $(\"#cartView\").fadeIn(\"slow\");\n//});\n//}\n\"use strict\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0Vmlldy5qcz81OWU5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7OztBQUdDO0FBQ0c7QUFDRTtBQUNGO0FBQ0oiLCJmaWxlIjoiNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcHBpbmdDYXJ0Vmlld3tcclxuLy99XHJcblxyXG5cclxuIC8vaW5pdFNob3BwaW5nQ2FydCgpe1xyXG4gICAgLy8kKFwiI2NhcnRJY29uXCIpLmNsaWNrKHRoaXMsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIC8vICAkKFwiI2NhcnRWaWV3XCIpLmZhZGVJbihcInNsb3dcIik7XHJcbiAgICAvL30pO1xyXG4vL31cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1Nob3BwaW5nQ2FydFZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);
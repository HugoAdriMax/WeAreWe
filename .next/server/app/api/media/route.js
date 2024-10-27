/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/media/route";
exports.ids = ["app/api/media/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Froute&page=%2Fapi%2Fmedia%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Froute.ts&appDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Froute&page=%2Fapi%2Fmedia%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Froute.ts&appDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_pascallevy_Desktop_dossier_sans_titre_preprod_app_api_media_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/media/route.ts */ \"(rsc)/./app/api/media/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/media/route\",\n        pathname: \"/api/media\",\n        filename: \"route\",\n        bundlePath: \"app/api/media/route\"\n    },\n    resolvedPagePath: \"/Users/pascallevy/Desktop/dossier sans titre/preprod/app/api/media/route.ts\",\n    nextConfigOutput,\n    userland: _Users_pascallevy_Desktop_dossier_sans_titre_preprod_app_api_media_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZtZWRpYSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbWVkaWElMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZtZWRpYSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnBhc2NhbGxldnklMkZEZXNrdG9wJTJGZG9zc2llciUyMHNhbnMlMjB0aXRyZSUyRnByZXByb2QlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGcGFzY2FsbGV2eSUyRkRlc2t0b3AlMkZkb3NzaWVyJTIwc2FucyUyMHRpdHJlJTJGcHJlcHJvZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMkI7QUFDeEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdlbmN5Lz9hZjNhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvcGFzY2FsbGV2eS9EZXNrdG9wL2Rvc3NpZXIgc2FucyB0aXRyZS9wcmVwcm9kL2FwcC9hcGkvbWVkaWEvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL21lZGlhL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvbWVkaWFcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL21lZGlhL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3Bhc2NhbGxldnkvRGVza3RvcC9kb3NzaWVyIHNhbnMgdGl0cmUvcHJlcHJvZC9hcHAvYXBpL21lZGlhL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Froute&page=%2Fapi%2Fmedia%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Froute.ts&appDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/media/route.ts":
/*!********************************!*\
  !*** ./app/api/media/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _app_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/lib/mongodb */ \"(rsc)/./app/lib/mongodb.ts\");\n/* harmony import */ var _app_models_Media__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/models/Media */ \"(rsc)/./app/models/Media.ts\");\n\n\n\n// GET /api/media - Récupérer tous les médias\nasync function GET() {\n    try {\n        await (0,_app_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const medias = await _app_models_Media__WEBPACK_IMPORTED_MODULE_2__.Media.find().sort({\n            createdAt: -1\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(medias);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erreur lors de la récupération des médias'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21lZGlhL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDRDtBQUNDO0FBRTNDLDZDQUE2QztBQUN0QyxlQUFlRztJQUNwQixJQUFJO1FBQ0YsTUFBTUYsNERBQVNBO1FBQ2YsTUFBTUcsU0FBUyxNQUFNRixvREFBS0EsQ0FBQ0csSUFBSSxHQUFHQyxJQUFJLENBQUM7WUFBRUMsV0FBVyxDQUFDO1FBQUU7UUFDdkQsT0FBT1AscURBQVlBLENBQUNRLElBQUksQ0FBQ0o7SUFDM0IsRUFBRSxPQUFPSyxPQUFPO1FBQ2QsT0FBT1QscURBQVlBLENBQUNRLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUE0QyxHQUNyRDtZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FnZW5jeS8uL2FwcC9hcGkvbWVkaWEvcm91dGUudHM/NjAyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgZGJDb25uZWN0IGZyb20gJ0AvYXBwL2xpYi9tb25nb2RiJztcbmltcG9ydCB7IE1lZGlhIH0gZnJvbSAnQC9hcHAvbW9kZWxzL01lZGlhJztcblxuLy8gR0VUIC9hcGkvbWVkaWEgLSBSw6ljdXDDqXJlciB0b3VzIGxlcyBtw6lkaWFzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGF3YWl0IGRiQ29ubmVjdCgpO1xuICAgIGNvbnN0IG1lZGlhcyA9IGF3YWl0IE1lZGlhLmZpbmQoKS5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obWVkaWFzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGVzIG3DqWRpYXMnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiQ29ubmVjdCIsIk1lZGlhIiwiR0VUIiwibWVkaWFzIiwiZmluZCIsInNvcnQiLCJjcmVhdGVkQXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/media/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/mongodb.ts":
/*!****************************!*\
  !*** ./app/lib/mongodb.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.MONGODB_URI) {\n    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');\n}\nconst MONGODB_URI = process.env.MONGODB_URI;\n/**\n * Global est utilisé ici pour maintenir une connexion cachée pendant le hot-reloading\n */ let globalWithMongoose = global;\nlet cached = globalWithMongoose.mongoose;\nif (!cached) {\n    cached = globalWithMongoose.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false,\n            dbName: 'sample_mflix'\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL21vbmdvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLElBQUksQ0FBQ0MsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLEVBQUU7SUFDNUIsTUFBTSxJQUFJQyxNQUFNO0FBQ2xCO0FBRUEsTUFBTUQsY0FBc0JGLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztBQUVuRDs7Q0FFQyxHQUNELElBQUlFLHFCQUFxQkM7QUFPekIsSUFBSUMsU0FBU0YsbUJBQW1CTCxRQUFRO0FBRXhDLElBQUksQ0FBQ08sUUFBUTtJQUNYQSxTQUFTRixtQkFBbUJMLFFBQVEsR0FBRztRQUFFUSxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUNyRTtBQUVBLGVBQWVDO0lBQ2IsSUFBSUgsT0FBT0MsSUFBSSxFQUFFO1FBQ2YsT0FBT0QsT0FBT0MsSUFBSTtJQUNwQjtJQUVBLElBQUksQ0FBQ0QsT0FBT0UsT0FBTyxFQUFFO1FBQ25CLE1BQU1FLE9BQU87WUFDWEMsZ0JBQWdCO1lBQ2hCQyxRQUFRO1FBQ1Y7UUFFQU4sT0FBT0UsT0FBTyxHQUFHVCx1REFBZ0IsQ0FBQ0csYUFBYVEsTUFBTUksSUFBSSxDQUFDLENBQUNmO1lBQ3pELE9BQU9BO1FBQ1Q7SUFDRjtJQUVBLElBQUk7UUFDRk8sT0FBT0MsSUFBSSxHQUFHLE1BQU1ELE9BQU9FLE9BQU87SUFDcEMsRUFBRSxPQUFPTyxHQUFHO1FBQ1ZULE9BQU9FLE9BQU8sR0FBRztRQUNqQixNQUFNTztJQUNSO0lBRUEsT0FBT1QsT0FBT0MsSUFBSTtBQUNwQjtBQUVBLGlFQUFlRSxTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdlbmN5Ly4vYXBwL2xpYi9tb25nb2RiLnRzPzgyZTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuaWYgKCFwcm9jZXNzLmVudi5NT05HT0RCX1VSSSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsJyk7XG59XG5cbmNvbnN0IE1PTkdPREJfVVJJOiBzdHJpbmcgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcblxuLyoqXG4gKiBHbG9iYWwgZXN0IHV0aWxpc8OpIGljaSBwb3VyIG1haW50ZW5pciB1bmUgY29ubmV4aW9uIGNhY2jDqWUgcGVuZGFudCBsZSBob3QtcmVsb2FkaW5nXG4gKi9cbmxldCBnbG9iYWxXaXRoTW9uZ29vc2UgPSBnbG9iYWwgYXMgdHlwZW9mIGdsb2JhbFRoaXMgJiB7XG4gIG1vbmdvb3NlOiB7XG4gICAgY29ubjogbnVsbCB8IHR5cGVvZiBtb25nb29zZTtcbiAgICBwcm9taXNlOiBudWxsIHwgUHJvbWlzZTx0eXBlb2YgbW9uZ29vc2U+O1xuICB9O1xufTtcblxubGV0IGNhY2hlZCA9IGdsb2JhbFdpdGhNb25nb29zZS5tb25nb29zZTtcblxuaWYgKCFjYWNoZWQpIHtcbiAgY2FjaGVkID0gZ2xvYmFsV2l0aE1vbmdvb3NlLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRiQ29ubmVjdCgpIHtcbiAgaWYgKGNhY2hlZC5jb25uKSB7XG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xuICB9XG5cbiAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXG4gICAgICBkYk5hbWU6ICdzYW1wbGVfbWZsaXgnLCAvLyBTcMOpY2lmaWUgbGUgbm9tIGRlIGxhIGJhc2UgZGUgZG9ubsOpZXNcbiAgICB9O1xuXG4gICAgY2FjaGVkLnByb21pc2UgPSBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJLCBvcHRzKS50aGVuKChtb25nb29zZSkgPT4ge1xuICAgICAgcmV0dXJuIG1vbmdvb3NlO1xuICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xuICAgIHRocm93IGU7XG4gIH1cblxuICByZXR1cm4gY2FjaGVkLmNvbm47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRiQ29ubmVjdDtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsIkVycm9yIiwiZ2xvYmFsV2l0aE1vbmdvb3NlIiwiZ2xvYmFsIiwiY2FjaGVkIiwiY29ubiIsInByb21pc2UiLCJkYkNvbm5lY3QiLCJvcHRzIiwiYnVmZmVyQ29tbWFuZHMiLCJkYk5hbWUiLCJjb25uZWN0IiwidGhlbiIsImUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./app/models/Media.ts":
/*!*****************************!*\
  !*** ./app/models/Media.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Media: () => (/* binding */ Media)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// app/models/Media.ts\n\n// Créer le schéma pour les médias\nconst mediaSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    filename: {\n        type: String,\n        required: true\n    },\n    url: {\n        type: String,\n        required: true\n    },\n    createdAt: {\n        type: Date,\n        default: Date.now\n    }\n});\n// Créer et exporter le modèle\n// Vérifie si le modèle existe déjà pour éviter l'erreur \"Cannot overwrite model once compiled\"\nconst Media = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Media || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Media', mediaSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbW9kZWxzL01lZGlhLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNCQUFzQjtBQUNzQjtBQVM1QyxrQ0FBa0M7QUFDbEMsTUFBTUUsY0FBYyxJQUFJRCw0Q0FBTUEsQ0FBUztJQUNyQ0UsVUFBVTtRQUNSQyxNQUFNQztRQUNOQyxVQUFVO0lBQ1o7SUFDQUMsS0FBSztRQUNISCxNQUFNQztRQUNOQyxVQUFVO0lBQ1o7SUFDQUUsV0FBVztRQUNUSixNQUFNSztRQUNOQyxTQUFTRCxLQUFLRSxHQUFHO0lBQ25CO0FBQ0Y7QUFFQSw4QkFBOEI7QUFDOUIsK0ZBQStGO0FBQ3hGLE1BQU1DLFFBQVFaLHdEQUFlLENBQUNZLEtBQUssSUFBSVoscURBQWMsQ0FBUyxTQUFTRSxhQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdlbmN5Ly4vYXBwL21vZGVscy9NZWRpYS50cz9kZjdhIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9tb2RlbHMvTWVkaWEudHNcbmltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEgfSBmcm9tICdtb25nb29zZSc7XG5cbi8vIETDqWZpbmlyIGwnaW50ZXJmYWNlIHBvdXIgbGUgdHlwZSBNZWRpYVxuZXhwb3J0IGludGVyZmFjZSBJTWVkaWEge1xuICBmaWxlbmFtZTogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xufVxuXG4vLyBDcsOpZXIgbGUgc2Now6ltYSBwb3VyIGxlcyBtw6lkaWFzXG5jb25zdCBtZWRpYVNjaGVtYSA9IG5ldyBTY2hlbWE8SU1lZGlhPih7XG4gIGZpbGVuYW1lOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0sXG4gIHVybDoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9LFxuICBjcmVhdGVkQXQ6IHtcbiAgICB0eXBlOiBEYXRlLFxuICAgIGRlZmF1bHQ6IERhdGUubm93XG4gIH1cbn0pO1xuXG4vLyBDcsOpZXIgZXQgZXhwb3J0ZXIgbGUgbW9kw6hsZVxuLy8gVsOpcmlmaWUgc2kgbGUgbW9kw6hsZSBleGlzdGUgZMOpasOgIHBvdXIgw6l2aXRlciBsJ2VycmV1ciBcIkNhbm5vdCBvdmVyd3JpdGUgbW9kZWwgb25jZSBjb21waWxlZFwiXG5leHBvcnQgY29uc3QgTWVkaWEgPSBtb25nb29zZS5tb2RlbHMuTWVkaWEgfHwgbW9uZ29vc2UubW9kZWw8SU1lZGlhPignTWVkaWEnLCBtZWRpYVNjaGVtYSk7Il0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwibWVkaWFTY2hlbWEiLCJmaWxlbmFtZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInVybCIsImNyZWF0ZWRBdCIsIkRhdGUiLCJkZWZhdWx0Iiwibm93IiwiTWVkaWEiLCJtb2RlbHMiLCJtb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/models/Media.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Froute&page=%2Fapi%2Fmedia%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Froute.ts&appDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
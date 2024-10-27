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
exports.id = "app/api/media/upload/route";
exports.ids = ["app/api/media/upload/route"];
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

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Fupload%2Froute&page=%2Fapi%2Fmedia%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Fupload%2Froute.ts&appDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Fupload%2Froute&page=%2Fapi%2Fmedia%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Fupload%2Froute.ts&appDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_pascallevy_Desktop_dossier_sans_titre_preprod_app_api_media_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/media/upload/route.ts */ \"(rsc)/./app/api/media/upload/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/media/upload/route\",\n        pathname: \"/api/media/upload\",\n        filename: \"route\",\n        bundlePath: \"app/api/media/upload/route\"\n    },\n    resolvedPagePath: \"/Users/pascallevy/Desktop/dossier sans titre/preprod/app/api/media/upload/route.ts\",\n    nextConfigOutput,\n    userland: _Users_pascallevy_Desktop_dossier_sans_titre_preprod_app_api_media_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZtZWRpYSUyRnVwbG9hZCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbWVkaWElMkZ1cGxvYWQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZtZWRpYSUyRnVwbG9hZCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnBhc2NhbGxldnklMkZEZXNrdG9wJTJGZG9zc2llciUyMHNhbnMlMjB0aXRyZSUyRnByZXByb2QlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGcGFzY2FsbGV2eSUyRkRlc2t0b3AlMkZkb3NzaWVyJTIwc2FucyUyMHRpdHJlJTJGcHJlcHJvZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDa0M7QUFDL0c7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdlbmN5Lz9kN2FkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvcGFzY2FsbGV2eS9EZXNrdG9wL2Rvc3NpZXIgc2FucyB0aXRyZS9wcmVwcm9kL2FwcC9hcGkvbWVkaWEvdXBsb2FkL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9tZWRpYS91cGxvYWQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9tZWRpYS91cGxvYWRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL21lZGlhL3VwbG9hZC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9wYXNjYWxsZXZ5L0Rlc2t0b3AvZG9zc2llciBzYW5zIHRpdHJlL3ByZXByb2QvYXBwL2FwaS9tZWRpYS91cGxvYWQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Fupload%2Froute&page=%2Fapi%2Fmedia%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Fupload%2Froute.ts&appDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/media/upload/route.ts":
/*!***************************************!*\
  !*** ./app/api/media/upload/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _app_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/lib/mongodb */ \"(rsc)/./app/lib/mongodb.ts\");\n/* harmony import */ var _app_models_Media__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/models/Media */ \"(rsc)/./app/models/Media.ts\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n// POST /api/media/upload - Uploader un nouveau média\nasync function POST(request) {\n    try {\n        const formData = await request.formData();\n        const file = formData.get('file');\n        if (!file) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Aucun fichier fourni'\n            }, {\n                status: 400\n            });\n        }\n        // Créer un nom de fichier unique\n        const filename = `${Date.now()}-${file.name}`;\n        const buffer = Buffer.from(await file.arrayBuffer());\n        const filePath = path__WEBPACK_IMPORTED_MODULE_4___default().join(process.cwd(), 'public/uploads', filename);\n        // Sauvegarder le fichier\n        await (0,fs_promises__WEBPACK_IMPORTED_MODULE_3__.writeFile)(filePath, buffer);\n        // Sauvegarder les informations dans la base de données\n        await (0,_app_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const media = await _app_models_Media__WEBPACK_IMPORTED_MODULE_2__.Media.create({\n            filename,\n            url: `/uploads/${filename}`,\n            createdAt: new Date()\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(media);\n    } catch (error) {\n        console.error('Upload error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erreur lors de l\\'upload du fichier'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21lZGlhL3VwbG9hZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEyQztBQUNEO0FBQ0M7QUFDSDtBQUNoQjtBQUV4QixxREFBcUQ7QUFDOUMsZUFBZUssS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTUQsUUFBUUMsUUFBUTtRQUN2QyxNQUFNQyxPQUFPRCxTQUFTRSxHQUFHLENBQUM7UUFFMUIsSUFBSSxDQUFDRCxNQUFNO1lBQ1QsT0FBT1IscURBQVlBLENBQUNVLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBdUIsR0FDaEM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLGlDQUFpQztRQUNqQyxNQUFNQyxXQUFXLEdBQUdDLEtBQUtDLEdBQUcsR0FBRyxDQUFDLEVBQUVQLEtBQUtRLElBQUksRUFBRTtRQUM3QyxNQUFNQyxTQUFTQyxPQUFPQyxJQUFJLENBQUMsTUFBTVgsS0FBS1ksV0FBVztRQUNqRCxNQUFNQyxXQUFXakIsZ0RBQVMsQ0FBQ21CLFFBQVFDLEdBQUcsSUFBSSxrQkFBa0JYO1FBRTVELHlCQUF5QjtRQUN6QixNQUFNVixzREFBU0EsQ0FBQ2tCLFVBQVVKO1FBRTFCLHVEQUF1RDtRQUN2RCxNQUFNaEIsNERBQVNBO1FBQ2YsTUFBTXdCLFFBQVEsTUFBTXZCLG9EQUFLQSxDQUFDd0IsTUFBTSxDQUFDO1lBQy9CYjtZQUNBYyxLQUFLLENBQUMsU0FBUyxFQUFFZCxVQUFVO1lBQzNCZSxXQUFXLElBQUlkO1FBQ2pCO1FBRUEsT0FBT2QscURBQVlBLENBQUNVLElBQUksQ0FBQ2U7SUFDM0IsRUFBRSxPQUFPZCxPQUFPO1FBQ2RrQixRQUFRbEIsS0FBSyxDQUFDLGlCQUFpQkE7UUFDL0IsT0FBT1gscURBQVlBLENBQUNVLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUFzQyxHQUMvQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FnZW5jeS8uL2FwcC9hcGkvbWVkaWEvdXBsb2FkL3JvdXRlLnRzPzhiYmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2FwcC9saWIvbW9uZ29kYic7XG5pbXBvcnQgeyBNZWRpYSB9IGZyb20gJ0AvYXBwL21vZGVscy9NZWRpYSc7XG5pbXBvcnQgeyB3cml0ZUZpbGUgfSBmcm9tICdmcy9wcm9taXNlcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLy8gUE9TVCAvYXBpL21lZGlhL3VwbG9hZCAtIFVwbG9hZGVyIHVuIG5vdXZlYXUgbcOpZGlhXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZm9ybURhdGEgPSBhd2FpdCByZXF1ZXN0LmZvcm1EYXRhKCk7XG4gICAgY29uc3QgZmlsZSA9IGZvcm1EYXRhLmdldCgnZmlsZScpIGFzIEZpbGU7XG4gICAgXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdBdWN1biBmaWNoaWVyIGZvdXJuaScgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIENyw6llciB1biBub20gZGUgZmljaGllciB1bmlxdWVcbiAgICBjb25zdCBmaWxlbmFtZSA9IGAke0RhdGUubm93KCl9LSR7ZmlsZS5uYW1lfWA7XG4gICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20oYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpKTtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncHVibGljL3VwbG9hZHMnLCBmaWxlbmFtZSk7XG5cbiAgICAvLyBTYXV2ZWdhcmRlciBsZSBmaWNoaWVyXG4gICAgYXdhaXQgd3JpdGVGaWxlKGZpbGVQYXRoLCBidWZmZXIpO1xuXG4gICAgLy8gU2F1dmVnYXJkZXIgbGVzIGluZm9ybWF0aW9ucyBkYW5zIGxhIGJhc2UgZGUgZG9ubsOpZXNcbiAgICBhd2FpdCBkYkNvbm5lY3QoKTtcbiAgICBjb25zdCBtZWRpYSA9IGF3YWl0IE1lZGlhLmNyZWF0ZSh7XG4gICAgICBmaWxlbmFtZSxcbiAgICAgIHVybDogYC91cGxvYWRzLyR7ZmlsZW5hbWV9YCxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG1lZGlhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdVcGxvYWQgZXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdFcnJldXIgbG9ycyBkZSBsXFwndXBsb2FkIGR1IGZpY2hpZXInIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiQ29ubmVjdCIsIk1lZGlhIiwid3JpdGVGaWxlIiwicGF0aCIsIlBPU1QiLCJyZXF1ZXN0IiwiZm9ybURhdGEiLCJmaWxlIiwiZ2V0IiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZmlsZW5hbWUiLCJEYXRlIiwibm93IiwibmFtZSIsImJ1ZmZlciIsIkJ1ZmZlciIsImZyb20iLCJhcnJheUJ1ZmZlciIsImZpbGVQYXRoIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJtZWRpYSIsImNyZWF0ZSIsInVybCIsImNyZWF0ZWRBdCIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/media/upload/route.ts\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Fupload%2Froute&page=%2Fapi%2Fmedia%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Fupload%2Froute.ts&appDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fpascallevy%2FDesktop%2Fdossier%20sans%20titre%2Fpreprod&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
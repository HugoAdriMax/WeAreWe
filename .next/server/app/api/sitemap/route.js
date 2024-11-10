"use strict";(()=>{var e={};e.id=407,e.ids=[407],e.modules={56037:e=>{e.exports=require("mongoose")},10846:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},29294:e=>{e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},70930:(e,r,t)=>{t.r(r),t.d(r,{patchFetch:()=>w,routeModule:()=>c,serverHooks:()=>g,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>m});var o={};t.r(o),t.d(o,{GET:()=>u});var n=t(42706),a=t(28203),i=t(45994),s=t(39187),l=t(12365),p=t(78284);async function u(){try{await (0,l.A)();let e=await p.n.find(),r=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.tolly.fr/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.tolly.fr/blog</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.tolly.fr/social-hooks</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${e.map(e=>`
  <url>
    <loc>https://www.tolly.fr/article/${e.slug}</loc>
    <lastmod>${new Date(e.date).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `).join("")}
</urlset>`;return new s.NextResponse(r,{headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=86400, stale-while-revalidate=3600"}})}catch(e){return s.NextResponse.json({error:"Erreur lors de la g\xe9n\xe9ration du sitemap"},{status:500})}}let c=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/sitemap/route",pathname:"/api/sitemap",filename:"route",bundlePath:"app/api/sitemap/route"},resolvedPagePath:"/Users/pascallevy/Documents/WeAreWe/app/api/sitemap/route.ts",nextConfigOutput:"",userland:o}),{workAsyncStorage:d,workUnitAsyncStorage:m,serverHooks:g}=c;function w(){return(0,i.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:m})}},12365:(e,r,t)=>{t.d(r,{A:()=>l});var o=t(56037),n=t.n(o);if(!process.env.MONGODB_URI)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let a=process.env.MONGODB_URI,i=global,s=i.mongoose;s||(s=i.mongoose={conn:null,promise:null});let l=async function(){if(s.conn)return s.conn;s.promise||(s.promise=n().connect(a,{bufferCommands:!1,dbName:"sample_mflix"}).then(e=>e));try{s.conn=await s.promise}catch(e){throw s.promise=null,e}return s.conn}},78284:(e,r,t)=>{t.d(r,{n:()=>i});var o=t(56037),n=t.n(o);let a=new o.Schema({title:{type:String,required:!0},slug:{type:String,required:!0,unique:!0},metaDescription:{type:String,required:!0},imageUrl:{type:String,required:!0},content:{type:String,required:!0},date:{type:Date,default:Date.now},author:{type:String,default:"WeAreWe Team"}}),i=n().models.Article||n().model("Article",a,"articles")}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[370,452],()=>t(70930));module.exports=o})();
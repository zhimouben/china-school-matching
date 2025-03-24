(()=>{var e={};e.id=931,e.ids=[931],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9778:(e,s,r)=>{"use strict";r.r(s),r.d(s,{GlobalError:()=>l.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>c,routeModule:()=>x,tree:()=>d});var t=r(482),a=r(9108),n=r(2563),l=r.n(n),i=r(8300),o={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>i[e]);r.d(s,o);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,6444)),"/Users/liudehua/Documents/出海/AI chosen/src/app/page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,1342)),"/Users/liudehua/Documents/出海/AI chosen/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/liudehua/Documents/出海/AI chosen/src/app/page.tsx"],m="/page",u={require:r,loadChunk:()=>Promise.resolve()},x=new t.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},8353:(e,s,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,6840,23)),Promise.resolve().then(r.t.bind(r,8771,23)),Promise.resolve().then(r.t.bind(r,3225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,3982,23))},4247:(e,s,r)=>{Promise.resolve().then(r.bind(r,3981))},8622:()=>{},3981:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>l});var t=r(5344),a=r(708);function n({label:e,name:s,register:r,error:a,type:n="text",required:l=!1,min:i,max:o,placeholder:d}){return(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("label",{htmlFor:s,className:"block text-sm font-medium text-gray-700",children:[e,l&&t.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),t.jsx("input",{id:s,type:n,...r(s,{required:l&&"此字段为必填项",min:void 0!==i?{value:i,message:`最小值为 ${i}`}:void 0,max:void 0!==o?{value:o,message:`最大值为 ${o}`}:void 0}),className:`block w-full rounded-md shadow-sm ${a?"border-red-300 focus:border-red-500 focus:ring-red-500":"border-gray-300 focus:border-blue-500 focus:ring-blue-500"}`,placeholder:d}),a&&t.jsx("p",{className:"mt-1 text-sm text-red-600",children:a.message})]})}function l(){let{register:e,handleSubmit:s,formState:{errors:r}}=(0,a.cI)(),l=async e=>{console.log("Form submitted:",e)};return(0,t.jsxs)("form",{onSubmit:s(l),className:"max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8",children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"国籍"}),(0,t.jsxs)("select",{...e("nationality",{required:"请选择国籍"}),className:"block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",children:[t.jsx("option",{value:"",children:"请选择国籍"}),t.jsx("option",{value:"US",children:"美国"}),t.jsx("option",{value:"UK",children:"英国"}),t.jsx("option",{value:"FR",children:"法国"}),t.jsx("option",{value:"DE",children:"德国"}),t.jsx("option",{value:"JP",children:"日本"}),t.jsx("option",{value:"KR",children:"韩国"})]}),r.nationality&&t.jsx("p",{className:"mt-1 text-sm text-red-600",children:r.nationality.message})]}),t.jsx(n,{label:"年龄",name:"age",type:"number",register:e,error:r.age,required:!0,min:16,max:100}),t.jsx(n,{label:"邮箱",name:"email",type:"email",register:e,error:r.email,required:!0,placeholder:"请输入邮箱地址"}),t.jsx(n,{label:"GPA",name:"gpa",type:"number",register:e,error:r.gpa,required:!0,min:0,max:4,placeholder:"请输入 GPA（0-4.0）"}),(0,t.jsxs)("div",{className:"space-y-2",children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"目标学位"}),(0,t.jsxs)("select",{...e("targetDegree",{required:"请选择目标学位"}),className:"block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",children:[t.jsx("option",{value:"",children:"请选择目标学位"}),t.jsx("option",{value:"bachelor",children:"本科"}),t.jsx("option",{value:"master",children:"硕士"}),t.jsx("option",{value:"phd",children:"博士"})]}),r.targetDegree&&t.jsx("p",{className:"mt-1 text-sm text-red-600",children:r.targetDegree.message})]}),t.jsx(n,{label:"目标专业",name:"targetMajor",register:e,error:r.targetMajor,required:!0,placeholder:"请输入目标专业"}),(0,t.jsxs)("div",{className:"space-y-2 md:col-span-2",children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"奖学金需求"}),(0,t.jsxs)("div",{className:"flex space-x-4",children:[(0,t.jsxs)("label",{className:"inline-flex items-center",children:[t.jsx("input",{type:"radio",...e("needScholarship",{required:"请选择是否需要奖学金"}),value:"needed",className:"form-radio"}),t.jsx("span",{className:"ml-2",children:"需要"})]}),(0,t.jsxs)("label",{className:"inline-flex items-center",children:[t.jsx("input",{type:"radio",...e("needScholarship",{required:"请选择是否需要奖学金"}),value:"optional",className:"form-radio"}),t.jsx("span",{className:"ml-2",children:"可有可无"})]})]}),r.needScholarship&&t.jsx("p",{className:"mt-1 text-sm text-red-600",children:r.needScholarship.message})]})]}),t.jsx("div",{className:"flex justify-center mt-8",children:t.jsx("button",{type:"submit",className:"bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors text-lg",children:"开始匹配"})})]})}},1342:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>n,metadata:()=>a});var t=r(5036);r(4315);let a={title:"中国留学匹配系统",description:"为国际学生提供中国大学匹配服务"};function n({children:e}){return t.jsx("html",{lang:"zh",children:t.jsx("body",{className:"min-h-screen bg-background font-sans antialiased",children:e})})}},6444:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>d,metadata:()=>o});var t=r(5036);let a=(0,r(6843).createProxy)(String.raw`/Users/liudehua/Documents/出海/AI chosen/src/components/forms/StudentForm.tsx`),{__esModule:n,$$typeof:l}=a,i=a.default,o={title:"中国留学学校匹配系统",description:"为国际学生提供智能化的中国高校匹配服务"};function d(){return t.jsx("main",{className:"min-h-screen bg-gradient-to-b from-blue-50 to-white py-8",children:(0,t.jsxs)("div",{className:"container mx-auto px-4",children:[t.jsx("h1",{className:"text-4xl font-bold text-center text-gray-800 mb-8",children:"中国留学学校匹配系统"}),t.jsx("p",{className:"text-center text-gray-600 mb-12 max-w-2xl mx-auto",children:"欢迎使用我们的智能匹配系统。请填写以下信息，我们将为您推荐最适合的中国高校和专业。"}),t.jsx(i,{})]})})}},4315:()=>{}};var s=require("../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[22,708],()=>r(9778));module.exports=t})();
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            欢迎使用中国留学匹配系统
          </h1>
          <p className="text-xl text-gray-600">
            为国际学生提供智能化的中国大学匹配服务
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">智能匹配</h3>
            <p className="text-gray-600">
              基于AI算法，根据你的背景和偏好，精准匹配最适合的大学和专业
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">全面信息</h3>
            <p className="text-gray-600">
              提供详细的院校信息、专业设置、奖学金政策等全方位资讯
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">🎓</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">申请指导</h3>
            <p className="text-gray-600">
              提供完整的申请流程指导，帮助你顺利完成留学申请
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="btn-primary px-8 py-3 text-lg">
            开始匹配
          </button>
        </div>
      </div>
    </main>
  );
} 
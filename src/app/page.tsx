export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/api/placeholder/80/80" 
              alt="RSU Logo" 
              className="w-20 h-20 mr-4"
            />
            <div>
              <h1 className="text-xl font-semibold">คลินิกเวชกรรมมหาวิทยาลัยรังสิต</h1>
              <p className="text-gray-600">RSU MEDICAL CLINIC</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg">การ ยืน-คืน วัสดุ อุปกรณ์ทางการแพทย์</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-gray-200 px-4 py-1 rounded-full text-sm flex items-center">
                <span className="mr-2">✓</span>
                ภาษาไทย
              </button>
              <button className="bg-gray-200 px-4 py-1 rounded-full text-sm">
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8 items-center">
        {/* Left side - Form illustration */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="w-64 h-64 bg-blue-500 rounded-t-lg p-4 relative">
            <div className="flex gap-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="bg-white rounded p-4">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 bg-blue-300 rounded flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-28"></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-8 bg-gray-100 rounded mb-2"></div>
                <div className="flex items-center">
                  <div className="h-1 bg-red-500 w-8"></div>
                  <div className="h-8 w-8 bg-blue-500 rounded-full ml-auto flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="mb-6">
              <input
                type="password"
                placeholder="******"
                className="w-64 px-4 py-2 bg-gray-200 rounded-lg text-center text-2xl tracking-widest"
              />
            </div>

            <div className="flex gap-4 w-full">
              <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                ลงทะเบียน
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
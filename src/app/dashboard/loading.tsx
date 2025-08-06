export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simulate dashboard layout */}
      <div className="transition-all duration-300 pl-0 md:pl-16">
        <div className="pt-16 md:pt-4">
          {/* Header placeholder */}
          <div className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mt-2"></div>
            </div>
          </div>
        </div>
        
        <main className="p-4 md:p-6 min-h-screen overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-6">
              {/* Title placeholder */}
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64"></div>
              </div>
              
              {/* Content placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
              
              {/* Table placeholder */}
              <div className="bg-white rounded-lg shadow p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex space-x-4">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 
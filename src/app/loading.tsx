export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative">
          {/* Route-specific spinner */}
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          
          {/* Pulse effect */}
          <div className="absolute inset-0 w-12 h-12 border-4 border-blue-100 rounded-full animate-ping opacity-20"></div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-600 font-medium">Loading page...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait</p>
        </div>
      </div>
    </div>
  );
} 
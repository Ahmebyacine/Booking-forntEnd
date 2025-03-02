
const LoadingCard = () => (
    <div className="rounded-lg border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all flex flex-col h-full animate-pulse">
      <div className="p-6 flex-1 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded-full w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )
  
export default LoadingCard;
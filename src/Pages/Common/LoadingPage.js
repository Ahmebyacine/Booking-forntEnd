import LoadingCard from "@/Component/LoadingCard";

const LoadingPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  )
}

export default LoadingPage;
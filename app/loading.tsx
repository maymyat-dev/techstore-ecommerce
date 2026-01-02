import { Spinner } from "@/components/ui/spinner"

const Loading = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <Spinner className="size-8 text-primary"/>
    </div>
  )
}

export default Loading
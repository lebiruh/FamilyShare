
import Image from "next/image"
import spinner from "../../public/spinner.gif"


const Loading = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Image
        src={spinner}
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  )
}

export default Loading
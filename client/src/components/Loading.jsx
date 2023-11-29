
import Image from "next/image"
import spinner from "../../public/spinner.gif"
import logo from "../../public/family_logo.jpg"

const Loading = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {/* <Image
        src={logo}
        alt="logo"
        width={100}
        height={75}
      /> */}
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
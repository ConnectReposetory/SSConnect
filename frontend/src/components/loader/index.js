import "./styles.css"
import loaderImage from "./asset/loader.svg"
function Loader() {
  return (
    <div className={'loaderContainer'}>
      <img className={'loader'} src={loaderImage} />
    </div>
  )
}

export default Loader

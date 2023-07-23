import './hero.scss'
import { images } from '../../images/image'
const Hero = () => {
  return (

        <div className="hero">

            <img src={images.heroImage} alt="" />
            <button className='btn btn-success'>Find Doctors</button>
        </div>

  )
}

export default Hero
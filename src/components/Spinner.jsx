import React from 'react'
import { FadeLoader} from 'react-spinners';
import './spinner.scss'

const Spinner = ({loading}) => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <FadeLoader color="#09bd3f"   loading={loading} size={50} />
      </div>
    </div>

  )
}

export default Spinner;
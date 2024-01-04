import React from 'react'
import './Wrapper.css';

const Wrapper = (props) => {
  return (
    <div className='wrapper-overlay'>
        <div className='wrapper-content'>
            {props.children}
        </div>
    </div>
  )
}

export default Wrapper;
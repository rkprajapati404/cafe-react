import React, { useEffect } from 'react';
import { getCafes } from '../services/CafeService';

const Home = () => {

  useEffect(() => {
    getCafes().then(response => {
      console.log(response);

    })
  }, [])

  return (
    <div>



    </div>
  )
}

export default Home
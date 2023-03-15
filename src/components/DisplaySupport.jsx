import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets';
import { SupCard } from '../components'

const DisplaySupport = ({ title, isloading, supports }) => {

  const navigate = useNavigate();

  const handleNavigate = (support) => {
    navigate(`/support-details/${support.title}`, { state: support })
  }


  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title}({supports.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isloading && (
          <img src={loader} alt="loader" className="w-[100x] h-[100px] object-contain" />
        )}

        {!isloading && supports.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You're Yet to Create a Support
          </p>
        )}
        {!isloading && supports.length > 0 && supports.map((support) => <SupCard
          key={support.id}
          {...support}
          handleClick={() => handleNavigate(support)}
        />)}
      </div>
    </div>
  )
}

export default DisplaySupport
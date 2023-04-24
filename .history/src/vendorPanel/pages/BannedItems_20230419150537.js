import axios from 'axios'
import React from 'react'
import HOC from '../layout/HOC'

const BannedItems = () => {

    const fetchData = async () => {
        try {
            const { data } = await axios.
        }catch(E) { 
            console.log(E)
        }
    }

  return (
    <>
            <section>
            <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
        All Banned Items
                  </span>
          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Notification
          </button>
          </div>
            </section>
    </>
  )
}

export default HOC(BannedItems)
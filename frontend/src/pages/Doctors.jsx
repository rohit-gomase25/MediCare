import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { AppContext } from "../contexts/AppContext";

const Doctors = () => {
  const {speciality} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [filterDoc, setfilterDoc] = useState([]);
  const {doctors} = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const applyFilter = () => {
    // Use pre-filtered doctors from navigation state if available
    if (location.state?.availableDoctors) {
      setfilterDoc(location.state.availableDoctors);
    } 
    // Otherwise filter by specialty only
    else if (speciality) {
      setfilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setfilterDoc(doctors);
    }
  }

  useEffect(()=> {
    applyFilter();
  },[doctors, speciality, location.state])

  return (
    <div>
        <p className="text-gray-600">Browse through the doctors specialist.</p>
       
        <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
          <div onClick={()=>setShowFilter(prev=> !prev)} className={`py-1 px-3 text-gray-600 border border-gray-500 w-fit rounded transition-all duration-500 sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filter</div>
          <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
            <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : "" }`}>Gynecologist</p>
            <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : "" }`}>Dermatologist</p>
            <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : "" }`}>Pediatricians</p>
            <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : "" }`}>Neurologist</p>
            <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : "" }`}>Gastroenterologist</p>
          </div>
          <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
            {filterDoc.map((item, index)=> (
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={index}>
                  <img className='bg-blue-50' src={item.image} alt="" />
                  <div className='p-4'>
                      <div className={`flex items-center gap-2 text-sm text-center ${ item.available ? 'text-green-500' : 'text-gray-500'} `}>
                          {
                              item.available
                              ? 
                              ( 
                                  <>
                                      <span className='relative w-2 h-2 rounded-full bg-emerald-400'> 
                                          <span className='absolute rounded-full inset-0 animate-ping bg-emerald-400'></span>
                                      </span>
                                      <p>Available</p>
                                  </>
                              )
                              :
                              (
                                  <>  
                                      <span className='w-2 h-2 rounded-full bg-gray-500'></span>
                                      <p className='text-gray-500'>Not Available</p>
                                  </>
                              )
                          }
                      </div>
                      <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                      <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Doctors

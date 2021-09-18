import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EntityId } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import JobEditAdd from './JobEditAdd'
import JobItem from './JobItem'
import { selJobById, selJobIds } from './jobSlice'


    const JobList =()=>{

// use -99 as dummy code when Id is undefined so app selector is not called condiitonally

  
      const [activeEditId, setactiveEditId] = useState<EntityId>(-99)
      const jobIds = useAppSelector(state=>selJobIds(state))
    	const existingJob = useAppSelector((state) => selJobById(state, activeEditId||-99)) 

     const  handleClick=(id:EntityId)=>{
       setactiveEditId(id )
       console.log('activeID', id)
      }

      return(  
        <>
        <JobEditAdd/>
        <ul>
				<div>
    {jobIds.map(id =><JobItem id = {id} key = {id}
        onClick={(e: React.MouseEvent) => handleClick(id)}
    />)}
		
		</div>
)


</ul>

</>
      )   

    }

export default JobList

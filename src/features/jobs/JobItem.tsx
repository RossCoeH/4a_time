import { EntityId } from '@reduxjs/toolkit'
import React, { PropsWithChildren } from 'react'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { selJobById } from './jobSlice'

interface IJobItem{
  id:EntityId
  onClick?:Function
}

const JobItem = ({id,onClick}:IJobItem )=>{
  const GetJobname= ((id:EntityId)=>useAppSelector((state:RootState) => selJobById(state, id)?.name))

const handleClick =(id:EntityId)=>{
  console.log(`click id`,  id)
     onClick && onClick(id)
}

  return (
    <div onClick={e=>handleClick(id)} >
      <p onClick={e=>handleClick(id)} >{`Job ${id}  : ${GetJobname(id)}`}</p>
    </div>
  )
}

export default JobItem

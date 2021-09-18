import { EntityState, Dictionary, EntityId } from '@reduxjs/toolkit'
import React, { useEffect, useState, useRef, FormEvent } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Job, jobAdd, jobUpdate, jobUpsert, selJobById, selJobIds } from './jobSlice'
import { store, RootState } from '../../app/store'
import JobItem from './JobItem'
import {
	 
    library,
    IconDefinition,
    IconLookup,
		findIconDefinition
} from '@fortawesome/fontawesome-svg-core';
import { faCheck, faPlusSquare, fas  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classicNameResolver } from 'typescript'
import classes from './JobEditAdd.module.css'
import { iteratorSymbol } from 'immer/dist/internal'
import { numericLiteral } from '@babel/types'
// library.add(fa)
library.add(fas)


interface jobEditAdd extends React.PropsWithChildren<any> {
	activeJobId?: EntityId
	onClick?:Function
	
}
interface IFieldError{
		field:string,
		errormsg:string
}		

interface IMsgError{
	errorFields:IFieldError[],
	fieldname: keyof IFieldError
}

const JobEditAdd = ({activeJobId,onClick}:jobEditAdd )=> {
	const refInputId = useRef<HTMLInputElement>(null)
	const refInputName = useRef<HTMLInputElement>(null)
	const dispatch = useAppDispatch()

	const existingId = activeJobId

	const [idValue, setIdValue] = useState<number | string>('')
	const [entValue, setEntValue] = useState<Job | undefined>(undefined)
	const [isEdit, setIsEdit] = useState(false)
 

  const [fieldErrors, setFieldErrors] = useState<IFieldError[]>([])
  const activeItem= ((activeJobId:EntityId)=>useAppSelector((state:RootState) => selJobById(state, activeJobId)))

	const IconAdd:IconDefinition =  fas.faPlusSquare  // <FontAwesomeIcon icon="fa-solid fa-square-plus" 
	const IconTick:IconDefinition = fas.faCheck 
	const IconUndo:IconDefinition =  fas.faArrowRotateLeft     
	useEffect(() => {
		if (activeJobId) {
			setIdValue(activeJobId)
			console.log(`active job changed`, activeJobId)
		}
	}, [activeJobId])


	const handleAdd = (e: FormEvent | React.SyntheticEvent) => {
		e.preventDefault()

		const curId = refInputId.current?.value
		let curName = refInputName.current?.value

		if (!curId) {
			console.log(`curId is not valid`, curId)
			return
		}

		if (curName && curName?.length > 0) {
			const trimName = curName.trim()

			if (trimName.length > 0) {
				const newJob: Job = { id: Number(curId), name: trimName }

				dispatch(jobAdd(newJob))
			}
		}
  }

	const handleEdit = (e: FormEvent | React.SyntheticEvent) => {
		e.preventDefault()

		const curId = refInputId.current?.value
		let curName = refInputName.current?.value

		if (!curId) {
			console.log(`curId is not valid`, curId)
			return
		}

		if (curName && curName?.length > 0) {
			const trimName = curName.trim()

			if (trimName.length > 0) {
				const newJob: Job = { id: Number(curId), name: trimName }

				dispatch(jobUpsert(newJob))
			}
		}
  }

		const handleIdChange = (e: any) => {
			setIdValue(e.target.value)
     // existingJob=(e.target.value)
      console.log(`ExistingJob`, )
      console.log(`New job e.target.value`, e.target.value)
		}


const ErrorMsg=({errorFields,fieldname}:IMsgError)=>{
const output1 =	errorFields.filter(item=>item.field===fieldname).map(item2=>
item2.errormsg?<p>{item2.errormsg}</p>:null)
return(<>{output1}</>)}

return (
      <div>
			<form 
			className={classes.editZone}
			onSubmit={handleAdd}>
				<label>id</label>
				<input
					type='number'
					min={0}
					ref={refInputId}
					onChange={handleIdChange}
					value={ if(activeItem=== undefined) '' else
						activeItem.id)}
				></input>
			<ErrorMsg   errorFields={fieldErrors}  fieldname={ 'id' as keyof IFieldError}/>
				<label htmlFor='name'></label>
				<input
					id='name'
					type='text'
					ref={refInputName}
					value={activeItem.name}
					onSubmit={isEdit?handleEdit:handleAdd}
				></input>
						<ErrorMsg   errorFields={fieldErrors}  fieldname={ 'name' as keyof IFieldError}/>
				<button onClick={handleAdd}>{isEdit?'Update':'Add'}</button>
        <p> isEditing : {isEdit? 'Yes':'No'}</p>
				 <FontAwesomeIcon icon={IconAdd} />
			</form>
</div>
)
}
export default JobEditAdd

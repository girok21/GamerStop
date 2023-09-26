import { useState, useEffect } from 'react';
import {Form} from 'react-bootstrap'


const CheckboxProductFilter = (props) => {
    const { filterArray, changeFilterArray } = props;
    const [ filterChecksArray, setFilterChecksArray ] = useState(
        filterArray.map((filter, id)=>(
            {name: filter, id, checked: false}
        ))
    );
    const [ checkedFiltersArray, setCheckedFiltersArray ] = useState([]);
    // 
    // useEffect(()=>{
    //     console.log(checkedFiltersArray);
    // },[checkedFiltersArray])
    
    return (
        <>
            {
                filterChecksArray.map((filterObject, id)=>(
                    <Form.Check 
                        label={filterObject.name}
                        type='checkbox'
                        checked={filterObject.checked}
                        key={filterObject.id}
                        onChange={()=>{
                            const arrCopy = [...checkedFiltersArray];
                            const index = arrCopy.indexOf(filterObject.name);
                            if(index !== -1){
                                arrCopy.splice(index, 1);
                            }else{
                                arrCopy.push(filterObject.name);
                            }
                            setCheckedFiltersArray(arrCopy);
                            changeFilterArray(checkedFiltersArray);
                            // const currChecks = filterChecksArray;
                                // currChecks[filterObject.id].checked = !filterObject.checked;
                            const currChecks = [...filterChecksArray];
                            currChecks[filterObject.id].checked = !filterObject.checked;
                            setFilterChecksArray(currChecks);
                            console.log(checkedFiltersArray)
                        }}
                    />
                ))
            }
        </>
    )
}

export default CheckboxProductFilter
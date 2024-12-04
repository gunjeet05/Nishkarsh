import React from 'react'
type dataType={
    data?:{
        client?:{
            name?:string
        }
    }

}
const NewComponent = ({data}:dataType) => {
    // console.log("Data in new component", data);
  return (
    <div>
      
      {data?.client?.name? data.client.name:'Name is not available'}
    </div>
  )
}

export default NewComponent

import React from 'react'

const AdminShowImage = ({data}) => {
  return (
    <div>
        <img src={data?.image?.href?.url || ""} alt="website" />
    </div>
  )
}

export default AdminShowImage
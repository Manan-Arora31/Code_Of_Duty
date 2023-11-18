import React, { useEffect, useState } from 'react'
// import { getServerData } from '../helper/helper'

export default function ResultTable() {

    // const [data, setData] = useState([])

    // useEffect(() => {
    //     getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, (res) => {
    //         setData(res)
    //     })
    // })

  return (
    <div>
        <table>
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Name</td>
                    <td>Attemps</td>
                    <td>Earn Points</td>
                    <td>Result</td>
                </tr>
            </thead>
            <tbody>                  
                        <tr className='table-body' >
                            
                        </tr>
                
            </tbody>
        </table>
    </div>
  )
}

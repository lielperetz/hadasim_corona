import React from 'react'
import { Link } from 'react-router-dom'
import Member from './Member'
import './style.css'

export default function MembersList(props) {
  return (
    <div>
      <h1>HMO's Members</h1>
      <Link to='/add'><button className='add-btn'>Add new member</button></Link>
      {props.members.map((m) => {
        return <Member member={m} delete={props.delete} />
      })}
    </div>
  )
}

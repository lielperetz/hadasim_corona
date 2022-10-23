import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

export default function Member(props) {
    const nav = useNavigate();
    return (
        <div className='divM'>
            <p className='name' onClick={() => nav(`member${props.member.id}`)}>{props.member.firstName} {props.member.lastName}</p>
            <button className='btn-edit' onClick={() => nav(`add${props.member.id}`)}>&#9998;</button>
            <button className='btn-edit' onClick={() => props.delete(props.member.id)}>&#9249;</button>
        </div>
    )
}

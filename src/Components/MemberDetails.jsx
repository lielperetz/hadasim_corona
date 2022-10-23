import React from 'react'
import './style.css'
import moment from 'moment';
import { useNavigate } from "react-router-dom";

export default function MemberDetails(props) {
    const nav = useNavigate();
    return (
        <div>
            <h1>{props.member.firstName} {props.member.lastName}</h1>
            <button onClick={() => nav('/')}>Back</button>
            <div className="details">
                <p><b>Id:</b> {props.member.id}</p>
                {(props.member.birthDate) && <p><b>Birth:</b> {moment(props.member.birthDate).format('yyyy-MM-DD')}</p>}
                <p><b>Address:</b> {props.member.address}</p>
                <p><b>Phone:</b> {props.member.phone}</p>
                <p><b>Cellphone:</b> {props.member.cellphone}</p>
                {props.member.vaccineDates.map((v) => {
                    return <p><b>Vaccine date:</b> {v.date} <b> Vaccine manufacturer:</b> {v.man} </p>
                })}
                {(props.member.positiveResultDate) && <p><b>Positive Result Date:</b> {moment(props.member.positiveResultDate).format('yyyy-MM-DD')}</p>}
                {(props.member.recoveryDate) && <p><b>Recovery Date:</b> {moment(props.member.recoveryDate).format('yyyy-MM-DD')}</p>}
            </div>
        </div>
    )
}

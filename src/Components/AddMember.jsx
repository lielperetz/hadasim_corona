import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

export default function AddMember(props) {
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState();
    const [address, setaAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [v1, setV1] = useState();
    const [m1, setM1] = useState();
    const [v2, setV2] = useState();
    const [m2, setM2] = useState();
    const [v3, setV3] = useState();
    const [m3, setM3] = useState();
    const [v4, setV4] = useState();
    const [m4, setM4] = useState();
    const [positiveResultDate, setPositiveResultDate] = useState();
    const [recoveryDate, setRecoveryDate] = useState();

    const [addOrUpdate, setAddOrUpdate] = useState(false)

    const nav = useNavigate();

    useEffect(() => {
        if (props.memberToUpdate) {
            setAddOrUpdate(true); //set to true in update mode
            setId(props.memberToUpdate.id);
            setFirstName(props.memberToUpdate.firstName);
            setLastName(props.memberToUpdate.lastName);
            if (props.memberToUpdate.birthDate) setBirthDate(moment(props.memberToUpdate.birthDate).format('yyyy-MM-DD'));
            setaAddress(props.memberToUpdate.address);
            setPhone(props.memberToUpdate.phone);
            setCellphone(props.memberToUpdate.cellphone);

            for (let i = 0; i < props.memberToUpdate.vaccineDates.length; i++) {
                if (i === 0) {
                    setV1(moment(props.memberToUpdate.vaccineDates[0].date).format('yyyy-MM-DD'));
                    setM1(props.memberToUpdate.vaccineDates[0].man)
                } else if (i === 1) {
                    setV2(moment(props.memberToUpdate.vaccineDates[1].date).format('yyyy-MM-DD'));
                    setM2(props.memberToUpdate.vaccineDates[1].man)
                } else if (i === 2) {
                    setV3(moment(props.memberToUpdate.vaccineDates[2].date).format('yyyy-MM-DD'));
                    setM3(props.memberToUpdate.vaccineDates[2].man)
                } else if (i === 4) {
                    setV4(moment(props.memberToUpdate.vaccineDates[3].date).format('yyyy-MM-DD'));
                    setM4(props.memberToUpdate.vaccineDates[3].man)
                }
            }
            if (props.memberToUpdate.positiveResultDate) setPositiveResultDate(moment(props.memberToUpdate.positiveResultDate).format('yyyy-MM-DD'));
            if (props.memberToUpdate.recoveryDate) setRecoveryDate(moment(props.memberToUpdate.recoveryDate).format('yyyy-MM-DD'));
        }
    }, []);
    const validate = () => {
        let isValid = true;
        if (!id || id.length !== 9) {
            isValid = false;
            alert('Id is incorrect!!');
        }
        else if (!firstName.match(/^[a-zA-Z]+$/) || !lastName.match(/^[a-zA-Z]+$/)) {
            isValid = false;
            alert("Name must contain letters only!!");
        }
        else if (!birthDate || moment(birthDate).isAfter(new Date())) {
            isValid = false;
            alert("Birth date is incorrect!!");
        }
        else if (!/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/.test(phone)) {
            isValid = false;
            alert("Phone is incorrect!!")
        }
        else if (!/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/.test(cellphone)) {
            isValid = false;
            alert("Cellphone is incorrect!!")
        }
        if (isValid) {
            let vaccineDates = [];
            if (v1) vaccineDates.push({ date: v1, man: m1 });
            if (v2) vaccineDates.push({ date: v2, man: m2 });
            if (v3) vaccineDates.push({ date: v3, man: m3 });
            if (v4) vaccineDates.push({ date: v4, man: m4 });

            if (addOrUpdate) {
                props.update({ id, firstName, lastName, birthDate, address, phone, cellphone, vaccineDates, positiveResultDate, recoveryDate });
            } else {
                props.add({ id, firstName, lastName, birthDate, address, phone, cellphone, vaccineDates, positiveResultDate, recoveryDate });
            }
            nav('/');
        }
        return false;
    }
    return (
        <div>
            {addOrUpdate ? <h1>Update</h1> : <h1>Add a New Member</h1>}
            <button onClick={() => nav('/')}>Back</button><br />
            <b><span style={{ color: 'red' }}>*</span>Id: </b><input type="text" placeholder='123456789' onChange={(e) => setId(e.target.value)} value={id} /><br /><br />
            <b><span style={{ color: 'red' }}>*</span>First name: </b><input type="text" placeholder='Israel' onChange={(e) => setFirstName(e.target.value)} value={firstName} /><br /><br />
            <b><span style={{ color: 'red' }}>*</span>Last name: </b><input type="text" placeholder='Israeli' onChange={(e) => setLastName(e.target.value)} value={lastName} /><br /><br />
            <b><span style={{ color: 'red' }}>*</span>Birth date: </b><input type="date" onChange={(e) => setBirthDate(e.target.value)} value={birthDate} /><br /><br />
            <b><span style={{ color: 'red' }}>*</span>Address: </b><input type="text" placeholder='Gefen 11, Netivot' onChange={(e) => setaAddress(e.target.value)} value={address} /><br /><br />
            <b>Phone: </b><input type="text" placeholder='089912345' onChange={(e) => setPhone(e.target.value)} value={phone} /><br /><br />
            <b><span style={{ color: 'red' }}>*</span>Cellphone: </b><input type="text" placeholder='0501234567' onChange={(e) => setCellphone(e.target.value)} value={cellphone} /><br /><br />

            <h3>Fill as much as vaccines he got and the manufacturer of each one</h3>
            <b>Vaccine No.1: </b><input type="date" className='v' value={v1} onChange={(e) => setV1(e.target.value)} /><b> manufacturer: </b><input type="string" className='m' value={m1} onChange={(e) => setM1(e.target.value)} /><br />
            <b>Vaccine No.2: </b><input type="date" className='v' value={v2} onChange={(e) => setV2(e.target.value)} /><b> manufacturer: </b><input type="string" className='m' value={m2} onChange={(e) => setM2(e.target.value)} /><br />
            <b>Vaccine No.3: </b><input type="date" className='v' value={v3} onChange={(e) => setV3(e.target.value)} /><b> manufacturer: </b><input type="string" className='m' value={m3} onChange={(e) => setM3(e.target.value)} /><br />
            <b>Vaccine No.4: </b><input type="date" className='v' value={v4} onChange={(e) => setV4(e.target.value)} /><b> manufacturer: </b><input type="string" className='m' value={m4} onChange={(e) => setM4(e.target.value)} /><br /><br />

            <h3>Fill in the following fields only if he was sick with corona</h3>
            <b>Get positive result date: </b><input type="date" onChange={(e) => setPositiveResultDate(e.target.value)} value={positiveResultDate} /><br />
            <b>Recovery date: </b><input type="date" onChange={(e) => setRecoveryDate(e.target.value)} value={recoveryDate} /><br /><br />
            <button onClick={() => validate()}>Save</button>
        </div >
    )
}

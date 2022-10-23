import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import MembersList from './Components/MembersList';
import MemberDetails from './Components/MemberDetails';
import AddMember from './Components/AddMember';

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('/getData').then((res) => {
      return res.json();
    }).then((data) => {
      setMembers(data);
    }).catch((err) => {
      alert(err);
    });
  });

  const addMember = (m) => {
    fetch('/addMember', {
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ newMember: m })
    }).then((res) => {
      res.json();
    }).then((data) => {
      alert('New member added successfully!!')
    }).catch((err) => {
      alert(err)
    });
  }

  const deleteMember = (id) => {
    fetch('/delete', {
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify({ id: id })
    }).then((res) => {
      res.json();
    }).then((data) => {
      alert('Deleted successfully!!');
    }).catch((err) => {
      alert(err)
    });
  }

  const update = (mem) => {
    fetch('/updateDetails', {
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ member: mem })
    }).then((res) => {
      res.json();
    }).then((data) => {
      alert('Updated successfully!!');
    }).catch((err) => {
      alert(err)
    });
  }

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<MembersList members={members} delete={deleteMember} />} />
          {members.map((m) => {
            return <Route path={`member${m.id}`} element={<MemberDetails member={m} />} />
          })}
          <Route path='/add' element={<AddMember add={addMember} />} />
          {members.map((m) => {
            return <Route path={`add${m.id}`} element={<AddMember memberToUpdate={m} update={update} />} />
          })}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const db = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('build'))

db.connect('mongodb://localhost:27017/corona', () => {
    console.log('db connected');
})
const membersSchema = db.Schema({
    id: String,
    firstName: String,
    lastName: String,
    birthDate: String,
    address: String,
    phone: String,
    cellphone: String,
    vaccineDates: [{}, {}, {}, {}],
    positiveResultDate: String,
    recoveryDate: String
});
const membersList = db.model('corona', membersSchema);

app.get('/getData', (req, res) => {
    const getMembers = async () => {
        let arr = await membersList.find()
        res.send(arr);
    }
    getMembers();
})

app.post('/addMember', (req, res) => {
    let temp = req.body.newMember;
    const add = async (t) => {
        await membersList.insertMany(t);
        res.redirect('/');
    }
    add(temp);
})

app.delete('/delete', (req, res) => {
    let id = req.body.id;
    const removeMember = async (id) => {
        await membersList.deleteOne({ id: id }).then(() => {
            res.json({ status: 'ok' })
        }).catch((err) => { console.error(err) })
    }
    removeMember(id);
})

app.post('/updateDetails', (req, res) => {
    let mem = req.body.member
    const updateMem = async (m) => {
        await membersList.updateOne(
            {
                id: m.id
            },
            {
                $set: {
                    firstName: m.firstName,
                    lastName: m.lastName,
                    birthDate: m.birthDate,
                    address: m.address,
                    phone: m.phone,
                    cellphone: m.cellphone,
                    vaccineDates: [...m.vaccineDates],
                    positiveResultDate: m.positiveResultDate,
                    recoveryDate: m.recoveryDate
                }
            });

    }
    updateMem(mem);
})

app.listen(8080, () => {
    console.log('app listening at port 8080');
})
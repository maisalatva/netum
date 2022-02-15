import React, { useState } from 'react';
import './App.css';
import { Person } from './person';

const headers = [
  { key: "surname", label: "Sukunimi" },
  { key: "firstname", label: "Etunimi" },
  { key: "age", label: "Ikä" },
  { key: "id", label: "Poista", }
]

let surname: string;
let firstname: string;
let age: string;

function setSurname(newName: string) {
  surname = newName
}
function setFirstname(newName: string) {
  firstname = newName
}
function setAge(newAge: string) {
  age = newAge
}

function deletePerson(person:Person,persons:Person[]) {
  persons = persons.filter(x => x !== person)
  return persons
}

function createTable(persons:Person[], setPerson:React.Dispatch<React.SetStateAction<Person[]>>) {
  return(
  <table>
    <thead>
      <tr className={"headers"}>
      {headers.map((row)=> {
            return <td className={row.key} key={row.key}>{row.label}</td>
          })}
      </tr>
    </thead>
    <tbody>
      {persons.map((person, index) => {
        return (
          <tr key={index}>
            <td>{person.surname}</td>
            <td>{person.firstname}</td>
            <td>{person.age}</td>
            <td><button onClick={(x) => setPerson(deletePerson(person,persons))} 
                              className="delete_person">Poista</button></td>
          </tr>
        );
      })}
    </tbody>
  </table>
  )
}

function App() {

  const [persons, setPerson] = useState<Person[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setPerson([...persons, { surname: surname, firstname: firstname, age: age }]);
    (document.getElementById("surnameID")as HTMLInputElement).value = "";
    (document.getElementById("firstnameID")as HTMLInputElement).value = "";
    (document.getElementById("ageID")as HTMLInputElement).value = "";
  }


  return (
    <div>
    <div className="App">
      <h1>Henkilötietokanta</h1>
      <form onSubmit={(e) => handleAdd(e)}>
        <label htmlFor="sukunimi">Sukunimi: </label>
        <input type="text" id="surnameID" required onChange={(i) => setSurname(i.target.value)}></input>
        &nbsp;&nbsp;
        <label htmlFor="etunimi">Etunimi: </label>
        <input type="text" id="firstnameID" required onChange={(i) => setFirstname(i.target.value)}></input>
        &nbsp;&nbsp;
        <label htmlFor="ika">Ikä: </label>
        <input type="text" id="ageID" required onChange={(i) => setAge(i.target.value)}></input>
        &nbsp;&nbsp;
        <button className="add_person" type="submit">Lisää</button>

      </form>
    <p></p>
    {createTable(persons, setPerson)}
    </div>
    </div>
  );
}

export default App;

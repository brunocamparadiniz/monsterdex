// import { Component } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list";
import SearchBox from "./components/search-box/search-box";

const App = () => {

  const [searchField, setSearchField] = useState('') //[value, setValue]
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters, setFilteredMonsters] =useState(monsters)

  useEffect(() => {  
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users))
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])

  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }


  return (
  <div className="App">

    <h1 className="app-title">Monsters Rolodex</h1>
  
    <SearchBox 
      onChangeHandler={onSearchChange} 
      placeholder={'search monsters'} 
      className='monsters-search-box' />
    <CardList monsters={filteredMonsters}/>
  </div>)
}

//--------------------- CLASS

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }
//   // didMount is the first time a component gets placed into the DOM (first time REACT renders a component into the page) -> it only happens once!
//   // this is the moment when you wanna make the API request
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   onSearchChange = (e) => {
//     const searchField = e.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   }

//   render() {

//     const { monsters, searchField } = this.state
//     const { onSearchChange } = this

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">

//         <h1 className="app-title">Monsters Rolodex</h1>
        
//         <SearchBox onChangeHandler={onSearchChange} placeholder={'search monsters'} className='monsters-search-box' />
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;

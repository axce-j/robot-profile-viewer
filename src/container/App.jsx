import React from "react";
import CardList from "../components/cardList.jsx";
import SearchBox from "../components/searchBox.jsx";
import Scroll from "../components/scroll.jsx";
import ErrorBoundry from "../components/errorBoundry.jsx";
import "./app.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robot: [],
      searchfield: "",
    };
  }
  componentDidMount() {

    // fetch("https://jsonplaceholder.cypress.io/todos")
	fetch("https://jsonplaceholder.typicode.com/todos")	
	
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((users) => this.setState({ robot: users }))
      .catch((error) => console.error("Error fetching data:", error));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const filteredRobots = this.state.robot.filter((robots) => {
      return robots.title
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    if (!this.state.robot.length) {
      return (
        <h1 className="grid place-items-center text-6xl my-64">loading</h1>
      );
    } else {
      return (
        <>
          <div className="text-center">
            <div  className="flex flex-col items-center w-auto h-auto justify-items-center ">
              <h1 className="text-6xl">ROBO FRIENDS</h1>
              <SearchBox SearchChange={this.onSearchChange} />
            </div>
            <Scroll>
              <ErrorBoundry>
                <CardList robots={filteredRobots} />
              </ErrorBoundry>
            </Scroll>
          </div>
        </>
      );
    }
  }
}

export default App;

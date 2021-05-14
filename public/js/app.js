// class Weather extends React.Component {
//   render = () => {
//     return  <dl>
//                 <dt>City</dt>
//                 <dd>{this.props.weather}</dd>
//             </dl>
//
//   }
// }
//




class App extends React.Component {
  state = {
    place: [],
    name: "",
    image: "",
    city: "",
    country: "",
    description: ""
  }
 //  roundUP = () =>{
 //     let temp = Math.round(response.data.main.feels_like * 100)/100;
 // }


  findWeather = (event) => {
    event.preventDefault();
    axios
    .get("http://api.openweathermap.org/data/2.5/weather?q="+this.state.name+"&appid=cb62c3b0bbf4bc98a92507bb71fa55d5&units=imperial")
    .then(
      (response) => {
          let temp = Math.ceil(Math.round(response.data.main.feels_like));
        this.setState({
        weatherLike: temp,
        weather: response.data.main.humidity
         })
      }
    )
  }
// roundUp = () =>{
//    let weatherLike = Math.round(response.data.main.feels_like *100)/100
// }

/* ----- HANDLE CHANGE: ------  */

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

/* ------ HANDLE SUBMIT: ------  */

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/place', this.state).then(
      (response) => {
        this.setState({
          place: response.data,
          name: "",
          image: "",
          city: "",
          country: "",
          description: ""
        })
      }
    )
  }

/* ------------- UPDATE PLANT -------------  */

updatePlace = (event) => {
  event.preventDefault()
  const id = event.target.id
  console.log(event.target.id);
  axios.put('/place/' + id, this.state).then(
    (response) => {
      this.setState({
        place: response.data,
        name: "",
        image: "",
        city: "",
        country: "",
        description: ""
      })
    }
  )
}

/* ------------- DELETE PLANT -------------  */

deletePlace = (event) => {
  axios.delete('/place/' + event.target.value).then(
    (response) => {
      this.setState({
        place: response.data
      })
    }
  )
}

/* ----- MOUNT DATA ON LOAD FUNCTION: ------  */
  componentDidMount = () => {
    axios.get('/place').then(response => {
      this.setState({
        place: response.data
      })
    })
  }

changeCityName = () => {
  this.setState(
    {
      name: event.target.value
    }
  )
}
/*  ------ END COMPONENT DID MOUNT -----  */



  render = () => {
    return (


    <div>
    <details>
     <summary> Wheather Check </summary>
      <form onSubmit={this.findWeather}>
          <input type="text" onKeyUp={this.changeCityName}/>
          <input type="submit" value = "Enter City Name" />
      </form>

    <dl>
    <dt> City Name </dt>
    <dd>{this.state.name}</dd>
    <dt> Temperature </dt>
    <dd>{this.state.weatherLike}</dd>
    <dt> Humidity </dt>
    <dd>{this.state.weather}</dd>

    </dl>
    </details>

        <details >
        <summary> Add New Place </summary>
        <form className="form-group col-sm-6" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>

          <input
            className="form-control"
            type="text"
            id="name"
            onChange={this.handleChange}
            value={this.state.place.name}
          />

          <label htmlFor="image">Image</label>
          <input
            className="form-control"
            type="text"
            id="image"
            onChange={this.handleChange}
            value={this.state.place.image}
          />

          <label htmlFor="city">City</label>
          <input
            className="form-control"
            type="text"
            id="city"
            onChange={this.handleChange}
            value={this.state.place.city}
          />

          <label htmlFor="country">Country</label>
          <input
            className="form-control"
            type="text"
            id="country"
            onChange={this.handleChange}
            value={this.state.place.country}
          />
          <label htmlFor="description">Description</label>
          <input
            className="form-control"
            type="text"
            id="description"
            onChange={this.handleChange}
            value={this.state.place.description}
          />

          <input className="btn btn-success mb-5" type="submit" id="Add Place" />

        </form>
        </details>

        <ul>
         {this.state.place.map(place => {
            return (
              <li key={place._id}>
              <h2>{place.name}</h2>
                <img src={place.image} alt={place.name} />
                <div className="dropdowns">
                  <details>
                    <summary>Description</summary>
                      <p>City: {place.city}</p>
                      <p>Country: {place.country}</p>
                      <p>Description: {place.description}</p>
                  </details>


                  <details>
                    <summary>Edit</summary>
                    <form id={place._id} onSubmit={this.updatePlace}>

                      <label htmlFor="name">Name</label><br/>
                      <input
                        type="text"
                        id="name"
                        onChange={this.handleChange}
                      /><br/>

                      <label htmlFor="image">Image</label><br/>
                      <input
                        type="text"
                        id="image"
                        onChange={this.handleChange}
                      /><br/>

                      <label htmlFor="city">City</label><br/>
                      <input
                        type="text"
                        id="city"
                        onChange={this.handleChange}
                      /><br/>

                      <label htmlFor="country">Country</label><br/>
                      <input
                        type="text"
                        id="country"
                        onChange={this.handleChange}
                      /><br/>
                      <label htmlFor="description">Description</label><br/>
                      <input
                        type="text"
                        id="description"
                        onChange={this.handleChange}
                      /><br/>

                      <input className="btn btn-primary mb-1" type="submit" id="Submit Edits" />
                    </form>

                  </details>
                  <button value={place._id} onClick={this.deletePlace} className="btn btn-danger">Delete</button>

                </div>
              </li>
            )
          })}
        </ul>
    </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

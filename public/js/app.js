
class App extends React.Component {
  state = {
    place: [],
    name: "",
    image: "",
    city: "",
    country: "",
    description: "",
    rating: 0
  }


  findWeather = (event) => {
    event.preventDefault();
    axios
    .get("https://api.openweathermap.org/data/2.5/weather?q="+this.state.name+"&appid=cb62c3b0bbf4bc98a92507bb71fa55d5&units=imperial")
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
          description: "",
          rating: 0
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
        description: "",
        rating: 0
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
decreaseRating = () =>{
   this.setState({
      star: (this.state.star -= 1)
   })
}
increaseRating = () =>{
   this.setState({
      star: (this.state.star += this.state.rating.value)
   })
}
/*  ------ END COMPONENT DID MOUNT -----  */



  render = () => {
    return (
    <div>
      <div class="Jalan">
          <h1 class="Jalan">🌴 Jalan-Jalan 🌴</h1>
       </div>
    <br />
    <br />
    <div className="weather-check">
          <details>
           <summary> Wheather Check </summary>
            <form onSubmit={this.findWeather}>
                <input type="text" onKeyUp={this.changeCityName}/><br/>
                <input className="btn btn-warning mb-5" type="submit" value = "City Destination" />
            </form>

              <dl>
              <dt> City Name: </dt>
              <dd>{this.state.name}</dd>
              <dt> Temperature: </dt>
              <dd>{this.state.weatherLike}</dd>
              <dt> Humidity: </dt>
              <dd>{this.state.weather}</dd>
              </dl>
          </details>

    </div>
      <div className="new-place">
        <details>
        <summary> Add New Place </summary>
        <form className="form-group col-sm-5" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
        <div className="class-for-form">
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

          <label htmlFor="city">City:</label>
          <input
            className="form-control"
            type="text"
            id="city"
            onChange={this.handleChange}
            value={this.state.place.city}
          />

          <label htmlFor="country">Country:</label>
          <input
            className="form-control"
            type="text"
            id="country"
            onChange={this.handleChange}
            value={this.state.place.country}
          />
          <label htmlFor="description">Description:</label>
          <input
            className="form-control"
            type="text"
            id="description"
            onChange={this.handleChange}
            value={this.state.place.description}
          />
          <label htmlFor="rating">Rating:</label>
          <input
            className="form-control"
            type="number"
            id="rating"
            onChange={this.handleChange}
            value={this.state.place.rating}
          />
        </div>

          <input className="btn btn-success mb-5" type="submit" id="Add Place" />

        </form>
        </details>
        </div>
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
                      <p>Rating: {place.rating}⭐</p>


                  <details>
                    <summary>Edit</summary>
                    <form id={place._id} onSubmit={this.updatePlace}>

                      <label htmlFor="name">Name:</label><br/>
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

                      <label htmlFor="city">City:</label><br/>
                      <input
                        type="text"
                        id="city"
                        onChange={this.handleChange}
                      /><br/>

                      <label htmlFor="country">Country:</label><br/>
                      <input
                        type="text"
                        id="country"
                        onChange={this.handleChange}
                      /><br/>
                      <label htmlFor="description">Description:</label><br/>
                      <input
                        type="text"
                        id="description"
                        onChange={this.handleChange}
                      /><br/>
                      <label htmlFor="rating">Rating: </label><br/>
                      <input
                        type="number"
                        id="rating"
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
        <footer class = "page-footer">
          <div class = "container">
              <div class="text-center">
                <nav id="footerLink">
                      <a href="http://linkedin.com/in/angelines-yaport-garcia-93aa074a/"><img style={{width: '50px', height: '50px'}} src="https://i.imgur.com/OA6SsbIs.png" alt="Linkedin"/></a>
                      <a href="https://github.com/AngelinesYG"><img style={{width: '50px', height: '50px'}} src="https://i.imgur.com/LA1DKG4t.png" alt="GitHub"/></a>
                      <a href="https://www.linkedin.com/in/christopher-nugroho-b2814050/"><img style={{width: '50px', height: '50px'}} src="https://i.imgur.com/OA6SsbIs.png" alt="Linkedin"/></a>
                      <a href="https://github.com/ChrisNulis"><img style={{width: '50px', height: '50px'}} src="https://i.imgur.com/LA1DKG4t.png" alt="GitHub"/></a>
                </nav>
                  <p>Project 3 by Angelines Yaport-Garcia & Christopher Nugroho </p>
                  <h6>Created using REACT, Bootstrap, Open Weather API</h6>
              </div>
          </div>
      </footer>

    </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

class App extends React.Component {
  state = {
    place: [],
    name: "",
    image: "",
    city: "",
    country: "",
    description: ""
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
    axios.post('/places', this.state).then(
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

updatePlaces = (event) => {
  event.preventDefault()
  const id = event.target.id
  console.log(event.target.id);
  axios.put('/places/' + id, this.state).then(
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

deletePlaces = (event) => {
  axios.delete('/places/' + event.target.value).then(
    (response) => {
      this.setState({
        place: response.data
      })
    }
  )
}

/* ----- MOUNT DATA ON LOAD FUNCTION: ------  */
  componentDidMount = () => {
    axios.get('/places').then(response => {
      this.setState({
        place: response.data
      })
    })
  }
/*  ------ END COMPONENT DID MOUNT -----  */

  render = () => {
    return (
      <div>

      <section className="add-places">
        <form onSubmit={this.handleSubmit} className="add-place">
        <h3>Add Places</h3>
          <label htmlFor="name">Name</label><br/>
          <input
            type="text"
            id="name"
            onChange={this.handleChange}
            value={this.state.name}
          /><br/>

          <label htmlFor="image">Image</label><br/>
          <input
            type="text"
            id="image"
            onChange={this.handleChange}
            value={this.state.image}
          /><br/>

          <label htmlFor="city">City</label><br/>
          <input
            type="text"
            id="city"
            onChange={this.handleChange}
            value={this.state.city}
          /><br/>

          <label htmlFor="country">Country</label><br/>
          <input
            type="text"
            id="country"
            onChange={this.handleChange}
            value={this.state.country}
          /><br/>
          <label htmlFor="description">Description</label><br/>
          <input
            type="text"
            id="description"
            onChange={this.handleChange}
            value={this.state.description}
          /><br/>

          <input type="submit" id="Add Place" />

        </form>
      </section>

      <section className="places-list">
        <ul>
          {this.state.place.map(plant => {
            return (
              <li key={place._id}>
                <h2>{place.name}</h2>
                <img src={place.image} alt={place.name} />
                <div className="dropdowns">
                  <details>
                    <summary>Description</summary>
                      <p>City: {place.city}</p>
                      <p>{place.description}</p>
                  </details>
                  <details>
                    <summary>Edit / Delete</summary>
                    <form id={places._id} onSubmit={this.updatePlaces}>
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

                      <input type="submit" id="Submit Edits" />

                    </form>
                    <button value={places._id} onClick={this.deletePlaces}>Delete</button>
                  </details>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

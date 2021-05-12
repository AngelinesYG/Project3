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
/*  ------ END COMPONENT DID MOUNT -----  */

  render = () => {
    return (


    <div>
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
                    <form id={place._id} onSubmit={this.state.updatePlace}>

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

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
    return <div>

      <section className="add-place">
        <form onSubmit={this.handleSubmit} className="add-place">
        <h3>Add Place</h3>
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

      <section className="place-list">
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
                      <p>{place.description}</p>
                  </details>
                  <details>
                    <summary>Edit / Delete</summary>
                    <form id={place._id} onSubmit={this.updateplace}>
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
                    <button value={place._id} onClick={this.deleteplace}>Delete</button>
                  </details>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

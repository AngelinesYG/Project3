class App extends React.Component {
  state = {
    places: [],
    image: '',
    name: '',
    city: '',
    country:'',
    description: ''
  }




  ReactDOM.render(
    <App />,
    document.querySelector('main')
  )

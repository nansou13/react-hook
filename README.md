React-hooks

## useAxios

```
function App() {
  const {response, error, isLoading } = useAxios('https://jsonplaceholder.typicode.com/posts')
  console.log(response, error, isLoading)

  return(
      <div className="App">
        {
          isLoading && (<h1>LOADING</h1>) 
        }  
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            response && response.data && (
              response.data.map(({title}) => (<div>{title}</div>))
            )
          }
        </header>
      </div>
    );
  
}
```

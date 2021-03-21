<script>
  import { Router, Route, Link } from "svelte-routing";
  import Landing from "./Landing.svelte";
  import Book from "./Book.svelte";
  export let url = "";
  export let name;
</script>

<svelte:head>
	
  <style>
    body {
      margin: 0;
      padding: 0;
    }
  </style>
  
</svelte:head>



<div>
  <header>
    <Router {url}>
		<div>
			<Link to="/"><img class="title" src="./assets/tempLogo.png" alt="1800clothing.org" /></Link>
		</div>
      <nav>
        <!-- <Link to="/"><button>Home</button></Link> -->
        <Link to="book"><button class="viewButton">View the Book</button></Link>
      </nav>
    </Router>
  </header>

  <main>
    <Router {url}>
      <div>
        <Route path="book" component={Book} />
        <!--for now the router just support case sensitive,
				  one workaround colud be add two time the route
				  Example.
				 <Route path="About" component="{About}" /> 
			  -->
        <Route path="/"><Landing /></Route>
      </div>
    </Router>
    
  </main>
  <footer />
</div>

<style>

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  header {
    background-color: rgb(216, 216, 216);
    padding: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 .5rem;
  }
  .title {
    padding: 0;
    margin: 0;
  }
  .viewButton{
	  border-radius: 20px;
	  color: white;
	  background-color: #333;
	  padding: .25rem .7rem;
  }
</style>

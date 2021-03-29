<script>
  import { Router, Route, Link } from "svelte-routing";
  import Landing from "./Landing.svelte";
  import About from "./About.svelte";
  import Book from "./Book.svelte";
  import Nav from "./Nav.svelte";

  export let url = "";
  $: console.log(url)
</script>

<svelte:head>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #333;
    }
  </style>
</svelte:head>

<div class="App">
  <Nav {url} />

  <main>
    <Router {url}>
      <div class="mainContent">
        <!--for now the router just support case sensitive,
				  one workaround colud be add two time the route
				  Example.
				 <Route path="About" component="{About}" /> 
			  -->
        <Route path="book" component={Book} />
        <Route path="about" component={About} />
        <Route path="/" component={Landing} />
      </div>
    </Router>
  </main>
  <footer />
</div>

<style>
  .App {
    height: 100%;
  }
  main {
    height: calc(100vh - 80px);
  }
  .mainContent {
    height: 100%;
  }
  footer{
    background-color: #333;
    height: 20px;
  }
</style>

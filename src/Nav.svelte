<script>
  import { Router, Route, Link } from "svelte-routing";

  export let url, toggle;
</script>

<header>
  <Router {url}>
    <div>
      <Link to="/"
        ><img
          class="title"
          src="./assets/tempLogo.png"
          alt="1800clothing.org"
        /></Link
      >
    </div>
    <nav>
      <button class="aboutButton" color="secondary" on:click={toggle}
        >About</button
      >
      <Link to="book"><button class="viewButton">View the Book</button></Link>
    </nav>
  </Router>
</header>

<style>
  header {
    background-color: rgb(216, 216, 216);
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
  }
  header img {
    max-height: 60px;
  }
  .title {
    padding: 0;
    margin: 0;
  }
  .aboutButton {
    background-color: unset;
    border: none;
  }
  .viewButton {
    border-radius: 20px;
    color: white;
    background-color: #333;
    padding: 0.25rem 0.7rem;
  }

  @media screen and (max-width: 900px) {
    .aboutButton {
      font-size: 0.7rem;
    }
  }
  @media screen and (max-width: 700px) {
    header {
      flex-direction: column;
      padding-bottom: 0.5rem;
    }
    header img {
      width: 100%;
      max-height: none;
    }
    .aboutButton {
      font-size: 1rem;
    }
  }
</style>
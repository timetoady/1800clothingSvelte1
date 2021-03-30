<script>
  import { Router, Route, Link } from "svelte-routing";

  export let url;
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
      <Link to="about">
        <button class="aboutButton" color="secondary">About</button>
      </Link>
      <Link to="book">
        <button class="viewButton">View the Book</button>
      </Link>
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
    padding: 0 20px;
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
    border-radius: 8px;
    color: white;
    background-color: #333;
    padding: 5px 10px;
  }

  @media screen and (max-width: 700px) {
    header {
      flex-direction: column;
      padding-bottom: 10px;
      height: 97px;
    }
    header img {
      height: 50px;
    }
  }
</style>
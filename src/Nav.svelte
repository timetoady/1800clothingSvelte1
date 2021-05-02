<script>
  import { Router, Route, Link } from "svelte-routing";

  export let url;

  let mobileOpen = false

  const toggleMobileNav = () => {
    mobileOpen = !mobileOpen
  }
</script>

<header>
  <Router {url}>
    <div>
      <Link to="/"><img class="title" src="./assets/logo/logoVer4.png" alt="1800clothing.org"/></Link>
    </div>
    <nav>
      <Link to="about">
        <button class="aboutButton" color="secondary">About</button>
      </Link>
      <Link to="book">
        <button class="viewButton">View the Book</button>
      </Link>
    </nav>
    <div id="nav-icon" class={mobileOpen ? "open" : ""} on:click={toggleMobileNav}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    {#if mobileOpen}
      <div class="mobilePopup" on:click={toggleMobileNav}>
        <Link to="about"><div class="popupRow">About</div></Link>
        <Link to="book"><div class="popupRow">View Books</div></Link>
      </div>
    {/if}
  </Router>
</header>

<style>
  @keyframes fadeInOpacity {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  header {
    background-color: rgb(208, 187, 164);
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    padding-left: 10px;
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
    margin-right: .45rem !important;
  }

  .viewButton {
    border-radius: 8px;
    color: white;
    background-color: rgb(26, 26, 26);
    padding: 5px 10px;
    border: none;
  }

  /* mobile menu popup */
  .mobilePopup {
    position: fixed;
    top: 50px;
    right: 5px;
    background-color: white;
    border-radius: 10px;
    z-index: 9999;
    box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.24);
    width: 200px;

    /* animation */
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.2s;
  }
  .mobilePopup .popupRow {
    padding: 10px 20px;
    transition: all ease 0.3s;
  }
  .mobilePopup .popupRow:hover {
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
  .mobilePopup .popupRow:nth-child(1) {
    border-radius: 10px 10px 0 0;
  }
  .mobilePopup .popupRow:nth-child(2) {
    border-radius: 0 0 10px 10px;
  }
  .mobilePopup a:nth-child(2) .popupRow {
    border-top: 1px solid #EDEDED;
    border-radius: 0 0 10px 10px;
  }
  .mobilePopup .popupRow a {
    color: #212529 !important;
    text-decoration: none !important;
  }
  .mobilePopup .popupRow a:hover {
    color: #212529 !important;
    text-decoration: none !important;
  }
  
  /* fancy nav icon styles */
  #nav-icon {
    display: none;
    width: 25px;
    height: 30px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    cursor: pointer;
    margin-top: 11px;
  }

  #nav-icon span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #222222;
    border-radius: 3px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
}

  #nav-icon span:nth-child(1) {
    top: 0px;
  }

  #nav-icon span:nth-child(2),#nav-icon span:nth-child(3) {
    top: 8px;
  }

  #nav-icon span:nth-child(4) {
    top: 16px;
  }

  #nav-icon.open span:nth-child(1) {
    top: 8px;
    width: 0%;
    left: 50%;
  }

  #nav-icon.open span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  #nav-icon.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  #nav-icon.open span:nth-child(4) {
    top: 8px;
    width: 0%;
    left: 50%;
  }

  @media screen and (max-width: 700px) {
    nav { display: none; }
    header {
      height: 60px;
    }
    header {
      display: grid;
      grid-template-columns: 1fr 40px;
      grid-gap: 10px;
    }
    #nav-icon {
      display: block;
      place-self: center;
    }
    header img { width: 100%; max-width: 380px; }
  }
</style>
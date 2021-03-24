<script>
  import { Router, Route, Link } from "svelte-routing";
  import Landing from "./Landing.svelte";
  import Book from "./Book.svelte";
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "sveltestrap";
  export let url = "";
  let isOpen2 = false;

  const toggle = () => (isOpen2 = !isOpen2);
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

<div>
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
    <Modal isOpen={isOpen2} {toggle} size="lg">
      <ModalHeader {toggle}>About 1800's Clothing</ModalHeader>
      <ModalBody>
        <div class="overflow-auto aboutDiv">
          <div>
            <img
              src="assets/carma.jpg"
              alt="Carma de Jong Anderson"
              loading="lazy"
            />
          </div>

          <div>
            <p>
              All her life, Carma de Jong Anderson was fascinated with
              historical costumes. As she grew to maturity, her interest focused
              on clothing of the 1800s. On numerous occasions she was asked by
              the Church of Jesus Christ of Latter Day Saints to consult with
              them on the restoration of historic sites of the Church, and the
              dressing of the docents there who represented families of those
              decades. Unfortunately, modern artists are not very familiar with
              authentic clothing worn by the people of the 1800s. Their
              paintings and illustrations often depict wild guesses as to what
              was worn.
            </p>
            <p>
              So Carma took it upon herself for over 40 years to travel
              extensively to museums, art galleries, historic sites, and to pour
              through images in antique books and magazines collecting detailed
              images of what people in the 1800s really wore. She earned a Ph.D.
              at BYU with a large, 3 volume doctoral dissertation showing what
              she had learned. Limited to a printing of only 6 three-volume
              copies, It was much in demand with artists in and outside of the
              Church of Jesus Christ LDS. She was asked to update it, enlarge
              it, and eventually put it online so anyone in the world could see
              the results of her decades of research, showing over 2000 images
              of correct clothing for each decade from the late 1820s to the
              1870s.
            </p>
            <p>
              This particular file deals with the 1829s to 1849s, when
              illustrations, paintings, and daguerreotypes were almost the only
              methods of visual recording from 1830 to 1860 when better means of
              photography became available. Each decade in this file begins with
              images of men and families, then women, then children, from basic
              clothing to hair styles to accessories. Each category begins with
              fashions of ordinary, laboring people, then of wealthier people.
              When all categories have been added to the website, anyone,
              anywhere will have access to authentic images of clothing of much
              of the 1800s.
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggle}>CLOSE</Button>
      </ModalFooter>
    </Modal>
  </main>
  <footer />
</div>

<style>
  header {
    background-color: rgb(216, 216, 216);
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
  }
  .title {
    padding: 0;
    margin: 0;
  }
  .viewButton {
    border-radius: 20px;
    color: white;
    background-color: #333;
    padding: 0.25rem 0.7rem;
  }
  .aboutDiv {
    display: flex;
  }
  .aboutDiv div {
    padding: 0.5rem;
  }
  .overflow-auto {
    max-height: 50vh;
    margin-top: 0.25rem;
  }
  .aboutButton {
    background-color: unset;
    border: none;
  }
 footer{
   background-color: #333;
   padding: 1rem;
 }

  @media screen and (max-width: 900px) {
    .aboutButton {
      font-size: 0.7rem;
    }
    .aboutDiv {
      flex-direction: column;
    }
    .aboutDiv img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%;
    }
  }

  @media screen and (max-width: 700px) {
    header {
      flex-direction: column;
      padding-bottom: 0.5rem;
    }
    header img {
      width: 100%;
    }
    .aboutButton {
      font-size: 1rem;
    }
  }
</style>

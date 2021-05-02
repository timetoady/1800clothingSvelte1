<script>
  
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <link rel="stylesheet" href="landingStyles.css" />
</svelte:head>

<div class="About">
  <div class="welcomeMessageBackground">
    <div class="welcomeMessage">
      <h2>About</h2>
      <p>
        This will be your accurate reference for all clothing that was worn in the 1800s. 
        Whether you are an artist, author, historian, or just here out of curiousity — 
        we hope you find what you are looking for. 
      </p>
    </div>
  </div>
  
  <div class="contentWrapper">
    <div class="aboutCard">
      <h2 class="cardTitle">Where It All Started</h2>
      <div class="cardContent carmaContent">
        <img
          class="carmaPhoto"
          src="assets/carma.jpg"
          alt="Carma de Jong Anderson"
          loading="lazy"
        />
        <div class="carmaDesc">
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
    </div>
    
  </div>
</div>

<style>
  .About {
    background-color: white;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    margin: 0 auto;
    overflow-y: scroll;
    width: 100%;
  }

  .contentWrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .welcomeMessageBackground {
    background-color: rgb(235, 221, 205);
  }
  .welcomeMessage {
    padding: 50px 0;
    width: 600px;
    margin: 0 auto;
    text-align: center;
    background-color: rgb(235, 221, 205);
  }
  .welcomeMessage h2 {
    padding: 0;
    padding-bottom: 20px; 
    margin: 0;
  }
  .welcomeMessage p {
    font-size: 20px;
    padding: 0 20px;
  }

  .aboutCard {
    border-radius: 10px;
    box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.24);
    padding: 20px 30px;
    margin: 40px 0;
  }
  .aboutCard .cardTitle {
    border-bottom: 1px solid rgb(151, 151, 151);
    padding: 8px;
  }
  .carmaContent {
    display: grid;
    grid-template-columns: 300px auto;
    grid-gap: 20px;
    padding-top: 10px;
  }
  .carmaContent .carmaPhoto {
    border-radius: 50%;
    margin: 0 auto;
    padding: 20px 0;
  }

  @media screen and (max-width: 900px) {
    .carmaContent {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 600px) {
    .contentWrapper {
      padding: 0 8px;
    }
    .welcomeMessage {
      width: 100%;
    }
    .welcomeMessage p {
      font-size: 18px;
      padding: 0 20px;
    }
  }
</style>
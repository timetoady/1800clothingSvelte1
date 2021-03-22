<script>
  import { onMount } from "svelte";
  import {
    Nav,
    NavItem,
    Collapse,
    UncontrolledCollapse,
    Card,
    CardBody,
    CardFooter,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
InputGroup,
  } from "sveltestrap";
  import Fa from "svelte-fa";
  import { faFilter } from "@fortawesome/free-solid-svg-icons";
  import { paginate, LightPaginationNav } from "svelte-paginate";
  import { costumeList, currentCostume } from "./stores";

  let isOpen = false;
  let isOpen2 = false;
  let items = $costumeList;
  let currentPage = 1;
  let pageSize = 6;
  $: paginatedItems = paginate({ items, pageSize, currentPage });
  const imageSource = "assets/images/";
  //modal items
  let modalCaption;
  let modalDesc;
  let modalSource;
  let modalImg;
  let gridModalOpen = false;
  const small = 700;
  const medium = 900;
  let w;
  const handleModal = (id) => {
    //replace this with an async await when on a db
    let current = $costumeList.filter((costume) => {
      return costume.id === id;
    })[0];
    currentCostume.set(current);
    console.log($currentCostume);
    gridModalOpen = !gridModalOpen;
  };
  const toggleModal = () => {
    gridModalOpen = !gridModalOpen;
    console.log(w);
  };
  const toggle = () => {
    gridModalOpen = !gridModalOpen;
  };

  const toggle2 = () => (isOpen2 = !isOpen2);

  //next: figure out how to do pagenated list of costumes/lazy load. Set costumes.json as store
  // Set up dynamic modal for when costume cards are clicked
  // Set up search and filters to alter what appears? May have to wait until API hookup
  //onMount(console.log($costumeList))
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <link rel="stylesheet" href="landingStyles.css" />
</svelte:head>

<svelte:window bind:innerWidth={w} />

<div class="landing">
  <div class="filters">
    {#if w > small}
      <h5>Filters <Fa icon={faFilter} /></h5>
    {/if}
    <Nav vertical>
      {#if w <= small}
        <form>
          <div class="collapseContainer">
            <div class="collapsed">
              <input class="searchBox" type="text" placeholder="Search..." />

              <div on:click={() => (isOpen = !isOpen)}>
                <NavItem>Filters <Fa icon={faFilter} /></NavItem>
              </div>

              <Collapse {isOpen}>
                <NavItem>Date Range</NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1800-1819
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1820-1829
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1830-1839
                  </label></NavItem
                >
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1840-1849
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1850-1859
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1860-1869
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1870-1879
                  </label>
                </NavItem>
              </Collapse>
            </div>

            <div class="collapsed">
              <!-- <div on:click={() => (isOpen = !isOpen)}>
              <NavItem>Group</NavItem>
            </div> -->

              <Collapse {isOpen}>
                <NavItem>Group</NavItem>
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Women
                  </label>
                </NavItem>
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Men
                  </label>
                </NavItem>
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Children
                  </label>
                </NavItem>
              </Collapse>
            </div>

            <div class="collapsed">
              <!-- <div on:click={() => (isOpen = !isOpen)}>
              <NavItem>Category</NavItem>
            </div> -->

              <Collapse {isOpen}>
                <NavItem>Category</NavItem>
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Costume
                  </label></NavItem
                >
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Garment
                  </label></NavItem
                >
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Hairstyle
                  </label></NavItem
                >
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Accessory
                  </label></NavItem
                >
              </Collapse>
            </div>
          </div>
        </form>
      {:else}
        <form>
          <div class="collapseContainer">
            <div class="collapsed">
              <input class="searchBox" type="text" placeholder="Search..." />

              <div on:click={() => (isOpen = !isOpen)}>
                <NavItem>Date Range</NavItem>
              </div>

              <Collapse {isOpen}>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1800-1819
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1820-1829
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1830-1839
                  </label></NavItem
                >
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1840-1849
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1850-1859
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1860-1869
                  </label>
                </NavItem>
                <NavItem>
                  <label>
                    <input type="checkbox" checked />
                    1870-1879
                  </label>
                </NavItem>
              </Collapse>
            </div>

            <div class="collapsed">
              <div id="toggler">
                <NavItem>Group</NavItem>
              </div>

              <UncontrolledCollapse toggler="#toggler">
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Women
                  </label>
                </NavItem>
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Men
                  </label>
                </NavItem>
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Children
                  </label>
                </NavItem>
              </UncontrolledCollapse>
            </div>

            <div class="collapsed">
              <div id="toggler2">
                <NavItem>Category</NavItem>
              </div>
              <UncontrolledCollapse toggler="#toggler2">
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Costume
                  </label></NavItem
                >
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Garment
                  </label></NavItem
                >
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Hairstyle
                  </label></NavItem
                >
                <NavItem
                  ><label>
                    <input type="checkbox" checked />
                    Accessory
                  </label></NavItem
                >
              </UncontrolledCollapse>
            </div>
          </div>
        </form>
      {/if}
    </Nav>
  </div>
  <div>
    <ul class="items costumeGrid">
      {#each paginatedItems as item}
        <li class="item">
          <Card>
            <div class="modalClick" on:click={() => handleModal(item.id)}>
              <CardBody>
                <div>
                  <img
                    src="{imageSource}{item.image}"
                    alt={item.caption}
                    loading="lazy"
                  />
                </div>
                <div class="caption">
                  {item.caption}
                </div>
              </CardBody>
            </div>
            <CardFooter>
              <button>
                {item.pdf}
              </button>
              <button>
                {item.person}
              </button>
              <button>
                {item.class}
              </button>
              <button>
                {item.clothing}
              </button>
            </CardFooter>
          </Card>
        </li>
      {/each}
    </ul>

    <LightPaginationNav
      totalItems={items.length}
      {pageSize}
      {currentPage}
      limit={2}
      showStepOptions={true}
      on:setPage={(e) => (currentPage = e.detail.page)}
    />
  </div>
  <!-- Dynamic grid tile modal -->
  <Modal
    isOpen={gridModalOpen}
    toggle={handleModal}
    size="lg"
    
  >
    <ModalHeader toggle={handleModal}>{$currentCostume.caption}</ModalHeader>
    <ModalBody>
      <div class="cardModalBody">
        <div class="cardModalImage">
          <img
            src="{imageSource}{$currentCostume.image}"
            alt={$currentCostume.caption}
          />
        </div>
        <div class="modalDetails overflow-auto">
          <p>
            <strong>Description: </strong>{$currentCostume.description}
          </p>
          <p>
            <strong>Source: </strong>{$currentCostume.source === ""
              ? "None"
              : $currentCostume.source}
          </p>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" on:click={toggleModal}>CLOSE</Button>
    </ModalFooter>
  </Modal>
  <div class="float">
    <Button color="secondary" on:click={toggle2}>About</Button>
    <Modal isOpen={isOpen2} toggle={toggle2} size="lg">
      <ModalHeader toggle={toggle2}>About 1800's Clothing</ModalHeader>
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
            All her life, Carma de Jong Anderson was fascinated with historical
            costumes. As she grew to maturity, her interest focused on clothing of
            the 1800s. On numerous occasions she was asked by the Church of Jesus
            Christ of Latter Day Saints to consult with them on the restoration of
            historic sites of the Church, and the dressing of the docents there
            who represented families of those decades. Unfortunately, modern
            artists are not very familiar with authentic clothing worn by the
            people of the 1800s. Their paintings and illustrations often depict
            wild guesses as to what was worn.
          </p>
          <p>
            So Carma took it upon herself for over 40 years to travel extensively
            to museums, art galleries, historic sites, and to pour through images
            in antique books and magazines collecting detailed images of what
            people in the 1800s really wore. She earned a Ph.D. at BYU with a
            large, 3 volume doctoral dissertation showing what she had learned.
            Limited to a printing of only 6 three-volume copies, It was much in
            demand with artists in and outside of the Church of Jesus Christ LDS.
            She was asked to update it, enlarge it, and eventually put it online
            so anyone in the world could see the results of her decades of
            research, showing over 2000 images of correct clothing for each decade
            from the late 1820s to the 1870s.
          </p>
          <p>
            This particular file deals with the 1829s to 1849s, when
            illustrations, paintings, and daguerreotypes were almost the only
            methods of visual recording from 1830 to 1860 when better means of
            photography became available. Each decade in this file begins with
            images of men and families, then women, then children, from basic
            clothing to hair styles to accessories. Each category begins with
            fashions of ordinary, laboring people, then of wealthier people. When
            all categories have been added to the website, anyone, anywhere will
            have access to authentic images of clothing of much of the 1800s.
          </p>
        </div>
      
      </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggle2}>CLOSE</Button>
      </ModalFooter>
    </Modal>
  </div>
</div>

<style>
  .landing {
    padding: 0;
    display: flex;
  }

  .filters {
    min-width: 12rem;
    border-right: 1px solid rgba(128, 128, 128, 0.5);
    background-color: #ddd;
    height: 100vh;
  }
  .filters h5 {
    margin: 0;
    padding: 0.25rem 0.75rem;
    background-color: #888;
  }
  .collapsed {
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
  .costumeGrid {
    display: grid;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  }

  .item {
    list-style: none;
    height: 100%;
  }
  .item button {
    border-radius: 20px;
    background-color: #fff;
    padding: 0.25rem 0.7rem;
  }
  .item img {
    object-fit: contain;
    max-width: 8rem;
  }
  .caption {
    padding: 1rem;
  }
  .cardModalBody {
    display: flex;
  }
  .cardModalImage {
    min-width: 15rem;
  }
  .cardModalImage img {
    max-width: 100%;
    max-height: 60vh;
    align-items: center;
    margin: 0 auto;
  }
  .modalDetails {
    padding: 0.5rem;
  }

  .overflow-auto {
    max-height: 60vh;
    margin-top: 0.25rem;
  }

  .float {
    position: fixed;
    bottom: 40px;
    right: 20px;
    
  }
  .aboutDiv{
    display: flex;    
  }
  .aboutDiv div{
    padding: .5rem;
  }


  @media screen and (max-width: 900px) {
    .costumeGrid {
      grid-template-columns: 1fr;
    }
    .cardModalBody {
      flex-direction: column;
    }
    .aboutDiv{
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
    .filters {
      min-width: 12rem;
      border-right: 1px solid rgba(128, 128, 128, 0.5);
      background-color: #ddd;
      height: unset;
    }
    .landing {
      flex-direction: column;
    }
    .searchBox {
      width: 100%;
    }
    .item img {
      width: 100%;
    }
    .overflow-auto {
      max-height: 30vh;
      margin-top: 0.25rem;
    }
    .cardModalImage img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%;
    }
    .cardModalImage {
      min-width: unset !important;
    }
    .cardModalBody p {
      font-size: 0.8rem;
    }
    .item button {
      border-radius: 20px;
      background-color: #fff;
      padding: 0.2rem 0.4rem;
      margin-bottom: 0.2rem;
    }

  }
</style>

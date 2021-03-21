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
  } from "sveltestrap";
  import Fa from "svelte-fa";
  import { faFilter } from "@fortawesome/free-solid-svg-icons";
  import { paginate, LightPaginationNav } from "svelte-paginate";
  import { costumeList, currentCostume } from "./stores";

  let isOpen = false;
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
  };
  const toggle = () => {
    gridModalOpen = !gridModalOpen;
  };

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

<div class="landing">
  <div class="filters">
    <h5>Filters <Fa icon={faFilter} /></h5>
    <Nav vertical>
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
    {handleModal}
    size="lg"
    style="max-height: 90vh"
  >
    <ModalHeader {handleModal}>{$currentCostume.caption}</ModalHeader>
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
    max-height: 65vh;
    margin-top: 0.25rem;
  }

  @media screen and (max-width: 900px) {
    .costumeGrid {
      grid-template-columns: 1fr;
    }
    .cardModalBody {
      flex-direction: column;
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
    .cardModalBody p{
    font-size: .8rem;
  }
  }
</style>

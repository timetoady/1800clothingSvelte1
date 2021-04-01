<script>
  //next, add form binding to variables, then a $ object that updates with those, to use in filter to render objects.
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
  import { paginate, LightPaginationNav } from "svelte-paginate";
  import { costumeList, currentCostume } from "./stores";

  import FilterArea from './FilterArea.svelte'
  import CostumeItem from './CostumeItem.svelte'


  //Modal openers
  let items = $costumeList;

  //Paging parts
  let currentPage = 1;
  let pageSize = 18;
  $: paginatedItems = paginate({ items, pageSize, currentPage });
  const imageSource = "assets/images/";

  //modal items
  let gridModalOpen = false;
  
  //Search and filters
  let searchTerm = "";
  //let searchResult = [];

  $: params = {
    datePeriod1: false,
    datePeriod2: false,
    datePeriod3: false,
    datePeriod4: false,
    datePeriod5: false,
    datePeriod6: false,
    datePeriod7: false,
    datePeriod8: false,
    women: false,
    men: false,
    children: false,
    costume: false,
    garment: false,
    hairstyle: false,
    accessory: false,
  };

  const searchFilter = () => {
    console.log("Search term is:", searchTerm);
    console.log($costumeList);
    let searchResult = [];
    //filter by check boxes first.
    // let searchResult = $costumeList.filter((entry) => {
    //   if (Object.values(entry).includes(searchTerm)) {
    //     return entry
    //   };
    // });
    for (const entry of $costumeList) {
      items = $costumeList;
      if (
        entry.caption
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim()) ||
        entry.person
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim()) ||
        entry.class
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim()) ||
        entry.clothing
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim()) ||
        entry.pdf == searchTerm
      ) {
        searchResult.push(entry);
      }
    }
    items = searchResult;
    // checkStuff()
  };

  const handleFilter = () => {
    console.log("Filter clicked!");
  };
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

  const clearResults = () => {
    console.log("Changing!");
    searchTerm.trim() === "" ? (items = $costumeList) : null;
  };

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
  <!-- Filter area -->
  <FilterArea {...params} {searchFilter} {handleFilter} {searchTerm} />

  <!-- Costume list area -->
  <div id="paginationDiv" class="overflow-auto">
    <div class="costumesWrapper">
      <!-- Search Bar -->
      <form on:submit|preventDefault={searchFilter}>
        <input
          bind:value={searchTerm}
          on:change={clearResults}
          class="searchBox"
          type="text"
          placeholder="Search..."
        />
      </form>
      <ul class="items costumeGrid ">
        {#each paginatedItems as item}
          <CostumeItem {item} {handleModal} {imageSource} />
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
    
  </div>
  <!-- Dynamic grid tile modal -->
  <Modal isOpen={gridModalOpen} toggle={handleModal} size="lg">
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
          {#if $currentCostume.description === ""}
            {""}
          {:else}
            <p>
              <strong>Description: </strong>{$currentCostume.description}
            </p>
          {/if}
          <p>
            <strong>Source: </strong>{$currentCostume.source === ""
              ? "Currently unknown."
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
    display: grid;
    grid-template-columns: 210px auto;
    height: 100%;
    width: 100%;
  }

  .costumesWrapper {
    max-width: 1265px;
    margin: 0 auto;
  }

  .costumeGrid {
    display: grid;
    flex-wrap: wrap;
    padding: 1rem;
    grid-gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }
  ul.costumeGrid {
    margin-bottom: 0;
  }

  .cardModalBody {
    display: flex;
  }
  .cardModalImage {
    min-width: 15rem;
    width: 100%;
  }
  .cardModalImage img {
    max-width: 100%;
    max-height: 68vh;
    align-items: center;
    margin: 0 auto;
  }
  .modalDetails {
    padding: 0 0.5rem;
    margin-top: 0 !important;
  }

  .overflow-auto {
    max-height: 60vh;
    margin-top: 0.25rem;
  }
  #paginationDiv.overflow-auto {
    max-height: calc(100vh - 60px);
    margin-top: 0;
  }
  #paginationDiv input {
    border-radius: 6px;
    width: 100%;
  }
  #paginationDiv form {
    padding: 1rem 1rem 0 1rem;
  }

  @media screen and (max-width: 1500px) {
    .costumesWrapper {
      max-width: 900px;
    }
    .costumeGrid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 1065px) {
    .costumeGrid {
      grid-template-columns: 1fr;
    }
    .cardModalBody {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 700px) {
    .landing {
      grid-template-columns: 1fr;
    }
  }
</style>

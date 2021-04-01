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
  import { costumeList, currentCostume, theFilters } from "./stores";
  import FilterArea from "./FilterArea.svelte";
  import FilterArea2 from "./FilterArea2.svelte";
  import CostumeItem from "./CostumeItem.svelte";

  //Modal openers
  let items = $costumeList;

  //Paging parts
  let currentPage = 1;
  let pageSize = 18;
  $: paginatedItems = paginate({ items, pageSize, currentPage });
  const imageSource = "assets/images/";
  $: console.log($theFilters);
  $: handleFilter($theFilters);
  //modal items
  let gridModalOpen = false;

  //Search and filters
  let searchTerm = "";
  //let searchResult = [];

  // $: params = {
  //   datePeriod1: false,
  //   datePeriod2: false,
  //   datePeriod3: false,
  //   datePeriod4: false,
  //   datePeriod5: false,
  //   datePeriod6: false,
  //   datePeriod7: false,
  //   datePeriod8: false,
  //   women: false,
  //   men: false,
  //   children: false,
  //   costume: false,
  //   garment: false,
  //   hairstyle: false,
  //   accessory: false,
  // };

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
      if($theFilters.length === 0){
        items = $costumeList;
      } else{
        items = handleFilter($theFilters)
      }
      
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

  const handleFilter = (filters) => {
    if (filters.length > 0) {
      console.log("Filters on")
      let filterResult = [];
      for (const entry of items) {
        for (const filter of $theFilters) {
          if (Object.values(entry).includes(filter)) {
            filterResult.push(entry);
          }
        }
      }
      console.log("Filter result: ", filterResult)
      items = filterResult;
      return filterResult;
    } else{
      console.log("Filters off")
      if (searchTerm) {
        searchFilter()
      } else{
        items = $costumeList
      }
    }

    // switch (filter) {
    //   case "date1":
    //     params.datePeriod1 = !params.datePeriod1;
    //     break;
    //   case "date2":
    //     params.datePeriod2 = !params.datePeriod2;
    //     break;
    //   case "date3":
    //     params.datePeriod3 = !params.datePeriod3;
    //     break;
    //   case "date4":
    //     params.datePeriod4 = !params.datePeriod4;
    //     break;
    //   case "date5":
    //     params.datePeriod5 = !params.datePeriod5;
    //     break;
    //   case "date6":
    //     params.datePeriod6 = !params.datePeriod6;
    //     break;
    //   case "date7":
    //     params.datePeriod7 = !params.datePeriod7;
    //     break;
    //   case "date8":
    //     params.datePeriod7 = !params.datePeriod8;
    //     break;
    //   case "women":
    //     params.women = !params.women;
    //     break;
    //   case "men":
    //     params.men = !params.men;
    //     break;
    //   case "children":
    //     params.children = !params.children;
    //     break;
    //   case "costume":
    //     params.costume = !params.costume;
    //     break;
    //   case "garment":
    //     params.garment = !params.garment;
    //     break;
    //   case "hairstyle":
    //     params.hairstyle = !params.hairstyle;
    //     break;
    //   case "accessory":
    //     params.accessory = !params.accessory;
    //     break;
    // }
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
  <!-- <FilterArea {...params} {searchFilter} {handleFilter} {searchTerm} /> -->

  <FilterArea2 />
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

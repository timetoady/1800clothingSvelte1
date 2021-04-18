<script>
  import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "sveltestrap";
  import Fa from "svelte-fa";
  import { faDownload } from "@fortawesome/free-solid-svg-icons";
  import { paginate, LightPaginationNav } from "svelte-paginate";
  import { fade, fly } from "svelte/transition";
  import {
    classFilters,
    costumeList,
    currentCostume,
    groupFilters,
    dateFilters,
    categoryFilters,
  } from "./stores";
  //New filter area with updated filtering applied
  import FilterArea2 from "./FilterArea2.svelte";
  import CostumeItem from "./CostumeItem.svelte";
  //Default items setup
  $: items = $costumeList;

  //Sets the filters by the filter stores.
  $: filters = {
    dates: $dateFilters,
    groups: $groupFilters,
    categories: $categoryFilters,
    classes: $classFilters,
  };
  //Checks on the state of the filters both as a group and individually.
  $: filterState =
    filters.dates.length === 0 &&
    filters.groups.length === 0 &&
    filters.categories.length === 0 &&
    filters.classes.length === 0
      ? false
      : true;
  $: datesFiltered = filters.dates.length > 0 ? true : false;
  $: groupsFiltered = filters.groups.length > 0 ? true : false;
  $: categoriesFiltered = filters.categories.length > 0 ? true : false;
  $: classesFiltered = filters.classes.length > 0 ? true : false;

  //Search items
  let searchTerm = "";
  let searchResults = [];

  //Paging parts
  let currentPage = 1;
  let pageSize = 12;
  const imageSource = "assets/images/";
  const thumbSource = "assets/thumbnails/";
  $: console.log(filters);
  $: handleFilter(filters);
  $: paginatedItems = paginate({ items, pageSize, currentPage });

  //modal items
  let gridModalOpen = false;
  let viewDownload = false;

  //Utility function to apply filter. Can be exported.
  const applyFilter = (thingToFilter, thingToFilterBy, thingInJSON) => {
    let newItems = thingToFilter.filter((item) => {
      if (
        filters[`${thingToFilterBy}`].some(
          (element) => element == item[`${thingInJSON}`]
        )
      ) {
        return item;
      }
    });
    return newItems;
  };

  //Set search items
  function setSearch() {
    if (searchTerm.trim() !== "" && searchResults !== []) {
      console.log("Search Result is: ", searchResults);
      items = searchResults;
      console.log("After search, items are now:", items);
    } else {
      items = $costumeList;
      searchResults = [];
    }
  }

  function resetItems() {
    items = $costumeList;
    searchResults = [];
  }

  //Primary function responsible for filtering items by the searchTerm.
  const searchFilter = () => {
    console.log("Search term is:", searchTerm);

    if (!filterState) {
      console.log("Search detects no filters");
      resetItems();
    }
    if (searchTerm.trim() === "" && filterState) {
      searchResults = [];
      handleFilter(filters);
      return;
    }
    if (!filterState && searchTerm.trim() === "") {
      resetItems();
      return;
    }
    if (searchTerm && filterState) {
      handleFilter(filters);
      searchResults = [];
    }
    if (filterState) {
      handleFilter(filters);
      searchResults = [];
      items = paginatedItems;
    }
    console.log("Paginated items", paginatedItems);
    for (const entry of items) {
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
        searchResults.push(entry);
      }
    }
    setSearch();
  };

  //Filter handler that checks all filter scenarios, including if search term is present.Landing
  //This is big and ugly, and could be optimized.
  const handleFilter = (filters) => {
    console.log("Handle filter called");
    if (searchTerm.trim() !== "") {
      items = searchResults;
    } else {
      items = $costumeList;
    }
    let newItems;
    if (
      datesFiltered &&
      groupsFiltered &&
      categoriesFiltered &&
      classesFiltered
    ) {
      let filter1 = applyFilter(items, "dates", "pdf");
      let filter2 = applyFilter(filter1, "groups", "person");
      let filter3 = applyFilter(filter2, "categories", "clothing");
      let filter4 = applyFilter(filter3, "classes", "class");
      items = filter4;
      return;
    }
    if (datesFiltered && groupsFiltered && categoriesFiltered) {
      let filter1 = applyFilter(items, "dates", "pdf");
      let filter2 = applyFilter(filter1, "groups", "person");
      let filter3 = applyFilter(filter2, "categories", "clothing");
      items = filter3;
      return;
    }
    if (classesFiltered && groupsFiltered && categoriesFiltered) {
      let filter1 = applyFilter(items, "classes", "class");
      let filter2 = applyFilter(filter1, "groups", "person");
      let filter3 = applyFilter(filter2, "categories", "clothing");
      items = filter3;
      return;
    }
    if (datesFiltered && classesFiltered && categoriesFiltered) {
      let filter1 = applyFilter(items, "dates", "pdf");
      let filter2 = applyFilter(items, "classes", "class");
      let filter3 = applyFilter(filter2, "categories", "clothing");
      items = filter3;
      return;
    }
    if (datesFiltered && groupsFiltered && classesFiltered) {
      let filter1 = applyFilter(items, "dates", "pdf");
      let filter2 = applyFilter(filter1, "groups", "person");
      let filter3 = applyFilter(items, "classes", "class");
      items = filter3;
      return;
    }
    if (datesFiltered && groupsFiltered) {
      console.log("Dates and Groups!");
      let filter1 = applyFilter(items, "dates", "pdf");
      let filter2 = applyFilter(filter1, "groups", "person");
      items = filter2;
      return;
    }
    if (datesFiltered && categoriesFiltered) {
      console.log("Dates and Categories!");
      let filter1 = applyFilter(items, "dates", "pdf");
      let filter2 = applyFilter(filter1, "categories", "clothing");
      items = filter2;
      return;
    }
    if (datesFiltered && classesFiltered) {
      console.log("Dates and Classes!");
      let filter1 = applyFilter(items, "dates", "pdf");
      let filter2 = applyFilter(filter1, "classes", "class");
      items = filter2;
      return;
    }
    if (groupsFiltered && categoriesFiltered) {
      console.log("Groups and Categories!");
      let filter1 = applyFilter(items, "groups", "person");
      let filter2 = applyFilter(filter1, "categories", "clothing");
      items = filter2;
      return;
    }
    if (groupsFiltered && classesFiltered) {
      console.log("Groups and Classes!");
      let filter1 = applyFilter(items, "groups", "person");
      let filter2 = applyFilter(filter1, "classes", "class");
      items = filter2;
      return;
    }
    if (classesFiltered && categoriesFiltered) {
      console.log("Classes and Categories!");
      let filter1 = applyFilter(items, "classes", "class");
      let filter2 = applyFilter(filter1, "categories", "clothing");
      items = filter2;
      return;
    }

    if (datesFiltered) {
      console.log("Something in the dates!");
      let newItems = applyFilter(items, "dates", "pdf");
      items = newItems;
      return;
    }
    if (groupsFiltered) {
      console.log("Something in the groups!", filters.groups);
      let newItems = applyFilter(items, "groups", "person");
      items = newItems;
      return;
    }
    if (categoriesFiltered) {
      let newItems = applyFilter(items, "categories", "clothing");
      items = newItems;
      return;
    }
    if (classesFiltered) {
      console.log("Something in the classes!", filters.classes);
      let newItems = applyFilter(items, "classes", "class");
      items = newItems;
    }
    if (
      !datesFiltered &&
      !groupsFiltered &&
      !categoriesFiltered &&
      !classesFiltered
    ) {
      items = $costumeList;
      if (searchTerm) {
        searchFilter();
      }
    }
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
    console.log("Clearing results");
    searchTerm.trim() === "" ? (items = $costumeList) : null;
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <link rel="stylesheet" href="landingStyles.css" />
</svelte:head>

<!-- <svelte:window bind:scrollY={y} /> -->

<div class="landing">
  <!-- Filter area -->
  <FilterArea2 />
  <!-- Costume list area -->
  <div id="paginationDiv" class="overflow-auto">
    <div class="costumesWrapper">
      <!-- Search Bar -->
      <form on:submit|preventDefault={() => searchFilter(searchTerm)}>
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
          <CostumeItem {item} {handleModal} {imageSource} {thumbSource} />
        {/each}
      </ul>
      <LightPaginationNav
        totalItems={items.length}
        {pageSize}
        {currentPage}
        limit={2}
        showStepOptions={true}
        on:setPage={(e) => {
          currentPage = e.detail.page;
          // y = 0;
        }}
      />
    </div>
  </div>
  <!-- Dynamic grid tile modal -->
  <Modal isOpen={gridModalOpen} toggle={handleModal} size="lg">
    <ModalHeader toggle={handleModal}>{$currentCostume.caption}</ModalHeader>
    <ModalBody>
      <div>
        <div class="cardModalBody">
          <div
            class="cardModalImage"
            on:mouseenter={() => (viewDownload = true)}
            on:mouseleave={() => (viewDownload = false)}
          >
            <img
              src="{imageSource}{$currentCostume.image}"
              alt={$currentCostume.caption}
            />
            {#if viewDownload}
              <div
                class="modalImgDownload"
                in:fly={{ y: 30, duration: 500 }}
                out:fade
              >
                <a href="{imageSource}{$currentCostume.image}" download
                  >Download Image <Fa icon={faDownload} /></a
                >
              </div>
            {/if}
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

  .modalImgDownload {
    text-align: right;
    margin-top: -2.5rem;
    background-color: rgba(0, 0, 0, 0.808);
    padding: 0.5rem;
    position: relative;
  }

  .modalImgDownload a{
    color: #f2f2f2;
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

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
    currentPage = 1;
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
      currentPage = 1;
    }
  }

  function resetItems() {
    items = $costumeList;
    searchResults = [];
    currentPage = 1;
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
          {#if item.image !== "not found"}
            <CostumeItem {item} {handleModal} {imageSource} {thumbSource} />
          {/if}
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
          document.querySelector('#paginationDiv').scrollTop = 0
        }}
      />
    </div>
  </div>
  <!-- grid tile modal -->
  {#if gridModalOpen}
    <div class="costumeModalBackground">
      <div class="costumeModal">
        <div class="exitBtn" on:click={toggleModal}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#ebebeb;}.cls-2{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:19px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M345,345.53l-178-178m178,0-178,178"/></g></g></svg>
        </div>
        <div class="costumeModalHeader">
          <h1>{$currentCostume.caption}</h1>
        </div>

        <div class="costumeModalBody">
          <div class="modalImageArea">
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
                  in:fly={{ y: 0, duration: 250 }}
                  out:fade
                >
                  <a href="{imageSource}{$currentCostume.image}" download
                    >Download Image <Fa icon={faDownload} /></a
                  >
                </div>
              {/if}
            </div>
          </div>

          <div class="modalDataArea">
            {#if $currentCostume.description === ""}
              {"No description provided."}
            {:else}
              <h2 class="descTitle">Description</h2>
              <div class="descContent">
                {$currentCostume.description}
              </div>
            {/if}
            <div class="costumeSrc">
              <strong>Source: </strong>{$currentCostume.source === ""
                ? "Currently unknown."
                : $currentCostume.source}
            </div>
          </div>
        </div>
        <div class="costumeModalFooter">
          <div class="costumeInfoBtn">{$currentCostume.pdf}</div>
          <div class="costumeInfoBtn">{$currentCostume.person}</div>
          <div class="costumeInfoBtn">{$currentCostume.clothing}</div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .landing {
    padding: 0;
    display: grid;
    grid-template-columns: 210px auto;
    height: 100%;
    width: 100%;
    position: relative;
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

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .costumeModalBackground {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.541);
    display: grid;
    place-items: center;

    /* animation */
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.2s;
  }
  .costumeModal {
    background-color: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.288);
    width: 900px;
    border-radius: 6px;
    position: relative;
    padding-bottom: 60px;
  }

  .exitBtn {
    padding: 5px;
    position: absolute;
    width: 35px;
    height: 35px;
    top: 15px;
    right: 20px;
    cursor: pointer;
  }
  .exitBtn svg {
    width: 100%;
  }
  .exitBtn:hover svg .cls-1 { 
    fill: rgb(226, 226, 226);
  }

  .costumeModalHeader {
    padding: 20px;
    padding-bottom: 0;
    margin: 0;
  }
  .costumeModalHeader h1 {
    font-size: 25px;
    font-weight: bold;
    line-height: 1.4;
    padding-right: 40px;
  }

  .costumeModalBody {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 20px;
    padding: 20px;
    padding-top: 10px;
  }
  .modalImageArea {
    min-width: 160px;
    max-width: 330px;
  }
  .cardModalImage {
    width: 100%;
    max-height: 400px;
    display: grid;
    place-items: center;
  }
  .cardModalImage img {
    max-width: 100%;
    max-height: 300px;
  }
  .modalDataArea .descTitle {
    font-weight: bold;
    font-size: 18px;
  }
  .modalDataArea .descContent {
    overflow-y: auto;
    max-height: 250px;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 6px;
    padding: 5px;
  }
  .modalDataArea .costumeSrc {
    margin-top: 10px;
    overflow-wrap: anywhere;
  }

  .costumeModalFooter {
    border-top: 1px solid rgb(211, 211, 211);
    position: absolute;
    bottom: 0;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  .costumeModalFooter .costumeInfoBtn {
    border-radius: 20px;
    background-color: rgb(236, 236, 236);
    padding: 4px 11px;
    text-transform: capitalize;
    border: none;
    margin-right: 13px;
    display: inline-block;
    font-size: 16px;
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
    position: relative;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

  .modalImgDownload a {
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
  }

  @media screen and (max-width: 700px) {
    .landing {
      grid-template-columns: 1fr;
    }
  }

  /* costume modal media queries */
  @media screen and (max-width: 930px) {
    .costumeModal {
      width: 95%;
    }
  }

  @media screen and (max-width: 700px) {
    .costumeModal {
      height: 95%;
    }
    .modalImageArea {
      max-width: 250px;
    }
  }

  @media screen and (max-width: 600px) {
    .costumeModalBackground {
      overflow-y: scroll;
    }
    .costumeModalBody {
      grid-template-columns: 1fr;
      padding-bottom: 70px;
    }
    .modalImageArea {
      max-width: 1000px;
    }
  }
</style>

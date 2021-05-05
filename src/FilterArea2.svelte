<script>
  import { Nav, NavItem, Collapse, UncontrolledCollapse } from "sveltestrap";

  import CopyrightForm from "./CopyrightForm.svelte";

  let showContactForm = false;

  const toggleContactForm = () => {
    showContactForm = !showContactForm;
  };

  import Fa from "svelte-fa";
  import { faFilter } from "@fortawesome/free-solid-svg-icons";
  import {
    costumeList,
    dateFilters,
    groupFilters,
    categoryFilters,
    classFilters,
  } from "./stores";

  let filters = {
    date: [],
    group: [],
    category: [],
    class: [],
  };

  //These produce the dynmaic categories for Category and Classes, respectively.
  $: updateFilters(filters);
  let classesWithDups = () => {
    let duplicateClasses = [];
    $costumeList.forEach((costume) => {
      duplicateClasses.push(costume.class);
    });
    return duplicateClasses;
  };

  //Categories refer to the category of clothing, and that is its reference in the JSON.
  let catsWithDups = () => {
    let duplicateClothing = [];
    $costumeList.forEach((costume) => {
      duplicateClothing.push(costume.clothing);
    });
    return duplicateClothing;
  };

  $: classes = [...new Set(classesWithDups())];
  $: categories = [...new Set(catsWithDups())];
  const updateFilters = () => {
    dateFilters.set(filters.date);
    groupFilters.set(filters.group);
    categoryFilters.set(filters.category);
    classFilters.set(filters.class);
  };
  let w;
  //Screen sizes
  const small = 700;
  const medium = 900;
  // Modal is open
  let isOpen = false;
</script>

<svelte:window bind:innerWidth={w} />

<div class="filters">
  {#if w > small}
    <h5>Filters <Fa icon={faFilter} /></h5>
  {/if}
  <Nav vertical>
    {#if w <= small}
      <form>
        <div class="collapseContainer">
          <div class="collapsed">
            <div on:click={() => (isOpen = !isOpen)}>
              <NavItem>Filters <Fa icon={faFilter} /></NavItem>
            </div>

            <Collapse {isOpen}>
              <NavItem>Date Range</NavItem>
              <aFilter />
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1800-1819"
                    type="checkbox"
                  />
                  1800-1819
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1820-1829"
                    type="checkbox"
                  />
                  1820-1829
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1830-1839"
                    type="checkbox"
                  />
                  1830-1839
                </label></NavItem
              >
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1840-1849"
                    type="checkbox"
                  />
                  1840-1849
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1850-1859"
                    type="checkbox"
                  />
                  1850-1859
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1860-1869"
                    type="checkbox"
                  />
                  1860-1869
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1870-1879"
                    type="checkbox"
                  />
                  1870-1879
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1880-1889"
                    type="checkbox"
                  />
                  1880-1889
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1890-1899"
                    type="checkbox"
                  />
                  1890-1899
                </label>
              </NavItem>
            </Collapse>
          </div>

          <div class="collapsed">
            <Collapse {isOpen}>
              <NavItem>Group</NavItem>
              <NavItem
                ><label>
                  <input
                    type="checkbox"
                    bind:group={filters.group}
                    value="women"
                  />
                  Women
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input
                    type="checkbox"
                    bind:group={filters.group}
                    value="men"
                  />
                  Men
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input
                    type="checkbox"
                    bind:group={filters.group}
                    value="children"
                  />
                  Children
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input
                    type="checkbox"
                    bind:group={filters.group}
                    value="family"
                  />
                  Family
                </label>
              </NavItem>
            </Collapse>
          </div>

          <div class="collapsed">
            <Collapse {isOpen}>
              <NavItem>Category</NavItem>
              {#each classes as aClass, i}
                <NavItem
                  ><label>
                    <input
                      bind:group={filters.category}
                      value={aClass}
                      type="checkbox"
                    />
                    {aClass}
                  </label></NavItem
                >
              {/each}
            </Collapse>
          </div>

          <div class="collapsed">
            <Collapse {isOpen}>
              <NavItem>Class</NavItem>
              {#each categories as aCat, i}
                <NavItem
                  ><label>
                    <input
                      bind:group={filters.category}
                      value={aCat}
                      type="checkbox"
                    />
                    {aCat}
                  </label></NavItem
                >
              {/each}
            </Collapse>
          </div>
        </div>
      </form>
    {:else}
      <form>
        <div class="collapseContainer">
          <div class="collapsed">
            <div on:click={() => (isOpen = !isOpen)}>
              <NavItem>Date Range</NavItem>
            </div>

            <Collapse {isOpen}>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1800-1819"
                    type="checkbox"
                  />
                  1800-1819
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1820-1829"
                    type="checkbox"
                  />
                  1820-1829
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1830-1839"
                    type="checkbox"
                  />
                  1830-1839
                </label></NavItem
              >
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1840-1849"
                    type="checkbox"
                  />
                  1840-1849
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1850-1859"
                    type="checkbox"
                  />
                  1850-1859
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1860-1869"
                    type="checkbox"
                  />
                  1860-1869
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1870-1879"
                    type="checkbox"
                  />
                  1870-1879
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1880-1889"
                    type="checkbox"
                  />
                  1880-1889
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input
                    bind:group={filters.date}
                    value="1890-1899"
                    type="checkbox"
                  />
                  1890-1899
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
                  <input
                    bind:group={filters.group}
                    value="women"
                    type="checkbox"
                  />
                  Women
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input
                    bind:group={filters.group}
                    value="men"
                    type="checkbox"
                  />
                  Men
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input
                    bind:group={filters.group}
                    value="children"
                    type="checkbox"
                  />
                  Children
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input
                    bind:group={filters.group}
                    value="family"
                    type="checkbox"
                  />
                  Family
                </label>
              </NavItem>
            </UncontrolledCollapse>
          </div>

          <div class="collapsed">
            <div id="toggler2">
              <NavItem>Category</NavItem>
            </div>
            <UncontrolledCollapse toggler="#toggler2">
              {#each categories as aCat, i}
                <NavItem
                  ><label>
                    <input
                      bind:group={filters.category}
                      value={aCat}
                      type="checkbox"
                    />
                    {aCat}
                  </label></NavItem
                >
              {/each}
            </UncontrolledCollapse>
          </div>

          <div class="collapsed">
            <div id="toggler3">
              <NavItem>Classes</NavItem>
            </div>
            <UncontrolledCollapse toggler="#toggler3">
              {#each classes as aClass, i}
                <NavItem
                  ><label>
                    <input
                      bind:group={filters.class}
                      value={aClass}
                      type="checkbox"
                    />
                    {aClass}
                  </label></NavItem
                >
              {/each}
            </UncontrolledCollapse>
          </div>
        </div>
      </form>
    {/if}
  </Nav>

  <!--  Copyright Form

  commenting this out because form handling isn't 
  working on netlify for whatever reason
  
  <div class="formLinks">
    <div class="linkText">
      Copyright claim? <div class="formLink" on:click={toggleContactForm}>
        Click here.
      </div>
    </div>
  </div> -->

  {#if showContactForm}
    <CopyrightForm {toggleContactForm} />
  {/if}
</div>

<style>
  div.filters {
    width: 100%;
    border-right: 1px solid rgba(128, 128, 128, 0.5);
    background-color: rgb(241, 229, 212);
    position: relative;
  }
  .filters h5 {
    margin: 0;
    padding: 0.25rem 0.75rem;
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
  .collapseContainer {
    background-color: white;
  }
  .collapsed {
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
  .collapsed label {
    text-transform: capitalize;
  }

  .formLinks {
    font-size: 12px;
    bottom: 0;
    position: absolute;
    max-width: 100%;
    padding: 15px;
  }
  .linkText {
    padding-top: 8px;
  }
  .formLink {
    display: inline-block;
    cursor: pointer;
    color: blue;
  }

  /* .mobileSearchBox {
    display: none;
  } */

  @media screen and (max-width: 700px) {
    .filters {
      width: 100%;
      border-right: 1px solid rgba(128, 128, 128, 0.5);
      background-color: #ddd;
      height: unset;
      position: relative;
    }
    .formLinks {
      display: none;
    }
    /* .mobileSearchBox {
      display: block;
      width: 100%;
    } */
  }

  /* filters have overlow scroll on desktop, not on mobile  */
  /* i'm using a media query for this because for some reason the mobile filters' height is small  when i style it directly  */
  @media screen and (min-width: 701px) {
    .filters {
      overflow-y: auto;
    }
  }
</style>

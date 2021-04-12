<script>
  import {
    Nav,
    NavItem,
    Collapse,
    UncontrolledCollapse,

  } from "sveltestrap";

  import CopyrightForm from './CopyrightForm.svelte'

  let showContactForm = false

  const toggleContactForm = () => {
    showContactForm = !showContactForm
  }

  import Fa from "svelte-fa";
  import { faFilter } from "@fortawesome/free-solid-svg-icons";
  import { costumeList, dateFilters, groupFilters, categoryFilters, classFilters } from "./stores"

  let filters = {
    date: [],
    group: [],
    category: [],
    class: []
  }

  $: updateFilters(filters)
  let classesWithDups = () =>{
    let duplicateClasses = []
    $costumeList.forEach(costume =>{
      duplicateClasses.push(costume.class)
    })
    return duplicateClasses
  }
  $: classes = [...new Set(classesWithDups())]
  const updateFilters = () => {
    dateFilters.set(filters.date)
    groupFilters.set(filters.group)
    categoryFilters.set(filters.category)
    classFilters.set(filters.class)
  }
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
            <!-- commenting this out since there's already a search bar in the costumes list area. 
            <input
              bind:value={searchTerm}
              on:change|preventDefault={searchFilter}
              class="searchBox mobileSearchBox"
              type="text"
              placeholder="Search..."
              on:submit|preventDefault={searchFilter}
            />
            -->

            <div on:click={() => (isOpen = !isOpen)}>
              <NavItem>Filters <Fa icon={faFilter} /></NavItem>
            </div>

            <Collapse {isOpen}>
              <NavItem>Date Range</NavItem>
              <aFilter></aFilter>
              <NavItem>
                <label >
                  <input bind:group={filters.date} value="1800" type="checkbox" />
                  1800-1819
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1820" type="checkbox" />
                  1820-1829
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1830" type="checkbox" />
                  1830-1839
                </label></NavItem
              >
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1840" type="checkbox" />
                  1840-1849
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1850" type="checkbox" />
                  1850-1859
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1860" type="checkbox" />
                  1860-1869
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1870" type="checkbox" />
                  1870-1879
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1880" type="checkbox" />
                  1880-1889
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
                  <input type="checkbox" bind:group={filters.group} value="women" />
                  Women
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input type="checkbox" bind:group={filters.group} value="men" />
                  Men
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input type="checkbox" bind:group={filters.group} value="children" />
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
                  <input type="checkbox" bind:group={filters.category} value="costume" />
                  Costume
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input type="checkbox" bind:group={filters.category} value="garment" />
                  Garment
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input type="checkbox" bind:group={filters.category} value="hairstyle" />
                  Hairstyle
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input type="checkbox" bind:group={filters.category} value="accessory" />
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
            <div on:click={() => (isOpen = !isOpen)}>
              <NavItem>Date Range</NavItem>
            </div>

            <Collapse {isOpen}>
              <NavItem >
                <label >
                  <input bind:group={filters.date} value="1800" type="checkbox" />
                  1800-1819
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1810" type="checkbox" />
                  1820-1829
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1820" type="checkbox" />
                  1830-1839
                </label></NavItem
              >
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1830" type="checkbox" />
                  1840-1849
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1840" type="checkbox" />
                  1850-1859
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1850" type="checkbox" />
                  1860-1869
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1860" type="checkbox" />
                  1870-1879
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1870" type="checkbox" />
                  1880-1889
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:group={filters.date} value="1880" type="checkbox" />
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
                  <input bind:group={filters.group} value="women"  type="checkbox" />
                  Women
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input bind:group={filters.group} value="men"  type="checkbox"/>
                  Men
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input bind:group={filters.group} value="children" type="checkbox"/>
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
                  <input bind:group={filters.category} value="costume"  type="checkbox" />
                  Costume
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input bind:group={filters.category} value="garment" type="checkbox"  />
                  Garment
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input bind:group={filters.category} value="hairstyle" type="checkbox"  />
                  Hairstyle
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input bind:group={filters.category} value="accessory" type="checkbox"  />
                  Accessory
                </label></NavItem
              >
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
                  <input bind:group={filters.class} value={aClass} type="checkbox"  />
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

  <div class="formLinks">
    <div class="linkText">Copyright claim? <div class="formLink" on:click={toggleContactForm}>Click here.</div></div>
    <div class="linkText">Have an image to contribute? <div class="formLink">Click here.</div></div>
  </div>

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
</style>

<script>
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

  export let datePeriod1,
    datePeriod2,
    datePeriod3,
    datePeriod4,
    datePeriod5,
    datePeriod6,
    datePeriod7,
    women,
    men,
    children,
    costume,
    garment,
    hairstyle,
    accessory,
    searchTerm,
    searchFilter,
    handleFilter;

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
              <NavItem>
                <label on:click={handleFilter}>
                  <input bind:value={datePeriod1} type="checkbox" />
                  1800-1819
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod2} type="checkbox" />
                  1820-1829
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod3} type="checkbox" />
                  1830-1839
                </label></NavItem
              >
              <NavItem>
                <label>
                  <input bind:value={datePeriod4} type="checkbox" />
                  1840-1849
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod5} type="checkbox" />
                  1850-1859
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod6} type="checkbox" />
                  1860-1869
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod7} type="checkbox" />
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
                  <input type="checkbox" bind:value={women} />
                  Women
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={men} />
                  Men
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={children} />
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
                  <input type="checkbox" bind:value={costume} />
                  Costume
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={garment} />
                  Garment
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={hairstyle} />
                  Hairstyle
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={accessory} />
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
              <NavItem>
                <label on:click={handleFilter}>
                  <input bind:value={datePeriod1} type="checkbox" />
                  1800-1819
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod2} type="checkbox" />
                  1820-1829
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod3} type="checkbox" />
                  1830-1839
                </label></NavItem
              >
              <NavItem>
                <label>
                  <input bind:value={datePeriod4} type="checkbox" />
                  1840-1849
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod5} type="checkbox" />
                  1850-1859
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod6} type="checkbox" />
                  1860-1869
                </label>
              </NavItem>
              <NavItem>
                <label>
                  <input bind:value={datePeriod7} type="checkbox" />
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
                  <input type="checkbox" bind:value={women} />
                  Women
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={men} />
                  Men
                </label>
              </NavItem>
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={children} />
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
                  <input type="checkbox" bind:value={costume} />
                  Costume
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={garment} />
                  Garment
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={hairstyle} />
                  Hairstyle
                </label></NavItem
              >
              <NavItem
                ><label>
                  <input type="checkbox" bind:value={accessory} />
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

<style>

  div.filters {
    width: 100%;
    border-right: 1px solid rgba(128, 128, 128, 0.5);
    background-color: #ddd;
  }
  .filters h5 {
    margin: 0;
    padding: 0.25rem 0.75rem;
    background-color: #888;
  }
  .collapsed {
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
  .mobileSearchBox {
    display: none;
  }

  @media screen and (max-width: 700px) {
    .filters {
      width: 100%;
      border-right: 1px solid rgba(128, 128, 128, 0.5);
      background-color: #ddd;
      height: unset;
      position: relative;
    }
    .mobileSearchBox {
      display: block;
      width: 100%;
    }
  }
</style>

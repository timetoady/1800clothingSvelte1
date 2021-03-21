<script>
  import { onMount } from "svelte";
  import { Nav, NavItem, Collapse, UncontrolledCollapse, Card, CardBody, CardFooter } from "sveltestrap";
  import Fa from "svelte-fa";
  import { faFilter } from "@fortawesome/free-solid-svg-icons";
  import { paginate, LightPaginationNav } from "svelte-paginate";
  import { costumeList } from "./stores";
  let isOpen = false;
  let items = $costumeList;
  let currentPage = 1;
  let pageSize = 6;
  $: paginatedItems = paginate({ items, pageSize, currentPage });

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
            <input type="text" placeholder="Search..." />

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
            <CardBody>
              {item.caption}
            </CardBody>
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
  .costumeGrid{
    display: grid;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 10px;
    grid-template-columns: 1fr 1fr ;

    
  }
  .item{
    list-style: none;
    /* max-width: 10rem; */
  }
  .item button{
    border-radius: 20px;
    background-color: #fff;
    padding: .25rem .7rem;
  }

</style>

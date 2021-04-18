<script>
  export let item, handleModal, thumbSource;
</script>

<li class="item">
  <div class="cardBody" on:click={() => handleModal(item.id)}>
    <img
      src="{thumbSource}{item.thumbnail}"
      alt={item.caption}
      loading="lazy"
    />
    <div name="cardCaption" class="caption overflow-auto">
      {item.caption}
    </div>
  </div>
  <div class="cardFooter">
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
  </div>
</li>

<style>
  .item {
    list-style: none;
    min-height: 254px;
    width: 100%;
    position: relative;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.14);
  }
  .item .cardBody {
    display: grid;
    grid-template-columns: auto auto; 
    max-height: calc(100% - 55px);
    padding: 10px;
  }

  .cardFooter {
    border-top: 1px solid rgb(236, 236, 236);
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    height: 55px;
    overflow: hidden; /* hides tags that are too long. change this in the future */
  }

  .cardFooter button {
    border-radius: 20px;
    background-color: rgb(236, 236, 236);
    padding: 0.25rem 0.7rem;
    text-transform: capitalize;
    border: none;
    margin-right: 7px;
  }
  .cardBody img {
    height: auto;
    max-height: 175px;
    max-width: 130px;
  }
  .caption {
    padding: 0 0 1rem 1rem;
    min-width: 250px;
    width: 100%;
    display: block;
  }

  .overflow-auto {
    max-height: 60vh;
    margin-top: 0.25rem;
  }
  div.caption.overflow-auto {
    max-height: 20vh;
  }

  @media screen and (max-width: 1065px) {
    .item {
      width: 100%;
    }
  }

  @media screen and (max-width: 700px) {
    .item {
      width: 100%;
      min-width: none;
    }
    .cardBody {
      grid-template-columns: 1fr;
      width: 100%;
      min-width: none;
    }
    .cardBody img {
      max-width: 80px;
      width: auto;
    }
    .caption {
      max-width: 100%;
      min-width: none;
      width: 100%;
    }
    .cardFooter {
      width: 100%;
    }
  }
</style>
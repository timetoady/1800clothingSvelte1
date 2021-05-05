<script>
  export let item, handleModal, thumbSource;
</script>

<li class="item" on:click={() => handleModal(item.id)}>
  <div class="cardBody">
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
    <div class="cardBtn">{item.pdf}</div>
    <div class="cardBtn">{item.person}</div>
    <div class="cardBtn">{item.clothing}</div>
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
    transition: all ease 0.3s;
    top: 0;
  }
  .item:hover {
    top: 4px;
    background-color: rgb(252, 252, 252);
  }
  .item .cardBody {
    display: flex;
    align-items: flex-start;
    height: calc(100% - 55px);
    padding: 10px;
  }

  .cardFooter {
    border-top: 1px solid rgb(236, 236, 236);
    background-color: white;
    border-radius: 0 0 10px 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    height: 55px;
    overflow: hidden; /* hides tags that are too long. change this in the future */
  }

  .cardFooter .cardBtn {
    border-radius: 20px;
    background-color: rgb(236, 236, 236);
    padding: 4px 11px;
    text-transform: capitalize;
    border: none;
    margin-right: 4px;
    display: inline-block;
    font-size: 16px;
  }
  .cardBody img {
    height: auto;
    object-fit: contain;
    vertical-align: top;
    width: 100%;
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
      width: 100%;
      min-width: none;
    }
    .cardBody img {
      max-width: 80px;
      width: auto;
    }
    .caption {
      max-width: 100%;
      min-width: 0;
      width: 100%;
    }
    .cardFooter {
      width: 100%;
    }
  }
</style>
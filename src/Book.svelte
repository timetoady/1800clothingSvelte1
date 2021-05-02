<script>
  import { Nav, NavItem } from "sveltestrap";
  import Fa from "svelte-fa";
  import { faDownload } from "@fortawesome/free-solid-svg-icons";
  let pdfPreview = "defaultView.pdf";
  let pdfBase;
  $: pdfURL = `./assets/pdfs/${pdfPreview}`;
  const handleViewerUpdate = (url) => {
    console.log(url);
    pdfBase = url;
    pdfPreview = `${url}preview.pdf`;
    console.log(pdfURL);
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <link rel="stylesheet" href="compStyles.css" />
</svelte:head>

<div class="theBook">
  <div class="navigation">
    <h5>Books</h5>
    <div class="navigationBackground">
      <Nav vertical>
        <NavItem>
          <label on:click={() => handleViewerUpdate("1800-1819")}>
            1800-1819
            <input type="radio" name="chapter" />
          </label>
        </NavItem>
        <NavItem>
          <label on:click={() => handleViewerUpdate("1820-1829")}>
            1820-1829
            <input type="radio" name="chapter" />
          </label>
        </NavItem>
        <NavItem>
          <label on:click={() => handleViewerUpdate("1830s")}>
            1830-1839
            <input type="radio" name="chapter" />
          </label>
        </NavItem>
        <NavItem>
          <label on:click={() => handleViewerUpdate("1840s")}>
            1840-1849
            <input type="radio" name="chapter" />
          </label>
        </NavItem>
        <NavItem>
          <label on:click={() => handleViewerUpdate("1850s")}>
            1850-1859
            <input type="radio" name="chapter" />
          </label>
        </NavItem>
        <NavItem>
          <label on:click={() => handleViewerUpdate("1860s")}>
            1860-1869
            <input type="radio" name="chapter" />
          </label>
        </NavItem>
        <NavItem>
          <label on:click={() => handleViewerUpdate("1870s")}>
            1870-1879
            <input type="radio" name="chapter" />
          </label>
        </NavItem>
        <NavItem>
          <label on:click={() => handleViewerUpdate("1880s")}>
            1880-1889
            <input type="radio" name="chapter" />
          </label>
        </NavItem>
      </Nav>
    </div>
  </div>
  <div class="viewer">
    <div class="bookBox">
      {#if pdfURL !== './assets/pdfs/defaultView.pdf' }
        <a class="download" href={pdfBase + ".pdf"} download
          >Download Decade <Fa icon={faDownload} /></a
        >
      {/if }
    </div>
    <div class="viewerBox">
      {#if pdfURL === './assets/pdfs/defaultView.pdf'}
        <div class="selectBookDiv">
          <div>
            <h1 class="selectBookMessage">Select a Chapter to Preview</h1>
            <svg class="bookSVG" width="200px" height="200px" viewBox="0 0 24 24"><path d="M23 5v13.883l-1 .117v-16c-3.895.119-7.505.762-10.002 2.316-2.496-1.554-6.102-2.197-9.998-2.316v16l-1-.117v-13.883h-1v15h9.057c1.479 0 1.641 1 2.941 1 1.304 0 1.461-1 2.942-1h9.06v-15h-1zm-12 13.645c-1.946-.772-4.137-1.269-7-1.484v-12.051c2.352.197 4.996.675 7 1.922v11.613zm9-1.484c-2.863.215-5.054.712-7 1.484v-11.613c2.004-1.247 4.648-1.725 7-1.922v12.051z"/></svg>
          </div>
        </div>
      {:else}
        <iframe title="PDFviewer" src={pdfURL} />

      {/if}
    </div>
  </div>
</div>

<style>
  .theBook {
    display: flex;
    height: calc(100vh - 60px);
  }
  .navigation {
    min-width: 209px;
    border-right: 1px solid rgba(128, 128, 128, 0.5);
    background-color: rgb(235, 221, 205);
    max-height: calc(100vh - 60px);
    height: 100%;
  }
  .navigation h5 {
    margin: 0;
    padding: 0.25rem 0.75rem;
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
  .navigationBackground {
    background-color: white;
  }
  .download {
    text-align: right;
    padding-right: 2rem;
    margin-bottom: 0;
  }
  .viewer {
    margin: 0 auto;
  }
  .viewerBox {
    width: 70vw;
    padding: 0.2rem 2rem;
    height: 80%;
  }
  .viewerBox iframe {
    width: 100%;
    height: 80vh;
  }
  a.download {
    text-align: right;
  }
  div.bookBox {
    padding: 6px;
    text-align: right;
  }
  .selectBookDiv {
    text-align: center;
    display: grid;
    place-items: center;
    height: 100%;
  }
  .selectBookDiv .selectBookMessage {
    padding: 10px;
    font-weight: bold;
  }
  .selectBookDiv .bookSVG {
    height: 200px;
  }

  @media screen and (max-width: 900px) {
    .theBook {
      flex-direction: column;
    }
    .navigation {
      height: unset;
      min-width: unset;
      width: 100%;
    }
    .navigation label {
      text-align: center;
    }
    .viewer {
      margin: 0;
      padding: .2rem;
    }
    .viewerBox {
      width: 100%;
      padding: 0.2rem;
    }
    .viewerBox iframe {
      width: 100%;
      height: 80vh;
    }
    a.download {
      text-align: center;
      padding-right: 0;
    }
    div.bookBox {
      text-align: center;
    }
  }
</style>
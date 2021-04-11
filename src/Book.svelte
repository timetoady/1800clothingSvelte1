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
    <h5>The Book</h5>
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
  <div class="viewer">
    <div class="bookBox">
      <a class="download" href={pdfBase + ".pdf"} download
        >Download Decade <Fa icon={faDownload} /></a
      >
    </div>
    <div class="viewerBox">
      <iframe title="PDFviewer" src={pdfURL} />
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
    background-color: #ddd;
    max-height: calc(100vh - 60px);
    height: 100%;
  }
  .navigation h5 {
    margin: 0;
    padding: 0.25rem 0.75rem;
    background-color: #888;
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
  }
  .viewerBox iframe {
    width: 100%;
    height: 80vh;
  }
  a.download {
    text-align: right;
  }
  div.bookBox {
    text-align: right;
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
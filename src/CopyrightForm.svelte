<script>
  export let toggleContactForm;
  import { CustomInput } from "sveltestrap";
</script>

<div class="copyrightFormBackground">
  <form name="copyright" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="CopyrightForm">
    <div class="exitBtn" on:click={toggleContactForm}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#ebebeb;}.cls-2{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:19px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M345,345.53l-178-178m178,0-178,178"/></g></g></svg>
    </div>
    <div class="formDetails">
      <h1>Copyright Claim Form</h1>
      <h2>Image Details</h2>
      <label for="imageTitle">Title of Image in Question</label><br />
      <input
        type="text"
        name="imageTitle"
        id="imageTitle"
        placeholder="Enter Image Title"
        required
      /><br />
      <label for="additionalComments">Additional Comments</label><br />
      <textarea
        id="additionalComments"
        name="additionalComments"
        placeholder="Enter Additional Comments"
        required
      /><br />
      <label for="additionalComments"
        >Would you like this image removed from the site?</label
      ><br />
      <!-- <CustomInput
      type="switch"
      id="exampleCustomSwitch"
      name="deleteOption"
      label="Yes, please remove it." /> -->
      <input type="checkbox" name="deleteOption" id="yesOption">
      <label for="yesOption">Yes</label>
      <!-- <input
        type="radio"
        id="yesOption"
        name="deleteOption"
        value="yes"
        required
      />
      <label for="yesOption">Yes</label>
      <input type="radio" id="noOption" name="deleteOption" value="no" />
      <label for="noOption">No</label> -->

    </div>
      
    <div class="submitBar">
      <div class="cancelBtn" on:click={toggleContactForm}>Cancel</div>
      <button class="submitBtn" type="submit">Submit</button>
    </div>
  </form>
</div>

<style>
  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .copyrightFormBackground {
    background-color: rgba(0, 0, 0, 0.541);
    position: fixed;
    top: 0;
    z-index: 99999;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;

    /* animation */
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.2s;
  }

  .CopyrightForm {
    background-color: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.288);
    width: 800px;
    border-radius: 6px;
    position: relative;
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

  .formDetails {
    padding: 0 80px;
  }
  h1 {
    font-size: 22px;
    text-align: center;
    margin: 23px 0;
    font-weight: bold;
  }
  h2 {
    font-size: 20px;
    border-bottom: 1px solid rgb(211, 211, 211);
    padding-bottom: 5px;
  }

  label {
    margin: 13px 0 5px 0;
    font-size: 16px;
  }
  input[type="text"],
  textarea {
    width: 100%;
    border-radius: 5px;
    padding: 10px;
  }
  textarea {
    min-height: 130px;
  }
  input[type="radio"] {
    margin-right: 3px;
  }
  label[for="noOption"],
  label[for="yesOption"] {
    margin-right: 10px;
    margin-top: 3px;
  }

  .submitBar {
    border-top: 1px solid rgb(211, 211, 211);
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding: 12px 0;
    padding-right: 40px;
  }
  .cancelBtn,
  .submitBtn {
    padding: 10px 40px;
    border-radius: 5px;
  }
  .cancelBtn {
    cursor: pointer;
    margin-right: 10px;
  }
  .cancelBtn:hover {
    background-color: rgb(251, 251, 251);
  }
  .submitBtn {
    background-color: rgb(41, 41, 41);
    border: none;
    color: white;
  }
  .submitBtn:hover {
    background-color: rgb(65, 65, 65);
  }

  @media screen and (max-width: 900px) {
    .CopyrightForm {
      height: 100%;
      width: 100%;
      border-radius: none;
    }
  }
  @media screen and (max-width: 600px) {
    .formDetails {
      padding: 0 30px;
    }
    .exitBtn {
      right: 15px;
    }
  }
</style>

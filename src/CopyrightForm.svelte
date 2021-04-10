<script>

</script>

<div class="copyrightFormBackground">
  <form class="CopyrightForm">
    <div class="exitBtn">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <div class="formDetails">
      <h1>Copyright Claim Form</h1>
      <h2>Image Details</h2>
      <label for="imageTitle">Title of Image in Question</label><br>
      <input type="text" name="imageTitle" id="imageTitle" placeholder="Enter Image Title" required /><br>
      <label for="additionalComments">Additional Comments</label><br>
      <textarea id="additionalComments" name="additionalComments" placeholder="Enter Additional Comments" required></textarea><br>
      <label for="additionalComments">Would you like this image removed from the site?</label><br>
      <input type="radio" id="yesOption" name="deleteOption" value="yes" required>
      <label for="yesOption">Yes</label>
      <input type="radio" id="noOption" name="deleteOption" value="no">
      <label for="noOption">No</label>
    </div>
    <div class="submitBar">
      <div class="cancelBtn">Cancel</div>
      <button class="submitBtn">Submit</button>
    </div>
  </form>
</div>

<style>
  .copyrightFormBackground {
    background-color: rgba(0, 0, 0, 0.541);
    position: fixed;
    top: 0;
    z-index: 99999;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
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
    background-color: rgb(235, 235, 235);
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    top: 15px;
    left: 20px;
    cursor: pointer;
  }
  .exitBtn svg {
    width: 16px;
    position: relative;
    top: -6px;
    left: -1px;
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
  input[type="text"], textarea {
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
  label[for="noOption"], label[for="yesOption"] {
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
  .cancelBtn, .submitBtn {
    padding: 10px 40px;
  }
  .cancelBtn {
    cursor: pointer;
  }
  .submitBtn {
    background-color: rgb(41, 41, 41);
    border: none;
    color: white;
    border-radius: 5px;
  }
</style>
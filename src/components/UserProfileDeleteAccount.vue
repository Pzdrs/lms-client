<template>
  <div class="deleteAccount">
    <button id="launchModal" class="button button-smooth is-fullwidth is-outlined is-danger">Delete account</button>
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete your account?</p>
          <button class="delete closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-danger">Delete account</button>
          <button class="button closeModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';

export default {
  name: 'Delete-account',
  mounted() {
    $("#launchModal").on("click", function () {
      $(".modal")
          .addClass("is-active")
          .addClass("is-clipped");
    });
    $(".closeModal").on("click", function () {
      $(".modal")
          .removeClass("is-active")
          .removeClass("is-clipped");
    });
  }
}
</script>
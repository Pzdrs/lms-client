<template>
  <form
      @submit.prevent="">
    <div class="modal-card" style="margin: 0 auto;">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">Sign Up for LMS</p>
      </header>
      <section class="modal-card-body">
        <b-field label="First name">
          <div class="control has-icons-left">
            <b-input
                placeholder="First name"
                icon-pack="fas"
                required>
            </b-input>
            <span class="icon is-small is-left">
            F
          </span>
          </div>
        </b-field>

        <b-field label="Last name">
          <div class="control has-icons-left">
            <b-input
                placeholder="Last name"
                icon-pack="fas"
                required>
            </b-input>
            <span class="icon is-small is-left">
              L
            </span>
          </div>
        </b-field>

        <b-field label="Username">
          <b-input
              placeholder="Username"
              icon-pack="fas"
              icon="user"
              minlength="5"
              required>
          </b-input>
        </b-field>

        <b-field label="Email">
          <b-input
              type="email"
              placeholder="Email"
              icon-pack="fas"
              icon="envelope"
              required>
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
              name="password"
              type="password"
              placeholder="Password"
              icon-pack="fas"
              icon="lock"
              password-reveal
              minlength="6"
              required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot has-text-centered">
        <input type="submit" class="button is-primary" value="Sign Up"/>
        <b-button>Already have an account?</b-button>
      </footer>
    </div>
  </form>
</template>
<script>
export default {
  name: 'GetStartedModal'
};
</script>
<style scoped>

</style>
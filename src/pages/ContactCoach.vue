<template>
  <div class="">
    <base-spinner v-if="isLoading"></base-spinner>
    <base-dialog
      v-if="!isLoading && error"
      :show="!!error"
      title="An error occurred"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <form @submit.prevent="submitForm" v-if="!isLoading">
      <div class="form-control" :class="{ invalid: !email.valid }">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model.trim="email.val"
          @blur="clearValidity('email')"
        />
        <p v-if="!email.valid">Email should not be empty</p>
      </div>
      <div class="form-control" :class="{ invalid: !message.valid }">
        <label for="message">Message</label>
        <textarea
          name=""
          id="message"
          rows="5"
          placeholder="Write your message"
          v-model.trim="message.val"
          @blur="clearValidity('message')"
        ></textarea>
        <p v-if="!message.valid">Message should not be empty</p>
      </div>
      <div class="actions">
        <p v-if="!formIsValid" class="errors">Fix and try again</p>
        <base-button>Send Message</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        valid: true,
      },
      message: {
        val: '',
        valid: true,
      },
      formIsValid: true,
      error: null,
      isLoading: false,
    };
  },
  methods: {
    handleError() {
      this.error = null;
    },
    clearValidity(input) {
      this[input].valid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email.val === '' && !this.email.val.includes('@')) {
        this.email.valid = false;
        this.formIsValid = false;
      }
      if (this.message.val === '') {
        this.message.valid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;
      const contactData = {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id,
      };
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/contactCoach', contactData);
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>

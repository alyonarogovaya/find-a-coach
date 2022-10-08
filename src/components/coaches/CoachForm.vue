<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.valid }">
      <label for="first-name">First Name</label>
      <input
        type="text"
        id="first-name"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.valid">First name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.valid }">
      <label for="last-name">Last Name</label>
      <input
        type="text"
        id="last-name"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.valid">Last name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.valid }">
      <label for="description">Description</label>
      <textarea
        name=""
        id="description"
        rows="5"
        v-model.trim="description.val"
        placeholder="Describe yourself"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.valid">Describe yourself</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.valid }">
      <label for="rate">Hourly rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.valid">Choose your rate</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.valid }">
      <h3>Areas of expertise</h3>
      <div class="">
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div class="">
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend</label>
      </div>
      <div class="">
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.valid">Choose your area</p>
    </div>
    <p v-if="!formIsValid">Please fix errors and try again</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: '',
        valid: true,
      },
      lastName: {
        val: '',
        valid: true,
      },
      description: {
        val: '',
        valid: true,
      },
      rate: {
        val: null,
        valid: true,
      },
      areas: {
        val: [],
        valid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].valid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.valid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.valid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.valid = false;
        this.formIsValid = false;
      }
      if (this.rate.val === null || this.rate.val < 0) {
        this.rate.valid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.valid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>

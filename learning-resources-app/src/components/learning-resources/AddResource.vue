<template>
  <teleport to="#app"
    ><base-dialog
      v-if="inputIsInvalid"
      title="Invalid Input"
      @close-dialog="closeDialog"
    >
      <template #default>
        <p>Unfortunately, at least one value is invalid</p>
        <p>Please check all input fields</p>
      </template>
      <template #actions>
        <base-button @click="closeDialog">Ok</base-button>
      </template>
    </base-dialog></teleport
  >

  <base-card>
    <form @submit.prevent="addNewResource">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea id="description" rows="3" v-model="description" />
      </div>
      <div class="form-control">
        <label for="link">Link</label>
        <input type="url" id="link" v-model="link" />
      </div>
      <div>
        <base-button>Add Resource</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      link: "",
      inputIsInvalid: false,
    };
  },
  inject: ["addNewResourceFromParent"],
  methods: {
    addNewResource() {
      if (
        this.title.trim() === "" ||
        this.description.trim() ||
        this.link.trim() === ""
      ) {
        this.inputIsInvalid = true;
        return;
      }

      this.addNewResourceFromParent({
        title: this.title,
        description: this.description,
        link: this.link,
      });
    },
    closeDialog() {
      this.inputIsInvalid = false;
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>

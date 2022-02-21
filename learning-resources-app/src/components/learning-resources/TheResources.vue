<template>
  <base-card>
    <base-button
      @click="setSelectedTab('stored-resources')"
      :mode="storedResourcesClass"
      >Stored Resources</base-button
    >
    <base-button
      @click="setSelectedTab('add-resource')"
      :mode="addResourceClass"
    >
      Add Resource</base-button
    >
  </base-card>
  <keep-alive>
    <component :is="selectedTab"></component>
  </keep-alive>
</template>

<script>
import StoredResources from "./StoredResources.vue";
import AddResource from "./AddResource.vue";

export default {
  components: {
    StoredResources,
    AddResource,
  },
  computed: {
    storedResourcesClass() {
      return this.selectedTab === "stored-resources" ? "" : "flat";
    },
    addResourceClass() {
      return this.selectedTab === "add-resource" ? "" : "flat";
    },
  },
  data() {
    return {
      selectedTab: "stored-resources",
      storedResources: [
        {
          id: "official-guide",
          title: "Official Guide",
          description: "The official Vue.js documentation",
          link: "https://vuejs.org",
        },
        {
          id: "google",
          title: "Google",
          description: "Google to learn...",
          link: "https://google.com",
        },
      ],
    };
  },
  methods: {
    setSelectedTab(tabName) {
      this.selectedTab = tabName;
    },
    deleteResource(id) {
      console.log(id);
      const idx = this.storedResources.findIndex(
        (resource) => resource.id === id
      );
      this.storedResources.splice(idx, 1);
    },
  },
  provide() {
    const that = this;
    return {
      resources: this.storedResources,
      addNewResourceFromParent(resource) {
        const newResource = {
          ...resource,
          id: new Date().toISOString(),
        };
        that.storedResources.push(newResource);
        that.setSelectedTab("stored-resources");
      },
      deleteResource: this.deleteResource,
    };
  },
};
</script>

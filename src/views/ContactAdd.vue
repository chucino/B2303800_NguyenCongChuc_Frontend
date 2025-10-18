<template>
  <div class="page">
    <h4>Add New Contact</h4>

    <!-- Form nhập liệu -->
    <ContactForm :contact="contact" @submit:contact="addContact" />

    <p>{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "../components/ContactForm.vue";
import ContactService from "../services/contact.service";

export default {
  components: { ContactForm },

  data() {
    return {
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      },
      message: "",
    };
  },

  methods: {
    async addContact(data) {
      try {
        await ContactService.create(data);
        alert("Contact added successfully!");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.error("Error adding contact:", error);
        this.message = "Error: Cannot add contact.";
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
}
</style>

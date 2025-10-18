<template>
  <div v-if="contact" class="page">
    <h4>Contact Edit</h4>

    <ContactForm
      :contact="contact.data"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />

    <p class="text-success mt-2">{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "../components/ContactForm.vue";
import ContactService from "../services/contact.service";

export default {
  components: {
    ContactForm,
  },

  props: {
    id: { type: String, required: true },
  },

  data() {
    return {
      contact: null,
      message: "",
    };
  },

  methods: {
    async getContact(id) {
      try {
        this.contact = await ContactService.get(id);
      } catch (error) {
        console.log(error);
        // Nếu id không tồn tại → chuyển hướng về trang 404
        this.$router.push({
          name: "notfound",
          params: { pathMatch: this.$route.path.split("/").slice(1) },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },

    async updateContact(data) {
      try {
        await ContactService.update(this.contact.data._id, data); // Sua loi o day
        alert("Contact updated successfully.");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteContact() {
      if (confirm("Do you want to delete this Contact?")) {
        try {
          await ContactService.delete(this.contact._id);
          this.$router.push({ name: "contactbook" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  created() {
    this.getContact(this.id);
    this.message = "";
  },
};
</script>

<style scoped>
.page {
  max-width: 500px;
  margin: auto;
}
</style>

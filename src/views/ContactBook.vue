<template>
  <div class="page row mx-auto">
    <!-- Ô tìm kiếm -->
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>

    <!-- Danh sách liên hệ -->
    <div class="mt-3 col-md-6">
      <h4>
        Contacts
        <i class="fas fa-address-book"></i>
      </h4>

      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />

      <p v-else>No contact.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i> Refresh
        </button>

        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Add new
        </button>

        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Clear all
        </button>
      </div>
    </div>

    <!-- Chi tiết liên hệ -->
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Contact Details
          <i class="fas fa-address-card"></i>
        </h4>

        <ContactCard :contact="activeContact" />
      </div>
    </div>
  </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Khi thay đổi từ khóa tìm kiếm, reset activeIndex về -1
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Mảng các chuỗi dùng để so sánh tìm kiếm
    contactStrings() {
      return this.contacts.map((contact) => {
        const {
          name = "",
          email = "",
          address = "",
          phone = "",
        } = contact || {};
        return [name, email, address, phone].join("").toLowerCase();
      });
    },
    // Lọc danh bạ theo từ khóa tìm kiếm
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      const keyword = this.searchText.toLowerCase();
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index]?.includes(keyword)
      );
    },
    // Lấy liên hệ đang được chọn
    activeContact() {
      if (this.activeIndex < 0) return null;
      const list = this.filteredContacts;
      if (this.activeIndex >= list.length) return null;
      return list[this.activeIndex] || null;
    },
    // Số lượng liên hệ sau khi lọc
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      if (confirm("Do you want to delete all contacts?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log("Error deleting all contacts:", error);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>

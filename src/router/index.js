import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

// Định nghĩa các tuyến đường
const routes = [
  {
    path: "/", // Đường dẫn gốc
    name: "contactbook",
    component: ContactBook,
  },
];

// Tạo và cấu hình router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

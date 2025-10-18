import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

// Định nghĩa các tuyến đường
const routes = [
  {
    path: "/", // Đường dẫn gốc
    name: "contactbook",
    component: ContactBook,
  },
  {
    // Bắt tất cả các đường dẫn không khớp route nào ở trên
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    // Đường dẫn chỉnh sửa liên hệ theo ID
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true, // truyền params.id thành props vào component
  },
  {
    // Đường dẫn thêm liên hệ mới
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
  },
];

// Tạo và cấu hình router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

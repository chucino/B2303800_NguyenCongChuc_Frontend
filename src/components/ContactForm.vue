<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <!-- Name -->
    <div class="form-group">
      <label for="name">Name</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="contactLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>

    <!-- Email -->
    <div class="form-group">
      <label for="email">E-mail</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="contactLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <!-- Address -->
    <div class="form-group">
      <label for="address">Address</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="contactLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>

    <!-- Phone -->
    <div class="form-group">
      <label for="phone">Phone</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
        v-model="contactLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <!-- Favorite -->
    <div class="form-group form-check">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="contactLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Favorite Contact</strong>
      </label>
    </div>

    <!-- Buttons -->
    <div class="form-group">
      <button class="btn btn-primary">Save</button>

      <button
        v-if="contactLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteContact"
      >
        Erase
      </button>

      <button type="button" class="ml-2 btn btn-secondary" @click="cancel">
        Exit
      </button>
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: { Form, Field, ErrorMessage },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true },
  },
  data() {
    // yup schema validation rules
    const contactFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().max(100, "Address tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(/^(09|03|07|08|05)\d{8}$/, "Số điện thoại không hợp lệ."),
    });

    return {
      contactLocal: { ...this.contact }, // sao chép để tránh sửa props
      contactFormSchema,
    };
  },
  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal._id);
    },
    cancel() {
      if (confirm("Bạn có chắc muốn thoát mà không lưu thay đổi?")) {
        this.$router.push({ name: "contactbook" });
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/form.css";
</style>

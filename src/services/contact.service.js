import createApiClient from "./api.service";
import axios from "axios";
// Dịch vụ quản lý liên hệ
class ContactService {
  constructor(baseUrl = "/api/contacts") {
    this.api = createApiClient(baseUrl);
  }
  // Lấy tất cả liên hệ
  async getAll() {
    // return (await this.api.get("/")).data;
    const response = await axios.get("http://localhost:3000/api/contacts");
    console.log("Response from getAll:", response.data);
    return response.data.data;
  }
  // Tạo liên hệ mới
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  // Xóa tất cả liên hệ
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  // Lấy liên hệ theo ID
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  // Cập nhật liên hệ theo ID
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  // Xóa liên hệ theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new ContactService();

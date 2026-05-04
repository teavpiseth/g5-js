import axios from "axios";
import { getDashboardAccessToken } from "../modules/dashboard/auth";
class HttpRequest {
  async _sendRequest({ method, url, payload, extraHeaders, extraConfig }) {
    try {
      const accessToken = getDashboardAccessToken();
      const options = {
        method,
        url,
        data: payload,
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...extraHeaders,
        },
        ...extraConfig,
      };

      const response = await axios(options);
      if (response.data?.success) {
        return response.data;
      }

      throw new Error(response.data?.message || "Request failed");
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || "Network error",
      );
    }
  }

  async get(url, extraHeaders = {}, extraConfig = {}) {
    return this._sendRequest({
      method: "GET",
      url,
      extraHeaders,
      extraConfig,
    });
  }

  async post(url, payload, extraHeaders = {}, extraConfig = {}) {
    return this._sendRequest({
      method: "POST",
      url,
      payload,
      extraHeaders,
      extraConfig,
    });
  }

  async put(url, payload, extraHeaders = {}, extraConfig = {}) {
    return this._sendRequest({
      method: "PUT",
      url,
      payload,
      extraHeaders,
      extraConfig,
    });
  }

  async delete(url, extraHeaders = {}, extraConfig = {}) {
    return this._sendRequest({
      method: "DELETE",
      url,
      extraHeaders,
      extraConfig,
    });
  }
}

export default new HttpRequest();

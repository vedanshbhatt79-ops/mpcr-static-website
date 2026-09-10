import { EntityList } from "@mody-park-cha-raja/finance_common";
import { apiClient } from "../client";

export const AARTI_POLL_INTERVAL = 60 * 1000;

const STATUSES = ["live", "awaiting", "offline"];

export const aartiService = {
  async getAartis() {
    console.log("EntityList.AARTI", EntityList.AARTI);
    const data = await apiClient.get(`/${EntityList.AARTI}/search`);
    return data?.[EntityList.AARTI] ?? [];
  },

  async createAarti(dto) {
    return apiClient.post(`/${EntityList.AARTI}`, dto);
  },

  async getLiveStatus() {
    const data = await apiClient.get(`/${EntityList.AARTI}/live-status`);

    return {
      status: STATUSES.includes(data.status) ? data.status : "offline",
      videoId: data.videoId || null,
      configured: Boolean(data.configured),
    };
  },
};

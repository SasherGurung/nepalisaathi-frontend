import { create } from "zustand";
import { api } from "@/lib/api/config";
import {
  Province,
  District,
  Municipality,
  MunicipalityType,
} from "@/lib/types/EditProfile/Locations/location.types";
import toast from "react-hot-toast";

type locationState = {
  provinces: Province[];
  districts: District[];
  municipalities: Municipality[];

  fetchProvinces: () => Promise<void>;

  fetchDistricts: (zoneId: number) => Promise<void>;

  fetchMunicipalities: (
    districtId: number,
    type?: MunicipalityType,
  ) => Promise<void>;
};

export const useLocationStore = create<locationState>((set) => ({
  provinces: [],
  districts: [],
  municipalities: [],

  // Fetch Provinces
  fetchProvinces: async () => {
    try {
      const { data } = await api.get("/locations/zones");

      set({
        provinces: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch provinces");
    }
  },

  // Fetch Districts
  fetchDistricts: async (zoneId: number) => {
    try {
      const { data } = await api.get(`/locations/districts/${zoneId}`);

      set({
        districts: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Districts");
    }
  },

  // Fetch Municipalities
  fetchMunicipalities: async (districtId, type) => {
    try {
      const url = type
        ? `/locations/municipalities/${districtId}?type=${type}`
        : `/locations/municipalities/${districtId}`;

      const { data } = await api.get(url);

      set({
        municipalities: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Municipalities");
    }
  },
}));

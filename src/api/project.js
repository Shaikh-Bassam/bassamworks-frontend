import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./client";

export const fetchProjects = async () => {
  const { data } = await apiClient.get("/projects");
  return data;
};

export const useProjects = () => {
  return useQuery(["projects"], fetchProjects);
};

import { get } from "http";
import apiClient from "./api-client";
import { ENDPOINTS } from "./api-config";
import dayjs from 'dayjs';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone_number?: string;
    address?: string;
    image?: string;
    role: string;
    createdAt: string;
}
export const userApi = {
    async information(userId: string): Promise<UserProfile> {
        const response = await apiClient.get(ENDPOINTS.INFORMATION(userId));
        if (response.status === 200) {

            return {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                phone_number: response.data.phone_number || '',
                address: response.data.address || '',
                image: response.data.image || '',
                role: response.data.role || 'USER',
                createdAt: dayjs(response.data.created_at).format('YYYY-MM-DD HH:mm:ss')
            };
        } else {
            throw new Error(`Failed to fetch user information: ${response.status}`);
        }
    }
}
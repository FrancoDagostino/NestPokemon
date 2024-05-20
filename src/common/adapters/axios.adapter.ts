import { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import axios from 'axios';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;


    async get<Gdata>(url: string): Promise<Gdata> {

        try {
            const response = await this.axios.get<Gdata>(url);
            return response.data
        } catch (error) {
            throw new Error('This is an error')
        }
    }

}
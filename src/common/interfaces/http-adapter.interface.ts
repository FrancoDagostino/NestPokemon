export interface HttpAdapter {
    get<Gdata>(url: string): Promise<Gdata>;
}
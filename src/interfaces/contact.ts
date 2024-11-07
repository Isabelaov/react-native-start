export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  picture?: string;
  tag?: string;
  location?: {latitude: number; longitude: number} | null | undefined;
}

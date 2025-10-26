
import { AddressCustomer } from './AddressCustomer';
export interface LoginModel {
  id: number;
  phone_number: string | null;
  full_name: string | null;
  email: string | null;
  email_verified_at: string | null;
  user_type: string | null;
  sex: string | null;
  google_id: string | null;
  facebook_id: string | null;
  avatar_image: string | null;
  driver_status: string | null;
  driver_approved: string | null;
  points: string;
  verified: number;
  last_logged_in_at: string;
  last_online_at: string;
  otp: string | null;
  otp_expires_at: string | null;
  payment_method_business: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  access_token: string;
  token_type: string | null;
  expires_at: string;
  is_phone: number;
  is_address: number;
  avatar_image_files: string;
  address_default: AddressCustomer | null;
}
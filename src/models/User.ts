export interface User {
  "id": number;
  "phone_number": string;
  "full_name": string;
  "email": string;
  "email_verified_at": string;
  "user_type": string;
  "sex": number | null;
  "google_id": string | null;
  "facebook_id": string | null;
  "avatar_image": string;
  "driver_status": string;
  "driver_approved":string;
  "points": string;
  "verified": number;
  "last_logged_in_at": string;
  "last_online_at": string;
  "otp": string | null;
  "otp_expires_at": string | null;
  "payment_method_business": string | null;
  "created_at": string;
  "updated_at": string;
  "deleted_at": string | null;
}
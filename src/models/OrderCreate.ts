
import { User } from './User';
export interface ProductsOrder {
  "product_id": number;
  "qty": number;
  "note_store": string;
  "price": number;
  "img": string | undefined;
  "title": string | undefined;
  "description": string | undefined;
}
export interface OrderCreate {
  "id_store": number;
  "address_shipping": string | undefined;
  "name_user": string;
  "phone_user": string;
  "total_price_product": number;
  "price_shipping": number;
  "price_sale": number;
  "total_order": number;
  "note_shipping": string;
  "price_bonus_shipping": number;
  "payment_method": string;
  "qty": number;
  "products": ProductsOrder[];
}
export interface OrderList {
  "id": number;
  "customer_id": number;
  "driver_id": number;
  "order_number_date": number;
  "order_type":string;
  "order_number_id": string;
  "shop_id": string;
  "shop_address": string;
  "shop_lat": string;
  "shop_long": string;
  "destination_address": string;
  "destination_lat": string;
  "destination_long": string;
  "distance": string;
  "distance_compare": string;
  "duration": string;
  "ship_fee": string;
  "commission_ship_fee": string;
  "driver_ship_fee": string;
  "day": string;
  "tip": string;
  "pay_type": string;
  "note": string;
  "time_accepted": string;
  "time_picked": string;
  "operating_system": string;
  "status": string;
  "created_at": string;
  "created": string;
  "estimated_delivery_time": string;
  "updated_at": string;
  "total_amount": number;
  "total_amount_format": string;
  "total_discount_amount": string;
  "total_discount_amount_format": string;
  "ship_fee_format": string;
  "commission_ship_fee_format": string;
  "driver_ship_fee_format": string;
  "date_accepted_format": string;
  "shop_net_price_format":string;
  "shop_commission_deducted": string;
  "customer_pay_format": string;
  "customer": User;
  "detail": {
    "id": number;
    "order_id": number;
    "shop_name": string;
    "amount": number;
    "real_amount": number;
    "tip": number;
    "code": string;
    "pay_type": string;
    "responsive": string;
    "created_at": string;
    "updated_at": string;
  },
  "detail_shop": {
    "id": number;
    "shop_id": number;
    "order_id": number;
    "amount": string;
    "real_amount": string;
    "commission_fee": string;
    "default_ship": string;
    "pay_type": string;
    "status": string;
    "created_at": string;
    "updated_at": string;
  },
  "driver": {
    "id": number;
    "phone_number": string;
    "full_name": string;
    "email": string;
    "email_verified_at": string;
    "user_type": string;
    "sex": string;
    "google_id": string;
    "facebook_id": string;
    "avatar_image": string;
    "driver_status": string;
    "driver_approved": string;
    "blocked": number;
    "points": string;
    "verified": number;
    "last_logged_in_at": string;
    "last_online_at": string;
    "otp":string;
    "otp_expires_at":string;
    "payment_method_business": string;
    "created_at": string;
    "updated_at": string;
    "deleted_at": string;
    "enable_push_notification": number;
    "avatar_image_files": string;
    "phone_format": string;
  },
  "order_personal_items": [
    {
      "id": number;
      "order_id": number;
      "order_personal_id": number;
      "shop_product_id": number;
      "item_name": string;
      "qty": string;
      "price": number;
      "total_price": number;
      "image": string;
      "created_at": string;
      "updated_at": string;
      "image_files": string;
      "total_price_format": string;
    }
  ],
  "shop_information": {
    "id": number;
    "user_id": number;
    "commission_rate": string;
    "name": string;
    "description": string;
    "address": string;
    "postal_code": string;
    "district": string;
    "city": string;
    "lat": string;
    "long": string;
    "start_time": string;
    "end_time": string;
    "monday": number;
    "tuesday": number;
    "wednesday": number;
    "thursday": number;
    "friday": number;
    "saturday": number;
    "sunday": number;
    "created_at": string;
    "updated_at": string;
    "avatar": string;
    "avatar_files": string;
    "commission": string;
    "user": User;
  }
}
export interface OrderResponseDetail {
  "id": number;
  "customer_id": number;
  "driver_id": number;
  "order_number_date": number;
  "order_type": string;
  "order_number_id": number;
  "shop_id": string;
  "shop_address": string;
  "shop_lat": string;
  "shop_long": string;
  "destination_address": string;
  "destination_lat": string;
  "destination_long": string;
  "distance": string;
  "distance_compare": number;
  "duration": string;
  "ship_fee": string;
  "commission_ship_fee": string;
  "driver_ship_fee": string;
  "day": string;
  "tip": string;
  "pay_type": string;
  "note": string;
  "time_accepted": string;
  "estimated_delivery_time": string;
  "created": string;
  "time_picked": string;
  "operating_system": string;
  "status": number;
  "created_at": string;
  "updated_at": string;
  "total_amount": number;
  "total_amount_format": string;
  "total_discount_amount": number;
  "total_discount_amount_format": string;
  "ship_fee_format": string;
  "commission_ship_fee_format": string;
  "driver_ship_fee_format": string;
  "date_accepted_format": string;
  "shop_net_price_format": string;
  "shop_commission_deducted": string;
  "customer_pay_format": string;
  "customer": User,
  "detail": {
    "id": number;
    "order_id": number;
    "shop_name": string;
    "amount": number;
    "real_amount": number;
    "tip": number;
    "code": null,
    "pay_type": string;
    "responsive": string;
    "created_at": string;
    "updated_at": string;
  },
  "detail_shop": {
    "id": number;
    "shop_id": number;
    "order_id": number;
    "amount": string;
    "real_amount": string;
    "commission_fee": string;
    "default_ship": string;
    "pay_type": string;
    "status": string;
    "created_at": string;
    "updated_at": string;
  },
  "driver": User | null,
  "order_personal_items": [
    {
      "id": number;
      "order_id": number;
      "order_personal_id": number;
      "shop_product_id": number;
      "item_name": string;
      "qty": number;
      "price": number;
      "total_price": number;
      "image": string;
      "created_at": string;
      "updated_at": string;
      "image_files": string;
      "total_price_format": string;
    }
  ],
  "shop_information": {
    "id": number;
    "user_id": number;
    "commission_rate": number;
    "name": string;
    "description": string;
    "address": string;
    "postal_code": string;
    "district": string;
    "city": string;
    "lat": string;
    "long": string;
    "start_time": string;
    "end_time": string;
    "monday": number;
    "tuesday": number;
    "wednesday": number;
    "thursday": number;
    "friday": number;
    "saturday": number;
    "sunday": number;
    "created_at": string;
    "updated_at": string;
    "avatar": string;
    "avatar_files": string;
    "commission": string;
    "user": User
  }
}

export interface OrderResponseCreate {
  "customer_id": number;
  "order_type": string;
  "shop_id": number;
  "shop_address": string;
  "shop_lat": string;
  "shop_long": string;
  "destination_address": string;
  "destination_lat": string;
  "destination_long": string;
  "distance": number;
  "duration": string;
  "pay_type": string;
  "status": number;
  "ship_fee": number;
  "day": string;
  "tip": string;
  "order_number_date": number;
  "updated_at": string;
  "created_at": string;
  "id": number;
  "total_amount": number;
  "total_amount_format": string;
  "total_discount_amount": string;
  "total_discount_amount_format": string;
  "ship_fee_format": string;
  "commission_ship_fee_format": string;
  "driver_ship_fee_format": string;
  "date_accepted_format": string;
  "shop_net_price_format": string;
  "shop_commission_deducted": string;
  "customer_pay_format": string;
  "order_personal_items": [
    {
      "id": number;
      "order_id": number;
      "order_personal_id": number;
      "shop_product_id": number;
      "item_name": string;
      "qty": number;
      "price": number;
      "total_price": number;
      "image": string;
      "created_at": string;
      "updated_at": string;
      "image_files": string;
      "total_price_format": string;
    }
  ],
  "detail_shop": {
    "id": number;
    "shop_id": number;
    "order_id": number;
    "amount": string;
    "real_amount": string;
    "commission_fee": string;
    "default_ship": string;
    "pay_type": string;
    "status": number;
    "created_at": string;
    "updated_at": string;
  },
  "shop_information": {
    "id": number;
    "user_id": number;
    "commission_rate": string;
    "name": string;
    "description": string;
    "address": string;
    "postal_code": string;
    "district": string;
    "city": string;
    "lat": string;
    "long": string;
    "start_time": string;
    "end_time": string;
    "monday": number;
    "tuesday": number;
    "wednesday": number;
    "thursday": number;
    "friday": number;
    "saturday": number;
    "sunday": number;
    "created_at": string;
    "updated_at": string;
    "avatar": string;
    "avatar_files": string;
    "commission": string;
    "user": User
  },
  "detail": {
    "id": number;
    "order_id": number;
    "shop_name": string;
    "amount": number;
    "real_amount": number;
    "tip": number;
    "code": null,
    "pay_type": string;
    "responsive": string;
    "created_at": string;
    "updated_at": string;
  }
}
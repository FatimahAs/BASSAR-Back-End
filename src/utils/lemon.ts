// src/utils/lemon.ts
import axios from 'axios';

const LEMON_API_BASE = 'https://api.lemonsqueezy.com/v1';
const API_KEY = process.env.LEMONSQUEEZY_API_KEY as string;

const lemonClient = axios.create({
  baseURL: LEMON_API_BASE,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// مثال: جلب بيانات منتج حسب الـ productId
export const getProduct = async (productId: string) => {
  try {
    const response = await lemonClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// مثال: إنشاء طلب دفع جديد (checkout session)
export const createCheckoutSession = async (productId: string, customerEmail: string) => {
  try {
    const response = await lemonClient.post('/checkouts', {
      data: {
        type: 'checkouts',
        attributes: {
          product_id: productId,
          customer_email: customerEmail,
          // يمكن إضافة خيارات أخرى هنا مثل: redirect_url, webhook_url ...
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const ordersPage = "/orders";
export const orderDetailPage = (id: string | number) => `${ordersPage}/${id}`;
export const createOrderPage = `${ordersPage}/create`;
